---
title: Gestion des intégrations
---

## Présentation

L'Agent contient un ensemble d'intégrations Datadog officielles permettant aux utilisateurs de prendre en main facilement la surveillance de leurs applications. Ces intégrations sont disponibles sous la forme de paquets Python individuels. Vous pouvez les mettre à niveau séparément.

Pour les versions 6.8 et ultérieures de l'Agent, la commande `datadog-agent integration` permet aux utilisateurs de gérer les intégrations Datadog officielles disponibles pour l'Agent. Vous pouvez également utiliser les sous-commandes suivantes :

 * [install](#install)
 * [remove](#remove)
 * [show](#show)
 * [freeze](#freeze)

Affichez l'utilisation et la documentation de ces commandes avec `datadog-agent integration --help`.
Sous Linux, exécutez la commande en tant qu'utilisateur `dd-agent`. Sous Windows, exécutez la commande en tant qu'`administrator`.

## Commandes d'intégration

### Workflow

1. Vérifiez la version de l'intégration installée sur votre Agent avec la commande `show`.
2. Consultez le changelog de l'intégration pertinente sur le référentiel [integrations-core][1] afin d'identifier la version de votre choix.
3. Installez l'intégration avec la commande `install`.
4. Redémarrez votre Agent.

**Remarque** : si vous utilisez un outil de gestion de configuration, il est conseillé de bloquer l'intégration sur la version désirée. Lorsque vous êtes prêt à mettre à niveau l'Agent, supprimez le blocage. Si vous ne le faites pas avant de mettre à niveau l'Agent, il est possible que le processus de mise à niveau par l'outil de gestion de configuration échoue si la version de l'intégration n'est pas compatible avec la nouvelle version de l'Agent.

### Install

Utilisez la commande `datadog-agent integration install` pour installer une version spécifique d'une intégration Datadog officielle (disponible sur le référentiel [integrations-core][1]), tant que celle-ci est compatible avec la version de l'Agent. La commande effectue cette vérification et se termine avec une erreur en cas d'incompatibilité.

Une intégration est compatible et peut être installée si les deux conditions suivantes sont remplies :

1. La version est plus récente que celle [fournie avec l'Agent][2].
2. Elle est compatible avec la version de [datadog_checks_base][3] de l'Agent installé.

**Remarque** : `datadog_checks_base` ne peut pas être installé manuellement. Le check de base peut uniquement être mis à jour en mettant à jour l'Agent.

La syntaxe de cette commande est `datadog-agent integration install <NOM_PAQUET_INTÉGRATION>==<VERSION>`, où `<NOM_PAQUET_INTÉGRATION>` correspond au nom de l'intégration avec le préfixe `datadog-`.

Par exemple, pour installer la version 3.6.0 de l'intégration vSphere, exécutez :

Linux :

```shell
sudo -u dd-agent -- datadog-agent integration install datadog-vsphere==3.6.0
```

Windows :

```powershell
"%PROGRAMFILES%\Datadog\Datadog Agent\embedded\agent.exe" integration install datadog-vsphere==3.6.0
```

La commande installe le paquet Python de l'intégration et copie les fichiers de configuration (`conf.yaml.example`, `conf.yaml.default` et `auto_conf.yaml`) dans le répertoire `conf.d`, en remplaçant les fichiers existants. Ce processus a également lieu lors de la mise à niveau complète de l'Agent. Si une erreur se produit lors de la copie des fichiers, la commande se termine avec une erreur, mais la version de l'intégration spécifiée est tout de même installée.

Après la mise à niveau, redémarrez votre Agent pour commencer à utiliser l'intégration que vous venez d'installer.

Cette commande est spécifiquement conçue pour permettre aux utilisateurs de mettre à niveau une intégration afin d'obtenir une nouvelle fonction ou un correctif dès sa publication. Cela permet d'éviter d'attendre la version suivante de l'Agent. **Remarque** : il est toujours conseillé de mettre à niveau l'Agent dès que possible, car il contient toujours la dernière version de chaque intégration au moment de la publication.

Une fois l'Agent mis à niveau, chaque intégration que vous avez mise à niveau individuellement via la commande est remplacée par l'intégration fournie avec l'Agent.

#### Outils de gestion de configuration

Les outils de gestion de configuration peuvent tirer parti de cette commande pour déployer la version d'une intégration sur l'ensemble de votre infrastructure.

### Remove

Pour supprimer une intégration, utilisez la commande `datadog-agent integration remove`. La syntaxe de cette commande est `datadog-agent integration remove <NOM_PAQUET_INTÉGRATION>`, où `<NOM_PAQUET_INTÉGRATION>` correspond au nom de l'intégration avec le préfixe `datadog-`.

Par exemple, pour supprimer l'intégration vSphere, exécutez :

Linux :

```shell
sudo -u dd-agent -- datadog-agent integration remove datadog-vsphere
```

Windows :

```powershell
"%PROGRAMFILES%\Datadog\Datadog Agent\embedded\agent.exe" integration remove datadog-vsphere
```

La suppression d'une intégration n'entraîne pas la suppression du dossier de configuration correspondant dans le répertoire `conf.d`.

### Show

Pour obtenir des informations, comme le numéro de version, sur une intégration installée, utilisez la commande `datadog-agent integration show`. La syntaxe de cette commande est `datadog-agent integration show <NOM_PAQUET_INTÉGRATION>`, où `<NOM_PAQUET_INTÉGRATION>` correspond au nom de l'intégration avec le préfixe `datadog-`.

Par exemple, pour afficher des informations sur l'intégration vSphere, exécutez :

Linux :

```shell
sudo -u dd-agent -- datadog-agent integration show datadog-vsphere
```

Windows :

```powershell
"%PROGRAMFILES%\Datadog\Datadog Agent\embedded\agent.exe" integration show datadog-vsphere
```

### Freeze

Pour énumérer tous les paquets Python installés dans l'environnement Python de l'Agent, utilisez la commande `datadog-agent integration freeze`. Cela affichera la liste de toutes les intégrations Datadog (paquets commençant par `datadog-`) et de toutes les dépendances Python requises pour exécuter les intégrations.

Linux :

```text
sudo -u dd-agent -- datadog-agent integration freeze
```

Windows :

```powershell
"%PROGRAMFILES%\Datadog\Datadog Agent\embedded\agent.exe" integration freeze
```

[1]: https://github.com/DataDog/integrations-core
[2]: https://github.com/DataDog/integrations-core/blob/master/AGENT_INTEGRATIONS.md
[3]: https://github.com/DataDog/integrations-core/tree/master/datadog_checks_base
