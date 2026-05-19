import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#F6F6F7] padding-x py-16 max-container dark:bg-[#141624]">
      <div className="flex max-lg:gap-9 lg:gap-4 flex-wrap max-md:justify-center justify-between">

        <div className="w-[350px] flex flex-col gap-6 max-md:items-center">
          <h1 className="text-[#141624] text-2xl dark:text-[#FFFFFF] font-bold">
            Deskova CRM
          </h1>

          <p className="text-[14px] text-[#696A75] leading-[1.7] max-md:text-center dark:text-[#97989F]">
            Deskova CRM is a customer relationship management system built with
            React.js, Django REST Framework, PostgreSQL and Tailwind CSS.

            The system allows managers to create and manage leads, track status
            changes, monitor user activity and work with role-based access.
          </p>
        </div>

        <div className="text-[#181A2A] text-[14px] flex flex-col gap-4 px-4 max-md:items-center">
          <p className="font-semibold text-[16px] dark:text-white">
            CRM Features
          </p>

          <ul className="flex flex-col gap-4 text-[#3B3C4A] max-md:items-center dark:text-[#97989F]">
            <li>Authentication</li>
            <li>Invite Codes</li>
            <li>Lead Management</li>
            <li>Kanban Board</li>
            <li>Activity Logs</li>
            <li>Role-Based Access</li>
          </ul>
        </div>

        <div className="text-[#181A2A] text-[14px] flex flex-col gap-4 px-4 max-md:items-center">
          <p className="font-semibold text-[16px] dark:text-white">
            Technologies
          </p>

          <ul className="flex flex-col gap-4 text-[#3B3C4A] max-md:items-center dark:text-[#97989F]">
            <li>React.js</li>
            <li>Django REST</li>
            <li>PostgreSQL</li>
            <li>Tailwind CSS</li>
            <li>JWT Authentication</li>
            <li>REST API</li>
          </ul>
        </div>
      </div>

      <div className="py-6 flex items-center gap-6 cursor-pointer max-md:mt-6 max-md:justify-center">
        <FaInstagram className="dark:text-white text-[20px] text-[#141624]" />
        <FaFacebookF className="dark:text-white text-[20px] text-[#141624]" />
        <BsTwitterX className="dark:text-white text-[20px] text-[#141624]" />
        <FaYoutube className="dark:text-white text-[20px] text-[#141624]" />
      </div>
    </footer>
  );
};

export default Footer;