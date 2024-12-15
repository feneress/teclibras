function conferirResposta(button, isCorrect) {
    let buttons = button.parentElement.querySelectorAll("button");
    buttons.forEach(btn => btn.disabled = true);
    
    if (isCorrect) {
        button.style.backgroundColor = "green";
        button.innerHTML = "Correto!";
    } else {
        button.style.backgroundColor = "red";
        button.innerHTML = "Errado!";
        
        buttons.forEach(btn => {
            if (btn.innerHTML === "Computador" && isCorrect) {
                btn.style.backgroundColor = "green";
            }
        });
    }
    
    setTimeout(() => {
        resetarQuiz(button);
    }, 1000);
}

function resetarQuiz(button) {
    let buttons = button.parentElement.querySelectorAll("button");
    buttons.forEach(btn => {
        btn.disabled = false;
        btn.style.backgroundColor = "";
        btn.innerHTML = btn.getAttribute("data-original-text");
    });
}

document.addEventListener("DOMContentLoaded", () => {
    let buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
        button.setAttribute("data-original-text", button.innerHTML);
    });
});
