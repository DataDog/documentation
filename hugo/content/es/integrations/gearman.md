---
aliases:
- /es/integrations/gearmand
app_id: gearman
categories:
- recopilación de logs
custom_kind: integración
description: Rastrea el número de trabajos en cola y en ejecución, en total o por
  tarea.
integration_version: 5.0.0
media: []
supported_os:
- linux
- macos
title: Gearman
---
## Información general

Recopila métricas de Gearman para:

- Visualizar el rendimiento de Gearman.
- Saber cuántas tareas están en cola o en ejecución.
- Correlacionar el rendimiento de Gearman con el del resto de tus aplicaciones.

## Configuración

### Instalación

El check de Gearman está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que no necesitas instalar nada más en tus servidores de trabajo de Gearman.

### Configuración

{{< tabs >}}

{{% tab "Host" %}}

#### host

Para configurar este check para un Agent que se ejecuta en un host:

1. Edita el archivo `gearmand.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) para empezar a recopilar tus datos de rendimiento de Gearman. Consulta el [gearmand.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/gearmand/datadog_checks/gearmand/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

   ```yaml
   init_config:

   instances:
     - server: localhost
       port: 4730
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent)

{{% /tab %}}

{{% tab "Containerized" %}}

#### En contenedores

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro            | Valor                                  |
| -------------------- | -------------------------------------- |
| `<INTEGRATION_NAME>` | `gearmand`                             |
| `<INIT_CONFIG>`      | en blanco o `{}`                          |
| `<INSTANCE_CONFIG>`  | `{"server":"%%host%%", "port":"4730"}` |

{{% /tab %}}

{{< /tabs >}}

#### Recopilación de logs

1. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent, actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Añade este bloque de configuración a tu archivo `gearmand.d/conf.yaml` para empezar a recopilar tus logs de Gearman:

   ```yaml
   logs:
     - type: file
       path: /var/log/gearmand.log
       source: gearman
   ```

   Cambia el valor del parámetro `path` en función de tu entorno. Consulta el [gearmand.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/gearmand/datadog_checks/gearmand/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

Consulta la [recopilación de logs de Kubernetes](https://docs.datadoghq.com/agent/kubernetes/log/) para obtener información sobre la configuración del Agent para la recopilación de logs en entornos de Kubernetes.

### Validación

[Ejecuta el subcomando `status` del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `gearmand` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gearman.queued** <br>(gauge) | El número total de trabajos en la cola.<br>_Se muestra como tarea_ |
| **gearman.queued_by_task** <br>(gauge) | El número de trabajos en la cola por tarea.<br>_Se muestra como tarea_ |
| **gearman.running** <br>(gauge) | El número total de trabajos de Gearman en ejecución.<br>_Se muestra como tarea_ |
| **gearman.running_by_task** <br>(gauge) | El número de trabajos de Gearman en ejecución por tarea.<br>_Se muestra como tarea_ |
| **gearman.unique_tasks** <br>(gauge) | El número de todas las funciones registradas con Gearman.<br>_Se muestra como tarea_ |
| **gearman.workers** <br>(gauge) | El número total de workers de Gearman capaces.<br>_Se muestra como proceso_ |
| **gearman.workers_by_task** <br>(gauge) | El número de workers de Gearman capaces por tarea.<br>_Se muestra como proceso_ |

### Eventos

El check de Gearman no incluye eventos.

### Checks de servicio

**gearman.can_connect**

Devuelve `CRITICAL` si el check del Agent no puede conectarse a la instancia de Gearman supervisada. En caso contrario, devuelve `OK`.

_Estados: ok, critical_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).