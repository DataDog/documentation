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
  text: Más información sobre la arquitectura del Agent
- link: /agent/configuration/network#configure-ports
  tag: Documentación
  text: Configurar puertos de entrada
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

## Comandos

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

## Desinstalar el Agent

{{< tabs >}}
{{% tab "Agent v6 y v7" %}}
**Instalación por un solo usuario**

Para eliminar el Agent y todos sus archivos de configuración:
1. Detén y cierra el Datadog Agent con el icono en forma de hueso en la bandeja.
2. Arrastra la aplicación de Datadog desde la carpeta de aplicaciones a la papelera.
3. Ejecuta los siguientes comandos:
    ```shell
    sudo rm -rf /opt/datadog-agent
    sudo rm -rf /usr/local/bin/datadog-agent
    sudo rm -rf ~/.datadog-agent/** # to remove broken symlinks
    launchctl remove com.datadoghq.agent
    sudo rm -rf /var/log/datadog
    ```
4. Reinicia el equipo para que se apliquen los cambios.

**Instalación de LaunchDaemon en todo el sistema**

Para eliminar el Agent y todos sus archivos de configuración:
1. Arrastra la aplicación de Datadog desde la carpeta de aplicaciones a la papelera.
2. Para eliminar los archivos que queden, ejecuta lo siguiente:
    ```shell
    sudo rm -rf /opt/datadog-agent
    sudo rm -rf /usr/local/bin/datadog-agent
    sudo rm -rf ~/.datadog-agent/** # to remove broken symlinks
    sudo launchctl disable system/com.datadoghq.agent && sudo launchctl bootout system/com.datadoghq.agent
    sudo rm /Library/LaunchDaemons/com.datadoghq.agent.plist
    sudo rm -rf /var/log/datadog
    ```
3. Reinicia el equipo para que se apliquen los cambios.
{{% /tab %}}

{{% tab "Agent v5" %}}
1. Detén y cierra el Datadog Agent con el icono en forma de hueso en la bandeja.
2. Arrastra la aplicación de Datadog desde la carpeta de aplicaciones a la papelera.
3. Ejecuta lo siguiente:

```shell
sudo rm -rf /opt/datadog-agent
sudo rm -rf /usr/local/bin/datadog-agent
sudo rm -rf ~/.datadog-agent/** # to remove broken symlinks
```

Si has ejecutado los comandos de instalación opcionales para que el Agent se ejecute en el arranque, ejecuta lo siguiente para finalizar la desinstalación:

```shell
sudo launchctl unload -w /Library/LaunchDaemons/com.datadoghq.agent.plist
sudo rm /Library/LaunchDaemons/com.datadoghq.agent.plist
```

> Este método elimina el Agent, así como todos sus archivos de configuración.
{{% /tab %}}
{{< /tabs >}}

## Solucionar problemas

Consulta la [documentación sobre cómo solucionar problemas del Agent][2].

## Trabajar con el Agent integrado

El Agent tiene un entorno de Python integrado en `/opt/datadog-agent/embedded/`. Los archivos binarios comunes, como `python` y `pip`, se encuentran dentro de `/opt/datadog-agent/embedded/bin/`.

Si quieres obtener más información, consulta las instrucciones sobre cómo [añadir paquetes al Agent integrado][3].

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=macos
[2]: /es/agent/troubleshooting/
[3]: /es/developers/guide/custom-python-package/