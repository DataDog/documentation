---
algolia:
  tags:
  - agent log files
aliases:
- /es/agent/faq/agent-log-files
- /es/agent/guide/agent-log-files
description: Comprenda dónde almacena el Datadog Agent sus archivos de registro y
  cómo configurar los ajustes de rotación de registros.
further_reading:
- link: /agent/troubleshooting/
  tag: Documentación
  text: Agent Troubleshooting
- link: /agent/configuration/agent-configuration-files/
  tag: PREGUNTAS FRECUENTES
  text: Archivos de configuración del Agent
- link: /agent/configuration/agent-commands/
  tag: PREGUNTAS FRECUENTES
  text: Comandos del Agent
title: Archivos de registro del Agent
---
El Datadog Agent realiza una rotación de registros cada 10 MB de forma predeterminada. Cuando ocurre una rotación, se conserva una copia de seguridad (`agent.log.1`). Si existe una copia de seguridad anterior, se sobrescribe durante la rotación. Para establecer el tamaño máximo de un archivo de registro y el número máximo de archivos de copia de seguridad que se deben conservar, utilice `log_file_max_size`(predeterminado: 10485760 bytes) y `log_file_max_rolls`(predeterminado: 1) en el [archivo de configuración del Agent][1].

## Directorio de registros del Agent {#agent-log-directory}

| Plataforma                              | Comando                       |
|---------------------------------------|-------------------------------|
| AIX                                   | `/var/log/datadog/`           |
| Linux                                 | `/var/log/datadog/`           |
| macOS, Agent v7.28+ y v6.28+        | `/opt/datadog-agent/logs`      |
| macOS, Agent anterior a 6.28.0/7.28.0 | `/var/log/datadog`            |
| Windows                               | `C:\ProgramData\Datadog\logs` |

## Archivos de registro del Agent {#agent-log-files}

* `agent.log`
* `process-agent.log`
* `trace-agent.log`
* `system-probe.log`
* `jmxfetch.log` para el Agent >= 7.24.0/6.24.0
* `dogstatsd.log` para el Agent >= 7.46.0

En AIX, cada servicio del Agent también redirige su stderr a un archivo dedicado en `/var/log/datadog/` (`agent-stderr.log`, `trace-agent-stderr.log` y `agent-data-plane-stderr.log`), que captura salidas, como errores de inicio, que no pasan por el registro interno del Agent.

## Archivos de registro de instalación del Agent {#agent-installation-log-files}

| Plataforma                             | Ubicación y nombre de archivo        |
|--------------------------------------|-------------------------------|
| Linux                                | `$(pwd)/ddagent-install.log`  |
| macOS                                | `/tmp/dd_agent.log`           |
| Windows                              | `%TEMP%\MSI*.LOG`             |

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file