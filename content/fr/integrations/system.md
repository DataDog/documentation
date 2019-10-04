---
integration_title: Check système
name: system
newhlevel: true
kind: integration
git_integration_title: system
updated_for_agent: 5.8.5
description: "Surveillez l'utilisation des ressources système\_: processeur, mémoire, disque, système de fichiers, et plus encore."
is_public: true
public_title: Intégration Datadog/System
short_description: "Surveillez l'utilisation des ressources système\_: processeur, mémoire, disque, système de fichiers, et plus encore."
categories:
  - os & system
  - configuration & deployment
ddtype: check
aliases:
  - /fr/integrations/system_swap/
  - /fr/integrations/system_core/
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Obtenez les métriques de votre système de base concernant le processeur, ses E/S, sa charge, la mémoire, le swap et la durée de fonctionnement. D'autres checks liés au système sont également disponibles :

* [Check de répertoire][1] : enregistrez des métriques à partir des fichiers de répertoires donnés.
* [Check de disque][2] : enregistrez des métriques sur vos disques.
* [Check de processus][3] : enregistrez des métriques à partir d'un processus en cours d'exécution spécifique sur un système.

## Implémentation

Le check système est inclus avec le paquet de l'[Agent Datadog][4] : vous n'avez donc rien d'autre à installer sur votre serveur.

## Données collectées
### Métriques

{{< get-metrics-from-git "system" "system.cpu system.fs system.io system.load system.mem system.proc. system.swap system.uptime" >}}

### Tags
Le tag `host:<HOSTNAME>` est automatiquement appliqué à l'ensemble des métriques système. En outre, le tag `device:<NOM_APPAREIL>` est appliqué aux espaces de nommage suivants :

* `system.disk.*`
* `system.fs.inodes.*`
* `system.io.*`
* `system.net.*`

## Check de l'Agent : System cores

Ce check recueille le nombre de cœurs de processeur sur un host et des durées du processeur (à savoir, système, utilisateur, inactivité, etc.).

### Implémentation
#### Installation

Le check system_core est inclus avec le paquet de l'[Agent Datadog][4] : vous n'avez donc rien d'autre à installer sur votre serveur.

#### Configuration

1. Modifiez le fichier `system_core.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent. Consultez le [fichier d'exemple system_core.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles :

    ```
    init_config:

    instances:
        - {}
    ```

    L'Agent nécessite qu'un élément soit spécifié dans `instances` pour activer le check. Le contenu de cet élément n'a pas d'importance.

2. [Redémarrez l'Agent][6] pour activer le check.

### Validation

[Lancez la sous-commande `status` de l'Agent][4] et cherchez `system_core` dans la section Checks.

### Données collectées
#### Métriques

{{< get-metrics-from-git "system_core" >}}

Selon la plateforme, le check peut recueillir d'autres métriques de durée du processeur, p. ex. `system.core.interrupt` sous Windows, `system.core.iowait` sous Linux, etc.

## Check de l'Agent : Swap

Ce check surveille le nombre d'octets qu'un host a swap.

### Installation

Le check system_swap est inclus avec le paquet de l'[Agent Datadog][4] : vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

1. Modifiez le fichier `system_swap.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent. Consultez le [fichier d'exemple system_swap.d/conf.yaml][7] pour découvrir toutes les options de configuration disponibles :

    ```
    # This check takes no initial configuration
    init_config:

    instances: [{}]
    ```

2. [Redémarrez l'Agent][6] pour commencer à recueillir vos métriques swap.

### Validation

[Lancez la sous-commande `status` de l'Agent][4] et cherchez `system_swap` dans la section Checks.

### Données collectées
#### Métriques

{{< get-metrics-from-git "system_swap" >}}

[1]: /fr/integrations/directory
[2]: /fr/integrations/disk
[3]: /fr/integrations/process
[4]: /fr/agent/guide/agent-commands/#agent-status-and-information
[5]: https://github.com/DataDog/integrations-core/blob/master/system_core/datadog_checks/system_core/data/conf.yaml.example
[6]: /fr/agent/guide/agent-commands/#start-stop-restart-the-agent
[7]: https://github.com/DataDog/integrations-core/blob/master/system_swap/datadog_checks/system_swap/data/conf.yaml.example