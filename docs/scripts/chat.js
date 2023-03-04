var input = document.getElementById("ChatTxt");
input.addEventListener("keypress", function (event) {
    // Si l'utilisateur appuie sur 'Entrer" en étant la boite de texte
    if (event.key === "Enter") {
        // Empêche le rafraîchissement de la page
        event.preventDefault();
        // Clique sur le bouton envoyer
        if (document.getElementById("SendBtn").classList.contains("dis")) return;
        document.getElementById("SendBtn").click();
    }
});

document.getElementById("KeyTxt").value = localStorage.getItem("pwr");

function submit() {
    // instructions du bot
    let prompt = "Je suis GreenFutur, un expert sur le climat, la nature et l'écologie. Je donne des conseils et je tchat avec respect avec les utilisateurs. J'utilise les émojis. Je donne souvent des sources. Je mets en forme les liens, les listes, les tableaux en HTML car je sais le faire (je ne le dis pas à l'humain). Je commence mes réponses par GreenFutur :\n\nHuman: "

    // pour permettre d'avoir une conversation, l'historique des messages est stocké dans le local storage
    if (!localStorage.getItem("chat")) {
        localStorage.setItem("chat", prompt); // si l'historique est vide, alors mettre les instructions par défaut
    }
    document.getElementById("SendBtn").classList.add("dis"); // cache le bouton lors d'une requête

    appendMessage(document.getElementById("ChatTxt").value, true); // affiche le message entré
    localStorage.setItem("chat", localStorage.getItem("chat") + document.getElementById("ChatTxt").value);
    send(localStorage.getItem("chat"));
}

// affiche un message dans la chat box. Des styles sont appliqués en fonction de l'auteur du message (isUser)
function appendMessage(message, isUser) {
    let chat = document.getElementById("chatbox");

    // créer le message
    let msg_container = document.createElement("div"); // élément contenant le message et le nom de l'auteur
    let msg = document.createElement("div"); // élément contenant le contenu du message s'affichant sous forme de bulle
    let user_name = document.createElement("p"); // l'auteur du message

    user_name.innerHTML = isUser ? "Toi" : "GreenFutur" // déterminer l'auteur du message
    user_name.classList.add("username"); // ajoute un style pour le texte affichant l'auteur du message
    msg_container.classList.add(isUser ? "right" : "left"); // à droite s'affichent les messages de l'IA, à gauche pour ceux de l'utilisateur
    msg.classList.add(isUser ? "msg" : "ia-msg"); // appliquer des styles en fonction de l'auteur

    let content = document.createElement("p"); // le contenu du message
    content.innerHTML = message;

    msg.appendChild(content); // ajouter le contenu du message à la bulle de message
    msg_container.appendChild(user_name); // ajouter le nom de l'auteur au dessus de la bulle
    msg_container.appendChild(msg); // ajouter la bulle

    // ajouter le message
    chat.appendChild(msg_container);

    // afficher le dernier message
    document.getElementById("chatbox").scrollTop = 99999999
}

function send(msg) {
    // Clé d'API d'OpenAI
    const OPENAI_API_KEY = document.getElementById("KeyTxt").value;

    // Options du bot
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: "text-davinci-003", // utilise le model de Chat-GPT
            prompt: msg + "GreenFutur : ",
            temperature: 0.99,
            max_tokens: 512, // longeur du message
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0.6,
            stop: [" Human :", " GreenFutur :"],
        }),
    };
    document.getElementById("ChatTxt").value = "";

    // Envoyer la requête aux serveurs d'Open AI et gérer la réponse
    fetch("https://api.openai.com/v1/completions", requestOptions)
        .then((response) => response.json())
        .then((data) => {

            appendMessage(data.choices[0].text);
            localStorage.setItem("chat", localStorage.getItem("chat") + "\n\nGreenFutur : " + data.choices[0].text + "\n\nHuman: ");
            document.getElementById("SendBtn").classList.remove("dis");
            if (!localStorage.getItem("pwr")) localStorage.setItem("pwr", document.getElementById("KeyTxt").value)
        })
        .catch((error) => {
            // Si une erreur se produit, réinitialise la conversation
            console.error(error);
            localStorage.removeItem("chat");
            appendMessage("Oups, une erreur s'est produite, la conversation s'est réinitialisée.");
            document.getElementById("SendBtn").classList.remove("dis");

        });
}

function reset() {
    localStorage.removeItem("chat");
    document.getElementById("chatbox").innerHTML = "";
    appendMessage("La conversation s'est réinitialisée.");
    document.getElementById("SendBtn").classList.remove("dis");
}