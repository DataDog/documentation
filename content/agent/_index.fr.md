---
title: Agent
kind: documentation
description: Installer et configurer l'agent pour collecter des données
further_reading:
  - link: logs/
    tag: Documentation
    text: Collectez vos logs
  - link: graphing/infrastructure/process
    tag: Documentation
    text: Collectez vos processus
  - link: tracing
    tag: Documentation
    text: Collectez vos traces
aliases:
  - /fr/agent/faq/agent-check-directory-structure
  - /fr/agent/faq/install-core-extra/
---
<div class="alert alert-info">
    Agent v6 est désormais disponible, <a href="https://github.com/DataDog/datadog-agent/blob/master/docs/agent/upgrade.md">mettez à jour votre Agent </a> afin de bénéficier de toutes les nouvelles fonctionnalités
</div>

## Qu'est ce que l'Agent?

L'agent Datadog est un logiciel qui s'exécute sur vos hosts. Son travail consiste à collecter fidèlement des événements et des métriques et à les envoyer à Datadog pour vous afin que vous puissiez utiliser vos données de monitoring et de performance. L'agent Datadog est open source, consultez le code source sur GitHub pour [Agent v5][1] et [Agent v6][2]. Pour voir tous les changements entre l'Agent v5 et v6, [consultez notre documentation dédiée aux changements][3].

{{< partial name="platforms/platforms.html" >}}

L'agent comporte trois parties principales: le collector, DogStatsD, et le forwarder:

* **Le collector**: exécute des checks sur la machine pour les [intégrations][4] que vous avez et capture les métriques du système telles que la mémoire et le processeur.

* **DogStatsD**: C'est un serveur backend statsd auquel vous pouvez envoyer [des métriques custom][5] à partir d'une application.

* **le forwarder**: récupère les données de DogStatsD et du collector, puis les met en file d'attente pour les envoyer à Datadog.

Tout est contrôlé par un processus supervisor. Nous gardons ceci séparé de sorte que vous n'ayez pas à avoir l'overhead de chaque application si vous ne voulez pas exécuter toutes les sous-parties, (bien que nous vous recommandons généralement de le faire).

## Qu'est ce que l'Agent v6?

L'Agent 6 est la dernière version majeure de l'Agent Datadog. La grande différence entre l'agent 5 et l'agent 6 est que l'agent 6 est une réécriture complète de l'agent principal en Golang. Golang nous a permis de profiter de la concureency. À la place des trois processus utilisés par l'agent v5 --*the Forwarder*, *the Collector*, and *DogStatsD*-- il n'y a plus qu'un seul processus: l'agent. Il vient également avec un certain nombre d'autres améliorations de base:

* L'Agent v6 a considérablement amélioré l'utilisation des ressources par rapport à l'Agent v5:

    * Une plus faible utilisation CPU
    * Un usage mémoire plus faible
    * Utilisation de moins de file descriptors
    * Ses coûts sont moindres à tous les niveaux (RAM, disk...)

* Les percentiles globaux peuvent être directement exécutés sur le serveur pour calculer des percentiles globaux réels et efficaces. (REMARQUE: cette fonctionnalité est actuellement en version BETA. Contactez le support pour plus de détails sur la façon de l'activer pour votre compte.)

* [DogStatsD][6] peut être utilisé sur un socket unix plutôt que sur udp.

* Personnalisez votre Agent v6 et [DogStatsD][6] beaucoup plus facilement et avec beaucoup plus d'options de configuration, pour inclure ou exclure presque tout. Il y a aussi un Agent «puppy» qui est installation vraiment minimale.

* L'agent 6 bloque les ports 5000 et 5001. Si vous utilisez ces ports, mettez à jour le port pour `expvar_port` et` cmd_port` dans le fichier `datadog.yaml`.

## Migration de fichiers de configuration d'agent

Pour faire automatiquement la transition entre les paths et les formats de configuration d'agent de l'Agent v5 à l'Agent v6, utilisez la commande agent:

`sudo -u dd-agent -- datadog-agent import`

La commande analyse un `datadog.conf` existant et convertit toutes les options de configuration que le nouvel agent supporte dans le fichier de configuration` datadog.yaml`. Il copie également les fichiers de configuration pour les check actuellement activés.

Pour l'environnement Mac et Windows, utilisez:

`datadog-agent import <old_configuration_dir> <destination_dir>`

Avec:

* `<old_configuration_dir>` est le répertoire contenant le fichier `datadog.conf`
* `<destination_dir>` est le répertoire où est écrit le `datadog.yaml` importé (utilisez le même répertoire que `<old_configuration_dir>`  pour les environnement Mac et Windows ).

**Note**: Sous Windows, `datadog.conf` est automatiquement mis à jour vers` datadog.yaml` lors de la mise à niveau.

## Fichiers de configuration

Les versions antérieures de l'Agent Datadog stockaient les fichiers de configuration dans `/etc/dd-agent`.
À partir de la version 6.0, les fichiers de configuration seront désormais stockés dans
`/etc/datadog-agent`.

### Fichier de configuration du check

Afin de fournir une manière plus flexible de définir la configuration pour un check, à partir de la version 6.0.0, l'Agent chargera tout fichier YAML valide contenu dans le dossier:

`/etc/datadog-agent/conf.d/<check_name>.d/`.

De cette façon, les configurations complexes peuvent être décomposées en plusieurs fichiers: par exemple,
une configuration pour `http_check` pourrait ressembler à ceci:

```
/etc/datadog-agent/conf.d/http_check.d/
├── backend.yaml
└── frontend.yaml
```

Les fichiers template pour l'Autodiscovery seront également stockés dans le dossier de configuration,
par exemple, voici à quoi ressemble le dossier de configuration du check `redisdb`:

```
/etc/datadog-agent/conf.d/redisdb.d/
├── auto_conf.yaml
└── conf.yaml.example
```

Pour conserver la compatibilité avec les versions précédentes, l'agent récupère toujours les fichiers de configuration sous la forme `/etc/datadog-agent/conf.d/<check_name>.yaml` mais la migration vers le nouveaux format est fortement recommandée.

## CLI

La nouvelle interface de ligne de commande de l'Agent est basée sur une sous-commande:

| Commandes         | Notes                                                                      |
| --------------- | -------------------------------------------------------------------------- |
| check           | Exécute le check spécifié                                                    |
| configcheck     | Affiche toutes les configurations chargées et résolues d'un Agent en cours d'exécution              |
| diagnose        | Exécute un diagnostic de connectivité sur votre système                         |
| flare           | Collecte et envoie un flare à Datadog                                     |
| health          | Affiche la santé de l'agent actuel                                             |
| help            | Aide pour toutes les commandes                                                     |
| hostname        | Affiche l'hostname utilisé par l'Agent                                       |
| import          | Importe et converti des fichiers de configuration à partir des versions précédentes de l'agent |
| installservice  | Installe l'Agent avec le manageur de controleur de services                      |
| launch-gui      | Démarre la GUI de l'Agent Datadog                                               |
| regimport       | Importe les paramètres de registre dans datadog.yaml                             |
| remove-service  | Supprime l'Agent du gestionnaire de contrôle de service                         |
| restart-service | Redémarrez l'Agent dans le service control manager                      |
| start           | Démarre l'Agent                                                            |
| start-service   | Démarre l'Agent avec le manageur de contrôleur de services                        |
| status          | Affiche le status courrant                                                   |
| stopservice     | Stop l'Agent dans le manageur de controleur de services                         |
| version         | Affiche des informations sur la version                                                     |

Pour exécuter une sous-commande, le binaire Agent doit être appelé comme ceci:
```
<path_to_agent_bin> <sub_command> <options>
```

Certaines options ont leur propre ensemble de flags et d'options détaillés dans un message d'aide.
Par exemple, pour voir comment utiliser la sous-commande `check`, lancez:
```
<agent_binary> check --help
```

## Utiliser la GUI

Le port sur lequel s'exécute l'interface graphique peut être configuré dans votre fichier `datadog.yaml`.
La définition du port sur -1 désactive l'interface graphique. Par défault, elle est activée
sur le port `5002` sur Windows et Mac, et est désactivé sur Linux.

Une fois l'agent lancé, utilisez la commande `datadog-agent launch-gui` pour lancer
l'interface graphique dans votre navigateur Web par défaut

**Note**: L'interface visuelle de l'Agent ne fonctionne pas sur les plateformes Windows 32-bits.

### Exigences

1. Les cookies doivent être activés dans votre navigateur. L'interface graphique génère et enregistre un token
dans votre navigateur qui est utilisé pour authentifier toutes les communications avec le serveur GUI.

2. L'interface graphique ne sera lancée que si l'utilisateur qui la lance à
les bonne permissions: Si vous êtes capable d'ouvrir `datadog.yaml`, vous pouvez utiliser l'interface graphique.

3. Pour des raisons de sécurité, l'interface graphique ne peut être accessible que depuis l'interface réseau locale (```localhost``` /```127.0.0.1```), vous devez donc être sur le même host que l'Agent en cours d'exécution pour l'utiliser. En d'autres termes, vous ne pouvez pas exécuter l'Agent sur une machine virtuelle ou un conteneur et y accéder depuis l'ordinateur host.

## Versions d'OS supportées
### Agent v6
| OS                                 | Versions supportées                                       |
| :----                              | :----                                                    |
| [Debian x86_64][7]                 | Debian 7 (wheezy) et plus (nous supportons SysVinit dans l'agent 6.6.0 et plus) |
| [Ubuntu x86_64][8]                 | Ubuntu 14.04 et plus                                   |
| [RedHat/CentOS x86_64][9]          | RedHat/CentOS 6 et plus                                |
| [SUSE Enterprise Linux x86_64][10] | SUSE 11 SP4 et plus (nous ne supportons pas SysVinit)       |
| [Fedora x86_64][11]                | Fedora 26 et plus                                      |
| [macOS][12]                        | macOS 10.12 et plus                                      |
| [Windows server 64-bit][13]        | Windows server 2008r2 et plus                           |
| [Windows 64-bit][13]               | Windows 7 et plus                                       |

**Note**: L'installation depuis les sources peut fonctionner sur les systèmes d'exploitation non répertoriés ici.
### Agent v5

| OS                                 | Versions supportées             |
| :----                              | :----                          |
| [Debian x86_64][7]                 | Debian 7 (wheezy) et plus    |
| [Ubuntu x86_64][8]                 | Ubuntu 12.04 et plus         |
| [RedHat/CentOS x86_64][9]          | RedHat/CentOS 6 et plus      |
| [SUSE Enterprise Linux x86_64][10] | SUSE 11 SP4 et plus          |
| [Fedora x86_64][11]                | Fedora 26 et plus            |
| [macOS][12]                        | macOS 10.10 et plus            |
| [Windows server 64-bit][13]        | Windows server 2008r2 et plus |
| [Windows 64-bit][13]               | Windows 7 et plus             |

**Note**: L'installation depuis les sources peut fonctionner sur les systèmes d'exploitation non répertoriés ici.

## En apprendre plus

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-agent
[2]: https://github.com/DataDog/datadog-agent
[3]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/changes.md
[4]: /integrations
[5]: /developers/metrics/custom_metrics/
[6]: /developers/dogstatsd
[7]: /agent/basic_agent_usage/deb
[8]: /agent/basic_agent_usage/ubuntu
[9]: /agent/basic_agent_usage/redhat
[10]: /agent/basic_agent_usage/suse
[11]: /agent/basic_agent_usage/fedora
[12]: /agent/basic_agent_usage/osx
[13]: /agent/basic_agent_usage/windows
