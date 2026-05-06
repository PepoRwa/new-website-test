import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import News from './pages/News';
import NewsPost from './pages/NewsPost';
import Staff from './pages/Staff';
import CEO from './pages/CEO';
import Profiles from './pages/Profiles';
import MemberProfile from './pages/MemberProfile';
import Roster from './pages/Roster';
import RosterValorant from './pages/RosterValorant';
import RosterCS2 from './pages/RosterCS2';
import Calendar from './pages/Calendar';
import Partners from './pages/Partners';
import Contact from './pages/Contact';
import Join from './pages/Join';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:slug" element={<NewsPost />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/profiles/:id" element={<MemberProfile />} />
          <Route path="/roster" element={<Roster />} />
          <Route path="/roster/valorant" element={<RosterValorant />} />
          <Route path="/roster/cs2" element={<RosterCS2 />} />
          <Route path="/roster/calendar" element={<Calendar />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact/join" element={<Join />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* CEO — standalone full-screen experience */}
        <Route path="/ceo" element={<CEO />} />
      </Routes>
    </BrowserRouter>
  );
}
