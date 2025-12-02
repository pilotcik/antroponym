// script.js

function showFact(animal) {
    let factElement = document.getElementById(animal + '-fact');

    const facts = {
        lion: "Lions roar to communicate with each other over long distances.",
        elephant: "Elephants have strong memories and can recognize other elephants after many years.",
        giraffe: "A giraffe's neck is so long that it needs to spread its legs to reach the ground to drink water.",
        tiger: "Tigers are solitary animals and do not live in groups.",
        panda: "Pandas eat up to 38 kg (84 pounds) of bamboo each day.",
        koala: "Koalas have a special thumb to help them climb trees!"
    };

    factElement.textContent = facts[animal];
}
