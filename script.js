const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')
let apiQuotes = [];

//loader
function loading(){
    loader.hidden = false;
    quoteContainer.hidden=true;
}

function completeLoading(){
    loader.hidden=true;
    quoteContainer.hidden=false;
}

//pick one quote
function newQuote(){
    loading();
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    if(!quote.author) quote.author = "Unknown Quote"
    authorText.innerText = quote.author;
    quoteText.innerText = quote.text;
    if(quote.text.length > 75){
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }
    console.log(quote);
    completeLoading();
}

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

// Get Quote from api
async function getQuote(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
        completeLoading();
    }
    catch (error){
        console.log('whoops, no Quote',error)
    }
}

newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);

// On load
getQuote();