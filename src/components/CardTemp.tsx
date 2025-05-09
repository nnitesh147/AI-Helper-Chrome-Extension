import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/Card";

type Props = {
  message: string;
  configureButtonVisible: boolean;
};

const CardTemp: React.FC<Props> = ({
  message,
  configureButtonVisible,
}: Props) => {
  return (
    <Card className="mb-5">
      <CardContent className="h-[500px] grid place-items-center">
        <div className="grid place-items-center gap-4">
          <>
            <p className="text-center">{message}</p>
            {configureButtonVisible && (
              <Button
                onClick={() => {
                  chrome.runtime.sendMessage({ action: "openPopup" });
                }}
              >
                Click here to Configure
              </Button>
            )}
          </>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardTemp;
