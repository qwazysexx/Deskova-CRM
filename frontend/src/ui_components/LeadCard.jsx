import Badge from "./Badge";
import LeadFooter from "./LeadFooter";
import { Link } from "react-router-dom";

const LeadCard = ({ lead }) => {
  return (
    <div className="px-3 py-3 rounded-md w-[300px] h-auto flex flex-col gap-4 dark:border-gray-800 border shadow-lg">
      <Badge status={lead.status} />
      <Link to={`/leads/${lead.id}`}>
        <h3 className="font-semibold leading-normal text-[#181A2A] dark:text-white">
          {lead.lead_name}
          
          <p className="text-sm text-[#97989F]">
            Company: {lead.company || "No company"}
          </p>

          <p className="text-sm text-[#97989F]">Email: {lead.email}</p>

          <p className="text-sm text-[#97989F]">Phone: {lead.phone}</p>
          <LeadFooter lead={lead} />
        </h3>
      </Link>
    </div>
  );
};

export default LeadCard;
