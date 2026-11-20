import type { JSX } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { Select } from "@components/Select/Select";
import styles from "./ApiEndpoint.module.css";
import { classListFactory } from "@lib/cssUtils/classListFactory";

const cl = classListFactory(styles);

interface Props {
  majorVersion: "v1" | "v2";
  dates: string[];
  operationId: string;
  appearance?: "inline" | "pill";
  /** ID of a wrapper containing the endpoint when the select sits outside it. */
  targetId?: string;
}

const BASE = "base";

export default function ApiVersionSelect({
  majorVersion,
  dates,
  operationId,
  appearance = "inline",
  targetId,
}: Props): JSX.Element {
  const [selected, setSelected] = useState(BASE);
  const root = useRef<HTMLDivElement>(null);
  const id = `api-version-${operationId}-${majorVersion}`.replaceAll(
    /[^a-zA-Z0-9_-]/g,
    "-",
  );

  const showVersion = (version: string) => {
    const endpoint = targetId
      ? document
          .getElementById(targetId)
          ?.querySelector<HTMLElement>("[data-operation-id]")
      : root.current?.closest<HTMLElement>("[data-operation-id]");
    endpoint
      ?.querySelectorAll<HTMLElement>("[data-api-version-content]")
      .forEach((content) => {
        content.hidden = content.dataset.apiVersionContent !== version;
      });
  };

  useEffect(() => {
    const queryValue = new URLSearchParams(window.location.search).get(
      "datadog-api-version",
    );
    const prefix = `${majorVersion}-`;
    const queryDate = queryValue?.startsWith(prefix)
      ? queryValue.slice(prefix.length)
      : undefined;
    const initial = queryDate && dates.includes(queryDate) ? queryDate : BASE;
    setSelected(initial);
    showVersion(initial);
  }, []);

  const handleChange = (version: string) => {
    setSelected(version);
    showVersion(version);
    const url = new URL(window.location.href);
    if (version === BASE) {
      url.searchParams.delete("datadog-api-version");
    } else {
      url.searchParams.set("datadog-api-version", `${majorVersion}-${version}`);
    }
    window.history.replaceState({}, "", url);
  };

  return (
    <div
      ref={root}
      class={cl(
        "api-endpoint__version-select",
        `api-endpoint__version-select--${appearance}`,
      )}
    >
      <span
        id={`${id}-label`}
        class={cl(
          "api-endpoint__version-select-label",
          appearance === "pill" && "api-endpoint__version-select-label--hidden",
        )}
      >
        API version
      </span>
      <Select
        id={id}
        labelledBy={`${id}-label`}
        options={[
          {
            value: BASE,
            label: `${majorVersion} (${appearance === "pill" ? "latest" : "default"})`,
          },
          ...dates.map((date) => ({
            value: date,
            label:
              appearance === "pill"
                ? `${majorVersion} (${date})`
                : `${majorVersion} - ${date}`,
          })),
        ]}
        value={selected}
        onChange={handleChange}
      />
    </div>
  );
}
