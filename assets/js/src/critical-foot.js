// ==================================================
// Google Analytics
// ==================================================
(function(i, s, o, g, r, a, m) {
  i["GoogleAnalyticsObject"] = r;
  i[r] = i[r] || function() {
    (i[r].q = i[r].q || []).push(arguments)
  }, i[r].l = 1 * new Date();
  a = s.createElement(o),
  m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m)
})(window, document, "script", "//www.google-analytics.com/analytics.js", "ga");

ga("create", "UA-2018785-1", "auto");
ga("send", "pageview", {transport: "beacon"});

// ==================================================
// aload
// ==================================================
function aload(t) {
  "use strict";
  t = t || window.document.querySelectorAll("[data-aload]"), void 0 === t.length && (t = [t]);
  var a, e = 0,
      r = t.length;
  for (e; r > e; e += 1) a = t[e], a["LINK" !== a.tagName ? "src" : "href"] = a.getAttribute("data-aload"), a.removeAttribute("data-aload");
  return t
}
aload();