import fs from 'fs';
import path from 'path';

/**
 * A module of static helper functions
 * for working with files and directories.
 */
export class FileManager {
  /**
   * Find all files in a directory that match a given regular expression.
   *
   * @param dir The directory to search in.
   * @param filter The regular expression to filter files by.
   * @returns A list of file paths.
   */
  static findInDir(dir: string, filter: RegExp) {
    let fileList: string[] = [];
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const fileStat = fs.lstatSync(filePath);

      if (fileStat.isDirectory()) {
        fileList = [...fileList, ...this.findInDir(filePath, filter)];
      } else if (filter.test(filePath)) {
        fileList.push(filePath);
      }
    });

    return fileList;
  }
}
