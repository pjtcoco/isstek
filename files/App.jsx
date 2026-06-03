import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../files/src/admin/ProtectedRoute.jsx";
import AdminLogin from "./src/admin/pages/AdminLogin.jsx";
import NavBar from "./NavBar.jsx";
import HeroSection from "./HeroSection.jsx";
import AboutSection from "./AboutSection.jsx";
import ProgramsSection from "./ProgramsSection.jsx";
import PartnersSection from "./PartnersSection.jsx";
import ScholarshipsSection from "./ScholarshipsSection.jsx";
import OpenDoorsSection from "./OpenDoorsSection.jsx";
import StaffSection from "./StaffSection.jsx";
import ContactSection from "./ContactSection.jsx";
import Footer from "./Footer.jsx";
import AdminApp from "./src/admin/AdminApp.jsx";
import { useAuth } from "../files/src/hooks/useAuth.js";
import Programs from "./programs/programs.jsx";
import ProgramDetails from "./programs/ProgramDetails.jsx";
/* ───────── PUBLIC HOME ───────── */

function Home({ lang, setLang }) {
  return (
    <>
      <NavBar lang={lang} setLang={setLang} />
      <HeroSection lang={lang} />
      <AboutSection lang={lang} />
      <ProgramsSection lang={lang} />
      <PartnersSection lang={lang} />
      <ScholarshipsSection lang={lang} />
      <OpenDoorsSection lang={lang} />
      <StaffSection lang={lang} />
      <ContactSection lang={lang} />
      <Footer lang={lang} />
    </>
  );
}

/* ───────── APP ROUTER ───────── */

export default function App() {
  const [lang, setLang] = useState("fr");

  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC SITE */}
        <Route path="/" element={<Home lang={lang} setLang={setLang} />} />

        {/* ADMIN LOGIN */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ADMIN DASHBOARD (PROTECTED) */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminApp />
            </ProtectedRoute>
          }
        />
        <Route path="/programs" element={<Programs />} />

        <Route path="/programs/:slug" element={<ProgramDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
