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
  - 'https://github.com/DataDog/integrations-core/blob/master/systemd/README.md'
display_name: Systemd
draft: false
git_integration_title: systemd
guid: acd470e7-5413-4deb-95fc-4b034d904691
integration_id: systemd
integration_title: Systemd
is_public: true
kind: integration
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

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

Le check Systemd est inclus avec le paquet de l'[Agent Datadog][1]. Vous n'avez donc rien d'autre à installer sur votre serveur.

[1]: https://app.datadoghq.com/account/settings#agent
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

### Configuration

1. Modifiez le fichier `systemd.d/conf.yaml` dans le dossier `conf.d/` à la racine du
   répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Systemd.
   Consultez le [fichier d'exemple systemd.d/conf.yaml][1] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][2].

[1]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/systemd.d/conf.yaml.example
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-restart-the-agent
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][2] et cherchez `systemd` dans la section Checks.

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

### Checks de service

**systemd.can_connect** :<br>
Renvoie `OK` si Systemd est accessible. Si ce n'est pas le cas, renvoie `CRITICAL`.

**systemd.system.state** :<br>
Renvoie `OK` l'état du système est running, renvoie `CRITICAL` si l'état est degraded, maintenance ou stopping, ou renvoie `UNKNOWN` pour un état initializing, starting ou autre.

**systemd.unit.state** :<br>
Renvoie `OK` si l'état actif de l'unité est active, renvoie `CRITICAL` si l'état est inactive, deactivating ou failed, ou renvoie `UNKNOWN` pour un état activating ou autre.

### Événements

Le check Systemd n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].


[1]: https://www.freedesktop.org/wiki/Software/systemd/
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/fr/help/