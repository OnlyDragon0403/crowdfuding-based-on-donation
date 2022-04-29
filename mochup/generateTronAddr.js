const { generateAccount } = require('tron-create-address')

const fs = require('fs');



let addr_list = {};
let count = 1000;
while(count--){  //Math.floor(Math.random()*(b-a+1))+a;
    const { address } = generateAccount();
    if(Object.keys(addr_list).length == 0)
        addr_list[address] = "0x0000000000000000000000000000000000000000";
    else{
        addr_list[address] = Object.keys(addr_list)[Math.floor(Math.random() * Object.keys(addr_list).length)];
    }
}

fs.writeFile("./test/tron_address_list.json", JSON.stringify(addr_list), 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
    console.log("JSON file has been saved.");
});


