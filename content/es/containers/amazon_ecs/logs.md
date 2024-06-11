---
aliases:
- /es/agent/amazon_ecs/logs
further_reading:
- link: /agent/amazon_ecs/apm/
  tag: Documentación
  text: Recopilar tus trazas de aplicaciones
- link: /agent/amazon_ecs/data_collected/#metrics
  tag: Documentación
  text: Recopilar métricas de ECS
kind: documentación
title: Recopilación de logs de Amazon ECS
---

## Información general

A partir de la versión 6, el Datadog Agent recopila logs de contenedores. La forma recomendada de recopilar logs desde contenedores de ECS es activar la recopilación de logs en la definición de tarea de tu Agent. Para ello, modifica el [archivo de definición de tarea][7] utilizado anteriormente y [registra tu definición de tarea actualizada][8]. También puedes editar la definición de tarea directamente desde la interfaz de usuario web de Amazon.

Una vez activada, el contenedor del Datadog Agent recopila los logs emitidos desde los otros contenedores de aplicaciones que se encuentran en ese mismo host, lo cual se limita a los logs emitidos en los flujos de logs `stdout` y `stderr` al utilizar el controlador de registro `default` o `json-file`.

- Si tus contenedores crean archivos de logs aislados en *sus* contenedores, debes seguir algunos [pasos más](#log-file-within-a-container) para asegurarte de que el contenedor del Agent tenga visibilidad sobre esos archivos de logs.
- Si tus contenedores utilizan el [controlador de registro `awslogs` para enviar los logs a CloudWatch][9], esos logs no resultarán visibles para el Agent. Para recopilar estos, logs, utiliza una de las [integraciones de recopilación de logs de AWS][10] en su lugar.

## Instalación

### Definición de tarea de ECS

Para recopilar todos los logs de tus contenedores de ECS en ejecución, actualiza tu definición de tarea del Agent de la [configuración de ECS original][11] con las variables de entorno y montajes siguientes.

{{< tabs >}}
{{% tab "Linux" %}}

Utiliza [datadog-agent-ecs-logs.json][1] como un punto de referencia para la configuración de base requerida. Tu definición de tarea debería tener:

  ```json
  {
    "containerDefinitions": [
      {
        (...)
        "mountPoints": [
          (...)
          {
            "containerPath": "/opt/datadog-agent/run",
            "sourceVolume": "pointdir",
            "readOnly": false
          },
          {
            "containerPath": "/var/lib/docker/containers",
            "sourceVolume": "containers_root",
            "readOnly": true
          }
        ],
        "environment": [
          (...)
          {
            "name": "DD_LOGS_ENABLED",
            "value": "true"
          },
          {
            "name": "DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL",
            "value": "true"
          }
        ]
      }
    ],
    "volumes": [
      (...)
      {
        "host": {
          "sourcePath": "/opt/datadog-agent/run"
        },
        "name": "pointdir"
      },
      {
        "host": {
          "sourcePath": "/var/lib/docker/containers/"
        },
        "name": "containers_root"
      }
    ],
    "family": "datadog-agent-task"
  }
  ```

[1]: /resources/json/datadog-agent-ecs-logs.json
{{% /tab %}}
{{% tab "Windows" %}}

Utiliza [datadog-agent-ecs-win-logs.json][1] como un punto de referencia para la configuración de base requerida. Tu definición de tarea debería tener:

  ```json
  {
    "containerDefinitions": [
      {
        (...)
        "mountPoints": [
          (...)
          {
            "containerPath": "C:/programdata/datadog/run",
            "sourceVolume": "pointdir",
            "readOnly": false
          },
          {
            "containerPath": "c:/programdata/docker/containers",
            "sourceVolume": "containers_root",
            "readOnly": true
          }
        ],
        "environment": [
          (...)
          {
            "name": "DD_LOGS_ENABLED",
            "value": "true"
          },
          {
            "name": "DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL",
            "value": "true"
          }
        ]
      }
    ],
    "volumes": [
      (...)
      {
        "name": "pointdir",
        "dockerVolumeConfiguration": {
          "autoprovision": true,
          "scope": "shared",
          "driver": "local"
        }
      },
      {
        "host": {
          "sourcePath": "c:/programdata/docker/containers"
        },
        "name": "containers_root"
      }
    ],
    "family": "datadog-agent-task"
  }
  ```

[1]: /resources/json/datadog-agent-ecs-win-logs.json
{{% /tab %}}
{{< /tabs >}}

Estas definiciones de tarea configuran la variable de entorno`DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true` para recopilar logs de cada contenedor que el Agent detecta. Configura esta variable de entorno en `false` (falso) para recopilar logs únicamente cuando los contenedores tengan [etiquetas de Autodiscovery](#autodiscovery-labels) presentes.

Si tienes un archivo local para tu definición de tarea del Agent, puedes repetir estos pasos para [registrar tu definición de tarea actualizada][8]. Al hacerlo, se te creará una nueva revisión. A continuación, podrás hacer referencia a esta revisión actualizada en el servicio daemon del Datadog Agent.

## Recopilación de logs personalizada

### Etiquetas de Autodiscovery
Si está configurada la variable de entorno`DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true`, el Agent recopila logs desde todos los contenedores que detecta de forma predeterminada. Estos logs recopilados tienen las etiquetas  `service` (servicio) y `source` (fuente) configuradas en el nombre de imagen corto del contenedor en cuestión. Puedes proporcionar etiquetas de Docker en tus contenedores de aplicaciones de ECS para que Autodiscovery personalice la configuración de log que utiliza el Agent para *ese* contenedor.

Puedes consultar las [instrucciones de configuración de recopilación de logs de Docker][12] para obtener información sobre cómo utilizar las configuraciones de Autodiscovery. Por ejemplo, la siguiente configuración de log sobrescribe las etiquetas `source` (fuente) y `service` (servicio) de los logs recopilados.

```json
[{"source": "example-source", "service": "example-service"}]
```

Respecto a ECS, esto se puede añadir a la etiqueta`com.datadoghq.ad.logs` en las `dockerLabels` (etiquetas de Docker) de la definición de tarea del contenedor de aplicaciones que haya emitido esos logs.

```json
{
  "containerDefinitions": [
    {
      "name": "<CONTAINER_NAME>",
      "image": "<CONTAINER_IMAGE>",
      "dockerLabels": {
        "com.datadoghq.ad.logs": "[{\"source\": \"example-source\", \"service\": \"example-service\"}]"
      }
    }
  ]
}
```

Puedes personalizar esto en mayor medida [añadiendo etiquetas a tu configuración de log][4] o cualesquiera `log_processing_rules` (reglas de procesamiento de logs) para [opciones de recopilación de logs avanzadas][5].

### Archivo de log en un contenedor

Docker (con el controlador `default` o `json-file`) expone los flujos de logs `stdout` y `stderr` en un formato que el Agent puede encontrar fácilmente. Sin embargo, si un contenedor crea un archivo de log aislado en su contenedor, el Agent no tendrá visibilidad sobre ese archivo de forma nativa. Datadog recomienda utilizar los flujos de salida `stdout` y `stderr` para aplicaciones contenedorizadas para configurar la recopilación de logs de forma más automática. Si no es posible, puedes proporcionar una configuración de log de Autodiscovery que lleve a la ruta de archivo deseada y asegurarte de que el contendor del Agent y el contenedor de aplicaciones compartan un directorio en el host que contiene el archivo de log.

La siguiente configuración de logs indica al Agent que [recopile este archivo de log personalizado][3] en la ruta`/var/log/example/app.log`.
```json
[{
  "type": "file",
  "path": "/var/log/example/app.log",
  "source": "example-source",
  "service": "example-service"
}]
```

Ejemplo: la siguiente definición de tarea realiza lo siguiente:
* Escribir algunos logs en ese archivo `/var/log/example/app.log`
* Tiene las `dockerLabels` (etiquetas de Docker) presentes para definir la configuración de log
* Tiene los `volumes` (volúmenes) y los `mountPoints` (puntos de montaje) de la ruta de host especificados para este directorio `/var/log/example`

```json
{
  "containerDefinitions": [
    {
      "name": "example-logger",
      "image": "busybox",
      "entryPoint": ["/bin/sh", "-c", "--"],
      "command": ["while true; do sleep 1; echo `date` example file log >> /var/log/example/app.log; done;"],
      "mountPoints": [
        {
          "containerPath": "/var/log/example",
          "sourceVolume": "applogs"
        }
      ],
      "dockerLabels": {
        "com.datadoghq.ad.logs": "[{\"type\":\"file\",\"path\":\"/var/log/example/app.log\",\"source\":\"example-source\",\"service\":\"example-service\"}]"
      }
    }
  ],
  "volumes": [
    {
      "host": {
        "sourcePath": "/var/log/example"
      },
      "name": "applogs"
    }
  ],
  "family": "example-logger"
}
```

Las rutas de archivo de la configuración son siempre relativas al Agent. También deben estar presentes los mismos `volume` (volúmenes) y `mountPoint` (puntos de montaje) en la definición de tarea del Agent para dar visibilidad a ese archivo de log.

Consulta la [documentación sobre montajes de AWS Bind][6] para obtener más detalles sobre la gestión de volúmenes con ECS.

**Nota**: A la hora de utilizar este tipo de configuración con un contendor, los flujos de logs `stdout` y `stderr` no se recopilan automáticamente desde el contenedor, sino solo el archivo. Si es necesario recopilar tanto desde los flujos de contenedor como desde un archivo, actívalo explícitamente en la configuración. Por ejemplo:

```json
[
  {
    "type": "file",
    "path": "/var/log/example/app.log",
    "source": "example-file",
    "service": "example-service"
  },
  {
    "source": "example-stream",
    "service": "example-service"
  }
]
```

## Activar integraciones de logs

El atributo `source` sirve para identificar la integración que usar para cada contenedor. Sobrescríbelo directamente en tus etiquetas de contenedores para empezar a usar las [integraciones de logs de Datadog][2]. Para obtener más información sobre este proceso, lee la [guía de Autodiscovery para logs][1].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/docker/log/?tab=containerinstallation#log-integrations
[2]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[3]: /es/agent/logs/?tab=tailfiles#custom-log-collection
[4]: /es/getting_started/tagging/assigning_tags/?tab=noncontainerizedenvironments#methods-for-assigning-tags
[5]: /es/agent/logs/advanced_log_collection?tab=docker
[6]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/bind-mounts.html
[7]: /es/containers/amazon_ecs/?tab=awscli#managing-the-task-definition-file
[8]: /es/containers/amazon_ecs/?tab=awscli#registering-the-task-definition
[9]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_awslogs.html
[10]: /es/integrations/amazon_web_services/?tab=allpermissions#log-collection
[11]: /es/containers/amazon_ecs/?tab=awscli#setup
[12]: /es/containers/docker/log/?tab=dockerfile#log-integrations