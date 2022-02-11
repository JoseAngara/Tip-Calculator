function getCoords(elem) {
    let box = elem.getBoundingClientRect();

    return {
        top: box.top + window.pageYOffset,
        right: box.right + window.pageXOffset,
        bottom: box.bottom + window.pageYOffset,
        left: box.left + window.pageXOffset
    };
}

const billInput = document.getElementById('bill');
const peopleInput = document.getElementById('peopleNumber');
const customPercent = document.getElementById('customPercent');
const resetButton = document.getElementById('reset');

let message = document.createElement("span");
message.className = "error";
message.innerHTML = "Can't be 0";

customPercent.addEventListener('click', () => {
    document.querySelector("input[type='radio']:checked").checked = false;
});

const form = document.querySelector("form");

form.addEventListener("keypress", (event) => {
    if (event.keyCode === 13) {
        let data = new Promise((resolve, reject) => {
            let bill = + billInput.value;
            let percent = + customPercent.value || +document.querySelector("input[type='radio']:checked").value;
            let people = + peopleInput.value;

            if (people === 0) {
                reject(new Error("People can't be 0"));
            } else {
                peopleInput.classList.remove("invalid-input");
                message.remove();
                resolve([bill, percent, people]);
            }
        });

        data.then((values) => {
            let tip = document.getElementById('tipAmount');
            let total = document.getElementById('total');

            tip.innerHTML = `$${((values[0] * values[1]) / (values[2] * 100)).toFixed(2)}`;
            total.innerHTML = `$${((values[0] * (values[1] / 100 + 1)) / values[2]).toFixed(2)}`;

            let reset = document.getElementById('reset');
            reset.disabled = false;
        }, () => {
            let label = document.querySelector("label[for='peopleNumber']");
            let coords = getCoords(label);
            message.style.top = coords.top + "px";
            message.style.right = coords.right + 20 + "px";

            form.appendChild(message);
            peopleInput.classList.add("invalid-input");
            peopleInput.value = "";
        });
    }
});

resetButton.addEventListener("click", () => {
    billInput.value = "";
    peopleInput.value = "";
    customPercent.value = "";
    resetButton.disabled = true;
    let tip = document.getElementById('tipAmount').innerHTML = "$0.00";
    let total = document.getElementById('total').innerHTML = "$0.00";
    document.querySelector("input[type='radio']:checked").checked = false;
})

