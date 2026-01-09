function firmware_message(lang)
{
  if(lang == 2)
  return "Install the hex file below on your micro:bit for communication.<"+"ul><"+
  "li><"+"strong><"+"a href=/lee/microbit-javalab-mbl-v6.hex target=_new>microbit-javalab-mbl-v6.hex<"+"/a><"+"/strong> (Right Click) → Save Link As... → Save to the MICROBIT Drive<"+"/li><"+
  "li>Firmware version : v6<"+"/li><"+
  "li>This firmware is common in JavaLab.<"+"/li><"+
  "li>If installation is successful, the micro:bit's name and firmware version will appear on the LED.<"+"/li><"+
  "li>If the installed version is lower, reinstall it.<"+"/li><"+
  "li>If the LED shows error code, please reinstall.<"+"/li><"+
  "li>If the firmware is installed, press the <"+"button onClick='doButtonConn()'>Micro:bit Connect<"+"/button> button to pair the micro:bit. (wireless Bluetooth communication)<"+"/li><"+
  "li>Make sure your PC or Android's Bluetooth version is 5.0 or higher.<"+"/li><"+
  "li>Please close any other tabs that are paired with the micro:bit.<"+"/li><"+
  "li>This app is one of the <a href='/en/logger/'>Javalab logger</a> projects.<"+"/li><"+
  "/ul>";

  if(lang == 1)
  return "通信のために、以下のhexファイルをマイクロビットにインストールしてください。<"+"ul><"+
  "li><"+"strong><"+"a href=/lee/microbit-javalab-mbl-v6.hex target=_new>microbit-javalab-mbl-v6.hex<"+"/a><"+"/strong> (右クリック) → 名前を付けて保存... → MICROBITドライブに保存<"+"/li><"+
  "li>ファイルバージョン : v6<"+"/li><"+
  "li>このファイルはJavaLabで共通です。<"+"/li><"+
  "li>インストールが成功すると、microbitの名前とファイルバージョンがLEDに表示されます。<"+"/li><"+
  "li>インストールされているバージョンが低い場合は、再インストールしてください。<"+"/li><"+
  "li>LEDにエラー数字が表示された場合、再インストールします。<"+"/li><"+
  "li>インストール後、<"+"button onClick='doButtonConn()'>Micro:bit 接続<"+"/button> ボタンを押してmicrobitをペアリングします。（ワイヤレスBluetooth通信）<"+"/li><"+
  "li>PCまたはAndroidのBluetoothバージョンが5.0以上であることを確認してください。<"+"/li><"+
  "li>マイクロビットとペアリングされた他のタブを閉じてください。<"+"/li><"+
  "li>このアプリは<a href='/ja/data_logger/'>Javalab logger</a>プロジェクトの一つです。<"+"/li><"+
  "/ul>";

  return "통신을 위해 아래 hex 파일을 마이크로비트에 설치하세요.<"+"ul><"+
  "li><"+"strong><"+"a href=/lee/microbit-javalab-mbl-v6.hex target=_new>microbit-javalab-mbl-v6.hex<"+"/a><"+"/strong> (우클릭) → 다른 이름으로 링크 저장... → MICROBIT 드라이브에 저장<"+"/li><"+
  "li>파일 버전 : v6<"+"/li><"+
  "li>이 파일은 Javalab에서 공통적으로 사용됩니다.<"+"/li><"+
  "li>설치에 성공하면 microbit의 이름과 파일 버전이 LED에 표시됩니다.<"+"/li><"+
  "li>설치된 버전이 낮은 경우 다시 설치하세요.<"+"/li><"+
  "li>LED에 에러 숫자가 표시되면 다시 설치하세요.<"+"/li><"+
  "li>설치 후 <"+"button onClick='doButtonConn()'>Micro:bit 연결<"+"/button> 버튼을 눌러 microbit를 페어링합니다.<br>(무선 Bluetooth 통신)<"+"/li><"+
  "li>PC 또는 Android의 Bluetooth 버전이 5.0 이상인지 확인하세요.<"+"/li><"+
  "li>마이크로비트와 페어링된 다른 탭은 닫아주세요.<"+"/li><"+
  "li>이 앱은 <a href='/mbl/'>Javalab MBL</a> 프로젝트 중 하나입니다.<"+"/li><"+
  "/ul>";
}


/*
This code is to connect an BLE UART microbit to p5.

API:

microBitConnect()

This function should be called by an user event, like  mousePressed() https://p5js.org/reference/#/p5/mousePressed
or KeyPressed() https://p5js.org/reference/#/p5/keyPressed

microBitDisconnect()

This function disconnects the microbit from the device running the p5 sketch.

microBitWriteString("string")

Writes a text to the microbit

microBitReceivedMessage()

This is a function that is called when the microBit sends a message to the device running P5

*/

// https://lancaster-university.github.io/microbit-docs/resources/bluetooth/bluetooth_profile.html
// An implementation of Nordic Semicondutor's UART/Serial Port Emulation over Bluetooth low energy
const UART_SERVICE_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";

// Allows the micro:bit to transmit a byte array
const UART_TX_CHARACTERISTIC_UUID = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";

// Allows a connected client to send a byte array
const UART_RX_CHARACTERISTIC_UUID = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";

let uBitDevice;
let rxCharacteristic;

async function microBitWriteString(string){
  if (!rxCharacteristic) {
    return;
  }

  try {
    let encoder = new TextEncoder();
    rxCharacteristic.writeValue(encoder.encode(string));
  } catch (error) {
    console.log(error);
    alert(error);
  }
}

async function microBitConnect() {
  try {
    console.log("Requesting Bluetooth Device...");
    uBitDevice = await navigator.bluetooth.requestDevice({
      filters: [{ namePrefix: "BBC micro:bit" }],
      optionalServices: [UART_SERVICE_UUID]
    });

    console.log("Connecting to GATT Server...");
    const server = await uBitDevice.gatt.connect();

    console.log("Getting Service...");
    const service = await server.getPrimaryService(UART_SERVICE_UUID);

    console.log("Getting Characteristics...");
    const txCharacteristic = await service.getCharacteristic(
      UART_TX_CHARACTERISTIC_UUID
    );
    txCharacteristic.startNotifications();
    txCharacteristic.addEventListener(
      "characteristicvaluechanged",
      onTxCharacteristicValueChanged
    );
    rxCharacteristic = await service.getCharacteristic(
      UART_RX_CHARACTERISTIC_UUID
    );
  } catch (error) {
    console.log(error);
  }
}

function microBitDisconnect() {
  if (!uBitDevice) {
    return;
  }

  if (uBitDevice.gatt.connected) {
    uBitDevice.gatt.disconnect();
    console.log("Disconnected");
  }
}


function onTxCharacteristicValueChanged(event) {
  let receivedData = [];
  for (var i = 0; i < event.target.value.byteLength; i++) {
    receivedData[i] = event.target.value.getUint8(i);
  }
  const receivedString = String.fromCharCode.apply(null, receivedData);
  if (typeof microBitReceivedMessage !== 'undefined'){
    microBitReceivedMessage(receivedString);
  }else{
    console.log("microBitReceivedMessage is not defined")
  }
  //console.log(receivedString);
}


window.addEventListener('beforeunload', function(event) {
  // 사용자에게 확인 메시지 표시
  var confirmationMessage = "이 페이지를 떠나시겠습니까?";
  event.returnValue = confirmationMessage; // 브라우저에 확인 메시지 표시
});
