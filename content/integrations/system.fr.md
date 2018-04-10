---
integration_title: System Check
name: system
newhlevel: true
kind: integration
git_integration_title: system
updated_for_agent: 5.8.5
description: "Suivre l'utilisation des ressources système: CPU, mémoire, disque, système de fichiers, et plus encore."
is_public: true
public_title: Intégration Datadog-System
short_description: "Suivre l'utilisation des ressources système: CPU, mémoire, disque, système de fichiers, et plus encore."
categories:
- os & system
- configuration & deployment
ddtype: check
---
## Aperçu

Obtenez les métriques de votre système à propos du processeur, de ses I/O, de sa charge, de la mémoire, du swap et de la disponibilité. D'autres checks liées au système peuvent être trouvées ici:

* [Check dossier][1] - Capture des métriques à partir des fichiers dans des dossiers donnés.
* [Check de disque][2] - Capturez des métriques sur vos disques
* [Check de processus][3] - Capturez des métriques à partir d'un processus en cours d'exécution sur un système.

## Implémentation
### Configuration

Aucune configuration n'est nécessaire pour le système.

## Données collectées
### Métriques

{{< get-metrics-from-git "system" "system.cpu system.fs system.io system.load system.mem system.swap system.uptime" >}}


## Check de l'Agent: System Core

## Aperçu

Ce check recueille le nombre de cœurs de processeur sur un host et les temps de CPU (c'est-à-dire, système, utilisateur, inactif, etc.).

## Implémentation
### Installation

Le check system_core est packagé avec l'agent, il vous faut donc simplement [installer l'agent] [4] sur n'importe quel host.

### Configuration

Créez un fichier `system_core.yaml` dans le dossier ` conf.d` de l'Agent. Consultez l'exemple du [canevas system_core.yaml][5] pour apprendre toutes les options de configuration disponibles:

```
init_config:

instances:
  - foo: bar
```

L'agent n'a besoin que d'un élément dans `instances` pour activer le check. Le contenu de l'élément n'a pas d'importance.

Redémarrez l'Agent afin d'activer le check.

### Validation

[Lancez la commande `info`de l'Agent][6] et cherchez `system_core` dans la section Checks:

```
  Checks
  ======
    [...]

    system_core
    -------
      - instance #0 [OK]
      - Collected 5 metrics, 0 events & 0 service checks

    [...]
```

## Compatibilité

Le check system_core est compatible avec toutes les principales plateformes.

## Données collectées
### Métriques

{{< get-metrics-from-git "system_core" >}}

Selon la plate-forme, la vérification peut collecter d'autres métriques de temps CPU, par ex. `system.core.interrupt` sous Windows,` system.core.iowait` sous Linux, etc...

### Evénements
Le check System Core n'inclut aucun événement pour le moment.

### Checks de Service
Le check System Core n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog][7].

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog][8]

## Check de l'Agent: Swap

## Aperçu

Ce check monitor le nombre d'octets qu'un host a swap.

## Implémentation
### Installation

Le check System swap est packagé avec l'agent, il vous faut donc simplement [installer l'agent] [4] sur n'importe quel host.

### Configuration

Créez un fichier `system_swap.yaml` dans le dossier ` conf.d` de l'Agent. Consultez l'exemple du [canevas cassandra_nodetool.yaml][9] pour apprendre toutes les options de configuration disponibles:

```
# This check takes no initial configuration
init_config:

instances: [{}]
```

Redémarrez l'Agent pour commencer à collecter les métriques swap.

### Validation

[Lancez la commande `info`de l'Agent][6] et cherchez `system_swap` dans la section Checks:

```
  Checks
  ======
    [...]

    system_swap
    -------
      - instance #0 [OK]
      - Collected 2 metrics, 0 events & 0 service checks

    [...]
```

## Compatibilité

Le check system_swap est compatible avec toutes les principales plateformes.

## Données collectées
### Métriques

{{< get-metrics-from-git "system_swap" >}}

### Evénements
Le check System Swap n'inclut aucun événement pour le moment.

### Checks de Service
Le check System Swap n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog][7].

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog][8]

[1]: /integrations/directory
[2]: /integrations/disk
[3]: /integrations/process/
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://github.com/DataDog/integrations-core/blob/master/system_core/conf.yaml.example
[6]: https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information
[7]: /help/
[8]: https://www.datadoghq.com/blog/
[9]: https://github.com/DataDog/integrations-core/blob/master/system_swap/conf.yaml.example
