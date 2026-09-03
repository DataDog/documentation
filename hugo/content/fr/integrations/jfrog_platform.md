---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Artifactory Metrics: assets/dashboards/artifactory_metrics.json
    Jfrog Artifactory Dashboard: assets/dashboards/jfrog_artifactory_dashboard.json
    Xray Logs: assets/dashboards/xray_logs.json
    Xray Metrics: assets/dashboards/xray_metrics.json
    Xray Violations: assets/dashboards/xray_violations.json
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- log collection
- security
- metrics
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/jfrog_platform/README.md
display_name: Plateforme JFrog
draft: false
git_integration_title: jfrog_platform
guid: 2c70552e-b77a-4349-9955-8799b9b57d56
integration_id: jfrog-platform
integration_title: Plateforme JFrog
integration_version: 1.0.0
is_public: true
custom_kind: integration
maintainer: integrations@jfrog.com
manifest_version: 1.0.0
metric_prefix: jfrog.
metric_to_check: jfrog.artifactory.app_disk_free_bytes
name: jfrog_platform
public_title: Plateforme JFrog
short_description: Visualisez et analysez vos événements et métriques JFrog Artifactory
  et Xray.
support: contrib
supported_os:
- linux
- mac_os
- windows
---

## Présentation
La section suivante décrit les étapes à suivre pour configurer Datadog de façon à recueillir des métriques et des logs à partir de JFrog Artifactory et JFrog Xray.

### JFrog Artifactory et JFrog Xray
JFrog Enterprise avec Xray comporte Artifactory Enterprise et Xray. Ces deux outils permettent aux équipes DevOps d'améliorer leur productivité afin d'accélérer leurs processus et de fournir des versions de logiciels fiables de haute qualité.

Artifactory prend en charge plusieurs artefacts, métadonnées et packages de build. Il permet aux équipes DevOps de choisir librement entre des packages de build, tels que Bower, Chef, CocoaPods, Conan, Conda, CRAN, Debian, Docker, Golang, Gradle, Git LFS, Helm, Ivy, Maven, npm, NuGet, Opkg, P2, PHP Composer, Puppet, PyPI, RPM, RubyGems, SBT, Vagrant & VCS, les plateformes CI/CD et les outils DevOps.

Artifactory Enterprise prend en charge la réplication multi-région, multi-cloud et hybride pour des équipes géographiquement dispersées. Vous avez ainsi la possibilité d'effectuer une réplication entre un référentiel source et plusieurs cibles simultanément et pouvez profiter de fonctionnalités de sécurité, telles que le filtrage IP, CNAME et le chiffrement de données au repos. Artifactory prend en charge Kubernetes pour les microservices et les applications conteneurisées. Gérez vos déploiements et obtenez des informations sur les dépendances en utilisant Artifactory en tant que registre Kubernetes.

JFrog Xray est une solution d'analyse universelle d'artefacts et de sécurité continue vous permettant d'effectuer des analyses sur plusieurs couches de vos conteneurs et artefacts logiciels, afin de détecter leurs vulnérabilités et leurs problèmes de conformité vis-à-vis des licences. C'est la seule solution d'analyse de composition logicielle capable de s'intégrer nativement à JFrog Artifactory. Elle vous permet ainsi d'optimiser vos analyses et d'unifier vos opérations. Cet outil prend en charge tous les principaux types de packages, les décompresse de façon adéquate et utilise des analyses récursives pour examiner toutes les dépendances et couches sous-jacentes, même lorsqu'elles se trouvent dans des images Docker ou des fichiers zip.

### Dashboard Datadog pour les logs Jfrog Artifactory et JFrog Xray

L'intégration Datadog/JFrog vous permet d'envoyer des logs Artifactory/Xray au flux de logs Datadog. Vous pouvez l'utiliser pour améliorer vos dashboards existants ou mieux comprendre les statistiques d'utilisation d'Artifactory ou les composants analysés de Xray.

![dashboard][1]

![dashboard][2]

![dashboard][3]

### Dashboard pour l'API de métriques de JFrog Artifactory et JFrog Xray

Grâce à l'intégration de l'API de métriques de JFrog Artifactory et Xray, vous pouvez envoyer des métriques depuis l'endpoint de l'API OpenMetrics vers Datadog. Vous bénéficiez ainsi d'informations exploitables sur les performances système et l'utilisation du stockage, de statistiques sur les connexions associées à JFrog Artifactory/Xray, ainsi que de données sur le nombre et le type des artefacts et composants analysés par Xray. Une fois la configuration terminée, ces métriques sont présentées dans des dashboards prêts à l'emploi. Vous pouvez également utiliser ces métriques pour compléter des dashboards Datadog existants.

![artifactory][4]

![xray][5]

## Configuration

### Prérequis
* Votre [clé d'API Datadog][6]

### Collecte de logs

1. Installez Fluentd en suivant la [documentation jFrog][7] (en anglais) en fonction de votre type d'installation, puis définissez la variable d'environnement.

2. Configurez Fluentd avec Artifactory en téléchargeant le fichier de configuration Artifactory/Fluentd dans un répertoire dans lequel vous êtes autorisé à rédiger des données, par exemple les emplacements `$JF_PRODUCT_DATA_INTERNAL`.

    ```text
    cd $JF_PRODUCT_DATA_INTERNAL
    wget https://raw.githubusercontent.com/jfrog/log-analytics-datadog/master/fluent.conf.rt
    ```

    Remplacez la directive de correspondance (la dernière section) du fichier `fluent.conf.rt` téléchargé en indiquant ce qui suit :

    ```
    <match jfrog.**>
      @type datadog
      @id datadog_agent_jfrog_artifactory
      api_key API_KEY
      include_tag_key true
      dd_source fluentd
    </match>
    ```

    - `API_KEY` (requis) correspond à la clé d'API de [Datadog][8].
    - `dd_source` correspond au nom de l'intégration de log dans vos logs. Ce paramètre permet de déclencher la configuration automatique de l'intégration dans Datadog.
    - `include_tag_key` est défini sur false par défaut. Définissez ce paramètre sur true pour ajouter le tag `fluentd` dans l'enregistrement JSON.

3. Configurez Fluentd avec Xray en téléchargeant le fichier de configuration Xray/Fluentd dans un répertoire dans lequel vous êtes autorisé à rédiger des données, par exemple les emplacements `$JF_PRODUCT_DATA_INTERNAL`.

    ```text
    cd $JF_PRODUCT_DATA_INTERNAL
    wget https://raw.githubusercontent.com/jfrog/log-analytics-datadog/master/fluent.conf.xray
    ```

    Remplissez les champs `JPD_URL`, `USER` et `JFROG_API_KEY` dans la directive de source du fichier `fluent.conf.xray` téléchargé en indiquant ce qui suit :

    ```text
    <source>
      @type jfrog_siem
      tag jfrog.xray.siem.vulnerabilities
      jpd_url JPD_URL
      username USER
      apikey JFROG_API_KEY
      pos_file "#{ENV['JF_PRODUCT_DATA_INTERNAL']}/log/jfrog_siem.log.pos"
    </source>
    ```

    * `JPD_URL` (requis) correspond à l'URL JPD Artifactory, au format `http://<adresse_ip>`. Elle sert à récupérer les violations Xray.
    * `USER` (requis) correspond au nom d'utilisateur Artifactory utilisé pour l'authentification.
    * `JFROG_API_KEY` (requis) correspond à la [clé d'API Artifactory][9] utilisée pour l'authentification.

    Remplacez la directive de correspondance (la dernière section) du fichier `fluent.conf.xray` téléchargé en indiquant ce qui suit :

    ```
    <match jfrog.**>
      @type datadog
      @id datadog_agent_jfrog_xray
      api_key API_KEY
      include_tag_key true
      dd_source fluentd
    </match>
    ```

    * `API_KEY` (requis) correspond à la clé d'API de [Datadog][8].
    * `dd_source` correspond au nom de l'intégration de log dans vos logs. Ce paramètre permet de déclencher la configuration automatique de l'intégration dans Datadog.
    * `include_tag_key` est défini sur false par défaut. Définissez ce paramètre sur true pour ajouter le tag `fluentd` dans l'enregistrement JSON.

4. Activez l'intégration en exécutant `td-agent` sur les instances `artifactory` et `xray` : 

    ``` 
    td-agent
    ```

    La clé d'API est configurée dans `td-agent`. Cet Agent commence à envoyer des logs à Datadog. Pour obtenir des instructions pour d'autres types d'installation, consultez la [documentation JFrog][7] (en anglais).

    Ajoutez tous les attributs en tant que facettes en accédant à **Facets** > **Add** (à gauche de l'écran dans Logs) > **Search**.

### Collecte de métriques

1. Activez les métriques pour Artifactory et Xray :

    1. [Activez les métriques pour Artifactory.][10]
    2. [Créez des tokens d'accès administrateur pour Artifactory et Xray.][11]

2. Configuration Datadog

    Suivez les instructions ci-dessous pour configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section Environnement conteneurisé pour la configuration dans un environnement conteneurisé.

    Ces valeurs remplacent la configuration indiquée ci-dessous.
    ```text
    ARTIFACTORY_HOST_NAME_OR_IP   -> IP address or DNS of Artifactory 
    ARTIFACTORY_ADMIN_TOKEN       -> Admin token for Artifactory
    XRAY_ADMIN_TOKEN              -> Admin token for Xray
    ```
    Pour configurer ce check lorsque l'Agent est exécuté sur un host :

    1. Modifiez le fichier openmetrics.d/conf.yaml file à la racine du [répertoire de configuration de votre Agent][12] pour commencer à recueillir vos métriques Artifactory et Xray. Consultez le [fichier d'exemple openmetrics.d/conf.yaml][13] pour découvrir toutes les options de configuration disponibles.
        ```text
        instances:
           - prometheus_url: http://<ARTIFACTORY_HOST_NAME_OR_IP>:80/artifactory/api/v1/metrics
             scheme: http
             headers:
               Authorization: "Bearer <ARTIFACTORY_ADMIN_TOKEN>"
             static_configs:
               - targets: ["<ARTIFACTORY_HOST_NAME_OR_IP>:80"]
             namespace: jfrog.artifactory
             metrics:
               - sys*
               - jfrt*
               - app*
           - prometheus_url: http://<ARTIFACTORY_HOST_NAME_OR_IP>:80/xray/api/v1/metrics
               scheme: http
               headers:
                 Authorization: "Bearer <XRAY_ADMIN_TOKEN>"
               namespace: jfrog.xray
               metrics:
                 - app*
                 - db*
                 - go*
                 - queue*
                 - sys*
                 - jfxr*
        ```
    2. [Redémarrez l'Agent][14]. Si vous disposez d'un environnement conteneurisé, consultez les [modèles d'intégration Autodiscovery][15] pour découvrir comment appliquer les paramètres ci-dessus. Pour vérifier que vos modifications ont été appliquées, [exécutez la sous-commande status de l'Agent][16] et cherchez `openmetrics` dans la section Checks.

### Tile de la plate-forme JFrog

Si vous ne l'avez pas encore fait, installez le tile de la plateforme Jfrog.

### Dashboards JFrog

Accédez à Dashboard > Dashboard List, recherchez `JFrog Artifactory Dashboard`, `Artifactory Metrics` ou `Xray Metrics`, `Xray Logs` ou `Xray Violations` et explorez le dashboard.

### Données collectées

#### Métriques

Consultez [metadata.csv][17] pour découvrir la liste complète des métriques fournies par ce check.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][18].

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/jfrog_platform/images/dashboard.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/jfrog_platform/images/xray_logs.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/jfrog_platform/images/xray_violations.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/jfrog_platform/images/artifactory_metrics_dashboard.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/jfrog_platform/images/xray_metrics_dashboard.png
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: https://github.com/jfrog/log-analytics-datadog/blob/master/README.md
[8]: https://docs.datadoghq.com/fr/account_management/api-app-keys/
[9]: https://www.jfrog.com/confluence/display/JFROG/User+Profile#UserProfile-APIKey
[10]: https://github.com/jfrog/metrics#setup
[11]: https://www.jfrog.com/confluence/display/JFROG/Access+Tokens#AccessTokens-GeneratingAdminTokens
[12]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[13]: https://github.com/DataDog/integrations-extras/blob/master/jfrog_platform/datadog_checks/jfrog_platform/data/conf.yaml.example
[14]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[15]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/?tab=kubernetes
[16]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[17]: https://github.com/DataDog/integrations-extras/blob/master/jfrog_platform/metadata.csv
[18]: https://docs.datadoghq.com/fr/help/