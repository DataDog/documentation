---
aliases:
- /es/guides/basic_agent_usage/deb/
- /es/agent/basic_agent_usage/install_debian_5/
- /es/agent/basic_agent_usage/debian
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
platform: Debian
title: Uso básico del Agent para Debian
---

## Información general

En esta página se describen las funciones básicas del Datadog Agent para Debian. Si aún no has instalado el Agent, consulta las instrucciones en la documentación sobre la [integración del Datadog Agent][1].

Los paquetes están disponibles para arquitecturas Arm v8 y x86 de 64 bits. Para otras arquitecturas, utiliza la instalación de origen.

**Notas**:
- Para la arquitectura x86 de 64 bits, las versiones Debian 7 (wheezy) y posteriores son compatibles con las versiones anteriores al Agent 6.36.0/7.36.0. Las versiones Debian 8 (jessie) y posteriores son compatibles con el Agent 6.36.0/7.36.0 (o posterior). SysVinit es compatible con la versión 6.6.0 (o posterior) del Agent.
- Para la arquitectura Arm v8 de 64 bits, son compatibles las versiones Debian 9 (stretch) y posteriores.

## Comandos

En las versiones 6 y 7 del Agent, el gestor de servicios proporcionado por el sistema operativo es responsable del ciclo de vida del Agent, mientras que para ejecutar otros comandos hay que hacerlo directamente a través del sistema binario del Agent. Sin embargo, en la versión 5 del Agent, casi todo se hace a través del gestor de servicios.

{{< tabs >}}
{{% tab "Agent v6 y v7" %}}

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

* Para sistemas basados en `upstart`: `sudo start/stop/restart/status datadog-agent`
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

## Desinstalar el Agent

{{< tabs >}}
{{% tab "Agent v6 y v7" %}}
```shell
sudo apt-get remove datadog-agent -y
```

Este comando borra el Agent, pero no elimina:

* El archivo de configuración `datadog.yaml`
* Los archivos que ha creado el usuario en la carpeta de configuración `/etc/datadog-agent`
* Los archivos que ha creado el usuario en la carpeta `/opt/datadog-agent`
* El usuario `dd-agent`
* Archivos de log de Datadog

Si también quieres eliminar estos elementos, ejecuta este comando después de eliminar el Agent:

```shell
sudo apt-get remove --purge datadog-agent -y
```
{{% /tab %}}

{{% tab "Agent v5" %}}
```shell
sudo apt-get remove datadog-agent -y
```

Este comando borra el Agent, pero no elimina:

* El archivo de configuración `datadog.yaml`
* Los archivos que ha creado el usuario en la carpeta de configuración `/etc/dd-agent`
* Los archivos que ha creado el usuario en la carpeta `/opt/datadog-agent`
* El usuario `dd-agent`
* Archivos de log de Datadog

Si también quieres eliminar estos elementos, ejecuta este comando después de eliminar el Agent:

```shell
sudo apt-get --purge remove datadog-agent -y
```
{{% /tab %}}
{{< /tabs >}}

## Solucionar problemas

Consulta la [documentación sobre cómo solucionar problemas del Agent][3].

## Trabajar con el Agent integrado

El Agent tiene un entorno de Python integrado en `/opt/datadog-agent/embedded/`. Los archivos binarios comunes, como `python` y `pip`, se encuentran dentro de `/opt/datadog-agent/embedded/bin/`.

Si quieres obtener más información, consulta las instrucciones sobre cómo [añadir paquetes al Agent integrado][4].

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=debian
[2]: /es/agent/faq/agent-v6-changes/?tab=linux#service-lifecycle-commands
[3]: /es/agent/troubleshooting/
[4]: /es/developers/guide/custom-python-package/