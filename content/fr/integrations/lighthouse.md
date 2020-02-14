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
* Visualiser et surveiller les états de Lighthouse
* Mesurez et auditez les scores de vos sites Web en matière d'accessibilité, de meilleures pratiques, de performances, d'adaptabilité et de SEO. 

## Implémentation

Le check Lighthouse n'est pas inclus avec le paquet de l'[Agent Datadog][2] : vous devez donc l'installer.

### Installation

Si vous utilisez la version 6.8 ou ultérieure de l'Agent, suivez les instructions ci-dessous pour installer votre check Google Chrome Lighthouse sur votre host. Consultez notre guide relatif à l'[installation d'intégrations développées par la communauté][3] pour installer des checks avec une [version < 6.8 de l'Agent][4] ou avec [Agent Docker][5] :

1. Installez le [kit de développement][6].
2. Clonez le référentiel integrations-extras :

    ```
    git clone https://github.com/DataDog/integrations-extras.git.
    ```

3. Mettez à jour votre configuration `ddev` avec le chemin `integrations-extras/` :

    ```
    ddev config set extras ./integrations-extras
    ```

4. Pour générer le paquet `lighthouse`, exécutez :

    ```
    ddev -e release build lighthouse
    ```

5. [Téléchargez et lancez l'Agent Datadog][7].
6. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

    ```
    datadog-agent integration install -w <PATH_OF_LIGHTHOUSE_ARTIFACT_>/<LIGHTHOUSE_ARTIFACT_NAME>.whl
    ```

7. Configurez votre intégration comme [n'importe quelle autre intégration du paquet][8].

### Configuration

1. Modifiez le fichier `lighthouse.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][9] pour commencer à recueillir vos [métriques](#metriques) Lighthouse.
  Consultez le [fichier d'exemple lighthouse.d/conf.yam][10] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][11].

### Exigences

1. Lighthouse nécessite que la version 8 LTS (8.9) ou une version ultérieure de Node soit installée. Vérifiez que Node et npm sont installés :

    ```
    node -v
    npm -v
    ```

    Si ce n'est pas le cas, [installez-les][12].

2. [Installez Lighthouse][13] :

    ```
    npm install -g lighthouse
    ```

3. Assurez-vous d'avoir installé Google Chrome ou Puppereer (ce check d'Agent custom exécute Chrome en mode headless).

    ```
    # example
    vagrant@web2:~$ npm list -g --depth=0 | grep 'puppeteer'
    └── puppeteer@1.12.2
    ```

    Si ce n'est pas le cas, installez Chrome ou [Puppeteer][14] :

    ```
    npm install -g puppeteer
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
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent
[4]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[5]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[6]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit
[7]: https://app.datadoghq.com/account/settings#agent
[8]: https://docs.datadoghq.com/fr/getting_started/integrations
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[10]: https://github.com/DataDog/integrations-extras/blob/master/lighthouse/datadog_checks/lighthouse/data/conf.yaml.example
[11]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[12]: https://nodejs.org/en/download
[13]: https://github.com/GoogleChrome/lighthouse
[14]: https://github.com/GoogleChrome/puppeteer
[15]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[16]: https://github.com/DataDog/integrations-extras/blob/master/lighthouse/datadog_checks/lighthouse/metadata.csv
[17]: https://docs.datadoghq.com/fr/help