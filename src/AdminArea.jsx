import { Routes, Route } from 'react-router-dom';
import AdminProjects from './components/AdminProjects';
import AdminMessages from './components/AdminMessages';
import './App.css';

/** Admin pages keep their original light styling (App.css), loaded only on /admin. */
export default function AdminArea() {
  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <Routes>
        <Route index element={<AdminProjects />} />
        <Route path="messages" element={<AdminMessages />} />
      </Routes>
    </div>
  );
}
