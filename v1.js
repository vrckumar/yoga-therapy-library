const items = [
  {
    tier: "Foundation",
    title: "Chair neck movement",
    summary: "A low-barrier mobility item for posture checks, warmups, and gentle daily practice.",
    href: "practices/P0132/"
  },
  {
    tier: "Foundation",
    title: "Ankle bending",
    summary: "Simple distal movement for circulation awareness, joint mobility, and accessible starts.",
    href: "practices/P0003/"
  },
  {
    tier: "Breath",
    title: "Nadi Suddhi",
    summary: "A breathing practice placed here as a calm, reviewable pranayama sample.",
    href: "practices/P0069/"
  },
  {
    tier: "Breath",
    title: "Bhramari",
    summary: "Humming breath practice often used when the goal is quieting and inward attention.",
    href: "practices/P0071/"
  },
  {
    tier: "Posture",
    title: "Vrikshasana",
    summary: "A standing balance sample for attention, steadiness, and strength progression.",
    href: "practices/P0102/"
  },
  {
    tier: "Posture",
    title: "Setubandhasana",
    summary: "A back-body strengthening and chest-opening sample with modification potential.",
    href: "practices/P0101/"
  },
  {
    tier: "Relaxation",
    title: "Chair relaxation",
    summary: "A practical rest option when floor-based practice is not the right starting point.",
    href: "practices/P0135/"
  },
  {
    tier: "Relaxation",
    title: "DRT",
    summary: "A deep relaxation sample for rest, observation, and nervous-system settling.",
    href: "practices/P0123/"
  },
  {
    tier: "Lifestyle",
    title: "Psychological category",
    summary: "A public entry point for reviewing stress, mood, and behavior-oriented study notes.",
    href: "categories/psychological/"
  },
  {
    tier: "Condition Pathways",
    title: "Back pain pathway",
    summary: "A condition-oriented sample for studying how practices may be grouped and adapted.",
    href: "ailments/A004/"
  },
  {
    tier: "Condition Pathways",
    title: "Hypertension pathway",
    summary: "A cardiovascular sample for checking tone, cautions, and review structure.",
    href: "ailments/A005/"
  }
];

const list = document.querySelector("#itemList");
const search = document.querySelector("#itemSearch");

function renderItems(query = "") {
  const normalizedQuery = query.trim().toLowerCase();
  const filtered = items.filter((item) =>
    [item.tier, item.title, item.summary].join(" ").toLowerCase().includes(normalizedQuery)
  );

  list.innerHTML = "";

  if (filtered.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No MVP items match that filter.";
    list.append(empty);
    return;
  }

  filtered.forEach((item) => {
    const card = document.createElement("article");
    card.className = "item-card";
    card.innerHTML = `
      <span class="item-tier">${item.tier}</span>
      <div>
        <h3>${item.title}</h3>
        <p>${item.summary}</p>
      </div>
      <a href="${item.href}">Open</a>
    `;
    list.append(card);
  });
}

search.addEventListener("input", (event) => renderItems(event.target.value));
renderItems();
