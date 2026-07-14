---
algolia:
  tags:
  - archivos de log del Agent
aliases:
- /es/agent/faq/agent-log-files
- /es/agent/guide/agent-log-files
further_reading:
- link: /agent/troubleshooting/
  tag: Documentación
  text: Solucionar problemas del Agent
- link: /agent/configuration/agent-configuration-files/
  tag: Preguntas frecuentes
  text: Archivos de configuración del Agent
- link: /agent/configuration/agent-commands/
  tag: Preguntas frecuentes
  text: Comandos del Agent
title: Archivos de log del Agent
---

El Datadog Agent hace un rollover de logs cada 10MB por defecto. Cuando se produce un rollover, se guarda una copia de seguridad (`agent.log.1`). Si existe una copia de seguridad anterior, se sobrescribe durante el rollover. Para establecer el tamaño máximo de un archivo de log y el número máximo de archivos de copia de seguridad a mantener, utiliza `log_file_max_size`(por defecto: 10485760 bytes) y `log_file_max_rolls`(por defecto: 1) en el [archivo de configuración del Agent][1].

## Directorio de log del Agent

| Plataforma                              | Comando                       |
|---------------------------------------|-------------------------------|
| Linux                                 | `/var/log/datadog/`           |
| macOS, Agent 7.28 y versiones posteriores y 6.28 y versiones posteriores        | `/opt/datadog-agent/logs`      |
| macOS, versiones anteriores al Agent 6.28.0/7.28.0 | `/var/log/datadog`            |
| Windows                               | `C:\ProgramData\Datadog\logs` |

## Archivos de log del Agent

* `agent.log`
* `process-agent.log`
* `trace-agent.log`
* `system-probe.log`
* `jmxfetch.log` para versiones del Agent 7.24.0/6.24.0 o posteriores
* `dogstatsd.log` para la versión del Agent 7.46.0 o posteriores

## Archivos de log de instalación del Agent

| Plataforma                             | Localización y nombre de archivo        |
|--------------------------------------|-------------------------------|
| Linux                                | `$(pwd)/ddagent-install.log`  |
| macOS                                | `/tmp/dd_agent.log`           |
| Windows                              | `%TEMP%\MSI*.LOG`             |

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file