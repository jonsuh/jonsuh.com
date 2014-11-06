var Work = Work || {};

Work = {
  init: function() {
    Work.psalmsCD();
  },

  psalmsCD: function() {
    var productAnimate = document.querySelector(".js-psalms-cd-product-animate");
    if (productAnimate) {
      var productDisc = document.querySelector(".psalms-cd-product-disc");
      productAnimate.addEventListener("click", function() {
        Utility.toggleClass(productDisc, "is-animated");
      });
    }

    var brandAnimate = document.querySelector(".js-psalms-cd-brand-animate");
    if (brandAnimate) {
      var brandLogoOverlayImage = document.querySelector(".psalms-cd-brand-logo-overlay-image"),
          brandLogoContainer = document.querySelector(".psalms-cd-brand-logo-container");

      brandAnimate.addEventListener("mousemove", function() {
        var thisWidth = this.offsetWidth,
            thisLeft = this.offsetLeft,
            mouseLeft = event.pageX;

        document.querySelector(".psalms-cd-brand-logo-overlay").style.left = (mouseLeft - thisLeft) + "px";
        brandLogoOverlayImage.style.width = thisWidth + "px";
      });

      window.addEventListener("resize", function() {
        brandLogoOverlayImage.style.width = brandLogoContainer.offsetWidth + "px";
      });
    }
  }
};