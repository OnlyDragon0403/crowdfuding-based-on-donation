// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

library MemberGroupLib {
    using MemberGroupLib for MemberGroupLib.MemberGroup;

    struct Member{
        uint256 _created_at;        // refers to entried date of member
        uint256 _owner_ID;         // refers to identifer of owner in all members of space
        uint256 _member_ID;         // refers to identifer of list in all members of space
        uint _member_TYPE;          // refers to upgrade ,re-entry and starter
    }

    struct MemberGroup{
        address _owner;     // address of group
        string _name;               // name of group

        Member[]  _member_group;        // group of same ID and address.
    }

    function createMemberGroup(         // create member group by new address
        MemberGroup storage self,
        address owner,
        string memory name
    ) internal {
        self._owner = owner;
        self._name = name;
    }

    function InsertMember(              // 2.make new member group or register new _member_ID into its member group.
        MemberGroup storage self,
        uint256 owner_ID,              // owner ID of space.
        uint256 member_ID,              // member ID of space.
        uint member_TYPE
    ) internal {
        self._member_group.push(Member({
                _created_at : block.timestamp,
                _owner_ID : owner_ID,
                _member_ID : member_ID,
                _member_TYPE : member_TYPE
        }));
    }
}
