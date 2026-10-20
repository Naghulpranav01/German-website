import { ReadingArticle } from '@/types';

export const READING_ARTICLES: ReadingArticle[] = [
  {
    id: 'read_a1_day',
    level: 'A1',
    title: 'A Day in Hamburg',
    germanTitle: 'Ein Tag in Hamburg',
    category: 'Daily Life & Travel',
    paragraphs: [
      {
        german: 'Mein Name ist Daniel und ich wohne seit einem Monat in Hamburg. Hamburg ist eine wunderschöne Hafenstadt im Norden von Deutschland.',
        english: 'My name is Daniel and I have lived in Hamburg for a month. Hamburg is a wonderful port city in the north of Germany.',
        tokens: [
          { word: 'Name', meaning: 'name (der Name)' },
          { word: 'wohne', meaning: 'live (wohnen: to reside)' },
          { word: 'Monat', meaning: 'month (der Monat)' },
          { word: 'Hafenstadt', meaning: 'port city (die Hafenstadt)' },
          { word: 'Norden', meaning: 'north (der Norden)' },
        ],
      },
      {
        german: 'Jeden Morgen stehe ich um sieben Uhr auf und trinke einen starken Kaffee. Dann fahre ich mit der U-Bahn zur Sprachschule, um Deutsch zu lernen.',
        english: 'Every morning I get up at seven o\'clock and drink a strong coffee. Then I take the subway to the language school to learn German.',
        tokens: [
          { word: 'stehe...auf', meaning: 'get up (aufstehen: separable verb)' },
          { word: 'U-Bahn', meaning: 'subway / metro (die U-Bahn)' },
          { word: 'Sprachschule', meaning: 'language school (die Sprachschule)' },
        ],
      },
      {
        german: 'Am Nachmittag spaziere ich gern an der Elbe entlang oder besuche die historische Speicherstadt. Die Menschen hier sind freundlich und hilfsbereit.',
        english: 'In the afternoon I like to take a walk along the Elbe river or visit the historic warehouse district. The people here are friendly and helpful.',
        tokens: [
          { word: 'Nachmittag', meaning: 'afternoon (der Nachmittag)' },
          { word: 'spaziere', meaning: 'walk / stroll (spazieren)' },
          { word: 'Speicherstadt', meaning: 'historic warehouse district in Hamburg' },
          { word: 'hilfsbereit', meaning: 'helpful / willing to assist' },
        ],
      },
    ],
    comprehensionQuestions: [
      {
        id: 'r_a1_q1',
        type: 'multiple_choice',
        prompt: 'How long has Daniel lived in Hamburg?',
        instruction: 'Look at the first paragraph',
        options: ['For one month (seit einem Monat)', 'For one year', 'For two weeks', 'Since childhood'],
        correctAnswer: 'For one month (seit einem Monat)',
        explanation: 'The text states: "ich wohne seit einem Monat in Hamburg".',
      },
      {
        id: 'r_a1_q2',
        type: 'multiple_choice',
        prompt: 'How does Daniel travel to the language school?',
        instruction: 'Transportation method',
        options: ['By subway (mit der U-Bahn)', 'By bicycle', 'By car', 'On foot'],
        correctAnswer: 'By subway (mit der U-Bahn)',
        explanation: 'He writes: "fahre ich mit der U-Bahn zur Sprachschule".',
      },
    ],
  },
  {
    id: 'read_a2_housing',
    level: 'A2',
    title: 'Apartment Hunting in Germany: What You Must Know',
    germanTitle: 'Wohnungssuche in Deutschland: Wichtige Tipps',
    category: 'Housing & Relocation',
    paragraphs: [
      {
        german: 'Die Wohnungssuche in deutschen Großstädten wie Berlin, München oder Frankfurt ist oft eine große Herausforderung. Auf beliebte Wohnungsanzeigen melden sich oft hunderte Interessenten.',
        english: 'Apartment hunting in large German cities like Berlin, Munich, or Frankfurt is often a major challenge. Hundreds of interested applicants often respond to popular listings.',
        tokens: [
          { word: 'Wohnungssuche', meaning: 'apartment hunting (die Wohnungssuche)' },
          { word: 'Herausforderung', meaning: 'challenge (die Herausforderung)' },
          { word: 'Interessenten', meaning: 'interested applicants / parties' },
        ],
      },
      {
        german: 'Um erfolgreich zu sein, sollten Sie eine vollständige Bewerbungsmappe vorbereiten. Dazu gehören: die letzten drei Gehaltsnachweise, eine SCHUFA-Auskunft und eine Mietschuldenfreiheitsbescheinigung Ihres vorherigen Vermieters.',
        english: 'In order to be successful, you should prepare a complete application portfolio. This includes: the last three pay slips, a SCHUFA credit report, and a confirmation of no rental debts from your previous landlord.',
        tokens: [
          { word: 'Bewerbungsmappe', meaning: 'application folder / dossier' },
          { word: 'Gehaltsnachweise', meaning: 'proof of salary / pay slips' },
          { word: 'SCHUFA-Auskunft', meaning: 'German credit rating report' },
          { word: 'Vermieter', meaning: 'landlord (der Vermieter)' },
        ],
      },
    ],
    comprehensionQuestions: [
      {
        id: 'r_a2_q1',
        type: 'multiple_choice',
        prompt: 'What does "SCHUFA-Auskunft" provide to German landlords?',
        instruction: 'Creditworthiness document',
        options: [
          'Proof of your credit score and financial reliability',
          'Medical vaccination history',
          'University diploma',
          'Tax return certificate',
        ],
        correctAnswer: 'Proof of your credit score and financial reliability',
        explanation: 'SCHUFA is Germany\'s leading credit bureau verifying financial creditworthiness.',
      },
    ],
  },
  {
    id: 'read_b1_work',
    level: 'B1',
    title: 'The Dual Vocational System & Skilled Professionals in Germany',
    germanTitle: 'Das duale System und der Fachkräftemangel',
    category: 'Work & Economy',
    paragraphs: [
      {
        german: 'Deutschland gilt weltweit als Vorbild für sein duales Ausbildungssystem, bei dem praktische Arbeit im Betrieb mit theoretischem Unterricht an der Berufsschule kombiniert wird.',
        english: 'Germany is regarded worldwide as a model for its dual training system, in which practical work in the company is combined with theoretical classes at vocational school.',
        tokens: [
          { word: 'duales Ausbildungssystem', meaning: 'dual vocational training system' },
          { word: 'Betrieb', meaning: 'company / enterprise (der Betrieb)' },
          { word: 'Berufsschule', meaning: 'vocational school (die Berufsschule)' },
        ],
      },
      {
        german: 'Gleichzeitig steht die deutsche Wirtschaft vor einem erheblichen Fachkräftemangel, insbesondere in der Informationstechnologie, im Ingenieurwesen und im Gesundheitssektor.',
        english: 'At the same time, the German economy faces a significant shortage of skilled workers, especially in information technology, engineering, and the healthcare sector.',
        tokens: [
          { word: 'Fachkräftemangel', meaning: 'shortage of skilled workers (der Fachkräftemangel)' },
          { word: 'insbesondere', meaning: 'especially / in particular' },
          { word: 'Ingenieurwesen', meaning: 'engineering sector (das Ingenieurwesen)' },
        ],
      },
    ],
    comprehensionQuestions: [
      {
        id: 'r_b1_q1',
        type: 'multiple_choice',
        prompt: 'Which sectors in Germany face an especially severe shortage of skilled workers?',
        instruction: 'Economic analysis',
        options: [
          'Information technology, engineering, and healthcare',
          'Agriculture and coal mining only',
          'Tourism and hotel reception only',
          'None, there is a surplus',
        ],
        correctAnswer: 'Information technology, engineering, and healthcare',
        explanation: 'The text highlights "Informationstechnologie, im Ingenieurwesen und im Gesundheitssektor".',
      },
    ],
  },
];
