// script.js

function showFact(topic) {
    let factElement = document.getElementById(topic + '-fact');

    const facts = {
        exercise: "Exercise helps your muscles grow stronger and your heart work better.",
        nutrition: "Eating fruits and vegetables can help you feel strong and healthy.",
        sleep: "Sleep gives your body the rest it needs to stay healthy and energized.",
        water: "Drinking water keeps your body hydrated and helps you feel good.",
        hygiene: "Washing your hands and brushing your teeth helps you stay clean and avoid germs."
    };

    factElement.textContent = facts[topic];
}
