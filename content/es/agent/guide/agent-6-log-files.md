---
disable_toc: false
private: true
title: Archivos de log del Agent 6
---

## Información general

Esta página aborda los archivos de log del Agent 5. Datadog recomienda instalar o actualizar al Agent 7 para obtener las últimas características. Para obtener información sobre la instalación de la última versión del Agent, sigue las [instrucciones de instalación del Agent 7][1]. Para obtener información sobre la actualización al Agent 7 desde una versión anterior, consulta [Actualización al Datadog Agent v7][2].

El Datadog Agent hace un rollover de logs cada 10MB por defecto. Cuando se produce un rollover, se guarda una copia de seguridad (`agent.log.1`). Si existe una copia de seguridad anterior, se sobrescribe durante el rollover. Para establecer el tamaño máximo de un archivo de log y el número máximo de archivos de copia de seguridad a mantener, utiliza `log_file_max_size`(por defecto: 10485760 bytes) y `log_file_max_rolls`(por defecto: 1) en el [archivo de configuración del Agent][3].

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

| Plataforma                             | Localización y nombre del archivo        |
|--------------------------------------|-------------------------------|
| Linux                                | `$(pwd)/ddagent-install.log`    |
| macOS                                | `/tmp/dd_agent.log`           |
| Windows                              | `%TEMP%\MSI*.LOG`             |

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: /es/agent/versions/upgrade_to_agent_v7/
[3]: /es/agent/guide/agent-6-configuration-files#agent-main-configuration-file