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
          for (var a = {}, i = [], c = 0; c < n.length; c++) {
            var s = n[c],
              d = r.base ? s[0] + r.base : s[0],
              l = a[d] || 0,
              u = "".concat(d, " ").concat(l);
            a[d] = l + 1;
            var p = t(u),
              f = {
                css: s[1],
                media: s[2],
                sourceMap: s[3],
                supports: s[4],
                layer: s[5],
              };
            if (-1 !== p) (e[p].references++, e[p].updater(f));
            else {
              var m = o(f, r);
              ((r.byIndex = c),
                e.splice(c, 0, { identifier: u, updater: m, references: 1 }));
            }
            i.push(u);
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
              var c = t(a[i]);
              e[c].references--;
            }
            for (var s = r(n, o), d = 0; d < a.length; d++) {
              var l = t(a[d]);
              0 === e[l].references && (e[l].updater(), e.splice(l, 1));
            }
            a = s;
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
        t.d(e, { A: () => c });
        var r = t(601),
          o = t.n(r),
          a = t(314),
          i = t.n(a)()(o());
        i.push([
          n.id,
          '/* Базовые сбросы и box-sizing */\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: "Inter", sans-serif;\n  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);\n  min-height: 100vh;\n  padding: 20px;\n  color: #333;\n}\n\n/* Контейнер приложения */\n.app {\n  max-width: 1200px;\n  margin: 0 auto;\n}\n\n/* Карточки */\n.card {\n  background: white;\n  border-radius: 20px;\n  padding: 30px;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);\n  margin-bottom: 30px;\n}\n\n/* Шапка */\n.header {\n  text-align: center;\n  margin-bottom: 40px;\n}\n\n.header h1 {\n  font-size: 2.8rem;\n  margin-bottom: 20px;\n  color: #2d3748;\n}\n\n.search-box {\n  display: flex;\n  justify-content: center;\n  gap: 15px;\n  max-width: 500px;\n  margin: 0 auto;\n}\n\n#city-input {\n  flex-grow: 1;\n  padding: 15px 20px;\n  border: 2px solid #e2e8f0;\n  border-radius: 12px;\n  font-size: 1.1rem;\n  transition: border-color 0.3s;\n}\n\n#city-input:focus {\n  outline: none;\n  border-color: #4299e1;\n}\n\n#search-btn {\n  padding: 15px 30px;\n  background: #4299e1;\n  color: white;\n  border: none;\n  border-radius: 12px;\n  font-size: 1.1rem;\n  cursor: pointer;\n  transition: background 0.3s;\n}\n\n#search-btn:hover {\n  background: #3182ce;\n}\n\n/* Текущая погода */\n.current-weather h2 {\n  font-size: 1.8rem;\n  margin-bottom: 25px;\n  color: #4a5568;\n}\n\n.weather-display {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 40px;\n}\n\n.temperature {\n  font-size: 5rem;\n  font-weight: 600;\n  color: #2d3748;\n}\n\n.temperature sup {\n  font-size: 2.5rem;\n  vertical-align: super;\n}\n\n.weather-details p {\n  font-size: 1.2rem;\n  margin-bottom: 10px;\n  color: #4a5568;\n}\n\n.weather-details span {\n  font-weight: 600;\n  color: #2d3748;\n}\n\n/* Прогноз */\n.forecast h2 {\n  font-size: 1.8rem;\n  margin-bottom: 25px;\n  color: #4a5568;\n}\n\n.forecast-container {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));\n  gap: 20px;\n}\n\n.forecast-day {\n  background: #f7fafc;\n  border-radius: 12px;\n  padding: 20px;\n  text-align: center;\n  border: 1px solid #e2e8f0;\n}\n\n.forecast-day .day {\n  font-weight: 600;\n  margin-bottom: 10px;\n  color: #4a5568;\n}\n\n.forecast-day .temp {\n  font-size: 1.5rem;\n  font-weight: 600;\n  color: #2d3748;\n}\n\n.placeholder {\n  text-align: center;\n  color: #a0aec0;\n  font-style: italic;\n  grid-column: 1 / -1;\n  padding: 40px;\n}\n\n/* Подвал */\n.footer {\n  text-align: center;\n  margin-top: 40px;\n  color: #718096;\n  font-size: 0.9rem;\n}\n\n.footer a {\n  color: #4299e1;\n  text-decoration: none;\n}\n\n.footer a:hover {\n  text-decoration: underline;\n}\n\n/* Адаптивность */\n@media (max-width: 768px) {\n  .header h1 {\n    font-size: 2.2rem;\n  }\n\n  .search-box {\n    flex-direction: column;\n  }\n\n  .weather-display {\n    flex-direction: column;\n    text-align: center;\n    gap: 30px;\n  }\n\n  .temperature {\n    font-size: 4rem;\n  }\n\n  .forecast-container {\n    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));\n  }\n}\n',
          "",
        ]);
        const c = i;
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
                for (var c = 0; c < this.length; c++) {
                  var s = this[c][0];
                  null != s && (i[s] = !0);
                }
              for (var d = 0; d < n.length; d++) {
                var l = [].concat(n[d]);
                (r && i[l[0]]) ||
                  (void 0 !== a &&
                    (void 0 === l[5] ||
                      (l[1] = "@layer"
                        .concat(l[5].length > 0 ? " ".concat(l[5]) : "", " {")
                        .concat(l[1], "}")),
                    (l[5] = a)),
                  t &&
                    (l[2]
                      ? ((l[1] = "@media "
                          .concat(l[2], " {")
                          .concat(l[1], "}")),
                        (l[2] = t))
                      : (l[2] = t)),
                  o &&
                    (l[4]
                      ? ((l[1] = "@supports ("
                          .concat(l[4], ") {")
                          .concat(l[1], "}")),
                        (l[4] = o))
                      : (l[4] = "".concat(o))),
                  e.push(l));
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
    c = t(659),
    s = t.n(c),
    d = t(56),
    l = t.n(d),
    u = t(540),
    p = t.n(u),
    f = t(113),
    m = t.n(f),
    g = t(208),
    h = {};
  function x(n) {
    (alert(`Error: ${n}`), console.error("[UI] Error:", n));
  }
  ((h.styleTagTransform = m()),
    (h.setAttributes = l()),
    (h.insert = s().bind(null, "head")),
    (h.domAPI = i()),
    (h.insertStyleElement = p()),
    o()(g.A, h),
    g.A && g.A.locals && g.A.locals);
  const b = document.getElementById("city-input"),
    v = document.getElementById("search-box"),
    y = { lat: "52.3730796", lon: "4.8924534", name: "Amsterdam" },
    w = { lat: "55.625578", lon: "37.6063916", name: "Moscow" },
    E = { lat: "59.938784", lon: "30.314997", name: "SaintPetersburg" },
    I = { lat: "40.7127281", lon: "-74.0060152", name: "NewYork" },
    k = { lat: "48.856663", lon: "2.351556", name: "Paris" },
    M = { "X-Yandex-Weather-Key": "a45d67a4-3189-4adc-bd2d-fa7f3085bd59" };
  async function A() {
    let n = {};
    try {
      const e = await (function (n = {}) {
        return new Promise((e, t) => {
          navigator.geolocation
            ? navigator.geolocation.getCurrentPosition(
                e,
                (n) => {
                  let e = "Не удалось получить геолокацию";
                  switch (n.code) {
                    case n.PERMISSION_DENIED:
                      e = "Пользователь отказал в доступе к геолокации";
                      break;
                    case n.POSITION_UNAVAILABLE:
                      e = "Информация о местоположении недоступна";
                      break;
                    case n.TIMEOUT:
                      e = "Время ожидания геолокации истекло";
                  }
                  t(new Error(e));
                },
                { enableHighAccuracy: !0, timeout: 1e4, maximumAge: 6e5, ...n },
              )
            : t(new Error("Геолокация не поддерживается браузером"));
        });
      })();
      ((n = {
        lat: e.coords.latitude,
        lon: e.coords.longitude,
        name: "Ваше местоположение",
      }),
        console.log("Геолокация получена:", n.name));
    } catch (n) {
      return (
        console.warn("Не удалось получить геолокацию:", n.message),
        void z(y)
      );
    }
    (n.lat && n.lon && z(n), v.addEventListener("submit", P));
  }
  function P(n) {
    n.preventDefault();
    const e = b ? b.value.trim() : "";
    (console.log(`Перехвачено событие SUBMIT - город = ${e}`),
      e
        ? ((function (n) {
            switch ((console.log(`Обрабатываем город: ${n}`), n)) {
              case "amsterdam":
                z(y);
                break;
              case "moscow":
              case "Moscow":
              case "Москва":
              case "москва":
                z(w);
                break;
              case "saintpetersburg":
              case "SaintPetersburg":
              case "Петербург":
              case "СанктПетербург":
                z(E);
                break;
              case "newyork":
              case "NewYork":
                z(I);
                break;
              case "paris":
              case "Paris":
              case "Париж":
                z(k);
                break;
              default:
                n &&
                  x(
                    `Город "${n}" не найден. Попробуйте: Amsterdam, Moscow, SaintPetersburg, NewYork, Paris`,
                  );
            }
          })(e),
          (b.value = ""))
        : x("Пожалуйста, введите название города"));
  }
  async function z(n) {
    try {
      console.log(`Начало обработки для города: ${n.name || "неизвестный"}`);
      let t = await fetch(
        `https://api.weather.yandex.ru/v2/forecast?lat=${n.lat}&lon=${n.lon}`,
        { headers: M },
      );
      if (!t.ok) {
        console.log("rspnc не ок");
        const n = await t.text();
        return (
          console.error("HTTP Error:", t.status, n),
          void x(`Ошибка ${t.status}: Не удалось получить данные о погоде`)
        );
      }
      const r = await t.json();
      (console.log("Полные данные API:", r),
        (e = r),
        (document.getElementById("city-name").textContent =
          e.info?.tzinfo?.name),
        (document.getElementById("current-temp").textContent = Math.round(
          e.fact?.temp,
        )),
        (document.getElementById("feels-like").textContent = Math.round(
          e.fact?.feels_like,
        )),
        (document.getElementById("humidity").textContent = Math.round(
          e.fact?.humidity,
        )),
        (document.getElementById("wind-speed").textContent = Math.round(
          e.fact?.wind_speed,
        )),
        console.log(`Weather data loaded for ${n.name}`));
    } catch (n) {
      (x("Failed to load weather data. Please try again."),
        console.error("Error loading weather:", n));
    }
    var e;
  }
  "loading" === document.readyState
    ? document.addEventListener("DOMContentLoaded", A)
    : A();
})();
