import { useSelector } from "react-redux";
import { DotsIcon } from "../../../svg";
import { useState } from "react";
import Menu from "./Menu";
import { CreateGroup } from "./createGroup";
import { WhatsappHome } from "../../Chat";
import { Link, useNavigate } from "react-router-dom";
export default function SidebarHeader() {
  const { user } = useSelector((state) => state.user);
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/*Sidebar header*/}
      <div className="h-[50px] dark:bg-dark_bg_6 flex items-center p16 ">
        {/* container */}
        <div className="w-full flex-row items-center justify-between md:flex">
          {/*user image*/}
          <button className="btn" onClick={() => navigate("/profile")}>
            <img
              src={user.picture}
              alt={user.name}
              className="w-full h-full rounded-full object-cover"
            />
          </button>
          {/*user icons*/}
          <ul className="flex items-center gap-x-2 5">
            <li
              className="relative"
              onClick={() => setShowMenu((prev) => !prev)}
            >
              <button className={`btn ${showMenu ? "bg-dark_hover_1" : ""}`}>
                <DotsIcon className="dark:fill-dark_svg_1" />
              </button>
              {showMenu ? (
                <Menu setShowCreateGroup={setShowCreateGroup} />
              ) : null}
            </li>
          </ul>
        </div>
      </div>
      {/*Create Group*/}
      {showCreateGroup && (
        <CreateGroup setShowCreateGroup={setShowCreateGroup} />
      )}
    </>
  );
}
