//
let CACHE_NAME = 'sw-cache-v1';
let urlcache = [
  '/',
  'index.html',
  'restaurant.html',
  'css/styles.css',
  'js/main.js',
  'js/restaurant_info.js',
  'js/dbhelper.js',
  'data/restaurants.json',
  'img/1.jpg',
  'img/2.jpg',
  'img/3.jpg',
  'img/4.jpg',
  'img/5.jpg',
  'img/6.jpg',
  'img/7.jpg',
  'img/8.jpg',
  'img/9.jpg',
  'img/10.jpg',
];

 self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Installed');

    //Delay event until the Promise is resolved
    e.waitUntil(

    	//Open cache
	    caches.open(CACHE_NAME).then(function(cache) {

	    	// Add all files from array to the cache
			console.log('[ServiceWorker] Caching cacheFiles');
			return cache.addAll(urlcache);
	    })
	); // end of delay
});


self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activated');

    e.waitUntil(

    	// Get all cache keys
		caches.keys().then(function(cacheNames) {
			return Promise.all(cacheNames.map(function(thisCacheName) {

				// If there already is another cached item
				if (thisCacheName !== CACHE_NAME) {

					// Delete that cache
					console.log('[ServiceWorker] Removing Cached Files from Cache - ', thisCacheName);
					return caches.delete(thisCacheName);
				}
			}));
		})
	); // end of delay

});


self.addEventListener('fetch', function(e) {
	console.log('[ServiceWorker] Fetch', e.request.url);

	// Responds to the fetch event
	e.respondWith(

		// compare in cache
		caches.match(e.request)


			.then(function(response) {

				// If request find in the cache
				if ( response ) {
					console.log("[ServiceWorker] Found in Cache", e.request.url, response);
					// Return the cached match
					return response;
				}

				// If request is not in the cache = fetch and cache

				var requestClone = e.request.clone();
				return fetch(requestClone)
					.then(function(response) {

						if ( !response ) {
							console.log("[ServiceWorker] No response from fetch ")
							return response;
						}

						var responseClone = response.clone();

						//  Open cache
						caches.open(CACHE_NAME).then(function(cache) {

							//
							cache.put(e.request, responseClone);
							console.log('[ServiceWorker] New Data Cached', e.request.url);

							// Return response
							return response;

				        });

					})
					.catch(function(err) {
						console.log('[ServiceWorker] Error Fetching & Caching New Data', err);
					});


			}) // caches.match END
	); // respondWith END
});
