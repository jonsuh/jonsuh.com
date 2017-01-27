var Utility = (function() {
  "use strict";

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
    windowOpen: windowOpen
  };

})();
