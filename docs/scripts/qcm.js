function qcm() {
    let score = 0; // initialiser le score
    let scoreTxt = document.getElementById("score-txt"); // récupérer l'élément qui affiche le score
    let ids = ["1B", "2A", "3C", "4A", "5A"]; // bonnes réponses

    let inputs = document.getElementsByTagName("input"); // récupérer tous les input de la page

    // vérifier si l'utilisteur a répondu à toutes les questions
    if (!started(inputs)) {
        alert("Veuillez répondre à toutes les questions !");
        return; // arrêter
    }
    for (let i = 0; i < inputs.length; i++) { // pour chaque élément
        if (inputs[i].type != "radio") continue; // si ce n'est pas une option, passer au suivant
        if (ids.includes(inputs[i].id)) { // si l'élément est une bonne réponse
            if (inputs[i].checked) { // si la bonne réponse est sélectionnée
                score++; // ajouter 1 au score
            }

            document.getElementById(inputs[i].id).checked = true; // cocher pour afficher le corriféé
            continue; // passer au suivant
        }

        // dans le cas où la réponse est fausse
        inputs[i].classList.remove("neutral"); // enlever la couleur verte neutre
        inputs[i].classList.add("wrong"); // mettre l'élément en rouge
    }

    scoreTxt.innerHTML = `Score ${score}/5`; // affiche le score

    // choisir le message qui s'affichera à côté du score
    switch (score) {
        case 0:
            document.getElementById("score-msg").innerHTML = "Vous n’avez pas répondu correctement à aucune question.";
            break;

        case 1:
            document.getElementById("score-msg").innerHTML = "C'est mieux que rien, mais vous pouvez faire beaucoup mieux.";
            break;

        case 2:
            document.getElementById("score-msg").innerHTML = "C'est un bon début, mais il y a encore du chemin à faire.";
            break;

        case 3:
            document.getElementById("score-msg").innerHTML = "C'est un résultat honorable, mais il y a encore de la marge pour progresser.";
            break;

        case 4:
            document.getElementById("score-msg").innerHTML = "C'est un très bon résultat, bravo!";
            break;

        case 5:
            document.getElementById("score-msg").innerHTML = "C'est un score parfait, félicitations! Vous êtes un expert du réchauffement climatique et de ses enjeux.";
            break;

        default: // dans le cas où le score ne correspond pas
            document.getElementById("score-msg").innerHTML = "🤨";
            break;
    }
}

function started(inputs) {
    let amountChecked = 0; // nombre de questions auxquelles l'utilisateur a répondu (vraies ou fausses)
    for (let i = 0; i < inputs.length; i++) {
        amountChecked += inputs[i].checked ? 1 : 0; // ajouter 1 si l'utilisateur a répondu sinon ajouter 0
    }
    return amountChecked == 5; // 5 questions au total
}