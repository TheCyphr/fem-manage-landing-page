document.addEventListener('DOMContentLoaded', () => {
    createNavToggleEventHandler();
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

function setUpCarousel() {
    let carousel = document.querySelector(".carousel");
    let itemSelector = document.createElement("div");
    itemSelector.classList.add("item-selector");

    for (let i = 0; i < carousel.children.length; i++) {
        let button = document.createElement("button");

        if (i === 0){
            button.classList.add("is-active");
        }

        button.addEventListener("click", () => {
            button.classList.add("is-active");
            carousel.querySelector("button.active").classList.remove("is-active");
        })
        itemSelector.append(button);
    }

    
}