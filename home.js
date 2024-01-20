/***** Hero Words Loop *****/
let loopDelay = ">1.2";
let wordCount = $(".words-list:eq(0)").find("h1").length;
let wordPercent = 100 / wordCount;

let loopTl = gsap.timeline({
  repeat: -1,
  loop: true,
  paused: true,
  defaults: { duration: 0.5, ease: "power2.out" },
});

for (let i = 1; i <= wordCount; i++) {
  loopTl.to(".words-list", { yPercent: -i * wordPercent }, loopDelay);
}

/***** Load Animation *****/
let loadTl = gsap.timeline({ defaults: { opacity: 0, duration: 0.8 } });
loadTl.from(".hero-heading", { y: "50%" });
loadTl.from(".hero-wrap .button", { y: "100%" }, "<0.3");
loadTl.from(".about-image", { y: "50%" }, "<");
loadTl.from(
  ".grid-line",
  { y: "20%", stagger: { amount: 5 }, onComplete: loopTl.play() },
  "<"
);

/***** Hero Image *****/
ScrollTrigger.matchMedia({
  "(min-width: 768px)": function () {
    $("[data-anim='hero-element']").each(function (index) {
      let triggerElement = $(this);
      let targetElement = $(".image-wrap");

      let imageHeroTL = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "top 1%",
          end: "bottom 10%",
          scrub: 0.5,
        },
      });
      imageHeroTL.fromTo(
        targetElement,
        { paddingLeft: "25%", paddingTop: "37rem" },
        { paddingLeft: "0%", paddingTop: "6rem", duration: 1 }
      );
    });
  },
});

/***** Color Mode *****/
window.addEventListener("DOMContentLoaded", (event) => {
  let buttonFill = $(".button-circle");
  let logosFill = $(".affiliate-logo-wrap");

  $("[data-color-mode]").each(function (index) {
    let triggerElement = $(this);
    let triggerColorMode = triggerElement.attr("data-color-mode");
    let BKGD = "var(--color--" + triggerColorMode + ")";
    let TEXT;

    if (triggerColorMode == "light") {
      TEXT = "var(--color--dark)";
    } else if (triggerColorMode == "dark") {
      TEXT = "var(--color--light)";
    }

    const colorScroll = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: "top 30%",
        end: "bottom 70%",
        toggleActions: "play complete none reverse",
      },
    });
    colorScroll
      .to("body", { color: TEXT, backgroundColor: BKGD })
      .to(buttonFill, { ["--c"]: BKGD }, "<")
      .to(logosFill, { backgroundColor: BKGD }, "<");
  });
});

/***** Bio Drawer *****/
var bioTrigger = $("#bioTrigger");
var bioDrawer = $("#bioDrawer");
var triggerText = bioTrigger.find("span");

bioTrigger.click(function (event) {
  if (bioDrawer.hasClass("is--open")) {
    bioDrawer.removeClass("is--open");
    triggerText.text("Read full bio");
  } else if (!bioDrawer.hasClass("is--open")) {
    bioDrawer.addClass("is--open");
    triggerText.text("Close bio");
  }
});

/***** Tooltip hover *****/
$(".affiliate-logo-wrap").hover(function () {
  $(this).find(".logo-tooltip").toggleClass("hidden");
});

/***** News Slider *****/
$(".slider-wrap").each(function (index) {
  let newsSlider = $(this);
  const swiper = new Swiper(newsSlider.find(".swiper")[0], {
    slidesPerView: 1,
    speed: 700,
    keyboard: true,
    mousewheel: { forceToAxis: true },
    spaceBetween: 32,
    breakpoints: {
      // mobile landscape
      480: { slidesPerView: 2, spaceBetween: 24 },
      // tablet
      768: { slidesPerView: 2, spaceBetween: 24 },
      // desktop
      992: { slidesPerView: 3, spaceBetween: 24 },
    },
    navigation: {
      nextEl: newsSlider.find(".swiper-next")[0],
      prevEl: newsSlider.find(".swiper-prev")[0],
      disabledClass: "is-disabled",
    },
    pagination: {
      el: newsSlider.find(".swiper-bullet-wrapper")[0],
      bulletActiveClass: "is-active",
      bulletClass: "swiper-bullet",
      clickable: true,
    },
  });
});
