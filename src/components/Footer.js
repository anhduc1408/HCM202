import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FooterWrapper = styled.footer`
  background: ${({ theme }) => theme.colors.bgDark};
  padding: ${({ theme }) => theme.spacing['3xl']} 0 ${({ theme }) => theme.spacing.lg};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, 
      ${({ theme }) => theme.colors.primary}, 
      ${({ theme }) => theme.colors.secondary}, 
      ${({ theme }) => theme.colors.accent}
    );
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: ${({ theme }) => theme.spacing['2xl']};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterBrand = styled.div``;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textWhite};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  span {
    color: ${({ theme }) => theme.colors.secondary};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    justify-content: center;
  }
`;

// eslint-disable-next-line no-unused-vars
const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.primary}, 
    ${({ theme }) => theme.colors.secondary}
  );
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const BrandDescription = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.7;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

// eslint-disable-next-line no-unused-vars
const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    justify-content: center;
  }
`;

// eslint-disable-next-line no-unused-vars
const SocialLink = styled(motion.a)`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.textWhite};
  transition: all ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-3px);
  }
`;

const FooterColumn = styled.div``;

const ColumnTitle = styled.h4`
  color: ${({ theme }) => theme.colors.textWhite};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 30px;
    height: 2px;
    background: ${({ theme }) => theme.colors.secondary};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    &::after {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const FooterLinks = styled.ul``;

const FooterLink = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  
  a {
    color: rgba(255, 255, 255, 0.6);
    font-size: ${({ theme }) => theme.fontSizes.sm};
    transition: all ${({ theme }) => theme.transitions.normal};
    
    &:hover {
      color: ${({ theme }) => theme.colors.accentLight};
      padding-left: 5px;
    }
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: rgba(255, 255, 255, 0.6);
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  span {
    font-size: 1.25rem;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    justify-content: center;
  }
`;

const FooterBottom = styled.div`
  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: rgba(255, 255, 255, 0.4);
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin: 0;
`;

const FooterBottomLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  
  a {
    color: rgba(255, 255, 255, 0.4);
    font-size: ${({ theme }) => theme.fontSizes.sm};
    
    &:hover {
      color: ${({ theme }) => theme.colors.textWhite};
    }
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterWrapper>
      <Container>
        <FooterContent>
          <FooterBrand>
            <Logo>
             
            </Logo>
            <BrandDescription>
              Website trình bày nội dung môn HCM202 – Tư tưởng Hồ Chí Minh.
              
            </BrandDescription>
            
             
          </FooterBrand>

          <FooterColumn>
            <ColumnTitle>Nội dung</ColumnTitle>
            <FooterLinks>
              <FooterLink><a href="#chapter1">Khái niệm & Đối tượng</a></FooterLink>
              <FooterLink><a href="#chapter2">Quá trình hình thành</a></FooterLink>
              <FooterLink><a href="#chapter3">Độc lập dân tộc & CNXH</a></FooterLink>
            </FooterLinks>
          </FooterColumn>

          <FooterColumn>
            <ColumnTitle>Tính năng</ColumnTitle>
            <FooterLinks>
              <FooterLink><a href="#quiz">Bài tập trắc nghiệm</a></FooterLink>
            </FooterLinks>
          </FooterColumn>

          <FooterColumn>
           
          
            
            <ContactItem>
              <span>📍</span>
              FPT University, Hà Nội
            </ContactItem>
            <ContactItem>
              <span>🌐</span>
              www.fpt.edu.vn
            </ContactItem>
          </FooterColumn>
        </FooterContent>

        <FooterBottom>
          <Copyright>
            © {currentYear} HCM202 - Tư tưởng Hồ Chí Minh. All rights reserved.
          </Copyright>
          <FooterBottomLinks>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/cookies">Cookie Policy</a>
          </FooterBottomLinks>
        </FooterBottom>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
