//only can register sw from another js file

if ('serviceWorker' in navigator) {  //means browser supports sw; navigator is obj in js that represents the browser
    navigator.serviceWorker.register('/sw.js')
    .then((reg)=> console.log('service worker is registered', reg))
    .catch((err)=> console.log('service worker registration is failed', err))
}