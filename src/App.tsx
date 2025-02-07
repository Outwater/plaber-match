import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MatchList from "./pages/MatchList";
import MatchDetail from "./pages/MatchDetail";
import MatchComplete from "./pages/MatchComplete";
import LeadPlaberProgress from "./pages/LeadPlaberProgress";

function App() {
  return (
    <Router>
      <Routes>
        {/* 홈화면에서 MatchList 표시 */}
        <Route path="/" element={<LeadPlaberProgress />} />
        
        {/* 매치 리스트 페이지 */}
        <Route path="/matches" element={<MatchList />} />
        
        {/* 매치 상세 페이지 */}
        <Route path="/matches/:matchId" element={<MatchDetail />} />
        
        {/* 매치 신청 완료 페이지 */}
        <Route path="/matches/:matchId/complete" element={<MatchComplete />} />
        
        {/* 리드 플래버 진행 페이지 */}
        <Route path="/matches/:matchId/lead-plaber" element={<LeadPlaberProgress />} />
      </Routes>
    </Router>
  );
}

export default App;
