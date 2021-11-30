# x-ray-puppeteer2

Inspired by [x-ray-chrome](https://github.com/ssbeefeater/x-ray-chrome), but optimized with iframe content auto loaded additionally.

## Install

`npm install x-ray-puppeteer2`

or

`yarn add x-ray-puppeteer2`

## Usage

```js
import Xray from "x-ray"
import XrayPuppeteer from "x-ray-puppeteer2"

const x = Xray().driver(
  XrayPuppeteer({
    executablePath: "/opt/homebrew/bin/chromium",
    headless: false,
    cl: (page, ctx) => {
      // do page operation here
      // parameters you can refer to: https://github.com/ssbeefeater/x-ray-chrome/blob/master/Readme.md
    },
  })
)

x(
  "https://github.com/sedgwickz/x-ray-puppeteer",
  "a.js-social-count"
)((err, obj) => {
  console.log(obj)
})

```
