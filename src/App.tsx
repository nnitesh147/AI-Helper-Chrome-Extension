import React from "react";
import { Valid_Models, type ValidModel } from "./constants/ValidModel";
import { useChromeStorage } from "./hooks/useChromeStorage";
import { Button } from "./components/ui/button";
import Show from "./components/Show";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import aiImage from "./assets/ai.png";
import { Input } from "./components/ui/input";

function App() {
  const [apiKey, setApiKey] = React.useState<string>("");
  const [model, setmodel] = React.useState<ValidModel | null>(null);
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const [isloading, setIsloading] = React.useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = React.useState<{
    state: "error" | "success";
    message: string;
  } | null>(null);
  const [selectedModel, setSelectedModel] = React.useState<ValidModel>();

  React.useEffect(() => {
    const loadChromeStorage = async () => {
      const { getKeyModel, selectModel, setSelectModel } = useChromeStorage();

      setmodel(await selectModel());
      setSelectedModel(await selectModel());

      setApiKey((await getKeyModel(await selectModel())).apiKey);

      setIsLoaded(true);
    };

    loadChromeStorage();
  }, []);

  const updatestorage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsloading(true);

      const { setKeyModel } = useChromeStorage();

      if (apiKey && model) {
        await setKeyModel(apiKey, model);
      } else {
        throw new Error();
      }

      setSubmitMessage({
        state: "success",
        message: "Successfully Saved the Api Key",
      });
    } catch (error) {
      setSubmitMessage({
        message: "Failed to Save Api Key",
        state: "error",
      });
    } finally {
      setIsloading(false);
    }
  };

  const handleModel = async (v: ValidModel) => {
    if (v) {
      const { setSelectModel, getKeyModel } = useChromeStorage();
      setSelectModel(v);
      setmodel(v);
      setSelectedModel(v);
      setApiKey((await getKeyModel(v)).apiKey);
    }
  };

  return (
    <div className="relative p-4 w-[350px] bg-black text-white">
      <Show show={isLoaded}>
        <div className="bg-black text-white">
          <div className="w-full  h-20 overflow-hidden ">
            <img
              className="mx-auto h-20 w-auto"
              src={aiImage}
              width={150}
              height={150}
            />
          </div>
          <div className="text-center">
            <h1 className=" font-bold text-3xl text-white">
              Ai <span className="text-whisperOrange">Whisper</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Your Companion to Beat Your Doubts!
            </p>
          </div>
          <form
            onSubmit={(e) => updatestorage(e)}
            className="mt-10 flex flex-col gap-2 w-full"
          >
            <div className="space-y-2">
              <label htmlFor="text" className="text-xs text-muted-foreground">
                Select a model
              </label>
              <Select
                onValueChange={(v: ValidModel) => handleModel(v)}
                value={selectedModel}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Model</SelectLabel>
                    <SelectSeparator />
                    {Valid_Models.map((modelOption) => (
                      <SelectItem
                        key={modelOption.name}
                        value={modelOption.name}
                      >
                        {modelOption.display}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="text" className="text-xs text-muted-foreground">
                API Key {model ? `for ${model}` : ""}
              </label>
              <Input
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={`Enter Api Key for model ${model ?? ""}`}
                disabled={!model}
                required
                type="password"
              />
            </div>
            <Button disabled={isloading} type="submit" className="w-full mt-2">
              Save API Key
            </Button>
          </form>
          {submitMessage ? (
            <div
              className="mt-2 text-center text-sm text-muted-foreground flex items-center justify-center p-2 rounded-sm"
              style={{
                color: submitMessage.state === "error" ? "red" : "green",
                border:
                  submitMessage.state === "error"
                    ? "1px solid red"
                    : "1px solid green",
                backgroundColor:
                  submitMessage.state === "error"
                    ? "rgba(255, 0, 0, 0.1)"
                    : "rgba(0, 255, 0, 0.1)",
              }}
            >
              {submitMessage.state === "error" ? (
                <p className="text-red-500">{submitMessage.message}</p>
              ) : (
                <p className="text-green-500">{submitMessage.message}</p>
              )}
            </div>
          ) : (
            ""
          )}
          <div className="mt-7 flex items-center justify-center">
            <p className="text-sm">
              Want more features?&nbsp;
              <a
                href=""
                className="text-blue-500 hover:underline"
                target="_blank"
              >
                Request a feature!
              </a>
            </p>
          </div>
          <div className="mt-2 flex items-center justify-center">
            <p className="text-sm">
              Want to know more about Extension?&nbsp;
              <a
                href=""
                className="text-blue-500 hover:underline"
                target="_blank"
              >
                Click here!
              </a>
            </p>
          </div>
        </div>
      </Show>
    </div>
  );
}

export default App;
