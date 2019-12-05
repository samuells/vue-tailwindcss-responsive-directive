# TailwindCSS Directive for Responsive classes (SPA/SSR)
[![npm (scoped with tag)](https://img.shields.io/npm/v/@samuells/vue-tailwindcss-responsive-directive/latest.svg?style=flat-square)](https://www.npmjs.com/package/@samuells/vue-tailwindcss-responsive-directive)
[![npm](https://img.shields.io/npm/dt/@samuells/vue-tailwindcss-responsive-directive.svg?style=flat-square)](https://www.npmjs.com/package/@samuells/vue-tailwindcss-responsive-directive)
[![Dependencies](https://david-dm.org/samuells/vue-tailwindcss-responsive-directive/status.svg?style=flat-square)](https://david-dm.org/samuells/vue-tailwindcss-responsive-directive)

> VueJS directive which gives the order to TailwindCSS classes.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [WHY ⁉](#why-%E2%81%89)
  - [Instead of this code (bad sample)](#instead-of-this-code-bad-sample)
  - [Write and read this (good sample)](#write-and-read-this-good-sample)
- [Setup](#setup)
  - [VueJS (Client)](#vuejs-client)
  - [NuxtJS](#nuxtjs)
    - [Client Side (SPA & Universal mode)](#client-side-spa--universal-mode)
    - [Server Side (Univeral mode)](#server-side-univeral-mode)
    - [PurgeCSS && @nuxtjs/tailwindcss](#purgecss--nuxtjstailwindcss)
- [Known Problems](#known-problems)
- [MIT License](#mit-license)
- [Author & Contributors](#author--contributors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## WHY ⁉

Do you like to write the your CSS using the [TailwindCSS framework](https://tailwindcss.com/)?

**But you hate those never ending strings of classes?**

### Instead of this code (bad sample)
``` html
<div 
  class="w-full max-w-xl pl-6 mb-16 md:w-1/2 md:pl-16 md:md-32 lg:pl-32 xxl:w-1/4 xxl:mx-auto xxl:pl-32"
/>
```

### Write and read this (good sample)
``` html
<div 
  class="w-full max-w-xl pl-6 mb-16"
  v-screen="{
    md: 'w-1/2 pl-16 mb-32',
    lg: 'pl-32',
    xxl: 'w-1/4 mx-auto pl-32'
  }"
/>
```

- Radically improve the readability of your code.
- Provides **client(SPA)** and **server(SSR)** directive
- Provides **extractor** and setup for PurgeCSS.

## Setup

```bash
$ npm i @samuells/vue-tailwindcss-responsive-directive
or
$ yarn add @samuells/vue-tailwindcss-responsive-directive
```

### VueJS (Client)

Create custom directive and name it "`screen`"

```js
import Vue from 'vue'
import { client } from '@samuells/vue-tailwindcss-responsive-directive'

Vue.directive('screen', client)
```

### NuxtJS

#### Client Side (SPA & Universal mode)

Create custom client side directive named "`screen`" as plugin file

```js
// ./plugins/tailwind-screen.js
import Vue from 'vue'
import { client }  from '@samuells/vue-tailwindcss-responsive-directive'

Vue.directive('screen', client)
```

#### Server Side (Univeral mode)

```js
// ./nuxt.config.js
import { server } from '@samuells/vue-tailwindcss-responsive-directive'

// add to setup
export default {
  ...
  render: {
    bundleRenderer: {
      directives: {
        server
      }
    }
  },
  ...
}
```

**Not needed for SPA mode**

#### PurgeCSS && @nuxtjs/tailwindcss

If you are using [@nuxtjs/tailwindcss](https://github.com/nuxt-community/nuxt-tailwindcss) you have by default enabled PurgeCSS and you need to update the extractors of PurgeCSS.

```js
// ./nuxt.config.js
import { extractor } from '@samuells/vue-tailwindcss-responsive-directive'

// add to setup
export default {
  ...
  purgeCSS: {
    extractors: () => [
      // this is original extractor ignoring vue files
      {
        extractor: class {
          static extract(content) {
            return content.match(/[A-z0-9-:\\/]+/g)
          }
        },
        extensions: ['html', 'js']
      },
      // this is special extractor for vue files
      extractor
    ]
  },
  ...
}
```

## Known Problems

- **Don't use pseudo elements and classes in directive.** 

``` html
<div 
  class="w-full max-w-xl pl-6 mb-16"
  v-screen="{
    md: 'hover:text-blue-300'
  }"
/>
```

This is an edge case which is currently in testing and we are looking for better solution.

---- 

## MIT License

## Author & Contributors
© [Samuel Snopko](www.samuelsnopko.com)

You can ping me on [twitter](www.twitter.com/samuelsnopko).

Thx for help & brainstorming to:
@peter9ke
@manniL

{...💚}
