export const encuestaLocales   = {
  title: "Encuesta de Parqueo - Locales",
  showProgressBar: "top",
  pages: [
    {
      name: "page1",
      elements: [
        {
          name: "q1",
          title: "Nombre del establecimiento",
          isRequired: true,
          type: "comment"
        },
        {
            "name": "tipo_comercio",
             type: "radiogroup",
            "title": "Tipo de comercio",
            "isRequired": true,
            "choices": [
              { "value": "op1", "text": "Opción 1" },
              { "value": "op2", "text": "Opción 2" },
              { "value": "op3", "text": "Opción 3" },
              { "value": "op4", "text": "Opción 4" },
              { "value": "op5", "text": "Opción 5" }
            ]
          },
          {
            name: "q3",
            title: "¿Cuántas celdas de moto tiene en su hogar?",
            type: "radiogroup",
            isRequired: true,
            choices: [
              "Opción 1",
              "Opción 2",
              "Opción 3",
              "Opción 4",
              "Opción 5"
            ]
          },
        {
          name: "q4",
          title: "¿Cuántos carros hay en su hogar?",
          isRequired: true,
          type: "text",
          inputType: "number"
        },
        {
          name: "q5",
          title: "¿Cuántas motos hay en su hogar?",
          isRequired: true,
          type: "text",
          inputType: "number"
        },
        {
          name: "q6",
          title: "¿Utiliza el parqueadero en su lugar de trabajo?",
          isRequired: true,
          type: "radiogroup",
          choices: ["Sí", "No"]
        },
        {
          name: "q7",
          title: "¿Con qué frecuencia utiliza el parqueadero?",
          isRequired: true,
          type: "radiogroup",
          choices: ["Todos los días", "3-4 veces por semana", "1-2 veces por semana", "Ocasionalmente"]
        },
        {
          name: "q8",
          title: "¿Qué tan fácil le resulta encontrar un espacio disponible?",
          isRequired: true,
          type: "rating",
          minRateDescription: "Muy difícil",
          maxRateDescription: "Muy fácil"
        },
        {
          name: "q9",
          title: "¿Cuánto paga en promedio por el parqueadero al mes?",
          isRequired: true,
          type: "text",
          inputType: "number"
        },
        {
          name: "q10",
          title: "¿Cuál es su nivel de satisfacción con la seguridad del parqueadero?",
          isRequired: true,
          type: "rating",
          minRateDescription: "Muy insatisfecho",
          maxRateDescription: "Muy satisfecho"
        },
        {
          name: "q11",
          title: "¿Cuál es su nivel de satisfacción con la limpieza del parqueadero?",
          isRequired: true,
          type: "rating",
          minRateDescription: "Muy insatisfecho",
          maxRateDescription: "Muy satisfecho"
        },
        {
          name: "q12",
          title: "¿Cuál es su nivel de satisfacción con la iluminación del parqueadero?",
          isRequired: true,
          type: "rating",
          minRateDescription: "Muy insatisfecho",
          maxRateDescription: "Muy satisfecho"
        },
        {
          name: "q13",
          title: "¿Qué mejoras sugeriría para el parqueadero?",
          type: "comment"
        }
      ]
    }
  ]
};
