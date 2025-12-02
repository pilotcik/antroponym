// script.js

function showSentence(familyMember) {
    let sentenceElement = document.getElementById(familyMember + '-sentence');

    const sentences = {
        mother: "My mother makes the best cookies!",
        father: "My father loves to play soccer with me.",
        brother: "I play video games with my brother.",
        sister: "My sister loves to draw pictures.",
        grandmother: "My grandmother tells the best stories.",
        grandfather: "My grandfather loves gardening."
    };

    sentenceElement.textContent = sentences[familyMember];
}
