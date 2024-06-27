const detailsSection = document.querySelector('.details-section');
const imageContainer = document.querySelector('.image-container');
const cardDetails = document.querySelector('.card-details');
const subtopics = document.querySelector('.subtopics');
const card = document.querySelector('.card');


async function loadContent (filePath) {
    const response = await fetch(filePath);
    if (!response.ok){
        console.error("Data retrival failed :(");
        resultsContainer.innerHTML = "Something went wrong";
        card.style.display = 'none';
    }
    else {
        let result;
        const jsonData = await response.json();
        const query = new URL(document.URL).searchParams;
        if (!query.get('id')){
            console.error("No ID provided.");
            detailsSection.innerHTML ='<h1>Something went wrong</h1>';
            card.style.display = 'none';
        }
        for (element of jsonData){
            if (`${element.id}` === query.get('id')){
                result = element;
                break;
            }
        };
        if (!result){
            console.error("Invalid ID provided.");
            detailsSection.innerHTML ='<h1>Something went wrong</h1>';
        }
        detailsSection.innerHTML = `<h3 class="category updown-margin">${result.category}</h3>
                                    <h2 class="title updown-margin">${result.topic}</h2>
                                    <p class="rating">⭐⭐⭐⭐⭐</p>
                                    <p class="description updown-margin">${result.description || result.topic}</p>`;
        imageContainer.innerHTML = `<img class="image" src="images/${result.image}" alt="photo">`;
        subtopics.innerHTML = `<h2 class="subtitle">${result.topic} Sub Topics</h2>`;
        for (element of result.subtopics){
            let subTopic = document.createElement('div');
            subTopic.classList.add('subtopic');
            subTopic.innerHTML = `✅ ${element}`;
            subtopics.appendChild(subTopic);
        }
    }
}

loadContent('./api/topics.json');