import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface MatchInfo {
  date: string;
  time: string;
  location: string;
  participants: number;
}

interface TeamAssignment {
  teamName: string;
  players: string[];
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
    participants: 12
  });

  const [venueInfo] = useState<VenueInfo>({
    equipment: '조끼/공 보관함 위치: 출입구 우측 사물함',
    lighting: '조명 스위치: 구장 입구 좌측 벽면'
  });

  const [teamAssignments] = useState<TeamAssignment[]>([
    { teamName: 'A팀', players: ['플레이어1', '플레이어2', '플레이어3'] },
    { teamName: 'B팀', players: ['플레이어4', '플레이어5', '플레이어6'] }
  ]);

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
            <InfoGrid>
              <InfoCard>
                <h3>매치 정보</h3>
                <InfoList>
                  <InfoItem>📅 {matchInfo.date}</InfoItem>
                  <InfoItem>⏰ {matchInfo.time}</InfoItem>
                  <InfoItem>📍 {matchInfo.location}</InfoItem>
                  <InfoItem>👥 {matchInfo.participants}명</InfoItem>
                </InfoList>
              </InfoCard>
              <InfoCard>
                <h3>구장 정보</h3>
                <InfoList>
                  <InfoItem>🎽 {venueInfo.equipment}</InfoItem>
                  <InfoItem>💡 {venueInfo.lighting}</InfoItem>
                </InfoList>
              </InfoCard>
            </InfoGrid>
          </Section>

          <Section>
            <SectionTitle>매치 준비하기</SectionTitle>
            <TeamGrid>
              {teamAssignments.map((team, index) => (
                <TeamCard key={index}>
                  <TeamTitle>{team.teamName}</TeamTitle>
                  <PlayerList>
                    {team.players.map((player, idx) => (
                      <PlayerItem key={idx}>{player}</PlayerItem>
                    ))}
                  </PlayerList>
                </TeamCard>
              ))}
            </TeamGrid>
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
`;

const Tab = styled.button<{ active: boolean }>`
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

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const InfoCard = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  
  h3 {
    margin: 0 0 15px 0;
    font-size: 18px;
  }
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InfoItem = styled.div`
  font-size: 16px;
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

const TeamTitle = styled.h3`
  margin: 0 0 15px 0;
  font-size: 20px;
  color: #007bff;
`;

const PlayerList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const PlayerItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #dee2e6;
  
  &:last-child {
    border-bottom: none;
  }
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

export default LeadFlaverProgress; 