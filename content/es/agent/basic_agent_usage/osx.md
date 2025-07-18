---
aliases:
- /es/guides/basic_agent_usage/osx/
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
os: osx
platform: OS X
title: Uso básico del Agent para macOS
---

## Información general

En esta página se describen las funciones básicas del Datadog Agent para macOS. Si aún no has instalado el Agent, consulta las instrucciones en la documentación sobre la [integración del Datadog Agent][1].

Por defecto, el Agent se instala en un entorno de pruebas ubicado en `/opt/datadog-agent`. Puedes mover esta carpeta a cualquier otro lugar; sin embargo, esta documentación asume una localización de instalación por defecto.

## Versiones de macOS compatibles

| versión de macOS       | Versiones del Agent compatibles                                            |
|---------------------|---------------------------------------------------------------------|
| macOS 10.10 y 10.11 | Agent v5                                                            |
| macOS 10.12         | Agent v5, Agent v6 hasta la versión 6.34.0, Agent v7 hasta la versión 7.34.0            |
| macOS 10.13         | Agent v5, Agent v6 hasta la versión 6.38.2, Agent v7 hasta la versión 7.38.2            |
| macOS 10.14 y posteriores        | Agent v5, Agent v6, Agent v7                                        |

## Commandos

En las versiones 6 y 7 del Agent, el gestor de servicios `launchctl` proporcionado por el sistema operativo es responsable del ciclo de vida del Agent, mientras que para ejecutar otros comandos hay que hacerlo directamente a través del sistema binario del Agent. Otra posibilidad es gestionar los comandos del ciclo de vida a través de la aplicación systray, y ejecutar otros comandos con la GUI web.

{{< tabs >}}
{{% tab "Agent v6 y v7" %}}

| Descripción                        | Comando                                              |
|------------------------------------|------------------------------------------------------|
| Ejecutar el Agent como un servicio           | `launchctl start com.datadoghq.agent` o a través de la aplicación systray |
| Detener la ejecución del Agent como servicio    | `launchctl stop com.datadoghq.agent` o a través de la aplicación systray  |
| Reiniciar la ejecución del Agent como servicio | _ejecutar `stop` y luego `start`_ o a través de la aplicación systray             |
| Estado del servicio Agent            | `launchctl list com.datadoghq.agent` o a través de la aplicación systray  |
| Página de estado del Agent en ejecución       | `datadog-agent status` o con la GUI web                    |
| Enviar un flare                         | `datadog-agent flare` o con la GUI web                     |
| Mostrar el uso de comandos              | `datadog-agent --help`                               |
| Ejecutar un check                        | `datadog-agent check <CHECK_NAME>`                   |

{{% /tab %}}
{{% tab "Agent v5" %}}

| Descripción                        | Comando                            |
|------------------------------------|------------------------------------|
| Ejecutar el Agent como un servicio           | `datadog-agent start`              |
| Detener la ejecución del Agent como servicio    | `datadog-agent stop`               |
| Reiniciar la ejecución del Agent como servicio | `datadog-agent restart`            |
| Estado del servicio Agent            | `datadog-agent status`             |
| Página de estado del Agent en ejecución       | `datadog-agent info`               |
| Enviar un flare                         | `datadog-agent flare`              |
| Mostrar el uso de comandos              | _no aplica_                  |
| Ejecutar un check                        | `datadog-agent check <CHECK_NAME>` |

{{% /tab %}}
{{< /tabs >}}

## Configuración

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}
Los archivos y carpetas de configuración del Agent se encuentran en:

* `~/.datadog-agent/datadog.yaml`

Archivos de configuración para las [integraciones][1]:

* `~/.datadog-agent/conf.d/`

[1]: /es/integrations/
{{% /tab %}}
{{% tab "Agent v5" %}}

Los archivos y carpetas de configuración del Agent se encuentran en:

* `~/.datadog-agent/datadog.conf`

Archivos de configuración para las [integraciones][1]:

* `~/.datadog-agent/conf.d/`

[1]: /es/integrations/
{{% /tab %}}
{{< /tabs >}}

## Solucionar problemas

Consulta la [documentación sobre cómo solucionar problemas del Agent][2].

## Trabajar con el Agent integrado

El Agent tiene un entorno de Python integrado en `/opt/datadog-agent/embedded/`. Los archivos binarios comunes, como `python` y `pip`, se encuentran dentro de `/opt/datadog-agent/embedded/bin/`.

Si deseas obtener más información, consulta las instrucciones sobre cómo [añadir paquetes al Agent integrado][3].



{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/mac
[2]: /es/agent/troubleshooting/
[3]: /es/developers/guide/custom-python-package/