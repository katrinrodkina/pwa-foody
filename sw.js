
const staticCacheName = 'site-static-v5'
const dynamicCacheName = 'site-dynamic-v4'
const assets=[
    '/',
    '/index.html',
    '/js/app.js',
    '/js/ui.js',
    '/js/materialize.min.js',
    '/css/styles.css',
    '/css/materialize.min.css',
    '/img/foody-icon.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
    '/pages/offline.html'
]

const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length>size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size))  //calling it again to check if size is still over
            }
        })
    })
}


self.addEventListener('install', evt => {   //install event only fires when sw.js file gets changed  
      // console.log('service worker has been installed')
        evt.waitUntil( 
                caches.open(staticCacheName).then(cache => {
                    console.log('caching assets')
                    cache.addAll(assets)
        }))
})     

self.addEventListener('activate', evt => {
   // console.log('service worker has been activated')
   evt.waitUntil(
       caches.keys().then(keys => {
     //console.log(keys)  //showing all the names of caches
      return Promise.all(keys
        .filter(key =>  key!== staticCacheName && key!== dynamicCacheName)
        .map(key => caches.delete(key))
       )
       })
   )

})    

self.addEventListener('fetch', evt => {

if (evt.request.url.indexOf('firestore.googleapis.com') === -1) { //checking if its not a data request
    evt.respondWith(
        caches.match(evt.request)
         .then(cacheRes => {
            return cacheRes || fetch(evt.request).then(fetchRes => { 
                         return caches.open(dynamicCacheName).then(cache => {
                             //take what is return and put in the cache
                             cache.put(evt.request.url, fetchRes.clone())   
                             limitCacheSize(dynamicCacheName, 15)
                             return fetchRes //returning original responce after it was stored in cache
                         }
                         )
                 })  
        })
         .catch(()=> {       
            return caches.match('/pages/offline.html')
        })
    )
}

  
})    