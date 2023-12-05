import data from '/data/data.js';  // Importa i dati dal modulo '/data/data.js'

// ---------------------- ELEMENTI DEL DOM ----------------------
const questionNumber = document.getElementById('number');  // Ottieni l'elemento con id 'number'
const question = document.getElementById('question');  // Ottieni l'elemento con id 'question'
const answers = document.getElementById('answers');  // Ottieni l'elemento con id 'answers'
const btnNext = document.getElementById('nextButton');  // Ottieni l'elemento con id 'nextButton'
document.getElementById('questionLength').innerHTML = data.length;  // Imposta il contenuto dell'elemento con id 'questionLength' con la lunghezza dei dati

// ---------------------- VARIABILI GLOBALI ----------------------
let punteggio = 0;  // Punteggio inizializzato a 0
let actualQuestion = 1;  // Inizializza la variabile per tener conto delle domande
let pickQuestion = 0;  // Indice delle domande
let submitAnswer = '';  // Contiene la risposta selezionata dall'utente

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

const displayQuestion = () => {
  const currentQuestion = randomData[pickQuestion];  // Ottieni la domanda corrente

  questionNumber.innerHTML = actualQuestion;  // Imposta il numero della domanda nel DOM
  question.innerHTML = currentQuestion.question;  // Imposta il testo della domanda nel DOM

  answers.innerHTML = '';  // Pulisci le risposte precedenti nel DOM

  const allAnswers = [currentQuestion.correct_answer, ...currentQuestion.incorrect_answers];  // Crea un array con tutte le risposte
  const randomAnswers = randomArray(allAnswers);  // Randomizza l'array delle risposte

  randomAnswers.forEach((answer) => {
    const option = document.createElement('button');  // Crea un elemento button
    option.classList.add('btnAnswer');  // Aggiungi la classe 'btnAnswer' all'elemento button
    option.className = 'btnAnswer';  // Imposta la classe 'btnAnswer' all'elemento button
    option.innerHTML = answer;  // Imposta il testo del button con la risposta
    option.addEventListener('click', () => selectAnswer(answer));  // Aggiungi un listener per gestire il click sulla risposta
    answers.appendChild(option);  // Aggiungi il button all'elemento con id 'answers'
  });
};

const selectAnswer = (selectedAnswer) => {
  submitAnswer = selectedAnswer;  // Imposta la risposta selezionata dall'utente
};

const nextQuestion = () => {
  if (submitAnswer !== '') {
    actualQuestion++;  // Incrementa il numero della domanda
    if (submitAnswer === randomData[pickQuestion].correct_answer) {
      punteggio++;  // Incrementa il punteggio se la risposta è corretta
    }

    pickQuestion++;  // Incrementa l'indice delle domande

    if (actualQuestion <= data.length) {
      displayQuestion();  // Visualizza la prossima domanda
    } else {
      console.log('Quiz completed. Final Score:', punteggio);  // Output del punteggio finale
      if (punteggio <= 7) {
        console.log('Fai cacare anche in questi quiz');  // Output specifico per punteggi bassi
      }
    }

    submitAnswer = '';  // Resetta la risposta selezionata
  } else {
    alert('Seleziona una risposta prima di passare alla domanda successiva');  // Avviso se non è stata selezionata una risposta
  }
};

btnNext.addEventListener('click', nextQuestion);  // Aggiungi un listener per gestire il click sul button 'Next'

displayQuestion();  // Mostra la prima domanda all'avvio

