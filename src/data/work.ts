import { WorkModule } from '@/types';

export const WORK_MODULES: WorkModule[] = [
  {
    id: 'work_m1',
    title: 'The German Job Application Dossier (Bewerbungsmappe)',
    germanTitle: 'Die deutsche Bewerbung: Lebenslauf und Anschreiben',
    description: 'Master the specific standards of German CVs (tabellarischer Lebenslauf) and formal cover letters (Anschreiben).',
    level: 'B1',
    lessons: [
      {
        id: 'work_l1_cv',
        title: 'Building a German "Lebenslauf"',
        germanTitle: 'Der tabellarische Lebenslauf',
        overview:
          'Unlike US single-page resumes, German CVs are traditionally 2 pages, strictly chronological in reverse (most recent first), and structured into defined categories: Persönliche Daten, Berufserfahrung, Ausbildung, Kenntnisse & Qualifikationen.',
        keyPhrases: [
          { german: 'der berufliche Werdegang', english: 'career progression / professional track record' },
          { german: 'die Ausbildung / das Studium', english: 'education / university degree' },
          { german: 'fließend in Wort und Schrift', english: 'fluent in speaking and writing (language skills)' },
          { german: 'fundierte Kenntnisse in...', english: 'sound / profound knowledge in...' },
          { german: 'verhandlungssicher', english: 'business fluent / negotiation level' },
        ],
        dialogue: [
          { speaker: 'Bewerber', german: 'Sollte ich ein professionelles Bewerbungsfoto beifügen?', english: 'Should I include a professional application photo?' },
          { speaker: 'Karriereberater', german: 'Es ist nach dem AGG gesetzlich keine Pflicht, aber in Deutschland immer noch sehr gern gesehen und üblich.', english: 'It is not legally required under the AGG, but in Germany still very customary and appreciated.' },
        ],
        sampleTemplate: {
          title: 'Lebenslauf Struktur (Standard)',
          content: `1. Persönliche Daten (Name, Adresse, Telefon, E-Mail, LinkedIn)
2. Beruflicher Werdegang (Monat/Jahr – Monat/Jahr: Position, Arbeitgeber, Kernaufgaben)
3. Hochschulbildung / Ausbildung (Studiengang, Universität, Abschlussnote)
4. IT- & Sprachkenntnisse (Sprache: Deutsch B2, Englisch C1; Technologien)
5. Ort, Datum und Unterschrift`,
          notes: 'Notice: signing with location and date at the bottom is still traditional in German paper/PDF submissions.',
        },
        exercise: [
          {
            id: 'w_cv_ex1',
            type: 'multiple_choice',
            prompt: 'How do you describe "business fluent" language proficiency on a German CV?',
            instruction: 'German CV language standards',
            options: ['verhandlungssicher', 'ein bisschen gut', 'Muttersprachler', 'Grundkenntnisse'],
            correctAnswer: 'verhandlungssicher',
            explanation: '"verhandlungssicher" is the formal German designation for C1/C2 business fluency.',
          },
        ],
      },
      {
        id: 'work_l2_cover_letter',
        title: 'Writing the "Anschreiben" (Cover Letter)',
        germanTitle: 'Das perfekte Anschreiben verfassen',
        overview:
          'The Anschreiben must never repeat the CV list. It answers three questions: Why you? Why this role? Why this company? It must strictly adhere to DIN 5008 formal layout.',
        keyPhrases: [
          { german: 'Sehr geehrte(r) Frau/Herr [Nachname],', english: 'Formal salutation with name' },
          { german: 'hiermit bewerbe ich mich als...', english: 'I hereby apply for the position of...' },
          { german: 'Meine Kündigungsfrist beträgt...', english: 'My notice period is...' },
          { german: 'Meine Gehaltsvorstellung liegt bei...', english: 'My salary expectation is...' },
          { german: 'Über eine Einladung zum Vorstellungsgespräch freue ich mich sehr.', english: 'I look forward to an invitation to an interview.' },
        ],
        dialogue: [
          { speaker: 'Bewerber', german: 'Sollte ich meine Gehaltsvorstellung im Anschreiben nennen?', english: 'Should I mention my salary expectations in the cover letter?' },
          { speaker: 'HR-Expertin', german: 'Wenn die Stellenanzeige danach fragt: unbedingt! Geben Sie immer das Brutto-Jahresgehalt an.', english: 'If the job posting requests it: absolutely! Always state the annual gross salary.' },
        ],
        sampleTemplate: {
          title: 'Anschreiben Formel',
          content: `Betreff: Bewerbung als [Position] – Referenznummer: [Nummer]

Sehr geehrte(r) Frau/Herr [Name],

mit großem Interesse habe ich Ihre Ausschreibung für die Stelle als [Position] gelesen. Durch meine fundierte Erfahrung in [Fachbereich] kann ich Ihr Team ab sofort tatkräftig unterstützen.

In meiner letzten Rolle war ich maßgeblich an [Erfolg/Projekt] beteiligt...`,
          notes: 'Remember: start the first line with lowercase if the salutation ends with a comma.',
        },
        exercise: [
          {
            id: 'w_anschr_ex1',
            type: 'multiple_choice',
            prompt: 'In what form should salary expectations (Gehaltsvorstellung) always be stated in Germany?',
            instruction: 'German remuneration norms',
            options: [
              'Brutto-Jahresgehalt (Annual gross salary, e.g. 75.000 € brutto/Jahr)',
              'Netto-Monatsgehalt (Monthly net after tax)',
              'Stundenlohn bar (Cash hourly rate)',
              'Salary is never mentioned before hire',
            ],
            correctAnswer: 'Brutto-Jahresgehalt (Annual gross salary, e.g. 75.000 € brutto/Jahr)',
            explanation: 'In German professional recruitment, salary expectations are ALWAYS expressed as annual gross salary (Brutto-Jahresgehalt).',
          },
        ],
      },
    ],
  },
  {
    id: 'work_m2',
    title: 'Relocating to Germany: Bureaucracy & Life Setup',
    germanTitle: 'Behörden, Bürokratie und Einleben in Deutschland',
    description: 'Essential German terms and processes for housing registration, banking, tax identification, and health insurance.',
    level: 'A2',
    lessons: [
      {
        id: 'work_l3_anmeldung',
        title: 'Anmeldung (City Registration) & Tax ID',
        germanTitle: 'Die Anmeldung beim Bürgeramt und Steuer-ID',
        overview:
          'Within 14 days of moving into an apartment in Germany, by law you must register your address at the local Bürgeramt / Einwohnermeldeamt. This generates your permanent German Tax ID (Steuer-ID).',
        keyPhrases: [
          { german: 'die Wohnungsgeberbestätigung', english: 'landlord confirmation of move-in (mandatory form!)' },
          { german: 'die Meldebestätigung', english: 'official registration certificate' },
          { german: 'die Steueridentifikationsnummer (Steuer-ID)', english: 'tax identification number' },
          { german: 'einen Termin buchen', english: 'to book an appointment' },
        ],
        dialogue: [
          { speaker: 'Sachbearbeiter (Official)', german: 'Guten Tag. Haben Sie Ihren Pass und die Bestätigung Ihres Vermieters dabei?', english: 'Good day. Do you have your passport and your landlord\'s confirmation with you?' },
          { speaker: 'Bürger (Citizen)', german: 'Ja, hier ist mein Reisepass und die ausgefüllte Wohnungsgeberbestätigung.', english: 'Yes, here is my passport and the completed landlord move-in confirmation.' },
        ],
        exercise: [
          {
            id: 'w_anm_ex1',
            type: 'multiple_choice',
            prompt: 'Which document must your landlord sign for you to register at the German Bürgeramt?',
            instruction: 'Mandatory registration document',
            options: [
              'Wohnungsgeberbestätigung (Landlord move-in confirmation)',
              'Kontoauszug (Bank statement)',
              'Arbeitsvertrag (Employment contract)',
              'Diplom (University degree)',
            ],
            correctAnswer: 'Wohnungsgeberbestätigung (Landlord move-in confirmation)',
            explanation: 'The German Federal Registration Act (BMG) requires the landlord-signed Wohnungsgeberbestätigung.',
          },
        ],
      },
    ],
  },
];
