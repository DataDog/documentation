---
aliases:
- /es/guides/basic_agent_usage/amazonlinux/
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
platform: Amazon Linux
title: Uso básico del Agent para Amazon Linux
---

## Información general

En esta página se describen las funciones básicas del Datadog Agent para Amazon Linux. Si aún no has instalado el Agent, consulta las instrucciones en la documentación sobre la [integración del Datadog Agent][1].

Los paquetes están disponibles para arquitecturas x86 de 64 bits y Arm v8. Para otras arquitecturas, utiliza la instalación de origen.

## Comandos

En las versiones 6 y 7 del Agent, el gestor de servicios proporcionado por el sistema operativo es el responsable del ciclo de vida del Agent; sin embargo, para ejecutar otros comandos, hay que hacerlo directamente a través del archivo binario del Agent. En la versión 5 del Agent, por el contrario, casi todo se hace a través del gestor de servicios.

{{< tabs >}}
{{% tab "Agent v6 y v7" %}}

### Amazon Linux 2, Amazon Linux 2022/2023

<div class="alert alert-info">Para instalar Amazon Linux 2022/2023 en las versiones del Agent 6.39/7.39 (o anteriores), es necesario el paquete <code>libxcrypt-compat</code>. Para instalar este paquete, ejecuta:<br/><pre><code>dnf install -y libxcrypt-compat</code></pre></div>

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

### Amazon Linux

| Descripción                        | Comando                                                |
|------------------------------------|--------------------------------------------------------|
| Ejecutar el Agent como servicio           | `sudo start datadog-agent`                             |
| Detener la ejecución del Agent como servicio    | `sudo stop datadog-agent`                              |
| Reiniciar la ejecución del Agent como servicio | `sudo restart datadog-agent`                           |
| Estado del servicio Agent            | `sudo status datadog-agent`                            |
| Página de estado del Agent en ejecución       | `sudo datadog-agent status`                            |
| Enviar flare                         | `sudo datadog-agent flare`                             |
| Mostrar el uso de comandos              | `sudo datadog-agent --help`                            |
| Ejecutar un check                        | `sudo -u dd-agent -- datadog-agent check <CHECK_NAME>` |

{{% /tab %}}
{{% tab "Agent v5" %}}

| Descripción                        | Comando                                           |
|------------------------------------|---------------------------------------------------|
| Ejecutar el Agent como servicio           | `sudo service datadog-agent start`                |
| Detener la ejecución del Agent como servicio    | `sudo service datadog-agent stop`                 |
| Reiniciar la ejecución del Agent como servicio | `sudo service datadog-agent restart`              |
| Estado del servicio Agent            | `sudo service datadog-agent status`               |
| Página de estado del Agent en ejecución       | `sudo service datadog-agent info`                 |
| Enviar flare                         | `sudo service datadog-agent flare`                |
| Mostrar el uso de comandos              | `sudo service datadog-agent`                      |
| Ejecutar un check                        | `sudo -u dd-agent -- dd-agent check <CHECK_NAME>` |

**Nota**: Si el contenedor de servicio `service` no está disponible en tu sistema, utiliza:

* En sistemas basados en `upstart`: `sudo start/stop/restart/status datadog-agent`
* Para sistemas basados en `systemd`: `sudo systemctl start/stop/restart/status datadog-agent`

[Obtén más información sobre los comandos del ciclo de vida del servicio][2]

{{% /tab %}}
{{< /tabs >}}

## Configuración

{{< tabs >}}
{{% tab "Agent v6 y v7" %}}
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
sudo yum remove datadog-agent
```

Este comando borra el Agent, pero no elimina:
* El archivo de configuración `datadog.yaml`
* Los archivos que ha creado el usuario en la carpeta de configuración `/etc/datadog-agent`
* Los archivos que ha creado el usuario en la carpeta `/opt/datadog-agent`
* El usuario `dd-agent`
* Archivos de log de Datadog

Si también quieres eliminar estos elementos, ejecuta este comando después de eliminar el Agent:

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/datadog-agent/ \
&& sudo rm -rf /var/log/datadog/
```
{{% /tab %}}

{{% tab "Agent v5" %}}
```shell
sudo yum remove datadog-agent
```

Este comando borra el Agent, pero no elimina:

* El archivo de configuración `datadog.yaml`
* Los archivos que ha creado el usuario en la carpeta de configuración `/etc/dd-agent`
* Los archivos que ha creado el usuario en la carpeta `/opt/datadog-agent`
* El usuario `dd-agent`
* Archivos de log de Datadog

Si también quieres eliminar estos elementos, ejecuta este comando después de eliminar el Agent:

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```
{{% /tab %}}
{{< /tabs >}}

## Solucionar problemas

Consulta la [documentación sobre cómo solucionar problemas del Agent][2].

## Trabajar con el Agent integrado

El Agent tiene un entorno de Python integrado en `/opt/datadog-agent/embedded/`. Los archivos binarios comunes, como `python` y `pip`, se encuentran dentro de `/opt/datadog-agent/embedded/bin/`.

Si quieres obtener más información, consulta las instrucciones sobre cómo [añadir paquetes al Agent integrado][3].

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=aws
[2]: /es/agent/troubleshooting/
[3]: /es/developers/guide/custom-python-package/