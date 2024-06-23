const body = document.querySelector('body');
const themeButton = document.getElementById('themeButton');
const favoritesButton = document.getElementById('favoritesButton');
const favoritesSection = document.getElementById('favoritesSection');
themeButton.addEventListener('click', () => {
    if (body.classList.contains("dark")) {
        body.classList.remove("dark");
        body.classList.add("light");
    } else {
        body.classList.remove("light");
        body.classList.add("dark");
    }
});

favoritesButton.addEventListener('click', () => {
    if (favoritesSection.style.display === 'none') {
        favoritesSection.style.display = 'block';
    }
    else {
        favoritesSection.style.display = 'none';
    }
});