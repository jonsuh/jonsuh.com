// ==================================================
// Get <meta> content values
// ==================================================
var metaTags     = document.getElementsByTagName("meta"),
    metaArray    = [],
    // metaContent  = ["fontsCSS", "fontsJS", "mainCSS", "mainJS", "pageCSS", "pageJS"];
    metaContent  = ["fontsCSS", "mainCSS", "pageCSS"];

for (var i = 0; i < metaTags.length; i++) {
  if (metaContent.indexOf(metaTags[i].getAttribute("name")) > -1) {
    metaArray.push(metaTags[i]);
  }
}

// ==================================================
// loadCSS
// ==================================================
for (var i = 0; i < metaArray.length; i++) {
  var metaAttrName = metaArray[i].getAttribute("name");

  if (metaAttrName.match(/CSS/)) {
    if (metaAttrName == "mainCSS") {
      loadCSS(metaArray[i].getAttribute("content"), null, null, function() {
        document.cookie = "mainCSS=true";
      });
    } else {
      loadCSS(metaArray[i].getAttribute("content"));
    }
  }
}

// ==================================================
// Detect fonts with FontFaceObserver
// ==================================================
(function() {
  var roboto400 = new FontFaceObserver("Roboto", {
    weight: 400
  });
  var roboto500 = new FontFaceObserver("Roboto", {
    weight: 500
  });
  var roboto700 = new FontFaceObserver("Roboto", {
    weight: 700
  });

  Promise.all([
    roboto400.check(),
    roboto500.check(),
    roboto700.check()
  ]).then(function() {
    document.documentElement.className += " fonts-loaded";
    document.cookie = "fonts-loaded=true";
  }, function() {
    document.documentElement.className += " fonts-timeout";
  });
})();

// (function () {
//   "use strict";
//   // once cached, the css file is stored on the client forever unless
//   // the URL below is changed. Any change will invalidate the cache
//   var css_href = "/assets/css/fonts.css?v=201504021747";
//   // a simple event handler wrapper
//   function on(el, ev, callback) {
//     if (el.addEventListener) {
//       el.addEventListener(ev, callback, false);
//     } else if (el.attachEvent) {
//       el.attachEvent("on" + ev, callback);
//     }
//   }
  
//   // if we have the fonts in localStorage or if we've cached them using the native batrowser cache
//   if ((window.localStorage && localStorage.font_css_cache) || document.cookie.indexOf("font_css_cache") > -1){
//     // just use the cached version
//     injectFontsStylesheet();
//   } else {
//    // otherwise, don't block the loading of the page; wait until it's done.
//     on(window, "load", injectFontsStylesheet);
//   }
  
//   // quick way to determine whether a css file has been cached locally
//   function fileIsCached(href) {
//     return window.localStorage && localStorage.font_css_cache && (localStorage.font_css_cache_file === href);
//   }

//   // time to get the actual css file
//   function injectFontsStylesheet() {
//    // if this is an older browser
//     if (!window.localStorage || !window.XMLHttpRequest) {
//       var stylesheet = document.createElement("link");
//       stylesheet.href = css_href;
//       stylesheet.rel = "stylesheet";
//       stylesheet.type = "text/css";
//       document.getElementsByTagName("head")[0].appendChild(stylesheet);
//       // just use the native browser cache
//       // this requires a good expires header on the server
//       document.cookie = "font_css_cache";
    
//     // if this isn't an old browser
//     } else {
//        // use the cached version if we already have it
//       if (fileIsCached(css_href)) {
//         injectRawStyle(localStorage.font_css_cache);
//       // otherwise, load it with ajax
//       } else {
//         var xhr = new XMLHttpRequest();
//         xhr.open("GET", css_href, true);
//         // cater for IE8 which does not support addEventListener or attachEvent on XMLHttpRequest
//         xhr.onreadystatechange = function () {
//           if (xhr.readyState === 4) {
//             // once we have the content, quickly inject the css rules
//             injectRawStyle(xhr.responseText);
//             // and cache the text content for further use
//             // notice that this overwrites anything that might have already been previously cached
//             localStorage.font_css_cache = xhr.responseText;
//             localStorage.font_css_cache_file = css_href;
//           }
//         };
//         xhr.send();
//       }
//     }
//   }

//   // this is the simple utitily that injects the cached or loaded css text
//   function injectRawStyle(text) {
//     var style = document.createElement("style");
//     // cater for IE8 which doesn't support style.innerHTML
//     style.setAttribute("type", "text/css");
//     if (style.styleSheet) {
//       style.styleSheet.cssText = text;
//     } else {
//       style.innerHTML = text;
//     }
//     document.getElementsByTagName("head")[0].appendChild(style);
//   }

// }());

// ==================================================
// loadJS
// ==================================================
function loadJS( src, cb ){
  "use strict";
  var ref = window.document.getElementsByTagName( "script" )[ 0 ];
  var script = window.document.createElement( "script" );
  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore( script, ref );
  if (cb && typeof(cb) === "function") {
    script.onload = cb;
  }
  return script;
}

// for (var i = 0; i < metaArray.length; i++) {
//   if (metaArray[i].getAttribute("name").match(/JS/)) {
//     loadJS(metaArray[i].getAttribute("content"));
//   }
// }