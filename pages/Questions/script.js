import data from '/data/data.js';  // Importa i dati dal modulo '/data/data.js'

// ---------------------- ELEMENTI DEL DOM ----------------------
const questionNumber = document.getElementById('number');  // Ottieni l'elemento con id 'number'
const question = document.getElementById('question');  // Ottieni l'elemento con id 'question'
const answers = document.getElementById('answers');  // Ottieni l'elemento con id 'answers'
const btnNext = document.getElementById('nextButton');  // Ottieni l'elemento con id 'nextButton'
document.getElementById('questionLength').innerHTML = data.length;  // Imposta il contenuto dell'elemento con id 'questionLength' con la lunghezza dei dati
const timer = document.getElementById('timer');

// ---------------------- VARIABILI GLOBALI ----------------------
let punteggio = 0;  // Punteggio inizializzato a 0
let actualQuestion = 1;  // Inizializza la variabile per tener conto delle domande
let pickQuestion = 0;  // Indice delle domande
let submitAnswer = '';  // Contiene la risposta selezionata dall'utente
let timerDisplay = 60000;

// ---------------------- RANDOMIZZA LE DOMANDE NEL DOM ----------------------
const randomArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];  // Scambia le posizioni degli elementi nell'array
  }
  return arr;
};

// ---------------------- ASSOCIA LA FUNZIONE RANDOMIZEARRAY ----------------------
let randomData = randomArray(data);  // Ottieni un array di dati randomizzato

const updateTimer = () => {
    timerDisplay--;

    // Display dei secondi
    timer.innerHTML = timerDisplay < 10 ? `0${timerDisplay}` : timerDisplay;

    if (timerDisplay <= 0) {
        clearInterval(timerInterval);
        nextQuestion();
    }
};

let timerInterval; // Variabile che store gli intervalli

// Start del timer
const startTimer = () => {
    timerDisplay = 60; // Resetto il timer a 60
    timer.innerHTML = timerDisplay; // Mostro il valore iniziale di 60
    timerInterval = setInterval(updateTimer, 1000); // Faccio l'update del valore ogni secondo
};

// Stoppo il timer
const stopTimer = () => {
    clearInterval(timerInterval);
};

// Resetto il timer
const resetTimer = () => {
    clearInterval(timerInterval);
    timer.innerHTML = '60'; // Resetto il display 
};

// ---------------------- FUNZIONE PRINCIPALE ----------------------
const displayQuestion = () => {
    const currentQuestion = randomData[pickQuestion];  // Ottieni la domanda corrente

    questionNumber.innerHTML = actualQuestion;  // Imposta il numero della domanda nel DOM
    question.innerHTML = currentQuestion.question;  // Imposta il testo della domanda nel DOM

    answers.innerHTML = '';  // RIMUOVI le risposte precedenti dal DOM

    const allAnswers = [currentQuestion.correct_answer, ...currentQuestion.incorrect_answers];  // Crea un array con tutte le risposte
    const randomAnswers = randomArray(allAnswers);  // Randomizza l'array delle risposte

    startTimer(); // Starto il timer ogni nuova domanda

    // Itera attraverso le risposte randomizzate
    for (const answer of randomAnswers) {
        // Crea un pulsante per la risposta corrente
        const option = createAnswerButton(answer);
        // Aggiungi il pulsante al DOM
        answers.appendChild(option);
    }

    setTimeout(() => {
        stopTimer();
        nextQuestion();
    }, timerDisplay * 1000);
    
    // Funzione per creare un pulsante di risposta
    function createAnswerButton(answer) {
        // Crea un elemento button
        const option = document.createElement('button');
        // Aggiungi la classe 'btnAnswer' all'elemento button
        option.classList.add('btnAnswer');
        // Imposta il testo del button con la risposta
        option.innerHTML = answer;
        
        // Aggiungi un listener per gestire il click sulla risposta
        option.addEventListener('click', () => {
            selectAnswer(answer);
            clearInterval(timeOutQuestions); // clear the interval after displaying the next question
        });
        
    // Restituisci il pulsante creato
    return option;
    }
};

const selectAnswer = (selectedAnswer) => {
  submitAnswer = selectedAnswer;  // Imposta la risposta selezionata dall'utente
};

// Modifica la tua funzione nextQuestion
const nextQuestion = () => {
    resetTimer(); // Resetto il timer ad ogni nuova domanda
        actualQuestion++; // Incrementa il numero della domanda
        if (submitAnswer === randomData[pickQuestion].correct_answer) {
            punteggio++;  // Incrementa il punteggio se la risposta è corretta
        }

        pickQuestion++;  // Incrementa l'indice delle domande
  
        if (actualQuestion <= data.length) {
            displayQuestion();  // Visualizza la prossima domanda
        } else {
            console.log('Quiz completed. Final Score:', punteggio);  // Output del punteggio finale
                if (punteggio < 7) {
                    console.log("Ci dispiace, Non hai superato l'esame del modulo M2!");  // Output specifico per punteggi bassi
                } else {
                    console.log("Hai superato l'esame del modulo M2! Congratulazioni!");
                }
            localStorage.setItem('punteggioFinale', punteggio); //creazione della local storage del punteggio finale

            window.location.href = '/pages/Result/Result.html'; //passaggio alla schermata del risultato
        }
  
    submitAnswer = '';  // Resetta la risposta selezionata
};

btnNext.addEventListener('click', nextQuestion);  // Aggiungi un listener per gestire il click sul button 'Next'

displayQuestion();  // Fai partire le domande e mostra la prima domanda all'avvio
