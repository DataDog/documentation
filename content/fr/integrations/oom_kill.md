---
assets:
  dashboards: {}
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

Ce check permet de surveiller les éliminations de processus OOM (Out of Memory) du noyau par l'intermédiaire de l'Agent Datadog et du system probe.

## Configuration

### Installation

Le check OOM Kill est inclus avec le package de l'[Agent Datadog][1]. Il repose sur un programme eBPF intégré au system probe.

Le programme eBPF utilisé par le system probe est compilé au runtime. Vous devez avoir accès aux en-têtes de noyau appropriés.

Sur les distributions dérivées de Debian, installez les en-têtes de noyau à l'aide de la commande suivante :
```sh
apt install -y linux-headers-$(uname -r)
```

Sur les distributions dérivées de RHEL, installez les en-têtes de noyau à l'aide de la commande suivante :
```sh
yum install -y kernel-headers-$(uname -r)
```

### Configuration

1. Assurez-vous que le fichier `oom_kill.d/conf.yaml` se trouve dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir des métriques OOM Kill.

2. Vérifiez que la configuration suivante est définie dans `system_probe.yaml` :

```yaml
system_probe_config:
    enabled: true
    enable_oom_kill: true
```

3. [Redémarrez l'Agent][2].

### Configuration avec Helm

À l'aide du [chart Helm Datadog][3], vérifiez que les paramètres `datadog.systemProbe` et `datadog.systemProbe.enableOOMKill` sont activés dans le fichier `values.yaml`.

### Validation

[Lancez la sous-commande status de l'Agent][4] et cherchez `oom_kill` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "oom_kill" >}}


### Checks de service

Le check OOM Kill n'inclut aucun check de service.

### Événements

Le check OOM Kill envoie un événement pour chaque élimination OOM. Celui-ci inclut l'ID et le nom du processus éliminé, ainsi que l'ID et le nom du processus à l'origine du déclenchement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].

[1]: https://docs.datadoghq.com/fr/agent/guide/
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://github.com/helm/charts/tree/master/stable/datadog
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[5]: https://github.com/DataDog/integrations-core/blob/master/oom_kill/metadata.csv
[6]: https://docs.datadoghq.com/fr/help/