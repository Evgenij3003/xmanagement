/*==========================================================================================================================================================================*/
/* Проверка устройства, на котором открыта страница */
const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    }
};


function isIE() {
    let ua = navigator.userAgent;
    var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    return is_ie;
}
if (isIE()) {
    document.querySelector("body").classList.add("ie");
}
if (isMobile.any()) {
    document.querySelector("body").classList.add("_touch");
}


function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
    if (support == true) {
        document.querySelector("body").classList.add("_webp");
    } else {
        document.querySelector("body").classList.add("_no-webp");
    }
});



/*==================================================================================================================================================================*/
/* Функции Анимации */
let _slideUp = (target, duration = 500, visibleHeight = 0) => {
    if (!target.classList.contains("_slide")) {
        target.classList.add("_slide");
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + "ms";
        target.style.height = `${target.offsetHeight}px`;
        target.offsetHeight;
        target.style.overflow = "hidden";
        target.style.height = visibleHeight ? `${visibleHeight}px` : `0px`;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.hidden = !visibleHeight ? true : false;
            !visibleHeight ? target.style.removeProperty("height") : null;
            target.style.removeProperty("padding-top");
            target.style.removeProperty("padding-bottom");
            target.style.removeProperty("margin-top");
            target.style.removeProperty("margin-bottom");
            !visibleHeight ? target.style.removeProperty("overflow") : null;
            target.style.removeProperty("transition-duration");
            target.style.removeProperty("transition-property");
            target.classList.remove("_slide");
            document.dispatchEvent(new CustomEvent("slideUpDone", {
                detail: {
                    target: target
                }
            }));
        }, duration);
    }
}


let _slideDown = (target, duration = 500, visibleHeight = 0, addHeight = 0) => {
    if (!target.classList.contains("_slide")) {
        let height;
        target.classList.add("_slide");
        target.hidden = target.hidden ? false : null;
        visibleHeight ? target.style.removeProperty("height") : null;
        addHeight ? height = visibleHeight + addHeight : height = target.offsetHeight;
        target.style.overflow = "hidden";
        target.style.height = visibleHeight ? `${visibleHeight}px` : `0px`;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + "ms";
        target.style.height = height + "px";
        target.style.removeProperty("padding-top");
        target.style.removeProperty("padding-bottom");
        target.style.removeProperty("margin-top");
        target.style.removeProperty("margin-bottom");
        window.setTimeout(() => {
            if (!addHeight) {
                target.style.removeProperty("height");
                target.style.removeProperty("overflow");
            }
            target.style.removeProperty("transition-duration");
            target.style.removeProperty("transition-property");
            target.classList.remove("_slide");
            document.dispatchEvent(new CustomEvent("slideDownDone", {
                detail: {
                    target: target
                }
            }));
        }, duration);
    }
}


let _slideToggle = (target, duration = 500) => {
    if (target.hidden) {
        return _slideDown(target, duration);
    } else {
        return _slideUp(target, duration);
    }
}



/*==========================================================================================================================================================================*/
/* Preloader & Scroll Onload */
window.addEventListener("load", function(e) {
    const preloader = document.querySelector(".preloader");
    preloader ? preloader.classList.add("hide") : null;
    setTimeout(() => {
        preloader.style.display = "none";
    }, 500);


    // "Клик" по карточке слайдера "команда":
    if (document.querySelector(".slide-team")) {
        const slidesTeam = document.querySelectorAll(".slide-team");
        slidesTeam.forEach(slideTeam => {  
            slideTeam.addEventListener("click", function(e) {
                const currentCard = slideTeam.getAttribute("data-scroll-elem");
                currentCard ? localStorage.setItem("current-card", currentCard) : null;
            });
        });
    }


    // "Клик" по карточке создатель на мобильных:
    if (document.querySelector(".owner-team")) {
        const ownerTeam = document.querySelector(".owner-team__image");
        if (ownerTeam) {
            ownerTeam.addEventListener("touchend", function(e) {
                const currentCard = ownerTeam.getAttribute("data-scroll-elem");
                currentCard ? localStorage.setItem("current-card", currentCard) : null;
            });
        }
    }


    // "Клик" по карточке "команда" на мобильных:
    if (document.querySelector(".team__community")) {
        const teamItems = document.querySelectorAll(".team__image");
        if (teamItems) {
            teamItems.forEach(teamItem => {  
                teamItem.addEventListener("touchend", function(e) {
                    const currentCard = teamItem.getAttribute("data-scroll-elem");
                    currentCard ? localStorage.setItem("current-card", currentCard) : null;
                });
            });
        }
    }


    // "Клик" по логотипу в header:
    if (document.querySelector(".header__logo a")) {
        const logoLink = document.querySelector(".header__logo a");
        logoLink.addEventListener("click", function(e) {
            localStorage.removeItem("current-card");
        });
    };


    // "Клик" по ссылке в меню:
    if (document.querySelector(".menu-header__link")) {
        const menuLinks = document.querySelectorAll(".menu-header__link");
        menuLinks.forEach(menuLink => {
            menuLink.addEventListener("click", function(e) {
                localStorage.removeItem("current-card");
            });
        });
    };


    // "Клик" по кнопке "читать полностью" в блоке "Статьи" на главной странице:
    if (document.querySelector(".articles")) {
        const articleButtons = document.querySelectorAll(".item-article__button a");
        articleButtons.forEach(articleButton => {
            if (!document.body.classList.contains("_touch")) {
                articleButton.addEventListener("click", function(e) {
                    const currentCard = articleButton.getAttribute("data-scroll-elem");
                    currentCard ? localStorage.setItem("current-card", currentCard) : null;
                });
            } else {
                articleButton.addEventListener("touchend", function(e) {
                    const currentCard = articleButton.getAttribute("data-scroll-elem");
                    currentCard ? localStorage.setItem("current-card", currentCard) : null;
                });
            } 
        });
    }
    
    
    // Скролл к нужному элементу на странице "О нас" после перехода по "клику" на одну из карточек "команда":
    if (document.querySelector("._page-about")) {
        const elemId = localStorage.getItem("current-card");
        if (elemId) {
            const currentElement = document.querySelector(`[data-scroll-id=${elemId}`);
            window.scrollTo({
                top: currentElement.getBoundingClientRect().top - 100,
                behavior: "smooth",
            });
        }
    }
    
    
    // Скролл к нужному элементу на странице "Статьи" после перехода по "клику" на одну из кнопок "читать полностью":
    if (document.querySelector("._page-articles")) {
        const elemId = localStorage.getItem("current-card");
        if (elemId) {
            const currentElement = document.querySelector(`[data-scroll-id=${elemId}`);
            const showmoreElem = currentElement.querySelector("[data-showmore]");
            const showmoreContent = currentElement.querySelector("[data-showmore-content]");
            const showmoreButton = currentElement.querySelector("[data-showmore-button]");
            window.scrollTo({
                top: currentElement.getBoundingClientRect().top - 100,
                behavior: "smooth",
            });
            showmoreElem.classList.add("_showmore-open");
            showmoreButton.innerHTML = showmoreButton.dataset.showmoreButton;
            slideDown(showmoreContent, 500, visibleHeight);
        }
    }



    // Обработка событий "touch" на устройствах с touch-экранами:
    if (document.body.classList.contains("_touch")) {
        // Вешаем на прикосновение функцию handleTouchStart
        menu.addEventListener("touchstart", handleTouchStart, false);  
        // А на движение пальцем по экрану - handleTouchMove      
        menu.addEventListener("touchmove", handleTouchMove, false);
        
        let xDown = null;                                                        
        let yDown = null;                                                        
        
        function handleTouchStart(evt) {                                         
            xDown = evt.touches[0].clientX;                                      
            yDown = evt.touches[0].clientY;                                      
        };                                                
        
        function handleTouchMove(evt) {
            if (!xDown || !yDown) {
                return;
            }
        
            let xUp = evt.touches[0].clientX;                                    
            let yUp = evt.touches[0].clientY;
            let xDiff = xDown - xUp;
            let yDiff = yDown - yUp;
        
            if (Math.abs(xDiff) < Math.abs(yDiff) ) {   
                if (yDiff < 0) {
                    toggleLockBody(true, fixedElements, delay, bodyScrollBar);
                    closeMenu(menu, iconMenu);
                }                  
            }
        
            xDown = null;
            yDown = null;                                             
        };
    };


    function slideDown(target, duration, visibleHeight) {
        let height;
        target.classList.add("_slide");
        target.hidden = target.hidden ? false : null;
        visibleHeight ? target.style.removeProperty("height") : null;
        height = visibleHeight;
        target.style.overflow = "hidden";
        target.style.height = visibleHeight ? `${visibleHeight}px` : `0px`;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + "ms";
        target.style.height = height + "px";
        target.style.removeProperty("padding-top");
        target.style.removeProperty("padding-bottom");
        target.style.removeProperty("margin-top");
        target.style.removeProperty("margin-bottom");
        window.setTimeout(() => {
            target.style.removeProperty("height");
            target.style.removeProperty("overflow");
            target.style.removeProperty("transition-duration");
            target.style.removeProperty("transition-property");
            target.classList.remove("_slide");
            document.dispatchEvent(new CustomEvent("slideDownDone", {
                detail: {
                    target: target
                }
            }));
        }, duration);
    }
});



/*==========================================================================================================================================================================*/
/* Глобальные переменные и константы */
const delay = 500;                                                                      // Задержка при блокировке/разблокировке скролла.
const header = document.querySelector(".header");                                       // Навигационное меню.
const menu = document.querySelector(".menu-header");                                    // Навигационное меню.
const iconMenu = document.querySelector("[aria-controls='menu']");                      // Кнопка открытия/закрытия меню на мобильных устройствах (бургер).
const fixedElements = document.querySelectorAll("[data-fixed]");                        // Объекты с "position: fixed".
let scrollTimeout;
let error = 0;
let lockStatus = false;                                                                 // Статус блокировки действий пользователя в body.
let bodyScrollBar;                                                                      // Скроллер на десктопах.
let scrollBar = {};                                                                     // Элемент скроллера.
let visibleHeight;
let formImageElem;

// Form:
const formContacts = document.querySelector(".form-contacts");
const errorElement = formContacts?.querySelector(".error");
const errorText = errorElement?.querySelector("span");
const contactLabel = formContacts?.querySelector("[data-social-label]");
const socialInput = formContacts?.querySelector("[data-social-input]");

// Notification:
const notification = document.querySelector(".notification");
const notificationText = document.querySelector(".notification__text p");
	


/*==========================================================================================================================================================================*/
/* Делегирование события "клик" на документе */
document.addEventListener("click", function(e) {
    // Закрытие мобильного меню:
    if (document.body.classList.contains("menu-open") && !e.target.closest(".menu-header") && !e.target.closest("[aria-controls='menu']")) {
        toggleLockBody(true, fixedElements, delay, bodyScrollBar);
        closeMenu(menu, iconMenu);
    }
});



/*==========================================================================================================================================================================*/
/* Menu */
if (document.querySelector("[aria-controls='menu']")) {
    iconMenu.addEventListener("click", function (e) {
        if (!document.body.classList.contains("menu-open")) {
            toggleLockBody(false, fixedElements, delay, bodyScrollBar);
            openMenu(menu, iconMenu);
        } else {
            toggleLockBody(true, fixedElements, delay, bodyScrollBar);
            closeMenu(menu, iconMenu);
        }
    });
}


// Функция открытия навигационного меню:
function openMenu(menu, iconMenu) {
    menu.classList.add("open");
    menu.querySelector(".menu-header__link").focus();
    iconMenu.setAttribute("aria-expanded", "true");
    setTimeout(() => {
        document.body.classList.add("menu-open");
    }, 100);
}


// Функция закрытия навигационного меню:
function closeMenu(menu, iconMenu) {
    menu.classList.remove("open");
    iconMenu.setAttribute("aria-expanded", "false");
    setTimeout(() => {
        document.body.classList.remove("menu-open");
    }, 100);
}



/*==========================================================================================================================================================================*/
/* Функции блокировки/разблокировки скролла */
function toggleLockBody(lock, fixedElements, delay = 500, scroller) {
    lock ? unlockBody(fixedElements, delay, scroller) : lockBody(fixedElements, delay, scroller);
}


// Функция блокировки скролла при открытии элемента:
function lockBody(fixedElements, delay, scroller) {
    let body = document.querySelector("body");
    if (!lockStatus) {
        const scrollWidth = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
        if (fixedElements) {
            fixedElements.forEach(fixedElement => {
                fixedElement.style.marginRight = scrollWidth;
            });
        }
        body.style.paddingRight = scrollWidth;
        body.classList.add("lock");
        lockStatus = true;
        (!document.querySelector("._touch") && scroller) ? scrollBarLockToggle() : null;
        setTimeout(function () {
            lockStatus = false;
        }, delay);
    }
}


// Функция разблокировки скролла при закрытии элемента:
function unlockBody(fixedElements, delay, scroller) {
    let body = document.querySelector("body");
    if (!lockStatus) {
        lockStatus = true;
        setTimeout(() => {
            if (fixedElements) {
                fixedElements.forEach(fixedElement => {
                    fixedElement.style.marginRight = "0px";
                });
            }
            body.style.paddingRight = "0px";
            body.classList.remove("lock");
            lockStatus = false;
            (!document.querySelector("._touch") && scroller) ? toggleLockScrollBar(true) : null;
        }, delay);
    }
}


// Функция блокировки/разблокировки подключаемого скроллера:
function toggleLockScrollBar(unlock = false) {
    if (!unlock) {
        bodyScrollBar.containerEl = document.querySelector("#scroller");
        bodyScrollBar.contentEl = document.querySelector("#scroller-elem");
        scrollBar.offset = bodyScrollBar.offset;
        scrollBar.limit = bodyScrollBar.limit;
        scrollBar.scrollTop = bodyScrollBar.scrollTop;
        document.querySelector(".header").style.animation = "none";
        document.querySelector(".header").style.opacity = "1";
        document.querySelector(".header").style.transform = "translate(0, 0)";
    } else {
        bodyScrollBar.containerEl = document.body;
        bodyScrollBar.contentEl = document.querySelector("div.scroll-content");
        bodyScrollBar.offset = scrollBar.offset;
        bodyScrollBar.limit = scrollBar.limit;
        bodyScrollBar.scrollTop = scrollBar.scrollTop;
    }
}



/*==========================================================================================================================================================================*/
/* Swiper */
window.onload = function() {
    function buildSliders() {
        let sliders = document.querySelectorAll("[class*='__swiper-wrapper']:not(.swiper-wrapper)");
        if (sliders) {
            sliders.forEach(slider => {
                slider.parentElement.classList.add("swiper");
                slider.classList.add("swiper-wrapper");
                for (const slide of slider.children) {
                    slide.classList.add("swiper-slide");
                }
            });
        }
    }


    function initSliders() {
        let sliderMain, currentBullet;
        if (document.querySelector(".slider-image")) {
            sliderMain = new Swiper(".slider-image", {
                observer: true,
                observeParents: true,
                watchOverflow: true,
                slidesPerView: 1,
                speed: 1000,
                initialSlide: 0,
                autoplay: {
                    delay: 4000,
                },
                effect: "fade",
                fadeEffect: {
                    crossFade: true
                },
                on: {
                    /*=================================================================*/
                    /* Отключение автопрокрутки в не области наблюдения */
                    init: function (swiper) {
                        const optionsSlider = {
                            root: null,
                            rootMargin: "0px",
                        }

                        let observerMain = new IntersectionObserver((entries, observer) => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                    sliderMain.autoplay.start();
                                } else {
                                    sliderMain.autoplay.stop();
                                }
                            })
                        }, optionsSlider);
                        observerMain.observe(swiper.el);
                    },
                    slideChange: function (swiper) {
                        if (!document.querySelector("._touch") && !swiper.el.classList.contains("_slide")) {
                            swiper.el.classList.add("_slide");
                            setTimeout(() => {
                                swiper.el.classList.remove("_slide");
                            }, swiper.params.speed);
                        }
                    },
                },
                a11y: {
                    enabled: true
                },
                breakpoints: {
                    900: {
                        initialSlide: 0,
                    },
                    320: {
                        initialSlide: 1,
                    }
                },
                thumbs: {
                    swiper: {
                        el: ".thumbs-main",
                        observer: true,
                        observeParents: true,
                        watchOverflow: true,
                        spaceBetween: 20,
                        speed: 1000,
                        slidesPerView: 4,
                        centeredSlides: false,
                        simulateTouch: false,
                        breakpoints: {
                            901: {
                                slidesPerView: 4,
                                centeredSlides: false,
                            },
                            320: {
                                slidesPerView: "auto",
                                centeredSlides: true,
                            }
                        },
                        pagination: {
                            clickable: true,
                            el: ".thumbs-main [data-bullets]",
                            hideOnClick: true,
                            type: "bullets",
                            renderBullet: function (index, className) {
                                return `
                                    <button class=${className} aria-label="перейти к слайду ${index + 1}" data-index="${index}">
                                        <span></span>
                                    </button>
                                `;
                            },
                        },
                        on: {
                            sliderMove: function (swiper) {
                                if (!document.body.classList.contains("_touch") && !sliderMain.el.classList.contains("_slide")) {
                                    sliderMain.el.classList.add("_slide");
                                    sliderMain.autoplay.stop();
                                    setTimeout(() => {
                                        sliderMain.el.classList.remove("_slide");
                                        sliderMain.autoplay.start();
                                    }, swiper.params.speed);
                                }
                            }
                        },                   
                        a11y: {
                            enabled: true,
                        },
                    }
                },
            });  


            /*=========================================================================*/
            /* Обработка "клика" на буллеты */
            const thumbsMain = document.querySelector(".thumbs-main");
            const swiperBullets = thumbsMain.querySelectorAll(".swiper-pagination-bullet");
            for (let i = 0; i < swiperBullets.length; i++) {
                const swiperBullet = swiperBullets[i];
                swiperBullet.addEventListener("click", function (e) {
                    let activeIndex = swiperBullet.getAttribute("data-index");
                    sliderMove(activeIndex);
                })
            };


            /*=========================================================================*/
            /* Обработка события "touchend" на блоке миниатюр */
            thumbsMain.addEventListener("touchend", function() {
                sliderMain.autoplay.stop();
                const activeBullet = thumbsMain.querySelector(".swiper-pagination-bullet-active");
                if (activeBullet !== currentBullet) {
                    let activeIndex = activeBullet.getAttribute("data-index");
                    sliderMain.slideTo(activeIndex);
                    currentBullet = activeBullet;
                    setTimeout(() => {
                        sliderMain.autoplay.start();
                    }, 1000);
                }
            });


            // Функция переключения слайдов:
            function sliderMove(activeIndex) {
                sliderMain.slideTo(activeIndex);
                sliderMain.autoplay.start();
            }


            /*=========================================================================*/
            /* Обработка события наведения мыши на одну из карточек слайдера */
            const thumbs = thumbsMain.querySelectorAll(".swiper-slide");
            thumbs.forEach(thumb => {
                thumb.addEventListener("mouseenter", function(e) {
                    sliderMain.autoplay.stop();
                    sliderEnter(e.target);
                });
                thumb.addEventListener("mouseleave", function(e) {
                    sliderMain.autoplay.start();
                    sliderMain.params.autoplay.delay = 4000;
                });
            });
    
    
            // Функция обработки наведения мышью на одну из карточек слайдера:
            function sliderEnter(thumb) {
                sliderMain.el.classList.add("_slide");	
                const activeSlideIndex = thumb.getAttribute("aria-label")[0];
                sliderMain.slideTo(activeSlideIndex - 1);		
                sliderMain.autoplay.stop();
                setTimeout(() => {
                    sliderMain.el.classList.remove("_slide");	
                }, 1000);
            }
        }


        // Slider Team:
        if (document.querySelector(".slider-team")) {
            let slideWidth, offset, stretchValue;
            const slidesLenght = document.querySelectorAll(".slide-team").length;
            window.innerWidth > 1400 ? slideWidth = 670 : slideWidth = 422;
            window.innerWidth > 1400 ? offset = 120 : offset = 45;
            stretchValue = slideWidth - (offset / slidesLenght);
            const mediaQuery = 1400 / 16;
            const mediaQuerySlider = 850 / 16;
            const matchMedia = window.matchMedia(`(max-width: ${mediaQuery}em)`);
            const matchMediaSlider = window.matchMedia(`(max-width: ${mediaQuerySlider}em)`);
            initSliderTeam();


            function initSliderTeam() {
                let sliderTeam = new Swiper(".slider-team", {
                    observer: true,
                    observeParents: true,
                    watchOverflow: true,
                    speed: 800,
                    effect: "coverflow",
                    grabCursor: true,
                    slidesPerView: "auto",
                    coverflowEffect: {
                        rotate: 0,
                        stretch: stretchValue,
                        depth: 0,
                        slideShadows: false,
                    },
                    navigation: {																		
                        prevEl: ".team [data-arrow-prev]",
                        nextEl: ".team [data-arrow-next]"													
                    },
                    pagination: {
                        el: ".team [data-bullets]",
                        type: "bullets",
                        clickable: true,
                        renderBullet: function (index, className) {
                            return `
                                <button class=${className} aria-label="перейти к слайду ${index + 1}">
                                    <span></span>
                                </button>
                            `;
                        }	
                    },
                    keyboard: {
                        enabled: true,
                        onlyInViewport: true,
                        pageUpDown: true,
                    },
                    a11y: {
                        enabled: true,
                        prevSlideMessage: "Предыдущий слайд",
                        nextSlideMessage: "Следующий слайд"
                    },
                    on: {
                        /*=========================================================================*/
                        /* Расстановка z-index слайдам */
                        init: function (swiper) {
                            const slidesTeam = swiper.el.querySelectorAll(".slide-team");
                            slidesTeam.forEach((slide, index) => {
                                slide.style.zIndex = `50 - ${index} !important`;
                            });
                        },
                        /*=========================================================================*/
                        /* Эффект смены карточек */
                        slideChange: function (swiper) {
                            if (swiper.previousIndex > 0) {
                                for (let index = 0; index < swiper.previousIndex; index++) {
                                    swiper.slides[index].classList.add("slide-prev");
                                }
                            }
                            swiper.slides[swiper.activeIndex].classList.remove("slide-prev");
                        },
                    }
                });


                // Обработка срабатывания брэйкпоинтов:
                matchMedia.addListener(function () {
                    window.innerWidth > 1400 ? slideWidth = 670 : slideWidth = 422;
                    window.innerWidth > 1400 ? offset = 120 : offset = 45;
                    stretchValue = slideWidth - (offset / slidesLenght);
                    sliderTeam.destroy();
                    initSliderTeam();
                });
                matchMediaSlider.addListener(function () {
                    matchMediaSlider.matches ? sliderTeam.destroy() : initSliderTeam();
                });
            }
        }


        // Slider Results:
        if (document.querySelector(".slider-results")) {
            let sliderResults = document.querySelector(".slider-results");
            let slideElements = sliderResults.querySelectorAll(".slider-results__slide");
            let slidesArray = Array.from(slideElements);
            let slideWidth =  slideElements[0].clientWidth;
            initSliderResults();
            
            
            function initSliderResults() {
                let activeIndex = Math.ceil((slideElements.length / 2) - 1);
                new Swiper(".slider-results", {
                    observer: true,
                    observeParents: true,
                    watchOverflow: true,
                    speed: 800,
                    initialSlide: activeIndex,
                    slidesPerView: 1,
                    centeredSlides: true,
                    effect: "creative",
                    creativeEffect: {
                        prev: {
                            translate: ["-50%", "18%", -500],
                            scale: 0.754,
                        },
                        next: {
                            translate: ["50%", "18%", -500],
                            scale: 0.754,
                        }
                    },
                    navigation: {																		
                        prevEl: ".results [data-arrow-prev]",
                        nextEl: ".results [data-arrow-next]"													
                    },
                    pagination: {
                        el: ".results [data-bullets]",
                        type: "bullets",
                        clickable: true,
                        renderBullet: function (index, className) {
                            return `
                                <button class=${className} aria-label="перейти к слайду ${index + 1}">
                                    <span></span>
                                </button>
                            `;
                        }	
                    },
                    keyboard: {
                        enabled: true,
                        onlyInViewport: true,
                        pageUpDown: true,
                    },
                    a11y: {
                        enabled: true,
                        prevSlideMessage: "Предыдущий слайд",
                        nextSlideMessage: "Следующий слайд"
                    },
                    breakpoints: {
                        1200: {
                            creativeEffect: {
                                prev: {
                                    translate: ["-50%", "17%", -500],
                                    scale: 0.754,
                                },
                                next: {
                                    translate: ["50%", "17%", -500],
                                    scale: 0.754,
                                }
                            },
                        },
                        768: {
                            creativeEffect: {
                                prev: {
                                    translate: ["-40%", "25%", -500],
                                    scale: 0.6,
                                },
                                next: {
                                    translate: ["40%", "25%", -500],
                                    scale: 0.6,
                                }
                            },
                        },
                        320: {
                            creativeEffect: {
                                prev: {
                                    translate: ["-40%", "23.5%", -500],
                                    scale: 0.6,
                                },
                                next: {
                                    translate: ["40%", "23.5%", -500],
                                    scale: 0.6,
                                }
                            },
                        }
                    },
                });
            }
        }


        // Slider Rates:
        if (document.querySelector(".slider-rates")) {
            let sliderRates = new Swiper(".slider-rates", {
                observer: true,
                observeParents: true,
                watchOverflow: true,
                slidesPerView: 4,
                speed: 1000,
                spaceBetween: 20,
                pagination: {
                    el: ".rates [data-bullets]",
                    type: "bullets",
                    clickable: true,
                    renderBullet: function (index, className) {
                        return `
                            <button class=${className} aria-label="перейти к слайду ${index + 1}">
                                <span></span>
                            </button>
                        `;
                    }	
                },
                a11y: {
                    enabled: true
                },
                breakpoints: {
                    941: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    320: {
                        spaceBetween: 10,
                        slidesPerView: "auto",
                    }
                },
            });


            // Скрыть буллеты, если слайдов 4 или меньше:
            const slideRates = document.querySelectorAll(".slide-rates");
            const ratesBullets = document.querySelector(".rates [data-bullets]");
            if (window.innerWidth > 940) {
                showBullets(); 
            }
    
            function showBullets() {
                if (window.innerWidth > 940) {
                    slideRates.length >= 4 ? ratesBullets.style.display = "none" : ratesBullets.style.display = "flex";
                } else {
                    ratesBullets.style.display = "flex";
                }
            }
            window.addEventListener("orientationchange", showBullets);
            window.addEventListener("resize", showBullets);
        }
    }
    buildSliders();
    initSliders();
}



/*==================================================================================================================================================================*/
/* Scroll Header */
if (document.querySelector("header[data-scroll]")) {
    const header = document.querySelector("header");
    const headerBody = document.querySelector(".header__body");
    const headerHeight = Number(header.offsetHeight);
    const isShow = header.hasAttribute("data-scroll-show") ? true : false;
    let scrollPoint = header.dataset.scroll ? header.dataset.scroll : 1;
    let scrollTop = window.scrollY;
    let scrollValue, scrollDirection, showPoint, showTimer, timer;
    scrollPoint === "header" ? scrollPoint = headerHeight : null;

    if (isShow) {
        showPoint = header.dataset.scrollShow ? header.dataset.scrollShow : 1;
        showPoint === "header" ? showPoint = headerHeight * 4 : null;
        if (header.hasAttribute("data-show-timer")) {
            showTimer = header.dataset.showTimer ? header.dataset.showTimer : 500;
        }
    }

    scrollHeader();


    // Функция анимации header при скролле:
    function scrollHeader() {
        if (scrollTop > scrollPoint) {
            !header.classList.contains("scroll") ? header.classList.add("scroll") : null;
        } else {
            header.classList.contains("scroll") ? header.classList.remove("scroll") : null;
        }

        
        // Если имеется атрибут "data-scroll-show":
        if (isShow) {
            // Если срабатывает триггер показа header или прокрутка документа больше этой точки срабатывания:
            if (scrollTop >= showPoint) {
                // Скролл вниз:
                if (scrollDirection === "down") {
                    header.classList.contains("show") ? header.classList.remove("show") : null;

                // Скролл вверх:
                } else {
                    !header.classList.contains("show") ? header.classList.add("show") : null;
                }

                // Если имеется атрибут "data-show-timer" ==> по истечении времени таймера скрываем header:
                if (showTimer) {
                    timer = setTimeout(() => {
                        header.classList.contains("show") ? header.classList.remove("show") : null;
                    }, showTimer);
                }

            // Если срабатывает триггер скрытия header или прокрутка документа меньше этой точки срабатывания:
            } else {
                !header.classList.contains("show") ? header.classList.add("show") : null;
            }
        }
    }


    window.addEventListener("scroll", function (e) {
        scrollTop = window.scrollY;
        clearTimeout(timer);
        scrollDirection = scrollTop < scrollValue ? "up" : "down";
        scrollValue = scrollTop;
        scrollHeader();
        scrollMenuBurger(scrollDirection);
    });
}


// Функция показа/скрытия мобильного бургера:
function scrollMenuBurger(scrollDirection) {
    if (scrollDirection === "up") {
        !iconMenu.classList.contains("slide") ? iconMenu.classList.add("show") : null;
        iconMenu.classList.add("slide");
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            iconMenu.classList.remove("slide");
        }, 500);
        setTimeout(() => {
            !iconMenu.classList.contains("slide") && iconMenu.classList.contains("show") ? iconMenu.classList.remove("show") : null;
        }, 1500);
    } else {
        iconMenu.classList.contains("show") ? iconMenu.classList.remove("show") : null;
    }
}



/*==========================================================================================================================================================================*/
/* Динамический Адаптив */
function dynamicAdapt(type) {
    this.type = type;
}


// Функция адаптива:
dynamicAdapt.prototype.init = function () {
    const _this = this;		
    this.оbjects = [];													                // Массив объектов.
    this.daClassname = "_dynamic_adapt_";	
    this.nodes = document.querySelectorAll("[data-da]");							    // Массив DOM-элементов.
    for (let i = 0; i < this.nodes.length; i++) {									    // Наполнение оbjects объектами.
        const node = this.nodes[i];
        const data = node.dataset.da.trim();
        const dataArray = data.split(",");
        const оbject = {};
        оbject.element = node;
        оbject.parent = node.parentNode;
        оbject.destination = document.querySelector(dataArray[0].trim());
        оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "47.99875";
        оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
        оbject.index = this.indexInParent(оbject.parent, оbject.element);
        this.оbjects.push(оbject);
    }
    this.arraySort(this.оbjects);
    this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {	    // Массив уникальных медиа-запросов.
        return "(" + this.type + "-width: " + item.breakpoint + "em)," + item.breakpoint;
    }, this);
    this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
        return Array.prototype.indexOf.call(self, item) === index;
    });
    for (let i = 0; i < this.mediaQueries.length; i++) {						        // Навешивание слушателя на медиа-запрос и вызов обработчика при первом запуске.
        const media = this.mediaQueries[i];										           
        const mediaSplit = String.prototype.split.call(media, ",");
        const matchMedia = window.matchMedia(mediaSplit[0]);
        const mediaBreakpoint = mediaSplit[1];			
        const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {       // Массив объектов с подходящим брейкпоинтом.
            return item.breakpoint === mediaBreakpoint;
        });
        matchMedia.addListener(function () {
            _this.mediaHandler(matchMedia, оbjectsFilter);
        });
        this.mediaHandler(matchMedia, оbjectsFilter);
    }
};


// Функция перемещения:
dynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
    if (matchMedia.matches) {
        for (let i = 0; i < оbjects.length; i++) {
            const оbject = оbjects[i];
            оbject.index = this.indexInParent(оbject.parent, оbject.element);
            this.moveTo(оbject.place, оbject.element, оbject.destination);
        }
    } else {
        for (let i = 0; i < оbjects.length; i++) {
            const оbject = оbjects[i];
            if (оbject.element.classList.contains(this.daClassname)) {
                this.moveBack(оbject.parent, оbject.element, оbject.index);
            }
        }
    }
};


// Функция перемещения:
dynamicAdapt.prototype.moveTo = function (place, element, destination) {
    element.classList.add(this.daClassname);
    if (place === "last" || place >= destination.children.length) {
        destination.insertAdjacentElement("beforeend", element);
        return;
    }
    if (place === "first") {
        destination.insertAdjacentElement("afterbegin", element);
        return;
    }
    destination.children[place].insertAdjacentElement("beforebegin", element);
}


// Функция возврата:
dynamicAdapt.prototype.moveBack = function (parent, element, index) {
    element.classList.remove(this.daClassname);
    if (parent.children[index] !== undefined) {
        parent.children[index].insertAdjacentElement("beforebegin", element);
    } else {
        parent.insertAdjacentElement("beforeend", element);
    }
}


// Функция получения индекса внутри родителя:
dynamicAdapt.prototype.indexInParent = function (parent, element) {
    const array = Array.prototype.slice.call(parent.children);
    return Array.prototype.indexOf.call(array, element);
};


// Функция сортировки массива по breakpoint и place по возрастанию для this.type = min по убыванию для this.type = max:
dynamicAdapt.prototype.arraySort = function (arr) {
    if (this.type === "min") {
        Array.prototype.sort.call(arr, function (a, b) {
            if (a.breakpoint === b.breakpoint) {
                if (a.place === b.place) {
                    return 0;
                }
                if (a.place === "first" || b.place === "last") {
                    return -1;
                }	
                if (a.place === "last" || b.place === "first") {
                    return 1;
                }
                return a.place - b.place;
            }	
            return a.breakpoint - b.breakpoint;
        });
    } else {
        Array.prototype.sort.call(arr, function (a, b) {
            if (a.breakpoint === b.breakpoint) {
                if (a.place === b.place) {
                    return 0;
                }	
                if (a.place === "first" || b.place === "last") {
                    return 1;
                }
                if (a.place === "last" || b.place === "first") {
                    return -1;
                }
                return b.place - a.place;
            }	
            return b.breakpoint - a.breakpoint;
        });
        return;
    }
};
const da = new dynamicAdapt("max");
da.init();



/*==================================================================================================================================================================*/
/* Класс Showmore */
class ShowMore {
    constructor(props, options) {
        // Классы:
        this.showmoreClasses = {
            classShowMoreOpen: "_showmore-open"                                 // Объект "showMore" полностью раскрыт.
        }

        // Аттрибуты:
        this.showmoreAttributes = {
            attributeShowMore: "data-showmore",                                 /* Атрибут объекта "showMore" */
            attributeShowMoreSpeed: "data-showmore-speed",                      // Скорость анимации открытия/скрытия контента "showMore" (мс).
            attributeShowMoreMedia: "data-showmore-media",                      /* Атрибут для медиа-запроса срабатывания функционала "showMore". Имеет три значения:
                                                                                    1. Тип медиа-запроса ("max" - max-width, "min" - min-width).
                                                                                    2. Величина брэйкпоинта медиа-запроса (любое число).
                                                                                    3. Единица измерения брэйкпоинта медиа-запроса (px, rem, em, vw). */
            attributeShowMoreСontent: "data-showmore-content",                  // Атрибут контента объекта "showMore".
            attributeShowMoreButton: "data-showmore-button"                     /* Атрибут кнопки показа/скрытия контента "showMore". Текст внутри атрибута 
                                                                                    присваивается кнопке в "активном" состоянии (открыт весь контент).
                                                                                    Если атрибут пуст, то при открытии всего контента кнопка удаляется. */
        }

        // Опции:
        this.startOptions = {
            type: "items",                                                      // Тип контента: "items" - карточки/элементы; "size" - сплошной контент (текст); . 
            visibleContent: 1,                                                  // Начальная видимая высота (для "items" - количество рядов колонок/элементов).
            addHeight: "all",                                                   /* Величина высоты раскрытия контента. Возможные значения:
                                                                                    "all" - контент раскрывается на 100% высоты;
                                                                                    число - количество рядов колонок/элементов. */ 
            columns: 3,                                                         // Количество колонок в рядах (для правильного расчета высот).                                             
            gap: 20,                                                            // Отступ между рядами колонок (для type: "items").
        }
        options ? this.showMoreOptions = {...this.startOptions, ...options} : this.showMoreOptions = this.startOptions; 
        
        // Проверка props на NodeList:
        if (props instanceof NodeList) {
            props.forEach(showMoreItem => { 
                this.initShowMoreItem(showMoreItem);
            });
        } else {
            this.initShowMoreItem(props);
        }
    }


    /*=========================================================================*/
    /* Инициализация объектов "showMore" */
    initShowMoreItem(showMoreItem) {
        this.showMoreItem = showMoreItem;
        this.showMoreContent = Array.from(this.showMoreItem.querySelectorAll(`[${this.showmoreAttributes.attributeShowMoreСontent}]`)).filter(item => 
            item.closest(`[${this.showmoreAttributes.attributeShowMore}]`) === showMoreItem)[0];
        this.showMoreButton = Array.from(this.showMoreItem.querySelectorAll(`[${this.showmoreAttributes.attributeShowMoreButton}]`)).filter(item => 
            item.closest(`[${this.showmoreAttributes.attributeShowMore}]`) === showMoreItem)[0];
        this.showMoreButtonText = this.showMoreButton.innerHTML;
        this.showMoreSpeed = this.showMoreItem.dataset.showmoreSpeed ? this.showMoreItem.dataset.showmoreSpeed : "500";
        this.heightsArray = this.getArrayHeights();                             // Получение общей высоты контента и начальной видимой высоты.
        this.generalHeight = this.heightsArray.generalHeight;                   // Общая высота контента.
        this.initialHeight = this.heightsArray.initialHeight;                   // Начальная видимая высота.
        visibleHeight = this.initialHeight;
        this.visibleRows = this.showMoreOptions.visibleContent;                 // Количество рядов открытых колонок/элементов.

        // Если объект "showMore" содержит атрибут "data-showmore-media", то формируем медиа-запрос и ставим слушатель изменения состояния:
        if (this.showMoreItem.dataset.showmoreMedia) {
            const mediaQuery = this.getMediaQuery();
            this.matchMedia = window.matchMedia(mediaQuery);
        }

        // Скрытие/показ объектов "showMore" в зависимости от медиа-условий:
        if (!this.matchMedia || this.matchMedia.matches) {
            if (this.initialHeight < this.generalHeight) {
                _slideUp(this.showMoreContent, 0, this.initialHeight);
                this.showMoreButton.hidden = false;
            } else {
                _slideDown(this.showMoreContent, 0, this.initialHeight);
                this.showMoreButton.hidden = true;
            }
        } else {
            _slideDown(this.showMoreContent, 0, this.initialHeight);
            this.showMoreButton.hidden = true;
        }

        // Обработчик "клика" на кнопке:
        this.showMoreButton.addEventListener("click", this.showMoreActions.bind(this));
    }      
                    

    /*=========================================================================*/
    /* Формирование строки медиа-запроса объекта "showMore" с атрибутом data-showmore-media: */
    getMediaQuery() {
        const breakpoint = {};
        const params = this.showMoreItem.dataset.showmoreMedia;
        const paramsArray = params.split(",");
        breakpoint.type = paramsArray[0] ? paramsArray[0].trim() : "max";
        breakpoint.value = paramsArray[1];
        breakpoint.unit = paramsArray[2];
        let mediaQuery = "(" + breakpoint.type + "-width: " + breakpoint.value + breakpoint.unit + ")";      // Получаем брейкпоинт.
        return mediaQuery;
    }


    /*=========================================================================*/
    /* Обработчик события "клик" на кнопке "Показать еще" */
    showMoreActions() {
        if (!this.showMoreContent.classList.contains("_slide")) {

            // Скрытие контента:
            if (this.showMoreItem.classList.contains("_showmore-open")) {
                _slideUp(this.showMoreContent, this.showMoreSpeed, this.initialHeight);
                this.visibleRows = this.showMoreOptions.visibleContent;
                this.showMoreItem.classList.remove("_showmore-open");
                this.showMoreButton.dataset.showmoreButton ? this.showMoreButton.innerHTML = this.showMoreButtonText : null;
                this.coordTop = Math.abs(this.showMoreItem.getBoundingClientRect().top);

                console.log(window.pageYOffset - this.coordTop);
                window.scrollTo({
                    top: window.innerWidth > 768 
                        ? window.pageYOffset - (this.coordTop + 100)
                        : window.pageYOffset - (this.coordTop + 20),
                    behavior: "smooth",
                });

            // Раскрытие контента: 
            } else {
                // Если раскрытие на 100% высоты:
                if (this.showMoreOptions.addHeight === "all") {
                    this.showMoreButton.dataset.showmoreButton 
                        ? this.showMoreButton.innerHTML = this.showMoreButton.dataset.showmoreButton 
                        : this.showMoreButton.parentElement.style.display = "none";
                    _slideDown(this.showMoreContent, this.showMoreSpeed, this.initialHeight);
                    this.showMoreItem.classList.add("_showmore-open");

                // Если раскрытие неполное: 
                } else {
                    this.visibleHeight = this.showMoreContent.offsetHeight;
                    this.visibleRows += this.showMoreOptions.addHeight;
                    this.addHeight = this.getHeight("add");
                    if ((this.visibleHeight + this.addHeight) >= this.generalHeight) {
                        this.showMoreButton.dataset.showmoreButton 
                            ? this.showMoreButton.innerHTML = this.showMoreButton.dataset.showmoreButton 
                            : this.showMoreButton.parentElement.style.display = "none";
                        _slideDown(this.showMoreContent, this.showMoreSpeed, this.visibleHeight) 
                        this.showMoreItem.classList.add("_showmore-open");
                    } else {
                        _slideDown(this.showMoreContent, this.showMoreSpeed, this.visibleHeight, this.addHeight);
                    }
                }
            }
        }
    }


    /*=========================================================================*/
    /* Получение высот */
    getArrayHeights() {
        let heightsArray = {};
        heightsArray.generalHeight = this.showMoreContent.offsetHeight;
        this.showMoreType = this.showMoreOptions.type;
        if (this.showMoreType === "size") {
            heightsArray.initialHeight = Number(this.showMoreOptions.visibleContent);
        }
        if (this.showMoreType === "items") {
            const initialHeight = this.getHeight("initial");
            this.showMoreOptions.visibleContent === 1
                ? heightsArray.initialHeight = initialHeight
                : heightsArray.initialHeight = initialHeight + (this.showMoreOptions.gap * (this.showMoreOptions.visibleContent - 1));
        }
        return heightsArray;
    }


    /*=========================================================================*/
    /* Получение передавемого типа высоты */
    getHeight(typeValue) {
        let valueHeight = 0;
        const showMoreColumns = this.showMoreContent.querySelectorAll(".showmore__column");

        if (showMoreColumns) {
            // Получение начальной видимой высоты:
            if (typeValue === "initial") {
                if (this.showMoreOptions.visibleContent === 1) {
                    valueHeight = this.showMoreContent.children[0] ? this.showMoreContent.children[0].offsetHeight : null;
                } else {
                    for (let index = 0; index < showMoreColumns.length; index++) {
                        let columnIndex = (index + this.showMoreOptions.columns) / this.showMoreOptions.columns;
                        if (Number.isInteger(columnIndex) && columnIndex <= this.showMoreOptions.visibleContent) {
                            const showMoreColumn = showMoreColumns[index];
                            valueHeight += showMoreColumn.offsetHeight;
                        }
                    }
                }
            }

            // Получение начальной видимой высоты:
            if (typeValue === "add") {
                if (this.showMoreOptions.addHeight === 1) {
                    valueHeight = this.showMoreContent.children[(this.visibleRows - 1) * this.showMoreOptions.columns] 
                        ? this.showMoreContent.children[(this.visibleRows - 1) * this.showMoreOptions.columns].offsetHeight + this.showMoreOptions.gap
                        : null;
                } else {
                    for (let index = 0; index < showMoreColumns.length; index++) {
                        if (index >= ((this.visibleRows - this.showMoreOptions.addHeight) * this.showMoreOptions.columns)
                                && index < (this.visibleRows * this.showMoreOptions.columns)) {
                            let columnIndex = (index + this.showMoreOptions.columns) / this.showMoreOptions.columns;
                            if (Number.isInteger(columnIndex) && columnIndex <= this.visibleRows) {
                                const showMoreColumn = showMoreColumns[index];
                                valueHeight += (showMoreColumn.offsetHeight + this.showMoreOptions.gap);
                            }
                        }
                    }
                }
            }
        }
        return valueHeight;
    }
}



/*==================================================================================================================================================================*/
// Запуск конструктора Showmore */
function initShowmore() {
    if (document.querySelector(".team")) {
        const teamBlock = document.querySelector(".team");
        new ShowMore(teamBlock, { 
            visibleContent: 1,
            columns: 1
        });
    }
    if (document.querySelector("._page-articles")) {
        const articles = document.querySelectorAll(".item-article__body");
        articles.forEach(article => {            
            new ShowMore(article, { 
                visibleContent: 1,
                columns: 1
            });
        });
    }
}
document.addEventListener("DOMContentLoaded", function() {
    initShowmore();
})


// Переинициализация объектов при изменении ориентации экрана:
window.addEventListener("orientationchange", initShowmore);



/*==================================================================================================================================================================*/
/* "Лайки" на странице Articles */
if (document.querySelector("._page-articles")) {
    const likeButtons = document.querySelectorAll(".item-article__statistic button");
    likeButtons.forEach(likeButton => {
        const likeElem = likeButton.nextElementSibling;
        likeButton.addEventListener("click", function(e) {
            let likeCounter = Number(likeElem.innerHTML);
            if (!likeButton.classList.contains("active")) {
                likeButton.classList.add("active");
                likeElem.innerHTML = likeCounter + 1;
            } else {
                likeButton.classList.remove("active");
                likeElem.innerHTML = likeCounter - 1;
            }
        });
    });
}



/*==================================================================================================================================================================*/
/* Работа с формой блока "contacts" */
if (document.querySelector(".form-contacts")) {


    // Вставка контакта из буфера обмена в input:
    if (document.querySelector("button[title='Вставить']")) {
        let insertButton = document.querySelector("button[title='Вставить']");
        insertButton.addEventListener("click", function(e) {
            navigator.clipboard.readText()
                .then(text => {
                    contactLabel.classList.add("hide");
                    !errorElement.hasAttribute("hidden") ? errorElement.setAttribute("hidden", "") : null;
                    setTimeout(() => {                        
                        socialInput.value = text;
                    }, 200);
                })
                .catch(error => {
                    console.log("Что-то пошло не так", error);
                });
        });
    }

    // Переключение категорий в форме:
    if (document.querySelector(".social-contacts button")) {
        const socialButtons = document.querySelectorAll(".social-contacts button");
        socialButtons.forEach(socialButton => {
            socialButton.addEventListener("click", function(e) {
                if (!e.currentTarget.classList.contains("active")) {
                    const activeButton = document.querySelector(".social-contacts button.active");
                    const activeSocialCategory = socialButton.getAttribute("data-social");
                    activeButton.classList.remove("active");
                    e.currentTarget.classList.add("active");
                    socialInput.value = "";
                    errorElement.setAttribute("hidden", "");
                    contactLabel.classList.contains("hide") ? contactLabel.classList.remove("hide") : null;
                    switch (activeSocialCategory) {
                        case "whatsapp":
                            formContacts.setAttribute("data-form", "whatsapp");
                            contactLabel.innerHTML = "Ваш номер в WhatsApp";
                            break;
                        case "telegram":
                            formContacts.setAttribute("data-form", "telegram");
                            contactLabel.innerHTML = "Ваше имя пользователя в telegram";
                            break;
                        case "mail":
                            formContacts.setAttribute("data-form", "mail");
                            contactLabel.innerHTML = "Ваш адрес электронной почты";
                            break;
                        default:
                            break;
                    }
                }
            });
        });
    }


    // Ввод в textarea:
    const textarea = formContacts.querySelector("textarea");
    const textareaNotification = document.querySelector("[data-value-length] span");
    textarea.addEventListener("input", function() {
        textarea.value.length > 949 
            ? textareaNotification.innerHTML = `Осталось менее ${1000 - textarea.value.length} символов`
            : textareaNotification.innerHTML = "";
    })
}



/*==================================================================================================================================================================*/
/* Фокус на input */
if ((document.querySelector("input") || document.querySelector("textarea")) && !document.querySelector("._page-admin")) {
    const inputs = document.querySelectorAll("input,textarea");
    inputs.forEach(input => {
        input.addEventListener("focus", function(e) {
            input.classList.add("input-focus");
            iconMenu.classList.add("lock");
            if (input === socialInput) {
                contactLabel.classList.add("hide");
                errorElement.setAttribute("hidden", "true");
            }
        });
        input.addEventListener("blur", function(e) {
            input.classList.remove("input-focus");
            !socialInput.value.length ? contactLabel.classList.remove("hide") : null;
            const focusInput = document.querySelector(".input-focus");
            if (!focusInput) {
                iconMenu.classList.remove("lock");
            }
        });
    });
}



/*==================================================================================================================================================================*/
/* Отправка формы */
if (document.querySelector("[data-form]")) {
    let forms = document.querySelectorAll("[data-form]");
    let form;
    for (let i = 0; i < forms.length; i++) {
        form = forms[i];
        form.addEventListener("submit", formSend);
    } 
    
    
    // Функция проверки и обработки результатов валидации формы:
    async function formSend(e) {
        e.preventDefault();
        formValidate(form);
        let formData = new FormData(form);
        formData.append("image", formImageElem.files[0]);
        if (error === 0) {
            socialInput.value = "";
            let response = await fetch("files/php/send-form.php", {
                method: "POST",
                body: formData
            });
            if (response.ok) {
                let result = await response.json();
                notificationText.innerHTML = "Данные формы отправлены";
                notification.classList.add("show");
                setTimeout(() => {
                    notification.classList.remove("show");
                }, 4000);
                form.reset();
            } else {
                alert("Ошибка отправки");
            }
        }
    }             
}



/*==================================================================================================================================================================*/
/* Валидация формы */
// Функция валидации формы:
function formValidate(form) {
    error = 0;
    let inputsRequired = form.querySelectorAll("[data-required]");
    for (let index = 0; index < inputsRequired.length; index++) {
        const input = inputsRequired[index];
        formRemoveError(input);
        if (form.getAttribute("data-form") === "whatsapp") {
            if (input.value.length < 25) {
                if (phoneTest(input)) {
                    errorText.innerHTML = "некорректный номер";
                    formAddError(input);
                }
            } else {
                errorText.innerHTML = "слишком длинный номер";
                formAddError(input);
            }
        } else if (form.getAttribute("data-form") === "telegram") {
            if (input.value.length < 34) {
                if (telegramTest(input)) {
                    errorText.innerHTML = "некорректное имя";
                    formAddError(input);
                }
            } else {
                errorText.innerHTML = "слишком длинное имя";
                formAddError(input);
            }
        } else if (form.getAttribute("data-form") === "mail" && emailTest(input)) {
            errorText.innerHTML = "некорректный e-mail адрес";
            formAddError(input);
        }
    }
}
            
            
// Функция добавления полю ввода и его родителю класса "input-error" (ошибка):
function formAddError(input) {
    error++;
    contactLabel.classList.add("hide");
    socialInput.value = "";
    if (input.parentElement.querySelector(".error")) {
        errorElement.removeAttribute("hidden");
    }
}
        
            
// Функция удаления у поля ввода и его родителя класса "input-error" (ошибка):
function formRemoveError(input) {
    contactLabel.classList.remove("hide");
    if (input.parentElement.querySelector(".error")) {
        errorElement.setAttribute("hidden", "");
    }
}


// Функция проверки номера телефона:
function phoneTest(input) {
    return !/^[+0-9()\-\s]+$/.test(input.value);
}


// Функция проверки правильности аккаунта telegram:
function telegramTest(input) {
    return !/^@[A-Za-z0-9_]{5,34}$/.test(input.value);
}


// Функция проверки email-адреса:
function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}


// Функция проверки даты:
function dateTest(input) {
    return !/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(input.value);
}



/*==================================================================================================================================================================*/
/* Прикрепление к форме фотографии */	
const formsImage = document.querySelectorAll("[type='file']");
formsImage.forEach(formImage => {
    const formPreview = formImage.closest(".form-file").querySelector(".form-file__preview");
    formImage.addEventListener("change", () => {
        formImageElem = formImage;
        uploadFile(formImageElem.files[0]);
    });


    // Функция проверки выбранного пользователем файла:
    function uploadFile(file) {
        if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
            alert("Разрешены только изображения.");
            formImage.value = "";
            return;																				
        }
        if (file.size > 2 * 1024 * 1024) {
            alert("Файл должен быть менее 2 МБ.");
            return;																				
        }
        let reader = new FileReader();
        reader.onload = function (e) {
            formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
        };
        reader.onerror = function (e) {
            alert("Ошибка");
        };
        reader.readAsDataURL(file);
    };
});



/*==================================================================================================================================================================*/
/* Копирование ссылки в буфер обмена */
if (document.querySelector("[data-share]")) {
    copyClipboard();

    function copyClipboard() {
        const shareButtons = document.querySelectorAll("[data-share]");
        shareButtons.forEach(shareButton => {
            shareButton.addEventListener("click", e => {
                const link = e.currentTarget.getAttribute("data-link");
                if (link) {
                    navigator.clipboard.writeText(link)
                      .then((notificationText.innerHTML = "Ссылка на статью скопирована в ваш буфер обмена"))
                      .then(() => notification.classList.add("show"))
                      .catch(err => console.error(err))
                } else {
                    console.error("Данной ссылки не существует!")
                }
                setTimeout(() => {
                    notification.classList.remove("show");
                }, 4000);
            });
        })
    }
}



/*==========================================================================================================================================================================*/
/* Обработка ввода в textarea на странице в админке */
if (document.querySelector("._page-admin")) {
    const textareaElements = document.querySelectorAll("[data-admin-text]");
    textareaElements.forEach(textarea => {
        const textareaMaxLength = textarea.getAttribute("maxlength");
        const textareaNotification = textarea.nextElementSibling.querySelector("span");
        textarea.addEventListener("input", function() {
            textarea.value.length
                ? textareaNotification.innerHTML = `Осталось ${textareaMaxLength - textarea.value.length} символов`
                : textareaNotification.innerHTML = "";
        })
    });
}
