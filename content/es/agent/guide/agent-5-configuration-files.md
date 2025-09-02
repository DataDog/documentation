---
disable_toc: false
private: true
title: Archivos de configuración del Agent 5
---

## Información general

Esta página aborda los archivos de configuración del Agent 5. Datadog recomienda instalar o actualizar al Agent 7 para obtener las últimas características. Para obtener información sobre la instalación de la última versión del Agent, sigue las [instrucciones de instalación del Agent 7][1]. Para obtener información sobre la actualización al Agent 7 desde una versión anterior, consulta [Actualización al Datadog Agent v7][2].

## Archivo de configuración principal del Agent

| Plataforma                             | Comando                                                                    |
|:-------------------------------------|:---------------------------------------------------------------------------|
| Linux                                | `/etc/dd-agent/datadog.conf`                                               |
| macOS                                | `~/.datadog-agent/datadog.conf`                                            |                                       |
| Windows Server 2008, Vista y versiones más recientes | `%ProgramData%\Datadog\datadog.conf`                                       |
| Windows Server 2003, XP o versiones anteriores     | `\\Documents and Settings\All Users\Application Data\Datadog\datadog.conf` |

Consulta el [archivo `config_template.yaml` de ejemplo][3] para ver todas las opciones disponibles de configuración.

## Directorio de configuración del Agent

| Plataforma                             | Comando                                                              |
|:-------------------------------------|:---------------------------------------------------------------------|
| Linux                                | `/etc/dd-agent/conf.d/`                                              |
| CentOS                               | `/etc/dd-agent/conf.d/`                                              |
| Debian                               | `/etc/dd-agent/conf.d/`                                              |
| Fedora                               | `/etc/dd-agent/conf.d/`                                              |
| macOS                                | `~/.datadog-agent/conf.d/`                                           |
| Red Hat                               | `/etc/dd-agent/conf.d/`                                              |
| Fuente                               | `/etc/dd-agent/conf.d/`                                              |
| Suse                                 | `/etc/dd-agent/conf.d/`                                              |
| Ubuntu                               | `/etc/dd-agent/conf.d/`                                              |
| Windows Server 2008, Vista y versiones más recientes | `%ProgramData%\Datadog\conf.d`                                       |
| Windows Server 2003, XP o versiones anteriores     | `\\Documents and Settings\All Users\Application Data\Datadog\conf.d` |

## Archivo de configuración de JMX

Los checks del JMX Agent tienen un archivo `metrics.yaml` adicional en su carpeta de configuración. Se trata de una lista de todos los beans que el Datadog Agent recopila por defecto. De esta forma, no es necesario hacer una lista de todos los beans manualmente cuando se configura un check a través de [etiquetas de Docker o anotaciones k8s][4].

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: /es/agent/versions/upgrade_to_agent_v7/
[3]: https://github.com/DataDog/dd-agent/blob/master/datadog.conf.example
[4]: /es/agent/kubernetes/integrations/#configuration