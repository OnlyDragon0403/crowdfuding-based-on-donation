let addr_list = require('./hex_address_list.json')

var Crowdsale = artifacts.require("./Main.sol");
let crowdsale;

contract('Crowdsale', function([alice]) {
  before(async function() {
    crowdsale = await Crowdsale.deployed()
    this.timeout(30000000000);
  });


  context("Test Crowdsale function", () => {
    it("call createModel", async function() {
        this.timeout(30000000000);
        let nIndex = 0;
        let i,j, total_count;
        console.log(crowdsale);
        // get virtual address of new member
        addr_list = JSON.parse( JSON.stringify( addr_list ) );
        const key_addr_list = Object.keys(addr_list);

        // create a crowdsale model
        // await crowdsale.createModel();
        // Level 0
        console.log("Level 0");

        await crowdsale.enterCrowdSale( key_addr_list[nIndex], addr_list[key_addr_list[nIndex]]);           // founder enters into company matrix at first.
        console.log("total number of entried members : ", nIndex + 1);
        // let total_count = await crowdsale.getTotalNumBySpace(1);
        // console.log('member ID in space 0:' , total_count);
        // let wallet_info = await crowdsale.getWalletInfo();
        // console.log('wallet :', Object.keys(wallet_info).map( item => wallet_info[item]));
        // level1
        console.log("Level 1");
        for(i = 0; i < 5; i++){
            nIndex ++;
            await crowdsale.enterCrowdSale(key_addr_list[nIndex], addr_list[key_addr_list[nIndex]]);
            console.log("total number of entried members : ", nIndex + 1);
            // let total_count = await crowdsale.getTotalNumBySpace(1);
            // console.log('member ID in space 0:' , total_count);
            // let wallet_info = await crowdsale.getWalletInfo();
            // console.log('wallet :', Object.keys(wallet_info).map( item => wallet_info[item]));

        }

        total_count = await crowdsale.getTotalNumBySpace(1);
        console.log('member ID in space 0:' , total_count);
        //level2
        console.log("Level 2");
        for(i = 0; i < 25; i++){
            nIndex ++;
            await crowdsale.enterCrowdSale(key_addr_list[nIndex], addr_list[key_addr_list[nIndex]]);
            console.log("total number of entried members : ", nIndex + 1);
        }
        total_count = await crowdsale.getTotalNumBySpace(1);
        console.log('member ID in space 0:' , total_count);

        //level3
        console.log("Level 3");
        for(i = 0; i < 125; i++){    //125
            nIndex ++;
            await crowdsale.enterCrowdSale(key_addr_list[nIndex], addr_list[key_addr_list[nIndex]]);
            console.log("total number of entried members : ", nIndex + 1);
        }
        total_count = await crowdsale.getTotalNumBySpace(1);
        console.log('member ID in space 0:' , total_count);

        //level4
        console.log("Level 4");
        for(i = 0; i < 625; i++){    //625
            nIndex ++;
            await crowdsale.enterCrowdSale(key_addr_list[nIndex], addr_list[key_addr_list[nIndex]]);
            console.log("total number of entried members : ", nIndex + 1);
        }
        total_count = await crowdsale.getTotalNumBySpace(1);
        console.log('member ID in space 0:' , total_count);

        //level5
        console.log("Level 5");
        for(i = 0; i < 3125; i++){    //3125
            nIndex ++;
            await crowdsale.enterCrowdSale(key_addr_list[nIndex], addr_list[key_addr_list[nIndex]]);
            console.log("total number of entried members : ", nIndex + 1);
        }
        total_count = await crowdsale.getTotalNumBySpace(1);
        console.log('member ID in space 0:' , total_count);

        //level6
        console.log("Level 6");
        for(i = 0; i < 15625; i++){    //15625
            nIndex ++;
            await crowdsale.enterCrowdSale(key_addr_list[nIndex], addr_list[key_addr_list[nIndex]]);
            console.log("total number of entried members : ", nIndex + 1);
        }
        total_count = await crowdsale.getTotalNumBySpace(1);
        console.log('member ID in space 0:' , total_count);

        console.log("Get Member");
        // get member info by some address in space 1
        let count , space_ID = 1;
        console.log("space :", space_ID);
        for(i = 0; i < 20; i++){
            console.log('address :' , key_addr_list[i]);
            count = await crowdsale.getMemberCnt( space_ID , key_addr_list[i] );
            console.log('count :' , parseInt( count ));
            console.log('Member Matrix :');
            for(j = 0; j < parseInt( count ); j++){
                let matrix_ID = j + 1;
                console.log('Matrix'  + matrix_ID + ' of ' + key_addr_list[i]);
                result = await crowdsale.getMemberInfo( space_ID , key_addr_list[i] , j );
                console.log(Object.keys(result).map( item => result[item]));
            }
        }

        space_ID ++;
        console.log("space :", space_ID);
        i = 0;              // here i = 0, refers to the first member.
        // get member info by some address in space 2
        console.log('address :' , key_addr_list[i]);
        count = await crowdsale.getMemberCnt( space_ID , key_addr_list[i] );
        console.log('count :' , parseInt( count ));
        console.log('Member Matrix :');
        for(j = 0; j < parseInt( count ); j++){
            let matrix_ID = j + 1;
            console.log('Matrix'  + matrix_ID + ' of ' + key_addr_list[i]);
            result = await crowdsale.getMemberInfo( space_ID , key_addr_list[i] , j );
            console.log(Object.keys(result).map( item => result[item]));
        }
        //assert.equal(1, result, "is not call method f");
    });
  });
});




