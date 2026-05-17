import { useState } from "react";
import { getLeads } from "@/services/apiCrm";
import LeadContainer from "@/ui_components/LeadContainer";
import Header from "@/ui_components/Header";
import PagePagination from "../ui_components/PagePagination";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const numOfBlogsPerPage = 3;

const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("All");

  const { isPending, isError, error, data } = useQuery({
    queryKey: ["blogs", page],
    queryFn: () => getLeads(page),
    placeholderData: keepPreviousData,
  });

  const leads = data?.results || [];

  const filteredLeads = leads.filter((lead) => {
  const searchText = search.toLowerCase();

  const matchesSearch =
    lead.lead_name?.toLowerCase().includes(searchText) ||
    lead.email?.toLowerCase().includes(searchText) ||
    lead.company?.toLowerCase().includes(searchText);

  const matchesStatus =
    statusFilter === "All" || lead.status === statusFilter;

  return matchesSearch && matchesStatus;
});
  const numOfPages = Math.ceil(data?.count / numOfBlogsPerPage);

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
      <div className="max-container padding-x py-4 flex gap-4 justify-center flex-wrap">
  <input
    type="text"
    placeholder="Search leads..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="border rounded-md px-4 py-2 bg-[#141624] text-white"
  />

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="border rounded-md px-4 py-2 bg-transparent dark:text-white"
  >
    <option className="bg-[#141624] text-white" value="All">All</option>
    <option className="bg-[#141624] text-white" value="New">New</option>
    <option className="bg-[#141624] text-white" value="Contacted">Contacted</option>
    <option className="bg-[#141624] text-white" value="Qualified">Qualified</option>
    <option className="bg-[#141624] text-white" value="In Progress">In Progress</option>
    <option className="bg-[#141624] text-white" value="Closed">Closed</option>
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
