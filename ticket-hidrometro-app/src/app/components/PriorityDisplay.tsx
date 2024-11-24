import { faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PriorityDisplayProps {
  prioridade: number; // Número de prioridade que você quer exibir
}

const PriorityDisplay: React.FC<PriorityDisplayProps> = ({ prioridade }) => {
  const icons = [];

  // Adiciona o número de ícones baseado na prioridade
  for (let i = 0; i < prioridade; i++) {
    icons.push(
      <FontAwesomeIcon key={i} icon={faFire} className="text-red-400" />
    );
  }

  return (
    <div className="flex justify-start align-baseline">
      {icons}
    </div>
  );
};

export default PriorityDisplay;
