let scene, camera, renderer, physicsWorld;
let ballMeshes = [];
let ballBodies = [];
let groundBody;
let clock = new THREE.Clock();
let isPhysicsRunning = true;
let tempTransform = new Ammo.btTransform();

// Разноцветные материалы для шаров
const ballMaterials = [
    new THREE.MeshPhongMaterial({ color: 0xff0000 }), // Красный
    new THREE.MeshPhongMaterial({ color: 0x00ff00 }), // Зеленый
    new THREE.MeshPhongMaterial({ color: 0x0000ff }), // Синий
    new THREE.MeshPhongMaterial({ color: 0xffff00 }), // Желтый
    new THREE.MeshPhongMaterial({ color: 0xff00ff }), // Пурпурный
    new THREE.MeshPhongMaterial({ color: 0x00ffff }), // Голубой
    new THREE.MeshPhongMaterial({ color: 0xff8800 }), // Оранжевый
    new THREE.MeshPhongMaterial({ color: 0x8800ff }), // Фиолетовый
    new THREE.MeshPhongMaterial({ color: 0x00ff88 }), // Бирюзовый
    new THREE.MeshPhongMaterial({ color: 0xff0088 })  // Розовый
];

function init() {
    // Сцена
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a14);

    // Камера
    camera = new THREE.PerspectiveCamera(60, getAspectRatio(), 0.1, 1000);
    camera.position.set(0, 8, 15);
    camera.lookAt(0, 0, 0);

    // Рендерер
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(getCanvasWidth(), getCanvasHeight());
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Контроллер камеры
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 5;
    controls.maxDistance = 50;

    // Освещение
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Инициализация физики
    initPhysics();

    // Создание пола
    createGround();

    // Добавление начального шара
    addBall();

    // Обработчик изменения размера окна
    window.addEventListener('resize', onWindowResize);

    // Запуск анимации
    animate();
}

function getAspectRatio() {
    const container = document.getElementById('canvas-container');
    return container.clientWidth / container.clientHeight;
}

function getCanvasWidth() {
    return document.getElementById('canvas-container').clientWidth;
}

function getCanvasHeight() {
    return document.getElementById('canvas-container').clientHeight;
}

function initPhysics() {
    const collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
    const dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
    const broadphase = new Ammo.btDbvtBroadphase();
    const solver = new Ammo.btSequentialImpulseConstraintSolver();
    physicsWorld = new Ammo.btDiscreteDynamicsWorld(dispatcher, broadphase, solver, collisionConfiguration);
    physicsWorld.setGravity(new Ammo.btVector3(0, -9.8, 0));
}

function createGround() {
    // Визуальная часть пола
    const groundGeometry = new THREE.PlaneGeometry(30, 30);
    const groundMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x2d2d4d,
        side: THREE.DoubleSide 
    });
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    groundMesh.rotation.x = Math.PI / 2;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // Физическая часть пола
    const groundShape = new Ammo.btStaticPlaneShape(new Ammo.btVector3(0, 1, 0), 0);
    const groundTransform = new Ammo.btTransform();
    groundTransform.setIdentity();
    const groundMass = 0;
    const groundLocalInertia = new Ammo.btVector3(0, 0, 0);
    const groundMotionState = new Ammo.btDefaultMotionState(groundTransform);
    const groundBodyInfo = new Ammo.btRigidBodyConstructionInfo(groundMass, groundMotionState, groundShape, groundLocalInertia);
    groundBody = new Ammo.btRigidBody(groundBodyInfo);
    physicsWorld.addRigidBody(groundBody);
}

function addBall() {
    const radius = 1;
    const mass = 1;
    
    // Случайная позиция
    const posX = (Math.random() - 0.5) * 10;
    const posY = 5 + Math.random() * 10;
    const posZ = (Math.random() - 0.5) * 10;
    
    // Случайный цвет
    const material = ballMaterials[Math.floor(Math.random() * ballMaterials.length)];
    
    // Визуальная часть
    const ballGeometry = new THREE.SphereGeometry(radius, 32, 32);
    const ballMesh = new THREE.Mesh(ballGeometry, material);
    ballMesh.castShadow = true;
    ballMesh.receiveShadow = true;
    ballMesh.position.set(posX, posY, posZ);
    scene.add(ballMesh);
    
    // Физическая часть
    const ballShape = new Ammo.btSphereShape(radius);
    const ballTransform = new Ammo.btTransform();
    ballTransform.setIdentity();
    ballTransform.setOrigin(new Ammo.btVector3(posX, posY, posZ));
    const ballLocalInertia = new Ammo.btVector3(0, 0, 0);
    ballShape.calculateLocalInertia(mass, ballLocalInertia);
    const ballMotionState = new Ammo.btDefaultMotionState(ballTransform);
    const ballBodyInfo = new Ammo.btRigidBodyConstructionInfo(mass, ballMotionState, ballShape, ballLocalInertia);
    const ballBody = new Ammo.btRigidBody(ballBodyInfo);
    ballBody.setRestitution(0.7);
    ballBody.setFriction(0.5);
    physicsWorld.addRigidBody(ballBody);
    
    ballMeshes.push(ballMesh);
    ballBodies.push(ballBody);
    
    updateBallCount();
}

function resetScene() {
    // Удаляем все шары со сцены
    ballMeshes.forEach(mesh => scene.remove(mesh));
    ballBodies.forEach(body => physicsWorld.removeRigidBody(body));
    
    ballMeshes = [];
    ballBodies = [];
    
    // Добавляем новый шар
    addBall();
}

function togglePhysics() {
    isPhysicsRunning = !isPhysicsRunning;
    document.querySelector('button[onclick="togglePhysics()"]').textContent = 
        isPhysicsRunning ? '⏸️ Пауза' : '▶️ Продолжить';
}

function updateBallCount() {
    document.getElementById('ballCount').textContent = ballMeshes.length;
}

function updatePhysics(deltaTime) {
    if (!isPhysicsRunning) return;
    
    physicsWorld.stepSimulation(deltaTime, 10);
    
    for (let i = 0; i < ballBodies.length; i++) {
        const body = ballBodies[i];
        const mesh = ballMeshes[i];
        
        if (body.getMotionState()) {
            body.getMotionState().getWorldTransform(tempTransform);
            const pos = tempTransform.getOrigin();
            mesh.position.set(pos.x(), pos.y(), pos.z());
            
            const quat = tempTransform.getRotation();
            mesh.quaternion.set(quat.x(), quat.y(), quat.z(), quat.w());
        }
    }
}

function onWindowResize() {
    camera.aspect = getAspectRatio();
    camera.updateProjectionMatrix();
    renderer.setSize(getCanvasWidth(), getCanvasHeight());
}

function animate() {
    requestAnimationFrame(animate);
    const deltaTime = clock.getDelta();
    updatePhysics(deltaTime);
    renderer.render(scene, camera);
}

// Инициализация при загрузке
window.addEventListener('load', init);