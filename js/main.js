"use strict";

var initHeader = () => {
    const header = document.querySelector(".header");
    const headerNav = document.querySelector(".header__nav");
    const headerBurger = document.querySelector(".header__burger");
    const links = document.querySelectorAll(".header__link");

    if (!header || !headerBurger) return;

    headerBurger.addEventListener("click", () => {
        header.classList.toggle("active");
        document.body.classList.toggle("lock");
    });

    const mq992 = window.matchMedia("(min-width: 992px)");

    mq992.addEventListener("change", (e) => {
        if (!e.matches) {
            headerNav.style.transition = "none";

            setTimeout(() => {
                headerNav.style.transition = "";
            }, 0);
            return;
        } else {
            header.classList.remove("active");
        }
    });

    links.forEach((link) =>
        link.addEventListener("click", () => {
            header.classList.remove("active");
            document.body.classList.remove("lock");
        })
    );
};

var initIntro = () => {
    const intro = document.querySelector(".intro");
    if (!intro) return;

    const introSlider = new Swiper(".intro__slider", {
        loop: true,
        slidesPerView: 1,
        lazy: true,
        pagination: {
            el: ".intro__pagination",
            type: "bullets",
            clickable: true,
        },
        effect: "fade",
        fadeEffect: {
            crossFade: true,
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
    });
};

var initPlaysSliders = () => {
    const playsSLiderContainers = document.querySelectorAll(
        ".js-slider-container"
    );

    playsSLiderContainers.forEach((container) => {
        if (!container) return;
        const prev = container.querySelector(".js-nav-prev");
        const next = container.querySelector(".js-nav-next");
        const pagination = container.querySelector(".js-plays-pagination");
        const swiperEl = container.querySelector(".swiper");

        new Swiper(swiperEl, {
            loop: true,
            slidesPerView: 1,
            lazy: true,
            // autoHeight: true,
            pagination: {
                el: pagination,
                type: "bullets",
                clickable: true,
            },
            navigation: {
                prevEl: prev,
                nextEl: next,
            },
        });
    });
};

// init video

var initVKVideo = (videos) => {
    // generate video url

    var generateUrl = (num, id) => {
        var query = "&hd=2&autoplay=1";
        return "https://vk.com/video_ext.php?oid=-" + num + "&id=" + id + query;
    };

    // create iframe element
    var createIframe = (num, id) => {
        var iframe = document.createElement("iframe");
        iframe.classList.add("video-iframe");
        iframe.setAttribute("src", generateUrl(num, id));
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allowfullscreen", "");
        iframe.setAttribute(
            "allow",
            "autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
        );

        return iframe;
    };

    // handling each video element
    videos.forEach((el) => {
        var videoHref = el.dataset.video;
        var deletedLength = "https://vk.com/video-".length;

        var videoFull = videoHref
            .substring(deletedLength, videoHref.length)
            .split("_");

        var parent = el.parentElement;

        var videoPlayBtn = parent.querySelector(".video-play-btn");

        videoPlayBtn.addEventListener("click", () => {
            var iframe = createIframe(videoFull[0], videoFull[1]);
            parent.querySelector(".video-preview").remove();
            el.append(iframe);
        });
    });
};

document.addEventListener("DOMContentLoaded", () => {
    initHeader();
    initIntro();
    initPlaysSliders();
    // get all video elements on the page
    var videos = Array.from(document.querySelectorAll(".video-block"));
    videos.length > 0 && initVKVideo(videos);
});
