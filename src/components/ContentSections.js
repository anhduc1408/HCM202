import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

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
    number: 'CHƯƠNG I',
    layout: 'tabs',
    title: 'Khái niệm, Đối tượng & Phương pháp học tập',
    description: 'Chương mở đầu định hình nền tảng tư duy lý luận về môn Tư tưởng Hồ Chí Minh.',
    bg: 'primary',
    cards: [
      {
        title: 'Khái niệm Tư tưởng Hồ Chí Minh',
        text: 'Theo Văn kiện Đại hội XI của Đảng (2011), Tư tưởng Hồ Chí Minh là hệ thống quan điểm toàn diện và sâu sắc về những vấn đề cơ bản của cách mạng Việt Nam.',
        list: [
          'Kết quả của sự vận dụng và phát triển sáng tạo chủ nghĩa Mác – Lênin vào điều kiện cụ thể của Việt Nam.',
          'Sự kế thừa và phát triển các giá trị truyền thống dân tộc, vươn tầm tiếp thu tinh hoa văn hóa nhân loại.',
          'Mục tiêu cốt lõi: giải phóng dân tộc, giai cấp, con người.'
        ]
      },
      {
        title: 'Đối tượng nghiên cứu',
        text: 'Nghiên cứu toàn bộ hệ thống quan điểm của Chủ Tịch Hồ Chí Minh và quá trình thực tiễn cách mạng vươn lên giành độc lập của dân tộc Việt Nam.',
        list: [
          'Hệ thống quan điểm thông qua các tác phẩm, bài nói, bài viết, hoạt động thực tiễn của Người.',
          'Quá trình hình thành, phát triển và vận dụng tư tưởng trong thực tiễn CMVN.',
          'Làm rõ giá trị lý luận và thực tiễn, cũng như các quy luật được đúc kết.'
        ]
      },
      {
        title: 'Phương pháp luận cốt lõi',
        text: 'Hệ thống đánh giá dựa trên nền tảng triết học khách quan, toàn diện và sự thống nhất giữa tính Đảng và tính khoa học.',
        list: [
          'Lấy thực tiễn làm tiêu chuẩn kiểm nghiệm chân lý.',
          'Phân tích theo hệ quy chiếu lịch sử – cụ thể, nhìn nhận mọi sự vật toàn diện.',
          'Luôn kế thừa và phát triển sáng tạo so với góc nhìn cũ.'
        ]
      },
      {
        title: 'Kỹ thuật Phương pháp cụ thể',
        text: 'Sử dụng các phương pháp đặc thù và liên ngành trong việc xác định các bài học lý luận vô giá.',
        list: [
          'Kết hợp chặt chẽ cấu trúc mô hình dòng chảy logic và quy luật lịch sử.',
          'Phân tích văn bản gắn với hoạt động thực tiễn nổi bật tương ứng.',
          'Ứng dụng sâu sắc khối kiến thức: Triết học, khoa học chính trị và nhân chủng học.'
        ]
      },
      {
        title: 'Ý nghĩa của việc học tập',
        text: 'Giáo dục tư tưởng, chính trị, đạo đức và phong cách chuẩn mực cho thế hệ trí thức tương lai.',
        list: [
          'Nâng tầm tư duy biện chứng và rèn giũa bản lĩnh kiên gan.',
          'Củng cố niềm tin bất diệt vào độc lập dân tộc tiến cùng tiến trình CNXH.',
          'Sống và làm việc theo tấm gương đạo đức sáng rọi của Hồ Chủ Tịch.'
        ]
      }
    ]
  },
  {
    id: 'chapter2',
    number: 'CHƯƠNG II',
    layout: 'timeline',
    title: 'Cơ sở & Tiến trình Dấu ấn Lịch sử',
    description: 'Chương II theo dõi sự biến đổi thực tiễn và nhận thức vĩ đại qua các mốc thời gian chói lọi.',
    bg: 'secondary',
    cards: [
      {
        title: 'Thực tiễn',
        text: 'Bối cảnh lịch sử trong nước và quốc tế định hình tư duy tìm đường cứu nước.',
        list: [
          'Giai đoạn u ám: Các phong trào yêu nước liên tiếp chìm trong bể máu và thất bại.',
          'Mệnh lệnh lịch sử: Phải tìm ra lối thoát độc lập triệt để cho dân tộc.'
        ]
      },
      {
        title: 'Cơ sở Lý luận',
        text: 'Sự kết hợp hoàn hảo giữa chất liệu Á - Âu và tư tưởng Marxist.',
        list: [
          'Hồn cốt Á châu: Nhân nghĩa, đoàn kết cộng đồng, triết lý Lão, Phật.',
          'Tầm nhìn Âu - Mỹ: Tinh hoa dân chủ, khát vọng nhân quyền.',
          'Đỉnh cao nhận thức: Ánh sáng của luận cương Lênin chiếu rọi con đường vô sản.'
        ]
      },
      {
        title: 'Nhân tố vị nhân',
        text: 'Thiên tài Nguyễn Ái Quốc - Hội tụ yếu tố khách quan và nỗ lực phi thường.',
        list: [
          'Tầm nhìn sắc bén vượt thời đại, thoát ly các giới hạn sĩ phu cũ.',
          'Ý chí rèn luyện bền bỉ trải qua hàng chục năm bôn ba lao động.'
        ]
      },
      {
        title: 'Trước 1911 - 1930',
        text: 'Chông gai tìm đường và tạo lập hạt giống cách mạng vĩ đại.',
        list: [
          '1911-1920: Chia tay bến Nhà Rồng, hoà mình vào dòng chảy lao khổ thế giới, bắt gặp chân lý Mác-Lênin.',
          '1920-1930: Xây dựng nền tảng tư tưởng, truyền bá ánh sáng về nước, sáng lập ĐCS Việt Nam lịch sử.'
        ]
      },
      {
        title: '1930 - 1969',
        text: 'Ánh trăng chiếu sáng muôn dân, chèo lái con thuyền dân tộc.',
        list: [
          '1930-1945: Tổng khởi nghĩa Tháng Tám thần thánh.',
          '1945-1969: Lãnh đạo cuộc chiến vệ quốc 9 năm, đặt móng nhà nước Dân chủ tiến lên CNXH.'
        ]
      }
    ]
  },
  {
    id: 'chapter3',
    number: 'CHƯƠNG III',
    layout: 'tabs',
    title: 'Độc lập Dân tộc gắn với Chủ nghĩa Xã hội',
    description: 'Bản lề khát vọng thiêng liêng nhất xuyên suốt toàn bộ sự nghiệp chính trị Hồ Chí Minh.',
    bg: 'primary',
    cards: [
      {
        title: 'Độc lập dân tộc',
        text: '"Không có gì quý hơn độc lập tự do". Đặc trưng độc lập dân tộc mang chiều kích đầy đủ nhất.',
        list: [
          'Độc lập phải là món quà thực tiễn: Cơm no, áo ấm, mọi người đều được học hành.',
          'Độc lập toàn vẹn tuyệt đối về mặt chủ quyền địa lý và tự định đoạt số phận chính trị.'
        ]
      },
      {
        title: 'Khoa học Giải phóng dân tộc',
        text: 'Chiến lược đánh bại ách đô hộ một cách hệ thống dựa vào quần chúng.',
        list: [
          'Cốt lõi tiên quyết: Dưới ngọn cờ của Đảng Cộng sản kiên định.',
          'Đoàn kết rộng rãi toàn diện trên nền tảng liên minh Công - Nông - Trí.',
          'Nghệ thuật làm chủ nhịp độ: Kết hợp linh hoạt đấu tranh chính trị, ngoại giao với vũ trang.'
        ]
      },
      {
        title: 'Lý tưởng Chủ nghĩa Xã hội',
        text: 'Hình thái xã hội nhân văn nhất với cấu trúc tiến bộ vì ấm no con người.',
        list: [
          'Quyền lực không thuộc thiều số, mà thuôc vào nhân dân lao động làm chủ.',
          'Kinh tế vươn tầm, thịnh vượng, công bằng minh bạch là bệ phóng vút cao văn hoá.'
        ]
      },
      {
        title: 'Động lực cất cánh CNXH',
        text: 'Huy động nội - ngoại lực tạo đòn bẩy thép.',
        list: [
          'Tài sản quý nhất để xây dựng kiến thiết chính là con người.',
          'Tinh thần đại đoàn kết, đồng tâm hiệp lực chia sẻ lợi ích cá nhân, tập thể, quốc gia.'
        ]
      },
      {
        title: 'Sự gắn kết máu thịt',
        text: 'Không có độc lập sẽ không có cơ sở tiến đến CNXH, mà CNXH là pháo đài thép giữ vững Độc Lập.',
        list: [
          'Độc lập là ngọn lửa tiên quyết mở đường.',
          'CNXH là xi măng cốt thép bảo vệ vĩnh viễn quyền dân tộc tự quyết.'
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
