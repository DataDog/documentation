import { useEffect, useRef, useState } from "preact/hooks";
import styles from "./CodeBlock.module.css";
import { classListFactory } from "@lib/cssUtils/classListFactory";
import { markSelfAsHydrated } from "@lib/componentUtils/markSelfAsHydrated";

const cl = classListFactory(styles);

export interface CopyButtonLabels {
  "Copy code": string;
  Copy: string;
  "Copied!": string;
}

interface CopyButtonProps {
  content: string;
  labels: CopyButtonLabels;
}

export function CopyButton({ content, labels }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    markSelfAsHydrated(ref);
  }, []);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
    navigator.clipboard?.writeText(content).catch(() => {});
  };

  return (
    <button
      ref={ref}
      class={cl("code-block__copy")}
      onClick={handleCopy}
      aria-label={labels["Copy code"]}
    >
      <span>{copied ? labels["Copied!"] : labels["Copy"]}</span>
    </button>
  );
}
