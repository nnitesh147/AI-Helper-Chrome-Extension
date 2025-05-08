import React from "react";

type Props = {
  show: boolean;
  children: React.ReactNode;
};

const Show: React.FC<Props> = ({ show, children }: Props): React.ReactNode => {
  return show ? (
    children
  ) : (
    <div className="w-full h-full flex items-center justify-center">
      Loading......
    </div>
  );
};
export default Show;
