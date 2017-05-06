var App = (function() {
  "use strict";

  var init = function() {
    rellaxInit();

    Utility.domReady(function() {
      document.querySelector(".js-home__hero").classList.add("is-ready");
    });

    Share.init();
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
