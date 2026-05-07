import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import StarField from './StarField';
import BootScreen from './BootScreen';
import CustomCursor from './CustomCursor';

export default function Layout() {
  const [booting, setBooting] = useState(() => !sessionStorage.getItem('grx_boot'));

  const handleBootComplete = () => {
    sessionStorage.setItem('grx_boot', '1');
    setBooting(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', background: 'var(--abyss)' }}>
      <CustomCursor />
      <StarField />
      {booting && <BootScreen onComplete={handleBootComplete} />}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1, paddingTop: 60 }}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
