import Survey from "../components/Survey";
import preguntasUsuarios from "../data/preguntasUsuarios.json";

export default function Usuarios() {
  return (
    <div>
      <h1>Encuesta de Usuarios</h1>
      <Survey questions={preguntasUsuarios} />
    </div>
  );
}
