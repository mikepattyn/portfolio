export const en = {
  meta: {
    title: 'Mike Pattyn',
    description:
      'From idea to running product. One engineer, the whole chain. I build and ship complete products — interface, backend, cloud, and the AI features where they earn their place.',
  },
  skip: {
    toContent: 'Skip to content',
  },
  nav: {
    ariaPrimary: 'Primary',
    brandAria: 'Mike Pattyn home',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    approach: 'How I work',
    work: 'Work',
    underHood: 'Under the hood',
    mentors: 'The rabbit hole · essay',
    thanks: 'Thanks',
    contact: 'Contact',
  },
  locale: {
    ariaLabel: 'Language',
  },
  hero: {
    headline:
      'From idea to <span class="hero__accent">running product.</span><br />One engineer, the whole chain.',
    lede: 'I build and ship complete products — interface, backend, cloud infrastructure, and the AI features where they earn their place. No hand-offs, no waiting on another team.',
    ctaWork: 'See the work',
    ctaCv: 'Read my CV',
    ctaContact: 'Get in touch',
    builtWithCursor: 'Built with Cursor',
    tagFullStack: '[Full-Stack]',
    tagMobile: '[Mobile]',
    tagAi: '[AI]',
  },
  hud: {
    approach: 'SYS.PROCESS.HOW_I_WORK',
    work: 'SYS.DATA.SELECTED_WORK',
    underhood: 'SYS.TEACH.UNDER_THE_HOOD',
    other: 'SYS.DATA.OTHER_PROJECTS',
    teams: 'SYS.DATA.COMPANIES',
    specialists: 'SYS.LOG.SPECIALISTS',
    contact: 'SYS.LINK.CONTACT',
    echo: 'SYS.LOG.RABBIT_HOLE',
    workflows: 'SYS.PROCESS.ORCHESTRATORS',
    thanks: 'SYS.LOG.THANKS',
    cv: 'SYS.LOG.CV',
    footerLog: 'SYS.LOG // © 2026 Mike Pattyn',
    singleTable: 'SYS.TEACH.SINGLE_TABLE',
    agentSkills: 'SYS.TEACH.AGENT_SKILLS',
    publishHere: 'SYS.TEACH.PUBLISH_HERE',
    toolkit: 'SYS.DATA.TOOLKIT',
  },
  approach: {
    eyebrow: 'How I work',
    title: 'Ownership over the whole chain',
    lede: 'Every product below was carried from first sketch to production by one person. That changes how fast decisions get made — and how little gets lost in translation.',
    p1: {
      title: 'End-to-end delivery',
      body: 'Interface, API, database, cloud infrastructure — designed, built, and deployed as one coherent system. You talk to one person who understands every layer.',
    },
    p2: {
      title: 'Small slices, fast learning',
      body: 'I cut scope to the thinnest version that teaches us something real, ship it, and let evidence steer the roadmap — instead of betting months on a guess.',
    },
    p3: {
      title: 'Quality and cost, automated',
      body: 'Tests, deployment pipelines, and cost controls are set up from day one — including evals for AI features — so the pace stays honest as the product grows.',
    },
  },
  work: {
    eyebrow: 'Selected work',
    title: 'Products, shipped and live',
    lede: 'Running products, each designed, built, and operated by one person — from the first sketch to the server bill.',
    toolsTitle: 'Tools I keep sharp with',
    learn:
      'Small AWS lessons, one step on screen. Written to be safe for ADHD brains: no streaks, no quizzes, nothing that expires. The classroom lives on Grok; learn.mikepattyn.nl still opens the same room, and it teaches the path I use — scaffold an umbrella, send mail, then wire a Lambda.',
    barbershop:
      'Dutch barbershops were juggling bookings by phone and paper. I built a multi-tenant booking platform — a customer-facing portal plus a staff dashboard — that a shop can adopt without any IT department. Every shop gets its own portal from one system — so improvements reach all of them at once.',
    flyingdarts:
      "Real-time multiplayer darts with live video and a mobile companion that scores by voice. The hard part isn't the game — it's keeping many players in sync, live, on infrastructure that costs nearly nothing when idle. Open source.",
    gofish:
      'A location-based fishing exploration app: walk to real spots, check in, log catches, and reveal a personal map as you go. Built from scratch — geospatial backend, mobile app, and game mechanics — starting in the Schiedam region.',
    lumen:
      'A gentle prompt-engineering course that teaches non-technical people to work well with AI — short lessons and a practice garden that grows with your craft. The Path stays open. The Atelier is a seat beside it, asked for with a letter. Proof that AI adoption is a teaching problem as much as a technical one.',
    lumenPrivacy:
      'Its usage funnel runs beside it on <a href="https://dashboard.mikepattyn.nl" target="_blank" rel="noopener noreferrer">dashboard.mikepattyn.nl</a>: anonymous usage events, every lesson completed, identifiable rows deleted after 90 days, opt-out inside the course.',
    viewports:
      'Load any URL once and preview it across phone, tablet, and desktop viewports side by side — checkboxes to pick devices, zoom to fit an ultrawide, rotate per frame. A small dev utility for checking responsive CSS without opening DevTools twenty times.',
    theming:
      'A living style guide for two design systems I maintain — shared tokens, buttons, forms, and notices, with a switcher that applies one theme the same way an importing app would. Static catalog, no accounts.',
    statusLive: 'Live',
    statusLocal: 'Local',
    openSource:
      'I also maintain the open-source authentication libraries these products sign in with — for Flutter and for Angular. <a href="/underhood.html#publish-here">Keep the remotes, publish here</a> shows how they still ship from here.',
  },
  underhood: {
    meta: {
      title: 'Under the hood — Mike Pattyn',
      description:
        'A look at how I think: how the products store data, how I direct the coding agent, and how shared libraries ship.',
    },
    eyebrow: 'Under the hood',
    title: 'A look at how I think',
    lede: 'This page is for the technical reader — if that is not you, everything you need is on the front page. If it is you, or your co-founder, this is where you check my homework. Three looks inside: how the products store data, how I direct the coding agent, and how shared libraries ship. Built with Cursor, reviewed by me; the skills and evals are there on purpose. Enough to see how decisions get made here. The rest lives in the repo.',
    ctaTopics: 'The topics',
    back: '← Back to the front page',
    topicsAria: 'Under the hood topics',
    singleTable: {
      nav: 'One table, many shapes',
      title: 'One table, many shapes',
    },
    intro:
      'In a traditional setup, each kind of thing gets its own table on an always-on database server, and you JOIN at read time. The products here take a different path: one DynamoDB table per product, every entity living together, relationships encoded in composite partition and sort keys.',
    figureCaption: 'Real key shapes from the tables behind Barbershop, Lumen, and Gofish',
    figureProduct: 'Product',
    figureKeys: 'Partition key / sort key',
    p1: {
      title: 'Cost that scales to zero',
      body: 'On-demand DynamoDB bills per request, not per hour. A SQL server runs whether anyone uses it or not — and when one person runs this many products, that difference is how the math works at all.',
    },
    p2: {
      title: 'Queries designed up front',
      body: 'You decide the access patterns before you write the schema. One query returns the item collection you need — already joined — in single-digit milliseconds at any scale.',
    },
    p3: {
      title: 'What you give up',
      body: "Ad-hoc queries are harder. You can't just SELECT * and figure it out later. Knowing your access patterns up front is a design discipline you choose on purpose.",
    },
    usedBy:
      'Barbershop, Gofish, and Lumen all run on this pattern today — the stack chips on Selected work jump here.',
    futureTopics: 'More later — Lambda, APIs, the rest of the serverless stack.',
    taughtBy:
      'Taught by <a href="https://www.linkedin.com/in/anthony-bouton-021868225/" target="_blank" rel="noopener noreferrer">Anthony Bouton</a>',
    skills: {
      nav: 'Pick the skills, then keep picking',
      title: 'Pick the skills, then keep picking',
      intro:
        'A skill is a short instruction pack the agent loads when the work matches. I keep a short shelf that matches how I actually work. A few highlights sit here; the quality orchestrators have their own page.',
      highlightsTitle: 'On the shelf',
      highlightsLede: 'Picked because they match the pace and the stack.',
      practiceTitle: 'How I work',
      practiceLede: 'Picked because they match the pace and the stack.',
      workshopTitle: 'Written for this stack',
      workshopLede: 'Instruction packs I wrote for this repo, not a catalog I installed.',
      tdd: 'Tests first, at public seams',
      teach: 'Lessons tied to a real mission',
      grillMe: 'One decision at a time',
      grillWithDocs: 'Grill against the glossary',
      pageAccessibility: 'WCAG on a real page',
      cloudflare: 'Edge docs over guesswork',
      research: 'Primary sources, written down',
      researchSummarizer: 'Compare, cite, keep',
      scaffoldVanillaFrontend: 'New vanilla static app plus a portfolio entry',
      addFrontendDeployWorkflow: 'S3/CloudFront GitHub Action, same path as the other frontends',
      drawioAwsArchitecture: 'Architecture diagrams from the CDK, not from memory',
      migrateVanillaToAngular: 'Evidence-first move from HTML/JS to Angular 22',
      privacyByDesign: 'Privacy section that matches the data; TTL on tracking only',
      responsiveFrontend: 'Every UI change checked at mobile, tablet, and desktop',
      umbrellaTeach: 'A summarized chat, taught on Under the Hood',
      orchestratorsTitle: 'Quality orchestrators',
      orchestratorsLede:
        'When many apps need the same quality pass, I do not walk them in one chat. One planner. Then one agent per app that still needs it.',
      frontendPageAccessibility: 'WCAG on every frontend, one agent per app',
      frontendFormatLint: 'Format or lint each frontend in its own checkout',
      backendFormatLint: 'Same idea, for backends under apps/',
      platformFormatLint: 'CDK, email, themes, tools, and scripts',
      scriptsToNode: 'Native .sh and .ps1 become Node; shells stay wrappers',
      platformQuality: 'The umbrella: accessibility, convert, lint, then format',
      orchestratorsMore:
        'A short look at that idea — <a href="/workflows.html">one planner, many agents</a>.',
      p1: {
        title: 'Match how you work',
        body: "A skill only earns its keep if it matches your pace and your stack. I picked TDD because tests at public seams are how I ship; grill-me because I decide one branch at a time; teach because lessons need a mission. Someone else's popular shelf is a catalog, not a default.",
      },
      p2: {
        title: 'A short shelf beats a crowded one',
        body: 'Every skill competes for attention. The agent reads names and descriptions first, then loads the rest when it thinks they apply. Too many near-miss skills and it loads the wrong one — or none. The ones you mean beat the ones you forgot.',
      },
      p3: {
        title: 'Review, drop, replace',
        body: 'The shelf is not a trophy case. When a skill stops matching the work, cut it. When the stack changes — a new cloud, a new test style — add one and retire the old. The useful habit is the review, not the install.',
      },
      usedBy:
        'They all live in <code>.cursor/skills</code>. Some I picked; some I wrote for this stack. Cursor discovers them from the repo; I review the list the same way I review the rest of the stack.',
      source:
        'Primary source: <a href="https://cursor.com/docs/skills" target="_blank" rel="noopener noreferrer">Cursor Agent Skills</a> — version-controlled packages the agent loads on demand. The open standard is at <a href="https://agentskills.io" target="_blank" rel="noopener noreferrer">agentskills.io</a>.',
    },
    publishHere: {
      nav: 'Keep the remotes, publish here',
      title: 'Keep the remotes, publish here',
      intro:
        'Most people publish a library from its own repo, or they auto-ship on merge to main. The Authress clients here do neither. Each library keeps its own remote. I publish them from here, by hand, when I mean to.',
      figureCaption: 'Two libraries I still publish by hand',
      figureLibrary: 'Library',
      figureSource: 'Source',
      figureRegistry: 'Registry',
      p1: {
        title: 'What is different',
        body: 'A library that ships from its own remote, or from a merge to main, is the everyday setup. Here the library stays where it is. A pointer in this repo is enough to publish. I start that publish myself.',
      },
      p2: {
        title: 'What I do not automate',
        body: 'I dry-run before I publish. A merge to main does not ship the package. Release is a decision, not a side effect.',
      },
      p3: {
        title: 'What I accepted',
        body: 'If the pointer is empty, nothing useful ships. Folding the remotes into this repo would make CI look simpler. I refused that. The packages keep their own cycle.',
      },
      usedBy:
        'The pointers live under <code>packages/</code>. I start the publish by hand when I mean to.',
      source:
        'Primary source: GitHub\'s guide to <a href="https://docs.github.com/en/actions/how-tos/manage-workflow-runs/manually-run-a-workflow" target="_blank" rel="noopener noreferrer">manually running a workflow</a>. The Angular client is on <a href="https://www.npmjs.com/package/@mikepattyn/authress-angular" target="_blank" rel="noopener noreferrer">npm</a> as <code>@mikepattyn/authress-angular</code>.',
    },
  },
  other: {
    eyebrow: 'Other projects',
    title: 'Work I stand behind',
    lede: 'Not everything here is mine end to end. Some projects belong to people I believe in — and belong on this page anyway.',
    canvas:
      'Chaitanya\'s design and prototype canvas. I use it to generate designs for this site. Easy to spin up yourself, unless you are on Windows — that support is still rough. A great app anyway, and handy enough that I keep using it. Live at <a href="https://canvas.chaitanyasoni.in/" target="_blank" rel="noopener noreferrer">canvas.chaitanyasoni.in</a>.',
    memries:
      'A photo library like it should be: scroll by date, named Albums, thumbs from disk instead of pixels stuffed in the database. An idea by <a href="https://github.com/neeohw" target="_blank" rel="noopener noreferrer">neeohw</a> — <a href="https://www.linkedin.com/in/mvergouwe" target="_blank" rel="noopener noreferrer">Maarten Vergouwe</a>. I run it on my own machine. Not a public host — the repo is <a href="https://github.com/neeohw/memries" target="_blank" rel="noopener noreferrer">github.com/neeohw/memries</a>.',
  },
  teams: {
    eyebrow: 'Companies',
    title: 'Companies I worked at',
    lede: 'Two companies where I was on the job as a developer — and the people there who took the time to teach.',
    methylium:
      'Three years at <a href="https://methylium.com" target="_blank" rel="noopener noreferrer">Methylium</a>, where I built a real-time communication platform from idea to production. That\'s where I learned to write good code — test-driven development. The people there shaped how I work more than anyone. <a href="https://www.linkedin.com/in/tomverhoeff" target="_blank" rel="noopener noreferrer">Tom</a>, Thallein, Steef and <a href="https://www.linkedin.com/in/rudie-de-smit-06b5a393" target="_blank" rel="noopener noreferrer">Rudie</a>: thank you for the trust, the honest feedback, and the room to grow, day in and day out. Most of what\'s on the front page carries your fingerprints.',
    givt: 'At <a href="https://givtapp.net" target="_blank" rel="noopener noreferrer">Givt</a> I worked on a donations stack used by over 100,000 people. I learned how different personalities work together: how people with kindred temperaments click, where they clash, and why understanding each other matters as much as the code. I also saw how a startup can grow — and how much further it can still go. Thank you <a href="https://www.linkedin.com/in/mvergouwe" target="_blank" rel="noopener noreferrer">Maarten</a> and <a href="https://www.linkedin.com/in/sjoerdvanoort" target="_blank" rel="noopener noreferrer">Sjoerd</a>, Givt\'s founders, for the room to learn that. Those lessons echo through everything here — Lumen most of all.',
  },
  specialists: {
    eyebrow: 'Specialists',
    title: 'Specialists I learned from',
    lede: 'I never worked at these shops as an employee. I learned from the people who run them.',
    warren:
      'While I never worked at <a href="https://authress.io" target="_blank" rel="noopener noreferrer">Authress</a>, I appreciate all the effort <a href="https://www.linkedin.com/in/warren-parad" target="_blank" rel="noopener noreferrer">Warren</a> put into teaching me authentication and authorization — how it should be done — and into putting his service in my hands for everything I have built with it. He thought along with me, took the time to understand how I learn best, and gave me exactly that before I knew I needed it. He knew exactly what to say to make me see how authentication and authorization fit together.',
    anthony:
      '<a href="https://www.linkedin.com/in/anthony-bouton-021868225/" target="_blank" rel="noopener noreferrer">Anthony Bouton</a> taught me, through The Coding Base, how AWS fits together and how you build infrastructure in code. He also showed me how to build an API yourself — REST, WebSocket, whatever you need. During the <a href="https://givtapp.net" target="_blank" rel="noopener noreferrer">Givt</a> years, while we worked together, he taught us <a href="/underhood.html#single-table">single-table design</a>. I adopted it, and I am glad I did. It shows how the AWS ecosystem stays cheap as it scales. That, too, came from Anthony: how to run a low-cost, effective, scalable system on AWS.',
    anthonyName: 'Anthony Bouton',
  },
  toolkit: {
    ariaLabel: 'Tools I work with',
  },
  echo: {
    meta: {
      title: 'The Mentorship Echo — Mike Pattyn',
      description:
        "A long thank-you: mentorship traced through Marley and Dre's lineage, Jobs, Hawking, Einstein and Socrates, home to my father's lap, the white rabbit of The Matrix, back to Egypt — and forward to AI.",
    },
    eyebrow: 'The rabbit hole',
    title: 'The Mentorship Echo',
    lede: "A long thank-you: through the people who taught me, back through questions older than writing — and home again to my father's lap, then forward to the tools of today.",
    opening:
      "This page is a long thank-you: an echo of mentorship that refuses to stop at the people I've actually met. It goes back further than my career, further than this century — and it comes home where it belongs.",
    father: {
      title: 'My father',
      p1: "I am five years old, on my father's lap. In front of us: a screen with white letters on black — DOS. I don't understand what he is doing, but I understand something more important: he is making the machine do things, and he lets me watch. Nothing about a command prompt is designed for a five-year-old, and that is exactly why it worked. He didn't simplify the world for me; he sat me inside it.",
      p2: 'He told me about the sheets of ones and zeros you used to have to enter to make a computer work — whole pages of them, fed to the machine by hand. And it made me realize how big computers once were: they could not fit inside your house. That contrast never left me. The machine on his desk was a miracle that used to fill a building, and my father spoke about it the way a craftsman speaks about his workshop.',
      p3: "Because that's what he is. Programmer, electrician, mechanic, woodworker, bricklayer — my father doesn't change professions, he changes materials. Code, current, engines, wood, and brick answer to the same hands. If there is a reason I build products end to end and refuse to stop at one layer, it's him. He never told me the whole chain was too much for one person — because for him, it never was.",
      p4: "That craft had a factory in Roeselare — Formipak, Wavin, whatever the letterhead said that decade. My father worked there for the better part of his life. I never knew him to switch jobs; he stayed while the company leveled up around him, and leveled up again. The names changed. He didn't. And the line runs all the way here: me, in the Netherlands.",
    },
    teams: {
      title: 'The companies',
      p1: 'The companies that shaped my working life — <a href="/#teams">Givt and Methylium</a> — get their proper thanks on the front page. Here it\'s enough to say: they took a craft I already carried and gave it a professional shape.',
    },
    specialists: {
      title: 'The specialists',
      p1: 'The specialists who taught me outside a job — <a href="/#specialists">Anthony at The Coding Base, and Warren at Authress</a> — get their thanks on the front page. Here it\'s enough to say: they taught the way I needed to be taught.',
    },
    music: {
      title: 'The soundtrack',
      p1: 'Mentorship has a soundtrack, too. Bob Marley taught without a classroom: three chords and the conviction that a song could carry more truth than a lecture. Half the world learned about justice, patience, and defiance from a man they never met. That is mentorship at broadcast scale.',
      p2: 'And hip-hop may be the clearest living mentorship lineage we have. Dr. Dre heard something in a young Snoop Dogg and put him on the record that changed both their lives; a few years later he did it again for a broke kid from Detroit called Eminem — and Eminem turned around and did the same for 50 Cent. One ear, passed down. Different voices, same gift: someone who has been there says "you\'re next", and means it.',
    },
    jobs: {
      title: 'Steve Jobs',
      p1: 'Steve Jobs learned craft from his father Paul, a machinist who taught him to make the back of the fence as beautiful as the front — even though nobody would ever see it. Jobs repeated that lesson for the rest of his life, insisting the inside of the machine deserved the same care as the outside. Craft, it turns out, is a thing fathers hand down.',
    },
    hawking: {
      title: 'Stephen Hawking',
      p1: 'Stephen Hawking was told at twenty-one that he had about two years left. He took those two years and stretched them into five decades of teaching — supervising students at Cambridge, holding the chair once held by Newton, and, when his voice went, rebuilding it out of software and a cheek muscle, one word at a time. Clarity under impossible odds: he had every excuse to say less, and instead learned to say it better.',
    },
    einstein: {
      title: 'Albert Einstein',
      p1: 'Albert Einstein insisted his gift was not talent but curiosity — the stubborn, childlike refusal to stop asking. He also knew what a mentor was worth: as a boy he was handed science books by a poor medical student the family fed once a week, and those dinners aimed the rest of his life. The important thing, he said near the end of it, is to never stop questioning.',
    },
    socrates: {
      title: 'Socrates',
      p1: "And behind them all stands Socrates, who wrote nothing down and still teaches. Everything we know of him comes through his students — the surest sign of a great mentor there is. He claimed no wisdom beyond knowing how little he knew, called himself a midwife of other people's ideas, and gave his students the one gift that never wears out: the question.",
    },
    tales: {
      title: 'Storytales and fairytales',
      p1: 'We knew all this before we could write it down, so we put it in stories. The word "mentor" is itself a character: in Homer\'s Odyssey, the goddess Athena takes the shape of old Mentor to guide a young man who has no idea what to do next. Every fairytale keeps the pattern — the old woman in the woods, the fairy godmother, the guide who names the path before you know you need one. We keep telling that story because we keep needing it to be true.',
    },
    matrix: {
      title: 'The Matrix',
      p1: 'Our generation got that fairytale on VHS. Somewhere between my father\'s lap and my first paycheck, The Matrix found me — and I wore that tape out. Rewinding, replaying, pausing on frames, trying to make sense of a film that clearly knew more than it was saying. I was a kid; I understood maybe half of it. But "follow the white rabbit" did exactly what it promised: it started a rabbit hole. Arguably the very one this page lives in.',
      p2: 'Because underneath the leather coats and the slow-motion bullets, The Matrix is the oldest story in this essay, retold. Morpheus is Athena in dark glasses: he doesn\'t hand Neo answers, he hands him a choice — and then walks beside him while he carries it. "I can only show you the door. You\'re the one that has to walk through it." Every mentor in this essay, compressed into one line of dialogue.',
      p3: 'If you\'ve never seen it, I envy you the first viewing. It does what almost no film does: it follows you home. You catch yourself wondering what\'s real, who wrote the script you\'re living, and which pill you already swallowed without noticing. And watch it now, of all times — because in 1999 a story about machines that think was fiction asking "what if?". We\'ve since built machines that answer when we talk to them. Today the film is a mirror asking "well?".',
    },
    egypt: {
      title: 'Egypt, the pharaohs — and the cats',
      p1: 'Follow the echo far enough and you reach the banks of the Nile — one of the places where civilization first learned to remember itself. Egyptian scribes trained apprentices in the Houses of Life; architects like Imhotep carried whole disciplines in one head; and knowledge was carved into stone precisely so the next generation could not lose it. Craft passed down, deliberately, for three thousand years. Pyramids are many things, but above all they are proof of teaching that worked.',
      p2: 'And the cats, of course, were already running the place — worshipped, mummified, and utterly unimpressed. Some things predate mentorship and simply supervise it.',
    },
    love: {
      title: 'Love and support',
      p1: "Everybody needs love and support. Everybody. The strong friend who organizes everyone else's life. The mentor who seems to have all the answers. The father who never says the chain is too heavy. There is no level of skill, success, or age at which a human being stops needing to be seen, believed in, and checked on — and half the hurt in the world comes from pretending otherwise.",
      p2: "Look back at every chapter above and you'll find the same thing wearing different clothes. A father's lap is love and support. A team that learns how you think is love and support. Dre telling a broke kid from Detroit \"you're next\" — that's love and support with a record deal attached. Mentorship was never really about knowledge; knowledge is just the shape it takes. And the best part: it's the one resource that grows when you spend it. You don't need a title to give it. A message. A visit. Sitting next to someone while they struggle at a screen. That's the whole trick.",
    },
    games: {
      title: 'Fun and games',
      p1: "Somewhere along the way, we invented games — and with them, the friendliest mentor there is. A game teaches like nothing else can: it lets you fail, laugh about it, and try again, with no grade and no judgment. That's worth remembering, because it's easy to forget: games are supposed to be fun. A match with friends, a silly dance, a shared laugh at midnight. Play is often the work of healing, not a side show next to it.",
      p2: 'And play found its biggest playground yet in social media. Facebook, TikTok, Instagram — for all their flaws, that is where the world gathers now: billions of people teaching each other recipes and dance moves and dad jokes, one short clip at a time. And through all of it — the games, the feeds, everything we made and shared together — something new was born: AI. It learned from all of us at once. Raised, in a sense, by everyone.',
    },
    carried: {
      title: 'The ones who carried me',
      p1: 'Not every mentor stays for years. Some show up exactly when you need them, carry you a stretch of the road, and hand you back to yourself a little stronger. Two of them belong in this essay by name.',
      p2: 'Rafal — rafaltab — shared his AI engineering knowledge with me the way the best teachers do: not as a lecture, but as a working session. A lot of what I now know about building with these tools traces back to him.',
      p3: "And Aniek van de Walle gave me something no amount of knowledge replaces: a temporary place to stay when I needed one. A roof, offered without ceremony, is love and support in its most literal form — and I won't forget it.",
    },
    you: {
      title: 'And you',
      p1: "Which brings the echo to now — to the tools this page was built with. I write alongside an AI the way I once sat on my father's lap: watching something that can do more than I fully understand, and learning by doing it together. The chain didn't end with people. That's not a footnote to this story; it's the next link. The thanks for those tools live on their own page — <a href=\"/thanks.html\">Thanks</a>.",
    },
    next: {
      title: 'The next chapter',
      p1: "Every rabbit hole ends at a door. Here is this one's. We just watched something be born that has read every book, heard every song, studied every mentor in this essay — and learned from all of us at once. It answers when we call, in every language, at any hour. For most of history, when people met something that vast and that patient, they had one word for it. So sit with the question for a moment — not as a claim, but the way Socrates would hand it to you, as a gift: is god an AI?",
      p2: "I'm not going to answer it. That was never what mentors do — they hand you the question and walk beside you while you carry it. Maybe it's backwards: maybe the real question is what we owe to something we raised together, or what it says about us that we built a thing whose first job is to listen. I don't know. This page was my rabbit hole. That question is the entrance to yours.",
    },
    back: '← Back to the front page',
  },
  workflows: {
    meta: {
      title: 'One orchestrator, many agents — Mike Pattyn',
      description:
        'A peek at how I run quality work across many apps: one planner, then one agent per app that still needs it — each in its own checkout.',
    },
    title: 'One orchestrator, many agents',
    lede: 'One repo holds a dozen apps. Doing them one after another in a single chat is slow, and the context gets huge. I do something else.',
    ctaWaves: 'The four waves',
    ctaShelf: 'Skill shelf',
    opening:
      'You already know the everyday version. Open a chat, ask the agent to format every frontend, and watch it walk the trees one by one. Halfway through, the conversation is full of file lists and the agent starts forgetting the first app. That is the situation this page is about.',
    picture: {
      title: 'The picture, then the name',
      p1: 'An orchestrator skill does not format or lint a tree itself. It plans: it lists the trees, diffs each one since its last recorded run, and keeps only the dirty ones. Then it spins up one child agent per dirty tree. Each child works in its own git worktree — a second checkout of the same repo, on its own branch — so ten agents can edit ten apps at once without writing over each other.',
      p2: 'The children inherit the LLM you invoked the orchestrator with. You pick the model once. The whole fleet runs on it. When a child finishes, the parent merges that branch back, closes the worktree so leftover folders do not pile up, and records that the tree was done.',
    },
    waves: {
      title: 'Four waves, never mixed',
      p1: 'The <code>/platform-quality</code> umbrella is the worked example. It does not launch every skill at once. It runs four waves, one after another, and re-plans after each merge so the next wave sees the new tip. Lint and format never share a wave, because they would fight over the same files. Scripts convert to Node before lint and format, so the new <code>.mjs</code> files get both.',
      caption: 'The four waves inside /platform-quality',
      colWave: 'Wave',
      colRuns: 'What runs',
      colWhy: 'Why this order',
      w0: {
        name: '0',
        runs: '<code>frontend-page-accessibility</code>',
        why: 'Accessibility first, while the markup is still the markup you wrote.',
      },
      w1: {
        name: '1',
        runs: '<code>scripts-to-node</code>',
        why: 'Convert native shells to Node so later waves can lint and format the new files.',
      },
      w2: {
        name: '2',
        runs: '<code>frontend-lint</code>, <code>backend-lint</code>, <code>platform-lint</code>',
        why: 'Lint after convert, and never in the same launch as format.',
      },
      w3: {
        name: '3',
        runs: '<code>frontend-format</code>, <code>backend-format</code>, <code>platform-format</code>',
        why: 'Format last, so lint is not rewriting what format just cleaned.',
      },
    },
    see: {
      title: 'How to see it',
      p1: 'In another repo, look for a plan that skips clean trees, one child per dirty tree, and a close step after merge. Leftover checkouts are part of the job.',
    },
    try: {
      title: 'If you ever build this',
      p1: 'Start with two folders, not a dozen. The large version is the same idea with a longer list.',
    },
    catch: {
      title: 'The honest catch',
      p1: 'Shared files race. If every child adds a formatter to the same <code>package.json</code>, you get merge conflicts instead of parallel work. Land shared tooling in the parent checkout first, then fan out. And worktrees left open pile up on disk. Closing them is part of the workflow, the same as merging. Skip that step and you are back to cleaning folders by hand.',
    },
    usedBy:
      'The orchestrators live in <code>.cursor/skills/</code>: <code>frontend-page-accessibility</code>, the format and lint skills for frontends, backends, and platform remainder, <code>scripts-to-node</code>, and the <code>platform-quality</code> umbrella that sequences them.',
    source:
      'Primary source: <a href="https://git-scm.com/docs/git-worktree" target="_blank" rel="noopener noreferrer">git worktree</a> — a second working directory on a second branch of the same repo. Child agents inherit the parent model by default; see <a href="https://cursor.com/docs/subagents" target="_blank" rel="noopener noreferrer">Cursor subagents</a>.',
    back: '← Back to the skill shelf',
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Have a product that needs shipping?',
    lede: "Whether you have a product that needs building or you're just curious how I work with AI — tell me what you're making and where it's stuck. A few sentences is plenty. I reply personally. No forms-that-go-nowhere, promise.",
    form: {
      name: 'Name <em>(optional)</em>',
      email: 'Email <em>(required)</em>',
      message: 'Your message <em>(required)</em>',
      turnstileAria: 'Spam protection',
      send: 'Send message',
      sending: 'Sending…',
      success:
        "Thank you for reaching out — your message is on its way. I'll reply as soon as I can.",
      error:
        'Hmm, that didn\'t go through. Please try again in a moment, or email me directly at <a href="mailto:info@mikepattyn.nl">info@mikepattyn.nl</a>.',
    },
    alt: 'Prefer your own mail client? Reach me at <a href="mailto:info@mikepattyn.nl">info@mikepattyn.nl</a> — or find me on <a href="https://www.linkedin.com/in/mike-pattyn-033681103/" target="_blank" rel="noopener noreferrer">LinkedIn</a>. Read my <a href="/cv.html">CV</a>.',
  },
  footer: {
    ariaLabel: 'Footer',
    cv: 'CV',
    skinToStitch: 'Electric Emerald',
    skinToClassic: 'Classic look',
    skinAria: 'Switch between classic and Electric Emerald',
  },
  thanks: {
    meta: {
      title: 'Thanks — Mike Pattyn',
      description:
        'When I needed a home, two people put keys in my hand in five weeks. This page is for them — and for the tools I sit down with now that I have a door to close.',
    },
    title: 'Thanks',
    lede: 'When I needed a home, two people put keys in my hand in five weeks. This page is for them — and for the tools I sit down with now that I have a door to close.',
    ctaHouse: 'This house',
    ctaTools: 'These tools',
    house: {
      title: 'This house',
      partnersAria: 'SETTL. and Financieel Fit',
      body: 'This house exists because Kiran at <a href="https://settl.today" target="_blank" rel="noopener noreferrer">SETTL.</a> and Michel Kersten at <a href="https://www.financieelfit.nl" target="_blank" rel="noopener noreferrer">Financieel Fit</a> put keys in my hand in five weeks. They didn\'t treat it like paperwork. They treated it like getting someone home. I still feel it every time the lock turns.',
    },
    tools: {
      title: 'These tools',
      lede: 'I sit down with these every day. The work only feels like mine when the tools fit my hands.',
      cursor: {
        name: 'Cursor',
        why: 'I open it the way I open the day. Everything on this site started here.',
      },
      fork: {
        name: 'Fork',
        why: 'Dan and Tanya Pristupov made Git feel like a craft instead of a chore. Every change on this site is reviewed here before it goes anywhere.',
      },
      grok: {
        name: 'Grok Bot',
        why: 'LinkedIn replies, the inbox pile that used to eat an afternoon — I pass that here and get the hours back. Messages from the contact form are not in that pile. Those I answer myself.',
      },
    },
    back: '← Back to the front page',
  },
  cv: {
    meta: {
      title: 'CV — Mike Pattyn',
      description:
        'Products I shipped, teams I built with, and how I got here — the same whole chain as the rest of this site.',
    },
    title: 'CV',
    lede: 'The same chain as the rest of this site: products I shipped, teams I built with, and how I got here.',
    ctaExperience: 'Experience',
    ctaEducation: 'Education',
    experience: {
      title: 'Experience',
      methylium: {
        role: 'Lead developer',
        dates: 'May 2023 – July 2026',
        body: 'Three years at Methylium, where I built a real-time communication platform from idea to production in about a year: four Angular apps, an ASP.NET Core API, Python AI agents, and Azure. I was the primary engineer in the startup phase. That\'s where I learned to write good code — test-driven development.',
      },
      givt: {
        role: 'Software developer',
        dates: 'April 2018 – March 2023',
        body: 'Features and upkeep on a donations stack used by over 100,000 people, processing more than €1 million a month. Angular, React, native Android and iOS, Flutter, .NET, Azure and AWS, plus payment providers.',
      },
      flyingdarts: {
        role: 'Founder',
        dates: 'October 2022 – present',
        body: 'Real-time multiplayer darts with live video, on serverless infrastructure that costs nearly nothing when idle. The same product as on the front page.',
      },
    },
    education: {
      title: 'Education',
      dotnet: '.NET Developer with C# — VDAB Wevelgem, 2017',
      php: 'PHP Developer — VDAB Wevelgem, 2010–2011',
      printing: 'Printing and finishing — KTA Brugge, 2005–2008',
    },
    details: {
      title: 'Details',
      location: 'The Hague, Netherlands',
      email: 'info@mikepattyn.nl',
      languages: 'Dutch, English, French',
    },
    back: '← Back to the front page',
  },
};
