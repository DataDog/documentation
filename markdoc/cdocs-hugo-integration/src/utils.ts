import fs from 'fs';
import path from 'path';

/**
 * Find all files in a directory that match a given regular expression.
 *
 * @param dir The directory to search in.
 * @param filter The regular expression to filter files by.
 * @returns A list of file paths.
 */
export function findInDir(dir: string, filter: RegExp) {
  let fileList: string[] = [];
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const fileStat = fs.lstatSync(filePath);

    if (fileStat.isDirectory()) {
      fileList = [...fileList, ...findInDir(filePath, filter)];
    } else if (filter.test(filePath)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Remove the line breaks from a string.
 */
export function removeLineBreaks(str: string): string {
  return str.replace(/(\r\n|\n|\r)/gm, '');
}
