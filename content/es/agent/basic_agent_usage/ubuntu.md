---
algolia:
  tags:
  - desinstalar
  - desinstalando
aliases:
- /es/guides/basic_agent_usage/ubuntu/
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
platform: Ubuntu
title: Uso básico del Agent para Ubuntu
---

## Información general

En esta página se describen las características básicas del Datadog Agent para Ubuntu. 

Para instalar el Agent, consulta las [instrucciones de instalación][1]. Los paquetes se encuentran disponibles para arquitecturas Arm v8 y x86 de 64 bits. Para otras arquitecturas, utiliza la instalación de origen.

**Nota**: Las versiones Ubuntu 14.04 y posteriores son compatibles con la arquitectura x86 de 64 bits. Las versiones Ubuntu 16.04 y posteriores son compatibles con la arquitectura Arm v8 de 64 bits.

## Comandos

En las versiones 6 y 7 del Agent, el gestor de servicios proporcionado por el sistema operativo es el responsable del ciclo de vida del Agent; sin embargo, para ejecutar otros comandos, hay que hacerlo directamente a través del archivo binario del Agent. En la versión 5 del Agent, por el contrario, casi todo se hace a través del gestor de servicios.

| Descripción                        | Comando                                                |
|------------------------------------|--------------------------------------------------------|
| Ejecutar el Agent como servicio           | `sudo service datadog-agent start`                     |
| Detener la ejecución del Agent como servicio    | `sudo service datadog-agent stop`                      |
| Reiniciar la ejecución del Agent como servicio | `sudo service datadog-agent restart`                   |
| Estado del servicio del Agent            | `sudo service datadog-agent status`                    |
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

Archivos de configuración para [integraciones][5]:

* `/etc/datadog-agent/conf.d/`

## Desinstalar el Agent

Para desinstalar el Agent, ejecuta el siguiente comando:

```shell
sudo apt-get remove datadog-agent -y
```

Este comando borra el Agent, pero no elimina:

* El archivo de configuración `datadog.yaml`
* Los archivos que ha creado el usuario en la carpeta de configuración `/etc/datadog-agent`
* Los archivos que ha creado el usuario en la carpeta `/opt/datadog-agent`
* El usuario `dd-agent`
* Archivos de log de Datadog

Si también quieres borrar estos elementos, ejecuta este comando después de eliminar el Agent:

```shell
sudo apt-get remove --purge datadog-agent -y
```

{{% apm-ssi-uninstall-linux %}}

## Solucionar problemas

Consulta la [documentación sobre cómo solucionar problemas del Agent][3].

## Trabajar con el Agent integrado

El Agent tiene un entorno de Python integrado en `/opt/datadog-agent/embedded/`. Los archivos binarios habituales, como `python` y `pip`, se encuentran dentro de `/opt/datadog-agent/embedded/bin/`.

Si quieres obtener más información, consulta las instrucciones sobre cómo [añadir paquetes al Agent integrado][4].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=ubuntu
[2]: /es/agent/faq/agent-v6-changes/?tab=linux#service-lifecycle-commands
[3]: /es/agent/troubleshooting/
[4]: /es/developers/guide/custom-python-package/
[5]: /es/integrations/