// src/app/page.tsx

import { HeroSection } from '../components/HeroSection';
import { ReservationForm } from '../components/ReservationForm';
import { Footer } from '../components/Footer';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ReservationForm />
      <Footer />
    </>
  );
}