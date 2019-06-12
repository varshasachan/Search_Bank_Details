var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var csv = require('fast-csv');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var port = 9000;

var databaseFile = "./indian_banks/bank_branches.csv";

var stream = fs.createReadStream(databaseFile);
 
console.log("reading data and storing it to memory");
var databaseData = {};
var csvStream = csv()
    .on("data", function(data){
         // console.log(data);
         databaseData[data[0]] = {
         	"ifsc"     :data[0],
         	"bank_id"  :data[1],
         	"branch"   :data[2],
         	"address"  :data[3],
         	"city"     :data[4],
         	"district" :data[5],
         	"state"    :data[6],
         	"bank_name":data[7],
         }
    })
    .on("end", function(){
        console.log("data read, now you can perform the queries. Number of records=",Object.keys(databaseData).length);
		console.log("first obj->",databaseData["ABHY0065002"]);
    });
 
stream.pipe(csvStream);

//Given a bank branch IFSC code, get branch details
app.get('/branchfromifsc', (req,res) => {
	var ifsc = req.query.ifsc;

	if(!ifsc)
		return res.status(400).send("ifsc code not provided");

	if(databaseData.hasOwnProperty(ifsc))
		return res.status(200).send(databaseData[ifsc])
	else{
		return res.status(400).send("the provided ifsc code does not exist in database");
	}

})

//Given a bank name and city, gets details of all branches of the bank in the city
app.get('/branchesfromnameandcity', (req,res) => {
	var bank_name = req.query.name;
	var city = req.query.city;

	if(!bank_name || ! city)
		return res.status(400).send("bank_name or city not provided");

	var banks = [];
	for(var ifsc in databaseData){
		if(databaseData[ifsc].bank_name == bank_name && databaseData[ifsc].city == city){
			banks.push(databaseData[ifsc]);
		}
	}
	res.status(200).send(banks);
})

app.listen(process.env.PORT || 3000);

console.log("the app is running on",process.env.PORT || 3000);

module.exports = app;