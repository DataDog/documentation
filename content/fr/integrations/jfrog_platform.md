---
"assets":
  "dashboards":
    "Jfrog Artifactory Dashboard": assets/dashboards/jfrog_artifactory_dashboard.json
  "monitors": {}
  "saved_views": {}
  "service_checks": assets/service_checks.json
"categories":
- log collection
- security
"creates_events": !!bool "false"
"ddtype": "check"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/jfrog_platform/README.md"
"display_name": "Plateforme JFrog"
"git_integration_title": "jfrog_platform"
"guid": "2c70552e-b77a-4349-9955-8799b9b57d56"
"integration_id": "jfrog-platform"
"integration_title": "Intégration de JFrog Artifactory et Xray à Datadog"
"is_public": !!bool "true"
"kind": "integration"
"maintainer": "integrations@jfrog.com"
"manifest_version": "1.0.0"
"metric_prefix": "jfrog."
"metric_to_check": ""
"name": "jfrog_platform"
"public_title": "Intégration de JFrog Artifactory et JFrog Xray à Datadog"
"short_description": "Visualisez et analysez vos événements Artifactory et Xray."
"support": "contrib"
"supported_os":
- linux
- mac_os
- windows
---



## Présentation
La section suivante décrit les étapes à suivre pour configurer Datadog de façon à recueillir des métriques à partir de JFrog Artifactory et JFrog Xray.

### En quoi consistent JFrog Artifactory et JFrog Xray ?
JFrog Enterprise avec Xray comporte Artifactory Enterprise et Xray. Ces deux outils permettent aux équipes DevOps d'améliorer leur productivité afin d'accélérer leurs processus et de fournir des versions de logiciels fiables de haute qualité. Xray se base sur VulnDB, la base de données la plus complète du secteur, pour détecter les risques de sécurité open source connus et analyser la conformité.

Artifactory prend en charge plusieurs artefacts, métadonnées et packages de build. Il permet aux équipes DevOps de choisir librement entre des packages de build, tels que Bower, Chef, CocoaPods, Conan, Conda, CRAN, Debian, Docker, Golang, Gradle, Git LFS, Helm, Ivy, Maven, npm, NuGet, Opkg, P2, PHP Composer, Puppet, PyPI, RPM, RubyGems, SBT, Vagrant & VCS, les plateformes CI/CD et les outils DevOps.

Artifactory Enterprise prend en charge la réplication multi-région, multi-cloud et hybride pour des équipes géographiquement dispersées. Vous avez ainsi la possibilité d'effectuer une réplication entre un référentiel source et plusieurs cibles simultanément et pouvez profiter de fonctionnalités de sécurité, telles que le filtrage IP, CNAME et le chiffrement de données au repos.

Artifactory prend en charge Kubernetes pour les microservices et les applications conteneurisées. Gérez vos déploiements et obtenez des détails sur les dépendances en utilisant Artifactory en tant que registre Kubernetes. JFrog Xray garantit la sécurité des conteneurs en analysant de manière récursive l'ensemble des couches, ce qui permet de s'assurer que chaque artefact et dépendance inclus dans votre image Docker ont été analysés de façon à détecter les risques connus. Enterprise répond aux besoins du modèle de votre entreprise grâce à une prise en charge d'environnements hybrides, cloud et multi-cloud.

### Dashboard Datadog JFrog Artifactory

L'intégration Datadog de JFrog Artifactory vous permet d'envoyer des logs Artifactory au flux de logs dans Datadog. Vous pouvez l'utiliser pour améliorer vos dashboards existants ou pour mieux comprendre les statistiques d'utilisation d'Artifactory.

![dashboard][1]

## Configuration

### Prérequis

* Cluster Kubernetes
* JFrog Artifactory et/ou JFrog Xray installés via des [charts Helm JFrog][2]
* [Helm 3][3]

### Logs

La configuration de Datadog peut être effectuée en créant un compte dans Datadog et en passant par les étapes de mise en service suivantes, ou en utilisant directement la clé d'API.

* Exécutez l'Agent Datadog dans votre cluster Kubernetes en le déployant avec un chart Helm.
* Pour activer la collecte de logs, mettez à jour le fichier `datadog-values.yaml` fourni lors des étapes de mise en service.
* Dès que l'Agent commence à envoyer des données, vous recevez une clé d'API à utiliser pour envoyer des logs mis en forme via FluentD.

Une fois Datadog configuré, nous pouvons accéder aux logs dans l'interface sous **Logs** > **Search**. Sélectionnez la source spécifique à utiliser pour récupérer les logs.

Si vous disposez d'une clé d'API, utilisez le plug-in Datadog FluentD pour transmettre les logs directement depuis FluentD vers compte Datadog. 
Pour tirer pleinement profit de vos logs dans Datadog, il est essentiel d'ajouter les métadonnées appropriées. Par défaut, les champs hostname et timestamp sont remappés.

### Configuration de FluentD

L'intégration est effectuée en spécifiant la clé d'API.

_api_key_ correspond à la clé d'API de Datadog.

L'attribut _dd_source_ est défini sur le nom de l'intégration de log dans vos logs. Il permet de déclencher la configuration automatique de l'intégration dans Datadog.

Le paramètre _include_tag_key_ est défini par défaut sur false. Si vous le définissez sur true, cela ajoute le tag fluentd dans l'enregistrement JSON.

```
<match jfrog.**>
  @type datadog
  @id datadog_agent_artifactory
  api_key <clé_api>
  include_tag_key true
  dd_source fluentd
</match>
```

## Démonstration Datadog

Pour activer cette intégration, exécutez td-agent sur les pods `artifactory` et `xray`.

``` 
td-agent
```

La clé d'API est configurée dans `td-agent`. Elle initie l'envoi de logs à Datadog. 

Ajoutez tous les attributs en tant que facettes en accédant à **Facets** > **Add** (à gauche de l'écran dans Logs) > **Search**.

Pour accéder à des visualisations et filtres existants, cliquez sur Dashboards et ajoutez un nouveau screenboard. Importez ensuite le fichier [export.json][4] et remplacez le dashboard existant.

## Génération de données à des fins de tests
Le [framework de test d'intégration pour les partenaires][5] peut être utilisé pour générer des données pour les métriques.


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/jfrog_platform/images/dashboard.png
[2]: https://github.com/jfrog/charts
[3]: https://helm.sh/
[4]: https://github.com/jfrog/log-analytics/blob/master/datadog/export.json
[5]: https://github.com/jfrog/partner-integration-tests

