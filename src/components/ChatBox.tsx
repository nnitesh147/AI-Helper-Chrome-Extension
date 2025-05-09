import { ValidModel } from "@/constants/ValidModel";
import CardTemp from "./CardTemp";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardFooter } from "./ui/Card";
import { Bot, Send } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import React from "react";

type Props = {
  visible: boolean;
  context: {
    selectedText: string;
  };
  model: ValidModel;
  apiKey: string;
  selectedModel: ValidModel;
};

const ChatBox: React.FC<Props> = ({
  visible,
  context,
  model,
  apiKey,
  selectedModel,
}: Props): React.ReactNode => {
  if (!visible) return;
  const text = window?.getSelection()?.toString() ?? "";
  if (!context.selectedText || context.selectedText !== text) {
    return (
      <CardTemp
        message="Please select some text to chat with Ai"
        configureButtonVisible={false}
      />
    );
  }

  return <>Chatbox {context.selectedText}</>;
};

export default ChatBox;
