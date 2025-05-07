import React from "react";
import { type ValidModel } from "./constants/ValidModel";
import { useChromeStorage } from "./hooks/useChromeStorage";

function App() {
  const [apiKey, setApiKey] = React.useState<string | null>(null);
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

  const updatestorage = (e: React.FormEvent<HTMLFormElement>) => {};

  const handleModel = (v: ValidModel) => {};

  return <div>Working</div>;
}

export default App;
