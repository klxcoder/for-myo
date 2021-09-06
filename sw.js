const cacheName = 'v2';

// Call Install Event
self.addEventListener('install', (event) => {
    console.log('sw is installed');
});

// Call Activate Event
self.addEventListener('activate', (event) => {
    console.log('sw is activated');
    // Remove unwanted caches
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName) {
                        console.log('sw is clearing old cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
});

// Call Fetch Event
self.addEventListener('fetch', (event) => {
    console.log('sw is fetching');
    // Offline first
    event.responseWith(
        caches.match(event.request)
        .then(res => res)
        .catch(() => fetch(event.request)
            .then(res => {
                // Make copy/clone of response
                const resClone = res.clone();
                // Open cache
                caches
                    .open(cacheName)
                    .then(cache => {
                        // Add response to cache
                        cache.put(event.request, resClone);
                    });
                return res;
            })
        ),
    )
});