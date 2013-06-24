var pathmod = require('path');
var urlmod = require('url');
var fs = require('fs-extra');
var child_process = require("child_process");
var argv = require('optimist').argv;
var request = require('request');

var pageurl = argv._[0];
pageurl = "http://easy-themes.tk/themes/preview/ace/"

var caper_process = child_process.spawn("casperjs",["casper-main.js",pageurl]);
var root = "site";

function download(url,path){

    request.get(url,function(err,response,body){
        var file_path = pathmod.join(root,path);
        fs.outputFileSync(file_path,body);
        console.log(file_path + " saved.");
    });
}

function parseAndDownload(url){
    var parsed = urlmod.parse(url);
    var host = urlmod.parse(pageurl).host;

    if(url == pageurl){
        download(url,pathmod.join(parsed.pathname,"index.html"));
    }else{
        if(parsed.host == host){
            download(url,parsed.pathname);
        }
    }
}

caper_process.stdout.on("data",function(data){
    var url = data.toString().trim();
    parseAndDownload(url);
});