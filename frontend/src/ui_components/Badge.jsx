const Badge = ({ status }) => {
  const statusStyles = {
    New: "bg-blue-500 text-white",
    Contacted: "bg-yellow-500 text-black",
    Qualified: "bg-green-500 text-white",
    "In Progress": "bg-purple-500 text-white",
    Closed: "bg-gray-500 text-white",
  };

  return (
    <span
      className={`px-2 py-[3px] text-[12px] font-semibold rounded-sm self-start ${
        statusStyles[status] || "bg-[#4B6BFB] text-white"
      }`}
    >
      {status || "New"}
    </span>
  );
};

export default Badge;