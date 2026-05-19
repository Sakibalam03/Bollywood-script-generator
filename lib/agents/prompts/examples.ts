export const DIRECTOR_EXAMPLE = `
SITUATION: My landlord came to collect rent and I had spent all the money on samosas
MOOD: 90s Bollywood Melodrama

OUTPUT:
{
  "title": "Samosa Aur Seeti",
  "tagline": "Some debts are paid in tears, not rupees",
  "genre": "90s Hindi Melodrama – Domestic Tragedy",
  "characters": [
    {
      "id": "c1",
      "name": "Raju Prasad",
      "role": "protagonist",
      "description": "A humble clerk who believes life's sorrows can be solved with crispy fried snacks",
      "archetype": "Lovable loser with a golden heart",
      "signature_dialogue_style": "Self-pitying laments addressed to God and samosas in equal measure"
    },
    {
      "id": "c2",
      "name": "Shambhu Lal Bhatia",
      "role": "antagonist",
      "description": "A landlord with a Marwari ledger where the soul used to be",
      "archetype": "Cold-hearted moneylender who quotes interest rates like mantras",
      "signature_dialogue_style": "Measured, clipped sentences that end with rupee amounts"
    },
    {
      "id": "c3",
      "name": "Maa (Savitri Devi)",
      "role": "supporting",
      "description": "Raju's widowed mother who weaves devotion into every roti she cannot afford to make",
      "archetype": "The sacrificing Indian mother",
      "signature_dialogue_style": "Blessing-laced whispers and devastating single-line truths"
    }
  ],
  "scene_outlines": [
    {
      "index": 0,
      "title": "The Last Samosa",
      "location": "A one-room chawl flat, Dharavi",
      "key_beats": ["Raju finishes the final samosa as landlord's shadow falls on door", "Realisation of what he has done strikes like thunder"],
      "assigned_characters": ["c1"]
    },
    {
      "index": 1,
      "title": "Shambhu Arrives",
      "location": "The doorstep, rain beginning",
      "key_beats": ["Landlord demands rent, Raju confesses about samosas", "Public humiliation as neighbours watch"],
      "assigned_characters": ["c1", "c2"]
    },
    {
      "index": 2,
      "title": "Maa Ka Saaya",
      "location": "The kitchen corner where one gas cylinder sits empty",
      "key_beats": ["Maa offers her gold bangles — the last ones", "Raju refuses, vows to fix everything"],
      "assigned_characters": ["c1", "c3"]
    }
  ],
  "poster_concept": {
    "visual_description": "Raju standing in pouring rain clutching an empty samosa cone, tears streaming, landlord's silhouette looming behind in a doorway, Maa's face soft in the background",
    "color_palette": ["#1a0a00", "#8B4513", "#D4AF37", "#87CEEB"],
    "main_subjects": ["Raju", "Samosa cone", "Landlord silhouette", "Rain"]
  }
}
`;

export const SCREENWRITER_EXAMPLE = `
SCENE OUTLINE:
- Index: 1
- Title: Shambhu Arrives
- Location: The doorstep, rain beginning
- Key beats: Landlord demands rent; Raju confesses about samosas; public humiliation

DIRECTOR PLAN CONTEXT:
Characters: Raju (protagonist, self-pitying), Shambhu (antagonist, cold moneylender)
Genre: 90s Hindi Melodrama
Mood anchor: thunder crashes on revelations, drenched rain confrontation

OUTPUT:
{
  "index": 1,
  "title": "Shambhu Arrives",
  "location": "The doorstep of Raju's chawl, Mumbai",
  "time_of_day": "Evening, monsoon downpour beginning",
  "mood": "Dread turning to shame",
  "description": "The chawl corridor fills with the sound of approaching footsteps. Raju, still licking samosa crumbs from his fingers, freezes. The door handle turns. Shambhu Lal steps in from the rain, umbrella folded with bureaucratic precision, ledger under arm. Neighbours appear at their doorways, drawn by the smell of impending spectacle.",
  "dialogues": [
    {
      "character_id": "c2",
      "line": "Raju bhai. The fourteenth. Today is the fourteenth.",
      "delivery": "Flat, no anger — the calm of a man who enjoys compound interest"
    },
    {
      "character_id": "c1",
      "line": "Shambhu ji, aap toh jaante hain... situation thodi... complicated hai is mahine.",
      "delivery": "Eyes darting, hands working through a series of explanatory gestures that explain nothing"
    },
    {
      "character_id": "c1",
      "line": "...(long pause)... I have... samosas.",
      "delivery": "Whispered confession. A tear rolls. Thunder strikes the exact syllable 'samosas'."
    }
  ],
  "tropes": ["Thunder strikes on punchline", "Rain confrontation", "Single silent tear"],
  "music_cue": "Slow tabla beat stops dead. Silence. Then a howling wind instrument begins."
}
`;
