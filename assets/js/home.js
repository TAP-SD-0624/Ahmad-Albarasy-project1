import {loadData} from './dataFetch.js';
const resultsContainer = document.querySelector('.results-container');
const resultsNumber = document.getElementById('resultsNumber');

async function loadContent (filePath) {
    const data = await loadData(filePath);
    if (!data){
        console.error("Data retrival failed :(");
        resultsContainer.innerHTML = "Something went wrong";
    }
    else {
        appendCards(data);
        const cards = document.querySelectorAll('.card');
        resultsNumber.innerHTML = `"${cards.length}" Web Topics Found`;
        cards.forEach((card) =>{
            card.addEventListener('click', () => window.open(`courseDetails.html?id=${card.getAttribute('topicID')}`, '_self'));
        });
    }
}

function appendCards(data) {
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute("topicID", item.id);
        card.innerHTML = `
            <div class="image-frame">
                <img class="card-image" src="images/${item.image}" alt="${item.topic}">
            </div>
            <div class="card-body">
                <h3 class="category">${item.category}</h3>
                <h2>${item.topic}</h2>
                <p>⭐⭐⭐⭐⭐</p>
                <p class="author">Author: ${item.name}</p>
            </div>
        `;

        resultsContainer.appendChild(card);
    });
}

loadContent('./api/topics.json');