import React from "react";
import CompactSidebar from "../components/CompactSidebar";
import { LuSend } from "react-icons/lu";

const Chat = () => {
  return (
    <div className="h-[100dvh]">
      <CompactSidebar />
      <div className="w-[min(560px,96%)] mx-auto h-[100dvh] bg-white">
        <div className="flex items-center gap-4 p-4 border-b">
          <img
            src="https://picsum.photos/400"
            className="size-8 rounded-full"
            alt=""
          />
          <div className="font-medium">Mohd Belal Naim</div>
        </div>
        <div className="h-[calc(93dvh-55px)] overflow scroll"></div>
        <div className="h-[calc(9dvh-32px)] border-t flex px-4 py-2 items-center gap-4">
          <input
            type="text"
            placeholder="Type message here"
            className=" border w-full py-2 px-4 rounded-full"
          />
          <button className="bg-primary p-2 rounded-full">
            <LuSend size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
