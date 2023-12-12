// Test aggiunta grafico torta de risultati finali

const risultatoQuiz = localStorage.getItem('punteggioFinale');
//console.log(risultatoQuiz * 10 + "%");
let risultatoVisibile = risultatoQuiz * 10 + "%";
let risultatiSbagliati = 10 - risultatoVisibile;

const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Green', 'Red',],
      datasets: [{
        label: 'Risultati',
        data: [risultatoVisibile, risultatiSbagliati],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  

