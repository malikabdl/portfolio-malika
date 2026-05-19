import { useState, useEffect, useRef } from 'react';
import profilePhoto from './profile-photo';

type Theme = 'dark' | 'light';

const useScrollReveal = () => {
    const ref = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return { ref, isVisible };
};

const RevealSection = ({ children, style, id, delay = 0 }: { children: React.ReactNode; style?: React.CSSProperties; id?: string; delay?: number }) => {
    const { ref, isVisible } = useScrollReveal();
    return (
        <section
            ref={ref as React.RefObject<HTMLElement>}
            id={id}
            style={{
                ...style,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
            }}
        >
            {children}
        </section>
    );
};

const RevealItem = ({ children, style, delay = 0 }: { children: React.ReactNode; style?: React.CSSProperties; delay?: number }) => {
    const { ref, isVisible } = useScrollReveal();
    return (
        <div
            ref={ref as React.RefObject<HTMLDivElement>}
            style={{
                ...style,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
            }}
        >
            {children}
        </div>
    );
};

const AnimatedCounter = ({ target, suffix, color }: { target: number; suffix: string; color: string }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    const duration = 1500;
                    const steps = 40;
                    const increment = target / steps;
                    let current = 0;
                    const interval = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            setCount(target);
                            clearInterval(interval);
                        } else {
                            setCount(Math.floor(current));
                        }
                    }, duration / steps);
                }
            },
            { threshold: 0.5 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [hasAnimated, target]);

    return (
        <div ref={ref} style={{ fontSize: '2rem', fontWeight: 700, color }}>
            {count}{suffix}
        </div>
    );
};

const themes = {
    dark: {
        navBg: '#1a1a2e',
        navText: '#ccc',
        heroBg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        heroText: '#fff',
        heroSub: '#b0b0c0',
        accent: '#00d4ff',
        pageBg: '#121a2a',
        sectionAltBg: '#0f1520',
        cardBg: '#1e2a3a',
        cardShadow: '0 4px 15px rgba(0,0,0,0.3)',
        headingColor: '#e8ecf0',
        textColor: '#b0bec5',
        textMuted: '#8899a6',
        tagBg: '#0f3460',
        tagColor: '#00d4ff',
        progressionBg: '#1e2a3a',
        contactBg: 'linear-gradient(135deg, #1a1a2e, #0f3460)',
        contactText: '#fff',
        contactMuted: '#b0b0c0',
        contactCardBg: 'rgba(255,255,255,0.05)',
        contactCardBorder: 'rgba(0,212,255,0.2)',
        footerBg: '#0d0d1a',
        footerText: '#777',
        titleColor: '#00d4ff',
        borderLight: '#2a3a4a',
    },
    light: {
        navBg: '#ffffff',
        navText: '#555',
        heroBg: 'linear-gradient(135deg, #e8f4fd 0%, #d4ecfc 50%, #c0e4fb 100%)',
        heroText: '#1a1a2e',
        heroSub: '#555',
        accent: '#0077b6',
        pageBg: '#ffffff',
        sectionAltBg: '#f8fafe',
        cardBg: '#ffffff',
        cardShadow: '0 4px 15px rgba(0,0,0,0.08)',
        headingColor: '#1a1a2e',
        textColor: '#444',
        textMuted: '#666',
        tagBg: '#e8f4fd',
        tagColor: '#0077b6',
        progressionBg: '#f8fafe',
        contactBg: 'linear-gradient(135deg, #0077b6, #023e8a)',
        contactText: '#fff',
        contactMuted: '#d0e8f5',
        contactCardBg: 'rgba(255,255,255,0.1)',
        contactCardBorder: 'rgba(255,255,255,0.3)',
        footerBg: '#1a1a2e',
        footerText: '#999',
        titleColor: '#0077b6',
        borderLight: '#e8e8e8',
    },
};

type Lang = 'id' | 'en';

const i18n = {
    id: {
        heroDesc: 'Profesional IT yang dinamis dengan keahlian yang beragam dan komprehensif, berfokus pada SAP ABAP. Keterampilan kuat dalam Analisis, Pemecahan Masalah, dan Penyelesaian Pekerjaan untuk memastikan sistem SAP berjalan efisien dan sesuai dengan kebutuhan bisnis.',
        contactBtn: 'Hubungi Saya',
        expBtn: 'Lihat Pengalaman',
        aboutTitle: 'Tentang Saya',
        profileTitle: '🎯 Profil',
        profileDesc: 'SAP ABAP Developer & Techno-Functional Consultant dengan pengalaman 7+ tahun. Berpengalaman dalam enhancement, development, troubleshooting, dan implementasi di modul SD, FICO, FM, dan HC. Terbiasa bekerja dengan tim implementor dan end-user.',
        eduTitle: '📚 Pendidikan',
        statYears: 'Tahun Pengalaman',
        statCompanies: 'Perusahaan',
        statProjects: 'Project Besar',
        statEnhancements: 'Enhancement',
        skillsTitle: 'Keahlian Teknis',
        expTitle: 'Pengalaman Kerja',
        dailySupport: 'Dukungan Harian:',
        keyEnhancements: 'Enhancement Utama:',
        keyEnhancementsProject: 'Enhancement & Project Utama:',
        projectsTitle: 'Sorotan Project',
        trainingTitle: 'Training & Sertifikasi',
        auditTitle: '🔍 Pengalaman Audit',
        auditDesc: 'Melakukan Audit PWC tahunan — menyediakan kebutuhan, meminimalkan temuan, dan menindaklanjuti hasil audit.',
        contactTitle: 'Hubungi Saya',
        contactDesc: 'Tertarik untuk berkolaborasi atau memiliki proyek SAP? Jangan ragu untuk menghubungi saya.',
        contactLocation: 'Lokasi',
        footer: '© 2026 Malik Abdul Aziz. SAP ABAP Developer & Techno-Functional Consultant.',
        careerGrowth: '7+ tahun pertumbuhan profesional berkelanjutan di ekosistem SAP',
        exp1Daily: ['SAP Techno-Functional Consultant', 'Menganalisis, Troubleshooting & Debugging untuk Divisi Akuntansi, Keuangan, Anggaran, Penjualan & HC', 'Meningkatkan & Mengembangkan sistem untuk proses yang lebih baik di semua modul', 'Memelihara konfigurasi Modul SAP SD, FICO, FM', 'Membuat desain spesifikasi fungsional & skenario UAT'],
        exp2Daily: ['Menganalisis, Troubleshooting & Debugging untuk Dept. Keuangan dan Pabrik Produksi', 'Meningkatkan & Mengembangkan sistem untuk Pabrik Produksi', 'Membuat otorisasi objek dan menetapkan ke role', 'Transport CR ke SAP Production'],
        p1Desc: 'Bekerja erat di Modul SD — Membuat API dari sisi SAP, membantu Unit Test, UAT, dan persiapan Data Master & Transaksi.',
        p2Desc: 'Bekerja erat di Modul FICO & HC — Mengkonfigurasi Special GL untuk Travel Journal Accounting, membuat program kustom yang mengintegrasikan Travel Management HCM dengan Payment Proposal Treasury, memeriksa konfigurasi & RICEF oleh Implementer.',
        p3Desc: 'Bekerja erat di Modul SD, FICO, FM — Membantu rapat antara User dan Implementer, memeriksa Konfigurasi & RICEFW, migrasi data & saldo awal, dukungan go-live.',
        p4Desc: 'Memeriksa RICEF oleh implementor, membantu UAT, migrasi data & saldo awal, perbaikan program kustom & exit saat go-live.',
        p5Desc: 'Membuat program kustom untuk menghubungkan data pembelian spare parts dari Traknus ke Perkins untuk analisis dan laporan pelacakan pesanan.',
        p6Desc: 'Proyek digitalisasi dan diferensiasi yang menggabungkan platform SAP dan Salesforce.',
    },
    en: {
        heroDesc: 'A dynamic IT professional with a diverse and comprehensive skill set, focused on SAP ABAP. Strong skills in Analysis, Problem Solving, and Work Completion to ensure SAP systems run efficiently and in accordance with business needs.',
        contactBtn: 'Contact Me',
        expBtn: 'View Experience',
        aboutTitle: 'About Me',
        profileTitle: '🎯 Profile',
        profileDesc: 'SAP ABAP Developer & Techno-Functional Consultant with 7+ years of experience. Experienced in enhancement, development, troubleshooting, and implementation across SD, FICO, FM, and HC modules. Accustomed to working with implementors and end-users.',
        eduTitle: '📚 Education',
        statYears: 'Years Experience',
        statCompanies: 'Companies',
        statProjects: 'Major Projects',
        statEnhancements: 'Enhancements',
        skillsTitle: 'Technical Skills',
        expTitle: 'Work Experience',
        dailySupport: 'Daily Support:',
        keyEnhancements: 'Key Enhancements:',
        keyEnhancementsProject: 'Key Enhancements & Project:',
        projectsTitle: 'Project Highlights',
        trainingTitle: 'Training & Certification',
        auditTitle: '🔍 Audit Experience',
        auditDesc: 'Conduct annual PWC Audit — provide requirements, minimize findings, and follow up on audit results.',
        contactTitle: 'Contact Me',
        contactDesc: 'Interested in collaborating or have an SAP project? Feel free to reach out.',
        contactLocation: 'Location',
        footer: '© 2026 Malik Abdul Aziz. SAP ABAP Developer & Techno-Functional Consultant.',
        careerGrowth: '7+ years of continuous professional growth in SAP ecosystem',
        exp1Daily: ['SAP Techno-Functional Consultant', 'Analyzing, Troubleshooting & Debugging for Accounting, Finance, Budget, Sales & HC Division', 'Enhance & Develop system for better process in all modules', 'Maintain configuration of SAP SD, FICO, FM Module', 'Create functional spec design & UAT scenarios'],
        exp2Daily: ['Analyzing, Troubleshooting & Debugging for Finance Dept and Production Plant', 'Enhance & Develop system for Production Plant', 'Create object authorization and assign to role', 'Transport CR to SAP Production'],
        p1Desc: 'Working closely in SD Module — Create API from SAP Side, assist in Unit Test, UAT, and preparation of Master & Transaction Data.',
        p2Desc: 'Working closely in FICO & HC Module — Configure Special GL for Travel Journal Accounting, create custom program integrating Travel Management HCM with Payment Proposal Treasury, checking configuration & RICEF by Implementer.',
        p3Desc: 'Working closely in SD, FICO, FM Module — Assist meetings between User and Implementer, checking Configuration & RICEFW, data migration & initial balance, go-live support.',
        p4Desc: 'Checking RICEF by implementor, assist UAT, data migration & initial balance, go-live fixing custom & exit program.',
        p5Desc: 'Creating custom program to connect purchase data of spare parts from Traknus to Perkins for analysis and order tracking report.',
        p6Desc: 'Project digitalization and differentiation combining SAP and Salesforce platforms.',
    },
};

const App = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [expandedProject, setExpandedProject] = useState<string | null>(null);
    const [theme, setTheme] = useState<Theme>('dark');
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [lang, setLang] = useState<Lang>('en');

    const t = themes[theme];
    const L = i18n[lang];

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > window.innerHeight * 0.8);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        setActiveSection(id);
        setMenuOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    const navLinks = ['home', 'about', 'skills', 'experience', 'projects', 'training', 'contact'];

    return (
        <div style={{ fontFamily: "'Segoe UI', Roboto, sans-serif", color: t.headingColor, minHeight: '100vh', background: t.pageBg }}>
            <style>{`
                html { scroll-behavior: smooth; }
                * { transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; }
                .hover-card { transition: transform 0.3s ease, box-shadow 0.3s ease !important; }
                .hover-card:hover { transform: translateY(-6px) !important; box-shadow: 0 12px 30px rgba(0,0,0,0.12) !important; }
                .hover-btn { transition: transform 0.2s ease, background 0.3s ease, box-shadow 0.3s ease !important; }
                .hover-btn:hover { transform: scale(1.05) !important; box-shadow: 0 6px 20px rgba(0,212,255,0.3) !important; }
                .hover-btn-outline { transition: transform 0.2s ease, background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease !important; }
                .hover-btn-outline:hover { transform: scale(1.05) !important; background: ${t.accent} !important; color: #fff !important; box-shadow: 0 6px 20px rgba(0,212,255,0.3) !important; }
                .hover-tag { transition: transform 0.2s ease, box-shadow 0.3s ease, background 0.3s ease !important; }
                .hover-tag:hover { transform: scale(1.08) !important; box-shadow: 0 0 12px ${t.accent}66 !important; }
                .hover-timeline { transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease !important; }
                .hover-timeline:hover { transform: translateX(6px) !important; box-shadow: 0 8px 25px rgba(0,0,0,0.1) !important; }
                .hover-nav { transition: color 0.2s ease, transform 0.2s ease !important; }
                .hover-nav:hover { transform: translateY(-2px) !important; color: ${t.accent} !important; }
                .hover-contact-card { transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease !important; }
                .hover-contact-card:hover { transform: translateY(-6px) !important; box-shadow: 0 12px 30px rgba(0,212,255,0.15) !important; border-color: ${t.accent} !important; }
                .hover-back-top { transition: transform 0.2s ease, box-shadow 0.3s ease !important; }
                .hover-back-top:hover { transform: scale(1.15) !important; box-shadow: 0 6px 20px rgba(0,212,255,0.4) !important; }
                .hover-project { transition: transform 0.3s ease, box-shadow 0.3s ease !important; }
                .hover-project:hover { transform: translateY(-4px) !important; box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important; }
                .grid-about { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
                .grid-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-top: 2rem; }
                .grid-skills { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
                .grid-training { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
                .hero-title { font-size: 3rem; margin: 0 0 0.5rem; font-weight: 700; }
                .hero-subtitle { font-size: 1.3rem; margin: 0 0 1rem; }
                .hero-contact-row { display: flex; gap: 2.5rem; font-size: 0.9rem; margin-top: 3rem; }
                .hero-section { padding: 6rem 2rem; min-height: 80vh; }
                .section-title { font-size: 2rem; }
                .contact-cards { display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap; }
                .career-progression { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 0; }
                @media (max-width: 900px) { .grid-skills { grid-template-columns: repeat(2, 1fr) !important; } }
                @media (max-width: 768px) {
                    .grid-about { grid-template-columns: 1fr !important; }
                    .grid-stats { grid-template-columns: repeat(2, 1fr) !important; }
                    .grid-skills { grid-template-columns: 1fr !important; }
                    .grid-training { grid-template-columns: 1fr !important; }
                    .hero-title { font-size: 2rem !important; }
                    .hero-subtitle { font-size: 1.05rem !important; }
                    .hero-contact-row { flex-direction: column !important; gap: 0.8rem !important; align-items: center; font-size: 0.85rem !important; }
                    .hero-section { padding: 3.5rem 1.2rem !important; min-height: auto !important; }
                    .section-title { font-size: 1.5rem !important; }
                    .contact-cards { flex-direction: column !important; align-items: center; gap: 1rem !important; }
                    .career-progression { flex-direction: column !important; gap: 0.3rem !important; }
                    .career-progression .arrow { display: none; }
                }
            `}</style>

            {/* Navigation */}
            <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: t.navBg, padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: theme === 'dark' ? '0 2px 10px rgba(0,0,0,0.3)' : '0 2px 10px rgba(0,0,0,0.08)' }}>
                <span style={{ color: t.accent, fontWeight: 700, fontSize: '1.3rem' }}>{'SE38 : Z_Malik'}</span>
                {!isMobile && (
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        {navLinks.map(s => (
                            <button key={s} className="hover-nav" onClick={() => scrollTo(s)} style={{ background: 'none', border: 'none', color: activeSection === s ? t.accent : t.navText, cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500, textTransform: 'capitalize' }}>{s}</button>
                        ))}
                        <button onClick={() => setLang(lang === 'id' ? 'en' : 'id')} style={{ background: 'none', border: `1px solid ${t.accent}`, borderRadius: 20, padding: '0.3rem 0.7rem', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, color: t.accent }}>{lang === 'id' ? '🇬🇧 EN' : '🇮🇩 ID'}</button>
                        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} style={{ background: t.accent, border: 'none', borderRadius: 20, padding: '0.4rem 0.8rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: theme === 'dark' ? '#1a1a2e' : '#fff' }}>{theme === 'dark' ? '☀️ Light' : '🌙 Dark'}</button>
                    </div>
                )}
                {isMobile && (
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <button onClick={() => setLang(lang === 'id' ? 'en' : 'id')} style={{ background: 'none', border: `1px solid ${t.accent}`, borderRadius: 20, padding: '0.3rem 0.6rem', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, color: t.accent }}>{lang === 'id' ? '🇬🇧' : '🇮🇩'}</button>
                        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} style={{ background: t.accent, border: 'none', borderRadius: 20, padding: '0.4rem 0.7rem', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, color: theme === 'dark' ? '#1a1a2e' : '#fff' }}>{theme === 'dark' ? '☀️' : '🌙'}</button>
                        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.3rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <span style={{ display: 'block', width: 24, height: 3, background: t.accent, borderRadius: 2, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
                            <span style={{ display: 'block', width: 24, height: 3, background: t.accent, borderRadius: 2, transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }}></span>
                            <span style={{ display: 'block', width: 24, height: 3, background: t.accent, borderRadius: 2, transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}></span>
                        </button>
                    </div>
                )}
            </nav>

            {isMobile && menuOpen && (
                <div style={{ position: 'sticky', top: 58, zIndex: 99, background: t.navBg, padding: '1rem 2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
                    {navLinks.map(s => (
                        <button key={s} onClick={() => scrollTo(s)} style={{ background: 'none', border: 'none', color: activeSection === s ? t.accent : t.navText, cursor: 'pointer', fontSize: '1rem', fontWeight: 500, textTransform: 'capitalize', textAlign: 'left', padding: '0.5rem 0', borderBottom: `1px solid ${t.borderLight}22` }}>{s}</button>
                    ))}
                </div>
            )}

            {/* Hero Section */}
            <section id="home" className="hero-section" style={{ background: t.heroBg, color: t.heroText, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: 160, height: 160, borderRadius: '50%', overflow: 'hidden', marginBottom: '2rem', border: `4px solid ${t.accent}`, boxShadow: `0 0 30px ${t.accent}44` }}>
                    <img src={profilePhoto} alt="Malik Abdul Aziz" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                </div>
                <h1 className="hero-title" style={{ color: t.heroText }}>Malik Abdul Aziz</h1>
                <p className="hero-subtitle" style={{ color: t.accent }}>SAP ABAP Developer & Techno-Functional Consultant</p>
                <p style={{ fontSize: '1rem', color: t.heroSub, maxWidth: 650, lineHeight: 1.8 }}>{L.heroDesc}</p>
                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <button className="hover-btn" onClick={() => scrollTo('contact')} style={{ background: t.accent, color: '#fff', border: 'none', padding: '0.8rem 2rem', borderRadius: 6, fontWeight: 600, cursor: 'pointer', fontSize: '1rem' }}>{L.contactBtn}</button>
                    <button className="hover-btn-outline" onClick={() => scrollTo('experience')} style={{ background: 'transparent', color: t.accent, border: `2px solid ${t.accent}`, padding: '0.8rem 2rem', borderRadius: 6, fontWeight: 600, cursor: 'pointer', fontSize: '1rem' }}>{L.expBtn}</button>
                </div>
                <div className="hero-contact-row" style={{ color: t.heroSub }}>
                    <span>📍 Jakarta, Indonesia</span>
                    <a href="mailto:malikaa.maa@gmail.com" style={{ color: t.heroSub, textDecoration: 'none' }}>📧 malikaa.maa@gmail.com</a>
                    <a href="https://wa.me/6281211318546" style={{ color: t.heroSub, textDecoration: 'none' }}>📱 +6281211318546</a>
                </div>
            </section>

            {/* About Section */}
            <RevealSection id="about" style={{ padding: '5rem 2rem', maxWidth: 900, margin: '0 auto' }}>
                <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '0.5rem', color: t.headingColor }}>{L.aboutTitle}</h2>
                <div style={{ width: 60, height: 4, background: t.accent, margin: '0 auto 2rem', borderRadius: 2 }}></div>
                <div className="grid-about">
                    <RevealItem delay={0.1} style={{ background: t.cardBg, padding: '2rem', borderRadius: 12, boxShadow: t.cardShadow }}>
                        <div className="hover-card" style={{ height: '100%' }}>
                            <h3 style={{ color: t.titleColor, marginTop: 0 }}>{L.profileTitle}</h3>
                            <p style={{ lineHeight: 1.8, color: t.textColor }}>{L.profileDesc}</p>
                        </div>
                    </RevealItem>
                    <RevealItem delay={0.2} style={{ background: t.cardBg, padding: '2rem', borderRadius: 12, boxShadow: t.cardShadow }}>
                        <div className="hover-card" style={{ height: '100%' }}>
                            <h3 style={{ color: t.titleColor, marginTop: 0 }}>{L.eduTitle}</h3>
                            <p style={{ lineHeight: 1.8, color: t.textColor }}><strong>Universitas Gunadarma</strong><br />Bachelor's Degree in Information Technology<br />GPA: 3.49</p>
                        </div>
                    </RevealItem>
                </div>
                <div className="grid-stats">
                    {[
                        { target: 7, suffix: '+', label: L.statYears },
                        { target: 3, suffix: '', label: L.statCompanies },
                        { target: 5, suffix: '+', label: L.statProjects },
                        { target: 20, suffix: '+', label: L.statEnhancements },
                    ].map(s => (
                        <div key={s.label} className="hover-card" style={{ background: t.cardBg, padding: '1.5rem', borderRadius: 12, textAlign: 'center', boxShadow: t.cardShadow }}>
                            <AnimatedCounter target={s.target} suffix={s.suffix} color={t.accent} />
                            <div style={{ fontSize: '0.85rem', color: t.textMuted, marginTop: '0.3rem' }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </RevealSection>

            {/* Skills Section */}
            <RevealSection id="skills" style={{ padding: '5rem 2rem', background: t.sectionAltBg }}>
                <div style={{ maxWidth: 900, margin: '0 auto' }}>
                    <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '0.5rem', color: t.headingColor }}>{L.skillsTitle}</h2>
                    <div style={{ width: 60, height: 4, background: t.accent, margin: '0 auto 2rem', borderRadius: 2 }}></div>
                    <div className="grid-skills">
                        {[
                            { title: 'ABAP Development', items: ['Reports & ALV', 'Smart Forms', 'Function Modules & BAPIs', 'RFCs & APIs', 'Enhancement & User Exits'] },
                            { title: 'SAP Modules', items: ['SD (Sales & Distribution)', 'FICO (Finance & Controlling)', 'FM (Funds Management)', 'MM (Materials Management)', 'HC (Human Capital)'] },
                            { title: 'Integration', items: ['SAP to Microsoft CRM', 'SAP to Dynamics 365', 'Interfacing & Data Migration', 'REST APIs', 'Perkins Connection'] },
                            { title: 'Functional Skills', items: ['Business Analysis', 'Functional Spec Design', 'Configuration SD/FICO/FM', 'UAT Scenario Creation', 'RICEF/RICEFW Review'] },
                            { title: 'Implementation', items: ['S/4HANA Migration', 'Data Migration', 'Initial Balance Setup', 'Go-Live Support', 'Custom & Exit Program Fix'] },
                            { title: 'Soft Skills', items: ['Problem Solving', 'Analysis & Debugging', 'User Communication', 'Cross-module Collaboration', 'Audit Compliance (PWC)'] },
                        ].map((cat, idx) => (
                            <RevealItem key={cat.title} delay={0.1 * idx} style={{ background: t.cardBg, padding: '1.5rem', borderRadius: 12, boxShadow: t.cardShadow }}>
                                <div className="hover-card" style={{ height: '100%' }}>
                                    <h4 style={{ color: t.titleColor, margin: '0 0 1rem', fontSize: '1.1rem' }}>{cat.title}</h4>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                        {cat.items.map(item => (
                                            <li key={item} className="hover-tag" style={{ padding: '0.4rem 0', color: t.textColor, fontSize: '0.9rem', borderBottom: `1px solid ${t.borderLight}`, display: 'inline-block', width: '100%' }}>✓ {item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </RevealItem>
                        ))}
                    </div>
                </div>
            </RevealSection>

            {/* Experience Section */}
            <RevealSection id="experience" style={{ padding: '5rem 2rem', maxWidth: 900, margin: '0 auto' }}>
                <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '0.5rem', color: t.headingColor }}>{L.expTitle}</h2>
                <div style={{ width: 60, height: 4, background: t.accent, margin: '0 auto 2rem', borderRadius: 2 }}></div>
                <div style={{ position: 'relative', paddingLeft: '3rem' }}>
                    <div style={{ position: 'absolute', left: '1rem', top: 0, bottom: 0, width: 3, background: `linear-gradient(to bottom, ${t.accent}, ${theme === 'dark' ? '#0f3460' : '#023e8a'})`, borderRadius: 2 }}></div>

                    <div style={{ position: 'relative', marginBottom: '3rem' }}>
                        <div style={{ position: 'absolute', left: '-2.35rem', top: '0.5rem', width: 20, height: 20, borderRadius: '50%', background: t.accent, border: `3px solid ${t.cardBg}`, boxShadow: `0 0 0 3px ${t.accent}` }}></div>
                        <div style={{ display: 'inline-block', background: `linear-gradient(135deg, ${t.accent}, ${theme === 'dark' ? '#0f3460' : '#023e8a'})`, color: '#fff', padding: '0.3rem 1rem', borderRadius: 20, fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.8rem' }}>2021 – Present</div>
                        <div className="hover-timeline" style={{ background: t.cardBg, padding: '1.5rem', borderRadius: 12, boxShadow: t.cardShadow, borderTop: `3px solid ${t.accent}` }}>
                            <h3 style={{ margin: '0 0 0.3rem', color: t.headingColor, fontSize: '1.2rem' }}>PT Traktor Nusantara</h3>
                            <p style={{ color: t.accent, margin: '0 0 1rem', fontWeight: 500, fontSize: '0.95rem' }}>SAP ABAP, Business Analyst, Functional Module FICO, FM, & SD</p>
                            <div style={{ marginBottom: '1rem' }}>
                                <h4 style={{ color: t.headingColor, margin: '0 0 0.5rem', fontSize: '0.9rem' }}>{L.dailySupport}</h4>
                                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: t.textColor, fontSize: '0.85rem', lineHeight: 2 }}>
                                    {L.exp1Daily.map(item => <li key={item}>{item}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h4 style={{ color: t.headingColor, margin: '0 0 0.5rem', fontSize: '0.9rem' }}>{L.keyEnhancements}</h4>
                                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                                    {['CoreTax Enhancement', 'Mass MIRO Landed Cost', 'Email Notification PR/PO', 'SmartForms Development', 'PMK No 136/2023 (NPWP 16 digit)', 'PPN 11% Implementation', 'Auto Period Open/Close', 'SAP-CRM Interface', 'Mass Journal Upload'].map(tag => (
                                        <span key={tag} className="hover-tag" style={{ background: t.tagBg, color: t.tagColor, padding: '0.25rem 0.6rem', borderRadius: 4, fontSize: '0.75rem', display: 'inline-block' }}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ position: 'relative', marginBottom: '3rem' }}>
                        <div style={{ position: 'absolute', left: '-2.35rem', top: '0.5rem', width: 20, height: 20, borderRadius: '50%', background: theme === 'dark' ? '#0f3460' : '#0077b6', border: `3px solid ${t.cardBg}`, boxShadow: `0 0 0 3px ${theme === 'dark' ? '#0f3460' : '#0077b6'}` }}></div>
                        <div style={{ display: 'inline-block', background: `linear-gradient(135deg, ${theme === 'dark' ? '#0f3460' : '#0077b6'}, ${theme === 'dark' ? '#16213e' : '#023e8a'})`, color: '#fff', padding: '0.3rem 1rem', borderRadius: 20, fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.8rem' }}>2020 – 2021</div>
                        <div className="hover-timeline" style={{ background: t.cardBg, padding: '1.5rem', borderRadius: 12, boxShadow: t.cardShadow, borderTop: `3px solid ${theme === 'dark' ? '#0f3460' : '#0077b6'}` }}>
                            <h3 style={{ margin: '0 0 0.3rem', color: t.headingColor, fontSize: '1.2rem' }}>PT Central Mega Kencana</h3>
                            <p style={{ color: theme === 'dark' ? '#a0c4e8' : '#0077b6', margin: '0 0 1rem', fontWeight: 500, fontSize: '0.95rem' }}>SAP ABAP Developer</p>
                            <div style={{ marginBottom: '1rem' }}>
                                <h4 style={{ color: t.headingColor, margin: '0 0 0.5rem', fontSize: '0.9rem' }}>{L.dailySupport}</h4>
                                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: t.textColor, fontSize: '0.85rem', lineHeight: 2 }}>
                                    {L.exp2Daily.map(item => <li key={item}>{item}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h4 style={{ color: t.headingColor, margin: '0 0 0.5rem', fontSize: '0.9rem' }}>{L.keyEnhancements}</h4>
                                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                                    {['Production Order Interface', 'Auto Inventory Transfer', 'Material Extension Program', 'Factory Inventory Report'].map(tag => (
                                        <span key={tag} className="hover-tag" style={{ background: t.tagBg, color: t.tagColor, padding: '0.25rem 0.6rem', borderRadius: 4, fontSize: '0.75rem', display: 'inline-block' }}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', left: '-2.35rem', top: '0.5rem', width: 20, height: 20, borderRadius: '50%', background: theme === 'dark' ? '#16213e' : '#023e8a', border: `3px solid ${t.cardBg}`, boxShadow: `0 0 0 3px ${theme === 'dark' ? '#16213e' : '#023e8a'}` }}></div>
                        <div style={{ display: 'inline-block', background: `linear-gradient(135deg, ${theme === 'dark' ? '#16213e' : '#023e8a'}, ${theme === 'dark' ? '#1a1a2e' : '#001845'})`, color: '#fff', padding: '0.3rem 1rem', borderRadius: 20, fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.8rem' }}>2017 – 2020</div>
                        <div className="hover-timeline" style={{ background: t.cardBg, padding: '1.5rem', borderRadius: 12, boxShadow: t.cardShadow, borderTop: `3px solid ${theme === 'dark' ? '#16213e' : '#023e8a'}` }}>
                            <h3 style={{ margin: '0 0 0.3rem', color: t.headingColor, fontSize: '1.2rem' }}>PT United Tractors Tbk</h3>
                            <p style={{ color: theme === 'dark' ? '#8899a6' : '#023e8a', margin: '0 0 1rem', fontWeight: 500, fontSize: '0.95rem' }}>SAP ABAP Developer</p>
                            <div>
                                <h4 style={{ color: t.headingColor, margin: '0 0 0.5rem', fontSize: '0.9rem' }}>{L.keyEnhancementsProject}</h4>
                                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                                    {['Credit Scoring Product', 'GP Deal GP Billing Report', 'Data Mapping e-Filing', 'Payment Vendor Automation', 'Digitization & Differentiation (Salesforce)'].map(tag => (
                                        <span key={tag} className="hover-tag" style={{ background: t.tagBg, color: t.tagColor, padding: '0.25rem 0.6rem', borderRadius: 4, fontSize: '0.75rem', display: 'inline-block' }}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ position: 'absolute', left: '0.35rem', bottom: -10, width: 16, height: 16, borderRadius: '50%', background: theme === 'dark' ? '#1a1a2e' : '#023e8a', border: `2px solid ${theme === 'dark' ? '#16213e' : '#001845'}` }}></div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '3rem', padding: '1rem', background: t.progressionBg, borderRadius: 8 }}>
                    <p className="career-progression" style={{ margin: 0, color: t.textColor, fontSize: '0.9rem' }}>
                        <span style={{ fontWeight: 600, color: theme === 'dark' ? '#8899a6' : '#023e8a' }}>PT United Tractors</span>
                        <span className="arrow" style={{ color: t.accent, margin: '0 0.8rem' }}>→</span>
                        <span style={{ fontWeight: 600, color: theme === 'dark' ? '#a0c4e8' : '#0077b6' }}>PT Central Mega Kencana</span>
                        <span className="arrow" style={{ color: t.accent, margin: '0 0.8rem' }}>→</span>
                        <span style={{ fontWeight: 600, color: t.accent }}>PT Traktor Nusantara</span>
                    </p>
                    <p style={{ margin: '0.3rem 0 0', color: t.textMuted, fontSize: '0.8rem' }}>{L.careerGrowth}</p>
                </div>
            </RevealSection>

            {/* Projects Section */}
            <RevealSection id="projects" style={{ padding: '5rem 2rem', background: t.sectionAltBg }}>
                <div style={{ maxWidth: 900, margin: '0 auto' }}>
                    <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '0.5rem', color: t.headingColor }}>{L.projectsTitle}</h2>
                    <div style={{ width: 60, height: 4, background: t.accent, margin: '0 auto 2rem', borderRadius: 2 }}></div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        {[
                            { id: 'p1', title: 'Migration Microsoft Dynamic CRM to Dynamics 365', period: 'PT Traktor Nusantara', role: 'SAP ABAP', desc: L.p1Desc },
                            { id: 'p2', title: 'Implementation HC Module', period: '2023–2024', role: 'Techno-Function', desc: L.p2Desc },
                            { id: 'p3', title: 'Implementation SAP S/4HANA PT Traktor Nusantara', period: '2022–2023', role: 'Techno-Function', desc: L.p3Desc },
                            { id: 'p4', title: 'Implementation SAP S/4HANA PT Swadaya Harapan Nusantara', period: '2021', role: 'SAP ABAP', desc: L.p4Desc },
                            { id: 'p5', title: 'Traknus RIM Perkins Connection', period: '2021', role: 'SAP ABAP', desc: L.p5Desc },
                            { id: 'p6', title: 'Digitization and Differentiation', period: 'PT United Tractors', role: 'SAP ABAP & Salesforce Developer', desc: L.p6Desc },
                        ].map((p, idx) => (
                            <RevealItem key={p.id} delay={0.1 * idx} style={{ background: t.cardBg, borderRadius: 12, boxShadow: t.cardShadow, overflow: 'hidden' }}>
                                <div className="hover-project">
                                    <button onClick={() => setExpandedProject(expandedProject === p.id ? null : p.id)} style={{ width: '100%', background: 'none', border: 'none', padding: '1.5rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left' }}>
                                        <div>
                                            <h4 style={{ margin: 0, color: t.headingColor, fontSize: '1rem' }}>{p.title}</h4>
                                            <span style={{ color: t.textMuted, fontSize: '0.85rem' }}>{p.period} • {p.role}</span>
                                        </div>
                                        <span style={{ color: t.accent, fontSize: '1.2rem' }}>{expandedProject === p.id ? '−' : '+'}</span>
                                    </button>
                                    {expandedProject === p.id && (
                                        <div style={{ padding: '0 1.5rem 1.5rem', color: t.textColor, lineHeight: 1.8, fontSize: '0.9rem', borderTop: `1px solid ${t.borderLight}` }}>
                                            <p style={{ marginTop: '1rem' }}>{p.desc}</p>
                                        </div>
                                    )}
                                </div>
                            </RevealItem>
                        ))}
                    </div>
                </div>
            </RevealSection>

            {/* Training Section */}
            <RevealSection id="training" style={{ padding: '5rem 2rem', maxWidth: 900, margin: '0 auto' }}>
                <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '0.5rem', color: t.headingColor }}>{L.trainingTitle}</h2>
                <div style={{ width: 60, height: 4, background: t.accent, margin: '0 auto 2rem', borderRadius: 2 }}></div>
                <div className="grid-training">
                    <RevealItem delay={0.1} style={{ background: t.cardBg, padding: '1.5rem', borderRadius: 12, boxShadow: t.cardShadow, borderTop: `3px solid ${t.accent}` }}>
                        <div className="hover-card" style={{ height: '100%' }}>
                            <h4 style={{ color: t.titleColor, margin: '0 0 0.5rem' }}>S4F12</h4>
                            <p style={{ color: t.textColor, margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>Basics of Customizing for Financial Accounting: GL, AP, AR in SAP S/4HANA</p>
                        </div>
                    </RevealItem>
                    <RevealItem delay={0.2} style={{ background: t.cardBg, padding: '1.5rem', borderRadius: 12, boxShadow: t.cardShadow, borderTop: `3px solid ${t.accent}` }}>
                        <div className="hover-card" style={{ height: '100%' }}>
                            <h4 style={{ color: t.titleColor, margin: '0 0 0.5rem' }}>S4F22</h4>
                            <p style={{ color: t.textColor, margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>Cost Center and Internal Order Accounting in SAP S/4HANA</p>
                        </div>
                    </RevealItem>
                </div>
                <RevealItem delay={0.3} style={{ marginTop: '2rem', background: t.cardBg, padding: '1.5rem', borderRadius: 12, boxShadow: t.cardShadow, borderLeft: `4px solid ${t.accent}` }}>
                    <div className="hover-card">
                        <h4 style={{ color: t.titleColor, margin: '0 0 0.5rem' }}>{L.auditTitle}</h4>
                        <p style={{ color: t.textColor, margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>{L.auditDesc}</p>
                    </div>
                </RevealItem>
            </RevealSection>

            {/* Contact Section */}
            <RevealSection id="contact" style={{ padding: '5rem 2rem', background: t.contactBg, color: t.contactText, textAlign: 'center' }}>
                <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>{L.contactTitle}</h2>
                <div style={{ width: 60, height: 4, background: t.accent, margin: '0 auto 2rem', borderRadius: 2 }}></div>
                <p style={{ color: t.contactMuted, maxWidth: 500, margin: '0 auto 2rem', lineHeight: 1.8 }}>{L.contactDesc}</p>
                <div className="contact-cards">
                    {[
                        { icon: '📧', label: 'Email', value: 'malikaa.maa@gmail.com', href: 'mailto:malikaa.maa@gmail.com' },
                        { icon: '📱', label: lang === 'id' ? 'Telepon' : 'Phone', value: '+6281211318546', href: 'https://wa.me/6281211318546' },
                        { icon: '📍', label: L.contactLocation, value: 'Jakarta, Indonesia', href: undefined },
                    ].map((c, idx) => (
                        <RevealItem key={c.label} delay={0.1 * idx} style={{ background: t.contactCardBg, padding: '1.5rem 2rem', borderRadius: 12, border: `1px solid ${t.contactCardBorder}`, minWidth: 180 }}>
                            <div className="hover-contact-card" style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{c.icon}</div>
                                <div style={{ color: t.accent, fontWeight: 600, marginBottom: '0.3rem' }}>{c.label}</div>
                                {c.href ? (
                                    <a href={c.href} style={{ color: t.contactMuted, fontSize: '0.9rem', textDecoration: 'none' }}>{c.value}</a>
                                ) : (
                                    <div style={{ color: t.contactMuted, fontSize: '0.9rem' }}>{c.value}</div>
                                )}
                            </div>
                        </RevealItem>
                    ))}
                </div>
            </RevealSection>

            {/* Footer */}
            <footer style={{ background: t.footerBg, color: t.footerText, textAlign: 'center', padding: '1.5rem', fontSize: '0.85rem' }}>{L.footer}</footer>

            {/* Back to Top */}
            {showBackToTop && (
                <button className="hover-back-top" onClick={() => scrollTo('home')} style={{ position: 'fixed', bottom: '2rem', right: '2rem', width: 48, height: 48, borderRadius: '50%', background: t.accent, color: '#fff', border: 'none', cursor: 'pointer', fontSize: '1.3rem', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }} title="Back to Top">↑</button>
            )}
        </div>
    );
};

export default App;