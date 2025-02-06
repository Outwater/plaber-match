import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const MatchDetail = () => {
  const { matchId } = useParams();
  const [hasLeadFlaver, setHasLeadFlaver] = useState(false);

  useEffect(() => {
    // 리드 플래버 배정 여부 체크
    checkLeadFlaverAssignment();
  }, [matchId]);

  const checkLeadFlaverAssignment = async () => {
    // TODO: API 호출하여 리드 플래버 배정 여부 확인
    const mockAssigned = false; // API 응답 대체
    setHasLeadFlaver(mockAssigned);
  };

  return (
    <Container>
      {!hasLeadFlaver && (
        <WarningBanner>
          ⚠️ 리드 플래버 미배정 시 매치가 자동으로 취소됩니다.
        </WarningBanner>
      )}
      
      <Section>
        <h2>플래버 매치 특징</h2>
        <FeatureList>
          <li>전문 리드 플래버의 진행</li>
          <li>체계적인 로테이션</li>
          <li>균형잡힌 팀 배정</li>
        </FeatureList>
      </Section>

      <Section>
        <h2>안내사항</h2>
        <GuideList>
          {/* 안내사항 내용 */}
        </GuideList>
      </Section>
    </Container>
  );
};

export default MatchDetail;

const Container = styled.div`
  padding: 20px;
`;

const WarningBanner = styled.div`
  background-color: #fff3cd;
  color: #856404;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const Section = styled.section`
  margin-bottom: 30px;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
`;

const GuideList = styled.ul`
  list-style: none;
  padding: 0;
`; 