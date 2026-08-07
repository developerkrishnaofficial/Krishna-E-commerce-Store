window.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".login-form form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.querySelector('input[name="email"]').value.trim();
    if (!email) return;

    const knownUsers = JSON.parse(localStorage.getItem("kj_users") || "[]");
    const isNewUser = !knownUsers.includes(email);
    if (isNewUser) {
      knownUsers.push(email);
      localStorage.setItem("kj_users", JSON.stringify(knownUsers));
    }

    localStorage.setItem("kj_loggedIn", "true");
    localStorage.setItem("kj_user", email);

    if (isNewUser) {
      localStorage.setItem("kj_spinEligible", "true");
      localStorage.removeItem("kj_spinClaimed");
    }

    window.location.href = "index.html";
  });

  const cancelBtn = form.querySelector(".cancelbtn");
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }
});
