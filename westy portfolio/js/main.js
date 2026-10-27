document.documentElement.classList.add("js");

        const menuButton = document.querySelector(".menu-toggle");
        const navigation = document.querySelector(".nav-links");

        menuButton.addEventListener("click", () => {
            const isOpen = menuButton.getAttribute("aria-expanded") === "true";
            menuButton.setAttribute("aria-expanded", String(!isOpen));
            menuButton.setAttribute("aria-label", isOpen ? "Відкрити меню" : "Закрити меню");
            navigation.classList.toggle("is-open", !isOpen);
        });

        navigation.addEventListener("click", (event) => {
            if (event.target.closest("a")) {
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.setAttribute("aria-label", "Відкрити меню");
                navigation.classList.remove("is-open");
            }
        });

        const revealItems = document.querySelectorAll(".reveal");
        if ("IntersectionObserver" in window) {
            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.14 });
            revealItems.forEach((item) => revealObserver.observe(item));
        } else {
            revealItems.forEach((item) => item.classList.add("is-visible"));
        }

        const heroArt = document.querySelector(".hero-art");
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (heroArt && !reducedMotion.matches && window.matchMedia("(pointer: fine)").matches) {
            heroArt.addEventListener("pointermove", (event) => {
                const bounds = heroArt.getBoundingClientRect();
                const x = (event.clientX - bounds.left) / bounds.width - 0.5;
                const y = (event.clientY - bounds.top) / bounds.height - 0.5;
                heroArt.style.setProperty("--rx", `${-y * 9}deg`);
                heroArt.style.setProperty("--ry", `${x * 11}deg`);
            });
            heroArt.addEventListener("pointerleave", () => {
                heroArt.style.setProperty("--rx", "0deg");
                heroArt.style.setProperty("--ry", "0deg");
            });
        }
