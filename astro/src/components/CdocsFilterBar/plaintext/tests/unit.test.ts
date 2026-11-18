import { describe, it, expect } from "vitest";
import { buildMarkdocStr } from "@lib/plaintext/helpers";
import type {
  CdocsFilterLinks,
  CdocsVariantLabel,
} from "@lib/cdocs/cdocsPages";
import { cdocsFilterBarNodes } from "../CdocsFilterBar";

const label = (
  traitId: string,
  traitLabel: string,
  optionId: string,
  optionLabel: string,
): CdocsVariantLabel => ({ traitId, traitLabel, optionId, optionLabel });

const java = label("prog_lang", "Language", "java", "Java");
const python = label("prog_lang", "Language", "python", "Python");
const otel = label("api_type", "API", "otel_api", "OpenTelemetry");
const datadog = label("api_type", "API", "dd_api", "Datadog");

const filterLinks: CdocsFilterLinks[] = [
  {
    traitId: "prog_lang",
    label: "Language",
    options: [
      {
        id: "java",
        label: "Java",
        isSelected: true,
        url: "/guides/setup/?api_type=otel_api&prog_lang=java",
        labels: [java, otel],
      },
      {
        id: "python",
        label: "Python",
        isSelected: false,
        url: "/guides/setup/?api_type=otel_api&prog_lang=python",
        labels: [python, otel],
      },
    ],
  },
  {
    traitId: "api_type",
    label: "API",
    options: [
      {
        id: "otel_api",
        label: "OpenTelemetry",
        isSelected: true,
        url: "/guides/setup/?api_type=otel_api&prog_lang=java",
        labels: [java, otel],
      },
      {
        id: "dd_api",
        label: "Datadog",
        isSelected: false,
        url: "/guides/setup/?api_type=dd_api&prog_lang=java",
        labels: [java, datadog],
      },
    ],
  },
];

describe("cdocsFilterBarNodes", () => {
  it("lists each filter's options as links to their plaintext variants", async () => {
    await expect(
      buildMarkdocStr(cdocsFilterBarNodes(filterLinks)),
    ).toMatchFileSnapshot("./__snapshots__/plaintextFilterBar.md");
  });

  it("returns nothing when no filter is shown", () => {
    expect(cdocsFilterBarNodes([])).toEqual([]);
  });
});
