import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Blocks,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Code2,
  Gauge,
  Globe2,
  Instagram,
  Layers3,
  Linkedin,
  Mail,
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

const whatsappNumber = '5511963079086';
const whatsappHref = (message: string) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
const logoMark = '/dk-code-mark.png';
const logoFull = '/dk-code-logo.png';

const navItems = [
  ['Início', '#inicio'],
  ['Serviços', '#servicos'],
  ['Portfólio', '#portfolio'],
  ['Parceiros', '#parceiros'],
  ['Processo', '#processo'],
  ['Sobre', '#sobre'],
  ['Depoimentos', '#depoimentos'],
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
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const particles = Array.from({ length: 34 }, (_, index) => ({
      angle: (index / 34) * Math.PI * 2,
      radius: 0.45 + ((index * 17) % 46) / 100,
      speed: 0.00012 + ((index * 13) % 5) * 0.000025,
      size: 0.7 + (index % 3) * 0.55,
    }));
    let animationFrame = 0;
    let rotation = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const box = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = box.width;
      height = box.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const render = (time: number) => {
      if (!width || !height) resize();
      context.clearRect(0, 0, width, height);
      const cx = width * 0.5 + pointer.current.x * width * 0.025;
      const cy = height * 0.5 + pointer.current.y * height * 0.018;
      const radius = Math.min(width, height) * 0.31;
      const atmosphere = context.createRadialGradient(cx - radius * .32, cy - radius * .4, radius * .1, cx, cy, radius * 1.23);
      atmosphere.addColorStop(0, '#3c3021');
      atmosphere.addColorStop(.53, '#15120f');
      atmosphere.addColorStop(.83, '#0b0b0a');
      atmosphere.addColorStop(1, 'rgba(16,14,11,0)');
      context.beginPath();
      context.arc(cx, cy, radius * 1.18, 0, Math.PI * 2);
      context.fillStyle = atmosphere;
      context.fill();

      context.save();
      context.beginPath();
      context.arc(cx, cy, radius, 0, Math.PI * 2);
      context.clip();
      const sphere = context.createRadialGradient(cx - radius * .4, cy - radius * .5, radius * .08, cx + radius * .08, cy + radius * .1, radius * 1.05);
      sphere.addColorStop(0, '#5c4a2d');
      sphere.addColorStop(.2, '#292219');
      sphere.addColorStop(.63, '#12100e');
      sphere.addColorStop(1, '#070807');
      context.fillStyle = sphere;
      context.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

      context.globalAlpha = .45;
      context.strokeStyle = '#b8860b';
      context.lineWidth = .7;
      for (let latitude = -2; latitude <= 2; latitude += 1) {
        const y = cy + latitude * radius * .22;
        const heightLine = Math.sqrt(Math.max(0, radius * radius - (y - cy) * (y - cy)));
        context.beginPath();
        context.ellipse(cx, y, heightLine, Math.max(7, radius * (.11 - Math.abs(latitude) * .015)), 0, 0, Math.PI * 2);
        context.stroke();
      }
      for (let longitude = -2; longitude <= 2; longitude += 1) {
        const x = cx + longitude * radius * .27 + Math.sin(rotation * .5) * radius * .08;
        const widthLine = Math.sqrt(Math.max(0, radius * radius - (x - cx) * (x - cx)));
        context.beginPath();
        context.ellipse(x, cy, Math.max(7, radius * (.12 - Math.abs(longitude) * .015)), widthLine, 0, 0, Math.PI * 2);
        context.stroke();
      }
      context.globalAlpha = .32;
      context.strokeStyle = '#f1d67a';
      context.lineWidth = 1;
      for (let index = 0; index < 5; index += 1) {
        const y = cy - radius * .5 + index * radius * .25 + Math.sin(rotation + index) * 2;
        context.beginPath();
        context.moveTo(cx - radius, y);
        context.lineTo(cx + radius, y + Math.cos(index) * 16);
        context.stroke();
      }
      context.restore();

      context.save();
      context.globalCompositeOperation = 'lighter';
      particles.forEach((particle, index) => {
        const orbitAngle = particle.angle + time * particle.speed + rotation * .25;
        const px = cx + Math.cos(orbitAngle) * radius * (1.1 + particle.radius * .17);
        const py = cy + Math.sin(orbitAngle) * radius * (.55 + particle.radius * .14);
        context.globalAlpha = .2 + (index % 5) * .1;
        context.fillStyle = index % 4 === 0 ? '#fff0a6' : '#d4af37';
        context.beginPath();
        context.arc(px, py, particle.size, 0, Math.PI * 2);
        context.fill();
      });
      context.globalAlpha = .35;
      context.strokeStyle = '#d4af37';
      context.lineWidth = 1;
      for (let index = 0; index < 4; index += 1) {
        const start = rotation * .4 + index * 1.7;
        context.beginPath();
        context.moveTo(cx + Math.cos(start) * radius * .78, cy + Math.sin(start) * radius * .7);
        context.lineTo(cx + Math.cos(start + .25) * radius * 1.28, cy + Math.sin(start + .25) * radius * 1.03);
        context.stroke();
      }
      context.restore();

      if (!reduced) {
        rotation += 0.004;
        animationFrame = requestAnimationFrame(render);
      }
    };
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      const box = canvas.getBoundingClientRect();
      pointer.current = {
        x: (event.clientX - box.left - box.width / 2) / box.width,
        y: (event.clientY - box.top - box.height / 2) / box.height,
      };
    };
    const resetPointer = () => { pointer.current = { x: 0, y: 0 }; };
    resize();
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerleave', resetPointer);
    window.addEventListener('resize', resize);
    render(0);
    if (reduced) cancelAnimationFrame(animationFrame);
    return () => {
      cancelAnimationFrame(animationFrame);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', resetPointer);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="planet-wrap" aria-label="Planeta tecnológico animado" role="img">
      <div className="orbit" />
      <div className="orbit orbit-two" />
      <canvas ref={canvasRef} className="planet-canvas" />
      <span className="planet-tag one">sistemas em órbita</span>
      <span className="planet-tag two">código vivo</span>
      <span className="planet-tag three">dk / 01</span>
    </div>
  );
}

function SectionHeading({ eyebrow, title, children, light = false }: { eyebrow: string; title: string; children?: ReactNode; light?: boolean }) {
  return (
    <div className={`reveal max-w-3xl ${light ? 'text-[#201a13]' : ''}`}>
      <span className={`eyebrow ${light ? 'text-[#8c6a1d]' : ''}`}>{eyebrow}</span>
      <h2 className="display mt-5 text-4xl font-semibold leading-[.98] tracking-[-.06em] md:text-6xl">{title}</h2>
      {children && <p className={`mt-6 max-w-xl text-base leading-7 ${light ? 'text-[#5f5549]' : 'text-[#a8a096]'}`}>{children}</p>}
    </div>
  );
}

const services = [
  { icon: Globe2, number: '01', title: 'Sites', body: 'Sites institucionais rápidos, modernos, responsivos e otimizados para Google.' },
  { icon: MousePointer2, number: '02', title: 'Landing Pages', body: 'Landing Pages criadas para gerar mais contatos e aumentar conversões.' },
  { icon: Blocks, number: '03', title: 'Sistemas', body: 'Sistemas personalizados para automatizar processos e aumentar a produtividade.' },
];

const projects = [
  ['Barbearia Premium', 'Landing page elegante para agendamentos e apresentação de serviços.', 'barber'],
  ['Clínica de Estética', 'Site sofisticado com tons claros e agendamento online.', 'clinic'],
  ['Imobiliária', 'Portal moderno com busca de imóveis e integração com CRM.', 'realestate'],
  ['Academia', 'Design esportivo com planos, aulas e captação de alunos.', 'gym'],
  ['Restaurante', 'Cardápio digital elegante e reservas online.', 'restaurant'],
  ['Escritório de Advocacia', 'Site corporativo com áreas de atuação e contato direto.', 'law'],
  ['Clínica Odontológica', 'Interface moderna com apresentação de tratamentos.', 'dental'],
  ['Loja de Roupas', 'E-commerce premium com catálogo e checkout.', 'fashion'],
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

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  useScrollReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const testimonials = [['“Excelente atendimento e um site muito acima das expectativas. Superou tudo que imaginávamos.”', 'Carla Meireles', 'CEO — Studio Vittá']];
  const currentTestimonial = testimonials[testimonialIndex];

  return (
    <div className="site-shell">
      <div className="noise" />
      <header className={`fixed inset-x-0 top-0 z-40 border-b transition-all duration-500 ${scrolled ? 'header-glass py-3' : 'border-transparent py-5'}`}>
        <div className="container-wide flex items-center justify-between">
          <a href="#inicio" onClick={closeMenu} className="group flex items-center gap-3" data-testid="link-logo">
            <img src={logoMark} alt="DK CODE" className="header-logo-mark transition-transform group-hover:rotate-6" />
          </a>
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Navegação principal">
            {navItems.map(([label, href]) => <a key={href} href={href} className="nav-link text-[11px] font-medium tracking-[.05em]" data-testid={`link-nav-${label.toLowerCase()}`}>{label}</a>)}
          </nav>
          <a href={whatsappHref('Olá, gostaria de solicitar um orçamento para o meu projeto.')} target="_blank" rel="noreferrer" className="gold-button hidden px-5 py-3 text-[10px] uppercase tracking-[.12em] lg:inline-flex" data-testid="link-header-budget">
            Falar com a DK <ArrowRight size={14} />
          </a>
          <button type="button" onClick={() => setMenuOpen(!menuOpen)} className="grid h-10 w-10 place-items-center border border-[#d4af37]/40 text-[#fff0a6] lg:hidden" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} data-testid="button-mobile-menu">
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
        <div className={`mobile-menu border-t border-[#d4af37]/20 lg:hidden ${menuOpen ? 'open' : ''}`}>
          <nav className="container-wide grid gap-1 py-4" aria-label="Navegação mobile">
            {navItems.map(([label, href]) => <a key={href} href={href} onClick={closeMenu} className="py-3 text-sm text-[#d8d0c3] transition-colors hover:text-[#fff0a6]" data-testid={`link-mobile-${label.toLowerCase()}`}>{label}</a>)}
            <a href={whatsappHref('Olá, gostaria de solicitar um orçamento para o meu projeto.')} target="_blank" rel="noreferrer" onClick={closeMenu} className="gold-button mt-3 px-5 py-3 text-[10px] uppercase tracking-[.12em]" data-testid="link-mobile-budget">Solicitar orçamento <ArrowRight size={14} /></a>
          </nav>
        </div>
      </header>

      <main>
        <section id="inicio" className="hero-vignette hero-grid relative flex min-h-[800px] items-center overflow-hidden pt-28 md:min-h-[850px]">
          <div className="container-wide relative z-10 grid items-center gap-8 pb-14 lg:grid-cols-[.92fr_1.08fr] lg:gap-0 lg:pb-0">
            <div className="reveal">
              <span className="eyebrow">Estúdio digital independente</span>
              <h1 className="hero-title display mt-8 max-w-2xl text-[clamp(3.4rem,7.6vw,7.25rem)] font-semibold leading-[.84] text-[#f3efe6]">
                Desenvolvimento<br /><span className="gold-text">Web Premium</span>
              </h1>
              <p className="mt-8 max-w-lg text-lg leading-8 text-[#b8afa2] md:text-xl">Transformamos ideias em soluções digitais.</p>
              <p className="mt-4 max-w-md text-sm leading-6 text-[#847c72]">Criamos Sites, Landing Pages e Sistemas personalizados para empresas que desejam crescer na internet.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href={whatsappHref('Olá, gostaria de solicitar um orçamento para o meu projeto.')} target="_blank" rel="noreferrer" className="gold-button px-6 py-4 text-xs uppercase tracking-[.1em]" data-testid="link-hero-budget">Solicitar orçamento <ArrowRight size={15} /></a>
                <a href="#portfolio" className="ghost-button px-6 py-4 text-xs uppercase tracking-[.1em]" data-testid="link-hero-projects">Ver projetos <ArrowDown size={15} /></a>
              </div>
              <div className="mt-12 flex items-center gap-3 text-[10px] uppercase tracking-[.16em] text-[#6f685e]"><span className="h-px w-10 bg-[#8c6a1d]" /> Design + tecnologia + precisão</div>
            </div>
            <div className="reveal delay-2 relative flex justify-center lg:justify-end">
              <TechnologyPlanet />
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[10px] uppercase tracking-[.18em] text-[#6f685e] md:flex">Explore o universo DK <ArrowDown size={13} /></div>
        </section>

        <section className="section-paper relative py-20 md:py-28">
          <div className="container-wide">
            <div className="reveal grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
              <div><span className="eyebrow">Posicionamento</span><h2 className="display mt-5 text-4xl font-semibold leading-none md:text-6xl">Tecnologia feita<br /><em className="gold-text not-italic">sob medida.</em></h2></div>
              <p className="max-w-xl text-base leading-8 text-[#5f5549]">Desenvolvemos experiências digitais personalizadas para empresas que buscam presença, eficiência e inovação no ambiente digital.</p>
            </div>
            <div className="mt-16 grid border-t border-[#a58c62]/30 md:grid-cols-3">
              {[
                ['01', 'Design Premium', 'Interfaces modernas, sofisticadas e pensadas para gerar uma experiência diferenciada.'],
                ['02', 'Tecnologia', 'Soluções desenvolvidas com tecnologias modernas e arquitetura preparada para evolução.'],
                ['03', 'Sob Medida', 'Cada projeto é desenvolvido de acordo com as necessidades específicas do negócio.'],
              ].map(([number, title, body], index) => <article className={`reveal delay-${index + 1} border-b border-[#a58c62]/30 py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0`} key={title}><span className="font-mono text-xs text-[#8c6a1d]">{number}</span><h3 className="display mt-8 text-2xl font-semibold">{title}</h3><p className="mt-4 text-sm leading-6 text-[#6d6256]">{body}</p></article>)}
            </div>
          </div>
        </section>

        <section id="servicos" className="section-dark py-24 md:py-32">
          <div className="container-wide">
            <SectionHeading eyebrow="O que fazemos" title="Serviços sob medida">Soluções completas para posicionar sua marca no digital.</SectionHeading>
            <div className="mt-16 grid gap-4 lg:grid-cols-3">
              {services.map(({ icon: Icon, number, title, body }, index) => <article className={`feature-card reveal delay-${index + 1} p-7 md:p-9`} key={title} data-testid={`card-service-${number}`}>
                <div className="flex items-start justify-between"><div className="icon-box grid h-12 w-12 place-items-center"><Icon size={21} strokeWidth={1.4} /></div><span className="font-mono text-xs text-[#746754]">{number}</span></div>
                <h3 className="display mt-16 text-3xl font-semibold text-[#f3efe6]">{title}</h3><p className="mt-4 min-h-[72px] text-sm leading-6 text-[#a8a096]">{body}</p>
                <a href={whatsappHref(`Olá, gostaria de saber mais sobre ${title}.`)} target="_blank" rel="noreferrer" className="project-link mt-8" data-testid={`link-service-${number}`}>Saiba mais <ArrowRight size={14} /></a>
              </article>)}
            </div>
          </div>
        </section>

        <section id="portfolio" className="section-ink py-24 md:py-32">
          <div className="container-wide">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><SectionHeading eyebrow="Portfólio" title="Projetos que geram resultado">Uma seleção dos nossos trabalhos recentes.</SectionHeading><span className="hidden font-mono text-[10px] uppercase tracking-[.16em] text-[#6f685e] md:block">Seleção / sob medida</span></div>
            <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {projects.map(([title, body, art], index) => <article className={`project-card reveal delay-${(index % 3) + 1} ${index === 0 || index === 3 ? 'lg:col-span-2' : ''}`} key={title} data-testid={`card-project-${index}`}><div className={`project-art art-${art}`} /><div className="project-label"><h3 className="display text-2xl font-semibold text-[#f3efe6]">{title}</h3><p className="mt-2 max-w-sm text-xs leading-5 text-[#d5cbbd]">{body}</p><a href={whatsappHref(`Olá, gostaria de conhecer o projeto ${title}.`)} target="_blank" rel="noreferrer" className="project-link mt-5" data-testid={`link-project-${index}`}>Ver Projeto <MoveUpRight size={14} /></a></div></article>)}
            </div>
          </div>
        </section>

        <section id="parceiros" className="section-paper relative overflow-hidden py-24 md:py-32">
          <div className="absolute -right-24 top-10 h-80 w-80 rounded-full border border-[#b8860b]/10" />
          <div className="container-wide relative">
            <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
              <SectionHeading light eyebrow="Nossos parceiros" title="Marcas que constroem com a DK CODE." />
              <p className="max-w-xl text-base leading-8 text-[#5f5549]">Este espaço será dedicado aos parceiros que autorizarem a apresentação de suas marcas e dos projetos desenvolvidos em conjunto.</p>
            </div>
            <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ['01', 'Logo do parceiro', 'Serviço desenvolvido'],
                ['02', 'Logo do parceiro', 'Serviço desenvolvido'],
                ['03', 'Logo do parceiro', 'Serviço desenvolvido'],
                ['04', 'Logo do parceiro', 'Serviço desenvolvido'],
              ].map(([number, label, detail]) => <div className="partner-slot reveal" key={number} data-testid={`partner-slot-${number}`}>
                <span className="font-mono text-[10px] tracking-[.15em] text-[#8c6a1d]">{number}</span>
                <div className="partner-slot-logo"><span>{label}</span></div>
                <p className="mt-5 text-[10px] uppercase tracking-[.14em] text-[#8c6a1d]">{detail}</p>
              </div>)}
            </div>
            <div className="mt-8 flex flex-col justify-between gap-5 border-t border-[#a58c62]/30 pt-6 text-sm text-[#6d6256] md:flex-row md:items-center">
              <p>Novas histórias e identidades serão adicionadas aqui com autorização.</p>
              <a href={whatsappHref('Olá, gostaria de apresentar minha empresa como parceira da DK CODE.')} target="_blank" rel="noreferrer" className="project-link !text-[#8c6a1d]" data-testid="link-partner-whatsapp">Quero ser parceiro <ArrowRight size={14} /></a>
            </div>
          </div>
        </section>

        <section id="processo" className="section-dark py-24 md:py-32">
          <div className="container-wide">
            <SectionHeading eyebrow="Como funciona" title="Nosso processo">Um método claro do briefing à entrega.</SectionHeading>
            <div className="relative mt-20 grid gap-10 md:grid-cols-6 md:gap-3">
              <div className="timeline-line" />
              {process.map(([number, title, body], index) => <article className={`reveal delay-${(index % 3) + 1} relative z-10 flex gap-5 md:block`} key={number}><div className="timeline-dot shrink-0">{number}</div><div className="pt-1 md:pt-8"><h3 className="display text-xl font-semibold text-[#f3efe6]">{title}</h3><p className="mt-3 max-w-[175px] text-sm leading-6 text-[#8c8479]">{body}</p></div></article>)}
            </div>
          </div>
        </section>

        <section className="section-paper py-24 md:py-32">
          <div className="container-wide">
            <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
              <SectionHeading light eyebrow="Por que a DK CODE" title="Diferenciais que aparecem no resultado." />
              <div className="grid grid-cols-2 gap-x-4 gap-y-0 border-t border-[#a58c62]/30 sm:grid-cols-3">
                {differentiators.map(([Icon, label], index) => <div className={`reveal delay-${(index % 3) + 1} flex items-center gap-3 border-b border-[#a58c62]/30 py-5`} key={label as string}><Icon size={17} strokeWidth={1.4} className="text-[#8c6a1d]" /><span className="text-sm text-[#51483e]">{label as string}</span></div>)}
              </div>
            </div>
          </div>
        </section>

        <section id="sobre" className="section-ink py-24 md:py-32">
          <div className="container-wide grid gap-16 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="reveal relative min-h-[480px] overflow-hidden border border-[#d4af37]/20 bg-[#1a1510] p-8">
              <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'linear-gradient(rgba(212,175,55,.11) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,.11) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
              <div className="absolute left-1/2 top-1/2 grid h-44 w-44 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#d4af37]/60 bg-[radial-gradient(circle,#6b5228,#16110c_67%)] shadow-[0_0_80px_rgba(212,175,55,.16)]"><img src={logoMark} alt="" className="h-28 w-28 object-contain" /></div>
              <div className="absolute left-8 top-8 font-mono text-[10px] uppercase tracking-[.17em] text-[#d4af37]">Sobre a DK CODE</div><div className="absolute bottom-8 right-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.17em] text-[#837b70]"><Sparkles size={13} className="text-[#d4af37]" /> Tecnologia com propósito</div>
            </div>
            <div><SectionHeading eyebrow="Sobre a DK CODE" title="Tecnologia com propósito">Somos um estúdio de desenvolvimento focado em criar experiências digitais que combinam design refinado, performance técnica e resultado comercial. Trabalhamos lado a lado com nossos clientes para entregar projetos únicos, escaláveis e feitos para converter.</SectionHeading><div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-8 border-t border-[#d4af37]/20 pt-8">{['Design premium', 'Performance', 'SEO', 'Suporte contínuo'].map((item) => <div className="flex items-center gap-3 text-sm text-[#c7beb0]" key={item}><Check size={15} className="text-[#d4af37]" /> {item}</div>)}</div></div>
          </div>
        </section>

        <section id="depoimentos" className="section-dark py-24 md:py-32">
          <div className="container-wide">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><SectionHeading eyebrow="Depoimentos" title="O que dizem sobre nós" /><div className="flex gap-2"><button type="button" onClick={() => setTestimonialIndex((value) => (value - 1 + testimonials.length) % testimonials.length)} className="grid h-11 w-11 place-items-center border border-[#d4af37]/35 text-[#fff0a6] transition-colors hover:bg-[#d4af37]/10" aria-label="Depoimento anterior" data-testid="button-testimonial-prev"><ChevronLeft size={17} /></button><button type="button" onClick={() => setTestimonialIndex((value) => (value + 1) % testimonials.length)} className="grid h-11 w-11 place-items-center border border-[#d4af37]/35 text-[#fff0a6] transition-colors hover:bg-[#d4af37]/10" aria-label="Próximo depoimento" data-testid="button-testimonial-next"><ChevronRight size={17} /></button></div></div>
            <div className="reveal mt-16 grid gap-10 border-y border-[#d4af37]/20 py-12 md:grid-cols-[.25fr_1fr_.6fr] md:items-start"><span className="quote-mark">“</span><blockquote className="display max-w-3xl text-3xl leading-[1.1] text-[#f3efe6] md:text-5xl" key={currentTestimonial[0]}>{currentTestimonial[0]}</blockquote><div className="md:border-l md:border-[#d4af37]/20 md:pl-8"><p className="font-semibold text-[#f3efe6]">{currentTestimonial[1]}</p><p className="mt-2 text-xs uppercase tracking-[.13em] text-[#857c6f]">{currentTestimonial[2]}</p><p className="mt-8 font-mono text-[10px] uppercase tracking-[.16em] text-[#d4af37]">Estrutura preparada para novos depoimentos</p></div></div>
          </div>
        </section>

        <section id="faq" className="section-ink py-24 md:py-32">
          <div className="container-wide grid gap-16 lg:grid-cols-[.7fr_1.3fr]"><SectionHeading eyebrow="FAQ" title="Dúvidas frequentes">Respostas objetivas para você avançar com clareza.</SectionHeading><div>{faqs.map(([question, answer], index) => <div className="faq-row" key={question}><button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} className="faq-button" aria-expanded={openFaq === index} aria-controls={`faq-answer-${index}`} data-testid={`button-faq-${index}`}><span>{question}</span><Plus size={19} /></button><div id={`faq-answer-${index}`} className={`grid transition-[grid-template-rows] duration-300 ${openFaq === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}><div className="overflow-hidden"><p className="max-w-2xl pb-6 pr-10 text-sm leading-7 text-[#9b9286]">{answer}</p></div></div></div>)}</div></div>
        </section>

        <section id="contato" className="section-paper relative overflow-hidden py-24 md:py-32">
          <div className="absolute -right-20 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full border border-[#b8860b]/15" /><div className="absolute -right-8 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full border border-[#b8860b]/20" />
          <div className="container-wide relative grid gap-12 lg:grid-cols-[1fr_.8fr] lg:items-end"><div><SectionHeading light eyebrow="Contato" title="Vamos conversar"><strong>Pronto para crescer?</strong><br />Conte-nos sobre o seu projeto. Respondemos em até 24 horas úteis com uma proposta personalizada.</SectionHeading><div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center"><a href={whatsappHref('Olá, gostaria de conversar sobre um projeto para a minha empresa.')} target="_blank" rel="noreferrer" className="gold-button px-7 py-4 text-xs uppercase tracking-[.1em]" data-testid="link-contact-whatsapp">Falar pelo WhatsApp <MessageCircle size={15} /></a><a href="mailto:contato@dkcode.com.br" className="ghost-button border-[#8c6a1d]/40 !text-[#51483e] px-6 py-4 text-xs uppercase tracking-[.1em] hover:!bg-[#8c6a1d]/5" data-testid="link-contact-email"><Mail size={15} /> contato@dkcode.com.br</a></div></div><div className="border-l border-[#a58c62]/30 pl-7"><p className="font-mono text-[10px] uppercase tracking-[.15em] text-[#8c6a1d]">Canal direto</p><a href={whatsappHref('Olá, gostaria de solicitar um orçamento para o meu projeto.')} target="_blank" rel="noreferrer" className="display mt-4 block text-3xl font-semibold text-[#201a13] transition-colors hover:text-[#8c6a1d]" data-testid="link-contact-direct">WhatsApp direto <MoveUpRight className="inline" size={20} /></a><p className="mt-3 text-sm leading-6 text-[#6d6256]">Sem formulário. Apenas uma conversa sobre o que você quer construir.</p></div></div>
        </section>
      </main>

      <footer className="border-t border-[#d4af37]/18 bg-[#100e0b] py-12">
        <div className="container-wide grid gap-12 md:grid-cols-[1.4fr_.7fr_.8fr]">
          <div><a href="#inicio" className="inline-flex" data-testid="link-footer-logo"><img src={logoFull} alt="DK CODE" className="footer-logo" /></a><p className="mt-6 max-w-xs text-sm leading-6 text-[#847c72]">Desenvolvimento web premium. Sites, Landing Pages e Sistemas sob medida.</p><div className="mt-7 flex gap-3"><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram da DK CODE" className="text-[#847c72] transition-colors hover:text-[#fff0a6]" data-testid="link-footer-instagram"><Instagram size={17} /></a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn da DK CODE" className="text-[#847c72] transition-colors hover:text-[#fff0a6]" data-testid="link-footer-linkedin"><Linkedin size={17} /></a></div></div>
          <div><p className="font-mono text-[10px] uppercase tracking-[.15em] text-[#d4af37]">Navegação</p><div className="mt-5 grid gap-3">{[['Início', '#inicio'], ['Serviços', '#servicos'], ['Portfólio', '#portfolio'], ['Contato', '#contato']].map(([label, href]) => <a href={href} key={href} className="text-sm text-[#9c9387] transition-colors hover:text-[#fff0a6]" data-testid={`link-footer-${label.toLowerCase()}`}>{label}</a>)}</div></div>
          <div><p className="font-mono text-[10px] uppercase tracking-[.15em] text-[#d4af37]">Contato</p><div className="mt-5 grid gap-3"><a href="mailto:contato@dkcode.com.br" className="text-sm text-[#9c9387] transition-colors hover:text-[#fff0a6]" data-testid="link-footer-email">contato@dkcode.com.br</a><a href={whatsappHref('Olá, gostaria de falar com a DK CODE.')} target="_blank" rel="noreferrer" className="text-sm text-[#9c9387] transition-colors hover:text-[#fff0a6]" data-testid="link-footer-whatsapp">WhatsApp</a></div></div>
        </div>
        <div className="container-wide mt-12 flex flex-col justify-between gap-3 border-t border-[#d4af37]/15 pt-6 text-[10px] uppercase tracking-[.13em] text-[#6f685e] md:flex-row"><span>© 2026 DK CODE. Todos os direitos reservados.</span><span>Feito com precisão em preto e ouro.</span></div>
      </footer>
    </div>
  );
}

export default App;