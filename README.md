<h2 align='center'>SolomonDefi Plugin</h2>

<p align='center'>Frontend Plugin for adding Solomon Defi payments to a website</p>

<p align='center'>
<a href='https://www.npmjs.com/package/@solomon/plugin'>
  <img src='https://img.shields.io/npm/v/@solomon/plugin?color=222&style=flat-square'>
</a>
</p>

<br>

## Installation

### With NPM/Bundler (Vue3, React, vanilla JS, etc.)

```bash
npm i -S @solomondefi/plugin
```

### Without Bundler (Browser)

It is recommended to download the distribution and copy `plugin.min.js` into your project.

For testing and prototyping, you can include it from the Unpkg CDN:
```
<script src="https://unpkg.com/@solomondefi/plugin@0.1.0/dist/plugin.min.js>
```

## Usage

Basic usage, for advanced options see [Configuration](#configuration)

### Vue3

```Vue
<template>
  <SlmPlugin
    :show="true"
  />
</template>

<script>
import { SlmPlugin } from '@solomon/plugin';

export default {
  components: { SlmPlugin },
};
</script>
```

### React

TBD

### Vanilla JS

TBD

## Configuration

TBD

## Theming

### Style

TBD

### Fonts

The plugin uses `@font-face` definitions for title and text fonts called `SlmTitle` and `SlmText`, respectively. We recommend Montserrat and
PTSerif, which are included in the library. They are not included in the `SlmPlugin` widget automatically to avoid bloating, but can be
easily imported if you're using PostCSS or another CSS preprocessor:

```
@import '/node_modules/@solomon/plugin/dist/font.css';
```

Font files are located at `dist/fonts`.

Another option is to manually define the necessary typefaces before including the plugin:

```css
@font-face {
  font-family: 'SlmTitle';
  src: /* Regular title font */
  font-weight: 400;
}

@font-face {
  font-family: 'SlmTitle';
  src: /* Medium title font */
  font-weight: 500;
}

@font-face {
  font-family: 'SlmTitle';
  src: /* Bold title font */
  font-weight: 700;
}

@font-face {
  font-family: 'SlmText';
  src: /* Regular text font */
  font-weight: 400;
}
```

## Example

See the `example` directory.

Run locally:

```
npm run dev
```

## Contributing

## License

MIT License © 2021 [Solomon Defi](https://github.com/solomondefi)
