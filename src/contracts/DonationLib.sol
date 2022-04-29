// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./ConstantLib.sol";
import { SpaceMatrixLib } from "./SpaceMatrixLib.sol";
import { GlobalPlacementLib } from "./GlobalPlacementLib.sol";
import { MemberGroupLib } from "./MemberGroupLib.sol";
import { MemberWalletLib } from "./MemberWalletLib.sol";

library DonationLib {
    using SpaceMatrixLib for SpaceMatrixLib.SpaceMatrix;
    using DonationLib for SpaceMatrixLib.SpaceMatrix;
    using GlobalPlacementLib for SpaceMatrixLib.SpaceMatrix;
    using MemberGroupLib for MemberGroupLib.MemberGroup;
    using MemberWalletLib for MemberWalletLib.MemberWallet;

    function getAddrOfMemberOwner(
        SpaceMatrixLib.SpaceMatrix storage self,
        mapping( address => MemberWalletLib.MemberWallet ) storage wallet,
        ConstantLib.MainWallet storage main_wallet,
        address src_addr,
        uint member_level,
        uint member_pos
    ) internal {
        uint256 parent = self._total_positions - 1;
        uint cur_level = 0;
        uint space_ID = self._space_ID;
        uint16[6] memory space_price = [1, 100, 500, 2500, 12500, 62500];

        while(cur_level < member_level){
            bool err;
            (err, parent) = self.getParentNode(parent);
            if( !err )               // check level 0,1,2 of company
                break;

            cur_level ++;
        }

        if(cur_level != member_level){        // send unclaimed money to unclaimed wallet from ConstantLib
            // according to member_level 1-75%, 2-70%, 3-50%
            if( member_level == 1 ){
                main_wallet._unclaimed_wallet += space_price[space_ID] / 20 * ConstantLib.getRate();
                sendTRXToUnclaimedWallet(src_addr , ConstantLib.getUnclaimedMoney() ,space_price[space_ID] * 3 / 4 );
            }

            if( member_level == 2 ){
                main_wallet._unclaimed_wallet += space_price[space_ID] / 5 * ConstantLib.getRate();
                sendTRXToUnclaimedWallet(src_addr , ConstantLib.getUnclaimedMoney() ,space_price[space_ID] * 7 / 10 );
            }

            if( member_level == 3 ){
                main_wallet._unclaimed_wallet += space_price[space_ID] / 2 * ConstantLib.getRate();
                sendTRXToUnclaimedWallet(src_addr , ConstantLib.getUnclaimedMoney(), space_price[space_ID] / 2 );
            }
            return;
        }
        else{
            if(member_level == 1){
                // Transfer from source_addr to dest_addr   (direct donation)
                sendDirectTRX(src_addr ,self._ID_member_group[parent], space_price[space_ID] / 20);
                return;
            }

            if(member_level == 2){
                if(member_pos >= 1 && member_pos <= 5){          // send money to P.I.F wallet
                    wallet[self._ID_member_group[parent]]._pif_wallet += space_price[space_ID] / 5;
                    return ;
                }
                if(member_pos >= 21 && member_pos <= 25){       // send money to re-entry wallet
                    uint entry_ID = 1;
                    wallet[self._ID_member_group[parent]]._re_entry_wallet[entry_ID - 1] += space_price[space_ID] / 5;
                    if( wallet[self._ID_member_group[parent]].CheckReenterWallet(entry_ID) ){
                        wallet[self._ID_member_group[parent]]._re_entry_wallet[entry_ID - 1] -= space_price[entry_ID];       // decrease wallet when re-enter with the money
                        self.regMemReenter( entry_ID , parent, self._ID_member_group[parent] );
                    }
                    return ;
                }
                sendDirectTRX(src_addr ,self._ID_member_group[parent], space_price[space_ID] / 5);
                return ;
            }

            if(member_level == 3){
                if(member_pos >= 1 && member_pos <= 11){         // send money to upgrade wallet
                    if(self._space_ID == 5){
                        if(member_pos <= 6){
                            uint entry_ID = 2;
                            wallet[self._ID_member_group[parent]]._re_entry_wallet[entry_ID - 1] += space_price[space_ID] / 2;
                            if( wallet[self._ID_member_group[parent]].CheckReenterWallet(entry_ID) ){
                                wallet[self._ID_member_group[parent]]._re_entry_wallet[entry_ID - 1] -= space_price[entry_ID];       // decrease wallet when re-enter with the money
                                self.regMemReenter( entry_ID , parent, self._ID_member_group[parent] );
                            }
                        }
                        else{
                            uint entry_ID = 3;
                            wallet[self._ID_member_group[parent]]._re_entry_wallet[entry_ID - 1] += space_price[space_ID] / 2;
                            if( wallet[self._ID_member_group[parent]].CheckReenterWallet(entry_ID) ){
                                wallet[self._ID_member_group[parent]]._re_entry_wallet[entry_ID - 1] -= space_price[entry_ID];       // decrease wallet when re-enter with the money
                                self.regMemReenter( entry_ID , parent, self._ID_member_group[parent] );
                            }
                        }
                    }
                    else {
                        wallet[self._ID_member_group[parent]]._upgrade_wallet[space_ID - 1] += space_price[space_ID] / 2;
                        if( wallet[self._ID_member_group[parent]].CheckUpgradeWallet(space_ID) ){
                            wallet[self._ID_member_group[parent]]._upgrade_wallet[space_ID - 1] -= space_price[space_ID + 1];       // decrease wallet when upgrade with the money
                            self.enterNextSpace(parent , self._ID_member_group[parent]);
                        }
                    }
                    return ;
                }
                if(member_pos >= 12 && member_pos <= 15){       // send money to P.I.F wallet
                    wallet[self._ID_member_group[parent]]._pif_wallet += space_price[space_ID] / 2;
                    return ;
                }
                if(member_pos >= 16 && member_pos <= 25){           // send money to re-entry wallet
                    uint entry_ID = self.getEntryID( member_pos );
                    wallet[self._ID_member_group[parent]]._re_entry_wallet[entry_ID - 1] += space_price[space_ID] / 2;
                    while( wallet[self._ID_member_group[parent]].CheckReenterWallet(entry_ID) ){
                        wallet[self._ID_member_group[parent]]._re_entry_wallet[entry_ID - 1] -= space_price[entry_ID];       // decrease wallet when re-enter with the money
                        self.regMemReenter( entry_ID , parent, self._ID_member_group[parent] );
                    }
                    return ;
                }
                sendDirectTRX(src_addr ,self._ID_member_group[parent], space_price[space_ID] / 2);
                return ;
            }
        }
        return ;
    }

    function getEntryID ( SpaceMatrixLib.SpaceMatrix storage self, uint member_pos ) internal view returns ( uint entry_ID) {
        uint nF = 10 - ( self._space_ID - 1 ) * 2;
        entry_ID = 1;
        member_pos -= 15;
        if( member_pos <= nF ) {
            return entry_ID;
        }
        else{
            member_pos -= nF;
            entry_ID += member_pos % 2 == 0 ? member_pos / 2 : member_pos / 2 + 1 ;
        }
        return entry_ID;
    }

    function matrixDonationNthLevel (
        SpaceMatrixLib.SpaceMatrix storage self,
        mapping( address => MemberWalletLib.MemberWallet ) storage wallet,
        ConstantLib.MainWallet storage main_wallet,
        address src_addr,
        uint level,
        uint256 col_pos
    ) internal {
        uint8[4] memory level_nums = [1 , 5 , 25 , 125];
        uint256 member_pos = col_pos % level_nums[level] == 0 ? level_nums[level] : col_pos % level_nums[level];
        self.getAddrOfMemberOwner(wallet , main_wallet , src_addr, level, member_pos);
    }

    function sendDirectTRX (
        address src_addr,
        address owner_addr,
        uint amount
    ) internal{
        _transfer(src_addr, owner_addr, amount * ConstantLib.getRate() / 100);
    }

    function sendTRXToUnclaimedWallet(
        address src_addr,
        address dest_addr,
        uint amount
    ) internal{
        _transfer(src_addr, dest_addr, amount * ConstantLib.getRate() / 100);
    }

    function sendTRXToCompanyWallet(
        SpaceMatrixLib.SpaceMatrix storage self,
        ConstantLib.MainWallet storage main_wallet,
        address owner_addr
    ) internal{
        uint16[6] memory space_price = [1, 100, 500, 2500, 12500, 62500];
        address[3] memory company_wallet = ConstantLib.getCompanyWallets();
        // 3% money into individual company wallet from current addr
        _transfer(owner_addr, company_wallet[0], space_price[self._space_ID] * ConstantLib.getRate() / 100);
        main_wallet._company_wallet[0] += space_price[self._space_ID] * ConstantLib.getRate() / 100;
        _transfer(owner_addr, company_wallet[1], space_price[self._space_ID] * ConstantLib.getRate() / 100);
        main_wallet._company_wallet[1] += space_price[self._space_ID] * ConstantLib.getRate() / 100;
        _transfer(owner_addr, company_wallet[2], space_price[self._space_ID] * ConstantLib.getRate() / 100);
        main_wallet._company_wallet[2] += space_price[self._space_ID] * ConstantLib.getRate() / 100;
    }

    function sendTRXToInvitedAccount(         // Invite Donation  20% money to invited address
        SpaceMatrixLib.SpaceMatrix storage self,
        address owner_addr,
        address invite_addr
    ) internal{
        uint16[6] memory space_price = [1, 100, 500, 2500, 12500, 62500];
        // 20% money into invited address from current addr
        _transfer(owner_addr, invite_addr, space_price[self._space_ID] * ConstantLib.getRate() / 5);
    }

    function _transfer(address from, address to, uint256 value) internal {
        emit Transfer(from, to, value);
    }

    event Transfer(
        address indexed from,
        address indexed to,
        uint256 value
    );
}
