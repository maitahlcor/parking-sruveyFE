// src/components/Survey.jsx
import React, { useState } from "react";
import "./Survey.css";

export default function Survey({
  questions = [],
  onSubmit,
  onAnswersChange = null,   // <- ya no causa ReferenceError
  disabled = false,         // <- evita "disabled is not defined"
  lastCoords = null,
}) {
  const [answers, setAnswers] = useState({});

  const handleChange = (name, value) => {
    const updated = { ...answers, [name]: value };
    setAnswers(updated);
    if (typeof onAnswersChange === "function") onAnswersChange(updated);
  };

  const handleSurveySubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(answers);
  };

  return (
    <form onSubmit={handleSurveySubmit} className="survey-form">
      {questions.map((q) => (
        <div key={q.name} className="question">
          <label className="question-title">
            {q.title}
            {q.isRequired && " *"}
          </label>

          {q.type === "radiogroup" && (
            <div className={`radiogroup ${q.layout === "horizontal" ? "horizontal" : "vertical"}`}>
              {q.choices.map((choice, idx) => (
                <label key={idx}>
                  <input
                    type="radio"
                    name={q.name}
                    value={choice}
                    required={q.isRequired}
                    disabled={disabled}
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
                  disabled={disabled}
                  onChange={(e) => {
                    const current = { ...(answers[q.name] || {}) };
                    current[choice] = e.target.value;
                    handleChange(q.name, current);
                  }}
                >
                  <option value="">Seleccione...</option>
                  {q.choices.map((_, i) => {
                    const value = (i + 1).toString();
                    const alreadySelected = Object.values(answers[q.name] || {}).includes(value);
                    return (
                      <option
                        key={value}
                        value={value}
                        disabled={alreadySelected && answers[q.name]?.[choice] !== value}
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
                    disabled={disabled}
                    onChange={(e) => {
                      const current = answers[q.name] || [];
                      if (e.target.checked) {
                        handleChange(q.name, [...current, choice]);
                      } else {
                        handleChange(q.name, current.filter((c) => c !== choice));
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
              disabled={disabled}
              onChange={(e) => handleChange(q.name, e.target.value)}
            />
          )}

          {q.type === "comment" && (
            <textarea
              name={q.name}
              rows="4"
              disabled={disabled}
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
                disabled={disabled}
                onChange={(e) => handleChange(q.name, e.target.value)}
              />
              <span>{q.maxRateDescription}</span>
            </div>
          )}
        </div>
      ))}

      <button type="submit" className="submit-btn" disabled={disabled}>
        {disabled ? "Enviando..." : "Enviar"}
      </button>

      {lastCoords && (
        <p className="muted" style={{ marginTop: 8 }}>
          Última ubicación: <strong>{lastCoords.lat.toFixed(6)}, {lastCoords.lng.toFixed(6)}</strong> · {Math.round(lastCoords.accuracy || 0)} m
        </p>
      )}
    </form>
  );
}
