let SAVE = {
    'levelchoice': 0,
    'minuspoints': 0,
};

let word = "";
let task = "";
let eren = document.getElementsByClassName("EvilErens")[0];
let timeout;

function Level(level) {
    SAVE.levelchoice = level;
}

function addWord() {
    document.getElementById('addWordBox').style.visibility = "visible";
}

function Start() {
    eren.style.visibility = "visible";
    eren.id = "imageerenstandard";

    SAVE.minuspoints = 0;
    if (document.getElementById('addedWord').value == "") {
        fetch('http://127.0.0.1:5000/wort/' + SAVE.levelchoice)
        .then(response => {
            if (!response.ok) { 
                return response.json().then(err => {throw new Error(err.error)});
            }
            return response.json();
        })
        .then(data => {
            word = data.wort;
        })
        .catch(error => {
            console.error("Fehler beim Abrufen des Wortes:", error.message);
            if (error.message === "Level nicht gefunden") {
              alert("Das gewählte Level existiert nicht.");
            } else {
              alert("Server ist offline!");
            }
        });
    } else {
        word = document.getElementById('addedWord').value;
        document.getElementById('addedWord').value = "";
    }
    setTimeout(function(){
        task = "-".repeat(word.length);
        document.getElementById('Task').innerText = task;
    },200);
    document.getElementById('points').innerText = "❤️❤️❤️❤️❤️";
    document.getElementsByClassName('image')[0].id = 'image0';
    document.getElementById('imageWin').style.visibility = "hidden";
    document.getElementById('addWordBox').style.visibility = "hidden";
    Letters = document.getElementsByClassName('letter');
    for (let i = 0; i < Letters.length; i++) {
        Letters[i].removeAttribute('disabled');
    }
}
function handleKeyPress(event) {
    if (event.key === "Enter") {
        Start();
    }
}
document.addEventListener("keydown", handleKeyPress);


function Try(clickedLetter) {
    let test = "falsch";
    clickedLetter.disabled = "true";
    letter = clickedLetter.value.toLowerCase();

    let newTask = task.split('');

    for (let i = 0; i < word.length; i++) {
        if (letter === word.toLowerCase().charAt(i)) {
            test = "richtig";
            newTask[i] = word.charAt(i);

            clearTimeout(timeout);
            eren.id = "imageerensauer";
            timeout = setTimeout(function () {
                eren.id = "imageerenstandard";
            }, 800);

        }
    }

    console.log(letter + ' ist ' + test);
    task = newTask.join('');


    if (test === "falsch") {
        SAVE.minuspoints += 1;
        document.getElementsByClassName('image')[0].id = 'image' + SAVE.minuspoints;
        document.getElementById('points').innerText = document.getElementById('points').innerText.slice(2);
        if (SAVE.minuspoints === 5) {
            document.getElementById('points').innerText = "☠️";
            Letters = document.getElementsByClassName('letter');
            for (i = 0; i < Letters.length; i++) {
                document.getElementsByClassName('letter')[i].disabled = "true";
            }
            clearTimeout(timeout);
            eren.id = "imageerenevil";


        }
        else {
            clearTimeout(timeout);
            eren.id = "imageerenhappy";
            timeout = setTimeout(function () {
                eren.id = "imageerenstandard";
            }, 800);
        }
    }
    else {
        document.getElementById('Task').innerText = task;
    }
    if (task.indexOf('-') === -1) {
        Letters = document.getElementsByClassName('letter');
        for (i = 0; i < Letters.length; i++) {
            document.getElementsByClassName('letter')[i].disabled = "true";
        }
        document.getElementsByClassName('image')[0].id = 'image0';
        document.getElementById('imageWin').style.visibility = 'visible';

        clearTimeout(timeout);
        eren.id = "imageerensauer";
    }

}
