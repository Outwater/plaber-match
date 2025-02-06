import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface EmergencyGuide {
  title: string;
  content: string;
}

interface TeamAssignment {
  teamName: string;
  players: string[];
}

const LeadFlaverProgress = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [showRotationManual, setShowRotationManual] = useState(false);

  const emergencyGuides: EmergencyGuide[] = [
    {
      title: '플래버 지각/불참 시',
      content: '매치 시작 15분 전까지 연락이 되지 않는 경우, 운영팀에 즉시 연락해주세요.'
    },
    {
      title: '구장 시설 안내',
      content: '조명 스위치 위치: 출입구 우측, 장비보관함: 화장실 옆'
    }
  ];

  const teamAssignments: TeamAssignment[] = [
    { teamName: 'A팀', players: ['플레이어1', '플레이어2'] },
    { teamName: 'B팀', players: ['플레이어3', '플레이어4'] }
  ];

  const handleMatchEnd = async () => {
    if (window.confirm('매치를 종료하시겠습니까?')) {
      // 매치 종료 API 호출
      navigate(`/matches/${matchId}/report`); // 특이사항 작성 페이지로 이동
    }
  };

  return (
    <Container>
      <Section>
        <h2>긴급 가이드</h2>
        <GuideList>
          {emergencyGuides.map((guide, index) => (
            <GuideItem key={index}>
              <h3>{guide.title}</h3>
              <p>{guide.content}</p>
            </GuideItem>
          ))}
        </GuideList>
      </Section>

      <Section>
        <h2>팀 배정</h2>
        <TeamGrid>
          {teamAssignments.map((team, index) => (
            <TeamCard key={index}>
              <h3>{team.teamName}</h3>
              <PlayerList>
                {team.players.map((player, idx) => (
                  <li key={idx}>{player}</li>
                ))}
              </PlayerList>
            </TeamCard>
          ))}
        </TeamGrid>
      </Section>

      <Section>
        <h2>매치 어시스턴트</h2>
        <AssistantButton 
          onClick={() => setShowRotationManual(!showRotationManual)}
        >
          로테이션 메뉴얼 {showRotationManual ? '닫기' : '보기'}
        </AssistantButton>
        {showRotationManual && (
          <RotationManual>
            {/* 로테이션 메뉴얼 내용 */}
          </RotationManual>
        )}
      </Section>

      <EndMatchButton onClick={handleMatchEnd}>
        매치 종료하기
      </EndMatchButton>
    </Container>
  );
};

export default LeadFlaverProgress;

const Container = styled.div`
  padding: 20px;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const GuideList = styled.div`
  display: grid;
  gap: 20px;
`;

const GuideItem = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const TeamCard = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
`;

const PlayerList = styled.ul`
  list-style: none;
  padding: 0;
`;

const AssistantButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #218838;
  }
`;

const RotationManual = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

const EndMatchButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-size: 1.1em;
  
  &:hover {
    background-color: #c82333;
  }
`; 