import { Ticket } from "../service/TicketService"
import DeleteBlock from "./DeleteBlock"
import PriorityDisplay from "./PriorityDisplay"
import ProgressDisplay from "./ProgressDisplay"
import StatusDisplay from "./StatusDisplay"

const TicketCard: React.FC<Pick<Ticket, "id" | "descricao">> = ({ id, descricao }) => {
  return (
    <div className="flex flex-col bg-card hover:bg-card-hover rounded-md shadow-lg p-3 m-2">
        <div className="flex mb-3">
            <PriorityDisplay />
            <div className="ml-auto">
                <DeleteBlock />
            </div>
        </div>
        <h4>{id}</h4>
        <hr className="h-px border-0 bg-page mb-2"/>
        <p className="whitespace-pre-wrap">
            {descricao}
        </p>
        <div className="flex-grow"></div>
        <div className="flex mt-2">
            <div className="flex flex-col">
                <p className="text-xs my-1">14/10/24 6:23PM</p>
                <ProgressDisplay />
            </div>
            <div className="ml-auto flex items-end">
                <StatusDisplay />
            </div>
        </div>
    </div>
  )
}

export default TicketCard