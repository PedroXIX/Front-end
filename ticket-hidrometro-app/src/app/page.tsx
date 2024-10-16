import TicketCard from "./(components)/TicketCard"
import LoginForm from "@/components/LoginForm";

const Dashboard = () => {
  return  (
    <div className="P-5">
      {/*
      <div className="h-screen flex justify-center items-center bg-slate-600 px-5"> 
        <LoginForm/>
      </div>
       */}
      <div className="lg:grid grid-cols-2 xl:grid-cols-4">
        <TicketCard />
        <TicketCard />
        <TicketCard />
        <TicketCard />
      </div>
    </div>
  )
}

export default Dashboard