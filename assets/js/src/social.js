var Social = Social || {};

Social = {
  facebookAppId: "146160702084886", // PARTS OF THIS LINE HAVE BEEN REMOVED
  disqusShortName: "jonsuh",

  load: function() {
    var twitterShare = document.querySelector(".twitter-follow-button");
    if (twitterShare) {
      Social.twitterLoad();
      // Social.facebookLoad();
    }

    var comments = document.querySelector(".post-comments");
    if (comments) {
      Utility.addClass(comments, "is-loaded");
      Social.commentsInit();
    }
  },

  init: function() {
    var twitterShares = document.querySelectorAll(".js-social-twitter-share");
    if (twitterShares) {
      [].forEach.call(twitterShares, function(twitterShare) {
        Social.facebookInit();
        Social.googleInit();
        Social.twitterInit();
      });
    }
  },

  commentsLoad: function(e) {
    e.preventDefault();
    Utility.getScript("//" + Social.disqusShortName + ".disqus.com/embed.js");
    Utility.addClass(this, "is-hidden");
  },

  commentsInit: function() {
    var commentsLoads = document.querySelectorAll(".js-comments-load");
    [].forEach.call(commentsLoads, function(commentsLoad) {
      commentsLoad.addEventListener("click", Social.commentsLoad);
    });
  },

  // facebookLoad: function() {
  //   Utility.getScript("//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=" + Social.facebookAppId + "&version=v2.0");
  // },

  facebookInit: function() {
    var facebookShares = document.querySelectorAll(".js-social-facebook-share");
    [].forEach.call(facebookShares, function(facebookShare) {
      facebookShare.addEventListener("click", Social.facebookShare);
    });
  },

  facebookShare: function(e) {
    // if ( ! Utility.browserIsChromeiOS()) {
    //   e.preventDefault();

    //   FB.ui({
    //     method: "share",
    //     href: this.getAttribute("data-share-url")
    //   }, function(response){

    //   });
    // }

    e.preventDefault();

    Utility.windowOpen(this.getAttribute("href"), 600, 350);
  },

  googleInit: function() {
    var googleShares = document.querySelectorAll(".js-social-google-share");
    [].forEach.call(googleShares, function(googleShare) {
      googleShare.addEventListener("click", Social.googleShare);
    });
  },

  googleShare: function(e) {
    e.preventDefault();

    Utility.windowOpen(this.getAttribute("href"), 600, 360);
  },

  twitterLoad: function() {
    loadJS("//platform.twitter.com/widgets.js");
  }

  twitterInit: function() {
    var twitterShares = document.querySelectorAll(".js-social-twitter-share");
    [].forEach.call(twitterShares, function(twitterShare) {
      twitterShare.addEventListener("click", Social.twitterShare);
    });
  },

  twitterShare: function(e) {
    e.preventDefault();

    Utility.windowOpen(this.getAttribute("href"), 600, 300);
  }
}