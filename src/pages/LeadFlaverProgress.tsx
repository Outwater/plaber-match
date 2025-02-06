import { useState } from 'react';
import styled from 'styled-components';

interface MatchInfo {
  date: string;
  time: string;
  location: string;
  participants: number;
}

interface Player {
  name: string;
  level: string;
}

interface TeamAssignment {
  teamName: string;
  players: Player[];
}

interface VenueInfo {
  equipment: string;
  lighting: string;
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

  const getRandomLevel = () => {
    const levels = ['아마추어1', '아마추어2', '아마추어3', '아마추어4', '아마추어5'];
    return levels[Math.floor(Math.random() * levels.length)];
  };

  const [teamAssignments] = useState<TeamAssignment[]>([
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

  const calculateTeamStrength = (players: Player[]) => {
    const levelToScore = {
      '아마추어1': 1,
      '아마추어2': 2,
      '아마추어3': 3,
      '아마추어4': 4,
      '아마추어5': 5
    };
    return players.reduce((sum, player) => sum + levelToScore[player.level], 0);
  };

  const handleTeamReassign = () => {
    // 모든 플레이어를 하나의 배열로 합치기
    const allPlayers = [...teamAssignments[0].players, ...teamAssignments[1].players];
    
    // 레벨 기준으로 플레이어 정렬 (높은 레벨부터)
    allPlayers.sort((a, b) => {
      const levelToScore = {
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

    // 지그재그로 플레이어 분배하여 레벨 균형 맞추기
    allPlayers.forEach((player, index) => {
      if (index % 2 === 0) {
        team1.push(player);
      } else {
        team2.push(player);
      }
    });

    // 새로운 팀 배정으로 상태 업데이트
    setTeamAssignments([
      { teamName: '블루팀', players: team1 },
      { teamName: '레드팀', players: team2 }
    ]);
  };

  const handleMatchStart = () => {
    window.location.href = 'https://plab-design.vercel.app/project/match-assistant';
  };

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
          </Section>
        </>
      ) : (
        <EmergencyGuide>
          {/* 긴급 가이드 내용 */}
        </EmergencyGuide>
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
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 15px 30px;
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

  &:hover {
    background-color: #218838;
  }
`;

const EmergencyGuide = styled.div`
  // 긴급 가이드 스타일
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

export default LeadFlaverProgress; 