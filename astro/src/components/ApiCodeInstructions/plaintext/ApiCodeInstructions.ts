/**
 * AST twin of `ApiCodeInstructions.astro`. Uses the first region's run command.
 */

import type { Node as MarkdocNode } from "@markdoc/markdoc";
import { fence, heading, nodesFromMd } from "@lib/plaintext/helpers";

interface ApiCodeInstructionsInput {
  language: string;
  exampleFile: string;
  runCommandByRegion: Record<string, string>;
}

export function apiCodeInstructionsNodes({
  language,
  exampleFile,
  runCommandByRegion,
}: ApiCodeInstructionsInput): MarkdocNode[] {
  const [runCommand = ""] = Object.values(runCommandByRegion);
  return [
    // One level below `### Code Example`, matching the HTML h4.
    heading(4, "Instructions"),
    ...nodesFromMd(
      `First [install the library and its dependencies](/api/latest/?code-lang=${language}) and then save the example to \`${exampleFile}\` and run following commands:`,
    ),
    fence("bash", runCommand),
  ];
}
