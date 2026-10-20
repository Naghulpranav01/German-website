import { ConversationScenario } from '@/types';

export const CONVERSATION_SCENARIOS: ConversationScenario[] = [
  {
    id: 'sc_intro',
    title: 'Introducing Yourself at a Social Gathering',
    level: 'A1',
    role: 'New arrival in Germany',
    aiRole: 'Maximilian (German Host)',
    context: 'You just arrived at a casual dinner in Berlin and are meeting the host for the first time.',
    openingGerman: 'Hallo! Schön, dass du da bist. Wie heißt du und woher kommst du?',
    openingEnglish: 'Hello! Nice that you are here. What is your name and where do you come from?',
    suggestedPhrases: [
      { german: 'Hallo Maximilian, ich heiße... und ich komme aus...', english: 'Hello Maximilian, my name is... and I come from...' },
      { german: 'Freut mich, dich kennenzulernen!', english: 'Pleased to meet you!' },
      { german: 'Ich lerne seit drei Monaten Deutsch.', english: 'I have been learning German for three months.' },
    ],
    objectives: ['State your name and country of origin', 'Say what you do or why you are in Germany', 'Polite greeting'],
  },
  {
    id: 'sc_restaurant',
    title: 'Ordering Dinner & Paying in a Restaurant',
    level: 'A1',
    role: 'Restaurant Guest',
    aiRole: 'Kellner (Waiter)',
    context: 'You are seated in a traditional German restaurant in Munich ready to order food and drinks.',
    openingGerman: 'Guten Abend! Willkommen im Gasthaus. Was darf ich Ihnen zu trinken bringen?',
    openingEnglish: 'Good evening! Welcome to the tavern. What may I bring you to drink?',
    suggestedPhrases: [
      { german: 'Ich hätte gern ein Mineralwasser, bitte.', english: 'I would like a mineral water, please.' },
      { german: 'Haben Sie vegetarische Gerichte?', english: 'Do you have vegetarian dishes?' },
      { german: 'Wir möchten bitte zahlen. Getrennt, bitte.', english: 'We would like to pay, please. Separately, please.' },
    ],
    objectives: ['Order a beverage politely', 'Ask about the menu', 'Request the check and state payment method'],
  },
  {
    id: 'sc_supermarket',
    title: 'Shopping at the Supermarket & Cashier',
    level: 'A1',
    role: 'Shopper',
    aiRole: 'Kassierer (Cashier)',
    context: 'You are at the checkout in a German supermarket (Rewe / Edeka).',
    openingGerman: 'Guten Tag! Haben Sie eine Payback-Karte oder sammeln Sie Treuepunkte?',
    openingEnglish: 'Good day! Do you have a Payback card or collect loyalty points?',
    suggestedPhrases: [
      { german: 'Nein, danke, habe ich nicht.', english: 'No, thank you, I do not have one.' },
      { german: 'Kann ich mit Karte zahlen?', english: 'Can I pay with card?' },
      { german: 'Ich brauche bitte noch eine Papiertüte.', english: 'I need a paper bag, please.' },
    ],
    objectives: ['Answer about the loyalty card', 'Inquire about payment method', 'Polite farewell (Schönen Tag noch!)'],
  },
  {
    id: 'sc_directions',
    title: 'Asking for Directions on the Street',
    level: 'A1',
    role: 'Pedestrian',
    aiRole: 'Passant (Passerby)',
    context: 'You are in Cologne looking for the central train station (Hauptbahnhof).',
    openingGerman: 'Ja bitte? Suchen Sie etwas?',
    openingEnglish: 'Yes please? Are you looking for something?',
    suggestedPhrases: [
      { german: 'Entschuldigung, wie komme ich zum Hauptbahnhof?', english: 'Excuse me, how do I get to the central station?' },
      { german: 'Ist das weit von hier?', english: 'Is that far from here?' },
      { german: 'Fährt eine U-Bahn dorthin?', english: 'Does a subway go there?' },
    ],
    objectives: ['Polite attention getter', 'Ask for the station', 'Clarify distance or transit'],
  },
  {
    id: 'sc_doctor',
    title: 'Visiting a General Practitioner (Hausarzt)',
    level: 'A2',
    role: 'Patient',
    aiRole: 'Frau Dr. Weber (Doctor)',
    context: 'You have caught the flu with fever and a cough and need an examination and a sick note (AU-Bescheinigung).',
    openingGerman: 'Guten Tag! Nehmen Sie bitte Platz. Welche Beschwerden haben Sie denn?',
    openingEnglish: 'Good day! Please take a seat. What symptoms are you experiencing?',
    suggestedPhrases: [
      { german: 'Ich habe seit zwei Tagen starkes Fieber und Halsschmerzen.', english: 'I have had high fever and sore throat for two days.' },
      { german: 'Brauche ich ein Rezept für die Apotheke?', english: 'Do I need a prescription for the pharmacy?' },
      { german: 'Ich brauche bitte eine Arbeitsunfähigkeitsbescheinigung für meinen Arbeitgeber.', english: 'I need a sick note for my employer, please.' },
    ],
    objectives: ['Describe 2-3 physical symptoms', 'Ask about medication / pharmacy', 'Request a sick note (AU)'],
  },
  {
    id: 'sc_landlord',
    title: 'Speaking with Landlord about Maintenance',
    level: 'A2',
    role: 'Tenant',
    aiRole: 'Herr Fischer (Landlord)',
    context: 'You are calling your landlord regarding a leaking pipe in the bathroom.',
    openingGerman: 'Fischer hier, hallo. Was gibt es denn in Ihrer Wohnung für ein Problem?',
    openingEnglish: 'Fischer speaking, hello. What seems to be the problem in your apartment?',
    suggestedPhrases: [
      { german: 'Ein Rohr im Badezimmer tropft und das Wasser steht auf dem Boden.', english: 'A pipe in the bathroom is dripping and water is pooling on the floor.' },
      { german: 'Könnten Sie bitte zeitnah einen Handwerker schicken?', english: 'Could you please send a technician promptly?' },
      { german: 'Ich bin morgen ab 14 Uhr zu Hause erreichbar.', english: 'I will be reachable at home tomorrow from 2 PM.' },
    ],
    objectives: ['State apartment and problem', 'Agree on a repair time window', 'Clarify urgency'],
  },
  {
    id: 'sc_apartment_viewing',
    title: 'Apartment Viewing (Wohnungsbesichtigung)',
    level: 'A2',
    role: 'Prospective Tenant',
    aiRole: 'Makler (Real Estate Agent)',
    context: 'You are viewing a 2-room apartment in Berlin-Mitte with the real estate agent.',
    openingGerman: 'Willkommen zur Besichtigung! Die Wohnung hat 65 Quadratmeter und einen Balkon. Haben Sie Fragen dazu?',
    openingEnglish: 'Welcome to the viewing! The flat is 65 square meters with a balcony. Do you have any questions?',
    suggestedPhrases: [
      { german: 'Wie hoch sind die monatlichen Nebenkosten?', english: 'How much are the monthly utilities?' },
      { german: 'Ist die Einbauküche in der Miete enthalten?', english: 'Is the fitted kitchen included in the rent?' },
      { german: 'Ich habe alle Bewerbungsunterlagen inklusive SCHUFA dabei.', english: 'I have all application documents including SCHUFA with me.' },
    ],
    objectives: ['Ask about Warmmiete / Nebenkosten', 'Ask about fitted kitchen (EBK)', 'Offer complete application dossier'],
  },
  {
    id: 'sc_university',
    title: 'University Student Services (Immatrikulationsamt)',
    level: 'B1',
    role: 'International Student',
    aiRole: 'Universitätssekretärin (Registrar)',
    context: 'You are enrolling for your Master\'s degree program at TU Munich.',
    openingGerman: 'Guten Tag! Sind Sie zur Immatrikulation für das Wintersemester hier?',
    openingEnglish: 'Good day! Are you here for enrollment for the winter semester?',
    suggestedPhrases: [
      { german: 'Ja, genau. Hier ist mein Zulassungsbescheid.', english: 'Yes, exactly. Here is my letter of admission.' },
      { german: 'Ich habe auch den Nachweis der Krankenversicherung dabei.', english: 'I also have proof of health insurance with me.' },
      { german: 'Wann erhalte ich meinen Studierendenausweis und das Semesterticket?', english: 'When do I receive my student ID and semester transit pass?' },
    ],
    objectives: ['Confirm program enrollment', 'Present required documentation', 'Inquire about student transit pass'],
  },
  {
    id: 'sc_job_interview',
    title: 'Job Interview (Vorstellungsgespräch)',
    level: 'B1',
    role: 'Job Applicant',
    aiRole: 'Herr Dr. Klein (Engineering Director)',
    context: 'You are in an interview for a software development position at an automotive tech firm.',
    openingGerman: 'Guten Tag! Vielen Dank, dass Sie da sind. Bitte erzählen Sie uns kurz etwas über Ihren beruflichen Werdegang.',
    openingEnglish: 'Good day! Thank you for being here. Please tell us briefly about your professional background.',
    suggestedPhrases: [
      { german: 'Sehr gern. Ich habe Informatik studiert und bringe fundierte Erfahrung in Web-Architekturen mit.', english: 'With pleasure. I studied computer science and bring sound experience in web architectures.' },
      { german: 'In meinem letzten Projekt war ich für die API-Schnittstellen verantwortlich.', english: 'In my last project I was responsible for the API interfaces.' },
      { german: 'Besonders begeistert mich Ihre Ausrichtung auf nachhaltige Mobilität.', english: 'I am particularly enthusiastic about your focus on sustainable mobility.' },
    ],
    objectives: ['Pitch background and skills concisely', 'Highlight a specific past technical project', 'Explain motivation for this employer'],
  },
  {
    id: 'sc_hr_onboarding',
    title: 'Talking to HR about Onboarding & Benefits',
    level: 'B1',
    role: 'New Employee',
    aiRole: 'Frau Sommer (HR Manager)',
    context: 'First day at work. HR is reviewing company guidelines, vacation days, and hardware setup.',
    openingGerman: 'Herzlich willkommen im Team! Haben Sie Fragen zu Ihren Urlaubstagen oder der betrieblichen Altersvorsorge?',
    openingEnglish: 'Welcome to the team! Do you have questions about your vacation days or company pension plan?',
    suggestedPhrases: [
      { german: 'Wie viele Tage Urlaub stehen mir im ersten Kalenderjahr zu?', english: 'How many days of vacation am I entitled to in the first calendar year?' },
      { german: 'Gibt es eine Gleitzeitregelung oder feste Kernarbeitszeiten?', english: 'Is there a flexitime policy or fixed core working hours?' },
      { german: 'Wann erhalte ich meine Zugangsdaten für das Firmennetzwerk?', english: 'When will I receive my access credentials for the company network?' },
    ],
    objectives: ['Ask about vacation and working hours', 'Inquire about IT equipment and credentials', 'Clarify probation period (Probezeit)'],
  },
  {
    id: 'sc_team_meeting',
    title: 'Participating in a Cross-Functional Team Meeting',
    level: 'B1',
    role: 'Project Contributor',
    aiRole: 'Projektleiter (Project Lead)',
    context: 'Weekly status sync. You need to report your progress and raise a dependency blocker.',
    openingGerman: 'Kommen wir nun zu deinem Arbeitspaket. Wie ist der aktuelle Status bei der Datenbankmigration?',
    openingEnglish: 'Let us now come to your work package. What is the current status of the database migration?',
    suggestedPhrases: [
      { german: 'Die Migration ist zu 80 Prozent abgeschlossen.', english: 'The migration is 80 percent completed.' },
      { german: 'Allerdings warten wir noch auf die Freigabe des Sicherheitsteams.', english: 'However, we are still waiting for clearance from the security team.' },
      { german: 'Sobald diese vorliegt, können wir das Deployment durchführen.', english: 'As soon as that is available, we can execute the deployment.' },
    ],
    objectives: ['Provide quantitative status update', 'Articulate dependency / blocker clearly', 'Propose next milestone'],
  },
  {
    id: 'sc_tech_presentation',
    title: 'Giving a Technical Architecture Presentation',
    level: 'B2',
    role: 'Tech Lead',
    aiRole: 'CTO (Chief Technology Officer)',
    context: 'Presenting a proposal to migrate a monolithic backend to modular microservices in AWS/PostgreSQL.',
    openingGerman: 'Danke für die Folien. Erklären Sie uns bitte, warum dieser Architekturwechsel wirtschaftlich sinnvoll ist.',
    openingEnglish: 'Thank you for the slides. Please explain to us why this architectural migration makes economic sense.',
    suggestedPhrases: [
      { german: 'Der Hauptvorteil liegt in der Skalierbarkeit und kürzeren Release-Zyklen.', english: 'The primary advantage lies in scalability and shorter release cycles.' },
      { german: 'Dadurch lassen sich Ausfallzeiten um mindestens 70 Prozent reduzieren.', english: 'This allows downtime to be reduced by at least 70 percent.' },
      { german: 'Wir empfehlen einen stufenweisen Rollout über die kommenden drei Monate.', english: 'We recommend a phased rollout over the upcoming three months.' },
    ],
    objectives: ['Present strategic technical benefits', 'Address risk mitigation', 'Propose implementation roadmap'],
  },
  {
    id: 'sc_code_review',
    title: 'Code Review & Pull Request Discussion',
    level: 'B2',
    role: 'Senior Developer',
    aiRole: 'Peer Reviewer',
    context: 'Discussing comments on a major Pull Request containing complex state management and caching.',
    openingGerman: 'Ich habe mir deinen PR angeschaut. Die Logik sieht solide aus, aber hast du die Fehlerbehandlung bei Netzwerk-Timeouts bedacht?',
    openingEnglish: 'I looked through your PR. The logic looks solid, but did you consider error handling during network timeouts?',
    suggestedPhrases: [
      { german: 'Guter Punkt! Ich werde einen Retry-Mechanismus mit exponentiellem Backoff einbauen.', english: 'Good point! I will incorporate a retry mechanism with exponential backoff.' },
      { german: 'Hier habe ich mich bewusst für Caching entschieden, um Datenbanklast zu sparen.', english: 'Here I deliberately decided in favor of caching to save database load.' },
      { german: 'Ich aktualisiere den Commit und pinge dich für den Re-Review an.', english: 'I will update the commit and ping you for re-review.' },
    ],
    objectives: ['Accept constructive architectural critique', 'Explain design rationale politely', 'Agree on next commit action'],
  },
  {
    id: 'sc_workplace_negotiation',
    title: 'Negotiating Project Deadlines & Priorities',
    level: 'B2',
    role: 'Senior Consultant',
    aiRole: 'Product Owner',
    context: 'The stakeholder wants additional features delivered in the current sprint without extending the release date.',
    openingGerman: 'Der Kunde verlangt unbedingt noch das Analytics-Dashboard bis Freitag. Das schaffen wir doch noch, oder?',
    openingEnglish: 'The client urgently demands the analytics dashboard by Friday. We can still manage that, right?',
    suggestedPhrases: [
      { german: 'Aus technischer Sicht gefährdet das die Stabilität des Hauptreleases.', english: 'From a technical standpoint, that jeopardizes the stability of the main release.' },
      { german: 'Ich schlage vor, dass wir zunächst ein MVP mit Kernmetriken ausliefern.', english: 'I propose that we first ship an MVP with core metrics.' },
      { german: 'Die erweiterten Berichte können wir im nächsten Sprint nachliefern.', english: 'We can deliver the extended reports in the subsequent sprint.' },
    ],
    objectives: ['Polite pushback based on technical quality', 'Offer pragmatic compromise (MVP)', 'Protect release stability'],
  },
  {
    id: 'sc_watercooler',
    title: 'Colleague Small Talk at the Coffee Machine',
    level: 'A2',
    role: 'Colleague',
    aiRole: 'Stefan (Colleague)',
    context: 'Taking a 5-minute break in the office kitchen on a Friday afternoon.',
    openingGerman: 'Hi! Na, endlich Freitag! Hast du schon Pläne für das Wochenende?',
    openingEnglish: 'Hi! Well, finally Friday! Do you already have plans for the weekend?',
    suggestedPhrases: [
      { german: 'Ja, wenn das Wetter schön bleibt, fahre ich an den See.', english: 'Yes, if the weather stays nice, I will go to the lake.' },
      { german: 'Und was hast du vor?', english: 'And what do you have planned?' },
      { german: 'Ich wünsche dir schon mal einen schönen Feierabend!', english: 'I already wish you a nice evening after work (Feierabend)!' },
    ],
    objectives: ['Casual friendly tone', 'Share a brief weekend plan', 'Use German cultural concept of Feierabend'],
  },
  {
    id: 'sc_executive_briefing',
    title: 'Executive Briefing & Strategic Decision',
    level: 'C1',
    role: 'Principal Architect',
    aiRole: 'Vorstandsvorsitzender (CEO)',
    context: 'A board-level briefing on compliance with the new EU data residency regulations and migration costs.',
    openingGerman: 'Guten Tag. Fassen Sie die strategischen Risiken und den finanziellen Investitionsbedarf bitte prägnant zusammen.',
    openingEnglish: 'Good day. Please summarize the strategic risks and financial investment requirements concisely.',
    suggestedPhrases: [
      { german: 'Die regulatorischen Anforderungen erfordern eine vollständige Lokalisierung der Kundendaten in Frankfurt.', english: 'The regulatory requirements necessitate complete localization of customer data in Frankfurt.' },
      { german: 'Eine Nichtbeachtung würde empfindliche Bußgelder nach sich ziehen.', english: 'Non-compliance would entail severe regulatory fines.' },
      { german: 'Die Amortisationszeit der geplanten Investition beträgt voraussichtlich vierzehn Monate.', english: 'The payback period of the planned investment is projected at fourteen months.' },
    ],
    objectives: ['Formal high-register German', 'Clear articulation of legal/financial risks', 'Strategic executive recommendation'],
  },
];

// Dialogue responses engine for local simulation
export function getSimulatedTutorResponse(
  scenarioId: string,
  userMessage: string
): {
  germanResponse: string;
  englishFeedback: string;
  suggestedNextStep?: string;
} {
  const lower = userMessage.toLowerCase();

  // Basic linguistic feedback checks
  let englishFeedback = '';
  if (!/^[A-ZÄÖÜ]/.test(userMessage.trim())) {
    englishFeedback += 'Tip: Remember to capitalize the first word of your sentence. ';
  }
  if (lower.includes('ich bin wohnen') || lower.includes('ich bin arbeiten')) {
    englishFeedback += 'Grammar Alert: In German, do not use "ich bin" with a verb! Just say "Ich wohne" or "Ich arbeite" (German has no continuous -ing form). ';
  }
  if (lower.includes('nicht kein') || lower.includes('kein nicht')) {
    englishFeedback += 'Negation Alert: Use either "nicht" OR "kein", never both together. ';
  }

  // Tailored responses per scenario
  if (scenarioId === 'sc_restaurant') {
    if (lower.includes('wasser') || lower.includes('bier') || lower.includes('kaffee') || lower.includes('tee')) {
      return {
        germanResponse: 'Sehr gern, das bringe ich Ihnen sofort! Haben Sie sich schon etwas zu essen ausgesucht?',
        englishFeedback: englishFeedback || 'Great job ordering a beverage! The waiter is now asking what you would like to eat.',
        suggestedNextStep: 'Order food using "Ich hätte gern..." or "Ich nehme..."',
      };
    }
    if (lower.includes('zahlen') || lower.includes('rechnung')) {
      return {
        germanResponse: 'Selbstverständlich! Das macht zusammen 24 Euro und 50 Cent. Möchten Sie bar oder mit Karte zahlen?',
        englishFeedback: englishFeedback || 'Excellent phrasing to ask for the bill!',
        suggestedNextStep: 'Say: "Mit Karte, bitte" or "Bar, bitte"',
      };
    }
    return {
      germanResponse: 'Das notiere ich mir. Möchten Sie noch eine Vorspeise oder einen Beilagensalat dazu?',
      englishFeedback: englishFeedback || 'Good communication! The waiter is asking about side dishes or appetizers.',
    };
  }

  if (scenarioId === 'sc_job_interview') {
    if (lower.includes('erfahrung') || lower.includes('gearbeitet') || lower.includes('entwickler') || lower.includes('studium')) {
      return {
        germanResponse: 'Das klingt nach einem sehr passenden Profil! Wie gehen Sie mit Deadlines und unvorhergesehenen technischen Problemen um?',
        englishFeedback: englishFeedback || 'Professional self-introduction! Now explain your problem-solving approach.',
        suggestedNextStep: 'Explain: "Bei Problemen analysiere ich zuerst die Ursache..."',
      };
    }
    return {
      germanResponse: 'Interessant! Warum haben Sie sich gerade für unser Unternehmen entschieden?',
      englishFeedback: englishFeedback || 'Clear articulation. The interviewer wants to know your specific motivation for this company.',
    };
  }

  // Universal fallbacks with authentic German dialogue progression
  return {
    germanResponse: 'Verstanden! Das klingt plausibel. Wie möchten Sie in diesem Punkt weiter vorgehen?',
    englishFeedback: englishFeedback || 'Well phrased! Your message is clear and contextually appropriate.',
    suggestedNextStep: 'Continue the conversation or conclude with a polite closing statement.',
  };
}
