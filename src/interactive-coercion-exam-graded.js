#!/usr/bin/env node

/**
 * Interactive Type Coercion Exam with Claude Grading
 * Run with: node src/interactive-coercion-exam-graded.js
 * Requires ANTHROPIC_API_KEY environment variable
 */

const readline = require('readline');
const Anthropic = require('@anthropic-ai/sdk').default;

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const questions = [
  {
    id: 1,
    title: 'Loose vs Strict Equality',
    code: "5 == '5'",
    expectedAnswer: 'true',
    correctExplanation:
      "The == operator coerces '5' (string) to 5 (number), so 5 == 5 is true.",
  },
  {
    id: 2,
    title: 'Falsy Values',
    code: "if ('') console.log('logged');",
    expectedAnswer: 'no',
    correctExplanation:
      "'' (empty string) is one of the 6 falsy values. It will NOT execute the console.log.",
  },
  {
    id: 3,
    title: 'Plus Operator Coercion',
    code: "console.log(1 + '2')",
    expectedAnswer: "'12'",
    correctExplanation:
      "The + operator prioritizes string concatenation. Since one operand is a string, both are converted to strings: '1' + '2' = '12'",
  },
  {
    id: 4,
    title: 'Arithmetic Operators',
    code: "console.log('5' - 1)",
    expectedAnswer: '4',
    correctExplanation:
      "The - operator forces numeric coercion, unlike +. '5' becomes 5, so 5 - 1 = 4.",
  },
  {
    id: 5,
    title: 'Array Equality',
    code: "console.log([] == false)",
    expectedAnswer: 'true',
    correctExplanation:
      '[] coerces to "" (empty string), then to 0. false also coerces to 0. So 0 == 0 is true.',
  },
];

let currentQuestionIndex = 0;
let totalScore = 0;
let results = [];

function normalizeAnswer(answer) {
  return answer.trim().toLowerCase().replace(/['"]/g, "'");
}

async function gradeExplanation(question, userAnswer, userExplanation) {
  try {
    const prompt = `You are a JavaScript expert grading a student's answer to a type coercion question.

Question: ${question.code}
Expected Answer: ${question.expectedAnswer}
Correct Explanation: ${question.correctExplanation}

Student's Answer: ${userAnswer}
Student's Explanation: ${userExplanation}

Evaluate the student's response on these criteria:
1. **Answer Correctness**: Is the answer itself correct?
2. **Explanation Quality**: Does the explanation show understanding of the coercion rules?
3. **Completeness**: Does it cover all important aspects?

Provide:
- A score from 0-100 for the explanation
- A brief assessment (2-3 sentences) of what the student got right
- One specific suggestion for improvement (if needed)

Format your response as:
SCORE: [0-100]
ASSESSMENT: [your assessment]
SUGGESTION: [improvement suggestion or "Excellent explanation!"]`;

    const response = await client.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 300,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';
    const scoreMatch = text.match(/SCORE:\s*(\d+)/);
    const assessmentMatch = text.match(/ASSESSMENT:\s*(.+?)(?=SUGGESTION:|$)/s);
    const suggestionMatch = text.match(/SUGGESTION:\s*(.+?)$/s);

    return {
      score: scoreMatch ? parseInt(scoreMatch[1]) : 50,
      assessment: assessmentMatch
        ? assessmentMatch[1].trim()
        : 'Assessment unavailable',
      suggestion: suggestionMatch ? suggestionMatch[1].trim() : '',
    };
  } catch (error) {
    console.error('\n❌ Grading error:', error.message);
    return {
      score: 0,
      assessment: 'Unable to grade at this time',
      suggestion: '',
    };
  }
}

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function askQuestion() {
  if (currentQuestionIndex >= questions.length) {
    await showResults();
    return;
  }

  const q = questions[currentQuestionIndex];
  const questionNumber = currentQuestionIndex + 1;

  console.log(`\n${'='.repeat(70)}`);
  console.log(`Question ${questionNumber}/${questions.length}: ${q.title}`);
  console.log(`${'='.repeat(70)}\n`);
  console.log(`Code:\n  ${q.code}\n`);

  const answer = await question('What will this output? ');

  if (answer.toLowerCase() === 'skip') {
    console.log('\n⏭️  Skipped this question.\n');
    results.push({
      question: q.title,
      status: 'skipped',
      score: 0,
    });
    currentQuestionIndex++;
    await askQuestion();
    return;
  }

  console.log('\nNow, please explain WHY this is the correct output.');
  console.log(
    '(Explain the type coercion rules that apply here)\n',
  );
  const explanation = await question('Your explanation: ');

  console.log('\n⏳ Grading your answer and explanation...\n');

  const normalizedAnswer = normalizeAnswer(answer);
  const expectedAnswer = normalizeAnswer(q.expectedAnswer);
  const isCorrect = normalizedAnswer === expectedAnswer;

  const grading = await gradeExplanation(q, answer, explanation);

  console.log(`${'─'.repeat(70)}`);
  console.log(`Answer: ${answer}`);
  console.log(`Correct: ${isCorrect ? '✅ Yes' : '❌ No'}`);
  console.log(`Expected: ${q.expectedAnswer}\n`);

  console.log(`Explanation Score: ${grading.score}/100`);
  console.log(`Assessment: ${grading.assessment}`);
  if (grading.suggestion) {
    console.log(`💡 Tip: ${grading.suggestion}`);
  }
  console.log(`${'─'.repeat(70)}\n`);

  const questionScore = isCorrect ? grading.score : Math.floor(grading.score * 0.6);
  totalScore += questionScore;

  results.push({
    question: q.title,
    status: 'completed',
    score: questionScore,
    isCorrect,
    explanation: grading.assessment,
  });

  currentQuestionIndex++;
  await askQuestion();
}

async function showResults() {
  const completedQuestions = results.filter((r) => r.status === 'completed');
  const skippedQuestions = results.filter((r) => r.status === 'skipped');

  const averageScore = completedQuestions.length > 0
    ? Math.round(
      completedQuestions.reduce((sum, r) => sum + r.score, 0) /
        completedQuestions.length,
    )
    : 0;

  console.log(`\n${'='.repeat(70)}`);
  console.log('Exam Complete!');
  console.log(`${'='.repeat(70)}\n`);

  console.log(`Questions Completed: ${completedQuestions.length}`);
  console.log(`Questions Skipped: ${skippedQuestions.length}`);
  console.log(`Average Explanation Score: ${averageScore}/100\n`);

  if (averageScore >= 90) {
    console.log('🏆 Exceptional! Your explanations show deep understanding.');
  } else if (averageScore >= 75) {
    console.log(
      '🎉 Great work! You understand type coercion rules well.',
    );
  } else if (averageScore >= 60) {
    console.log('👍 Good effort! Keep studying the coercion rules.');
  } else if (averageScore >= 40) {
    console.log('📚 Keep practicing! Review the explanations provided.');
  } else {
    console.log('💪 Type coercion is complex—review the concepts and retry!');
  }

  console.log(
    '\nFor more challenges, check out questions/type-coercion.json\n',
  );
  rl.close();
}

async function start() {
  console.log('\n' + '='.repeat(70));
  console.log('Welcome to the AI-Graded Type Coercion Exam!');
  console.log('='.repeat(70));
  console.log(
    '\nYou will answer type coercion questions and explain your reasoning.',
  );
  console.log('Claude will grade the quality of your explanations.\n');
  console.log('Tips:');
  console.log('  - Be specific about which coercion rules apply');
  console.log('  - Explain the step-by-step conversion process');
  console.log("  - Type 'skip' to skip a question\n");

  await askQuestion();
}

// Check for API key
if (!process.env.ANTHROPIC_API_KEY) {
  console.error(
    '❌ Error: ANTHROPIC_API_KEY environment variable is not set.',
  );
  console.error('Please set your API key: export ANTHROPIC_API_KEY=your_key');
  process.exit(1);
}

start().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
