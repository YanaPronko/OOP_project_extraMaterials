/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/customizator.js":
/*!********************************!*\
  !*** ./src/js/customizator.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Customizator; });
class Customizator {
  constructor() {
    this.btnsBlock = document.createElement("div");
    this.colorPicker = document.createElement("input");
    this.clear = document.createElement("div");
    this.scale = localStorage.getItem("scale") || 1;
    this.color = localStorage.getItem("color") || "#ffffff";
    this.btnsBlock.addEventListener("click", e => this.onScaleChange(e));
    this.colorPicker.addEventListener("input", e => this.onColorChange(e));
    this.clear.addEventListener("click", () => this.reset());
  }

  onScaleChange(e) {
    let scale;
    const body = document.body;

    if (e) {
      this.scale = e.target.value.replace(/x/g, "");
    }

    const recursy = elements => {
      elements.childNodes.forEach(node => {
        if (node.nodeName === "#text" && node.nodeValue.replace(/\s+/g, "").length > 0) {
          if (!node.parentNode.getAttribute("data-fz")) {
            // let parent = node.parentNode;
            let value = window.getComputedStyle(node.parentNode, null).fontSize;
            node.parentNode.setAttribute("data-fz", +value.replace(/px/g, ""));
            node.parentNode.style.fontSize = node.parentNode.getAttribute("data-fz") * this.scale + "px";
          } else {
            node.parentNode.style.fontSize = node.parentNode.getAttribute("data-fz") * this.scale + "px";
          }
        } else {
          recursy(node);
        }
      });
    };

    recursy(body);
    localStorage.setItem("scale", this.scale);
  }

  onColorChange(e) {
    document.body.style.backgroundColor = e.target.value;
    localStorage.setItem("color", e.target.value);
  }

  setBg() {
    document.body.style.backgroundColor = this.color;
    this.colorPicker.value = this.color;
  }

  reset() {
    localStorage.clear();
    this.scale = 1;
    this.color = "#ffffff";
    this.setBg();
    this.onScaleChange();
  }

  render() {
    this.setBg();
    this.onScaleChange();
    let inputScaleS = document.createElement("input");
    let inputScaleM = document.createElement("input");
    let panel = document.createElement("div");
    this.colorPicker.setAttribute("type", "color");
    this.colorPicker.setAttribute("value", "#ffffff");
    this.colorPicker.classList.add("color");
    this.clear.innerHTML = "&times";
    this.clear.classList.add("clear");
    inputScaleS.setAttribute("type", "button");
    inputScaleM.setAttribute("type", "button");
    inputScaleS.setAttribute("value", "1x");
    inputScaleM.setAttribute("value", "1.5x");
    inputScaleM.classList.add("scale_btn");
    inputScaleS.classList.add("scale_btn");
    panel.classList.add("panel");
    this.btnsBlock.classList.add("scale");
    this.btnsBlock.append(inputScaleS, inputScaleM);
    panel.append(this.btnsBlock, this.colorPicker, this.clear);
    document.body.append(panel);
  }

}

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _customizator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./customizator */ "./src/js/customizator.js");

window.addEventListener("DOMContentLoaded", () => {
  const panel = new _customizator__WEBPACK_IMPORTED_MODULE_0__["default"]();
  panel.render();
});

/***/ })

/******/ });
//# sourceMappingURL=script.js.map