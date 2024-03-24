// const API_KEY = "77ce78466f274e349cd1f12532350932"
// const url = 'https://newsapi.org/v2/everything?q='

// window.addEventListener('load', () => fetchNews("India"))

// function reload(){
//     window.location.reload();
// }

// async function fetchNews(query){
//     const res = await fetch(`${url}${query}&apiKey=${API_KEY}`)
//     const data = await res.json();
//     console.log(data);
//     bindData(data.articles);
// }

// function bindData(articles){
//     const cardscontainer = document.getElementById('cards-container')
//     const newsCardTemplate = document.getElementById('template-news-card')

//     cardscontainer.innerHTML = '';

//     articles.forEach(article => {
//         if(!article.urlToImage) return;
//         const cardClone = newsCardTemplate.content.cloneNode(true);
//         fillDataInCard(cardClone, article)
//         cardscontainer.appendChild(cardClone);
//     })
// }

// function fillDataInCard(cardClone, article){
//     const newsImg = cardClone.querySelector("#news-image");
//     const newsTitle = cardClone.querySelector("#news-title");
//     const newsSource = cardClone.querySelector("#news-source");
//     const newsDesc = cardClone.querySelector("#news-desc");

//     newsImg.src = article.urlToImage;
//     newsTitle.innerHTML = article.title;
//     newsSource.innerHTML = article.source.name;
//     newsDesc.innerHTML = article.description;

//     const date = new Date(article.publishedAt).toLocaleString("en-US", {
//         timeZone: "Asia/Jakarta"
//     });

//     newsSource.innerHTML = `${article.source.name} ⌛ ${date}`; 

//     cardClone.firstElementChild.addEventListener('click', () => {
//         window.open(article.url, "_blank")
//     })

// }

// let curSelectedNav = null;

// function onNavItemClick(id){
//     fetchNews(id);
//     const navItem = document.getElementById(id);
//     curSelectedNav?.classList.remove('active')
//     curSelectedNav = navItem;
//     curSelectedNav.classList.add('active')
// }

// const searchButton = document.getElementById('search-button');
// const searchText = document.getElementById('search-text')

// searchButton.addEventListener('click', () => {
//     const query = searchText.value;
//     if(!query) return;
//     fetchNews(query);
//     curSelectedNav.classList.remove('active')
// })

// server.js

const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/news', async (req, res) => {
  try {
    const { query } = req.query;
    const apiKey = "YOUR_NEWS_API_KEY";
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'An error occurred while fetching news' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// client-side JavaScript

const url = 'http://localhost:3000/news';

window.addEventListener('load', () => fetchNews("India"));

async function fetchNews(query) {
  try {
    const response = await fetch(`${url}?query=${query}`);
    const data = await response.json();
    bindData(data.articles);
  } catch (error) {
    console.error('Error fetching news:', error);
  }
}

function bindData(articles) {
  const cardscontainer = document.getElementById('cards-container');
  const newsCardTemplate = document.getElementById('template-news-card');

  cardscontainer.innerHTML = '';

  articles.forEach(article => {
    if (!article.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardscontainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-image");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsSource.innerHTML = article.source.name;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta"
  });

  newsSource.innerHTML = `${article.source.name} ⌛ ${date}`;

  cardClone.firstElementChild.addEventListener('click', () => {
    window.open(article.url, "_blank");
  });
}

let curSelectedNav = null;

function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove('active');
  curSelectedNav = navItem;
  curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click', () => {
  const query = searchText.value;
  if (!query) return;
  fetchNews(query);
  curSelectedNav.classList.remove('active');
});

