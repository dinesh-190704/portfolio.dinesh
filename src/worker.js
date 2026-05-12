import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler'

/**
 * The DEBUG flag will do two things that help during development:
 * 1. we will skip caching on the edge, which makes it easier to
 *    debug.
 * 2. we will return an error message on exception in your Response rather
 *    than the default 404.html page.
 */
const DEBUG = false

addEventListener('fetch', event => {
  try {
    event.respondWith(handleEvent(event))
  } catch (e) {
    if (DEBUG) {
      return event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        }),
      )
    }
    event.respondWith(new Response('Internal Error', { status: 500 }))
  }
})

async function handleEvent(event) {
  const url = new URL(event.request.url)
  let options = {}

  /**
   * You can add custom logic to how we fetch your assets
   * by configuring the function `mapRequestToAsset`
   */
  // options.mapRequestToAsset = handlePrefix(/^\/docs/)

  try {
    if (DEBUG) {
      // customize caching
      options.cacheControl = {
        bypassCache: true,
      }
    }

    // Handle SPA routing - serve index.html for all non-asset routes
    if (url.pathname !== '/' && !url.pathname.includes('.')) {
      const indexAsset = mapRequestToAsset(new Request(`${url.origin}/index.html`, event.request))
      return await getAssetFromKV(event, {
        ...options,
        mapRequestToAsset: () => indexAsset,
      })
    }

    return await getAssetFromKV(event, options)
  } catch (e) {
    // if an error is thrown try to serve the asset at 404.html
    if (!DEBUG) {
      try {
        let notFoundResponse = await getAssetFromKV(event, {
          ...options,
          mapRequestToAsset: req => new Request(`${new URL(req.url).origin}/404.html`, req),
        })

        return new Response(notFoundResponse.body, { ...notFoundResponse, status: 404 })
      } catch (e) {}
    }

    return new Response(e.message || e.toString(), { status: 500 })
  }
}

/**
 * Here's another example of how to customize the handling of a request, 
 * using the `mapRequestToAsset` function. This function is called before 
 * the cache is checked, allowing you to modify the request.
 * 
 * For example, you could rewrite the request to serve a different asset,
 * or you could add custom headers to the request.
 */
function handlePrefix(prefix) {
  return request => {
    // compute the default (e.g. / -> index.html)
    request = mapRequestToAsset(request)

    // If the request is for the docs folder, rewrite the URL
    if (request.url.startsWith(prefix)) {
      request = new Request(`${request.url.replace(prefix, '/docs/')}`, request)
    }

    return request
  }
}
