import type {
  CalendarEvent,
  CarSpecification,
  CircuitAvailability,
  FAQItem,
  LocalizedString,
  NavItem,
  PrivateTestFormat,
  ProcessStep,
  ProgrammeCardData,
  ProofStat,
  RaceResult,
  RaceSeat,
  ServiceItem,
  TeamMember,
  Testimonial,
  TimelineItem,
} from "@/types/content";

const l = (en: string, fr: string, de: string): LocalizedString => ({
  en,
  fr,
  de,
});

export const navItems: NavItem[] = [
  { href: "/private-testing", label: l("Private Testing", "Essais privés", "Private Tests") },
  { href: "/race-with-us", label: l("Race With Us", "Courir avec nous", "Mitfahren") },
  { href: "/the-lamera", label: l("The Lamera", "La Lamera", "Der Lamera") },
  { href: "/team", label: l("Team", "Équipe", "Team") },
  { href: "/calendar", label: l("Calendar", "Calendrier", "Kalender") },
];

// Placeholder media is intentionally abstract. Replace only these paths when official team media is supplied.
export const heroMedia = {
  poster: "/images/hero/hero-poster.webp",
  video: "",
};

export const proofStats: ProofStat[] = [
  {
    value: l("Private tests", "Essais privés", "Private Tests"),
    label: l("Bespoke Lamera programmes", "Programmes Lamera sur mesure", "Individuelle Lamera-Programme"),
    needsValidation: false,
  },
  {
    value: l("Race weekends", "Week-ends course", "Rennwochenenden"),
    label: l("Arrive-and-drive support", "Support arrive-and-drive", "Arrive-and-Drive-Betreuung"),
    needsValidation: false,
  },
  {
    value: l("Driver coaching", "Coaching pilote", "Fahrercoaching"),
    label: l("Engineering-led progression", "Progression guidée par la data", "Entwicklung mit Engineering"),
    needsValidation: false,
  },
  {
    value: l("Luxembourg", "Luxembourg", "Luxemburg"),
    label: l("European racing base", "base racing européenne", "Europäische Racing-Basis"),
    needsValidation: false,
  },
];

export const homeProgrammes: ProgrammeCardData[] = [
  {
    id: "private-test-day",
    title: l("Private Test Day", "Essai privé", "Privater Testtag"),
    copy: l(
      "Discover the Lamera, develop your confidence and work directly with the team in a professionally managed private testing environment.",
      "Découvrez la Lamera, développez votre confiance et travaillez directement avec l'équipe dans un cadre d'essai privé professionnel.",
      "Entdecken Sie den Lamera, entwickeln Sie Sicherheit und arbeiten Sie direkt mit dem Team in einer professionellen Testumgebung.",
    ),
    cta: l("Plan Your Test", "Planifier votre essai", "Test planen"),
    href: "/contact?objective=private-test&programme=private-test-day",
    image: {
      src: "/images/cars/lamera-front-three-quarter.webp",
      alt: l("Abstract motorsport media placeholder for private testing", "Visuel abstrait motorsport pour essai privé", "Abstraktes Motorsport-Platzhalterbild für private Tests"),
      isPlaceholder: true,
    },
  },
  {
    id: "race-weekend",
    title: l("Race Weekend", "Week-end de course", "Rennwochenende"),
    copy: l(
      "Join RaceTrack Competition for a complete arrive-and-drive endurance weekend, from preparation and engineering to race support.",
      "Rejoignez RaceTrack Competition pour un week-end endurance arrive-and-drive complet, de la préparation à l'assistance course.",
      "Fahren Sie mit RaceTrack Competition ein komplettes Arrive-and-Drive-Langstreckenwochenende, von Vorbereitung bis Rennbetreuung.",
    ),
    cta: l("Request this race seat", "Demander ce baquet", "Diesen Race Seat anfragen"),
    href: "/contact?objective=race-weekend&programme=race-weekend",
    image: {
      src: "/images/team/team-garage.webp",
      alt: l("Abstract garage media placeholder", "Visuel abstrait d'ambiance garage", "Abstraktes Garagen-Platzhalterbild"),
      isPlaceholder: true,
    },
  },
  {
    id: "full-season",
    title: l("Full Season Programme", "Programme saison complète", "Komplettes Saisonprogramm"),
    copy: l(
      "Build a structured racing season with coaching, engineering, technical support and long-term driver development.",
      "Construisez une saison structurée avec coaching, ingénierie, assistance technique et développement pilote.",
      "Entwickeln Sie eine strukturierte Rennsaison mit Coaching, Engineering, technischer Unterstützung und langfristiger Fahrerentwicklung.",
    ),
    cta: l("Discuss Your Programme", "Discuter du programme", "Programm besprechen"),
    href: "/contact?objective=full-season&programme=full-season",
    image: {
      src: "/images/cta/night-cockpit.webp",
      alt: l("Abstract night racing media placeholder", "Visuel abstrait de course de nuit", "Abstraktes Nacht-Rennsport-Platzhalterbild"),
      isPlaceholder: true,
    },
  },
];

export const carSpecifications: CarSpecification[] = [
  { label: l("Power", "Puissance", "Leistung"), value: l("330 HP", "330 ch", "330 PS"), validationRequired: true },
  { label: l("Weight", "Poids", "Gewicht"), value: l("1,020 KG", "1 020 kg", "1.020 kg"), validationRequired: true },
  { label: l("Transmission", "Transmission", "Getriebe"), value: l("6-speed sequential", "séquentielle 6 rapports", "6-Gang sequenziell"), validationRequired: true },
  { label: l("Drivetrain", "Transmission", "Antrieb"), value: l("Rear-wheel drive", "propulsion", "Heckantrieb"), validationRequired: true },
  { label: l("Chassis", "Châssis", "Chassis"), value: l("Tubular two-seat chassis", "châssis tubulaire biplace", "Rohrrahmen-Zweisitzer"), validationRequired: true },
  { label: l("Suspension", "Suspension", "Fahrwerk"), value: l("Double wishbone", "double triangulation", "Doppelquerlenker"), validationRequired: true },
  { label: l("Brakes", "Freins", "Bremsen"), value: l("330 mm ventilated discs", "disques ventilés 330 mm", "330-mm belüftete Scheiben"), validationRequired: true },
];

export const carImages = [
  "/images/cars/lamera-front-three-quarter.webp",
  "/images/cars/lamera-side.webp",
  "/images/cars/lamera-cockpit.webp",
  "/images/cars/lamera-detail.webp",
];

export const services: ServiceItem[] = [
  { title: l("Race Car Preparation", "Préparation voiture", "Rennwagenvorbereitung"), copy: l("A car prepared around the agreed programme and circuit format.", "Une voiture préparée selon le programme et le format du circuit.", "Ein Fahrzeug, vorbereitet auf Programm und Streckenformat."), icon: "Wrench" },
  { title: l("Trackside Mechanics", "Mécaniciens piste", "Mechaniker vor Ort"), copy: l("Experienced hands managing checks, setup changes and operational rhythm.", "Des mains expérimentées pour les contrôles, réglages et le rythme opérationnel.", "Erfahrene Betreuung für Checks, Set-up und Ablauf."), icon: "Settings" },
  { title: l("Data & Performance Engineering", "Data & performance", "Daten & Performance"), copy: l("Data-led review to help you understand pace, consistency and confidence.", "Une analyse data pour comprendre rythme, constance et confiance.", "Datenbasierte Analyse für Tempo, Konstanz und Vertrauen."), icon: "Activity" },
  { title: l("Driver Coaching", "Coaching pilote", "Fahrercoaching"), copy: l("Clear feedback adapted to your experience and the objective of the day.", "Un retour clair adapté à votre niveau et à l'objectif de la journée.", "Klares Feedback passend zu Erfahrung und Tagesziel."), icon: "Headphones" },
  { title: l("Logistics & Technical Support", "Logistique & support", "Logistik & Technik"), copy: l("Practical support around the car, equipment and trackside operation.", "Support pratique autour de la voiture, de l'équipement et de l'opération piste.", "Praktische Unterstützung rund um Auto, Ausrüstung und Ablauf."), icon: "Truck" },
  { title: l("Race Weekend Management", "Gestion week-end course", "Rennwochenend-Management"), copy: l("A structured operation from preparation through sessions and debrief.", "Une opération structurée de la préparation aux débriefings.", "Strukturierter Ablauf von Vorbereitung bis Debrief."), icon: "Flag" },
];

export const processSteps: ProcessStep[] = [
  { step: "01", title: l("Define Your Objective", "Définir l'objectif", "Ziel definieren"), copy: l("Discovery, progression, race preparation or a complete season.", "Découverte, progression, préparation course ou saison complète.", "Entdeckung, Entwicklung, Rennvorbereitung oder komplette Saison.") },
  { step: "02", title: l("Build Your Programme", "Construire le programme", "Programm entwickeln"), copy: l("We select the circuit, format and level of technical and coaching support.", "Nous sélectionnons le circuit, le format et le niveau de support technique et coaching.", "Wir wählen Strecke, Format sowie Technik- und Coachingniveau.") },
  { step: "03", title: l("Driver Fitting & Briefing", "Installation & briefing", "Sitzprobe & Briefing"), copy: l("Driving position, equipment, safety procedures and vehicle familiarisation.", "Position de conduite, équipement, procédures sécurité et familiarisation véhicule.", "Sitzposition, Ausrüstung, Sicherheitsabläufe und Fahrzeuggewöhnung.") },
  { step: "04", title: l("Drive & Improve", "Piloter & progresser", "Fahren & verbessern"), copy: l("Track time, data analysis, feedback and a clear progression plan.", "Temps de piste, analyse data, feedback et plan de progression clair.", "Streckenzeit, Datenanalyse, Feedback und klarer Entwicklungsplan.") },
];

export const circuits: CircuitAvailability[] = [
  { id: "paul-ricard", circuit: "Circuit Paul Ricard", country: l("France", "France", "Frankreich"), date: "2026-09-18", programme: l("Private Testing", "Essai privé", "Privater Test"), image: { src: "/images/circuits/paul-ricard.webp", alt: l("Abstract placeholder for Circuit Paul Ricard", "Visuel abstrait Paul Ricard", "Abstraktes Platzhalterbild Paul Ricard"), isPlaceholder: true }, availability: "limited", seats: "2", href: "/calendar", isDemo: true },
  { id: "magny-cours", circuit: "Magny-Cours", country: l("France", "France", "Frankreich"), date: "2026-10-02", programme: l("Driver Development", "Développement pilote", "Fahrerentwicklung"), image: { src: "/images/circuits/magny-cours.webp", alt: l("Abstract placeholder for Magny-Cours", "Visuel abstrait Magny-Cours", "Abstraktes Platzhalterbild Magny-Cours"), isPlaceholder: true }, availability: "available", seats: "3", href: "/calendar", isDemo: true },
  { id: "portimao", circuit: "Portimão", country: l("Portugal", "Portugal", "Portugal"), date: "2026-11-07", programme: l("Race Weekend", "Week-end de course", "Rennwochenende"), image: { src: "/images/circuits/portimao.webp", alt: l("Abstract placeholder for Portimão", "Visuel abstrait Portimão", "Abstraktes Platzhalterbild Portimão"), isPlaceholder: true }, availability: "on-request", seats: "On request", href: "/race-with-us", isDemo: true },
  { id: "dijon", circuit: "Dijon-Prenois", country: l("France", "France", "Frankreich"), date: "2026-08-28", programme: l("Private Test Day", "Essai privé", "Privater Testtag"), image: { src: "/images/circuits/dijon-prenois.webp", alt: l("Abstract placeholder for Dijon-Prenois", "Visuel abstrait Dijon-Prenois", "Abstraktes Platzhalterbild Dijon-Prenois"), isPlaceholder: true }, availability: "available", seats: "2", href: "/calendar", isDemo: true },
  { id: "zolder", circuit: "Zolder", country: l("Belgium", "Belgique", "Belgien"), date: "2026-09-05", programme: l("Race Weekend", "Week-end de course", "Rennwochenende"), image: { src: "/images/circuits/zolder.webp", alt: l("Abstract placeholder for Zolder", "Visuel abstrait Zolder", "Abstraktes Platzhalterbild Zolder"), isPlaceholder: true }, availability: "fully-booked", seats: "0", href: "/calendar", isDemo: true },
  { id: "aragon", circuit: "MotorLand Aragón", country: l("Spain", "Espagne", "Spanien"), date: "2026-10-24", programme: l("Endurance Preparation", "Préparation endurance", "Langstrecken-Vorbereitung"), image: { src: "/images/circuits/motorland-aragon.webp", alt: l("Abstract placeholder for MotorLand Aragón", "Visuel abstrait MotorLand Aragón", "Abstraktes Platzhalterbild MotorLand Aragón"), isPlaceholder: true }, availability: "limited", seats: "1", href: "/calendar", isDemo: true },
  { id: "mugello", circuit: "Mugello", country: l("Italy", "Italie", "Italien"), date: "2026-11-21", programme: l("Corporate / VIP", "Corporate / VIP", "Corporate / VIP"), image: { src: "/images/circuits/mugello.webp", alt: l("Abstract placeholder for Mugello", "Visuel abstrait Mugello", "Abstraktes Platzhalterbild Mugello"), isPlaceholder: true }, availability: "on-request", seats: "On request", href: "/contact", isDemo: true },
];

export const timeline: TimelineItem[] = [
  { title: l("Early motorsport career and touring car competition", "Débuts en sport automobile et tourisme", "Frühe Motorsport- und Tourenwagenlaufbahn"), copy: l("Historical details to be confirmed with the team.", "Détails historiques à confirmer avec l'équipe.", "Historische Details sind mit dem Team zu bestätigen."), provisional: true },
  { year: "2013", title: l("FIA ETCC Vice-Champion", "Vice-champion FIA ETCC", "FIA ETCC Vizemeister"), copy: l("Provisional wording pending official source validation.", "Libellé provisoire en attente de validation officielle.", "Provisorische Formulierung bis zur Quellenprüfung."), provisional: true },
  { year: "2014", title: l("FIA ETCC Super 1600 Champion", "Champion FIA ETCC Super 1600", "FIA ETCC Super 1600 Champion"), copy: l("A key credibility claim requiring final verification before launch.", "Un élément de crédibilité majeur à vérifier avant lancement.", "Eine zentrale Glaubwürdigkeitsaussage, die vor Launch zu prüfen ist."), provisional: true },
  { title: l("RaceTrack Competition development", "Développement de RaceTrack Competition", "Entwicklung von RaceTrack Competition"), copy: l("Team history to be refined with verified dates and current legal details.", "Historique à affiner avec dates vérifiées et informations légales.", "Teamgeschichte mit geprüften Daten und Rechtsangaben ergänzen."), provisional: true },
  { year: "2022", title: l("Abu Dhabi class podium", "Podium de classe à Abu Dhabi", "Klassenpodium Abu Dhabi"), copy: l("Result story prepared as a structured placeholder.", "Récit de résultat préparé comme contenu structuré provisoire.", "Ergebnisgeschichte als strukturierter Platzhalter vorbereitet."), provisional: true },
  { year: "2023", title: l("26H Portimão Pro-Am victory", "Victoire Pro-Am 26H Portimão", "26H Portimão Pro-Am-Sieg"), copy: l("Victory wording must be checked against official classification.", "Formulation à vérifier avec le classement officiel.", "Sieg-Formulierung mit offizieller Klassifikation prüfen."), provisional: true },
  { title: l("Lamera Cup and bespoke driving programmes", "Lamera Cup et programmes sur mesure", "Lamera Cup und individuelle Fahrerprogramme"), copy: l("Current activity should be aligned with live team availability.", "Activité actuelle à aligner avec les disponibilités réelles.", "Aktuelle Aktivitäten mit Live-Verfügbarkeit abstimmen."), provisional: true },
];

export const teamMembers: TeamMember[] = [
  {
    id: "gilles-bruckner",
    name: "Gilles Bruckner",
    role: l("Official current role to be confirmed", "Rôle officiel actuel à confirmer", "Aktuelle offizielle Rolle zu bestätigen"),
    publicRole: l("Racing driver and sporting reference", "Pilote et référence sportive", "Rennfahrer und sportliche Referenz"),
    nationality: l("Luxembourg", "Luxembourg", "Luxemburg"),
    biography: l("Luxembourg racing driver and central figure in RaceTrack Competition's sporting experience.", "Pilote luxembourgeois et figure centrale de l'expérience sportive RaceTrack Competition.", "Luxemburger Rennfahrer und zentrale Figur der sportlichen Erfahrung von RaceTrack Competition."),
    achievements: [l("FIA ETCC champion claim pending final wording validation.", "Titre FIA ETCC à valider dans sa formulation finale.", "FIA-ETCC-Titel in finaler Formulierung zu prüfen.")],
    languages: ["FR", "DE", "EN"],
    image: { src: "/images/drivers/gilles-bruckner.webp", alt: l("Abstract portrait placeholder for Gilles Bruckner", "Portrait abstrait provisoire de Gilles Bruckner", "Abstrakter Porträt-Platzhalter für Gilles Bruckner"), isPlaceholder: true },
    needsValidation: true,
  },
  {
    id: "tommy-rollinger",
    name: "Tommy Rollinger",
    role: l("Official role to be confirmed", "Rôle officiel à confirmer", "Offizielle Rolle zu bestätigen"),
    publicRole: l("Team member", "Membre de l'équipe", "Teammitglied"),
    nationality: l("Luxembourg", "Luxembourg", "Luxemburg"),
    biography: l("Team profile prepared for verified biography, role and achievements.", "Profil prêt à recevoir biographie, rôle et résultats vérifiés.", "Profil für geprüfte Biografie, Rolle und Erfolge vorbereitet."),
    achievements: [l("Achievements to be supplied by the team.", "Palmarès à fournir par l'équipe.", "Erfolge vom Team zu ergänzen.")],
    languages: ["FR", "DE", "EN"],
    image: { src: "/images/drivers/tommy-rollinger.webp", alt: l("Abstract portrait placeholder for Tommy Rollinger", "Portrait abstrait provisoire de Tommy Rollinger", "Abstrakter Porträt-Platzhalter für Tommy Rollinger"), isPlaceholder: true },
    needsValidation: true,
  },
  {
    id: "race-engineer",
    name: "Race Engineer",
    role: l("Name and role to be confirmed", "Nom et rôle à confirmer", "Name und Rolle zu bestätigen"),
    publicRole: l("Race engineering", "Ingénierie course", "Rennengineering"),
    biography: l("Profile reserved for the engineer responsible for data, setup and performance review.", "Profil réservé à l'ingénieur responsable de la data, du set-up et de l'analyse performance.", "Profil für Engineering, Daten, Set-up und Performanceanalyse."),
    achievements: [],
    languages: ["FR", "DE", "EN"],
    image: { src: "/images/team/team-garage.webp", alt: l("Abstract team placeholder", "Visuel abstrait équipe", "Abstraktes Team-Platzhalterbild"), isPlaceholder: true },
    needsValidation: true,
  },
  {
    id: "chief-mechanic",
    name: "Chief Mechanic",
    role: l("Name to be confirmed", "Nom à confirmer", "Name zu bestätigen"),
    publicRole: l("Technical operations", "Opérations techniques", "Technische Abläufe"),
    biography: l("Profile reserved for the person leading preparation, checks and trackside reliability.", "Profil réservé à la personne en charge de la préparation, des contrôles et de la fiabilité piste.", "Profil für Vorbereitung, Checks und Zuverlässigkeit an der Strecke."),
    achievements: [],
    languages: ["FR", "DE"],
    image: { src: "/images/team/team-garage.webp", alt: l("Abstract garage placeholder", "Visuel abstrait garage", "Abstraktes Garagen-Platzhalterbild"), isPlaceholder: true },
    needsValidation: true,
  },
  {
    id: "trackside-crew",
    name: "Mechanics / Trackside Crew",
    role: l("Names to be confirmed", "Noms à confirmer", "Namen zu bestätigen"),
    publicRole: l("Trackside crew", "Équipe piste", "Crew an der Strecke"),
    biography: l("The operational people who turn preparation, communication and reliability into track time.", "Les personnes qui transforment préparation, communication et fiabilité en temps de piste.", "Das operative Team, das Vorbereitung, Kommunikation und Zuverlässigkeit in Streckenzeit verwandelt."),
    achievements: [],
    languages: ["FR", "DE", "EN"],
    image: { src: "/images/team/team-garage.webp", alt: l("Abstract crew placeholder", "Visuel abstrait équipe piste", "Abstraktes Crew-Platzhalterbild"), isPlaceholder: true },
    needsValidation: true,
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Private client",
    initials: "PC",
    country: l("Europe", "Europe", "Europa"),
    previousExperience: l("Track-day experience", "Expérience track-day", "Track-Day-Erfahrung"),
    programme: l("Private test day", "Essai privé", "Privater Testtag"),
    quote: l("Demo testimonial reserved for a verified client quote.", "Témoignage démo réservé à un avis client vérifié.", "Demo-Testimonial für ein verifiziertes Kundenzitat."),
    isVerified: false,
  },
];

export const privateTestFormats: PrivateTestFormat[] = [
  { id: "discovery-test", title: l("Discovery Test", "Essai découverte", "Discovery Test"), description: l("Initial control of the Lamera and professional team procedures.", "Prise en main de la Lamera et des procédures d'équipe.", "Erste Kontrolle des Lamera und Teamabläufe."), idealDriver: l("First-time race car driver or premium track-day driver.", "Premier roulage en voiture de course ou track-day expérimenté.", "Erster Rennwagenkontakt oder erfahrener Track-Day-Fahrer."), duration: l("Half day or full day", "Demi-journée ou journée", "Halber oder ganzer Tag"), trackTime: l("Defined in proposal", "Défini dans la proposition", "Im Angebot definiert"), coaching: l("Foundational coaching", "Coaching fondamental", "Grundlagen-Coaching"), dataReview: l("Introductory", "Introductive", "Einführend"), equipment: l("Confirmed per proposal", "Confirmé selon proposition", "Je Angebot bestätigt"), price: { kind: "on-request" }, cta: l("Plan Your Test", "Planifier votre essai", "Test planen") },
  { id: "performance-test", title: l("Performance Test", "Essai performance", "Performance Test"), description: l("Improve braking, lines, consistency and data-driven performance.", "Améliorer freinage, trajectoires, constance et performance data.", "Bremsen, Linien, Konstanz und datenbasierte Performance verbessern."), idealDriver: l("Experienced track-day or amateur racing driver.", "Pilote track-day expérimenté ou amateur compétition.", "Erfahrener Track-Day- oder Amateurfahrer."), duration: l("Full day", "Journée", "Ganzer Tag"), trackTime: l("Structured run plan", "Plan de runs structuré", "Strukturierter Run-Plan"), coaching: l("Performance coaching", "Coaching performance", "Performance-Coaching"), dataReview: l("Session-by-session", "Session par session", "Sessionweise"), equipment: l("Confirmed per proposal", "Confirmé selon proposition", "Je Angebot bestätigt"), price: { kind: "on-request" }, cta: l("Request a Private Test", "Demander un essai privé", "Privaten Test anfragen") },
  { id: "race-preparation", title: l("Race Preparation", "Préparation course", "Rennvorbereitung"), description: l("For drivers preparing for a first endurance race or a specific event.", "Pour préparer une première course d'endurance ou un événement précis.", "Für Fahrer vor dem ersten Langstreckenrennen oder einem konkreten Event."), idealDriver: l("Committed amateur or incoming race-seat driver.", "Amateur engagé ou futur pilote de course.", "Engagierter Amateur oder kommender Race-Seat-Fahrer."), duration: l("One or two days", "Un ou deux jours", "Ein oder zwei Tage"), trackTime: l("Race-focused run plan", "Plan orienté course", "Rennorientierter Run-Plan"), coaching: l("Race preparation", "Préparation course", "Rennvorbereitung"), dataReview: l("Detailed", "Détaillée", "Detailliert"), equipment: l("Licence and kit confirmed in proposal", "Licence et équipement confirmés dans la proposition", "Lizenz und Ausrüstung im Angebot bestätigt"), price: { kind: "on-request" }, cta: l("Build Your Programme", "Construire votre programme", "Programm planen") },
  { id: "bespoke-private-day", title: l("Bespoke Private Day", "Journée privée sur mesure", "Individueller Privattag"), description: l("Selected circuit, support, coaching and optional hospitality.", "Circuit, support, coaching et hospitalité optionnelle.", "Ausgewählte Strecke, Betreuung, Coaching und optionale Hospitality."), idealDriver: l("Private client, corporate group or VIP programme.", "Client privé, groupe corporate ou programme VIP.", "Privatkunde, Unternehmensgruppe oder VIP-Programm."), duration: l("Custom", "Sur mesure", "Individuell"), trackTime: l("Custom", "Sur mesure", "Individuell"), coaching: l("Adapted to profile", "Adapté au profil", "Auf Profil abgestimmt"), dataReview: l("Optional", "Optionnelle", "Optional"), equipment: l("Confirmed per proposal", "Confirmé selon proposition", "Je Angebot bestätigt"), price: { kind: "on-request" }, cta: l("Request a Confidential Call", "Demander un appel confidentiel", "Vertrauliches Gespräch anfragen") },
];

export const includedItems = [
  l("Vehicle preparation", "Préparation véhicule", "Fahrzeugvorbereitung"),
  l("Tyres", "Pneus", "Reifen"),
  l("Fuel", "Carburant", "Kraftstoff"),
  l("Mechanics", "Mécaniciens", "Mechaniker"),
  l("Race engineer", "Ingénieur course", "Renningenieur"),
  l("Data analysis", "Analyse data", "Datenanalyse"),
  l("Coaching", "Coaching", "Coaching"),
  l("Safety briefing", "Briefing sécurité", "Sicherheitsbriefing"),
  l("Driver fitting", "Installation pilote", "Fahreranpassung"),
  l("Hospitality", "Hospitalité", "Hospitality"),
  l("Photography", "Photographie", "Fotografie"),
  l("Transport", "Transport", "Transport"),
  l("Accommodation", "Hébergement", "Unterkunft"),
  l("Insurance", "Assurance", "Versicherung"),
  l("Licence support", "Support licence", "Lizenzunterstützung"),
];

export const privateTestingFaqs: FAQItem[] = [
  { question: l("Do I need racing experience?", "Faut-il une expérience course ?", "Brauche ich Rennerfahrung?"), answer: l("Not always. The programme can be adapted, but the team must confirm your profile before any proposal.", "Pas toujours. Le programme peut être adapté, mais l'équipe doit confirmer votre profil avant toute proposition.", "Nicht immer. Das Programm kann angepasst werden, aber das Team muss Ihr Profil vor einem Angebot prüfen.") },
  { question: l("Do I need a racing licence?", "Faut-il une licence ?", "Brauche ich eine Rennlizenz?"), answer: l("Requirements depend on the circuit, format and event. Confirm licence details directly with the team.", "Les exigences dépendent du circuit, du format et de l'événement. Confirmez les détails avec l'équipe.", "Anforderungen hängen von Strecke, Format und Event ab. Details bitte mit dem Team klären.") },
  { question: l("What equipment should I bring?", "Quel équipement apporter ?", "Welche Ausrüstung soll ich mitbringen?"), answer: l("Equipment depends on the proposal and safety requirements. The team will confirm what can be supplied and what you should bring.", "L'équipement dépend de la proposition et des exigences sécurité. L'équipe confirmera ce qui est fourni et ce que vous devez apporter.", "Ausrüstung hängt von Angebot und Sicherheitsanforderungen ab. Das Team bestätigt, was gestellt wird und was Sie mitbringen.") },
  { question: l("How much track time will I receive?", "Combien de temps de piste ?", "Wie viel Streckenzeit erhalte ich?"), answer: l("Track time is defined in the final proposal according to circuit availability and the selected format.", "Le temps de piste est défini dans la proposition finale selon la disponibilité du circuit et le format.", "Streckenzeit wird im finalen Angebot je nach Strecke und Format definiert.") },
  { question: l("Can the programme be adapted to my level?", "Le programme est-il adapté à mon niveau ?", "Kann das Programm an mein Niveau angepasst werden?"), answer: l("Yes. Driver level, confidence and objective shape the run plan and coaching approach.", "Oui. Le niveau, la confiance et l'objectif guident le plan de roulage et le coaching.", "Ja. Niveau, Sicherheit und Ziel prägen Run-Plan und Coaching.") },
  { question: l("Can I test before committing to a race?", "Puis-je tester avant une course ?", "Kann ich vor einem Rennen testen?"), answer: l("That is one of the intended paths. A private test can help confirm comfort, pace and programme fit.", "C'est l'un des parcours prévus. Un essai privé peut confirmer aisance, rythme et adéquation.", "Das ist ein vorgesehener Weg. Ein privater Test kann Komfort, Tempo und Passung prüfen.") },
  { question: l("Which circuits are available?", "Quels circuits sont disponibles ?", "Welche Strecken sind verfügbar?"), answer: l("Private test dates and circuits are arranged directly with RaceTrack Competition according to availability, format and driver profile.", "Les dates et circuits d'essais privés sont organisés directement avec RaceTrack Competition selon disponibilité, format et profil pilote.", "Private Testtermine und Strecken werden direkt mit RaceTrack Competition nach Verfügbarkeit, Format und Fahrerprofil abgestimmt.") },
  { question: l("What happens in case of bad weather?", "Que se passe-t-il en cas de météo difficile ?", "Was passiert bei schlechtem Wetter?"), answer: l("Weather, safety and operating decisions depend on circuit rules and the team's risk assessment. Confirm conditions in the proposal.", "Météo, sécurité et décisions opérationnelles dépendent du règlement circuit et de l'évaluation de l'équipe. À confirmer dans la proposition.", "Wetter-, Sicherheits- und Ablaufentscheidungen hängen von Streckenregeln und Risikobewertung ab. Im Angebot bestätigen.") },
];

export const raceSeats: RaceSeat[] = [
  {
    id: "portimao-demo",
    event: "Endurance weekend",
    circuit: "Portimão",
    country: l("Portugal", "Portugal", "Portugal"),
    dates: "2026-11-07 - 2026-11-08",
    raceFormat: "Endurance",
    category: "Lamera Cup",
    carNumber: "TBC",
    drivers: "3-4",
    estimatedDrivingTime: l("Confirmed by event format", "Confirmé selon format", "Je Eventformat bestätigt"),
    requiredExperience: l("Track-day or assessment recommended", "Track-day ou évaluation recommandée", "Track-Day oder Bewertung empfohlen"),
    licenceRequirements: l("To be confirmed with the team", "À confirmer avec l'équipe", "Mit dem Team zu bestätigen"),
    includedServices: [l("Car preparation", "Préparation voiture", "Fahrzeugvorbereitung"), l("Race engineering", "Ingénierie course", "Rennengineering"), l("Trackside support", "Support piste", "Streckenbetreuung")],
    optionalExtras: [l("Coaching", "Coaching", "Coaching"), l("Hospitality", "Hospitalité", "Hospitality")],
    availability: "on-request",
    price: { kind: "on-request" },
    isDemo: true,
  },
  {
    id: "paul-ricard-demo",
    event: "Race weekend",
    circuit: "Circuit Paul Ricard",
    country: l("France", "France", "Frankreich"),
    dates: "2026-09-18 - 2026-09-20",
    raceFormat: "Endurance",
    category: "Lamera Cup",
    carNumber: "TBC",
    drivers: "3",
    estimatedDrivingTime: l("Defined by entry", "Défini selon engagement", "Je Nennung definiert"),
    requiredExperience: l("Prior circuit experience required", "Expérience circuit requise", "Streckenerfahrung erforderlich"),
    licenceRequirements: l("Licence details to be confirmed", "Détails licence à confirmer", "Lizenzdetails zu bestätigen"),
    includedServices: [l("Mechanics", "Mécaniciens", "Mechaniker"), l("Strategy", "Stratégie", "Strategie"), l("Data review", "Analyse data", "Datenanalyse")],
    optionalExtras: [l("Private test before race", "Essai privé avant course", "Privater Test vor dem Rennen")],
    availability: "limited",
    price: { kind: "on-request" },
    isDemo: true,
  },
];

export const racePath: ProcessStep[] = [
  { step: "01", title: l("Initial discussion", "Échange initial", "Erstgespräch"), copy: l("Understand your level, goals and timing.", "Comprendre votre niveau, objectifs et timing.", "Niveau, Ziele und Timing verstehen.") },
  { step: "02", title: l("Driver profile review", "Analyse profil pilote", "Fahrerprofil prüfen"), copy: l("Match the opportunity to experience and licence needs.", "Aligner l'opportunité avec expérience et licence.", "Opportunity mit Erfahrung und Lizenzbedarf abgleichen.") },
  { step: "03", title: l("Private test or assessment", "Essai ou évaluation", "Test oder Bewertung"), copy: l("Confirm comfort, pace and fit where useful.", "Confirmer aisance, rythme et adéquation si utile.", "Komfort, Tempo und Passung prüfen.") },
  { step: "04", title: l("Programme confirmation", "Confirmation programme", "Programmbestätigung"), copy: l("Agree event, car, support and commercial terms.", "Valider événement, voiture, support et conditions.", "Event, Auto, Betreuung und Konditionen abstimmen.") },
  { step: "05", title: l("Race preparation", "Préparation course", "Rennvorbereitung"), copy: l("Fitting, briefing, setup and operational planning.", "Installation, briefing, set-up et planification.", "Sitzprobe, Briefing, Set-up und Planung.") },
  { step: "06", title: l("Race weekend", "Week-end course", "Rennwochenende"), copy: l("Arrive with a professional team already operating around you.", "Arrivez avec une équipe professionnelle déjà en action autour de vous.", "Ankommen mit einem professionellen Team um Sie herum.") },
];

export const calendarEvents: CalendarEvent[] = circuits.map((circuit, index) => ({
  id: circuit.id,
  date: circuit.date,
  circuit: circuit.circuit,
  country: circuit.country,
  type: index % 3 === 2 ? "race-weekend" : "private-testing",
  image: circuit.image,
  availability: circuit.availability,
  cta: index % 3 === 2
    ? l("Request this race seat", "Demander ce baquet", "Diesen Race Seat anfragen")
    : l("Enquire about this circuit", "Demander ce circuit", "Diese Strecke anfragen"),
  href: `/contact?objective=${index % 3 === 2 ? "race-weekend" : "private-test"}&circuit=${circuit.id}`,
  isDemo: true,
}));

export const raceResults: RaceResult[] = [
  { id: "etcc-2014", year: "2014", event: "FIA ETCC Super 1600", circuit: "TBC", drivers: ["Gilles Bruckner"], championship: "FIA ETCC", category: "Super 1600", overallPosition: "TBC", classPosition: "Champion", carNumber: "TBC", image: { src: "/images/results/etcc-2014.webp", alt: l("Abstract result placeholder for FIA ETCC 2014", "Visuel abstrait résultat FIA ETCC 2014", "Abstraktes Ergebnisbild FIA ETCC 2014"), isPlaceholder: true }, verified: false, featured: true },
  { id: "abu-dhabi-2022", year: "2022", event: "Abu Dhabi class podium", circuit: "Yas Marina", drivers: ["TBC"], championship: "TBC", category: "TBC", overallPosition: "TBC", classPosition: "Podium", carNumber: "TBC", image: { src: "/images/results/abu-dhabi-2022.webp", alt: l("Abstract result placeholder for Abu Dhabi 2022", "Visuel abstrait résultat Abu Dhabi 2022", "Abstraktes Ergebnisbild Abu Dhabi 2022"), isPlaceholder: true }, verified: false, featured: true },
  { id: "portimao-2023", year: "2023", event: "26H Portimão", circuit: "Portimão", drivers: ["TBC"], championship: "TBC", category: "Pro-Am", overallPosition: "TBC", classPosition: "Winner", carNumber: "TBC", image: { src: "/images/results/portimao-2023.webp", alt: l("Abstract result placeholder for Portimão 2023", "Visuel abstrait résultat Portimão 2023", "Abstraktes Ergebnisbild Portimão 2023"), isPlaceholder: true }, verified: false, featured: true },
];

export const legalPlaceholders = [
  "Legal company name",
  "Legal form",
  "Luxembourg registration number",
  "VAT number",
  "Registered address",
  "Publication director",
  "Hosting provider",
  "Contact email",
];

export const audienceProfiles = [
  l("First-time race car drivers", "Premiers roulages en voiture de course", "Erste Rennwagenfahrer"),
  l("Experienced track-day drivers", "Pilotes track-day expérimentés", "Erfahrene Track-Day-Fahrer"),
  l("Amateur racers", "Pilotes amateurs", "Amateur-Rennfahrer"),
  l("Drivers preparing for competition", "Pilotes préparant la compétition", "Fahrer vor dem Renneinstieg"),
];

export const fullServiceItems = [
  l("Car", "Voiture", "Auto"),
  l("Preparation", "Préparation", "Vorbereitung"),
  l("Mechanics", "Mécaniciens", "Mechaniker"),
  l("Engineering", "Ingénierie", "Engineering"),
  l("Race support", "Assistance course", "Rennbetreuung"),
  l("Driver coaching", "Coaching pilote", "Fahrercoaching"),
  l("Strategy", "Stratégie", "Strategie"),
  l("Hospitality where applicable", "Hospitalité le cas échéant", "Hospitality falls zutreffend"),
];
