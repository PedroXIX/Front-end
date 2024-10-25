import TicketCard from "../components/TicketCard"


const page = () => {
  return  (
    <div className="P-5">
      <div className="lg:grid grid-cols-2 xl:grid-cols-4 bg-img">
        <TicketCard />
        <TicketCard />
        <TicketCard />
        <TicketCard />
      </div>
    </div>
  )
}

export default page