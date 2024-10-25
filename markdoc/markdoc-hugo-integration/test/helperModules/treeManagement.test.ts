import { describe, test, expect } from 'vitest';
import { MdocFileParser } from '../../src/helperModules/MdocFileParser';
import {
  VALID_CONTENT_DIR,
  VALID_PARTIALS_DIR,
  SNAPSHOTS_DIR,
  VALID_PREFS_CONFIG_DIR
} from '../config/constants';
import { buildRenderableTree } from '../../src/helperModules/treeManagement';
import { YamlConfigParser } from '../../src/helperModules/YamlConfigParser';

describe('treeManagement', () => {
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

  const prefsManifest = YamlConfigParser.buildPagePrefsManifest({
    frontmatter: parsedFile.frontmatter,
    prefOptionsConfig,
    allowlist
  });

  test(`builds a renderable tree for ${sanitizedMarkdocFilename} that matches the snapshot`, () => {
    const { renderableTree } = buildRenderableTree({
      parsedFile,
      defaultValsByPrefId: prefsManifest.defaultValsByPrefId,
      variables: {},
      prefsManifest
    });

    expect(JSON.stringify(renderableTree, null, 2)).toMatchFileSnapshot(
      `${SNAPSHOTS_DIR}/validSite/compilationStepsByFilename/${sanitizedMarkdocFilename}/renderableTree.snap.json`
    );
  });
});
