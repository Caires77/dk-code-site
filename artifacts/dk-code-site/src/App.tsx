import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Blocks,
  Check,
  ChevronDown,
  Code2,
  Gauge,
  Globe2,
  Instagram,
  Layers3,
  Menu,
  MessageCircle,
  MousePointer2,
  MoveUpRight,
  Palette,
  PanelTop,
  Plus,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import { type ReactNode } from 'react';
import './index.css';
import logoFull from './assets/dk-code-logo.png';

declare global {
  type MetaPixelFunction = ((...args: unknown[]) => void) & { queue?: unknown[][]; loaded?: boolean; version?: string };
  interface Window {
    fbq?: MetaPixelFunction;
    _fbq?: MetaPixelFunction;
  }
}

const whatsappNumber = '5511963079086';
const whatsappHref = (message: string) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

function BrandLockup({ compact = false }: { compact?: boolean }) {
  return <span className={`brand-lockup ${compact ? 'brand-lockup-compact' : ''}`}><img src={logoFull} alt="DK CODE" /></span>;
}
const navItems = [
  ['Início', '#inicio'],
  ['O problema', '#problema'],
  ['Serviços', '#servicos'],
  ['Parceiros', '#parceiros'],
  ['Processo', '#processo'],
  ['Sobre', '#sobre'],
  ['FAQ', '#faq'],
  ['Contato', '#contato'],
];

function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('visible')),
      { threshold: 0.08 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function TechnologyPlanet() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let rotation = 0;
    let lastTime = 0;
    const seed = Array.from({ length: 180 }, (_, index) => ({
      x: Math.sin(index * 17.31) * 0.82,
      y: Math.cos(index * 11.77) * 0.76,
      size: 0.018 + (Math.sin(index * 4.2) + 1) * 0.018,
      alpha: 0.16 + (index % 5) * 0.045,
    }));

    const resize = () => {
      const box = canvas.getBoundingClientRect();
      width = box.width;
      height = box.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      if (!width || !height) resize();
      const delta = lastTime ? Math.min(34, time - lastTime) : 16;
      lastTime = time;
      context.clearRect(0, 0, width, height);
      const cx = width * .5 + pointer.current.x * width * .045;
      const cy = height * .5 + pointer.current.y * height * .035;
      const radius = Math.min(width, height) * .315;
      const lightX = cx - radius * .42;
      const lightY = cy - radius * .52;

      const atmosphere = context.createRadialGradient(cx, cy, radius * .55, cx, cy, radius * 1.52);
      atmosphere.addColorStop(0, 'rgba(255,232,117,.25)');
      atmosphere.addColorStop(.46, 'rgba(205,163,84,.18)');
      atmosphere.addColorStop(.78, 'rgba(184,145,75,.08)');
      atmosphere.addColorStop(1, 'rgba(184,145,75,0)');
      context.fillStyle = atmosphere;
      context.beginPath();
      context.arc(cx, cy, radius * 1.52, 0, Math.PI * 2);
      context.fill();

      context.save();
      context.beginPath();
      context.arc(cx, cy, radius, 0, Math.PI * 2);
      context.clip();
      const sphere = context.createRadialGradient(lightX, lightY, radius * .04, cx + radius * .2, cy + radius * .12, radius * 1.18);
      sphere.addColorStop(0, '#fff6b3');
      sphere.addColorStop(.16, '#f4d86a');
      sphere.addColorStop(.38, '#d5a92f');
      sphere.addColorStop(.64, '#a66e0e');
      sphere.addColorStop(.84, '#684006');
      sphere.addColorStop(1, '#211204');
      context.fillStyle = sphere;
      context.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

      seed.forEach((spot, index) => {
        const longitude = spot.x + rotation * .22;
        const latitude = spot.y;
        const projectedX = cx + Math.sin(longitude) * Math.cos(latitude) * radius;
        const projectedY = cy - Math.sin(latitude) * radius;
        const depth = Math.cos(longitude) * Math.cos(latitude);
        if (depth < -.08) return;
        const scale = Math.max(.18, Math.sqrt(Math.max(0, 1 - Math.sin(longitude) ** 2 * Math.cos(latitude) ** 2)));
        context.globalAlpha = spot.alpha * Math.min(1, depth + .4);
        context.fillStyle = index % 4 === 0 ? '#fff0a2' : index % 3 === 0 ? '#81510a' : '#b77d13';
        context.beginPath();
        context.ellipse(projectedX, projectedY, radius * spot.size * scale * 2.3, radius * spot.size * scale, longitude * .35, 0, Math.PI * 2);
        context.fill();
      });
      context.globalAlpha = 1;

      const longitudeLines = 8;
      context.lineWidth = Math.max(0.65, radius * .004);
      for (let index = 0; index < longitudeLines; index += 1) {
        const longitude = ((index / longitudeLines) * Math.PI * 2) + rotation * .4;
        context.strokeStyle = 'rgba(255,235,143,.16)';
        context.beginPath();
        context.ellipse(cx, cy, Math.abs(Math.sin(longitude)) * radius, radius, 0, 0, Math.PI * 2);
        context.stroke();
      }
      for (let index = -2; index <= 2; index += 1) {
        const latitude = index * .25;
        context.strokeStyle = 'rgba(255,239,157,.14)';
        context.beginPath();
        context.ellipse(cx, cy - Math.sin(latitude) * radius, Math.cos(latitude) * radius, radius * .12, 0, 0, Math.PI * 2);
        context.stroke();
      }

      const brandScale = Math.max(.7, Math.min(1.15, radius / 170));
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.font = `700 ${Math.round(24 * brandScale)}px var(--font-display)`;
      context.shadowColor = 'rgba(60,30,0,.75)';
      context.shadowBlur = 8;
      context.fillStyle = 'rgba(255,249,194,.92)';
      context.fillText('DK CODE', cx + Math.sin(rotation) * radius * .08, cy + radius * .04);
      context.shadowBlur = 0;
      context.font = `500 ${Math.round(7 * brandScale)}px var(--app-font-mono)`;
      context.letterSpacing = '3px';
      context.fillStyle = 'rgba(74,42,3,.9)';
      context.fillText('DIGITAL SYSTEMS', cx + Math.sin(rotation) * radius * .08, cy + radius * .16);

      const specular = context.createRadialGradient(lightX, lightY, 0, lightX, lightY, radius * .46);
      specular.addColorStop(0, 'rgba(255,255,218,.75)');
      specular.addColorStop(.18, 'rgba(255,242,160,.25)');
      specular.addColorStop(1, 'rgba(255,242,160,0)');
      context.fillStyle = specular;
      context.beginPath();
      context.arc(cx, cy, radius, 0, Math.PI * 2);
      context.fill();

      const terminator = context.createLinearGradient(cx - radius, cy, cx + radius, cy);
      terminator.addColorStop(0, 'rgba(0,0,0,0)');
      terminator.addColorStop(.62, 'rgba(24,12,0,0)');
      terminator.addColorStop(1, 'rgba(18,8,0,.58)');
      context.fillStyle = terminator;
      context.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
      context.restore();

      context.strokeStyle = 'rgba(255,239,147,.82)';
      context.lineWidth = Math.max(1.3, radius * .009);
      context.beginPath();
      context.arc(cx, cy, radius * 1.008, -2.55, -.62);
      context.stroke();

      if (!reduced) {
        rotation += delta * .00042;
        frame = requestAnimationFrame(draw);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      const box = canvas.getBoundingClientRect();
      pointer.current = { x: (event.clientX - box.left - box.width / 2) / box.width, y: (event.clientY - box.top - box.height / 2) / box.height };
    };
    const resetPointer = () => { pointer.current = { x: 0, y: 0 }; };
    resize();
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerleave', resetPointer);
    window.addEventListener('resize', resize);
    draw(0);
    return () => {
      cancelAnimationFrame(frame);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', resetPointer);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="planet-wrap realistic-planet" aria-label="Planeta dourado DK CODE em rotação" role="img">
      <div className="orbit" />
      <div className="orbit orbit-two" />
      <div className="planet-halo" aria-hidden="true" />
      <canvas ref={canvasRef} className="planet-canvas" />
      <span className="planet-tag one">sistemas em órbita</span>
      <span className="planet-tag two">código vivo</span>
      <span className="planet-tag three">dk / 01</span>
    </div>
  );
}
function SectionHeading({ eyebrow, title, children, light = false }: { eyebrow: string; title: string; children?: ReactNode; light?: boolean }) {
  return (
    <div className={`reveal max-w-3xl ${light ? 'text-[#f3efe6]' : ''}`}>
      <span className={`eyebrow ${light ? 'text-[#A47F3F]' : ''}`}>{eyebrow}</span>
      <h2 className="display mt-5 text-4xl font-semibold leading-[.98] tracking-[-.06em] md:text-6xl">{title}</h2>
      {children && <p className={`mt-6 max-w-xl text-base leading-7 ${light ? 'text-[#a8a096]' : 'text-[#a8a096]'}`}>{children}</p>}
    </div>
  );
}

const services = [
  { icon: Globe2, number: '01', title: 'Sites e Landing Pages', body: 'Experiências digitais rápidas, responsivas e pensadas para posicionar sua marca e gerar conversões.' },
  { icon: MousePointer2, number: '02', title: 'Aplicativos', body: 'Aplicativos web e mobile sob medida para aproximar sua empresa dos clientes e acelerar operações.' },
  { icon: Blocks, number: '03', title: 'Sistemas e Softwares', body: 'Plataformas personalizadas para organizar processos, integrar dados e escalar o seu negócio.' },
  { icon: PanelTop, number: '04', title: 'CRMs', body: 'Ferramentas de relacionamento para centralizar oportunidades, equipes, clientes e vendas.' },
  { icon: Gauge, number: '05', title: 'Automações', body: 'Fluxos inteligentes que reduzem tarefas manuais, conectam ferramentas e aumentam a produtividade.' },
  { icon: Server, number: '06', title: 'ERP', body: 'Sistemas integrados para conectar finanças, vendas, estoque, operação e gestão em uma única visão.' },
];

const problems = [
  ['01', 'Sistemas desconectados'],
  ['02', 'Processos manuais'],
  ['03', 'Planilhas paralelas'],
  ['04', 'Retrabalho operacional'],
  ['05', 'Dados espalhados'],
  ['06', 'Decisões sem visibilidade'],
  ['07', 'Ferramentas que não conversam'],
  ['08', 'Crescimento sem estrutura'],
];

const process = [
  ['01', 'Briefing', 'Entendemos seu negócio, objetivos e público-alvo.'],
  ['02', 'Planejamento', 'Arquitetura de informação, escopo e cronograma.'],
  ['03', 'Design', 'Protótipo visual único e alinhado à sua marca.'],
  ['04', 'Desenvolvimento', 'Código limpo, performático e otimizado para SEO.'],
  ['05', 'Entrega', 'Publicação, treinamento e configuração de domínio.'],
  ['06', 'Suporte', 'Manutenção contínua e evolução do projeto.'],
];

const differentiators = [
  [Palette, 'Design moderno'], [Gauge, 'Alta velocidade'], [Search, 'SEO otimizado'], [PanelTop, 'Responsivo'],
  [MessageCircle, 'Integração WhatsApp'], [BarChart3, 'Google Analytics'], [Server, 'Hospedagem'], [ShieldCheck, 'Segurança'], [Code2, 'Código limpo'], [Layers3, 'Escalabilidade'],
];

const faqs = [
  ['Quanto tempo demora para desenvolver?', 'Sites institucionais: de 2 a 4 semanas. Landing Pages: até 10 dias. Sistemas: definido conforme escopo após o briefing.'],
  ['Quanto custa um projeto?', 'Cada projeto é único. Enviamos uma proposta personalizada após entender suas necessidades no briefing inicial, sem custo.'],
  ['Vocês fazem manutenção depois de entregar?', 'Sim. Oferecemos planos mensais de manutenção, atualização de conteúdo, backups e suporte técnico.'],
  ['O site aparece no Google?', 'Sim. Todos os projetos são otimizados para SEO desde a estrutura do código até performance e metadados.'],
  ['O pagamento pode ser parcelado?', 'Sim. Aceitamos parcelamento no cartão, PIX e transferência, com condições flexíveis.'],
  ['Posso solicitar alterações durante o projeto?', 'Claro. Cada etapa possui rodadas de ajustes previstas para garantir que o resultado esteja perfeito.'],
];

const cookieConsentKey = 'dk-code-cookie-consent';
type CookieChoice = 'accepted' | 'rejected';

function getSavedCookieChoice(): CookieChoice | null {
  const cookie = document.cookie.split('; ').find((item) => item.startsWith(`${cookieConsentKey}=`));
  const value = cookie?.split('=')[1] as CookieChoice | undefined;
  if (value === 'accepted' || value === 'rejected') return value;
  return window.localStorage.getItem(cookieConsentKey) as CookieChoice | null;
}

function saveCookieChoice(choice: CookieChoice) {
  document.cookie = `${cookieConsentKey}=${choice}; Max-Age=31536000; Path=/; SameSite=Lax`;
  window.localStorage.setItem(cookieConsentKey, choice);
}

function loadMetaPixel() {
  if (typeof window === 'undefined' || window.fbq) return;
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);
  const fbq = ((...args: unknown[]) => { fbq.queue?.push(args); }) as MetaPixelFunction;
  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = '2.0';
  window.fbq = fbq;
  window._fbq = fbq;
  window.fbq('init', '2220679542045133');
  window.fbq('track', 'PageView');
  const fallback = document.createElement('img');
  fallback.height = 1;
  fallback.width = 1;
  fallback.alt = '';
  fallback.style.display = 'none';
  fallback.src = 'https://www.facebook.com/tr?id=2220679542045133&ev=PageView&noscript=1';
  document.body.appendChild(fallback);
}

function CookieConsent() {
  const [choice, setChoice] = useState<CookieChoice | null>(null);

  useEffect(() => {
    const saved = getSavedCookieChoice();
    setChoice(saved);
    if (saved === 'accepted') loadMetaPixel();
  }, []);

  const saveChoice = (next: CookieChoice) => {
    saveCookieChoice(next);
    setChoice(next);
    if (next === 'accepted') loadMetaPixel();
  };

  if (choice) return null;

  return (
    <div className="cookie-consent" role="dialog" aria-labelledby="cookie-title" aria-describedby="cookie-description">
      <div className="cookie-consent-inner">
        <div className="cookie-copy">
          <span className="cookie-eyebrow">Sua privacidade</span>
          <h2 id="cookie-title">Cookies</h2>
          <p id="cookie-description">Usamos cookies para melhorar sua experiência de navegação e entender como o site é utilizado. Você pode aceitar ou recusar.</p>
        </div>
        <div className="cookie-actions"><button type="button" className="cookie-button cookie-button-muted" onClick={() => saveChoice('rejected')}>Recusar cookies</button><button type="button" className="cookie-button cookie-button-gold" onClick={() => saveChoice('accepted')}>Aceitar cookies</button></div>
      </div>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const heroRef = useRef<HTMLElement>(null);
  useScrollReveal();

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const target = { x: 0.5, y: 0.5 };
    const current = { x: 0.5, y: 0.5 };
    let animationFrame = 0;
    let resetTimer = 0;

    const clamp = (value: number) => Math.max(0.04, Math.min(0.96, value));
    const setTargetFromPointer = (event: PointerEvent) => {
      const box = hero.getBoundingClientRect();
      target.x = clamp((event.clientX - box.left) / box.width);
      target.y = clamp((event.clientY - box.top) / box.height);
      hero.classList.add('is-interacting');
      window.clearTimeout(resetTimer);
      if (event.pointerType === 'touch') {
        resetTimer = window.setTimeout(() => hero.classList.remove('is-interacting'), 1400);
      }
    };
    const resetTarget = () => {
      target.x = 0.5;
      target.y = 0.5;
      hero.classList.remove('is-interacting');
    };
    const render = () => {
      current.x += (target.x - current.x) * 0.085;
      current.y += (target.y - current.y) * 0.085;
      hero.style.setProperty('--pointer-x', `${current.x * 100}%`);
      hero.style.setProperty('--pointer-y', `${current.y * 100}%`);
      hero.style.setProperty('--parallax-x', `${(current.x - 0.5) * 18}px`);
      hero.style.setProperty('--parallax-y', `${(current.y - 0.5) * 14}px`);
      animationFrame = requestAnimationFrame(render);
    };

    hero.addEventListener('pointermove', setTargetFromPointer);
    hero.addEventListener('pointerdown', setTargetFromPointer);
    hero.addEventListener('pointerleave', resetTarget);
    if (!reduceMotion) animationFrame = requestAnimationFrame(render);
    return () => {
      window.clearTimeout(resetTimer);
      cancelAnimationFrame(animationFrame);
      hero.removeEventListener('pointermove', setTargetFromPointer);
      hero.removeEventListener('pointerdown', setTargetFromPointer);
      hero.removeEventListener('pointerleave', resetTarget);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <div className="noise" />
      <header className={`fixed inset-x-0 top-0 z-40 border-b transition-all duration-500 ${scrolled ? 'header-glass py-3' : 'border-transparent py-5'} ${menuOpen ? 'mobile-header-open' : ''}`}>
        <div className="container-wide flex items-center justify-between">
          <a href="#inicio" onClick={closeMenu} className="group flex items-center gap-3" data-testid="link-logo">
            <BrandLockup compact />
          </a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
            {navItems.map(([label, href]) => <a key={href} href={href} className="nav-link text-[14px] font-semibold tracking-[.02em]" data-testid={`link-nav-${label.toLowerCase()}`}>{label}</a>)}
          </nav>
          <a href={whatsappHref('Olá, gostaria de solicitar um orçamento para o meu projeto.')} target="_blank" rel="noreferrer" className="gold-button hidden px-5 py-3 text-[10px] uppercase tracking-[.12em] lg:inline-flex" data-testid="link-header-budget">
            Falar com a DK <ArrowRight size={14} />
          </a>
          <button type="button" onClick={() => setMenuOpen(!menuOpen)} className="grid h-10 w-10 place-items-center border border-[#CDA354]/40 text-[#F2DBA9] lg:hidden" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} data-testid="button-mobile-menu">
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
        <div className={`mobile-menu border-t border-[#CDA354]/20 lg:hidden ${menuOpen ? 'open' : ''}`}>
          <nav className="container-wide grid gap-1 py-4" aria-label="Navegação mobile">
            {navItems.map(([label, href]) => <a key={href} href={href} onClick={closeMenu} className="py-3 text-sm text-[#d8d0c3] transition-colors hover:text-[#F2DBA9]" data-testid={`link-mobile-${label.toLowerCase()}`}>{label}</a>)}
            <a href={whatsappHref('Olá, gostaria de solicitar um orçamento para o meu projeto.')} target="_blank" rel="noreferrer" onClick={closeMenu} className="gold-button mt-3 px-5 py-3 text-[10px] uppercase tracking-[.12em]" data-testid="link-mobile-budget">Solicitar orçamento <ArrowRight size={14} /></a>
          </nav>
        </div>
      </header>

      <main>
        <section ref={heroRef} id="inicio" className="hero-vignette hero-grid hero-stage relative flex min-h-[800px] items-center overflow-hidden pt-28 md:min-h-[850px]">
          <div className="hero-pointer-glow" aria-hidden="true" />
          <div className="hero-scanline" aria-hidden="true" />
          <div className="hero-pointer-ring" aria-hidden="true" />
          <div className="container-wide relative z-10 grid items-center gap-8 pb-14 lg:grid-cols-[.92fr_1.08fr] lg:gap-0 lg:pb-0">
            <div className="reveal">
              <h1 className="hero-title display mt-8 max-w-2xl text-[clamp(3.4rem,7.6vw,7.25rem)] font-semibold leading-[.84] text-[#f3efe6]">
                Sua operação cresceu.<br /><span className="gold-text">Sua tecnologia acompanhou?</span>
              </h1>
              <p className="mt-8 max-w-lg text-lg leading-8 text-[#b8afa2] md:text-xl">Construímos sistemas, automações e infraestruturas digitais sob medida.</p>
              <p className="mt-4 max-w-md text-sm leading-6 text-[#847c72]">Para empresas que precisam operar em outra escala, com tecnologia conectada ao negócio.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href={whatsappHref('Olá, gostaria de diagnosticar a operação da minha empresa com a DK CODE.')} target="_blank" rel="noreferrer" className="gold-button px-6 py-4 text-xs uppercase tracking-[.1em]" data-testid="link-hero-budget">Diagnosticar minha operação <ArrowRight size={15} /></a>
                <a href="#servicos" className="ghost-button px-6 py-4 text-xs uppercase tracking-[.1em]" data-testid="link-hero-services">Conhecer serviços <ArrowDown size={15} /></a>
              </div>
              <div className="mt-12 flex items-center gap-3 text-[10px] uppercase tracking-[.16em] text-[#6f685e]"><span className="h-px w-10 bg-[#A47F3F]" /> Design + tecnologia + precisão</div>
            </div>
            <div className="reveal delay-2 relative flex justify-center lg:justify-end">
              <div className="hero-visual hero-visual-desktop">
                <TechnologyPlanet />
              </div>
              <div className="mobile-hero-art" aria-hidden="true">
                <div className="mobile-hero-orbit mobile-hero-orbit-one" />
                <div className="mobile-hero-orbit mobile-hero-orbit-two" />
                <div className="mobile-hero-core"><span>DK</span><i>CODE</i></div>
                <span className="mobile-hero-star star-one" />
                <span className="mobile-hero-star star-two" />
                <span className="mobile-hero-star star-three" />
                <span className="mobile-hero-caption">design + tecnologia</span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[10px] uppercase tracking-[.18em] text-[#6f685e] md:flex">Explore o universo DK <ArrowDown size={13} /></div>
        </section>

        <section id="problema" className="section-dark problem-section">
          <div className="container-wide">
            <div className="problem-layout">
              <div className="reveal problem-intro">
                <span className="eyebrow">O problema</span>
                <h2 className="display problem-title">Sua empresa não precisa de mais uma ferramenta.<br /><em className="gold-text not-italic">Precisa de uma infraestrutura digital.</em></h2>
                <p className="problem-lead">Empresas crescem em ritmo maior que sua tecnologia. O resultado é uma operação sustentada por remendos: sistemas isolados, planilhas críticas e decisões tomadas sem dados confiáveis.</p>
                <p className="problem-resolution">A DK CODE conecta tudo isso em um ecossistema digital inteligente.</p>
              </div>
              <div className="problem-grid">
                {problems.map(([number, label], index) => <article className={`problem-item reveal delay-${(index % 3) + 1}`} key={number}><span className="problem-number">{number}</span><h3>{label}</h3></article>)}
              </div>
            </div>
          </div>
        </section>

        <section className="section-paper relative py-20 md:py-28">
          <div className="container-wide">
            <div className="reveal grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
              <div><span className="eyebrow">Posicionamento</span><h2 className="display mt-5 text-4xl font-semibold leading-none md:text-6xl">Tecnologia feita<br /><em className="gold-text not-italic">sob medida.</em></h2></div>
              <p className="max-w-xl text-base leading-8 text-[#a8a096]">Criamos sites, aplicativos, sistemas, CRMs, softwares e automações para empresas que buscam presença, eficiência e inovação.</p>
            </div>
            <div className="mt-16 grid border-t border-[#a58c62]/30 md:grid-cols-3">
              {[
                ['01', 'Design Premium', 'Interfaces modernas, sofisticadas e pensadas para gerar uma experiência diferenciada.'],
                ['02', 'Tecnologia', 'Soluções desenvolvidas com tecnologias modernas e arquitetura preparada para evolução.'],
                ['03', 'Sob Medida', 'Cada projeto é desenvolvido de acordo com as necessidades específicas do negócio.'],
              ].map(([number, title, body], index) => <article className={`reveal delay-${index + 1} border-b border-[#a58c62]/30 py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0`} key={title}><span className="font-mono text-xs text-[#A47F3F]">{number}</span><h3 className="display mt-8 text-2xl font-semibold">{title}</h3><p className="mt-4 text-sm leading-6 text-[#a8a096]">{body}</p></article>)}
            </div>
          </div>
        </section>

        <section id="servicos" className="section-dark py-24 md:py-32">
          <div className="container-wide">
            <SectionHeading eyebrow="O que fazemos" title="Soluções digitais completas">Da presença digital à automação da operação, construímos a tecnologia que o seu negócio precisa.</SectionHeading>
            <div className="mt-16 grid gap-4 lg:grid-cols-3">
              {services.map(({ icon: Icon, number, title, body }, index) => <article className={`feature-card reveal delay-${index + 1} p-7 md:p-9`} key={title} data-testid={`card-service-${number}`}>
                <div className="flex items-start justify-between"><div className="icon-box grid h-12 w-12 place-items-center"><Icon size={21} strokeWidth={1.4} /></div><span className="font-mono text-xs text-[#746754]">{number}</span></div>
                <h3 className="display mt-16 text-3xl font-semibold text-[#f3efe6]">{title}</h3><p className="mt-4 min-h-[72px] text-sm leading-6 text-[#a8a096]">{body}</p>
                <a href={whatsappHref(`Olá, gostaria de saber mais sobre ${title}.`)} target="_blank" rel="noreferrer" className="project-link mt-8" data-testid={`link-service-${number}`}>Saiba mais <ArrowRight size={14} /></a>
              </article>)}
            </div>
          </div>
        </section>

        <section id="parceiros" className="section-paper relative overflow-hidden py-24 md:py-32">
          <div className="absolute -right-24 top-10 h-80 w-80 rounded-full border border-[#B8914B]/10" />
          <div className="container-wide relative">
            <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
              <SectionHeading eyebrow="Nossos parceiros" title="Marcas que constroem com a DK CODE." />
              <p className="max-w-xl text-base leading-8 text-[#a8a096]">Este espaço será dedicado aos parceiros que autorizarem a apresentação de suas marcas e dos projetos desenvolvidos em conjunto.</p>
            </div>
            <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ['01', 'Protegê', 'Parceiro DK CODE'],
                ['02', 'Logo do parceiro', 'Serviço desenvolvido'],
                ['03', 'Logo do parceiro', 'Serviço desenvolvido'],
                ['04', 'Logo do parceiro', 'Serviço desenvolvido'],
              ].map(([number, label, detail], index) => <div className="partner-slot reveal" key={number} data-testid={`partner-slot-${number}`}>
                <span className="font-mono text-[10px] tracking-[.15em] text-[#A47F3F]">{number}</span>
                <div className={`partner-slot-logo${index === 0 ? ' partner-slot-logo-image' : ''}`}>
                  {index === 0 ? <img src="/partner-protegeo.png" alt="Protegê — Protegendo seus bens" /> : <span>{label}</span>}
                </div>
                <p className="mt-5 text-[10px] uppercase tracking-[.14em] text-[#A47F3F]">{detail}</p>
              </div>)}
            </div>
            <div className="mt-8 flex flex-col justify-between gap-5 border-t border-[#a58c62]/30 pt-6 text-sm text-[#a8a096] md:flex-row md:items-center">
              <p>Novas histórias e identidades serão adicionadas aqui com autorização.</p>
              <a href={whatsappHref('Olá, gostaria de apresentar minha empresa como parceira da DK CODE.')} target="_blank" rel="noreferrer" className="project-link !text-[#A47F3F]" data-testid="link-partner-whatsapp">Quero ser parceiro <ArrowRight size={14} /></a>
            </div>
          </div>
        </section>

        <section id="processo" className="section-dark py-24 md:py-32">
          <div className="container-wide">
            <SectionHeading eyebrow="Como funciona" title="Nosso processo">Um método claro do briefing à entrega.</SectionHeading>
            <div className="process-timeline">
              <div className="timeline-snake" aria-hidden="true" />
              {process.map(([number, title, body], index) => <article className={`process-step process-step-${index % 2 === 0 ? 'left' : 'right'} reveal delay-${(index % 3) + 1}`} key={number}><div className="timeline-dot">{number}</div><div className="process-copy"><h3 className="display text-xl font-semibold text-[#f3efe6]">{title}</h3><p className="mt-2 max-w-[290px] text-sm leading-6 text-[#8c8479]">{body}</p></div></article>)}
            </div>
          </div>
        </section>

        <section className="section-paper py-24 md:py-32">
          <div className="container-wide">
            <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
              <SectionHeading eyebrow="Por que a DK CODE" title="Diferenciais que aparecem no resultado." />
              <div className="grid grid-cols-2 gap-x-4 gap-y-0 border-t border-[#a58c62]/30 sm:grid-cols-3">
                {differentiators.map(([Icon, label], index) => <div className={`reveal delay-${(index % 3) + 1} flex items-center gap-3 border-b border-[#a58c62]/30 py-5`} key={label as string}><Icon size={17} strokeWidth={1.4} className="text-[#A47F3F]" /><span className="text-sm text-[#d8d0c3]">{label as string}</span></div>)}
              </div>
            </div>
          </div>
        </section>

        <section id="sobre" className="section-ink py-24 md:py-32">
          <div className="container-wide grid gap-16 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="reveal relative min-h-[480px] overflow-hidden border border-[#CDA354]/20 bg-[#1a1510] p-8">
              <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'linear-gradient(rgba(205,163,84,.11) 1px, transparent 1px), linear-gradient(90deg, rgba(205,163,84,.11) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
              <div className="absolute left-1/2 top-1/2 grid h-52 w-52 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#CDA354]/60 bg-[radial-gradient(circle,#6b5228,#16110c_67%)] shadow-[0_0_80px_rgba(205,163,84,.16)]"><img src={logoFull} alt="DK CODE" className="h-40 w-32 object-contain" /></div>
              <div className="absolute left-8 top-8 font-mono text-[10px] uppercase tracking-[.17em] text-[#CDA354]">Sobre a DK CODE</div><div className="absolute bottom-8 right-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.17em] text-[#837b70]"><Sparkles size={13} className="text-[#CDA354]" /> Tecnologia com propósito</div>
            </div>
            <div><SectionHeading eyebrow="Sobre a DK CODE" title="Tecnologia com propósito">Somos um estúdio de desenvolvimento focado em criar experiências digitais que combinam design refinado, performance técnica e resultado comercial. Trabalhamos lado a lado com nossos clientes para entregar projetos únicos, escaláveis e feitos para converter.</SectionHeading><div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-8 border-t border-[#CDA354]/20 pt-8">{['Design premium', 'Performance', 'SEO', 'Suporte contínuo'].map((item) => <div className="flex items-center gap-3 text-sm text-[#c7beb0]" key={item}><Check size={15} className="text-[#CDA354]" /> {item}</div>)}</div></div>
          </div>
        </section>

        <section id="faq" className="section-ink py-24 md:py-32">
          <div className="container-wide grid gap-16 lg:grid-cols-[.7fr_1.3fr]"><SectionHeading eyebrow="FAQ" title="Dúvidas frequentes">Respostas objetivas para você avançar com clareza.</SectionHeading><div>{faqs.map(([question, answer], index) => <div className="faq-row" key={question}><button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} className="faq-button" aria-expanded={openFaq === index} aria-controls={`faq-answer-${index}`} data-testid={`button-faq-${index}`}><span>{question}</span><Plus size={19} /></button><div id={`faq-answer-${index}`} className={`grid transition-[grid-template-rows] duration-300 ${openFaq === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}><div className="overflow-hidden"><p className="max-w-2xl pb-6 pr-10 text-sm leading-7 text-[#9b9286]">{answer}</p></div></div></div>)}</div></div>
        </section>

        <section id="contato" className="section-paper relative overflow-hidden py-24 md:py-32">
          <div className="absolute -right-20 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full border border-[#B8914B]/15" /><div className="absolute -right-8 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full border border-[#B8914B]/20" />
          <div className="container-wide relative grid gap-12 lg:grid-cols-[1fr_.8fr] lg:items-end"><div><SectionHeading eyebrow="Contato" title="Vamos conversar"><strong>Pronto para crescer?</strong><br />Conte-nos sobre o seu projeto. Respondemos em até 24 horas úteis com uma proposta personalizada.</SectionHeading><div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center"><a href={whatsappHref('Olá, gostaria de conversar sobre um projeto para a minha empresa.')} target="_blank" rel="noreferrer" className="gold-button px-7 py-4 text-xs uppercase tracking-[.1em]" data-testid="link-contact-whatsapp">Falar pelo WhatsApp <MessageCircle size={15} /></a></div></div><div className="border-l border-[#a58c62]/30 pl-7"><p className="font-mono text-[10px] uppercase tracking-[.15em] text-[#A47F3F]">Canal direto</p><a href={whatsappHref('Olá, gostaria de solicitar um orçamento para o meu projeto.')} target="_blank" rel="noreferrer" className="display mt-4 block text-3xl font-semibold text-[#f3efe6] transition-colors hover:text-[#A47F3F]" data-testid="link-contact-direct">WhatsApp direto <MoveUpRight className="inline" size={20} /></a><p className="mt-3 text-sm leading-6 text-[#a8a096]">Sem formulário. Apenas uma conversa sobre o que você quer construir.</p></div></div>
        </section>
      </main>

      <footer className="border-t border-[#CDA354]/18 bg-[#100e0b] py-12">
        <div className="container-wide grid gap-12 md:grid-cols-[1.4fr_.7fr_.8fr]">
          <div><a href="#inicio" className="inline-flex" data-testid="link-footer-logo"><BrandLockup /></a><p className="mt-6 max-w-xs text-sm leading-6 text-[#847c72]">Infraestrutura digital premium. Sistemas, automações e softwares sob medida.</p><div className="mt-7 flex gap-3"><a href="https://www.instagram.com/dk_codeoficial?stkn=NDc1cjd5aWhmeDJ3" target="_blank" rel="noreferrer" aria-label="Instagram da DK CODE" className="text-[#847c72] transition-colors hover:text-[#F2DBA9]" data-testid="link-footer-instagram"><Instagram size={17} /></a></div></div>
          <div><p className="font-mono text-[10px] uppercase tracking-[.15em] text-[#CDA354]">Navegação</p><div className="mt-5 grid gap-3">{[['Início', '#inicio'], ['Serviços', '#servicos'], ['Contato', '#contato']].map(([label, href]) => <a href={href} key={href} className="text-sm text-[#9c9387] transition-colors hover:text-[#F2DBA9]" data-testid={`link-footer-${label.toLowerCase()}`}>{label}</a>)}</div></div>
          <div><p className="font-mono text-[10px] uppercase tracking-[.15em] text-[#CDA354]">Contato</p><div className="mt-5 grid gap-3"><a href={whatsappHref('Olá, gostaria de falar com a DK CODE.')} target="_blank" rel="noreferrer" className="text-sm text-[#9c9387] transition-colors hover:text-[#F2DBA9]" data-testid="link-footer-whatsapp">WhatsApp</a></div></div>
        </div>
        <div className="container-wide mt-12 flex flex-col justify-between gap-3 border-t border-[#CDA354]/15 pt-6 text-[10px] uppercase tracking-[.13em] text-[#6f685e] md:flex-row"><span>© 2026 DK CODE. Todos os direitos reservados.</span></div>
      </footer>
      <CookieConsent />
    </div>
  );
}

export default App;
