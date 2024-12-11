import { defineConfig, build } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { AuthorConsoleData } from '../schemas/authorConsole';

const __dirname = path.dirname(__filename);
const VITE_PROJECT_PATH = path.resolve(__dirname, '../author-console');
// const TEMP_PARENT_DIR = path.resolve(os.tmpdir(), 'markdoc-author-console');
const TEMP_PARENT_DIR = path.resolve(__dirname, 'tmp');
console.log('TEMP_PARENT_DIR: ' + TEMP_PARENT_DIR);

export class AuthorConsoleBuilder {
  static async buildHtml(p: { data: AuthorConsoleData }): Promise<string> {
    const tempAppDir = this.createTempAppDir();

    const viteConfig = defineConfig({
      root: tempAppDir,
      plugins: [react(), viteSingleFile()]
    });

    // Overwrite the tmp app data file with provided data
    this.updateAppData(tempAppDir, p.data);

    // Build the temporary app programmatically
    const result = await build(viteConfig);

    let appHtml: string;

    if ('output' in result && result.output.length > 0 && 'source' in result.output[0]) {
      appHtml = result.output[0].source as string;
    } else {
      throw new Error(
        'Source not found in build result: ' + JSON.stringify(result, null, 2)
      );
    }

    // Delete the temporary app
    console.log('Trying to remove temp app dir: ' + tempAppDir);
    fs.rmdirSync(tempAppDir, { recursive: true });

    return appHtml;
  }

  private static updateAppData(tmpProjectPath: string, data: any) {
    const fileContents = `export const dbData = ${JSON.stringify(data, null, 2)};`;

    const dbDataFilePath = path.resolve(tmpProjectPath, 'src/db/data.ts');

    fs.writeFileSync(dbDataFilePath, fileContents);
  }

  static createTempAppDir() {
    // use a uuid
    const uniqueId = crypto.randomUUID();
    const tempAppDir = TEMP_PARENT_DIR + '/' + uniqueId;

    // Create the tmp dir if it doesn't exist
    if (!fs.existsSync(tempAppDir)) {
      fs.mkdirSync(tempAppDir, { recursive: true });
    }

    // Copy the vite project to tmp
    fs.cpSync(VITE_PROJECT_PATH, tempAppDir, { recursive: true });

    console.log('RETURNING temp app dir: ' + tempAppDir);
    return tempAppDir;
  }
}

/*
export async function buildApp(p: {
  viteProjectPath: string;
  dbData?: any;
}): Promise<string> {
  // Clear the tmp dir if it exists
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true });
  }

  // Create the tmp dir if it doesn't exist
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  // Copy the vite project to tmp
  fs.cpSync(p.viteProjectPath, tempDir, { recursive: true });

  const viteConfig = defineConfig({
    root: tempDir,
    plugins: [react(), viteSingleFile()]
  });

  // Overwrite the tmp app data file if data is provided
  if (p.dbData) {
    updateAppData(tempDir, p.dbData);
  }

  const result = await build(viteConfig);

  let appHtml: string;

  if ('output' in result && result.output.length > 0 && 'source' in result.output[0]) {
    appHtml = result.output[0].source as string;
  } else {
    throw new Error(
      'Source not found in build result: ' + JSON.stringify(result, null, 2)
    );
  }

  // Clear the temp folder
  fs.rmSync(tempDir, { recursive: true });

  return appHtml;
}

function updateAppData(tmpProjectPath: string, data: any) {
  const fileContents = `export const dbData = ${JSON.stringify(data, null, 2)};`;

  const dbDataFilePath = path.resolve(tmpProjectPath, 'src/db/data.ts');

  fs.writeFileSync(dbDataFilePath, fileContents);
}
*/
