const expross = require('../');
const app = expross();

// router.use((req,res,next)=>{
//     console.log("Time:", Date.now())
// })
app.use('/good', (req, res, next) => {
    console.log("Time:", Date.now());
    next();
})

// app.get('/', function (req, res, next) {
//     next();
// })

//     .get('/', function (req, res, next) {
//         // console.log("before error:")
//         next();
//         // console.log(d)
//         // next(new Error('customer error'));
//     })

//     .get('/', function (req, res) {
//         res.send('third');
//     });

app.get('/good/', function (req, res, next) {
    // res.send('get');
    next();
}).get('/good/', function (req, res, next) {
    res.send('get2');
});

app.put('/good2', function (req, res, next) {
    res.send('put');
    next();
})
app.post('/good3', function (req, res, next) {
    res.send('post');
    next();
})

var router = expross.Router();
router.use('/1', function (req, res, next) {
    res.send('first user');
});
router.use('/2', function (req, res, next) {
    res.send('second user');
});
app.use('/users', router);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});