export interface ContentBlock {
  type: 'section' | 'paragraph' | 'data' | 'quote';
  heading?: string;
  tag?: string;
  text?: string;
  items?: string[];
  attribution?: string;
}

export interface Article {
  title: string;
  subtitle?: string;
  category: string;
  date: string;
  readTime: string;
  content: ContentBlock[];
}

export interface Newsletter {
  id: string;
  title: string;
  issue: string;
  date: string;
  category: string;
  readTime: string;
  summary: string;
  highlights: string[];
  article: Article;
  color: string;
}

export const MOCK_NEWSLETTERS: Newsletter[] = [
  {
    id: 'nl-auto-1247',
    title: 'Auto Industry Daily',
    issue: '#1,247',
    date: 'May 27, 2026',
    category: 'Automotive',
    readTime: '12 min',
    summary:
      'FAME III extension through March 2027; Tata Motors Q4 surges 12.3%; Hyundai breaks ground in Maharashtra.',
    highlights: [
      'FAME III subsidies extended',
      'Tata EV division +340%',
      'Hyundai ₹6,000 Cr plant',
    ],
    color: '#006D7A',
    article: {
      title: 'Auto Industry Daily',
      subtitle: 'Issue #1,247 · May 27, 2026',
      category: 'Automotive',
      date: 'May 27, 2026',
      readTime: '12 min read',
      content: [
        {
          type: 'section',
          heading: 'POLICY UPDATE',
          tag: 'Government & Regulation',
          text: `India's Ministry of Heavy Industries has extended the FAME III subsidies for commercial electric vehicles through March 2027, a move that analysts say will accelerate fleet electrification among logistics and public transport operators. The revised scheme offers up to ₹15,000 per kWh for commercial EV batteries, up from ₹10,000 under FAME II. State governments of Maharashtra, Karnataka, and Tamil Nadu have announced parallel incentives that could effectively reduce total acquisition cost of a commercial EV by 22–28% compared to an equivalent diesel vehicle.`,
        },
        {
          type: 'section',
          heading: 'INDUSTRY NEWS',
          tag: 'Corporate Performance',
          text: `Tata Motors reported Q4 FY25 revenues of ₹1.19 lakh crore, up 12.3% year-on-year, driven by strong Jaguar Land Rover performance in North America and surging domestic EV sales. The Tata Punch EV and Nexon EV together accounted for 67% of all passenger EVs sold in India in March 2025. Management guided for 18% revenue growth in FY26, citing JLR order backlog of 168,000 units and a pipeline of six new EV launches across its India portfolio through FY27.`,
        },
        {
          type: 'section',
          heading: 'COMPETITOR INTELLIGENCE',
          tag: 'Market Movements',
          text: `Hyundai India has officially broken ground on its second manufacturing facility in Talegaon, Maharashtra. The ₹6,000 crore plant will have an annual capacity of 200,000 units and will produce both ICE and battery-electric vehicles on a shared platform. Production is expected to commence in Q3 FY27. This positions Hyundai to challenge Maruti Suzuki's dominance in the mid-premium segment, particularly as Hyundai's new Creta EV has already captured 34% of the ₹15–25 lakh EV bracket.`,
        },
        {
          type: 'data',
          heading: 'NUMBERS THAT MATTER',
          tag: 'Market Data',
          items: [
            'Passenger vehicle wholesales: 3,89,260 units in April 2025 (+8.2% YoY)',
            'EV penetration in PV segment: 7.1% in April 2025 vs. 4.2% in April 2024',
            'Two-wheeler exports: 5,12,000 units in April 2025 (+14.7% YoY)',
            'Auto component exports: ₹18,320 crore in Q4 FY25 (+9.8% YoY)',
            'Used car market size: ₹3.67 lakh crore estimated for FY25',
            'EV charging infrastructure: 12,147 public charging points as of May 2025',
          ],
        },
        {
          type: 'quote',
          text: 'The convergence of FAME III extension, aggressive OEM investment, and improving charging infrastructure suggests India is approaching an inflection point. We estimate EV penetration will cross 15% in the passenger segment by FY28.',
          attribution: 'NURC Research Desk, Automotive Division',
        },
      ],
    },
  },
  {
    id: 'nl-banking-892',
    title: 'Banking & Finance Digest',
    issue: '#892',
    date: 'May 27, 2026',
    category: 'Banking',
    readTime: '10 min',
    summary:
      'RBI holds repo rate; NPA ratio hits 12-year low at 2.8%; UPI crosses ₹18.3 lakh crore in April.',
    highlights: ['Repo rate steady at 6.25%', 'Gross NPA 2.8% — 12yr low', 'UPI ₹18.3L Cr monthly'],
    color: '#0A2540',
    article: {
      title: 'Banking & Finance Digest',
      subtitle: 'Issue #892 · May 27, 2026',
      category: 'Banking & Finance',
      date: 'May 27, 2026',
      readTime: '10 min read',
      content: [
        {
          type: 'section',
          heading: 'RBI POLICY UPDATE',
          tag: 'Regulatory',
          text: `The Reserve Bank of India's Monetary Policy Committee held the repo rate steady at 6.25% in its May 2026 meeting, signalling a prolonged pause before any rate cuts. Governor Sanjay Malhotra cited persistent core inflation at 4.8% and global currency volatility as key factors. Analysts now push back their first rate-cut expectation to Q3 FY26, revising from earlier Q1 FY26 projections.`,
        },
        {
          type: 'data',
          heading: 'BANKING SECTOR METRICS',
          tag: 'Key Indicators',
          items: [
            'Gross NPA ratio (system-wide): 2.8% in March 2025 — 12-year low',
            'Credit growth (YoY): 14.2% as of April 2025',
            'CASA ratio (private banks avg.): 41.3%',
            'Net interest margins under pressure: -18 bps on average vs. FY24',
            'Digital payment volumes: ₹18.3 lakh crore via UPI in April 2025',
          ],
        },
        {
          type: 'section',
          heading: 'FINTECH LANDSCAPE',
          tag: 'Emerging Tech',
          text: `The introduction of RBI's digital rupee (e₹) pilot has crossed 5 million retail users. The NPCI is reportedly exploring offline transaction capabilities using Bluetooth and NFC technologies, aiming to boost transaction rates in low-connectivity rural pockets by Q4 2026.`,
        },
        {
          type: 'quote',
          text: "India's banking system is currently at its healthiest in a decade, characterized by record-low NPAs and strong capital buffers. However, net interest margin compression remains the chief challenge for commercial banks in upcoming quarters.",
          attribution: 'NURC Financial Analyst Desk',
        },
      ],
    },
  },
  {
    id: 'nl-infra-445',
    title: 'Infrastructure Intelligence',
    issue: '#445',
    date: 'May 20, 2026',
    category: 'Infrastructure',
    readTime: '9 min',
    summary:
      'NHAI awards ₹38,000 Cr in new highway projects; bullet train project hits civil milestone; PPP pipeline update.',
    highlights: ['NHAI ₹38,000 Cr tenders', 'Bullet train milestone', '14 new PPP projects'],
    color: '#3B6E8A',
    article: {
      title: 'Infrastructure Intelligence',
      subtitle: 'Issue #445 · May 20, 2026',
      category: 'Infrastructure',
      date: 'May 20, 2026',
      readTime: '9 min read',
      content: [
        {
          type: 'section',
          heading: 'HIGHWAY AWARDS',
          tag: 'National Corridors',
          text: `The National Highways Authority of India (NHAI) awarded contracts worth ₹38,000 crore for 14 greenfield expressway stretches spanning 420 km. The projects will follow the Hybrid Annuity Model (HAM), drawing substantial institutional investment. GR Infra and Dilip Buildcon emerged as the primary beneficiaries of this bidding cycle.`,
        },
        {
          type: 'section',
          heading: 'HIGH-SPEED RAIL PROJECT',
          tag: 'Mega Projects',
          text: `The Mumbai-Ahmedabad High-Speed Rail Corridor achieved a crucial milestone with the completion of the 21 km under-sea tunnel contract. The tunnel boring machines are operating at peak efficiency, and civil works on all 12 stations are on track for an initial operational run by late 2027.`,
        },
        {
          type: 'data',
          heading: 'INFRASTRUCTURE DEVELOPMENT POOL',
          tag: 'Key Stats',
          items: [
            'Greenfield expressways awarded: 420 km',
            'Average cost per km: ₹90.4 crore',
            'PPP investment pipeline: ₹4.8 lakh crore for FY26',
            'Urban metro networks active: 22 cities nationwide',
          ],
        },
      ],
    },
  },
  {
    id: 'nl-energy-312',
    title: 'Energy & Power Daily',
    issue: '#312',
    date: 'May 18, 2026',
    category: 'Energy',
    readTime: '11 min',
    summary:
      'India adds 3.2 GW solar in Q4 FY25; coal plant retirement plan announced; green hydrogen PLI applications open.',
    highlights: ['3.2 GW solar added Q4', 'Coal retirement roadmap', 'Green H₂ PLI opens'],
    color: '#5B8A5E',
    article: {
      title: 'Energy & Power Daily',
      subtitle: 'Issue #312 · May 18, 2026',
      category: 'Energy',
      date: 'May 18, 2026',
      readTime: '11 min read',
      content: [
        {
          type: 'section',
          heading: 'RENEWABLE ENERGY CAP',
          tag: 'Solar Expansion',
          text: `India added an impressive 3.2 GW of utility-scale solar capacity in Q4 FY25, bringing the total renewable energy capacity to 192 GW. Rajasthan and Gujarat accounted for over 72% of the new capacity, aided by large solar park commissions.`,
        },
        {
          type: 'section',
          heading: 'DECARBONIZATION SCHEME',
          tag: 'Coal Retirement',
          text: `The Ministry of Power unveiled a phase-out roadmap for subcritical thermal power plants older than 25 years. Under the plan, 14 GW of older coal capacity will be retired or converted into grid-stabilizing synchronous condensers by 2030, marking a significant carbon reduction initiative.`,
        },
        {
          type: 'quote',
          text: 'Decarbonizing our base-load power grid is the hardest part of the energy transition. The retirement scheme shows a serious commitment to the 2070 net-zero targets.',
          attribution: 'NURC Energy Desk',
        },
      ],
    },
  },
  {
    id: 'nl-healthcare-178',
    title: 'Healthcare & Biotech Intelligence',
    issue: '#178',
    date: 'May 12, 2026',
    category: 'Healthcare',
    readTime: '8 min',
    summary:
      'Apollo Hospitals acquires Assam chain; CDSCO updates medical device norms; PM-JAY expansion details.',
    highlights: [
      'Apollo Assam acquisition',
      'CDSCO device norms update',
      'PM-JAY 5 Cr new enrollees',
    ],
    color: '#7B5C8A',
    article: {
      title: 'Healthcare & Biotech Intelligence',
      subtitle: 'Issue #178 · May 12, 2026',
      category: 'Healthcare',
      date: 'May 12, 2026',
      readTime: '8 min read',
      content: [
        {
          type: 'section',
          heading: 'HOSPITAL CONSOLIDATION',
          tag: 'M&A Activity',
          text: `Apollo Hospitals Enterprise acquired a 60% stake in an Assam-based hospital chain for ₹340 crore. The acquisition expands Apollo's footprint in the underserved North-East market, adding 450 operational beds to its network.`,
        },
        {
          type: 'section',
          heading: 'REGULATORY LANDSCAPE',
          tag: 'CDSCO Directives',
          text: `The Central Drugs Standard Control Organisation (CDSCO) issued updated quality certification requirements for implantable medical devices. Manufacturers must now align with ISO 13485 standards, aiming to enforce global standards on indigenous implants by November.`,
        },
      ],
    },
  },
  {
    id: 'nl-finance-334',
    title: 'Financial Markets Briefing',
    issue: '#334',
    date: 'April 28, 2026',
    category: 'Finance',
    readTime: '9 min',
    summary:
      'SEBI mandates instant settlement on pilot basis; mutual fund AUM crosses ₹58 trillion; IPO boom continues.',
    highlights: [
      'T+0 instant settlement pilot',
      'MF AUM ₹58 trillion record',
      'SIP flows touch ₹21,000 Cr',
    ],
    color: '#5B4A7B',
    article: {
      title: 'Financial Markets Briefing',
      subtitle: 'Issue #334 · April 28, 2026',
      category: 'Finance',
      date: 'April 28, 2026',
      readTime: '9 min read',
      content: [
        {
          type: 'section',
          heading: 'MARKET SETTLEMENT',
          tag: 'SEBI Guidelines',
          text: `The Securities and Exchange Board of India (SEBI) has launched its optional T+0 instant settlement cycle for a limited set of 25 highly liquid stocks. The pilot aims to free up system liquidity, allowing investors to receive stock sale proceeds instantly.`,
        },
        {
          type: 'data',
          heading: 'DOMESTIC MUTUAL FUND DATA',
          tag: 'Key Statistics',
          items: [
            'Total Mutual Fund AUM: ₹58.4 lakh crore as of March 2026',
            'Monthly SIP inflows: ₹21,240 crore record high',
            'New Demat accounts registered: 3.4 million in April',
          ],
        },
      ],
    },
  },
  {
    id: 'nl-insurance-210',
    title: 'Insurance Insights',
    issue: '#210',
    date: 'April 14, 2026',
    category: 'Insurance',
    readTime: '8 min',
    summary:
      'IRDAI removes commission caps in favor of Board-approved limits; health insurance growth outpacing life products.',
    highlights: [
      'IRDAI removes commission caps',
      'Health insurance growth +22%',
      'Bima Sugam digital launch',
    ],
    color: '#006D7A',
    article: {
      title: 'Insurance Insights',
      subtitle: 'Issue #210 · April 14, 2026',
      category: 'Insurance',
      date: 'April 14, 2026',
      readTime: '8 min read',
      content: [
        {
          type: 'section',
          heading: 'INSURANCE REGULATION',
          tag: 'IRDAI Directives',
          text: `In a landmark move, the Insurance Regulatory and Development Authority of India (IRDAI) replaced explicit commission caps for agents with broad expense-of-management (EoM) limits. This gives insurers significant flexibility to incentivize agents, driving higher penetration in rural regions.`,
        },
        {
          type: 'section',
          heading: 'DIGITAL DISTRIBUTION',
          tag: 'Bima Sugam',
          text: `The unified digital insurance portal "Bima Sugam" is slated to launch on a pilot scale next month. The portal allows consumers to compare, purchase, and settle claims across life, health, and general insurance products in a single interface.`,
        },
      ],
    },
  },
  {
    id: 'nl-tech-668',
    title: 'Technology & AI Daily',
    issue: '#668',
    date: 'March 30, 2026',
    category: 'Technology',
    readTime: '10 min',
    summary:
      'India semiconductor fab works commence in Gujarat; AI regulations framework draft released; SaaS funding revival.',
    highlights: [
      'Gujarat semiconductor fab starts',
      'Draft AI regulations framework',
      'Enterprise AI workloads soar',
    ],
    color: '#3B6E8A',
    article: {
      title: 'Technology & AI Daily',
      subtitle: 'Issue #668 · March 30, 2026',
      category: 'Technology',
      date: 'March 30, 2026',
      readTime: '10 min read',
      content: [
        {
          type: 'section',
          heading: 'CHIP MANUFACTURING',
          tag: 'Semiconductor Mission',
          text: `Construction has officially commenced at Tata Electronics' mega semiconductor fab in Dholera, Gujarat. The ₹91,000 crore facility, partnered with PSMC, will produce its first batch of 28nm chips by early 2027, catering to automotive, consumer electronics, and telecom sectors.`,
        },
        {
          type: 'section',
          heading: 'ARTIFICIAL INTELLIGENCE POLICY',
          tag: 'Regulatory framework',
          text: `The Ministry of Electronics and IT (MeitY) released a draft regulatory framework for AI safety. The rules categorize AI applications into four risk tiers, mandating independent bias audits and watermarking for deep generative models deployed in public-facing services.`,
        },
        {
          type: 'quote',
          text: 'Establishing a semiconductor ecosystem and an AI regulatory guardrail simultaneously positions India as a highly structured technology leader in Southeast Asia.',
          attribution: 'NURC Tech Division Lead',
        },
      ],
    },
  },
  {
    id: 'nl-mutualfunds-401',
    title: 'Mutual Funds & AMC Intelligence',
    issue: '#401',
    date: 'May 26, 2026',
    category: 'Mutual Funds',
    readTime: '9 min',
    summary:
      'Industry AUM crosses ₹68 lakh crore; SIP inflows hit fresh record; SEBI tightens expense ratio disclosure norms.',
    highlights: [
      'AUM crosses ₹68L Cr',
      'Monthly SIP ₹23,400 Cr record',
      'SEBI TER disclosure norms',
    ],
    color: '#8A6A3B',
    article: {
      title: 'Mutual Funds & AMC Intelligence',
      subtitle: 'Issue #401 · May 26, 2026',
      category: 'Mutual Funds',
      date: 'May 26, 2026',
      readTime: '9 min read',
      content: [
        {
          type: 'section',
          heading: 'INDUSTRY GROWTH',
          tag: 'AUM Milestone',
          text: `India's mutual fund industry crossed ₹68 lakh crore in total assets under management in May 2026, adding nearly ₹4 lakh crore in a single quarter. Equity-oriented schemes led the surge, while passive funds continued to gain share, now representing 18% of total industry AUM. The number of unique investors (PANs) crossed 5.1 crore, reflecting deepening retail participation beyond the top 30 cities.`,
        },
        {
          type: 'section',
          heading: 'SIP MOMENTUM',
          tag: 'Retail Flows',
          text: `Monthly systematic investment plan (SIP) contributions touched a record ₹23,400 crore, with the active SIP account base surpassing 9.2 crore. AMFI data shows the average SIP ticket size rising to ₹2,540, indicating growing investor confidence. Fund houses report that SIP stoppage ratios have improved to 0.52, the healthiest reading in three years.`,
        },
        {
          type: 'section',
          heading: 'REGULATORY UPDATE',
          tag: 'SEBI Directives',
          text: `SEBI has tightened total expense ratio (TER) disclosure norms, mandating AMCs to publish scheme-level TER changes with 3-day advance notice and clearer point-of-sale disclosures. The regulator also advanced consultation on a proposed low-cost "MF Lite" framework for passive-only fund houses, expected to reduce compliance overhead for new entrants.`,
        },
        {
          type: 'data',
          heading: 'NUMBERS THAT MATTER',
          tag: 'Industry Data',
          items: [
            'Total industry AUM: ₹68.2 lakh crore (May 2026)',
            'Monthly SIP inflows: ₹23,400 crore — record high',
            'Active SIP accounts: 9.2 crore',
            'Passive funds share of AUM: 18%',
            'Unique investors (PANs): 5.1 crore',
            'Equity scheme net inflows: ₹41,800 crore in April 2026',
          ],
        },
        {
          type: 'quote',
          text: 'The structural shift toward SIP-led equity participation is insulating Indian markets from foreign outflow shocks. Domestic institutional flows are now a genuine counterweight to FII volatility.',
          attribution: 'NURC Research Desk, Capital Markets Division',
        },
      ],
    },
  },
  {
    id: 'nl-metals-256',
    title: 'Metals & Minerals Intelligence',
    issue: '#256',
    date: 'May 24, 2026',
    category: 'Metals & Minerals',
    readTime: '10 min',
    summary:
      'Steel demand hits decade-high growth; critical minerals auction round opens; aluminium majors expand smelting capacity.',
    highlights: [
      'Steel demand +11.8% YoY',
      'Critical minerals auction',
      'Aluminium capex ₹42,000 Cr',
    ],
    color: '#5B4A7B',
    article: {
      title: 'Metals & Minerals Intelligence',
      subtitle: 'Issue #256 · May 24, 2026',
      category: 'Metals & Minerals',
      date: 'May 24, 2026',
      readTime: '10 min read',
      content: [
        {
          type: 'section',
          heading: 'STEEL DEMAND',
          tag: 'Domestic Consumption',
          text: `India's finished steel consumption grew 11.8% year-on-year in FY26, the strongest demand growth in a decade, driven by infrastructure spending, construction, and automotive off-take. JSW Steel and Tata Steel both reported record domestic dispatches, while the industry operated at 88% capacity utilisation. Analysts expect the government's ₹11 lakh crore infrastructure pipeline to sustain double-digit demand through FY27.`,
        },
        {
          type: 'section',
          heading: 'CRITICAL MINERALS',
          tag: 'Mining Policy',
          text: `The Ministry of Mines opened its fourth tranche of critical mineral block auctions, offering 24 blocks covering lithium, cobalt, graphite, and rare earths across seven states. The auction is central to India's strategy to secure supply chains for EV batteries and clean-energy manufacturing, reducing dependence on imports which currently exceed 90% for several strategic minerals.`,
        },
        {
          type: 'section',
          heading: 'ALUMINIUM & BASE METALS',
          tag: 'Capacity Expansion',
          text: `Aluminium majors announced combined capex of ₹42,000 crore to expand smelting and alumina refining capacity, betting on rising demand from power transmission, packaging, and lightweight automotive components. Hindalco and Vedanta are both pursuing captive renewable power to lower the carbon intensity of primary aluminium ahead of tightening export-market carbon border rules.`,
        },
        {
          type: 'data',
          heading: 'NUMBERS THAT MATTER',
          tag: 'Sector Data',
          items: [
            'Finished steel consumption growth: +11.8% YoY (FY26)',
            'Industry capacity utilisation: 88%',
            'Critical mineral blocks on auction: 24 across 7 states',
            'Aluminium sector announced capex: ₹42,000 crore',
            'Iron ore production: 289 million tonnes (FY26)',
            'Strategic mineral import dependence: >90%',
          ],
        },
        {
          type: 'quote',
          text: "Securing domestic critical mineral supply is now a matter of industrial sovereignty. The blocks auctioned this round could underpin India's entire EV-battery value chain by 2030.",
          attribution: 'NURC Research Desk, Metals & Mining Division',
        },
      ],
    },
  },
  {
    id: 'nl-fmcg-523',
    title: 'FMCG & Retail Intelligence',
    issue: '#523',
    date: 'May 22, 2026',
    category: 'FMCG',
    readTime: '9 min',
    summary:
      'Rural demand recovery outpaces urban; quick commerce reshapes distribution; input costs ease on softer palm oil.',
    highlights: [
      'Rural volume growth +7.4%',
      'Quick commerce 34% of D2C',
      'Input costs ease 210 bps',
    ],
    color: '#B85C44',
    article: {
      title: 'FMCG & Retail Intelligence',
      subtitle: 'Issue #523 · May 22, 2026',
      category: 'FMCG',
      date: 'May 22, 2026',
      readTime: '9 min read',
      content: [
        {
          type: 'section',
          heading: 'DEMAND RECOVERY',
          tag: 'Rural vs Urban',
          text: `Rural FMCG volume growth accelerated to 7.4% in Q4 FY26, outpacing urban growth of 4.9% for the second consecutive quarter — a reversal of the multi-year trend. A normal monsoon forecast, higher minimum support prices, and rising rural wages are underpinning the recovery. HUL, Dabur, and Marico all flagged improving rural sentiment in their earnings commentary.`,
        },
        {
          type: 'section',
          heading: 'CHANNEL DISRUPTION',
          tag: 'Quick Commerce',
          text: `Quick commerce now accounts for 34% of direct-to-consumer FMCG sales in metro markets, up from 21% a year earlier. Brands are launching platform-exclusive pack sizes and reformulating assortments for 10-minute delivery baskets. Modern trade and traditional kirana channels are responding with loyalty programmes and their own express-delivery tie-ups to defend share.`,
        },
        {
          type: 'section',
          heading: 'MARGIN OUTLOOK',
          tag: 'Input Costs',
          text: `Gross margins are set to expand as key input costs eased roughly 210 basis points, led by a decline in palm oil and crude-linked packaging materials. Most companies signalled they will reinvest part of the margin gain into advertising and price-pack recalibration to drive volume rather than pass through full price cuts.`,
        },
        {
          type: 'data',
          heading: 'NUMBERS THAT MATTER',
          tag: 'Sector Data',
          items: [
            'Rural volume growth: +7.4% (Q4 FY26)',
            'Urban volume growth: +4.9%',
            'Quick commerce share of metro D2C: 34%',
            'Input cost easing: ~210 bps',
            'E-commerce share of FMCG sales: 12.8%',
            'New product launches (top 10 firms): 240+ in FY26',
          ],
        },
        {
          type: 'quote',
          text: 'The rural comeback combined with softening input costs sets up the most favourable FMCG earnings backdrop in three years — but quick commerce is quietly rewriting the rules of distribution.',
          attribution: 'NURC Research Desk, Consumer & Retail Division',
        },
      ],
    },
  },
];
