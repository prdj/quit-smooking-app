import { useContext } from 'react';
import { Routes, Route ,Link, useLocation} from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Goals from './pages/Goals';
import Progress from './pages/Progress';
import User from './pages/User';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { RegisterProvider } from './context/SignUpContext';
import Survey from './pages/Survey';
import ProtectRoutes from './pages/ProtectRoutes';
import withAuthProtection from './components/withAuthProtection';
import { ProfileContext } from './context/ProfileContext';
import MatchTheCardsGame from './pages/CardGame'
import LandingPage from './pages/LandingPage';


const ProtectedDashboard = withAuthProtection(Dashboard);
const ProtectedGoals = withAuthProtection(Goals);
const ProtectedProgress = withAuthProtection(Progress);
const ProtectedUser = withAuthProtection(User);
const ProtectedSurvey = withAuthProtection(Survey);
const ProtectedGame = withAuthProtection(MatchTheCardsGame)
const App = () => {
  const { isLoggedIn } = useContext(ProfileContext);

  const location = useLocation();
  const isSurveyPage = location.pathname.includes('/me/survey');
  const isLandingPage =location.pathname.includes('')
  console.log(isLandingPage)
  return (
    
    <div className="flex flex-col h-screen ">
      <div className="flex-grow">
     {isLoggedIn && !isSurveyPage &&  <Link
    to="/me/cardgame"
    className="bg-yellow-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >
    Play a Game
  </Link>}

       <Routes>
          <Route path='/me' element={<ProtectRoutes />}>
          <Route path="dashboard" element={<Dashboard />} />
            <Route path="goals" element={<Goals />} />
            <Route path="progress" element={<Progress />} />
            <Route path="user" element={<User />} />
           <Route path="survey" element={<Survey />} />
            <Route path="cardgame" element={<MatchTheCardsGame />} />
          </Route>
          <Route
            path="/signup"
            element={
              <RegisterProvider>
                <SignUp />
              </RegisterProvider>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<LandingPage />}/>  
          
        </Routes>
      </div>
      
      {isLoggedIn && <Navbar />}
    </div>
  );
};

export default App;
