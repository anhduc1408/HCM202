import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { image } from 'framer-motion/client';

// --- STYLED COMPONENTS FOR CONTAINERS & HEADERS ---
const SectionWrapper = styled.section`
  padding: ${({ theme }) => theme.spacing['4xl']} 0;
  background: ${({ $bg, theme }) =>
    $bg === 'dark' ? theme.colors.bgPrimary :
      $bg === 'secondary' ? theme.colors.bgSecondary :
        theme.colors.bgPrimary};
  overflow-x: hidden;
  border-bottom: 1px solid rgba(0,0,0,0.05);
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
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primaryLight}15;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-weight: 700;
  letter-spacing: 1px;
`;

const SectionTitle = styled(motion.h2)`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-weight: 800;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
  }
`;

const SectionDescription = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.8;
`;

// --- SHARED TEXT/LIST STYLES ---
const List = styled.ul`
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const ListItem = styled.li`
  position: relative;
  padding-left: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
  font-size: ${({ theme }) => theme.fontSizes.base};
  
  &::before {
    content: '';
    position: absolute;
    left: 4px;
    top: 10px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
  }
`;

// --- TABS LAYOUT (INTERACTIVE SPLIT) ---
const TabsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing['2xl']};
  min-height: 500px;
  background: #ffffff;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: 0 20px 40px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.05);
  border: 1px solid rgba(0,0,0,0.04);
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: column;
    min-height: auto;
  }
`;

const TabsSidebar = styled.div`
  flex: 0 0 320px;
  background: ${({ theme }) => theme.colors.bgSecondary};
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex: none;
    flex-direction: row;
    overflow-x: auto;
    padding: ${({ theme }) => theme.spacing.md};
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const TabButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  text-align: left;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ $active }) => ($active ? '#ffffff' : 'transparent')};
  box-shadow: ${({ $active }) => ($active ? '0 4px 12px rgba(0,0,0,0.05)' : 'none')};
  border: 1px solid ${({ $active }) => ($active ? 'rgba(0,0,0,0.05)' : 'transparent')};
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.textSecondary)};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background: ${({ $active, theme }) => ($active ? '#ffffff' : 'rgba(255,255,255,0.5)')};
  }

  .number {
    font-family: ${({ theme }) => theme.fonts.accent};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: 700;
    color: ${({ $active, theme }) => ($active ? theme.colors.secondary : theme.colors.textLight)};
    min-width: 24px;
  }
  .title {
    font-weight: ${({ $active }) => ($active ? 600 : 500)};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    white-space: normal;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    min-width: 200px;
    flex-shrink: 0;
  }
`;

const TabsContent = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing['2xl']};
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl};
  }
`;

const TabContentPane = styled(motion.div)`
  width: 100%;
`;

const ContentHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  h3 {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
    font-family: ${({ theme }) => theme.fonts.heading};
    color: ${({ theme }) => theme.colors.primaryDark};
    line-height: 1.3;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    h3 { font-size: ${({ theme }) => theme.fontSizes['2xl']}; }
  }
`;

const ContentBody = styled.div`
  p {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    line-height: 1.8;
    color: ${({ theme }) => theme.colors.textPrimary};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

// --- MODERN LEFT-ALIGNED TIMELINE ---
const LeftTimelineContainer = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} 0;

  &::before {
    content: '';
    position: absolute;
    width: 2px;
    background: ${({ theme }) => theme.colors.border};
    top: 20px;
    bottom: 20px;
    left: 170px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    &::before {
      left: 20px;
    }
  }
`;

const TimelineRow = styled(motion.div)`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  position: relative;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    padding-left: 50px;
  }
`;

const TimelineDate = styled.div`
  flex: 0 0 140px;
  text-align: right;
  padding-right: 40px;
  padding-top: 5px;
  
  h4 {
    color: ${({ theme }) => theme.colors.primary};
    font-family: ${({ theme }) => theme.fonts.accent};
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: 700;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    text-align: left;
    padding-right: 0;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    flex: none;
    
    h4 {
      font-size: ${({ theme }) => theme.fontSizes.md};
      color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

const TimelineDotIndicator = styled.div`
  position: absolute;
  left: 164px;
  top: 8px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: white;
  border: 3px solid ${({ theme }) => theme.colors.primary};
  box-shadow: 0 0 0 4px rgba(255,255,255,1), 0 2px 8px rgba(0,0,0,0.1);
  z-index: 2;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    left: 14px;
    top: 4px;
  }
`;

const TimelineContentCard = styled.div`
  flex: 1;
  background: #ffffff;
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: 0 10px 30px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.05);
  border: 1px solid rgba(0,0,0,0.04);
  margin-left: 40px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.06);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-left: 0;
  }
`;

const TimelineCardText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 1.8;
  font-weight: 500;
`;

const TimeLineCardImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};
  display: block;
`;

// --- ANIMATION VARIANTS ---
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const rowVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};


// --- DATA ---
const sectionsData = [
  {
    id: 'chapter1',
    number: 'CHỦ ĐỀ 1',
    layout: 'timeline',
    title: 'CƠ SỞ VÀ QUÁ TRÌNH HÌNH THÀNH, PHÁT TRIỂN TƯ TƯỞNG HỒ CHÍ MINH',
    description: 'Khảo sát cơ sở thực tiễn, lý luận, nhân tố chủ quan và quá trình hình thành - phát triển tư tưởng Hồ Chí Minh.',
    bg: 'secondary',
    cards: [
      {
        title: 'Cơ sở thực tiễn',
        text: 'Trong nước: Cuối thế kỷ XIX - đầu thế kỷ XX, thực dân Pháp xâm lược khiến xã hội biến đổi. Thế giới: Chủ nghĩa đế quốc và Cách mạng Tháng Mười Nga (1917) mở ra con đường giải phóng mới.',
        image: require('../images/thời kì thực dận Pháp.png'),
        list: [
          'Trong nước: Các phong trào yêu nước (Cần Vương, Đông Du...) lần lượt thất bại.',
          'Yêu cầu cấp bách: tìm con đường cứu nước mới phù hợp với thực tiễn dân tộc.',
          'Thế giới: chủ nghĩa đế quốc hình thành và bóc lột thuộc địa; Cách mạng Tháng Tám Nga (1917) thành công.',
          '=> Giải quyết sự khủng hoảng về đường lối cứu nước.'
        ]
      },
      {
        title: 'Cơ sở lý luận',
        text: 'Sự kết hợp giữa truyền thống dân tộc, tinh hoa văn hóa nhân loại và Chủ nghĩa Mác–Lênin làm nền tảng lý luận cho tư tưởng Hồ Chí Minh.',
        image: require('../images/Nguyễn Ái Quốc tại Paris (1919-1920).jpg'),
        list: [
          'Truyền thống dân tộc: yêu nước, đoàn kết, nhân nghĩa.',
          'Tinh hoa phương Đông: Nho giáo (đạo đức, trọng hiền tài), Phật giáo (từ bi, bình đẳng), Lão giáo (hòa hợp với tự nhiên).',
          'Tinh hoa phương Tây: tư tưởng dân chủ, nhân quyền (Tuyên ngôn Độc lập Mỹ 1776; Tuyên ngôn Nhân quyền Pháp 1789).',
          'Chủ nghĩa Mác–Lênin: giữ vai trò quyết định; Hồ Chí Minh đặc biệt tiếp thu Luận cương của Lênin (1920).',
          '=> Chủ nghĩa Mác–Lênin là bước phát triển về chất trong tư tưởng của Người.'
        ]
      },
      {
        title: 'Nhân tố chủ quan Hồ Chí Minh',
        text: 'Những phẩm chất cá nhân và năng lực tư tưởng của Hồ Chí Minh là nhân tố quyết định trong quá trình vận dụng lý luận vào thực tiễn.',
        image: require('../images/Trang báo Người cùng khổ.jpg'),
        list: [
          'Tư duy độc lập, sáng tạo, có tầm nhìn quốc tế.',
          'Lòng yêu nước sâu sắc và ý chí giải phóng dân tộc mãnh liệt.',
          'Khả năng tổng kết thực tiễn, phát triển lý luận và tổ chức cách mạng.'
        ]
      },
      {
        title: 'Quá trình hình thành và phát triển',
        text: 'Những mốc lịch sử chính đánh dấu quá trình chuyển biến từ yêu nước truyền thống sang đường lối cách mạng vô sản.',
        image: require('../images/bản đồ hành trình 30 năm cứu nước của Bác.webp'),
        list: [
          '1890–1911: Hình thành lòng yêu nước và chí hướng cứu nước mới.',
          '1911–1920: Ra đi tìm đường cứu nước, khảo sát thực tế thế giới; mốc 7/1920 đọc Luận cương của Lênin — "Hạnh phúc là đây, cơm áo là đây!".',
          '1920–1930: Chuẩn bị chính trị, tư tưởng và tổ chức; hướng tới thành lập Đảng Cộng sản Việt Nam (1930).',
          '1930–1945: Vượt qua thử thách, giữ vững đường lối giải phóng dân tộc; Tổng khởi nghĩa Tháng Tám (1945).',
          '1945–1969: Hoàn thiện tư tưởng về xây dựng Nhà nước, kháng chiến chống Pháp — Mỹ và xây dựng CNXH.'
        ]
      },
      {
        title: 'Giá trị tư tưởng Hồ Chí Minh',
        text: 'Tư tưởng Hồ Chí Minh có giá trị lý luận và thực tiễn sâu sắc đối với Việt Nam và phong trào giải phóng dân tộc toàn cầu.',
        image: require('../images/Yêu sách của nhân dân An Nam.webp'),
        list: [
          'Với Việt Nam: là nền tảng tư tưởng, kim chỉ nam cho hành động của Đảng và dân tộc.',
          'Với thế giới: mở ra con đường giải phóng cho các dân tộc bị áp bức và đóng góp vào tiến bộ xã hội toàn cầu.'
        ]
      }
    ]
  },
  {
    id: 'chapter2',
    number: 'CHỦ ĐỀ 2',
    layout: 'tabs',
    title: 'TƯ TƯỞNG HỒ CHÍ MINH VỀ ĐỘC LẬP DÂN TỘC VÀ CHỦ NGHĨA XÃ HỘI',
    description: 'Phân tích mối quan hệ giữa độc lập dân tộc và con đường xây dựng chủ nghĩa xã hội theo tư tưởng Hồ Chí Minh.',
    bg: 'primary',
    cards: [
      {
        title: 'Độc lập dân tộc',
        text: 'Độc lập là quyền thiêng liêng, gắn liền với hạnh phúc của nhân dân và quyền tự quyết quốc gia.',
        image: require('../images/Bác Hồ tại Quảng trường Ba Đình 2.9.1945.jpg'),
        list: [
          '"Không có gì quý hơn độc lập, tự do" — quan điểm cốt lõi.',
          'Độc lập phải gắn với hạnh phúc: dân có cơm ăn, áo mặc, được học hành.',
          'Độc lập thật sự: quyền tự quyết về ngoại giao, quân đội, nghị viện và nền tài chính riêng.',
          'Thống nhất lãnh thổ: khẳng định chủ quyền không thể chia cắt.'
        ]
      },
      {
        title: 'Cách mạng giải phóng dân tộc',
        text: 'Giải phóng dân tộc phải là cách mạng do Đảng Cộng sản lãnh đạo, dựa trên liên minh toàn dân và phương pháp chiến lược sáng tạo.',
        image: require('../images/Lời kêu gọi toàn quốc kháng chiến 1946.jpg'),
        list: [
          'Muốn cứu nước không có con đường nào khác ngoài cách mạng vô sản.',
          'Đảng Cộng sản lãnh đạo: Đảng vững cách mệnh mới thành công.',
          'Lực lượng là toàn dân; nền tảng là liên minh công — nông — trí.',
          'Kết hợp đấu tranh chính trị và đấu tranh vũ trang.'
        ]
      },
      {
        title: 'Chủ nghĩa xã hội',
        text: 'CNXH là xã hội do nhân dân làm chủ, vì con người, thực hiện công bằng và văn minh.',
        image: require('../images/Lực lượng là toàn dân.webp'),
        list: [
          'Mục tiêu: dân giàu, nước mạnh, dân chủ, công bằng, văn minh.',
          'Bản chất: nhân dân làm chủ; xã hội vì con người.',
          'Kinh tế phát triển và đời sống nhân dân ngày càng được nâng cao.'
        ]
      },
      {
        title: 'Mục tiêu và động lực xây dựng CNXH',
        text: 'Xác định mục tiêu quốc gia và những động lực then chốt để tiến lên CNXH.',
        image: require('../images/Ảnh Bác Hồ thăm xưởng máy - liên minh Công - Nông - Trí.jpg'),
        list: [
          'Mục tiêu: xây dựng Việt Nam hòa bình, độc lập, thống nhất, giàu mạnh.',
          'Động lực: con người là trung tâm; đại đoàn kết toàn dân; khoa học — công nghệ; vai trò cán bộ, đảng viên.'
        ]
      },
      {
        title: 'Thời kỳ quá độ lên CNXH',
        text: 'Đặc điểm, nhiệm vụ và nguyên tắc trong thời kỳ quá độ lên CNXH ở Việt Nam.',
        image: require('../images/Bác bắt tay kêu gọi đoàn kết dân tộc.gif'),
        list: [
          'Việt Nam tiến lên CNXH từ một nước nông nghiệp lạc hậu, có lộ trình đặc thù.',
          'Nhiệm vụ: xây dựng xã hội mới trên mọi lĩnh vực; cải tạo tàn dư của xã cũ.',
          'Nguyên tắc: giữ vững độc lập dân tộc; kết hợp xây và chống; gắn kết với đoàn kết quốc tế.'
        ]
      },
      {
        title: 'Quan hệ giữa độc lập dân tộc và CNXH',
        text: 'Độc lập dân tộc và CNXH là hai mục tiêu gắn bó chặt chẽ trong tư tưởng Hồ Chí Minh.',
        image: require('../images/514364006_762151413043928_7403237664878971768_n.jpg'),
        list: [
          'Độc lập dân tộc là tiền đề để tiến lên CNXH.',
          'CNXH là bảo đảm vững chắc nhất cho độc lập dân tộc.',
          'Hai mục tiêu gắn bó hữu cơ, không tách rời.'
        ]
      }
    ]
  },
  {
    id: 'chapter3',
    number: 'CHỦ ĐỀ 3',
    layout: 'tabs',
    title: 'TƯ TƯỞNG HỒ CHÍ MINH VỀ ĐẢNG CỘNG SẢN VIỆT NAM VÀ NHÀ NƯỚC CỦA NHÂN DÂN, DO NHÂN DÂN, VÌ NHÂN DÂN',
    description: 'Tư tưởng Hồ Chí Minh về vai trò lãnh đạo của Đảng và xây dựng Nhà nước phục vụ nhân dân.',
    bg: 'primary',
    cards: [
      {
        title: 'Tính tất yếu và vai trò lãnh đạo của Đảng',
        text: 'Đảng là nhân tố quyết định mọi thắng lợi của cách mạng Việt Nam.',
        image: require('../images/1-20853918345807912188040.webp'),
        list: [
          'Tính tất yếu: Đảng cách mạng là điều kiện tiên quyết cho cách mạng.',
          'Sự ra đời của Đảng: kết hợp Chủ nghĩa Mác-Lênin, phong trào công nhân và phong trào yêu nước.'
        ]
      },
      {
        title: 'Bản chất và quy luật tồn tại của Đảng',
        text: 'Đảng là đội tiên phong của giai cấp công nhân và đại diện lợi ích của nhân dân lao động.',
        image: require('../images/3-19267732127665856943248-17819334398295738022226.webp'),
        list: [
          'Đảng đại diện cho lợi ích của toàn dân tộc.',
          'Đảng lãnh đạo Nhà nước và xã hội nhưng phải là "đầy tớ trung thành" của nhân dân.'
        ]
      },
      {
        title: 'Các nguyên tắc xây dựng Đảng kiểu mới',
        text: 'Nguyên tắc tổ chức và tự chỉnh đốn trong Đảng nhằm giữ vững tính chiến đấu và sức lãnh đạo.',
        image: require('../images/Were.jpg'),
        list: [
          'Tập trung dân chủ là nguyên tắc tổ chức cơ bản.',
          'Tự phê bình và phê bình: vũ khí rèn luyện Đảng; phải thực hiện thường xuyên.',
          'Kỷ luật nghiêm minh, tự giác và đoàn kết thống nhất trong Đảng.',
          'Mật thiết liên hệ với nhân dân; Đảng xa dân là tự sát.'
        ]
      },
      {
        title: 'Nhà nước của nhân dân',
        text: 'Mọi quyền lực trong nước đều là của nhân dân; luật pháp bảo vệ quyền lợi nhân dân.',
        image: require('../images/641298076_1490170922833467_7138226645180462407_n.jpg'),
        list: [
          'Nhân dân có quyền bầu và bãi nhiệm đại biểu không xứng đáng.',
          'Luật pháp là công cụ để bảo vệ quyền lợi của nhân dân.'
        ]
      },
      {
        title: 'Nhà nước do nhân dân',
        text: 'Nhà nước phải tạo điều kiện để nhân dân trực tiếp hoặc gián tiếp tham gia quản lý nhà nước.',
        image: require('../images/bau-o-hn.jpg'),
        list: [
          'Nhân dân tham gia quản lý; việc gì có lợi cho dân, phải hết sức làm.',
          'Nhà nước phải tạo điều kiện để dân thực hiện quyền làm chủ của mình.'
        ]
      },
      {
        title: 'Nhà nước vì nhân dân',
        text: 'Nhà nước không có đặc quyền; cán bộ là công bộc phục vụ dân.',
        image: require('../images/bao-quoc-hoi.jpg'),
        list: [
          'Cán bộ phải là công bộc; không có đặc quyền đặc lợi.',
          'Phải chăm lo đời sống vật chất và tinh thần cho nhân dân.'
        ]
      },
      {
        title: 'Xây dựng Nhà nước có hiệu lực pháp lý mạnh mẽ',
        text: 'Quản lý bằng pháp luật và kết hợp pháp trị với đức trị; coi trọng Hiến pháp và hệ thống pháp luật.',
        image: require('../images/tc6b0-tc6b0e1bb9fng-he1bb93-chc3ad-minh.png'),
        list: [
          'Quản lý bằng pháp luật: xây dựng Hiến pháp và hệ thống pháp luật (Hiến pháp 1946 là nền tảng).',
          'Kết hợp pháp luật và đạo đức trong quản lý xã hội.'
        ]
      },
      {
        title: 'Xây dựng Nhà nước trong sạch, vững mạnh',
        text: 'Chống tham nhũng, lãng phí và bệnh quan liêu; xây dựng đội ngũ cán bộ vừa có Đức vừa có Tài.',
        image: require('../images/tuyen-the.jpg'),
        list: [
          'Đấu tranh chống "giặc nội xâm": tham nhũng, lãng phí, quan liêu.',
          'Đội ngũ cán bộ: cần có "Cần, Kiệm, Liêm, Chính, Chí công vô tư".'
        ]
      },
      {
        title: 'Vận dụng trong giai đoạn hiện nay',
        text: 'Áp dụng tư tưởng Hồ Chí Minh để chỉnh đốn Đảng và xây dựng Nhà nước phục vụ nhân dân.',
        image: require('../images/Sơ đồ tư duy.jpg'),
        list: [
          'Tiếp tục chỉnh đốn Đảng, nâng cao năng lực lãnh đạo và sức chiến đấu của Đảng.',
          'Xây dựng Nhà nước pháp quyền xã hội chủ nghĩa của nhân dân, do nhân dân, vì nhân dân.',
          'Đẩy mạnh cải cách hành chính và phòng chống tham nhũng theo tấm gương Bác.'
        ]
      }
    ]
  }
];


// --- RENDER COMPONENTS ---
const RenderTabsLayout = ({ section }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <TabsContainer>
      <TabsSidebar>
        {section.cards.map((card, index) => (
          <TabButton
            key={index}
            $active={activeTab === index}
            onClick={() => setActiveTab(index)}
          >
            <span className="number">0{index + 1}</span>
            <span className="title">{card.title}</span>
          </TabButton>
        ))}
      </TabsSidebar>

      <TabsContent>
        <AnimatePresence mode="wait">
          <TabContentPane
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <ContentHeader>
              <h3>{section.cards[activeTab].title}</h3>
            </ContentHeader>
            <ContentBody>
              <p>{section.cards[activeTab].text}</p>
              {section.cards[activeTab].image && (
                <TimeLineCardImage src={section.cards[activeTab].image} alt={section.cards[activeTab].title} />
              )}
              {section.cards[activeTab].list && (
                <List>
                  {section.cards[activeTab].list.map((item, i) => (
                    <ListItem key={i}>{item}</ListItem>
                  ))}
                </List>
              )}
            </ContentBody>
          </TabContentPane>
        </AnimatePresence>
      </TabsContent>
    </TabsContainer>
  );
};

const RenderLeftTimeline = ({ section }) => (
  <LeftTimelineContainer>
    {section.cards.map((card, index) => (
      <TimelineRow
        key={index}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={rowVariants}
      >
        <TimelineDate>
          <h4>{card.title.split('(')[0].replace(/1\.|2\.|3\.|4\.|5\.|6\./, '').trim()}</h4>
        </TimelineDate>
        <TimelineDotIndicator />
        <TimelineContentCard>
          <TimelineCardText>{card.text}</TimelineCardText>
          {card.image && (
            <TimeLineCardImage src={card.image} alt={card.title} />
          )}

          {card.list && (
            <List>
              {card.list.map((item, i) => (
                <ListItem key={i}>{item}</ListItem>
              ))}
            </List>
          )}
        </TimelineContentCard>
      </TimelineRow>
    ))}
  </LeftTimelineContainer>
);

const ContentSections = () => {
  return (
    <>
      {sectionsData.map((section) => (
        <SectionWrapper
          key={section.id}
          id={section.id}
          $bg={section.bg}
        >
          <Container>
            <SectionHeader
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={sectionVariants}
            >
              <SectionNumber>{section.number}</SectionNumber>
              <SectionTitle
                $dark={section.dark}
                $black={section.black}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {section.title}
              </SectionTitle>
              <SectionDescription
                $dark={section.dark}
                $black={section.black}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {section.description}
              </SectionDescription>
            </SectionHeader>

            {section.layout === 'timeline' ? (
              <RenderLeftTimeline section={section} />
            ) : (
              <RenderTabsLayout section={section} />
            )}

          </Container>
        </SectionWrapper>
      ))}
    </>
  );
};

export default ContentSections;
