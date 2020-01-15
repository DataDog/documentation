---
title: Fichiers de log de l'Agent
kind: guide
disable_toc: true
aliases:
  - /fr/agent/faq/agent-log-files
further_reading:
  - link: agent/troubleshooting/
    tag: Documentation
    text: Dépannage de l'Agent
  - link: agent/guide/agent-configuration-files/
    tag: FAQ
    text: Fichiers de configuration de l'Agent
  - link: agent/guide/agent-commands/
    tag: FAQ
    text: Commandes de l'Agent
---
L'Agent Datadog effectue une substitution des logs tous les 10 Mo. Lors d'une substitution, une sauvegarde est conservée (p. ex., `agent.log.1`). S'il existe une ancienne sauvegarde, celle-ci sera écrasée lors de la substitution.

## Répertoire de logs de l'Agent

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}

| Plateforme                             | Commandes                       |
|--------------------------------------|-------------------------------|
| Linux                                | `/var/log/datadog/`           |
| macOS                                | `/var/log/datadog/`           |
| Windows Server 2008, Vista et versions ultérieures | `C:\ProgramData\Datadog\logs` |
| Windows Server 2003, XP ou versions antérieures     | *Plateforme non prise en charge*        |

{{% /tab %}}
{{% tab "Agent v5" %}}

| Plateforme                             | Commandes                                                              |
|--------------------------------------|----------------------------------------------------------------------|
| Linux                                | `/var/log/datadog/`                                                  |
| CentOS                               | `/var/log/datadog/`                                                  |
| Debian                               | `/var/log/datadog/`                                                  |
| Fedora                               | `/var/log/datadog/`                                                  |
| macOS                                | `/var/log/datadog/`                                                  |
| RedHat                               | `/var/log/datadog/`                                                  |
| Source                               | `~/.datadog-agent/supervisord/logs/`                                 |
| SmartOS                              | `/opt/local/datadog/logs/supervisord/`                               |
| Ubuntu                               | `/var/log/datadog/`                                                  |
| Windows Server 2008, Vista et versions ultérieures | `C:\ProgramData\Datadog\logs\`                                       |
| Windows Server 2003, XP ou versions antérieures     | `C:\Documents and Settings\All Users\Application Data\Datadog\logs\` |

{{% /tab %}}
{{< /tabs >}}

## Fichiers de log de l'Agent

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}

* `agent.log`
* `process-agent.log`
* `trace-agent.log`

{{% /tab %}}
{{% tab "Agent v5" %}}

* `collector.log`
* `dogstatsd.log`
* `forwarder.log`
* `supervisord.log`

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}