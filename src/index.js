document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("startQuiz").addEventListener("click", () => {
        window.location.href = "../pages/quiz.html";
    });
    document.getElementById("back").addEventListener("click", () => {
        window.location.href = "../pages/index.html";
    });
});
