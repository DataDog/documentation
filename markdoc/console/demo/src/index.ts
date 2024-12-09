import { buildApp } from "sfha-builder";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PATH_TO_APP = path.resolve(__dirname, "../../app");

buildApp({
  viteProjectPath: PATH_TO_APP,
  dbData: { msg: "Hello from the demo builder!" },
}).then((output: string) => {
  const outputPath = path.resolve(__dirname, "../index.html");
  fs.writeFileSync(outputPath, output);
});
