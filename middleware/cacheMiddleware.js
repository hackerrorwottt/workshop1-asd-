let cache = {}

function checkCache(key){
    let value = cache[key]

    if(!value){
        return
    }

    let age = Date.now()-value.createdAt

    if (age>60*1000){
        delete cache[key]
        return
    }

    return value.data
}
function saveCache(key,data){
    cache[key] = {data:data,
        createdAt: Date.now()
    };
}

function clearCache(){
    cache = {}
}

function cacheMiddleware(req,res,next){

    let key = req.url
    let value = checkCache(key)

    if(value){
        console.log('cache worked')
        res.set("X-Cache","HIT")
        return res.json(value)
    }

    res.set("X-Cache","MISS")
    next()
}

module.exports = {cacheMiddleware,saveCache,clearCache}