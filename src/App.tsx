import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AgenticAIFeature from './components/AgenticAIFeature';
import ChatbotWidget from './components/ChatbotWidget';
import Features from './components/Features';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import LoginModal from './components/LoginModal';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ConsultationPage from './pages/ConsultationPage'; // ✅ Added
import VideoCallPage from './pages/VideoCallPage';       // ✅ Added

function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginClick = () => setShowLoginModal(true);
  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <div className="min-h-screen bg-[#FDFDFB]">
      <Header
        isLoggedIn={isLoggedIn}
        onLoginClick={handleLoginClick}
        onLogoutClick={handleLogout}
      />
      <Hero />
      <Features />
      <AgenticAIFeature />
      <Footer />
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
      <ChatbotWidget />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/consultations" element={<ConsultationPage />} />       {/* ✅ Added */}
        <Route path="/consultation/:id" element={<VideoCallPage />} />       {/* ✅ Added */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;