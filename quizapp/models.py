from django.db import models

# Create your models here.

class Quiz(models.Model):
    title = models.CharField(max_length=64)
    author = models.CharField(max_length=64)
    url = models.CharField(max_length=16, null=True)
    def __str__(self):
        return f'{self.title} by {self.author}'

class Result(models.Model):
    result_title = models.CharField(max_length=64)
    result_description = models.TextField()
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.result_title}'

class Question(models.Model):
    text = models.TextField()
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.text}'

class Answer(models.Model):
    text = models.TextField()
    for_result = models.ForeignKey(Result, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.text}'