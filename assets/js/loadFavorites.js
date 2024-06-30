const favouritesContainer = document.querySelector('.favourites-container');

export function loadFavorites(data){
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