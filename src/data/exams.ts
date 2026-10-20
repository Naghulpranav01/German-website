import { MockExam } from '@/types';

export const MOCK_EXAMS: MockExam[] = [
  {
    id: 'exam_a1_goethe',
    title: 'A1 German Proficiency Practice Exam (Format: Start Deutsch 1)',
    level: 'A1',
    estimatedMinutes: 65,
    passingScorePercent: 60,
    sections: [
      {
        name: 'Lesen',
        description: 'Read short notes, classified ads, public signs, and answer true/false or multiple-choice questions.',
        allocatedMinutes: 25,
        readingPassage: `Liebe Gäste,
unser Restaurant „Zum goldenen Hirschen“ bleibt am kommenden Montag wegen Renovierungsarbeiten geschlossen. Ab Dienstag, den 14. Mai, sind wir wie gewohnt ab 11:30 Uhr wieder für Sie da.

Für Tischreservierungen am Wochenende nutzen Sie bitte unser Online-Formular auf unserer Webseite www.goldener-hirsch-berlin.de oder rufen Sie uns direkt an unter 030-987654.

Ihr Team vom Goldenen Hirschen`,
        exercises: [
          {
            id: 'exam_a1_l_q1',
            type: 'multiple_choice',
            prompt: 'Das Restaurant ist am Montag geöffnet.',
            instruction: 'Stimmt das? (True or False)',
            options: ['Richtig (True)', 'Falsch (False)'],
            correctAnswer: 'Falsch (False)',
            explanation: 'The note says: "bleibt am kommenden Montag wegen Renovierungsarbeiten geschlossen" (remains closed).',
          },
          {
            id: 'exam_a1_l_q2',
            type: 'multiple_choice',
            prompt: 'Wann öffnet das Restaurant am Dienstag?',
            instruction: 'Select the opening time',
            options: ['Um 11:30 Uhr', 'Um 14:00 Uhr', 'Um 09:30 Uhr', 'Erst am Wochenende'],
            correctAnswer: 'Um 11:30 Uhr',
            explanation: '"Ab Dienstag... sind wir wie gewohnt ab 11:30 Uhr wieder für Sie da".',
          },
        ],
      },
      {
        name: 'Hören',
        description: 'Listen to short public announcements and phone messages and extract key information.',
        allocatedMinutes: 20,
        listeningTranscript:
          'Guten Tag, Herr Fischer! Hier ist die Praxis Dr. Becker. Ihr Bluttestergebnis ist da und alles ist in bester Ordnung. Sie müssen nicht noch einmal vorbeikommen. Das Rezept für Ihre Vitamintabletten liegt an der Rezeption bereit. Wir haben heute bis 18 Uhr geöffnet. Auf Wiederhören!',
        exercises: [
          {
            id: 'exam_a1_h_q1',
            type: 'multiple_choice',
            prompt: 'Warum ruft die Praxis Dr. Becker an?',
            instruction: 'Purpose of the call',
            options: [
              'Um mitzuteilen, dass die Testergebnisse in Ordnung sind und das Rezept bereitliegt.',
              'Um Herrn Fischer zu bitten, sofort ins Krankenhaus zu gehen.',
              'Um einen Operationstermin abzusagen.',
              'Weil Herr Fischer die Rechnung nicht bezahlt hat.',
            ],
            correctAnswer: 'Um mitzuteilen, dass die Testergebnisse in Ordnung sind und das Rezept bereitliegt.',
            explanation: 'The assistant confirms: "Ihr Bluttestergebnis ist da und alles ist in bester Ordnung".',
          },
          {
            id: 'exam_a1_h_q2',
            type: 'multiple_choice',
            prompt: 'Bis wie viel Uhr hat die Praxis heute geöffnet?',
            instruction: 'Operating hours',
            options: ['Bis 18:00 Uhr', 'Bis 14:00 Uhr', 'Bis 20:00 Uhr', 'Bis 12:00 Uhr'],
            correctAnswer: 'Bis 18:00 Uhr',
            explanation: 'The message states: "Wir haben heute bis 18 Uhr geöffnet".',
          },
        ],
      },
      {
        name: 'Schreiben',
        description: 'Fill in missing personal data on a registration form and write a short 30-word message.',
        allocatedMinutes: 20,
        writingPrompt:
          'Sie möchten im Sprachinstitut Deutschkurse in Berlin besuchen. Schreiben Sie eine kurze E-Mail (ca. 30 Wörter):\n- Warum schreiben Sie?\n- Ihr aktuelles Niveau (A1 Anfänger).\n- Wann können Sie am Kurs teilnehmen (abends / vormittags)?',
        exercises: [
          {
            id: 'exam_a1_s_q1',
            type: 'multiple_choice',
            prompt: 'Welche Anrede ist für eine formelle E-Mail an das Sprachinstitut richtig?',
            instruction: 'Salutation selection',
            options: ['Sehr geehrte Damen und Herren,', 'Lieber Sprachkurs,', 'Hallo Leute,', 'Tschüss!'],
            correctAnswer: 'Sehr geehrte Damen und Herren,',
            explanation: '"Sehr geehrte Damen und Herren," is the correct formal salutation when no personal contact name is known.',
          },
        ],
      },
    ],
  },
  {
    id: 'exam_b1_telc',
    title: 'B1 Intermediate Practice Exam (Format: telc / Goethe B1)',
    level: 'B1',
    estimatedMinutes: 90,
    passingScorePercent: 60,
    sections: [
      {
        name: 'Lesen',
        description: 'Read an editorial about renewable energy and answer detailed comprehension questions.',
        allocatedMinutes: 35,
        readingPassage: `Die Energiewende in Deutschland hat in den vergangenen Jahren bedeutende Fortschritte erzielt. Bereits über fünfzig Prozent des im Inland verbrauchten Stroms stammen aus erneuerbaren Energiequellen wie Windkraft und Solaranlagen. 

Dennoch warnen Branchenexperten vor den Herausforderungen des Netzausbaus: Der im windreichen Norden erzeugte Strom muss über moderne Hochspannungs-Gleichstrom-Leitungen in die industriereichen Bundesländer im Süden transportiert werden. Verzögerungen bei der Genehmigung dieser Trassen führen zu Engpässen und steigenden Redispatch-Kosten.`,
        exercises: [
          {
            id: 'exam_b1_l_q1',
            type: 'multiple_choice',
            prompt: 'Wie viel Prozent des deutschen Stroms stammen laut Text bereits aus erneuerbaren Energien?',
            instruction: 'Textverständnis',
            options: ['Über 50 Prozent', 'Genau 25 Prozent', 'Weniger als 30 Prozent', 'Fast 100 Prozent'],
            correctAnswer: 'Über 50 Prozent',
            explanation: 'Text: "Bereits über fünfzig Prozent des im Inland verbrauchten Stroms stammen aus erneuerbaren Energiequellen".',
          },
          {
            id: 'exam_b1_l_q2',
            type: 'multiple_choice',
            prompt: 'Welche zentrale Herausforderung wird für die Energiewende genannt?',
            instruction: 'Hauptproblem identifizieren',
            options: [
              'Der Transport des Stroms vom Norden in den Süden durch Netzausbau',
              'Dass es im Norden keinen Wind mehr gibt',
              'Dass Solaranlagen verboten werden sollen',
              'Mangel an qualifizierten Ingenieuren für Kohlekraftwerke',
            ],
            correctAnswer: 'Der Transport des Stroms vom Norden in den Süden durch Netzausbau',
            explanation: 'Der Text nennt den Netzausbau vom Norden in den Süden als zentrale Herausforderung.',
          },
        ],
      },
    ],
  },
];
