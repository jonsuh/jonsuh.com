var Social = Social || {};

Social = {
  facebookAppId: "", // PARTS OF THIS LINE HAVE BEEN REMOVED

  load: function() {
    var twitterShare = document.querySelector(".js-social-twitter-share");
    if (twitterShare) {
      Social.twitterLoad();
      Social.facebookLoad();
    }
  },

  init: function() {
    var twitterShares = document.querySelectorAll(".js-social-twitter-share");
    if (twitterShares) {
      [].forEach.call(twitterShares, function(twitterShare) {
        Social.facebookInit();
        Social.googleInit();
      });
    }
  },

  facebookLoad: function() {
    Utility.getScript("//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=" + Social.facebookAppId + "&version=v2.0");
  },

  facebookInit: function() {
    var facebookShares = document.querySelectorAll(".js-social-facebook-share");
    [].forEach.call(facebookShares, function(facebookShare) {
      facebookShare.addEventListener("click", Social.facebookShare);
    });
  },

  facebookShare: function(e) {
    if ( ! Utility.browserIsChromeiOS()) {
      e.preventDefault();

      FB.ui({
        method: "share",
        href: this.getAttribute("data-share-url")
      }, function(response){

      });
    }
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
    Utility.getScript("//platform.twitter.com/widgets.js");
  }
}