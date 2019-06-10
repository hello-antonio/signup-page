// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/index.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function () {
  var form = document.querySelector("form");
  /**
   * Client-Side Validation
   * ATTENTION: Server-side validation is REQUIRED
   */

  var ValidateClientSideForm =
  /*#__PURE__*/
  function () {
    function ValidateClientSideForm(form) {
      _classCallCheck(this, ValidateClientSideForm);

      this._form = form;
      /*
      Validation patterns for different field types. Password validation is very loose, don't forget this is only a demo without clear requirement about this type of data.
      */

      this.validator = {
        email: {
          regex: /^([a-zA-Z0-9\.-]{1,64})+@([a-z]{1,254})+\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
          help: "Looks like this is not an email"
        },
        text: {
          regex: /^[a-zA-Z\s]+?$/,
          help: "cannot be empty"
        },
        password: {
          regex: /^[a-zA-Z0-9\_-]+?$/,
          help: "cannot be empty"
        }
      };
      this._errors = [];
      this.fields = _toConsumableArray(this._form.querySelectorAll("input[type=text], input[type=email], input[type=password]"));
    }

    _createClass(ValidateClientSideForm, [{
      key: "init",
      value: function init() {
        var _this = this;

        this._form.addEventListener("submit", this.handleSubmit.bind(this));

        this.fields.forEach(function (field) {
          field.addEventListener("focus", _this.handleFocus.bind(_this), true);
          field.addEventListener("blur", _this.handleBlur.bind(_this), true);
          field.addEventListener("input", _this.handleInput.bind(_this));
        });
      }
    }, {
      key: "validate",
      value: function validate(field) {
        var value = field.value,
            type = field.type,
            name = field.name;
        if (value === "") return false;else if (name === "email") {
          if (this.validator[name].regex.test(value)) return true;else return false;
        } else if (this.validator[type].regex.test(value)) return true;else return false;
      }
    }, {
      key: "addValidation",
      value: function addValidation(field) {
        if (this.validate(field)) this.removeAlert(field.id);else this.addAlert(field.id);
      }
    }, {
      key: "addAlert",
      value: function addAlert(id) {
        var field = this.fields.find(function (field) {
          return field.id === id;
        });
        this.setAlert(field);
        this.setError(field.name);
      }
    }, {
      key: "removeAlert",
      value: function removeAlert(id) {
        var field = this.fields.find(function (field) {
          return field.id === id;
        });
        this.clearAlert(field);
        this.clearError(field.name);
      }
    }, {
      key: "setAlert",
      value: function setAlert(field) {
        var type = field.type,
            name = field.name;
        field.classList.add("invalid");
        field.classList.remove("valid");
        field.setAttribute("aria-invalid", true);
        field.parentElement.nextElementSibling.textContent = "".concat(name === "email" ? this.validator[name].help : [field.labels[0].textContent, this.validator[type].help].join(" "));
      }
    }, {
      key: "clearAlert",
      value: function clearAlert(field) {
        field.classList.remove("invalid");
        field.classList.add("valid");
        field.setAttribute("aria-invalid", false);
        field.parentElement.nextElementSibling.textContent = "";
      }
    }, {
      key: "setError",
      value: function setError(errName) {
        if (this._errors.includes(errName)) return;

        this._errors.push(errName);
      }
    }, {
      key: "clearError",
      value: function clearError(errName) {
        if (this._errors.length == 0) return;

        this._errors.splice(this._errors.indexOf(errName), 1);
      }
    }, {
      key: "setFocus",
      value: function setFocus(name) {
        var el = this.fields.find(function (el) {
          return el.name === name;
        });
        el.focus();
      }
    }, {
      key: "getEmptyFields",
      value: function getEmptyFields() {
        return this.fields.filter(function (field) {
          return field.value === "";
        });
      }
    }, {
      key: "submitForm",
      value: function submitForm() {
        var _this2 = this;

        // If found errors from instant validation then auto focus the first error
        if (this._errors.length > 0) {
          this.setFocus(this._errors[0]);
          return false;
        } // else validate fields if user left empty fields
        else if (this.getEmptyFields().length > 0) {
            this.getEmptyFields().forEach(function (field) {
              _this2.addValidation(field);
            });
            this.setFocus(this.getEmptyFields()[0].name);
            return false;
          } // ready to subumit form
          else return true;
      }
    }, {
      key: "handleSubmit",
      value: function handleSubmit(event) {
        event.preventDefault(); // returns true if form has no errors else false forms has errors.

        this.submitForm();
      }
    }, {
      key: "handleFocus",
      value: function handleFocus(_ref) {
        var target = _ref.target;
        target.parentElement.classList.add("focused");
      }
    }, {
      key: "handleBlur",
      value: function handleBlur(_ref2) {
        var target = _ref2.target;

        if (target.value.length == 0) {
          target.parentElement.classList.remove("focused");
        }
      }
    }, {
      key: "handleInput",
      value: function handleInput(_ref3) {
        var target = _ref3.target;
        // handles instant validation the field
        this.addValidation(target);
      }
    }]);

    return ValidateClientSideForm;
  }();

  new ValidateClientSideForm(form).init();
})();
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "42365" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map