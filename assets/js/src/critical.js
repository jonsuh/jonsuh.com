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

var metaTags     = document.getElementsByTagName("meta"),
    metaArray    = [],
    // metaContent  = ["fontsCSS", "fontsJS", "mainCSS", "mainJS", "pageCSS", "pageJS"];
    metaContent  = ["fontsCSS", "pageCSS"];

for (var i = 0; i < metaTags.length; i++) {
  if (metaContent.indexOf(metaTags[i].getAttribute("name")) > -1) {
    metaArray.push(metaTags[i]);
  }
}

for (var i = 0; i < metaArray.length; i++) {
  if (metaArray[i].getAttribute("name").match(/CSS/)) {
    loadCSS(metaArray[i].getAttribute("content"));
  } else if (metaArray[i].getAttribute("name").match(/JS/)) {
    loadJS(metaArray[i].getAttribute("content"));
  }
}