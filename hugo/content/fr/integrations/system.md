---
integration_title: Check système
name: system
newhlevel: true
custom_kind: integration
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

Recueillez des métriques concernent le processeur, les E/S, la charge, la mémoire, le swap et l'uptime de votre système. Les checks suivants sont également liés au système :

* [Check de répertoire][1] : enregistrez des métriques à partir des fichiers de répertoires donnés.
* [Check de disque][2] : enregistrez des métriques sur vos disques.
* [Check de processus][3] : enregistrez des métriques à partir d'un processus en cours d'exécution spécifique sur un système.

## Implémentation

### Installation

Le check système est inclus avec le paquet de l'[Agent Datadog][4]. Vous n'avez donc rien à installer sur votre serveur.

## Données collectées

### Métriques

{{< get-metrics-from-git "system" "system.cpu system.fs system.io system.load system.mem system.proc. system.swap system.uptime" >}}

### Événements

Le check système n'inclut aucun événement.

### Checks de service

Le check système n'inclut aucun check de service.

### Tags

Le tag `host:<HOSTNAME>` est automatiquement appliqué à l'ensemble des métriques système. En outre, le tag `device:<NOM_APPAREIL>` est appliqué aux espaces de nommage suivants :

* `system.disk.*`
* `system.fs.inodes.*`
* `system.io.*`
* `system.net.*`

<h1 id="system-core"><a href="#system-core">System Core</a></h1>

Ce check recueille le nombre de cœurs du processeur sur un host ainsi que les temps processeur (système, utilisateur, inactivité, etc.).

## Implémentation

### Installation

Le check System Core est inclus avec le paquet de l'[Agent Datadog][4]. Vous n'avez donc rien à installer sur votre serveur.

### Configuration

1. Modifiez le fichier `system_core.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][5]. Consultez le [fichier d'exemple system_core.d/conf.yaml][6] pour découvrir toutes les options de configuration disponibles. **Remarque** : au moins une entrée est requise dans `instances` pour activer le check. Exemple :

    ```yaml
      init_config:
      instances:
        - foo: bar
    ```

2. [Redémarrez l'Agent][7].

### Validation

[Lancez la sous-commande status de l'Agent][4] et cherchez `system_core` dans la section Checks.

## Données collectées

### Métriques

{{< get-metrics-from-git "system_core" >}}

Selon la plateforme, le check peut recueillir d'autres métriques de temps processeur, p. ex. `system.core.interrupt` sous Windows, `system.core.iowait` sous Linux, etc.

### Événements

Le check System Core n'inclut aucun événement.

### Checks de service

Le check System Core n'inclut aucun check de service.

<h1 id="system-swap"><a href="#system-swap">System Swap</a></h1>

Ce check surveille le nombre d'octets entrants et sortants du swap sur le système.

## Implémentation

### Installation

Le check System Swap est inclus avec le paquet de l'[Agent Datadog][4]. Vous n'avez donc rien à installer sur votre serveur.

### Configuration

1. Modifiez le fichier `system_swap.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][5]. Consultez le [fichier d'exemple system_swap.d/conf.yaml][8] pour découvrir toutes les options de configuration disponibles. **Remarque** : aucune configuration initiale n'est possible pour ce check.

2. [Redémarrez l'Agent][7].

### Validation

[Lancez la sous-commande status de l'Agent][4] et cherchez `system_swap` dans la section Checks.

## Données collectées

### Métriques

{{< get-metrics-from-git "system_swap" >}}

### Événements

Le check System Swap n'inclut aucun événement.

### Checks de service

Le check System Swap n'inclut aucun check de service.

[1]: /fr/integrations/directory
[2]: /fr/integrations/disk
[3]: /fr/integrations/process
[4]: /fr/agent/guide/agent-commands/#agent-status-and-information
[5]: /fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-core/blob/master/system_core/datadog_checks/system_core/data/conf.yaml.example
[7]: /fr/agent/guide/agent-commands/#start-stop-restart-the-agent
[8]: https://github.com/DataDog/integrations-core/blob/master/system_swap/datadog_checks/system_swap/data/conf.yaml.example