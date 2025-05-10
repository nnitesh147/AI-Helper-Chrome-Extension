import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type contextDataProps = {
  title: string;
  url: string;
  metaDescription: string;
  heading: string;
  surroundingText: string;
};

export const getContextData = (): contextDataProps => {
  const selection = window.getSelection();

  const range = selection?.getRangeAt(0);
  const parentElement = range?.startContainer.parentElement;

  const title = document.title;
  const url = window.location.href;

  const metaDescription =
    document
      .querySelector("meta[name='description']")
      ?.getAttribute("content") || "";

  const surroundingText = parentElement?.innerText || "";
  const heading =
    (parentElement?.closest("h1,h2,h3,h4,h5,h6") as HTMLElement)?.innerText ||
    "";

  return {
    title,
    url,
    metaDescription,
    heading,
    surroundingText,
  };
};
