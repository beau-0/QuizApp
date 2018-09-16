'use strict';

var quizData = {
  questionData:
    [{
      question: '(Bringing It All Back Home, 1965)<br>Fill in the missing lyric from the answer choices below:<br><br>"She wears an Egyptian Ring<br> [.....?]<br> She\'s a hypnotist collector<br> You are a walking antique"</p>',
      answers: [' on the big toes of both feet', ' that sparkles before she speaks', ' and a French hat that reeks', ' that belonged to Cleopatra'],
      correctAnswer: 1
    },

    {
      question: 'Which lyrics below are part of Bob Dylan\'s Tombstone Blues (1965)?',
      answers: ['<br>"Aruba, Jamaica, oh I want to take you to <br>Bermuda, Bahama, come on pretty mama <br>   Key Largo, Montego, baby why don\'t we go"', '<br>"What about us?<br>What about all the times you said you had the answers?<br>What about us?<br>What about all the broken happy ever afters?"', '<br>"Now I can see that we\'re falling apart<br>From the way that it used to be, yeah<br>No matter the distance<br>I want you to know<br>That deep down inside of me..."', '<Br>"The Commander-in-Chief answers him while chasing a fly<br>   Saying, \'Death to all those who would whimper and cry\'<br>And, dropping a barbell, he points to the sky<br>Saying, \'The sun\'s not yellow, it\'s chicken!\''],
      correctAnswer: 3
    },

    {
      question: '<b>Which of the following Bob Dylan lyrics are from Mr. Tambourine Man</b> (Bringing It All Back Home, 1965)?',
      answers: ['<br>“Yes, to dance beneath the diamond sky<br> with one hand waving free<br>silhouetted by the sea,<br> circled by the circus sands<br> with all memory and fate<br>driven deep beneath the waves<br> Let me forget about today until tomorrow.”', '<br>“They are spoon-feeding Casanova<br>to get him to feel more assured,<br> then they\'ll kill him with self-confidence<br> after poisoning him with words.”', '<br>“I wish that for just one time<br> you could stand inside my shoes.<br> You’d know what a drag it is to see you.”', '<br>"How many roads must a man walk down<br> Before you call him a man?<br> How many seas must a white dove sail<Br> Before she sleeps in the sand?"'],
      correctAnswer: 0
    },

    {
      question: 'Name the song containing these lyrics:<br><br>As human gods aim for their mark<br>Make everything from toy guns that spark<br>To flesh-coloured Christs that glow in the dark<br>Easy to see without looking too far<br>That not much is really sacred',
      answers: [' All Along the Watchtower (1967)', ' It’s Alright, Ma (I’m Only Bleeding) (1965)', ' Like a Rolling Stone (1965)', ' 	Shelter from the Storm (1975)'],
      correctAnswer: 1
    },

    {
      question: 'Commplete the lyrics (Not Dark Yet (1998):<br><br>Well my sense of humanity is going down the drain<br>Behind every beautiful thing, there\'s been some kind of pain<br>She wrote me a letter and she wrote it so kind<br>She put down in writin\' what was in her mind<br>I just don\'t see why I should even care<br>[... ]?',
      answers: [' "Uh, yeah, I\'m bringin\' sexy back (yeah)"', ' "We gonna sip Bacardi like it\'s your birthday"', ' "Chang chang, changity chang shoo bop, we\'ll always be together"', ' "It\'s not dark yet, but it\'s getting there"'],
      correctAnswer: 3
    },

    ],

  questionNumber: 0, 
  totalCorrect: 0
}

// start quiz button, transitions to quiz questions 
function startScreen() {
  $('.startScreen').show();
  $('#start-quiz').on('click', function (event) { 
    $('.startScreen').hide(300);
    questions();
    $('.quizWrapper').show(300);
  }
  )
}

// checks chosen answer against correct answer, then transitions to the question feedback page
function answerCheck() {

  var isChecked = $("input[name='answer']:checked").is(':checked');
  var answerValue = $("input[name='answer']:checked").val();

  if (isChecked == false) {
  }
  else if (answerValue == quizData.questionData[quizData.questionNumber].correctAnswer) {
    quizData.totalCorrect++;
    quizData.questionNumber++;
    $('.noAnswerSelected').hide();
    $('.quizWrapper').hide(400);
    answerCorrectPage();
  }
  else {
    $('.noAnswerSelected').hide();
    $('.answerIncorrectPage').show();
    $('.quizWrapper').hide(400);
    quizData.questionNumber++;
    answerIncorrectPage();
  }
}

// runs error if no answer is selected, blocks next question 
function noAnswerSelected() {
  $('.noAnswerSelected').replaceWith(
    `<div class='noAnswerSelected'>
      <p>Are you afraid to make a choice? Ridiculous. </p>
      </div>`
  );
}

// allows user to click to next question, increments the number of questions posed and the number answered correctly
function nextQuestion() {
  $('.answerCorrectPage, .answerIncorrectPage').on('click', 'button', function (event) {

    if (quizData.questionNumber >= 5) {
      $('.answerCorrectPage, .answerIncorrectPage').hide(200);
      results(300);
    }
    else {
      questions();
      $('.quizWrapper').show(200);
      $('.answerCorrectPage, .answerIncorrectPage').hide(200);
    }
  }
  )
}

// generates html for answers
function generateAnswers(questions, questionNum) {

  let answerNum = 0;
  let answers = "";
  quizData.questionData[questionNum].answers.forEach(key => {
    answers += `<input  class="answerChoices" type="radio" name="answer" id="Answer${answerNum}" value="${answerNum}" required/><label for="${answerNum}" class="answerText">${quizData.questionData[quizData.questionNumber].answers[`${answerNum}`]}</label><br>`;
    answerNum++;
  });
  return answers;
}


//updates questions.. fieldset makes a line?
function questions() {
  let answers = generateAnswers(quizData, quizData.questionNumber);

  $('.questionBox').replaceWith(
    `<div class='questionBox'>    
        <form id="answer-choices" onsubmit="answerCheck(); return false;"> 
        <fieldset>

        <legend class="questionDisplay">${quizData.questionData[quizData.questionNumber].question}</legend>

        ${answers}

        <button name="Submit-Answer" id="submit" class="submitButton" type="submit">Submit Answer</button>
        </fieldset>
				</form>
        </div>`
  );
  score();
  $('#insert').replaceWith(`<h2 id="insert"> Question ${quizData.questionNumber + 1} of 5</h2>`);
}

// calculates quiz score 
function score() {
  var percentCorrect = 0;
  if (quizData.questionNumber >= 1) {
    percentCorrect = (quizData.totalCorrect / quizData.questionNumber);
  }

  $('.score').replaceWith(
    `<div class="score">
				<p>Current Score: ${quizData.totalCorrect} of ${quizData.questionNumber} correct, ${~~(percentCorrect * 100)}%</p>
			</div>`
  )
}

// restarts the quiz, sets questions asked and number answere correctly 0
function restart() {
  $('.restartButton, .finalRestart').on('click', function (event) {
    quizData.questionNumber = 0;
    quizData.totalCorrect = 0;
    $('.quizWrapper').hide(200);
    $('.noAnswerSelected').hide();
    $('.results').hide(200);
    $('.finalRestart').hide(200);
    startScreen();
  }
  );
}

// creates the screen following correct answers
function answerCorrectPage() {

  var percentCorrect = 0;
  if (quizData.questionNumber >= 1) {
    percentCorrect = (quizData.totalCorrect / quizData.questionNumber);
  }

  $('.answerCorrectPage').replaceWith(
    `<div class='answerCorrectPage'>
		<span>Good guess. That was too easy.   </span>
    <button name="Next Question" id="NextQuestion">Continue</button><br>
    <img class="images" src="https://ksassets.timeincuk.net/wp/uploads/sites/55/2014/08/2014BobDylan_Getty3315233100414-1-620x413.jpg" alt "happy Bob Dylan"/>
    <p>Current Score: ${quizData.totalCorrect} of ${quizData.questionNumber} correct, ${~~(percentCorrect * 100)}%</p>
    </div>`
  );
  nextQuestion();
}


// creates the screen following incorrect answers 
function answerIncorrectPage() {

  var percentCorrect = 0;
  if (quizData.questionNumber >= 1) {
    percentCorrect = (quizData.totalCorrect / quizData.questionNumber);
  }

  $('.answerIncorrectPage').replaceWith(
    `<div class='answerIncorrectPage'>
		<span>Sorry, that's completely wrong.</span>
    <button name="Next Question" id="NextQuestion">Continue</button><br>
    <span>The correct Answer Is: </span><span class="provideAnswer">${quizData.questionData[quizData.questionNumber - 1].answers[quizData.questionData[quizData.questionNumber - 1].correctAnswer]}</span>
       <img class="images" src="https://kinacerecords.files.wordpress.com/2010/05/bob-dylan.jpg" alt="disappointed Bob Dylan"/>
       <p>Current Score: ${quizData.totalCorrect} of ${quizData.questionNumber} correct, ${~~(percentCorrect * 100)}%</p>
    </div>`
  );
  nextQuestion();
}


// creates the final results screen, provides option to restart quiz 
function results() {
  var percentCorrect = quizData.totalCorrect / 5;
  $('.results').replaceWith(
    `<div class='results'>Your score is ${percentCorrect * 100}%. You answered ${quizData.totalCorrect} of 5 correctly!<br><button name="Restart Quiz" class="finalRestart">Restart Quiz</button>
         <iframe width="560" height="315" src="https://www.youtube.com/embed/BG8y0rRYjEI" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen alt="Dylan Greatest Hits Video" class="video"></iframe>
    </div>`
  );
  restart();
}

function listeners() {
  restart();
  answerCheck();
  startScreen();
  nextQuestion();
}

listeners();