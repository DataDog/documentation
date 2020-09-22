---
assets:
  dashboards: {}
  logs: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - network
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/tcp_queue_length/README.md'
display_name: Longueur de file d'attente TCP
git_integration_title: tcp_queue_length
guid: 0468b098-43bd-4157-8a01-14065cfdcb7b
integration_id: tcp-queue-length
integration_title: Longueur de file d'attente TCP
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: tcp_queue.
metric_to_check: tcp_queue.rqueue.size
name: tcp_queue_length
public_title: Intégration Datadog/Longueur de file d'attente TCP
short_description: Suivez la taille de vos buffers TCP avec Datadog.
support: core
supported_os:
  - linux
---
## Présentation

Ce check surveille la taille des files d'attente de réception et d'envoi TCP Linux.

## Configuration

### Installation

`tcp_queue_length` est un check de base de l'Agent 6/7 qui fait appel à un programme eBPF implémenté dans `system-probe`.

Le programme eBPF utilisé par `system-probe` est compilé au runtime. Vous devez avoir accès aux en-têtes de kernel appropriés.

Sur les distributions dérivées de Debian, installez les en-têtes de kernel à l'aide de la commande suivante :
```sh
apt install -y linux-headers-$(uname -r)
```

Sur les distributions dérivées de RHEL, installez les en-têtes de kernel à l'aide de la commande suivante :
```sh
yum install -y kernel-headers-$(uname -r)
```

### Configuration

Pour activer l'intégration `tcp_queue_length`, l'option de configuration doit être activée à la fois au niveau de `system-probe` et de l'Agent principal.

Dans le fichier de configuration `system-probe.yaml`, les paramètres suivants doivent être configurés :
```yaml
system_probe_config:
  enabled: true
  enable_tcp_queue_length: true
```

1. Modifiez le fichier `tcp_queue_length.d/conf.yaml` dans le dossier `conf.d/` à la racine du
   répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance tcp_queue_length.
   Consultez le [fichier d'exemple tcp_queue_length.d/conf.yaml][1] pour découvrir toutes les options de configuration disponibles.

    Le paramètre `only_count_nb_contexts` est activé par défaut et recueille uniquement le nombre de séries temporelles qu'il recueille normalement. Si ce paramètre est désactivé, le check recueille toutes les données, c'est-à-dire la taille des files d'attente TCP pour chaque connexion.

2. [Redémarrez l'Agent][2].


### Configuration avec Helm

Avec le [chart Helm Datadog][3], nous devons vérifier que `system-probe` est activé en définissant `datadog.systemProbe.enabled` sur `true` dans le fichier `values.yaml`.
Le check peut ensuite être activé en définissant le paramètre `datadog.systemProbe.enableTCPQueueLength`.

### Validation

[Lancez la sous-commande `status` de l'agent][2] et cherchez `tcp_queue_length` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "tcp_queue_length" >}}


### Checks de service

Le check Longueur de file d'attente TCP n'inclut aucun check de service.

### Événements

Le check Longueur de file d'attente TCP n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/tcp_queue_length.d/conf.yaml.example
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://github.com/helm/charts/tree/master/stable/datadog
[4]: https://github.com/DataDog/integrations-core/blob/master/tcp_queue_length/metadata.csv
[5]: https://docs.datadoghq.com/fr/help/