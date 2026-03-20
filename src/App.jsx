import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Briefcase, MapPin, Clock, Globe, Copy, CheckCircle2, ChevronDown, ExternalLink, Settings2, Trash2, History, Share2, Download, Building2, Linkedin, Home, Bookmark, ShieldCheck, Zap, Rocket, Code2, BookText, Network, Users, Target, FileText, ClipboardList, Inbox, Layers, Activity, Compass, Crosshair, Award, Cpu, Anchor, Monitor, Hexagon, ShoppingCart, LayoutGrid, CalendarClock, Database, BadgeDollarSign, Leaf, Github, Mail } from 'lucide-react';

const platformIcons = {
  wellfound: Users,
  ycombinator: Rocket,
  builtin: Code2,
  ashby: Crosshair,
  homerun: Home,
  dover: Anchor,
  notion: BookText,
  careerpuck: Target,
  greenhouse: Leaf,
  lever: Network,
  workable: Users,
  breezy: Zap,
  recruitee: Activity,
  smartrecruiters: Award,
  pinpoint: Compass,
  bamboohr: Users,
  teamtailor: Users,
  jobvite: Inbox,
  rippling: Layers,
  gusto: ShieldCheck,
  trinethire: ClipboardList,
  talentreef: FileText,
  gem: Hexagon,
  trakstar: Crosshair,
  cats: Target,
  jazzhr: Activity,
  factorial: Cpu,
  apple: Monitor,
  meta: Hexagon,
  google_corp: Search,
  netflix: Monitor,
  amazon: ShoppingCart,
  microsoft: LayoutGrid,
  workday: CalendarClock,
  icims: Users,
  eightfold: Layers,
  adp: BadgeDollarSign,
  oracle: Database,
  taleo: Inbox,
};
import { modernAts, startupPlatforms, enterprisePlatforms, techGiants, subdomains, linkedinQueries, searchEngines, timeframes, generateSearchUrl, generateCombinedSearchUrl, commonLocations, generateIntelligenceUrl } from './utils/searchLogic';

function App() {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [isRemote, setIsRemote] = useState(false);
  const [excludedKeywords, setExcludedKeywords] = useState('');
  const [requiredSkills, setRequiredSkills] = useState('');
  const [excludeRemote, setExcludeRemote] = useState(false);
  const [strictMode, setStrictMode] = useState(false);
  const [timeframe, setTimeframe] = useState('any');
  const [selectedEngine, setSelectedEngine] = useState('google');
  
  const [visitedLinks, setVisitedLinks] = useState(new Set());
  const [searchHistory, setSearchHistory] = useState([]);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('title')) setJobTitle(decodeURIComponent(params.get('title')));
    if (params.get('location')) setLocation(decodeURIComponent(params.get('location')));
    if (params.get('remote') === 'true') setIsRemote(true);
    if (params.get('exclude')) setExcludedKeywords(decodeURIComponent(params.get('exclude')));
    if (params.get('skills')) setRequiredSkills(decodeURIComponent(params.get('skills')));
    if (params.get('noRemote') === 'true') setExcludeRemote(true);
    if (params.get('strict') === 'true') setStrictMode(true);
    if (params.get('time')) setTimeframe(params.get('time'));
    if (params.get('engine')) setSelectedEngine(params.get('engine'));
  }, []);

  useEffect(() => {
    const updateUrl = () => {
      const params = new URLSearchParams();
      if (jobTitle) params.set('title', encodeURIComponent(jobTitle));
      if (location) params.set('location', encodeURIComponent(location));
      if (isRemote) params.set('remote', 'true');
      if (excludedKeywords) params.set('exclude', encodeURIComponent(excludedKeywords));
      if (requiredSkills) params.set('skills', encodeURIComponent(requiredSkills));
      if (excludeRemote) params.set('noRemote', 'true');
      if (strictMode) params.set('strict', 'true');
      if (timeframe !== 'any') params.set('time', timeframe);
      if (selectedEngine !== 'google') params.set('engine', selectedEngine);
      
      const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
      window.history.replaceState({}, '', newUrl);
    };
    
    const updateHistory = () => {
      if (jobTitle && jobTitle.length > 2) {
        const historyObj = { title: jobTitle, remote: isRemote, location };
        let history = [];
        try { history = JSON.parse(localStorage.getItem('jobSearchHistory') || '[]'); } catch(e) {}
        
        history = history.filter(h => h.title.toLowerCase() !== jobTitle.toLowerCase());
        history.unshift(historyObj);
        if (history.length > 5) history.pop();
        
        localStorage.setItem('jobSearchHistory', JSON.stringify(history));
        setSearchHistory(history);
      }
    };

    const debounce = setTimeout(() => {
      updateUrl();
      updateHistory();
    }, 1000);
    return () => clearTimeout(debounce);
  }, [jobTitle, location, isRemote, excludedKeywords, requiredSkills, excludeRemote, strictMode, timeframe, selectedEngine]);

  useEffect(() => {
    const savedVisited = localStorage.getItem('visitedJobLinks');
    if (savedVisited) {
      try { setVisitedLinks(new Set(JSON.parse(savedVisited))); } catch (e) {}
    }
    const savedHistory = localStorage.getItem('jobSearchHistory');
    if (savedHistory) {
      try { setSearchHistory(JSON.parse(savedHistory)); } catch(e) {}
    }
  }, []);

  const markVisited = (url) => {
    const newVisited = new Set(visitedLinks);
    newVisited.add(url);
    setVisitedLinks(newVisited);
    localStorage.setItem('visitedJobLinks', JSON.stringify([...newVisited]));
  };

  const clearVisited = () => {
    setVisitedLinks(new Set());
    localStorage.removeItem('visitedJobLinks');
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
  };

  const engine = searchEngines.find(e => e.id === selectedEngine).url;
  const params = { jobTitle, location, isRemote, excludeRemote, excludedKeywords, requiredSkills, strictMode, timeframe };
  const hasQuery = jobTitle.length > 0;

  const handleExportUrls = () => {
    const allUrls = [
      ...modernAts.map(p => `${p.name}: ${generateSearchUrl(engine, p.query, params)}`),
      ...startupPlatforms.map(p => `${p.name}: ${generateSearchUrl(engine, p.query, params)}`),
      ...enterprisePlatforms.map(p => `${p.name}: ${generateSearchUrl(engine, p.query, params)}`),
      ...techGiants.map(p => `${p.name}: ${generateSearchUrl(engine, p.query, params)}`),
      ...linkedinQueries.map(p => `${p.name}: ${generateSearchUrl(engine, p.query, params)}`)
    ].join('\n\n');
    
    navigator.clipboard.writeText(allUrls);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const applyHistoryItem = (item) => {
    setJobTitle('');
    setTimeout(() => {
      setJobTitle(item.title);
      setLocation(item.location || '');
      setIsRemote(item.remote || false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 10);
  };

  const renderLinkCard = (item, index, customIcon = null) => {
    const url = generateSearchUrl(engine, item.query, params);
    const isVisited = visitedLinks.has(url);
    const DynamicIcon = platformIcons[item.id] || null;

    return (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className={`card-premium p-5 flex flex-col group ${isVisited ? 'opacity-50' : ''}`}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] rounded-full pointer-events-none transition-all group-hover:bg-primary/20" />
        
        <div className="flex items-center justify-between mb-3 relative z-10">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ghost-border ${isVisited ? 'bg-surface-high' : 'bg-surface-low'}`}>
              {DynamicIcon ? <DynamicIcon className="w-5 h-5 txt" /> : (customIcon || <Briefcase className="w-5 h-5 txt" />)}
            </div>
            <div>
              <h3 className="text-white font-manrope font-bold text-lg flex items-center gap-2">
                {item.name}
              </h3>
              {isVisited && <span className="text-xs txt-muted-container flex items-center gap-1 mt-0.5"><CheckCircle2 className="w-3 h-3" /> Visited</span>}
            </div>
          </div>
          <button 
            onClick={() => copyToClipboard(url)}
            className="p-2 text-txt-muted hover:text-white bg-surface-low hover:bg-surface-high rounded-lg transition-colors ghost-border"
            title="Copy URL"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
        
        <div className="mt-auto pt-4 border-t border-outline-variant/20 flex items-center justify-between relative z-10">
          <p className="text-txt-muted text-xs truncate max-w-[60%] font-mono opacity-80">
            {item.query.substring(0, 30)}...
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => markVisited(url)}
            className="text-sm font-bold txt hover:txt-container flex items-center gap-1 transition-colors group/link"
          >
            Open Link <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen flex bg-background text-txt selection:bg-primary/30 font-inter">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 z-[0] pointer-events-none overflow-hidden flex justify-center">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-primary-container/10 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-secondary/5 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      {/* Left Sidebar */}
      <aside className="w-64 fixed h-full bg-surface-low border-r border-outline-variant/30 z-20 flex flex-col pt-8 pb-6 shadow-[10px_0_30px_rgba(0,0,0,0.5)]">
        <div className="px-6 mb-10">
          <h1 className="text-2xl font-black font-manrope tracking-tighter text-white flex items-center gap-2">
            JobHub <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-container">Pro</span>
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-surface-high text-white rounded-xl ghost-border relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary-container shadow-[0_0_10px_#00eefc]" />
            <Search className="w-5 h-5 txt" />
            <span className="font-semibold text-sm">Dashboard</span>
          </button>
          
          <div className="pt-8 pb-2 px-4">
             <h3 className="text-xs font-bold text-txt-muted uppercase tracking-wider font-manrope">Recent Searches</h3>
          </div>
          
          <div className="space-y-1">
            {searchHistory.length === 0 ? (
              <p className="px-4 text-xs text-txt-muted/50 font-medium italic">No recent searches.</p>
            ) : (
              searchHistory.map((item, i) => (
                <button 
                  key={i}
                  onClick={() => applyHistoryItem(item)}
                  className="w-full flex flex-col items-start px-4 py-3 hover:bg-surface-highest rounded-xl transition-colors group text-left border border-transparent hover:border-outline-variant/30"
                >
                  <span className="font-semibold text-sm text-txt group-hover:text-white transition-colors truncate w-full">{item.title}</span>
                  <span className="text-[10px] text-txt-muted/70 mt-0.5 flex items-center gap-1">
                    {item.remote ? <span className="txt-muted-container">Remote</span> : item.location || 'Anywhere'}
                  </span>
                </button>
              ))
            )}
          </div>
        </nav>

        {/* Creator Profile Card */}
        <div className="mt-auto px-4 pb-4">
          <div className="bg-surface-high/30 backdrop-blur-md border border-outline-variant/30 rounded-2xl p-4 relative overflow-hidden group hover:border-primary/40 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            <p className="text-[10px] text-txt-muted uppercase font-bold tracking-widest mb-1.5 flex items-center gap-1">Architected By</p>
            <h4 className="text-white font-manrope font-bold text-sm tracking-tight mb-4">Satish Kumar Pyata</h4>
            
            <div className="flex items-center gap-2">
              <a href="https://github.com/COutSatish" target="_blank" rel="noopener noreferrer" className="flex-1 h-9 rounded-lg bg-surface-highest border border-outline-variant/60 flex items-center justify-center text-txt-muted hover:text-white hover:border-white/50 transition-all hover:-translate-y-0.5 shadow-sm" title="GitHub">
                <Github className="w-[18px] h-[18px]" />
              </a>
              <a href="https://www.linkedin.com/in/satishkumarpyata" target="_blank" rel="noopener noreferrer" className="flex-1 h-9 rounded-lg bg-surface-highest border border-outline-variant/60 flex items-center justify-center text-txt-muted hover:text-[#0A66C2] hover:border-[#0A66C2]/50 transition-all hover:-translate-y-0.5 shadow-sm" title="LinkedIn">
                <Linkedin className="w-[18px] h-[18px]" />
              </a>
              <a href="mailto:satishkumarpyata@gmail.com" className="flex-1 h-9 rounded-lg bg-surface-highest border border-outline-variant/60 flex items-center justify-center text-txt-muted hover:text-secondary hover:border-secondary/50 transition-all hover:-translate-y-0.5 shadow-sm" title="Email Contact">
                <Mail className="w-[18px] h-[18px]" />
              </a>
            </div>
            
            <p className="mt-4 pt-3 border-t border-outline-variant/20 text-[10px] text-txt-muted/60 italic text-center leading-relaxed">"While others scroll endlessly, you search surgically."</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 relative z-10 p-8 lg:p-12 xl:p-16">
        
        {/* Header Section */}
        <div className="max-w-5xl mb-6">
          <p className="text-sm font-bold txt uppercase tracking-[0.2em] mb-2">Boolean Search Architect</p>
          <h2 className="text-4xl lg:text-5xl font-manrope font-extrabold text-white leading-[1.1] tracking-tight">
            Generate the perfect <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-container drop-shadow-[0_0_15px_rgba(216,185,255,0.3)]">
              Boolean Search Query.
            </span>
          </h2>
        </div>

        {/* Master Input Control Panel */}
        <div className="max-w-5xl glass-panel rounded-3xl p-6 mb-6 overflow-visible relative">
           {/* Decorative Top-Light */}
           <div className="absolute top-0 left-10 right-10 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
           
           <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
              
              {/* Job Title */}
              <div className="md:col-span-6 space-y-1.5">
                <label className="text-xs font-bold text-txt-muted uppercase tracking-widest ml-1 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> Job Title
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="e.g. Site Reliability Engineer"
                    className="input-premium px-4 h-[52px] text-lg"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>
              </div>

              {/* Location */}
              <div className="md:col-span-6 space-y-1.5">
                <label className="text-xs font-bold text-txt-muted uppercase tracking-widest ml-1 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Location
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder={isRemote ? "Disabled (Remote active)" : "City or Country"}
                    disabled={isRemote}
                    list="location-suggestions"
                    className="input-premium pl-4 pr-8 h-[52px] text-lg disabled:opacity-40 disabled:bg-surface-low"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <datalist id="location-suggestions">
                    {commonLocations.map((loc, i) => (
                      <option key={i} value={loc} />
                    ))}
                  </datalist>
                </div>
              </div>

              {/* Required Skills */}
              <div className="md:col-span-6 lg:col-span-3 space-y-2">
                 <label className="text-xs font-bold text-txt-muted uppercase tracking-widest ml-1">Required Skills</label>
                 <input 
                    type="text" 
                    placeholder="e.g. React, Python"
                    className="input-premium"
                    value={requiredSkills}
                    onChange={(e) => setRequiredSkills(e.target.value)}
                  />
              </div>

              {/* Exclude Keywords */}
              <div className="md:col-span-6 lg:col-span-3 space-y-2">
                 <label className="text-xs font-bold text-txt-muted uppercase tracking-widest ml-1">Exclude Keywords</label>
                 <input 
                    type="text" 
                    placeholder="e.g. Junior, Intern"
                    className="input-premium"
                    value={excludedKeywords}
                    onChange={(e) => setExcludedKeywords(e.target.value)}
                  />
              </div>

              {/* Date Posted */}
              <div className="md:col-span-6 lg:col-span-3 space-y-2">
                 <label className="text-xs font-bold text-txt-muted uppercase tracking-widest ml-1">Date Posted</label>
                 <div className="relative">
                    <select 
                      className="input-premium appearance-none cursor-pointer"
                      value={timeframe}
                      onChange={(e) => setTimeframe(e.target.value)}
                    >
                      {timeframes.map(t => (
                        <option key={t.id} value={t.id} className="bg-surface-high">{t.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-txt-muted pointer-events-none" />
                 </div>
              </div>

              {/* Engine */}
              <div className="md:col-span-6 lg:col-span-3 space-y-2">
                 <label className="text-xs font-bold text-txt-muted uppercase tracking-widest ml-1">Engine</label>
                 <div className="relative">
                    <select 
                      className="input-premium appearance-none cursor-pointer"
                      value={selectedEngine}
                      onChange={(e) => setSelectedEngine(e.target.value)}
                    >
                      {searchEngines.map(e => (
                        <option key={e.id} value={e.id} className="bg-surface-high">{e.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-txt-muted pointer-events-none" />
                 </div>
              </div>

              {/* Toggles Row */}
              <div className="md:col-span-12 flex flex-wrap items-center gap-8 pt-4 mt-2 border-t border-outline-variant/20">
                 <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative w-10 h-5">
                    <input type="checkbox" className="sr-only" checked={isRemote} onChange={(e) => setIsRemote(e.target.checked)} />
                    <div className={`w-10 h-5 rounded-full transition-colors absolute right-0 ${isRemote ? 'bg-secondary-container shadow-[0_0_10px_#00eefc]' : 'bg-surface-highest ghost-border'}`}>
                      <div className={`absolute top-1 left-1 bg-white w-3 h-3 rounded-full transition-transform ${isRemote ? 'translate-x-5' : ''}`} />
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-txt-muted group-hover:text-white transition-colors">Remote Only</span>
                 </label>

                 <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative w-10 h-5">
                    <input type="checkbox" className="sr-only" checked={excludeRemote} onChange={(e) => setExcludeRemote(e.target.checked)} />
                    <div className={`w-10 h-5 rounded-full transition-colors absolute right-0 ${excludeRemote ? 'bg-primary' : 'bg-surface-highest ghost-border'}`}>
                      <div className={`absolute top-1 left-1 bg-white w-3 h-3 rounded-full transition-transform ${excludeRemote ? 'translate-x-5' : ''}`} />
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-txt-muted group-hover:text-white transition-colors">Exclude Remote Jobs</span>
                 </label>
                 
                 <label className="flex items-center gap-3 cursor-pointer group" title="Requires exact Job Title matches inside the URL or Page Title">
                  <div className="relative w-10 h-5">
                    <input type="checkbox" className="sr-only" checked={strictMode} onChange={(e) => setStrictMode(e.target.checked)} />
                    <div className={`w-10 h-5 rounded-full transition-colors absolute right-0 ${strictMode ? 'bg-tertiary shadow-[0_0_10px_#ff7b72]' : 'bg-surface-highest ghost-border'}`}>
                      <div className={`absolute top-1 left-1 bg-white w-3 h-3 rounded-full transition-transform ${strictMode ? 'translate-x-5' : ''}`} />
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-txt-muted group-hover:text-white transition-colors">Strict Title Mode</span>
                 </label>
              </div>

           </div>
        </div>

        {/* Empty State */}
        {!hasQuery && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mt-6 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-surface-low border border-outline-variant/30 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <Search className="w-8 h-8 text-txt-muted/50" />
            </div>
            <h3 className="text-xl font-bold text-white font-manrope mb-2">Awaiting Parameters</h3>
            <p className="text-txt-muted text-sm max-w-md">Enter a Job Title above to instantly generate customized deep-search queries across 30+ ATS platforms, Tech Giants, and Market Intelligence tools.</p>
          </motion.div>
        )}

        {/* Master Export Bar */}
        {hasQuery && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mb-12">
            <div className="bg-surface-highest border border-outline-variant/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_10px_40px_rgba(0,0,0,0.5)] relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1 h-full bg-secondary-container shadow-[0_0_20px_#00eefc]" />
               
               <div className="flex items-center gap-4 pl-2">
                 <div className="w-12 h-12 rounded-full bg-surface-low ghost-border flex items-center justify-center">
                   <Download className="w-5 h-5 txt-muted-container" />
                 </div>
                 <div>
                   <h3 className="text-white font-manrope font-bold text-xl">Export All Links</h3>
                   <p className="text-txt-muted text-sm mt-1 flex items-center gap-2">
                     Ready to scrape the massive web index.
                     {visitedLinks.size > 0 && <span className="text-tertiary">({visitedLinks.size} visited)</span>}
                   </p>
                 </div>
               </div>

               <div className="flex items-center gap-3 w-full sm:w-auto">
                 <button 
                  onClick={clearVisited}
                  className="px-5 py-3 rounded-xl font-bold text-sm bg-surface-low hover:bg-surface border border-outline-variant/40 text-txt-muted hover:text-white transition-all w-full sm:w-auto"
                 >
                   Reset Progress
                 </button>
                 <button 
                  onClick={handleExportUrls}
                  className="px-8 py-3 rounded-xl font-bold text-sm bg-secondary-container hover:bg-[#00dbe9] text-[#004f54] shadow-[0_0_15px_rgba(0,238,252,0.3)] hover:shadow-[0_0_25px_rgba(0,238,252,0.5)] transition-all w-full sm:w-auto"
                 >
                   {isCopied ? 'COPIED TO CLIPBOARD' : 'DOWNLOAD ALL (CSV / TXT)'}
                 </button>
               </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <a href={generateCombinedSearchUrl(engine, startupPlatforms, params)} target="_blank" rel="noopener noreferrer" className="w-full px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 border border-secondary-container/30 bg-secondary-container/10 hover:bg-secondary-container/20 transition-all group">
                  <Globe className="w-4 h-4 text-secondary-container group-hover:text-white transition-colors" /> <span className="text-secondary-container group-hover:text-white transition-colors">Master Startup Scan</span>
                </a>
                <a href={generateCombinedSearchUrl(engine, modernAts, params)} target="_blank" rel="noopener noreferrer" className="w-full px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 border border-primary/30 bg-primary/10 hover:bg-primary/20 transition-all group">
                  <Search className="w-4 h-4 text-primary group-hover:text-white transition-colors" /> <span className="text-primary group-hover:text-white transition-colors">Master Modern ATS</span>
                </a>
                <a href={generateCombinedSearchUrl(engine, enterprisePlatforms, params)} target="_blank" rel="noopener noreferrer" className="w-full px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 border border-tertiary/50 bg-tertiary/10 hover:bg-tertiary/20 transition-all group">
                  <Building2 className="w-4 h-4 text-tertiary group-hover:text-white transition-colors" /> <span className="text-tertiary group-hover:text-white transition-colors">Master Enterprise Scan</span>
                </a>
            </div>
          </motion.div>
        )}

        {/* Results Grid */}
        {hasQuery && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl space-y-12 pb-20">
            
            <section>
              <h3 className="text-lg font-bold text-white font-manrope mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary-container/10 flex items-center justify-center"><Globe className="w-5 h-5 text-secondary-container" /></div>
                Startup & Niche Platforms
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {startupPlatforms.map((item, index) => renderLinkCard(item, index, <Globe className="w-5 h-5 txt-muted" />))}
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold text-white font-manrope mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Briefcase className="w-5 h-5 txt" /></div>
                Modern ATS Systems
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {modernAts.map((item, index) => renderLinkCard(item, index))}
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold text-white font-manrope mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center"><Building2 className="w-5 h-5 text-tertiary" /></div>
                Enterprise & Tech Giants
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[...techGiants, ...enterprisePlatforms].map((item, index) => renderLinkCard(item, index, <Building2 className="w-5 h-5 txt-muted" />))}
              </div>
            </section>
            
            <section>
              <h3 className="text-lg font-bold text-white font-manrope mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00eefc]/10 flex items-center justify-center"><Linkedin className="w-5 h-5 text-[#00eefc]" /></div>
                LinkedIn Scout
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {linkedinQueries.map((item, index) => renderLinkCard(item, index, <Linkedin className="w-5 h-5 txt-muted" />))}
              </div>
            </section>
            
            <section>
              <h3 className="text-lg font-bold text-white font-manrope mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center"><Settings2 className="w-5 h-5 text-tertiary" /></div>
                Salary & Interview Intelligence
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <a href={generateIntelligenceUrl('glassdoor', params)} target="_blank" rel="noopener noreferrer" className="card-premium p-5 group flex flex-col border border-outline-variant/30 hover:border-white/20 transition-all">
                  <h4 className="text-white font-bold mb-2 flex items-center gap-2">Glassdoor Interviews <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" /></h4>
                  <p className="text-xs text-txt-muted text-left">Search specifically for reported interview questions and processes for this role.</p>
                </a>
                <a href={generateIntelligenceUrl('blind', params)} target="_blank" rel="noopener noreferrer" className="card-premium p-5 group flex flex-col border border-outline-variant/30 hover:border-white/20 transition-all">
                  <h4 className="text-white font-bold mb-2 flex items-center gap-2">TeamBlind Salaries <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" /></h4>
                  <p className="text-xs text-txt-muted text-left">Find honest, unvarnished salary and TC (Total Compensation) reports.</p>
                </a>
                <a href={generateIntelligenceUrl('reddit', params)} target="_blank" rel="noopener noreferrer" className="card-premium p-5 group flex flex-col border border-outline-variant/30 hover:border-white/20 transition-all">
                  <h4 className="text-white font-bold mb-2 flex items-center gap-2">Reddit Career Advice <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" /></h4>
                  <p className="text-xs text-txt-muted text-left">Discover career advice, resume tips, and industry trends on Reddit.</p>
                </a>
              </div>
            </section>
            
          </motion.div>
        )}
      </main>
    </div>
  );
}

export default App;
