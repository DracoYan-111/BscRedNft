/*
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "../lib/interface/IERC721.sol";
import "./OwnableOperatorRole.sol";

contract TransferProxyForDeprecated is OwnableOperatorRole {

    function erc721TransferFrom(IERC721 token, address from, address to, uint256 tokenId) external onlyOperator {
        token.transferFrom(from, to, tokenId);
    }
}
*/
