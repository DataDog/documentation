---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- web
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/lighthouse/README.md
display_name: Lighthouse
draft: false
git_integration_title: lighthouse
guid: 4e66e6d6-bcb0-4250-b950-95ef11176494
integration_id: lighthouse
integration_title: Lighthouse
integration_version: 2.1.0
is_public: true
custom_kind: integration
maintainer: mustin.eric@gmail.com
manifest_version: 1.0.0
metric_prefix: lighthouse.
metric_to_check: lighthouse.performance
name: lighthouse
public_title: Intégration Datadog/Lighthouse
short_description: Statistiques d'audit de Google Lighthouse
support: contrib
supported_os:
- linux
---



## Présentation

Recueillez les métriques de [Google Chrome Lighthouse][1] en temps réel pour :

- Visualiser et surveiller les états de Lighthouse
- Mesurer et auditer les scores de vos sites Web en matière d'accessibilité, de meilleures pratiques, de performances, d'adaptabilité et de SEO

## Configuration

Le check Lighthouse n'est pas inclus avec le package de l'[Agent Datadog][2] : vous devez donc l'installer.

### Installation

Pour l'Agent v7.21+/6.21+, suivez les instructions ci-dessous afin d'installer le check Lighthouse sur votre host. Consultez la section [Utiliser les intégrations de la communauté][3] pour effectuer une installation avec l'Agent Docker ou avec des versions antérieures de l'Agent.

1. Exécutez la commande suivante pour installer l'intégration de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-lighthouse==<INTEGRATION_VERSION>
   ```

2. Configurez votre intégration comme une [intégration][4] de base.

### Configuration

1. Modifiez le fichier `lighthouse.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][5] pour commencer à recueillir vos [métriques](#metriques) Lighthouse.
   Consultez le [fichier d'exemple lighthouse.d/conf.yam][6] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][7].

### Prérequis

1. Node.js LTS (8.9 ou ultérieur) :
   - Vérifiez que Node.js et npm sont installés :

   ```shell
   node -v
   npm -v
   ```

   - Si ce n'est pas le cas, [installez-les][8].

2. [Lighthouse][9] :
   - Vérifiez que Lighthouse est installé.

   ```shell
   # example
   root@hostname:~# npm list -g --depth=0 | grep 'lighthouse'
   |_ lighthouse@5.6.0
   ```

   - Si ce n'est pas le cas (la commande ci-dessus ne génère aucun résultat), installez-le :
   ```shell
   npm install -g lighthouse
   ```


3. Google Chrome/Chromium ou Puppeteer :

   - [Chromium][10]
      + Debian/Ubuntu

      ```shell
      sudo apt-get update
      sudo apt-get install -y chromium-browser
      ```

      + RHEL/CentOS

      ```shell
      sudo yum install -y epel-release
      sudo yum install -y chromium
      ```

      **Remarque** : cette intégration exécute Chrome/Chromium en mode headless. Il se peut que Chrome/Chromium requière un kernel 4.4 ou ultérieur sur RHEL/CentOS pour que le mode headless fonctionne correctement.

   - [Puppeteer][11]
      + Vérifiez que Puppeteer est installé.

      ```shell
      # example
      root@hostname:~# npm list -g --depth=0 | grep 'puppeteer'
      |_ puppeteer@1.12.2
      ```

      + Si ce n'est pas le cas (la commande ci-dessus ne génère aucun résultat), installez-le :

      ```shell
      npm install -g puppeteer --unsafe-perm=true
      ```

4. Vérifiez que l'utilisateur `dd-agent` peut exécuter l'interface de ligne de commande Lighthouse.

   ```shell
   sudo -u dd-agent lighthouse <WEB_URL> --output json --quiet --chrome-flags='--headless'
   ```

### Validation

[Lancez la sous-commande status de l'Agent][12] et cherchez `lighthouse` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "lighthouse" >}}


### Événements

L'intégration Lighthouse n'inclut aucun événement.

### Checks de service

L'intégration Lighthouse n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][14].

[1]: https://developers.google.com/web/tools/lighthouse
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/fr/getting_started/integrations/
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/lighthouse/datadog_checks/lighthouse/data/conf.yaml.example
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://nodejs.org/en/download
[9]: https://github.com/GoogleChrome/lighthouse
[10]: https://www.chromium.org/
[11]: https://github.com/GoogleChrome/puppeteer
[12]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[13]: https://github.com/DataDog/integrations-extras/blob/master/lighthouse/datadog_checks/lighthouse/metadata.csv
[14]: https://docs.datadoghq.com/fr/help/