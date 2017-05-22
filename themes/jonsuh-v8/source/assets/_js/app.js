var App = (function() {
  "use strict";

  var init = function() {
    rellaxInit();

    homeInit();

    Utility.domReady(function() {
      document.querySelector(".js-home__name").classList.add("is-ready");
    });

    Share.init();
  };

  var homeInit = function() {
    document.querySelector(".js-home__desk-speaker-knob").addEventListener("click", function() {
      document.querySelector(".home__desk").classList.toggle("is-speaker-off")
    });

    document.querySelector(".js-home__desk-playpause").addEventListener("click", function() {
      document.querySelector(".home__desk").classList.toggle("is-paused")
    });
  };

  var rellaxInit = function() {
    // var rellax = new Rellax(".parallax");
    var rellax = new Rellax(".home__letter");
  };


  return {
    init: init
  };

})();

App.init();
