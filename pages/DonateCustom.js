// Page to donate amount to cause

// import dynamic from "next/dynamic";
import {ethers} from 'ethers';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Web3Modal from "web3modal"
import { causeaddress, allcausesaddress } from '../config';
import Cause from '../artifacts/contracts/Cause.sol/Cause.json';
import AllCause from '../artifacts/contracts/AllCause.sol/AllCause.json';
import Image from 'next/image'
import Link from 'next/link'
import {cause} from '../pages/allcause'
import allcause from '../pages/allcause'




// const donateCause = dynamic(() => import("../pages/allcause"));

export default function DonateCustom() {

    const [formInput, updateFormInput] = useState({amount: ''});
    const {amount} = formInput;


    return (
        <div className="flex justify-center">
            <div className="w-1/2 flex flex-col pb-12">
                    <input 
                    placeholder="Enter Amount in Eth"
                    className="mt-8 border rounded p-4"
                    type="number"
                    onChange={e => updateFormInput({...formInput, amount: e.target.value})}
                    />
                    <button className="w-full bg-blue-700 text-white font-bold py-2 px-12 rounded"
                  onClick={() => allcause.donateCause(cause, amount)}>Donate</button>
            </div>
        </div>
    )
}
  