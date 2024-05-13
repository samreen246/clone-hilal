import CompactSidebar from "@/components/CompactSidebar";
import PostCard from "@/components/PostCard";
import SavedPostCard from "@/components/Profile/SavedPostCard";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SavedPost = () => {
  const [data, setData] = useState([]);
  const base = useSelector((state) => state.userSlice.base_url);
  function getSavedPosts() {
    fetch(`${base}/post-save/my`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data.data));
  }
  useEffect(() => {
    getSavedPosts();
  }, []);
  return (
    <div>
      <CompactSidebar />
      <div className="w-[min(560px,96%)] mx-auto">
        <div className="font-bold text-2xl py-6 max-sm:text-lg">
          Saved posts
        </div>
        {data?.length > 0 ? (
          <div>
            {data.map((item, index) => {
              return (
                <SavedPostCard
                  retrieve={getSavedPosts}
                  index={index}
                  data={item}
                />
              );
            })}
          </div>
        ) : (
          <div className="h-[400px] grid place-items-center font-bold text-xl text-gray-500">
            You have not saved any posts yet
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedPost;
