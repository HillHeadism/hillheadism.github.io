self.addEventListener('fetch', (e) => {
  if (e.request.method === 'POST' && e.request.url.endsWith('/import')) {

    /* This is to fix the issue Jake found */
    e.respondWith(Response.redirect('/#/import'));
  
    e.waitUntil(async function () {
      try{
        const formData = await e.request.formData();
        // Get the data from the named element 'file'
        //const files = formData.getAll('GPX');

        const cache = await caches.open('HillHeadism_Imports');
        await cache.put('FILES', new Response(formData));
        const client = await self.clients.get(e.resultingClientId || e.clientId);
        client.postMessage({ files, action: 'load-files' });
      } catch (e) {
        console.log(e)
      }
    }());
  }
  /**
  if (e.request.url.startsWith('https://cdn.jsdelivr.net/gh/HillHeadism/HKTiles@0.0.1/') && cache)
    e.respondWith(
      cache.match(e.request).then((r) => {
        return r || fetch(e.request).then((r2) => {
          cache.put(e.request, r2.clone());
          return r2;
        });
      })
    );
  **/
});
/**
caches.open('HillHeadism_Tiles').then((c) => {
  cache = c;
})

**/