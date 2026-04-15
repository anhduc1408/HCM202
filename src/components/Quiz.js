import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const QuizWrapper = styled.section`
  padding: ${({ theme }) => theme.spacing['3xl']} 0;
  background: ${({ theme }) => theme.colors.bgSecondary};
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
`;

const QuizHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const QuizTitle = styled(motion.h2)`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  }
`;

const QuizDescription = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto;
`;

const QuizCard = styled(motion.div)`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const QuestionCounter = styled.div`
  font-family: ${({ theme }) => theme.fonts.accent};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const QuestionText = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: 1.6;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const OptionButton = styled(motion.button)`
  padding: ${({ theme }) => theme.spacing.lg};
  border: 2px solid ${({ $selected, $isCorrect, $showResult, theme }) =>
    $showResult
      ? $isCorrect
        ? '#22c55e'
        : $selected
        ? '#ef4444'
        : theme.colors.border
      : $selected
      ? theme.colors.primary
      : theme.colors.border};
  background: ${({ $selected, $isCorrect, $showResult, theme }) =>
    $showResult
      ? $isCorrect
        ? '#22c55e15'
        : $selected
        ? '#ef444415'
        : 'white'
      : $selected
      ? theme.colors.primary + '10'
      : 'white'};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;
  text-align: left;
  transition: all 0.3s ease;
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary}10;
  }
`;

const OptionText = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const OptionLetter = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ $selected, $isCorrect, $showResult, theme }) =>
    $showResult
      ? $isCorrect
        ? '#22c55e'
        : $selected
        ? '#ef4444'
        : theme.colors.border
      : $selected
      ? theme.colors.primary
      : theme.colors.border}20;
  color: ${({ $selected, $isCorrect, $showResult, theme }) =>
    $showResult
      ? 'white'
      : $selected
      ? theme.colors.primary
      : theme.colors.textSecondary};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const ActionButton = styled(motion.button)`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: ${({ theme }) => theme.colors.border};
    cursor: not-allowed;
    transform: none;
  }
`;

const ResultCard = styled(motion.div)`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const ResultTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ResultScore = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ScoreHighlight = styled.span`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: 700;
  color: ${({ $score, theme }) =>
    $score >= 17 ? '#22c55e' : $score >= 14 ? '#eab308' : '#ef4444'};
`;

const questions = [
  {
    id: 1,
    question: "Động lực quan trọng nhất thúc đẩy Hồ Chí Minh ra đi tìm đường cứu nước là gì?",
    options: [
      "A. Sự thất bại của các phong trào yêu nước cuối thế kỷ XIX, đầu thế kỷ XX.",
      "B. Chủ nghĩa yêu nước và truyền thống dân tộc.",
      "C. Muốn tìm hiểu văn hóa phương Tây.",
      "D. Sự tác động của Cách mạng Tháng Mười Nga."
    ],
    correct: 1,
    explanation: "Chủ nghĩa yêu nước và truyền thống dân tộc là động lực gốc rễ, xuyên suốt cuộc đời hoạt động của Hồ Chí Minh."
  },
  {
    id: 2,
    question: "Hồ Chí Minh tiếp thu yếu tố nào từ Nho giáo để vận dụng vào xây dựng Đảng và Nhà nước?",
    options: [
      "A. Tư tưởng quân chủ chuyên chế.",
      "B. Tư tưởng phân biệt đẳng cấp.",
      "C. Tư tưởng trọng đạo đức, trọng hiền tài.",
      "D. Tư tưởng duy tâm."
    ],
    correct: 2,
    explanation: "Người đã gạt bỏ những yếu tố duy tâm, lạc hậu của Nho giáo và kế thừa những mặt tích cực như tinh thần trọng đạo đức, trọng hiền tài."
  },
  {
    id: 3,
    question: "Tài liệu nào của Lênin đã giúp Hồ Chí Minh tìm thấy con đường giải phóng dân tộc?",
    options: [
      "A. Sơ thảo lần thứ nhất những luận cương về vấn đề dân tộc và vấn đề thuộc địa.",
      "B. Tuyên ngôn của Đảng Cộng sản.",
      "C. Nhà nước và cách mạng.",
      "D. Làm gì?"
    ],
    correct: 0,
    explanation: "Đọc Luận cương của Lênin năm 1920, Hồ Chí Minh đã tìm thấy con đường cứu nước đúng đắn cho dân tộc Việt Nam."
  },
  {
    id: 4,
    question: "Trong các cơ sở lý luận, nhân tố nào giữ vai trò quyết định đến thế giới quan và phương pháp luận của Hồ Chí Minh?",
    options: [
      "A. Nho giáo và Phật giáo.",
      "B. Tinh hoa văn hóa phương Tây.",
      "C. Chủ nghĩa Mác – Lênin.",
      "D. Truyền thống yêu nước Việt Nam."
    ],
    correct: 2,
    explanation: "Chủ nghĩa Mác - Lênin là cơ sở thế giới quan và phương pháp luận khoa học của tư tưởng Hồ Chí Minh."
  },
  {
    id: 5,
    question: "Sự kiện nào đánh dấu bước ngoặt quyết định trong cuộc đời hoạt động của Hồ Chí Minh, từ người yêu nước trở thành người cộng sản?",
    options: [
      "A. Khi Người rời cảng Nhà Rồng ra đi tìm đường cứu nước (1911).",
      "B. Khi Người gửi Bản yêu sách của nhân dân An Nam tới Hội nghị Véc-xai (1919).",
      "C. Khi Người đọc Luận cương của Lênin và bỏ phiếu tán thành gia nhập Quốc tế III, tham gia thành lập Đảng Cộng sản Pháp (12/1920).",
      "D. Khi Người thành lập Hội Việt Nam Cách mạng Thanh niên (1925)."
    ],
    correct: 2,
    explanation: "Việc gia nhập Quốc tế III và tham gia sáng lập Đảng Cộng sản Pháp đánh dấu bước chuyển về chất trong tư tưởng của Người."
  },
  {
    id: 6,
    question: "Câu nói nổi tiếng nào thể hiện rõ nhất tư tưởng Hồ Chí Minh về quyền dân tộc?",
    options: [
      "A. \"Nước Việt Nam là một, dân tộc Việt Nam là một\".",
      "B. \"Không có gì quý hơn độc lập, tự do\".",
      "C. \"Độc lập mà dân không được hạnh phúc thì độc lập cũng không có nghĩa lý gì\".",
      "D. \"Tất cả mọi người đều sinh ra có quyền bình đẳng\"."
    ],
    correct: 1,
    explanation: "\"Không có gì quý hơn độc lập, tự do\" là chân lý bất hủ, là mục tiêu cao cả nhất của dân tộc Việt Nam."
  },
  {
    id: 7,
    question: "Theo Hồ Chí Minh, độc lập dân tộc phải gắn liền với điều gì để thực sự có ý nghĩa?",
    options: [
      "A. Sự hỗ trợ từ quốc tế.",
      "B. Tự do và hạnh phúc của nhân dân.",
      "C. Sức mạnh quân sự.",
      "D. Sự phát triển kinh tế thị trường."
    ],
    correct: 1,
    explanation: "Người nhấn mạnh độc lập phải mang lại đời sống ấm no, tự do cho nhân dân thì mới là độc lập thực sự."
  },
  {
    id: 8,
    question: "Mối quan hệ giữa độc lập dân tộc và chủ nghĩa xã hội trong tư tưởng Hồ Chí Minh là gì?",
    options: [
      "A. Độc lập dân tộc là mục tiêu cuối cùng.",
      "B. Chủ nghĩa xã hội là tiền đề của độc lập dân tộc.",
      "C. Độc lập dân tộc là tiền đề; chủ nghĩa xã hội là điều kiện để giữ vững độc lập.",
      "D. Hai nội dung này không có quan hệ với nhau."
    ],
    correct: 2,
    explanation: "Độc lập dân tộc là mục tiêu trước hết, là tiền đề để xây dựng CNXH; ngược lại CNXH giúp bảo vệ vững chắc độc lập."
  },
  {
    id: 9,
    question: "Nhận diện \"cách mạng màu\" trong giai đoạn hiện nay theo tài liệu là gì?",
    options: [
      "A. Một cuộc cách mạng quân sự trực tiếp.",
      "B. Thủ đoạn lật đổ chế độ thông qua diễn biến hòa bình, lợi dụng dân chủ, nhân quyền.",
      "C. Một phong trào đòi quyền lợi kinh tế của công nhân.",
      "D. Quá trình chuyển đổi sang kinh tế thị trường."
    ],
    correct: 1,
    explanation: "Cách mạng màu là hình thức can thiệp phi quân sự nhưng nhằm mục tiêu lật đổ chính quyền thông qua diễn biến hòa bình."
  },
  {
    id: 10,
    question: "Giải pháp quan trọng nhất để chống \"cách mạng màu\" là gì?",
    options: [
      "A. Đóng cửa biên giới.",
      "B. Xây dựng khối đại đoàn kết dân tộc và niềm tin của dân vào Đảng.",
      "C. Tăng cường mua sắm vũ khí.",
      "D. Cấm sử dụng mạng xã hội."
    ],
    correct: 1,
    explanation: "Sức mạnh từ sự đồng thuận của nhân dân và niềm tin vào Đảng là thành trì vững chắc nhất bảo vệ chế độ."
  },
  {
    id: 11,
    question: "Theo Hồ Chí Minh, Đảng Cộng sản Việt Nam là sự kết hợp của những yếu tố nào?",
    options: [
      "A. Chủ nghĩa Mác - Lênin và phong trào công nhân.",
      "B. Chủ nghĩa Mác - Lênin và phong trào yêu nước.",
      "C. Chủ nghĩa Mác - Lênin + phong trào công nhân + phong trào yêu nước.",
      "D. Phong trào công nhân và phong trào nông dân."
    ],
    correct: 2,
    explanation: "Đây là quy luật hình thành Đảng Cộng sản Việt Nam, khác biệt so với các Đảng ở châu Âu khi có thêm yếu tố phong trào yêu nước."
  },
  {
    id: 12,
    question: "Nguyên tắc tổ chức cơ bản nhất của Đảng là gì?",
    options: [
      "A. Tự phê bình và phê bình.",
      "B. Đoàn kết thống nhất.",
      "C. Tập trung dân chủ.",
      "D. Kỷ luật nghiêm minh."
    ],
    correct: 2,
    explanation: "Tập trung dân chủ là nguyên tắc sống còn, đảm bảo sức mạnh và sự thống nhất của Đảng Cộng sản."
  },
  {
    id: 13,
    question: "Hồ Chí Minh ví việc \"tự phê bình và phê bình\" trong Đảng như công việc gì hàng ngày?",
    options: [
      "A. Quét dọn nhà cửa.",
      "B. Rửa mặt.",
      "C. Ăn cơm.",
      "D. Tập thể dục."
    ],
    correct: 1,
    explanation: "Rửa mặt hàng ngày giúp sạch sẽ, cũng như tự phê bình và phê bình giúp Đảng luôn trong sạch, vững mạnh."
  },
  {
    id: 14,
    question: "Bản chất của Nhà nước theo tư tưởng Hồ Chí Minh là gì?",
    options: [
      "A. Nhà nước quân chủ.",
      "B. Nhà nước pháp quyền tư sản.",
      "C. Nhà nước của nhân dân, do nhân dân, vì nhân dân.",
      "D. Nhà nước toàn trị."
    ],
    correct: 2,
    explanation: "Nhà nước do nhân dân làm chủ, phục vụ lợi ích của nhân dân là cốt lõi trong tư tưởng Hồ Chí Minh."
  },
  {
    id: 15,
    question: "\"Việc gì có lợi cho dân, ta phải hết sức làm. Việc gì có hại cho dân, ta phải hết sức tránh\" thể hiện đặc điểm nào của Nhà nước?",
    options: [
      "A. Nhà nước của dân.",
      "B. Nhà nước do dân.",
      "C. Nhà nước vì dân.",
      "D. Nhà nước pháp quyền."
    ],
    correct: 2,
    explanation: "Câu nói này nhấn mạnh mục tiêu phục vụ vô điều kiện lợi ích của nhân dân – đặc trưng của Nhà nước vì dân."
  },
  {
    id: 16,
    question: "Theo Hồ Chí Minh, căn bệnh nào là nguyên nhân chính dẫn đến tham nhũng, lãng phí?",
    options: [
      "A. Bệnh quan liêu.",
      "B. Bệnh lười biếng.",
      "C. Bệnh kiêu ngạo.",
      "D. Bệnh thành tích."
    ],
    correct: 0,
    explanation: "Quan liêu là nguồn gốc của tham ô, lãng phí và xa rời quần chúng nhân dân."
  },
  {
    id: 17,
    question: "Hai tiêu chuẩn cần và đủ của một cán bộ cách mạng theo Hồ Chí Minh là gì?",
    options: [
      "A. Tài năng và bằng cấp.",
      "B. Đức và Tài.",
      "C. Sức khỏe và kinh nghiệm.",
      "D. Quan hệ rộng và năng lực."
    ],
    correct: 1,
    explanation: "Cán bộ phải có cả đạo đức cách mạng (đức) và năng lực chuyên môn (tài), trong đó đức là gốc."
  },
  {
    id: 18,
    question: "Nhà nước \"do nhân dân\" có nghĩa là gì?",
    options: [
      "A. Nhân dân làm chủ, tham gia quản lý và giám sát nhà nước.",
      "B. Nhân dân làm mọi việc thay cho nhà nước.",
      "C. Nhà nước chỉ tồn tại khi có sự cho phép của nước khác.",
      "D. Nhân dân không cần đóng thuế."
    ],
    correct: 0,
    explanation: "Nhà nước do dân lập nên thông qua bầu cử và đặt dưới sự kiểm soát, giám sát của nhân dân."
  },
  {
    id: 19,
    question: "\"Cần, Kiệm, Liêm, Chính, Chí công vô tư\" là những phẩm chất đạo đức của đối tượng nào?",
    options: [
      "A. Chỉ dành cho lãnh đạo cao cấp.",
      "B. Dành cho mọi cán bộ, đảng viên.",
      "C. Dành cho học sinh, sinh viên.",
      "D. Dành cho doanh nhân."
    ],
    correct: 1,
    explanation: "Đây là những chuẩn mực đạo đức cách mạng cơ bản nhất mà mọi cán bộ, đảng viên đều phải có."
  },
  {
    id: 20,
    question: "Tại sao trong giai đoạn hiện nay, để bảo vệ nền độc lập dân tộc, Hồ Chí Minh lại đặc biệt nhấn mạnh đến việc xây dựng \"thế trận lòng dân\"?",
    options: [
      "A. Để huy động nguồn lực kinh tế trong nhân dân.",
      "B. Vì khi có lòng dân là có tất cả; dân là bức tường thành vững chắc nhất chống lại mọi âm mưu chia rẽ, lật đổ (\"cách mạng màu\").",
      "C. Để phục vụ cho các chiến dịch bầu cử đại biểu Quốc hội.",
      "D. Để nhân dân thay thế hoàn toàn vai trò của các lực lượng vũ trang."
    ],
    correct: 1,
    explanation: "Lòng dân là sức mạnh vô địch, là yếu tố quyết định thắng lợi của mọi sự nghiệp cách mạng và bảo vệ Tổ quốc."
  }
];


const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [answers, setAnswers] = useState([]);

  const handleAnswerSelect = (index) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === questions[currentQuestion].correct;
    setShowResult(true);
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setAnswers([...answers, {
      question: questions[currentQuestion].question,
      selected: selectedAnswer,
      correct: questions[currentQuestion].correct,
      isCorrect,
      explanation: questions[currentQuestion].explanation
    }]);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
    setAnswers([]);
  };

  const letters = ['A', 'B', 'C', 'D'];

  if (quizComplete) {
    return (
      <QuizWrapper>
        <Container>
          <QuizHeader
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <QuizTitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Kết Quả Bài Ôn Tập
            </QuizTitle>
            <QuizDescription
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Chúc mừng bạn đã hoàn thành bài ôn tập Tư tưởng Hồ Chí Minh!
            </QuizDescription>
          </QuizHeader>
          
          <QuizCard
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ResultCard>
              <ResultTitle>Kết quả của bạn</ResultTitle>
              <ResultScore>
                Bạn đã trả lời đúng <ScoreHighlight $score={score}>{score}/{questions.length}</ScoreHighlight> câu hỏi
              </ResultScore>
              <ResultScore>
                {score >= 17 ? "Xuất sắc! Bạn đã nắm vững kiến thức môn Tư tưởng Hồ Chí Minh. Chúc bạn đạt điểm cao!" :
                 score >= 14 ? "Tốt lắm! Kiến thức của bạn khá vững chắc về HCM202." :
                 score >= 10 ? "Không tồi! Hãy tiếp tục ôn tập để củng cố kiến thức." :
                 "Hãy tập trung ôn tập kỹ hơn về các nội dung trọng tâm của môn học nhé!"}
              </ResultScore>
              
              <ButtonContainer>
                <ActionButton
                  onClick={handleRestartQuiz}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Làm lại Quiz
                </ActionButton>
              </ButtonContainer>
            </ResultCard>
          </QuizCard>
        </Container>
      </QuizWrapper>
    );
  }

  return (
    <QuizWrapper id="quiz">
      <Container>
        <QuizHeader
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <QuizTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Ôn Tập Tư Tưởng Hồ Chí Minh
          </QuizTitle>
          <QuizDescription
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Kiểm tra kiến thức của bạn về môn HCM202 – 20 câu hỏi trọng tâm
          </QuizDescription>
        </QuizHeader>
        
        <QuizCard
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <QuestionCounter>
            Câu hỏi {currentQuestion + 1} / {questions.length}
          </QuestionCounter>
          
          <QuestionText>{questions[currentQuestion].question}</QuestionText>
          
          <OptionsContainer>
            {questions[currentQuestion].options.map((option, index) => (
              <OptionButton
                key={index}
                $selected={selectedAnswer === index}
                $isCorrect={index === questions[currentQuestion].correct}
                $showResult={showResult}
                onClick={() => handleAnswerSelect(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <OptionText>
                  <OptionLetter
                    $selected={selectedAnswer === index}
                    $isCorrect={index === questions[currentQuestion].correct}
                    $showResult={showResult}
                  >
                    {letters[index]}
                  </OptionLetter>
                  {option}
                </OptionText>
              </OptionButton>
            ))}
          </OptionsContainer>
          
          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{
                  marginTop: '20px',
                  padding: '16px',
                  borderRadius: '12px',
                  background: answers[answers.length - 1]?.isCorrect ? '#22c55e15' : '#ef444415'
                }}
              >
                <p style={{
                  color: answers[answers.length - 1]?.isCorrect ? '#22c55e' : '#ef4444',
                  fontWeight: 600,
                  marginBottom: '8px'
                }}>
                  {answers[answers.length - 1]?.isCorrect ? '✓ Chính xác!' : '✗ Chưa chính xác'}
                </p>
                <p style={{ color: '#64748b', fontSize: '14px' }}>
                  {questions[currentQuestion].explanation}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          
          <ButtonContainer>
            {!showResult ? (
              <ActionButton
                onClick={handleCheckAnswer}
                disabled={selectedAnswer === null}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Kiểm tra đáp án
              </ActionButton>
            ) : (
              <ActionButton
                onClick={handleNextQuestion}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {currentQuestion < questions.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'}
              </ActionButton>
            )}
          </ButtonContainer>
        </QuizCard>
      </Container>
    </QuizWrapper>
  );
};

export default Quiz;
