---
categories:
- os & system
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/disk/
git_integration_title: disk
guid: 94588b23-111e-4ed2-a2af-fd6e4caeea04
has_logo: true
integration_title: Disk
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
name: disk
public_title: Intégration Datadog-Disk
short_description: La check disk rassemble les métriques sur les disques montés.
support: core
supported_os:
- linux
- mac_os
- windows
---



## Aperçu

Collectez les métriques relatives à l'utilisation du disque et aux IOs.

## Implémentation
### Installation

Le check disk est packagé avec l'agent, il vous faut donc simplement [installer l'agent](https://app.datadoghq.com/account/settings#agent) sur vos noeuds Cassandra.

### Configuration

La check disk est activée par défaut et l'agent collecte des métriques pour toutes les partitions locales. Si vous voulez configurer le check avec des options personnalisées, créez un fichier `disk.yaml` dans le répertoire` conf.d` de l'Agent. Consultez le fichier [canevas disk.yaml](https://github.com/DataDog/integrations-core/blob/master/disk/datadog_checks/disk/data/conf.yaml.default) pour apprendre toutes les options de configuration disponibles.

### Validation

[Lancez la commande `status`de l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information) et cherchez `disk` dans la section Checks:

```
  Checks
  ======
    [...]

    disk
    -------
      - instance #0 [OK]
      - Collected 40 metrics, 0 events & 0 service checks

    [...]
```

## Données collectées
### Métriques
{{< get-metrics-from-git "disk" >}}


### Evénements
Le check Disk n'inclut aucun événement pour le moment.

### Checks de Service
Le check Disk n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)

