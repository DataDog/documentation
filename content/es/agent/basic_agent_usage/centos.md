---
algolia:
  tags:
  - desinstalar
  - desinstalando
aliases:
- /es/guides/basic_agent_usage/centos/
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
platform: CentOS
title: Uso básico del Agent para CentOS, Rocky y Alma Linux
---

## Información general

En esta página, se describen las características básicas del Datadog Agent para CentOS y sus derivados, Rocky Linux y Alma Linux. Para instalar el Datadog Agent, sigue las [instrucciones de instalación del Agent][1] para CentOS.

Los paquetes están disponibles para arquitecturas Arm v8 y x86 de 64 bits. Para otras arquitecturas, utiliza la instalación de origen.

**Nota**: CentOS 6 y sus versiones posteriores son compatibles con la arquitectura x86 de 64 bits. CentOS/Rocky/Alma 8 y sus versiones posteriores son compatibles con la arquitectura Arm v8 de 64 bits.

## Comandos

En las versiones 6 y 7 del Agent, el gestor de servicios proporcionado por el sistema operativo es el responsable del ciclo de vida del Agent; sin embargo, para ejecutar otros comandos, hay que hacerlo directamente a través del archivo binario del Agent. En la versión 5 del Agent, por el contrario, casi todo se hace a través del gestor de servicios.

### CentOS 7 y versiones posteriores

| Descripción                        | Comando                                                |
|------------------------------------|--------------------------------------------------------|
| Ejecutar el Agent como servicio           | `sudo systemctl start datadog-agent`                   |
| Detener la ejecución del Agent como servicio    | `sudo systemctl stop datadog-agent`                    |
| Reiniciar la ejecución del Agent como servicio | `sudo systemctl restart datadog-agent`                 |
| Estado del servicio del Agent            | `sudo systemctl status datadog-agent`                  |
| Página de estado del Agent en ejecución       | `sudo datadog-agent status`                            |
| Enviar flare                         | `sudo datadog-agent flare`                             |
| Mostrar el uso de comandos              | `sudo datadog-agent --help`                            |
| Ejecutar un check                        | `sudo -u dd-agent -- datadog-agent check <CHECK_NAME>` |

### CentOS 6

| Descripción                        | Comando                                                |
|------------------------------------|--------------------------------------------------------|
| Ejecutar el Agent como servicio           | `sudo start datadog-agent`                             |
| Detener la ejecución del Agent como servicio    | `sudo stop datadog-agent`                              |
| Reiniciar la ejecución del Agent como servicio | `sudo restart datadog-agent`                           |
| Estado del servicio del Agent            | `sudo status datadog-agent`                            |
| Página de estado del Agent en ejecución       | `sudo datadog-agent status`                            |
| Enviar flare                         | `sudo datadog-agent flare`                             |
| Mostrar el uso de comandos              | `sudo datadog-agent --help`                            |
| Ejecutar un check                        | `sudo -u dd-agent -- datadog-agent check <CHECK_NAME>` |

**Nota**: Si el contenedor `service` no está disponible en tu sistema, utiliza:

* Para sistemas basados en `upstart`: `sudo start/stop/restart/status datadog-agent`
* Para sistemas basados en `systemd`: `sudo systemctl start/stop/restart/status datadog-agent`

## Configuración

Los archivos y carpetas de configuración del Agent se encuentran en:

* `/etc/datadog-agent/datadog.yaml`

Archivos de configuración para [integraciones][4]:

* `/etc/datadog-agent/conf.d/`

## Desinstalar el Agent

Para desinstalar el Agent, ejecuta el siguiente comando:

```shell
sudo yum remove datadog-agent
```

Este comando borra el Agent, pero no elimina:
* El archivo de configuración `datadog.yaml`
* Los archivos que ha creado el usuario en la carpeta de configuración `/etc/datadog-agent`
* Los archivos que ha creado el usuario en la carpeta `/opt/datadog-agent`
* El usuario `dd-agent`
* Archivos de log de Datadog

Si también quieres borrar estos elementos, ejecuta este comando después de eliminar el Agent:

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/datadog-agent/ \
&& sudo rm -rf /var/log/datadog/
```

{{% apm-ssi-uninstall-linux %}}

## Solucionar problemas

Consulta la [documentación sobre cómo solucionar problemas del Agent][2].

## Trabajar con el Agent integrado

El Agent tiene un entorno de Python integrado en `/opt/datadog-agent/embedded/`. Los archivos binarios habituales, como `python` y `pip`, se encuentran dentro de `/opt/datadog-agent/embedded/bin/`.

Si quieres obtener más información, consulta las instrucciones sobre cómo [añadir paquetes al Agent integrado][3].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=centos
[2]: /es/agent/troubleshooting/
[3]: /es/developers/guide/custom-python-package/
[4]: /es/integrations/