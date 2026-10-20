export interface ITTerm {
  german: string;
  english: string;
  category: 'Agile & Process' | 'Git & Version Control' | 'Backend & Databases' | 'Cloud & DevOps' | 'Frontend & UX' | 'Security';
  example: string;
  notes?: string;
}

export const IT_GLOSSARY: ITTerm[] = [
  // Agile & Process
  {
    german: 'das Daily Standup',
    english: 'daily standup meeting',
    category: 'Agile & Process',
    example: 'Im Daily Standup besprechen wir kurz unsere Fortschritte und Blocker.',
    notes: 'Often kept in German with English terms: "Wer moderiert das heutige Daily?"',
  },
  {
    german: 'der Blocker / das Hindernis',
    english: 'blocker / obstacle',
    category: 'Agile & Process',
    example: 'Ich habe aktuell keinen Blocker und komme gut voran.',
  },
  {
    german: 'die User Story / die Anforderung',
    english: 'user story / feature requirement',
    category: 'Agile & Process',
    example: 'Ist diese Story schon geschätzt und "Ready for Development"?',
  },
  {
    german: 'die Schätzung / Story Points',
    english: 'effort estimation / story points',
    category: 'Agile & Process',
    example: 'Wir schätzen den Aufwand auf fünf Story Points.',
  },
  {
    german: 'die Retrospektive (Retro)',
    english: 'sprint retrospective',
    category: 'Agile & Process',
    example: 'In der Retro diskutieren wir, was wir im nächsten Sprint verbessern können.',
  },

  // Git & Version Control
  {
    german: 'einen Branch erstellen / auschecken',
    english: 'to create / check out a git branch',
    category: 'Git & Version Control',
    example: 'Ich habe einen neuen Feature-Branch vom Main-Branch erstellt.',
  },
  {
    german: 'der Pull Request (PR) / der Merge Request',
    english: 'pull request / code merge request',
    category: 'Git & Version Control',
    example: 'Könntest du bitte meinen Pull Request reviewen?',
  },
  {
    german: 'der Merge-Konflikt',
    english: 'merge conflict',
    category: 'Git & Version Control',
    example: 'Wir müssen zuerst den Merge-Konflikt im package.json lösen.',
  },
  {
    german: 'einen Commit committen / einpflegen',
    english: 'to commit code changes',
    category: 'Git & Version Control',
    example: 'Ich habe den Fix bereits committed und gepusht.',
  },
  {
    german: 'der Rollback / zurückrollen',
    english: 'to roll back / revert deployment',
    category: 'Git & Version Control',
    example: 'Nach dem Bug mussten wir einen schnellen Rollback durchführen.',
  },

  // Backend & Databases
  {
    german: 'die Datenbankabfrage',
    english: 'database query',
    category: 'Backend & Databases',
    example: 'Die Abfrage dauert zu lange, wir müssen einen Index auf der Spalte anlegen.',
  },
  {
    german: 'die Schnittstelle / API',
    english: 'application programming interface (API)',
    category: 'Backend & Databases',
    example: 'Die REST-Schnittstelle liefert die Benutzerdaten im JSON-Format.',
  },
  {
    german: 'die Migration / das Datenbankschema',
    english: 'database migration / schema',
    category: 'Backend & Databases',
    example: 'Die Migration hat neue Fremdschlüssel und Tabellen hinzugefügt.',
  },
  {
    german: 'die Latenz / die Antwortzeit',
    english: 'latency / response time',
    category: 'Backend & Databases',
    example: 'Wir möchten die durchschnittliche Antwortzeit unter 100 Millisekunden halten.',
  },
  {
    german: 'die Skalierbarkeit',
    english: 'scalability',
    category: 'Backend & Databases',
    example: 'Die horizontale Skalierbarkeit des Clusters ist gewährleistet.',
  },

  // Cloud & DevOps
  {
    german: 'die Bereitstellung (das Deployment)',
    english: 'software deployment / release',
    category: 'Cloud & DevOps',
    example: 'Das automatische Deployment läuft über unsere GitHub Actions Pipeline.',
  },
  {
    german: 'der Produktionsausfall / der Störfall',
    english: 'production outage / incident',
    category: 'Cloud & DevOps',
    example: 'Wegen eines Produktionsausfalls muss das On-Call-Team sofort reagieren.',
  },
  {
    german: 'das Monitoring / die Überwachung',
    english: 'observability / monitoring',
    category: 'Cloud & DevOps',
    example: 'Das Dashboard zeigt eine erhöhte Fehlerrate bei Authentifizierungs-Requests.',
  },
  {
    german: 'der Hotfix',
    english: 'urgent bug fix in production',
    category: 'Cloud & DevOps',
    example: 'Wir deployen jetzt einen Hotfix direkt auf die Produktionsumgebung.',
  },

  // Frontend & UX
  {
    german: 'die Benutzeroberfläche',
    english: 'user interface (UI)',
    category: 'Frontend & UX',
    example: 'Die Benutzeroberfläche muss auf mobilen Geräten und Tablets flüssig reagieren.',
  },
  {
    german: 'die Barrierefreiheit',
    english: 'accessibility (a11y)',
    category: 'Frontend & UX',
    example: 'Unsere Anwendung erfüllt die Richtlinien für digitale Barrierefreiheit (WCAG 2.2).',
  },
  {
    german: 'die Ladezeit',
    english: 'page load time / performance',
    category: 'Frontend & UX',
    example: 'Durch Bildoptimierung konnten wir die Ladezeit um 40 Prozent verkürzen.',
  },

  // Security
  {
    german: 'der Datenschutz (DSGVO / GDPR)',
    english: 'data privacy / compliance',
    category: 'Security',
    example: 'In Deutschland ist die Einhaltung der Datenschutz-Grundverordnung (DSGVO) oberste Pflicht.',
  },
  {
    german: 'die Schwachstelle / Sicherheitslücke',
    english: 'vulnerability / security flaw',
    category: 'Security',
    example: 'Ein Dependency-Scan hat eine kritische Sicherheitslücke entdeckt.',
  },
  {
    german: 'die Verschlüsselung',
    english: 'encryption',
    category: 'Security',
    example: 'Alle Passwörter und Tokens werden verschlüsselt in der Datenbank gespeichert.',
  },
];

export const IT_STANDUP_SCRIPTS = [
  {
    id: 'standup_standard',
    title: 'Standard German Daily Scrum Update',
    formula: 'Gestern habe ich... | Heute arbeite ich an... | Blocker habe ich...',
    scriptGerman: `Guten Morgen zusammen!
1. Gestern habe ich die Authentifizierung mit Supabase abgeschlossen und die Unit-Tests dafür geschrieben.
2. Heute arbeite ich an der Fehlerbehebung im Registrierungs-Flow und bereite den Pull Request vor.
3. Ich habe aktuell keine Blocker, bräuchte aber nach dem Daily kurz Feedback von Thomas zum API-Design.`,
    scriptEnglish: `Good morning everyone!
1. Yesterday I completed the Supabase authentication and wrote the unit tests for it.
2. Today I am working on the bugfix in the registration flow and preparing the pull request.
3. I currently have no blockers, but would need brief feedback from Thomas on the API design after the daily.`,
  },
];

export const IT_CODE_REVIEW_PHRASES = [
  {
    german: 'Könntest du diese Funktion bitte in kleinere Hilfsfunktionen aufteilen?',
    english: 'Could you please split this function into smaller helper functions?',
    context: 'Code cleanliness / refactoring',
  },
  {
    german: 'Hier könnte ein Race-Condition-Problem auftreten, wenn mehrere Requests parallel ankommen.',
    english: 'A race condition issue could arise here if multiple requests arrive in parallel.',
    context: 'Concurrency and safety',
  },
  {
    german: 'Lass uns hier noch einen Unit-Test für den Edge-Case hinzufügen.',
    english: 'Let us add a unit test for this edge case here.',
    context: 'Test coverage',
  },
  {
    german: 'Sehr saubere Implementierung! Von meiner Seite aus "Approved".',
    english: 'Very clean implementation! Approved from my side.',
    context: 'PR approval',
  },
];
