import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SectionWrapper = styled.section`
  padding: ${({ theme }) => theme.spacing['3xl']} 0;
  background: ${({ $bg, theme }) => 
    $bg === 'dark' ? theme.colors.bgDark : 
    $bg === 'secondary' ? theme.colors.bgSecondary : 
    theme.colors.bgPrimary};
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
  color: ${({ theme }) => theme.colors.secondary};
  background: ${({ theme }) => theme.colors.secondary}15;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-weight: 600;
`;

const SectionTitle = styled(motion.h2)`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  color: ${({ $dark, $black, theme }) => 
    $black ? '#000000' : 
    $dark ? theme.colors.textWhite : theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  }
`;

const SectionDescription = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ $dark, $black, theme }) => 
    $black ? '#000000' : 
    $dark ? 'rgba(255,255,255,0.7)' : theme.colors.textSecondary};
  max-width: 700px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ $cols }) => $cols || 2}, 1fr);
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: all ${({ theme }) => theme.transitions.normal};
  border: 1px solid ${({ theme }) => theme.colors.border};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`;

// eslint-disable-next-line no-unused-vars
const CardIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.primary}, 
    ${({ theme }) => theme.colors.primaryLight}
  );
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CardText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
`;

const List = styled.ul`
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const ListItem = styled.li`
  position: relative;
  padding-left: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  
  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.success};
    font-weight: bold;
  }
`;

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { 
      delay: i * 0.1,
      duration: 0.5 
    }
  })
};

// Content data
const sectionsData = [
  {
    id: 'objectives',
    number: '01',
    title: 'Đối tượng và Phương pháp Nghiên cứu',
    description: 'Tìm hiểu về đối tượng, nhiệm vụ và các phương pháp nghiên cứu của kinh tế chính trị Mác – Lênin.',
    
    
    cards: [
      {
        title: 'Đối tượng nghiên cứu',
        text: 'Kinh tế chính trị Mác – Lênin nghiên cứu các quy luật kinh tế khách quan chi phối sản xuất, trao đổi, phân phối và tiêu dùng trong các hình thái kinh tế - xã hội khác nhau.',
        list: [
          'Quy luật chung của sản xuất và tái sản xuất',
          'Quan hệ giữa lực lượng sản xuất và quan hệ sản xuất',
          'Cơ chế vận hành của các phương thức sản xuất',
        ]
      },
      {
        title: 'Phương pháp nghiên cứu',
        text: 'Sử dụng phương pháp duy vật biện chứng và duy vật lịch sử để phân tích các hiện tượng kinh tế.',
        list: [
          'Phương pháp logic và lịch sử',
          'Phương pháp trừu tượng hóa',
          'Phương pháp phân tích và tổng hợp',
          'Phương pháp thống kê và so sánh',
        ]
      }
    ]
  },
  {
    id: 'production',
    number: '02',
    title: 'Sản xuất Hàng hóa',
    description: 'Điều kiện ra đời, đặc trưng và ưu thế của sản xuất hàng hóa trong nền kinh tế.',
    bg: 'primary',
    dark: false,
    icon: '📦',
    cards: [
      {
        title: 'Điều kiện ra đời',
        text: 'Sản xuất hàng hóa ra đời khi có sự phân công lao động xã hội và sự tách biệt giữa các bộ phận sản xuất độc lập với nhau.',
        list: [
          'Phân công lao động xã hội',
          'Sự tách biệt về kinh tế giữa các đơn vị sản xuất',
          'Quyền sở hữu tư nhân về tư liệu sản xuất',
        ]
      },
      {
        title: 'Đặc trưng của sản xuất hàng hóa',
        text: 'Sản xuất hàng hóa có những đặc điểm riêng biệt phân biệt với tự cung tự cấp.',
        list: [
          'Sản xuất vì mục đích trao đổi',
          'Hoạt động sản xuất mang tính xã hội hóa cao',
          'Có sự cạnh tranh giữa các nhà sản xuất',
        ]
      },
      {
        title: 'Ưu thế của sản xuất hàng hóa',
        text: 'So với sản xuất tự cung tự cấp, sản xuất hàng hóa có nhiều ưu thế vượt trội.',
        list: [
          'Kích thích phát triển lực lượng sản xuất',
          'Khuyến khích cải tiến kỹ thuật',
          'Tăng năng suất lao động',
          'Mở rộng thị trường và hợp tác quốc tế',
        ]
      }
    ]
  },
  {
    id: 'commodity',
    number: '03',
    title: 'Hàng hóa và Tiền tệ',
    description: 'Thuộc tính của hàng hóa, nguồn gốc, bản chất và các chức năng của tiền tệ.',
    bg: 'primary',
    dark: false,
    icon: '💰',
    cards: [
      {
        title: 'Thuộc tính của hàng hóa',
        text: 'Hàng hóa có hai thuộc tính cơ bản: giá trị sử dụng và giá trị.',
        list: [
          'Giá trị sử dụng: khả năng thỏa mãn nhu cầu nào đó của con người',
          'Giá trị: hao phí lao động xã hội cần thiết để sản xuất ra hàng hóa',
          'Hai thuộc tính của hàng hóa thống nhất trong thực tế',
        ]
      },
      {
        title: 'Nguồn gốc và bản chất của tiền',
        text: 'Tiền tệ ra đời từ quá trình phát triển của sản xuất và trao đổi hàng hóa.',
        list: [
          'Quá trình phát triển: hàng đổi hàng → vật ngang giá chung → tiền tệ',
          'Tiền là vật ngang giá chung được xã hội thừa nhận',
          'Tiền là loại hàng hóa đặc biệt đóng vai trò vật ngang giá chung',
        ]
      },
      {
        title: 'Chức năng của tiền tệ',
        text: 'Tiền tệ thực hiện năm chức năng cơ bản trong nền kinh tế.',
        list: [
          'Thước đo giá trị',
          'Phương tiết lưu thông',
          'Phương tiện cất trữ',
          'Phương tiện thanh toán',
          'Tiền tệ thế giới',
        ]
      }
    ]
  },
  {
    id: 'law',
    number: '04',
    title: 'Quy luật Giá trị',
    description: 'Nội dung, tác động và vai trò của quy luật giá trị trong sản xuất và phân phối.',
    bg: 'secondary',
    dark: false,
    icon: '⚖️',
    cards: [
      {
        title: 'Nội dung quy luật giá trị',
        text: 'Quy luật giá trị yêu cầu việc sản xuất và trao đổi hàng hóa phải dựa trên hao phí lao động xã hội cần thiết.',
        list: [
          'Hao phí lao động cá nhân phải phù hợp với hao phí lao động xã hội',
          'Giá cả hàng hóa dao động xung quanh giá trị',
          'Thời gian lao động xã hội cần thiết là thước đo hao phí lao động',
        ]
      },
      {
        title: 'Tác động của quy luật giá trị',
        text: 'Quy luật giá trị có những tác động mạnh mẽ đến sản xuất và lưu thông.',
        list: [
          'Kích thích cải tiến kỹ thuật, nâng cao năng suất lao động',
          'Phân hóa giữa các nhà sản xuất',
          'Điều tiết sản xuất và lưu thông',
          'Thúc đẩy cạnh tranh lành mạnh',
        ]
      },
      {
        title: 'Vai trò trong kinh tế thị trường',
        text: 'Quy luật giá trị đóng vai trò quan trọng trong việc vận hành kinh tế thị trường.',
        list: [
          'Cơ sở cho việc định giá hàng hóa và dịch vụ',
          'Công cụ phân bổ nguồn lực',
          'Động lực thúc đẩy phát triển kinh tế',
          'Cơ chế tự điều chỉnh của thị trường',
        ]
      }
    ]
  },
  {
    id: 'capital',
    number: '05',
    title: 'Tư bản và Giá trị Thặng dư',
    description: 'Bản chất của tư bản, cơ chế tạo ra giá trị thặng dư và ý nghĩa lý luận.',
    bg: 'primary',
    dark: false,
    icon: '🏦',
    cards: [
      {
        title: 'Bản chất của tư bản',
        text: 'Tư bản là giá trị mang lại giá trị thặng dư thông qua bóc lột lao động.',
        list: [
          'Tư bản không phải là vật chất mà là quan hệ xã hội',
          'Tư bản được biểu hiện qua tiền, tư liệu sản xuất',
          'Điều kiện để tiền trở thành tư bản: có hàng hóa sức lao động',
        ]
      },
      {
        title: 'Giá trị thặng dư',
        text: 'Giá trị thặng dư là giá trị mới dôi ra ngoài giá trị sức lao động do lao động tạo ra.',
        list: [
          'Giá trị sức lao động < Giá trị mới do lao động tạo ra',
          'Hai phương pháp sản xuất giá trị thặng dư: tuyệt đối và tương đối',
          'Tỷ suất giá trị thặng dư: m\'/v',
        ]
      },
      {
        title: 'Ý nghĩa lý luận và thực tiễn',
        text: 'Lý thuyết giá trị thặng dư có ý nghĩa quan trọng trong việc phân tích chủ nghĩa tư bản.',
        list: [
          'Giải thích bản chất bóc lột trong chủ nghĩa tư bản',
          'Cơ sở phân tích các vấn đề kinh tế hiện đại',
          'Nền tảng cho việc nghiên cứu chính sách phân phối',
        ]
      }
    ]
  },
  {
    id: 'competition',
    number: '06',
    title: 'Cạnh tranh và Độc quyền',
    description: 'Cạnh tranh trong kinh tế thị trường và các hình thức độc quyền.',
    bg: 'secondary',
    dark: false,
    icon: '🏆',
    cards: [
      {
        title: 'Cạnh tranh trong kinh tế thị trường',
        text: 'Cạnh tranh là hiện tượng tất yếu trong kinh tế thị trường khi các chủ thể đua nhau giành lợi ích.',
        list: [
          'Cạnh tranh giữa các nhà sản xuất',
          'Cạnh tranh giữa các nhà bán lẻ',
          'Cạnh tranh giữa người mua và người bán',
          'Cạnh tranh với hàng nhập khẩu',
        ]
      },
      {
        title: 'Độc quyền và các hình thức',
        text: 'Độc quyền xuất hiện khi một hoặc một số ít doanh nghiệp kiểm soát thị trường.',
        list: [
          'Độc quyền nhà nước',
          'Độc quyền tư nhân',
          'Độc quyền tập đoàn',
          'Các hình thức liên kết: cartel, trust, conglomerate',
        ]
      },
      {
        title: 'Tác động của cạnh tranh và độc quyền',
        text: 'Cạnh tranh và độc quyền có những tác động khác nhau đến nền kinh tế.',
        list: [
          'Cạnh tranh: kích thích đổi mới, nâng cao chất lượng',
          'Độc quyền: có thể dẫn đến định giá cao, giảm đổi mới',
          'Vai trò của nhà nước trong điều tiết cạnh tranh',
        ]
      }
    ]
  },
  {
    id: 'market',
    number: '07',
    title: 'Kinh tế Thị trường định hướng XHCN ở Việt Nam',
    description: 'Đặc trưng, tính tất yếu và các chính sách kinh tế của Việt Nam.',
    bg: 'primary',
    dark: true,
    black: true,
    icon: '🇻🇳',
    cards: [
      {
        title: 'Đặc trưng của kinh tế thị trường định hướng XHCN',
        text: 'Kinh tế thị trường định hướng XHCN ở Việt Nam có những đặc điểm riêng biệt.',
        list: [
          'Nhiều hình thức sở hữu đa dạng: nhà nước, tập thể, tư nhân',
          'Nhiều thành phần kinh tế cùng phát triển',
          'Vai trò điều tiết của nhà nước',
          'Thị trường làm cơ sở phân bổ nguồn lực chính',
        ]
      },
      {
        title: 'Tính tất yếu của kinh tế thị trường',
        text: 'Việc chuyển đổi sang kinh tế thị trường là tất yếu khách quan.',
        list: [
          'Phù hợp với quy luật kinh tế khách quan',
          'Khai thác hiệu quả nguồn lực',
          'Hội nhập kinh tế quốc tế',
          'Giải phóng sức sản xuất',
        ]
      },
      {
        title: 'Các chính sách kinh tế chủ yếu',
        text: 'Nhà nước Việt Nam thực hiện các chính sách kinh tế để định hướng phát triển.',
        list: [
          'Chính sách tài khóa và tiền tệ',
          'Chính sách đầu tư và thương mại',
          'Chính sách phân phối và an sinh xã hội',
          'Chính sách bảo vệ môi trường',
        ]
      }
    ]
  },
  {
    id: 'industrialization',
    number: '08',
    title: 'Công nghiệp hóa, Hiện đại hóa, Hội nhập quốc tế',
    description: 'Chiến lược phát triển kinh tế và hội nhập kinh tế quốc tế của Việt Nam.',
    bg: 'secondary',
    dark: false,
    icon: '🌐',
    cards: [
      {
        title: 'Công nghiệp hóa, hiện đại hóa',
        text: 'CNH, HĐH là con đường phát triển kinh tế của Việt Nam trong giai đoạn mới.',
        list: [
          'Chuyển đổi cơ cấu kinh tế từ nông nghiệp sang công nghiệp',
          'Ứng dụng khoa học công nghệ hiện đại',
          'Phát triển nguồn nhân lực chất lượng cao',
          'Xây dựng cơ sở hạ tầng đồng bộ',
        ]
      },
      {
        title: 'Hội nhập kinh tế quốc tế',
        text: 'Việt Nam tích cực hội nhập vào nền kinh tế thế giới.',
        list: [
          'Tham gia các hiệp định thương mại tự do (FTA, EVFTA, CPTPP)',
          'Thu hút đầu tư nước ngoài (FDI)',
          'Xuất khẩu các sản phẩm có lợi thế so sánh',
          'Nâng cao năng lực cạnh tranh quốc gia',
        ]
      },
      {
        title: 'Thách thức và giải pháp',
        text: 'CNH, HĐH và hội nhập quốc tế đặt ra nhiều thách thức cần vượt qua.',
        list: [
          'Thách thức: cạnh tranh, chênh lệch phát triển, môi trường',
          'Giải pháp: đổi mới sáng tạo, phát triển bền vững',
          'Xây dựng nền kinh tế độc lập, tự chủ',
          'Kết hợp sức mạnh dân tộc với sức mạnh thời đại',
        ]
      }
    ]
  }
];

const ContentSections = () => {
  return (
    <>
      {sectionsData.map((section, sectionIndex) => (
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

            <Grid $cols={section.cards.length >= 3 ? 3 : section.cards.length}>
              {section.cards.map((card, cardIndex) => (
                <Card
                  key={cardIndex}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={cardIndex}
                  variants={cardVariants}
                  whileHover={{ scale: 1.03 }}
                >
                  {/* <CardIcon>{section.icon}</CardIcon> */}
                  <CardTitle>{card.title}</CardTitle>
                  <CardText>{card.text}</CardText>
                  {card.list && (
                    <List>
                      {card.list.map((item, itemIndex) => (
                        <ListItem key={itemIndex}>{item}</ListItem>
                      ))}
                    </List>
                  )}
                </Card>
              ))}
            </Grid>
          </Container>
        </SectionWrapper>
      ))}
    </>
  );
};

export default ContentSections;
