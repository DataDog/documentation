---
algolia:
  tags:
  - agent log files
aliases:
- /fr/agent/faq/agent-log-files
- /fr/agent/guide/agent-log-files
description: Comprenez où le Datadog Agent stocke ses fichiers journaux et comment
  configurer les paramètres de rotation des journaux.
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
title: Fichiers journaux de l'Agent
---
Le Datadog Agent effectue une rotation des journaux tous les 10 Mo par défaut. Lorsqu'une rotation se produit, une seule sauvegarde (`agent.log.1`) est conservée. Si une sauvegarde précédente existe, elle est écrasée lors de la rotation. Pour définir la taille maximale d'un fichier journal et le nombre maximal de fichiers de sauvegarde à conserver, utilisez `log_file_max_size` (par défaut : 10485760 octets) et `log_file_max_rolls` (par défaut : 1) dans le [fichier de configuration de l'Agent][1].

## Répertoire des journaux de l'Agent {#agent-log-directory}

| Plateforme                              | Commande                       |
|---------------------------------------|-------------------------------|
| AIX                                   | `/var/log/datadog/`           |
| Linux                                 | `/var/log/datadog/`           |
| macOS, Agent v7.28+ et v6.28+        | `/opt/datadog-agent/logs`      |
| macOS, Agent antérieur à 6.28.0/7.28.0 | `/var/log/datadog`            |
| Windows                               | `C:\ProgramData\Datadog\logs` |

## Fichiers journaux de l'Agent {#agent-log-files}

* `agent.log`
* `process-agent.log`
* `trace-agent.log`
* `system-probe.log`
* `jmxfetch.log` pour l'Agent >= 7.24.0/6.24.0
* `dogstatsd.log` pour l'Agent >= 7.46.0

Sur AIX, chaque service de l'Agent redirige également son stderr vers un fichier dédié dans `/var/log/datadog/` (`agent-stderr.log`, `trace-agent-stderr.log` et `agent-data-plane-stderr.log`), qui capture les sorties telles que les erreurs de démarrage qui contournent la journalisation interne de l'Agent.

## Fichiers journaux d'installation de l'Agent {#agent-installation-log-files}

| Plateforme                             | Emplacement et nom de fichier        |
|--------------------------------------|-------------------------------|
| Linux                                | `$(pwd)/ddagent-install.log`  |
| macOS                                | `/tmp/dd_agent.log`           |
| Windows                              | `%TEMP%\MSI*.LOG`             |

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file