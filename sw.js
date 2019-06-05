
const staticCacheName = 'site-static-v2'
const dynamicCacheName = 'site-dynamic-v1'
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
        //so we want to get keys from the cache
        cache.keys().then(keys => {
            //so now we have an array
            if (keys.length>size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size))  //calling it again to check if size is still over
            }
        })
    })
}


self.addEventListener('install', evt => {   //install event only fires when we change sw.js file. so when we caching here our site wont update
       // console.log('service worker has been installed')
       evt.waitUntil(  //waitUntil method is used to tell the browser not
                        // to terminate the SW until the promise passed to waitUntil is either resolved or rejected.
       caches.open(staticCacheName).then(cache => {
           console.log('caching assets')
           cache.addAll(assets)
       }))
})    

self.addEventListener('activate', evt => {
   // console.log('service worker has been activated')
   evt.waitUntil(
       caches.keys().then(keys => {
          
       // console.log(keys)  //gonna show all names of caches
      return Promise.all(keys
        .filter(key =>  key!== staticCacheName && key!== dynamicCacheName)
        .map(key => caches.delete(key))
       )
       })
   )

})    

self.addEventListener('fetch', evt => {
//    evt.respondWith(
//        caches.match(evt.request).then(cacheRes => {
//            return cacheRes || fetch(evt.request).then(fetchRes => { //using || in case cacheRes empty, return original cache
//                 return caches.open(dynamicCacheName).then(cache => {
//                      //take what is return to us and put in the cache
//                      cache.put(evt.request.url, fetchRes.clone())   
//                      limitCacheSize(dynamicCacheName, 15)
//                      return fetchRes //returning original responce after it was stored in cache
//                 }
//                 )
//            })  
//        }).catch(()=> {
//            if(evt.request.url.indexOf('.html')>-1)  {//if it finds html in the url, will return the number (the position)
//            return caches.match('/pages/offline.html')
//            }
         

//        })
//    )
})    
//so user goes to lets say about.html, caches.match checks if its there if its there it returns it responce, 
//if its NOT there, we open dynamicCache and putting it there, and also returning the actual responce (our html page)