// The server
var express = require('express');
var bodyParser = require('body-parser');
var fs      = require('fs');
var wagner = require('wagner-core');

require('./models')(wagner);

/**
 *  Define the sample application.
 */
var menuAPI = function() {

    //  Scope.
    var self = this;

    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function() {
        self.app = express();
        self.app.use(bodyParser.urlencoded({extended:true}));
        self.app.use(bodyParser.json());

        self.app.use('/api/ingredients', require('./apis/ingredientsApi')(wagner));
        self.app.use('/api/receipts', require('./apis/receiptsApi')(wagner));
        self.app.use('/api/menus', require('./apis/menusApi')(wagner));

        console.log("Routes Initialized!!!");
    };


    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function() {
        //  Start the app on the specific interface (and port).
        self.app.listen(8080, '127.0.0.1', function() {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), '127.0.0.1', 8080);
        });
    };

};   /*  Sample Application.  */

/**
 *  main():  Main code.
 */
var zapp = new menuAPI ();
zapp.initializeServer();
zapp.start();
