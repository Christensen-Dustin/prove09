// variable preparation
var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

// static directory
app.use(express.static('public'));

// VIEW
app.set('views', 'view');
app.set('view engine', 'ejs');

// CONTROL
app.get('/postal_rates', returnResults);

app.get('/math_service', returnJSON);


// Have Control listening on PORT()
app.listen(port, function() {
    console.log(`The server is listening on PORT ${port} and will run here as well.`)
});

// MODEL
function calculate(request){
    console.log('request received = ' + request.url);
    // prepare variables
    var type = request.query.type;
    var weight = Number(request.query.weight);
    var rate = 0;
    
    // rates via weight
    var stamped = {1: 0.55, 2: 0.70, 3: 0.85, 3.5: 1.00};
    var metered = {1: 0.50, 2: 0.65, 3: 0.80, 3.5: 0.95};
    var largeFlat = {1: 1.00, 2: 1.15, 3: 1.30, 4: 1.45, 5: 1.60,
                     6: 1.75, 7: 1.90, 8: 2.05, 9: 2.20, 10: 2.35,
                     11: 2.50, 12: 2.65, 13: 2.80};
    var firstClass = {1: 3.66, 2: 3.66, 3: 3.66, 4: 3.66, 5: 4.39,
                      6: 4.39, 7: 4.39, 8: 4.39, 9: 5.19, 10: 5.19,
                      11: 5.19, 12: 5.19, 13: 5.71};
    
    // handle the operation
    if (type == 'stamped') {
        console.log('request received = ' + type);
        rate = stamped[weight];
    }
    if (type == 'metered') {
        console.log('request received = ' + type);
        rate = metered[weight];
    }
    if (type == 'large-flat') {
        console.log('request received = ' + type);
        rate = largeFlat[weight];
    }
    if (type == 'first-class') {
        console.log('request received = ' + type);
        rate = firstClass[weight];
    }
    
    // prepare the parameters to be sent to the calculation-results.ejs
    var params = {type: type, weight: weight, rate: rate};
    
    return params;
}

function returnResults (request, response) {
    var params = calculate(request);
    console.log('request page');
    // send to calculation-results.ejs
    // response.writeHead(200, {"Content-Type": "text/html"});
    response.render('postal_rates', params);
    response.end();
}

function returnJSON (request, response) {
    var params = JSON.stringify(calculate(request));
    console.log('request JSON');
    // 
    response.writeHead(200, {"Content-Type": "application/json"});
    response.write(params);
    response.end();
}
