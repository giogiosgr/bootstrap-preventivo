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

//dichiarazione arrai di oggetti di tipo lavoro, con i lavori possibili e relativi prezzi
const jobsCollection = [
    {
        type: "Sviluppo Backend",
        price: 20.50
    },
    {
        type: "Sviluppo Frontend",
        price: 15.30
    },
    {
        type: "Analisi Progettuale",
        price: 33.60
    }
];

//viene richiamata la funzione per il popolamento, passando l'array con gli oggetti
addOptions(jobsCollection);

//aggiunta evento al submit del form con funzione che richiamerà il prezzo del calcolo
form.addEventListener("submit", function (event) {
    //annullamento del comportamento di default del form al submit
    event.preventDefault();

    //reset dell'invisibilità dell'errore del codice, nel caso sia stato reso visibile in precedenza
    warningCodeText.classList.add("d-none");

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
        //quindi viene applicato uno stile con boxshadow per contornare in rosso la checkbox stessa
        checkElement.style.boxShadow = "0px 0px 5px 2px #FF2D00";
    };
}
);

//aggiunta evento alla checkbox, con lo scopo di togliere le proprietà di errore se l'utente spunta la casella
checkElement.addEventListener('change', function (event) {
    if (event.currentTarget.checked) {
        warningCheckText.classList.add('d-none');
        checkElement.style.boxShadow = "none";
    }
})

//dichiarazione funzione per il calcolo del prezzo finale
function calculatePrice() {
    //si estrae il valore corrispondente al lavoro scelto dal select, sottratto uno per usarlo poi come indice
    selectedJob = selectInput.value - 1;

    //il valore di selectedJob è l'indice usato per recuperare l'oggetto del lavoro e il prezzo relativo
    currentHourPrice = jobsCollection[selectedJob].price;

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

    //estrazione della parte decimale (arrotondata a due cifre) del prezzo
    decimalPrice = fullPrice.toFixed(2).split(".")[1];

    //assegnazione delle parti intera e decimale del prezzo agli elementi dedicati del DOM
    intSpan.innerText = `€ ${intPrice}`;
    decimalSpan.innerText = `,${decimalPrice}`;

    //il container del prezzo viene reso visibile
    priceText.classList.remove('d-none');
};

//dichiarazione funzione per il popolamento dell'elemento select del DOM
function addOptions(jobs) {
    //variabile stringa che conterrà il codice HTML man mano aggiunto
    let htmlString = "";
    //iterazione per ogni elemento dell'array parametro, contenente gli oggetti di tipo job
    jobs.forEach(function (elem, index) {
        //alla stringa codice viene aggiunta una option con valore e testo di riferimento
        htmlString += `<option value="${index + 1}">${elem.type}</option>`;
    });
    //all'elemento select viene aggiunta la stringa con le option, prima del tag di chiusura
    selectInput.insertAdjacentHTML("beforeend", htmlString);
};