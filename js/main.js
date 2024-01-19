let imgTest = document.getElementById('img-test');
let links = document.querySelectorAll('.navbar .nav-link');
let active = document.querySelector('.active');
let detailsTest = document.getElementById('details-test');
let nav = document.querySelector('.navbar');
let home = document.querySelector('.home');
let details = document.querySelector('.main-div');
let closeBtn = document.getElementById('closeBtn');



run();


for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function (e) {
        var anchor = e.target;
        active.classList.remove('active');
        anchor.classList.add('active');
        active = anchor;
        run(anchor.innerText.toLowerCase());
    })
}


async function getData(choice) {

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e895bfc37dmshf4703ca8a642caap12f351jsn10ea424233e1',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${choice}`, options);
    const result = await api.json();
    return result;
}


function displayGames(data) {
    imgTest.innerHTML = '';
    for (var i = 0; i < data.length; i++) {
        var shortDescriptionLimited = data[i].short_description.substring(0, 30);

        var cartona = `<div class="col-md-3">
            <div class="card">
                <figure>
                    <img src="${data[i].thumbnail}" alt="thumbnail" class="image-edit">
                </figure>
                <figcaption>
                    <div class="card-head d-flex justify-content-between">
                        <h4>${data[i].title}</h4>
                        <button class="btn btn-primary">Free</button>
                    </div>
                    <div class="card-body">
                        <p>${shortDescriptionLimited}</p>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button class="btn btn-info">${data[i].genre}</button>
                        <button class="btn btn-info">${data[i].platform}</button>
                    </div>
                </figcaption>
            </div>
        </div>`;

        imgTest.innerHTML += cartona;
    }
}


function displayDetails(u) {
    detailsTest.innerHTML = '';

    var cartona = `<div class="details-head d-flex justify-content-between">
        <h2>Game Details</h2>
        <i class="fa-solid fa-xmark" id="closeBtn" onclick="closeLayer()"></i>
    </div>
    <div class="row content">
        <div class="col-md-4">
            <figure>
                <img src="${u.thumbnail}" alt="thumbnail">
            </figure>
        </div>
        <div class="col-md-8">
            <div class="data">
                <h2 class="pb-2">Title: ${u.title}</h2>
                <div class="first d-flex pb-3">
                    <h4>Category:</h4>
                    <button class="btn">${u.genre}</button>
                </div>
                <div class="second d-flex pb-3">
                    <h4>Platform:</h4>
                    <button class="btn">${u.platform}</button>
                </div>
                <div class="third d-flex pb-1">
                    <h4>Status:</h4>
                    <button class="btn">${u.status}</button>
                </div>
                <p>${u.description}</p>
            </div>
            <div class="final-btn">
            <button class="btn" id="showBtn"><a href="${u.game_url}" target="_blank">Show Game</a></button>
            </div>
        </div>
    </div>`;

    detailsTest.innerHTML = cartona;
    let bgImage = u.thumbnail;
    details.style.cssText = `
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${bgImage});
  background-size:cover;
  background-position:center
  `;
}



async function getDetails(id) {

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e895bfc37dmshf4703ca8a642caap12f351jsn10ea424233e1',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options);
    const result = await api.json();
    return result;
}


async function run(x = 'mmorpg') {
    let y = await getData(x);
    displayGames(y);
    imgTest.addEventListener('click', async function getClickData(e) {
        const url = e.target.currentSrc;
        const extractedId = extractIdFromUrl(url);
        let u = await getDetails(extractedId);
        details.classList.replace('d-none', 'd-block');
        nav.classList.add('d-none');
        home.classList.add('d-none');
        displayDetails(u);
    })
}



function extractIdFromUrl(url) {
    const match = url.match(/\/(\d+)\/thumbnail\.jpg$/);
    if (match && match[1]) {
        return parseInt(match[1], 10);
    } else {
        console.error('Unable to extract ID');
        return null;
    }
}


function closeLayer() {
    details.classList.replace('d-block', 'd-none');
    nav.classList.remove('d-none');
    home.classList.remove('d-none');
}


$(function(){
    $('.loader').fadeOut(2500,function(){
        $('.screenloading').slideUp(500)
        $('body').css('overflow','auto')
    });
});



