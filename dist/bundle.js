/*!
 * Popup overlay for OpenLayers 3 with UMD wrapper
 * Fork of Matt Walker ol3-popup https://github.com/walkermatt/ol3-popup
 * 
 * @package ol3-popup-umd
 * @author Vladimir Vershinin (https://github.com/ghettovoice)
 * @authorMatt Walker (http://longwayaround.org.uk),@authorAvi Kelman <patcherton.fixesthings@gmail.com>
 * @version 1.2.0
 * @licence MIT https://opensource.org/licenses/MIT
 *          Based on OpenLayers 3. Copyright 2005-2016 OpenLayers Contributors. All rights reserved. http://openlayers.org
 * @copyright (c) 2016 Matt Walker, Vladimir Vershinin (https://github.com/ghettovoice)
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("openlayers"));
	else if(typeof define === 'function' && define.amd)
		define(["openlayers"], factory);
	else if(typeof exports === 'object')
		exports["PopupOverlay"] = factory(require("openlayers"));
	else
		root["ol"] = root["ol"] || {}, root["ol"]["PopupOverlay"] = factory(root["ol"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _popup = __webpack_require__(2);

	var _popup2 = _interopRequireDefault(_popup);

	__webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Popup overlay for OpenLayers 3 with UMD wrapper.
	 * Fork of Matt Walker ol3-popup https://github.com/walkermatt/ol3-popup
	 *
	 * @author Vladimir Vershinin <ghettovoice@gmail.com>
	 * @author Matt Walker (http://longwayaround.org.uk)
	 * @author Avi Kelman <patcherton.fixesthings@gmail.com>
	 * @licence MIT https://opensource.org/licenses/MIT
	 *          Based on OpenLayers 3. Copyright 2005-2016 OpenLayers Contributors. All rights reserved. http://openlayers.org
	 * @copyright (c) 2016 Matt Walker, Vladimir Vershinin
	 */
	exports.default = _popup2.default;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.easeInQuad = easeInQuad;
	exports.easeOutQuad = easeOutQuad;
	exports.easeInOutQuad = easeInOutQuad;
	exports.easeInCubic = easeInCubic;
	exports.easeOutCubic = easeOutCubic;
	exports.easeInOutCubic = easeInOutCubic;
	/**
	 * Easing functions pack
	 */
	/**
	 * @param t
	 * @return {number}
	 */
	function easeInQuad(t) {
	  return t * t;
	}

	/**
	 * @param t
	 * @return {number}
	 */
	function easeOutQuad(t) {
	  return t * (2 - t);
	}

	/**
	 * @param t
	 * @return {number}
	 */
	function easeInOutQuad(t) {
	  return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
	}

	/**
	 * @param t
	 * @return {number}
	 */
	function easeInCubic(t) {
	  return t * t * t;
	}

	/**
	 * @param t
	 * @return {number}
	 */
	function easeOutCubic(t) {
	  return --t * t * t + 1;
	}

	/**
	 * @param t
	 * @return {number}
	 */
	function easeInOutCubic(t) {
	  return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _openlayers = __webpack_require__(5);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	var _util = __webpack_require__(3);

	var _easing = __webpack_require__(1);

	var easing = _interopRequireWildcard(_easing);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @typedef {Object} PopupOptions
	 * @property {number | string | undefined} id Set the overlay id. The overlay id can be used with the `ol.Map#getOverlayById` method.
	 * @property {number[] | undefined} offset Offsets in pixels used when positioning the overlay. The first element in the array is the horizontal offset.
	 *                                         A positive value shifts the overlay right. The second element in the array is the vertical offset.
	 *                                         A positive value shifts the overlay down. Default is `[0, 0]`.
	 * @property {ol.Coordinate | undefined} position The overlay position in map projection.
	 * @property {ol.OverlayPositioning | string | undefined} positioning Defines how the overlay is actually positioned with respect to its position property.
	 *                                                                      Possible values are `bottom-left`, `bottom-center`, `bottom-right`, `center-left`,
	 *                                                                      `center-center`, `center-right`, `top-left`, `top-center`, and `top-right`.
	 *                                                                      Default is `top-left`.
	 * @property {boolean | undefined} stopEvent Whether event propagation to the map viewport should be stopped. Default is `true`.
	 *                                           If true the overlay is placed in the same container as that of the controls (CSS class name `ol-overlaycontainer-stopevent`);
	 *                                           if false it is placed in the container with CSS class name `ol-overlaycontainer`.
	 * @property {boolean | undefined} insertFirst Whether the overlay is inserted first in the overlay container, or appended.
	 *                                             Default is `true`. If the overlay is placed in the same container as that of the controls
	 *                                             (see the `stopEvent` option) you will probably set `insertFirst` to true so the overlay is displayed below the controls.
	 * @property {boolean | undefined} autoPan If set to `true` the map is panned when calling `setPosition`, so that the overlay is entirely visible in the current viewport.
	 *                                         The default is `true`.
	 * @property {olx.animation.PanOptions | undefined} autoPanAnimation The options used to create a `ol.animation.pan` animation.
	 *                                                                   This animation is only used when `autoPan` is enabled.
	 *                                                                   Default is `{ duration: 300, easing: easeInOutCubic }`.
	 *                                                                   If set to `null` the panning is not animated.
	 * @property {number | undefined} autoPanMargin The margin (in pixels) between the overlay and the borders of the map when autopanning. The default is `20`.
	 * @property {Element | HTMLCollection | string | undefined} content Popup initial content.
	 * @property {function | undefined} beforeShow Function that called before popup show. Can be used for show animation.
	 * @property {function | undefined} beforeHide Function that called before popup hide. Can be used for hide animation.
	 */
	var PopupOptions;

	/**
	 * @enum {string}
	 * @private
	 */
	var PopupEventType = {
	    /**
	     * Triggered upon popup open.
	     * @event Popup#show
	     */
	    SHOW: "show",
	    /**
	     * Triggered upon popup close.
	     * @event Popup#hide
	     */
	    HIDE: "hide"
	};

	/**
	 * Popup Overlay for OpenLayer 3.
	 */

	var Popup = function (_ol$Overlay) {
	    _inherits(Popup, _ol$Overlay);

	    /**
	     * @param {PopupOptions} [options] Popup options.
	     */

	    function Popup() {
	        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	        _classCallCheck(this, Popup);

	        var element = createDOMElement();

	        options.autoPan = (0, _util.coalesce)(options.autoPan, true);
	        options.autoPanAnimation = (0, _util.coalesce)(options.autoPanAnimation, {
	            duration: 300,
	            easing: easing.easeInOutCubic
	        });

	        /**
	         * @type {function}
	         * @private
	         */

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Popup).call(this, _extends({}, options, {
	            element: element
	        })));

	        _this.beforeShow_ = (0, _util.coalesce)(options.beforeShow, _util.noop);
	        /**
	         * @type {function}
	         * @private
	         */
	        _this.beforeHide_ = (0, _util.coalesce)(options.beforeHide, _util.noop);
	        /**
	         * @type {Element}
	         * @private
	         */
	        _this.content_ = _this.getElement().querySelector('.ol-popup-content');
	        /**
	         * @type {Element}
	         * @private
	         */
	        _this.closer_ = _this.getElement().querySelector('.ol-popup-closer');
	        /**
	         * @type {Object<string, Object>}
	         * @private
	         */
	        _this.eventListeners_ = {};

	        enableTouchScroll(_this.content_);

	        if (options.content) {
	            _this.content = options.content;
	        }
	        return _this;
	    }

	    //noinspection JSAnnotator
	    /**
	     * @type {HTMLCollection} Inner content of popup.
	     */


	    _createClass(Popup, [{
	        key: "setContent",


	        /**
	         * @param {Element | HTMLCollection | string} content Update popup inner content.
	         */
	        value: function setContent(content) {
	            var _this2 = this;

	            (0, _util.emptyElement)(this.content_);

	            if ((0, _util.isElement)(content)) {
	                this.content_.appendChild(content);
	            } else if ((0, _util.isString)(content)) {
	                this.content_.insertAdjacentHTML('afterBegin', content);
	            } else if ((0, _util.isArrayLike)(content)) {
	                [].slice.call(content).forEach(function (elem) {
	                    return _this2.content_.appendChild(elem);
	                });
	            }
	        }

	        /**
	         * @returns {HTMLCollection} Inner content of popup.
	         */

	    }, {
	        key: "getContent",
	        value: function getContent() {
	            return this.content_.children;
	        }

	        /**
	         * @param {ol.Map} map OpenLayers map object.
	         */

	    }, {
	        key: "setMap",
	        value: function setMap(map) {
	            _get(Object.getPrototypeOf(Popup.prototype), "setMap", this).call(this, map);

	            if (map) {
	                this.bindEvents_();
	                this.bringToFront();
	            } else {
	                this.unbindEvents_();
	            }
	        }

	        /**
	         * Show on top of other popups.
	         */

	    }, {
	        key: "bringToFront",
	        value: function bringToFront() {
	            var container = this.getElement().parentNode;
	            var overlaysContainer = container.parentNode;
	            var lastOverlay = Array.from(overlaysContainer.querySelectorAll(".ol-overlay-container")).pop();

	            if (lastOverlay && lastOverlay !== container) {
	                overlaysContainer.insertBefore(container, lastOverlay.nextSibling);
	            }
	        }

	        /**
	         * Shows popup.
	         *
	         * @param {ol.Coordinate} [coordinate] New popup position.
	         * @param {Element | HTMLCollection | string} [content] Replace inner content.
	         * @return {Promise} Returns Promise that resolves when showing completes.
	         * @fires Popup#show Show event.
	         */

	    }, {
	        key: "show",
	        value: function show(coordinate, content) {
	            var _this3 = this;

	            if (content) {
	                this.content = content;
	            }

	            if (coordinate) {
	                this.setPosition(coordinate);
	            }

	            return Promise.resolve(this.beforeShow_(this)).then(function () {
	                _this3.getElement().style.display = "block";

	                _this3.dispatchEvent('change:position');
	                /**
	                 * Show event.
	                 *
	                 * @event Popup#show
	                 */
	                _this3.dispatchEvent(PopupEventType.SHOW);
	                _this3.set("visible", true);
	            });
	        }

	        /**
	         * Hides popup.
	         *
	         * @return {Promise} Returns Promise that resolves when hiding completes.
	         * @fires Popup#hide Hide event.
	         */

	    }, {
	        key: "hide",
	        value: function hide() {
	            var _this4 = this;

	            this.closer_.blur();

	            return Promise.resolve(this.beforeHide_(this)).then(function () {
	                _this4.getElement().style.display = "none";
	                /**
	                 * Hide event.
	                 *
	                 * @event Popup#hide
	                 */
	                _this4.dispatchEvent(PopupEventType.HIDE);
	                _this4.set("visible", false);
	            });
	        }

	        /**
	         * @private
	         */

	    }, {
	        key: "bindEvents_",
	        value: function bindEvents_() {
	            var _this5 = this;

	            this.listenEvent_('closerclick', this.closer_, 'click', function (evt) {
	                evt.preventDefault();
	                _this5.hide();
	            });

	            var elemListener = this.bringToFront.bind(this);
	            ["click", "focus"].forEach(function (eventName) {
	                return _this5.listenEvent_('elem' + eventName, _this5.getElement(), eventName, elemListener);
	            });
	        }

	        /**
	         * @private
	         */

	    }, {
	        key: "unbindEvents_",
	        value: function unbindEvents_() {
	            Object.keys(this.eventListeners_).forEach(this.unlistenEvent_.bind(this));
	        }

	        /**
	         * @param {string} name Unique name
	         * @param {Element} target
	         * @param {string} event
	         * @param {function} listener
	         * @private
	         */

	    }, {
	        key: "listenEvent_",
	        value: function listenEvent_(name, target, event, listener) {
	            if (this.eventListeners_[name]) {
	                this.unlistenEvent_(name);
	            }

	            target.addEventListener(event, listener);

	            this.eventListeners_[name] = {
	                target: target,
	                event: event,
	                listener: listener
	            };
	        }

	        /**
	         * @param {string} name Unique name
	         * @private
	         */

	    }, {
	        key: "unlistenEvent_",
	        value: function unlistenEvent_(name) {
	            if (this.eventListeners_[name]) {
	                var _eventListeners_$name = this.eventListeners_[name];
	                var target = _eventListeners_$name.target;
	                var event = _eventListeners_$name.event;
	                var listener = _eventListeners_$name.listener;


	                target.removeEventListener(event, listener);
	            }
	        }
	    }, {
	        key: "content",
	        set: function set(content) {
	            this.setContent(content);
	        }

	        /**
	         * @type {HTMLCollection} Inner content of popup.
	         */
	        ,
	        get: function get() {
	            return this.getContent();
	        }
	    }]);

	    return Popup;
	}(_openlayers2.default.Overlay);

	/**
	 * @return {Element}
	 * @private
	 */


	exports.default = Popup;
	function createDOMElement() {
	    var element = (0, _util.createElement)('div', 'ol-popup');
	    var closer = (0, _util.createElement)('a', 'ol-popup-closer', {
	        href: '#'
	    });

	    element.appendChild(closer);

	    // append content container
	    var content = (0, _util.createElement)('div', 'ol-popup-content');
	    element.appendChild(content);

	    return element;
	}

	/**
	 * Determine if the current browser supports touch events. Adapted from
	 * https://gist.github.com/chrismbarr/4107472
	 * @private
	 */
	function isTouchDevice() {
	    try {
	        document.createEvent("TouchEvent");

	        return true;
	    } catch (e) {
	        return false;
	    }
	}

	/**
	 * Apply workaround to enable scrolling of overflowing content within an
	 * element. Adapted from https://gist.github.com/chrismbarr/4107472
	 * @private
	 */
	function enableTouchScroll(elm) {
	    if (isTouchDevice()) {
	        (function () {
	            var scrollStartPos = 0;

	            elm.addEventListener("touchstart", function (event) {
	                scrollStartPos = this.scrollTop + event.touches[0].pageY;
	            }, false);

	            elm.addEventListener("touchmove", function (event) {
	                this.scrollTop = scrollStartPos - event.touches[0].pageY;
	            }, false);
	        })();
	    }
	}
	module.exports = exports["default"];

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.coalesce = coalesce;
	exports.createElement = createElement;
	exports.isElement = isElement;
	exports.isObject = isObject;
	exports.isString = isString;
	exports.isArrayLike = isArrayLike;
	exports.emptyElement = emptyElement;
	exports.noop = noop;
	/**
	 * @param {*} arg1 Value to check.
	 * @param {*} arg2 Value to check.
	 * @param {...*} [args] Values to check.
	 * @return {*} First argument that is not equal `undefined` or `null`
	 */
	function coalesce(arg1, arg2) {
	    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	        args[_key - 2] = arguments[_key];
	    }

	    return Array.from(arguments).find(function (value) {
	        return value != null;
	    });
	}

	/**
	 * @param {string} tagName
	 * @param {string|string[]} [classes] CSS classes.
	 * @param {Object} [attributes] Element attributes.
	 * @returns {Element}
	 */
	function createElement(tagName, classes, attributes) {
	    var elem = document.createElement(tagName);

	    if (classes) {
	        elem.classList.add.apply(elem.classList, typeof classes === 'string' ? classes.split(' ') : classes);
	    }

	    if (attributes) {
	        Object.keys(attributes).forEach(function (attribute) {
	            return elem.setAttribute(attribute, attributes[attribute]);
	        });
	    }

	    return elem;
	}

	/**
	 * Checks if `value` is likely a DOM element.
	 *
	 * @param {*} value
	 * @return {boolean}
	 * @link https://github.com/lodash/lodash/blob/4.13.1/lodash.js#L10755
	 */
	function isElement(value) {
	    return !!value && isObject(value) && value.nodeType === 1;
	}

	/**
	 * @param {*} value
	 * @return {boolean}
	 * @link https://github.com/lodash/lodash/blob/4.13.1/lodash.js#L11055
	 */
	function isObject(value) {
	    return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
	}

	/**
	 * Checks if `value` is likely a string.
	 *
	 * @param {*} value
	 * @return {boolean}
	 * @link https://github.com/lodash/lodash/blob/4.13.1/lodash.js#L11457
	 */
	function isString(value) {
	    return value != null && (typeof value === 'string' || isObject(value) && Object.prototype.toString(value) === '[object String]');
	}

	/**
	 * Checks if `value` is Array like object.
	 *
	 * @param value
	 * @returns {boolean}
	 * @link https://github.com/lodash/lodash/blob/4.13.1/lodash.js#L10638
	 */
	function isArrayLike(value) {
	    return !!value && typeof value.length === 'number';
	}

	/**
	 * @param {Element} elem
	 */
	function emptyElement(elem) {
	    while (elem.hasChildNodes()) {
	        elem.removeChild(elem.lastChild);
	    }
	}

	/**
	 * Empty function
	 *
	 * @return void
	 */
	function noop() {}

/***/ },
/* 4 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }
/******/ ])
});
;