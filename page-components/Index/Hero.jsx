import { ButtonLink } from '@/components/Button';
import { Container, Spacer, Wrapper } from '@/components/Layout';
import Link from 'next/link';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <Wrapper>
      <div>
        <h1 className={styles.title}>
          <span className={styles.nextjs}>Helping Hands</span>
          <span className={styles.mongodb}>Make India Smile :)</span>
        </h1>
        <Container justifyContent="center" className={styles.buttons}>
          <Container>
            <Link passHref href="/login">
              <ButtonLink className={styles.button}>Login</ButtonLink>
            </Link>
          </Container>

          <Spacer axis="horizontal" size={1} />

          <Container justifyContent="center" className={styles.buttons}>
          <Container>
            <Link passHref href="/sign-up">
              <ButtonLink className={styles.button}>SignUp</ButtonLink>
            </Link>
          </Container>
          
          </Container>
        </Container>
        {/* <p className={styles.subtitle}>
          A Next.js and MongoDB web application, designed with simplicity for
          learning and real-world applicability in mind.
        </p> */}
      </div>
    </Wrapper>
  );
};

export default Hero;
