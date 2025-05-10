import { ValidModel } from "@/constants/ValidModel";
import CardTemp from "./CardTemp";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardFooter } from "./ui/Card";
import { Bot, Send } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import React from "react";
import { get } from "http";
import { getContextData } from "@/lib/utils";

type Props = {
  visible: boolean;
  context: {
    selectedText: string;
  };
  model: ValidModel;
  apiKey: string;
  selectedModel: ValidModel;
};
type ContextDataProps = {
  title: string;
  url: string;
  metaDescription: string;
  heading: string;
  surroundingText: string;
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

  const [contextData, setcontextData] = React.useState<ContextDataProps>();
  React.useEffect(() => {
    setcontextData(getContextData());
  }, []);

  return (
    <Card className="mb-2 ">
      <div className="flex gap-2 items-center justify-between h-20 rounded-t-lg p-4">
        <div className="flex gap-2 items-center justify-start">
          <div className="bg-white rounded-full p-2">
            <Bot color="#000" className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Need Help?</h3>
            <h6 className="font-normal text-xs">Always online</h6>
          </div>
        </div>
      </div>
      <CardContent className="p-2">
        <div>
          <p className="flex items-center justify-center h-[510px] w-[400px] text-center space-y-4">
            {context.selectedText}
            <br />
            {contextData && <>{contextData.heading}</>}
            <br />
            {contextData && <>{contextData.metaDescription}</>}
            <br />
            {contextData && <>{contextData.surroundingText}</>}
            <br />
            {contextData && <>{contextData.title}</>}
            <br />
            {contextData && <>{contextData.url}</>}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
          className="flex w-full items-center space-x-2"
        >
          <Input
            id="message"
            placeholder="Type your message..."
            className="flex-1"
            autoComplete="off"
            required
          />
          <Button
            type="submit"
            className="bg-[#fafafa] rounded-lg text-black"
            size="icon"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ChatBox;
