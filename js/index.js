const hamburer = document.querySelector(".hamburger");
const navList = document.querySelector(".nav-list");

if (hamburer) {
  hamburer.addEventListener("click", () => {
    navList.classList.toggle("open");
  });
}

// Popup
const popup = document.querySelector(".popup");
const closePopup = document.querySelector(".popup-close");

if (popup) {
  closePopup.addEventListener("click", () => {
    popup.classList.add("hide-popup");
  });

  window.addEventListener("load", () => {
    setTimeout(() => {
      popup.classList.remove("hide-popup");
    }, 1000);
  });
}

// Cart Discount
const totalPriceBox = document.querySelector(".total-price table");

if (totalPriceBox) {
  const discountPercent = Number(localStorage.getItem("kj_discount") || 0);
  const rows = totalPriceBox.querySelectorAll("tr");
  const subtotalCell = rows[0].querySelector("td:last-child");
  const totalRow = rows[rows.length - 1];
  const totalCell = totalRow.querySelector("td:last-child");

  const toNumber = (text) => Number(text.replace(/[^\d.]/g, ""));
  const subtotal = toNumber(subtotalCell.textContent);

  if (discountPercent > 0) {
    const discountAmount = Math.round((subtotal * discountPercent) / 100);
    const discountRow = document.createElement("tr");
    discountRow.className = "cart-discount-row";
    discountRow.innerHTML =
      "<td>Discount (" + discountPercent + "%)</td><td>-₹" + discountAmount + "</td>";
    totalRow.parentNode.insertBefore(discountRow, totalRow);

    const newTotal = toNumber(totalCell.textContent) - discountAmount;
    totalCell.textContent = "₹" + newTotal;
  }
}
