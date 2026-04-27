# Agora Question Schema

## Question Format (JSON)

Each question is stored as a JSON object with the following structure:

```json
{
  "id": "unique-identifier",
  "type": "coding|theory|output-prediction",
  "difficulty": "beginner|intermediate|advanced",
  "topic": "string-topic-tag",
  "title": "short-question-title",
  "description": "question-text-or-prompt",
  "code": "optional-code-block",
  "expectedOutput": "for-output-prediction-questions",
  "solution": "code-solution-or-answer",
  "explanation": "detailed-explanation",
  "hints": ["hint1", "hint2"],
  "testCases": [
    {
      "input": "optional-input",
      "expected": "expected-output"
    }
  ],
  "gradingCriteria": {
    "answerAccuracy": "0-100",
    "explanationDepth": "description of what's expected"
  }
}
```

## Question Types

- **coding**: User writes code to solve a problem
- **theory**: Explain a concept; evaluate understanding
- **output-prediction**: Predict output and explain coercion/behavior

## Difficulty Levels

- **beginner**: Core syntax, basic concepts (var, let, function calls)
- **intermediate**: Deeper understanding (closures, this, prototypes, async basics)
- **advanced**: Complex interactions (event loop, type coercion edge cases, metaprogramming)

## Topics

- Hoisting & Scope
- Closures
- Functions (arrow vs regular, IIFE, higher-order)
- The `this` Keyword
- Type Coercion & Equality
- Prototypal Inheritance
- Objects & Classes
- Arrays & Iteration
- Async/Await & Promises
- Generators & Iterables
- Advanced Patterns (debounce, memoize, etc.)
