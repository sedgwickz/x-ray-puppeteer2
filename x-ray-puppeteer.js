import Puppeteer from "puppeteer-core"
export const xRayPuppeteer = (options) => {
  const defaults = {
    viewPort: { width: 1280, height: 800 },
  }
  const { viewPort, cl, navigationOptions, ...launchOptions } = Object.assign(
    {},
    defaults,
    options
  )

  return async (ctx, done) => {
    const browser = await Puppeteer.launch(launchOptions)
    const page = await browser.newPage()
    try {
      await page.setViewport(viewPort)
      await page.goto(ctx.url, navigationOptions)
      if (typeof cl === "function") {
        await cl(page, ctx)
      }
      // make sure iframe content is loaded
      const iframes = await page.$$("iframe")
      for (let iframe of iframes) {
        const frame = await iframe.contentFrame()
        if (!frame) continue
        const context = await frame.executionContext()
        const res = await context.evaluate(() => {
          const el = document.querySelector("*")
          if (el) return el.outerHTML
        })
        if (res) {
          await iframe.evaluate((a, res) => {
            a.innerHTML = res
          }, res)
        }
      }

      if (!ctx.body) {
        ctx.body = await page.content()
      }
      done(null, ctx)
    } catch (err) {
      done(err, null)
    }
    await browser.close()
  }
}

export default xRayPuppeteer
