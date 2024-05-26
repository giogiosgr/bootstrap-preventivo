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

//dichiarazione funzione che estrae la parte decimale del prezzo finale
function extractDecimal(num) {
    //si considera solo la parte decimale del numero, convertendo il risultato in stringa
    const decimal = ((num - parseInt(num)).toFixed(2)).toString();
    //viene restituita solo la parte decimale, dalla parte della stringa posta dopo il punto
    return decimal.split(".")[1];
}

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
        //nel caso il messaggio di errore fosse stato reso visibile in precedenza, viene ora nascosto
        warningText.classList.add("d-none");
    }
    //altrimenti, l'elemento con il messaggio di errore nel DOM viene reso visibile, SE il campo non è vuoto
    else if (usedCode !== "") {
        warningText.classList.remove("d-none");
    }

    //il prezzo viene arrotondato a due cifre decimali
    fullPrice = fullPrice.toFixed(2);

    //estrazione della parte intera del prezzo
    intPrice = parseInt(fullPrice);

    //estrazione della parte decimale del prezzo (richiamando la funzione dedicata)
    decimalPrice = extractDecimal(fullPrice);

    //assegnazione delle parti intera e decimale del prezzo agli elementi dedicati del DOM
    intSpan.innerText = `€${intPrice}`;
    decimalSpan.innerText = `,${decimalPrice}`;

    //il container del prezzo viene reso visibile
    priceText.classList.remove('d-none');
}
)