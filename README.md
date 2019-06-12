# Search_Bank_Details
Fetches the details of the Banks
Step 1)
npm install for installing all dependencies.

Step 2) 
open cmd at the project location and type "node server.js" for starting the server.

Step 3)
Open your browser and type the following URL:

a) For Extracting details of a bank using IFSC code 
->   http://localhost:3000/branchfromifsc?ifsc=<ifsc code>
  // without <>
b) For extracting details of a all the same bank when bank name and city name is given.
->  http://localhost:3000/branchesfromnameandcity?city=<city>&name=<bank name>
// without <>

