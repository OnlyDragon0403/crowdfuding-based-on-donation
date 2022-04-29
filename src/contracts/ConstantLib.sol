// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

library ConstantLib {
    // struct, enum or constant variable declaration
    enum Package { SPACE_1, SPACE_2, SPACE_3, SPACE_4, SPACE_5 }        // refers to 5 space according to price.
    uint constant _mem_cnt = 5;

    // constant of space matrix
    uint constant HEAD = 0;
    uint constant PARENT = 0;

    /* company wallet address information */
    address constant _unclaimed_Wallet = 0x158de12EE547EAe06Cbdb200A017aCa6B75D230D;
    address constant _company_Wallet_1 = 0x158de12EE547EAe06Cbdb200A017aCa6B75D230D;
    address constant _company_Wallet_2 = 0x158de12EE547EAe06Cbdb200A017aCa6B75D230D;
    address constant _company_Wallet_3 = 0x158de12EE547EAe06Cbdb200A017aCa6B75D230D;

    // rate between TRX and dollar
    uint constant _rate = 1;     //14

    // struct 

    struct MainWallet {
        uint256 _unclaimed_wallet;
        uint256[3] _company_wallet;
    }
    // function definition with body
    function getMemCnt() internal pure returns(uint) {      // refers to 5 child nodes from parent nodes.
        return _mem_cnt;
    }

    function getHEAD() internal pure returns(uint) {
        return HEAD;
    }

    function getPARENT() internal pure returns(uint) {
        return PARENT;
    }

    function getRate() internal pure returns(uint) {
        return _rate;
    }

    function getUnclaimedMoney() internal pure returns(address) {
        return _unclaimed_Wallet;
    }

    function getCompanyWallets() internal pure returns(address[3] memory) {
        address[3] memory company_wallets;
        company_wallets[0] = _company_Wallet_1;
        company_wallets[1] = _company_Wallet_2;
        company_wallets[2] = _company_Wallet_3;

        return company_wallets;
    }
}
