const items = [
  {
    id: "chair-neck",
    tier: "Foundation",
    title: "Chair neck movement",
    goal: "Mobility",
    summary: "Accessible neck movement for posture checks, warmups, and gentle daily practice.",
    caution: "Keep the range small. Stop with dizziness, radiating pain, or numbness.",
    href: "practices/P0132/"
  },
  {
    id: "ankle-bending",
    tier: "Foundation",
    title: "Ankle bending",
    goal: "Circulation",
    summary: "Distal joint movement for circulation awareness and low-barrier starts.",
    caution: "Use a comfortable pace and avoid forcing swollen or painful joints.",
    href: "practices/P0003/"
  },
  {
    id: "nadi-suddhi",
    tier: "Breath",
    title: "Nadi Suddhi",
    goal: "Regulation",
    summary: "A calm pranayama reference for breath awareness and steady attention.",
    caution: "Avoid breath strain. Keep the inhale and exhale comfortable.",
    href: "practices/P0069/"
  },
  {
    id: "bhramari",
    tier: "Breath",
    title: "Bhramari",
    goal: "Calming",
    summary: "Humming breath practice often used for quieting and inward attention.",
    caution: "Reduce volume or stop if vibration, pressure, or anxiety increases.",
    href: "practices/P0071/"
  },
  {
    id: "vrikshasana",
    tier: "Posture",
    title: "Vrikshasana",
    goal: "Balance",
    summary: "Standing balance practice for attention, steadiness, and strength progression.",
    caution: "Use wall or chair support when balance is uncertain.",
    href: "practices/P0102/"
  },
  {
    id: "setubandhasana",
    tier: "Posture",
    title: "Setubandhasana",
    goal: "Strength",
    summary: "Back-body strengthening and chest-opening practice with modification potential.",
    caution: "Avoid neck pressure. Use support or skip during acute back or neck pain.",
    href: "practices/P0101/"
  },
  {
    id: "chair-relaxation",
    tier: "Relaxation",
    title: "Chair relaxation",
    goal: "Rest",
    summary: "Practical rest option when floor-based practice is not the right starting point.",
    caution: "Choose a stable chair and keep the breath natural.",
    href: "practices/P0135/"
  },
  {
    id: "drt",
    tier: "Relaxation",
    title: "DRT",
    goal: "Recovery",
    summary: "Deep relaxation practice for rest, observation, and nervous-system settling.",
    caution: "Modify position if lying still increases discomfort or distress.",
    href: "practices/P0123/"
  },
  {
    id: "psychological",
    tier: "Lifestyle",
    title: "Psychological category",
    goal: "Context",
    summary: "Entry point for stress, mood, and behavior-oriented study notes.",
    caution: "Use as educational context, not as diagnosis or mental-health treatment.",
    href: "categories/psychological/"
  },
  {
    id: "back-pain",
    tier: "Condition Pathways",
    title: "Back pain pathway",
    goal: "Study",
    summary: "Condition-oriented reference for grouped and adapted practices.",
    caution: "Pain, numbness, weakness, or worsening symptoms require reassessment.",
    href: "ailments/A004/"
  },
  {
    id: "hypertension",
    tier: "Condition Pathways",
    title: "Hypertension pathway",
    goal: "Study",
    summary: "Cardiovascular reference with caution and adaptation notes.",
    caution: "Avoid strain and breath retention unless cleared and supervised.",
    href: "ailments/A005/"
  }
];

const tiers = ["All", ...new Set(items.map((item) => item.tier))];
const state = {
  query: "",
  tier: "All",
  selectedId: items[0].id,
  sequence: []
};

const tierTabs = document.querySelector("#tierTabs");
const itemList = document.querySelector("#itemList");
const search = document.querySelector("#itemSearch");
const resultCount = document.querySelector("#resultCount");
const resetFilters = document.querySelector("#resetFilters");
const detailEmpty = document.querySelector("#detailEmpty");
const detailCard = document.querySelector("#detailCard");
const detailTier = document.querySelector("#detailTier");
const detailTitle = document.querySelector("#detailTitle");
const detailSummary = document.querySelector("#detailSummary");
const detailGoal = document.querySelector("#detailGoal");
const detailCaution = document.querySelector("#detailCaution");
const detailLink = document.querySelector("#detailLink");
const addSelected = document.querySelector("#addSelected");
const sequenceList = document.querySelector("#sequenceList");
const clearSequence = document.querySelector("#clearSequence");
const metricItems = document.querySelector("#metricItems");
const metricSelected = document.querySelector("#metricSelected");

function selectedItem() {
  return items.find((item) => item.id === state.selectedId);
}

function filteredItems() {
  const query = state.query.trim().toLowerCase();
  return items.filter((item) => {
    const haystack = [item.tier, item.title, item.goal, item.summary, item.caution]
      .join(" ")
      .toLowerCase();
    return (state.tier === "All" || item.tier === state.tier) && haystack.includes(query);
  });
}

function renderTabs() {
  tierTabs.innerHTML = "";
  tiers.forEach((tier) => {
    const button = document.createElement("button");
    button.className = "tier-tab";
    button.type = "button";
    button.textContent = tier;
    button.classList.toggle("active", tier === state.tier);
    button.addEventListener("click", () => {
      state.tier = tier;
      render();
    });
    tierTabs.append(button);
  });
}

function renderList() {
  const visible = filteredItems();
  itemList.innerHTML = "";
  resultCount.textContent = `${visible.length} ${visible.length === 1 ? "item" : "items"}`;

  if (visible.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No practices match the current filters.";
    itemList.append(empty);
    return;
  }

  if (!visible.some((item) => item.id === state.selectedId)) {
    state.selectedId = visible[0].id;
  }

  visible.forEach((item) => {
    const button = document.createElement("button");
    button.className = "item-card";
    button.type = "button";
    button.classList.toggle("selected", item.id === state.selectedId);
    button.innerHTML = `
      <span class="item-tier">${item.tier}</span>
      <div>
        <h3>${item.title}</h3>
        <p>${item.summary}</p>
      </div>
      <span class="item-goal">${item.goal}</span>
    `;
    button.addEventListener("click", () => {
      state.selectedId = item.id;
      render();
    });
    itemList.append(button);
  });
}

function renderDetail() {
  const item = selectedItem();
  detailEmpty.classList.toggle("hidden", Boolean(item));
  detailCard.classList.toggle("hidden", !item);

  if (!item) {
    return;
  }

  detailTier.textContent = item.tier;
  detailTitle.textContent = item.title;
  detailSummary.textContent = item.summary;
  detailGoal.textContent = item.goal;
  detailCaution.textContent = item.caution;
  detailLink.href = item.href;
  addSelected.disabled = state.sequence.includes(item.id);
  addSelected.textContent = state.sequence.includes(item.id) ? "Added to sequence" : "Add to sequence";
}

function renderSequence() {
  sequenceList.innerHTML = "";
  metricSelected.textContent = state.sequence.length;

  if (state.sequence.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Select practices from the finder to build a short sequence.";
    sequenceList.append(empty);
    return;
  }

  state.sequence
    .map((id) => items.find((item) => item.id === id))
    .filter(Boolean)
    .forEach((item, index) => {
      const row = document.createElement("article");
      row.className = "sequence-item";
      row.innerHTML = `
        <div>
          <strong>${index + 1}. ${item.title}</strong>
          <span>${item.tier} / ${item.goal}</span>
        </div>
        <button class="remove-button" type="button" aria-label="Remove ${item.title}">x</button>
      `;
      row.querySelector("button").addEventListener("click", () => {
        state.sequence = state.sequence.filter((id) => id !== item.id);
        render();
      });
      sequenceList.append(row);
    });
}

function render() {
  metricItems.textContent = items.length;
  renderTabs();
  renderList();
  renderDetail();
  renderSequence();
}

search.addEventListener("input", (event) => {
  state.query = event.target.value;
  render();
});

resetFilters.addEventListener("click", () => {
  state.query = "";
  state.tier = "All";
  search.value = "";
  render();
});

addSelected.addEventListener("click", () => {
  const item = selectedItem();
  if (item && !state.sequence.includes(item.id)) {
    state.sequence.push(item.id);
    render();
  }
});

clearSequence.addEventListener("click", () => {
  state.sequence = [];
  render();
});

render();
