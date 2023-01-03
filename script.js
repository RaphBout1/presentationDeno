// For tracking the section currently displayed
var currentSection = 0;
var canScroll = true;

$(document).ready(function () {
  //##############################arows click
  document.onkeydown = checkKey;

  function checkKey(e) {
    e = e || window.event;

    if (e.keyCode == "38") {
      delayScroll(-1);
    } else if (e.keyCode == "40") {
      delayScroll(1);
    }
  }
  $(".slide[data-index=" + currentSection + "]").addClass("active");

  //##############################wheel event

  document.addEventListener("wheel", (event) => {
    let scrollDir = event.deltaY > 1 ? 1 : -1;
    delayScroll(scrollDir);
  });

    //##############################chevron event
    $(".chevronCont").bind("click", (event) => {
      delayScroll(1);
    });


  //touchestartevent ##########################

  var ts;
$(document).bind('touchstart', function (e){
   ts = e.originalEvent.touches[0].clientY;
});

$(document).bind('touchend', function (e){
   var te = e.originalEvent.changedTouches[0].clientY;
   if(ts > te+5){
    delayScroll(1);
   }else if(ts < te-5){
    delayScroll(-1);
   }
});

  function delayScroll(scrollDir) {
    if (!canScroll) {
      return;
    }

    canScroll = false;
    setTimeout(() => {
      canScroll = true;
    }, 1000);

    scroll(scrollDir);
  }

  function scroll(scrollDir) {
    //if slide exit
    if (
      currentSection + scrollDir >= 0 &&
      $(".slide[data-index=" + (currentSection + scrollDir) + "]").length > 0
    ) {
      //if change side slider
      $("#hero-slider").removeClass("next");
      $("#hero-slider").removeClass("prev");
      if (scrollDir == 1) {
        $("#hero-slider").addClass("next");
      } else {
        $("#hero-slider").addClass("prev");
      }
      $(".slide.prev").removeClass("prev");
      $(".slide[data-index=" + currentSection + "]")
        .removeClass("active")
        .addClass("prev");
      currentSection += scrollDir;
      $(".slide[data-index=" + currentSection + "]").addClass("active");
    }
  }

  //##############################carrousel

  const carouselLenght = $(".cardCarousel").children().length;

  let cmptText = 1;
  let canChangetexte = true;
  $(".cardCarousel li:nth-child(" + cmptText + ")").fadeIn();
  $(".carouselBouton").on("click", function (event) {
    if (canChangetexte) {
      canChangetexte = false;
      setTimeout(() => {
        canChangetexte = true;
      }, 1000);
      hideText(event);
    }
  });

  function hideText(event) {

    $(".cardCarousel li:nth-child(" + cmptText + ")").fadeOut(500);
    cmptText = cmptText + parseInt($(event.currentTarget).attr("data-id"));
    if (cmptText > carouselLenght) {
      cmptText = 1;
    } else if (cmptText < 1) {
      cmptText = carouselLenght;
    }
    setTimeout(showText, 500);
  }
  function showText() {
    $(".cardCarousel li:nth-child(" + cmptText + ")").fadeIn(500);

  }
});
