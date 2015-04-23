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
    App.cookieInit();

    // Other
    // ==================================================
    App.codePenInit();
    App.flickityInit();
    // var postOverflow = document.querySelector(".js-post-overflow");
    // if (postOverflow) {
    //   postOverflow.addEventListener("click", App.postOverflow);
    // }

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

  codePenInit: function() {
    var codePen = document.querySelector(".codepen");
    if (codePen) {
      loadJS("//assets.codepen.io/assets/embed/ei.js");
    }
  },

  cookieInit: function() {
    if (document.cookie.indexOf("mainJS=true") == -1) {
      document.cookie = "mainJS=true";
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
    (function(d) {
      var config = {
          kitId: "iko7pqe",
          scriptTimeout: 3000
        },
        h = d.documentElement,
        t = setTimeout(function() {
          h.className = h.className.replace(/\bwf-loading\b/g, "") + " wf-inactive";
        }, config.scriptTimeout),
        tk = d.createElement("script"),
        f = false,
        s = d.getElementsByTagName("script")[0],
        a;
      h.className += " wf-loading";
      tk.src = "//use.typekit.net/" + config.kitId + ".js";
      tk.async = true;
      tk.onload = tk.onreadystatechange = function() {
        a = this.readyState;
        if (f || a && a != "complete" && a != "loaded") return;
        f = true;
        clearTimeout(t);
        try {
          Typekit.load(config)
        } catch (e) {}
      };
      s.parentNode.insertBefore(tk, s)
    })(document);
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

  // postOverflow: function(e) {
  //   e.preventDefault();

  //   var overflow = document.querySelector(".post-overflow"),
  //       contentHeight = document.querySelector(".post-article").offsetHeight;

  //   overflow.style.maxHeight = contentHeight + "px";
  //   Utility.addClass(overflow, "has-transition");
  //   Utility.addClass(overflow, "is-reading");
  //   overflow.addEventListener(App.transitionEnd, overflowTransitionEnd);
  //   if (ga) {
  //     ga("send", "pageview", {
  //       "page" : this.getAttribute("data-url"),
  //       "title": this.getAttribute("data-title")
  //     });
  //   }

  //   function overflowTransitionEnd() {
  //     overflow.style.maxHeight = "inherit";
  //     Utility.removeClass(overflow, "has-transition");
  //   }
  // },
};

App.init();