// Declares an asynchronous function named 'getRSSFromURL' that takes a single parameter 'url'
async function getRSSFromURL(url) {

  // Constructs the URL for the RSS-to-JSON conversion API (https://api.rss2json.com/v1/api.json) by appending the provided 'url' parameter as the 'rss_url' query parameter
  let constructURL = "https://api.rss2json.com/v1/api.json?rss_url=" + url;

  // Use the 'fetch' function to make an HTTP request to the constructed API URL (constructURL)
  // The await keyword is used to wait for the asynchronous operation (fetching) to complete before moving to the next line
  const fetchingURL = await fetch(constructURL);

  // Once the response is received from the API, uses the 'json' method to parse the response body as JSON
  // Again, the 'await' keyword is used to wait for this asynchronous operation to complete
  const conversionRSSToJSON = await fetchingURL.json();

  // The function returns the parsed JSON data obtained from the RSS feed
  return conversionRSSToJSON;
  
}







// Declares a function named 'addArticlesToAccordion' that takes three parameters - 'articles', 'RetrieveMagazineData', and 'articleNo'
function addArticlesToAccordion(articles, RetrieveMagazineData, articleNo) {
  
  // Creates a new HTML 'div' element and assigns it to the variable 'carouselBox'
  const carouselBox = document.createElement("div");

  /* Set the id attribute of the newly created div element
  & the 'id' constructed by concatenating the string "carousel" with the value of the variable 'articleNo'
  */
  carouselBox.id = "carousel" + articleNo;

  /* Sets the class attribute of the div element
  It assigns two classes: "carousel" and "slide".
  These classes are often used in conjunction with the Bootstrap carousel component to enable sliding transitions between elements.
  */
  carouselBox.setAttribute("class", "carousel slide");


  // Set a custom data attribute (data-bs-ride) for the Bootstrap carousel
  carouselBox.setAttribute("data-bs-ride", "carousel");

  // Set its inner HTML
  carouselBox.innerHTML = `
    <div class="carousel-inner" id="inner-carousel${articleNo}">
    
    </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carousel${articleNo}" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carousel${articleNo}" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
  `;

  
  // Appends the created 'carouselBox' to the element represented by the 'RetrieveMagazineData' parameter
  RetrieveMagazineData.append(carouselBox);

  // Retrieves the inner carousel box by its dynamically generated id ('inner-carousel${articleNo}')
  const innerCarouselBox = document.getElementById(`inner-carousel${articleNo}`);

  // Iterates over each article in the 'articles' array
  for (let i = 0; i < articles.length; i++) {
    
    // Extracts information 'pubDate' ('date', and 'time') and convert it to local time & date formate
    const article = articles[i];
    const d = new Date(article.pubDate);
    const date = d.toLocaleDateString('en-IN');
    const time =d.toLocaleTimeString('en-In');



    /* Creates a <div> element named articleBox
    and sets its class based on whether
    it's the first article (active) or not
    */
    const articleBox = document.createElement("div");
    if (i == 0) {
      
      articleBox.setAttribute("class", "card carousel-item active");
    } else {

      articleBox.setAttribute("class", "card carousel-item");
    }





    // Sets the inner HTML of articleBox to include various elements with dynamic content from the current article
    articleBox.innerHTML =
    
    
    
    /* Creates an anchor ('<a>') element with an 'href' attribute
    set to the link property of the 'article' object.
    The 'target="_blank"' attribute opens the link in a new tab
    */

    /* Inserts an image (<img>) element with the 'src' attribute
    set to the link property of the 'enclosure' object within the 'article'
    */

    /* Opens a 'div' element with the class "card-body"
            Adds a heading ('<h5>') element with the class "card-title" containing the 'title' property of the 'article'
            Inserts a subheading ('<h6>') element with the class "card-text"
              It includes the 'author', a button with the 'id'-"point" and the 'date' and 'time' properties of the 'article'
            Adds a paragraph ('<p>') element with the class "card-subtitle" containing the 'description' property of the 'article'
    */
    `
    <a href="${article.link}" target="_blank">
      <img src="${article.enclosure.link}" class="d-block w-100 card-img-top" alt="${article.title}">
      
      <div class="card-body">
        <h5 class="card-title">${article.title}</h5>
        <h6 class="card-text text-muted" style="font-style:Montserrat;">${article.author} <button id="point"></button> ${date} ${time}</h6>
        <p class="card-subtitle mb-2">${article.description}</p>
      </div>
      </a>
    `;




    // Appends the 'articleBox' to the inner carousel box for each article in the loop
    innerCarouselBox.append(articleBox);
  }
}









// Declares an asynchronous function named 'addRSSToDOM' that takes an array magazines as a parameter
async function addRSSToDOM(magazines) {

  // Retrieves a reference to a DOM element with the id "rssdata"
  const RetrieveMagazineData = document.getElementById("rssdata");


  // Forloop iterates over each magazine URL in the 'magazines' array.
  for(let i = 0; i < magazines.length; i++){

    // Uses the 'getRSSFromURL' function to fetch the RSS data for the current magazine URL asynchronously.
    const data = await getRSSFromURL(magazines[i]);

    // Extracts relevant information from the fetched RSS data
    const articles = data.items;
    const articleNo = i;
    const titleOfAccordion = data.feed.title;



    let showOnDOMContent = "";
    if(i === 0){
      showOnDOMContent = "show";
    }
    else {
      showOnDOMContent = "collapsed";
    }
    


    // Creating a new HTML element representing an accordion item

    // Creates a new HTML '<div>' element and assigns it to the variable 'accordionElement'
    const accordionElement = document.createElement("div");

    // For styling purposes Sets the "class" attribute of the created '<div>' element to "accordion-item"
    accordionElement.setAttribute("class", "accordion-item");

    // Sets the innerHTML of the '<div>' element to get the internal HTML content
    accordionElement.innerHTML = `
    <h2 class="accordion-header" id="accordionHeading${articleNo}">
      <button class="accordion-button text-muted ${showOnDOMContent}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${articleNo}" aria-expanded="true" aria-controls="collapse${articleNo}">
        ${titleOfAccordion}
      </button>
    </h2>
    <div id="collapse${articleNo}" class="accordion-collapse collapse ${showOnDOMContent}" aria-labelledby="accordionHeading${articleNo}">
      <div class="accordion-body" id="accordionBody${articleNo}">
      </div>
    </div>
    `;
    
    
    // Appends the newly created accordion element to the "rssdata" container ('RetrieveMagazineData) in the DOM
    RetrieveMagazineData.append(accordionElement);


    // Retrieves the container ('accordionArticlesBox') inside the accordion where the articles will be displayed
    const accordionArticlesBox = document.getElementById(`accordionBody${articleNo}`);



    // Calls a function (addArticlesToAccordion) to add the individual articles to the accordion
    addArticlesToAccordion(articles, accordionArticlesBox, articleNo);

  }

}
// Calls the addRSSToDOM function with a predefined array to initiates the process for adding RSS feeds to the DOM

addRSSToDOM(magazines);