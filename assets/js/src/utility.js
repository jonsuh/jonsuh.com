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
  },

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

  isEmail: function(email) {
    return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(email);
  },

  // anchorScrollTo: function(thisObj, thatObj) {
  //   var thisOffset = thisObj.offset(),
  //       thatOffset = thatObj.offset(),
  //       offsetDiff = Math.abs(thatOffset.top - thisOffset.top);

  //   Utility.scrollTo(0, 300, function(t) {
  //     return t <.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; // easeInOutCubic
  //   });
  // },

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

  scrollTop: function(time) {
    if (typeof time === "undefined") {
      time = 300;
    }

    Utility.scrollTo(0, time, function(t) {
      return t <.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; // easeInOutCubic
    });
  },

  getScript: function(src) {
    var script = document.createElement("script");
    script.src = src;
    App.firstScript.parentNode.insertBefore(script, App.firstScript);
  },

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

  browserIsChromeiOS: function() {
    if (navigator.userAgent.match("CriOS")) {
      return true;
    } else {
      return false;
    }
  }
};