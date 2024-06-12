const body = document.querySelector('body');
const themeButton = document.getElementById('themeButton');

themeButton.addEventListener('click', () => {
    if (body.classList.contains("dark")) {
        body.classList.remove("dark");
        body.classList.add("light");
    } else {
        body.classList.remove("light");
        body.classList.add("dark");
    }
});
