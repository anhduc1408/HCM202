import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const HeaderWrapper = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${({ $scrolled, theme }) =>
    $scrolled ? 'rgba(255, 255, 255, 0.98)' : 'transparent'};
  box-shadow: ${({ $scrolled, theme }) =>
    $scrolled ? theme.shadows.md : 'none'};
  transition: all ${({ theme }) => theme.transitions.normal};
  backdrop-filter: ${({ $scrolled }) =>
    $scrolled ? 'blur(10px)' : 'none'};
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) =>
    `${typeof window !== 'undefined' && window.scrollY > 50
      ? theme.spacing.sm
      : theme.spacing.md
    } ${theme.spacing.lg}`};
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: padding ${({ theme }) => theme.transitions.normal};
`;

const Logo = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  color: ${({ $scrolled, theme }) =>
    $scrolled ? theme.colors.primary : theme.colors.textWhite};
  cursor: pointer;
  background: transparent;
  border: none;
  padding: 0;
  border-radius: 0;
  
  span {
    color: ${({ theme }) => theme.colors.secondary};
  }
  
  img {
    background: transparent;
    border: none;
    border-radius: 0;
  }
`;

const NavMenu = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const NavLink = styled(motion.a)`
  color: ${({ $scrolled, theme }) =>
    $scrolled ? theme.colors.textPrimary : theme.colors.textWhite};
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  cursor: pointer;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.secondary};
    transition: width ${({ theme }) => theme.transitions.normal};
  }
  
  &:hover::after {
    width: 100%;
  }
  
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  background: none;
  color: ${({ $scrolled, theme }) =>
    $scrolled ? theme.colors.primary : theme.colors.textWhite};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  padding: ${({ theme }) => theme.spacing.sm};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 280px;
  height: 100vh;
  background: white;
  box-shadow: ${({ theme }) => theme.shadows.xl};
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.lg};
  z-index: 1001;
`;

const MobileNavLink = styled(motion.a)`
  display: block;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  padding: ${({ theme }) => theme.spacing.md} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.lg};
  right: ${({ theme }) => theme.spacing.lg};
  background: none;
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const navItems = [
  { name: 'Trang chủ', href: '#home' },
  { name: 'Quá trình hình thành', href: '#chapter1' },
  { name: 'Độc lập dân tộc & CNXH', href: '#chapter2' },
  { name: 'ĐCSVN & Nhà nước của dân, do dân, vì dân', href: '#chapter3' },
  { name: 'Quiz', href: '#quiz' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <HeaderWrapper
        $scrolled={scrolled}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <NavContainer>
          <Logo
            $scrolled={scrolled}
            onClick={() => scrollToSection('#home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ background: 'transparent', boxShadow: 'none' }}
          >
            <img
              src="https://img1.kienthucvui.vn/uploads/2019/08/15/bac-ho_103550328.jpg"
              alt="Logo"
              style={{ width: '60px', height: '60px', objectFit: 'contain', background: 'transparent' }}
            />

          </Logo>

          <NavMenu>
            {navItems.slice(0, 7).map((item, index) => (
              <NavLink
                key={item.name}
                href={item.href}
                $scrolled={scrolled}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.name}
              </NavLink>
            ))}
          </NavMenu>

          <MobileMenuButton
            $scrolled={scrolled}
            onClick={() => setMobileMenuOpen(true)}
            whileTap={{ scale: 0.9 }}
          >
            ☰
          </MobileMenuButton>
        </NavContainer>
      </HeaderWrapper>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <MobileMenu
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <CloseButton onClick={() => setMobileMenuOpen(false)}>
                ✕
              </CloseButton>
              {navItems.map((item, index) => (
                <MobileNavLink
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {item.name}
                </MobileNavLink>
              ))}
            </MobileMenu>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
