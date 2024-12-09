import { defineConfig, build } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tempDir = path.resolve(__dirname, "temp");

export async function buildApp(p: {
  viteProjectPath: string;
  dbData?: any;
}): Promise<string> {
  // Clear the temp dir if it exists
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true });
  }

  // Create the temp dir if it doesn't exist
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  // Copy the vite project to temp
  fs.cpSync(p.viteProjectPath, tempDir, { recursive: true });

  const viteConfig = defineConfig({
    root: tempDir,
    plugins: [react(), viteSingleFile()],
  });

  // Overwrite the temp app data file if data is provided
  if (p.dbData) {
    updateAppData(tempDir, p.dbData);
  }

  const result = await build(viteConfig);

  let appHtml: string;

  if (
    "output" in result &&
    result.output.length > 0 &&
    "source" in result.output[0]
  ) {
    appHtml = result.output[0].source as string;
  } else {
    throw new Error(
      "Source not found in build result: " + JSON.stringify(result, null, 2)
    );
  }

  // Clear the temp folder
  fs.rmSync(tempDir, { recursive: true });

  return appHtml;
}

function updateAppData(tmpProjectPath: string, data: any) {
  const fileContents = `export const dbData = ${JSON.stringify(
    data,
    null,
    2
  )};`;

  const dbDataFilePath = path.resolve(tmpProjectPath, "src/db/data.ts");

  fs.writeFileSync(dbDataFilePath, fileContents);
}
