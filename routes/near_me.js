var NodeGeocoder = require('node-geocoder');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongoSessionConnectURL = "mongodb://root:root@ds229435.mlab.com:29435/user_db";
var geolib = require('geolib');
var mongo = require('mongodb');



var options = {
  provider: 'google',

 // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyCMmLAeJIEBZ_Ckajl3IGGPiTfXSKAx-do', // for Mapquest, OpenCage, Google Premier

  formatter: null         // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(options);

var testnear = function(req,res){




  geocoder.geocode('San Jose', function(err, res) {
  console.log(res);
});


// res
//               .status(200)
//               .json({"field_details":""});



}


var nearme = function(req,res){

MongoClient.connect(mongoSessionConnectURL, function(err, db) {
assert.equal(null, err);
console.log("Connected correctly to server.");


var city_users = db.collection("user_db").find({
"City":{
    $ne: ""
    }
}).toArray(function(err,results){

     if(err) {

            	console.log(err);
            	return;
            	}

    var name_city = {};

    for(var i = 0; i<results.length; i++){
        //console.log(results[i].Name);
        name_city[results[i].Name] = results[i].City;


    }

name_lat_long = {};

for(var city in name_city){
//console.log(name_city[city]);
    if(name_city[city] == ""){
        continue;
    }

     geocoder.geocode(name_city[city], function(err, results) {
              console.log(results);
              if(typeof results == 'undefined'){

                  console.log("++++++++++++++++++");
              }else{
              //console.log(locations);
                //console.log(results[0].latitude);
                //sconsole.log(results[0].longitude);
                loc = {"latitude":results[0].latitude,"longitude":results[0].longitude};
                console.log(loc)

              }
            });

}

// console.log(name_lat_long);
res
              .status(200)
              .json({"field_details":name_lat_long});
               db.close();


});




// coords object
results = geolib.orderByDistance({latitude: 51.515, longitude: 7.453619}, {
    a: {latitude: 52.516272, longitude: 13.377722},
    b: {latitude: 51.518, longitude: 7.45425},
    c: {latitude: 51.503333, longitude: -0.119722}
});

//console.log(results);

final_results = {};
var count = 0;
for(var i = 0; i<results.length; i++){
    if(results[i].distance<500){
        console.log(results[i].distance);
    }


}


});
}


exports.testnear = testnear;
exports.nearme = nearme;
