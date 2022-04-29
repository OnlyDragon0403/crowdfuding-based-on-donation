// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./ConstantLib.sol";

library MemberWalletLib {
    using MemberWalletLib for MemberWalletLib.MemberWallet;
    struct MemberWallet {
        // wallets of member
        uint256[5] _upgrade_wallet;
        uint256[5] _re_entry_wallet;
        uint256 _pif_wallet;
    }

    function CheckUpgradeWallet (
        MemberWallet storage self,
        uint space_ID
    ) internal view returns ( bool ){
        uint16[5] memory limitedPrice = [1, 500, 2500, 12500, 62500]; // refers to limited price for upgrade and re-entry in each space.
        if(self._upgrade_wallet[space_ID - 1] < limitedPrice[space_ID])
            return false;
        else
            return true;
    }

    function CheckReenterWallet (
        MemberWallet storage self,
        uint space_ID
    ) internal view returns ( bool ){
        uint16[6] memory limitedPrice = [1, 100, 500, 2500, 12500, 62500]; // refers to limited price for upgrade and re-entry in each space.
        if(self._re_entry_wallet[space_ID - 1] < limitedPrice[space_ID])
            return false;
        else
            return true;
    }
}
