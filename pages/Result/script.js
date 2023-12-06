const risultatoQuiz = localStorage.getItem('punteggioFinale');
//console.log(risultatoQuiz * 10 + "%");
let risultatoVisibile = risultatoQuiz * 10 + "%";
document.getElementById("result").innerHTML = risultatoVisibile;