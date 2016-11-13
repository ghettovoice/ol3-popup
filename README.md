[![Build Status](https://travis-ci.org/ghettovoice/ol3-popup-umd.svg?branch=master)](https://travis-ci.org/ghettovoice/ol3-popup-umd)
[![view on npm](http://img.shields.io/npm/v/ol3-popup-umd.svg)](https://www.npmjs.org/package/ol3-popup-umd)

# ol3-popup-umd

Basic popup for an OpenLayers 3 map. By default the map is centered so that the popup is entirely visible.
This project originally forked from [ol3-popup](https://github.com/walkermatt/ol3-popup) by Matt Walker
and extended with new features like event emitting, additional methods and others, also packed as UMD package. 

## Installation

Install it thought NPM or Bower:

```shell
npm install ol3-popup-umd
bower install ol3-popup-umd
```

Or download the latest version archive and add it with script tag:

```html
<script src="ol3-popup-umd/dist/bundle.min.js"></script>
```

## Usage

Plugin is packed into UMD wrapper, import it with CommonJS or ES6:

```js
import PopupOverlay from 'ol3-popup-umd';
const PopupOverlay = require('ol3-popup-umd');
```

In Browser environment it is available as `ol.PopupOverlay`.

## Demo

Clone or download the repository and open html files from `examples` directory in a browser.
Click on the map to display a popup, click close to the edge of the map to see it pan into view.

## API Reference

#### Typedef

 
###PopupOptions : *Object*

**Properties**

| Name  | Type  | Description  | 
|:------|:------|:-------------| 
| **id** | *number  &#124;  string  &#124;  undefined* | Set the overlay id. The overlay id can be used with the `ol.Map#getOverlayById` method. |
| **offset** | *number[]  &#124;  undefined* | Offsets in pixels used when positioning the overlay. The first element in the array is the horizontal offset. A positive value shifts the overlay right. The second element in the array is the vertical offset. A positive value shifts the overlay down. Default is `[0, 0]`. |
| **position** | *ol.Coordinate  &#124;  undefined* | The overlay position in map projection. |
| **positioning** | *ol.Overlay.Positioning  &#124;  string  &#124;  undefined* | Defines how the overlay is actually positioned with respect to its position property. Possible values are `bottom-left`, `bottom-center`, `bottom-right`, `center-left`, `center-center`, `center-right`, `top-left`, `top-center`, and `top-right`. Default is `top-left`. |
| **stopEvent** | *boolean  &#124;  undefined* | Whether event propagation to the map viewport should be stopped. Default is `true`. If true the overlay is placed in the same container as that of the controls (CSS class name `ol-overlaycontainer-stopevent`); if false it is placed in the container with CSS class name `ol-overlaycontainer`. |
| **insertFirst** | *boolean  &#124;  undefined* | Whether the overlay is inserted first in the overlay container, or appended. Default is `true`. If the overlay is placed in the same container as that of the controls (see the `stopEvent` option) you will probably set `insertFirst` to true so the overlay is displayed below the controls. |
| **autoPan** | *boolean  &#124;  undefined* | If set to `true` the map is panned when calling `setPosition`, so that the overlay is entirely visible in the current viewport. The default is `true`. |
| **autoPanAnimation** | *olx.animation.PanOptions  &#124;  undefined* | The options used to create a `ol.animation.pan` animation. This animation is only used when `autoPan` is enabled. Default is `{ duration: 300, easing: easeInOutCubic }`. If set to `null` the panning is not animated. |
| **autoPanMargin** | *number  &#124;  undefined* | The margin (in pixels) between the overlay and the borders of the map when autopanning. The default is `20`. |
| **content** | *Element  &#124;  HTMLCollection  &#124;  string  &#124;  undefined* | Popup initial content. |
| **beforeShow** | *function  &#124;  undefined* | Function that called before popup show. Can be used for show animation. |
| **beforeHide** | *function  &#124;  undefined* | Function that called before popup hide. Can be used for hide animation. |




#### Classes

 

### Popup(options : *PopupOptions*)
**Extends:**

- openlayers~ol.Overlay


**Params:**

| Name  | Type  | Description  | 
|:------|:------|:-------------|
| **options** | *PopupOptions* | Popup options. |


#### Members

set **content** : *HTMLCollection*

get **content** : *Element*


#### Methods


**setContent**(content : *Element  &#124;  HTMLCollection  &#124;  string*) 




**Params:**

| Name  | Type  | Description  | 
|:------|:------|:-------------|
| **content** | *Element  &#124;  HTMLCollection  &#124;  string* | Update popup inner content. |







--------- 


**getContent**() : *Element* 





**Returns:**

Element - Inner content of popup.



--------- 


**setMap**(map : *ol.Map*) 




**Params:**

| Name  | Type  | Description  | 
|:------|:------|:-------------|
| **map** | *ol.Map* | OpenLayers map object. |







--------- 


**bringToFront**() 
Show on top of other popups.






--------- 


**show**(coordinate : *ol.Coordinate*,content : *Element  &#124;  HTMLCollection  &#124;  string*) : *Promise* 
Shows popup.



**Params:**

| Name  | Type  | Description  | 
|:------|:------|:-------------|
| **coordinate** | *ol.Coordinate* | New popup position. |
| **content** | *Element  &#124;  HTMLCollection  &#124;  string* | Replace inner content. |





**Returns:**

Promise - Returns Promise that resolves when showing completes.



**Events:**

- Popup#show Show event.


--------- 


**hide**() : *Promise* 
Hides popup.




**Returns:**

Promise - Returns Promise that resolves when hiding completes.



**Events:**

- Popup#hide Hide event.


--------- 




## Credit

Based on [ol3-popup](https://github.com/walkermatt/ol3-popup) by Matt Walker and
an example by [Tim Schaub](https://github.com/tschaub) posted on the [OL3-Dev list](https://groups.google.com/forum/#!forum/ol3-dev).

## License

MIT 2016 (c) Matt Walker, Vladimir Vershinin
