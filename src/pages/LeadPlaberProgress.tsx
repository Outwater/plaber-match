import { useState } from 'react';
import styled from 'styled-components';
import blueTeamVest from '../assets/blue_team_vest.svg';
import redTeamVest from '../assets/red_team_vest.svg';

interface MatchInfo {
  date: string;
  time: string;
  location: string;
  participants: number;
}

type Level = '세미프로1' | '세미프로2' | '아마추어1' | '아마추어2' | '아마추어3' | '아마추어4' | '아마추어5';

interface Player {
  name: string;
  level: Level;
}

interface TeamAssignment {
  teamName: string;
  players: Player[];
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

const formatDate = (dateStr: string, timeStr: string) => {
  const date = new Date(dateStr);
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  
  const month = (date.getMonth() + 1).toString();
  const day = date.getDate().toString();
  const dayOfWeek = days[date.getDay()];
  
  return `${month}월 ${day}일 ${dayOfWeek}요일 ${timeStr}`;
};

const LeadPlaberProgress = () => {
  const [activeTab, setActiveTab] = useState<'match' | 'emergency'>('match');
  
  const [matchInfo] = useState<MatchInfo>({
    date: '2024-03-22',
    time: '21:00',
    location: '플랩 스타디움 가산 마리오',
    participants: 18
  });

  const [showReportModal, setShowReportModal] = useState(false);
  const [matchReport, setMatchReport] = useState<MatchReport>({
    matchProgress: '',
    issues: '',
    playerFeedback: ''
  });

  const getRandomLevel = (): Level => {
    const levels: Level[] = ['세미프로1', '세미프로2', '아마추어1', '아마추어2', '아마추어3', '아마추어4', '아마추어5'];
    return levels[Math.floor(Math.random() * levels.length)] as Level;
  };

  const [teamAssignments, setTeamAssignments] = useState<TeamAssignment[]>([
    {
      teamName: '블루팀',
      players: Array(6).fill(null).map((_, i) => ({
        name: [
          '최무치',
          '이옐로',
          '허라미',
          '서히로',
          '차피치',
          '반젠느'
        ][i],
        level: getRandomLevel()
      }))
    },
    {
      teamName: '레드팀',
      players: Array(6).fill(null).map((_, i) => ({
        name: [
          '이미누',
          '박피르',
          '김건누',
          '도엔도',
          '뮤조커',
          '임쵸비'
        ][i],
        level: getRandomLevel()
      }))
    }
  ]);

  const handleTeamReassign = () => {
    const allPlayers = [...teamAssignments[0].players, ...teamAssignments[1].players];
    
    allPlayers.sort((a, b) => {
      const levelToScore: Record<Level, number> = {
        '세미프로1': 7,
        '세미프로2': 6,
        '아마추어1': 5,
        '아마추어2': 4,
        '아마추어3': 3,
        '아마추어4': 2,
        '아마추어5': 1
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

  const handleRotation = () => {
    window.open('https://www.notion.so/plabfootball/60-1928d253245080389904cf251c059ca6?pvs=4', '_blank');
  };

  return (
    <Container>
      <PageTitle>PLABER MATCH</PageTitle>
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
          <Section style={{marginBottom: 20}}>
            <InfoBox>
              <InfoItem>{formatDate(matchInfo.date, matchInfo.time)}</InfoItem>
              <InfoItem>{matchInfo.location}     12/{matchInfo.participants}명</InfoItem>
            </InfoBox>
          </Section>
          <Divider />

          <Section>
            <NewContainer>
              <Badge>Step1</Badge>
              <ContentText>조끼와 공을 구장의 장비함에서 가져와주세요.</ContentText>
            </NewContainer>
            <SubText>장비함 위치는 아래 링크를 통해 확인할 수 있어요.</SubText>
            
            <PrepContainer>
              <PrepSection>
                <PrepList>
                  <PrepItem>
                    <PrepIcon>🏟️</PrepIcon>
                    <PrepText>구장 장비 위치 및 특이사항</PrepText>
                    <ViewButton 
                      href="https://plabfootball.notion.site/a29919ddda28405aabc434dc98afa703?pvs=4"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      보러가기
                    </ViewButton>
                  </PrepItem>
                </PrepList>
              </PrepSection>

              <PrepSection>
              <NewContainer>
                <Badge>Step2</Badge>
                <ContentText>팀 배정 정보를 보며, 플래버들에게 조끼를 나눠주세요.</ContentText>
              </NewContainer>
              <SubText>필요시에 로테이션표와 팀 재배정 기능을 활용하세요</SubText>
                <PrepTitleContainer>
                  <ButtonGroup style={{justifyContent: 'flex-end', marginBottom: '8px'}}>
                    <RotationButton onClick={handleRotation}>로테이션 표</RotationButton>
                    <ReassignButton onClick={handleTeamReassign}>팀 재배정</ReassignButton>
                  </ButtonGroup>
                </PrepTitleContainer>
                <TeamGrid>
                  {teamAssignments.map((team, index) => (
                    <TeamCard key={index} isBlue={index === 0}>
                      <TeamIcon>
                        <img 
                          src={index === 0 ? blueTeamVest : redTeamVest} 
                          alt={`${team.teamName} 아이콘`}
                          style={{ width: '60px', height: '60px' }}
                        />
                      </TeamIcon>
                      <TeamInfo>
                        <TeamName>{team.teamName}</TeamName>
                        <PlayerCount>세미프로1 {team.players.length}/8명</PlayerCount>
                      </TeamInfo>
                      <PlayerList>
                        {team.players.map((player, idx) => (
                          <PlayerItem key={idx}>
                            <PlayerName>
                              <PlayerNumber isBlue={index === 0}>{idx + 1}</PlayerNumber>
                              {player.name}
                            </PlayerName>
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
          <Divider />
          <Spacer />
          <ButtonSection>
            <NewContainer>
              <Badge>Step3</Badge>
              <ContentText>매치를 시작해주세요.</ContentText>
            </NewContainer>
            <SubText>매치 어시스턴스가 로테이션 및 진행을 도와줄거에요.</SubText>
            <ButtonGroup>
              <StartMatchButton onClick={handleMatchStart}>
                매치 시작하기
              </StartMatchButton>
              <EndMatchButton onClick={handleEndMatch}>
                매치 종료하기
              </EndMatchButton>
            </ButtonGroup>
          </ButtonSection>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  max-width: 475px;
  width: 100%;
`;

const PageTitle = styled.h1`
  text-align: left;
  font-size: 24px;
  font-weight: bold;
  color: white;
  width: calc(100% - 40px);
  padding: 15px 20px;
  margin: 0 0 30px 0;
  background-color: #282B33;
  border-radius: 8px;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 30px;
  justify-content: flex-start;
  width: 100%;
`;

const Tab = styled.div<{ active: boolean }>`
  font-size: 18px;
  font-weight: ${props => props.active ? '600' : '400'};
  color: ${props => props.active ? '#1570FF' : '#666'};
  cursor: pointer;
  padding: 8px 0;
  position: relative;
  transition: all 0.3s;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    background-color: #1570FF;
    transition: width 0.3s ease-in-out;
  }

  &:hover {
    color: #1570FF;
  }
`;

const Section = styled.section`
  margin-bottom: 40px;
  width: 100%;
`;


const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  &:first-child {  // 날짜와 시간을 포함하는 첫 번째 InfoItem
    color: #333;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
  }

  &:last-child {  // 장소와 인원수를 포함하는 두 번째 InfoItem
    font-size: 16px;
    color: #333;
  }
`;

const TeamGrid = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
`;

const TeamCard = styled.div<{ isBlue: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const TeamIcon = styled.div`
  width: 100px;
  height: 100px;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const TeamInfo = styled.div`
  width: 100%;
  text-align: center;
`;

const TeamName = styled.div`
  font-size: 16px;
  color: #333;
  margin-bottom: 4px;
`;

const PlayerCount = styled.div`
  color: #666;
  font-size: 14px;
  margin-bottom: 15px;
`;

const PlayerList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

const PlayerItem = styled.li`
  padding: 12px;
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
  color: #333;
  display: flex;
  align-items: center;
`;

const PlayerLevel = styled.span`
  font-size: 14px;
  color: #666;
`;

const ButtonSection = styled(Section)`
  position: fixed;
  bottom: 0;
  left: 40px;
  right: 0;
  background-color: white;
  padding: 16px;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  width: 100%;
  max-width: 475px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px; // 버튼 사이 간격
  width: 100%;
  margin-top: 10px;
`;

const StartMatchButton = styled.button`
  box-sizing: border-box;
  flex: 7; // 다시 7:3 비율로 변경
  padding: 16px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  background-color: #1570FF;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1259CC;
  }
`;

const EndMatchButton = styled.button`
  box-sizing: border-box;
  flex: 3; // 다시 7:3 비율로 변경
  padding: 16px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  background-color: #B23A48;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #8E2E3A;
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

const PrepContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const PrepSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
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
  width: 400px;
  max-height: 90vh;
  overflow-y: auto;
  margin: 0 auto;
`;

const ModalHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #282B33;
  border-radius: 8px 8px 0 0;

  h2 {
    margin: 0;
    font-size: 20px;
    color: white;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: white;
  
  &:hover {
    color: #e0e0e0;
  }
`;

const ModalBody = styled.div`
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
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

const ReportTextarea = styled.textarea`
  width: 100%;
  height: 60px;
  padding: 10px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  resize: vertical;
  color: #333;
  font-size: 14px;
  display: block;
  margin: 0;
  box-sizing: border-box;
  &::placeholder {
    color: #999;
  }
`;

const ReportLabel = styled.div`
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #1570FF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  
  &:hover {
    background-color: #1259CC;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #dee2e6;
  margin: 0 auto 30px;
  width: 100%;
`;

const RotationButton = styled.button`
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

const NewContainer = styled.div`
  display: flex;
  height: 40px;
  width: 100%;
  padding: 8px;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  background-color: #282B33;
  box-sizing:border-box;
`;

const ContentText = styled.div`
  color: var(--gray-white, #FFF);
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
`;

const Badge = styled.div`
  display: flex;
  height: 16px;
  padding: 0px 4px;
  justify-content: center;
  align-items: center;
  color: var(--gray-white, #FFF);
  text-align: center;
  border-radius: 4px;
  background: var(--blue-blue500, #1570FF);
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const SubText = styled.div`
  color: #666;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  margin-top: 8px;
`;

const PlayerNumber = styled.span<{ isBlue: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background-color: ${props => props.isBlue ? '#1570FF' : '#B23A48'};
  color: white;
  border-radius: 50%;
  font-size: 12px;
  margin-right: 8px;
`;

const Spacer = styled.div`
  height: 140px; // ButtonSection의 대략적인 높이
  width: 100%;
`;

export default LeadPlaberProgress;