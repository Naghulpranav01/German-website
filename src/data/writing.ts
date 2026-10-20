export interface WritingTask {
  id: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  title: string;
  germanTitle: string;
  targetAudience: 'formal' | 'informal' | 'business';
  prompt: string;
  recommendedWordCount: number;
  essentialPhrases: {
    phrase: string;
    english: string;
  }[];
  sampleSolution: string;
  checklist: string[];
}

export const WRITING_TASKS: WritingTask[] = [
  {
    id: 'write_a1_invite',
    level: 'A1',
    title: 'Informal Birthday Invitation',
    germanTitle: 'Eine Einladung zum Geburtstag schreiben',
    targetAudience: 'informal',
    prompt:
      'You are celebrating your birthday next Saturday. Write a short email (30–45 words) to your German friend Thomas.\n- Invite him to your party.\n- Mention the time (19:00 Uhr) and location.\n- Ask if he can bring drinks or a salad.',
    recommendedWordCount: 40,
    essentialPhrases: [
      { phrase: 'Lieber Thomas,', english: 'Dear Thomas (informal salutation for a male)' },
      { phrase: 'Ich lade dich herzlich ein.', english: 'I cordially invite you.' },
      { phrase: 'Die Feier beginnt um...', english: 'The party starts at...' },
      { phrase: 'Kannst du bitte etwas mitbringen?', english: 'Could you please bring something?' },
      { phrase: 'Liebe Grüße / Bis Samstag!', english: 'Warm regards / See you Saturday!' },
    ],
    sampleSolution:
      'Lieber Thomas,\n\nich feiere am Samstag meinen Geburtstag und lade dich herzlich ein! Die Party beginnt um 19:00 Uhr bei mir zu Hause. Kannst du vielleicht einen Salat oder Getränke mitbringen?\n\nIch freue mich auf dich!\n\nViele Grüße,\nAlex',
    checklist: [
      'Used informal salutation (Lieber...)',
      'First word after greeting comma starts with LOWERCASE letter (ich feiere...)',
      'Mentioned day and time',
      'Capitalized all German nouns (Geburtstag, Party, Uhr, Hause, Salat, Getränke, Grüße)',
    ],
  },
  {
    id: 'write_a2_landlord',
    level: 'A2',
    title: 'Formal Letter to Landlord: Broken Heating',
    germanTitle: 'Formelle E-Mail an die Hausverwaltung (Heizungsausfall)',
    targetAudience: 'formal',
    prompt:
      'The heating in your apartment in Berlin stopped working in November. Write an urgent formal email (50–70 words) to your property management (Hausverwaltung Müller):\n- Explain the defect (heating is cold).\n- Mention the impact (temperature is 15°C).\n- Request urgent repair by Friday.\n- Provide your phone number for the technician.',
    recommendedWordCount: 65,
    essentialPhrases: [
      { phrase: 'Sehr geehrte Damen und Herren,', english: 'Dear Sir or Madam (universal formal greeting)' },
      { phrase: 'ich schreibe Ihnen bezüglich...', english: 'I am writing to you regarding...' },
      { phrase: 'Die Heizung in meiner Wohnung funktioniert leider nicht mehr.', english: 'The heating in my apartment is unfortunately no longer working.' },
      { phrase: 'Bitte veranlassen Sie zeitnah eine Reparatur.', english: 'Please arrange for a prompt repair.' },
      { phrase: 'Mit freundlichen Grüßen,', english: 'Sincerely / Best regards (formal closing)' },
    ],
    sampleSolution:
      'Sehr geehrte Damen und Herren,\n\nich schreibe Ihnen bezüglich meiner Wohnung im 2. Stock (Mietvertrag Nr. 4082). Seit gestern funktioniert die Heizung im Wohnzimmer und Schlafzimmer leider überhaupt nicht mehr. Die Raumtemperatur beträgt nur noch 15 Grad.\n\nDa es draußen sehr kalt ist, bitte ich Sie höflich, zeitnah einen Handwerker zu beauftragen. Sie erreichen mich telefonisch unter 0176-12345678.\n\nVielen Dank im Voraus für Ihre schnelle Unterstützung.\n\nMit freundlichen Grüßen,\nDavid Miller',
    checklist: [
      'Used standard formal salutation (Sehr geehrte Damen und Herren,)',
      'Identified apartment / tenant context clearly',
      'Polite tone despite urgent issue (bitte ich Sie höflich)',
      'Contact phone number provided for appointments',
      'Formal closing formula (Mit freundlichen Grüßen)',
    ],
  },
  {
    id: 'write_b1_inquiry',
    level: 'B1',
    title: 'Formal Inquiry & Rescheduling Request',
    germanTitle: 'Terminverschiebung und Anfrage beim Kunden',
    targetAudience: 'business',
    prompt:
      'You are leading a project and need to reschedule an important client demonstration scheduled for Thursday. Write a professional email (70–100 words):\n- Apologize politely for the short notice.\n- Explain the technical reason (server maintenance).\n- Propose two alternative dates next week.\n- Ask for their preferred confirmation.',
    recommendedWordCount: 85,
    essentialPhrases: [
      { phrase: 'Sehr geehrte Frau Dr. Weber,', english: 'Dear Dr. Weber (formal)' },
      { phrase: 'leider muss ich unseren geplanten Termin verschieben.', english: 'Unfortunately I must postpone our scheduled appointment.' },
      { phrase: 'Ich bitte um Entschuldigung für diese kurzfristige Änderung.', english: 'I apologize for this short-notice change.' },
      { phrase: 'Als Alternative schlage ich folgende Termine vor:...', english: 'As an alternative I propose the following dates:...' },
      { phrase: 'Ich freue mich auf Ihre Rückmeldung.', english: 'I look forward to your feedback.' },
    ],
    sampleSolution:
      'Sehr geehrte Frau Dr. Weber,\n\nich beziehe mich auf unsere für Donnerstag geplante Produktdemonstration. Leider müssen wir diesen Termin aufgrund unvorhergesehener Server-Wartungsarbeiten kurzfristig verschieben. Ich bitte vielmals um Entschuldigung für die entstandenen Unannehmlichkeiten.\n\nUm die Präsentation schnellstmöglich nachzuholen, möchte ich Ihnen zwei alternative Termine vorschlagen:\n- Dienstag, 14. Mai, um 10:00 Uhr\n- Mittwoch, 15. Mai, um 14:30 Uhr\n\nBitte teilen Sie mir kurz mit, welcher dieser Vorschläge Ihnen am besten passt.\n\nMit besten Grüßen aus Frankfurt,\nPriya Patel',
    checklist: [
      'Addressed recipient with title (Frau Dr. Weber)',
      'Expressed diplomatic apology without excessive guilt',
      'Offered concrete alternative slots with dates and times',
      'Clear call to action for confirmation',
    ],
  },
  {
    id: 'write_b2_cover_letter',
    level: 'B2',
    title: 'German Cover Letter (Anschreiben) for IT Position',
    germanTitle: 'Bewerbungsschreiben für Softwareentwickler',
    targetAudience: 'business',
    prompt:
      'Write an authentic Anschreiben (120–150 words) applying for a Senior Full-Stack Engineer position at a German tech company in Munich:\n- Reference the job advertisement.\n- Highlight your technical stack (React, Next.js, TypeScript, PostgreSQL).\n- Explain why you are enthusiastic about the company.\n- State your availability and salary expectations.\n- Request an interview.',
    recommendedWordCount: 130,
    essentialPhrases: [
      { phrase: 'Bewerbung als Senior Software Engineer (Referenz-Nr.: 789)', english: 'Subject line' },
      { phrase: 'mit großem Interesse habe ich Ihre Stellenausschreibung gelesen.', english: 'With great interest I read your job posting.' },
      { phrase: 'Ich verfüge über mehrjährige Erfahrung in...', english: 'I have multi-year experience in...' },
      { phrase: 'Über eine Einladung zu einem persönlichen Gespräch freue ich mich sehr.', english: 'I look forward very much to an invitation for a personal interview.' },
    ],
    sampleSolution:
      'Sehr geehrter Herr Dr. Klein,\n\nmit großem Interesse habe ich Ihre Stellenausschreibung für die Position als Senior Full-Stack Entwickler gelesen. Da mein Profil und meine Leidenschaft für skalierbare Web-Architekturen exakt Ihren Anforderungen entsprechen, bewerbe ich mich hiermit um diese Stelle.\n\nIn meiner bisherigen Tätigkeit konzipierte und implementierte ich komplexe Anwendungen mit Next.js, TypeScript und PostgreSQL. Besonders reizt mich an Ihrem Unternehmen die Ausrichtung auf datenschutzkonforme Cloud-Lösungen.\n\nMeine Kündigungsfrist beträgt zwei Monate zum Monatsende. Meine Gehaltsvorstellung liegt bei 78.000 Euro brutto im Jahr.\n\nÜber die Gelegenheit, mich Ihnen in einem persönlichen Gespräch vorzustellen, freue ich mich sehr.\n\nMit freundlichen Grüßen,\nMarcus Vance',
    checklist: [
      'Formal German business letter structure',
      'Addressed specific hiring manager',
      'Concise pitch of technical strengths',
      'Clear notice period (Kündigungsfrist) and salary (Gehaltsvorstellung)',
      'Active closing request for interview (no passive subjunctive)',
    ],
  },
];

export function analyzeGermanWriting(text: string): {
  score: number;
  wordCount: number;
  feedback: string[];
} {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const feedback: string[] = [];
  let score = 50;

  if (wordCount >= 25) {
    score += 15;
    feedback.push(`Good length: ${wordCount} words written.`);
  } else {
    feedback.push(`Text is currently short (${wordCount} words). Try to add more details.`);
  }

  // Check salutation
  if (/Sehr geehrte|Liebe[r]?|Hallo|Guten Tag/i.test(text)) {
    score += 15;
    feedback.push('✓ Proper German salutation recognized.');
  } else {
    feedback.push('⚠ Missing standard salutation (e.g. "Sehr geehrte Damen und Herren," or "Lieber...").');
  }

  // Check sign-off
  if (/Mit freundlichen Grüßen|Viele Grüße|Liebe Grüße|Beste Grüße/i.test(text)) {
    score += 10;
    feedback.push('✓ Authentic German closing formula detected.');
  } else {
    feedback.push('⚠ Add a polite closing formula (e.g. "Mit freundlichen Grüßen").');
  }

  // Check noun capitalization
  const capitalizedWords = words.filter((w) => /^[A-ZÄÖÜ]/.test(w));
  const ratio = capitalizedWords.length / (words.length || 1);
  if (ratio >= 0.15 && ratio <= 0.45) {
    score += 10;
    feedback.push('✓ Good noun capitalization observed.');
  } else if (ratio < 0.12) {
    feedback.push('⚠ Make sure to capitalize all German nouns (e.g., der Tag, die Arbeit, das Haus)!');
  }

  return {
    score: Math.min(100, Math.max(30, score)),
    wordCount,
    feedback,
  };
}
