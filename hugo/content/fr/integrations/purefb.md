---
app_id: purefb
app_uuid: 50ae3c61-a87d-44ee-9917-df981184ff8a
assets:
  dashboards:
    purefb_overview: dashboards/purefb_overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: purefb.info
      metadata_path: metadata.csv
      prefix: purefb.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: PureFB
author:
  homepage: https://purestorage.com
  name: Pure Storage
  sales_email: sales@purestorage.com
  support_email: pure-observability@purestorage.com
categories:
- os system
- data store
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/purefb/README.md
display_on_public_website: true
draft: false
git_integration_title: purefb
integration_id: purefb
integration_title: Pure Storage FlashBlade
integration_version: 1.0.1
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: purefb
public_title: Pure Storage FlashBlade
short_description: Surveiller les performances et l'utilisation de stockages Pure Storage FlashBlade
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
  description: Surveiller les performances et l'utilisation de stockages Pure Storage FlashBlade
  media:
  - caption: Dashboard Pure Storage FlashBlade - Vue d'ensemble (haut)
    image_url: images/FB-overview-1.png
    media_type: image
  - caption: Dashboard Pure Storage FlashBlade - Vue d'ensemble (milieu)
    image_url: images/FB-overview-2.png
    media_type: image
  - caption: Dashboard Pure Storage FlashBlade - Vue d'ensemble (bas)
    image_url: images/FB-overview-3.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Pure Storage FlashBlade
---



## Présentation

Ce check surveille le service [Pure Storage FlashBlade][1] via l'[Agent Datadog][2] et l'[exportateur Pure Storage FlashBlade OpenMetrics][3].

Cette intégration vous permet d'obtenir des données sur les performances des baies, clients, partages et compartiments, ainsi que des informations générales sur la configuration et la capacité.

Vous pouvez surveiller plusieurs stockages FlashBlade et les agréger au sein d'un unique dashboard, ou encore les regrouper en fonction de l'environnement de votre choix.

**Cette intégration nécessite les éléments suivants** :

 - FlashBlade Purity 3.2.x+
 - La version 7.26.x+ de l'Agent Datadog, afin d'exploiter OpenMetricsBaseCheckV2
 - Python 3
 - L'exportateur Pure Storage FlashBlade OpenMetrics, installé et exécuté dans un environnement conteneurisé (voir le [référentiel Pure Storage GitHub][3] pour obtenir des instructions d'installation)

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][4] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

1. [Téléchargez et lancez l'Agent Datadog][2].
2. Installez manuellement l'intégration Pure Storage FlashBlade. Consultez la section [Utiliser les intégrations de la communauté][5] pour découvrir plus de détails en fonction de votre environnement.


#### Host

Pour configurer ce check pour un Agent en cours d'exécution sur un host, exécutez la commande `datadog-agent integration install -t datadog-purefb==1.0.0`.

### Configuration

1. Créez un utilisateur sur votre stockage FlashBlade avec un rôle en lecture seule, puis générez un token d'API pour cet utilisateur.

2. Ajoutez le bloc de configuration suivant au fichier `purefb.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance PureFB. Consultez le fichier d'exemple [purefb.d/conf.yaml][6] pour découvrir toutes les options de configuration disponibles.

**Remarque** : lors de la création de votre fichier de configuration, vous devez impérativement utiliser l'endpoint `/array`.

```yaml
init_config:
   timeout: 120

instances:

  - openmetrics_endpoint: http://<exporter_ip_or_fqdn>:<port>/metrics/array?endpoint=<array_ip_or_fqdn>
    tags:
       - env:<environnement>
       - fb_array_name:<fqdn_complet>
       - host:<fqdn_complet>
    headers:
       Authorization: Bearer <token_api>
    min_collection_interval: 120

  - openmetrics_endpoint: http://<ip_ou_fqdn_exportateur>:<port>/metrics/clients?endpoint=<ip_ou_fqdn_baie>
    tags:
       - env:<environnement>
       - fb_array_name:<fqdn_complet>
       - host:<fqdn_complet>
    headers:
       Authorization: Bearer <token_api>
    min_collection_interval: 600

  - openmetrics_endpoint: http://<ip_ou_fqdn_exportateur>:<port>/metrics/usage?endpoint=<ip_ou_fqdn_baie>
    tags:
       - env:<environnement>
       - fb_array_name:<fqdn_complet>
       - host:<fqdn_complet>
    headers:
       Authorization: Bearer <token_api>
    min_collection_interval: 600

```

2. [Redémarrez l'Agent][7].

### Validation

[Lancez la sous-commande status de l'Agent][8] et cherchez `purefb` dans la section Checks.

### Dépannage

#### Aucune baie dans les dashboards

Les dashboards fournis par cette intégration reposent sur les tags `env`, `host` et `fb_array_name`. Vérifiez que vous les avez définis au niveau des instances.

```yaml
 tags:
    - env:<environnement>
    - fb_array_name:<fqdn_complet>
    - host:<fqdn_complet>
```

#### Augmenter l'intervalle de collecte

Pour l'endpoint `/array`, le check Pure Storage FlashBlade définit par défaut `min_collection_interval` sur `120`. La valeur minimale recommandée est `15`. Vous pouvez augmenter ou diminuer `min_collection_interval` dans le fichier `purefb.d/conf.yaml` en fonction de vos besoins :

```yaml
min_collection_interval: 120
```

Pour les endpoints `/clients` et `/usage`, le check Pure Storage FlashBlade définit par défaut `min_collection_interval` sur `600`. La valeur minimale recommandée est `120`. Vous pouvez augmenter ou diminuer `min_collection_interval` dans le fichier `purefb.d/conf.yaml` en fonction de vos besoins :

```yaml
min_collection_interval: 600
```


## Données collectées

### Métriques
{{< get-metrics-from-git "purefb" >}}


### Événements

L'intégration PureFB n'inclut aucun événement.

### Checks de service

Consultez le fichier [service_checks.json][10] pour afficher la liste des checks de service fournis par cette intégration.

## Assistance

Pour obtenir de l'aide ou demander l'ajout d'une fonctionnalité, contactez Pure Storage à l'aide des informations suivantes :
* E-mail : pure-observability@purestorage.com
* Slack : [canal Pure Storage Code// Observability][11].

[1]: https://www.purestorage.com/products.html
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://github.com/PureStorage-OpenConnect/pure-fb-openmetrics-exporter
[4]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[5]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent
[6]: https://github.com/DataDog/integrations-extras/blob/master/purefb/data/conf.yaml.example
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-extras/blob/master/purefb/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/purefb/assets/service_checks.json
[11]: https://code-purestorage.slack.com/messages/C0357KLR1EU