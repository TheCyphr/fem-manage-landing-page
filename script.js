document.addEventListener('DOMContentLoaded', () => {
    createNavToggleEventHandler();
    initCarousel();
});

function createNavToggleEventHandler() {
    let overlay;
    const menu = document.querySelector(".menu-items");
    const button = document.querySelector(".nav-toggle");

    button.addEventListener("click", () => {
        const isDisplayed = menu.classList.toggle("d-none");
        menu.ariaExpanded = String(!isDisplayed);
        button.classList.toggle("is-active");

        if (!isDisplayed) {
            overlay = overlay || (function(){
                let el = document.createElement('div');
                el.classList.add("overlay");
                el.addEventListener("click", () => {
                    const isDisplayed = menu.classList.toggle("d-none");
                    menu.ariaExpanded = String(!isDisplayed);
                    button.classList.toggle("is-active");
                    el.remove();
                    overlay = null;
                })

                return el;
            })();

            document.body.appendChild(overlay);
        }
        else {
            document.body.removeChild(overlay);
        }
    });
}

function initCarousel() {
    const carousel = document.querySelector(".carousel");
    const buttonWrapper = document.createElement("div");
    buttonWrapper.classList.add("button-wrapper");

    let activeButton = undefined;
    const INDEX_OFFSET = 2;

    for (let i = 0; i < carousel.children.length; i++) {
        const childDiv = carousel.children[i];
        childDiv.style.gridColumnStart = "" + (i + INDEX_OFFSET);
        const button = document.createElement("button");

        if (i === 0){
            button.classList.add("is-active");
            activeButton = button;
        }

        button.addEventListener("click", () => {
            activeButton.classList.toggle("is-active");
            button.classList.toggle("is-active");
            activeButton = button;
            updateOrder(i);
        })
        buttonWrapper.append(button);
    }

    carousel.after(buttonWrapper);

    function updateOrder(index){
        for (let i = 0; i < carousel.children.length; i++) {
            const childDiv = carousel.children[i];
            childDiv.style.gridColumnStart = String(carouselClamp(i - index + INDEX_OFFSET));
        }
    }

    function carouselClamp(number){
        return clamp(number, 1, 3);
    }
}

function clamp(number, min, max) {
    return Math.max(min, Math.min(number, max));
}

