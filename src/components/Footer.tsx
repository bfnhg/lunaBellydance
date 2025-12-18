import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-amber-400 mb-4">LUNA</h3>
            <p className="text-gray-400 leading-relaxed">
              Experience the art and beauty of belly dance with passionate instruction and graceful movement.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>luna@bellydance.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>123 Dance Street, City</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="#about" className="block text-gray-400 hover:text-amber-400 transition-colors">
                About
              </a>
              <a href="#reservation" className="block text-gray-400 hover:text-amber-400 transition-colors">
                Book a Class
              </a>
              <a href="/admin" className="block text-gray-400 hover:text-amber-400 transition-colors">
                Admin Login
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Luna Belly Dance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
