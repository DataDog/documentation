---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Artifactory Metrics: assets/dashboards/artifactory_metrics.json
    Jfrog Artifactory Dashboard: assets/dashboards/jfrog_artifactory_dashboard.json
    Xray Metrics: assets/dashboards/xray_metrics.json
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
  - 'https://github.com/DataDog/integrations-extras/blob/master/jfrog_platform/README.md'
display_name: Plateforme JFrog
draft: false
git_integration_title: jfrog_platform
guid: 2c70552e-b77a-4349-9955-8799b9b57d56
integration_id: jfrog-platform
integration_title: Plateforme JFrog
is_public: true
kind: integration
maintainer: integrations@jfrog.com
manifest_version: 2.0.0
metric_prefix: jfrog.
metric_to_check: jfrog.artifactory.app_disk_free_bytes
name: jfrog_platform
public_title: Plateforme JFrog
short_description: "Visualisez et analysez vos événements et métriques JFrog\_Artifactory et Xray."
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation
La section suivante décrit les étapes à suivre pour configurer Datadog de façon à recueillir des métriques à partir de JFrog Artifactory et JFrog Xray.

### En quoi consistent JFrog Artifactory et JFrog Xray ?
JFrog Enterprise avec Xray comporte Artifactory Enterprise et Xray. Ces deux outils permettent aux équipes DevOps d'améliorer leur productivité afin d'accélérer leurs processus et de fournir des versions de logiciels fiables de haute qualité.

Artifactory prend en charge plusieurs artefacts, métadonnées et packages de build. Il permet aux équipes DevOps de choisir librement entre des packages de build, tels que Bower, Chef, CocoaPods, Conan, Conda, CRAN, Debian, Docker, Golang, Gradle, Git LFS, Helm, Ivy, Maven, npm, NuGet, Opkg, P2, PHP Composer, Puppet, PyPI, RPM, RubyGems, SBT, Vagrant & VCS, les plateformes CI/CD et les outils DevOps.

Artifactory Enterprise prend en charge la réplication multi-région, multi-cloud et hybride pour des équipes géographiquement dispersées. Vous avez ainsi la possibilité d'effectuer une réplication entre un référentiel source et plusieurs cibles simultanément et pouvez profiter de fonctionnalités de sécurité, telles que le filtrage IP, CNAME et le chiffrement de données au repos. Artifactory prend en charge Kubernetes pour les microservices et les applications conteneurisées. Gérez vos déploiements et obtenez des informations sur les dépendances en utilisant Artifactory en tant que registre Kubernetes.

JFrog Xray est une solution d'analyse universelle d'artefacts et de sécurité continue vous permettant d'effectuer des analyses sur plusieurs couches de vos conteneurs et artefacts logiciels, afin de détecter leurs vulnérabilités et leurs problèmes de conformité vis-à-vis des licences. C'est la seule solution d'analyse de composition logicielle capable de s'intégrer nativement à JFrog Artifactory. Elle vous permet ainsi d'optimiser vos analyses et d'unifier vos opérations. Cet outil prend en charge tous les principaux types de packages, les décompresse de façon adéquate et utilise des analyses récursives pour examiner toutes les dépendances et couches sous-jacentes, même lorsqu'elles se trouvent dans des images Docker ou des fichiers zip.

### Dashboard Datadog JFrog Artifactory

L'intégration Datadog de JFrog vous permet d'envoyer des logs Artifactory au flux de logs Datadog. Vous pouvez l'utiliser pour améliorer vos dashboards existants ou mieux comprendre les statistiques d'utilisation d'Artifactory.

![dashboard][1]

### Dashboard pour l'API de métriques de JFrog Artifactory et Xray

Grâce à l'intégration de l'API de métriques de JFrog Artifactory/Xray, vous pouvez envoyer des métriques depuis l'endpoint de l'API Open Metrics d'Artifactory ou de Xray vers Datadog. Vous bénéficiez ainsi d'informations exploitables sur les performances système et l'utilisation du stockage, de statistiques sur les connexions associées à JFrog Artifactory/Xray, ainsi que de données sur le nombre et le type des artefacts et composants analysés par Xray. Une fois la configuration terminée, ces métriques sont présentées dans des dashboards prêts à l'emploi, dans l'interface Datadog. Vous pouvez également utiliser ces métriques pour compléter des dashboards Datadog existants.

![artifactory][2]

![xray][3]

## Configuration

### Prérequis

* Cluster Kubernetes
* JFrog Artifactory et/ou JFrog Xray installés via des [charts Helm JFrog][4]
* [Helm 3][5]
* Votre [clé d'API Datadog][6]

### Collecte de logs
1. Configuration Fluentd : utilisez le plug-in Fluentd de Datadog pour transmettre des logs directement depuis Fluentd vers votre compte Datadog.

    Configurez l'intégration Fluentd en spécifiant la clé d'API comme suit :

    Le paramètre _api_key_ correspond à la [clé d'API Datadog][6].

    L'attribut _dd_source_ est défini sur le nom de l'intégration de log dans vos logs. Il permet de déclencher la configuration automatique de l'intégration dans Datadog.

    Le paramètre _include_tag_key_ est défini par défaut sur false. Si vous le définissez sur true, cela ajoute le tag fluentd dans l'enregistrement JSON.

    Pour tirer pleinement parti de vos logs dans Datadog, vous devez ajouter des métadonnées pertinentes. Par défaut, les champs hostname et timestamp sont remappés.

    ```
    <match jfrog.**>
    @type datadog
    @id datadog_agent_artifactory
    api_key <api_key>
    include_tag_key true
    dd_source fluentd
    </match>
    ```

2. Activation de l'intégration

    Pour activer cette intégration, exécutez td-agent sur les pods `artifactory` :

    ``` 
    td-agent
    ```

    La clé d'API est configurée dans `td-agent`. Elle initie l'envoi de logs à Datadog. 

    Ajoutez tous les attributs en tant que facettes en accédant à **Facets** > **Add** (à gauche de l'écran dans Logs) > **Search**.

### Collecte de métriques

1. Activer les métriques pour Artifactory et Xray

    1. [Activez les métriques pour Artifactory.][7]
    2. [Créez des tokens d'accès administrateur pour Artifactory et Xray.][8]

2. Configuration Datadog

    Suivez les instructions ci-dessous pour configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section Environnement conteneurisé pour en savoir plus sur les environnements conteneurisés.

    Ces valeurs remplacent la configuration indiquée ci-dessous.
    ```text
    ARTIFACTORY_HOST_NAME_OR_IP   -> IP address or DNS of Artifactory 
    ARTIFACTORY_ADMIN_TOKEN       -> Admin token for Artifactory
    XRAY_ADMIN_TOKEN              -> Admin token for Xray
    ```
    #### Host
    Pour configurer ce check lorsque l'Agent est exécuté sur un host :

    1. Modifiez le fichier openmetrics.d/conf.yaml file à la racine du [répertoire de configuration de votre Agent][9] pour commencer à recueillir vos métriques Artifactory et Xray. Consultez le [fichier d'exemple openmetrics.d/conf.yaml][10] pour découvrir toutes les options de configuration disponibles.
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
    2. [Redémarrez l'Agent][11].

    #### Environnement conteneurisé
    Consultez la [documentation relative aux modèles d'intégration Autodiscovery][12] pour découvrir comment appliquer les paramètres ci-dessus à un environnement conteneurisé.

    #### Validation

    [Lancez la sous-commande status de l'Agent][13] et cherchez `openmetrics` dans la section Checks.

### Tile de la plate-forme JFrog

Si vous ne l'avez pas encore fait, installez le tile de la plateforme Jfrog.

### Dashboard JFrog Artifactory

Accédez à Dashboard > Dashboard List, recherchez `JFrog Artifactory Dashboard`, `Atifactory Metrics` ou `Xray Metrics`, et explorez le dashboard.

### Données collectées

#### Métriques

Consultez [metadata.csv][14] pour découvrir la liste complète des métriques fournies par ce check.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][15].

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/jfrog_platform/images/dashboard.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/jfrog_platform/images/artifactory_metrics_dashboard.png
[3]: 
[4]: https://github.com/jfrog/charts
[5]: https://helm.sh/
[6]: https://app.datadoghq.com/account/settings#api
[7]: https://github.com/jfrog/metrics#setup
[8]: https://www.jfrog.com/confluence/display/JFROG/Access+Tokens#AccessTokens-GeneratingAdminTokens
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[10]: https://github.com/DataDog/integrations-extras/blob/master/jfrog_platform/datadog_checks/jfrog_platform/data/conf.yaml.example
[11]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[12]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/?tab=kubernetes
[13]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[14]: https://github.com/DataDog/integrations-extras/blob/master/jfrog_platform/metadata.csv
[15]: https://docs.datadoghq.com/fr/help/