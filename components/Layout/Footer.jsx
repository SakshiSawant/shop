import { Text, TextLink } from '@/components/Text';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import styles from './Footer.module.css';
import Spacer from './Spacer';
import Wrapper from './Wrapper';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Wrapper justifyContent="center">
        {/* <Spacer size={0.3} axis="vertical" /> */}
        <ThemeSwitcher />
        <Spacer size={0.5} axis="vertical" />
      <p>© Copyright 2021-2022 Helping Hands </p>
      </Wrapper>
    </footer>
  );
};

export default Footer;
