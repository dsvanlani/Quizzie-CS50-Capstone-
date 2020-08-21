# Quizzie 
This web application is based on those "Which (blank) 
are you?" quizzes you come across on social media.

On the site users can browse quizzes made by other 
users as well as use the "Create Quiz" tool to make 
their own quizzes which they can then share with
their friends with a unique link.

####Capstone for CS50 Web

First and foremost I designed this project as the final
component to Harvard's CS50: Web course.  I believe this
meets the requirements for the following reasoning.

The site is ran by the Django framework on the backend, utilizing 
four models (namely: Quiz, Result, Question, and Answer).  Additionally the 
site runs with two javascript files, make-quiz.js and take-quiz.js.

As far as complexity goes the Create Quiz feature is a Single-Page-Application
(SPA) with six distinct views.  Additionally Result and Question views (Steps 2+3) are
dynamic forms where the user controls the length and number of results/questions and 
corresponding answers.  Indeed the site is designed that the number of Results, Questions, and Answers
for each question is entirely up to the user - the Site will handle it the same and 
commit it to the database via a single fetch request.

The Take Quiz feature is another SPA with three
views and the "result" view will change dynamically to the 
contents of the form.

A search feature is included at every page except the home - for aesthetic 
reasons.  This is a feature distinct from the method of the search feature of Wiki as 
it directly queries a database.

Additionally for complexity on the front end I've utilized more Bootstrap
components than any other previous project including: 
* Nav Bar
* Alerts
* Buttons
* Collapse
* Progress

I've also used my own CSS to increase the branded appearance
of the site.

##Contents

    Quiz
    --Quiz
        __init__.py
        asgi.py
        settings.py
        urls.py
        wsgi.py
    --quizapp
        migrations
        static
            images
                favicon.png
                logo_transparent.png
            javascript
                make-quiz.js
                take-quiz.js
            stylesheets
                style.css
                style.scss
                style.css.map
        templates
            quizapp
                home.html
                layout.html
                make-quiz.html
                quiz-list.html
                take-quiz.html
        __init__.py
        admin.py
        apps.py
        models.py
        tests.py
        urls.py
        views.py
    --db.squlite3
    manage.ppy
    README.md 
            

A summary of notable files:

###Quiz/urls.py
Project URL paths, note line 21 linking to the quizapp.urls paths.

### quizapp/migrations
Metadata for the squlite database migrations.

### quzapp/static/images
A directory containing two images used for the site brand.

### quizapp/javascript/make-quiz.js
The most complex code file of the project, this is linked to from /new (make-quiz.html).
It contains the following functions:
* next() - goes to next view
* back() - goes to previous view
* removeResult() - the onclick of the trashcan icon that removes 
a possible result.
* removeQuestion() - similar to removeResult but with a question
* removeAnswer() - similar to, you guessed it, removeQuestion but removes an answer.
Notably a bit different as it takes away a row in the table.
* appendResult() - Adds a result to the result-view (step 2).  Called once on
page load.
* appendQuestion() - Adds a question to question view (step3 3).  Called
twice on page load.
* appendAnswer() - Adds an answer to the question block its contained in.  
Notably not called on page load.
populateResultSelectors() - queries the page and gets a list of all
the Results filled out on Step 2 and then updates all the selects of the page.
Called with Next(), appendQuestion(), and appendAnswer().
* populateReview() - queries the page for quiz title, author, results, questions, and answers
and then summarizzes them on the review page (step 4).  Called on each next()
* finishQuiz() - First checks that all the required fields are satisfied, if not
it displays an alert on the top of the screen with a link to the missing field.
If all fields are satisfied it sends a fetch request to /new/make-quiz-fetch
where it passes in localStorage with all the info stored.
* copyQuizUrl() - copies the given url in the textarea on the final
view of make-quiz.
* goToError() - displays the view with the first empty required-field.

The local storage variable is as follows: 

    {quizName: "blah"
     authorName: "Jake"
     results: [ -- list of objects --
                {resultName: 'result1name',
                 resultDescription: 'result1Description'}
                 ]
     questions: [ -- list of objects 000
                {questionBody: "question body",
                 answers: [ -- list of objects --
                           {answerBody: "foo",
                            answerresult: "result1"}
                            ]
                            }
                            



### quizapp/javascript/take-quiz.js
The javascript file linked in take-quiz.html or /quiz/[str:quizUrl].  Contains the
following functions:
* getStarted() - the onclick property of the button on the first view.  Switches to the question view.
* findWinner(object) - takes in a javascript object in the form of :
{"result 1": (int - result 1 tally),
 "result 2": ...etc }
 and returns the name of the key with most tallies.
 * getResults() - goes through all the questions and counts the tallies for each selected answer
 
### quizapp/templates
* home.html - HTML file for the homepage.  Notably no navigation bar
* layout.html - the layout file for the site - contains links to the CSS, and bootstrap javascript
* make-quiz.html - the HTML file for the create quiz feature, inherits from layout.html
* quiz-list.html - the HTML file for the Browse Quizzes/search feature
* take-quiz.html - the HTML file for the take-quiz feature

### quizapp/views.py

Contains the views for the quizapp application. Which are:
* home (/)
* quiz_list (/all-quizzes)
* random_quiz (/random-quiz) - redirects to a random take quiz
* make_quiz (/new)
* make_quiz_fetch - only used by the fetch request in make-quiz.js
* take_quiz (/quiz/[str: quizurl])

### quizapp/models.py
Contains the models for the quizapp application:
* Quiz 
    * author (varchar)
    * title (varchar)
* Result
    * result_title (varchar)
    * result_description textfield
    * quiz (foreign key to Quiz)
* Question
    * text (text field)
    * quiz (foreign key to Quiz)
* Answer
    * text (varChar)
    * question (FK to Question)
    * quiz (FK to Quiz)