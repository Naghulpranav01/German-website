import { ListeningLesson } from '@/types';

export const LISTENING_LESSONS: ListeningLesson[] = [
  {
    id: 'listen_a1_train',
    level: 'A1',
    title: 'Train Announcement at Frankfurt Central Station',
    context: 'Public transit announcement for Intercity-Express (ICE) passengers.',
    audioDurationSeconds: 45,
    vocabularyHighlights: ['der Zug (train)', 'Gleis (track/platform)', 'Abfahrt (departure)', 'Vorsicht (caution)'],
    transcript: [
      {
        speaker: 'Ansage (Announcement)',
        german: 'Achtung an Gleis 7: Der ICE 578 nach Hamburg Hauptbahnhof über Hannover fährt ein.',
        english: 'Attention on track 7: The ICE 578 to Hamburg Central Station via Hannover is arriving.',
      },
      {
        speaker: 'Ansage',
        german: 'Abfahrt ist um 14 Uhr 23. Bitte Vorsicht bei der Einfahrt des Zuges.',
        english: 'Departure is at 14:23. Please take care as the train arrives.',
      },
      {
        speaker: 'Ansage',
        german: 'Erste Klasse befindet sich in den Wagen 21 bis 24. Zweite Klasse in den Wagen 25 bis 28.',
        english: 'First class is located in carriages 21 to 24. Second class in carriages 25 to 28.',
      },
    ],
    questions: [
      {
        id: 'l_a1_q1',
        type: 'multiple_choice',
        prompt: 'To which final destination is the train traveling?',
        instruction: 'Listen to the announcement',
        options: ['Hamburg Hauptbahnhof', 'Frankfurt Flughafen', 'München', 'Köln'],
        correctAnswer: 'Hamburg Hauptbahnhof',
        explanation: 'The announcement states: "Der ICE 578 nach Hamburg Hauptbahnhof".',
      },
      {
        id: 'l_a1_q2',
        type: 'multiple_choice',
        prompt: 'On which track (Gleis) does the train arrive?',
        instruction: 'Identify the platform number',
        options: ['Gleis 7', 'Gleis 14', 'Gleis 23', 'Gleis 4'],
        correctAnswer: 'Gleis 7',
        explanation: '"Achtung an Gleis 7".',
      },
      {
        id: 'l_a1_q3',
        type: 'multiple_choice',
        prompt: 'What time is the departure (Abfahrt)?',
        instruction: 'Check the clock time',
        options: ['14:23 (2:23 PM)', '14:32 (2:32 PM)', '15:23 (3:23 PM)', '07:23 (7:23 AM)'],
        correctAnswer: '14:23 (2:23 PM)',
        explanation: '"Abfahrt ist um 14 Uhr 23".',
      },
    ],
  },
  {
    id: 'listen_a2_doctor',
    level: 'A2',
    title: 'Making an Appointment at the Doctor\'s Office (Arztpraxis)',
    context: 'A patient calls a medical clinic to book an appointment with symptoms.',
    audioDurationSeconds: 65,
    vocabularyHighlights: ['der Termin (appointment)', 'die Versichertenkarte (insurance card)', 'Schmerzen (pain)', 'die Sprechstunde (office hours)'],
    transcript: [
      {
        speaker: 'Arzthelferin (Assistant)',
        german: 'Praxis Dr. Schneider, guten Tag. Was kann ich für Sie tun?',
        english: 'Practice Dr. Schneider, good day. What can I do for you?',
      },
      {
        speaker: 'Patient',
        german: 'Guten Tag. Mein Name ist David Cole. Ich habe seit zwei Tagen starke Halsschmerzen und Fieber.',
        english: 'Good day. My name is David Cole. I have had severe sore throat and fever for two days.',
      },
      {
        speaker: 'Arzthelferin',
        german: 'Haben Sie heute Zeit? Wir haben in der Notfallsprechstunde um 11:30 Uhr noch einen Termin frei.',
        english: 'Do you have time today? We have an open slot in our emergency consultation at 11:30 AM.',
      },
      {
        speaker: 'Patient',
        german: 'Ja, 11:30 Uhr passt mir sehr gut. Was muss ich mitbringen?',
        english: 'Yes, 11:30 suits me very well. What do I need to bring along?',
      },
      {
        speaker: 'Arzthelferin',
        german: 'Bitte bringen Sie Ihre Krankenversichertenkarte und einen Ausweis mit.',
        english: 'Please bring along your health insurance card and an ID.',
      },
    ],
    questions: [
      {
        id: 'l_a2_q1',
        type: 'multiple_choice',
        prompt: 'What symptoms does David Cole have?',
        instruction: 'Listen to the symptoms',
        options: [
          'Sore throat and fever (Halsschmerzen und Fieber)',
          'Headache and stomach ache (Kopfschmerzen und Bauchschmerzen)',
          'Broken arm',
          'Toothache',
        ],
        correctAnswer: 'Sore throat and fever (Halsschmerzen und Fieber)',
        explanation: 'David says: "Ich habe seit zwei Tagen starke Halsschmerzen und Fieber".',
      },
      {
        id: 'l_a2_q2',
        type: 'multiple_choice',
        prompt: 'What document is mandatory for him to bring?',
        instruction: 'Document check',
        options: [
          'Health insurance card (Krankenversichertenkarte)',
          'Birth certificate',
          'Tax number',
          'Cash only',
        ],
        correctAnswer: 'Health insurance card (Krankenversichertenkarte)',
        explanation: 'The assistant asks for the "Krankenversichertenkarte und einen Ausweis".',
      },
    ],
  },
  {
    id: 'listen_b1_career',
    level: 'B1',
    title: 'Podcast: Working as an Engineer in Munich',
    context: 'An expat software engineer shares their experience relocating to Germany.',
    audioDurationSeconds: 90,
    vocabularyHighlights: ['die Einwanderung (immigration)', 'der Arbeitsvertrag (employment contract)', 'die Probezeit (probation period)', 'die Blue Card (EU Blue Card)'],
    transcript: [
      {
        speaker: 'Moderator',
        german: 'Herzlich willkommen zum Karriere-Podcast! Heute sprechen wir mit Priya, die als Softwareentwicklerin in München arbeitet.',
        english: 'Welcome to the career podcast! Today we speak with Priya, who works as a software developer in Munich.',
      },
      {
        speaker: 'Priya',
        german: 'Hallo! Ich bin vor zwei Jahren aus Bangalore nach Deutschland gezogen. Für die Blaue Karte EU brauchte ich einen anerkannten Hochschulabschluss und ein passendes Gehalt.',
        english: 'Hello! I moved to Germany from Bangalore two years ago. For the EU Blue Card I needed a recognized university degree and an eligible salary.',
      },
      {
        speaker: 'Moderator',
        german: 'Wie wichtig war die deutsche Sprache in Ihrem Unternehmen?',
        english: 'How important was the German language in your company?',
      },
      {
        speaker: 'Priya',
        german: 'Am Anfang sprach das Entwicklerteam viel Englisch. Aber für Meetings mit Kunden, das Verständnis von Verträgen und vor allem für Freundschaften im Alltag war Deutsch ab B1 der echte Schlüssel zum Erfolg.',
        english: 'At the start the dev team spoke a lot of English. But for client meetings, understanding contracts, and especially friendships in daily life, German at B1 was the real key to success.',
      },
    ],
    questions: [
      {
        id: 'l_b1_q1',
        type: 'multiple_choice',
        prompt: 'What were the two legal requirements Priya mentioned for the EU Blue Card?',
        instruction: 'Immigration criteria',
        options: [
          'Recognized degree and eligible salary',
          'German citizenship and property ownership',
          'C2 German certificate and family in Munich',
          'Driving license and bank loan',
        ],
        correctAnswer: 'Recognized degree and eligible salary',
        explanation: 'Priya mentions: "einen anerkannten Hochschulabschluss und ein passendes Gehalt".',
      },
      {
        id: 'l_b1_q2',
        type: 'multiple_choice',
        prompt: 'Why did German become essential despite English in the tech team?',
        instruction: 'Career impact',
        options: [
          'For client meetings, contracts, and social friendships',
          'Because English was banned',
          'Only to order coffee',
          'To pass a driving test',
        ],
        correctAnswer: 'For client meetings, contracts, and social friendships',
        explanation: 'Priya highlights client meetings, contracts, and everyday social friendships.',
      },
    ],
  },
  {
    id: 'listen_b2_sprint',
    level: 'B2',
    title: 'Agile Team Sprint Retrospective in Berlin',
    context: 'A software engineering team discusses performance bottlenecks and architectural improvements.',
    audioDurationSeconds: 110,
    vocabularyHighlights: ['der Engpass (bottleneck)', 'die Latenz (latency)', 'skalieren (to scale)', 'die Bereitstellung (deployment)'],
    transcript: [
      {
        speaker: 'Scrum Master',
        german: 'Guten Morgen zusammen! Willkommen zu unserer Sprint-Retrospektive. Lasst uns die Performance unserer API-Endpunkte analysieren.',
        english: 'Good morning everyone! Welcome to our sprint retrospective. Let\'s analyze the performance of our API endpoints.',
      },
      {
        speaker: 'Lead Engineer',
        german: 'Wir haben festgestellt, dass die Antwortzeiten unter hoher Last auf über 800 Millisekunden ansteigen. Die Datenbankabfragen sind hier der wesentliche Flaschenhals.',
        english: 'We observed that response times rise to over 800 milliseconds under heavy load. The database queries are the primary bottleneck here.',
      },
      {
        speaker: 'DevOps Engineer',
        german: 'Ich schlage vor, dass wir eine Redis-Caching-Schicht zwischenschalten und die Indizes in PostgreSQL optimieren, um die Latenz um mindestens sechzig Prozent zu senken.',
        english: 'I suggest we introduce a Redis caching layer and optimize the PostgreSQL indexes in order to reduce latency by at least 60 percent.',
      },
    ],
    questions: [
      {
        id: 'l_b2_q1',
        type: 'multiple_choice',
        prompt: 'What was identified as the main bottleneck (Flaschenhals)?',
        instruction: 'Technical diagnostics',
        options: [
          'Database queries under heavy load',
          'Frontend CSS styling',
          'Internet connection in Berlin',
          'Outdated computer hardware',
        ],
        correctAnswer: 'Database queries under heavy load',
        explanation: 'Lead Engineer states: "Die Datenbankabfragen sind hier der wesentliche Flaschenhals".',
      },
    ],
  },
];
