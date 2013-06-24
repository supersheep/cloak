var casper = require('casper').create({
    onResourceRequested:function(casper,response){
        console.log(response.url);
    }
});
var utils = require('utils');

var page_url = casper.cli.args[0];
casper.start(page_url,function(){
});

casper.run(function(){
    casper.exit();
});