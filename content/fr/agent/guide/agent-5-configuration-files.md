---
disable_toc: false
private: true
title: Fichiers de configuration de l'Agent 5
---

## Section Overview

Cette page couvre les fichiers de configuration de l'Agent 5. Datadog recommande d'installer ou de mettre à niveau vers l'Agent 7 pour bénéficier des dernières fonctionnalités. Pour plus d'informations sur l'installation de la dernière version de l'Agent, suivez les [instructions d'installation de l'Agent 7][1]. Pour plus d'informations sur la mise à niveau vers l'Agent 7 depuis une version antérieure, consultez la section [Mettre à niveau vers l'Agent Datadog v7][2].

## Fichier de configuration principal de l'Agent

| Plateforme                             | Commande                                                                    |
|:-------------------------------------|:---------------------------------------------------------------------------|
| Linux                                | `/etc/dd-agent/datadog.conf`                                               |
| macOS                                | `~/.datadog-agent/datadog.conf`                                            |                                       |
| Windows Server 2008, Vista et versions ultérieures | `%ProgramData%\Datadog\datadog.conf`                                       |
| Windows Server 2003, XP ou versions antérieures     | `\\Documents and Settings\All Users\Application Data\Datadog\datadog.conf` |

Consultez l'[exemple de fichier `config_template.yaml`][3] pour toutes les options de configuration disponibles.

## Répertoire de configuration de l'Agent

| Plateforme                             | Commande                                                              |
|:-------------------------------------|:---------------------------------------------------------------------|
| Linux                                | `/etc/dd-agent/conf.d/`                                              |
| CentOS                               | `/etc/dd-agent/conf.d/`                                              |
| Debian                               | `/etc/dd-agent/conf.d/`                                              |
| Fedora                               | `/etc/dd-agent/conf.d/`                                              |
| macOS                                | `~/.datadog-agent/conf.d/`                                           |
| RedHat                               | `/etc/dd-agent/conf.d/`                                              |
| Source                               | `/etc/dd-agent/conf.d/`                                              |
| Suse                                 | `/etc/dd-agent/conf.d/`                                              |
| Ubuntu                               | `/etc/dd-agent/conf.d/`                                              |
| Windows Server 2008, Vista et versions ultérieures | `%ProgramData%\Datadog\conf.d`                                       |
| Windows Server 2003, XP ou versions antérieures     | `\\Documents and Settings\All Users\Application Data\Datadog\conf.d` |

## Fichier de configuration JMX

Les checks de l'Agent JMX ont un fichier `metrics.yaml` supplémentaire dans leur dossier de configuration. Il s'agit d'une liste de tous les beans que l'Agent Datadog collecte par défaut. De cette façon, vous n'avez pas besoin de lister tous les beans manuellement lorsque vous configurez un check via [les labels Docker ou les annotations k8s][4].

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: /fr/agent/versions/upgrade_to_agent_v7/
[3]: https://github.com/DataDog/dd-agent/blob/master/datadog.conf.example
[4]: /fr/agent/kubernetes/integrations/#configuration