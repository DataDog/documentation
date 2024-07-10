---
aliases:
- /es/guides/basic_agent_usage/source/
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
platform: Origen
title: Uso básico del Agent para la instalación de origen
---
## Información general

En esta página, se describen las funciones básicas del Datadog Agent. Si aún no has instalado el Agent, consulta las instrucciones [en la página sobre la integración del Datadog Agent][1].

Por defecto, tu Agent se instala en su propio entorno de pruebas, ubicado en `~/.datadog-agent`. Puedes mover esta carpeta a cualquier otro lugar con total libertad. Sin embargo, en este artículo se asume que el Agent está instalado en su localización predeterminada, así que asegúrate de adaptar las instrucciones según corresponda si decides moverlo.

## Comandos

El Datadog Agent cuenta con algunos comandos, y solo deben ejecutarse con `sudo` los _comandos del ciclo de vida_, como `start`/`stop`/`restart`/`status`.

{{< tabs >}}
{{% tab "Agent v6 y v7" %}}

| Descripción                   | Comando                                 |
| ----------------------------- | --------------------------------------- |
| Iniciar Agent                   | `sudo ./bin/agent/agent start`          |
| Detener Agent                    | `sudo ./bin/agent/agent  stop`          |
| Página de estado del Agent en ejecución  | `sudo ./bin/agent/agent  info`          |
| Enviar flare                    | `sudo ./bin/agent/agent  flare`         |
| Mostrar el uso de comandos         | `sudo ./bin/agent/agent  help`          |

{{% /tab %}}
{{% tab "Agent v5" %}}

| Descripción                   | Comando                                 |
| ----------------------------- | --------------------------------------- |
| Iniciar Agent                   | `sudo ~/.datadog-agent/bin/agent start` |
| Detener Agent                    | `sudo ~/.datadog-agent/bin/agent stop`  |
| Página de estado del Agent en ejecución  | `sudo ~/.datadog-agent/bin/agent info`  |
| Enviar flare                    | `sudo ~/.datadog-agent/bin/agent flare` |
| Mostrar el uso de comandos         | `sudo ~/.datadog-agent/bin/agent help`  |

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

Los archivos y carpetas de configuración del Agent se encuentran en:

* `/etc/dd-agent/datadog.conf`

Archivos de configuración para las [integraciones][1]:

* `/etc/dd-agent/conf.d/`

[1]: /es/integrations/
{{% /tab %}}
{{< /tabs >}}

## Solucionar problemas

Consulta la [documentación sobre cómo solucionar problemas relacionados con el Agent][2].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=source
[2]: /es/agent/troubleshooting/