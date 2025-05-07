import React, { useRef } from "react";

const content = () => {
  const [chatBoxExpanded, setchatBoxExpanded] = React.useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleDocumentClick = (event: MouseEvent) => {
    const target = event.target;

    if (ref.current && target instanceof Node) {
      if (chatBoxExpanded) {
        setchatBoxExpanded(false);
      }
    }
  };
  React.useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="dark z-50"
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
      }}
    ></div>
  );
};

export default content;
