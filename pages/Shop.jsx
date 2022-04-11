import { Feed } from '@/page-components/Feed';
import ShopNav from '@/page-components/Shop/ShopNav';
import Head from 'next/head';

const ShopPage = () => {
  return (
    <>
      <Head>
        <title>Feed</title>
      </Head>
      
      <ShopNav />
    </>
  );
};

export default ShopPage;
