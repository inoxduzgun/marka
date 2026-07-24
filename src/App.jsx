import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import Landing from './pages/Landing.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import ProfileWizard from './pages/ProfileWizard.jsx'
import Profile from './pages/Profile.jsx'
import ActorPool from './pages/ActorPool.jsx'
import ActorDetail from './pages/ActorDetail.jsx'
import Castings from './pages/Castings.jsx'
import BrandBrief from './pages/BrandBrief.jsx'
import Admin from './pages/Admin.jsx'
import Kvkk from './pages/Kvkk.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/kayit" element={<Register />} />
        <Route path="/giris" element={<Login />} />
        <Route path="/profil-olustur" element={<ProfileWizard />} />
        <Route path="/profilim" element={<Profile />} />
        <Route path="/havuz" element={<ActorPool />} />
        <Route path="/oyuncu/:id" element={<ActorDetail />} />
        <Route path="/castingler" element={<Castings />} />
        <Route path="/markalar" element={<BrandBrief />} />
        <Route path="/yonetici" element={<Admin />} />
        <Route path="/kvkk" element={<Kvkk />} />
      </Routes>
      </ErrorBoundary>
      <Footer />
    </>
  )
}
