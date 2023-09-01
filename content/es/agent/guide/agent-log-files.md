---
aliases:
- /es/agent/faq/agent-log-files
further_reading:
- link: /agent/troubleshooting/
  tag: Documentación
  text: Solucionar problemas del Agent
- link: /agent/guide/agent-configuration-files/
  tag: FAQ
  text: Archivos de configuración del Agent
- link: /agent/guide/agent-commands/
  tag: FAQ
  text: Comandos del Agent
kind: guía
title: Archivos de logs del Agent
---

El Datadog Agent hace un volcado de logs cada 10 MB de manera predeterminada. Cuando esto ocurre, se guarda una copia de seguridad (`agent.log.1`) y, si ya existe alguna, esta se sobrescribe durante el proceso. Para establecer el tamaño máximo de un archivo de logs y el número máximo de archivos de copia de seguridad que se desean mantener, configura el `log_file_max_size` (por defecto: 10485760 bytes) y el `log_file_max_rolls` (por defecto: 1) en el [archivo de configuración principal del Agent][1].

## Directorio de logs del Agent

{{< tabs >}}
{{% tab "Agent v6 y v7" %}}

| Plataforma                              | Comando                       |
|---------------------------------------|-------------------------------|
| Linux                                 | `/var/log/datadog/`           |
| macOS, Agent 7.28 y versiones posteriores y 6.28 y versiones posteriores        | `/opt/datadog-agent/logs`      |
| macOS, versiones anteriores al Agent 6.28.0/7.28.0 | `/var/log/datadog`            |
| Windows Server 2008, Vista y versiones más recientes  | `C:\ProgramData\Datadog\logs` |
| Windows Server 2003, XP o versiones anteriores      | *plataforma no compatible*        |

{{% /tab %}}
{{% tab "Agent v5" %}}

| Plataforma                             | Comando                                                              |
|--------------------------------------|----------------------------------------------------------------------|
| Linux                                | `/var/log/datadog/`                                                  |
| macOS                                | `/var/log/datadog/`                                                  |
| Windows Server 2008, Vista y versiones más recientes | `C:\ProgramData\Datadog\logs\`                                       |
| Windows Server 2003, XP o versiones anteriores     | `C:\Documents and Settings\All Users\Application Data\Datadog\logs\` |
| SmartOS                              | `/opt/local/datadog/logs/supervisord/`                               |
| Compilación de fuentes                         | `~/.datadog-agent/supervisord/logs/`                                 |

{{% /tab %}}
{{< /tabs >}}

## Archivos de logs del Agent

{{< tabs >}}
{{% tab "Agent v6 y v7" %}}

* `agent.log`
* `process-agent.log`
* `trace-agent.log`
* `system-probe.log`
* `jmxfetch.log` para el Agent >= 7.24.0/6.24.0

{{% /tab %}}
{{% tab "Agent v5" %}}

* `collector.log`
* `dogstatsd.log`
* `forwarder.log`
* `supervisord.log`

{{% /tab %}}
{{< /tabs >}}

## Archivos de logs de instalación del Agent

| Plataforma                             | Localización y nombre del archivo        |
|--------------------------------------|-------------------------------|
| Linux                                | `$(pwd)/ddagent-install.log`    |
| macOS                                | `/tmp/dd_agent.log`           |
| Windows                              | `%TEMP%\MSI*.LOG`             |

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file