---
"assets":
  "dashboards":
    "Jfrog Artifactory Dashboard": assets/dashboards/jfrog_artifactory_dashboard.json
  "metrics_metadata": metadata.csv
  "monitors": {}
  "saved_views": {}
  "service_checks": assets/service_checks.json
"categories":
- log collection
- security
"creates_events": false
"ddtype": "crawler"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/jfrog_platform/README.md"
"display_name": "Plateforme JFrog"
"draft": false
"git_integration_title": "jfrog_platform"
"guid": "2c70552e-b77a-4349-9955-8799b9b57d56"
"integration_id": "jfrog-platform"
"integration_title": "JFrog Artifactory"
"is_public": true
"kind": "integration"
"maintainer": "integrations@jfrog.com"
"manifest_version": "1.0.0"
"metric_prefix": "jfrog."
"metric_to_check": ""
"name": "jfrog_platform"
"public_title": "JFrog Artifactory"
"short_description": "Visualisez et analysez vos événements Artifactory."
"support": "contrib"
"supported_os":
- linux
- mac_os
- windows
---



## Présentation
La section suivante décrit les étapes à suivre pour configurer Datadog de façon à recueillir des métriques à partir de JFrog Artifactory et JFrog Xray.

### En quoi consiste JFrog Artifactory ?
JFrog Enterprise avec Xray comporte Artifactory Enterprise et Xray. Ces deux outils permettent aux équipes DevOps d'améliorer leur productivité afin d'accélérer leurs processus et de fournir des versions de logiciels fiables de haute qualité. Xray se base sur VulnDB, la base de données la plus complète du secteur, pour détecter les risques de sécurité open source connus et analyser la conformité.

Artifactory prend en charge plusieurs artefacts, métadonnées et packages de build. Il permet aux équipes DevOps de choisir librement entre des packages de build, tels que Bower, Chef, CocoaPods, Conan, Conda, CRAN, Debian, Docker, Golang, Gradle, Git LFS, Helm, Ivy, Maven, npm, NuGet, Opkg, P2, PHP Composer, Puppet, PyPI, RPM, RubyGems, SBT, Vagrant & VCS, les plateformes CI/CD et les outils DevOps.

Artifactory Enterprise prend en charge la réplication multi-région, multi-cloud et hybride pour des équipes géographiquement dispersées. Vous avez ainsi la possibilité d'effectuer une réplication entre un référentiel source et plusieurs cibles simultanément et pouvez profiter de fonctionnalités de sécurité, telles que le filtrage IP, CNAME et le chiffrement de données au repos.

Artifactory prend en charge Kubernetes pour les microservices et les applications conteneurisées. Gérez vos déploiements et obtenez des détails sur les dépendances en utilisant Artifactory en tant que registre Kubernetes. JFrog Xray garantit la sécurité des conteneurs en analysant de manière récursive l'ensemble des couches, ce qui permet de s'assurer que chaque artefact et dépendance inclus dans votre image Docker ont été analysés de façon à détecter les risques connus. Enterprise répond aux besoins du modèle de votre entreprise grâce à une prise en charge d'environnements hybrides, cloud et multi-cloud.

### Dashboard Datadog JFrog Artifactory

L'intégration Datadog de JFrog Artifactory vous permet d'envoyer des logs Artifactory au flux de logs Datadog. Vous pouvez l'utiliser pour améliorer vos dashboards existants ou mieux comprendre les statistiques d'utilisation d'Artifactory.

![dashboard][1]

## Configuration

### Prérequis

* Cluster Kubernetes
* JFrog Artifactory et/ou JFrog Xray installés via des [charts Helm JFrog][2]
* [Helm 3][3]
* Votre [clé d'API Datadog][4].

### 1re étape : configuration de Fluentd
Grâce au plug-in Fluentd de Datadog, vous pouvez transmettre des logs directement depuis Fluentd vers votre compte Datadog.

Configurez l'intégration Fluentd en spécifiant la clé d'API comme suit :

Le paramètre _api_key_ correspond à la [clé d'API Datadog][4].

L'attribut _dd_source_ est défini sur le nom de l'intégration de log dans vos logs. Il permet de déclencher la configuration automatique de l'intégration dans Datadog.

Le paramètre _include_tag_key_ est défini par défaut sur false. Si vous le définissez sur true, cela ajoute le tag fluentd dans l'enregistrement JSON.

Pour tirer pleinement parti de vos logs dans Datadog, vous devez ajouter des métadonnées pertinentes. Par défaut, les champs hostname et timestamp sont remappés.

```
<match jfrog.**>
  @type datadog
  @id datadog_agent_artifactory
  api_key <clé_api>
  include_tag_key true
  dd_source fluentd
</match>
```

### 2e étape : activation de l'intégration

Pour activer cette intégration, exécutez td-agent sur les pods `artifactory` :

``` 
td-agent
```

La clé d'API est configurée dans `td-agent`. Elle initie l'envoi de logs à Datadog. 

Ajoutez tous les attributs en tant que facettes en accédant à **Facets** > **Add** (à gauche de l'écran dans Logs) > **Search**.

### 3e étape : tile de la plateforme Jfrog
Si vous ne l'avez pas encore fait, installez le tile de la plateforme Jfrog.

### 4e étape : dashboard Jfrog Artifactory
Accédez à Dashboard > Dashboard List, recherchez l'option `JFrog Artifactory Dashboard`, puis cliquez dessus.

### 5e étape : recherche de logs
Accédez à vos [logs][5] dans Datadog. Sélectionnez la source spécifique indiquée dans la configuration Fluentd (`fluentd` dans l'exemple de configuration ci-dessus) pour récupérer vos logs.


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/jfrog_platform/images/dashboard.png
[2]: https://github.com/jfrog/charts
[3]: https://helm.sh/
[4]: https://app.datadoghq.com/account/settings#api
[5]: https://app.datadoghq.com/logs

