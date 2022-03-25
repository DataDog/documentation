---
title: Fichiers de log de l'Agent
kind: guide
aliases:
  - /fr/agent/faq/agent-log-files
further_reading:
  - link: /agent/troubleshooting/
    tag: Documentation
    text: Dépannage de l'Agent
  - link: /agent/guide/agent-configuration-files/
    tag: FAQ
    text: Fichiers de configuration de l'Agent
  - link: /agent/guide/agent-commands/
    tag: FAQ
    text: Commandes de l'Agent
---
L'Agent Datadog effectue une substitution des logs tous les 10 Mo. Lors d'une substitution, une sauvegarde est conservée (`agent.log.1`). S'il existe une ancienne sauvegarde, celle-ci sera écrasée lors de la substitution.

## Répertoire de logs de l'Agent

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}

| Plateforme                              | Commandes                       |
|---------------------------------------|-------------------------------|
| Linux                                 | `/var/log/datadog/`           |
| macOS, Agent v7.28+ et v6.28+        | `/opt/datadog-agent/log`      |
| macOS, version d'Agent antérieure à 6.28.0/7.28.0 | `/var/log/datadog`            |
| Windows Server 2008, Vista et versions ultérieures  | `C:\ProgramData\Datadog\logs` |
| Windows Server 2003, XP ou versions antérieures      | *Plate-forme non prise en charge*        |

{{% /tab %}}
{{% tab "Agent v5" %}}

| Plateforme                             | Commande                                                              |
|--------------------------------------|----------------------------------------------------------------------|
| Linux                                | `/var/log/datadog/`                                                  |
| macOS                                | `/var/log/datadog/`                                                  |
| Windows Server 2008, Vista et versions ultérieures | `C:\ProgramData\Datadog\logs\`                                       |
| Windows Server 2003, XP ou versions antérieures     | `C:\Documents and Settings\All Users\Application Data\Datadog\logs\` |
| SmartOS                              | `/opt/local/datadog/logs/supervisord/`                               |
| Build source                         | `~/.datadog-agent/supervisord/logs/`                                 |

{{% /tab %}}
{{< /tabs >}}

## Fichiers de log de l'Agent

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}

* `agent.log`
* `process-agent.log`
* `trace-agent.log`
* `jmxfetch.log` pour l'Agent >= 7.24.0/6.24.0

{{% /tab %}}
{{% tab "Agent v5" %}}

* `collector.log`
* `dogstatsd.log`
* `forwarder.log`
* `supervisord.log`

{{% /tab %}}
{{< /tabs >}}

## Fichiers de log d'installation de l'Agent

| Plateforme                             | Nom du fichier et emplacement        |
|--------------------------------------|-------------------------------|
| Linux                                | `$pwd/ddagent-install.log`    |
| macOS                                | `/tmp/dd_agent.log`           |
| Windows                              | `%TEMP%\MSI*.LOG`             |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}