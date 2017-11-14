var strictify = false;
var count = 0;
var jeu_start = false;
var tab = [];
var count_player = 0;
var current = 0;

function clicker(element) {
    son(element);
    if (jeu_start) {
        if (test(element)) {
            count_player ++;
            if (count_player >= count) {
                count_player = 0;
                setTimeout(compTurn, 1000);
            }
            debut();
        } else {
            erreur();
        }
    } else {
        alert("Il faut appuyer sur start pour commencer le jeu");
    }
}

function son(element) {
    var sound = document.getElementById(element+4);
    sound.play();
}

function incrementeCompte() {
    count++;
    afficheCount();
}

function start() {
    if (! jeu_start) {
        jeu_start = true;
        compTurn();
    } else {
        alert("Le jeu a déjà commencer");
    }
}

function test(element) {
    if (tab[count_player] == element) {
        return true;
    }
    return false;
}

function erreur() {
    count_player = 0;
    if (strictify) {
        count = 0;
        tab = [];
        errorCount();
        setTimeout(compTurn, 1000);
    } else {
        errorCount();
        setTimeout(afficheCount, 1000);
        setTimeout(computerClick, 1000, tab[current]);
    }
}

function afficheCount() {
    document.getElementById('count').innerHTML = count;
}

function errorCount() {
    document.getElementById('count').innerHTML = "--";
}

function strict() {
    if (strictify) {
        $("#strict").html("Strict");
        strictify = false;
    } else {
        $("#strict").html("Not strict");
        strictify = true;
    }
}

function gagne() {
    alert("Vous avez gagné !! Vous avez une mémoire d'éléphant !!")
    restart();
}

function compTurn() {
    if (count == 20) {
        gagne();
    } else {
        incrementeCompte();
        var nouv = Math.floor((Math.random() * 4) + 1);
        tab.push(nouv);
        computerClick(tab[current]);
    }
}

function computerClick(element) {
    if (current < count) {
        son(element);
        current ++;
        document.getElementById(element).className += " active";
        setTimeout(finComputerClick, 1000, element);
        setTimeout(computerClick, 1100, tab[current]);
    } else {
        current = 0;
    }
}

function restart() {
    count = 0;
    tab = [];
    count_player = 0;
    current = 0;
    jeu_start = false;
    afficheCount();
}

function finComputerClick(element) {
    document.getElementById(element).className =  document.getElementById(element).className.replace( /(?:^|\s)active(?!\S)/g , "");
}
