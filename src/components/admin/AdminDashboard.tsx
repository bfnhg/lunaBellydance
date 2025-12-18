// src/components/admin/AdminDashboard.tsx

import { useState } from 'react';
import { Download, Mail, Lock } from 'lucide-react';

export default function AdminDashboard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  // === CHANGE CES DEUX LIGNES AVEC TES VRAIES INFOS ===
  const ADMIN_EMAIL = 'test@test';
  const ADMIN_PASSWORD = 'test';
  // ===================================================

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('luna_admin_authenticated', 'true');
    } else {
      setError('Email ou mot de passe incorrect.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
    localStorage.removeItem('luna_admin_authenticated');
  };

  // Vérifie si déjà authentifiée au chargement
  useState(() => {
    if (localStorage.getItem('luna_admin_authenticated') === 'true') {
      setIsAuthenticated(true);
    }
  });

  const downloadExcel = async () => {
    const rawData = localStorage.getItem('luna_reservations');
    if (!rawData || rawData === '[]') {
      alert('Aucune réservation pour le moment !');
      return;
    }

    const reservations = JSON.parse(rawData);

    const { utils, writeFile } = await import('xlsx');

    const worksheetData = reservations.map((res: any) => ({
      Nom: res.full_name || `${res.first_name} ${res.last_name}`.trim(),
      Email: res.email,
      Téléphone: res.phone,
      'Date souhaitée': res.preferred_date || '-',
      'Veut payer avance': res.wants_advance ? 'Oui' : 'Non',
      Message: res.message || '-',
      'Soumise le': new Date(res.submittedAt).toLocaleString('fr-FR'),
    }));

    const ws = utils.json_to_sheet(worksheetData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Réservations Luna');

    ws['!cols'] = [30, 30, 20, 18, 18, 50, 25].map(wch => ({ wch }));

    const fileName = `reservations_luna_${new Date().toISOString().slice(0, 10)}.xlsx`;
    writeFile(wb, fileName);
  };

  // Calcul du nombre de réservations
  const rawData = localStorage.getItem('luna_reservations');
  const reservations = rawData ? JSON.parse(rawData) : [];
  const totalReservations = reservations.length;

  // Écran de connexion
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="bg-white/10 backdrop-blur-xl border border-amber-500/30 rounded-3xl p-12 shadow-2xl max-w-md w-full">
          <h2 className="text-4xl font-bold text-center text-amber-100 mb-10">
            Espace Admin Luna Studio
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-3">
              <label className="flex items-center text-amber-200/90 font-medium text-lg">
                <Mail className="w-5 h-5 mr-3" />
                Adresse email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="luna@gmail.com"
                className="w-full px-6 py-4 bg-white/10 border border-amber-500/50 rounded-xl text-white placeholder-gray-400 focus:ring-4 focus:ring-amber-500/50 focus:border-amber-500 outline-none"
              />
            </div>

            <div className="space-y-3">
              <label className="flex items-center text-amber-200/90 font-medium text-lg">
                <Lock className="w-5 h-5 mr-3" />
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-6 py-4 bg-white/10 border border-amber-500/50 rounded-xl text-white placeholder-gray-400 focus:ring-4 focus:ring-amber-500/50 focus:border-amber-500 outline-none"
              />
            </div>

            {error && (
              <p className="text-red-400 text-center font-medium">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-xl font-semibold rounded-xl shadow-lg hover:from-amber-500 hover:to-orange-500 transform hover:scale-105 transition-all duration-300"
            >
              Se connecter
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-8">
            Accès réservé à Luna uniquement
          </p>
        </div>
      </div>
    );
  }

  // Dashboard après connexion
  return (
    <div className="min-h-screen bg-black py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-amber-100 to-amber-500 drop-shadow-2xl">
            Tableau de bord Luna
          </h1>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-red-400 underline"
          >
            Déconnexion
          </button>
        </div>

        {/* === AFFICHAGE DU NOMBRE DE RÉSERVATIONS === */}
        <div className="bg-amber-500/10 border border-amber-500/40 rounded-2xl p-6 mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-100">
            {totalReservations === 0 
              ? 'Aucune réservation pour le moment' 
              : totalReservations === 1 
              ? '1 réservation reçue ✨' 
              : `${totalReservations} réservations reçues ✨`
            }
          </h2>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-10">
          <div className="text-center mb-12">
            <button
              onClick={downloadExcel}
              className="inline-flex items-center gap-4 px-10 py-6 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-2xl font-bold rounded-xl shadow-2xl hover:from-amber-500 hover:to-orange-500 transform hover:scale-105 transition-all duration-300"
            >
              <Download className="w-8 h-8" />
              Télécharger les réservations (Excel)
            </button>
          </div>

          <div className="border-t border-white/10 pt-10">
            <h3 className="text-3xl text-amber-200 mb-8 text-center">
              Détail des réservations
            </h3>
            {totalReservations > 0 ? (
              <div className="bg-black/40 p-8 rounded-xl overflow-auto max-h-96 border border-amber-500/20">
                <pre className="text-amber-100 text-sm leading-relaxed">
                  {JSON.stringify(reservations, null, 2)}
                </pre>
              </div>
            ) : (
              <p className="text-center text-gray-400 text-xl py-12">
                En attente de la première réservation...
              </p>
            )}
          </div>

          <p className="text-center text-gray-500 text-sm mt-10">
            Connectée en tant que : <span className="text-amber-300 font-medium">{ADMIN_EMAIL}</span><br />
            Tout est stocké localement dans ton navigateur • 100% privé
          </p>
        </div>
      </div>
    </div>
  );
}