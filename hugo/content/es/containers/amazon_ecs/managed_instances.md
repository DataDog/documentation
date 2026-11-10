---
description: Instale y configure el Datadog Agent en instancias administradas de Amazon
  Elastic Container Service
further_reading:
- link: /agent/amazon_ecs/logs/
  tag: Documentación
  text: Recopile los registros de su aplicación
- link: /agent/amazon_ecs/apm/
  tag: Documentación
  text: Recopile las trazas de su aplicación
- link: /agent/amazon_ecs/data_collected/#metrics
  tag: Documentación
  text: Recopile métricas de ECS
- link: /agent/amazon_ecs/tags/
  tag: Documentación
  text: Asignar etiquetas a todos los datos emitidos por un contenedor
- link: https://www.datadoghq.com/blog/ecs-default-monitors/
  tag: Blog
  text: Detecte y solucione problemas de ECS más rápido con monitores predeterminados
    y el Explorador de ECS
title: Instancias administradas de Amazon ECS
---
Datadog Container Monitoring permite la visibilidad de las aplicaciones que se ejecutan en [instancias administradas de Amazon ECS][29].

### Cómo funciona {#how-it-works}
Para hacer un seguimiento de sus instancias administradas de ECS con Datadog, ejecute el Datadog Agent como una **tarea de demonio**. Una tarea de demonio permite que ECS realice la implementación automáticamente en cada servidor a medida que las instancias administradas se unen a su clúster. Esto permite una visibilidad completa de todos los contenedores en la instancia sin requerir cambios en las definiciones de tareas de su aplicación.

## Configuración {#setup}

<div class="alert alert-info">Esta configuración requiere Datadog Agent 7.77.0+.</div>

Las siguientes instrucciones asumen que ha configurado un clúster de instancias administradas de ECS. Consulte la [documentación de instancias administradas de Amazon ECS para crear un clúster][1].

1. [Cree un archivo de definición de tarea de daemon](#create-a-daemon-task-definition-file)
2. [Registre la definición de la tarea de daemon](#register-the-daemon-task-definition)
3. [Cree el daemon](#create-the-daemon)

### Cree un archivo de definición de tarea de daemon {#create-a-daemon-task-definition-file}

Esta definición de tarea de daemon de ECS inicia el contenedor del Datadog Agent con las configuraciones necesarias.

1. Descargue [datadog-agent-ecs-managed-instances-daemon.json][7]. Este archivo proporciona una configuración mínima para el monitoreo de la infraestructura. Para obtener más archivos de ejemplo de definición de tareas de demonio con varias funciones habilitadas, consulte la sección [Configurar funciones adicionales del Agent][27] en esta página.
2. Modifique el archivo de definición de la tarea de demonio:
    - Establezca la variable de entorno `DD_API_KEY` reemplazando `<YOUR_DATADOG_API_KEY>` con la [clave de Datadog API][5] de su cuenta. Alternativamente, también puede [proporcionar el ARN de un secreto almacenado en AWS Secrets Manager][9].
    - Establezca la variable de entorno `DD_SITE` en su [sitio de Datadog][10]. Su sitio es: {{< region-param key="dd_site" code="true" >}}
3. (Opcional) Para agregar una verificación de estado del Agent, agregue lo siguiente a su definición de tarea de daemon de ECS:
    ```json
    "healthCheck": {
      "retries": 3,
      "command": ["CMD-SHELL","agent health"],
      "timeout": 5,
      "interval": 30,
      "startPeriod": 15
    }
    ```

### Registre la definición de tarea de demonio {#register-the-daemon-task-definition}

{{< tabs >}}
{{% tab "Consola de AWS" %}}

1. Inicie sesión en su [AWS Console][1] y navegue a la sección Elastic Container Service.
2. Seleccione {{< ui >}}Daemon Task Definitions{{< /ui >}} en el panel de navegación. En el menú {{< ui >}}Create new daemon task definition{{< /ui >}}, seleccione {{< ui >}}Create new daemon task definition with JSON{{< /ui >}}.
3. En el cuadro del editor JSON, pegue el contenido de su archivo de definición de tarea de daemon.
4. Seleccione {{< ui >}}Create{{< /ui >}}.

[1]: https://aws.amazon.com/console
{{% /tab %}}

{{% tab "AWS CLI" %}}
Utilice la [AWS CLI][1] para ejecutar el siguiente comando:

```bash
aws ecs register-daemon-task-definition --cli-input-json file://<path to datadog-agent-ecs-managed-instances-daemon.json>
```
[1]: https://aws.amazon.com/cli
{{% /tab %}}
{{< /tabs >}}


### Cree el daemon {#create-the-daemon}

El daemon está asociado a un proveedor de capacidad y se implementa automáticamente en cada instancia administrada de ese proveedor de capacidad.

{{< tabs >}}
{{% tab "Consola de AWS" %}}
1. Inicie sesión en su [consola web de AWS][1] y navegue a la sección Elastic Container Service.
2. Elija el clúster en el que desea ejecutar el Datadog Agent.
3. En la pestaña {{< ui >}}Daemons{{< /ui >}}, haga clic en {{< ui >}}Create{{< /ui >}}.
4. Para {{< ui >}}Daemon Task Definition{{< /ui >}}, seleccione la definición de tarea de daemon creada en los pasos anteriores.
5. Ingrese un {{< ui >}}Daemon name{{< /ui >}}.
6. Para {{< ui >}}Capacity Provider{{< /ui >}}, elija el proveedor de capacidad vinculado al clúster.
7. Complete el resto de los campos opcionales según su preferencia.
8. Haga clic en {{< ui >}}Create{{< /ui >}}.

[1]: https://aws.amazon.com/console
{{% /tab %}}
{{% tab "AWS CLI" %}}
Utilice la [AWS CLI][1] para ejecutar el siguiente comando:

```bash
aws ecs create-daemon \
--daemon-name <DAEMON_NAME> \
--daemon-task-definition-arn <DAEMON_TASK_DEFINITION_ARN> \
--cluster-arn <CLUSTER_ARN> \
--capacity-provider-arns <CAPACITY_PROVIDER_ARN>
```

[1]: https://aws.amazon.com/cli
{{% /tab %}}
{{< /tabs >}}

## Configure funciones adicionales del Datadog Agent {#set-up-additional-datadog-agent-features}

### Recopilación de métricas {#metrics-collection}

Para habilitar las integraciones, agregue anotaciones de etiquetas de Docker a los contenedores de su aplicación en la definición de tarea de ECS.

#### Agregue una integración {#add-an-integration}

##### Actualice la definición de tarea {#update-the-task-definition}

{{< tabs >}}
{{% tab "Consola de AWS" %}}

1. Inicie sesión en su [AWS Web Console][1] y navegue a la sección de ECS.
2. Elija el clúster en el que se está ejecutando su aplicación.
3. Haga clic en la pestaña {{< ui >}}Tasks{{< /ui >}}, luego haga clic en {{< ui >}}Task definition{{< /ui >}} para su aplicación.
4. Haga clic en el botón {{< ui >}}Create new revision{{< /ui >}}.
5. Debajo del contenedor de la aplicación, agregue lo siguiente {{< ui >}}Docker labels{{< /ui >}}:

| Clave                           | Valor                                           |
|-------------------------------|-------------------------------------------------|
| com.datadoghq.ad.instances    | `[{"host": "%%host%%", "port": <PORT_NUMBER>}]` |
| com.datadoghq.ad.check_names  | `["<CHECK_NAME>"]`                              |
| com.datadoghq.ad.init_configs | `[{}]`                                          |

6. Haga clic en el botón {{< ui >}}Update{{< /ui >}}, luego haga clic en el botón {{< ui >}}Create{{< /ui >}}.

[1]: https://aws.amazon.com/console
{{% /tab %}}
{{% tab "AWS CLI" %}}

Agregue `dockerLabels` a su contenedor de aplicación en la definición de tarea JSON, luego registre la nueva revisión usando la [AWS CLI][1]:

```json
{
  "containerDefinitions": [
    {
      "name": "<APP_CONTAINER_NAME>",
      "dockerLabels": {
        "com.datadoghq.ad.instances": "[{\"host\": \"%%host%%\", \"port\": <PORT_NUMBER>}]",
        "com.datadoghq.ad.check_names": "[\"<CHECK_NAME>\"]",
        "com.datadoghq.ad.init_configs": "[{}]"
      }
    }
  ]
}
```

```bash
aws ecs register-task-definition --cli-input-json file://<path-to-task-definition.json>
```

[1]: https://aws.amazon.com/cli
{{% /tab %}}
{{< /tabs >}}

##### Actualice el servicio {#update-the-service}

{{< tabs >}}
{{% tab "Consola de AWS" %}}

1. Dentro del clúster, haga clic en la pestaña {{< ui >}}Services{{< /ui >}}, luego haga clic en {{< ui >}}Service Name{{< /ui >}}.
2. Haga clic en el botón {{< ui >}}Update{{< /ui >}}.
3. Para {{< ui >}}Task Definition{{< /ui >}}, elija el {{< ui >}}Revision{{< /ui >}} más reciente del menú desplegable.
4. Haga clic en el botón {{< ui >}}Update Service{{< /ui >}}.

{{% /tab %}}
{{% tab "AWS CLI" %}}

Utilice la [AWS CLI][1] para actualizar el servicio con la nueva revisión de la definición de tarea:

```bash
aws ecs update-service --cluster <CLUSTER_NAME> \
--service <SERVICE_NAME> \
--task-definition <TASK_DEFINITION_ARN>
```

[1]: https://aws.amazon.com/cli
{{% /tab %}}
{{< /tabs >}}

#### Ejemplos {#examples}

{{< tabs >}}
{{% tab "Consola de AWS" %}}
Utilice la siguiente tabla para ingresar las etiquetas de Docker con la [Consola Web de AWS][1] para un contenedor de Redis:

| Clave                           | Valor                                  |
|-------------------------------|----------------------------------------|
| com.datadoghq.ad.instances    | `[{"host": "%%host%%", "port": 6379}]` |
| com.datadoghq.ad.check_names  | `["redisdb"]`                          |
| com.datadoghq.ad.init_configs | `[{}]`                                 |

[1]: https://aws.amazon.com/console
{{% /tab %}}
{{% tab "AWS CLI" %}}
Utilice el siguiente JSON bajo `containerDefinitions` para configurar un contenedor de Redis con etiquetas de Docker a través de la [AWS CLI][1]:

```json
{
  "name": "redis",
  "image": "redis:latest",
  "essential": true,
  "dockerLabels": {
    "com.datadoghq.ad.instances": "[{\"host\": \"%%host%%\", \"port\": 6379}]",
    "com.datadoghq.ad.check_names": "[\"redisdb\"]",
    "com.datadoghq.ad.init_configs": "[{}]"
  }
}
```

[1]: https://aws.amazon.com/cli
{{% /tab %}}
{{< /tabs >}}

#### Alternativa: monte un archivo de configuración {#alternative-mount-a-configuration-file}

Para proporcionar una configuración de integración personalizada, también puede montar un archivo de configuración directamente en el contenedor de Datadog Agent.

Cree la siguiente estructura de archivos:

```
|- datadog
  |- Dockerfile
  |- conf.d
    |-redis.yaml
```

El archivo `redis.yaml` contiene las configuraciones para la integración de [Redis][28].

{{< code-block lang="yaml" filename="redis.yaml" disable_copy="false" collapsible="true" >}}
ad_identifiers:
  - redis

init_config:

instances:
    - host: %%host%%
      port: 6379
{{< /code-block >}}

El `Dockerfile` se utiliza para crear una imagen del Datadog Agent e incluir el archivo `redis.yaml` en la ubicación correcta:

{{< code-block lang="Dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}}
FROM public.ecr.aws/datadog/agent:latest

COPY conf.d/ /etc/datadog-agent/conf.d/
{{< /code-block >}}

Después de que la imagen se compile y se envíe a un registro de imágenes, haga referencia a la imagen personalizada en la definición de tarea de daemon de ECS:

```
{
    "containerDefinitions": [
        {
            "image": "<registry-domain>/<namespace-or-account>/<repository>:<tag>",
            "name": "datadog-agent",
            ...
        }
    ],
    ...
}
```

### Recopilación de trazas (APM) {#trace-collection-apm}

Instrumente su aplicación según su configuración:

| Idioma                           |
|------------------------------------|
| [Java][17] |
| [Python][18] |
| [Ruby][19] |
| [Go][20] |
| [Node.js][21] |
| [PHP][22] |
| [C++][23] |
| [.NET Core][24] |
| [.NET Framework][25] |

#### UDS {#uds}

El método recomendado es Unix Domain Socket (UDS). El daemon Agent expone su socket en el sistema de archivos del servidor, al cual las tareas de la aplicación acceden montando la misma ruta del servidor.

Consulte el archivo de muestra [datadog-agent-ecs-managed-instances-daemon-apm.json][37] para obtener una definición completa de la tarea del daemon.

**Actualice la definición de la tarea del daemon** para agregar el `dd-sockets` volumen del servidor y el montaje:

```json
{
    "containerDefinitions": [
        {
            "name": "datadog-agent",
            ...
            "mountPoints": [
                ...
                {
                    "containerPath": "/var/run/datadog",
                    "readOnly": false,
                    "sourceVolume": "dd-sockets"
                }
            ]
        }
    ],
    "volumes": [
        ...
        {
            "host": {
                "sourcePath": "/var/run/datadog"
            },
            "name": "dd-sockets"
        }
    ]
}
```

El Agent mantiene archivos de socket en `/var/run/datadog/apm.socket` y `/var/run/datadog/dsd.socket`.

**Actualice cada definición de tarea de aplicación** para montar la misma ruta del servidor y configurar el rastreador:

```json
{
    "containerDefinitions": [
        {
            "name": "<APP_CONTAINER_NAME>",
            ...
            "environment": [
                {
                    "name": "DD_TRACE_AGENT_URL",
                    "value": "unix:///var/run/datadog/apm.socket"
                }
            ],
            "mountPoints": [
                {
                    "containerPath": "/var/run/datadog",
                    "readOnly": true,
                    "sourceVolume": "dd-sockets"
                }
            ]
        }
    ],
    "volumes": [
        {
            "host": {
                "sourcePath": "/var/run/datadog"
            },
            "name": "dd-sockets"
        }
    ]
}
```

### Recopilación de registros {#log-collection}

La recopilación de registros de contenedores a través del Agent no es compatible en modo daemon en instancias administradas de ECS.

Para recopilar registros de contenedores, utilice una de las siguientes alternativas:

- **AWS FireLens**: Configure un sidecar de Fluent Bit en las definiciones de tarea de su aplicación. Consulte la [documentación de recopilación de registros de ECS Fargate][14] para obtener instrucciones de configuración.
- **`awslogs` controlador de registros**: Envíe los registros a Amazon CloudWatch Logs y reenvíelos a Datadog utilizando el [reenviador de Lambda de CloudWatch Logs][30] o un filtro de suscripción.

### Recopilación de procesos {#process-collection}

Para recopilar Live Processes de todos sus contenedores y enviarlos a Datadog, actualice la definición de tarea del daemon con la variable de entorno `DD_PROCESS_AGENT_ENABLED`:

```json
{
    "containerDefinitions": [
        {
            "name": "datadog-agent",
            ...
            "environment": [
                ...
                {
                    "name": "DD_PROCESS_AGENT_ENABLED",
                    "value": "true"
                }
            ]
        }
    ]
}
```

### Cloud Network Monitoring {#cloud-network-monitoring}

<div class="alert alert-danger">
Esta función solo está disponible para Linux.
</div>

Consulte el archivo de ejemplo [datadog-agent-ecs-managed-instances-daemon-sysprobe.json][35] para obtener una definición de tarea de daemon completa.

Actualice su definición de tarea de demonio existente para incluir la siguiente configuración:

```json
{
    "containerDefinitions": [
        {
            "name": "datadog-agent",
            ...
            "environment": [
                ...
                {
                    "name": "DD_SYSTEM_PROBE_NETWORK_ENABLED",
                    "value": "true"
                }
            ],
            "linuxParameters": {
                "capabilities": {
                    "add": [
                        "SYS_ADMIN",
                        "SYS_RESOURCE",
                        "SYS_PTRACE",
                        "NET_ADMIN",
                        "NET_BROADCAST",
                        "NET_RAW",
                        "IPC_LOCK",
                        "CHOWN"
                    ]
                }
            },
            "mountPoints": [
                ...
                {
                    "containerPath": "/sys/kernel/debug",
                    "sourceVolume": "debug",
                    "readOnly": false
                }
            ]
        }
    ],
    "volumes": [
        ...
        {
            "name": "debug",
            "host": {
                "sourcePath": "/sys/kernel/debug"
            }
        }
    ]
}
```

Para obtener más información, consulte la documentación de [Cloud Network Monitoring][36].

## Migrar de la configuración sidecar a la de demonio {#migrate-from-sidecar-to-daemon-setup}

Siga estos pasos para migrar de la implementación sidecar heredada a la implementación de demonio.

### 1. Configure el demonio {#1-set-up-the-daemon}

Siga las instrucciones de [Configuración](#setup) en esta página para crear y registrar una definición de tarea de daemon, luego cree el daemon en su clúster.

### 2. Elimine el sidecar del Datadog Agent de las definiciones de tarea de la aplicación {#2-remove-the-datadog-agent-sidecar-from-application-task-definitions}

Para cada definición de tarea de aplicación que incluya un contenedor sidecar `datadog-agent`, elimine la entrada `datadog-agent` de `containerDefinitions`.

### 3. Actualice la configuración de APM {#3-update-apm-configuration}

El daemon Agent expone su socket de traza en el sistema de archivos del servidor en lugar de a través de un volumen compartido en la tarea. Actualice cada definición de tarea de aplicación para utilizar la ruta del servidor.

**Elimine** el volumen vacío compartido (`"host": {}`) que se utilizaba en la configuración de sidecar y **reemplácelo** por un volumen de ruta del servidor:

```json
{
    "containerDefinitions": [
        {
            "name": "<APP_CONTAINER_NAME>",
            "environment": [
                {
                    "name": "DD_TRACE_AGENT_URL",
                    "value": "unix:///var/run/datadog/apm.socket"
                }
            ],
            "mountPoints": [
                {
                    "containerPath": "/var/run/datadog",
                    "readOnly": true,
                    "sourceVolume": "dd-sockets"
                }
            ]
        }
    ],
    "volumes": [
        {
            "host": {
                "sourcePath": "/var/run/datadog"
            },
            "name": "dd-sockets"
        }
    ]
}
```

Si anteriormente recopilaba trazas a través de UDP (utilizando la dirección `localhost` del sidecar), cambie a UDS utilizando la configuración anterior.

### 4. Actualice la recopilación de procesos {#4-update-process-collection}

La configuración de sidecar utilizaba `pidMode: task` para habilitar la recopilación de procesos. La configuración de daemon utiliza la variable de entorno `DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED` en su lugar.

Elimine el parámetro `pidMode` de las definiciones de tarea de su aplicación. Luego, confirme que la definición de tarea del daemon incluya:

```json
{
    "name": "DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED",
    "value": "true"
}
```

### 5. Registre y despliegue las definiciones de tarea actualizadas {#5-register-and-deploy-the-updated-task-definitions}

Después de completar los cambios anteriores, registre cada definición de tarea de aplicación actualizada y vuelva a desplegar los servicios asociados.

{{< tabs >}}
{{% tab "Consola de AWS" %}}

1. En la consola de AWS, navegue a {{< ui >}}Elastic Container Service{{< /ui >}} > {{< ui >}}Task Definitions{{< /ui >}}.
2. Seleccione su definición de tarea de aplicación y haga clic en {{< ui >}}Create new revision with JSON{{< /ui >}}.
3. Aplique sus cambios y haga clic en {{< ui >}}Create{{< /ui >}}.
4. Navegue al servicio que utiliza esta definición de tarea, haga clic en {{< ui >}}Update{{< /ui >}}, seleccione la nueva revisión y haga clic en {{< ui >}}Update Service{{< /ui >}}.

{{% /tab %}}
{{% tab "AWS CLI" %}}

```bash
aws ecs register-task-definition --cli-input-json file://<path-to-updated-task-definition.json>
aws ecs update-service --cluster <CLUSTER_NAME> --service <SERVICE_NAME> --task-definition <NEW_TASK_DEFINITION_ARN>
```

{{% /tab %}}
{{< /tabs >}}

## Configuración de sidecar (heredada) {#sidecar-setup-legacy}

<div class="alert alert-warning">

La programación de daemon es el método de despliegue recomendado para instancias gestionadas de ECS. Los nuevos despliegues deben utilizar la [configuración de daemon][34] en su lugar.

</div>

En el modelo de despliegue sidecar, el Datadog Agent se ejecuta como un contenedor adicional dentro de cada definición de tarea de aplicación.

### Cree el archivo de definición de tarea {#create-the-task-definition-file}

1. Descargue [datadog-agent-ecs-managed-instances-sidecar.json][31]. Este archivo proporciona una configuración mínima para el monitoreo de la infraestructura.
2. Modifique el archivo de definición de tarea:
    - Establezca la variable de entorno `DD_API_KEY` reemplazando `<YOUR_API_KEY>` con la [clave de Datadog API][5] de su cuenta. Alternativamente, también puede [proporcionar el ARN de un secreto almacenado en AWS Secrets Manager][9].
    - Establezca la variable de entorno `DD_SITE` en su [sitio de Datadog][10]. Su sitio es: {{< region-param key="dd_site" code="true" >}}

### Registre la definición de tarea {#register-the-task-definition}

{{< tabs >}}
{{% tab "Consola de AWS" %}}

1. Inicie sesión en su [AWS Console][1] y navegue a la sección Elastic Container Service.
2. Seleccione {{< ui >}}Task Definitions{{< /ui >}} en el panel de navegación. En el menú {{< ui >}}Create new task definition{{< /ui >}}, seleccione {{< ui >}}Create new task definition with JSON{{< /ui >}}.
3. En el cuadro del editor JSON, pegue el contenido de su archivo de definición de tarea.
4. Seleccione {{< ui >}}Create{{< /ui >}}.

[1]: https://aws.amazon.com/console
{{% /tab %}}

{{% tab "AWS CLI" %}}
Utilice la [AWS CLI][1] para ejecutar el siguiente comando:

```bash
aws ecs register-task-definition --cli-input-json file://<path to datadog-agent-ecs-managed-instances-sidecar.json>
```

[1]: https://aws.amazon.com/cli
{{% /tab %}}
{{< /tabs >}}

### Ejecute la tarea como un servicio de réplica {#run-the-task-as-a-replica-service}

{{< tabs >}}
{{% tab "Consola de AWS" %}}

1. Inicie sesión en su [consola web de AWS][1] y navegue a la sección Elastic Container Service.
2. Elija el clúster en el que desea ejecutar el Datadog Agent.
3. En la pestaña {{< ui >}}Services{{< /ui >}}, haga clic en {{< ui >}}Create{{< /ui >}}.
4. Para {{< ui >}}Task Definition{{< /ui >}}, seleccione la tarea creada en los pasos anteriores.
5. Ingrese un {{< ui >}}Service name{{< /ui >}}.
6. Para {{< ui >}}Launch type{{< /ui >}}, elija {{< ui >}}Capacity Provider{{< /ui >}} y seleccione el proveedor de capacidad de instancia administrada vinculado al clúster.
7. Para {{< ui >}}Number of tasks{{< /ui >}}, ingrese `1`. Haga clic en {{< ui >}}Next step{{< /ui >}}.
8. Complete el resto de los campos opcionales según su preferencia.
9. Haga clic en {{< ui >}}Create service{{< /ui >}}.

[1]: https://aws.amazon.com/console
{{% /tab %}}

{{% tab "AWS CLI" %}}
Utilice la [AWS CLI][1] para ejecutar el siguiente comando:

```bash
aws ecs create-service --cluster <CLUSTER_NAME> \
--service-name <SERVICE_NAME> \
--task-definition <TASK_DEFINITION_ARN> \
--desired-count 1
```

[1]: https://aws.amazon.com/cli
{{% /tab %}}
{{< /tabs >}}

### Recopilación de trazas (APM) {#trace-collection-apm-1}

#### UDP {#udp}

Para recopilar trazas a través de UDP, no establezca `DD_AGENT_HOST`. Mantenga el valor predeterminado de `localhost`.

#### UDS {#uds-1}

Para recopilar trazas a través de UDS:
1. Agregue un volumen vacío a la definición de tarea mediante el parámetro `volumes`.
2. Monte el volumen en el agent y en el contenedor de la aplicación mediante el parámetro `mountPoints`.
3. Configure la variable de entorno `DD_DOGSTATSD_SOCKET` en el contenedor de la aplicación y establézcala en `/var/run/datadog/dsd.socket`.

**Ejemplo**: Definiciones de contenedor que configuran la recopilación de trazas a través de UDS

```json
{
    "containerDefinitions": [
        {
            "image": "public.ecr.aws/datadog/agent:latest",
            "mountPoints": [
                {
                    "containerPath": "/var/run/datadog",
                    "readOnly": false,
                    "sourceVolume": "dd-sockets"
                }
            ],
            "name": "datadog-agent",
            ...
        },
        {
            "environment": [
                {
                    "name": "DD_DOGSTATSD_SOCKET",
                    "value": "/var/run/datadog/dsd.socket"
                }
            ],
            "mountPoints": [
                {
                    "containerPath": "/var/run/datadog",
                    "readOnly": false,
                    "sourceVolume": "dd-sockets"
                }
            ],
            "name": "app",
            ...
        }
    ],
    "volumes": [
        {
            "host": {},
            "name": "dd-sockets"
        }
    ]
}
```

### Recopilación de procesos {#process-collection-1}

Puede hacer un seguimiento de los procesos en instancias administradas de ECS en Datadog mediante la [página de Live Processes][32]. Para habilitar la recopilación de procesos, agregue el [`PidMode`parámetro][33] en la definición de tarea y establézcalo en `task` de la siguiente manera:

```json
"pidMode": "task"
```

## Solución de problemas {#troubleshooting}

¿Necesita ayuda? Comuníquese con el [soporte de Datadog][26].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/getting-started-managed-instances.html
[5]: https://app.datadoghq.com/organization-settings/api-keys
[7]: /es/resources/json/datadog-agent-ecs-managed-instances-daemon.json
[9]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data-tutorial.html
[10]: /es/getting_started/site/
[14]: https://docs.datadoghq.com/es/integrations/ecs_fargate/?tab=awscli#log-collection
[17]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/java?tab=containers#automatic-instrumentation
[18]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/python?tab=containers#instrument-your-application
[19]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#instrument-your-application
[20]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/go/?tab=containers#activate-go-integrations-to-create-spans
[21]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/nodejs?tab=containers#instrument-your-application
[22]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/php?tab=containers#automatic-instrumentation
[23]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/cpp?tab=containers#instrument-your-application
[24]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/dotnet-core?tab=containers#custom-instrumentation
[25]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/dotnet-framework?tab=containers#custom-instrumentation
[26]: https://docs.datadoghq.com/es/help/
[27]: #set-up-additional-datadog-agent-features
[28]: https://docs.datadoghq.com/es/integrations/redis/?tab=ecs
[29]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ManagedInstances.html
[30]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[31]: /es/resources/json/datadog-agent-ecs-managed-instances-sidecar.json
[32]: /es/process
[33]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#task_definition_pidmode
[34]: #setup
[35]: /es/resources/json/datadog-agent-ecs-managed-instances-daemon-sysprobe.json
[36]: /es/network_monitoring/cloud_network_monitoring/
[37]: /es/resources/json/datadog-agent-ecs-managed-instances-daemon-apm.json