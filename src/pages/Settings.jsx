import React from "react";
import CompactSidebar from "../components/CompactSidebar";
import { useSelector } from "react-redux";
import AccountPrivacy from "../components/Settings/AccountPrivacy";
import ChangePassword from "../components/Settings/ChangePassword";
import BlockedAccounts from "../components/Settings/BlockedAccounts";
import Notifications from "../components/Settings/Notifications";
import Activity from "../components/Settings/Activity";
import MessagePrivacy from "../components/Settings/MessagePrivacy";
import TagsAndMentions from "../components/Settings/TagsAndMentions";
import DeleteAccount from "../components/Settings/DeleteAccount";
import Logout from "@/components/Settings/Logout";

const Settings = () => {
  const current = useSelector((state) => state.settingSlice.current);
  const menu = {
    privacy: <AccountPrivacy />,
    password: <ChangePassword />,
    blocked: <BlockedAccounts />,
    notification: <Notifications />,
    messages: <MessagePrivacy />,
    activity: <Activity />,
    tag: <TagsAndMentions />,
    delete: <DeleteAccount />,
    logout: <Logout/>
  };
  return (
    <div>
      <CompactSidebar />
      <div className="w-[min(560px,96%)] mx-auto">{menu[current]}</div>
    </div>
  );
};

export default Settings;
