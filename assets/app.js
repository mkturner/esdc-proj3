/*

    **Requirements**

    - The HTML page shows a form with three input options - Top Text, Bottom Text, Image - and a submit button [DONE]
    - Users should be able to submit a form on the page to generate a new meme on the page [DONE]
    - They should be able to add **multiple memes** to the page by submitting the form multiple times [DONE]
    - Users should be able to click on a button to delete/remove a meme from the page [DONE]
    - The form boxes should clear out automatically after the submit is clicked [DONE]
    - The form fields need to have validation so they will not submit if a field is missing [DONE]
    - Be sure to style your meme generator! It should be functional but also look nice [DONE]
    - **Only use vanilla JavaScript: no frameworks/third-party libraries are allowed** [DONE]

*/

const memeForm = document.getElementById('meme-form');
const memeContainer = document.getElementById('meme-container');

// Handle form submission with event listener
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
// 1st parameter: event type to listen for
// 2nd parameter: callback function to execute when the event occurs
// Make sure the DOM is fully loaded before attaching event listeners
// ES2020 optional chaining operator (?.) to ensure memeForm exists before adding event listener
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
// Javascript the Definitive Guide, 7th Edition, David Flanagan, O'Reilly, 2020, 
// p. 65 (4.4.1), p. 137 (6.3.3), pg 187 (8.2.1)
memeForm?.addEventListener('submit', function(event) {
    // Prevent default submission behavior to avoid page refresh
    // https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
    event.preventDefault();

    //  Get form values
    const imageUrl = document.getElementById('imageUrl').value;
    const topText = document.getElementById('topText').value;
    const bottomText = document.getElementById('bottomText').value;

    // clear form fields after submission, and capturing the values
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reset
    memeForm.reset();

    // Create and display the new meme
    const newMeme = createMeme(imageUrl, topText, bottomText);
    // Append the new meme to the meme container
    // insertAdjacentElement() method adds a node at the specified position 
    // relative to the specified element: 
    // 'beforebegin', 'afterbegin', 'beforeend', 'afterend'
    // use 'afterbegin' to add the newest meme at the top
    // https://developer.mozilla.org/en-US/docs/Web/API/Node/insertAdjacentElement
    memeContainer.insertAdjacentElement('afterbegin', newMeme);
});

// Function to create a meme element
function createMeme(imageUrl, topText, bottomText) {
    // Create a container for the meme
    const meme = document.createElement('div');
    // add multiple classes at once to style the meme container
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
    meme.classList.add('meme', 'bordered');

    // create a wrapper for the image and text lines
    const memeContent = document.createElement('div');
    memeContent.classList.add('meme-content');
    meme.appendChild(memeContent);

    // // set the content background to the image URL using CSS background-image property
    // // https://developer.mozilla.org/en-US/docs/Web/CSS/background-image
    // memeContent.style.backgroundImage = `url("${imageUrl}")`;
    // memeContent.style.backgroundSize = 'cover';
    // memeContent.style.backgroundPosition = 'center';
    // memeContent.style.backgroundRepeat = 'no-repeat';

    // Create an image element for the meme
    const img = document.createElement('img');
    // set the image source to the URL entered into the form
    img.src = imageUrl;
    // use alt attribute for accessibility
    img.alt = 'New Meme';
    memeContent.appendChild(img);

    // Create a div for the top text
    const topTextDiv = document.createElement('div');
    // add a class to style the top text i.e. positioning, font, etc.
    topTextDiv.classList.add('top-text');
    topTextDiv.innerText = topText;
    memeContent.appendChild(topTextDiv);

    // Create a div for the bottom text
    const bottomTextDiv = document.createElement('div');
    // add a class to style the bottom text i.e. positioning, font, etc.
    bottomTextDiv.classList.add('bottom-text');
    bottomTextDiv.innerText = bottomText;
    memeContent.appendChild(bottomTextDiv);

    // Create a delete button for the meme
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.innerText = 'Delete Meme';
    // Add event listener to handle meme deletion
    // arrow function won't create its own 'this', so use event.target:
    // catch the click event on the button and remove the parent meme element
    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
    // https://developer.mozilla.org/en-US/docs/Web/API/Event/target
    deleteButton.addEventListener('click', (event) => {
        event.target.parentElement.remove();
    });
    meme.appendChild(deleteButton);

    // send back the complete meme element
    return meme;
}

// dummy memes for testing
memeContainer?.insertAdjacentElement('afterbegin', 
    createMeme('https://i.imgflip.com/1bij.jpg', 'One Does Not Simply', '"Make" Memes')
    );
memeContainer?.insertAdjacentElement('afterbegin', 
    createMeme('https://imgflip.com/s/meme/Grumpy-Cat.jpg', 'Grumpy Cat', 'Wont Make You Biscuits')
    );