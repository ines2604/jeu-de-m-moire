let yourName = prompt("What's your name?");
if (yourName == null || yourName == "") {
    document.getElementById("name").innerHTML = 'Unknown';
} else {
    document.getElementById("name").innerHTML = yourName;
}

let wrongTries = 0;
afficherscore();

function afficherscore() {
    document.getElementById('resultat').innerHTML = wrongTries;
}

let clickedBlocks = [];
let correctBlocks = [];

function changerFace(block) {
    if (clickedBlocks.includes(block)) return;

    const front = block.querySelector('.face.front');
    const back = block.querySelector('.face.back');

    if (front && back) {
        front.classList.add('hidden');
        back.classList.remove('hidden');

        clickedBlocks.push(block);

        if (clickedBlocks.length === 2) {

            const firstBlockId = clickedBlocks[0].id;
            const secondBlockId = clickedBlocks[1].id;

            if (firstBlockId === secondBlockId) {

                correctBlocks.push(clickedBlocks[0]);
                correctBlocks.push(clickedBlocks[1]);

                correctBlocks.forEach(block => {
                    block.classList.add('inactive');
                });

                clickedBlocks = [];

                if (correctBlocks.length === 16) { 
                    const congrats = document.getElementById("congrats");
                    const jeu = document.getElementById('jeu');

                    congrats.classList.remove('hidden');
                    jeu.classList.add('hidden');
                }

            } else {

                document.querySelectorAll('.row').forEach(row => {
                    row.classList.add('inactive');
                });

                setTimeout(() => {
                    clickedBlocks.forEach(block => {
                        block.querySelector('.face.front').classList.remove('hidden');
                        block.querySelector('.face.back').classList.add('hidden');
                    });

                    wrongTries += 1;
                    afficherscore();
                    clickedBlocks = [];

                    document.querySelectorAll('.row').forEach(row => {
                        if (![...correctBlocks].includes(row)) {
                            row.classList.remove('inactive');
                        }
                    });
                }, 1000);
            }
        }
    }
}