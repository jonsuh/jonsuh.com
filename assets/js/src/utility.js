var Utility = Utility || {};

Utility = {
  init: function() {
    App.transitionEnd = Utility.whichTransitionEnd();
    App.firstScript = document.getElementsByTagName("script")[0];

    var jsTops = document.querySelectorAll(".js-top");
    if (jsTops) {
      [].forEach.call(jsTops, function(anchor) {
        anchor.addEventListener("click", function(e) {
          e.preventDefault();

          Utility.scrollTop();
        });
      });
    }

    var jsAnchors = document.querySelectorAll(".js-anchor");
    if (jsAnchors) {
      [].forEach.call(jsAnchors, function(anchor) {
        anchor.addEventListener("click", function(e) {
          e.preventDefault();

          Utility.anchorScrollTo(this);
        });
      });
    }
  },

  /**
   * Add a class to a DOM element
   *
   * @param {object} el        - The element to add the class to
   * @param {string} className - The class name to add
   */
  addClass: function(el, className) {
    if (className.indexOf(" ") == -1) {
      _addClass(el, className);
    } else {
      var classArray = className.split(" ");
      classArray.forEach(function(className) {
        _addClass(el, className);
      });
    }

    function _addClass(el, className) {
      if (el.classList) {
        el.classList.add(className);
      } else {
        el.classList += " " + className;
      }
    }
  },

  /**
   * Check to see if an element has one or more class names
   *
   * @param {object} el        - The element
   * @param {string} className - The class name(s) to check
   * @returns {boolean}
   */
  hasClass: function(el, className) {
    if (className.indexOf(" ") == -1) {
      _hasClass(el, className);
    } else {
      var elHasClass = true,
          classArray = className.split(" ");

      classArray.forEach(function(className) {
        if ( ! _hasClass(el, className)) {
          elHasClass = false;
        }
      });

      return elHasClass;
    }

    function _hasClass(el, className) {
      if (el.classList) {
        return el.classList.contains(className)
      } else {
        return new RegExp("(^| )" + className + "( |$)", "gi").test(el.className);
      }      
    }
  },

  /**
   * Remove class name(s) from a DOM element
   *
   * @param {object} el        - The element
   * @param {string} className - The class name(s) to remove
   */
  removeClass: function(el, className) {
    if (className.indexOf(" ") == -1) {
      _removeClass(el, className);
    } else {
      var classArray = className.split(" ");
      classArray.forEach(function(className) {
        _removeClass(el, className);
      });
    }

    function _removeClass(el, className) {
      if (el.classList) {
        el.classList.remove(className);
      } else {
        el.className = el.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
      }
    }
  },

  /**
   * Toggle class name(s) from a DOM element
   *
   * @param {object} el        - The element
   * @param {string} className - The class name(s) to remove
   */
  toggleClass: function(el, className) {
    if (el.classList) {
      el.classList.toggle(className);
    } else {
      var classArray = el.className.split(" "),
          existingIndex = classArray.indexOf(className);

      if (existingIndex >= 0) {
        classArray.splice(existingIndex, 1);
      } else {
        classArray.push(className);
      }

      el.className = classArray.join(" ");
    }
  },

  /**
   * Check if email is valid
   *
   * @param {string} email - Email string
   * @return {boolean}
   */
  isEmail: function(email) {
    return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(email);
  },

  /**
   * Animate scroll to Y position of page
   *
   * @param {int} Y                 - Y offset to scroll to
   * @param {int} duration          - The duration of the animation is milliseconds
   * @param {string} easingFunction - The name of the easing function to use when animating
   * @param {function} callback     - (optional) Callback function
   */
  scrollTo: function(Y, duration, easingFunction, callback) {
    var start = Date.now(),
        elem = document.documentElement.scrollTop ? document.documentElement:document.body,
        from = elem.scrollTop;
 
    if (from === Y) {
      callback();
      return;
    }
 
    function min(a, b) {
      return a < b ? a : b;
    }
 
    function scroll(timestamp) {
      var currentTime = Date.now(),
          time = min(1, ((currentTime - start) / duration)),
          easedT = easingFunction(time);

      elem.scrollTop = (easedT * (Y - from)) + from;

      if (time < 1) {
        requestAnimationFrame(scroll);
      } else {
        if (callback) {
          callback();
        }
      }
    }
 
    requestAnimationFrame(scroll);
  },

  /**
   * Anchor animate scroll to Y position of element
   *
   * @param {object} obj - The element to scroll to
   */
  anchorScrollTo: function(thisObj) {
    var id = thisObj.getAttribute("href"),
        that = document.querySelector(id),
        rect = that.getBoundingClientRect(),
        offset = rect.top + document.body.scrollTop;

    Utility.scrollTo(offset, 300, function(t) {
      return t <.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; // easeInOutCubic
    });
  },

  /**
   * Animate scroll to the top of the page using Utility.scrollTo()
   *
   * @param {int} time - The duration of the animation in milliseconds
   */
  scrollTop: function(time) {
    if (typeof time === "undefined") {
      time = 300;
    }

    Utility.scrollTo(0, time, function(t) {
      return t <.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; // easeInOutCubic
    });
  },

  /**
   * Get and inject script to the DOM
   *
   * @param {string} src - The URL of the script
   */
  getScript: function(src) {
    var script = document.createElement("script");
    script.src = src;
    App.firstScript.parentNode.insertBefore(script, App.firstScript);
  },

  /**
   * Find out which transition prefix is supported by the browser
   *
   */
  whichTransitionEnd: function() {
    var t,
        el = document.createElement('fakeelement');

    var transitions = {
      "transition"      : "transitionend",
      "OTransition"     : "oTransitionEnd",
      "MozTransition"   : "transitionend",
      "WebkitTransition": "webkitTransitionEnd"
    }

    for (t in transitions){
      if (el.style[t] !== undefined){
        return transitions[t];
      }
    }
  },

  /**
   * Check if browser is Chrome on iOS
   *
   */
  browserIsChromeiOS: function() {
    if (navigator.userAgent.match("CriOS")) {
      return true;
    } else {
      return false;
    }
  }
};