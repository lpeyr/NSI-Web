valueChanged();
function valueChanged() {
    let distance = document.getElementById("distance");
    let masse = document.getElementById("masse");
    let slider = document.getElementById("slider");

    switch (getMode()) {
        case "walk":
            distance.innerHTML = slider.value;
            masse.innerHTML = 0;
            break;
        case "car":
            distance.innerHTML = slider.value;
            masse.innerHTML = Math.floor(120e-3 * slider.value);
            break;
        case "elec":
            distance.innerHTML = slider.value;
            masse.innerHTML = Math.floor(53e-3 * slider.value);
            break;
        case "tc":
            distance.innerHTML = slider.value;
            masse.innerHTML = Math.floor(68e-3 * slider.value);
            break;
        default:
            break;
    }
}

function getMode() {
    let walk = document.getElementById("marche");
    let car = document.getElementById("voiture");
    let elec = document.getElementById("elec");
    let tc = document.getElementById("tc");

    if (walk.checked) return "walk";
    else if (car.checked) return "car";
    else if (elec.checked) return "elec";
    else if (tc.checked) return "tc";
    else return "walk"; // par défaut
}