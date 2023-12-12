import data from '/data/data.js'

// ---------------------- DOM ELEMENTS ----------------------
const questionNumber = document.getElementById('number');
const question = document.getElementById('question');
const answers = document.getElementById('answers');
const btnNext = document.getElementById('nextButton');
const secondsTimer = document.getElementById('seconds');


// ---------------------- VARIABILI SCOPE GLOBALI----------------------
let punteggio = 0; // PUNTEGGIO che tiene il conto delle risposte corrette inizializzato a 0
let actualQuestion = 1; // Inizializzo una variabile per tener conto delle domande effettuate
let pickQuestion = 0; // Indice delle domande
let arrayRand; // Variabile che accoglie l'array domande randomizzato da randomizeArray
let submitAnswer = ''; // Contiene di volta in volta la risposta inserita dall'utente
