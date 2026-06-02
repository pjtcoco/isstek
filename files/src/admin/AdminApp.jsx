import { Routes, Route } from "react-router-dom";

import AdminLayout from "./layout/AdminLayout";

import Dashboard from "./pages/Dashboard";
import News from "./pages/News";
import Photos from "./pages/Photos";
import Enrollments from "./pages/Enrollments";
import Settings from "./pages/Settings";

export default function AdminApp() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/news" element={<News />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/enrollments" element={<Enrollments />} />
      </Routes>
    </AdminLayout>
  );
}
