import Badge from "@/ui_components/Badge";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "@/ui_components/Spinner";
import { HiPencilAlt } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import LeadFooter from "@/ui_components/LeadFooter";
import { deleteLead, getLead } from "@/services/apiCrm";
import CreateLeadPage from "./CreateLeadPage";
import Modal from "@/ui_components/Modal";
import { useState } from "react";
import { toast } from "react-toastify";

const LeadDetailPage = ({ username, isAuthenticated }) => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  function toggleModal() {
    setShowModal((curr) => !curr);
  }

  const {
    isPending,
    isError,
    error,
    data: lead,
  } = useQuery({
    queryKey: ["lead", id],
    queryFn: () => getLead(id),
  });

  const leadID = lead?.id;

  console.log(lead);

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteLead(id),
    onSuccess: () => {
      toast.success("Your lead has been deleted successfully!");
      navigate("/");
    },

    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  function handleDeleteLead() {
    const popUp = window.confirm("Are you sure you want to delete this lead?");
    if (!popUp) {
      return;
    }

    deleteMutation.mutate(leadID);
  }

  if (isPending) {
    return <Spinner />;
  }

  return (
    <div className="padding-dx max-container py-9">
      <Badge status={lead.status} />

      <div className="flex justify-between items-center gap-4">
        <h2 className="py-6 leading-normal text-2xl md:text-3xl text-[#181A2A] tracking-wide font-semibold dark:text-[#FFFFFF]">
          {lead.lead_name}
        </h2>

        {isAuthenticated && username === lead.author.username && (
          <span className="flex justify-between items-center gap-2">
            <HiPencilAlt
              onClick={toggleModal}
              className="dark:text-white text-3xl cursor-pointer"
            />

            <MdDelete
              onClick={handleDeleteLead}
              className="dark:text-white text-3xl cursor-pointer"
            />
          </span>
        )}
      </div>

      <LeadFooter lead={lead} />

      <div className="mt-8">
        <h3 className="text-xl font-semibold dark:text-white mb-3">Notes</h3>

        <p className="text-[16px] leading-[2rem] text-justify text-[#3B3C4A] dark:text-[#BABABF]">
          {lead.notes || "No notes"}
        </p>
      </div>

      {showModal && (
        <Modal toggleModal={toggleModal}>
          <CreateLeadPage lead={lead} leadID={leadID} />
        </Modal>
      )}
    </div>
  );
};

export default LeadDetailPage;
