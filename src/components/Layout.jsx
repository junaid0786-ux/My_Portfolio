import React, { useEffect, useState } from 'react';

export default function Layout({ children }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[999] transition-all duration-500 ${
          scrolled
            ? 'bg-black/60 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-center items-center">
          <nav className="flex gap-10">
            {[
              { label: 'Home',       href: '#journey' },
              { label: 'Skills',     href: '#skills' },
              { label: 'Projects',   href: '#projects' },
              { label: 'Contact',    href: '#contact' },
            ].map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="relative text-xs uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors duration-300
                  after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-neon-cyan
                  after:transition-all after:duration-300 hover:after:w-full"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
}
