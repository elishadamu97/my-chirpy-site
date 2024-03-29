/*!
 * Chirpy v6.5.5 | © 2019 Cotes Chung | MIT Licensed | https://github.com/cotes2020/jekyll-theme-chirpy/
 */
!(function () {
  'use strict';
  const t = $('.mode-toggle');
  function e(t) {
    var e = (function (t, e) {
      if ('object' != typeof t || !t) return t;
      var a = t[Symbol.toPrimitive];
      if (void 0 !== a) {
        var s = a.call(t, e || 'default');
        if ('object' != typeof s) return s;
        throw new TypeError('@@toPrimitive must return a primitive value.');
      }
      return ('string' === e ? String : Number)(t);
    })(t, 'string');
    return 'symbol' == typeof e ? e : e + '';
  }
  function a(t, a, s) {
    return (
      (a = e(a)) in t
        ? Object.defineProperty(t, a, {
            value: s,
            enumerable: !0,
            configurable: !0,
            writable: !0
          })
        : (t[a] = s),
      t
    );
  }
  const s = $('body'),
    o = 'sidebar-display';
  class r {
    static toggle() {
      !1 === r.isExpanded ? s.attr(o, '') : s.removeAttr(o),
        (r.isExpanded = !r.isExpanded);
    }
  }
  a(r, 'isExpanded', !1);
  const i = $('#sidebar-trigger'),
    l = $('#search-trigger'),
    n = $('#search-cancel'),
    c = $('#main-wrapper>.container>.row'),
    d = $('#topbar-title'),
    u = $('search'),
    m = $('#search-result-wrapper'),
    f = $('#search-results'),
    p = $('#search-input'),
    g = $('#search-hints'),
    h = $('html,body'),
    b = 'loaded',
    v = 'unloaded',
    C = 'input-focus',
    y = 'd-flex';
  class w {
    static on() {
      (w.offset = window.scrollY), h.scrollTop(0);
    }
    static off() {
      h.scrollTop(w.offset);
    }
  }
  a(w, 'offset', 0), a(w, 'resultVisible', !1);
  class T {
    static on() {
      i.addClass(v), d.addClass(v), l.addClass(v), u.addClass(y), n.addClass(b);
    }
    static off() {
      n.removeClass(b),
        u.removeClass(y),
        i.removeClass(v),
        d.removeClass(v),
        l.removeClass(v);
    }
  }
  class k {
    static on() {
      w.resultVisible ||
        (w.on(), m.removeClass(v), c.addClass(v), (w.resultVisible = !0));
    }
    static off() {
      w.resultVisible &&
        (f.empty(),
        g.hasClass(v) && g.removeClass(v),
        m.addClass(v),
        c.removeClass(v),
        w.off(),
        p.val(''),
        (w.resultVisible = !1));
    }
  }
  function x() {
    return n.hasClass(b);
  }
  $('.collapse');
  $('.code-header>button').children().attr('class');
  const E = 'data-src',
    j = 'data-lqip',
    M = {
      SHIMMER: 'shimmer',
      BLUR: 'blur'
    };
  function A(t) {
    $(this).parent().removeClass(t);
  }
  function F() {
    this.complete &&
      (this.hasAttribute(j) ? A.call(this, M.BLUR) : A.call(this, M.SHIMMER));
  }
  function R() {
    const t = $(this),
      e = t.attr(E);
    t.attr('src', encodeURI(e)), t.removeAttr(E);
  }
  class S {
    static get attrTimestamp() {
      return 'data-ts';
    }
    static get attrDateFormat() {
      return 'data-df';
    }
    static get locale() {
      return $('html').attr('lang').substring(0, 2);
    }
    static getTimestamp(t) {
      return Number(t.attr(S.attrTimestamp));
    }
    static getDateFormat(t) {
      return t.attr(S.attrDateFormat);
    }
  }
  !(function () {
    const t = $(window),
      e = $('#back-to-top');
    t.on('scroll', () => {
      t.scrollTop() > 50 ? e.fadeIn() : e.fadeOut();
    }),
      e.on('click', () => {
        t.scrollTop(0);
      });
  })(),
    [...document.querySelectorAll('[data-bs-toggle="tooltip"]')].map(
      (t) => new bootstrap.Tooltip(t)
    ),
    0 !== t.length &&
      t.off().on('click', (t) => {
        const e = $(t.target);
        let a = e.prop('tagName') === 'button'.toUpperCase() ? e : e.parent();
        modeToggle.flipMode(), a.trigger('blur');
      }),
    $('#sidebar-trigger').on('click', r.toggle),
    $('#mask').on('click', r.toggle),
    l.on('click', function () {
      T.on(), k.on(), p.trigger('focus');
    }),
    n.on('click', function () {
      T.off(), k.off();
    }),
    p.on('focus', function () {
      u.addClass(C);
    }),
    p.on('focusout', function () {
      u.removeClass(C);
    }),
    p.on('input', () => {
      '' === p.val()
        ? x()
          ? g.removeClass(v)
          : k.off()
        : (k.on(), x() && g.addClass(v));
    }),
    dayjs.locale(S.locale),
    dayjs.extend(window.dayjs_plugin_localizedFormat),
    $('['.concat(S.attrTimestamp, ']')).each(function () {
      const t = dayjs.unix(S.getTimestamp($(this))),
        e = t.format(S.getDateFormat($(this)));
      $(this).text(e),
        $(this).removeAttr(S.attrTimestamp),
        $(this).removeAttr(S.attrDateFormat);
      const a = $(this).attr('data-bs-toggle');
      if (void 0 === a || 'tooltip' !== a) return;
      const s = t.format('llll');
      $(this).attr('data-bs-title', s), new bootstrap.Tooltip($(this));
    }),
    (function () {
      const t = $('article img');
      t.length && t.on('load', F),
        $('article img[loading="lazy"]').each(function () {
          this.complete && A.call(this, M.SHIMMER);
        });
      const e = $('article img['.concat(j, '="true"]'));
      e.length && e.each(R);
    })();
})();

if ('serviceWorker' in navigator) {
  const isEnabled = 'true' === 'true';
  if (isEnabled) {
    const swUrl = '/sw.min.js';
    const $notification = $('#notification');
    const $btnRefresh = $('#notification .toast-body>button');
    navigator.serviceWorker.register(swUrl).then((registration) => {
      if (registration.waiting) {
        $notification.toast('show');
      }
      registration.addEventListener('updatefound', () => {
        registration.installing.addEventListener('statechange', () => {
          if (registration.waiting) {
            if (navigator.serviceWorker.controller) {
              $notification.toast('show');
            }
          }
        });
      });
      $btnRefresh.on('click', () => {
        if (registration.waiting) {
          registration.waiting.postMessage('SKIP_WAITING');
        }
        $notification.toast('hide');
      });
    });
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        window.location.reload();
        refreshing = true;
      }
    });
  } else {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      for (let registration of registrations) {
        registration.unregister();
      }
    });
  }
}
