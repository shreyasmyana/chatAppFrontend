import { useSelector } from "react-redux";
import { VideoCallIcon } from "../../../svg";
import { capitalize } from "../../../utils/string";
import { useEffect, useRef, useState } from "react";
import SocketContext from "../../../context/SocketContext";
import Peer from "simple-peer";
import {
  getConversationName,
  getConversationPicture,
} from "../../../utils/chat";
import GroupInfoModal from "./GroupInfoModal";
function ChatHeader({ online, callUser, socket }) {
  const { activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);

  const handleGroupInfo = () => {
    setShowModal(true);
  };

  return (
    <div className="h-[59px] dark:bg-dark_bg_6 flex items-center p16 select-none">
      {/*Container*/}
      <div className="w-full flex items-center justify-between">
        {/*left*/}
        <div className="flex items-center gap-x-4">
          {/*Conversation image*/}
          <button className="btn">
            <img
              src={
                activeConversation.isGroup
                  ? activeConversation.picture
                  : getConversationPicture(user, activeConversation.users)
              }
              alt=""
              className="w-full h-full rounded-full object-cover"
            />
          </button>
          {/*Conversation name and online status*/}
          <div className="flex flex-col">
            <h1 className="dark:text-white text-md font-bold">
              {activeConversation.isGroup
                ? activeConversation.name
                : capitalize(
                    getConversationName(user, activeConversation.users).split(
                      " "
                    )[0]
                  )}
            </h1>
            {activeConversation.isGroup && (
              <button
                className="dark:text-white text-md "
                onClick={handleGroupInfo}
              >
                Click here for group info
              </button>
            )}
            <span className="text-xs dark:text-dark_svg_2">
              {online ? "online" : ""}
            </span>
          </div>
        </div>
        {/*Right*/}
        <ul className="flex items-center gap-x-2.5">
          {1 == 1 ? (
            <li onClick={() => callUser()}>
              <button className="btn">
                <VideoCallIcon />
              </button>
            </li>
          ) : null}
        </ul>
      </div>
      {showModal && (
        <GroupInfoModal
          showModal={showModal}
          setShowModal={setShowModal}
          groupMembers={activeConversation.users}
        />
      )}
    </div>
  );
}

const ChatHeaderWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <ChatHeader {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default ChatHeaderWithSocket;
