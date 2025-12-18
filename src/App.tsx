// src/App.tsx

import { HeroSection } from './components/HeroSection';
import { ReservationForm } from './components/ReservationForm';
import { Footer } from './components/Footer';
import AdminDashboard  from './components/admin/AdminDashboard'; // ← Ton dashboard avec mot de passe local

function App() {
  const isAdminRoute = window.location.pathname.startsWith('/admin');

  // Si on est sur la route /admin → on affiche directement le dashboard avec sa propre protection locale
  if (isAdminRoute) {
    return <AdminDashboard />;
  }

  // Sinon, page normale du site
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ReservationForm />
      <Footer />
    </div>
  );
}

export default App;