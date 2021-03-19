var Layer = require('./layer');
var Route = require('./route');
const http = require('http');
const method = require('method');

var proto = function () {
    function router(req, res, next) {
        router.handle(req, res, next);
    }
    Object.setPrototypeOf(router, proto);
    router.stack = [];
    return router;
};

proto.handle = function (req, res, done) {
    var self = this,
        method = req.method,
        idx = 0, stack = self.stack;

    function next(err) {
        var layerError = (err === 'route' ? null : err);

        //跳过路由系统
        if (layerError === 'router') {
            return done(null);
        }

        if (idx >= stack.length || layerError) {
            return done(layerError);
        }

        var layer = stack[idx++];

        //匹配，执行
        if (layer.match(req.url)) {
            if (!layer.route) {
                //处理中间件
                layer.handle_request(req, res, next);
            } else if (layer.route._handles_method(method)) {
                //处理路由
                layer.handle_request(req, res, next);
            }
        } else {
            next(layerError);
        }
    }

    next();
};

proto.route = function route(path) {
    var route = new Route(path);

    var layer = new Layer(path, route.dispatch.bind(route));

    layer.route = route;

    this.stack.push(layer);
    // console.log("router stack length:", this.stack.length)

    return route;
};

proto.use = function (fn) {
    var path = '/';
    //路径挂载
    if (typeof fn !== 'function') {
        path = fn;
        fn = arguments[1];
    }
    var layer = new Layer(path, fn);
    layer.route = undefined;
    this.stack.push(layer);
    return this;
};

http.METHODS.forEach(function (method) {
    method = method.toLowerCase();
    proto[method] = function (path, fn) {
        var route = this.route(path);
        route[method].call(route, fn);

        return this;
    };
});

module.exports = proto;