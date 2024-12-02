import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { HugoGlobalConfig, HugoSubdirsByType } from '../schemas/config/hugo';

class HugoGlobalConfigBuilder {
  static build(baseSiteDir: string, env: string): HugoGlobalConfig {
    const siteParams = this.loadSiteParams(baseSiteDir, env);
    const siteConfig = this.loadSiteConfig(baseSiteDir, env);
    const languages = this.loadLanguages(baseSiteDir);
    const i18n = this.loadI18n(baseSiteDir);
    const dirs = this.getSubdirsByType(baseSiteDir);
    return {
      siteParams,
      siteConfig,
      languages,
      env,
      siteDir: baseSiteDir,
      i18n,
      dirs
    };
  }

  private static getSubdirsByType(siteDir: string): HugoSubdirsByType {
    return {
      content: siteDir + '/content',
      filtersConfig: siteDir + '/config/_default/content_filters',
      partials: siteDir + '/layouts/partials',
      images: siteDir + '/static/images'
    };
  }

  private static loadSiteParams(baseSiteDir: string, env: string) {
    const defaultSiteParamsFile = baseSiteDir + '/config/_default/params.yaml';
    const defaultSiteParams = yaml.load(fs.readFileSync(defaultSiteParamsFile, 'utf8'));

    const envSiteParamsFile = baseSiteDir + `/config/${env}/params.yaml`;
    const envSiteParams = yaml.load(fs.readFileSync(envSiteParamsFile, 'utf8'));

    const siteParams = Object.assign({}, defaultSiteParams, envSiteParams);
    return siteParams;
  }

  private static loadSiteConfig(baseSiteDir: string, env: string) {
    const defaultSiteConfigFile = baseSiteDir + '/config/_default/config.yaml';
    const defaultSiteConfig = yaml.load(fs.readFileSync(defaultSiteConfigFile, 'utf8'));

    const envSiteConfigFile = baseSiteDir + `/config/${env}/config.yaml`;
    const envSiteConfig = yaml.load(fs.readFileSync(envSiteConfigFile, 'utf8'));

    const siteConfig = Object.assign({}, defaultSiteConfig, envSiteConfig);
    return siteConfig;
  }

  private static loadLanguages(baseSiteDir: string) {
    const languagesFile = baseSiteDir + '/config/_default/languages.yaml';
    const languagesConfig = yaml.load(fs.readFileSync(languagesFile, 'utf8'));
    const languages = Object.keys(languagesConfig);
    return languages;
  }

  static loadI18n(baseSiteDir: string) {
    const i18n = {};
    const i18nDir = baseSiteDir + '/i18n';
    const files = fs.readdirSync(i18nDir);
    files.forEach((file) => {
      const lang = file.replace('.json', '');
      i18n[lang] = yaml.load(fs.readFileSync(path.resolve(i18nDir, file), 'utf8'));
    });
    return i18n;
  }
}
