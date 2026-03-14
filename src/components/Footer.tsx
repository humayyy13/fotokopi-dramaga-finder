import { Link } from "react-router-dom";
import { MapPin, Mail, Phone } from "lucide-react";

const Footer = () => (
  <footer className="bg-sidebar text-sidebar-foreground mt-auto">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 font-bold text-lg mb-3">
            <MapPin className="h-5 w-5 text-sidebar-primary" />
            SIG Photo Copy Dramaga
          </div>
          <p className="text-sidebar-foreground/70 text-sm leading-relaxed">
            Sistem Informasi Geografis untuk menemukan jasa photo copy terdekat di wilayah Dramaga, Bogor.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Navigasi</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="text-sidebar-foreground/70 hover:text-sidebar-primary transition-colors">Beranda</Link></li>
            <li><Link to="/map" className="text-sidebar-foreground/70 hover:text-sidebar-primary transition-colors">Peta</Link></li>
            <li><Link to="/about" className="text-sidebar-foreground/70 hover:text-sidebar-primary transition-colors">Tentang</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Kontak</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2 text-sidebar-foreground/70">
              <Mail className="h-4 w-4" /> info@sigphotocopy.id
            </li>
            <li className="flex items-center gap-2 text-sidebar-foreground/70">
              <Phone className="h-4 w-4" /> +62 812 3456 7890
            </li>
            <li className="flex items-center gap-2 text-sidebar-foreground/70">
              <MapPin className="h-4 w-4" /> Dramaga, Bogor, Jawa Barat
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-sidebar-border mt-8 pt-6 text-center text-sm text-sidebar-foreground/50">
        © 2026 SIG Photo Copy Dramaga. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
