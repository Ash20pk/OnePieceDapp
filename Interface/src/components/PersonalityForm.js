// components/PersonalityForm.js
import React, { useState } from "react";

export const PersonalityForm = ({ onSubmit }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const questions = [
    {
      question: "Which trait defines you best?",
      options: ["Loyalty", "Ambition", "Compassion", "Adventurous spirit"],
    },
    {
      question: "Your strategy in a tough fight is:",
      options: ["Plan meticulously", "Adapt on the fly", "Rely on friends", "Push your limits"],
    },
    {
      question: "Your ultimate goal is to:",
      options: ["Protect your crew", "Become the strongest", "Bring justice to the world", "Explore the unknown"],
    },
    {
      question: "How do you make friends?",
      options: ["Loyalty and trust", "Proving your strength", "Kindness and empathy", "Inspiring others"],
    },
    {
      question: "Facing a powerful foe, you rely on:",
      options: ["Strategy and intellect", "Direct confrontation", "Teamwork and support", "Inner strength and determination"],
    },
  ];

  const handleNextQuestion = () => {
    if (questionIndex === questions.length - 1) {
      onSubmit();
    } else {
      setQuestionIndex(questionIndex + 1);
    }
  };

  return (
    <div>
      <h3>{questions[questionIndex].question}</h3>
      <ul>
        {questions[questionIndex].options.map((option, index) => (
          <li key={index}>{option}</li>
        ))}
      </ul>
      <button onClick={handleNextQuestion}>
        {questionIndex === questions.length - 1 ? "Tell me my personality" : "Next"}
      </button>
    </div>
  );
};