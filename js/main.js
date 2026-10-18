/* ==========================================================================
   Renders the page from data/content.js. You normally do not need to edit this.
   Structure: helpers -> one render function per section -> dialog -> nav -> init
   ========================================================================== */
(function () {
  "use strict";

  var S = window.SITE;
  if (!S) { console.error("data/content.js did not load."); return; }

  /* ---------- helpers ---------- */

  // h("div", { class: "x" }, child1, child2) builds DOM safely (no innerHTML, so text can never inject markup).
  function h(tag, props) {
    var el = document.createElement(tag);
    props = props || {};
    Object.keys(props).forEach(function (k) {
      var v = props[k];
      if (v === null || v === undefined || v === false) return;
      if (k === "class") el.className = v;
      else if (k === "text") el.textContent = v;
      else if (k.indexOf("on") === 0 && typeof v === "function") el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? "" : v);
    });
    for (var i = 2; i < arguments.length; i++) append(el, arguments[i]);
    return el;
  }
  function append(el, child) {
    if (child === null || child === undefined || child === false) return;
    if (Array.isArray(child)) { child.forEach(function (c) { append(el, c); }); return; }
    el.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
  }

  var SVG_NS = "http://www.w3.org/2000/svg";
  function s(tag, props) {
    var el = document.createElementNS(SVG_NS, tag);
    Object.keys(props || {}).forEach(function (k) { el.setAttribute(k, props[k]); });
    for (var i = 2; i < arguments.length; i++) if (arguments[i]) el.appendChild(arguments[i]);
    return el;
  }

  // Only allow links we expect, so a typo in content.js cannot create a harmful link.
  function safeUrl(u) {
    u = (u || "").trim();
    if (!u) return "";
    if (/^(https?:|mailto:|#|assets\/|\.\/|\/)/i.test(u)) return u;
    return "";
  }
  function visible(list) { return (list || []).filter(function (x) { return x && x.visible !== false; }); }
  function mount(id, nodes) { var el = document.getElementById(id); if (el) { el.textContent = ""; append(el, nodes); } return el; }

  function sectionHead(id, title, lead) {
    return h("div", { class: "section__head" },
      h("h2", { class: "section__title", id: id + "-title", text: title }),
      lead ? h("p", { class: "section__lead", text: lead }) : null
    );
  }
  function bullets(list) {
    return h("ul", { class: "bullet-list" }, (list || []).map(function (t) { return h("li", { text: t }); }));
  }
  function tags(list, cls) {
    return h("ul", { class: "tag-list " + (cls || "") }, (list || []).map(function (t) { return h("li", { class: "tag", text: t }); }));
  }

  /* ---------- hero ---------- */

  // Decorative loop that connects four words around the portrait: business -> process -> data -> technology.
  function flowGraphic(words) {
    var path = "M88 56 H432 A28 28 0 0 1 460 84 V476 A28 28 0 0 1 432 504 H88 A28 28 0 0 1 60 476 V84 A28 28 0 0 1 88 56 Z";
    var corners = [[60, 56], [460, 56], [460, 504], [60, 504]];
    var arrows = [[260, 56, 0], [460, 280, 90], [260, 504, 180], [60, 280, 270]];
    var svg = s("svg", { class: "flow", viewBox: "0 0 520 560", "aria-hidden": "true", focusable: "false" });
    svg.appendChild(s("path", { class: "flow__loop-base", d: path, fill: "none" }));
    svg.appendChild(s("path", { class: "flow__loop", d: path, fill: "none", pathLength: "1" }));
    arrows.forEach(function (a) {
      svg.appendChild(s("path", { class: "flow__arrow", d: "M-6 -6 L6 0 L-6 6 Z", transform: "translate(" + a[0] + " " + a[1] + ") rotate(" + a[2] + ")" }));
    });
    (words || []).slice(0, 4).forEach(function (w, i) {
      var c = corners[i];
      var g = s("g", { class: "flow__node", style: "--i:" + i });
      g.appendChild(s("rect", { x: c[0] - 56, y: c[1] - 19, width: 112, height: 38, rx: 10 }));
      var t = s("text", { x: c[0], y: c[1] + 5, "text-anchor": "middle" });
      t.textContent = w;
      g.appendChild(t);
      svg.appendChild(g);
    });
    return svg;
  }

  function portrait(hero) {
    var src = safeUrl(hero.photo);
    if (src) {
      return h("div", { class: "portrait" },
        h("img", { src: src, alt: hero.photoAlt || "", width: "640", height: "736", decoding: "async", fetchpriority: "high" }));
    }
    // Placeholder shown until you set hero.photo in content.js
    var glyph = s("svg", { viewBox: "0 0 120 140", "aria-hidden": "true", focusable: "false" },
      s("circle", { cx: 60, cy: 52, r: 24 }),
      s("path", { d: "M14 140c0-30 20-50 46-50s46 20 46 50z" }));
    return h("div", { class: "portrait portrait--placeholder", role: "img", "aria-label": "Photo placeholder. Add your portrait in data/content.js." },
      glyph, h("span", { class: "portrait__hint", "aria-hidden": "true", text: "Your photo here" }));
  }

  function renderHero() {
    var d = S.hero, a = d.primaryButton, b = d.secondaryButton;
    mount("home", h("div", { class: "container hero__grid" },
      h("div", { class: "hero__copy" },
        h("p", { class: "eyebrow", text: d.eyebrow }),
        h("h1", { class: "hero__title", id: "hero-title", text: d.title }),
        d.text ? h("p", { class: "hero__text", text: d.text }) : null,
        h("div", { class: "hero__actions" },
          a && safeUrl(a.href) ? h("a", { class: "button button--light", href: safeUrl(a.href), text: a.label }) : null,
          b && safeUrl(b.href) ? h("a", { class: "button button--outline", href: safeUrl(b.href), text: b.label }) : null),
        d.tags && d.tags.length ? tags(d.tags, "tag-list--dark") : null
      ),
      h("div", { class: "hero__visual" }, flowGraphic(d.flow), portrait(d))
    ));
  }

  /* ---------- about ---------- */

  function renderAbout() {
    var d = S.about;
    var facts = (d.facts || []).filter(function (f) { return f.value; });
    mount("about", h("div", { class: "container section__grid" },
      sectionHead("about", d.title, d.lead),
      h("div", { class: "section__body" },
        h("p", { class: "about__text", text: d.text }),
        h("div", { class: "about__split" },
          h("div", null,
            h("h3", { class: "subhead", text: d.interestsTitle || "Professional interests" }),
            h("ul", { class: "ruled-list" }, (d.interests || []).map(function (t) { return h("li", { text: t }); }))),
          facts.length ? h("div", null,
            h("h3", { class: "subhead", text: "Education" }),
            h("dl", { class: "facts" }, facts.map(function (f) {
              return h("div", { class: "facts__row" + (f.highlight ? " facts__row--hl" : "") }, h("dt", { text: f.label }), h("dd", { text: f.value }));
            }))) : null
        )
      )
    ));
  }

  /* ---------- skills ---------- */

  function renderSkills() {
    var d = S.skills;
    mount("skills", h("div", { class: "container section__grid" },
      sectionHead("skills", d.title, d.lead),
      h("div", { class: "section__body" },
        h("dl", { class: "skill-groups" }, (d.groups || []).map(function (g) {
          return h("div", { class: "skill-group" },
            h("dt", { class: "skill-group__name", text: g.name }),
            h("dd", { class: "skill-group__items" }, tags(g.items, "tag-list--light")));
        })))
    ));
  }

  /* ---------- experience ---------- */

  function renderExperience() {
    var d = S.experience;
    mount("experience", h("div", { class: "container section__grid" },
      sectionHead("experience", d.title, d.lead),
      h("div", { class: "section__body stack" }, visible(d.items).map(function (x) {
        var meta = [x.organization, x.period].filter(Boolean);
        return h("article", { class: "card exp" },
          h("h3", { class: "card__title", text: x.role }),
          meta.length ? h("p", { class: "card__meta" },
            x.organization ? h("span", { text: x.organization }) : null,
            x.period ? h("span", { class: "card__period", text: x.period }) : null) : null,
          x.bullets && x.bullets.length ? bullets(x.bullets) : null);
      }))
    ));
  }

  /* ---------- projects + detail dialog ---------- */

  function renderProjects() {
    var d = S.projects;
    mount("projects", h("div", { class: "container section__grid section__grid--wide" },
      sectionHead("projects", d.title, d.lead),
      h("div", { class: "project-grid" }, visible(d.items).map(function (p) {
        var open = function (e) { openProject(p, e.currentTarget); };
        return h("article", { class: "project" },
          h("button", { class: "project__media", type: "button", "aria-label": "Open details for " + p.title, onclick: open },
            h("img", { src: safeUrl(p.cover), alt: p.coverAlt || "", width: "1280", height: "720", loading: "lazy", decoding: "async" })),
          h("div", { class: "project__body" },
            h("h3", { class: "card__title", text: p.title }),
            h("p", { class: "card__meta", text: p.subtitle }),
            h("p", { class: "project__summary", text: p.summary }),
            tags(p.tags, "tag-list--light"),
            h("button", { class: "button button--navy", type: "button", onclick: open },
              "View details", h("span", { class: "visually-hidden", text: " of " + p.title }))));
      }))
    ));
  }

  var dialog = document.getElementById("project-dialog");
  var dialogBody = document.getElementById("project-dialog-body");
  var lastOpener = null;

  function openProject(p, opener) {
    if (!dialog) return;
    lastOpener = opener || null;
    var gallery = (p.gallery && p.gallery.length ? p.gallery : [{ src: p.cover, alt: p.coverAlt, caption: "" }]);
    var mainImg = h("img", { class: "gallery__img", src: safeUrl(gallery[0].src), alt: gallery[0].alt || "", width: "1280", height: "720" });
    var caption = h("figcaption", { class: "gallery__caption", text: gallery[0].caption || "" });
    var thumbs = null;

    if (gallery.length > 1) {
      thumbs = h("ul", { class: "gallery__thumbs", "aria-label": "Project images" }, gallery.map(function (g, i) {
        var btn = h("button", {
          class: "gallery__thumb", type: "button", "aria-pressed": i === 0 ? "true" : "false",
          "aria-label": "Show image " + (i + 1) + " of " + gallery.length + (g.caption ? ": " + g.caption : ""),
          onclick: function () {
            mainImg.src = safeUrl(g.src); mainImg.alt = g.alt || ""; caption.textContent = g.caption || "";
            Array.prototype.forEach.call(thumbs.querySelectorAll("button"), function (b) { b.setAttribute("aria-pressed", "false"); });
            btn.setAttribute("aria-pressed", "true");
          }
        }, h("img", { src: safeUrl(g.src), alt: "", width: "160", height: "90", loading: "lazy" }));
        return h("li", null, btn);
      }));
    }

    var links = (p.links || []).filter(function (l) { return safeUrl(l.href); });
    dialogBody.textContent = "";
    append(dialogBody, [
      h("h2", { class: "modal__title", id: "project-dialog-title", text: p.title }),
      h("p", { class: "card__meta", text: p.subtitle }),
      h("figure", { class: "gallery" }, mainImg, caption),
      thumbs,
      h("p", { class: "modal__summary", text: p.summary }),
      p.highlights && p.highlights.length ? [h("h3", { class: "subhead", text: "What the project covers" }), bullets(p.highlights)] : null,
      tags(p.tags, "tag-list--light"),
      links.length ? h("div", { class: "modal__links" }, links.map(function (l) {
        return h("a", { class: "button button--navy", href: safeUrl(l.href), target: "_blank", rel: "noopener noreferrer" },
          l.label, h("span", { class: "visually-hidden", text: " (opens in a new tab)" }));
      })) : null
    ]);

    document.documentElement.classList.add("is-locked");
    if (typeof dialog.showModal === "function") dialog.showModal(); else dialog.setAttribute("open", "");
    dialog.scrollTop = 0;
  }

  function closeDialog() {
    if (!dialog) return;
    if (typeof dialog.close === "function") dialog.close(); else dialog.removeAttribute("open");
    afterClose();
  }
  function afterClose() {
    document.documentElement.classList.remove("is-locked");
    if (lastOpener && lastOpener.focus) lastOpener.focus();
    lastOpener = null;
  }
  if (dialog) {
    dialog.querySelector(".modal__close").addEventListener("click", closeDialog);
    dialog.addEventListener("click", function (e) { if (e.target === dialog) closeDialog(); }); // click on the dim backdrop
    dialog.addEventListener("close", afterClose); // also fires on Esc
  }

  /* ---------- certifications ---------- */

  function renderCertifications() {
    var d = S.certifications;
    mount("certifications", h("div", { class: "container section__grid" },
      sectionHead("certifications", d.title, d.lead),
      h("div", { class: "section__body cert-grid" }, visible(d.items).map(function (c) {
        var img = safeUrl(c.image);
        return h("article", { class: "card cert" },
          img
            ? h("a", { class: "cert__zoom", href: img, target: "_blank", rel: "noopener noreferrer" },
                h("img", { class: "cert__image", src: img, alt: c.imageAlt || "", width: "1600", height: "1131", loading: "lazy", decoding: "async" }),
                h("span", { class: "visually-hidden", text: "Open the certificate image full size (opens in a new tab)" }))
            : h("div", { class: "cert__image cert__image--empty", "aria-hidden": "true" },
                h("svg", { viewBox: "0 0 24 24", width: "28", height: "28" }, [
                  s("rect", { x: 3.5, y: 4.5, width: 17, height: 15, rx: 2, fill: "none", stroke: "currentColor", "stroke-width": 1.5 }),
                  s("path", { d: "M7 15l3.2-3.4 2.6 2.6 2-1.8L17.5 15", fill: "none", stroke: "currentColor", "stroke-width": 1.5, "stroke-linejoin": "round" })
                ]),
                h("span", { text: "Certificate image" })),
          h("div", { class: "cert__body" },
            h("p", { class: "cert__kind", text: c.kind }),
            h("h3", { class: "card__title card__title--small", text: c.title }),
            h("p", { class: "card__meta" },
              h("span", { text: c.institution }),
              c.date ? h("span", { class: "card__period", text: c.date }) : null),
            c.description ? h("p", { class: "cert__text", text: c.description }) : null));
      }))
    ));
  }

  /* ---------- contact ---------- */

  function renderContact() {
    var d = S.contact;
    var rows = [];
    if (safeUrl(d.linkedin)) rows.push({ label: "LinkedIn", value: d.linkedin.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""), href: d.linkedin, external: true });
    if ((d.email || "").trim()) rows.push({ label: "Email", value: d.email.trim(), href: "mailto:" + d.email.trim() });
    if (safeUrl(d.github)) rows.push({ label: "GitHub", value: d.github.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""), href: d.github, external: true });

    mount("contact", h("div", { class: "container contact__grid" },
      h("div", null,
        h("h2", { class: "contact__title", id: "contact-title", text: d.title }),
        h("p", { class: "contact__text", text: d.text }),
        S.cvPath ? h("a", { class: "button button--light", href: safeUrl(S.cvPath), download: "", text: "Download CV" }) : null),
      rows.length ? h("ul", { class: "contact__links" }, rows.map(function (r) {
        return h("li", null,
          h("a", { class: "contact__link", href: r.href, target: r.external ? "_blank" : null, rel: r.external ? "noopener noreferrer" : null },
            h("span", { class: "contact__label", text: r.label }),
            h("span", { class: "contact__value", text: r.value }),
            r.external ? h("span", { class: "visually-hidden", text: " (opens in a new tab)" }) : null));
      })) : null
    ));
  }

  /* ---------- navigation ---------- */

  function initNav() {
    var nav = document.querySelector(".nav");
    var toggle = document.querySelector(".nav__toggle");
    var menu = document.getElementById("nav-menu");

    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    }
    toggle.addEventListener("click", function () { setOpen(!nav.classList.contains("is-open")); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) { setOpen(false); toggle.focus(); }
    });

    // Mark the link of the section currently in view.
    var links = Array.prototype.slice.call(menu.querySelectorAll('.nav__list a[href^="#"]'));
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          links.forEach(function (a) { a.removeAttribute("aria-current"); });
          if (map[en.target.id]) map[en.target.id].setAttribute("aria-current", "true");
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      Object.keys(map).forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
    }
  }

  /* ---------- init ---------- */

  function init() {
    // Plain text bindings: <span data-bind="name"> and so on.
    Array.prototype.forEach.call(document.querySelectorAll("[data-bind]"), function (el) {
      var v = S[el.getAttribute("data-bind")];
      if (typeof v === "string" && v) el.textContent = v;
    });
    // Download CV buttons appear only when a CV path is set.
    Array.prototype.forEach.call(document.querySelectorAll("[data-cv]"), function (a) {
      if (S.cvPath) { a.href = safeUrl(S.cvPath); a.hidden = false; }
    });
    document.getElementById("year").textContent = new Date().getFullYear();

    renderHero(); renderAbout(); renderSkills(); renderExperience();
    renderProjects(); renderCertifications(); renderContact();
    initNav();
  }
  init();
})();
