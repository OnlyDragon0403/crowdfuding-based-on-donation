import { createSlice, current } from '@reduxjs/toolkit'
import { TESTNET, MAINNET , adminAddress , loadTronweb , inventoryScAddress} from '../config';
import Crowdsale from '../abis/Main.json';
import addr_list from '../mochup/hex_address_list.json';
import {BigNumber} from 'bignumber.js';

const initialState = {
  loading : false,
  hasErrors : false,
  account : null,
  currentNet : ''
}

const tronSlice = createSlice({
  name: 'tron',
  initialState,
  reducers: {
    getdata: (state) => {
      state.loading = true;
    },
    setAccount: (state, { payload }) => {
      state.account = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getdataFailure: (state) => {
      console.log(state);
      state.loading = false;
    },
  }
})

export const { getdata, setAccount, getdataFailure } = tronSlice.actions

export default tronSlice.reducer

export function doInitialiseContract () {
  return async (dispatch) => {
    dispatch(getdata());
    //   try {
            let currentNet = TESTNET;

            await loadTronweb();

            const tronweb = window.tronWeb;

            const account_addr = tronweb.address.toHex("TFxodnMj2vrBisz2155zXdR2JqkM2XAZk2");
            const networkData = Crowdsale.networks[2];          // 2 refers to shasta testnet

            if( networkData ) {
                // let crowdsale = await tronweb.contract( Crowdsale.abi  , networkData.address );
                let crowdsale = await tronweb.contract().at( networkData.address );
                // founder entry
                let i , nIndex = 0;

                const key_addr_list = Object.keys(addr_list);
                const val_addr_list = Object.values(addr_list);

                //single
                await crowdsale.enterCrowdSale(key_addr_list[nIndex], addr_list[key_addr_list[nIndex]]).send({
                    feeLimit:100_000_000,
                    callValue:0,
                    shouldPollResponse:true
                });
                console.log( "entried member count : ", nIndex + 1 );
                let total_cnt = await crowdsale.getTotalNumBySpace( 1 ).call();
                console.log("total member count in space 1 :" ,  total_cnt );

                // 5 members entry
                for(i = 0; i < 5; i++){
                    nIndex ++;
                    await crowdsale.enterCrowdSale(key_addr_list[nIndex], addr_list[key_addr_list[nIndex]]).send({
                        feeLimit:100_000_000,
                        callValue:0,
                        shouldPollResponse:true
                    });
                    console.log( "entried member count : ", nIndex + 1 );
                    let total_cnt = await crowdsale.getTotalNumBySpace( 1 ).call();
                    console.log("total member count in space 1 :" ,  total_cnt );
                }

                // 25 members entry
                for(i = 0; i < 25; i++){
                    nIndex ++;
                    await crowdsale.enterCrowdSale(key_addr_list[nIndex], addr_list[key_addr_list[nIndex]]).send({
                        feeLimit:100_000_000,
                        callValue:0,
                        shouldPollResponse:true
                    });
                    console.log( "entried member count : ", nIndex + 1 );
                    let total_cnt = await crowdsale.getTotalNumBySpace( 1 ).call();
                    console.log("total member count in space 1 :" ,  total_cnt );
                }

                // 125 members entry
                for(i = 0; i < 125; i++){
                    nIndex ++;
                    await crowdsale.enterCrowdSale(key_addr_list[nIndex], addr_list[key_addr_list[nIndex]]).send({
                        feeLimit:100_000_000,
                        callValue:0,
                        shouldPollResponse:true
                    });
                    console.log( "entried member count : ", nIndex + 1 );
                    let total_cnt = await crowdsale.getTotalNumBySpace( 1 ).call();
                    console.log("total member count in space 1 :" ,  total_cnt );
                }

                // 625 members entry
                for(i = 0; i < 625; i++){
                    nIndex ++;
                    await crowdsale.enterCrowdSale(key_addr_list[nIndex], addr_list[key_addr_list[nIndex]]).send({
                        feeLimit:100_000_000,
                        callValue:0,
                        shouldPollResponse:true
                    });
                    console.log( "entried member count : ", nIndex + 1 );
                    let total_cnt = await crowdsale.getTotalNumBySpace( 1 ).call();
                    console.log("total member count in space 1 :" ,  total_cnt );
                }

                // 3125 members entry
                for(i = 0; i <3125; i++){
                    nIndex ++;
                    await crowdsale.enterCrowdSale(key_addr_list[nIndex], addr_list[key_addr_list[nIndex]]).send({
                        feeLimit:100_000_000,
                        callValue:0,
                        shouldPollResponse:true
                    });
                    console.log( "entried member count : ", nIndex + 1 );
                    let total_cnt = await crowdsale.getTotalNumBySpace( 1 ).call();
                    console.log("total member count in space 1 :" ,  total_cnt );
                }

                // 15625 members entry
                for(i = 0; i < 15625; i++){
                    nIndex ++;
                    await crowdsale.enterCrowdSale(key_addr_list[nIndex], addr_list[key_addr_list[nIndex]]).send({
                        feeLimit:100_000_000,
                        callValue:0,
                        shouldPollResponse:true
                    });
                    console.log( "entried member count : ", nIndex + 1 );
                    let total_cnt = await crowdsale.getTotalNumBySpace( 1 ).call();
                    console.log("total member count in space 1 :" ,  total_cnt );
                }

                dispatch(setAccount( account_addr ));
            } else {
                window.alert('Marketplace contract not deployed to detected network.')
                dispatch(setAccount( null ));
            }
    // } catch (error) {
    //   dispatch(getdataFailure());
    // }
  }
}



// const transaction = await tronweb.transactionBuilder.createSmartContract({
//   abi:jsonCompanyModel.abi,
//   bytecode: jsonCompanyModel.bytecode,
//   // parameters:[]
// },jsonCompanyModel.networks[2].address);    //tronweb.defaultAddress.hex  ,
