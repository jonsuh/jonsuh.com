var App = App || {};

App = {
  googleAnalyticsUA: "", // PARTS OF THIS LINE HAVE BEEN REMOVED
  transitionEnd: null,

  init: function() {
    Utility.init();
    App.fontsInit();

    // Load external scripts
    // ==================================================
    loadJS("//www.google-analytics.com/analytics.js");
    Social.load();

    // Initialize pages
    // ==================================================
    App.error404Init();
    App.newsletterInit();
    Work.init();

    // Other
    // ==================================================
    App.flickityInit();
    var postOverflow = document.querySelector(".js-post-overflow");
    if (postOverflow) {
      postOverflow.addEventListener("click", App.postOverflow);
    }

    // Initialize social and tracking
    // ==================================================
    App.googleAnalytics();
    Social.init();

    // About page Carbon Ads detection
    // ==================================================
    var aboutSidebarBreak = document.querySelector(".about-sidebar-break");
    if (aboutSidebarBreak) {
      setTimeout(function() {
        var carbonAds = document.querySelector("#carbonads");
        if (carbonAds) {
          Utility.addClass(aboutSidebarBreak, "has-carbonads");
        }
      }, 1000);
    }
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

  flickityInit: function() {
    var flickity = document.querySelector(".js-flickity");
    if (flickity) {
      loadJS("/assets/js/flickity.js");
    }
  },

  fontsInit: function() {
    var roboto400 = new FontFaceObserver("Roboto", {
      weight: 400
    });
    var roboto500 = new FontFaceObserver("Roboto", {
      weight: 500
    });
    var roboto700 = new FontFaceObserver("Roboto", {
      weight: 700
    });

    Promise.all([roboto400.check(), roboto500.check(), roboto700.check()])
           .then(function() {
              document.documentElement.className += " fonts-loaded";
           });
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

  postOverflow: function(e) {
    e.preventDefault();

    var overflow = document.querySelector(".post-overflow"),
        contentHeight = document.querySelector(".post-article").offsetHeight;

    overflow.style.maxHeight = contentHeight + "px";
    Utility.addClass(overflow, "has-transition");
    Utility.addClass(overflow, "is-reading");
    overflow.addEventListener(App.transitionEnd, overflowTransitionEnd);
    if (ga) {
      ga("send", "pageview", {
        "page" : this.getAttribute("data-url") + "index.html",
        "title": this.getAttribute("data-title")
      });
    }

    function overflowTransitionEnd() {
      overflow.style.maxHeight = "inherit";
      Utility.removeClass(overflow, "has-transition");
    }
  },
};

App.init();