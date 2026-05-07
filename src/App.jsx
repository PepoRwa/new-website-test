import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const News = lazy(() => import('./pages/News'));
const NewsPost = lazy(() => import('./pages/NewsPost'));
const Staff = lazy(() => import('./pages/Staff'));
const CEO = lazy(() => import('./pages/CEO'));
const Profiles = lazy(() => import('./pages/Profiles'));
const MemberProfile = lazy(() => import('./pages/MemberProfile'));
const Roster = lazy(() => import('./pages/Roster'));
const RosterValorant = lazy(() => import('./pages/RosterValorant'));
const RosterCS2 = lazy(() => import('./pages/RosterCS2'));
const Calendar = lazy(() => import('./pages/Calendar'));
const Partners = lazy(() => import('./pages/Partners'));
const Contact = lazy(() => import('./pages/Contact'));
const Join = lazy(() => import('./pages/Join'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
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
      </Suspense>
    </BrowserRouter>
  );
}
