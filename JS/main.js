'use strict';

//dichiarazione variabili inizializzate con gli oggetti del DOM da manipolare
const form = document.querySelector('form');
const selectInput = document.getElementById('select');
const codeInput = document.getElementById('code');
const warningText = document.getElementById('warning');
const priceText = document.getElementById('price');
const intSpan = document.getElementById('int');
const decimalSpan = document.getElementById('decimal');

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

//dichiarazione funzione per il popolamento dell'elemento select del DOM
function addOptions(arr) {
    //variabile stringa che conterrà il codice HTML man mano aggiunto
    let htmlString = "";
    //iterazione per ogni elemento dell'array passato come parametro alla funzione
    arr.forEach(function (elem) {
        //alla stringa codice viene aggiunta una option con classe e testo
        htmlString += `<option value="${elem}">${elem}</option>`;
    })
    //all'elemento select viene aggiunta la stringa con le option, prima del tag di chiusura
    selectInput.insertAdjacentHTML("beforeend", htmlString);
}

//viene richiamata la funzione per il popolamento, passando la lista dei lavori
addOptions(["Sviluppo Backend", "Sviluppo Frontend", "Analisi Progettuale"]);

//dichiarazione oggetto con i prezzi orari dei lavori possibili
const prices = {
    "Sviluppo Backend": 20.50,
    "Sviluppo Frontend": 15.30,
    "Analisi Progettuale": 33.60
};

//aggiunta evento al submit del form con funzione per il calcolo del prezzo finale
form.addEventListener("submit", function (event) {
    //annullamento del comportamento di default del form al submit
    event.preventDefault();

    //si estrae il valore corrispondente al lavoro scelto dal select
    selectedJob = selectInput.value;

    //il valore di selectedJob è la chiave usata per assegnare il valore corrente alla variabile dedicata
    currentHourPrice = prices[selectedJob];

    //calcolo del prezzo finale
    fullPrice = currentHourPrice * jobHours;

    //si estrae il valore del codice promozionale inserito, SE inserito
    usedCode = codeInput.value;

    //nel caso il messaggio di errore fosse stato reso visibile in precedenza, viene nascosto nuovamente
    warningText.classList.add("d-none");
    //condizione di verifica che sia stato effettivamente inserito un codice
    if (usedCode !== "") {
        //condizione di verifica che il codice usato sia uno di quello validi
        if (codes.includes(usedCode)) {
            //se sì, allora il prezzo finale è scontato del 25%
            fullPrice -= fullPrice * (discount / 100);
        }
        //altrimenti, l'elemento con il messaggio di errore nel DOM viene reso visibile
        else {
            warningText.classList.remove("d-none");
        }
    }

    //il prezzo viene arrotondato a due cifre decimali
    fullPrice = fullPrice.toFixed(2);

    //estrazione della parte intera del prezzo
    intPrice = parseInt(fullPrice);

    //estrazione della parte decimale del prezzo, richiamando la funzione creata
    decimalPrice = extractDecimal(fullPrice);

    //assegnazione delle parti intera e decimale del prezzo agli elementi dedicati del DOM
    intSpan.innerText = `€ ${intPrice}`;
    decimalSpan.innerText = `,${decimalPrice}`;

    //il container del prezzo viene reso visibile
    priceText.classList.remove('d-none');
}
)