// TropiHair - Condition-specific recommendation knowledge base
// Sri Lankan / tropical context. Supportive care only - not medical treatment.

export const RECOMMENDATIONS = {
  "Alopecia Areata": {
    severity: "high",
    seeDoctor: true,
    doctorNote:
      "Alopecia Areata is an autoimmune condition. Please consult a dermatologist - medical treatment is usually required. The suggestions below support scalp health but do not treat the condition.",
    summary:
      "An autoimmune condition where the immune system attacks hair follicles, causing round patches of hair loss.",
    oils: [
      {
        name: "Coconut Oil",
        emoji: "🥥",
        usage: "Warm slightly, massage gently into patches",
        duration: "20-30 minutes, 3 times a week",
        benefit: "Keeps scalp moisturised and reduces irritation",
      },
      {
        name: "Rosemary Oil (diluted)",
        emoji: "🌿",
        usage: "3-4 drops in 2 tbsp coconut oil",
        duration: "Leave 30 minutes, twice a week",
        benefit: "Studies suggest it may support hair regrowth",
      },
    ],
    hairPacks: [
      {
        name: "Aloe Vera Gel",
        emoji: "🌵",
        recipe: "Fresh aloe gel applied directly to patches",
        duration: "30 minutes, then rinse",
        benefit: "Soothes inflammation, calms the scalp",
      },
    ],
    foods: [
      {
        name: "Green gram (mung)",
        emoji: "🫘",
        why: "Protein and zinc for follicle health",
      },
      {
        name: "Gotu kola (vallarai)",
        emoji: "🥬",
        why: "Rich in antioxidants, traditional Sri Lankan green",
      },
      { name: "Eggs", emoji: "🥚", why: "Biotin and protein" },
      {
        name: "Fish (thora, balaya)",
        emoji: "🐟",
        why: "Omega-3 reduces inflammation",
      },
    ],
    avoid: [
      "Harsh chemical treatments and hair dyes",
      "Tight hairstyles that pull on the scalp",
      "Aggressive brushing over affected patches",
    ],
    careTips: [
      "Manage stress - it is a known trigger for flare-ups",
      "Protect patches from direct sun with a light cap",
      "Take photographs weekly to track patch size",
    ],
  },

  Folliculitis: {
    severity: "moderate",
    seeDoctor: true,
    doctorNote:
      "If bumps are painful, spreading, or filled with pus, see a doctor - antibiotics may be needed.",
    summary:
      "Inflammation or infection of hair follicles, showing as small red bumps. Common in humid climates.",
    oils: [
      {
        name: "Tea Tree Oil (diluted)",
        emoji: "🌱",
        usage: "3-4 drops in 2 tbsp carrier oil",
        duration: "Apply 20 minutes before washing, twice a week",
        benefit: "Natural antibacterial and antifungal properties",
      },
      {
        name: "Neem Oil (diluted)",
        emoji: "🍃",
        usage: "Mix 1 part neem with 3 parts coconut oil",
        duration: "20 minutes, twice a week",
        benefit: "Traditional antibacterial remedy",
      },
    ],
    hairPacks: [
      {
        name: "Neem Leaf Paste",
        emoji: "🍃",
        recipe: "Grind fresh neem leaves with a little water",
        duration: "15-20 minutes, then rinse well",
        benefit: "Reduces bacterial load on the scalp",
      },
      {
        name: "Turmeric + Curd",
        emoji: "🥛",
        recipe: "1 tsp turmeric in 3 tbsp curd",
        duration: "20 minutes",
        benefit: "Anti-inflammatory and soothing",
      },
    ],
    foods: [
      { name: "Garlic", emoji: "🧄", why: "Natural antibacterial support" },
      { name: "Turmeric", emoji: "🟡", why: "Anti-inflammatory" },
      {
        name: "Curd / yoghurt",
        emoji: "🥛",
        why: "Probiotics support immunity",
      },
      { name: "Citrus fruits", emoji: "🍊", why: "Vitamin C aids healing" },
    ],
    avoid: [
      "Heavy oils that block follicles (thick castor oil, petroleum jelly)",
      "Sharing combs, towels, or helmets",
      "Scratching or picking at the bumps",
      "Sweaty caps worn for long periods",
    ],
    careTips: [
      "Wash hair after sweating heavily",
      "Keep pillowcases and towels clean",
      "Use a mild, non-comedogenic shampoo",
    ],
  },

  "Head Lice": {
    severity: "moderate",
    seeDoctor: false,
    doctorNote:
      "If home treatment fails after two rounds, or the scalp becomes infected, consult a pharmacist or doctor.",
    summary:
      "A common parasitic infestation, especially among school-age children. Highly treatable but very contagious.",
    oils: [
      {
        name: "Coconut Oil + Neem",
        emoji: "🥥",
        usage: "Coat hair thoroughly, cover with a cap",
        duration: "Leave 2 hours, then comb with a fine nit comb",
        benefit: "Suffocates lice and eases combing",
      },
      {
        name: "Tea Tree Oil (diluted)",
        emoji: "🌱",
        usage: "5 drops in 2 tbsp coconut oil",
        duration: "1 hour before washing",
        benefit: "Repellent properties",
      },
    ],
    hairPacks: [
      {
        name: "Neem Leaf Rinse",
        emoji: "🍃",
        recipe: "Boil neem leaves, cool the water, use as a final rinse",
        duration: "After washing",
        benefit: "Traditional lice deterrent",
      },
    ],
    foods: [
      {
        name: "Balanced diet",
        emoji: "🍛",
        why: "No specific diet - focus on physical removal",
      },
    ],
    avoid: [
      "Sharing combs, pillows, hats, or hair accessories",
      "Kerosene or other dangerous home remedies",
      "Skipping the repeat treatment after 7 days",
    ],
    careTips: [
      "Use a fine-toothed nit comb every day for two weeks",
      "Wash bedding and towels in hot water",
      "Check all family members on the same day",
      "Repeat treatment after 7 days to catch newly hatched eggs",
    ],
  },

  "Male Pattern Baldness": {
    severity: "low",
    seeDoctor: false,
    doctorNote:
      "For medical treatment options such as minoxidil or finasteride, consult a dermatologist. Early treatment gives better results.",
    summary:
      "Genetic hair thinning following a typical pattern (receding hairline and crown). Progressive but manageable.",
    oils: [
      {
        name: "Rosemary Oil (diluted)",
        emoji: "🌿",
        usage: "4-5 drops in 2 tbsp coconut oil, massage into thinning areas",
        duration: "30 minutes, 3 times a week",
        benefit: "Some studies compare it favourably with minoxidil",
      },
      {
        name: "Coconut Oil",
        emoji: "🥥",
        usage: "Massage into scalp with fingertips",
        duration: "20 minutes before washing",
        benefit: "Improves circulation and reduces breakage",
      },
    ],
    hairPacks: [
      {
        name: "Onion Juice",
        emoji: "🧅",
        recipe: "Strained fresh onion juice applied to the scalp",
        duration: "15-20 minutes, twice a week",
        benefit: "Sulphur content may support follicle activity",
      },
    ],
    foods: [
      { name: "Eggs", emoji: "🥚", why: "Biotin and protein" },
      {
        name: "Pumpkin seeds",
        emoji: "🎃",
        why: "Zinc and natural DHT support",
      },
      { name: "Spinach / mukunuwenna", emoji: "🥬", why: "Iron and folate" },
      { name: "Fish", emoji: "🐟", why: "Omega-3 fatty acids" },
    ],
    avoid: [
      "Excessive heat styling",
      "Tight hairstyles",
      "Crash dieting - sudden nutrient loss worsens shedding",
    ],
    careTips: [
      "Daily 5-minute scalp massage improves blood flow",
      "Start treatment early - earlier action preserves more hair",
      "Track progress with monthly photos in the same lighting",
    ],
  },

  "Normal Healthy": {
    severity: "none",
    seeDoctor: false,
    doctorNote: "",
    summary:
      "Your scalp shows no signs of the conditions this app screens for. Keep up your current routine.",
    oils: [
      {
        name: "Coconut Oil",
        emoji: "🥥",
        usage: "Warm and massage before washing",
        duration: "30 minutes, twice a week",
        benefit: "Maintains moisture and prevents protein loss",
      },
      {
        name: "Sesame Oil",
        emoji: "🌰",
        usage: "Light massage, especially in dry weather",
        duration: "20 minutes, once a week",
        benefit: "Traditional cooling oil for tropical climates",
      },
    ],
    hairPacks: [
      {
        name: "Curd + Honey",
        emoji: "🍯",
        recipe: "3 tbsp curd with 1 tsp honey",
        duration: "20 minutes",
        benefit: "Gentle conditioning",
      },
    ],
    foods: [
      { name: "Coconut", emoji: "🥥", why: "Healthy fats" },
      {
        name: "Green leaves (gotu kola, mukunuwenna)",
        emoji: "🥬",
        why: "Iron and antioxidants",
      },
      { name: "Fish", emoji: "🐟", why: "Omega-3 and protein" },
      { name: "Nuts and seeds", emoji: "🥜", why: "Vitamin E and zinc" },
    ],
    avoid: [
      "Over-washing (strips natural oils)",
      "Very hot water",
      "Frequent chemical treatments",
    ],
    careTips: [
      "Wash 2-3 times a week with a mild shampoo",
      "Dry naturally where possible",
      "Rescan monthly to catch changes early",
    ],
  },

  Psoriasis: {
    severity: "high",
    seeDoctor: true,
    doctorNote:
      "Scalp psoriasis is a chronic autoimmune condition. A dermatologist should confirm the diagnosis and prescribe treatment. The suggestions below only ease symptoms.",
    summary:
      "An autoimmune condition causing thick, scaly, silvery patches on the scalp. Chronic but manageable.",
    oils: [
      {
        name: "Coconut Oil",
        emoji: "🥥",
        usage: "Warm and apply generously to scaly areas",
        duration: "Leave overnight if possible, then gently loosen scales",
        benefit: "Softens plaques and reduces scaling",
      },
      {
        name: "Olive Oil",
        emoji: "🫒",
        usage: "Massage into affected areas",
        duration: "1 hour before washing",
        benefit: "Moisturises and lifts scale",
      },
    ],
    hairPacks: [
      {
        name: "Aloe Vera Gel",
        emoji: "🌵",
        recipe: "Fresh aloe gel applied to plaques",
        duration: "30 minutes, daily if tolerated",
        benefit: "Reduces redness and itching",
      },
      {
        name: "Oatmeal Paste",
        emoji: "🥣",
        recipe: "Ground oats mixed with warm water",
        duration: "15 minutes",
        benefit: "Soothes irritated skin",
      },
    ],
    foods: [
      { name: "Fatty fish", emoji: "🐟", why: "Omega-3 reduces inflammation" },
      { name: "Turmeric", emoji: "🟡", why: "Anti-inflammatory curcumin" },
      { name: "Leafy greens", emoji: "🥬", why: "Antioxidants" },
      {
        name: "Coconut water",
        emoji: "🥥",
        why: "Hydration supports skin barrier",
      },
    ],
    avoid: [
      "Coal tar shampoos without medical advice",
      "Scratching or forcibly removing scales",
      "Alcohol and highly processed foods (known triggers for some)",
      "Harsh sulphate shampoos",
    ],
    careTips: [
      "Identify and record personal triggers (stress, weather, diet)",
      "Keep the scalp moisturised at all times",
      "Short, controlled sun exposure may help - avoid burning",
    ],
  },

  "Seborrheic Dermatitis": {
    severity: "moderate",
    seeDoctor: false,
    doctorNote:
      "If flaking is severe or does not improve in 4 weeks, a doctor may prescribe an antifungal shampoo.",
    summary:
      "A common condition causing flaky, oily, itchy patches - closely related to dandruff. Worsens in humidity.",
    oils: [
      {
        name: "Tea Tree Oil (diluted)",
        emoji: "🌱",
        usage: "4 drops in 2 tbsp coconut oil",
        duration: "20 minutes before washing, twice a week",
        benefit: "Antifungal action against Malassezia yeast",
      },
      {
        name: "Neem Oil (diluted)",
        emoji: "🍃",
        usage: "1 part neem to 3 parts coconut oil",
        duration: "20 minutes, twice a week",
        benefit: "Traditional antifungal remedy",
      },
    ],
    hairPacks: [
      {
        name: "Fenugreek Paste",
        emoji: "🌱",
        recipe: "Soak seeds overnight, grind to a paste",
        duration: "30 minutes",
        benefit: "Reduces flaking and soothes itch",
      },
      {
        name: "Curd + Lemon",
        emoji: "🍋",
        recipe: "3 tbsp curd with a few drops of lemon",
        duration: "15 minutes",
        benefit: "Balances scalp pH",
      },
    ],
    foods: [
      {
        name: "Curd / yoghurt",
        emoji: "🥛",
        why: "Probiotics balance skin flora",
      },
      { name: "Garlic", emoji: "🧄", why: "Natural antifungal support" },
      {
        name: "Zinc-rich foods (pumpkin seeds)",
        emoji: "🎃",
        why: "Zinc regulates oil production",
      },
      { name: "Green tea", emoji: "🍵", why: "Antioxidants" },
    ],
    avoid: [
      "Heavy oils left on for long periods (feed the yeast)",
      "Sugary and very oily foods",
      "Infrequent washing",
      "Scratching the flakes",
    ],
    careTips: [
      "Wash more often in humid weather - 3-4 times a week",
      "Dry the scalp thoroughly after washing",
      "Avoid leaving hair damp under a cap",
    ],
  },

  "Telogen Effluvium": {
    severity: "moderate",
    seeDoctor: false,
    doctorNote:
      "If shedding continues beyond 6 months, ask a doctor to check iron, thyroid, and vitamin D levels.",
    summary:
      "Temporary excessive shedding triggered by stress, illness, childbirth, or nutritional deficiency. Usually reversible.",
    oils: [
      {
        name: "Coconut Oil",
        emoji: "🥥",
        usage: "Gentle massage - avoid pulling",
        duration: "20 minutes, twice a week",
        benefit: "Strengthens the hair shaft and reduces breakage",
      },
      {
        name: "Sesame Oil",
        emoji: "🌰",
        usage: "Warm and massage lightly",
        duration: "30 minutes weekly",
        benefit: "Nourishes the scalp, traditionally calming",
      },
    ],
    hairPacks: [
      {
        name: "Fenugreek + Curd",
        emoji: "🌱",
        recipe: "Soaked fenugreek paste mixed with curd",
        duration: "30 minutes, once a week",
        benefit: "Protein support for weakened strands",
      },
    ],
    foods: [
      {
        name: "Iron-rich foods (green gram, spinach)",
        emoji: "🫘",
        why: "Iron deficiency is a leading cause",
      },
      { name: "Eggs", emoji: "🥚", why: "Protein and biotin" },
      { name: "Fish", emoji: "🐟", why: "Omega-3 and vitamin D" },
      { name: "Nuts", emoji: "🥜", why: "Zinc and selenium" },
      {
        name: "Citrus",
        emoji: "🍊",
        why: "Vitamin C improves iron absorption",
      },
    ],
    avoid: [
      "Crash diets and skipping meals",
      "Tight hairstyles and aggressive towel-drying",
      "Heat styling while shedding is active",
    ],
    careTips: [
      "Identify the trigger - shedding often starts 2-3 months after the event",
      "Be patient; regrowth typically begins within 3-6 months",
      "Manage stress through sleep and regular routine",
      "Use a wide-tooth comb and handle hair gently",
    ],
  },

  "Tinea Capitis": {
    severity: "high",
    seeDoctor: true,
    doctorNote:
      "Tinea Capitis is a fungal infection that requires prescription oral antifungal medication. Topical remedies alone will not cure it. Please see a doctor promptly - it is contagious.",
    summary:
      "A fungal infection of the scalp (ringworm), showing as scaly patches with hair loss. Common in humid tropical climates and among children.",
    oils: [
      {
        name: "Tea Tree Oil (diluted)",
        emoji: "🌱",
        usage: "4 drops in 2 tbsp coconut oil - supportive only",
        duration: "20 minutes before washing",
        benefit: "Mild antifungal support alongside medical treatment",
      },
      {
        name: "Neem Oil (diluted)",
        emoji: "🍃",
        usage: "1 part neem to 3 parts coconut oil",
        duration: "20 minutes, twice a week",
        benefit: "Traditional antifungal support",
      },
    ],
    hairPacks: [
      {
        name: "Neem Leaf Paste",
        emoji: "🍃",
        recipe: "Fresh neem leaves ground with water",
        duration: "15 minutes, then rinse thoroughly",
        benefit: "Antifungal support - not a replacement for medication",
      },
    ],
    foods: [
      { name: "Garlic", emoji: "🧄", why: "Natural antifungal properties" },
      {
        name: "Curd / yoghurt",
        emoji: "🥛",
        why: "Probiotics support immunity",
      },
      { name: "Turmeric", emoji: "🟡", why: "Anti-inflammatory" },
      { name: "Vitamin C fruits", emoji: "🍊", why: "Immune support" },
    ],
    avoid: [
      "Sharing combs, towels, pillows, or caps - it spreads easily",
      "Keeping the scalp damp or covered for long periods",
      "Relying on home remedies alone",
      "Delaying medical treatment - it can cause permanent scarring",
    ],
    careTips: [
      "See a doctor promptly - oral antifungals are usually required",
      "Wash bedding and hats in hot water",
      "Check family members and household pets",
      "Keep the scalp clean and dry, especially in humid weather",
    ],
  },
};

// Fallback for any condition not in the list
export const DEFAULT_RECOMMENDATION = {
  severity: "none",
  seeDoctor: false,
  doctorNote: "",
  summary: "Scan your scalp to receive personalised recommendations.",
  oils: [],
  hairPacks: [],
  foods: [],
  avoid: [],
  careTips: [],
};

export function getRecommendation(condition) {
  return RECOMMENDATIONS[condition] || DEFAULT_RECOMMENDATION;
}
