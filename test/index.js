const expross = require('../');
const app = expross();

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.get('/good', function (req, res) {
    res.send('good')
})

app.post('/', function (req, res) {
    res.send('post')
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})