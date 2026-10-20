import { GrammarTopic } from '@/types';

export const GRAMMAR_TOPICS: GrammarTopic[] = [
  {
    id: 'nouns_gender',
    title: 'Grammatical Gender: Der, Die, Das',
    germanTitle: 'Das grammatische Geschlecht der Nomen',
    level: 'A1',
    category: 'nouns_articles',
    summary: 'Every German noun possesses one of three grammatical genders: masculine (der), feminine (die), or neuter (das).',
    formula: 'Article [der / die / das] + CAPITALIZED Noun',
    explanation:
      'Unlike English which uses "the" for everything, German assigns a gender to every single noun. Gender is grammatical rather than biological (for example, "das Mädchen" [the girl] is grammatically neuter). While gender must generally be memorized with each new noun, many noun word endings provide guaranteed clues.',
    table: {
      headers: ['Gender', 'Definite Article', 'Indefinite Article', 'Negative Article', 'Reliable Suffixes'],
      rows: [
        ['Masculine', 'der', 'ein', 'kein', '-er (actors), -ling, -or, -ist, -ismus, days/months'],
        ['Feminine', 'die', 'eine', 'keine', '-ung, -heit, -keit, -schaft, -tät, -ion, -ei, -ie'],
        ['Neuter', 'das', 'ein', 'kein', '-chen, -lein, -ment, -um, -ma, infinitives as nouns'],
      ],
    },
    examples: [
      { german: 'Der Tisch ist sehr stabil.', english: 'The table is very sturdy.' },
      { german: 'Die Rechnung kommt per E-Mail.', english: 'The invoice arrives by email. (-ung is feminine)' },
      { german: 'Das Mädchen lernt fleißig.', english: 'The girl studies diligently. (-chen is neuter)' },
    ],
    correctVsIncorrect: [
      {
        correct: 'Die Möglichkeit ist großartig.',
        incorrect: 'Der Möglichkeit ist großartig.',
        reason: 'Words ending in -keit / -heit are always 100% feminine.',
      },
      {
        correct: 'Ich trinke das Bier.',
        incorrect: 'Ich trinke die Bier.',
        reason: 'Bier is grammatically neuter (das Bier).',
      },
    ],
    commonMistakes: [
      'Assuming inanimate objects are always neuter (das). Tables are masculine, lamps are feminine!',
      'Forgetting that every single German noun MUST be capitalized.',
      'Learning words without their article (always learn "der Tisch", never just "Tisch").',
    ],
    memoryTrick: 'Imagine masculine nouns in BLUE (a blue tie on a table), feminine nouns in RED (a red flower), and neuter nouns in GREEN (a green leaf). Visualizing colored badges locks the gender into visual memory.',
    quiz: [
      {
        id: 'g_gender_q1',
        type: 'multiple_choice',
        prompt: 'What is the gender of the noun "die Wohnung" (apartment)?',
        instruction: 'Check the word ending',
        options: ['Feminine (die)', 'Masculine (der)', 'Neuter (das)'],
        correctAnswer: 'Feminine (die)',
        explanation: 'All nouns ending in "-ung" are 100% feminine.',
      },
      {
        id: 'g_gender_q2',
        type: 'multiple_choice',
        prompt: 'Why is "das Brötchen" (bread roll) neuter?',
        instruction: 'Look at the diminutive suffix',
        options: ['Diminutives ending in -chen are always neuter', 'Bread is always neuter', 'It is a loanword', 'Because it is small'],
        correctAnswer: 'Diminutives ending in -chen are always neuter',
        explanation: 'Any word ending in -chen or -lein is grammatically neuter in German.',
      },
    ],
  },
  {
    id: 'present_verbs',
    title: 'Present Tense Verb Conjugation Patterns',
    germanTitle: 'Präsens: Regelmäßige Konjugation',
    level: 'A1',
    category: 'verbs',
    summary: 'Standard German present tense uses a predictable set of endings attached to the verb stem: -e, -st, -t, -en, -t, -en.',
    formula: 'Verb Stem + [-e, -st, -t, -en, -t, -en]',
    explanation:
      'To conjugate any regular German verb, strip off the infinitive ending "-en" (or "-n") to find the stem, then attach the personal ending matching the subject pronoun.',
    table: {
      headers: ['Subject Pronoun', 'Ending', 'Example: lernen (to learn)', 'Example: wohnen (to live)'],
      rows: [
        ['ich (I)', '-e', 'ich lerne', 'ich wohne'],
        ['du (you informal)', '-st', 'du lernst', 'du wohnst'],
        ['er/sie/es (he/she/it)', '-t', 'er lernt', 'er wohnt'],
        ['wir (we)', '-en', 'wir lernen', 'wir wohnen'],
        ['ihr (you all)', '-t', 'ihr lernt', 'ihr wohnt'],
        ['sie / Sie (they / you formal)', '-en', 'sie/Sie lernen', 'sie/Sie wohnen'],
      ],
    },
    examples: [
      { german: 'Ich lerne seit drei Monaten Deutsch.', english: 'I have been learning German for 3 months.' },
      { german: 'Wo wohnst du in Berlin?', english: 'Where do you live in Berlin?' },
      { german: 'Wir arbeiten bei einem Software-Unternehmen.', english: 'We work at a software company.' },
    ],
    correctVsIncorrect: [
      {
        correct: 'Du arbeitest sehr fleißig.',
        incorrect: 'Du arbeitst sehr fleißig.',
        reason: 'When a verb stem ends in -t or -d (arbeit-), insert an extra -e before -st and -t for pronunciation ease.',
      },
      {
        correct: 'Er heißt Markus.',
        incorrect: 'Er heißst Markus.',
        reason: 'Verbs whose stems end in -s, -ß, or -z (heiß-) only add -t for du (du heißt).',
      },
    ],
    commonMistakes: [
      'Using English continuous tense "I am learning" -> NEVER say "Ich bin lernen". German has NO continuous form; "Ich lerne" means both "I learn" and "I am learning".',
      'Confusing formal "Sie lernen" (capital S, verb ends in -en) with informal singular "sie lernt" (she learns).',
    ],
    memoryTrick: 'Remember the acronym **E-ST-T-EN-T-EN** ("Esther tests ten enterers"). It matches: ich (-e), du (-st), er (-t), wir (-en), ihr (-t), sie (-en).',
    quiz: [
      {
        id: 'g_verbs_q1',
        type: 'fill_blank',
        prompt: 'Wir _____ jeden Abend zusammen. (kochen: to cook)',
        instruction: 'Conjugate for wir',
        options: ['kochen', 'kocht', 'koche', 'kochst'],
        correctAnswer: 'kochen',
        explanation: 'For "wir", regular verbs take the -en ending: "Wir kochen".',
      },
    ],
  },
  {
    id: 'verb_second',
    title: 'Word Order: The Verb-Second (V2) Rule',
    germanTitle: 'Die Satzstellung: Verb an Position 2',
    level: 'A1',
    category: 'sentence_structure',
    summary: 'In standard declarative German main clauses, the conjugated finite verb is immovably anchored in Position 2.',
    formula: 'Position 1 [Any element] + Position 2 [Conjugated Verb] + Subject/Details',
    explanation:
      'In English, the subject usually comes first ("Tomorrow I am going to Munich"). In German, ANY element can occupy Position 1 for emphasis (time, place, object). However, the conjugated verb MUST remain strictly in Position 2. If you put something other than the subject in Position 1, the subject flips to Position 3 right after the verb. This is called Inversion.',
    table: {
      headers: ['Position 1 (Topic)', 'Position 2 (Verb!)', 'Position 3 (Subject)', 'Middle / Rest'],
      rows: [
        ['Ich (Subject)', 'arbeite', '—', 'heute von zu Hause.'],
        ['Heute (Time)', 'arbeite', 'ich', 'von zu Hause.'],
        ['In München (Place)', 'wohnt', 'meine Schwester', 'seit drei Jahren.'],
        ['Deutsch (Object)', 'lerne', 'ich', 'jeden Tag mit Begeisterung.'],
      ],
    },
    examples: [
      { german: 'Am Montag haben wir ein wichtiges Meeting.', english: 'On Monday we have an important meeting.' },
      { german: 'Leider kann ich morgen nicht kommen.', english: 'Unfortunately I cannot come tomorrow.' },
    ],
    correctVsIncorrect: [
      {
        correct: 'Morgen fahre ich nach Köln.',
        incorrect: 'Morgen ich fahre nach Köln.',
        reason: 'Position 1 is occupied by "Morgen". The verb "fahre" MUST take Position 2, pushing the subject "ich" to Position 3.',
      },
    ],
    commonMistakes: [
      'Translating English word order directly: "Yesterday I went..." -> *Gestern ich ging (WRONG). Correct: "Gestern ging ich...".',
      'Thinking Position 1 means "first single word". Position 1 can be a whole phrase, e.g., "Am nächsten Dienstag um 14 Uhr" [Position 1] + "beginnt" [Position 2] + "der Kurs" [Position 3].',
    ],
    memoryTrick: 'Think of the verb as a train station that sits permanently at Platform 2. No matter what passenger arrives at Platform 1 (time, place, reason), the train (verb) always departs from Platform 2!',
    quiz: [
      {
        id: 'g_v2_q1',
        type: 'word_order',
        prompt: 'Order the sentence starting with "Heute":',
        instruction: 'Remember V2 rule!',
        options: ['Heute', 'habe', 'ich', 'keine', 'Zeit.'],
        correctAnswer: 'Heute habe ich keine Zeit.',
        explanation: 'Position 1: Heute. Position 2: habe. Position 3: ich.',
      },
    ],
  },
  {
    id: 'accusative_case',
    title: 'The Accusative Case (Direct Objects)',
    germanTitle: 'Der Akkusativ: Das direkte Objekt',
    level: 'A1',
    category: 'cases',
    summary: 'The accusative case marks the direct object receiving the action of a verb. Only the masculine article changes (der -> den, ein -> einen).',
    formula: 'Subject [Nominative] + Verb + Direct Object [Accusative]',
    explanation:
      'When someone or something directly receives an action (e.g. "I buy a car", "She sees the man"), that receiver is in the accusative case. The wonderful secret of the German accusative case is that ONLY masculine forms change! Feminine (die/eine), neuter (das/ein), and plural (die/keine) remain 100% identical to the nominative.',
    table: {
      headers: ['Gender', 'Nominative Definite', 'Accusative Definite', 'Nominative Indefinite', 'Accusative Indefinite'],
      rows: [
        ['Masculine', 'der Mann', 'DEN Mann', 'ein Mann', 'EINEN Mann'],
        ['Feminine', 'die Frau', 'DIE Frau', 'eine Frau', 'EINE Frau'],
        ['Neuter', 'das Kind', 'DAS Kind', 'ein Kind', 'EIN Kind'],
        ['Plural', 'die Kinder', 'DIE Kinder', '— Kinder', 'KEINE Kinder'],
      ],
    },
    examples: [
      { german: 'Ich brauche einen neuen Laptop.', english: 'I need a new laptop (der Laptop -> einen Laptop).' },
      { german: 'Sie liest ein interessantes Buch.', english: 'She is reading an interesting book (das Buch -> ein Buch).' },
      { german: 'Wir trinken den heißen Kaffee.', english: 'We drink the hot coffee (der Kaffee -> den Kaffee).' },
    ],
    correctVsIncorrect: [
      {
        correct: 'Ich habe einen Bruder.',
        incorrect: 'Ich habe ein Bruder.',
        reason: 'Bruder is masculine (der Bruder). Under the verb "haben", it becomes accusative "einen Bruder".',
      },
      {
        correct: 'Er sucht den Schlüssel.',
        incorrect: 'Er sucht der Schlüssel.',
        reason: 'Schlüssel is masculine direct object -> "den Schlüssel".',
      },
    ],
    commonMistakes: [
      'Changing feminine or neuter articles in the accusative. Remember: ONLY masculine changes from -r to -n!',
      'Forgetting that verbs of possession/need (haben, brauchen, möchten, kaufen) always require the accusative.',
    ],
    memoryTrick: 'Remember the phrase: **"Only Men Change in the Accusative!"** (Masculine DER becomes DEN; feminine and neuter stay untouched).',
    quiz: [
      {
        id: 'g_acc_q1',
        type: 'fill_blank',
        prompt: 'Hast du _____ Kugelschreiber? (der Kugelschreiber: pen)',
        instruction: 'Accusative indefinite article',
        options: ['einen', 'ein', 'eine', 'einem'],
        correctAnswer: 'einen',
        explanation: 'der Kugelschreiber is masculine accusative -> einen Kugelschreiber.',
      },
    ],
  },
  {
    id: 'dative_case',
    title: 'The Dative Case (Indirect Objects & Location)',
    germanTitle: 'Der Dativ: Das indirekte Objekt',
    level: 'A2',
    category: 'cases',
    summary: 'The dative case marks the indirect object (the receiver of a gift or action, answering "to whom?") and location answering "Wo?" (Where?).',
    formula: 'Subject [Nom] + Verb + Beneficiary [Dativ] + Direct Object [Akk]',
    explanation:
      'In a sentence like "I give the book to the teacher", the book is the direct object (Accusative), while the teacher is the indirect receiver (Dative). Furthermore, certain verbs inherently take the dative (helfen, danken, gefallen, gehören, antworten), and prepositions like aus, bei, mit, nach, seit, von, zu ALWAYS trigger the dative.',
    table: {
      headers: ['Gender', 'Definite Article', 'Indefinite Article', 'Negative Article', 'Personal Pronoun'],
      rows: [
        ['Masculine', 'dem Mann', 'einem Mann', 'keinem Mann', 'ihm (to him)'],
        ['Feminine', 'der Frau', 'einer Frau', 'keiner Frau', 'ihr (to her)'],
        ['Neuter', 'dem Kind', 'einem Kind', 'keinem Kind', 'ihm (to it)'],
        ['Plural', 'den Kindern (+n)', '— Kindern (+n)', 'keinen Kindern (+n)', 'ihnen / Ihnen'],
      ],
    },
    examples: [
      { german: 'Ich helfe dem neuen Kollegen.', english: 'I am helping the new colleague (helfen + Dativ).' },
      { german: 'Sie schenkt ihrer Mutter ein Buch.', english: 'She gives her mother a book (ihrer Mutter = Dativ receiver).' },
      { german: 'Wir fahren mit dem Zug nach München.', english: 'We travel by train to Munich (mit + Dativ).' },
    ],
    correctVsIncorrect: [
      {
        correct: 'Kannst du mir helfen?',
        incorrect: 'Kannst du mich helfen?',
        reason: 'The verb "helfen" requires the dative case pronoun "mir", NOT accusative "mich".',
      },
      {
        correct: 'Ich fahre mit der U-Bahn.',
        incorrect: 'Ich fahre mit die U-Bahn.',
        reason: 'The preposition "mit" ALWAYS governs the dative case (die U-Bahn -> der U-Bahn).',
      },
    ],
    commonMistakes: [
      'Using accusative with dative-only verbs (helfen, danken, antworten, gratulieren, schmecken).',
      'Forgetting to add an "-n" to plural nouns in the dative: "mit den Freunden" (not "Freunde").',
      'Being confused by "der" in the dative: "der" in the dative belongs to FEMININE nouns ("der Frau")!',
    ],
    memoryTrick: 'Song for Dative-always prepositions (to the tune of The Blue Danube): **"Aus, bei, mit, nach, seit, von, zu — immer mit dem Dativ, du!"**',
    quiz: [
      {
        id: 'g_dat_q1',
        type: 'fill_blank',
        prompt: 'Das Essen schmeckt _____ sehr gut! (ich -> Dativ)',
        instruction: 'Insert dative pronoun',
        options: ['mir', 'mich', 'ich', 'mein'],
        correctAnswer: 'mir',
        explanation: 'Schmecken triggers the dative: "Das schmeckt mir".',
      },
    ],
  },
  {
    id: 'two_way_prepositions',
    title: 'Two-Way Prepositions: Movement vs Location',
    germanTitle: 'Die Wechselpräpositionen (Akkusativ vs. Dativ)',
    level: 'A2',
    category: 'prepositions',
    summary: 'Nine prepositions can take either Accusative or Dative: an, auf, hinter, in, neben, über, unter, vor, zwischen. Motion towards (Wohin?) takes Accusative; stationary position (Wo?) takes Dative.',
    formula: 'Wohin? (Movement / Destination) -> AKKUSATIV | Wo? (Location / Static) -> DATIV',
    explanation:
      'These 9 prepositions describe spatial relationships. The magic rule is:\n- If you are moving something from outside to inside/onto a location (Action / Direction / Destination / "Wohin?"), use AKKUSATIV.\n- If something is already resting in place or moving around strictly within the same boundaries ("Wo?"), use DATIV.',
    table: {
      headers: ['Preposition', 'Meaning', 'Akkusativ (Wohin? - Movement)', 'Dativ (Wo? - Location)'],
      rows: [
        ['in', 'in / into', 'Ich gehe in DEN Park (Akk).', 'Ich sitze in DEM Park (Dat).'],
        ['auf', 'on / onto', 'Ich lege das Buch auf DEN Tisch.', 'Das Buch liegt auf DEM Tisch.'],
        ['an', 'at / on vertical surface', 'Ich hänge das Bild an DIE Wand.', 'Das Bild hängt an DER Wand.'],
        ['unter', 'under', 'Die Katze läuft unter DEN Tisch.', 'Die Katze schläft unter DEM Tisch.'],
      ],
    },
    examples: [
      { german: 'Er stellt die Flasche auf den Tisch.', english: 'He places the bottle onto the table (motion -> Akkusativ).' },
      { german: 'Die Flasche steht auf dem Tisch.', english: 'The bottle is standing on the table (stationary -> Dativ).' },
    ],
    correctVsIncorrect: [
      {
        correct: 'Ich gehe ins (in das) Kino.',
        incorrect: 'Ich gehe im (in dem) Kino.',
        reason: 'Going to the cinema is movement toward a destination (Wohin?), requiring accusative "das Kino".',
      },
    ],
    commonMistakes: [
      'Assuming all movement takes accusative. If you run around inside the gym without changing rooms, it is DATIV (Wo? Im Fitnessstudio). It only takes accusative if you are crossing into a new boundary/target!',
      'Confusing verb pairs: stellen/stehen, legen/liegen, setzen/sitzen. The active action verb (stellen, legen) takes Akkusativ; the resulting stationary verb (stehen, liegen) takes Dativ.',
    ],
    memoryTrick: '**"Wohin = Akkusativ (Where to?) | Wo = Dativ (Where at?)"**',
    quiz: [
      {
        id: 'g_2way_q1',
        type: 'multiple_choice',
        prompt: 'Wir gehen heute Abend _____ Restaurant. (das Restaurant: movement into destination)',
        instruction: 'Akkusativ or Dativ?',
        options: ['ins (in das)', 'im (in dem)', 'in der', 'in den'],
        correctAnswer: 'ins (in das)',
        explanation: 'Movement toward a destination (Wohin?) takes the accusative: in + das = ins.',
      },
    ],
  },
  {
    id: 'perfekt_tense',
    title: 'The Perfekt Past Tense',
    germanTitle: 'Das Perfekt im gesprochenen Deutsch',
    level: 'A2',
    category: 'verbs',
    summary: 'The standard conversational past tense in German, formed with auxiliary haben or sein in Position 2 and the Partizip II at the end of the sentence.',
    formula: 'Subject + haben/sein [Pos 2] + ... + Partizip II [END]',
    explanation:
      'In everyday conversational German, the Perfekt is used 90%+ of the time to talk about anything in the past (unlike English which uses the simple past "I went"). The auxiliary verb (haben or sein) is conjugated in Position 2, while the past participle (e.g. gemacht, gegessen, gefahren) is placed at the absolute end of the clause.',
    table: {
      headers: ['Auxiliary Verb', 'Rule for Usage', 'Example Partizip II', 'Example Sentence'],
      rows: [
        ['haben', 'Used with most transitive verbs & stationary actions', 'gemacht, gelesen, gekauft', 'Ich habe gestern ein Buch gelesen.'],
        ['sein', 'Used with verbs of movement (A -> B) or change of state', 'gegangen, gefahren, aufgewacht', 'Wir sind nach Hamburg gefahren.'],
      ],
    },
    examples: [
      { german: 'Hast du den Bericht schon geschrieben?', english: 'Have you already written the report?' },
      { german: 'Der Zug ist pünktlich abgefahren.', english: 'The train departed on time (movement -> sein).' },
    ],
    correctVsIncorrect: [
      {
        correct: 'Ich bin gestern spät eingeschlafen.',
        incorrect: 'Ich habe gestern spät eingeschlafen.',
        reason: 'Einschlafen (falling asleep) is a change of physical state, which requires SEIN as auxiliary.',
      },
      {
        correct: 'Er hat den Vertrag unterschrieben.',
        incorrect: 'Er hat den Vertrag geunterschrieben.',
        reason: 'Inseparable prefixes (be-, ent-, er-, ver-, zer-, miss-, unter-) do NOT take the "ge-" prefix in Partizip II.',
      },
    ],
    commonMistakes: [
      'Putting the participle in the middle of the sentence like in English ("I have seen yesterday him" -> WRONG). The participle MUST be at the very end ("Ich habe ihn gestern gesehen").',
      'Using haben for movement verbs: *Ich habe nach Hause gegangen (WRONG). Correct: "Ich bin nach Hause gegangen".',
    ],
    memoryTrick: 'If your body or an object moves from Point A to Point B, or transitions from Life to Death / Awake to Asleep, you MUST use **SEIN**!',
    quiz: [
      {
        id: 'g_perf_q1',
        type: 'fill_blank',
        prompt: 'Wir _____ gestern einen wunderschönen Film gesehen. (haben / sein)',
        instruction: 'Choose the auxiliary verb',
        options: ['haben', 'sind', 'waren', 'hatten'],
        correctAnswer: 'haben',
        explanation: 'Sehen is a standard transitive verb (watching something), so it takes haben: "Wir haben gesehen".',
      },
    ],
  },
  {
    id: 'modal_verbs',
    title: 'Modal Verbs & The Sentence Bracket',
    germanTitle: 'Modalverben und die Satzklammer',
    level: 'A1',
    category: 'verbs',
    summary: 'The six German modal verbs (können, müssen, wollen, dürfen, sollen, mögen/möchten) form a sentence bracket: modal at Position 2, infinitive at the end.',
    formula: 'Subject + Modal Verb [Pos 2] + ... + Infinitive [END]',
    explanation:
      'Modal verbs express attitude, possibility, permission, or necessity. The conjugated modal verb takes Position 2. The main verb stays in its infinitive dictionary form and is pushed all the way to the very end of the clause. In the present tense, all modal verbs have an irregular singular where the "ich" and "er/sie/es" forms have NO personal ending!',
    table: {
      headers: ['Modal Verb', 'Meaning', 'ich / er form', 'du form', 'wir / sie form'],
      rows: [
        ['können', 'can / be able to', 'kann', 'kannst', 'können'],
        ['müssen', 'must / have to', 'muss', 'musst', 'müssen'],
        ['wollen', 'want to (strong)', 'will', 'willst', 'wollen'],
        ['dürfen', 'may / be allowed to', 'darf', 'darfst', 'dürfen'],
        ['sollen', 'should / be supposed to', 'soll', 'sollst', 'sollen'],
        ['möchten', 'would like to (polite)', 'möchte', 'möchtest', 'möchten'],
      ],
    },
    examples: [
      { german: 'Ich kann sehr gut programmieren.', english: 'I can program very well.' },
      { german: 'Darf man hier Fotos machen?', english: 'Is one allowed to take photos here?' },
      { german: 'Wir müssen bis Freitag das Projekt abschließen.', english: 'We have to complete the project by Friday.' },
    ],
    correctVsIncorrect: [
      {
        correct: 'Er will heute Abend ins Restaurant gehen.',
        incorrect: 'Er will heute Abend ins Restaurant geht.',
        reason: 'The main verb at the end of the sentence MUST remain in the infinitive (gehen), not conjugated (geht).',
      },
      {
        correct: 'Ich muss jetzt gehen.',
        incorrect: 'Ich musse jetzt gehen.',
        reason: 'The "ich" and "er/sie/es" forms of modal verbs take NO ending: ich muss, er kann, sie will.',
      },
    ],
    commonMistakes: [
      'Translating "must not" as "muss nicht". In English, "must not" means forbidden. In German, "muss nicht" means "do not have to" (optional)! If something is forbidden, German uses "darf nicht" (not allowed to)!',
      'Conjugating the end verb instead of leaving it in the infinitive.',
    ],
    memoryTrick: '**"Muss nicht = don\'t have to | Darf nicht = forbidden!"** This single mistake causes huge misunderstandings in German contracts!',
    quiz: [
      {
        id: 'g_mod_q1',
        type: 'multiple_choice',
        prompt: 'How do you say in German: "You are not allowed to smoke here"?',
        instruction: 'Permission vs obligation',
        options: [
          'Hier darf man nicht rauchen.',
          'Hier muss man nicht rauchen.',
          'Hier soll man nicht rauchen.',
          'Hier kann man nicht rauchen.',
        ],
        correctAnswer: 'Hier darf man nicht rauchen.',
        explanation: '"darf nicht" indicates prohibition / not permitted. "muss nicht" would mean smoking is optional!',
      },
    ],
  },
  {
    id: 'subordinate_clauses',
    title: 'Subordinate Clauses (Nebensätze) with weil, dass, wenn',
    germanTitle: 'Nebensätze: Das Verb am Satzende',
    level: 'A2',
    category: 'sentence_structure',
    summary: 'When a subclause begins with a subordinating conjunction (weil, dass, wenn, ob, obwohl), the conjugated verb is banished to the absolute end of the clause.',
    formula: 'Main Clause + , + Conjunction + Subject + Details + CONJUGATED VERB [END]',
    explanation:
      'Subordinate clauses cannot stand alone as a complete sentence. In German grammar, subordinate conjunctions act like magnets that attract the conjugated finite verb and pull it to the very last position of the subclause. Always separate the main clause and subordinate clause with a comma!',
    table: {
      headers: ['Conjunction', 'Meaning', 'Example Sentence'],
      rows: [
        ['weil', 'because', 'Ich lerne Deutsch, weil ich in München arbeiten **möchte**.'],
        ['dass', 'that', 'Ich weiß, dass deutsche Grammatik logisch **ist**.'],
        ['wenn', 'if / when', 'Wenn das Wetter schön ist, **gehen** wir in den Biergarten.'],
        ['ob', 'whether / if', 'Ich weiß nicht, ob der Zug heute pünktlich **abfährt**.'],
        ['obwohl', 'although', 'Er arbeitet weiter, obwohl er müde **ist**.'],
      ],
    },
    examples: [
      { german: 'Wir wissen, dass er heute krank ist.', english: 'We know that he is sick today.' },
      { german: 'Wenn du Zeit hast, können wir einen Kaffee trinken.', english: 'If you have time, we can drink a coffee.' },
    ],
    correctVsIncorrect: [
      {
        correct: 'Ich bleibe daheim, weil es regnet.',
        incorrect: 'Ich bleibe daheim, weil es regnet heute.',
        reason: 'In a "weil" clause, the conjugated verb "regnet" must stand at the very end of that clause.',
      },
      {
        correct: 'Wenn ich Zeit habe, rufe ich dich an.',
        incorrect: 'Wenn ich Zeit habe, ich rufe dich an.',
        reason: 'When the subordinate clause comes FIRST, the entire subordinate clause acts as Position 1 for the main clause! Therefore, the main clause verb "rufe" must follow immediately at Position 2.',
      },
    ],
    commonMistakes: [
      'Forgetting the comma before the subordinate conjunction. In German, commas before "dass", "weil", and "wenn" are mandatory.',
      'Failing to invert the main clause when the subclause is placed first (Nebensatz [Pos 1] + Main Verb [Pos 2] + Subject [Pos 3]).',
    ],
    memoryTrick: 'Imagine subordinate conjunctions (weil, dass, wenn) as kicking boots that kick the conjugated verb all the way against the final wall of the sentence!',
    quiz: [
      {
        id: 'g_sub_q1',
        type: 'word_order',
        prompt: 'Arrange the subordinate clause: "... weil er morgen nach Hamburg fliegt."',
        instruction: 'Conjugated verb at the end',
        options: ['weil', 'er', 'morgen', 'nach', 'Hamburg', 'fliegt.'],
        correctAnswer: 'weil er morgen nach Hamburg fliegt.',
        explanation: 'Conjunction (weil) + subject (er) + time (morgen) + destination (nach Hamburg) + verb (fliegt).',
      },
    ],
  },
  {
    id: 'konjunktiv_ii',
    title: 'Konjunktiv II: Politeness, Wishes & Hypotheticals',
    germanTitle: 'Der Konjunktiv II: Höflichkeit und irreale Bedingungen',
    level: 'B1',
    category: 'verbs',
    summary: 'The subjunctive mood used for polite requests (könnten, würden), expressing unreal wishes (wenn ich reich wäre), and hypothetical situations.',
    formula: 'würde + Infinitive (general) OR specific forms: wäre (sein), hätte (haben), könnte (können)',
    explanation:
      'German speakers use Konjunktiv II constantly in everyday life. In business, speaking in direct indicative ("Ich will ein Angebot") sounds rude. Using Konjunktiv II ("Ich hätte gern ein Angebot" / "Könnten Sie mir ein Angebot schicken?") sounds polished, educated, and respectful.',
    table: {
      headers: ['Concept', 'Direct Indicative (Blunt)', 'Polite Konjunktiv II (Professional)'],
      rows: [
        ['Polite request with verb', 'Helfen Sie mir! (Imperative)', 'Würden Sie mir bitte helfen?'],
        ['Polite request with ability', 'Können Sie das Dokument senden?', 'Könnten Sie mir das Dokument senden?'],
        ['Wanting something', 'Ich will einen Kaffee.', 'Ich hätte gern einen Kaffee.'],
        ['Giving advice', 'Du musst mehr schlafen.', 'Du solltest mehr schlafen.'],
        ['Unreal condition', 'Ich habe kein Geld, ich reise nicht.', 'Wenn ich Geld hätte, würde ich reisen.'],
      ],
    },
    examples: [
      { german: 'Hätten Sie morgen kurz Zeit für ein Gespräch?', english: 'Would you have a moment tomorrow for a conversation?' },
      { german: 'Es wäre toll, wenn wir das Problem gemeinsam lösen könnten.', english: 'It would be great if we could solve the problem together.' },
    ],
    correctVsIncorrect: [
      {
        correct: 'Wenn ich Zeit hätte, würde ich kommen.',
        incorrect: 'Wenn ich Zeit haben würde, würde ich kommen.',
        reason: 'For sein, haben, and modal verbs, native speakers always prefer their real Konjunktiv forms (hätte, wäre, könnte) over "würde haben".',
      },
    ],
    commonMistakes: [
      'Using "würde sein" instead of "wäre". (Always say "Das wäre super!", never "Das würde super sein").',
      'Confusing "wenn" (if/when) with "wann" (question word for clock time). In conditionals, always use "wenn".',
    ],
    memoryTrick: 'Always use **hätte** (would have), **wäre** (would be), and **könnte** (could). For all other verbs, use **würde + infinitive**!',
    quiz: [
      {
        id: 'g_k2_q1',
        type: 'multiple_choice',
        prompt: 'How do you say: "That would be wonderful"?',
        instruction: 'Use Konjunktiv II of sein',
        options: ['Das wäre wunderbar!', 'Das wird wunderbar!', 'Das würde sein wunderbar!', 'Das war wunderbar!'],
        correctAnswer: 'Das wäre wunderbar!',
        explanation: 'Native German speakers always say "Das wäre..." (from sein).',
      },
    ],
  },
];
