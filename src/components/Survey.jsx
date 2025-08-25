import React, { useState } from "react";
import "./Survey.css";

export default function Survey({ questions }) {
  const [answers, setAnswers] = useState({});

  const handleChange = (name, value) => {
    setAnswers({
      ...answers,
      [name]: value,
    });
  };
 const handleSubmit = (e) => {
  e.preventDefault();
  if (onSubmit) {
    onSubmit(answers); // le pasa las respuestas al padre
  }
};

  return (
    <form questions={preguntasUsuarios} onSubmit={handleSurveySubmit}>
      {questions.map((q) => (
      <div key={q.name} className="question">
        <label className="question-title">{q.title}{q.isRequired && " *"}</label>
            
        {q.type === "radiogroup" && (
            <div
                className={`radiogroup ${
                q.layout === "horizontal" ? "horizontal" : "vertical"
                }`}
            >
                {q.choices.map((choice, idx) => (
                <label key={idx}>
                    <input
                    type="radio"
                    name={q.name}
                    value={choice}
                    required={q.isRequired}
                    onChange={(e) => handleChange(q.name, e.target.value)}
                    />
                    {choice}
                </label>
                ))}
            </div>
            )}
        
     {q.type === "ranking" &&
        q.choices.map((choice, idx) => (
            <div key={idx} className="ranking-item">
            <label>{choice}</label>
            <select
                value={answers[q.name]?.[choice] || ""}
                required={q.isRequired}
                onChange={(e) => {
                const current = { ...(answers[q.name] || {}) };
                current[choice] = e.target.value;
                handleChange(q.name, current);
                }}
            >
                <option value="">Seleccione...</option>
                {q.choices.map((_, i) => {
                const value = (i + 1).toString();
                const alreadySelected = Object.values(
                    answers[q.name] || {}
                ).includes(value);

                return (
                    <option
                    key={value}
                    value={value}
                    disabled={
                        alreadySelected &&
                        answers[q.name]?.[choice] !== value
                    }
                    >
                    {value}
                    </option>
                );
                })}
            </select>
            </div>
    ))}


      {q.type === "checkbox" && (
        <div className="checkboxgroup">
          {q.choices.map((choice, idx) => (
            <label key={idx}>
              <input
                type="checkbox"
                name={q.name}
                value={choice}
                onChange={(e) => {
                  const current = answers[q.name] || [];
                  if (e.target.checked) {
                    handleChange(q.name, [...current, choice]);
                  } else {
                    handleChange(
                      q.name,
                      current.filter((c) => c !== choice)
                    );
                  }
                }}
              />
              {choice}
            </label>
          ))}
        </div>
      )}

      {q.type === "text" && (
        <input
          type={q.inputType || "text"}
          name={q.name}
          required={q.isRequired}
          onChange={(e) => handleChange(q.name, e.target.value)}
        />
      )}

      {q.type === "comment" && (
        <textarea
          name={q.name}
          rows="4"
          onChange={(e) => handleChange(q.name, e.target.value)}
        />
      )}

      {q.type === "rating" && (
        <div className="rating">
          <span>{q.minRateDescription}</span>
          <input
            type="range"
            name={q.name}
            min="1"
            max="5"
            onChange={(e) => handleChange(q.name, e.target.value)}
          />
          <span>{q.maxRateDescription}</span>
        </div>
      )}
    </div>
  ))}


      <button type="submit" className="submit-btn">
        Enviar
      </button>
    </form>
  );
}
