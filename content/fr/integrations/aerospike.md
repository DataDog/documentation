---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Aerospike Overview: assets/dashboards/overview.json
  logs: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/aerospike/README.md'
display_name: Aerospike
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
  - mac_os
---
## Présentation

Recueillez des métriques de la base de données Aerospike en temps réel pour :

- Visualiser et surveiller les états d'Aerospike
- Être informé des failovers et des événements d'Aerospike

## Configuration

### Installation

Le check Aerospike est inclus avec le paquet de l'Agent Datadog.
Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

1. Modifiez le fichier `aerospike.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performances Aerospike. Consultez le [fichier d'exemple aerospike.d/conf.yaml][1] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/aerospike/datadog_checks/aerospike/data/conf.yaml.example
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

| Paramètre            | Valeur                                |
| -------------------- | ------------------------------------ |
| `<NOM_INTÉGRATION>` | `aerospike`                          |
| `<CONFIG_INIT>`      | vide ou `{}`                        |
| `<CONFIG_INSTANCE>`  | `{"host":"%%host%%", "port":"3000"}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][1] et cherchez `aerospike` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "aerospike" >}}


### Checks de service

- `aerospike.can_connect`
- `aerospike.cluster_up`

### Événements

Aerospike n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][2].


[1]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[2]: https://docs.datadoghq.com/fr/help/