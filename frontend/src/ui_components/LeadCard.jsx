import Badge from "./Badge";
import LeadFooter from "./LeadFooter";
import { Link } from "react-router-dom";

const LeadCard = ({ lead }) => {
  return (
    <div className="px-3 py-3 rounded-md w-[300px] h-auto flex flex-col gap-4 dark:border-gray-800 border shadow-lg">
      <Badge status={lead.status} />

      <Link to={`/leads/${lead.id}`}>
        <h3 className="font-semibold leading-normal text-[#181A2A] dark:text-white text-2xl">
          {lead.lead_name}
        </h3>
      </Link>

      <div className="space-y-2 mt-2 text-sm text-[#BABABF]">
        <p>
          <strong>Email:</strong> {lead.email}
        </p>

        <p>
          <strong>Phone:</strong> {lead.phone}
        </p>

        <p>
          <strong>Company:</strong> {lead.company || "No company"}
        </p>

        <p className="line-clamp-2">{lead.notes || "No notes"}</p>
      </div>

      <LeadFooter lead={lead} />
    </div>
  );
};

export default LeadCard;
