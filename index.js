const body = document.querySelector('body');
const themeButton = document.getElementById('themeButton');
const favoritesButton = document.getElementById('favoritesButton');
const favoritesSection = document.getElementById('favoritesSection');
const cards = document.querySelectorAll('.card');
const brand = document.querySelector('.brand');

themeButton.addEventListener('click', () => {
    if (body.classList.contains("dark")) {
        body.classList.remove("dark");
        body.classList.add("light");
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove("light");
        body.classList.add("dark");
        localStorage.setItem('theme', 'dark');
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

brand.addEventListener('click', () => window.open('index.html', '_self'));

cards.forEach((card) =>{
    card.addEventListener('click', () => window.open('courseDetails.html', '_self'));
});

document.addEventListener('DOMContentLoaded', () => {
    let theme = localStorage.getItem('theme');
    if (!theme){
        localStorage.setItem('theme', 'light'); //setting default theme when the user first vists the page
        body.classList.add(localStorage.getItem('theme'));
    }
    else {
        body.classList.add(theme); // applying user preference to the page
    }
});