// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


/// @title Red collectibles(Public chain version)
/// @author YanLong-111
/// @notice Collectibles from the alliance chain to the public chain, but the user does not hold the ownership
/// @dev Multi-authentication system, Collectibles ownership is not owned by the user
contract RedCollection is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address public tradContract;

    /**
    * @param _name Collectibles name
    * @param _symbol Collectibles symbol
    * @param _tradContract Trading contract
    */
    constructor(
        string memory _name,
        string memory _symbol,
        address _tradContract
    ) ERC721(_name, _symbol) {
        tradContract = _tradContract;
    }


    /**
    * Todo Business undecided!
    * @dev Foundry collectibles to trading contract
    * @param _tokenURI Collectibles data
    */
    function foundryCollectibles(
        string memory _tokenURI
    ) external onlyOwner returns (uint256 newItemId_){
        newItemId_ = _tokenIds.current();
        _mint(tradContract, newItemId_);
        _setTokenURI(newItemId_, _tokenURI);

        _tokenIds.increment();
        return newItemId_;
    }
}
