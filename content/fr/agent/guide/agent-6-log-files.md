---
disable_toc: false
private: true
title: Fichiers de log de l'Agent 6
---

## Section Overview

Cette page présente les fichiers de log de l'Agent 5. Datadog vous recommande d'installer l'Agent 7 ou d'effectuer une mise à niveau vers cette version pour profiter des dernières fonctionnalités. Pour obtenir des informations sur l'installation de la dernière version de l'Agent, suivez les [instructions d'installation de l'Agent 7][1]. Pour obtenir des informations sur la mise à niveau vers l'Agent 7 depuis une version antérieure, consultez la section relative à la [mise à niveau vers l'Agent Datadog v7][2].

L'Agent Datadog effectue une rotation des logs tous les 10 Mo par défaut. Lorsqu'une rotation se produit, une sauvegarde (`agent.log.1`) est conservée. Si une sauvegarde précédente existe, elle est écrasée lors de la rotation. Pour définir la taille maximale d'un fichier log et le nombre maximal de fichiers de sauvegarde à conserver, utilisez `log_file_max_size` (par défaut : 10485760 octets) et `log_file_max_rolls` (par défaut : 1) dans le [fichier de configuration de l'Agent][3].

## Répertoire de logs de l'Agent

| Plateforme                              | Commande                       |
|---------------------------------------|-------------------------------|
| Linux                                 | `/var/log/datadog/`           |
| macOS, Agent v7.28+ et v6.28+        | `/opt/datadog-agent/logs`      |
| macOS, version d'Agent antérieure à 6.28.0/7.28.0 | `/var/log/datadog`            |
| Windows                               | `C:\ProgramData\Datadog\logs` |

## Fichiers de log de l'Agent

* `agent.log`
* `process-agent.log`
* `trace-agent.log`
* `system-probe.log`
* `jmxfetch.log` pour l'Agent >= 7.24.0/6.24.0
* `dogstatsd.log` pour l'Agent >= 7.46.0


## Fichiers de log d'installation de l'Agent

| Plateforme                             | Nom du fichier et emplacement        |
|--------------------------------------|-------------------------------|
| Linux                                | `$(pwd)/ddagent-install.log`    |
| macOS                                | `/tmp/dd_agent.log`           |
| Windows                              | `%TEMP%\MSI*.LOG`             |

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: /fr/agent/versions/upgrade_to_agent_v7/
[3]: /fr/agent/guide/agent-6-configuration-files#agent-main-configuration-file