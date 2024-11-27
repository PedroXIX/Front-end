
  interface StatusDisplayProps {
    status: boolean; // Número de prioridade que você quer exibir
  }

  const StatusDisplay: React.FC<StatusDisplayProps> = ({ status }) => {

    if(status===false){
      return(
      <span className="inline-block rounded-full px-2 py-1 text-xs font-semibold text-gray-700 bg-red-600">
        Aberto
      </span>
      )
    }
    else{
    return (
      <span className="inline-block rounded-full px-2 py-1 text-xs font-semibold text-gray-700 bg-green-200">
        Solucionado
      </span>
     );
    } 
  };

export default StatusDisplay;
