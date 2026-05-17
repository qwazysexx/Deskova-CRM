import { getLeads } from "@/services/apiCrm";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/ui_components/Spinner";
import LeadCard from "@/ui_components/LeadCard";

const KanbanPage = () => {
  const { isPending, data } = useQuery({
    queryKey: ["kanban-leads"],
    queryFn: () => getLeads(1),
  });

  if (isPending) return <Spinner />;

  const leads = data?.results || [];

  const statuses = ["New", "Contacted", "Qualified", "In Progress", "Closed"];

  return (
    <section className="max-container padding-x py-8">
      <h2 className="text-2xl font-semibold dark:text-white mb-6">
        Lead Pipeline
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {statuses.map((status) => (
          <div
            key={status}
            className="border dark:border-gray-800 rounded-lg p-4 min-h-[500px]"
          >
            <h3 className="font-semibold dark:text-white mb-4">
              {status}
            </h3>

            <div className="space-y-4">
              {leads
                .filter((lead) => lead.status === status)
                .map((lead) => (
                  <LeadCard key={lead.id} lead={lead} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KanbanPage;