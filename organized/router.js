(function () {
  // --- Route definitions (single source of truth) ---
  var ENTRY = "login/login.html";

  var ROUTES = {
    login:            "login/login.html",
    home:             "home/index.html",
    register:         "register/register form.html",
    profile:          "profile/profile.html",
    courses:          "availablecourses/available courses.html",
    webdev:           "availablecourses/webdevlopment.html",
    cybersecurity:    "availablecourses/cybersecurity.html",
    blockchain:       "availablecourses/blockchain.html",
    uiux:             "availablecourses/uiux.html",
    meemuai:          "meemuai/Meemu ai.html",
    about:            "about/about.html"
  };

  // --- Auto-detect relative depth from the script tag's src ---
  var depth = "";
  (function () {
    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].getAttribute("src") || "";
      if (src.indexOf("router.js") !== -1) {
        // e.g. src="../router.js" → depth = "../"
        depth = src.replace("router.js", "");
        break;
      }
    }
  })();

  // --- Public helpers ---
  function getRoute(name) {
    if (!ROUTES[name]) {
      console.warn("router.js: unknown route '" + name + "'");
      return "#";
    }
    return depth + ROUTES[name];
  }

  function navigateTo(name) {
    window.location.href = getRoute(name);
  }

  // --- Navbar renderer ---
  var NAV_LINKS = [
    { route: "home",      label: "Home" },
    { route: "courses",   label: "Courses" },
    { route: "meemuai",   label: "Meemu AI" },
    { route: "register",  label: "Register" },
    { route: "login",     label: "Login" },
    { route: "profile",   label: "Profile" },
    { route: "about",     label: "About" }
  ];

  function renderNavbar() {
    var container = document.getElementById("navbar");
    if (!container) return;

    var nav = document.createElement("nav");
    nav.id = "discoveru-navbar";

    var brand = document.createElement("a");
    brand.href = getRoute("home");
    brand.className = "nav-brand";
    brand.textContent = "DiscoverU Academy";
    nav.appendChild(brand);

    var ul = document.createElement("ul");
    ul.className = "nav-links";

    for (var i = 0; i < NAV_LINKS.length; i++) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = getRoute(NAV_LINKS[i].route);
      a.textContent = NAV_LINKS[i].label;
      li.appendChild(a);
      ul.appendChild(li);
    }

    nav.appendChild(ul);
    container.appendChild(nav);
  }

  // --- Run on DOM ready ---
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderNavbar);
  } else {
    renderNavbar();
  }

  // --- Expose globally ---
  window.DiscoverURouter = {
    getRoute: getRoute,
    navigateTo: navigateTo,
    ROUTES: ROUTES,
    ENTRY: ENTRY
  };
})();
