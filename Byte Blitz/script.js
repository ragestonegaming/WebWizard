fetch('https://opentdb.com/api.php?amount=1&type=multiple')
  .then(response => response.json())
  .then(data => {
    const quizData = data.results[0];
    const question = quizData.question;
    const correctAnswer = quizData.correct_answer;
    const incorrectAnswers = quizData.incorrect_answers;

    // Display the question and answers on your webpage
    console.log('Question:', question);
    console.log('Correct Answer:', correctAnswer);
    console.log('Incorrect Answers:', incorrectAnswers);
  })
  .catch(error => console.error('Error fetching quiz:', error));
