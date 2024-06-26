const resultsContainer = document.querySelector('.results-container');
const resultsNumber = document.getElementById('resultsNumber');

async function retreiveCourses (filePath) {
    const response = await fetch(filePath);
    const jsonData = await response.json();
    appendCards(jsonData);
    const cards = document.querySelectorAll('.card');
    resultsNumber.innerHTML = `"${cards.length}" Web Topics Found`;
    cards.forEach((card) =>{
        card.addEventListener('click', () => window.open('courseDetails.html', '_self'));
    });
}

function appendCards(data) {
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';

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

retreiveCourses('./api/topics.json');