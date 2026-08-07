const SPIN_SEGMENTS = [10, 5, 15, 0, 20, 10, 25, 5];

function kjBuildWheelLabels(wheelEl) {
  const radius = 90;
  const center = 130;
  SPIN_SEGMENTS.forEach((value, i) => {
    const angle = i * 45 + 22.5;
    const rad = (angle * Math.PI) / 180;
    const x = center + radius * Math.sin(rad);
    const y = center - radius * Math.cos(rad);
    const label = document.createElement("span");
    label.textContent = value === 0 ? "Try Again" : value + "% OFF";
    label.style.left = x + "px";
    label.style.top = y + "px";
    label.style.transform = "translate(-50%, -50%)";
    label.style.fontSize = value === 0 ? "1.1rem" : "1.4rem";
    wheelEl.appendChild(label);
  });
}

function kjShowSpinFab() {
  if (document.querySelector(".spin-fab")) return;

  const fab = document.createElement("button");
  fab.className = "spin-fab";
  fab.innerHTML = '<i class="bx bx-gift"></i> Spin & Win';
  document.body.appendChild(fab);

  const overlay = document.createElement("div");
  overlay.className = "spin-overlay hide-popup";
  overlay.innerHTML = `
    <div class="spin-modal">
      <div class="spin-close"><i class="bx bx-x"></i></div>
      <h2>Spin & Win a Discount</h2>
      <p>Welcome! Spin once to unlock your exclusive Krishna Ji discount.</p>
      <div class="wheel-wrap">
        <div class="wheel-pointer"></div>
        <div class="wheel"></div>
      </div>
      <button class="spin-btn">SPIN NOW</button>
      <div class="spin-result"></div>
    </div>
  `;
  document.body.appendChild(overlay);

  const wheelEl = overlay.querySelector(".wheel");
  kjBuildWheelLabels(wheelEl);

  const closeModal = () => overlay.classList.add("hide-popup");
  overlay.querySelector(".spin-close").addEventListener("click", closeModal);

  fab.addEventListener("click", () => overlay.classList.remove("hide-popup"));

  const spinBtn = overlay.querySelector(".spin-btn");
  const resultEl = overlay.querySelector(".spin-result");
  let rotation = 0;

  spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true;
    const winIndex = Math.floor(Math.random() * SPIN_SEGMENTS.length);
    const discount = SPIN_SEGMENTS[winIndex];
    const segCenter = winIndex * 45 + 22.5;
    const fullSpins = 5 * 360;
    rotation = fullSpins + (360 - segCenter);
    wheelEl.style.transform = "rotate(" + rotation + "deg)";

    setTimeout(() => {
      localStorage.setItem("kj_spinClaimed", "true");
      if (discount > 0) {
        localStorage.setItem("kj_discount", String(discount));
        resultEl.textContent =
          "Congratulations! You won " + discount + "% OFF. Applied to your cart automatically.";
      } else {
        localStorage.removeItem("kj_discount");
        resultEl.textContent = "So close! No discount this time, but thanks for playing.";
      }
      fab.remove();
      setTimeout(closeModal, 2500);
    }, 4200);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("kj_loggedIn") === "true";
  const isEligible = localStorage.getItem("kj_spinEligible") === "true";
  const alreadyClaimed = localStorage.getItem("kj_spinClaimed") === "true";

  if (isLoggedIn && isEligible && !alreadyClaimed) {
    kjShowSpinFab();
  }
});
