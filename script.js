const app = () => {
    const navigation = document.querySelector("nav");
    const buttons = Array.from(navigation.querySelectorAll("button"));
    const container = document.querySelector("main");

    const handleNavigationClick = (e) => {
        const clickedButton = e.target;
        if (clickedButton.nodeName === "BUTTON") {
            setActive(clickedButton);
        }
    };

    const handleNavigationKeydown = (e) => {
        const focusedButton = document.activeElement;
        if (focusedButton.nodeName === "BUTTON") {
            const currentIndex = buttons.indexOf(focusedButton);
            const isFirstOrLast = e.key === "Home" || e.key === "End";
            const isArrowKey = e.key === "ArrowRight" || e.key === "ArrowLeft";
            if (isFirstOrLast) {
                setActive(buttons[e.key === "Home" ? 0 : buttons.length - 1]);
            } else if (isArrowKey) {
                const newIndex = calculateNewIndex(e.key, currentIndex);
                setActive(buttons[newIndex]);
            }
        }
    };

    const calculateNewIndex = (key, currentIndex) => {
        const offset = key === "ArrowRight" ? 1 : -1;
        return (currentIndex + offset + buttons.length) % buttons.length;
    };

    const setActive = (newActiveButton) => {
        buttons.forEach((button) => button.classList.remove("active"));
        newActiveButton.classList.add("active");
        newActiveButton.focus();
        scrollToTarget(newActiveButton);
    };

    const scrollToTarget = (button) => {
        const targetId = button.dataset.target;
        const targetElement = targetId
            ? document.querySelector(`#${targetId}`)
            : null;
        if (targetElement) {
            const containerOffset = container.getBoundingClientRect().left;
            const targetOffset = targetElement.getBoundingClientRect().left;
            container.scrollTo({
                left: targetOffset - containerOffset + container.scrollLeft,
                behavior: "smooth"
            });
        }
    };

    navigation.addEventListener("click", handleNavigationClick);
    navigation.addEventListener("keydown", handleNavigationKeydown);
};

app();