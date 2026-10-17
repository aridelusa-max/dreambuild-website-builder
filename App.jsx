import { useEffect, useMemo, useState } from 'react'
import {
  Aperture, ArrowDown, ArrowLeft, ArrowRight, Bell, Box, Check, ChevronDown,
  CircleHelp, Code2, Copy, Eye, FileText, Globe, GripVertical, Image as ImageIcon,
  LayoutDashboard, Layers, Link2, Menu, Monitor, MoreHorizontal, MousePointer2,
  Palette, Plus, Rocket, Search, Settings2, Smartphone, Sparkles, Type, Undo2,
  Redo2, WandSparkles, X
} from 'lucide-react'

const starterBlocks = [
  { id: 'hero-1', type: 'hero', title: 'hero', text: 'Make room for your next big idea.', subtitle: 'A beautiful website starts with a clear vision. Build something that feels unmistakably you.', button: 'Get started', bg: '#f0eaff', color: '#272044' },
  { id: 'feature-1', type: 'features', title: 'features', text: 'Everything you need to grow', subtitle: 'Thoughtful tools to turn your ideas into something real.', button: 'Explore features', bg: '#ffffff', color: '#272044' },
]
const initialProjects = [
  { name: 'Studio Bloom', kind: 'Portfolio', updated: 'Edited just now', tint: 'peach' },
  { name: 'Sunday Supply', kind: 'Online store', updated: 'Edited yesterday', tint: 'lavender' },
  { name: 'Northstar Studio', kind: 'Agency', updated: 'Edited 3 days ago', tint: 'blue' },
]
const templates = [
  { name: 'Soft Studio', category: 'Portfolio', tint: 'lavender', description: 'Airy, editorial, creative' },
  { name: 'Sunday Market', category: 'Store', tint: 'peach', description: 'Warm, modern, product-led' },
  { name: 'Forma Agency', category: 'Business', tint: 'blue', description: 'Bold, clear, professional' },
  { name: 'Little Journal', category: 'Blog', tint: 'green', description: 'Calm, readable, personal' },
]

function Logo() {
  return <div className="brand-mark"><span className="brand-icon"><Aperture size={19} strokeWidth={2.2}/></span><span>dreambuild</span><span className="brand-beta">BETA</span></div>
}
function IconButton({ children, label, onClick, className='' }) {
  return <button className={`icon-button ${className}`} aria-label={label} title={label} onClick={onClick}>{children}</button>
}
function ProjectThumb({ tint, kind='portfolio' }) {
  return <div className={`project-thumb ${tint}`}>
    <div className="thumb-window"><div className="thumb-nav"/><div className="thumb-line wide"/><div className="thumb-line"/><div className="thumb-pill"/><div className="thumb-orb"/></div>
  </div>
}
function App() {
  const [page, setPage] = useState('dashboard')
  const [activeProject, setActiveProject] = useState('My first website')
  const [projects, setProjects] = useState(() => { try { return JSON.parse(localStorage.getItem('dreambuild-projects')) || initialProjects } catch { return initialProjects } })
  const [blocks, setBlocks] = useState(() => { try { return JSON.parse(localStorage.getItem('dreambuild-blocks')) || starterBlocks } catch { return starterBlocks } })
  const [selectedId, setSelectedId] = useState('hero-1')
  const [panel, setPanel] = useState('elements')
  const [device, setDevice] = useState('desktop')
  const [siteName, setSiteName] = useState(() => localStorage.getItem('dreambuild-site-name') || 'My first website')
  const [showTemplates, setShowTemplates] = useState(false)
  const [showPublish, setShowPublish] = useState(false)
  const [showAI, setShowAI] = useState(false)
  const [aiPrompt, setAiPrompt] = useState('')
  const [toast, setToast] = useState('')
  const [search, setSearch] = useState('')
  const selected = blocks.find(b => b.id === selectedId) || blocks[0]
  const filteredTemplates = useMemo(() => templates.filter(t => `${t.name} ${t.category}`.toLowerCase().includes(search.toLowerCase())), [search])

  useEffect(() => { try { localStorage.setItem('dreambuild-projects', JSON.stringify(projects)); localStorage.setItem('dreambuild-blocks', JSON.stringify(blocks)); localStorage.setItem('dreambuild-site-name', siteName) } catch {} }, [projects, blocks, siteName])
  const notify = (message) => { setToast(message); window.setTimeout(() => setToast(''), 2400) }
  const saveProject = () => { const name = siteName.trim() || 'Untitled website'; setSiteName(name); setActiveProject(name); setProjects(prev => [{ name, kind: 'Website', updated: 'Saved just now', tint: 'lavender' }, ...prev.filter(p => p.name !== name)]); notify('Project saved on this device') }
  const exportWebsite = () => { const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${siteName.replace(/[<>]/g, '')}</title><style>body{margin:0;font-family:Arial,sans-serif;color:#272044}section{padding:72px 8%;}h1{font-size:clamp(32px,6vw,64px)}p{line-height:1.7;max-width:680px}a{display:inline-block;padding:12px 18px;background:#7358d8;color:white;text-decoration:none;border-radius:8px}.features{background:#faf8ff}</style></head><body>${blocks.map(b => `<section style="background:${b.bg};color:${b.color}" class="${b.type}"><h1>${String(b.text || '').replace(/[<>]/g, '')}</h1><p>${String(b.subtitle || '').replace(/[<>]/g, '')}</p>${b.button ? `<a href="#contact">${String(b.button).replace(/[<>]/g, '')}</a>` : ''}</section>`).join('')}<section id="contact"><p>Made with DreamBuild</p></section></body></html>`; const blob = new Blob([html], { type: 'text/html' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `${(siteName || 'dreambuild-site').toLowerCase().replace(/[^a-z0-9]+/g, '-')}.html`; a.click(); URL.revokeObjectURL(url); notify('Website HTML exported') }
  const addBlock = (type) => {
    const presets = {
      hero: { title: 'hero', text: 'A headline that tells your story.', subtitle: 'Add a short sentence that makes people want to know more.', button: 'Learn more', bg: '#f0eaff', color: '#272044' },
      text: { title: 'text section', text: 'A little about us', subtitle: 'Use this space to explain your idea, share your story, or tell visitors what makes you different.', button: '', bg: '#ffffff', color: '#272044' },
      features: { title: 'features', text: 'The details make the difference', subtitle: 'Highlight what you offer with a few clear, helpful details.', button: 'Discover more', bg: '#f8f7fc', color: '#272044' },
      cta: { title: 'call to action', text: 'Ready to make it happen?', subtitle: 'Your next chapter starts here.', button: 'Let’s talk', bg: '#272044', color: '#ffffff' },
      image: { title: 'image section', text: 'A visual worth remembering', subtitle: 'Replace this placeholder with your own image later.', button: '', bg: '#f5e8e2', color: '#272044' },
    }
    const next = { id: `${type}-${Date.now()}`, type, ...presets[type] }
    setBlocks(prev => [...prev, next]); setSelectedId(next.id); setPanel('settings'); notify('Section added to your page')
  }
  const updateSelected = (key, value) => setBlocks(prev => prev.map(b => b.id === selectedId ? { ...b, [key]: value } : b))
  const moveBlock = (id, direction) => {
    setBlocks(prev => {
      const arr = [...prev], i = arr.findIndex(b => b.id === id), j = i + direction
      if (j < 0 || j >= arr.length) return arr
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
      return arr
    })
  }
  const removeBlock = (id) => {
    const remaining = blocks.filter(b => b.id !== id)
    setBlocks(remaining); setSelectedId(remaining[0]?.id || ''); notify('Section removed')
  }
  const startNew = () => {
    const fresh = starterBlocks.map(b => ({...b, id: `${b.type}-${Date.now()}-${Math.random()}`}))
    setBlocks(fresh); setSiteName('Untitled website'); setActiveProject('Untitled website'); setSelectedId(fresh[0]?.id || ''); setPanel('elements'); setShowTemplates(false); setPage('editor')
  }
  const chooseTemplate = (template) => {
    setSiteName(template.name); setActiveProject(template.name)
    setBlocks([
      { id: `hero-${Date.now()}`, type: 'hero', title: 'hero', text: template.category === 'Store' ? 'Find your everyday favourites.' : template.category === 'Business' ? 'Ideas into impact.' : 'A space for your ideas.', subtitle: template.description + '. Create a website that feels like you.', button: 'Explore more', bg: template.tint === 'peach' ? '#fff0e8' : template.tint === 'blue' ? '#e9f0ff' : '#f0eaff', color: '#272044' },
      { id: `features-${Date.now()}`, type: 'features', title: 'features', text: 'Made with intention', subtitle: 'Share what you do, what you believe, and why it matters.', button: 'Learn more', bg: '#ffffff', color: '#272044' }
    ])
    setSelectedId(''); setShowTemplates(false); setPage('editor'); notify(`${template.name} template opened`)
  }
  const publish = () => { setShowPublish(false); notify('Preview ready! Connect hosting to publish your live site.') }
  const generateLocalDraft = () => {
    const brief = aiPrompt.trim()
    if (!brief) { notify('Describe your website idea first'); return }
    const store = /store|shop|fashion|product|clothing|beauty|cosmetic/i.test(brief)
    const name = store ? 'Nova Atelier' : 'Dream Project'
    setSiteName(name); setActiveProject(name)
    const fresh = [
      { id: `hero-${Date.now()}`, type: 'hero', title: 'hero', text: brief.length > 92 ? `${brief.slice(0, 89).trim()}…` : brief, subtitle: 'A first draft shaped from your brief. Refine the headline, story, colours and sections in the editor.', button: store ? 'Explore collection' : 'Get started', bg: '#100d1c', color: '#f7f3ff' },
      { id: `features-${Date.now()+1}`, type: 'features', title: 'features', text: store ? 'Designed to stand apart' : 'Built around your idea', subtitle: 'Use this section to explain your value, highlight key features, and help visitors take the next step.', button: 'Discover more', bg: '#151321', color: '#f7f3ff' }
    ]
    setBlocks(fresh); setSelectedId(fresh[0].id); setPanel('elements'); setPage('editor'); setShowAI(false); setAiPrompt('');
    notify('Starter draft created locally — AI model connection is not set up yet')
  }

  if (page === 'editor') return <div className="app-shell editor-shell">
    <header className="editor-topbar">
      <div className="editor-brand"><IconButton label="Back to dashboard" onClick={() => setPage('dashboard')}><ArrowLeft size={18}/></IconButton><Logo/><span className="topbar-divider"/><input className="site-name-input" value={siteName} onChange={e => {setSiteName(e.target.value); setActiveProject(e.target.value)}} aria-label="Website name"/><span className="saved-indicator"><Check size={13}/> Saved locally</span></div>
      <div className="editor-actions"><IconButton label="Undo" onClick={() => notify('Undo will be connected in a later version')}><Undo2 size={17}/></IconButton><IconButton label="Redo" onClick={() => notify('Redo will be connected in a later version')}><Redo2 size={17}/></IconButton><span className="topbar-divider"/><div className="device-switch"><button className={device==='desktop'?'active':''} onClick={() => setDevice('desktop')} aria-label="Desktop preview"><Monitor size={16}/></button><button className={device==='mobile'?'active':''} onClick={() => setDevice('mobile')} aria-label="Mobile preview"><Smartphone size={16}/></button></div><button className="button button-soft preview-button" onClick={() => notify('You are viewing the live editor preview')}><Eye size={15}/> Preview</button><button className="button button-soft" onClick={saveProject}><Check size={15}/> Save</button><button className="button button-primary" onClick={exportWebsite}><Rocket size={15}/> Export</button></div>
    </header>
    <div className="editor-workspace">
      <aside className="left-panel">
        <div className="panel-tabs"><button className={panel==='elements'?'active':''} onClick={() => setPanel('elements')}><Layers size={16}/> Elements</button><button className={panel==='pages'?'active':''} onClick={() => setPanel('pages')}><FileText size={16}/> Pages</button></div>
        {panel==='elements' ? <div className="panel-content">
          <div className="panel-heading"><div><h3>Add elements</h3><p>Build your page, one block at a time.</p></div><Sparkles size={17} className="purple-icon"/></div>
          <div className="element-grid">
            <button onClick={() => addBlock('hero')}><span className="element-icon lilac"><LayoutDashboard size={19}/></span><b>Hero</b><small>Headline + button</small></button>
            <button onClick={() => addBlock('text')}><span className="element-icon peachy"><Type size={19}/></span><b>Text</b><small>Titles + paragraphs</small></button>
            <button onClick={() => addBlock('image')}><span className="element-icon bluey"><ImageIcon size={19}/></span><b>Image</b><small>Visual content</small></button>
            <button onClick={() => addBlock('features')}><span className="element-icon greeny"><Box size={19}/></span><b>Features</b><small>Cards + highlights</small></button>
            <button onClick={() => addBlock('cta')}><span className="element-icon pinky"><MousePointer2 size={19}/></span><b>Button / CTA</b><small>Action section</small></button>
          </div>
          <div className="panel-note"><WandSparkles size={17}/><div><b>More coming soon</b><p>Forms, video, galleries and custom code will join the library next.</p></div></div>
          <div className="panel-subhead"><span>PAGE STRUCTURE</span><button onClick={() => addBlock('text')}><Plus size={14}/> Add</button></div>
          <div className="layer-list">{blocks.map((b, i) => <div key={b.id} className={`layer-row ${selectedId===b.id?'selected':''}`}><button className="layer-select" onClick={() => {setSelectedId(b.id); setPanel('settings')}}><GripVertical size={14}/><span>{b.title}</span></button><div className="layer-actions"><IconButton label="Move up" onClick={() => moveBlock(b.id,-1)}><ArrowRight className="rotate-up" size={13}/></IconButton><IconButton label="Delete section" onClick={() => removeBlock(b.id)}><X size={13}/></IconButton></div></div>)}</div>
        </div> : <div className="panel-content"><div className="panel-heading"><div><h3>Pages</h3><p>Manage your website pages.</p></div><button className="mini-add" onClick={() => notify('Page management is coming soon')}><Plus size={15}/></button></div><button className="page-row active"><FileText size={15}/> Home <span>●</span></button><button className="page-row" onClick={() => notify('Add page is coming soon')}><Plus size={15}/> Add a page</button></div>}
      </aside>
      <main className="canvas-area">
        <div className="canvas-toolbar"><span><span className="status-dot"/> HOME PAGE</span><span className="canvas-size">{device==='desktop'?'1440 px · Desktop':'390 px · Mobile'}</span><IconButton label="More options" onClick={() => notify('More canvas options coming soon')}><MoreHorizontal size={18}/></IconButton></div>
        <div className="canvas-scroll"><div className={`website-canvas ${device==='mobile'?'mobile-canvas':''}`}>
          <div className="site-preview-nav"><div className="preview-logo"><span className="preview-logo-dot"/>{siteName || 'Your brand'}</div><div className="preview-links"><span>Home</span><span>About</span><span>Contact</span></div><button className="preview-nav-button" onClick={() => notify('Button interactions can be configured later')}>Let’s talk <ArrowRight size={13}/></button></div>
          {blocks.length===0 && <div className="empty-canvas"><div className="empty-icon"><Plus size={23}/></div><h3>Your canvas is ready</h3><p>Add a section from the Elements panel to start building.</p><button className="button button-primary" onClick={() => addBlock('hero')}><Plus size={15}/> Add hero section</button></div>}
          {blocks.map((b, i) => <section key={b.id} className={`site-section ${selectedId===b.id?'section-selected':''} ${b.type==='hero'?'hero-section':''} ${b.type==='features'?'features-section':''}`} style={{background:b.bg,color:b.color}} onClick={() => {setSelectedId(b.id); setPanel('settings')}}>
            {selectedId===b.id && <div className="selection-label"><span/>{b.title.toUpperCase()}<span className="selection-label-actions"><button onClick={e => {e.stopPropagation(); moveBlock(b.id,-1)}} aria-label="Move section up"><ArrowDown size={12} className="flip"/></button><button onClick={e => {e.stopPropagation(); removeBlock(b.id)}} aria-label="Delete section"><X size={12}/></button></span></div>}
            {b.type==='hero' ? <div className="hero-inner"><div className="eyebrow"><span/> A LITTLE SOMETHING DIFFERENT</div><h1>{b.text}</h1><p>{b.subtitle}</p>{b.button && <button className="hero-cta" onClick={e => {e.stopPropagation(); notify('Button selected — button actions will be configurable later')}}>{b.button}<ArrowRight size={15}/></button>}<div className="hero-art"><div className="art-sun"/><div className="art-arch"/><div className="art-plant plant-one"/><div className="art-plant plant-two"/><span className="art-caption">DESIGN YOUR OWN WAY</span></div></div> : b.type==='features' ? <div className="features-inner"><span className="section-kicker">THE GOOD STUFF</span><h2>{b.text}</h2><p>{b.subtitle}</p><div className="feature-cards"><div><span className="feature-num">01</span><b>Made for you</b><p>Make it yours with flexible design choices.</p></div><div><span className="feature-num">02</span><b>Simple by design</b><p>Everything has a place and purpose.</p></div><div><span className="feature-num">03</span><b>Ready to grow</b><p>Start small and build your next big thing.</p></div></div>{b.button && <button className="feature-link" onClick={e => {e.stopPropagation(); notify('Button selected')}}>{b.button} <ArrowRight size={14}/></button>}</div> : b.type==='image' ? <div className="image-placeholder"><div className="image-placeholder-icon"><ImageIcon size={27}/></div><h2>{b.text}</h2><p>{b.subtitle}</p></div> : b.type==='cta' ? <div className="cta-inner"><span className="section-kicker">YOUR NEXT CHAPTER</span><h2>{b.text}</h2><p>{b.subtitle}</p>{b.button && <button className="hero-cta" onClick={e => {e.stopPropagation(); notify('Button selected')}}>{b.button}<ArrowRight size={15}/></button>}</div> : <div className="text-inner"><span className="section-kicker">A NOTE FROM US</span><h2>{b.text}</h2><p>{b.subtitle}</p></div>}
          </section>)}
          <footer className="site-preview-footer"><span>Made with a little imagination.</span><span>© 2026 {siteName || 'Your brand'}</span></footer>
        </div></div>
      </main>
      <aside className="right-panel"><div className="right-panel-header"><div><h3>Design settings</h3><p>Fine-tune your selected section.</p></div><Settings2 size={17}/></div>
        {!selected ? <div className="no-selection"><MousePointer2 size={23}/><b>Select a section</b><p>Tap any section on the canvas to edit its content and style.</p></div> : <div className="settings-content">
          <div className="setting-group"><label>SECTION NAME</label><div className="input-with-icon"><Layers size={15}/><input value={selected.title} onChange={e => updateSelected('title',e.target.value)} /></div></div>
          <div className="setting-group"><label>CONTENT</label><span className="field-label">Headline / title</span><textarea rows="3" value={selected.text} onChange={e => updateSelected('text',e.target.value)}/><span className="field-label">Supporting text</span><textarea rows="3" value={selected.subtitle} onChange={e => updateSelected('subtitle',e.target.value)}/>{selected.type!=='text' && selected.type!=='image' && <><span className="field-label">Button label</span><input value={selected.button} onChange={e => updateSelected('button',e.target.value)}/></>}</div>
          <div className="setting-group"><label><Palette size={13}/> COLORS</label><div className="color-field"><div><span>Background</span><div className="color-input"><input type="color" value={selected.bg} onChange={e => updateSelected('bg',e.target.value)}/><code>{selected.bg.toUpperCase()}</code></div></div><div><span>Text</span><div className="color-input"><input type="color" value={selected.color} onChange={e => updateSelected('color',e.target.value)}/><code>{selected.color.toUpperCase()}</code></div></div></div><div className="swatches">{['#F0EAFF','#FFF0E8','#E9F0FF','#E8F6EE','#FFFFFF','#272044'].map(c => <button key={c} style={{background:c}} aria-label={`Set background ${c}`} onClick={() => updateSelected('bg',c)} className={selected.bg.toLowerCase()===c.toLowerCase()?'chosen':''}/>)}</div></div>
          <div className="setting-group"><label><Type size={13}/> TYPOGRAPHY</label><span className="field-label">Font family</span><select defaultValue="Manrope" onChange={() => notify('Font controls will be expanded in the next version')}><option>Manrope</option><option>DM Sans</option><option>Georgia</option><option>Arial</option></select><span className="field-hint">More typography controls coming soon.</span></div>
          <div className="setting-group"><label>SECTION ACTIONS</label><button className="danger-button" onClick={() => removeBlock(selected.id)}><X size={14}/> Delete this section</button></div>
        </div>}
      </aside>
    </div>
    {showPublish && <div className="modal-backdrop" onClick={() => setShowPublish(false)}><div className="modal-card" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setShowPublish(false)}><X size={18}/></button><div className="modal-icon"><Rocket size={23}/></div><h2>Ready for the world?</h2><p>Your editor is a working local prototype. To publish a live website, we’ll connect a hosting service in a later step.</p><div className="modal-check"><Check size={16}/> Your design is ready to preview</div><div className="modal-check muted"><Globe size={16}/> Hosting connection not set up yet</div><button className="button button-primary full-button" onClick={publish}>Got it</button></div></div>}
    {toast && <div className="toast"><Check size={15}/>{toast}</div>}
  </div>

  return <div className="app-shell dashboard-shell">
    <aside className="dashboard-sidebar"><Logo/><div className="workspace-switch"><div className="workspace-avatar">D</div><div><b>DreamBuild Studio</b><small>Personal workspace</small></div><ChevronDown size={15}/></div>
      <div className="side-label">WORKSPACE</div><button className="side-link active"><LayoutDashboard size={17}/> Overview</button><button className="side-link" onClick={() => setShowTemplates(true)}><Layers size={17}/> Templates <span className="side-count">12</span></button><button className="side-link" onClick={() => {setPage('editor');setSelectedId(blocks[0]?.id || '')}}><MousePointer2 size={17}/> Editor</button>
      <div className="side-label side-label-spaced">YOUR SPACE</div><button className="side-link" onClick={() => { setPage('dashboard'); notify(`You have ${projects.length} projects saved on this device`) }}><FileText size={17}/> All projects</button><button className="side-link" onClick={() => notify('Your projects are saved locally in this browser on this device')}><Settings2 size={17}/> Settings</button>
      <div className="sidebar-bottom"><div className="help-card"><div className="help-icon"><CircleHelp size={17}/></div><b>Need a hand?</b><p>Little steps make big things.</p><button onClick={() => notify('Help centre coming soon')}>Visit help centre <ArrowRight size={13}/></button></div><div className="profile-row"><div className="profile-avatar">Y</div><div><b>Your workspace</b><small>Free plan · Starter</small></div><MoreHorizontal size={17}/></div></div>
    </aside>
    <main className="dashboard-main"><header className="dashboard-topbar"><div className="mobile-brand"><Logo/></div><div className="breadcrumb">Workspace <ChevronDown size={13}/> <span>Overview</span></div><div className="topbar-right"><button className="button button-soft ai-studio-trigger" onClick={() => setShowAI(true)}><Sparkles size={15}/> AI Studio</button><button className="whats-new" onClick={() => notify('You are all caught up!')}><Bell size={16}/><span>What’s new</span><i/></button><div className="profile-avatar small">Y</div></div></header>
      <div className="dashboard-content"><div className="welcome-row"><div><div className="eyebrow-line"><Sparkles size={14}/> YOUR CREATIVE SPACE</div><h1>Let’s make something <em>lovely.</em></h1><p>Your next great idea is only a few clicks away.</p></div><button className="button button-primary create-button" onClick={startNew}><Plus size={17}/> Create a website</button></div>
        <div className="hero-promo"><div className="promo-copy"><span className="promo-badge"><Sparkles size={12}/> YOUR CANVAS AWAITS</span><h2>Big ideas deserve<br/><em>beautiful beginnings.</em></h2><p>Start with a template or build your own from a blank canvas. You’re in charge of every little detail.</p><div className="promo-actions"><button className="button button-dark" onClick={() => setShowTemplates(true)}>Explore templates <ArrowRight size={15}/></button><button className="text-button" onClick={startNew}>Start from scratch <ArrowRight size={14}/></button></div></div><div className="promo-art"><div className="promo-sun"/><div className="promo-card card-back"><span/><span/><span/></div><div className="promo-card card-front"><div className="mini-browser-bar"><i/><i/><i/></div><div className="mini-art-arch"/><div className="mini-lines"><b/><i/><i/></div><div className="mini-button"/></div><div className="floating-spark spark-a">✳</div><div className="floating-spark spark-b">✦</div><div className="floating-tag">Your idea, your rules <Sparkles size={12}/></div></div></div>
        <div className="section-title-row"><div><h2>Your projects <span className="project-count">{projects.length}</span></h2><p>All the things you’re dreaming up.</p></div><button className="view-all" onClick={() => notify(`Showing ${projects.length} projects saved on this device`)}>View all <ArrowRight size={14}/></button></div>
        <div className="project-grid">{projects.map((p,i) => <button className="project-card" key={p.name} onClick={() => {setSiteName(p.name);setActiveProject(p.name);setPage('editor');setSelectedId(blocks[0]?.id || ''); notify(`${p.name} opened`) }}><ProjectThumb tint={p.tint}/><div className="project-card-body"><div className="project-card-title"><b>{p.name}</b><MoreHorizontal size={17} onClick={e => {e.stopPropagation();notify('Project menu coming soon')}}/></div><span className="project-kind">{p.kind}</span><span className="project-updated">{p.updated}</span></div></button>)}
          <button className="new-project-card" onClick={startNew}><span className="new-project-icon"><Plus size={20}/></span><b>A fresh start</b><span>Bring a new idea to life</span><div className="new-project-arrow"><ArrowRight size={16}/></div></button></div>
        <div className="bottom-tip"><div className="tip-icon"><WandSparkles size={18}/></div><div><b>A little tip for your creative journey</b><p>You can start with a template, then change the words, colours, and sections to make it yours.</p></div><button onClick={() => setShowTemplates(true)}>Browse templates <ArrowRight size={14}/></button></div>
        <footer className="dashboard-footer"><span>© 2026 DreamBuild Studio</span><span>Made for curious creators <span className="heart">♥</span></span></footer>
      </div>
    </main>
    {showAI && <div className="modal-backdrop" onClick={() => setShowAI(false)}><div className="ai-modal" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setShowAI(false)} aria-label="Close AI Studio"><X size={18}/></button><div className="ai-orb"><Sparkles size={24}/></div><div className="eyebrow-line">DREAMBUILD AI STUDIO</div><h2>Turn your idea into a starting point.</h2><p>Describe the website you want. This offline starter creates an editable draft locally; a real AI model is not connected yet.</p><textarea className="ai-prompt" value={aiPrompt} onChange={e => setAiPrompt(e.target.value)} placeholder="Example: A futuristic purple portfolio for a creative developer…" rows={4}/><div className="ai-prompt-hint"><Sparkles size={14}/> Tip: include your website type, mood, colours and sections.</div><button className="button button-primary full-button" onClick={generateLocalDraft}><WandSparkles size={16}/> Create starter draft <ArrowRight size={15}/></button><span className="ai-disclaimer">No API key required · Local prototype · Not real AI generation yet</span></div></div>}
    {showTemplates && <div className="modal-backdrop" onClick={() => setShowTemplates(false)}><div className="templates-modal" onClick={e => e.stopPropagation()}><div className="templates-modal-head"><div><div className="eyebrow-line"><Sparkles size={14}/> FIND YOUR STARTING POINT</div><h2>Pick a little inspiration.</h2><p>Choose a template to open it in the editor.</p></div><button className="modal-close" onClick={() => setShowTemplates(false)}><X size={18}/></button></div><div className="template-search"><Search size={16}/><input placeholder="Search templates..." value={search} onChange={e => setSearch(e.target.value)}/></div><div className="template-grid">{filteredTemplates.map(t => <button className="template-card" key={t.name} onClick={() => chooseTemplate(t)}><ProjectThumb tint={t.tint}/><div><b>{t.name}</b><span>{t.category}</span><p>{t.description}</p></div><ArrowRight size={16}/></button>)}</div><div className="template-modal-footer"><span>More templates will be added as we build.</span><button className="button button-soft" onClick={startNew}>Blank canvas <Plus size={14}/></button></div></div></div>}
    {toast && <div className="toast"><Check size={15}/>{toast}</div>}
  </div>
}

export default App
