import { useState } from 'react';
import styled from 'styled-components';

interface MatchInfo {
  date: string;
  time: string;
  location: string;
  participants: number;
}

type Level = '아마추어1' | '아마추어2' | '아마추어3' | '아마추어4' | '아마추어5';

interface Player {
  name: string;
  level: Level;
}

interface TeamAssignment {
  teamName: string;
  players: Player[];
}

interface VenueInfo {
  equipment: string;
  lighting: string;
}

interface MatchReport {
  matchProgress: string;
  issues: string;
  playerFeedback: string;
}

interface EmergencyItem {
  title: string;
  content: string;
  emoji: string;
}

const LeadFlaverProgress = () => {
  const [activeTab, setActiveTab] = useState<'match' | 'emergency'>('match');
  
  const [matchInfo] = useState<MatchInfo>({
    date: '2024-03-22',
    time: '21:00',
    location: '홍대 풋살장',
    participants: 18
  });

  const [venueInfo] = useState<VenueInfo>({
    equipment: '조끼/공 보관함 위치: 출입구 우측 사물함',
    lighting: '조명 스위치: 구장 입구 좌측 벽면'
  });

  const [showReportModal, setShowReportModal] = useState(false);
  const [matchReport, setMatchReport] = useState<MatchReport>({
    matchProgress: '',
    issues: '',
    playerFeedback: ''
  });

  const getRandomLevel = (): Level => {
    const levels: Level[] = ['아마추어1', '아마추어2', '아마추어3', '아마추어4', '아마추어5'];
    return levels[Math.floor(Math.random() * levels.length)] as Level;
  };

  const [teamAssignments, setTeamAssignments] = useState<TeamAssignment[]>([
    {
      teamName: '블루팀',
      players: Array(6).fill(null).map((_, i) => ({
        name: `플레이어${i + 1}`,
        level: getRandomLevel()
      }))
    },
    {
      teamName: '레드팀',
      players: Array(6).fill(null).map((_, i) => ({
        name: `플레이어${i + 7}`,
        level: getRandomLevel()
      }))
    }
  ]);

  const handleTeamReassign = () => {
    const allPlayers = [...teamAssignments[0].players, ...teamAssignments[1].players];
    
    allPlayers.sort((a, b) => {
      const levelToScore: Record<Level, number> = {
        '아마추어1': 1,
        '아마추어2': 2,
        '아마추어3': 3,
        '아마추어4': 4,
        '아마추어5': 5
      };
      return levelToScore[b.level] - levelToScore[a.level];
    });

    const team1: Player[] = [];
    const team2: Player[] = [];

    allPlayers.forEach((player, index) => {
      if (index % 2 === 0) {
        team1.push(player);
      } else {
        team2.push(player);
      }
    });

    setTeamAssignments([
      { teamName: '블루팀', players: team1 },
      { teamName: '레드팀', players: team2 }
    ]);
  };

  const handleMatchStart = () => {
    window.location.href = 'https://plab-design.vercel.app/project/match-assistant';
  };

  const handleEndMatch = () => {
    setShowReportModal(true);
  };

  const handleSubmitReport = () => {
    // TODO: API로 리포트 전송
    setShowReportModal(false);
  };

  const emergencyGuides: EmergencyItem[] = [
    {
      title: '플래버가 지각했어요',
      content: '',
      emoji: '😰'
    },
    {
      title: '플래버가 불참했어요',
      content: '',
      emoji: '❗'
    },
    {
      title: '구장에 문제가 발생했어요(조명, 장비 등)',
      content: '',
      emoji: '😥'
    },
    {
      title: '비, 눈이 올 때 진행하나요?',
      content: '',
      emoji: '☔'
    },
    {
      title: '부상자가 발생했어요',
      content: '',
      emoji: '🤕'
    },
    {
      title: '매치 중 다툼이 일어났어요',
      content: '',
      emoji: '😠'
    }
  ];

  return (
    <Container>
      <TabContainer>
        <Tab 
          active={activeTab === 'match'} 
          onClick={() => setActiveTab('match')}
        >
          매치 진행
        </Tab>
        <Tab 
          active={activeTab === 'emergency'} 
          onClick={() => setActiveTab('emergency')}
        >
          긴급 가이드
        </Tab>
      </TabContainer>

      {activeTab === 'match' ? (
        <>
          <Section>
            <SectionTitle>매치 정보</SectionTitle>
            <InfoBox>
              <InfoList>
                <InfoItem>📅 {matchInfo.date}</InfoItem>
                <InfoItem>⏰ {matchInfo.time}</InfoItem>
                <InfoItem>📍 {matchInfo.location}</InfoItem>
                <InfoItem>👥 {matchInfo.participants}명</InfoItem>
              </InfoList>
            </InfoBox>
          </Section>

          <Section>
            <SectionTitle>매치 준비하기</SectionTitle>
            <PrepContainer>
              <PrepSection>
                <PrepSubTitle>• 구장 정보</PrepSubTitle>
                <PrepList>
                  <PrepItem>
                    <PrepIcon>🎽</PrepIcon>
                    <PrepText>{venueInfo.equipment}</PrepText>
                  </PrepItem>
                  <PrepItem>
                    <PrepIcon>💡</PrepIcon>
                    <PrepText>{venueInfo.lighting}</PrepText>
                  </PrepItem>
                  <PrepItem>
                    <PrepIcon>🏟️</PrepIcon>
                    <PrepText>구장 상세 정보</PrepText>
                    <ViewButton 
                      href="https://plabfootball.notion.site/1928d2532450803a9157cf2c71d92bc8"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      보러가기
                    </ViewButton>
                  </PrepItem>
                </PrepList>
              </PrepSection>

              <PrepSection>
                <PrepTitleContainer>
                  <PrepSubTitle>• 팀 정보</PrepSubTitle>
                  <ReassignButton onClick={handleTeamReassign}>팀 재배정</ReassignButton>
                </PrepTitleContainer>
                <TeamGrid>
                  {teamAssignments.map((team, index) => (
                    <TeamCard key={index}>
                      <TeamTitle isBlue={index === 0}>{team.teamName}</TeamTitle>
                      <PlayerCount>{team.players.length}명</PlayerCount>
                      <PlayerList>
                        {team.players.map((player, idx) => (
                          <PlayerItem key={idx}>
                            <PlayerName>{player.name}</PlayerName>
                            <PlayerLevel>{player.level}</PlayerLevel>
                          </PlayerItem>
                        ))}
                      </PlayerList>
                    </TeamCard>
                  ))}
                </TeamGrid>
              </PrepSection>
            </PrepContainer>
          </Section>

          <Section>
            <StartMatchButton onClick={handleMatchStart}>
              매치 시작하기
            </StartMatchButton>
            <EndMatchButton onClick={handleEndMatch}>
              매치 종료하기
            </EndMatchButton>
          </Section>
        </>
      ) : (
        <EmergencyGuide>
          <GuideList>
            {emergencyGuides.map((guide, index) => (
              <GuideItem key={index}>
                <GuideHeader>
                  <GuideTitle>{guide.title}</GuideTitle>
                  <GuideEmoji>{guide.emoji}</GuideEmoji>
                </GuideHeader>
                <GuideContent>{guide.content}</GuideContent>
              </GuideItem>
            ))}
          </GuideList>
        </EmergencyGuide>
      )}

      {showReportModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <h2>매치 리포트</h2>
              <CloseButton onClick={() => setShowReportModal(false)}>✕</CloseButton>
            </ModalHeader>
            
            <ModalBody>
              <ReportSection>
                <ReportLabel>매치 진행 사항</ReportLabel>
                <ReportTextarea
                  value={matchReport.matchProgress}
                  onChange={(e) => setMatchReport({
                    ...matchReport,
                    matchProgress: e.target.value
                  })}
                  placeholder="매치는 어떻게 진행되었나요?"
                />
              </ReportSection>

              <ReportSection>
                <ReportLabel>특이사항</ReportLabel>
                <ReportTextarea
                  value={matchReport.issues}
                  onChange={(e) => setMatchReport({
                    ...matchReport,
                    issues: e.target.value
                  })}
                  placeholder="특이사항이 있었나요?"
                />
              </ReportSection>

              <ReportSection>
                <ReportLabel>플레이어 피드백</ReportLabel>
                <ReportTextarea
                  value={matchReport.playerFeedback}
                  onChange={(e) => setMatchReport({
                    ...matchReport,
                    playerFeedback: e.target.value
                  })}
                  placeholder="플레이어들의 피드백을 입력해주세요"
                />
              </ReportSection>
            </ModalBody>

            <ModalFooter>
              <SubmitButton onClick={handleSubmitReport}>리포트 제출</SubmitButton>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  width: 100%;
  max-width: 520px;
  margin: 0 auto 30px;
  padding: 0;
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  min-width: 280px;
  padding: 20px 40px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  background-color: ${props => props.active ? '#007bff' : '#f8f9fa'};
  color: ${props => props.active ? 'white' : '#333'};
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.active ? '#0056b3' : '#e9ecef'};
  }
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
`;

const InfoBox = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
`;

const InfoList = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const InfoItem = styled.div`
  font-size: 16px;
  padding: 12px 20px;
  border-radius: 8px;
  background-color: #f8f9fa;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const TeamCard = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
`;

const TeamTitle = styled.h3<{ isBlue: boolean }>`
  margin: 0 0 15px 0;
  font-size: 20px;
  color: ${props => props.isBlue ? '#007bff' : '#dc3545'};
`;

const PlayerList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const PlayerItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &:last-child {
    border-bottom: none;
  }
`;

const PlayerName = styled.span`
  font-size: 16px;
`;

const PlayerLevel = styled.span`
  font-size: 14px;
  color: #666;
`;

const StartMatchButton = styled.button`
  width: 100%;
  padding: 30px;
  font-size: 24px;
  font-weight: bold;
  color: white;
  background-color: #28a745;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-bottom: 10px;

  &:hover {
    background-color: #218838;
  }
`;

const EndMatchButton = styled.button`
  width: 100%;
  padding: 15px;
  font-size: 24px;
  font-weight: bold;
  color: white;
  background-color: #dc3545;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c82333;
  }
`;

const EmergencyGuide = styled.div`
  padding: 0;
  max-width: 520px;
  margin: 0 auto;
`;

const GuideList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const GuideItem = styled.div`
  background-color: #f8f9fa;
  padding: 25px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  height: 70px;
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const GuideHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 10px;
`;

const GuideTitle = styled.h3`
  margin: 0;
  font-size: 14px;
  color: #333;
  flex: 1;
`;

const GuideEmoji = styled.span`
  font-size: 28px;
  margin-left: 20px;
`;

const GuideContent = styled.p`
  visibility: hidden;
  height: 0;
  margin: 0;
`;

const PlayerCount = styled.div`
  color: #666;
  margin-bottom: 10px;
`;

const PrepContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const PrepSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PrepSubTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
`;

const PrepList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const PrepItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  background-color: #f8f9fa;
  padding: 15px 20px;
  border-radius: 8px;
`;

const PrepIcon = styled.span`
  font-size: 24px;
`;

const PrepText = styled.span`
  font-size: 16px;
`;

const PrepTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ReassignButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  color: #666;
  background-color: white;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const ViewButton = styled.a`
  padding: 8px 16px;
  font-size: 14px;
  color: #666;
  background-color: white;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  margin-left: auto;
  
  &:hover {
    background-color: #f8f9fa;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
    font-size: 20px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;

const ModalBody = styled.div`
  padding: 20px;
`;

const ModalFooter = styled.div`
  padding: 20px;
  border-top: 1px solid #dee2e6;
  display: flex;
  justify-content: flex-end;
`;

const ReportSection = styled.div`
  margin-bottom: 20px;
`;

const ReportLabel = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
`;

const ReportTextarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #0056b3;
  }
`;

export default LeadFlaverProgress;