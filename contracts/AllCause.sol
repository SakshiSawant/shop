//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract AllCause is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _causeIds; //total number of cause ever raised
    Counters.Counter private _causeDone; //total number of cause completed/done

    address payable owner; //owner of the smart contract
    //people have to pay to put their Cause on this Dashboard
    uint256 listingPrice = 0.025 ether;
    uint256 minamount = 0.05 ether;

    constructor() {
        owner = payable(msg.sender);
    }

    struct CauseItem {
        uint256 causeId; 
        address causeContract;
        uint256 tokenId;
        address payable creator; //person selling the nft
        address payable donor; //owner of the nft  //Comment if not required
        uint256 amount;
        uint256 goal;
        bool completed;
    }

    //a way to access values of the CauseItem struct above by passing an integer ID
    mapping(uint256 => CauseItem) private idCauseItem;

    //log message (when Item is sold)
    event CauseItemCreated(
        uint256 indexed causeId,
        address indexed causeContract,
        uint256 indexed tokenId,
        address creator,
        address donor,
        uint256 amount,
        uint256 goal,
        bool completed
    );

    /// @notice function to get listingprice
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    function setListingPrice(uint256 _price) public returns (uint256) {
        if (msg.sender == address(this)) {
            listingPrice = _price;
        }
        return listingPrice;
    }

    /// @notice function to create market item
    function createCauseItem(
        address causeContract,
        uint256 tokenId,
        uint256 amount,
        uint256 goal
    ) public payable nonReentrant {
        require(goal > 0, "Price must be above zero");
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );
        _causeIds.increment(); //add 1 to the total number of items ever created 
        uint256 causeId = _causeIds.current();

        idCauseItem[causeId] = CauseItem(
            causeId,
            causeContract,
            tokenId,
            payable(msg.sender), //address of the seller putting the nft up for sale
            payable(address(0)), //no owner yet (set owner to empty address)
            amount,
            goal,
            false
        );

        //transfer ownership of the nft to the contract itself
        IERC721(causeContract).transferFrom(msg.sender, address(this), tokenId);

        //log this transaction
        emit CauseItemCreated(
            causeId,
            causeContract,
            tokenId,
            msg.sender,
            address(0),
            0, //amount=0
            goal,
            false
        );
    }

    /// @notice function to create a sale
    function createCauseDonate(address causeContract, uint256 causeId, uint256 curramt)
        public
        payable
        nonReentrant
    {
        //Need to add a line for custom amount
        uint256 curramount = curramt;
        uint256 tokenId = idCauseItem[causeId].tokenId;

        require(
            msg.value >= minamount,
           "Please submit the asking price in order to complete purchase"
        );

        msg.value == curramount;

        //pay the seller the amount
        idCauseItem[causeId].creator.transfer(msg.value);

        //transfer ownership of the nft from the contract itself to the buyer
        IERC721(causeContract).transferFrom(address(this), msg.sender, tokenId);

        idCauseItem[causeId].donor = payable(msg.sender); //mark buyer as new owner //No need to change later..

        idCauseItem[causeId].amount += curramount;
        if(idCauseItem[causeId].amount >= idCauseItem[causeId].goal){
            idCauseItem[causeId].completed = true; //mark that it has been sold
            _causeDone.increment(); //increment the total number of Items sold by 1
        }
        
        payable(owner).transfer(listingPrice); //pay owner of contract the listing price

    }

    /// @notice total number of items unsold on our platform
    function fetchCauseItems() public view returns (CauseItem[] memory) {
        uint256 causeCount = _causeIds.current(); //total number of causes ever created
        //total number of items that are unsold = total items ever created - total items ever sold
        uint256 undoneCauseCount = _causeIds.current() - _causeDone.current();
        uint256 currentIndex = 0;

        CauseItem[] memory causes = new CauseItem[](undoneCauseCount);

        //loop through all causes ever created
        for (uint256 i = 0; i < causeCount; i++) {
            //get only undone cause
            //check if the item has not been sold
            //by checking if the owner field is empty
            if (idCauseItem[i + 1].donor == address(0)) {
                //yes, this item has never been sold
                uint256 currentId = idCauseItem[i + 1].causeId;
                CauseItem storage currentCause = idCauseItem[currentId];  
                causes[currentIndex] = currentCause;
                currentIndex += 1;
            }
        }
        return causes; //return array of all undone causes
    }

    /// @notice fetch list of Causes done/undone by this user
    function fetchMyCauses() public view returns (CauseItem[] memory) {
        //get total number of items ever created
        uint256 totalCauseCount = _causeIds.current();

        uint256 causeCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalCauseCount; i++) {
            //get only the items that this user has bought/is the owner
            if (idCauseItem[i + 1].donor == msg.sender) {
                causeCount += 1; //total length
            }
        }

        CauseItem[] memory causes = new CauseItem[](causeCount);
        for (uint256 i = 0; i < totalCauseCount; i++) {
            if (idCauseItem[i + 1].donor == msg.sender) {
                uint256 currentId = idCauseItem[i + 1].causeId;
                CauseItem storage currentItem = idCauseItem[currentId];
                causes[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return causes;
    }

    /// @notice fetch list of NFTS owned/bought by this user
    function fetchCausesCreated() public view returns (CauseItem[] memory) {
        //get total number of items ever created
        uint256 totalCauseCount = _causeIds.current();

        uint256 causeCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalCauseCount; i++) {
            //get only the items that this user has bought/is the owner
            if (idCauseItem[i + 1].creator == msg.sender) {
                causeCount += 1; //total length
            }
        }

        CauseItem[] memory causes = new CauseItem[](causeCount);
        for (uint256 i = 0; i < totalCauseCount; i++) {
            if (idCauseItem[i + 1].creator == msg.sender) {
                uint256 currentId = idCauseItem[i + 1].causeId;
                CauseItem storage currentCause = idCauseItem[currentId];
                causes[currentIndex] = currentCause;
                currentIndex += 1;
            }
        }
        return causes;
    }

}
