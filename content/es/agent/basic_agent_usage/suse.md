---
aliases:
- /es/guides/basic_agent_usage/suse/
further_reading:
- link: /logs/
  tag: Documentación
  text: Recopilar tus logs
- link: /infrastructure/process/
  tag: Documentación
  text: Recopilar tus procesos
- link: /tracing/
  tag: Documentación
  text: Recopilar tus trazas
- link: /agent/basic_agent_usage/#agent-architecture
  tag: Documentación
  text: Obtén más información sobre la arquitectura del Agent
- link: /agent/guide/network#configure-ports
  tag: Documentación
  text: Configurar puertos de entrada
kind: documentación
platform: SUSE
title: Uso básico del Agent para SUSE
---

## Información general

En esta página, se describen las funciones básicas del Datadog Agent para SUSE. Si aún no has instalado el Agent, consulta las instrucciones en la documentación sobre la [integración del Datadog Agent][1].

Los paquetes están disponibles para arquitecturas x86 de 64 bits. Para otras arquitecturas, utiliza la instalación de origen.

**Nota**: SUSE 11 SP4 y sus versiones posteriores son compatibles con las versiones anteriores al Agent 6.33.0/7.33.0. SLES 12 (y posteriores) y OpenSUSE 15 (y posteriores) son compatibles con el Agent 6.33.0/7.33.0 y sus versiones posteriores.

## Comandos

En las versiones 6 y 7 del Agent, el gestor de servicios proporcionado por el sistema operativo es el responsable del ciclo de vida del Agent; sin embargo, para ejecutar otros comandos, hay que hacerlo directamente a través del archivo binario del Agent. En la versión 5 del Agent, por el contrario, casi todo se hace a través del gestor de servicios.

{{< tabs >}}
{{% tab "Agent v6 y v7" %}}

### SUSE 12 y versiones posteriores

| Descripción                        | Comando                                                |
|------------------------------------|--------------------------------------------------------|
| Ejecutar el Agent como servicio           | `sudo systemctl start datadog-agent`                   |
| Detener la ejecución del Agent como servicio    | `sudo systemctl stop datadog-agent`                    |
| Reiniciar la ejecución del Agent como servicio | `sudo systemctl restart datadog-agent`                 |
| Estado del servicio Agent            | `sudo systemctl status datadog-agent`                  |
| Página de estado del Agent en ejecución       | `sudo datadog-agent status`                            |
| Enviar flare                         | `sudo datadog-agent flare`                             |
| Mostrar el uso de comandos              | `sudo datadog-agent --help`                            |
| Ejecutar un check                        | `sudo -u dd-agent -- datadog-agent check <CHECK_NAME>` |

### SUSE 11

| Descripción                        | Comando                                                |
|------------------------------------|--------------------------------------------------------|
| Ejecutar el Agent como un servicio           | `sudo service datadog-agent start`                     |
| Detener la ejecución del Agent como servicio    | `sudo service datadog-agent stop`                      |
| Reiniciar la ejecución del Agent como servicio | `sudo service datadog-agent restart`                   |
| Estado del servicio Agent            | `sudo service datadog-agent status`                    |
| Página de estado del Agent en ejecución       | `sudo datadog-agent status`                            |
| Enviar un flare                         | `sudo datadog-agent flare`                             |
| Mostrar el uso de comandos              | `sudo datadog-agent --help`                            |
| Ejecutar un check                        | `sudo -u dd-agent -- datadog-agent check <CHECK_NAME>` |

{{% /tab %}}
{{% tab "Agent v5" %}}

| Descripción                        | Comando                                           |
|------------------------------------|---------------------------------------------------|
| Ejecutar el Agent como un servicio           | `sudo service datadog-agent start`                |
| Detener la ejecución del Agent como servicio    | `sudo service datadog-agent stop`                 |
| Reiniciar la ejecución del Agent como servicio | `sudo service datadog-agent restart`              |
| Estado del servicio Agent            | `sudo service datadog-agent status`               |
| Página de estado del Agent en ejecución       | `sudo service datadog-agent info`                 |
| Enviar un flare                         | `sudo service datadog-agent flare`                |
| Mostrar el uso de comandos              | `sudo service datadog-agent`                      |
| Ejecutar un check                        | `sudo -u dd-agent -- dd-agent check <CHECK_NAME>` |

{{% /tab %}}
{{< /tabs >}}

**Nota**: Si el contenedor de servicio `service` no está disponible en tu sistema, utiliza:

* En sistemas basados en `upstart`: `sudo start/stop/restart/status datadog-agent`
* Para sistemas basados en `systemd`: `sudo systemctl start/stop/restart/status datadog-agent`

[Obtén más información sobre los comandos del ciclo de vida del servicio][2]

## Configuración

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}
Los archivos y carpetas de configuración del Agent se encuentran en:

* `/etc/datadog-agent/datadog.yaml`

Archivos de configuración para las [integraciones][1]:

* `/etc/datadog-agent/conf.d/`

[1]: /es/integrations/
{{% /tab %}}
{{% tab "Agent v5" %}}

Los archivos y carpetas de configuración para el Agent se encuentran en:

* `/etc/dd-agent/datadog.conf`

Archivos de configuración para las [integraciones][1]:

* `/etc/dd-agent/conf.d/`

[1]: /es/integrations/
{{% /tab %}}
{{< /tabs >}}

## Solucionar problemas

Consulta la [documentación sobre cómo solucionar problemas relacionados con el Agent][3].

## Trabajar con el Agent integrado

El Agent tiene un entorno Python integrado en `/opt/datadog-agent/embedded/`. Los sistemas binarios comunes como `python` y `pip` se encuentran dentro de `/opt/datadog-agent/embedded/bin/`.

Si deseas obtener más información, consulta las instrucciones sobre cómo [añadir paquetes al Agent integrado][4].

## {{< partial name="whats-next/whats-next.html" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/suse
[2]: /es/agent/faq/agent-v6-changes/?tab=linux#service-lifecycle-commands
[3]: /es/agent/troubleshooting/
[4]: /es/developers/guide/custom-python-package/