import {loadData} from './dataFetch.js';
const detailsSection = document.querySelector('.details-section');
const imageContainer = document.querySelector('.image-container');
const cardDetails = document.querySelector('.card-details');
const subtopics = document.querySelector('.subtopics');
const addToFavorites = document.querySelector('.favourites-btn');
const card = document.querySelector('.card');
const favouritesContainer = document.querySelector('.favourites-container');

function loadFavorites(data){
    let favorites = JSON.parse(localStorage.getItem('favorites'));
    if (!favorites){
        return;
    }
    for (let element of data) {
        if (favorites[element.id]){
            let div = document.createElement('div');
            div.classList.add('favourite-card');
            div.innerHTML = `<div class="image-container">
					<img class="favorite-image" src="images/${element.image}" alt="${element.topic}">
					</div>
					<div class="favourite-info">
						<h3>${element.topic}</h3>
						<p>⭐⭐⭐⭐⭐</p>
					</div>`;
            favouritesContainer.appendChild(div);
        }
    }
}

async function loadContent (filePath) {
    const data = await loadData(filePath);
    if (!data){
        console.error("Data retrival failed :(");
        resultsContainer.innerHTML = "Something went wrong";
        card.style.display = 'none';
    }
    else {
        let result;
        const query = new URL(document.URL).searchParams;
        if (!query.get('id')){
            console.error("No ID provided.");
            detailsSection.innerHTML ='<h1>Something went wrong</h1>';
            card.style.display = 'none';
        }
        for (let element of data){
            if (`${element.id}` === query.get('id')){
                result = element;
                break;
            }
        };
        if (!result){
            console.error("Invalid ID provided.");
            detailsSection.innerHTML ='<h1>Something went wrong</h1>';
        }
        detailsSection.setAttribute('topicID', result.id);
        detailsSection.innerHTML = `<h3 class="category updown-margin">${result.category}</h3>
                                    <h2 class="title updown-margin">${result.topic}</h2>
                                    <p class="rating">⭐⭐⭐⭐⭐</p>
                                    <p class="description updown-margin">${result.description || result.topic}</p>`;
        imageContainer.innerHTML = `<img class="image" src="images/${result.image}" alt="photo">`;
        subtopics.innerHTML = `<h2 class="subtitle">${result.topic} Sub Topics</h2>`;
        for (let element of result.subtopics){
            let subTopic = document.createElement('div');
            subTopic.classList.add('subtopic');
            subTopic.innerHTML = `✅ ${element}`;
            subtopics.appendChild(subTopic);
        }
    }
    loadFavorites(data);
}

function addOrRemoveFavorite() {
    let favorites = JSON.parse(localStorage.getItem('favorites'));
    let topicID = detailsSection.getAttribute('topicid');
    if (favorites === null){
        const favoritesObject = {};
        favoritesObject[topicID] = "1";
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    else if (!favorites[topicID]){
        favorites[topicID] = '1';
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    else {
        favorites[topicID] = undefined;
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}

addToFavorites.addEventListener('click', addOrRemoveFavorite);

loadContent('./api/topics.json');