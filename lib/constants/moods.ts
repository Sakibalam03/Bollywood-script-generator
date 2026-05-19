export interface Mood {
  id: string;
  emoji: string;
  label: string;
  description: string;
  prompt_anchor: string;
}

export const MOODS: Mood[] = [
  {
    id: 'bhansali',
    emoji: '🎭',
    label: 'SLB Grand Opera',
    description: 'Palatial excess, tragic love, every frame a painting',
    prompt_anchor: 'Sanjay Leela Bhansali grand opera style: opulent sets, tragic love across class divides, slow-motion sequences, lush orchestral score, every scene a visual painting',
  },
  {
    id: 'karan_johar',
    emoji: '👨‍👩‍👧‍👦',
    label: 'Karan Johar Family Saga',
    description: 'Designer families, tearful airports, London apartments',
    prompt_anchor: 'Karan Johar style: ultra-rich NRI families, designer outfits, emotional airport reunions, banter at luxury London flats, family duty vs personal love',
  },
  {
    id: 'south_mass',
    emoji: '💪',
    label: 'South Indian Mass Action',
    description: 'Hero entry shots, quotable punchlines, slow-motion',
    prompt_anchor: 'South Indian mass entertainer style: gravity-defying hero entry, slow-motion bullet-dodge, villagers cheering, thunderous background score, quotable punchline dialogue',
  },
  {
    id: 'nolan',
    emoji: '🤯',
    label: 'Christopher Nolan Mindbender',
    description: 'Time loops, whispered exposition, inverted entropy',
    prompt_anchor: 'Christopher Nolan style: non-linear time, whispered exposition, Hans Zimmer-esque bass drops, characters who explain the plot without understanding it, an inverted twist',
  },
  {
    id: '90s_melodrama',
    emoji: '🌪️',
    label: '90s Bollywood Melodrama',
    description: 'Rain confrontations, Maa ka pyaar, mandir scenes',
    prompt_anchor: '90s Hindi melodrama style: thunder crashing on revelations, drenched rain confrontation, Maa sacrificing everything, mandir scene with deity witness, over-the-top emotional peaks',
  },
  {
    id: 'tarantino',
    emoji: '🤠',
    label: 'Quentin Tarantino Pulp',
    description: 'Verbose monologues, non-linear menace, sudden carnage',
    prompt_anchor: 'Quentin Tarantino style: verbose pop-culture monologues, non-linear narrative jumps, sudden extreme violence, stylized chapter titles, characters who discuss mundane things before chaos',
  },
  {
    id: 'wes_anderson',
    emoji: '🎨',
    label: 'Wes Anderson Symmetry',
    description: 'Pastel palettes, centered shots, deadpan delivery',
    prompt_anchor: 'Wes Anderson style: perfectly centered symmetrical compositions, pastel color palette, deadpan emotionless delivery, quirky tracking shots, characters with elaborate backstories delivered flatly',
  },
  {
    id: 'rohit_shetty',
    emoji: '😂',
    label: 'Rohit Shetty Action Comedy',
    description: 'Flying cars, cop dialogues, Goa',
    prompt_anchor: 'Rohit Shetty style: cars exploding for no reason, macho cop one-liners, comedy track running parallel, everyone ends up in Goa, over-the-top action with slapstick',
  },
  {
    id: 'kashyap_noir',
    emoji: '🕵️',
    label: 'Anurag Kashyap Gritty Noir',
    description: 'Wasseypur grit, profane poetry, smoke-stained interiors',
    prompt_anchor: 'Anurag Kashyap gritty noir style: Wasseypur-esque gang feuds, profanity as poetry, smoke-stained interiors, moral ambiguity, antiheroes, grainy visual aesthetic, raw authentic dialogue',
  },
  {
    id: 'yash_chopra',
    emoji: '💔',
    label: 'Yash Chopra Romantic Tragedy',
    description: 'Mustard fields, chiffon sarees, Swiss vistas',
    prompt_anchor: 'Yash Chopra romantic tragedy style: golden mustard fields, billowing chiffon, longing glances across Swiss meadows, love destined to be thwarted, melancholic Lata Mangeshkar-esque score',
  },
];

export function getMoodById(id: string): Mood | undefined {
  return MOODS.find(m => m.id === id);
}
