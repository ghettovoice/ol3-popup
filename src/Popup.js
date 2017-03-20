import ol from "openlayers";
import * as util from "./util";
import * as easing from "./easing";

/**
 * @typedef {Object} PopupOptions
 * @property {number | string | undefined} id Set the overlay id. The overlay id can be used with the `ol.Map#getOverlayById` method.
 * @property {number[] | undefined} offset Offsets in pixels used when positioning the overlay. The first element in the array is the horizontal offset.
 *                                         A positive value shifts the overlay right. The second element in the array is the vertical offset.
 *                                         A positive value shifts the overlay down. Default is `[0, 0]`.
 * @property {ol.Coordinate | undefined} position The overlay position in map projection.
 * @property {ol.Overlay.Positioning | string | undefined} positioning Defines how the overlay is actually positioned with respect to its position property.
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
 * Popup Overlay for OpenLayers.
 */
export default class Popup extends ol.Overlay {
    /**
     * @param {PopupOptions} [options] Popup options.
     */
    constructor(options = {}) {
        const element = createDOMElement();

        options.autoPan = util.coalesce(options.autoPan, true);
        options.autoPanAnimation = util.coalesce(options.autoPanAnimation, {
            duration: 300,
            easing: easing.easeInOutCubic
        });

        super({
            ...options,
            element
        });

        /**
         * @type {function}
         * @private
         */
        this.beforeShow_ = util.coalesce(options.beforeShow, util.noop);
        /**
         * @type {function}
         * @private
         */
        this.beforeHide_ = util.coalesce(options.beforeHide, util.noop);
        /**
         * @type {Element}
         * @private
         */
        this.content_ = this.getElement().querySelector('.ol-popup-content');
        /**
         * @type {Element}
         * @private
         */
        this.closer_ = this.getElement().querySelector('.ol-popup-closer');
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
     * @type {HTMLCollection} Inner content of popup.
     */
    set content(content) {
        this.setContent(content);
    }

    //noinspection JSUnusedGlobalSymbols
    /**
     * @type {Element} Inner content of popup.
     */
    get content() {
        return this.getContent();
    }

    /**
     * @param {Element | HTMLCollection | string} content Update popup inner content.
     */
    setContent(content) {
        util.emptyElement(this.content_);

        if (util.isElement(content)) {
            this.content_.appendChild(content);
        } else if (util.isString(content)) {
            this.content_.insertAdjacentHTML('afterBegin', content);
        } else if (util.isArrayLike(content)) {
            util.toArray(content).forEach(elem => this.content_.appendChild(elem));
        }
    }

    /**
     * @returns {Element} Inner content of popup.
     */
    getContent() {
        return this.content_;
    }

    //noinspection JSUnusedGlobalSymbols
    /**
     * @param {ol.Map} map OpenLayers map object.
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
     */
    bringToFront() {
        const container = this.getElement().parentNode;
        const overlaysContainer = container.parentNode;
        const lastOverlay = util.toArray(overlaysContainer.querySelectorAll(".ol-overlay-container")).pop();

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
    show(coordinate, content) {
        if (content) {
            this.content = content;
        }

        const elem = this.getElement();
        elem.style.display = "block";
        elem.style.visibility = "hidden";

        if (coordinate) {
            this.setPosition(coordinate);
        }

        return Promise.resolve(this.beforeShow_(this))
            .then(() => {
                elem.style.visibility = "visible";
                /**
                 * Show event.
                 *
                 * @event Popup#show
                 */
                this.dispatchEvent(PopupEventType.SHOW);
                this.set("visible", true);
            });
    }

    /**
     * Hides popup.
     *
     * @return {Promise} Returns Promise that resolves when hiding completes.
     * @fires Popup#hide Hide event.
     */
    hide() {
        this.closer_.blur();

        return Promise.resolve(this.beforeHide_(this))
            .then(() => {
                this.getElement().style.display = "none";
                /**
                 * Hide event.
                 *
                 * @event Popup#hide
                 */
                this.dispatchEvent(PopupEventType.HIDE);
                this.set("visible", false);
            });
    }

    /**
     * @private
     */
    bindEvents_() {
        this.listenEvent_('closerclick', this.closer_, 'click', evt => {
            evt.preventDefault();
            this.hide();
        });

        const elemListener = ::this.bringToFront;
        ["click", "focus"].forEach(eventName => this.listenEvent_('elem' + eventName, this.getElement(), eventName, elemListener));
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
    listenEvent_(name, target, event, listener) {
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
    const element = util.createElement('div', 'ol-popup');
    const closer = util.createElement('a', 'ol-popup-closer', {
        href: '#'
    });

    element.appendChild(closer);

    // append content container
    const content = util.createElement('div', 'ol-popup-content');
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
