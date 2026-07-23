import { z } from "zod";

export const CodeExampleEntrySchema = z
  .object({
    description: z
      .string()
      .describe("Human-readable description of this example"),
    code: z.string().describe("The raw source code"),
    syntax: z.string().describe("Syntax highlighting language identifier"),
    highlightedCode: z
      .string()
      .optional()
      .describe("Pre-rendered highlighted HTML (populated at build time)"),
    regionVariants: z
      .record(
        z.string(),
        z
          .object({
            code: z.string(),
            highlightedCode: z.string().optional(),
          })
          .strict(),
      )
      .optional()
      .describe(
        "Optional per-region variants of this entry. When present, the UI renders one wrapper per region with `data-region=\"<key>\"` so the visible variant updates reactively with the site selector. `code` above is the fallback used when no region is active. Currently used for curl.",
      ),
  })
  .strict();

export const CodeExampleSetSchema = z
  .object({
    language: z.string().describe("Language identifier (e.g. 'python', 'ruby')"),
    label: z.string().describe("Display label (e.g. 'Python', 'Ruby')"),
    entries: z
      .array(CodeExampleEntrySchema)
      .describe("One or more code examples for this language"),
  })
  .strict();

export type CodeExampleEntry = z.infer<typeof CodeExampleEntrySchema>;
export type CodeExampleSet = z.infer<typeof CodeExampleSetSchema>;
