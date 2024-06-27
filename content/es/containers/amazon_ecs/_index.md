---
algolia:
  tags:
  - ecs
aliases:
- /es/agent/amazon_ecs/
further_reading:
- link: /agent/amazon_ecs/logs/
  tag: Documentación
  text: Recopilar tus logs de aplicación
- link: /agent/amazon_ecs/apm/
  tag: Documentación
  text: Recopilar tus trazas de aplicaciones
- link: /agent/amazon_ecs/data_collected/#metrics
  tag: Documentación
  text: Recopilar métricas de ECS
- link: https://www.datadoghq.com/blog/amazon-ecs-anywhere-monitoring/
  tag: Blog
  text: Anuncio de compatibilidad con Amazon ECS Anywhere
- link: https://www.datadoghq.com/blog/cloud-cost-management-container-support/
  tag: blog
  text: Comprender sus gastos de Kubernetes y ECS con Datadog Cloud Cost Management
kind: documentación
title: Amazon ECS
---

## Información general

Amazon ECS es un servicio escalable de orquestación de contenedores de alto rendimiento compatible con contenedores de Docker. Con el Datadog Agent, puedes monitorizar contenedores y tareas de ECS en cada instancia EC2 de tu clúster.

En esta página se explica la configuración de Amazon ECS con el Agent de contenedores de Datadog. Para otras configuraciones, consulta:

- [Configuración de la versión 5 del Agent de contenedores de Datadog para Amazon ECS][1]
- [Configuración del Agent de host de Datadog con Autodiscovery][2]

**Nota**: Si quieres configurar **ECS en Fargate**, consulta las instrucciones de [Amazon ECS en AWS Fargate][3]. El contenedor del Datadog Agent implementado en instancias EC2 no puede monitorizar tareas de Fargate. Además, AWS Batch no es compatible.

## Configuración

En ECS, el Datadog Agent debe implementarse como contenedor una vez en cada instancia de EC2 de tu clúster de ECS. Para ello, hay que crear una definición de tarea para el contenedor del Datadog Agent e implementarlo como un servicio daemon. A continuación, cada contenedor del Datadog Agent monitoriza los otros contenedores en sus respectivas instancias EC2.

Si no tienes un clúster de EC2 Container Service en funcionamiento, consulta la [sección Empezado de la documentación de ECS][4] para establecer y configurar un clúster. Una vez configurado, sigue las instrucciones que encontrarás a continuación.

1. [Crear y añadir una definición de tarea de ECS](#create-an-ecs-task)
2. [Programar el Datadog Agent como un servicio daemon](#run-the-agent-as-a-daemon-service)
3. **Opcional** [Configurar las funciones adicionales del Datadog Agent](#setup-additional-agent-features)

**Nota:** Es posible utilizar [Autodiscovery][5] de Datadog junto con ECS y Docker para detectar y monitorizar automáticamente las tareas que se ejecutan en tu entorno.

### Crear una tarea de ECS

La definición de tarea inicia el contenedor del Datadog Agent con las configuraciones necesarias. Cuando necesites modificar la configuración del Agent, actualiza esta definición de tarea y vuelve a implementar el servicio daemon como resulte necesario. Puedes configurar la definición de tarea utilizando las [herramientas de interfaz de línea de comandos de AWS][9] o la consola web de Amazon.

El siguiente ejemplo es una configuración mínima para la monitorización de inraestructuras básicas, aunque también tienes más ejemplos de definiciones de tareas con varias funciones activadas en la sección [Configurar las funciones adicionales del Agent](#setup-additional-agent-features) por si quieres usarlas en su lugar.

#### Gestionar el archivo de definición de tarea

1. Para contenedores Linux, descarga [datadog-agent-ecs.json][20]
    1. Si vas a usar una AMI de Amazon Linux 1, utiliza [datadog-agent-ecs1.json][21]
    2. Si usas Windows, utiliza [datadog-agent-ecs-win.json][22]

2. Editar tu archivo de definición de tarea de base
    1. Configura `<YOUR_DATADOG_API_KEY>` con la [clave de API de Datadog][14] para tu cuenta.
    2. Configura la variable de entorno `DD_SITE` en {{< region-param key="dd_site" code="true" >}}

        **Nota**: Si la variable de entorno `DD_SITE` no está configurada explícitamente, se establece de forma predeterminada en el sitio `US` de `datadoghq.com`. Si usas alguno de los otros sitios (`EU`, `US3` o `US1-FED`) y no la configuras, se genera un mensaje de clave de API no válida. Utiliza el [selector de sitio de documentación][13] para ver la documentación correspondiente al sitio que estés usando.

3. Opcionalmente: Añade lo siguiente a tu definición de tarea de ECS para implementar un [clúster de ECS Anywhere][15].
    ```json
    "requiresCompatibilities": ["EXTERNAL"]
    ```

4. Opcionalmente: Añade una comprobación de estado del Agent a tu definición de tarea de ECS
    ```json
    "healthCheck": {
      "retries": 3,
      "command": ["CMD-SHELL","agent health"],
      "timeout": 5,
      "interval": 30,
      "startPeriod": 15
    }
    ```

Para todos estos ejemplos, la variable de entorno `DD_API_KEY` puede también rellenarse haciendo referencia al [ARN de un secreto "Plaintext" (sin formato) almacenado en AWS Secret Manager][16]. Es posible añadir cualquier otra etiqueta adicional utilizando la variable de entorno `DD_TAGS`.

#### Registrar la definición de tarea

{{< tabs >}}
{{% tab "AWS CLI" %}}
Una vez creado tu archivo de definición de tarea, puedes ejecutar el siguiente comando para registrarlo en AWS.

```bash
aws ecs register-task-definition --cli-input-json file://<path to datadog-agent-ecs.json>
```
{{% /tab %}}
{{% tab "Web UI" %}}
Una vez creado tu archivo de definición de tarea, puedes iniciar sesión en tu consola de AWS para registrarlo.
1. Inicia sesión en tu consola de AWS y ve a la sección Elastic Container Service.
2. Haz clic en **Task Definitions** (Definiciones de tarea) en la parte izquierda y haz clic en el botón **Create new Task Definition** (Crear nueva definición de tarea).
3. Selecciona "EC2" como tipo de inicio. También puedes seleccionar "External" (Externo) si planeas implementar la tarea del Agent en un clúster de ECS Anywhere
4. Una vez en la página "Configure task and container definitions" (Configurar definiciones de tarea y contenedor), ve hasta la parte inferior y selecciona **Configure via JSON** (Configurar a través de JSON).
5. Haz clic en **Save** (Guardar) en la pestaña JSON
6. Puedes hacer más cambios desde esta página o repitiendo este proceso **Configure via JSON** (Configurar a través de JSON)
7. Haz clic en **Create** (Crear) abajo para registrar esta definición de tarea

{{% /tab %}}
{{< /tabs >}}


### Ejecutar el Agent como sevicio daemon

Lo ideal es tener un contenedor del Datadog Agent ejecutándose en cada instancia EC2. La forma más fácil de hacerlo es ejecutar la definición de tarea del Datadog Agent como un [servicio daemon][10].

#### Programar un servicio daemon en AWS utilizando la tarea de ECS de Datadog

1. Inicia sesión en la consola de AWS y ve a la sección ECS Clusters (Clústeres de ECS). Haz clic en el clúster en el que ejecutas el Agent.
2. Crea un nuevo servicio haciendo clic en el botón *Create** (Crear) en Services (Servicios).
3. Para el tipo de inicio, selecciona EC2 y luego la definición de tarea creada anteriormente.
4. Para el tipo de servicio, selecciona `DAEMON` e introduce un nombre de servicio. Haz clic en **Next** (Siguiente).
5. Como el servicio se ejecuta una vez en cada instancia, no necesitas un equilibrador de carga. Selecciona None (Ninguno). Haz clic en **Next** (Siguiente).
6. Los servicios de daemon no necesitan escalación automática, así que haz clic en **Next Step**, (Paso siguiente) y, a continuación, en **Create Service** (Crear servicio).

### Configurar funciones adicionales del Agent

La definición de tarea inicial arriba indicada es una definición de tarea bastante mínima e implementa un contenedor del Agent con una configuración de base para recopilar métricas básicas sobre los contenedores de tu clúster de ECS. Este Agent también puede ejecutar integraciones de Agent basadas en [etiquetas de Autodiscovery de Docker][12] detectadas en tus contenedores correspondientes.

Si utilizas:
- APM: Consulta la [documentación de configuración de APM][6] y el [datadog-agent-ecs-apm.json][23] de ejemplo
- Log Management: Consulta la [documentación de recopilación de logs][7] y el [datadog-agent-ecs-logs.json][24] de ejemplo

#### DogStatsD

Si utilizas [DogStatsD][8], añade una asignación de puertos de host para 8125/udp a la definición del contenedor del Datadog Agent:
```json
"portMappings": [
  {
    "hostPort": 8125,
    "protocol": "udp",
    "containerPort": 8125
  }
]
```

Además de esta asignación de puertos, configura la variable de entorno `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` en `true` (verdadero).

Esta configuración permite dirigir el tráfico de DogStatsD desde los contenedores de aplicaciones, a través del host y del puerto de host, hasta el contenedor del Datadog Agent. Sin embargo, el contendor de aplicaciones debe utilizar la dirección IP privada del host para este tráfico. Para ello, configura la variable de entorno `DD_AGENT_HOST` en la dirección IP privada de la instancia EC2, que puede obtenerse desde Instance Metadata Service (IMDS). Otra posibilidad es configurarlo en el código durante la inicialización. La implementación para DogStatsD es la misma que para APM, consulta [Configurar el endpoint del Agent de rastreo][17] para ver ejemplos de configuración del endpoint del Agent.

Asegúrate de que la configuración de grupo de seguridad de tus instancias EC2 no exponga públicamente los puertos para APM y DogStatsD.

#### Recopilación de procesos

El contenedor del Datadog Agent recopila automáticamente datos de Live Container. Para recopilar información de Live Process para todos tus demás contenedores y enviarla a Datadog, actualiza tus definiciones de tarea con la variable de entorno:

```json
{
  "name": "DD_PROCESS_AGENT_ENABLED",
  "value": "true"
}
```

#### Recopilación de Network Performance Monitoring

**Esta función solo está disponible para Linux**

1. Sigue las [instrucciones indicadas anteriormente](#create-an-ecs-task) para instalar el Datadog Agent.
   - Si es la primera vez que realizas la instalación, puedes usar el archivo [datadog-agent-sysprobe-ecs.json][25] ([datadog-agent-sysprobe-ecs1.json][26] si utilizas una AMI de Amazon Linux original), para su uso con las [instrucciones indicadas anteriormente](#managing-the-task-definition-file). **Nota**: la configuración de NPM inicial requiere la interfaz de línea de comandos, ya que no se pueden añadir `linuxParameters` (parámetros de Linux) en la interfaz de usuario de AWS.
2. Si ya tienes una definición de tarea, actualiza tu archivo [datadog-agent-ecs.json][20] ([datadog-agent-ecs1.json][21] si utilizas una AMI de Amazon Linux original) con la siguiente configuración:

 ```json
 {
   "containerDefinitions": [
     (...)
       "mountPoints": [
         (...)
         {
           "containerPath": "/sys/kernel/debug",
           "sourceVolume": "debug"
         },
         (...)
       ],
       "environment": [
         (...)
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
   ],
   "requiresCompatibilities": [
    "EC2"
   ],
   "volumes": [
     (...)
     {
      "host": {
        "sourcePath": "/sys/kernel/debug"
      },
      "name": "debug"
     },
     (...)
   ],
   "family": "datadog-agent-task"
 }
 ```

## Modo AWSVPC

A partir de la versión 6.10 del Agent, el modo `awsvpc` es compatible para contenedores aplicativos, siempre y cuando los grupos de seguridad estén configurados para permitir que el grupo de seguridad de la instancia de host llegue los contenedores aplicativos en los puertos correspondientes.

Aunque es posible ejecutar el Agent en el modo `awsvpc`, no es la configuración recomendada, porque puede ser difícil obtener la IP de ENI para llegar al Agent para métricas de Dogstatsd y trazas de APM.

En su lugar, ejecuta el Agent en el modo bridge con asignación de puertos para que resulte más sencillo obtener la [IP de host a través del servidor de metadatos][6].

{{% site-region region="gov" %}}
#### Proxy de FIPS para entornos de GOVCLOUD

Para enviar datos al centro de datos GOVCLOUD de Datadog, añade el contenedor lateral `fips-proxy` y abre los puertos del contenedor para garantizar una comunicación adecuada para [funciones compatibles](https://docs.datadoghq.com/agent/configuration/agent-fips-proxy/?tab=helmonamazoneks#supported-platforms-and-limitations).

**Nota**: Esta función solo está disponible para Linux.

```json
 {
   "containerDefinitions": [
     (...)
          {
            "name": "fips-proxy",
            "image": "datadog/fips-proxy:1.1.3",
            "portMappings": [
                {
                    "containerPort": 9803,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9804,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9805,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9806,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9807,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9808,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9809,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9810,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9811,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9812,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9813,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9814,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9815,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9816,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9817,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9818,
                    "protocol": "tcp"
                }
            ],
            "essential": true,
            "environment": [
                {
                    "name": "DD_FIPS_PORT_RANGE_START",
                    "value": "9803"
                },
                {
                    "name": "DD_FIPS_LOCAL_ADDRESS",
                    "value": "127.0.0.1"
                }
            ]
        }
   ],
   "family": "datadog-agent-task"
}
```

También debes actualizar las variables entorno del contenedor del Datadog Agent para que sea posible enviar tráfico a través del proxy de FIPS:

```json
{
    "containerDefinitions": [
        {
            "name": "datadog-agent",
            "image": "public.ecr.aws/datadog/agent:latest",
            (...)
            "environment": [
              (...)
                {
                    "name": "DD_FIPS_ENABLED",
                    "value": "true"
                },
                {
                    "name": "DD_FIPS_PORT_RANGE_START",
                    "value": "9803"
                },
                {
                    "name": "DD_FIPS_HTTPS",
                    "value": "false"
                },
             ],
        },
    ],
   "family": "datadog-agent-task"
}
```
{{% /site-region %}}

## Solucionar problemas

¿Necesitas ayuda? Contacta con el [equipo de asistencia de Datadog][11].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/integrations/faq/agent-5-amazon-ecs/
[2]: https://docs.datadoghq.com/es/agent/docker/integrations/?tab=docker
[3]: https://docs.datadoghq.com/es/integrations/ecs_fargate/
[4]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_GetStarted_EC2.html
[5]: https://docs.datadoghq.com/es/agent/autodiscovery/
[6]: /es/containers/amazon_ecs/apm/
[7]: /es/containers/amazon_ecs/logs/
[8]: /es/developers/dogstatsd/?tab=containeragent
[9]: https://aws.amazon.com/cli
[10]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html#service_scheduler_daemon
[11]: https://docs.datadoghq.com/es/help/
[12]: https://docs.datadoghq.com/es/containers/docker/integrations/?tab=docker
[13]: /es/getting_started/site/
[14]: https://app.datadoghq.com/organization-settings/api-keys
[15]: https://www.datadoghq.com/blog/amazon-ecs-anywhere-monitoring/
[16]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data-tutorial.html
[17]: /es/containers/amazon_ecs/apm/?tab=ec2metadataendpoint#configure-the-trace-agent-endpoint
[20]: /resources/json/datadog-agent-ecs.json
[21]: /resources/json/datadog-agent-ecs1.json
[22]: /resources/json/datadog-agent-ecs-win.json
[23]: /resources/json/datadog-agent-ecs-apm.json
[24]: /resources/json/datadog-agent-ecs-logs.json
[25]: /resources/json/datadog-agent-sysprobe-ecs.json
[26]: /resources/json/datadog-agent-sysprobe-ecs1.json
