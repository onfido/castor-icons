# Castor Icons &middot; [![npm version](https://img.shields.io/npm/v/@onfido/castor-icons.svg?style=flat-square)](https://www.npmjs.com/package/@onfido/castor-icons)

This is _Castor_ addition providing a collection of selected [Boxicons](https://boxicons.com/) and custom icons.

## Get started

Install package:

    npm install @onfido/castor-icons

Then make icons available by following either plain/bundled code approach, or by using React components.

### Use with plain code

When referring to a fragment identifier for an icon to be used, a link is made to `icons.svg` sprite through the `<use>` element. The sprite must be public, copy it from `svg` directory of this package, or configure the bundler to do so.

Straight after this you can easily add an icon to your HTML code, e.g. "passport" if copied to same `.castor-icons` directory:

```html
<svg fill="currentColor" focusable="false" height="24" width="24">
  <use href="/.castor-icons/icons.svg#passport"></use>
</svg>
```

### Use with bundled code

Import sprite source to be used when referring to a fragment identifier for icon in JavaScript, like such:

```js
import icons from '@onfido/castor-icons/svg/icons.svg';

document.body.innerHTML = `
  <svg fill="currentColor" focusable="false" height="24" width="24">
    <use href="${icons}#passport"></use>
  </svg>
`;
```

Your bundler must handle the `icons.svg` sprite asset for it to be available to public. For example, [Parcel](https://parceljs.org/) will do this for you automatically, but if you're using [webpack](https://webpack.js.org/) then you should add and configure an additional loader like [file-loader](https://webpack.js.org/loaders/file-loader/) to handle svg file type.

### Use React components

Every SVG icon is also exported as React component, e.g. "passport":

```jsx
import { IconPassport } from '@onfido/castor-icons';
import React, { Fragment } from 'react';

const Component = () => (
  <Fragment>
    <IconPassport />
    {/* ...anything else e.g. text */}
  </Fragment>
);
```

You may modify SVG appearance by passing component props such as "fill" for changing color (defaults to "currentColor"), or sizing with "height" and "width".

But if you prefer to use a sprite, feel free to (only once) inline it in your app using the `Icons` component:

```jsx
import { Icons } from '@onfido/castor-icons';
import React, { Fragment } from 'react';

const App = () => (
  <Fragment>
    <Icons />
    {/* ...anything else e.g. app routes */}
  </Fragment>
);
```

Then refer to a fragment identifier directly without setting any sprite source, like this:

```jsx
const IconPassport = () => (
  <svg fill="currentColor" focusable="false" height="24" width="24">
    <use href="#passport"></use>
  </svg>
);
```

### Use individual SVG icons (advanced)

The nature of an `<svg>` element does not allow to embed individual icons, unfortunately.

To use individual SVGs (also distributed within this package) one possible solution is to use [CSS Masks](https://developer.mozilla.org/docs/Web/CSS/mask), e.g. for "passport" icon:

```css
.icon-passport {
  display: inline-block;
  height: 24px;
  width: 24px;
  mask: url('~@onfido/castor-icons/svg/icon-passport.svg') no-repeat;
  mask-size: 100%;
  background-color: currentColor;
}
```

Then you're able to use such directly in your HTML:

```html
<i class="icon-passport"></i>
```

Please keep in mind that the [browser support](https://caniuse.com/#feat=css-masks) is somewhat limited.

### Improve accessibility

- Focus handling is broken in IE and Edge browsers. When embedding via an `<svg>` element, we recommend to set `focusable="false"`.

- Be mindful of screen readers by applying the appropriate `aria-` attributes depending on each icon context and intent, for example `aria-hidden` or `aria-label`.

- [Learn more about accessibility quirks](https://simplyaccessible.com/article/7-solutions-svgs/)
