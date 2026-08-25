export function buildPlan(condition, humidity) {
  const isHumid = humidity >= 75;
  const serious = ["Psoriasis", "Tinea Capitis", "Alopecia Areata"].includes(
    condition,
  );
  const fungal = [
    "Tinea Capitis",
    "Seborrheic Dermatitis",
    "Folliculitis",
  ].includes(condition);

  // Task pools (adapt to condition + humidity)
  const scalpCare = fungal
    ? "Anti-fungal wash (tea tree / neem diluted)"
    : "Gentle scalp wash with mild shampoo";
  const oilTask = isHumid
    ? "Light oil only (avoid heavy oils in humidity)"
    : "Warm coconut oil scalp massage (20 min)";
  const climateTip = isHumid
    ? "High humidity - keep scalp dry, don't cover damp hair"
    : "Normal humidity - regular care is fine";

  return [
    {
      day: "Day 1",
      focus: "Cleanse & Assess",
      tasks: [scalpCare, "Take a scan photo to track progress", climateTip],
    },
    {
      day: "Day 2",
      focus: "Nourish",
      tasks: [
        oilTask,
        "Eat protein: eggs, fish, or green gram",
        "Drink 2L water",
      ],
    },
    {
      day: "Day 3",
      focus: "Treat",
      tasks: [
        fungal ? "Neem leaf paste (15 min)" : "Aloe vera gel soothing mask",
        "Scalp massage to boost circulation",
        "Avoid heat styling today",
      ],
    },
    {
      day: "Day 4",
      focus: "Rest & Hydrate",
      tasks: [
        "No wash today - let natural oils balance",
        "Eat biotin foods: nuts, seeds, spinach",
        climateTip,
      ],
    },
    {
      day: "Day 5",
      focus: "Cleanse",
      tasks: [
        scalpCare,
        "Gentle wide-tooth comb only",
        "Iron-rich meal (mukunuwenna / spinach)",
      ],
    },
    {
      day: "Day 6",
      focus: "Deep Care",
      tasks: [
        oilTask,
        fungal ? "Curd + lemon rinse (balance scalp)" : "Fenugreek hair pack",
        "8 hours sleep for hair regrowth",
      ],
    },
    {
      day: "Day 7",
      focus: "Review",
      tasks: [
        "Take a scan photo - compare with Day 1",
        "Note any changes in the Progress Tracker",
        serious
          ? "Book a dermatologist check if no improvement"
          : "Plan next week's routine",
      ],
    },
  ];
}
