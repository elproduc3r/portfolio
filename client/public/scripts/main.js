/* ===================================================================
 * Transcend - Main JS
 *
 * ------------------------------------------------------------------- */

(function ($) {

  "use strict";

  var cfg = {
      scrollDuration: 400, // smoothscroll duration
      mailChimpURL: 'https://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=e6957d85dc' // mailchimp url
    },

    $WIN = $(window);

  // Add the User Agent to the <html>
  // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
  var doc = document.documentElement;
  doc.setAttribute('data-useragent', navigator.userAgent);


  /* Preloader
   * -------------------------------------------------- */
  var clPreloader = function () {

    $("html").addClass('cl-preload');

    $WIN.on('load', function () {

      //force page scroll position to top at page refresh
      // $('html, body').animate({ scrollTop: 0 }, 'normal');

      // will first fade out the loading animation 
      $("#loader").fadeOut("slow", function () {
        // will fade out the whole DIV that covers the website.
        $("#preloader").delay(300).fadeOut("slow");
      });

      // for hero content animations 
      $("html").removeClass('cl-preload');
      $("html").addClass('cl-loaded');

    });
  };

  /* Menu on Scrolldown
   * ------------------------------------------------------ */
  var clMenuOnScrolldown = function () {

    var menuTrigger = $('.header-menu-toggle');

    $WIN.on('scroll', function () {

      if ($WIN.scrollTop() > 150) {
        menuTrigger.addClass('opaque');
      } else {
        menuTrigger.removeClass('opaque');
      }

    });
  };

  /* Smooth Scrolling
   * ------------------------------------------------------ */
  var clSmoothScroll = function () {

    $('.smoothscroll').on('click', function (e) {
      var target = this.hash,
        $target = $(target);

      e.preventDefault();
      e.stopPropagation();

      $('html, body').stop().animate({
        'scrollTop': $target.offset().top
      }, cfg.scrollDuration, 'swing').promise().done(function () {

        // check if menu is open
        if ($('body').hasClass('menu-is-open')) {
          $('.header-menu-toggle').trigger('click');
        }

        window.location.hash = target;
      });
    });

  };

  /* Animate On Scroll
   * ------------------------------------------------------ */
  var clAOS = function () {

    AOS.init({
      offset: 200,
      duration: 200,
      easing: 'ease-in-sine',
      delay: 50,
      once: true,
      disable: 'mobile'
    });

  };

  /* Back to Top
   * ------------------------------------------------------ */
  var clBackToTop = function () {

    var pxShow = 500, // height on which the button will show
      fadeInTime = 400, // how slow/fast you want the button to show
      fadeOutTime = 400, // how slow/fast you want the button to hide
      scrollSpeed = 300, // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'
      goTopButton = $(".cl-go-top")

    // Show or hide the sticky footer button
    $(window).on('scroll', function () {
      if ($(window).scrollTop() >= pxShow) {
        goTopButton.fadeIn(fadeInTime);
      } else {
        goTopButton.fadeOut(fadeOutTime);
      }
    });
  };

  /* Initialize
   * ------------------------------------------------------ */
  (function clInit() {
    clPreloader();
    clMenuOnScrolldown();
    clSmoothScroll();
    clAOS();
    clBackToTop();
  })();

})(jQuery);