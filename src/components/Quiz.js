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
    $score >= 7 ? '#22c55e' : $score >= 5 ? '#eab308' : '#ef4444'};
`;
const questions = [
  {
    "id": 1,
    "question": "Vì sao cần hoàn thiện thể chế kinh tế thị trường định hướng XHCN ở Việt Nam?",
    "options": [
      "A. Do yêu cầu hội nhập quốc tế",
      "B. Do yêu cầu phát triển bền vững",
      "C. Do yêu cầu phù hợp quy luật khách quan",
      "D. Do yêu cầu nâng cao năng lực cạnh tranh"
    ],
    "correct": 2,
    "explanation": "Hoàn thiện thể chế là tất yếu khách quan, gắn với hội nhập và phát triển bền vững."
  },
  {
    "id": 2,
    "question": "Một trong những nội dung hoàn thiện thể chế là gì?",
    "options": [
      "A. Hoàn thiện thể chế về sở hữu",
      "B. Hoàn thiện thể chế về giáo dục",
      "C. Hoàn thiện thể chế về quốc phòng",
      "D. Hoàn thiện thể chế về văn hóa"
    ],
    "correct": 0,
    "explanation": "Trọng tâm là sở hữu và phát triển các thành phần kinh tế."
  },
  {
    "id": 3,
    "question": "Thể chế về sở hữu ở Việt Nam hiện nay có đặc điểm gì?",
    "options": [
      "A. Chỉ có sở hữu nhà nước",
      "B. Chỉ có sở hữu tư nhân",
      "C. Có nhiều hình thức sở hữu đa dạng",
      "D. Không có sở hữu tập thể"
    ],
    "correct": 2,
    "explanation": "Bao gồm nhà nước, tập thể, tư nhân."
  },
  {
    "id": 4,
    "question": "Hoàn thiện thể chế phát triển đồng bộ các yếu tố thị trường nhằm mục tiêu gì?",
    "options": [
      "A. Tăng trưởng kinh tế nhanh",
      "B. Phân bổ nguồn lực hiệu quả",
      "C. Giảm vai trò nhà nước",
      "D. Tăng thuế"
    ],
    "correct": 1,
    "explanation": "Đồng bộ các yếu tố thị trường giúp phân bổ nguồn lực hiệu quả."
  },
  {
    "id": 5,
    "question": "Một yếu tố thị trường cần hoàn thiện là gì?",
    "options": [
      "A. Thị trường lao động",
      "B. Thị trường bất động sản",
      "C. Thị trường vốn",
      "D. Thị trường khoa học công nghệ"
    ],
    "correct": 0,
    "explanation": "Thị trường lao động là yếu tố quan trọng cần hoàn thiện."
  },
  {
    "id": 6,
    "question": "Hoàn thiện thể chế để gắn tăng trưởng với công bằng xã hội nhằm mục tiêu nào?",
    "options": [
      "A. Giảm bất bình đẳng",
      "B. Bảo đảm tiến bộ xã hội",
      "C. Thúc đẩy hội nhập quốc tế",
      "D. Nâng cao năng lực cạnh tranh quốc gia"
    ],
    "correct": 0,
    "explanation": "Giảm bất bình đẳng là mục tiêu trọng yếu."
  },
  {
    "id": 7,
    "question": "Vai trò của Nhà nước trong kinh tế thị trường định hướng XHCN là gì?",
    "options": [
      "A. Buông lỏng quản lý",
      "B. Điều tiết và định hướng phát triển",
      "C. Chỉ làm trọng tài",
      "D. Không tham gia"
    ],
    "correct": 1,
    "explanation": "Nhà nước giữ vai trò điều tiết và định hướng."
  },
  {
    "id": 8,
    "question": "Một nội dung quan trọng của hoàn thiện thể chế là nâng cao năng lực hệ thống chính trị. Điều này nhằm:",
    "options": [
      "A. Tăng cường quản lý xã hội",
      "B. Đảm bảo ổn định chính trị",
      "C. Tạo môi trường cho phát triển kinh tế",
      "D. Nâng cao năng lực cạnh tranh quốc tế"
    ],
    "correct": 1,
    "explanation": "Đảm bảo ổn định chính trị là mục tiêu then chốt."
  },
  {
    "id": 9,
    "question": "Hội nhập quốc tế trong hoàn thiện thể chế kinh tế thị trường định hướng XHCN có ý nghĩa gì?",
    "options": [
      "A. Mở rộng thị trường",
      "B. Thu hút đầu tư nước ngoài",
      "C. Nâng cao năng lực cạnh tranh",
      "D. Tăng cường hợp tác khu vực"
    ],
    "correct": 0,
    "explanation": "Mở rộng thị trường là ý nghĩa nổi bật."
  },
  {
    "id": 10,
    "question": "Một thách thức khi hoàn thiện thể chế kinh tế thị trường định hướng XHCN là gì?",
    "options": [
      "A. Cạnh tranh gay gắt",
      "B. Chênh lệch phát triển vùng miền",
      "C. Vấn đề môi trường",
      "D. Thiếu nguồn nhân lực chất lượng cao"
    ],
    "correct": 0,
    "explanation": "Cạnh tranh gay gắt là thách thức lớn."
  },
  {
    "id": 11,
    "question": "Lợi ích kinh tế là gì?",
    "options": [
      "A. Nhu cầu vật chất của con người",
      "B. Mối quan hệ giữa người lao động và tư bản",
      "C. Những lợi ích gắn với việc thỏa mãn nhu cầu kinh tế",
      "D. Lợi nhuận doanh nghiệp"
    ],
    "correct": 2,
    "explanation": "Lợi ích kinh tế phản ánh nhu cầu và động lực kinh tế."
  },
  {
    "id": 12,
    "question": "Quan hệ lợi ích kinh tế là gì?",
    "options": [
      "A. Quan hệ giữa các chủ thể về lợi ích kinh tế",
      "B. Quan hệ chính trị",
      "C. Quan hệ văn hóa",
      "D. Quan hệ xã hội nói chung"
    ],
    "correct": 0,
    "explanation": "Đây là quan hệ giữa các chủ thể trong nền kinh tế."
  },
  {
    "id": 13,
    "question": "Quan hệ lợi ích kinh tế có đặc điểm gì?",
    "options": [
      "A. Luôn thống nhất",
      "B. Luôn mâu thuẫn",
      "C. Vừa thống nhất vừa mâu thuẫn",
      "D. Không liên quan"
    ],
    "correct": 2,
    "explanation": "Có sự thống nhất và mâu thuẫn."
  },
  {
    "id": 14,
    "question": "Một nhân tố ảnh hưởng đến quan hệ lợi ích kinh tế là gì?",
    "options": [
      "A. Trình độ phát triển lực lượng sản xuất",
      "B. Chính sách của Nhà nước",
      "C. Cơ cấu sở hữu",
      "D. Trình độ dân trí"
    ],
    "correct": 0,
    "explanation": "Trình độ phát triển lực lượng sản xuất là nhân tố quan trọng."
  },
  {
    "id": 15,
    "question": "Một số quan hệ lợi ích cơ bản trong nền kinh tế thị trường là gì?",
    "options": [
      "A. Quan hệ giữa người lao động và chủ sử dụng lao động",
      "B. Quan hệ giữa nhà nước và doanh nghiệp",
      "C. Quan hệ giữa doanh nghiệp với doanh nghiệp",
      "D. Quan hệ giữa doanh nghiệp và ngân hàng"
    ],
    "correct": 0,
    "explanation": "Quan hệ giữa người lao động và chủ sử dụng lao động là cơ bản."
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
              Kết Quả Quiz
            </QuizTitle>
            <QuizDescription
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Chúc mừng bạn đã hoàn thành bài quiz!
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
                {score >= 8 ? "Xuất sắc! Bạn đã nắm vững kiến thức  Chương 5: Kinh tế thị trường định hướng xã hội chủ nghĩa và các quan hệ lợi ích kinh tế ở Việt Nam" :
                 score >= 6 ? "Tốt lắm! Kiến thức của bạn khá vững chắc." :
                 score >= 4 ? "Không tồi! Hãy tiếp tục học tập để củng cố kiến thức." :
                 "Hãy chú ý học kỹ hơn về Kinh tế chính trị Mác - Lênin nhé!"}
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
            Kiểm Tra Kiến Thức
          </QuizTitle>
          <QuizDescription
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Hãy kiểm tra kiến thức của bạn về Kinh tế chính trị Mác - Lênin
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
