---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Aerospike Overview: assets/dashboards/overview.json
  logs:
    source: aerospike
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - autodiscovery
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/aerospike/README.md'
display_name: Aerospike
draft: false
git_integration_title: aerospike
guid: 582de9e7-0c99-4037-9cc5-bc34612ce039
integration_id: aerospike
integration_title: Aerospike
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: aerospike.
metric_to_check: aerospike.uptime
name: aerospike
public_title: Intégration Datadog/Aerospike
short_description: Recueillez des statistiques sur les clusters et les espaces de nommage à partir de la base de données Aerospike
support: core
supported_os:
  - linux
---
## Présentation

Recueillez des métriques de la base de données Aerospike en temps réel pour :

- Visualiser et surveiller les états d'Aerospike
- Être informé des failovers et des événements d'Aerospike

## Configuration

### Installation

Le check Aerospike est inclus avec le package de l'Agent Datadog.
Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

##### Collecte de métriques
Pour configurer ce check lorsque l'Agent est exécuté sur un host :

1. Modifiez le fichier `aerospike.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performances Aerospike. Consultez le [fichier d'exemple aerospike.d/conf.yaml][1] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][2].

##### Collecte de logs


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

    Modifiez la valeur du paramètre `path` et configurez-le pour votre environnement. Consultez le [fichier d'exemple aerospike.d/conf.yaml][1] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/aerospike/datadog_checks/aerospike/data/conf.yaml.example
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}


#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

| Paramètre            | Valeur                                |
| -------------------- | ------------------------------------ |
| `<NOM_INTÉGRATION>` | `aerospike`                          |
| `<CONFIG_INIT>`      | vide ou `{}`                        |
| `<CONFIG_INSTANCE>`  | `{"host":"%%host%%", "port":"3000"}` |

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Kubernetes][2].

| Paramètre      | Valeur                                               |
| -------------- | --------------------------------------------------- |
| `<CONFIG_LOG>` | `{"source": "aerospike", "service": "<NOM_SERVICE>"}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][1] et cherchez `aerospike` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "aerospike" >}}


### Checks de service

**aerospike.can_connect**
**aerospike.cluster_up**

### Événements

Aerospike n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][2].


[1]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[2]: https://docs.datadoghq.com/fr/help/