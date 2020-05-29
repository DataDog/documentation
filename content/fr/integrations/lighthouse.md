---
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - web
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/lighthouse/README.md'
display_name: Lighthouse
git_integration_title: lighthouse
guid: 4e66e6d6-bcb0-4250-b950-95ef11176494
integration_id: lighthouse
integration_title: Lighthouse
is_public: true
kind: integration
maintainer: mustin.eric@gmail.com
manifest_version: 1.0.0
metric_prefix: lighthouse.
metric_to_check: lighthouse.performance
name: lighthouse
public_title: Intégration Datadog/Lighthouse
short_description: "Statistiques d'audit de Google\_Lighthouse"
support: contrib
supported_os:
  - linux
---
## Présentation

Recueillez les métriques de [Google Chrome Lighthouse][1] en temps réel pour :

- Visualiser et surveiller les états de Lighthouse
- Mesurer et auditer les scores de vos sites Web en matière d'accessibilité, de meilleures pratiques, de performances, d'adaptabilité et de SEO

## Implémentation

Le check Lighthouse n'est pas inclus avec le paquet de l'[Agent Datadog][2] : vous devez donc l'installer.

### Installation

Si vous utilisez la version 6.8 ou ultérieure de l'Agent, suivez les instructions ci-dessous pour installer votre check Google Chrome Lighthouse sur votre host. Consultez notre guide relatif à l'[installation d'intégrations développées par la communauté][3] pour installer des checks avec une [version < 6.8 de l'Agent][4] ou avec [Agent Docker][5] :

1. Installez le [kit de développement][6].
2. Clonez le référentiel integrations-extras :

   ```shell
   git clone https://github.com/DataDog/integrations-extras.git.
   ```

3. Mettez à jour votre configuration `ddev` avec le chemin `integrations-extras/` :

   ```shell
   ddev config set extras ./integrations-extras
   ```

4. Pour générer le paquet `lighthouse`, exécutez :

   ```shell
   ddev -e release build lighthouse
   ```

5. [Téléchargez et lancez l'Agent Datadog][2].
6. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

   ```shell
   datadog-agent integration install -w <PATH_OF_LIGHTHOUSE_ARTIFACT>/<LIGHTHOUSE_ARTIFACT_NAME>.whl
   ```

7. Configurez votre intégration comme [n'importe quelle autre intégration fournie avec l'Agent][7].

### Configuration

1. Modifiez le fichier `lighthouse.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][8] pour commencer à recueillir vos [métriques](#metriques) Lighthouse.
   Consultez le [fichier d'exemple lighthouse.d/conf.yam][9] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][10].

### Exigences

1. Node.js LTS (8.9 ou ultérieur) :
   - Vérifiez que Node.js et npm sont installés :

   ```shell
   node -v
   npm -v
   ```

   - Si ce n'est pas le cas, [installez-les][11].

2. [Lighthouse][12] :
   - Vérifiez que Lighthouse est installé.

   ```shell
   # example
   root@hostname:~# npm list -g --depth=0 | grep 'lighthouse'
   └── lighthouse@5.6.0
   ```

   - Si ce n'est pas le cas (la commande ci-dessus ne génère aucun résultat), installez-le :
   ```shell
   npm install -g lighthouse
   ```


3. Google Chrome/Chromium ou Puppeteer :

   - [Chromium][13]
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

      **Remarque** : cette intégration exécute Chrome/Chromium en mode headless. Il se peut que Chrome/Chromium requiert un kernel 4.4 ou ultérieur sur RHEL/CentOS pour que le mode headless fonctionne correctement.

   - [Puppeteer][14]
      + Vérifiez que Lighthouse est installé.

      ```shell
      # example
      root@hostname:~# npm list -g --depth=0 | grep 'puppeteer'
      └── puppeteer@1.12.2
      ```

      + Si ce n'est pas le cas (si la commande ci-dessus ne génère aucun résultat), installez-le :

      ```shell
      npm install -g puppeteer --unsafe-perm=true
      ```

4. Vérifiez que l'utilisateur `dd-agent` peut exécuter l'interface de ligne de commande Lighthouse.

   ```shell
   sudo -u dd-agent lighthouse <WEB_URL> --output json --quiet --chrome-flags='--headless'
   ```

### Validation

[Lancez la sous-commande status de l'Agent][15] et cherchez `lighthouse` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "lighthouse" >}}


### Événements

L'intégration Lighthouse n'inclut aucun événement.

### Checks de service

L'intégration Lighthouse n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][17].

[1]: https://developers.google.com/web/tools/lighthouse
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/
[4]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[5]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[6]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit
[7]: https://docs.datadoghq.com/fr/getting_started/integrations/
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[9]: https://github.com/DataDog/integrations-extras/blob/master/lighthouse/datadog_checks/lighthouse/data/conf.yaml.example
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: https://nodejs.org/en/download
[12]: https://github.com/GoogleChrome/lighthouse
[13]: https://www.chromium.org/
[14]: https://github.com/GoogleChrome/puppeteer
[15]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[16]: https://github.com/DataDog/integrations-extras/blob/master/lighthouse/datadog_checks/lighthouse/metadata.csv
[17]: https://docs.datadoghq.com/fr/help/