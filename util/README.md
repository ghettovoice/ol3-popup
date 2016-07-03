[![view on npm](http://img.shields.io/npm/v/ol3-popup-umd.svg)](https://www.npmjs.org/package/ol3-popup-umd)

# ol3-popup-umd

Basic popup for an OpenLayers 3 map. By default the map is centered so that the popup is entirely visible.
This project originally forked from [ol3-popup](https://github.com/walkermatt/ol3-popup) by Matt Walker.

## Installation

Install it thought NPM:

```shell
npm install ol3-popup-umd
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

<% typedef.forEach(function(doc) { %> 
###<%= doc.name %> : *<%= doc.type.types.join(' | ') %>*

**Properties**

| Name            | Type                            | Description             | 
|-----------------|---------------------------------|-------------------------| 
<%= doc.properties.map(function(prop) { 
    return '| ' + [prop.name, '*' + prop.types.join(" &#124; ") + '*', prop.description].join(' | ') + ' |'; 
}).join("\n") %>

<% }) %>

#### Classes

<% classes.forEach(function(doc) { %> 

### <%= doc.name %>(<%= doc.constructor.params.map(function(param) { return param.name + ' : *' + param.types.join('|') + '*'; }).join(', ') %>)
**Extends:**
<% doc.extends.forEach(function(ext) { %>
- <%= ext %>
<% }) %>

#### Members
<% doc.members.forEach(function(member) { %>
<%= member.kind %> <%= member.name  %> : *<%= member.type.types.join('|') %>*
<% }) %>

#### Methods
<% doc.methods.forEach(function(method) { %>

**<%= method.name %>**(<%= method.params.map(function(param) { return param.name + ' : *' + param.types.join(' | ') + '*'; }) %>) <% if (method.return) { %>: *<%= method.return.types.join('|') %>* <% } %>
<%= method.description %>

<% if (method.params && method.params.length) { %>

**Params:**
<% method.params.forEach(function(param) { %>
- <%= param.name %> : *<%= param.types.join('|') %>* - <%= param.description %>
<% }) %>

<% } %>

<% if (method.return) { %>
**Return:**
<%= method.return.types.join('|') %> - <%= method.return.description %>
<% } %>
--------- 
<% }) %>

<% }) %>

## Credit

Based on [ol3-popup](https://github.com/walkermatt/ol3-popup) by Matt Walker and
an example by [Tim Schaub](https://github.com/tschaub) posted on the [OL3-Dev list](https://groups.google.com/forum/#!forum/ol3-dev).

## License

MIT 2016 (c) Matt Walker, Vladimir Vershinin
