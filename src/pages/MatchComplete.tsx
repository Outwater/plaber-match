import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

interface LeadFlaver {
  id: string;
  name: string;
  level: string;
  image: string;
}

interface Team {
  id: string;
  name: string;
  players: string[];
}

const MatchComplete = () => {
  const { matchId } = useParams();
  const [showTeam, setShowTeam] = useState(false);

  const leadFlavers: LeadFlaver[] = [];  // 빈 배열로 초기화

  const myTeam: Team = {
    id: '1',
    name: '팀A',
    players: ['플레이어1', '플레이어2']
  };

  useEffect(() => {
    // 매치 시작 5분 전인지 체크
    const checkMatchTime = () => {
      // 매치 시작 시간과 현재 시간 비교
      const now = new Date();
      const matchTime = new Date(); // API에서 매치 시작 시간 받아오기
      const timeDiff = matchTime.getTime() - now.getTime();
      
      if (timeDiff <= 5 * 60 * 1000) { // 5분 이하 남았을 때
        setShowTeam(true);
      }
    };

    const timer = setInterval(checkMatchTime, 30000); // 30초마다 체크
    return () => clearInterval(timer);
  }, [matchId]);

  const handleLeadFlaverApply = async () => {
    if (leadFlavers.length >= 2) {
      alert('이미 리드 플래버가 모두 배정되었습니다.');
      return;
    }
    // 리드 플래버 신청 API 호출
  };

  return (
    <Container>
      <Section>
        <h2>리드 플래버 정보</h2>
        <FlaverList>
          {leadFlavers.map(flaver => (
            <FlaverCard key={flaver.id}>
              <FlaverImage src={flaver.image} alt={flaver.name} />
              <FlaverInfo>
                <h3>{flaver.name}</h3>
                <p>레벨: {flaver.level}</p>
              </FlaverInfo>
            </FlaverCard>
          ))}
        </FlaverList>
        {leadFlavers.length < 2 && (
          <ApplyButton onClick={handleLeadFlaverApply}>
            리드 플래버 신청하기
          </ApplyButton>
        )}
      </Section>

      {showTeam && myTeam && (
        <Section>
          <h2>나의 팀 정보</h2>
          <TeamInfo>
            <h3>{myTeam.name}</h3>
            <PlayerList>
              {myTeam.players.map(player => (
                <li key={player}>{player}</li>
              ))}
            </PlayerList>
          </TeamInfo>
        </Section>
      )}
    </Container>
  );
};

export default MatchComplete;

const Container = styled.div`
  padding: 20px;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const FlaverList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const FlaverCard = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
`;

const FlaverImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const FlaverInfo = styled.div`
  padding: 15px;
`;

const ApplyButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const TeamInfo = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
`;

const PlayerList = styled.ul`
  list-style: none;
  padding: 0;
`; 