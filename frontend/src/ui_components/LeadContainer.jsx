import LeadCard from "./LeadCard"
import Spinner from "./Spinner"

const LeadContainer = ({isPending, leads=[], title="Latest Leads"}) => {

  if(isPending){
    return <Spinner />
  }

  return (
    <section className="padding-x py-6  max-container">
    <h2 className="font-semibold text-xl mb-6 dark:text-white text-center">
      {title}
    </h2>

    <div className="flex items-center gap-6 justify-center flex-wrap">
      {leads.map((lead) => <LeadCard key={lead.id} lead={lead} />)}
      
    </div>
  </section>
  )
}

export default LeadContainer
