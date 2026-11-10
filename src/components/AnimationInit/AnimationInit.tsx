import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// @ts-ignore
import $ from 'jquery';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { SplitText } from 'gsap/SplitText';
// @ts-ignore
import PureCounter from '@srexi/purecounterjs';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, EffectFade, FreeMode } from 'swiper/modules';
// @ts-ignore
import imagesLoaded from 'imagesloaded';
// @ts-ignore
import Isotope from 'isotope-layout';
// @ts-ignore
import { jarallax } from 'jarallax';

// Registrar plugins de GSAP
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin, SplitText);

declare global {
    interface Window {
        $: any;
        jQuery: any;
        gsap: any;
        ScrollTrigger: any;
        ScrollSmoother: any;
        PureCounter: any;
        Swiper: any;
        jarallax: any;
        Isotope: any;
        imagesLoaded: any;
    }
}

const AnimationInit = () => {
    const location = useLocation();

    useEffect(() => {
        // ONE-TIME INITIALIZATION
        window.$ = window.jQuery = $;
        window.Swiper = Swiper;
        window.imagesLoaded = imagesLoaded;

        // 1. Reemplazo de WOW.js usando GSAP (Solución definitiva al error de getPropertyValue)
        const initAnimations = () => {
            try {
                // Seleccionar todos los elementos con clase .wow
                const wowElements = document.querySelectorAll('.wow');

                wowElements.forEach((el) => {
                    const element = el as HTMLElement;

                    // Asegurar que el elemento sea invisible inicialmente si no tiene la clase animated
                    if (!element.classList.contains('animated')) {
                        gsap.set(element, { visibility: 'hidden' });
                    }

                    const delay = element.getAttribute('data-wow-delay') || '0s';
                    const duration = element.getAttribute('data-wow-duration') || '0.9s';

                    // Convertir delay a segundos para GSAP si es necesario (ej: "0.3s" -> 0.3)
                    const delaySeconds = parseFloat(delay);

                    ScrollTrigger.create({
                        trigger: element,
                        start: "top 90%", // Se activa cuando el tope del elemento llega al 90% del viewport
                        onEnter: () => {
                            // Usar un pequeño delay de GSAP para respetar el data-wow-delay
                            gsap.delayedCall(delaySeconds, () => {
                                element.style.visibility = 'visible';
                                element.style.animationDuration = duration;
                                element.classList.add('animated');
                                // La animación real la maneja el CSS (ej: itfadeUp)
                            });
                        },
                        once: true // Solo se ejecuta una vez
                    });
                });
            } catch (e) {
                console.warn('Error in Animation initialization:', e);
            }
        };

        // Ejecutar con un delay para asegurar que el DOM esté listo
        const animTimer = setTimeout(initAnimations, 500);

        // 2. Inicializar GSAP ScrollSmoother
        if ($('#smooth-wrapper').length && $('#smooth-content').length) {
            ScrollSmoother.create({
                smooth: 2,
                effects: true,
                smoothTouch: 0.1,
                normalizeScroll: false,
                ignoreMobileResize: true,
            });
        }

        // 4. Inicializar Nice Select
        if ($.fn.niceSelect) {
            $('select').niceSelect();
        }

        // 9. Menú Mobile
        if ($('.tv-menu-content').length && $('.tv-menu-mobile').length) {
            const navContent = document.querySelector(".tv-menu-content")?.outerHTML;
            const mobileNavContainer = document.querySelector(".tv-menu-mobile");
            if (navContent && mobileNavContainer) {
                mobileNavContainer.innerHTML = navContent;
                const arrow = $(".tv-menu-mobile .has-dropdown > a");
                arrow.each(function (this: HTMLElement) {
                    const self = $(this);
                    self.on("click", function (this: HTMLElement, e: any) {
                        e.preventDefault();
                        const $link = $(this);
                        $link.toggleClass("expanded");
                        $link.parent().addClass("dropdown-opened").siblings().removeClass("dropdown-opened");
                        $link.parent().children(".tv-submenu").slideToggle();
                    });
                });
            }
        }

        // 10. Sidebar y Búsqueda
        $(".tv-menu-bar").on("click", function () {
            $(".itoffcanvas").addClass("opened");
            $(".body-overlay").addClass("apply");
        });
        $(".close-btn, .body-overlay").on("click", function () {
            $(".itoffcanvas").removeClass("opened");
            $(".body-overlay").removeClass("apply");
        });

        $(".search-open-btn").on("click", function () {
            $(".search__popup").addClass("search-opened");
        });
        $(".search-close-btn").on("click", function () {
            $(".search__popup").removeClass("search-opened");
        });

        // 8. Scroll to target
        $(window).on('scroll', function () {
            const scroll = $(window).scrollTop();
            if (scroll && scroll < 500) {
                $('.scroll-to-target').removeClass('open');
            } else {
                $('.scroll-to-target').addClass('open');
            }
        });

        if ($('.scroll-to-target').length) {
            $(".scroll-to-target").on('click', function (this: HTMLElement) {
                const target = $(this).attr('data-target');
                if (target) {
                    $('html, body').animate({
                        scrollTop: $(target).offset()?.top
                    }, 1000);
                }
            });
        }

        return () => {
            clearTimeout(animTimer);
            $(window).off('scroll');
            $(".tv-menu-bar, .close-btn, .body-overlay, .search-open-btn, .search-close-btn, .scroll-to-target").off("click");
        };
    }, []);

    useEffect(() => {
        // ROUTE-SPECIFIC UPDATES
        const updateOnRouteChange = () => {
            ScrollTrigger.refresh();

            try {
                if ($(".purecounter").length) {
                    new PureCounter({
                        filesizing: true,
                        selector: ".filesizecount",
                        pulse: 2,
                    });
                    new PureCounter();
                }
            } catch (e) {
                console.warn('Error initializing PureCounter:', e);
            }

            if ($.fn.magnificPopup) {
                $('.popup-image').magnificPopup({
                    type: 'image',
                    gallery: { enabled: true }
                });

                $('.popup-video').magnificPopup({
                    type: 'iframe',
                    mainClass: 'mfp-fade',
                    removalDelay: 160,
                    preloader: false,
                    fixedContentPos: false
                });
            }

            $('.grid').each(function (this: HTMLElement) {
                const $grid = $(this);
                imagesLoaded(this, function () {
                    const iso = new Isotope($grid[0], {
                        itemSelector: '.grid-item',
                        percentPosition: true,
                        masonry: { columnWidth: '.grid-item' },
                    });
                    $('.masonary-menu').on('click', 'button', function (this: HTMLElement) {
                        const filterValue = $(this).attr('data-filter');
                        iso.arrange({ filter: filterValue || '*' });
                    });
                    $('.masonary-menu button').on('click', function (this: HTMLElement, event: any) {
                        $(this).siblings('.active').removeClass('active');
                        $(this).addClass('active');
                        event.preventDefault();
                    });
                });
            });

            $("[data-background]").each(function (this: HTMLElement) {
                $(this).css("background-image", "url(" + $(this).attr("data-background") + ")");
            });

            $("[data-width]").each(function (this: HTMLElement) {
                $(this).css("width", $(this).attr("data-width") || "");
            });

            $("[data-height]").each(function (this: HTMLElement) {
                $(this).css("height", $(this).attr("data-height") || "");
            });

            $("[data-bg-color]").each(function (this: HTMLElement) {
                $(this).css("background-color", $(this).attr("data-bg-color") || "");
            });

            if ($('.jarallax').length > 0) {
                jarallax(document.querySelectorAll('.jarallax'), { speed: 0.3 });
            }

            initCustomGsap();
            initSwipers();
        };

        const initCustomGsap = () => {
            if (document.querySelector(".plan-down")) {
                gsap.timeline({
                    scrollTrigger: {
                        trigger: ".plan-down",
                        start: "top 70%",
                        end: "bottom 0%",
                        scrub: 2,
                    }
                }).fromTo(".plan-down", { x: 200, y: -80 }, { x: -100, y: 0, duration: 1.6 });
            }

            if (document.querySelector(".plan-down2")) {
                gsap.timeline({
                    scrollTrigger: {
                        trigger: ".plan-down2",
                        start: "top 70%",
                        end: "bottom 0%",
                        scrub: 2,
                    }
                }).fromTo(".plan-down2", { x: -200, y: -80 }, { x: 100, y: 0, duration: 1.6 });
            }

            const vehicles = [
                { sel: ".truck", xFrom: 0, xTo: 200 },
                { sel: ".train", xFrom: 0, xTo: -100 },
                { sel: ".ship", xFrom: 100, xTo: -100 }
            ];

            vehicles.forEach(v => {
                if (document.querySelector(v.sel)) {
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: v.sel,
                            start: "top 70%",
                            end: "bottom 0%",
                            scrub: 2,
                        }
                    }).fromTo(v.sel, { x: v.xFrom }, { x: v.xTo, duration: 1.2 });
                }
            });

            if (document.querySelector(".zoom-img img")) {
                gsap.timeline({
                    scrollTrigger: {
                        trigger: ".zoom-img img",
                        scrub: 2,
                    }
                }).fromTo(".zoom-img img", { scale: 1 }, { scale: 1.5, duration: .5 });
            }

            if ($('.tv-hero-thumb-wrap').length > 0) {
                ScrollTrigger.create({
                    trigger: ".tv-hero-thumb-wrap",
                    start: "top 65",
                    end: "bottom 0%",
                    pin: ".tv-hero-thumb",
                    pinSpacing: false,
                });
            }

            if ($('.tv-spltv-text').length > 0) {
                $(".tv-spltv-text").each(function (this: HTMLElement) {
                    const el = this;
                    const split = new SplitText(el, {
                        type: "lines,words,chars",
                        linesClass: "tv-spltv-line"
                    });
                    gsap.set(el, { perspective: 400 });

                    let fromVars: any = { opacity: 0 };
                    if ($(el).hasClass('tv-spltv-in-right')) fromVars.x = 50;
                    if ($(el).hasClass('tv-spltv-in-left')) fromVars.x = -50;
                    if ($(el).hasClass('tv-spltv-in-up')) fromVars.y = 80;
                    if ($(el).hasClass('tv-spltv-in-down')) fromVars.y = -80;

                    gsap.set(split.chars, fromVars);

                    gsap.to(split.chars, {
                        scrollTrigger: {
                            trigger: el,
                            start: "top 90%",
                        },
                        x: 0, y: 0, rotateX: 0, scale: 1, opacity: 1,
                        duration: 0.4,
                        stagger: 0.02,
                    });
                });
            }
        };

        const initSwipers = () => {
            if (document.querySelector(".tv-text-slider-active")) {
                new Swiper(".tv-text-slider-active", {
                    modules: [Autoplay, FreeMode],
                    loop: true,
                    // @ts-ignore
                    freeMode: true,
                    slidesPerView: 'auto',
                    spaceBetween: 0,
                    centeredSlides: true,
                    allowTouchMove: false,
                    speed: 2500,
                    autoplay: { delay: 1, disableOnInteraction: true },
                });
            }

            if (document.querySelector(".tv-brand-active")) {
                new Swiper(".tv-brand-active", {
                    modules: [Autoplay, FreeMode],
                    loop: true,
                    // @ts-ignore
                    freeMode: true,
                    slidesPerView: 'auto',
                    spaceBetween: 85,
                    centeredSlides: true,
                    allowTouchMove: false,
                    speed: 2500,
                    autoplay: { delay: 1, disableOnInteraction: true },
                });
            }

            if (document.querySelector('.tv-slider-active')) {
                new Swiper('.tv-slider-active', {
                    modules: [Autoplay, EffectFade, Pagination],
                    slidesPerView: 1,
                    loop: true,
                    effect: 'fade',
                    autoplay: { delay: 4500 },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                        renderBullet: function (index, className) {
                            return '<span class="' + className + '">' + (index + 1) + '</span>';
                        },
                    },
                });
            }

            if (document.querySelector('.tv-testi-slider-active')) {
                new Swiper('.tv-testi-slider-active', {
                    modules: [Autoplay, Navigation, Pagination],
                    speed: 1000,
                    loop: true,
                    slidesPerView: 1,
                    spaceBetween: 30,
                    autoplay: { delay: 4500, disableOnInteraction: false },
                    navigation: {
                        prevEl: '.arrow-prev, .testi-arrow-prev',
                        nextEl: '.arrow-next, .testi-arrow-next',
                    },
                    pagination: { el: '.swiper-pagination', clickable: true },
                });
            }

            if (document.querySelector('.tv-team-slide-active')) {
                new Swiper('.tv-team-slide-active', {
                    modules: [Autoplay, Navigation, Pagination],
                    speed: 1500,
                    loop: true,
                    direction: 'horizontal',
                    slidesPerView: 1,
                    spaceBetween: 35,
                    autoplay: { delay: 4500, reverseDirection: true },
                    navigation: { prevEl: '.arrow-prev', nextEl: '.arrow-next' },
                    pagination: {
                        el: ".tv-team-pagination",
                        clickable: true,
                        renderBullet: function (index, className) {
                            const images = [
                                "assets/img/team/team-1-1.png",
                                "assets/img/team/team-1-2.png",
                                "assets/img/team/team-1-3.png"
                            ];
                            return `<span class="${className}"><img src="${images[index]}" alt="Thumb ${index + 1}"></span>`;
                        }
                    },
                });
            }
        };

        const timer = setTimeout(updateOnRouteChange, 100);
        return () => clearTimeout(timer);
    }, [location.pathname]);

    return null;
};

export default AnimationInit;
