(() => {
  "use strict";
  var n = {
      56(n, e, t) {
        n.exports = function (n) {
          var e = t.nc;
          e && n.setAttribute("nonce", e);
        };
      },
      72(n) {
        var e = [];
        function t(n) {
          for (var t = -1, r = 0; r < e.length; r++)
            if (e[r].identifier === n) {
              t = r;
              break;
            }
          return t;
        }
        function r(n, r) {
          for (var a = {}, i = [], s = 0; s < n.length; s++) {
            var c = n[s],
              d = r.base ? c[0] + r.base : c[0],
              u = a[d] || 0,
              l = "".concat(d, " ").concat(u);
            a[d] = u + 1;
            var p = t(l),
              m = {
                css: c[1],
                media: c[2],
                sourceMap: c[3],
                supports: c[4],
                layer: c[5],
              };
            if (-1 !== p) (e[p].references++, e[p].updater(m));
            else {
              var f = o(m, r);
              ((r.byIndex = s),
                e.splice(s, 0, { identifier: l, updater: f, references: 1 }));
            }
            i.push(l);
          }
          return i;
        }
        function o(n, e) {
          var t = e.domAPI(e);
          return (
            t.update(n),
            function (e) {
              if (e) {
                if (
                  e.css === n.css &&
                  e.media === n.media &&
                  e.sourceMap === n.sourceMap &&
                  e.supports === n.supports &&
                  e.layer === n.layer
                )
                  return;
                t.update((n = e));
              } else t.remove();
            }
          );
        }
        n.exports = function (n, o) {
          var a = r((n = n || []), (o = o || {}));
          return function (n) {
            n = n || [];
            for (var i = 0; i < a.length; i++) {
              var s = t(a[i]);
              e[s].references--;
            }
            for (var c = r(n, o), d = 0; d < a.length; d++) {
              var u = t(a[d]);
              0 === e[u].references && (e[u].updater(), e.splice(u, 1));
            }
            a = c;
          };
        };
      },
      113(n) {
        n.exports = function (n, e) {
          if (e.styleSheet) e.styleSheet.cssText = n;
          else {
            for (; e.firstChild; ) e.removeChild(e.firstChild);
            e.appendChild(document.createTextNode(n));
          }
        };
      },
      208(n, e, t) {
        t.d(e, { A: () => s });
        var r = t(601),
          o = t.n(r),
          a = t(314),
          i = t.n(a)()(o());
        i.push([
          n.id,
          '/* Базовые сбросы и box-sizing */\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: "Inter", sans-serif;\n  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);\n  min-height: 100vh;\n  padding: 20px;\n  color: #333;\n}\n\n/* Контейнер приложения */\n.app {\n  max-width: 1200px;\n  margin: 0 auto;\n}\n\n/* Карточки */\n.card {\n  background: white;\n  border-radius: 20px;\n  padding: 30px;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);\n  margin-bottom: 30px;\n}\n\n/* Шапка */\n.header {\n  text-align: center;\n  margin-bottom: 40px;\n}\n\n.header h1 {\n  font-size: 2.8rem;\n  margin-bottom: 20px;\n  color: #2d3748;\n}\n\n.search-box {\n  display: flex;\n  justify-content: center;\n  gap: 15px;\n  max-width: 500px;\n  margin: 0 auto;\n}\n\n#city-input {\n  flex-grow: 1;\n  padding: 15px 20px;\n  border: 2px solid #e2e8f0;\n  border-radius: 12px;\n  font-size: 1.1rem;\n  transition: border-color 0.3s;\n}\n\n#city-input:focus {\n  outline: none;\n  border-color: #4299e1;\n}\n\n#search-btn {\n  padding: 15px 30px;\n  background: #4299e1;\n  color: white;\n  border: none;\n  border-radius: 12px;\n  font-size: 1.1rem;\n  cursor: pointer;\n  transition: background 0.3s;\n}\n\n#search-btn:hover {\n  background: #3182ce;\n}\n\n/* Текущая погода */\n.current-weather h2 {\n  font-size: 1.8rem;\n  margin-bottom: 25px;\n  color: #4a5568;\n}\n\n.weather-display {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 40px;\n}\n\n.temperature {\n  font-size: 5rem;\n  font-weight: 600;\n  color: #2d3748;\n}\n\n.temperature sup {\n  font-size: 2.5rem;\n  vertical-align: super;\n}\n\n.weather-details p {\n  font-size: 1.2rem;\n  margin-bottom: 10px;\n  color: #4a5568;\n}\n\n.weather-details span {\n  font-weight: 600;\n  color: #2d3748;\n}\n\n/* Прогноз */\n.forecast h2 {\n  font-size: 1.8rem;\n  margin-bottom: 25px;\n  color: #4a5568;\n}\n\n.forecast-container {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));\n  gap: 20px;\n}\n\n.forecast-day {\n  background: #f7fafc;\n  border-radius: 12px;\n  padding: 20px;\n  text-align: center;\n  border: 1px solid #e2e8f0;\n}\n\n.forecast-day .day {\n  font-weight: 600;\n  margin-bottom: 10px;\n  color: #4a5568;\n}\n\n.forecast-day .temp {\n  font-size: 1.5rem;\n  font-weight: 600;\n  color: #2d3748;\n}\n\n.placeholder {\n  text-align: center;\n  color: #a0aec0;\n  font-style: italic;\n  grid-column: 1 / -1;\n  padding: 40px;\n}\n\n/* Подвал */\n.footer {\n  text-align: center;\n  margin-top: 40px;\n  color: #718096;\n  font-size: 0.9rem;\n}\n\n.footer a {\n  color: #4299e1;\n  text-decoration: none;\n}\n\n.footer a:hover {\n  text-decoration: underline;\n}\n\n/* Адаптивность */\n@media (max-width: 768px) {\n  .header h1 {\n    font-size: 2.2rem;\n  }\n\n  .search-box {\n    flex-direction: column;\n  }\n\n  .weather-display {\n    flex-direction: column;\n    text-align: center;\n    gap: 30px;\n  }\n\n  .temperature {\n    font-size: 4rem;\n  }\n\n  .forecast-container {\n    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));\n  }\n}\n',
          "",
        ]);
        const s = i;
      },
      314(n) {
        n.exports = function (n) {
          var e = [];
          return (
            (e.toString = function () {
              return this.map(function (e) {
                var t = "",
                  r = void 0 !== e[5];
                return (
                  e[4] && (t += "@supports (".concat(e[4], ") {")),
                  e[2] && (t += "@media ".concat(e[2], " {")),
                  r &&
                    (t += "@layer".concat(
                      e[5].length > 0 ? " ".concat(e[5]) : "",
                      " {",
                    )),
                  (t += n(e)),
                  r && (t += "}"),
                  e[2] && (t += "}"),
                  e[4] && (t += "}"),
                  t
                );
              }).join("");
            }),
            (e.i = function (n, t, r, o, a) {
              "string" == typeof n && (n = [[null, n, void 0]]);
              var i = {};
              if (r)
                for (var s = 0; s < this.length; s++) {
                  var c = this[s][0];
                  null != c && (i[c] = !0);
                }
              for (var d = 0; d < n.length; d++) {
                var u = [].concat(n[d]);
                (r && i[u[0]]) ||
                  (void 0 !== a &&
                    (void 0 === u[5] ||
                      (u[1] = "@layer"
                        .concat(u[5].length > 0 ? " ".concat(u[5]) : "", " {")
                        .concat(u[1], "}")),
                    (u[5] = a)),
                  t &&
                    (u[2]
                      ? ((u[1] = "@media "
                          .concat(u[2], " {")
                          .concat(u[1], "}")),
                        (u[2] = t))
                      : (u[2] = t)),
                  o &&
                    (u[4]
                      ? ((u[1] = "@supports ("
                          .concat(u[4], ") {")
                          .concat(u[1], "}")),
                        (u[4] = o))
                      : (u[4] = "".concat(o))),
                  e.push(u));
              }
            }),
            e
          );
        };
      },
      540(n) {
        n.exports = function (n) {
          var e = document.createElement("style");
          return (n.setAttributes(e, n.attributes), n.insert(e, n.options), e);
        };
      },
      601(n) {
        n.exports = function (n) {
          return n[1];
        };
      },
      659(n) {
        var e = {};
        n.exports = function (n, t) {
          var r = (function (n) {
            if (void 0 === e[n]) {
              var t = document.querySelector(n);
              if (
                window.HTMLIFrameElement &&
                t instanceof window.HTMLIFrameElement
              )
                try {
                  t = t.contentDocument.head;
                } catch (n) {
                  t = null;
                }
              e[n] = t;
            }
            return e[n];
          })(n);
          if (!r)
            throw new Error(
              "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.",
            );
          r.appendChild(t);
        };
      },
      825(n) {
        n.exports = function (n) {
          if ("undefined" == typeof document)
            return { update: function () {}, remove: function () {} };
          var e = n.insertStyleElement(n);
          return {
            update: function (t) {
              !(function (n, e, t) {
                var r = "";
                (t.supports && (r += "@supports (".concat(t.supports, ") {")),
                  t.media && (r += "@media ".concat(t.media, " {")));
                var o = void 0 !== t.layer;
                (o &&
                  (r += "@layer".concat(
                    t.layer.length > 0 ? " ".concat(t.layer) : "",
                    " {",
                  )),
                  (r += t.css),
                  o && (r += "}"),
                  t.media && (r += "}"),
                  t.supports && (r += "}"));
                var a = t.sourceMap;
                (a &&
                  "undefined" != typeof btoa &&
                  (r +=
                    "\n/*# sourceMappingURL=data:application/json;base64,".concat(
                      btoa(unescape(encodeURIComponent(JSON.stringify(a)))),
                      " */",
                    )),
                  e.styleTagTransform(r, n, e.options));
              })(e, n, t);
            },
            remove: function () {
              !(function (n) {
                if (null === n.parentNode) return !1;
                n.parentNode.removeChild(n);
              })(e);
            },
          };
        };
      },
    },
    e = {};
  function t(r) {
    var o = e[r];
    if (void 0 !== o) return o.exports;
    var a = (e[r] = { id: r, exports: {} });
    return (n[r](a, a.exports, t), a.exports);
  }
  ((t.n = (n) => {
    var e = n && n.__esModule ? () => n.default : () => n;
    return (t.d(e, { a: e }), e);
  }),
    (t.d = (n, e) => {
      for (var r in e)
        t.o(e, r) &&
          !t.o(n, r) &&
          Object.defineProperty(n, r, { enumerable: !0, get: e[r] });
    }),
    (t.o = (n, e) => Object.prototype.hasOwnProperty.call(n, e)),
    (t.nc = void 0));
  var r = t(72),
    o = t.n(r),
    a = t(825),
    i = t.n(a),
    s = t(659),
    c = t.n(s),
    d = t(56),
    u = t.n(d),
    l = t(540),
    p = t.n(l),
    m = t(113),
    f = t.n(m),
    g = t(208),
    h = {};
  ((h.styleTagTransform = f()),
    (h.setAttributes = u()),
    (h.insert = c().bind(null, "head")),
    (h.domAPI = i()),
    (h.insertStyleElement = p()),
    o()(g.A, h),
    g.A && g.A.locals && g.A.locals);
  const y = document.getElementById("city-name"),
    x = document.getElementById("current-temp"),
    w = document.getElementById("feels-like"),
    v = document.getElementById("humidity"),
    b = document.getElementById("wind-speed");
  function C(n) {
    n &&
      ((y.textContent = n.name || "Unknown"),
      (x.textContent = Math.round(n.main.temp)),
      (w.textContent = Math.round(n.main.feels_like)),
      (v.textContent = n.main.humidity),
      (b.textContent = n.wind.speed));
  }
  function E(n) {
    (alert(n), console.error(n));
  }
  const I = "https://api.openweathermap.org/data/2.5",
    k = new (class {
      constructor(n) {
        this.apiKey = n;
      }
      async getCurrentWeatherByCity(n) {
        if (!n) throw new Error("City name is required");
        const e = `${I}/weather?q=${encodeURIComponent(n)}&units=metric&appid=${this.apiKey}`,
          t = await fetch(e);
        if (!t.ok) {
          const n = await t.json().catch(() => ({}));
          throw new Error(n.message || `HTTP error ${t.status}`);
        }
        const r = await t.json();
        return this._transformCurrentWeather(r);
      }
      async getCurrentWeatherByCoords(n, e) {
        if (!n || !e) throw new Error("Latitude and longitude are required");
        const t = `${I}/weather?lat=${n}&lon=${e}&units=metric&appid=${this.apiKey}`,
          r = await fetch(t);
        if (!r.ok) {
          const n = await r.json().catch(() => ({}));
          throw new Error(n.message || `HTTP error ${r.status}`);
        }
        const o = await r.json();
        return this._transformCurrentWeather(o);
      }
      _transformCurrentWeather(n) {
        return {
          name: n.name,
          main: {
            temp: n.main.temp,
            feels_like: n.main.feels_like,
            humidity: n.main.humidity,
          },
          wind: { speed: n.wind.speed },
          weather: n.weather[0],
        };
      }
    })("85b882b62fd1ca76d52cf910a69a5296"),
    L = new (class {
      getCurrentPosition(n = {}) {
        return new Promise((e, t) => {
          navigator.geolocation
            ? navigator.geolocation.getCurrentPosition(
                (n) => {
                  e({ lat: n.coords.latitude, lon: n.coords.longitude });
                },
                (n) => {
                  let e = "Failed to get location";
                  switch (n.code) {
                    case 1:
                      e = "Location access denied";
                      break;
                    case 2:
                      e = "Location information unavailable";
                      break;
                    case 3:
                      e = "Location request timed out";
                  }
                  t(new Error(e));
                },
                { enableHighAccuracy: !0, timeout: 1e4, maximumAge: 6e5, ...n },
              )
            : t(new Error("Geolocation is not supported by your browser"));
        });
      }
    })(),
    z = "lastCity",
    T = new (class {
      saveLastCity(n) {
        n && localStorage.setItem(z, n);
      }
      getLastCity() {
        return localStorage.getItem(z) || null;
      }
      clearLastCity() {
        localStorage.removeItem(z);
      }
    })(),
    A = document.getElementById("city-input"),
    M = document.getElementById("search-box");
  async function $(n) {
    try {
      (C(await k.getCurrentWeatherByCity(n)), T.saveLastCity(n));
    } catch (e) {
      E(`Не удалось загрузить погоду для "${n}": ${e.message}`);
    }
  }
  async function B(n) {
    n.preventDefault();
    const e = A.value.trim();
    e ? (await $(e), (A.value = "")) : E("Введите название города");
  }
  async function S() {
    try {
      const { lat: n, lon: e } = await L.getCurrentPosition();
      await (async function (n, e) {
        try {
          const t = await k.getCurrentWeatherByCoords(n, e);
          (C(t), T.saveLastCity(t.name));
        } catch (n) {
          E(`Не удалось загрузить погоду: ${n.message}`);
        }
      })(n, e);
    } catch (n) {
      console.warn("Геолокация не доступна:", n.message);
      const e = T.getLastCity();
      e ? await $(e) : await $("Moscow");
    }
    M.addEventListener("submit", B);
  }
  "loading" === document.readyState
    ? document.addEventListener("DOMContentLoaded", S)
    : S();
})();
