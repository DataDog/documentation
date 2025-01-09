---
app_id: purefa
app_uuid: a2d8f393-62cd-4ece-bfab-e30797698b12
assets:
  dashboards:
    purefa_overview: dashboards/purefa_overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: purefa.info
      metadata_path: metadata.csv
      prefix: purefa.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: PureFA
author:
  homepage: https://purestorage.com
  name: Pure Storage
  sales_email: sales@purestorage.com
  support_email: pure-observability@purestorage.com
categories:
- os system
- data store
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/purefa/README.md
display_on_public_website: true
draft: false
git_integration_title: purefa
integration_id: purefa
integration_title: Pure Storage FlashArray
integration_version: 1.0.1
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: purefa
public_title: Pure Storage FlashArray
short_description: Surveiller les performances et l'utilisation des baies Pure Storage FlashArray
supported_os:
- linux
- mac os
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Mac OS
  - Supported OS::Windows
  - Category::OS System
  - Category::Data Store
  - Offering::Integration
  configuration: README.md#Setup
  description: Surveiller les performances et l'utilisation des baies Pure Storage FlashArray
  media:
  - caption: Dashboard Pure Storage FlashArray - Vue d'ensemble (haut)
    image_url: images/FA-overview-1.png
    media_type: image
  - caption: Dashboard Pure Storage FlashArray - Vue d'ensemble (milieu)
    image_url: images/FA-overview-2.png
    media_type: image
  - caption: Dashboard Pure Storage FlashArray - Vue d'ensemble (bas)
    image_url: images/FA-overview-3.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Pure Storage FlashArray
---



## Présentation

Ce check surveille le service [Pure Storage FlashArray][1] via l'[Agent Datadog][2] et l'[exportateur Prometheus Pure Storage][3].

Cette intégration vous permet d'obtenir des données sur les performances des baies, hosts, volumes et pods, ainsi que des informations générales sur la configuration et la capacité.

Vous pouvez surveiller plusieurs baies FlashArray et les agréger au sein d'un unique dashboard, ou encore les regrouper en fonction de l'environnement de votre choix.

**Cette intégration nécessite les éléments suivants** :

 - La version 7.26.x+ de l'Agent, afin d'exploiter OpenMetricsBaseCheckV2
 - Python 3
 - L'exportateur Prometheus Pure Storage, installé et exécuté dans un environnement conteneurisé (voir le [référentiel GitHub][3] pour obtenir des instructions d'installation)

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la documentation relative aux modèles d'intégration Autodiscovery pour découvrir comment appliquer ces instructions à des environnements conteneurisés.

### Installation

1. [Téléchargez et lancez l'Agent Datadog][2].
2. Installez manuellement l'intégration Pure Storage FlashArray. Consultez la section [Utiliser les intégrations de la communauté][4] pour découvrir plus de détails en fonction de votre environnement.


#### Host

Pour configurer ce check pour un Agent en cours d'exécution sur un host, exécutez la commande `datadog-agent integration install -t datadog-purefa==<VERSION_INTÉGRATION>`.

Remarque : la version de l'intégration est indiquée dans le [CHANGELOG.md][5] du référentiel Integration Extras Datadog.
  * Exemple : `datadog-agent integration install -t datadog-purefa==1.0.1`

### Configuration

1. Créez un utilisateur local sur votre baie FlashArray avec un rôle en lecture seule, puis générez un token d'API pour cet utilisateur.
   ![Générer une clé d'API][6] 
2. Ajoutez le bloc de configuration suivant au fichier `purefa.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance PureFA. Consultez le fichier d'exemple [purefa.d/conf.yaml][7] pour découvrir toutes les options de configuration disponibles.

**Remarque** : lors de la création de votre fichier de configuration, vous devez impérativement utiliser l'endpoint `/array`.

```yaml
init_config:
   timeout: 60

instances:

  - openmetrics_endpoint: http://<ip_ou_fqdn_exportateur>:<port>/metrics/flasharray/array?endpoint=<ip_ou_fqdn_baie>
    tags:
       - env:<environnement>
       - fa_array_name:<fqdn_complet>
       - host:<fqdn_complet>
    headers:
       Authorization: Bearer <token_api>
    min_collection_interval: 120

  - openmetrics_endpoint: http://<ip_ou_fqdn_exportateur>:<port>/metrics/flasharray/volumes?endpoint=<ip_ou_fqdn_baie>
    tags:
       - env:<environnement>
       - fa_array_name:<fqdn_complet>
    headers:
       Authorization: Bearer <token_api>
    min_collection_interval: 120

  - openmetrics_endpoint: http://<ip_ou_fqdn_exportateur>:<port>/metrics/flasharray/hosts?endpoint=<ip_ou_fqdn_baie>
    tags:
       - env:<environnement>
       - fa_array_name:<fqdn_complet>
    headers:
       Authorization: Bearer <token_api>
    min_collection_interval: 120

  - openmetrics_endpoint: http://<ip_ou_fqdn_exportateur>:<port>/metrics/flasharray/pods?endpoint=<ip_ou_fqdn_baie>
    tags:
       - env:<environnement>
       - fa_array_name:<fqdn_complet>
       - host:<fqdn_complet>
    headers:
       Authorization: Bearer <token_api>
    min_collection_interval: 120
```

2. [Redémarrez l'Agent][8].

### Validation

[Lancez la sous-commande status de l'Agent][9] et cherchez `purefa` dans la section Checks.

### Dépannage

#### Aucune baie dans les dashboards

Les dashboards fournis par cette intégration reposent sur les tags `env` et `fa_array_name`. Vérifiez que vous les avez définis au niveau des instances. Vous devez également définir `host` pour les endpoints `/array` et `/pods` dans `purefa.d/conf.yaml`.

```yaml
- tags:
   - env:<environnement>
   - fa_array_name:<fqdn_complet>
   - host:<fqdn_complet>
```

#### Augmenter l'intervalle de collecte

Le check Pure Storage FlashArray définit par défaut `min_collection_interval` sur `120`. La valeur minimale recommandée est `20`. Vous pouvez augmenter ou diminuer `min_collection_interval` dans le fichier `purefa.d/conf.yaml` en fonction de vos besoins :

```yaml
min_collection_interval: 120
```


## Données collectées

### Métriques
{{< get-metrics-from-git "purefa" >}}


### Événements

L'intégration PureFA n'inclut aucun événement.

### Checks de service

Consultez le fichier [service_checks.json][11] pour parcourir la liste des checks de service fournis par cette intégration.

## Assistance

Pour obtenir de l'aide ou demander l'ajout d'une fonctionnalité, contactez Pure Storage à l'aide des informations suivantes :
* E-mail : pure-observability@purestorage.com
* Slack : [canal Pure Storage Code// Observability][12].

[1]: https://www.purestorage.com/products.html
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://github.com/PureStorage-OpenConnect/pure-exporter
[4]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent
[5]: https://github.com/DataDog/integrations-extras/blob/master/purefa/CHANGELOG.md
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/purefa/images/API.png
[7]: https://github.com/datadog/integrations-extras/blob/master/purefa/datadog_checks/purefa/data/conf.yaml.example
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-extras/blob/master/purefa/metadata.csv
[11]: https://github.com/DataDog/integrations-extras/blob/master/purefa/assets/service_checks.json
[12]: https://code-purestorage.slack.com/messages/C0357KLR1EU