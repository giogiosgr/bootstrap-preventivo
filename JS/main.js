'use strict';

//dichiarazione variabili inizializzate con gli oggetti del DOM da manipolare
const form = document.querySelector('form');
const selectInput = document.getElementById('select');
const codeInput = document.getElementById('code');
const warningText = document.getElementById('warning');
const priceText = document.getElementById('price');
const intSpan = document.getElementById('int');
const decimalSpan = document.getElementById('decimal');

//dichiarazione oggetto con i possibili prezzi orari
const prices = {
    "frontend": 20.50,
    "backend": 15.30,
    "analysis": 33.60
};

//dichiarazione array con i possibili codici sconto
const codes = ["YHDNU32", "JANJC63", "PWKCN25", "SJDPO96", "POCIE24"];

//costanti delle ore di lavoro e dello sconto
const jobHours = 10;
const discount = 25;

//dichiarazione variabili per i calcoli del prezzo finale del preventivo
let selectedJob = "";
let usedCode = "";
let currentHourPrice = 0;
let fullPrice = 0;
let intPrice = 0;
let decimalPrice = 0;

//aggiunta evento al submit del form con funzione per il calcolo del prezzo finale
form.addEventListener("submit", function (event) {
    //annullamento del comportamento di default del form al submit
    event.preventDefault();

    //si prende il valore (numero progressivo) corrispondente al lavoro scelto
    selectedJob = selectInput.value;

    //il valore di selectedJob è la chiave usata per assegnare il valore corrente alla variabile dedicata
    currentHourPrice = prices[selectedJob];

    //calcolo del prezzo finale
    fullPrice = currentHourPrice * jobHours;

    //si estrae il valore del codice inserito
    usedCode = codeInput.value;

    //condizione in cui verifichiamo che il codice usato sia uno di quello validi
    if (codes.includes(usedCode)) {
        //se sì, allora il prezzo finale è scontato del 25%
        fullPrice -= fullPrice * (discount / 100);
    }
    //altrimenti, l'elemento con il messaggio di errore nel DOM viene reso visibile
    else {
        warningText.classList.remove("d-none")
    }

    //il prezzo viene arrotondato a due cifre decimali
    fullPrice = fullPrice.toFixed(2);

    //estrazione della parte intera del prezzo
    intPrice = parseInt(fullPrice);

    //estrazione della parte decimale del prezzo (richiamando la funzione dedicata che si è creata)
    decimalPrice = extractDecimal(fullPrice);

    alert(intPrice);
    alert(decimalPrice);
}
)

//dichiarazione funzione che estrae la parte decimale del prezzo finale
function extractDecimal(num) {
    return ((num - parseInt(num)).toFixed(2) * 100)
}

