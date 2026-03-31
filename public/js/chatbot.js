function toggleTicketyChat() {
    const chatBox = document.getElementById("ticketyChatBox");
    if (chatBox.style.display === "none" || chatBox.style.display === "") {
        chatBox.style.display = "flex";
    } else {
        chatBox.style.display = "none";
    }
}

function handleKeyPress(e) {
    if (e.key === 'Enter') {
        sendChatMessage();
    }
}

async function sendChatMessage() {
    const input = document.getElementById("userMsgInput");
    const container = document.getElementById("chatContainer");
    const message = input.value.trim();

    if (!message) return;

    const userDiv = document.createElement("div");
    userDiv.className = "msg user-msg";
    userDiv.innerText = message;
    container.appendChild(userDiv);
    
    input.value = ""; 
    container.scrollTop = container.scrollHeight; 

    const loadingId = "loading-" + Date.now();
    const loadingDiv = document.createElement("div");
    loadingDiv.className = "msg bot-msg";
    loadingDiv.id = loadingId;
    loadingDiv.innerText = "Typing...";
    container.appendChild(loadingDiv);
    container.scrollTop = container.scrollHeight;

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();
        
        const loader = document.getElementById(loadingId);
        if (loader) loader.remove();

        const botDiv = document.createElement("div");
        botDiv.className = "msg bot-msg";
        botDiv.innerText = data.reply;
        container.appendChild(botDiv);
        
        container.scrollTop = container.scrollHeight;

    } catch (err) {
        const loader = document.getElementById(loadingId);
        if (loader) loader.innerText = "Error: Please check your connection.";
        console.error("Chatbot Error:", err);
    }
}