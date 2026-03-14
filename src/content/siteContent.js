export const siteContent = {
  brand: {
    name: 'Optimal Strength',
    location: 'Assen',
    streetAddress: 'Zoom 18',
    postalCode: '9405 PS',
    locality: 'Assen',
    region: 'Drenthe',
    country: 'NL',
    phoneLabel: 'Bel 06 54 30 73 25',
    phoneHref: 'tel:+31654307325',
    phoneNumber: '+31654307325',
    image: '/images/patrick-coaching.jpg',
  },
  booking: {
    url:
      import.meta.env.VITE_GHL_BOOKING_URL?.trim() ||
      'https://training.optimalstrength.nl/calendar',
    hasLiveEmbed: Boolean(import.meta.env.VITE_GHL_BOOKING_URL?.trim()),
  },
  imagery: {
    process: {
      src: '/images/optimal-strength-process-nb2.png',
      alt: 'Persoonlijk kennismakingsgesprek in een lichte trainingsstudio.',
    },
    support: {
      src: '/images/optimal-strength-support-nb2.png',
      alt: 'Coach begeleidt een klant tijdens een rustige krachttraining.',
    },
    environment: {
      src: '',
      alt: '',
    },
  },
  landing: {
    title: 'Personal training Assen | Gratis kennismakingsgesprek | Optimal Strength',
    description:
      'Voor drukke professionals en ouders in Assen die sterker willen worden, vet willen verliezen en weer energie willen voelen. Vraag direct een gratis kennismakingsgesprek aan.',
    hero: {
      eyebrow: 'PERSONAL TRAINING IN ASSEN',
      headline:
        'Word sterker, verlies vet en krijg weer energie zonder je leven om training heen te bouwen.',
      body:
        'Voor drukke professionals en ouders in Assen die resultaat willen zonder extreme diëten, eindeloze cardio of een overvolle sportschool. Start met een gratis kennismakingsgesprek en ontdek wat voor jou werkt.',
      primaryCta: 'Plan je gratis kennismakingsgesprek',
      support: 'Reactie binnen 24 uur | Studio vlak bij A28 | Gratis parkeren',
      nextStep:
        'Je plant een gratis gesprek, deelt kort je doel en krijgt meteen helder of deze aanpak past bij jouw leven en agenda.',
      proof: [
        '4,8 Google score',
        '10+ jaar ervaring',
        'Zelf 35 kilo afgevallen',
      ],
      image: '/images/patrick-coaching.jpg',
    },
    benefits: [
      {
        title: 'Resultaat zonder extremen',
        body:
          'Gerichte krachttraining en leefstijlcoaching voor blijvende vooruitgang, zonder crashdieet of onhoudbare schema’s.',
      },
      {
        title: 'Past bij een druk leven',
        body:
          'De aanpak is gebouwd voor werk, gezin en een volle agenda. Geen tweede baan naast je baan.',
      },
      {
        title: 'Persoonlijke coaching',
        body:
          'Je krijgt geen standaard spreadsheet, maar begeleiding die aansluit op jouw lichaam, niveau en belastbaarheid.',
      },
    ],
    featuredProof: {
      quote:
        'Ik wilde het goede voorbeeld geven aan mijn kinderen. De aanpak bij Optimal Strength helpt mij om training en vaderschap goed te combineren.',
      name: 'Daniel',
      result: 'Consistent trainen ondanks werk en gezinsleven',
      avatar: '/images/testimonial-daniel-nb2.png',
    },
    moreProof: [
      {
        name: 'Silvia',
        detail: 'Voelde zich stralend en zelfverzekerd op de bruiloft van haar dochter.',
        avatar: '/images/testimonial-silvia-nb2.png',
      },
      {
        name: 'Selma',
        detail: 'Kwam na een blessure weer op koers en bouwde conditie en vertrouwen terug op.',
        avatar: '/images/testimonial-selma-nb2.png',
      },
      {
        name: 'Henriëtte',
        detail: 'Vond opnieuw structuur, vertrouwen en resultaat ondanks tegenslag en een volle agenda.',
        avatar: '/images/testimonial-henriette-nb2.png',
      },
    ],
    process: {
      eyebrow: 'ZO WERKT DE KENNISMAKING',
      title: 'Geen vaag intakeformulier. Wel een duidelijke eerste stap.',
      intro:
        'Mensen haken af wanneer “gratis kennismaken” niet concreet voelt. Daarom moet de eerste stap hier direct duidelijk zijn.',
      steps: [
        {
          title: '1. Kies je moment',
          body:
            'Open de agenda en kies een tijd die past. Geen heen-en-weer mailen en geen onzekerheid over de volgende stap.',
        },
        {
          title: '2. Bespreek je doel',
          body:
            'Tijdens het gesprek bespreek je jouw situatie, wat eerder niet werkte en waar je nu echt naartoe wilt.',
        },
        {
          title: '3. Krijg een eerlijk advies',
          body:
            'Je hoort direct of de aanpak past. Geen druk, geen verkooppraat, wel een helder advies over het beste vervolg.',
        },
      ],
      ctaNote:
        'Eerst weten wat je kunt verwachten werkt beter dan mensen blind naar een “boek nu”-knop duwen.',
    },
    guarantees: [
      'Vrijblijvend kennismakingsgesprek zonder druk of verkooppraat.',
      'Je krijgt binnen 24 uur reactie op je aanvraag.',
      'Geen standaardaanpak: we kijken naar jouw niveau, agenda en doelen.',
      'Makkelijk bereikbaar in Assen, vlak bij de A28 met gratis parkeren.',
    ],
    faqs: [
      {
        q: 'Is dit geschikt als ik al vaker ben vastgelopen?',
        a: 'Ja. Juist dan. Het startpunt is niet hoe fit je nu bent, maar hoe haalbaar de aanpak voor jouw leven is.',
      },
      {
        q: 'Moet ik al ervaring hebben met krachttraining?',
        a: 'Nee. Je wordt begeleid op techniek, opbouw en tempo, zodat je veilig en slim vooruitgaat.',
      },
      {
        q: 'Hoe snel hoor ik iets na mijn aanvraag?',
        a: 'Normaal binnen 24 uur, zodat je niet in een wachtrij verdwijnt.',
      },
    ],
  },
  bookingFlow: {
    title: 'Plan je kennismakingsgesprek | Optimal Strength Assen',
    description:
      'Kies direct een moment, laat je gegevens achter en plan een vrijblijvend kennismakingsgesprek bij Optimal Strength in Assen.',
    eyebrow: 'GRATIS KENNISMAKINGSGESPREK',
    headline: 'Plan een kennismakingsgesprek dat echt in je week past.',
    body:
      'Geen rommelig formulier en geen vage volgende stap. Kies eerst een dag en tijd, laat daarna pas je gegevens achter en zie direct wat er vervolgens gebeurt.',
    trustPills: [
      'Vrijblijvend gesprek',
      'Reactie binnen 24 uur',
      'Gratis parkeren',
      'Persoonlijk contact met Patrick',
    ],
    steps: [
      { id: 'schedule', label: 'Moment', cta: 'Ga naar je gegevens' },
      { id: 'details', label: 'Gegevens', cta: 'Plan mijn kennismaking' },
      { id: 'confirm', label: 'Bevestiging', cta: 'Afgerond' },
    ],
    summaryLabels: {
      day: 'Dag',
      time: 'Tijd',
      goal: 'Doel',
    },
    summaryPlaceholders: {
      day: 'Nog niet gekozen',
      time: 'Kies eerst een slot',
      goal: 'Kies in stap 2',
    },
    schedule: {
      title: 'Kies een dag en tijd die realistisch in je week past.',
      intro:
        'Dit is de eerste echte keuze. Geen apart doelscherm, geen extra afleiding, alleen een helder moment dat past bij jouw agenda.',
      reassurance: [
        'Eerst je moment, dan pas je gegevens',
        'Geen externe boekingstool halverwege',
        'Snelle keuze zonder eindeloos scrollen',
      ],
      emptySlotsTitle: 'Kies eerst een dag',
      slotHint:
        'Na het kiezen van een tijdslot ga je direct door naar je gegevens. Dat houdt de flow kort en logisch.',
    },
    days: [
      {
        id: 'day-1',
        offset: 1,
        badge: 'Snelste optie',
        slots: [
          { id: '09:00', label: '09:00', note: 'Nog 2 plekken', state: 'limited' },
          { id: '11:30', label: '11:30', note: 'Rustige ochtendplek', state: 'open' },
          { id: '18:40', label: '18:40', note: 'Bijna vol', state: 'limited' },
        ],
      },
      {
        id: 'day-2',
        offset: 2,
        badge: 'Beste spreiding',
        slots: [
          { id: '07:40', label: '07:40', note: 'Voor werk', state: 'open' },
          { id: '12:10', label: '12:10', note: 'Compact gesprek', state: 'open' },
          { id: '19:10', label: '19:10', note: 'Populair tijdvak', state: 'limited' },
        ],
      },
      {
        id: 'day-3',
        offset: 3,
        badge: 'Middagruimte',
        slots: [
          { id: '10:20', label: '10:20', note: 'Nog 1 plek', state: 'limited' },
          { id: '15:00', label: '15:00', note: 'Goede spreiding', state: 'open' },
          { id: '17:20', label: '17:20', note: 'Avondslot', state: 'open' },
        ],
      },
      {
        id: 'day-4',
        offset: 5,
        badge: 'Volgende week',
        slots: [
          { id: '08:30', label: '08:30', note: 'Vroege focusplek', state: 'open' },
          { id: '13:40', label: '13:40', note: 'Nog 2 plekken', state: 'limited' },
          { id: '18:10', label: '18:10', note: 'Na werktijd', state: 'open' },
        ],
      },
      {
        id: 'day-5',
        offset: 7,
        badge: 'Ruim beschikbaar',
        slots: [
          { id: '09:40', label: '09:40', note: 'Goede eerste keuze', state: 'open' },
          { id: '14:20', label: '14:20', note: 'Middagplek', state: 'open' },
          { id: '20:00', label: '20:00', note: 'Laatste avondslot', state: 'limited' },
        ],
      },
    ],
    details: {
      title: 'Laat je gegevens achter en rond de flow af.',
      intro:
        'Bijna klaar. Laat je gegevens achter zodat Patrick je binnen 24 uur persoonlijk kan bevestigen.',
      reassurance: [
        'Geen callcenterflow',
        'Persoonlijke opvolging',
        'Vrijblijvend eerste gesprek',
      ],
      nameLabel: 'Voornaam en achternaam',
      emailLabel: 'E-mailadres',
      phoneLabel: 'Telefoonnummer',
      goalLabel: 'Waar wil je vooral hulp bij?',
      goalOptions: [
        { id: 'fat-loss', title: 'Afvallen' },
        { id: 'strength', title: 'Sterker worden' },
        { id: 'energy', title: 'Meer energie' },
        { id: 'restart', title: 'Starten na blessure' },
        { id: 'advice', title: 'Ik wil advies' },
      ],
      noteLabel: 'Waar wil je vooral hulp bij? (optioneel)',
      consentLabel:
        'Ik ga akkoord met de verwerking van mijn gegevens voor het plannen van dit kennismakingsgesprek.',
      consentError: 'Geef toestemming om verder te gaan.',
    },
    confirmation: {
      eyebrow: 'MOMENT GERESERVEERD',
      title: 'Je kennismakingsgesprek is aangevraagd!',
      body:
        'Patrick neemt binnen 24 uur persoonlijk contact met je op om je afspraak te bevestigen. Je ontvangt een bevestiging per e-mail of WhatsApp.',
      nextStepLabel: 'Je ontvangt binnen korte tijd bevestiging',
      nextSteps: [
        'Patrick bevestigt je afspraak binnen 24 uur.',
        'Je ontvangt een herinnering vlak voor het gesprek.',
        'Toch liever een ander moment? Bel of mail gerust.',
      ],
    },
    footerBackLabel: 'Terug naar de homepage',
    fallbackCallLabel: 'Toch liever direct bellen?',
  },
  bookPage: {
    title: 'Plan je kennismakingsgesprek | Optimal Strength Assen',
    description:
      'Plan direct je kennismakingsgesprek met Optimal Strength in Assen of open de agenda in een nieuw venster.',
    eyebrow: 'GRATIS KENNISMAKINGSGESPREK',
    headline: 'Plan een moment dat voor jouw week werkt.',
    body:
      'Kies direct een moment in de agenda. Je plant een vrijblijvend gesprek waarin je doelen, je agenda en de slimste vervolgstap meteen helder worden.',
    reassurance: [
      'Vrijblijvend gesprek',
      'Persoonlijk contact',
      'Geen massale intake of callcenterflow',
    ],
    fallbackLabel: 'Open de agenda in een nieuw venster',
    liveFallbackLabel: 'Bel Patrick direct',
    fallbackIntro:
      'De live embed is nog niet gekoppeld. Tot die tijd boek je via de bestaande planner in een nieuw venster.',
    faq: [
      {
        q: 'Wat gebeurt er na het boeken?',
        a: 'Je ontvangt direct bevestiging en weet precies waar je moet zijn en wat je kunt verwachten.',
      },
      {
        q: 'Twijfel je nog of het past?',
        a: 'Boek alsnog een kort gesprek. Het doel is eerst helder krijgen wat jij nodig hebt.',
      },
    ],
  },
}
