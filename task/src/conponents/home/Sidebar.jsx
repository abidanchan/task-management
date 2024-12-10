import React from "react";
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { TbNotebookOff } from "react-icons/tb";
import { Link } from "react-router-dom";

function Sidebar() {
  const data = [
    { title: "All Task", icon: <CgNotes />, link: "/" },
    {
      title: "Important Task",
      icon: <MdLabelImportant />,
      link: "/importantTask",
    },
    {
      title: "Incomplete Task",
      icon: <FaCheckDouble />,
      link: "/incompleteTask",
    },
    {
      title: "Completed Task",
      icon: <TbNotebookOff />,
      link: "/completedTask",
    },
  ];
  return (
    <>
      <div>
        <h2 className="text-xl font-semibold">The First Project</h2>
        <h4 className="mr-1 text-gray-400">acbd@gmail.com</h4>
        <hr />
      </div>
      <div>
        {data.map((items, i) => (
          <Link
            to={items.link}
            key={i}
            className="my-2 flex items-center hover:bg-gray-600 p-2 rounded transition-all"
          >
            {items.icon} &emsp;
            {items.title}
          </Link>
        ))}
      </div>
      <div>
        <button className="bg-gray-600 w-full p-2 rounded">Log Out</button>
      </div>
    </>
  );
}

export default Sidebar;
