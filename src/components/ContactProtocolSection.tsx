import { useState, useRef, type FormEvent } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Copy, Check, ArrowUpRight, ExternalLink } from 'lucide-react';
import { staggerContainer, fadeInUp, fadeInScale } from '../lib/animations';

export function ContactProtocolSection() {
  const [formData, setFormData] = useState({
    name: '',
    org: '',
    email: '',
    mandat: 'Audit quantique & topologique',
    message: ''
  });

  const [copied, setCopied] = useState(false);
  const [formStatus, setFormStatus] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  const directEmail = 'jonathan.ratisslabs@zohomail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(directEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[Protocole RATISS] ${formData.mandat} - ${formData.org || formData.name}`);
    const body = encodeURIComponent(
      `Nom: ${formData.name}\n` +
      `Organisation: ${formData.org}\n` +
      `Email de contact: ${formData.email}\n` +
      `Type de mandat souhaité: ${formData.mandat}\n\n` +
      `Description du protocole ou de la question :\n${formData.message}`
    );

    window.location.href = `mailto:${directEmail}?subject=${subject}&body=${body}`;
    setFormStatus("Votre client email a été ouvert avec le protocole préparé.");
  };

  return (
    <section ref={sectionRef} id="contact" className="py-32 bg-transparent border-t border-white/10 relative overflow-hidden">
      {/* Subtle parallax background glow */}
      <motion.div
        style={{ y: yBg }}
        className="absolute bottom-10 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 blur-[160px] rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 space-y-16 relative z-10">
        {/* Centered Header with Staggered Entrance */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center max-w-3xl mx-auto space-y-4 flex flex-col items-center"
        >
          <motion.div variants={fadeInUp} className="text-xs font-mono text-cyan-400 tracking-widest uppercase inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>06 / CONTACT & INITIALISATION DE PROTOCOLE</span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.08] text-readable-title">
            Ouvrir un <br />
            <span className="italic font-light text-zinc-300">protocole.</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-zinc-300 font-light leading-relaxed text-readable-body">
            Décrivez la question, la contrainte et le niveau de preuve attendu. Le laboratoire répond avec la bonne profondeur : audit, recherche, training ou architecture.
          </motion.p>
          <motion.div variants={fadeInUp} className="w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent pt-2" />
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Direct Coordinates */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="p-8 rounded-3xl bg-zinc-950 border border-white/10 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                  CANAL SOUVERAIN OFFICIEL
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={`mailto:${directEmail}`}
                    className="text-base sm:text-lg font-mono text-white hover:text-cyan-400 transition-colors break-all underline decoration-white/20 underline-offset-4"
                  >
                    {directEmail}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white transition-colors shrink-0"
                    title="Copier l'email"
                  >
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-4">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">
                  PROFILS SCIENTIFIQUES & CODE :
                </span>
                <div className="space-y-3 font-mono text-xs">
                  <a
                    href="https://orcid.org/0009-0000-4092-5313"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-black/60 border border-white/5 flex items-center justify-between text-zinc-300 hover:text-white hover:border-cyan-500/40 transition-all"
                  >
                    <span>ORCID: 0009-0000-4092-5313</span>
                    <ExternalLink size={13} className="text-zinc-500" />
                  </a>

                  <a
                    href="https://github.com/jonathansearch"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-black/60 border border-white/5 flex items-center justify-between text-zinc-300 hover:text-white hover:border-cyan-500/40 transition-all"
                  >
                    <span>GitHub: @jonathansearch</span>
                    <ExternalLink size={13} className="text-zinc-500" />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/jonathan-evina-quantum"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-black/60 border border-white/5 flex items-center justify-between text-zinc-300 hover:text-white hover:border-cyan-500/40 transition-all"
                  >
                    <span>LinkedIn: Jonathan Evina</span>
                    <ExternalLink size={13} className="text-zinc-500" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Protocol Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-zinc-950 border border-white/10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-zinc-400 block">Nom complet *</label>
                  <input
                    type="text"
                    required
                    placeholder="Dr. / Pr. / Dir."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-xs font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-zinc-400 block">Organisation ou Laboratoire</label>
                  <input
                    type="text"
                    placeholder="Entreprise, Institut ou Laboratoire"
                    value={formData.org}
                    onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-xs font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-400 block">Adresse Email professionnelle *</label>
                <input
                  type="email"
                  required
                  placeholder="nom@organisation.org"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-xs font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-400 block">Type de mandat / Intervention</label>
                <select
                  value={formData.mandat}
                  onChange={(e) => setFormData({ ...formData, mandat: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Audit quantique & provenance QPU">Audit quantique & provenance QPU</option>
                  <option value="Agents IA souverains (local-first)">Agents IA souverains (local-first)</option>
                  <option value="Audit de reproductibilité scientifique">Audit de reproductibilité scientifique</option>
                  <option value="Audit topologique & persistance Psig">Audit topologique & persistance Psig</option>
                  <option value="Mission CTO fractionnaire & Advisory">Mission CTO fractionnaire & Advisory</option>
                  <option value="Training quantique & IA pour équipes">Training quantique & IA pour équipes</option>
                  <option value="Autre demande de recherche">Autre demande de recherche</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-400 block">Question ou périmètre du protocole *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Quel protocole devons-nous instruire ? Précisez le niveau de preuve attendu, les hypothèses et les délais..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-xs font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-white text-black font-semibold text-xs font-mono flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)]"
              >
                <span>Préparer l'email de protocole</span>
                <ArrowUpRight size={14} />
              </button>

              {formStatus && (
                <div className="text-xs font-mono text-emerald-400 text-center pt-2">
                  {formStatus}
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
