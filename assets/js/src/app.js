var App = App || {};

var docHtml = document.getElementById("html"),
    docBody = document.body;

App = {
  googleAnalyticsUA: "", // PARTS OF THIS LINE HAVE BEEN REMOVED
  transitionEnd: null,

  init: function() {
    Utility.init();

    // Load external scripts
    // ==================================================
    Utility.getScript("//www.google-analytics.com/analytics.js");
    Social.load();

    // Initialize pages
    // ==================================================
    App.error404Init();
    App.navigationInit();
    App.newsletterInit();
    Work.init();

    // Other
    // ==================================================
    var postOverflow = document.querySelector(".js-post-overflow");
    if (postOverflow) {
      postOverflow.addEventListener("click", App.postOverflow);
    }

    // Initialize social and tracking
    // ==================================================
    App.googleAnalytics();
    Social.init();
  },

  error404Init: function() {
    var error404 = document.querySelector(".js-error-404");
    if (error404) {
      var audio = document.getElementsByTagName("audio")[0];
      error404.addEventListener("click", function(e) {
        e.preventDefault();

        audio.volume = 0.5;
        audio.play();
      });
    }
  },

  googleAnalytics: function() {
    ga = function() {
      ga.q.push(arguments);
    };
    ga.q = [
      ["create", App.googleAnalyticsUA, "auto"],
      ["send", "pageview"]
    ];
    ga.l = 1 * new Date();
  },

  newsletterInit: function() {
    var form = document.querySelector(".js-form-newsletter"),
        inputs = document.querySelectorAll(".js-form-newsletter input");

    if (form) {
      form.addEventListener("submit", function(e) {
        e.preventDefault();

        App.newsletterValidate(form);
      });
    }
  },

  newsletterValidate: function(form) {
    var email = form.querySelector("input[type=email]"),
        errorString = "Invalid email address";

    if ( ! Utility.isEmail(email.value)) {
      var adjacent = email.nextSibling;

      if ( adjacent.className != "has-error") {
        var error = document.createElement("div");

        Utility.addClass(email, "has-error");
        error.className = "has-error";
        error.innerHTML = errorString;
        email.parentNode.insertBefore(error, email.nextSibling);
      }
      email.focus();
    } else {
      Utility.removeClass(email, "has-error");
      var error = email.nextSibling;

      if (error) {
        error.parentNode.removeChild(error);
      }

      form.submit();
      setTimeout(function() {
        email.value = "";
      }, 500);
    }
  },

  navigationInit: function() {
    var navToggle = document.querySelector(".js-navigation-toggle");

    navToggle.addEventListener("click", function(e) {
      e.preventDefault();
      if ( ! Utility.hasClass(docHtml, "js-nav js-nav-transition")) {
        Utility.addClass(docHtml, "js-nav js-nav-transition");
      } else {
        Utility.removeClass(docHtml, "js-nav");
        docHtml.addEventListener(App.transitionEnd, navTransitionRemove);
      }
    });

    function navTransitionRemove() {
      Utility.removeClass(docHtml, "js-nav-transition");
      docHtml.removeEventListener(App.transitionEnd, navTransitionRemove);
    }
  },

  postOverflow: function(e) {
    e.preventDefault();

    var overflow = document.querySelector(".post-overflow"),
        contentHeight = document.querySelector(".post-article").offsetHeight;

    overflow.style.maxHeight = contentHeight + "px";
    Utility.addClass(overflow, "has-transition");
    Utility.addClass(overflow, "is-reading");
    overflow.addEventListener(App.transitionEnd, overflowTransitionEnd);

    function overflowTransitionEnd() {
      overflow.style.maxHeight = "inherit";
      Utility.removeClass(overflow, "has-transition");
    }
  },
};

App.init();