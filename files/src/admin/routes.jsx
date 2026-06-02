import { Routes, Route } from "react-router-dom";
import AdminLayout from "./admin/layout/AdminLayout";

import Dashboard from "./admin/pages/Dashboard";
import News from "./admin/pages/News";
import Photos from "./admin/pages/Photos";
import Enrollments from "./admin/pages/Enrollments";
import Settings from "./admin/pages/Settings";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="news" element={<News />} />
        <Route path="photos" element={<Photos />} />
        <Route path="enrollments" element={<Enrollments />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
