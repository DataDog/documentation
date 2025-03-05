import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import {
  HugoEnv,
  HugoGlobalConfig,
  HugoGlobalConfigSchema,
  HugoLanguagesConfig,
  HugoLanguagesConfigSchema,
  HugoSiteConfig,
  HugoSiteConfigSchema,
  HugoSiteParams,
  HugoSiteParamsSchema,
  HugoSubdirsByType,
  i18nConfig,
  i18nConfigSchema
} from '../schemas/config/hugo';
import { IntegrationConfig } from '../schemas/config/integration';

export class HugoGlobalConfigBuilder {
  static build(p: IntegrationConfig): HugoGlobalConfig {
    const config: HugoGlobalConfig = {
      siteParams: this.loadSiteParams(p),
      siteConfig: this.loadSiteConfig(p),
      languages: this.loadLanguages(p),
      env: p.env,
      siteDir: p.baseSiteDir,
      i18n: this.loadI18n(p),
      dirs: this.getSubdirsByType(p)
    };

    HugoGlobalConfigSchema.parse(config);
    return config;
  }

  private static getSubdirsByType(p: IntegrationConfig): HugoSubdirsByType {
    return {
      content: p.baseSiteDir + '/content',
      customizationConfig: p.baseSiteDir + '/customization_config',
      partials: p.baseSiteDir + '/layouts/partials',
      images: p.baseSiteDir + '/static/images',
      static: p.baseSiteDir + '/static'
    };
  }

  private static loadSiteParams(p: IntegrationConfig): HugoSiteParams {
    const defaultSiteParamsFile = p.baseSiteDir + '/config/_default/params.yaml';
    const defaultSiteParams = yaml.load(fs.readFileSync(defaultSiteParamsFile, 'utf8'));

    const envSiteParamsFile = p.baseSiteDir + `/config/${p.env}/params.yaml`;
    const envSiteParams = yaml.load(fs.readFileSync(envSiteParamsFile, 'utf8'));

    const siteParams = Object.assign(
      {},
      defaultSiteParams,
      envSiteParams
    ) as HugoSiteParams;
    HugoSiteParamsSchema.parse(siteParams);

    return siteParams;
  }

  private static loadSiteConfig(p: IntegrationConfig): HugoSiteConfig {
    const defaultSiteConfigFile = p.baseSiteDir + '/config/_default/config.yaml';
    const defaultSiteConfig = yaml.load(fs.readFileSync(defaultSiteConfigFile, 'utf8'));

    const envSiteConfigFile = p.baseSiteDir + `/config/${p.env}/config.yaml`;
    const envSiteConfig = yaml.load(fs.readFileSync(envSiteConfigFile, 'utf8'));

    const siteConfig = Object.assign(
      {},
      defaultSiteConfig,
      envSiteConfig
    ) as HugoSiteConfig;
    HugoSiteConfigSchema.parse(siteConfig);

    return siteConfig;
  }

  private static loadLanguages(p: IntegrationConfig): HugoLanguagesConfig {
    const languagesFile = p.baseSiteDir + '/config/_default/languages.yaml';
    const languagesConfig = yaml.load(fs.readFileSync(languagesFile, 'utf8'));
    // @ts-ignore, data is validated by the schema on the next line
    const languages = Object.keys(languagesConfig);
    HugoLanguagesConfigSchema.parse(languages);
    return languages;
  }

  static loadI18n(p: IntegrationConfig): i18nConfig {
    const i18n = {};
    const i18nDir = p.baseSiteDir + '/i18n';
    const files = fs.readdirSync(i18nDir);
    files.forEach((file) => {
      const lang = file.replace('.json', '');
      // @ts-ignore, data is validated by the schema on the next line
      i18n[lang] = yaml.load(fs.readFileSync(path.resolve(i18nDir, file), 'utf8'));
    });
    i18nConfigSchema.parse(i18n);
    return i18n;
  }
}
