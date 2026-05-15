import { useState } from "react";
import { getLeads } from "@/services/apiCrm";
import LeadContainer from "@/ui_components/LeadContainer";
import Header from "@/ui_components/Header";
import PagePagination from "../ui_components/PagePagination";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const numOfBlogsPerPage = 3;

  const { isPending, isError, error, data } = useQuery({
    queryKey: ["blogs", page],
    queryFn: () => getLeads(page),
    placeholderData: keepPreviousData,
  });

  const leads = data?.results || [];
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
      <LeadContainer isPending={isPending} leads={leads} />
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
