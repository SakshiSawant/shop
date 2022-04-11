// Main page for navigation bar
// _app.js = itemnav.js

import '../styles/globals.css'
import Link from 'next/link'
import logo from '../public/logo.jpeg'
import Image from 'next/image'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav class="flex items-center justify-between flex-wrap bg-sky-500 p-6">
  <div class="flex items-center flex-shrink-0 text-white mr-6">
          {/* <!-- Image --> */}
          <Image
            src={logo}
            alt="Picture of the Item"
            className="rounded mt-4"
            width={50}
            height={50} 
          />
    {/* <span class="font-semibold text-xl tracking-tight">Helping Hands</span> */}
  </div>
 
  <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    <div className="text-sm lg:flex-grow">
      <a href="/" className="block mt-4 lg:inline-block text-lg lg:mt-0 text-white hover:text-white mr-4">
        Home
      </a>
      <a href="/create-item" className="block mt-4 text-lg lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
        Create Item
      </a>
      <a href="/my-assets" className="block mt-4 text-lg lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
        MyItem
      </a>
      <a href="/create-cause" className="block mt-4 text-lg lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
        Create Cause
      </a>
      <a href="/allcause" className="block mt-4 text-lg lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
        All Cause
      </a>


      <a href="/creator-dashboard" className="block mt-4 text-lg lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
        Dashboard
      </a>
      <a href="/transaction" className="block mt-4 text-lg lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
        My Transactions
      </a>
    </div>
    <div>
      <a href="/login" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Sign In</a>
    </div>
  </div>
</nav>

      <Component {...pageProps} />
    </div>
  
  )
}

export default MyApp




