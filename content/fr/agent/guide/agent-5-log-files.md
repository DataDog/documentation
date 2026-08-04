---
disable_toc: false
private: true
title: Fichiers logs de l'Agent 5
---

## Section Overview

Cette page couvre les fichiers logs de l'Agent 5. Datadog recommande d'installer ou de mettre à niveau vers l'Agent 7 pour bénéficier des dernières fonctionnalités. Pour plus d'informations sur l'installation de la dernière version de l'Agent, suivez les [instructions d'installation de l'Agent 7][1]. Pour plus d'informations sur la mise à niveau vers l'Agent 7 depuis une version antérieure, consultez la section [Mettre à niveau vers l'Agent Datadog v7][2].

L'Agent Datadog effectue une rotation des logs tous les 10 Mo par défaut. Lorsqu'une rotation se produit, une sauvegarde (`agent.log.1`) est conservée. Si une sauvegarde précédente existe, elle est écrasée lors de la rotation. Pour définir la taille maximale d'un fichier log et le nombre maximal de fichiers de sauvegarde à conserver, utilisez `log_file_max_size` (par défaut : 10485760 octets) et `log_file_max_rolls` (par défaut : 1) dans le [fichier de configuration de l'Agent][3].

## Répertoire de logs de l'Agent

| Plateforme                             | Commande                                                              |
|--------------------------------------|----------------------------------------------------------------------|
| Linux                                | `/var/log/datadog/`                                                  |
| macOS                                | `/var/log/datadog/`                                                  |
| Windows Server 2008, Vista et versions ultérieures | `C:\ProgramData\Datadog\logs\`                                       |
| Windows Server 2003, XP ou versions antérieures     | `C:\Documents and Settings\All Users\Application Data\Datadog\logs\` |
| SmartOS                              | `/opt/local/datadog/logs/supervisord/`                               |
| Build source                         | `~/.datadog-agent/supervisord/logs/`                                 |

**Remarque** : pour Windows Server 2008, Vista et les systèmes plus récents, les logs de l'Agent se trouvent dans `C:\ProgramData\Datadog\logs`. `ProgramData` est un dossier caché.

## Fichiers de log de l'Agent

* `collector.log`
* `dogstatsd.log`
* `forwarder.log`
* `supervisord.log`

## Fichiers de log d'installation de l'Agent

| Plateforme                             | Nom du fichier et emplacement        |
|--------------------------------------|-------------------------------|
| Linux                                | `$(pwd)/ddagent-install.log`    |
| macOS                                | `/tmp/dd_agent.log`           |
| Windows                              | `%TEMP%\MSI*.LOG`             |

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: /fr/agent/versions/upgrade_to_agent_v7/
[3]: /fr/agent/guide/agent-5-configuration-files#agent-main-configuration-file