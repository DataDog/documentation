---
categories:
- os & system
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/btrfs/
git_integration_title: btrfs
guid: 54f9329a-8270-4f5a-bd4b-cd169abfc791
has_logo: true
integration_title: Btrfs
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.1
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: btrfs
public_title: Intégration Datadog-Btrfs
short_description: Surveiller l'utilisation des volumes Btrfs pour pouvoir intervenir avant leur remplissage.
  up.
support: core
supported_os:
- linux
- mac_os
version: 1.1.0
---


{{< img src="integrations/btrfs/btrfs_metric.png" alt="btrfs metric" responsive="true" >}}
## Aperçu

Obtenir les métriques du service btrfs en temps réel pour:

* Visualiser et surveiller les états de Btrfs
* Être informé des failovers et des événements Btrfs.

## Implémentation
### Installation

Le check Btrfs est packagé avec l'agent, il vous faut donc simplement [installer l'agent] (https://app.datadoghq.com/account/settings#agent) sur chaque serveurs qui possède un filesystem Btrfs.

### Configuration

1. Configurez l'agent en fonction de vos besoins, éditez `conf.d/btrfs.yaml`. Consultez l'exemple [btrfs.yaml](https://github.com/DataDog/integrations-core/blob/master/btrfs/conf.yaml.example) pour apprendre toutes les options de configuration disponibles.
2. [Redémarrez votre Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#start-stop-restart-the-agent)

### Validation

[Lancez la commande `status`de l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information) et cherchez `btrfs` dans la section Checks:

```
  Checks
  ======
    [...]

    btrfs
    -------
      - instance #0 [OK]
      - Collected 26 metrics, 0 events & 1 service check

    [...]
```

## Compatibilité

Le check Btrfs est compatible avec toutes les principales plateformes.

## Données collectées
### Métriques
{{< get-metrics-from-git "btrfs" >}}


### Evénements
Le check Btrfs n'inclut aucun événement pour le moment.

### Checks de Service
Le check Btrfs n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus

Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)

