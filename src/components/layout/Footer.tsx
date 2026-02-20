import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const quickLinks = [
  { key: 'transport', href: '/transport' },
  { key: 'hotels', href: '/hotels' },
  { key: 'hospitals', href: '/hospitals' },
  { key: 'dining', href: '/dining' },
];

const companyLinks = [
  { key: 'aboutUs', href: '/about' },
  { key: 'contactUs', href: '/contact' },
  { key: 'privacyPolicy', href: '/privacy' },
  { key: 'termsOfService', href: '/terms' },
];

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
];

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#003366] text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-bold">
                HKG<span className="text-[#0066CC]">.</span>CITY
              </span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0066CC] transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors duration-300 inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-[#0066CC] transition-all duration-300" />
                    {t(`nav.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t('footer.company')}
            </h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors duration-300 inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-[#0066CC] transition-all duration-300" />
                    {t(`footer.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t('footer.contactUs')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#0066CC]" />
                <span>Hong Kong SAR, China</span>
              </li>
              <li>
                <a 
                  href="mailto:info@hkg.city" 
                  className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 flex-shrink-0 text-[#0066CC]" />
                  <span>info@hkg.city</span>
                </a>
              </li>
              <li>
                <a 
                  href="tel:+85200000000" 
                  className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 flex-shrink-0 text-[#0066CC]" />
                  <span>+852 0000 0000</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center sm:text-left">
              {t('footer.copyright')}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-white transition-colors">
                {t('footer.privacyPolicy')}
              </Link>
              <span className="text-gray-600">|</span>
              <Link to="/terms" className="hover:text-white transition-colors">
                {t('footer.termsOfService')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
