import React from "react";

interface BorderHorizontalProps {
  borderStyle?: string;
}

const BorderHorizontal: React.FC<BorderHorizontalProps> = ({ borderStyle }) => {
  return <div className={borderStyle}></div>;
    // return <div className="w-full border-b border-gray-200 mt-4 -ml-9"></div>;

};

export default BorderHorizontal;
