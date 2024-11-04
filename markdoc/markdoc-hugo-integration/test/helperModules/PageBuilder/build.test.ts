import { describe, test, expect } from 'vitest';
import { MdocFileParser } from '../../../src/helperModules/MdocFileParser';
import { PageBuilder } from '../../../src/helperModules/PageBuilder';
import { YamlConfigParser } from '../../../src/helperModules/YamlConfigParser';
import {
  VALID_CONTENT_DIR,
  VALID_PARTIALS_DIR,
  VALID_PREFS_CONFIG_DIR,
  SNAPSHOTS_DIR
} from '../../config/constants';
import { PagePrefsManifestSchema } from '../../../src/schemas/pagePrefs';
import { mockHugoGlobalConfig } from '../../mocks/valid/hugoConfig';

describe('PageBuilder.build', () => {
  const LANG_DIR = VALID_PREFS_CONFIG_DIR + '/en';
  const testFilePath = VALID_CONTENT_DIR + '/en/primary_colors.mdoc';
  const allowlist = YamlConfigParser.loadAllowlistFromLangDir(LANG_DIR);
  const prefOptionsConfig = YamlConfigParser.loadPrefsConfigFromLangDir({
    dir: LANG_DIR,
    allowlist
  });

  const sanitizedMarkdocFilename = testFilePath.replace(VALID_CONTENT_DIR, '');

  const parsedFile = MdocFileParser.parseMdocFile({
    file: testFilePath,
    partialsDir: VALID_PARTIALS_DIR
  });

  const prefOptionsConfigForPage = YamlConfigParser.getPrefOptionsForPage(
    parsedFile.frontmatter,
    prefOptionsConfig
  );

  const draftPrefsManifest = YamlConfigParser.buildPagePrefsManifest({
    frontmatter: parsedFile.frontmatter,
    prefOptionsConfig,
    allowlist
  });

  const prefsManifest = PagePrefsManifestSchema.parse(draftPrefsManifest);

  const { html } = PageBuilder.build({
    parsedFile,
    prefOptionsConfig: prefOptionsConfigForPage,
    hugoConfig: { global: mockHugoGlobalConfig },
    prefsManifest
  });

  test(`builds a Markdown string for ${sanitizedMarkdocFilename} that matches the snapshot`, () => {
    expect(html).toMatchFileSnapshot(
      `${SNAPSHOTS_DIR}/helperModules/PageBuilder/${sanitizedMarkdocFilename}/compiledHtml.snap.html`
    );
  });
});
