from django.http import JsonResponse
from django.shortcuts import render, redirect
import json
from secrets import token_urlsafe
from quizapp.models import *
import traceback
from random import randrange

#Functions

def getSearchResults(string):
    quizzes = Quiz.objects.filter(title__icontains=string)
    quizzes |= Quiz.objects.filter(author__icontains=string)
    return quizzes


# Create your views here.
from django.views.decorators.csrf import csrf_exempt


def home(request):
    context = {
        "navbar_exempt": True
    }
    return render(request, 'quizapp/home.html', context)


def quiz_list(request):
    try:
        quizzes = getSearchResults(request.GET['search'])
        context = {
            "quizzes": quizzes,
            "search": request.GET['search']
        }
    except:
        quizzes = Quiz.objects.all()
        context = {
            "quizzes": quizzes
        }

    return render(request, 'quizapp/quiz-list.html', context)

def random_quiz(request):
    all_quizzes = Quiz.objects.all()
    quiz = all_quizzes[randrange(len(all_quizzes))]

    return redirect('/quiz/'+quiz.url)

def make_quiz(request):
    return render(request, 'quizapp/make-quiz.html')


@csrf_exempt
def make_quiz_fetch(request):
    try:
        # Printing out the data to the console
        data = json.loads(request.body)
        print('Quiz Title:', data['quizName'])
        print('Author:', data['authorName'])
        results = json.loads(data['results'])
        print('Results:')
        for result in results:
            print('\t', result['resultName'], '-', result['resultDescription'])

        print('Questions:')
        questions = json.loads(data['questions'])
        for question in questions:
            print(question['questionBody'])
            answers = question['answers']
            for answer in answers:
                print('\t', '\t', f'{answer["answerBody"]} - {answer["answerResult"]}')

        #Adding the Quiz to the database

        new_quiz = Quiz(title=data['quizName'],
                    author=data['authorName'],
                    url=token_urlsafe(16))
        new_quiz.save()

        for result in results:
            new_result = Result(result_title=result['resultName'],
                                result_description=result['resultDescription'],
                                quiz=new_quiz)
            new_result.save()

        for question in questions:
            new_question = Question(text=question['questionBody'],
                                    quiz=new_quiz)
            new_question.save()
            for answer in question['answers']:
                new_answer = Answer(text=answer['answerBody'],
                                    for_result=Result.objects.filter(quiz=new_quiz).get(result_title=answer['answerResult']),
                                    question=new_question)
                new_answer.save()

        message = {"message": "success",
                   "url": new_quiz.url}

    except BaseException as e:
        message = {"message": "failed",
                   "error:": e.__str__()}
        traceback.print_tb(e.__traceback__)
        print(e.__str__())


    return JsonResponse(message)

def take_quiz(request, quiz_url):
    quiz = Quiz.objects.get(url=quiz_url)
    questions = Question.objects.filter(quiz=quiz)
    i=1
    answers = Answer.objects.none()
    for question in questions:
        question.question_number = i
        i += 1
        answers |= Answer.objects.filter(question=question)

    results = Result.objects.filter(quiz=quiz)

    context = {
        'quiz': quiz,
        'questions': questions,
        'answers': answers,
        'results': results
    }
    return render(request, 'quizapp/take-quiz.html', context)
