import React from "react";
import Image from "next/image";
import ProfilePhoto from "@/public/profile.jpeg"

const MessageBubble = ({date, text}) => {
  return (
    <>
      <div className="flex items-start gap-2.5">
        <Image
          className="w-8 h-8 rounded-full"
          alt="Jese image"
          src={ProfilePhoto}
        />
        <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              Bonnie Green
            </span>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {date}
            </span>
          </div>
          <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
            {text}
          </p>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Delivered
          </span>
        </div>
      </div>
    </>
  );
};

export default MessageBubble;
