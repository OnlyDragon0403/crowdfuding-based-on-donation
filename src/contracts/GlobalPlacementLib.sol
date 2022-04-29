// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./ConstantLib.sol";
import { SpaceMatrixLib } from "./SpaceMatrixLib.sol";

library GlobalPlacementLib {

    using GlobalPlacementLib for SpaceMatrixLib.SpaceMatrix;
    /// @dev returns true if the list exists
    /// @param self stored company matrix from contract
    function listExists(SpaceMatrixLib.SpaceMatrix storage self)
        internal
        view returns (bool)
    {
        // if the head nodes childnodes point to itself, then there are no items in the list
        uint index;

        for (index = 1; index <= ConstantLib.getMemCnt(); index++) {
            if(self.list[ConstantLib.getHEAD()][index] != ConstantLib.getHEAD())       // refers to range from 1 until Constant._mem_cnt for HEAD's childnodes
                return true;
        }
        return false;
    }

    /// @dev returns true if the node exists
    /// @param self stored company matrix from contract
    /// @param _node a node to search for
    function nodeExists(SpaceMatrixLib.SpaceMatrix storage self, uint256 _node)
        internal
        view returns (bool)
    {
        uint index;

        if(self.list[_node][ConstantLib.getPARENT()] != ConstantLib.getHEAD())
            return true;
        else
            for (index = 1; index <= ConstantLib.getMemCnt(); index++) {
                if(self.list[ConstantLib.getHEAD()][index] == _node){
                    return true;
                }
            }
        return false;
    }

    /// @dev Returns the number of elements in the list
    /// @param self stored company matrix from contract
    function sizeOf(SpaceMatrixLib.SpaceMatrix storage self) internal view returns (uint256 numElements) {
        bool exists;
        uint256 i;
        uint nI;

        for(nI = 1; nI <= ConstantLib.getMemCnt(); nI++){
            uint nJ;
            (exists,i) = getNode(self, ConstantLib.getHEAD(), nI);
            while (i != ConstantLib.getHEAD()) {
                for(nJ = 1; nJ <= ConstantLib.getMemCnt(); nJ++){
                    (exists,i) = getNode(self, i, nJ);
                    numElements++;
                }
            }
        }
        return numElements;
    }

    /// @dev Returns the links of a node as a tuple
    /// @param self stored company matrix from contract
    /// @param _node id of the node to get
    function getNode(SpaceMatrixLib.SpaceMatrix storage self, uint256 _node, uint _nIndex)
        internal view returns (bool,uint256)
    {
        if (!nodeExists(self,_node)) {
            return (false,0);
        } else {
            return (true, self.list[_node][_nIndex]);
        }
    }

    /// @dev Returns the links of a node as a tuple
    /// @param self stored company matrix from contract
    /// @param _node id of the node to get
    function getParentNode(SpaceMatrixLib.SpaceMatrix storage self, uint256 _node)
        internal view returns (bool,uint256)
    {
        if (self.list[_node][ConstantLib.getPARENT()] == ConstantLib.getHEAD() && _node == 0) {
            return (false,0);
        } else {
            return (true, self.list[_node][ConstantLib.getPARENT()]);
        }
    }

    /// @dev Creates a bidirectional link between two nodes on direction `_nIndex`
    /// @param self stored company matrix from contract
    /// @param _node first node for linking
    /// @param _link  node to link to in the _direction
    function createLink(SpaceMatrixLib.SpaceMatrix storage self, uint256 _node, uint256 _link, uint _nIndex) internal  {
        self.list[_node][_nIndex] = _link;
        self.list[_link][ConstantLib.getPARENT()] = _node;
    }

    /// @dev Insert node `_new` beside existing node `_node` in direction `_nIndex`.
    /// @param self stored company matrix from contract
    /// @param _node existing node
    /// @param _new  new node to insert
    /// @param _nIndex direction to insert node in
    function insert(SpaceMatrixLib.SpaceMatrix storage self, uint256 _node, uint256 _new, uint _nIndex) internal returns (bool) {
        if(!nodeExists(self,_new) && nodeExists(self,_node)) {
            createLink(self, _node, _new, _nIndex);
            return true;
        } else {
            return false;
        }
    }

    /// @dev Get prevNode and nodeIndex according to tree searching formula with self._arrangement[1] and self._arrangement[0]
    /// @param self stored company matrix from contract
    /// @param _number stored company matrix from contract
    /// @param _level stored company matrix from contract
    function getPrevNodeAndIndex(SpaceMatrixLib.SpaceMatrix storage self, uint256 _number, uint _level) internal view returns (uint256, uint256) {
        uint256 prevNode = ConstantLib.getHEAD();
        uint256 nodeIndex;
        uint256 div;
        uint256 rest;
        uint deep = 0;

        div = _number;
        while(deep != _level - 1){              // search prevNode and nodeIndex from company matrix
            uint256 nDiv = ConstantLib.getMemCnt() ** (_level - deep - 1);
            rest = div % nDiv;
            div = div / nDiv;
            if( deep < _level - 1){
                nodeIndex = rest == 0 ? ( div == 0 ? ConstantLib.getMemCnt() : div ) : div + 1;
                prevNode = self.list[prevNode][nodeIndex];
            }

            deep++;
            if(deep == _level - 1)
                nodeIndex = rest == 0 ? ConstantLib.getMemCnt() : rest;
            div = rest;
        }

        return (prevNode, nodeIndex);
    }

    /// @dev Insert node `_new` beside existing node `_node` in direction `_nIndex`.
    /// @param self stored company matrix from contract
    function getGlobalPlacement(SpaceMatrixLib.SpaceMatrix storage self) internal returns (uint256, uint256 , uint256) {         // onwards level4 placement
        uint256 prevNode;
        uint256 nodeIndex;
        uint256 lv1Limit;
        uint256 lv2Limit;
        // get current _arrangement for nth level and n+1th level
        lv1Limit = ConstantLib.getMemCnt() ** self._arrangement[0];
        lv2Limit = ConstantLib.getMemCnt() ** ( self._arrangement[0] + 1 );

        if( self._arrangement[1] < lv1Limit * 60 / 100 ){      // new member should enter into current level until 60%.
            self._arrangement[1]++;
            (prevNode , nodeIndex) = self.getPrevNodeAndIndex(self._arrangement[1], self._arrangement[0]);
        }
        else if(self._arrangement[2] < lv2Limit * 8 / 100){         // new member should enter into current level+1 until 8% .
            self._arrangement[2]++;
            (prevNode , nodeIndex) = self.getPrevNodeAndIndex(self._arrangement[2], self._arrangement[0] + 1);
        }
        else{           // new member should enter into current level until rest 40% .
            self._arrangement[1]++;
            (prevNode , nodeIndex) = self.getPrevNodeAndIndex(self._arrangement[1], self._arrangement[0]);
        }

        return ( prevNode, self._total_positions - 1, nodeIndex );
    }

    function getLevelNumbers(SpaceMatrixLib.SpaceMatrix storage self , uint256 node) internal view returns (uint256, uint256, uint256){
        uint256 lv_num_1 = 0;
        uint256 lv_num_2 = 0;
        uint256 lv_num_3 = 0;
        uint i;
        uint j;
        uint256[5] memory lv_pos_1;
        uint256[25] memory lv_pos_2;
        // get number of level 1
        for(i = 0; i < ConstantLib.getMemCnt(); i++){
            if(self.list[node][i + 1] == ConstantLib.getHEAD())
                return (lv_num_1, lv_num_2, lv_num_3);
            lv_pos_1[lv_num_1 ++] = self.list[node][i + 1];
        }

        // get number of level 2
        for(i = 0; i < ConstantLib.getMemCnt(); i++){
            uint256 cur_node = lv_pos_1[i];
            for(j = 0; j < ConstantLib.getMemCnt(); j++){
                if(self.list[cur_node][j + 1] == ConstantLib.getHEAD())
                    return (lv_num_1, lv_num_2, lv_num_3);
                lv_pos_2[lv_num_2 ++] = self.list[cur_node][j + 1];
            }
        }

        // get number of level 3
        for(i = 0; i < ConstantLib.getMemCnt() ** 2; i++){
            uint256 cur_node = lv_pos_2[i];
            for(j = 0; j < ConstantLib.getMemCnt(); j++){
                if(self.list[cur_node][j + 1] == ConstantLib.getHEAD())
                    return (lv_num_1, lv_num_2, lv_num_3);
                lv_num_3 ++;
            }
        }
        return (lv_num_1, lv_num_2, lv_num_3);
    }

    function getCurColumnPos(SpaceMatrixLib.SpaceMatrix storage self) internal view returns (uint256) {
        uint256 lv1Limit;
        uint256 lv2Limit;
        // get current _arrangement for nth level and n+1th level
        lv1Limit = ConstantLib.getMemCnt() ** self._arrangement[0];
        lv2Limit = ConstantLib.getMemCnt() ** ( self._arrangement[0] + 1 );

        if( self._arrangement[1] < lv1Limit * 60 / 100 ){      // new member should enter into current level until 60%.
            return self._arrangement[1];
        }
        else if(self._arrangement[2] < lv2Limit * 8 / 100){         // new member should enter into current level+1 until 8% .
            return self._arrangement[2];
        }
        else{           // new member should enter into current level until rest 40% .
            return self._arrangement[1];
        }
    }
}
