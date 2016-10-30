[![Build Status](https://travis-ci.org/ghettovoice/ol3-popup-umd.svg?branch=master)](https://travis-ci.org/ghettovoice/ol3-popup-umd)
[![view on npm](http://img.shields.io/npm/v/ol3-popup-umd.svg)](https://www.npmjs.org/package/ol3-popup-umd)

# ol3-popup-umd

Basic popup for an OpenLayers 3 map. By default the map is centered so that the popup is entirely visible.
This project originally forked from [ol3-popup](https://github.com/walkermatt/ol3-popup) by Matt Walker
and extended with new features like event emitting, additional methods and others, also packed as UMD package. 

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
###<%= doc.name %> : *<%= doc.type.types.join(' &#124; ') %>*

**Properties**

| Name  | Type  | Description  | 
|:------|:------|:-------------| 
<% doc.properties.forEach(function(prop) { %>| **<%= prop.name %>** | *<%= prop.types.join(' &#124; ') %>* | <%= prop.description %> |
<% }) %>

<% }) %>

#### Classes

<% classes.forEach(function(doc) { %> 

### <%= doc.name %>(<%= doc.constructor.params.map(function(param) { return param.name + ' : *' + param.types.join(' &#124; ') + '*'; }).join(', ') %>)
**Extends:**
<% doc.extends.forEach(function(ext) { %>
- <%= ext %>
<% }) %>

**Params:**

| Name  | Type  | Description  | 
|:------|:------|:-------------|
<% doc.constructor.params.forEach(function(param) { %>| **<%= param.name %>** | *<%= param.types.join(' &#124; ') %>* | <%= param.description %> |
<% }) %>

#### Members
<% doc.members.forEach(function(member) { %>
<%= ['set', 'get'].indexOf(member.kind) !== -1 ? member.kind + ' ' : '' %>**<%= member.name  %>** : *<%= member.type.types.join(' &#124; ') %>*
<% }) %>

#### Methods
<% doc.methods.forEach(function(method) { %>

**<%= method.name %>**(<%= method.params.map(function(param) { return param.name + ' : *' + param.types.join(' &#124; ') + '*'; }) %>) <% if (method.return) { %>: *<%= method.return.types.join(' &#124; ') %>* <% } %>
<%= method.description %>

<% if (method.params && method.params.length) { %>

**Params:**

| Name  | Type  | Description  | 
|:------|:------|:-------------|
<% method.params.forEach(function(param) { %>| **<%= param.name %>** | *<%= param.types.join(' &#124; ') %>* | <%= param.description %> |
<% }) %>

<% } %>

<% if (method.return) { %>
**Returns:**

<%= method.return.types.join(' &#124; ') %> - <%= method.return.description %>
<% } %>

<% if (method.fires && method.fires.length) { %>
**Events:**
<% method.fires.forEach(function(event) { %>
- <%= event %>
<% }) %>
<% } %>
--------- 
<% }) %>

<% }) %>

## Credit

Based on [ol3-popup](https://github.com/walkermatt/ol3-popup) by Matt Walker and
an example by [Tim Schaub](https://github.com/tschaub) posted on the [OL3-Dev list](https://groups.google.com/forum/#!forum/ol3-dev).

## License

MIT 2016 (c) Matt Walker, Vladimir Vershinin
