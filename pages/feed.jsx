import { Feed } from '@/page-components/Feed';
import Head from 'next/head';

const FeedPage = () => {
  return (
    <>
      <Head>
        <title>Feed</title>
      </Head>
      <nav>
                <div className="text-sm lg:flex-grow">
                    <a href="/create-item" className="block mt-4 lg:inline-block text-lg lg:mt-0 text-white hover:text-white mr-4">
                        Create Item
                    </a>

                    <a href="/my-assets" className="block mt-4 lg:inline-block text-lg lg:mt-0 text-white hover:text-white mr-4">
                        My Item
                    </a>

                    <a href="/creator-dashboard" className="block mt-4 text-lg lg:inline-block lg:mt-0 text-white hover:text-white mr-4">Dashboard</a>
                <a href="/allcause" className="block mt-4 lg:inline-block text-lg lg:mt-0 text-white hover:text-white mr-4">
                        Causes
                    </a>
        </div>
            </nav>
      <Feed />
    </>
  );
};

export default FeedPage;
