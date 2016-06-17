import ol from "openlayers";
import { createElement, isElement, isString } from "./util";

/**
 * @typedef {Object} PopupOptions
 * @property {number | string | undefined} id Set the overlay id. The overlay id can be used with the ol.Map#getOverlayById method.
 * @property {number[] | undefined} offset Offsets in pixels used when positioning the overlay. The first element in the array is the horizontal offset.
 *                                         A positive value shifts the overlay right. The second element in the array is the vertical offset.
 *                                         A positive value shifts the overlay down. Default is [0, 0].
 * @property {ol.Coordinate | undefined} position The overlay position in map projection.
 * @property {	ol.OverlayPositioning | string | undefined} positioning Defines how the overlay is actually positioned with respect to its position property.
 *                                                                      Possible values are 'bottom-left', 'bottom-center', 'bottom-right', 'center-left',
 *                                                                      'center-center', 'center-right', 'top-left', 'top-center', and 'top-right'.
 *                                                                      Default is 'top-left'.
 * @property {boolean | undefined} stopEvent Whether event propagation to the map viewport should be stopped. Default is true.
 *                                           If true the overlay is placed in the same container as that of the controls (CSS class name ol-overlaycontainer-stopevent);
 *                                           if false it is placed in the container with CSS class name ol-overlaycontainer.
 * @property {boolean | undefined} insertFirst Whether the overlay is inserted first in the overlay container, or appended.
 *                                             Default is true. If the overlay is placed in the same container as that of the controls
 *                                             (see the stopEvent option) you will probably set insertFirst to true so the overlay is displayed below the controls.
 * @property {boolean | undefined} autoPan If set to true the map is panned when calling setPosition, so that the overlay is entirely visible in the current viewport. The default is false.
 * @property {olx.animation.PanOptions | undefined} autoPanAnimation The options used to create a ol.animation.pan animation.
 *                                                                   This animation is only used when autoPan is enabled.
 *                                                                   By default the default options for ol.animation.pan are used.
 *                                                                   If set to null the panning is not animated.
 * @property {number | undefined} autoPanMargin The margin (in pixels) between the overlay and the borders of the map when autopanning. The default is 20.
 * @property {Element | string | undefined} content Popup initial content.
 */
var PopupOptions;

/**
 * @enum {string}
 */
const PopupEventType = {
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
 *
 * @class
 * @extends {ol.Overlay}
 *
 * todo проверить autoPan
 * todo добавить анимацию показа/скрытия
 * todo автодокументация
 *      https://github.com/jsdoc2md/jsdoc-to-markdown
 *      https://github.com/jsdoc2md/jsdoc-parse/
 *      https://github.com/75lb/array-tools#api-reference
 */
export default class Popup extends ol.Overlay {
    /**
     * @param {PopupOptions} [options] Popup options.
     */
    constructor(options = {}) {
        const element = createDOMElement();

        super({
            ...options,
            element
        });
        /**
         * @type {Element}
         * @private
         */
        this.elem_ = element;
        /**
         * @type {Element}
         * @private
         */
        this.content_ = this.elem_.querySelector('.ol-popup-content');
        /**
         * @type {Element}
         * @private
         */
        this.closer_ = this.elem_.querySelector('ol-popup-closer');
        /**
         * @type {Object<string, Object>}
         * @private
         */
        this.eventListeners_ = {};

        enableTouchScroll(this.content_);

        if (options.content) {
            this.content = options.content;
        }
    }

    //noinspection JSAnnotator
    /**
     * @param {Element | string} content
     * @public
     */
    set content(content) {
        if (isElement(content)) {
            this.content_.appendChild(content);
        } else if (isString(content)) {
            this.content_.innerHTML = content;
        }
    }

    /**
     * @return {Element}
     * @public
     */
    get content() {
        return this.content_;
    }

    /**
     * @param {ol.Map} map
     * @public
     */
    setMap(map) {
        super.setMap(map);

        if (map) {
            this.bindEvents_();
            this.bringToFront();
        } else {
            this.unbindEvents_();
        }
    }

    /**
     * Show on top of other popups.
     *
     * @returns {Popup}
     * @public
     */
    bringToFront() {
        const container = this.container.parentNode;
        const overlaysContainer = container.parentNode;
        const lastOverlay = Array.from(overlaysContainer.querySelectorAll(".ol-overlay-container")).pop();

        if (lastOverlay && lastOverlay !== container) {
            overlaysContainer.insertBefore(container, lastOverlay.nextSibling);
        }
    }

    /**
     * Shows popup.
     *
     * @param {ol.Coordinate} coordinate
     * @param {Element | string} [content] Replace content.
     * @public
     */
    show(coordinate, content) {
        if (content) {
            this.content = content;
        }

        this.elem_.style.display = "block";
        this.setPosition(coordinate);

        this.dispatchEvent(PopupEventType.SHOW);
        this.set("visible", true);
    }

    /**
     * Hides popup.
     *
     * @public
     */
    hide() {
        this.closer_.blur();
        this.elem_.style.display = "none";

        this.dispatchEvent(PopupEventType.HIDE);
        this.set("visible", false);
    }

    /**
     * @private
     */
    bindEvents_() {
        this.listentEvent_('closerclick', this.closer_, 'click', evt => {
            evt.preventDefault();
            this.hide();
        });

        const elemListener = ::this.bringToFront;
        ["click", "focus"].forEach(eventName => this.listentEvent_('elem' + eventName, this.elem_, eventName, elemListener));
    }

    /**
     * @private
     */
    unbindEvents_() {
        Object.keys(this.eventListeners_).forEach(::this.unlistenEvent_);
    }

    /**
     * @param {string} name Unique name
     * @param {Element} target
     * @param {string} event
     * @param {function} listener
     * @private
     */
    listentEvent_(name, target, event, listener) {
        if (this.eventListeners_[name]) {
            this.unlistenEvent_(name);
        }

        target.addEventListener(event, listener);

        this.eventListeners_[name] = {
            target,
            event,
            listener
        };
    }

    /**
     * @param {string} name Unique name
     * @private
     */
    unlistenEvent_(name) {
        if (this.eventListeners_[name]) {
            const { target, event, listener } = this.eventListeners_[name];

            target.removeEventListener(event, listener);
        }
    }
}

/**
 * @return {Element}
 * @private
 */
function createDOMElement() {
    const element = createElement('div', 'ol-popup');
    const closer = createElement('a', 'ol-popup-closer', {
        href: '#'
    });

    element.appendChild(closer);

    // append content container
    const content = createElement('div', 'ol-popup-content');
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
        let scrollStartPos = 0;

        elm.addEventListener("touchstart", function (event) {
            scrollStartPos = this.scrollTop + event.touches[0].pageY;
        }, false);

        elm.addEventListener("touchmove", function (event) {
            this.scrollTop = scrollStartPos - event.touches[0].pageY;
        }, false);
    }
}
