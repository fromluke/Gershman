var currentDate = new Date(new Date().getTime());
var YEAR = currentDate.getFullYear();

$(document).ready(function () {
  $("#footerYear").text("©" + YEAR + " Eric Gershman, LLC");
});

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

/***** Button Hover *****/
$(".button").each(btnCircleAnim);

function btnCircleAnim(i) {
  let circle = $(this).find(".button-circle");
  let text = $(this).find("span");
  var btnTl = gsap.timeline({
    paused: true,
    reversed: true,
    defaults: { duration: 0.4, ease: "power2.out" },
  });
  btnTl
    .to(text, { x: 4 }, "<")
    .to(circle, { ["--p"]: "100%", scale: 1.1 }, "<");

  $(this).hover(animateCircle);

  function animateCircle() {
    btnTl.reversed() ? btnTl.play() : btnTl.reverse();
  }
}

/***** Nav style change on scroll *****/
$(window).scroll(function () {
  var scroll = $(window).scrollTop();

  if (scroll >= 40) {
    $(".nav-float").removeClass("at-top");
  } else {
    $(".nav-float").addClass("at-top");
  }

  if (scroll <= 300) {
    $(".nav-button").removeClass("active");
  }
});

/***** Copy Email to Clipboard *****/
var copyTrigger = $("#copyToClipboard");
var copyText = "hello" + "@" + "ericgershmanllc.com";

copyTrigger.click(function (event) {
  navigator.clipboard.writeText(copyText);
});

/***** Nav buttons active state *****/
$("[data-scroll]").each(function (index) {
  let triggerElement = $(this);
  let sectionID = triggerElement.attr("data-scroll");

  let targetElement = $(".nav-float [data-nav='" + sectionID + "']");

  let navColorTL = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      start: "top 20%",
      end: "bottom 80%",
      onEnter: () => {
        targetElement.addClass("active");
        targetElement.siblings().removeClass("active");
      },
      onEnterBack: () => {
        targetElement.addClass("active");
        targetElement.siblings().removeClass("active");
      },
    },
  });
});

/***** Scroll to Sections *****/
$("[data-nav]").each(function (index) {
  let navButton = $(this);
  let sectionID = navButton.attr("data-nav");

  navButton.on("click", function () {
    if (mobileMenuOpen) {
      showMainMenu.reverse();
      mobileNavBtn.attr("aria-label", "Open Main Menu");
      setTimeout(function () {
        scrollToSection(sectionID);
      }, 300);
    } else {
      scrollToSection(sectionID);
    }
  });
});

/***** Navigate to Sections *****/
function scrollToSection(sectionID) {
  var destination = "#" + sectionID;
  gsap.to(window, { duration: 1, scrollTo: destination, ease: "power2" });
  //window.location.hash = sectionID;
}

/***** Mobile Menu *****/
let mobileNavBtn = $(".menu-icon");
let menuWrap = $(".nav-mobile");
let mobileMenuOpen = false;

let showMainMenu = gsap.timeline({
  paused: true,
  defaults: { duration: 0.3 },
  onComplete: () => {
    mobileNavBtn.attr("aria-label", "Close Main Menu");
    $("body").css("overflow", "hidden");
    mobileMenuOpen = true;
  },
  onReverseComplete: () => {
    mobileNavBtn.attr("aria-label", "Open Main Menu");
    $("body").css("overflow", "visible");
    mobileMenuOpen = false;
  },
});

showMainMenu.set(menuWrap, { display: "flex" });
showMainMenu.fromTo(menuWrap, { yPercent: -100 }, { yPercent: 0 });

mobileNavBtn.on("click", function () {
  if (mobileMenuOpen) {
    showMainMenu.reverse();
    mobileNavBtn.attr("aria-label", "Open Main Menu");
  } else {
    showMainMenu.play();
  }
});
