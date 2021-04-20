---
assets:
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - os & system
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/oom_kill/README.md'
display_name: "OOM\_Kill"
draft: false
git_integration_title: oom_kill
guid: 4b8e9c18-1a13-43b0-a03c-186eb3221147
integration_id: oom-kill
integration_title: "OOM\_Kill"
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: oom_kill.
metric_to_check: oom_kill.oom_process.count
name: oom_kill
public_title: "Intégration Datadog/OOM\_Kill"
short_description: Surveillez les éliminations de processus OOM (Out of Memory) effectuées par le système ou un cgroup.
support: core
supported_os:
  - linux
---
## Présentation

Ce check permet de surveiller les processus tués par le mécanisme OOM Killer (Out of Memory Killer) du kernel par l'intermédiaire de l'Agent Datadog et du system probe.

## Configuration

### Installation

Le check OOM Kill est inclus avec le package de l'[Agent Datadog][1]. Il repose sur un programme eBPF intégré au system probe.

Le programme eBPF utilisé par le system probe est compilé au runtime. Vous devez avoir accès aux en-têtes de kernel appropriés.

Sur les distributions dérivées de Debian, installez les en-têtes de kernel à l'aide de la commande suivante :
```sh
apt install -y linux-headers-$(uname -r)
```

Sur les distributions dérivées de RHEL, installez les en-têtes de kernel à l'aide de la commande suivante :
```sh
yum install -y kernel-headers-$(uname -r)
yum install -y kernel-devel-$(uname -r)
```

**Remarque** : seules les versions 8 et ultérieures de CentOS/RHEL sont prises en charge.

### Configuration

1. Dans le fichier `system-probe.yaml` situé à la racine du répertoire de configuration de votre Agent, ajoutez la configuration suivante :

    ```yaml
    system_probe_config:
        enable_oom_kill: true
    ```

2. Vérifiez que le fichier `oom_kill.d/conf.yaml` figure bien dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos métriques OOM Kill. Consultez le [fichier d'exemple oom_kill.d/conf.yaml][2] découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][3].

### Configuration avec Helm

À l'aide du [chart Helm Datadog][4], vérifiez que les paramètres `datadog.systemProbe` et `datadog.systemProbe.enableOOMKill` sont activés dans le fichier `values.yaml`.

### Validation

[Lancez la sous-commande status de l'Agent][5] et cherchez `oom_kill` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "oom_kill" >}}


### Checks de service

Le check OOM Kill n'inclut aucun check de service.

### Événements

Le check OOM Kill envoie un événement pour chaque OOM Kill. Celui-ci inclut l'ID et le nom du processus éliminé, ainsi que l'ID et le nom du processus à l'origine du déclenchement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][7].

[1]: https://docs.datadoghq.com/fr/agent/guide/
[2]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/oom_kill.d/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://github.com/helm/charts/tree/master/stable/datadog
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/oom_kill/metadata.csv
[7]: https://docs.datadoghq.com/fr/help/