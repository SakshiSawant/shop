import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Container, Spacer, Wrapper } from '@/components/Layout';
import { TextLink } from '@/components/Text';
import { fetcher } from '@/lib/fetch';
import { useCurrentUser } from '@/lib/user';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import styles from './Auth.module.css';

const SignUp = () => {
  const [accounttype, setAccounttype] = useState();
  let temp;
  const handleChange = e => {
    const target = e.target;
    if (target.checked) {
      setAccounttype(target.value);
      temp = target.value;
    }
  };
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const nameRef = useRef();
  const accounttypeRef = temp;
  const { mutate } = useCurrentUser();

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      console.log(e);
      try {
        setIsLoading(true);
        const response = await fetcher('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: emailRef.current.value,
            name: nameRef.current.value,
            password: passwordRef.current.value,
            accounttype: temp,
            username: usernameRef.current.value,
          }),
        });
        mutate({ user: response.user }, false);
        toast.success('Your account has been created');
        router.replace('/feed');
      } catch (e) {
        toast.error(e.message);
      } finally {
        setIsLoading(false);
      }
    },
    [mutate, router]
  );

  return (
    <Wrapper className={styles.root}>
      <div className={styles.main}>
        <h1 className={styles.title}>Join Now</h1>
        <form onSubmit={onSubmit}>
          <Container alignItems="center">
            <p className={styles.subtitle}>Your login</p>
            <div className={styles.seperator} />
          </Container>
          <Input
            ref={emailRef}
            htmlType="email"
            autoComplete="email"
            placeholder="Email Address"
            ariaLabel="Email Address"
            size="large"
            required
          />
          <Spacer size={0.5} axis="vertical" />
          <Input
            ref={passwordRef}
            htmlType="password"
            autoComplete="new-password"
            placeholder="Password"
            ariaLabel="Password"
            size="large"
            required
          />
          
          <Container alignItems="center">
            <p className={styles.subtitle}>About you</p>
            <div className={styles.seperator} />
          </Container>
          <Input
            ref={usernameRef}
            autoComplete="username"
            placeholder="Username"
            ariaLabel="Username"
            size="large"
            required
          />
          <Spacer size={0.5} axis="vertical" />
          
        <div>
          <label>
            <input type="radio" name="accounttype" value="donor" checked={accounttype == 'donor'} onChange={handleChange} />
            <span>Donor</span>
            </label>
            
          <label>
            <input type="radio" name="accounttype" value="beneficiary" checked={accounttype == 'beneficiary'} onChange={handleChange} />
            <span>Beneficiary</span>
          </label>
              
          <label>
            <input type="radio" name="accounttype" value="cooperativeshop" checked={accounttype == 'cooperativeshop'} onChange={handleChange} />
            <span>Cooperative Shop</span>
          </label>
      </div>
          
          <Spacer size={0.5} axis="vertical" />
          <Input
            ref={nameRef}
            autoComplete="name"
            placeholder="Your name"
            ariaLabel="Your name"
            size="large"
            required
          />
          <Spacer size={1} axis="vertical" />
          <Button
            htmlType="submit"
            className={styles.submit}
            type="success"
            size="large"
            loading={isLoading}
          >
            Sign up
          </Button>
        </form>
      </div>
      <div className={styles.footer}>
        <Link href="/login" passHref>
          <TextLink color="link" variant="highlight">
            Already have an account? Log in
          </TextLink>
        </Link>
      </div>
    </Wrapper>
  );
};

export default SignUp;




