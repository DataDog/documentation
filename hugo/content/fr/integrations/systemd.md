---
assets:
  dashboards:
    Systemd Overview: assets/dashboards/overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- os & system
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/systemd/README.md
display_name: Systemd
draft: false
git_integration_title: systemd
guid: acd470e7-5413-4deb-95fc-4b034d904691
integration_id: systemd
integration_title: Systemd
integration_version: ''
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: systemd.
metric_to_check: systemd.units_by_state
name: systemd
public_title: Intégration Datadog/Systemd
short_description: Obtenir des métriques sur Systemd et sur les unités qu'il gère
support: core
supported_os:
- linux
---



## Présentation

Ce check permet de surveiller [Systemd][1] ainsi que les unités qu'il gère avec l'Agent Datadog.

- Surveillez l'état et la santé de votre Systemd.
- Surveillez les unités, les services et les sockets gérés par Systemd.

## Configuration

### Installation

Le check Systemd est inclus avec le package de l'[Agent Datadog][2]. Vous n'avez donc rien à installer sur votre serveur.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

1. Modifiez le fichier `systemd.d/conf.yaml` dans le dossier `conf.d/` à la racine du
   répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Systemd.
   Consultez le [fichier d'exemple systemd.d/conf.yaml][1] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][2].

[1]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/systemd.d/conf.yaml.example
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Pour les environnements conteneurisés, montez le dossier `/run/systemd/`, qui contient le socket `/run/systemd/private` nécessaire pour récupérer les données Systemd. Exemple :

```bash
docker run -d -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup/:ro \
              -v /run/systemd/:/host/run/systemd/:ro \
              -e DD_API_KEY=<VOTRE_CLÉ_API> \
              datadog/agent:latest
```

{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][3] et cherchez `systemd` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "systemd" >}}


Certaines métriques sont uniquement transmises si leur configuration respective est activée :

- `systemd.service.cpu_time_consumed` nécessite l'activation de la configuration `CPUAccounting` de Systemd.
- `systemd.service.memory_usage` nécessite l'activation de la configuration `MemoryAccounting` de Systemd.
- `systemd.service.task_count` nécessite l'activation de la configuration `TasksAccounting` de Systemd.

Certaines métriques ne sont disponibles qu'à partir d'une version spécifique de Systemd :

- `systemd.service.cpu_time_consumed` nécessite l'installation de Systemd v220.
- `systemd.service.restart_count` nécessite l'installation de Systemd v235.
- `systemd.socket.connection_refused_count` nécessite l'installation de Systemd v239.

### Événements

Le check Systemd n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "systemd" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].



[1]: https://www.freedesktop.org/wiki/Software/systemd/
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/fr/help/