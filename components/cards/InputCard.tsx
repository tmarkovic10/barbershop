import React from "react";

const InputCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="shadow-light100_darknone background-light900_dark200 light-border-2 flex w-full flex-col gap-6 rounded-lg p-4">
      {children}
    </div>
  );
};

export default InputCard;
