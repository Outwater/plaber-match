import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface Match {
  id: string;
  type: 'social' | 'tshirt' | 'flaver';
  title: string;
  date: string;
  time: string;
  location: string;
}

const MatchList = () => {
  const navigate = useNavigate();
  // 더미 데이터 추가
  const [matches] = useState<Match[]>([
    {
      id: '1',
      type: 'social',
      title: '소셜 매치',
      date: '2024-03-20',
      time: '19:00',
      location: '서울 축구장'
    },
    {
      id: '2',
      type: 'tshirt',
      title: '티셔츠 매치',
      date: '2024-03-21',
      time: '20:00',
      location: '강남 풋살장'
    },
    {
      id: '3',
      type: 'flaver',
      title: '플래버 매치',
      date: '2024-03-22',
      time: '21:00',
      location: '홍대 풋살장'
    }
  ]);

  const handleMatchClick = (matchId: string) => {
    navigate(`/matches/${matchId}`);
  };

  return (
    <Container>
      <MatchTypeList>
        {matches.map((match) => (
          <MatchCard 
            key={match.id} 
            onClick={() => handleMatchClick(match.id)}
          >
            <MatchTypeImage type={match.type} />
            <MatchInfo>
              <h3>{match.title}</h3>
              <p>{match.date} {match.time}</p>
              <p>{match.location}</p>
            </MatchInfo>
          </MatchCard>
        ))}
      </MatchTypeList>
    </Container>
  );
};

export default MatchList;

const Container = styled.div`
  padding: 20px;
`;

const MatchTypeList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const MatchCard = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const MatchTypeImage = styled.div<{ type: string }>`
  height: 200px;
  background-image: ${({ type }) => `url(/images/${type}-match.jpg)`};
  background-size: cover;
  background-position: center;
`;

const MatchInfo = styled.div`
  padding: 15px;
`; 