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

    inputField.addEventListener("blur", function handler() {
        let customTip = parseFloat(inputField.value);
        if (!isNaN(customTip) && customTip >= 0) {
            tipPercent = customTip;
            button.textContent = `${customTip}%`;
        } else {
            button.textContent = "Custom";
        }
        inputField.style.display = "none";
        button.style.display = "inline-block";
        inputField.removeEventListener("blur", handler);
    }, { once: true });
});

function calculate() {
    let bill = parseFloat(document.getElementById("bill").value);
    let peopleCount = parseInt(document.getElementById("peopleCount").value);

    if (isNaN(bill) || isNaN(peopleCount) || peopleCount <= 0) {
        return;
    }

    let tipAmount = (bill * tipPercent) / 100;
    let total = (bill + tipAmount) / peopleCount;

    document.querySelector(".number_tip").innerText = "$" + (tipAmount / peopleCount).toFixed(2);
    document.querySelector(".number_total").innerText = "$" + total.toFixed(2);
}
