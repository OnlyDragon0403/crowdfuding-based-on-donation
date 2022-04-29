import { createSlice } from "@reduxjs/toolkit";
import _ from 'lodash';
import Crowdsale from '../abis/Main.json';
import addr_list from '../mochup/hex_address_list.json';
import { loadTronweb } from '../config';

const memberData = [
  [
    { type: 'UPGRADE', levels : [5, 25, 0]},
    { type: 'RE-ENTRY', levels : [5, 25, 10]},
    { type: 'UPGRADE', levels : [5, 25, 100]},
    { type: 'RE-ENTRY', levels : [5, 25, 125]}
  ],
]

const walletMocha = {
    PIF : 100,
    UPGRADE : [100,500,2500,1200,6200],
    REENTRY : [100,500,2500,12500,6200]
}

export const initialState = {
  loading: false,
  hasErrors: false,
  reverse_users: {
    curSpace : 0,
    selectedMember : null,
    column: null,
    data: [],
    wallet: {},
    direction: 'ascending',
  },
  member_Info : {
      direct_fund : 0
  },
  company_Info : {
      wallet : {
          unclaimed : null,
          c_wal_1 : null,
          c_wal_2 : null,
          c_wal_3 : null,
      },
      spaces : [],
      spaces_info : []
  }
};

// https://redux-toolkit.js.org/api/createslice
const filterSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    getdata: (state) => {
      state.loading = true;
    },
    getCompanyInfoSuccess: (state, {payload}) => {
        state.company_Info = payload;
        state.loading = false;
        state.hasErrors = false;
    },
    getMemberInfoSuccess: (state, {payload}) => {
        state.member_Info = payload;
        state.loading = false;
        state.hasErrors = false;
    },
    getMemberBySpaceSuccess: (state, { payload }) => {
      state.reverse_users.selectedMember = null;
      state.reverse_users.curSpace = payload.curSpace;
      state.reverse_users.data = payload.memberData;
      state.loading = false;
      state.hasErrors = false;
    },
    getMemberWalletSuccess: (state, {payload}) => {
        state.reverse_users.wallet = payload;
        state.loading = false;
        state.hasErrors = false;
    },
    selectMemberSuccess: (state, { payload }) => {
      state.reverse_users.selectedMember = payload;
    },
    getdataFailure: (state) => {
      state.loading = false;
    },
    sortdata: (state, { payload }) => {
      let reserver_users = state.reverse_users;
      if (reserver_users.column === payload) {
        reserver_users.data =  reserver_users.data.slice().reverse();
        reserver_users.direction = reserver_users.direction === 'ascending' ? 'descending' : 'ascending';
      }
      else{
        reserver_users.column = payload;
        reserver_users.data = _.sortBy(reserver_users.data, [payload]);
        reserver_users.direction = 'ascending';
      }
      state.reverse_users = reserver_users;

      state.loading = false;
      state.hasErrors = false;
    },
  },
});

// Actions generated from the slice:
export const { getdata, getCompanyInfoSuccess , getMemberInfoSuccess, getMemberBySpaceSuccess, getMemberWalletSuccess, getdataFailure, selectMemberSuccess, sortdata } =
  filterSlice.actions;

// Selector:
export const filterSelector = (state) => state.filters.reverse_users;
export const levelSelector = (state) => state.filters.reverse_users.selectedMember != null ? state.filters.reverse_users.data[state.filters.reverse_users.selectedMember].levels : [];
export const spaceSelector = (state) => state.filters.reverse_users.curSpace;
export const walletSelector = (state) => state.filters.reverse_users.wallet;
export const companyInfoSelector = (state) => state.filters.company_Info;;
export const memberInfoSelector = (state) => state.filters.member_Info;


// Reducer:
export default filterSlice.reducer;

// Async thunk action:
/* dispatch function */
// fetch data
export function fetchMemberInfo(member_ID) {
    return async (dispatch) => {
      dispatch(getdata());
      try {
        // get member info by member address.
        const memberInfo = await getMemberInfo(member_ID);
        dispatch(getMemberInfoSuccess( memberInfo ));
      } catch (error) {
        dispatch(getdataFailure());
      }
    };
}

export function fetchCompanyInfo() {
    return async (dispatch) => {
      dispatch(getdata());
      try {
        // get company info.
        const companyInfo = await getCompanyInfo();
        dispatch(getCompanyInfoSuccess( companyInfo ));
      } catch (error) {
        dispatch(getdataFailure());
      }
    };
}

export function fetchMemberWallet(member_ID) {
    return async (dispatch) => {
      dispatch(getdata());
      try {
        // get wallet info by member address.
        const walletInfo = await getMemberWallet(member_ID);
        dispatch(getMemberWalletSuccess( walletInfo ));
      } catch (error) {
        dispatch(getdataFailure());
      }
    };
}

export function fetchMembersBySpace( member_ID , space ) {
    return async (dispatch) => {
      dispatch(getdata());
      try {
        // get member IDs by space
        const members = await getMembersBySpace( member_ID , space);
        dispatch(getMemberBySpaceSuccess({ memberData : members, curSpace : space }));
      } catch (error) {
        dispatch(getdataFailure());
      }
    };
}

// logic in web app
export function selectMemberMatrix(member) {
  return async (dispatch) => {
    dispatch(selectMemberSuccess(member));
  };
}
// logic in web app
export function sortData(column) {
  return async (dispatch) => {
    dispatch(getdata());
    try {
      // sort member matrix
      dispatch(sortdata(column));
    } catch (error) {
      dispatch(getdataFailure());
    }
  };
}

/* get data from blockchain net */
// get current contract in browser
async function getContract() {
    await loadWeb3();
    const web3 = window.web3;
    const accounts = await window.web3.eth.getAccounts();

    const networkId = await window.web3.eth.net.getId();
    const networkData = Crowdsale.networks[networkId];

    if(networkData) {
        const crowdsale = new window.web3.eth.Contract(Crowdsale.abi, networkData.address);
        return crowdsale;
    }
    return null;
}
// get member wallet by member ID
async function getMemberInfo(member_ID) {
    const key_addr_list = Object.keys(addr_list);
    const crowdsale = await getContract();
    // get direct money of current member
    let result = await crowdsale.methods.getMemberWalletInfo(key_addr_list[member_ID]).call();

    return result;
}

async function getCompanyInfo() {
    const crowdsale = await getContract();
    let result = {}, i ;
    // let wallet = await crowdsale.methods.getWalletInfo().call();
    result['spaces_info'] = [];
    result['spaces'] = [];

    // get number of members in each space
    try{
        for(i = 0 ; i < 5; i ++){
            let total_nums = await crowdsale.methods.getTotalNumBySpace(i + 1).call();
            console.log(total_nums);
            result['spaces'].push(parseInt( total_nums ) + 1);
            if(total_nums < 50) break;
        }

        for(i = 0; i < 2; i++) {
            result['spaces_info'][i] = [];
            let space_info;
            let cursor , ID_list = [];
            for(cursor = 0; cursor < result['spaces'][i] && cursor < 50; cursor++){
                let sub_cursor = 0;
                do{
                    space_info = await crowdsale.methods.getReserveInfo( i + 1 , 1, cursor , sub_cursor ).call();
                    if( ID_list.includes(space_info[0]['_member_ID']) ) break;
                    ID_list.push(space_info[0]['_member_ID']);
                    if(( sub_cursor != 0 && space_info[0]['_member_TYPE'] == 1 ) || space_info[0]['_member_TYPE'] == 2)
                        result['spaces_info'][i].push({ space : i + 1 , owner_ID : space_info[0]['_owner_ID'] , member_ID : space_info[0]['_member_ID'] , member_TYPE : space_info[0]['_member_TYPE'] })
                    sub_cursor = space_info[1];
                }while(sub_cursor != 0);
            }
        }
        console.log("spaces_info:",result['spaces_info']);
    }catch{
        console.log("insufficient total_nums");
    }

    return result;
}

async function getMemberWallet(member_ID) {
    const key_addr_list = Object.keys(addr_list);
    const crowdsale = await getContract();
    let result = await crowdsale.methods.getMemberWalletInfo(key_addr_list[member_ID]).call();
    let result_keys = Object.keys(result);
    let mocha_keys = Object.keys(walletMocha);
    for(let i = -1 ;i <= mocha_keys.length ; i++){

        delete Object.assign(result, {[mocha_keys[i]]: result[result_keys[i]] })[result_keys[i]];
    }
    return result;
}
// get member list by space ID
async function getMembersBySpace(member_ID , space_ID) {
    const key_addr_list = Object.keys(addr_list);
    const crowdsale = await getContract();

    let mem_count = await crowdsale.methods.getMemberCnt( space_ID + 1 , key_addr_list[member_ID] ).call();
    let result = [];
    for(let i = 0; i< mem_count; i++){
        let memberFetchInfo = await crowdsale.methods.getMemberInfo( space_ID + 1 , key_addr_list[member_ID] , i ).call();
        let memberInfo = {
            MEMBERID : 0,
            type : 0,
            levels : []
        };
        Object.keys(memberFetchInfo).forEach((item , index ) => {
            switch(index) {
                case 0 :
                    if(memberFetchInfo[item] == 0)
                        memberInfo['type'] = "STARTER";
                    if(memberFetchInfo[item] == 1)
                        memberInfo['type'] = "REENTRY";
                    if(memberFetchInfo[item] == 2)
                        memberInfo['type'] = "UPGRADE";
                    break;
                case 1 :
                    memberInfo['MEMBERID'] = memberFetchInfo[item]; break;
                default :
                    memberInfo['levels'].push(memberFetchInfo[item]);
            }
        });
        result.push( memberInfo );
    }
    return result;
}
