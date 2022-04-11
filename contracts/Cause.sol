//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Cause is ERC721URIStorage {
    //auto-increment field for each token
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    //address of the NFT market place

    address contractAddress;

    constructor(address allcauseAddress)
        ERC721("Partnerverse Tokens", "PNVT")
    {
        contractAddress = allcauseAddress;
    }

    /// @notice create a new token
    /// @param tokenURI : token URI
    function createToken(string memory tokenURI) public returns (uint256) {
        //set a new token id for the token to be minted
        _tokenIds.increment();
        uint256 newCauseId = _tokenIds.current();

        _mint(msg.sender, newCauseId); //mint the token
        _setTokenURI(newCauseId, tokenURI); //generate the URI
        setApprovalForAll(contractAddress, true); //grant transaction permission to marketplace

        //return token ID
        return newCauseId;
    }
}
