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
  { icon: '📚', label: 'Giáo trình', color: 'linear-gradient(135deg, #1a365d, #2c5282)', image: 'https://www.nxbctqg.org.vn/img_data/images/238626889476_ttkc.jpg' },
  { icon: '⚖️', label: 'Tư tưởng Hồ Chí Minh', color: 'linear-gradient(135deg, #c53030, #e53e3e)', image: 'https://nhandan.1cdn.vn/2025/08/19/cover-tu-tuong.png' },
  { icon: '💰', label: 'Độc lập dân tộc gắn liền với chủ nghĩa xã hội', color: 'linear-gradient(135deg, #d69e2e, #ecc94b)', image: 'https://bthcm.hue.gov.vn/Portals/0/Medias/Nam2022/T11/14_17_11_2022_18_23_13_440_CH.jpg' },
  { icon: '🏭', label: 'Nhà nước của dân, do dân, vì dân', color: 'linear-gradient(135deg, #38a169, #48bb78)', image: 'https://cdncongthuong.quangtrung.vn/static_files/thutra/images/2025/11/07/tt-hcm-ve-nn-cd56.jpg' },
  { icon: '📊', label: 'Quá trình hình thành tư tưởng Hồ Chí Minh', color: 'linear-gradient(135deg, #3182ce, #4299e1)', image: 'https://i.pinimg.com/originals/8a/41/66/8a4166421470b49f7df48c955bbb13af.png' },
  { icon: '🏦', label: 'Nhà nước xã hội chủ nghĩa', color: 'linear-gradient(135deg, #553c9a, #6b46c1)', image: 'https://btgdv.cantho.gov.vn/uploads/news/2022_09/30-9-bac.jpeg' },
  { icon: '🌐', label: 'Hồ Chí Minh', color: 'linear-gradient(135deg, #dd6b20, #ed8936)', image: 'https://congdoangdvn.org.vn/Uploaded/images/Ho%20Chi%20Minh_19-5.jpg' },
  { icon: '🇻🇳', label: 'Việt Nam', color: 'linear-gradient(135deg, #c53030, #d63e3e)', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/3840px-Flag_of_Vietnam.svg.png' },
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
            Các hình ảnh và sơ đồ minh họa cho chủ đề 1, 2, 3 của môn HCM202 – Tư tưởng Hồ Chí Minh.
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
