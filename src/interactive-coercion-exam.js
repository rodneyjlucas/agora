#!/usr/bin/env node

/**
 * Interactive Type Coercion Exam
 * Run with: node src/interactive-coercion-exam.js
 */

const readline = require('readline');
const vm = require('vm');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const questions = [
  {
    id: 1,
    title: 'Loose vs Strict Equality',
    code: "5 == '5' // ?",
    expectedAnswer: 'true',
    explanation:
      "The == operator coerces '5' (string) to 5 (number), so 5 == 5 is true.",
    hint: 'Loose equality (==) performs type coercion.',
  },
  {
    id: 2,
    title: 'Falsy Values',
    code: "if ('') console.log('logged'); // Will this log?",
    expectedAnswer: 'no',
    explanation:
      "'' (empty string) is one of the 6 falsy values in JavaScript. It will NOT log.",
    hint: 'The 6 falsy values are: false, 0, "", null, undefined, NaN',
  },
  {
    id: 3,
    title: 'Plus Operator Coercion',
    code: "console.log(1 + '2')",
    expectedAnswer: "'12'",
    explanation:
      "The + operator prioritizes string concatenation. When one operand is a string, both are converted to strings. Result: '1' + '2' = '12'",
    hint: 'The + operator is unique—it does concatenation if ANY operand is a string.',
  },
  {
    id: 4,
    title: 'Arithmetic with Strings',
    code: "console.log('5' - 1)",
    expectedAnswer: '4',
    explanation:
      "The - operator forces numeric coercion. '5' converts to 5, so 5 - 1 = 4.",
    hint:
      'All operators except + force numeric coercion (-, *, /, %, etc.)',
  },
  {
    id: 5,
    title: 'Array Equality',
    code: "console.log([] == false)",
    expectedAnswer: 'true',
    explanation:
      '[] coerces to "" (empty string), then to 0. false coerces to 0. So 0 == 0 is true.',
    hint: '[].toString() returns an empty string, which becomes 0 in numeric context.',
  },
  {
    id: 6,
    title: 'Null and Undefined',
    code: 'console.log(null == undefined)',
    expectedAnswer: 'true',
    explanation:
      'null and undefined are loosely equal to each other only. This is a special case.',
    hint:
      'null == undefined is true, but null === undefined is false.',
  },
  {
    id: 7,
    title: 'Truthy Arrays',
    code: "if ([]) console.log('logged'); // Will this log?",
    expectedAnswer: 'yes',
    explanation:
      'Arrays and objects are always truthy, even when empty. Empty array [] is truthy.',
    hint: 'Only 6 falsy values exist. Arrays and objects are always truthy.',
  },
  {
    id: 8,
    title: 'valueOf Method',
    code: "const obj = { valueOf() { return 42; } }; console.log(obj + 0)",
    expectedAnswer: '42',
    explanation:
      'When an object is coerced to a number, JavaScript calls valueOf(). Returns 42, so 42 + 0 = 42.',
    hint: 'valueOf() is called first for numeric coercion.',
  },
  {
    id: 9,
    title: 'String Coercion',
    code: "const obj = { toString() { return 'hello'; } }; console.log(String(obj))",
    expectedAnswer: "'hello'",
    explanation:
      'String() explicitly calls toString() on the object, returning "hello".',
    hint: 'String() calls toString() directly without trying valueOf() first.',
  },
  {
    id: 10,
    title: 'NaN Comparison',
    code: "console.log(NaN == NaN)",
    expectedAnswer: 'false',
    explanation:
      'NaN is never equal to anything, including itself. This is a special IEEE 754 behavior.',
    hint: 'NaN is unique—it is not equal to itself. Use Number.isNaN() to check.',
  },
];

let currentQuestionIndex = 0;
let score = 0;

function normalizeAnswer(answer) {
  return answer.trim().toLowerCase();
}

function askQuestion() {
  if (currentQuestionIndex >= questions.length) {
    showResults();
    return;
  }

  const q = questions[currentQuestionIndex];
  const questionNumber = currentQuestionIndex + 1;

  console.log(`\n${'='.repeat(60)}`);
  console.log(`Question ${questionNumber}/${questions.length}: ${q.title}`);
  console.log(`${'='.repeat(60)}\n`);
  console.log(`Code:\n  ${q.code}\n`);
  console.log(`What will this output or evaluate to?`);
  console.log(`(Type 'hint' for a hint, or 'skip' to skip this question)\n`);

  rl.question('Your answer: ', (answer) => {
    if (answer.toLowerCase() === 'skip') {
      console.log(`\n❌ Skipped\n`);
      console.log(`Expected: ${q.expectedAnswer}`);
      console.log(`${q.explanation}\n`);
      currentQuestionIndex++;
      askQuestion();
      return;
    }

    if (answer.toLowerCase() === 'hint') {
      console.log(`\n💡 Hint: ${q.hint}\n`);
      rl.question('Your answer: ', (retryAnswer) => {
        checkAnswer(retryAnswer, q);
      });
      return;
    }

    checkAnswer(answer, q);
  });
}

function checkAnswer(answer, question) {
  const userAnswer = normalizeAnswer(answer);
  const expectedAnswer = normalizeAnswer(question.expectedAnswer);

  const isCorrect = userAnswer === expectedAnswer;

  if (isCorrect) {
    console.log('\n✅ Correct!\n');
    score++;
  } else {
    console.log(`\n❌ Incorrect\n`);
    console.log(`Your answer: ${userAnswer}`);
    console.log(`Expected: ${question.expectedAnswer}`);
  }

  console.log(`${question.explanation}\n`);

  currentQuestionIndex++;
  askQuestion();
}

function showResults() {
  console.log(`\n${'='.repeat(60)}`);
  console.log('Exam Complete!');
  console.log(`${'='.repeat(60)}\n`);

  const percentage = Math.round((score / questions.length) * 100);
  console.log(`Final Score: ${score}/${questions.length} (${percentage}%)\n`);

  if (percentage === 100) {
    console.log('🏆 Perfect score! You are a type coercion master!');
  } else if (percentage >= 80) {
    console.log('🎉 Excellent! You have a strong understanding of type coercion.');
  } else if (percentage >= 60) {
    console.log(
      '👍 Good effort! Review the explanations for the questions you missed.',
    );
  } else if (percentage >= 40) {
    console.log('📚 Keep practicing! Type coercion is tricky—review the concepts.');
  } else {
    console.log(
      '💪 Type coercion takes practice. Review the explanations and try again!',
    );
  }

  console.log(
    '\nFor more type coercion challenges, check out questions/type-coercion.json\n',
  );
  rl.close();
}

function start() {
  console.log('\n' + '='.repeat(60));
  console.log('Welcome to the Interactive Type Coercion Exam!');
  console.log('='.repeat(60));
  console.log('\nTest your understanding of JavaScript type coercion.');
  console.log('You will be presented with 10 questions.\n');
  console.log('Tips:');
  console.log('  - Type your answer and press Enter');
  console.log("  - Type 'hint' to get a hint");
  console.log("  - Type 'skip' to skip a question\n");

  askQuestion();
}

start();
