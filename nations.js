// script.js

function showFact(country) {
    let factElement = document.getElementById(country + '-fact');

    const facts = {
        usa: "The United States has the largest economy in the world.",
        canada: "Canada has more lakes than any other country.",
        france: "France is known for its famous cuisine, like croissants and cheese.",
        japan: "Japan has 4 main islands and thousands of smaller ones.",
        brazil: "Brazil is home to the Amazon Rainforest, the largest tropical rainforest in the world.",
        india: "India has a rich cultural history, and is known for its diverse languages and traditions."
    };

    factElement.textContent = facts[country];
}
