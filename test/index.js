const expross = require('../');
const app = expross();

app.get('/', function (req, res, next) {
    next();
})

    .get('/', function (req, res, next) {
        console.log("before error:")
        console.log(d)
        next(new Error('customer error'));
    })

    .get('/', function (req, res) {
        res.send('third');
    });

app.get('/good', function (req, res, next) {
    res.send('get');
    next();
}).get('/good', function (req, res, next) {
    res.send('get2');
});

app.put('/good', function (req, res, next) {
    res.send('put');
    next();
})
app.post('/good', function (req, res, next) {
    res.send('post');
    next();
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});