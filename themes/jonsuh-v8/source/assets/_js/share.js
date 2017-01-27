var Share = (function() {
  "use strict";

  var init = function() {
    var twitterLinks = document.querySelectorAll(".js-share-twitter");
    if (twitterLinks.length) {
      twitterLinks.forEach(function(el) {
        el.addEventListener("click", twitter);
      });

      var facebookLinks = document.querySelectorAll(".js-share-facebook");
      if (facebookLinks.length) {
        facebookLinks.forEach(function(el) {
          el.addEventListener("click", facebook);
        });
      }
    }
  };

  var facebook = function(e) {
    e.preventDefault();

    Utility.windowOpen(this.getAttribute("href"), 600, 350);
  };

  var twitter = function(e) {
    e.preventDefault();

    Utility.windowOpen(this.getAttribute("href"), 600, 300);
  }


  return {
    init: init
  };

})();
