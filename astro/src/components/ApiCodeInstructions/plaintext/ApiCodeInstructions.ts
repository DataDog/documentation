/**
 * AST twin of `ApiCodeInstructions.astro`. Uses the first region's run command.
 */

import type { Node as MarkdocNode } from "@markdoc/markdoc";
import {
  bold,
  fence,
  inline,
  nodesFromMd,
  paragraph,
  plaintext,
} from "@lib/plaintext/helpers";

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
    paragraph([inline([bold([plaintext("Instructions")])])]),
    ...nodesFromMd(
      `First [install the library and its dependencies](/api/latest/?code-lang=${language}) and then save the example to \`${exampleFile}\` and run following commands:`,
    ),
    fence("bash", runCommand),
  ];
}
