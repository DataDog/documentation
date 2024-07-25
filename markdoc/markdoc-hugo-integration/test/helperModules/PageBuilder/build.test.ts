import { describe, test, expect } from 'vitest';
import { FileParser } from '../../../src/helperModules/FileParser';
import { PageBuilder } from '../../../src/helperModules/PageBuilder';
import { FileNavigator } from '../../../src/helperModules/FileNavigator';
import { ConfigProcessor } from '../../../src/helperModules/ConfigProcessor';
import {
  VALID_CONTENT_DIR,
  VALID_PARTIALS_DIR,
  VALID_PREF_OPTIONS_DIR,
  SNAPSHOTS_DIR
} from '../../config/constants';

describe('HtmlBuilder.build', () => {
  const markdocFiles = FileNavigator.findInDir(VALID_CONTENT_DIR, /\.mdoc$/);
  const prefOptionsConfig =
    ConfigProcessor.loadPrefOptionsFromDir(VALID_PREF_OPTIONS_DIR);

  markdocFiles.forEach((markdocFile) => {
    const sanitizedMarkdocFilename = markdocFile.replace(VALID_CONTENT_DIR, '');

    const parsedFile = FileParser.parseMdocFile(markdocFile, VALID_PARTIALS_DIR);

    const prefOptionsConfigForPage = ConfigProcessor.getPrefOptionsForPage(
      parsedFile.frontmatter,
      prefOptionsConfig
    );

    const html = PageBuilder.build({
      parsedFile,
      prefOptionsConfig: prefOptionsConfigForPage,
      debug: true,
      includeAssetsInline: true
    });

    test(`builds an HTML string for ${sanitizedMarkdocFilename} that matches the snapshot`, () => {
      expect(html).toMatchFileSnapshot(
        `${SNAPSHOTS_DIR}/helperModules/HtmlBuilder/${sanitizedMarkdocFilename}/compiledHtml.snap.html`
      );
    });
  });
});
