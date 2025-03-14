let tipPercent = 0;

function setTip(percent) {
    tipPercent = percent;
}

document.getElementById("customButton").addEventListener("click", function () {
    let inputField = document.getElementById("customTip");
    let button = document.getElementById("customButton");

    inputField.style.display = "inline-block";
    button.style.display = "none";
    inputField.focus();

    function applyTip() {
        let customTip = parseFloat(inputField.value);
        if (!isNaN(customTip) && customTip >= 0) {
            setTip(customTip); // Обновляем глобальный tipPercent
            button.textContent = `${customTip}%`;
        } else {
            button.textContent = "Custom";
        }
        inputField.style.display = "none";
        button.style.display = "inline-block";
        button.focus();

        // Удаляем обработчики
        inputField.removeEventListener("blur", applyTip);
        inputField.removeEventListener("keydown", enterHandler);
    }

    function enterHandler(event) {
        if (event.key === "Enter") {
            applyTip();
            calculate(); // Пересчет суммы после изменения чаевых
        }
    }

    inputField.addEventListener("blur", applyTip, { once: true });
    inputField.addEventListener("keydown", enterHandler);
});

function calculate() {
    let bill = parseFloat(document.getElementById("bill").value);
    let peopleInput = document.getElementById("peopleCount"); // Добавил объявление
    let peopleCount = parseInt(peopleInput.value);
    let errorText = document.querySelector(".error_text");

    if (isNaN(bill) || isNaN(peopleCount) || peopleCount <= 0) {
        errorText.style.display = "block"; 
        peopleInput.classList.add("error"); // Добавить красную границу
        return;
    } else {
        errorText.style.display = "none";
        peopleInput.classList.remove("error"); // Убрать красную границу
    }

    let tipAmount = (bill * tipPercent) / 100;
    let total = (bill + tipAmount) / peopleCount;

    document.querySelector(".number_tip").innerText = "$" + (tipAmount / peopleCount).toFixed(2);
    document.querySelector(".number_total").innerText = "$" + total.toFixed(2);
}
