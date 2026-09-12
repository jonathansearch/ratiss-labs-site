import { claims, hero, protocol, registry, roadmap } from './data/content';
import { GlobalThreeBackground } from './components/GlobalThreeBackground';
import type { ReactNode } from 'react';

function Link({ href, children }: { href: string; children: ReactNode; key?: string }) {
  return <a href={href} target="_blank" rel="noreferrer">{children}</a>;
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return <div className="section-heading"><span>{eyebrow}</span><h2>{title}</h2></div>;
}

export default function App() {
  return <div className="site-shell">
    <GlobalThreeBackground />
    <header className="site-header">
      <a className="brand" href="#top" aria-label="RATISS Labs"><img src="/ratiss-labs-site/assets/ratiss_labs_logo.webp" alt="RATISS Labs" /><span>RATISS LABS</span></a>
      <nav aria-label="Navigation principale"><a href="#audit">Audit</a><a href="#protocole">Protocole</a><a href="#registre">Registre</a><a href="#contact">Contact</a></nav>
    </header>
    <main id="top">
      <section className="hero section-wrap">
        <p className="kicker">LABORATOIRE INDÉPENDANT · YAOUNDÉ, CAMEROUN</p>
        <h1>{hero.title}</h1>
        <p className="hero-copy">{hero.subtitle}</p>
        <div className="link-row">{hero.links.map((link) => <Link key={link.label} href={link.url}>{link.label}</Link>)}</div>
      </section>

      <section id="audit" className="section-wrap">
        <SectionTitle eyebrow="01 / MÉTHODE" title="Ce que nous faisons" />
        <div className="claim-grid">{claims.map((claim, index) => <article className="claim-card" key={claim.proofUrl}><span className="card-index">0{index + 1}</span><h3>{['Audit d’artefacts publics', 'Audit de reproductibilité logicielle', 'Pilotes d’audit scellés'][index]}</h3><p>{claim.text}</p><Link href={claim.proofUrl}>Voir le dossier associé →</Link></article>)}</div>
      </section>

      <section id="protocole" className="section-wrap">
        <SectionTitle eyebrow="02 / GARDE-FOUS" title="Le protocole" />
        <div className="protocol-list">{protocol.map((rule) => <Link key={rule.text} href={rule.proofUrl}><span>{rule.text}</span><b>↗</b></Link>)}</div>
        <p className="section-note"><Link href="https://github.com/jonathansearch/ratiss-audit-public/blob/main/JOURNAL-DEVIATIONS.md">Journal des déviations du labo →</Link></p>
      </section>

      <section id="registre" className="section-wrap">
        <SectionTitle eyebrow="03 / TRANSPARENCE" title="Registre public" />
        <div className="registry">{registry.map((item) => <Link key={item.title} href={item.url}><span>{item.title}</span><small>{item.status}</small><b>↗</b></Link>)}</div>
      </section>

      <section id="encours" className="section-wrap">
        <SectionTitle eyebrow="04 / PLAN OUVERT" title="En cours" />
        <div className="roadmap">{roadmap.map((item) => <div key={item}><span>PLANIFIÉ</span><p>{item}</p></div>)}</div>
      </section>

      <section id="contact" className="contact section-wrap">
        <SectionTitle eyebrow="05 / OUVERTURE" title="Écrire au labo" />
        <p>Écrire au labo : via GitHub (issues ou discussion sur jonathansearch/ratiss-audit-public). Toute demande d'audit reçoit une réponse publique ou nulle.</p>
        <Link href="https://github.com/jonathansearch/ratiss-audit-public">Ouvrir le registre public →</Link>
      </section>
    </main>
    <footer><span>RATISS LABS · AUDIT SCIENTIFIQUE EXÉCUTABLE</span><Link href="https://github.com/jonathansearch">github.com/jonathansearch</Link></footer>
  </div>;
}
