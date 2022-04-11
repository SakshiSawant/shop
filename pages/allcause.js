// Page where the user will be able to view all the beneficiary projects available
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Web3Modal from "web3modal"
import { causeaddress, allcausesaddress } from '../config';
import Cause from '../artifacts/contracts/Cause.sol/Cause.json';
import AllCause from '../artifacts/contracts/AllCause.sol/AllCause.json';
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

import React from "react";
import { Button, Modal, ModalBody, ModalFooter }
  from "reactstrap";

export default function Home() {
  const [causes, setCauses] = useState([]);
  const [loadingState, setLoadingState] = useState('not-loaded');
  const [formInput, updateFormInput] = useState({ amount: '' });


  useEffect(() => {
    loadCauses();

  }, []);

  async function loadCauses() {
    const provider = new ethers.providers.JsonRpcProvider();
    const tokenContract = new ethers.Contract(causeaddress, Cause.abi, provider);
    const allcauseContract = new ethers.Contract(allcausesaddress, AllCause.abi, provider);

    //return an array of unsold market items
    const data = await allcauseContract.fetchCauseItems();

    const causes = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId);
      const meta = await axios.get(tokenUri);
      let goal = ethers.utils.formatUnits(i.goal.toString(), 'ether')
      let causeInstance = {
        goal,
        tokenId: i.tokenId.toNumber(),
        creator: i.creator,
        donor: i.donor,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
      }
      return causeInstance;
    }));

    setCauses(causes);
    setLoadingState('loaded')
  }

  async function donateCause() {
   const { amount } = formInput;

   if(!amount) {
    return
   }


    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    //sign the transaction
    const signer = provider.getSigner();
    const contract = new ethers.Contract(allcausesaddress, AllCause.abi, signer);


    //set the price
    const temp = ethers.utils.parseUnits(formInput.amount, 'ether')
    // const amount = ethers.utils.parseUnits(cause.temp.toString(), 'ether');

    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()

    //make the sale
    const transaction = await contract.createCauseDonate(causeaddress, temp, {
      value: temp
    });
    await transaction.wait();

    loadCauses()
  }

  if (loadingState === 'loaded' && !causes.length) return (
    <h1 className="px-20 py-10 text-3xl">No Causes Available!</h1>
  )


  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: '1400px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
          {
            causes.map((cause, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">

                <Image
                  src={cause.image}
                  alt="Picture of the Cause"
                  width={450}
                  height={250}
                />
                <div className="p-4">
                  <p style={{ height: '30px' }} className="text-2xl font-semibold">
                    {cause.name}
                  </p>
                  <div style={{ height: '60px', overflow: 'hidden' }}>
                    <p className="text-gray-400">{cause.description}</p>
                  </div>
                </div>
                <div className="p-4 bg-black">
                  <p className="text-2xl mb-4 font-bold text-white">
                    {cause.goal} ETH
                  </p>

                  <p className="text-xl mb-4 text-white">
                  Amount Collected : 0 {cause.amount} ETH
                  </p>

                  <input
                    placeholder="Enter Amount to Donate"
                    className="w-full mt-4 mb-4 border rounded p-4"
                    type="number"
                    onChange={e => updateFormInput({ ...formInput, amount: e.target.value })}
                  />

                  <button className="w-full bg-blue-700 text-white font-bold py-2 px-12 rounded"
                    onClick={() => donateCause()}>Donate Now</button>

                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}