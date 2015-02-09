function loadCSS( href, before, media ){
  "use strict";
  var ss = window.document.createElement( "link" );
  var ref = before || window.document.getElementsByTagName( "script" )[ 0 ];
  var sheets = window.document.styleSheets;
  ss.rel = "stylesheet";
  ss.href = href;
  ss.media = "only x";
  ref.parentNode.insertBefore( ss, ref );
  function toggleMedia(){
    var defined;
    for( var i = 0; i < sheets.length; i++ ){
      if( sheets[ i ].href && sheets[ i ].href.indexOf( href ) > -1 ){
        defined = true;
      }
    }
    if( defined ){
      ss.media = media || "all";
    }
    else {
      setTimeout( toggleMedia );
    }
  }
  toggleMedia();
  return ss;
}

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

var metaTags     = document.getElementsByTagName("meta"),
    metaArray    = [],
    // metaContent  = ["fontsCSS", "fontsJS", "mainCSS", "mainJS", "pageCSS", "pageJS"];
    metaContent  = ["fontsCSS", "fontsJS", "pageCSS"];

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