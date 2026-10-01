let cacheStore = {};

function inspectCache(cacheKey) {
    const cachedItem = cacheStore[cacheKey];
    if (!cachedItem) {
        return;
    }
    const duration = Date.now() - cachedItem.timestamp;
    if (duration > 60000) {
        delete cacheStore[cacheKey];
        return;
    }
    return cachedItem.payload;
}

function storeCacheItem(cacheKey, payload) {
    cacheStore[cacheKey] = {
        payload: payload,
        timestamp: Date.now()
    };
}

function flushCache() {
    cacheStore = {};
}

function performCacheCheck(req, res, next) {
    const cacheKey = req.url;
    const cachedItem = inspectCache(cacheKey);

    if (cachedItem) {
        console.log('Returned from cache');
        res.set("X-Cache", "HIT");
        return res.json(cachedItem);
    }

    res.set("X-Cache", "MISS");
    next();
}

module.exports = { performCacheCheck, storeCacheItem, flushCache };