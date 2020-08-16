

// ----- Functions for the back and next buttons -------
function next() {
  populateReview()
  let state = parseInt(this.dataset.state)
  document.querySelector('#state-'+state).style.display = "none"      // hides current state
  state++                                                             // updates state
  document.querySelector('#state-'+state).style.display = "block"    // shows new state

  populateResultsSelectors()     //updates the selectors in state 3

}

function back() {
  let state = parseInt(this.dataset.state)
  document.querySelector('#state-'+state).style.display = "none"       // hides current state
  state--                                                              // updates state
  document.querySelector('#state-'+state).style.display = "block"      // shows new state
}

// ----- Functions that remove things with the trash can icons
function removeResult() {
  this.parentElement.remove()
}

function removeQuestion() {
  this.parentElement.remove()
}

function removeAnswer() {
  this.parentElement.remove()
}


// ------ Function to add a result feild to the document (state 2) -----
function appendResult() {
  let i = document.querySelectorAll(".result-form").length
  i++
    // -------  Start creating the form  -------
    var div = document.createElement('div')
    div.setAttribute('class', 'result-form')

    var h4 = document.createElement('h4')                   //Header
    h4.innerText = "Result " + i
    var icon = document.createElement('div')
    icon.innerHTML = document.querySelector('#trash-can-icon').innerHTML
    icon.onclick = removeResult                                                       // Trashcan delete button
    var label1 = document.createElement('label')            //Result Name Label
    label1.setAttribute('for','result-name-' + i)
    label1.innerText = "Result Name:"
    var input1 = document.createElement('input')            //Result Name Input
    input1.setAttribute('type','text')
    input1.setAttribute('id', 'result-name-'+i)
    input1.setAttribute('class', 'result-name')
    input1.setAttribute('placeholder', 'e.g. Katara')
    var br = document.createElement('br')
    var label2 = document.createElement('label')            //Result Description Label
    label2.setAttribute('for', 'result-description-'+i)
    label2.innerText = "Result Description:"
    var input2 = document.createElement('textarea')         // Result Description Input
    input2.setAttribute('id', 'result-description-'+i)
    input2.setAttribute('class', 'result-description')
    input2.setAttribute('placeholder', 'e.g. A passionate water-bender')
    var hr = document.createElement('hr')                   // Horizontal Line

    if (i>2) {                         // Only show the icon if its after the first two results,
      div.appendChild(icon)            // assuring at least 2 results
    }
    div.appendChild(label1)
    div.appendChild(input1)
    div.appendChild(br)
    div.appendChild(label2)
    div.appendChild(input2)
    div.appendChild(hr)

    document.querySelector('#result-block').appendChild(div)

}

// -------- function to append a new question onto the document (state 3) ------
function appendQuestion() {

  let i = document.querySelectorAll('.question-form').length
  i++

  var questionForm = document.createElement('div')              // all elements go in here
  questionForm.setAttribute('class','question-form')

    var questionLabel = document.createElement('label')         // question body label
    questionLabel.setAttribute('for', 'question-body-'+i)
    questionLabel.innerText = 'Question:'
    var icon = document.createElement('div')
    icon.innerHTML = document.querySelector('#trash-can-icon').innerHTML   // trash can icon
    icon.onclick = removeQuestion
    var br = document.createElement('br')
    var questionInput = document.createElement('textarea')      // question body input
    questionInput.setAttribute('id','question-body-'+i)
    questionInput.setAttribute('class', 'question-body')

  var answersBlock = document.createElement('div')
  answersBlock.setAttribute('class','answers-block')
  var rowDiv = document.createElement('div')                     // row for the answers area
  rowDiv.setAttribute('class', 'row no-gutters')

    var colDiv1 = document.createElement('div')                  // make a column
    colDiv1.setAttribute('class','col')

      var answerLabel = document.createElement('label')         //create answer label
      answerLabel.innerText = 'Answer:'
      var answerInput = document.createElement('input')         //create answer input
      answerInput.setAttribute('type','text')
      answerInput.setAttribute('class','answer mx-auto')
      colDiv1.appendChild(answerLabel)
      colDiv1.appendChild(answerInput)                          // Put them in same column

    var colDiv2 = document.createElement('div')                 // make another column
    colDiv2.setAttribute('class','col')

      var resultSelectLabel = document.createElement('label')       // select label
      resultSelectLabel.innerText = 'For Result:'
      var resultSelectInput = document.createElement('select')      // result input
      resultSelectInput.setAttribute('class','result-selector')
      //  --------  This gets populated by function "populateSelector" when you hit "next" or "back"
      colDiv2.appendChild(resultSelectLabel)
      colDiv2.appendChild(resultSelectInput)

      var trashDiv = document.createElement('div')
      trashDiv.innerHTML = document.querySelector('#trash-can-icon-2').innerHTML
      trashDiv.onclick = removeAnswer

      rowDiv.appendChild(colDiv1)
      rowDiv.appendChild(colDiv2)
      rowDiv.appendChild(trashDiv)
      answersBlock.appendChild(rowDiv)


    var rowDiv2 = document.createElement('div')
    rowDiv2.setAttribute('class','row justify-content-center')
      var newAnswerButton = document.createElement('button')
      newAnswerButton.setAttribute('class', 'btn btn-link add-answer-button')
      newAnswerButton.innerText = 'Add answer'
      newAnswerButton.onclick = appendAnswer
      rowDiv2.appendChild(newAnswerButton)

    var hr = document.createElement('hr')


    questionForm.appendChild(icon)
    questionForm.appendChild(questionLabel)
    questionForm.appendChild(br)
    questionForm.appendChild(questionInput)
    questionForm.appendChild(answersBlock)
    questionForm.appendChild(rowDiv2)
    questionForm.appendChild(hr)

    /// ------- Now finally add it to the page ------
    document.querySelector('#question-block').appendChild(questionForm)
    // ----- and populate its selector
    populateResultsSelectors()
}

// ------ function to add another answer field onto the document (state 3)
function appendAnswer() {

  var rowDiv = document.createElement('div')                   // row for the answers area
  rowDiv.setAttribute('class', 'row no-gutters')

    var colDiv1 = document.createElement('div')                // make a column
    colDiv1.setAttribute('class','col')

      var answerLabel = document.createElement('label')           //create answer label
      answerLabel.innerText = 'Answer:'
      var answerInput = document.createElement('input')           //create answer input
      answerInput.setAttribute('type','text')
      answerInput.setAttribute('class','answer mx-auto')
      colDiv1.appendChild(answerLabel)
      colDiv1.appendChild(answerInput)                         // Put them in same column

    var colDiv2 = document.createElement('div')                // make another column
    colDiv2.setAttribute('class','col')

      var resultSelectLabel = document.createElement('label')       // select label
      resultSelectLabel.innerText = 'For Result:'
      var resultSelectInput = document.createElement('select')      // result input
      resultSelectInput.setAttribute('class','result-selector')

      var trashDiv = document.createElement('div')
      trashDiv.innerHTML = document.querySelector('#trash-can-icon-2').innerHTML
      trashDiv.onclick = removeAnswer

      //  --------  This gets populated by function "populateResultsSelectors" when you hit "next" or "back"
      colDiv2.appendChild(resultSelectLabel)
      colDiv2.appendChild(resultSelectInput)

      rowDiv.appendChild(colDiv1)         // put both columns into the row
      rowDiv.appendChild(colDiv2)
      rowDiv.appendChild(trashDiv)

      this.parentElement.parentElement.querySelector('.answers-block').appendChild(rowDiv) // append it on

      // populate the results again
      populateResultsSelectors()
}

function populateResultsSelectors() {
  // first clear all the selectors cause you do this a lot

  selectorNodes = document.querySelectorAll('.result-selector')
  selectorNodes.forEach(select => {
    value = select.value
    select.innerHTML = '' // initially clear it

    resultNameNodes = document.querySelectorAll('.result-name')
    resultNameNodes.forEach(element => {
      resultName = element.value
      var option = document.createElement('option')
      option.innerText = resultName
      option.value = resultName
      select.appendChild(option)
    })
    select.value = value
  })
}

function populateReview() {

  localStorage.clear()
  document.querySelector('#review-result-list').innerHTML = ''
  document.querySelector('#review-question-list').innerHTML = ''

  // --------- NAME AND AUTHOR -------- //
  quizName = document.querySelector('#quiz-name').value
  document.querySelector('#review-quiz-name').innerText = quizName   /// updates the quiz name
  authorName = document.querySelector('#author-name').value
  document.querySelector('#review-author-name').innerText = authorName  /// updates the author name

            // -- add them to local storage
            localStorage.setItem('quizName',quizName)
            localStorage.setItem('authorName',authorName)

// ------- POSSIBLE RESULTS ------- //
  document.querySelectorAll('.result-form').forEach(form => {      // go through each result-form

    resultName = form.querySelector('.result-name').value
    resultDescription = form.querySelector('.result-description').value

    resultObject = {resultName: resultName,
                    resultDescription: resultDescription
                    }
                    // ---- Put them in Local Storage
      if (localStorage.getItem('results')) {
      resultsList = JSON.parse(localStorage.getItem('results'))
      resultsList.push(resultObject)
      localStorage.setItem('results', JSON.stringify(resultsList))
    } else {
      resultsList = new Array
      resultsList.push(resultObject)
      localStorage.setItem('results', JSON.stringify(resultsList))
    }
                  // --- put them in the review-result-list
    var li = document.createElement('li')
    li.innerText =  `${resultName} - ${resultDescription}`
    document.querySelector('#review-result-list').appendChild(li)
  })

  // ----- QUESTIONS ------ ///

    questionsArray = new Array

  document.querySelectorAll('.question-form').forEach(form => {
    const answerArray = new Array
    const selectionArray = new Array
    const answerSelectionArray = new Array

    questionBody = form.querySelector('.question-body').value       // question body

    form.querySelectorAll('.answer').forEach(answer => {
      answerArray.push(answer.value)                                // put all the answers into an array
    })
    form.querySelectorAll('.result-selector').forEach(selector => {
      selectionArray.push(selector.value)                           // Put all the corresponding results
    })
                                                                 // into an array.
    for (i=0; i<answerArray.length; i++) {
      entry = {answerBody: answerArray[i],                         // now we got {answer: answer, result: result}
                answerResult: selectionArray[i]}

      answerSelectionArray.push(entry)
      }

    questionObject = new Object
    questionObject = {questionBody: questionBody,
                      answers: answerSelectionArray}
    questionsArray.push(questionObject)

  })

    localStorage.setItem('questions', JSON.stringify(questionsArray))

    /// Now use the questionsArray to generate HTML on the results Page

    for (i=0; i<questionsArray.length; i++) {
      questionObject = questionsArray[i]
      body = questionObject.questionBody
      var ul = document.createElement('ul')
      ul.innerText = body

      answerArray = questionObject.answers
      answerArray.forEach(object => {
        answerBody = object.answerBody
        answerResult = object.answerResult
        string = `${answerBody} - ${answerResult}`
        var li = document.createElement('li')
        li.innerText = string
        ul.appendChild(li)
      })
      var listItem = document.createElement('li')
      listItem.appendChild(ul)
      document.querySelector('#review-question-list').appendChild(listItem)
    }

}

function finishQuiz() {
  // I send the localStorage data to the server
  fetch('/new/make-quiz-fetch', {
  method: 'POST',
  body: JSON.stringify(localStorage)
})
.then(response => response.json())
.then(result => {
  console.log(result)
  if (result.message == "success") {
    quizUrl = '/quiz/'+result.url
    document.querySelector('#new-quiz-link').setAttribute('href',quizUrl)
    document.querySelector('#new-quiz-url').value = 'localhost:8000'+quizUrl

    document.querySelector('#state-5').style.display = "block"
    document.querySelector('#state-4').style.display = "none"
  }

  })
}

function copyQuizUrl() {
  /* Get the text field */
  var copyText = document.querySelector("#new-quiz-url")

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand("copy");

  /* Alert the copied text */
  alert("Copied the text: " + copyText.value);
}

// ------- ON PAGE LOAD -------------
document.addEventListener("DOMContentLoaded", () => {

      //  ----- Configure the back, next, finish buttons ------
    document.querySelectorAll(".back-button").forEach(element => {
      element.onclick = back
    })
    document.querySelectorAll(".next-button").forEach(element => {
      element.onclick = next
    })
    document.querySelector('#finish-quiz-button').onclick = finishQuiz
    //  ----- Configure the "add another result" button -------
    document.querySelector('#add-result-button').onclick = appendResult

    // ---- configure add question button -------
    document.querySelector('#add-question-button').onclick = appendQuestion

    // --- configure the copy url button
    document.querySelector('#url-copy-button').onclick = copyQuizUrl
    // ------ Populate the result block initially
    appendResult()
    appendResult()
    // ------ Populate the question block initially
    appendQuestion()


})
