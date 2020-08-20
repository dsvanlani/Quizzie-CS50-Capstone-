function getStarted() {
  document.querySelector('#welcome-view').style.display = "none"
  document.querySelectorAll(".question-view").forEach(view => {
    view.style.display = "block"
  })
}

function findWinner(object) {
  voters = object
  keys = Object.keys(object)
  winner = keys[0]

  for (i=0; i<keys.length; i++) {
    if (voters[winner] <= voters[keys[i]]) {
      winner = keys[i]
    }
  }
  return winner
}

function getResults() {
  votes = new Object                                      // Initialize votes to 0
  document.querySelectorAll('.result-view').forEach(element => {
    votes[element.dataset.resultname] = 0
  })

  document.querySelectorAll('input').forEach(input => {   // Count Up the Votes
    if (input.checked) {
      result = input.dataset.result
      votes[result]++
    }
  })

  winner = findWinner(votes)                              // finds the winner
  winnerNoSpaces = winner.split(" ").join("")

  document.querySelector('#result-'+winnerNoSpaces).style.display= "block"
  document.querySelectorAll('.question-view').forEach(view => {
    view.style.display = "none"
  })
}

document.addEventListener("DOMContentLoaded", () => {
  // ------------ CONFIGURE BUTTONS  ------------------
  document.querySelector('#get-started-button').onclick = getStarted
  document.querySelector('#get-results-button').onclick = getResults

})
