import { useState } from "react";
import { getLeads } from "@/services/apiCrm";
import LeadContainer from "@/ui_components/LeadContainer";
import Header from "@/ui_components/Header";
import PagePagination from "../ui_components/PagePagination";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const numOfleadsPerPage = 10;

  const { isPending, data } = useQuery({
    queryKey: ["leads", page],
    queryFn: () => getLeads(page),
    placeholderData: keepPreviousData,
  });

  const leads = data?.results || [];

  const filteredLeads = leads
    .filter((lead) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        lead.lead_name?.toLowerCase().includes(searchText) ||
        lead.email?.toLowerCase().includes(searchText) ||
        lead.company?.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" || lead.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.created_at) - new Date(a.created_at);
      }

      if (sortBy === "oldest") {
        return new Date(a.created_at) - new Date(b.created_at);
      }

      if (sortBy === "name") {
        return a.lead_name.localeCompare(b.lead_name);
      }

      return 0;
    });

  const totalLeads = data?.count || 0;
  const newLeads = leads.filter((lead) => lead.status === "New").length;
  const contactedLeads = leads.filter((lead) => lead.status === "Contacted").length;
  const qualifiedLeads = leads.filter((lead) => lead.status === "Qualified").length;
  const inProgressLeads = leads.filter((lead) => lead.status === "In Progress").length;
  const closedLeads = leads.filter((lead) => lead.status === "Closed").length;

  const numOfPages = Math.ceil((data?.count || 0) / numOfleadsPerPage);

  function handleSetPage(val) {
    setPage(val);
  }

  function increasePageValue() {
    setPage((curr) => curr + 1);
  }

  function decreasePageValue() {
    setPage((curr) => curr - 1);
  }

  return (
    <>
      <Header />

      <div className="max-container padding-x py-6 grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="border dark:border-gray-800 rounded-lg p-4 dark:text-white">
          <p className="text-sm text-[#97989F]">Total Leads</p>
          <h3 className="text-2xl font-semibold">{totalLeads}</h3>
        </div>

        <div className="border dark:border-gray-800 rounded-lg p-4 dark:text-white">
          <p className="text-sm text-[#97989F]">New</p>
          <h3 className="text-2xl font-semibold">{newLeads}</h3>
        </div>

        <div className="border dark:border-gray-800 rounded-lg p-4 dark:text-white">
          <p className="text-sm text-[#97989F]">Contacted</p>
          <h3 className="text-2xl font-semibold">{contactedLeads}</h3>
        </div>

        <div className="border dark:border-gray-800 rounded-lg p-4 dark:text-white">
          <p className="text-sm text-[#97989F]">Qualified</p>
          <h3 className="text-2xl font-semibold">{qualifiedLeads}</h3>
        </div>

        <div className="border dark:border-gray-800 rounded-lg p-4 dark:text-white">
          <p className="text-sm text-[#97989F]">In Progress</p>
          <h3 className="text-2xl font-semibold">{inProgressLeads}</h3>
        </div>

        <div className="border dark:border-gray-800 rounded-lg p-4 dark:text-white">
          <p className="text-sm text-[#97989F]">Closed</p>
          <h3 className="text-2xl font-semibold">{closedLeads}</h3>
        </div>
      </div>

      <div className="max-container padding-x py-4 flex gap-4 justify-center flex-wrap">
        <input
          type="text"
          placeholder="Search by name, email, company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-md px-4 py-2 bg-[#141624] text-white w-[280px]"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-md px-4 py-2 bg-[#141624] text-white"
        >
          <option className="bg-[#141624] text-white" value="All">All statuses</option>
          <option className="bg-[#141624] text-white" value="New">New</option>
          <option className="bg-[#141624] text-white" value="Contacted">Contacted</option>
          <option className="bg-[#141624] text-white" value="Qualified">Qualified</option>
          <option className="bg-[#141624] text-white" value="In Progress">In Progress</option>
          <option className="bg-[#141624] text-white" value="Closed">Closed</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded-md px-4 py-2 bg-[#141624] text-white"
        >
          <option className="bg-[#141624] text-white" value="newest">Newest first</option>
          <option className="bg-[#141624] text-white" value="oldest">Oldest first</option>
          <option className="bg-[#141624] text-white" value="name">Name A-Z</option>
        </select>
      </div>

      <LeadContainer isPending={isPending} leads={filteredLeads} />

      <PagePagination
        increasePageValue={increasePageValue}
        decreasePageValue={decreasePageValue}
        page={page}
        numOfPages={numOfPages}
        handleSetPage={handleSetPage}
      />
    </>
  );
};

export default HomePage;