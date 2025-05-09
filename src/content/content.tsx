import CardTemp from "@/components/CardTemp";
import ChatBox from "@/components/ChatBox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/Card";
import { ValidModel } from "@/constants/ValidModel";
import { useChromeStorage } from "@/hooks/useChromeStorage";
import { Bot } from "lucide-react";
import React, { useRef } from "react";

const content = () => {
  const [chatBoxExpanded, setchatBoxExpanded] = React.useState<boolean>(false);

  const [model, setmodel] = React.useState<ValidModel | null>(null);
  const [apiKey, setapiKey] = React.useState<string>("");
  const [chatboxExpanded, setchatboxExpanded] = React.useState<boolean>(false);
  const [selectedModel, setSelectedModel] = React.useState<ValidModel>();

  const [selectedText, setselectedText] = React.useState<string>("");

  const ref = useRef<HTMLDivElement>(null);

  const handleDocumentClick = (event: MouseEvent) => {
    const target = event.target;

    if (
      ref.current &&
      target instanceof Node &&
      !ref.current.contains(target)
    ) {
      setchatBoxExpanded(false);
      setselectedText("");
    }
  };
  React.useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("mouseup", () => {
      const text = window?.getSelection()?.toString() ?? "";
      if (text) {
        setselectedText(text);
      }
    });
    return () => {
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("mouseup", () => {});
    };
  }, []);
  (async () => {
    const { getKeyModel, selectModel } = useChromeStorage();
    const { model, apiKey } = await getKeyModel(await selectModel());

    setmodel(model);
    setapiKey(apiKey);
  })();
  React.useEffect(() => {
    const loadChromeStorage = async () => {
      const { selectModel } = useChromeStorage();

      const modal = await selectModel();
      setSelectedModel(modal);
    };
    loadChromeStorage();
  }, [chatBoxExpanded]);

  return (
    <div
      ref={ref}
      className="dark z-50"
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
      }}
    >
      {!model || !apiKey ? (
        chatBoxExpanded ? (
          <CardTemp
            message={!model ? "No Model Configured" : "No Api Key for model"}
            configureButtonVisible={true}
          />
        ) : null
      ) : (
        <>
          {selectedModel ? (
            <ChatBox
              visible={chatBoxExpanded}
              apiKey={apiKey}
              context={{ selectedText }}
              model={model}
              key={model}
              selectedModel={selectedModel}
            />
          ) : (
            <CardTemp
              message="No Selected Model Please Configure"
              configureButtonVisible={true}
            />
          )}
        </>
      )}
      <div className="flex justify-end">
        <Button
          size={"icon"}
          onClick={() => setchatBoxExpanded(!chatBoxExpanded)}
        >
          <Bot />
        </Button>
      </div>
    </div>
  );
};

export default content;
