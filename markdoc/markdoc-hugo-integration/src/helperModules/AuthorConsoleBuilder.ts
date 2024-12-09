import { buildApp } from 'sfha-builder';
import path from 'path';
import fs from 'fs';

const APP_PATH = path.resolve(__dirname, '../author_console');

class AuthorConsoleBuilder {
  static async compileHtml() {
    // create the dbData object
  }
}

/*
buildApp({
  viteProjectPath: PATH_TO_APP,
  dbData: { msg: "Hello from the demo builder!" },
}).then((output: string) => {
  const outputPath = path.resolve(__dirname, "../index.html");
  fs.writeFileSync(outputPath, output);
});
*/
