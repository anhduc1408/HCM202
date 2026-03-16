import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const GalleryWrapper = styled.section`
  padding: ${({ theme }) => theme.spacing['3xl']} 0;
  background: ${({ theme }) => theme.colors.bgDark};
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const SectionNumber = styled.span`
  display: inline-block;
  font-family: ${({ theme }) => theme.fonts.accent};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.accentLight};
  background: ${({ theme }) => theme.colors.accent}20;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-weight: 600;
`;

const SectionTitle = styled(motion.h2)`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  color: ${({ theme }) => theme.colors.textWhite};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  }
`;

const SectionDescription = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: rgba(255, 255, 255, 0.7);
  max-width: 700px;
  margin: 0 auto;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const GalleryItem = styled(motion.div)`
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.primary}90,
      ${({ theme }) => theme.colors.secondary}90
    );
    opacity: 0;
    transition: opacity ${({ theme }) => theme.transitions.normal};
    z-index: 1;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const GalleryImage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  background: ${({ $color }) => $color || 'linear-gradient(135deg, #1a365d, #2c5282)'};
  background-image: ${({ $image }) => $image ? `url(${$image})` : 'none'};
  background-size: cover;
  background-position: center;
  transition: transform ${({ theme }) => theme.transitions.slow};
  
  ${GalleryItem}:hover & {
    transform: scale(1.1);
  }
`;

const GalleryOverlay = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${({ theme }) => theme.spacing.lg};
  z-index: 2;
  transform: translateY(100%);
  transition: transform ${({ theme }) => theme.transitions.normal};
  
  ${GalleryItem}:hover & {
    transform: translateY(0);
  }
`;

const GalleryLabel = styled.span`
  color: ${({ theme }) => theme.colors.textWhite};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

// Gallery items data
const galleryItems = [
  { icon: '📚', label: 'Giáo trình', color: 'linear-gradient(135deg, #1a365d, #2c5282)', image: 'https://down-vn.img.susercontent.com/file/sg-11134201-824iy-me19rlxvd2bnb0.webp' },
  { icon: '⚖️', label: 'Quy luật kinh tế', color: 'linear-gradient(135deg, #c53030, #e53e3e)', image: 'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2024/09/quy-luat-kinh-te-la-gi-3-650x478.jpg' },
  { icon: '💰', label: 'Hàng hóa & Tiền tệ', color: 'linear-gradient(135deg, #d69e2e, #ecc94b)', image: 'https://cdn.luatvietnam.vn/uploaded/Images/Original/2023/03/13/tien-te-la-phuong-tien-de-do-luong-gia-tri-hang-hoa_1303111742.png' },
  { icon: '🏭', label: 'Sản xuất', color: 'linear-gradient(135deg, #38a169, #48bb78)', image: 'https://pms.edu.vn/wp-content/uploads/2023/11/ket-cau-cua-phuong-thuc-san-xuat.jpg' },
  { icon: '📊', label: 'Thị trường', color: 'linear-gradient(135deg, #3182ce, #4299e1)', image: 'https://thinkdigital.com.vn/wp-content/uploads/2025/02/thi-truong-la-gi-3.jpg' },
  { icon: '🏦', label: 'Tư bản', color: 'linear-gradient(135deg, #553c9a, #6b46c1)', image: 'https://file.qdnd.vn/data/images/14/2021/06/10/kienthai/tuban%20luan%20bang%20tranh.jpg?dpi=150&quality=100&w=575' },
  { icon: '🌐', label: 'Hội nhập', color: 'linear-gradient(135deg, #dd6b20, #ed8936)', image: 'https://bcp.cdnchinhphu.vn/334894974524682240/2025/4/11/hoi-nhap-quoc-te-1744336238273384856591.jpg' },
  { icon: '🇻🇳', label: 'Việt Nam', color: 'linear-gradient(135deg, #c53030, #d63e3e)', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png' },
];



const Gallery = () => {
  return (
    <GalleryWrapper id="gallery">
      <Container>
        <SectionHeader
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionNumber>THƯ VIỆN</SectionNumber>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Hình ảnh & Minh họa
          </SectionTitle>
          <SectionDescription
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Các khái niệm và sơ đồ minh họa cho chương V: Kinh tế thị trường định hướng xã hội chủ nghĩa và các quan hệ lợi ích kinh tế ở Việt Nam
          </SectionDescription>
        </SectionHeader>

        <GalleryGrid>
          {galleryItems.map((item, index) => (
            <GalleryItem
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <GalleryImage $color={item.color} $image={item.image}>
                {!item.image && item.icon}
              </GalleryImage>
              <GalleryOverlay>
                <GalleryLabel>{item.label}</GalleryLabel>
              </GalleryOverlay>
            </GalleryItem>
          ))}
        </GalleryGrid>
      </Container>
    </GalleryWrapper>
  );
};

export default Gallery;
