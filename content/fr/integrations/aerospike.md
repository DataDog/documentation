---
app_id: aerospike
app_uuid: 68799442-b764-489c-8bbd-44cb11a15f4e
assets:
  dashboards:
    Aerospike Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - aerospike.uptime
      - aerospike.namespace.memory_free_pct
      metadata_path: metadata.csv
      prefix: aerospike.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10067
    source_type_name: Aerospike
  logs:
    source: aerospike
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- data stores
- log collection
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/aerospike/README.md
display_on_public_website: true
draft: false
git_integration_title: aerospike
integration_id: aerospike
integration_title: Aerospike
integration_version: 2.2.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: aerospike
public_title: Aerospike
short_description: Recueillez des statistiques sur les clusters et les espaces de
  nommage à partir de la base de données Aerospike
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Category::Data Stores
  - Category::Log Collection
  configuration: README.md#Setup
  description: Recueillez des statistiques sur les clusters et les espaces de nommage
    à partir de la base de données Aerospike
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Aerospike
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Présentation

Recueillez des métriques de la base de données Aerospike en temps réel pour :

- Visualiser et surveiller les états d'Aerospike
- Être informé des failovers et des événements d'Aerospike

## Formule et utilisation

REMARQUE : l'intégration Aerospike actuelle est uniquement compatible avec le serveur Aerospike 4.9 ou ultérieur. Pour en savoir plus, consultez les [notes de version sur la bibliothèque client Python][1] (en anglais). Si vous utilisez une version antérieure du serveur Aerospike, il est tout de même possible de la surveiller avec l'Agent v7.29.0 ou une version antérieure.

### Installation

Le check Aerospike est inclus avec le package de l'[Agent Datadog][2]. Vous n'avez donc rien d'autre à installer sur votre serveur.

### Dépannage de la solution Browser

{{< tabs >}}
{{% tab "Host" %}}

#### SLO basés sur des métriques

##### Collecte de métriques
Pour configurer ce check lorsque l'Agent est exécuté sur un host :

1. Installez et configurez l'[exportateur Aerospike Prometheus][1]. Référez-vous à la [documentation Aerospike][2] (en anglais) pour en savoir plus.

2. Modifiez le fichier `aerospike.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Aerospike. Consultez le [fichier d'exemple aerospike.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][4].

**Remarque** : les versions 1.16.0+ de ce check utilisent [OpenMetrics][5] pour la collecte de métriques, ce qui nécessite Python 3. Pour les hosts ne pouvant pas utiliser Python 3, ou si vous souhaitez utiliser une ancienne version de ce check, consultez [cet exemple de configuration][6].

##### APM


1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Ajoutez ce bloc de configuration à votre fichier `aerospike.d/conf.yaml` pour commencer à recueillir vos logs Aerospike :

   ```yaml
   logs:
     - type: file
       path: /var/log/aerospike/aerospike.log
       source: aerospike
   ```

    Modifiez la valeur du paramètre `path` et configurez-le pour votre environnement. Consultez le [fichier d'exemple aerospike.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][4].

[1]: https://github.com/aerospike/aerospike-prometheus-exporter
[2]: https://docs.aerospike.com/monitorstack/new/installing-components
[3]: https://github.com/DataDog/integrations-core/blob/master/aerospike/datadog_checks/aerospike/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/fr/integrations/openmetrics/
[6]: https://github.com/DataDog/integrations-core/blob/7.36.x/aerospike/datadog_checks/aerospike/data/conf.yaml.example
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}


#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

| Paramètre            | Valeur                                |
| -------------------- | ------------------------------------ |
| `<NOM_INTÉGRATION>` | `aerospike`                          |
| `<CONFIG_INIT>`      | vide ou `{}`                        |
| `<CONFIG_INSTANCE>`  | `{"openmetrics_endpoint": "http://%%host%%:9145/metrics"}` |

##### APM

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs Kubernetes][2].

| Paramètre      | Valeur                                               |
| -------------- | --------------------------------------------------- |
| `<CONFIG_LOG>` | `{"source": "aerospike", "service": "<NOM_SERVICE>"}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][3] et cherchez `aerospike` dans la section Checks.

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "aerospike" >}}


### Aide

**aerospike.can_connect**
**aerospike.cluster_up**

### Aide

Aerospike n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].


[1]: https://download.aerospike.com/download/client/python/notes.html#5.0.0
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/fr/help/