/* ==========================================================
   Банк «Опора» — скрипты (чистый JavaScript, без библиотек)
   ========================================================== */
"use strict";

/* ---------- 1. Бургер-меню ---------- */
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");

if (burger && nav) {
  burger.addEventListener("click", () => {
    // toggle добавляет класс, если его нет, и убирает, если есть
    const isOpen = nav.classList.toggle("nav--open");
    // aria-expanded сообщает скринридеру, открыто ли меню
    burger.setAttribute("aria-expanded", String(isOpen));
  });
}

/* ---------- 2. Калькулятор вклада (deposits.html) ---------- */
const calc = document.querySelector("#calc");

if (calc) {
  const amountInput = calc.querySelector("#amount");
  const monthsInput = calc.querySelector("#months");
  const monthsOut = calc.querySelector("#months-out");
  const depositSelect = calc.querySelector("#deposit");
  const totalOut = calc.querySelector("#total");
  const incomeOut = calc.querySelector("#income");

  // Форматирование числа в рубли: 1234567 -> «1 234 567 ₽»
  const formatRub = (n) =>
    new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(n) + " ₽";

  function recalc() {
    const sum = Number(amountInput.value) || 0;
    const months = Number(monthsInput.value);
    const rate = Number(depositSelect.value) / 100; // годовая ставка, например 0.14

    // Сложный процент с ежемесячной капитализацией:
    // итог = сумма * (1 + ставка / 12) ^ месяцы
    const total = sum * Math.pow(1 + rate / 12, months);

    monthsOut.textContent = months;
    totalOut.textContent = formatRub(total);
    incomeOut.textContent = "Доход: " + formatRub(total - sum);
  }

  // Любое изменение поля пересчитывает результат
  [amountInput, monthsInput, depositSelect].forEach((el) =>
    el.addEventListener("input", recalc)
  );
  recalc(); // первый расчёт при загрузке страницы
}

/* ---------- 3. Форма заявки: проверка и сообщение ---------- */
const leadForm = document.querySelector("#lead-form");

if (leadForm) {
  leadForm.addEventListener("submit", (event) => {
    event.preventDefault(); // отключаем перезагрузку страницы (бэкенда нет)
    const msg = leadForm.querySelector(".form__msg");

    // checkValidity() проверяет атрибуты required, pattern, type
    if (!leadForm.checkValidity()) {
      msg.style.color = "#c0392b";
      msg.textContent = "Проверьте имя и телефон, затем отметьте согласие.";
      return;
    }
    msg.style.color = "";
    msg.textContent = "Заявка принята. Мы перезвоним в течение 15 минут.";
    leadForm.reset();
  });
}
