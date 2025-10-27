'use client';

import { Button, Text } from '@mantine/core';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

interface HeaderProps {
  onCreateClick: () => void;
}

export default function Header({ onCreateClick }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.navContainer}>
        <Link href="/" style={{ textDecoration: 'none' }} className={styles.logo}>
          <Image src="/logo.png" alt="Logo" width={40} height={40} style={{ display: 'block' }} />
        </Link>

        <div className={styles.navLinks}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Text
              className={styles.navLink}
              fw={pathname === '/' ? 600 : 400}
              c={pathname === '/' ? '#000' : '#495057'}
            >
              Home
            </Text>
          </Link>
          <Link href="/find-jobs" style={{ textDecoration: 'none' }}>
            <Text
              className={styles.navLink}
              fw={pathname === '/find-jobs' ? 600 : 400}
              c={pathname === '/find-jobs' ? '#000' : '#495057'}
            >
              Find Jobs
            </Text>
          </Link>
          <Link href="/find-talents" style={{ textDecoration: 'none' }}>
            <Text
              className={styles.navLink}
              fw={pathname === '/find-talents' ? 600 : 400}
              c={pathname === '/find-talents' ? '#000' : '#495057'}
            >
              Find Talents
            </Text>
          </Link>
          <Link href="/about" style={{ textDecoration: 'none' }}>
            <Text
              className={styles.navLink}
              fw={pathname === '/about' ? 600 : 400}
              c={pathname === '/about' ? '#000' : '#495057'}
            >
              About us
            </Text>
          </Link>
          <Link href="/testimonials" style={{ textDecoration: 'none' }}>
            <Text
              className={styles.navLink}
              fw={pathname === '/testimonials' ? 600 : 400}
              c={pathname === '/testimonials' ? '#000' : '#495057'}
            >
              Testimonials
            </Text>
          </Link>
        </div>

        <Button onClick={onCreateClick} className={styles.createButton}>
          Create Jobs
        </Button>
      </div>
    </header>
  );
}
