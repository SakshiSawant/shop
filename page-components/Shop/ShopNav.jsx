import { Button } from '@/components/Button';
import { Text, TextLink } from '@/components/Text';
import Spacer from '@/components/Layout/Spacer';
import Link from 'next/link';
import styles from './ShopNav.module.css';


const ShopNav = () => {
    return(
        <div className={styles.navshop}>
            <Link href="/create-item" passHref>
                <Button type="success">Create Item</Button>
            </Link>
            <Spacer axis="horizontal" size={0.5} />

            <Spacer axis="vertical" size={0.25} />

            <Link href="/my-assets" passHref>
                <Button type="success">Assets</Button>
            </Link>

            <Spacer axis="horizontal" size={0.5} />

            <Link href="/creator-dashboard" passHref>
                <Button type="success">Dashboard</Button>
            </Link>
        </div>
    )
}

export default ShopNav;