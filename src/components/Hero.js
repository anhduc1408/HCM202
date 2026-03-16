import React, { useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const HeroWrapper = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(
    -45deg,
    ${({ theme }) => theme.colors.bgGradientStart},
    ${({ theme }) => theme.colors.primaryLight},
    ${({ theme }) => theme.colors.secondary},
    ${({ theme }) => theme.colors.accent}
  );
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
`;

const ParallaxBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></svg>');
  background-size: 50px 50px;
  opacity: 0.3;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  max-width: 900px;
`;

const SubTitle = styled(motion.span)`
  display: inline-block;
  font-family: ${({ theme }) => theme.fonts.accent};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.accentLight};
  text-transform: uppercase;
  letter-spacing: 4px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  background: rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.full};
  backdrop-filter: blur(10px);
`;

const MainTitle = styled(motion.h1)`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textWhite};
  line-height: 1.1;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-shadow: 2px 2px 20px rgba(0, 0, 0, 0.3);
  
  span {
    display: block;
    color: ${({ theme }) => theme.colors.accentLight};
  }
`;

const Description = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  margin: 0 auto ${({ theme }) => theme.spacing.xl};
  line-height: 1.8;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  flex-wrap: wrap;
`;

const PrimaryButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.textWhite};
  font-weight: 600;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  box-shadow: 0 4px 15px rgba(197, 48, 48, 0.4);
  transition: all ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    background: ${({ theme }) => theme.colors.secondaryLight};
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(197, 48, 48, 0.5);
  }
`;

const SecondaryButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  background: rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.colors.textWhite};
  font-weight: 600;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  transition: all ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const FloatingIcon = styled(motion.div)`
  position: absolute;
  font-size: 3rem;
  opacity: 0.2;
  animation: ${float} 6s ease-in-out infinite;
  color: ${({ theme }) => theme.colors.textWhite};
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing['2xl']};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
`;

const MouseIcon = styled.div`
  width: 24px;
  height: 40px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 8px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 2px;
    animation: scrollDown 2s ease-in-out infinite;
  }
  
  @keyframes scrollDown {
    0%, 100% { opacity: 1; transform: translateX(-50%) translateY(0); }
    50% { opacity: 0.3; transform: translateX(-50%) translateY(10px); }
  }
`;

const Hero = () => {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const scrollToContent = () => {
    const element = document.querySelector('#objectives');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeroWrapper id="home" ref={ref}>
      <ParallaxBackground 
        style={{ y }}
      />
      
      {/* Floating Icons */}
      <FloatingIcon 
        style={{ top: '15%', left: '10%' }}
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        📚
      </FloatingIcon>
      <FloatingIcon 
        style={{ top: '20%', right: '15%' }}
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -10, 10, 0]
        }}
        transition={{ duration: 7, repeat: Infinity }}
      >
        ⚖️
      </FloatingIcon>
      <FloatingIcon 
        style={{ bottom: '25%', left: '20%' }}
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 15, -15, 0]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        💰
      </FloatingIcon>
      <FloatingIcon 
        style={{ bottom: '30%', right: '10%' }}
        animate={{ 
          y: [0, 25, 0],
          rotate: [0, -15, 15, 0]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        🏭
      </FloatingIcon>

      <ContentWrapper>
        <SubTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Nội dung chinh
        </SubTitle>

        <MainTitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
         
          <span>Kinh tế chính trị Mác – Lênin</span>
        </MainTitle>

        <Description
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Khám phá những quy luật kinh tế cơ bản, từ sản xuất hàng hóa đến 
          kinh tế thị trường định hướng xã hội chủ nghĩa tại Việt Nam
        </Description>

        <ButtonGroup
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <PrimaryButton 
            href="#objectives"
            onClick={(e) => {
              e.preventDefault();
              scrollToContent();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Khám phá ngay →
          </PrimaryButton>
          <SecondaryButton 
            href="#quiz"
            onClick={(e) => {
              e.preventDefault();
              const element = document.querySelector('#quiz');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Xem Quiz
          </SecondaryButton>
        </ButtonGroup>
      </ContentWrapper>

      <ScrollIndicator 
        style={{ opacity }}
        onClick={scrollToContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span style={{ fontSize: '0.875rem', letterSpacing: '2px' }}>SCROLL</span>
        <MouseIcon />
      </ScrollIndicator>
    </HeroWrapper>
  );
};

export default Hero;
