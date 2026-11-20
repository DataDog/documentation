---
algolia:
  tags:
  - ecs
aliases:
- /es/agent/amazon_ecs/
description: Instale y configure el Datadog Agent en Amazon Elastic Container Service
further_reading:
- link: https://www.datadoghq.com/blog/ecs-managed-instances
  tag: Blog
  text: Haga un seguimiento de las instancias administradas de ECS con Datadog
- link: /agent/amazon_ecs/logs/
  tag: Documentación
  text: Recopile los registros de su aplicación
- link: /agent/amazon_ecs/apm/
  tag: Documentación
  text: Recopile las trazas de su aplicación
- link: /agent/amazon_ecs/data_collected/#metrics
  tag: Documentación
  text: Recopile métricas de ECS
- link: https://www.datadoghq.com/blog/amazon-ecs-anywhere-monitoring/
  tag: Blog
  text: Anunciamos soporte para Amazon ECS Anywhere
- link: https://www.datadoghq.com/blog/cloud-cost-management-container-support/
  tag: blog
  text: Comprenda su gasto en Kubernetes y ECS con Datadog Cloud Cost Management
- link: https://www.datadoghq.com/blog/ecs-default-monitors/
  tag: Blog
  text: Detecte y solucione problemas de ECS más rápido con monitores predeterminados
    y el Explorador de ECS
- link: https://www.datadoghq.com/architecture/using-datadog-with-ecs-fargate/
  tag: Centro de arquitectura
  text: Uso de Datadog con ECS Fargate
title: Amazon ECS
---
## Descripción general {#overview}

Amazon ECS es un servicio de orquestación de contenedores escalable y de alto rendimiento que admite contenedores Docker. Con el Datadog Agent, puede hacer un seguimiento de contenedores y tareas de ECS en cada instancia EC2 de su clúster.

Para configurar Amazon ECS con Datadog, puede usar **Fleet Automation** o **instalar manualmente**. Si prefiere instalar manualmente, ejecute un contenedor del Datadog Agent por cada servidor de Amazon EC2 creando una definición de tarea del Datadog Agent e implementándola como un servicio daemon. Cada Agent hace un seguimiento de los otros contenedores en su servidor. Consulte la sección [Instalar manualmente](#install-manually) para obtener más detalles.


## Configuración de Fleet Automation {#fleet-automation-setup}
Siga la [guía de instalación in-app en Fleet Automation][32] para completar la configuración en ECS. Después de completar los pasos descritos en la guía in-app, [Fleet Automation][33] genera una definición de tarea o una plantilla de CloudFormation lista para usar, con su clave de API preinyectada.

{{< img src="agent/basic_agent_usage/ecs_install_page.png" alt="Pasos de instalación in-app para el Datadog Agent en ECS." style="width:90%;">}}

<div class="alert alert-info">
Si desea hacer un seguimiento de <strong>ECS en Fargate</strong>, consulte <a href="/integrations/ecs_fargate/">Amazon ECS en AWS Fargate</a>.
</div>

<br>

## Configuración manual {#manual-setup}

Para hacer un seguimiento de sus contenedores y tareas de ECS, implemente el Datadog Agent como un contenedor **una vez en cada instancia EC2** de su clúster de ECS. Puede hacerlo creando una definición de tarea para el contenedor del Datadog Agent e implementándola como un servicio daemon. Cada contenedor del Datadog Agent hace un seguimiento de los otros contenedores en su respectiva instancia EC2.

Las siguientes instrucciones asumen que ha configurado un clúster EC2. Consulte la [documentación de Amazon ECS para crear un clúster][4].

1. [Crear y agregar una definición de tarea de ECS][27]
2. [Programar el Datadog Agent como un servicio daemon][28]
3. (Opcional) [Configurar funciones adicionales del Datadog Agent][29]

**Nota:** [Autodiscovery][5] de Datadog se puede utilizar junto con ECS y Docker para descubrir y hacer un seguimiento automáticamente de las tareas en ejecución en su entorno.

{{% site-region region="gov,gov2" %}}
## FIPS Compliance {#fips-compliance}

Algunos pasos de configuración son diferentes para FIPS Compliance. Tenga en cuenta las instrucciones de configuración específicas en la documentación de [FIPS Compliance][32].

[32]: /es/agent/configuration/fips-compliance/
{{% /site-region %}}

### Crear una definición de tarea de ECS {#create-an-ecs-task-definition}

Esta [definición de tarea de ECS][30] inicia el contenedor del Datadog Agent con las configuraciones necesarias. Cuando necesite modificar la configuración del Datadog Agent, actualice esta definición de tarea y vuelva a implementar el servicio daemon. Puede configurar esta definición de tarea mediante la consola de administración de AWS o con la [AWS CLI][9].

El siguiente ejemplo es una configuración mínima para el seguimiento de la infraestructura central. Sin embargo, se proporcionan ejemplos adicionales de definición de tarea con varias funciones habilitadas en la sección [Configurar funciones adicionales del Datadog Agent](#setup-additional-agent-features) si desea utilizarlos en su lugar.

#### Crear y administrar el archivo de definición de tarea {#create-and-manage-the-task-definition-file}

1. Para contenedores de Linux, descargue [datadog-agent-ecs.json][20].
    - Si utiliza Amazon Linux 1 (AL1, anteriormente Amazon Linux AMI), utilice [datadog-agent-ecs1.json][21]
    - Si utiliza Windows, utilice [datadog-agent-ecs-win.json][22]

   <div class="alert alert-info">
   Estos archivos proporcionan una configuración mínima para el seguimiento de la infraestructura central. Para obtener más archivos de definición de tareas de ejemplo con varias funciones habilitadas, consulte la sección <a href="#set-up-additional-agent-features">Configurar funciones adicionales del Datadog Agent</a> en esta página.
   </div>
2. Edite su archivo de definición de tarea base
    - Establezca la variable de entorno `DD_API_KEY` reemplazando `<YOUR_DATADOG_API_KEY>` con la [clave de Datadog API][14] de su cuenta. Alternativamente, también puede [proporcionar el ARN de un secreto almacenado en AWS Secrets Manager][16].
    - Establezca la variable de entorno `DD_SITE` en su [sitio de Datadog][13]. Su sitio es: {{< region-param key="dd_site" code="true" >}}

      <div class="alert alert-info">
      If <code>DD_SITE</code> is not set, it defaults to the <code>US1</code> site, <code>datadoghq.com</code>.
      </div>
    - Optionally, add a `DD_TAGS` environment variable to specify any additional tags.

3. (Opcional) Para implementar en un [clúster de ECS Anywhere][15], agregue la siguiente línea a su definición de tarea de ECS:
    ```json
    "requiresCompatibilities": ["EXTERNAL"]
    ```

4. (Opcional) Para agregar una verificación de estado del Datadog Agent, agregue la siguiente línea a su definición de tarea de ECS:
    ```json
    "healthCheck": {
      "retries": 3,
      "command": ["CMD-SHELL","agent health"],
      "timeout": 5,
      "interval": 30,
      "startPeriod": 15
    }
    ```


#### Registre la definición de tarea {#register-the-task-definition}

{{< tabs >}}
{{% tab "AWS CLI" %}}
Después de haber creado su archivo de definición de tarea, ejecute el siguiente comando para registrar el archivo en AWS.

```bash
aws ecs register-task-definition --cli-input-json file://<path to datadog-agent-ecs.json>
```
{{% /tab %}}
{{% tab "Interfaz web" %}}
Después de tener su archivo de definición de tarea, utilice la consola de AWS para registrar el archivo.
1. Inicie sesión en su consola de AWS y navegue a la sección de Elastic Container Service.
2. Seleccione {{< ui >}}Task Definitions{{< /ui >}} en el panel de navegación. En el menú {{< ui >}}Create new task definition{{< /ui >}}, seleccione {{< ui >}}Create new task definition with JSON{{< /ui >}}.
3. En el cuadro del editor JSON, pegue el contenido de su archivo de definición de tarea.
4. Seleccione {{< ui >}}Create{{< /ui >}}.

{{% /tab %}}
{{< /tabs >}}


### Ejecute el Agent como un servicio daemon {#run-the-agent-as-a-daemon-service}

Para tener un contenedor del Datadog Agent ejecutándose en cada instancia EC2, ejecute la definición de tarea del Datadog Agent como un [servicio daemon][10].

#### Programe un servicio daemon en AWS utilizando la tarea de ECS de Datadog {#schedule-a-daemon-service-in-aws-using-datadogs-ecs-task}

{{< tabs >}}
{{% tab "AWS CLI" %}}
Utilice AWS CLI para crear un servicio daemon a partir de la definición de tarea registrada en los pasos anteriores:

```bash
aws ecs create-service \
    --cluster <CLUSTER_NAME> \
    --service-name datadog-agent \
    --task-definition <TASK_FAMILY> \
    --scheduling-strategy DAEMON \
    --launch-type EC2 \
    --region <AWS_REGION>
```
{{% /tab %}}
{{% tab "Interfaz web" %}}
1. Inicie sesión en la consola de AWS y navegue a la sección de ECS. En la página {{< ui >}}Clusters{{< /ui >}}, elija el clúster en el que ejecuta el Agent.
2. En la pestaña {{< ui >}}Services{{< /ui >}} de su clúster, seleccione {{< ui >}}Create{{< /ui >}}.
3. Para {{< ui >}}Service name{{< /ui >}}, ingrese `datadog-agent`.
4. En {{< ui >}}Deployment configuration{{< /ui >}}, para {{< ui >}}Service type{{< /ui >}}, seleccione {{< ui >}}Daemon{{< /ui >}}.
5. No necesita configurar el balanceo de carga ni el escalado automático.
6. Haga clic en {{< ui >}}Next Step{{< /ui >}} y luego en {{< ui >}}Create Service{{< /ui >}}.
{{% /tab %}}
{{< /tabs >}}

### Configure funciones adicionales del Agent {#set-up-additional-agent-features}

Los archivos de definición de tarea proporcionados en la sección anterior son mínimos. Estos archivos implementan un contenedor del Agent con una configuración base para recopilar métricas principales sobre los contenedores en su clúster de ECS. El Agent también puede ejecutar integraciones del Agent [basadas en etiquetas de Docker][12] descubiertas en sus contenedores.

Para funciones adicionales:

#### APM {#apm}
Consulte la [documentación de configuración de APM][6] y el ejemplo [datadog-agent-ecs-apm-uds.json][23].

#### Log Management {#log-management}
Consulte la [documentación de recopilación de registros][7] y el ejemplo [datadog-agent-ecs-logs.json][24]

#### DogStatsD {#dogstatsd}

Si está utilizando [DogStatsD][8], edite la definición del contenedor de su Datadog Agent para agregar el mapeo de puerto de servidor para 8125/udp y establezca la variable de entorno `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` en `true`.:

{{< highlight json "hl_lines=6-12 23-24" >}}
{
 "containerDefinitions": [
  {
   "name": "datadog-agent",
   (...)
   "portMappings": [
     {
      "hostPort": 8125,
      "protocol": "udp",
      "containerPort": 8125
     }
   ],
   "environment" : [
     {
       "name": "DD_API_KEY",
       "value": "<YOUR_DATADOG_API_KEY>"
     },
     {
       "name": "DD_SITE",
       "value": "datadoghq.com"
     },
     {
       "name": "DD_DOGSTATSD_NON_LOCAL_TRAFFIC",
       "value": "true"
     }
   ]
  }
 ],
 (...)
}
{{< /highlight >}}

Esta configuración permite que el tráfico de DogStatsD se enrute desde los contenedores de la aplicación, a través del servidor y el puerto del servidor, hacia el contenedor del Datadog Agent. Sin embargo, el contenedor de la aplicación debe utilizar la dirección IP privada del servidor para este tráfico. Puede habilitar esto configurando la variable de entorno `DD_AGENT_HOST` con la dirección IP privada de la instancia EC2, la cual puede obtener del Servicio de Metadatos de Instancia (IMDS). Alternativamente, puede configurar esto en el código durante la inicialización. La implementación para DogStatsD es la misma que para APM. Consulte [Configurar el punto de conexión del Agente de traza][17] para ver ejemplos de cómo configurar el punto de conexión del Agent.

Asegúrese de que la configuración del grupo de seguridad en sus instancias EC2 no exponga públicamente los puertos para APM y DogStatsD.

#### Recopilación de procesos {#process-collection}

Para recopilar información de procesos en vivo para todos sus contenedores y enviarla a Datadog, actualice su definición de tarea con la variable de entorno `DD_PROCESS_AGENT_ENABLED`:

{{< highlight json "hl_lines=16-17" >}}
{
 "containerDefinitions": [
  {
   "name": "datadog-agent",
   (...)
   "environment" : [
     {
       "name": "DD_API_KEY",
       "value": "<YOUR_DATADOG_API_KEY>"
     },
     {
       "name": "DD_SITE",
       "value": "datadoghq.com"
     },
     {
       "name": "DD_PROCESS_AGENT_ENABLED",
       "value": "true"
     }
   ]
  }
 ],
 (...)
}
{{< /highlight >}}

#### Cloud Network Monitoring {#cloud-network-monitoring}

<div class="alert alert-danger">
Esta función solo está disponible para Linux.
</div>

Consulte el archivo de ejemplo [datadog-agent-sysprobe-ecs.json][25].

Si está utilizando Amazon Linux 1 (AL1, anteriormente Amazon Linux AMI), consulte [datadog-agent-sysprobe-ecs1.json][26].

Si ya tiene una definición de tarea, actualice su archivo para incluir la siguiente configuración:

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
#### Network Path {#network-path}

1. Para habilitar [Network Path][31] en sus clústeres de ECS, habilite el módulo de traceroute `system-probe` agregando la siguiente variable de entorno en su archivo `datadog-agent-sysprobe-ecs.json`:

   ```json
      "environment": [
        (...)
        {
          "name": "DD_TRACEROUTE_ENABLED",
          "value": "true"
        }
      ],
   ```

2. Para hacer un seguimiento de rutas individuales, siga las instrucciones aquí para [configurar funciones adicionales del Agent](#set-up-additional-agent-features):

   Estos archivos implementan un contenedor del Agent con una configuración base para recopilar métricas principales sobre los contenedores en su clúster de ECS. El Agent también puede ejecutar integraciones del Agent basadas en etiquetas de Docker descubiertas en sus contenedores.

3. Para hacer un seguimiento de las rutas de tráfico de red y permitir que el Agent descubra y haga un seguimiento automáticamente de las rutas de red basadas en el tráfico real, sin requerir que especifique puntos de conexión manualmente, agregue las siguientes variables de entorno adicionales a su `datadog-agent-sysprobe-ecs.json`:

   ```json
      "environment": [
        (...)
        {
          "name": "DD_NETWORK_PATH_CONNECTIONS_MONITORING_ENABLED",
          "value": "true"
        }
      ],
   ```

4. Opcionalmente, para configurar el número de trabajadores (el valor predeterminado es 4), ajuste la siguiente variable de entorno en su archivo `datadog-agent-sysprobe-ecs.json`:

   ```json
      "environment": [
        (...)
        {
          "name": "DD_NETWORK_PATH_COLLECTOR_WORKERS",
          "value": "10"
        }
      ],
   ```
## Modo AWSVPC {#awsvpc-mode}

Para el Agent v6.10+, el modo `awsvpc` es compatible con contenedores de aplicaciones, siempre que los grupos de seguridad estén configurados para permitir que el grupo de seguridad de la instancia de servidor llegue a los contenedores de aplicaciones en los puertos relevantes.

Puede ejecutar el Agent en `awsvpc` modo, pero Datadog no lo recomienda porque puede ser difícil recuperar la IP de ENI para llegar al Agent para las métricas de DogStatsD y las trazas de APM. En su lugar, ejecute el Agent en modo bridge con mapeo de puertos para permitir una recuperación más sencilla de la [IP del servidor a través del servidor de metadatos][6].

## Solución de problemas {#troubleshooting}

¿Necesita ayuda? Comuníquese con el [soporte de Datadog][11].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[4]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/create-ec2-cluster-console-v2.html
[5]: https://docs.datadoghq.com/es/agent/autodiscovery/
[6]: /es/containers/amazon_ecs/apm/
[7]: /es/containers/amazon_ecs/logs/
[8]: /es/extend/dogstatsd/?tab=containeragent
[9]: https://aws.amazon.com/cli
[10]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html#service_scheduler_daemon
[11]: https://docs.datadoghq.com/es/help/
[12]: https://docs.datadoghq.com/es/containers/docker/integrations/?tab=docker
[13]: /es/getting_started/site/
[14]: https://app.datadoghq.com/organization-settings/api-keys
[15]: https://www.datadoghq.com/blog/amazon-ecs-anywhere-monitoring/
[16]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data-tutorial.html
[17]: /es/containers/amazon_ecs/apm/?tab=ec2metadataendpoint#configure-the-trace-agent-endpoint
[20]: /es/resources/json/datadog-agent-ecs.json
[21]: /es/resources/json/datadog-agent-ecs1.json
[22]: /es/resources/json/datadog-agent-ecs-win.json
[23]: /es/resources/json/datadog-agent-ecs-apm.json
[24]: /es/resources/json/datadog-agent-ecs-logs.json
[25]: /es/resources/json/datadog-agent-sysprobe-ecs.json
[26]: /es/resources/json/datadog-agent-sysprobe-ecs1.json
[27]: #create-an-ecs-task-definition
[28]: #run-the-agent-as-a-daemon-service
[29]: #set-up-additional-agent-features
[30]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html
[31]: /es/network_monitoring/network_path
[32]: https://app.datadoghq.com/fleet/install-agent/latest?platform=ecs
[33]: https://app.datadoghq.com/fleet/install-agent/latest?platform=ecs