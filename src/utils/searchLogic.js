export const startupPlatforms = [
  { id: 'wellfound', name: 'Wellfound (AngelList)', query: 'site:wellfound.com/jobs' },
  { id: 'ycombinator', name: 'Y Combinator', query: 'site:workatastartup.com' },
  { id: 'builtin', name: 'Built In', query: 'site:builtin.com/job' },
  { id: 'ashby', name: 'Ashby', query: 'site:jobs.ashbyhq.com' },
  { id: 'homerun', name: 'Homerun', query: 'site:homerun.co' },
  { id: 'dover', name: 'Dover', query: 'site:app.dover.com/apply' },
  { id: 'notion', name: 'Notion Boards', query: 'site:notion.site "careers" OR "jobs"' },
  { id: 'careerpuck', name: 'CareerPuck', query: 'site:careerpuck.com' },
];

export const enterprisePlatforms = [
  { id: 'workday', name: 'Workday', query: 'site:myworkdaysite.com' },
  { id: 'icims', name: 'iCIMS', query: 'site:icims.com/jobs' },
  { id: 'eightfold', name: 'Eightfold', query: 'site:eightfold.ai' },
  { id: 'adp', name: 'ADP', query: 'site:workforcenow.adp.com' },
  { id: 'oracle', name: 'Oracle Cloud', query: 'site:oraclecloud.com' },
  { id: 'taleo', name: 'Taleo', query: 'site:taleo.net' },
];

export const modernAts = [
  { id: 'greenhouse', name: 'Greenhouse', query: 'site:boards.greenhouse.io' },
  { id: 'lever', name: 'Lever', query: 'site:jobs.lever.co' },
  { id: 'workable', name: 'Workable', query: 'site:apply.workable.com OR site:jobs.workable.com' },
  { id: 'breezy', name: 'Breezy HR', query: 'site:breezy.hr' },
  { id: 'recruitee', name: 'Recruitee', query: 'site:recruitee.com/jobs' },
  { id: 'smartrecruiters', name: 'SmartRecruiters', query: 'site:jobs.smartrecruiters.com' },
  { id: 'pinpoint', name: 'Pinpoint', query: 'site:careers.page' },
  { id: 'bamboohr', name: 'BambooHR', query: 'site:bamboohr.com/careers' },
  { id: 'teamtailor', name: 'Teamtailor', query: 'site:teamtailor.com' },
  { id: 'jobvite', name: 'Jobvite', query: 'site:jobs.jobvite.com' },
  { id: 'rippling', name: 'Rippling', query: 'site:rippling-ats.com' },
  { id: 'gusto', name: 'Gusto', query: 'site:gusto.com/careers' },
  { id: 'trinethire', name: 'TriNet Hire', query: 'site:trinethire.com' },
  { id: 'talentreef', name: 'TalentReef', query: 'site:talentreef.com' },
  { id: 'gem', name: 'Gem', query: 'site:gem.com' },
  { id: 'trakstar', name: 'Trakstar', query: 'site:hire.trakstar.com' },
  { id: 'cats', name: 'Cats', query: 'site:catsone.com/careers' },
  { id: 'jazzhr', name: 'JazzHR', query: 'site:applytojob.com' },
  { id: 'factorial', name: 'Factorial', query: 'site:factorialhr.com' },
];

export const techGiants = [
  { id: 'apple', name: 'Apple', query: 'site:jobs.apple.com' },
  { id: 'meta', name: 'Meta', query: 'site:metacareers.com' },
  { id: 'google_corp', name: 'Google', query: 'site:careers.google.com' },
  { id: 'netflix', name: 'Netflix', query: 'site:jobs.netflix.com' },
  { id: 'amazon', name: 'Amazon', query: 'site:amazon.jobs' },
  { id: 'microsoft', name: 'Microsoft', query: 'site:careers.microsoft.com' }
];

export const subdomains = [
  { id: 'careers_domain', name: 'Careers', query: 'site:careers.*.com OR site:careers.*.co OR site:careers.*.io' },
  { id: 'jobs_domain', name: 'Jobs', query: 'site:jobs.*.com OR site:jobs.*.co OR site:jobs.*.io' },
];

export const linkedinQueries = [
  { id: 'li_jobs', name: 'LinkedIn Jobs Directory', query: 'site:linkedin.com/jobs/view/' },
  { id: 'li_posts', name: 'LinkedIn Recruiter Posts', query: 'site:linkedin.com/posts ("hiring" OR "looking for")' }
];

export const searchEngines = [
  { id: 'google', name: 'Google', url: 'https://www.google.com/search?q=' },
  { id: 'bing', name: 'Bing', url: 'https://www.bing.com/search?q=' },
  { id: 'duckduckgo', name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=' },
  { id: 'yahoo', name: 'Yahoo', url: 'https://search.yahoo.com/search?p=' },
  { id: 'kagi', name: 'Kagi', url: 'https://kagi.com/search?q=' },
  { id: 'qwant', name: 'Qwant', url: 'https://www.qwant.com/?q=' },
  { id: 'brave', name: 'Brave', url: 'https://search.brave.com/search?q=' },
  { id: 'startpage', name: 'Startpage', url: 'https://www.startpage.com/sp/search?query=' },
];

export const timeframes = [
  { id: 'any', name: 'All', value: '' },
  { id: '1h', name: 'Past Hour', value: '&tbs=qdr:h' },
  { id: '4h', name: 'Past 4 Hours', value: '&tbs=qdr:h4' },
  { id: '8h', name: 'Past 8 Hours', value: '&tbs=qdr:h8' },
  { id: '12h', name: 'Past 12 Hours', value: '&tbs=qdr:h12' },
  { id: '24h', name: 'Past 24 Hours', value: '&tbs=qdr:d' },
  { id: '48h', name: 'Past 48 Hours', value: '&tbs=qdr:d2' },
  { id: '72h', name: 'Past 72 Hours', value: '&tbs=qdr:d3' },
  { id: '7d', name: 'Past Week', value: '&tbs=qdr:w' },
  { id: '30d', name: 'Past Month', value: '&tbs=qdr:m' },
];

export function buildKeywords(params) {
  const { jobTitle, location, isRemote, excludeRemote, excludedKeywords, requiredSkills, strictMode } = params;
  let keywords = [];

  if (jobTitle) {
    const title = jobTitle.trim();
    if (strictMode) {
      keywords.push(`intitle:"${title}"`);
    } else if (title.includes(' ') && !title.startsWith('"')) {
      keywords.push(`"${title}"`);
    } else {
      keywords.push(title);
    }
  }

  if (location && !isRemote) {
    keywords.push(`"${location}"`);
  }

  if (isRemote) {
    keywords.push('("remote" OR "anywhere" OR "work from home" OR "virtual")');
  }

  if (excludeRemote) {
    keywords.push('-"remote" -"work from home" -"telecommute" -"virtual"');
  }

  if (requiredSkills) {
    const skills = requiredSkills.split(',').map(s => `"${s.trim()}"`);
    if (skills.length > 0) {
      keywords.push(`(${skills.join(' AND ')})`);
    }
  }

  if (excludedKeywords) {
    const excludes = excludedKeywords.split(',').map(k => {
      const trimmed = k.trim();
      return trimmed ? `-${trimmed}` : '';
    }).filter(k => k);
    if (excludes.length > 0) {
      keywords.push(excludes.join(' '));
    }
  }

  return keywords.join(' ');
}

export function generateSearchUrl(baseEngineUrl, platformQuery, params) {
  const keywordsStr = buildKeywords(params);
  const queryStr = `${platformQuery} ${keywordsStr}`;
  let finalUrl = `${baseEngineUrl}${encodeURIComponent(queryStr.trim())}`;
  
  if (baseEngineUrl.includes('google') && params.timeframe && params.timeframe !== 'any') {
    const timeParam = timeframes.find(t => t.id === params.timeframe)?.value || '';
    finalUrl += timeParam;
  }
  return finalUrl;
}

export function generateCombinedSearchUrl(baseEngineUrl, platforms, params) {
  if (!platforms || platforms.length === 0) return baseEngineUrl;
  const combinedPlatforms = `(${platforms.map(p => p.query).join(' OR ')})`;
  const keywordsStr = buildKeywords(params);
  const queryStr = `${combinedPlatforms} ${keywordsStr}`;
  let finalUrl = `${baseEngineUrl}${encodeURIComponent(queryStr.trim())}`;
  
  if (baseEngineUrl.includes('google') && params.timeframe && params.timeframe !== 'any') {
    const timeParam = timeframes.find(t => t.id === params.timeframe)?.value || '';
    finalUrl += timeParam;
  }
  return finalUrl;
}

export const commonLocations = [
  "Alabama, US", "Alaska, US", "Arizona, US", "Arkansas, US", "California, US", "Colorado, US", "Connecticut, US", "Delaware, US", "Florida, US", "Georgia, US", "Hawaii, US", "Idaho, US", "Illinois, US", "Indiana, US", "Iowa, US", "Kansas, US", "Kentucky, US", "Louisiana, US", "Maine, US", "Maryland, US", "Massachusetts, US", "Michigan, US", "Minnesota, US", "Mississippi, US", "Missouri, US", "Montana, US", "Nebraska, US", "Nevada, US", "New Hampshire, US", "New Jersey, US", "New Mexico, US", "New York, US", "North Carolina, US", "North Dakota, US", "Ohio, US", "Oklahoma, US", "Oregon, US", "Pennsylvania, US", "Rhode Island, US", "South Carolina, US", "South Dakota, US", "Tennessee, US", "Texas, US", "Utah, US", "Vermont, US", "Virginia, US", "Washington, US", "West Virginia, US", "Wisconsin, US", "Wyoming, US",
  "Washington, DC", "Puerto Rico",
  "Canada", "United Kingdom", "Germany", "France", "Spain", "Italy", "Netherlands", "Sweden", "Switzerland", "Australia", "New Zealand", "India", "Japan", "Singapore", "Brazil", "Mexico",
  "Remote, US", "Remote, Global", "Remote, EMEA", "Remote, APAC", "Remote, LATAM",
  "New York, NY", "San Francisco, CA", "Seattle, WA", "Austin, TX", "Chicago, IL", "Boston, MA", "Los Angeles, CA", "Denver, CO", "Atlanta, GA", "London, UK", "Toronto, ON", "Berlin, Germany", "Amsterdam, Netherlands"
];

export function generateIntelligenceUrl(type, params) {
  const { jobTitle, location } = params;
  if (!jobTitle) return '#';
  
  const titleStr = `"${jobTitle}"`;
  const locStr = location ? `"${location}"` : '';
  
  let query = '';
  switch(type) {
    case 'blind':
      query = `site:teamblind.com/post ${titleStr} ${locStr} (salary OR interview OR offer)`;
      break;
    case 'glassdoor':
      query = `site:glassdoor.com/Interview ${titleStr} ${locStr}`;
      break;
    case 'reddit':
      query = `site:reddit.com/r/cscareerquestions OR site:reddit.com/r/careerguidance OR site:reddit.com/r/jobs ${titleStr} ${locStr}`;
      break;
    default:
      return '#';
  }
  
  return `https://www.google.com/search?q=${encodeURIComponent(query.trim())}`;
}
