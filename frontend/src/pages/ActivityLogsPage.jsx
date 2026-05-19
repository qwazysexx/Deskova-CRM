import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ActivityLogsPage = () => {
  const token = localStorage.getItem("access");

  const { data, isLoading } = useQuery({
    queryKey: ["activityLogs"],
    queryFn: async () => {
      const response = await axios.get("http://127.0.0.1:8000/activity_logs/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
  });

  if (isLoading) {
    return (
      <p className="padding-x py-10 max-container dark:text-white">
        Loading...
      </p>
    );
  }

  return (
    <section className="padding-x py-10 max-container dark:text-white">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Activity Logs</h1>

      <div className="overflow-x-auto border dark:border-gray-800 rounded-lg">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#181A2A] text-white">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Lead</th>
              <th className="p-4">Action</th>
              <th className="p-4">Description</th>
              <th className="p-4">Created At</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((log) => (
              <tr key={log.id} className="border-t dark:border-gray-800">
                <td className="p-4">{log.user}</td>
                <td className="p-4">{log.lead}</td>
                <td className="p-4">{log.action}</td>
                <td className="p-4">{log.description}</td>
                <td className="p-4">
                  {new Date(log.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ActivityLogsPage;
