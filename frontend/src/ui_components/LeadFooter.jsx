import { FormatDate } from "@/services/formatDate";
import { Link } from "react-router-dom";

const LeadFooter = ({ lead }) => {
  return (
    <Link to={`/profile/${lead.author.username}`}>
    <div className="flex items-center gap=4 ">
      <span className="flex items-center gap-2">
  
        <small className="text-[#97989F] text-[12px] font-semibold">
          {lead.author.first_name} {lead.author.last_name}
        </small>
      </span>

      <small className="text-[#97989F] text-[12px] font-semibold ml-3">
        {FormatDate(lead.created_at)}
      </small>
    </div>
    </Link>
  );
};

export default LeadFooter;
