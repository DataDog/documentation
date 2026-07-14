---
algolia:
  tags:
  - Fichiers de log de l'Agent
aliases:
- /fr/agent/faq/agent-log-files
- /fr/agent/guide/agent-log-files
further_reading:
- link: /agent/troubleshooting/
  tag: Documentation
  text: Dépannage de l'Agent
- link: /agent/configuration/agent-configuration-files/
  tag: FAQ
  text: Fichiers de configuration de l'Agent
- link: /agent/configuration/agent-commands/
  tag: FAQ
  text: Commandes de l'Agent
title: Fichiers de log de l'Agent
---

L'Agent Datadog effectue une substitution des logs tous les 10 Mo. Lors d'une substitution, une sauvegarde est conservée (`agent.log.1`). S'il existe une ancienne sauvegarde, celle-ci est écrasée lors de la substitution. POur définir la taille maximale d'un fichier de log ainsi que le nombre maximum de fichiers de sauvegarde à conserver, définissez les paramètres `log_file_max_size` (valeur par défaut : 10485760 octets) et `log_file_max_rolls`(valeur par défaut : 1) dans le [fichier de configuration de l'Agent][1].

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
| Linux                                | `$(pwd)/ddagent-install.log`  |
| macOS                                | `/tmp/dd_agent.log`           |
| Windows                              | `%TEMP%\MSI*.LOG`             |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file