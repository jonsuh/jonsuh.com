var App = (function() {
  "use strict";

  var init = function() {
    rellaxInit();

    Share.init();
  };

  var rellaxInit = function() {
    var rellax = new Rellax(".parallax");
  };


  return {
    init: init
  };

})();

App.init();
