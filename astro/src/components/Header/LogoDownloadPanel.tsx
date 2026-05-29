import { useEffect, useRef, useState } from "preact/hooks";
import {
  loadExternalContext,
  type ExternalContext,
} from "@lib/componentUtils/loadExternalContext";
import { markSelfAsHydrated } from "@lib/componentUtils/markSelfAsHydrated";
import { classListFactory } from "@lib/cssUtils/classListFactory";
import styles from "./LogoDownloadPanel.module.css";

const cl = classListFactory(styles);

export interface LogoDownloadPanelLabels {
  eyebrow: string;
  body: string;
  cta: string;
}

export interface LogoDownloadPanelSvgs {
  arrow: string;
}

interface Props {
  externalContext: ExternalContext<{ trigger: string }>;
  labels: LogoDownloadPanelLabels;
  svgs: LogoDownloadPanelSvgs;
  ctaHref: string;
}

// Hidden popover that appears when the Datadog logo is clicked. Mirrors Hugo's
// `.js-logo-download` click behavior: first click opens the panel and cancels
// navigation; a second click (panel already open) lets the anchor navigate;
// clicks outside the trigger and panel close it.
export function LogoDownloadPanel({
  externalContext,
  labels,
  svgs,
  ctaHref,
}: Props) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loaded = loadExternalContext(externalContext);
    if (!loaded) {
      return;
    }
    const { trigger } = loaded;
    markSelfAsHydrated(panelRef);

    const onTriggerClick = (e: MouseEvent) => {
      setOpen((current) => {
        if (!current) {
          e.preventDefault();
          return true;
        }
        return false;
      });
    };

    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (!target) {
        return;
      }
      const panel = panelRef.current;
      if (!trigger.contains(target) && (!panel || !panel.contains(target))) {
        setOpen(false);
      }
    };

    trigger.addEventListener("click", onTriggerClick);
    document.addEventListener("click", onDocClick);

    return () => {
      trigger.removeEventListener("click", onTriggerClick);
      document.removeEventListener("click", onDocClick);
    };
  }, [externalContext]);

  return (
    <div
      ref={panelRef}
      class={cl("logo-download", open && "logo-download--open")}
    >
      <div
        class={cl("logo-download__arrow")}
        dangerouslySetInnerHTML={{ __html: svgs.arrow }}
      />
      <p class={cl("logo-download__eyebrow")}>{labels.eyebrow}</p>
      <p class={cl("logo-download__body")}>{labels.body}</p>
      <a href={ctaHref} class={cl("logo-download__btn")}>
        {labels.cta}
      </a>
    </div>
  );
}
