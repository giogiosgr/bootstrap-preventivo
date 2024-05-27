'use strict';

/* dichiarazione variabili inizializzate con gli oggetti del DOM da manipolare */
//form dell'input
const form = document.querySelector('form');
//select con le opzioni
const selectInput = document.getElementById('select');
//elemento di input del codice sconto
const codeInput = document.getElementById('code');
//elemento per il feedback (tramite testo) sull'inserimento del codice sconto
const warningCodeText = document.getElementById('warningCode');
//elemento con il testo intero prezzo intero finale
const priceText = document.getElementById('price');
//elemento con la parte intera del prezzo finale
const intSpan = document.getElementById('int');
//elemento con la parte decimale del prezzo finale
const decimalSpan = document.getElementById('decimal');
//elemento con la parte decimale del prezzo finale
const checkElement = document.getElementById('checkbox');
//bottone di submit del form
const buttonInput = document.getElementById('submit');
//elemento con il testo di errore per la checkbox, nel caso non sia spuntata al momento del submit
const warningCheckText = document.getElementById('warningCheck');

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

//dichiarazione oggetto con i lavori possibili e relativi prezzi
const jobsObj = {
    "Sviluppo Backend": 20.50,
    "Sviluppo Frontend": 15.30,
    "Analisi Progettuale": 33.60
};

//viene richiamata la funzione per il popolamento, passando l'oggetto con i lavori
addOptions(jobsObj);

//aggiunta evento al submit del form con funzione che richiamerà il prezzo del calcolo
form.addEventListener("submit", function (event) {
    //annullamento del comportamento di default del form al submit
    event.preventDefault();

    //reset dell'invisibilità dei messaggi di errore, nel caso siano stati resi visibili in precedenza
    warningCodeText.classList.add("d-none");
    warningCheckText.classList.add('d-none');
    //condizione di controllo che la property checked della checkbox sia true.
    if (checkElement.checked) {
        //viene aperto un pop-up per simulare un feedback all'utente sulla generazione del preventivo
        alert("Sto calcolando un nuovo preventivo");
        //si richiama la funzione dedicata al calcolo
        calculatePrice();
    }
    else {
        //altrimenti, viene reso visibile il messaggio di errore dedicato nel DOM
        warningCheckText.classList.remove('d-none');
    };
}
);

//dichiarazione funzione per il calcolo del prezzo finale
function calculatePrice() {
    //si estrae il valore corrispondente al lavoro scelto dal select
    selectedJob = selectInput.value;

    //il valore di selectedJob è la chiave usata per assegnare il valore corrente alla variabile dedicata
    currentHourPrice = jobsObj[selectedJob];

    //calcolo del prezzo finale
    fullPrice = currentHourPrice * jobHours;

    //si prende il valore del codice promozionale inserito, reso maiuscolo, per confronto case insensitive
    usedCode = codeInput.value.toUpperCase();

    //condizione di verifica che sia stato effettivamente inserito un codice
    if (usedCode !== "") {
        //condizione di verifica che il codice usato sia uno di quello validi
        if (codes.includes(usedCode)) {
            //se sì, allora il prezzo finale è scontato del 25%
            fullPrice -= fullPrice * (discount / 100);
            //nell'elemento dedicato si inserisce un messaggio di buon esito in verde
            warningCodeText.classList.remove("text-danger");
            warningCodeText.classList.add("text-success");
            warningCodeText.innerText = "Il codice inserito è valido, il prezzo finale è scontato del 25%";
            //quindi l'elemento viene reso visibile
            warningCodeText.classList.remove("d-none");
        }
        //altrimenti, viene mostrato un messaggio di errore in rosso
        else {
            warningCodeText.classList.remove("text-success");
            warningCodeText.classList.add("text-danger");
            warningCodeText.innerText = "Il codice inserito non è valido, il prezzo finale è calcolato per intero";
            warningCodeText.classList.remove("d-none");
        };
    };

    //estrazione della parte intera del prezzo
    intPrice = parseInt(fullPrice);

    //estrazione della parte decimale del prezzo, considerando due cifre, richiamando la funzione dedicata
    decimalPrice = extractDecimal(fullPrice, 2);

    //assegnazione delle parti intera e decimale del prezzo agli elementi dedicati del DOM
    intSpan.innerText = `€ ${intPrice}`;
    decimalSpan.innerText = `,${decimalPrice}`;

    //il container del prezzo viene reso visibile
    priceText.classList.remove('d-none');
};

//dichiarazione funzione che estrae la parte decimale del prezzo finale
function extractDecimal(num, n) {
    //si considera solo la parte decimale del numero, con n cifre, convertendo il risultato in stringa
    const decimal = ((num - parseInt(num)).toFixed(n)).toString();
    //viene restituita solo la parte decimale, dalla parte della stringa posta dopo il punto
    return decimal.split(".")[1];
};

//dichiarazione funzione per il popolamento dell'elemento select del DOM
function addOptions(obj) {
    //variabile stringa che conterrà il codice HTML man mano aggiunto
    let htmlString = "";
    //iterazione per ogni elemento dell'array, formato dalle chiavi dell'oggetto passato come parametro alla funzione
    Object.keys(obj).forEach(function (elem) {
        //alla stringa codice viene aggiunta una option con classe e testo
        htmlString += `<option value="${elem}">${elem}</option>`;
    });
    //all'elemento select viene aggiunta la stringa con le option, prima del tag di chiusura
    selectInput.insertAdjacentHTML("beforeend", htmlString);
};