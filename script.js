"use strict";


/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");

menuBtn.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("open");

    menuBtn.setAttribute("aria-expanded", String(isOpen));

});


/* Close menu after selecting a section */

navItems.forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuBtn.setAttribute("aria-expanded", "false");

    });

});


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(

    (entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);

revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections = document.querySelectorAll("section[id]");

const sectionObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                const currentId = entry.target.getAttribute("id");

                navItems.forEach((link) => {

                    link.classList.remove("active");

                    const href = link.getAttribute("href");

                    if (href === `#${currentId}`) {
                        link.classList.add("active");
                    }

                });

            }

        });

    },

    {
        rootMargin: "-35% 0px -55% 0px"
    }

);

sections.forEach((section) => {

    sectionObserver.observe(section);

});


/* =========================
   HERO MOUSE MOVEMENT
========================= */

const heroVisual = document.querySelector(".hero-visual");

if (heroVisual) {

    heroVisual.addEventListener("mousemove", (event) => {

        const rect = heroVisual.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) / rect.width - 0.5;

        const y =
            (event.clientY - rect.top) / rect.height - 0.5;

        heroVisual.style.transform =
            `translate(${x * 10}px, ${y * 10}px)`;

    });

    heroVisual.addEventListener("mouseleave", () => {

        heroVisual.style.transform = "translate(0, 0)";

    });

}


/* =========================
   PROJECT HOVER
========================= */

const projectCards =
    document.querySelectorAll(".project-card");

projectCards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        const rect = card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const rotateX =
            ((y / rect.height) - 0.5) * -4;

        const rotateY =
            ((x / rect.width) - 0.5) * 4;

        card.style.transform =
            `perspective(800px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-6px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


/* =========================
   CURRENT YEAR
========================= */

const yearElement =
    document.getElementById("year");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================
   BUTTON RIPPLE EFFECT
========================= */

const buttons =
    document.querySelectorAll(".btn");

buttons.forEach((button) => {

    button.addEventListener("click", function () {

        this.classList.remove("clicked");

        // Force browser reflow so animation can restart.
        void this.offsetWidth;

        this.classList.add("clicked");

    });

});


/* =========================
   PREVENT ACCIDENTAL EMPTY LINKS
========================= */

document.querySelectorAll('a[href="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

        event.preventDefault();

    });

});

/* ================================
   CONTACT POPUP
================================ */

const openContact = document.getElementById("openContact");
const closeContact = document.getElementById("closeContact");
const contactOverlay = document.getElementById("contactOverlay");

if (openContact && contactOverlay) {

    openContact.addEventListener("click", () => {
        contactOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
    });

}

if (closeContact) {

    closeContact.addEventListener("click", () => {
        contactOverlay.classList.remove("active");
        document.body.style.overflow = "";
    });

}


/* CLOSE WHEN CLICKING OUTSIDE */

if (contactOverlay) {

    contactOverlay.addEventListener("click", (event) => {

        if (event.target === contactOverlay) {
            contactOverlay.classList.remove("active");
            document.body.style.overflow = "";
        }

    });

}


/* CLOSE WITH ESCAPE KEY */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        contactOverlay?.classList.remove("active");

        document.body.style.overflow = "";

    }

});

/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("active");

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        revealElements.forEach((element) => {
            observer.observe(element);
        });

    } else {

        /* Fallback for older browsers */
        revealElements.forEach((element) => {
            element.classList.add("active");
        });

    }

});