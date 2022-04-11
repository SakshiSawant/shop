import { Avatar } from '@/components/Avatar';
import { Button, ButtonLink } from '@/components/Button';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { fetcher } from '@/lib/fetch';
import { useCurrentUser } from '@/lib/user';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Container from './Container';
import styles from './Nav.module.css';
import Spacer from './Spacer';
import Wrapper from './Wrapper';

const UserMenu = ({ user, mutate }) => {
  const menuRef = useRef();
  const avatarRef = useRef();

  const account_type = user.accounttype;
  // console.log(account_type);

  let create;
 
  // if (account_type == 'cooperativeshop')
  //   create = 'create-item';
  // else if (account_type == 'beneficiary')
  //   create = 'create-cause';

  const [visible, setVisible] = useState(false);

  const router = useRouter();
  useEffect(() => {
    const onRouteChangeComplete = () => setVisible(false);
    router.events.on('routeChangeComplete', onRouteChangeComplete);
    return () =>
      router.events.off('routeChangeComplete', onRouteChangeComplete);
  });

  useEffect(() => {
    // detect outside click to close menu
    const onMouseDown = (event) => {
      if (
        !menuRef.current.contains(event.target) &&
        !avatarRef.current.contains(event.target)
      ) {
        setVisible(false);
      }
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
    };
  }, []);

  const onSignOut = useCallback(async () => {
    try {
      await fetcher('/api/auth', {
        method: 'DELETE',
      });
      toast.success('You have been signed out');
      mutate({ user: null });
    } catch (e) {
      toast.error(e.message);
    }
  }, [mutate]);

  return (
    <div className={styles.user}>
      <button
        className={styles.trigger}
        ref={avatarRef}
        onClick={() => setVisible(!visible)}
      >
        <Avatar size={32} username={user.username} url={user.profilePicture} />
      </button>
      <div
        ref={menuRef}
        role="menu"
        aria-hidden={visible}
        className={styles.popover}
      >

        {/* If user is the beneficiary */}
        {visible && account_type === 'beneficiary' && (
          <div className={styles.menu}>
            <Link passHref href={`/user/${user.username}`}>
              <a className={styles.item}>Profile</a>
            </Link>
            <Link passHref href={`/user/${user.username}`}>
              <a className={styles.item}>{account_type}</a>
            </Link>
            <Link passHref href={`/create-cause`}>
              <a className={styles.item}>Create Cause</a>
            </Link>

            {/* Later uncomment */}
            {/* <Link passHref href={`/mycauses`}>
              <a className={styles.item}>My Cause</a>
            </Link> */}

            <Link passHref href="/buyitems">
              <a className={styles.item}>Buy Items</a>
            </Link>
            <Link passHref href="/my-assets">
              <a className={styles.item}>My Items</a>
            </Link>
            
            <Link passHref href="/settings">
              <a className={styles.item}>Settings</a>
            </Link>
            <div className={styles.item} style={{ cursor: 'auto' }}>
              <Container alignItems="center">
                <span>Theme</span>
                <Spacer size={0.5} axis="horizontal" />
                <ThemeSwitcher />
              </Container>
            </div>
            <button onClick={onSignOut} className={styles.item}>
              Sign out
            </button>
          </div>
        )}

        {/* If user is the donor */}
        {visible && account_type === 'donor' && (
          <div className={styles.menu}>
            <Link passHref href={`/user/${user.username}`}>
              <a className={styles.item}>Profile</a>
            </Link>
            <Link passHref href={`/user/${user.username}`}>
              <a className={styles.item}>{account_type}</a>
            </Link>
            <Link passHref href="/allcause">
              <a className={styles.item}>Donate for Cause</a>
            </Link>

            {/* <Link passHref href="/mytransaction">
              <a className={styles.item}>My Transaction</a>
            </Link> */}

            <Link passHref href="/settings">
              <a className={styles.item}>Settings</a>
            </Link>
            <div className={styles.item} style={{ cursor: 'auto' }}>
              <Container alignItems="center">
                <span>Theme</span>
                <Spacer size={0.5} axis="horizontal" />
                <ThemeSwitcher />
              </Container>
            </div>
            <button onClick={onSignOut} className={styles.item}>
              Sign out
            </button>
          </div>
        )}

        {/* If user is the cooperativeshop */}
        {visible && account_type === 'cooperativeshop' && (
          <div className={styles.menu}>
            <Link passHref href={`/user/${user.username}`}>
              <a className={styles.item}>Profile</a>
            </Link>
            <Link passHref href={`/user/${user.username}`}>
              <a className={styles.item}>{account_type}</a>
            </Link>
            
            <Link passHref href={`/create-item`}>
              <a className={styles.item}>Create Item</a>
            </Link>
            <Link passHref href="/creator-dashboard">
              <a className={styles.item}>Dashboard</a>
            </Link>
            <Link passHref href="/my-assets">
              <a className={styles.item}>My Assets</a>
            </Link>
            <Link passHref href="/settings">
              <a className={styles.item}>Settings</a>
            </Link>
            <div className={styles.item} style={{ cursor: 'auto' }}>
              <Container alignItems="center">
                <span>Theme</span>
                <Spacer size={0.5} axis="horizontal" />
                <ThemeSwitcher />
              </Container>
            </div>
            <button onClick={onSignOut} className={styles.item}>
              Sign out
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

const Nav = () => {
  const { data: { user } = {}, mutate } = useCurrentUser();

  return (
    <nav className={styles.nav}>
      <Wrapper className={styles.wrapper}>
        <Container
          className={styles.content}
          alignItems="center"
          justifyContent="space-between"
        >
          <Link href="/">
            <a className={styles.logo}>Next.js MongoDB App</a>
          </Link>
          <Container>
            {user ? (
              <>
                <UserMenu user={user} mutate={mutate} />
              </>
            ) : (
              <>
                <Link passHref href="/login">
                  <ButtonLink
                    size="small"
                    type="success"
                    variant="ghost"
                    color="link"
                  >
                    Log in
                  </ButtonLink>
                </Link>
                <Spacer axis="horizontal" size={0.25} />
                <Link passHref href="/sign-up">
                  <Button size="small" type="success">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </Container>
        </Container>
      </Wrapper>
    </nav>
  );
};

export default Nav;



// Shop == createItem,Dashboard(Items created, Items sold), Assets
// Beneficiary == createCause, Dashboard(Cause Created, Cause completed),buyItems
// Donor == ViewCauses(allcauses)

/*
1. Shop = 1. Create Item
          2. Assets
          3. Dashboard
2. Beneficiary = 1. Create Cause
                 2. Buy Items
                 3. Dashboard
3. Donor = 1. View Causes

const accountType = {

}

*/