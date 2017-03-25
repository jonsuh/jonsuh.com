var Utility = (function() {
  "use strict";

  /**
   * Executes function when DOM is ready
   *
   * @public
   * @param {Function} callback
   */
  var domReady = function(callback) {
    if (typeof callback === "function") {
      if (
          document.readyState === "complete" ||
          (document.readyState !== "loading" && !document.documentElement.doScroll)
        ) {

        callback();
      }
      else {
        document.addEventListener("DOMContentLoaded", callback);
      }
    }
  };

  /**
   * Opens popup window
   *
   * @public
   * @param {String} url
   * @param {Number} width
   * @param {Number} height
   * @returns {}
   */
  var windowOpen = function(url, width, height) {
    var left = (screen.width / 2) - (width / 2);
    var top = (screen.height / 2) - (height / 2);

    var windowOpened = window.open(
      url,
      "",
      "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left
    );

    windowOpened.opener = null;
  };


  return {
    domReady: domReady,
    windowOpen: windowOpen
  };

})();
