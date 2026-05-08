---
algolia:
  tags:
  - ecs
aliases:
- /es/agent/amazon_ecs/
description: Instalar y configurar el Datadog Agent en Amazon Elastic Container Service
further_reading:
- link: /agent/amazon_ecs/logs/
  tag: Documentación
  text: Recopilar tus logs de aplicación
- link: /agent/amazon_ecs/apm/
  tag: Documentación
  text: Recopilar tus trazas (traces) de aplicaciones
- link: /agent/amazon_ecs/data_collected/#metrics
  tag: Documentación
  text: Recopilar métricas de ECS
- link: https://www.datadoghq.com/blog/amazon-ecs-anywhere-monitoring/
  tag: Blog
  text: Anuncio de compatibilidad con Amazon ECS Anywhere
- link: https://www.datadoghq.com/blog/cloud-cost-management-container-support/
  tag: blog
  text: Comprender tus gastos de Kubernetes y ECS con Datadog Cloud Cost Management
- link: https://www.datadoghq.com/architecture/using-datadog-with-ecs-fargate/
  tag: Centro de arquitectura
  text: Uso de Datadog con ECS Fargate
title: Amazon ECS
---

## Información general

Amazon ECS es un servicio escalable de orquestación de contenedores de alto rendimiento compatible con contenedores de Docker. Con el Datadog Agent, puedes monitorizar contenedores y tareas de ECS en cada instancia EC2 de tu clúster.

Para configurar Amazon ECS con Datadog, puedes utilizar **Fleet Automation** o la **instalación manual**. Si prefieres la instalación manual, ejecuta un contenedor del Agent por host de Amazon EC2 creando una definición de tarea del Datadog Agent e implementándola como servicio daemon. A continuación, cada Agent monitoriza los demás contenedores de tu host. Consulta la sección [Instalación manual](#install-manually) para obtener más detalles.


## Configuración de Fleet Automation
Sigue la [guía de instalación de la aplicación en Fleet Automation][32] para completar la configuración en ECS. Tras completar los pasos descritos en la guía de la aplicación, [Fleet Automation][33] genera una definición de tarea o plantilla de CloudFormation lista para usar, con tu clave de API preinyectada.

{{< img src="agent/basic_agent_usage/ecs_install_page.png" alt="Pasos de instalación en la aplicación para el Datadog Agent en ECS." style="width:90%;">}}

<div class="alert alert-info">
Si deseas monitorizar <strong>ECS en Fargate</strong>, consulta <a href="/integrations/ecs_fargate/">Amazon ECS en AWS Fargate</a>.
</div>

<br>

## Configuración manual

Para monitorizar tus contenedores y tareas de ECS, despliega el Datadog Agent como un contenedor **una vez en cada instancia de EC2** en tu clúster de ECS. Para ello, crea una definición de tarea para el contenedor de Datadog Agent y despliégala como servicio daemon. Cada contenedor de Datadog Agent luego monitoriza los otros contenedores en su respectiva instancia de EC2.

Las siguientes instrucciones asumen que has configurado un clúster de EC2. Consulta la [documentación de Amazon ECS para crear un clúster][4].

1. [Crear y añadir una definición de tarea de ECS][27]
2. [Programar el Datadog Agent como servicio daemon][28]
3. (Opcional) [Configurar funciones adicionales de Datadog Agent][29]

**Nota:** Es posible utilizar [Autodiscovery][5] de Datadog junto con ECS y Docker para detectar y monitorizar automáticamente las tareas que se ejecutan en tu entorno.

{{% site-region region="gov" %}}
## Cumplimiento de FIPS

Algunos pasos de configuración son diferentes para el cumplimiento de FIPS. Ten en cuenta las instrucciones de configuración específicas de la documentación [Cumplimiento de FIPS][32].

[32]: /es/agent/configuration/fips-compliance/
{{% /site-region %}}

### Crear una definición de tarea de ECS

Esta [definición de tarea de ECS][30] lanza el contenedor de Datadog Agent con las configuraciones necesarias. Cuando necesites modificar la configuración del Agent, actualiza esta definición de tarea y vuelve a desplegar el servicio daemon. Puedes configurar esta definición de tarea utilizando la consola de administración de AWS, o con la [AWS CLI][9].

El siguiente ejemplo es una configuración mínima para la monitorización de inraestructuras básicas, aunque también tienes más ejemplos de definiciones de tareas con varias funciones activadas en la sección [Configurar las funciones adicionales del Agent](#setup-additional-agent-features) por si quieres usarlas en su lugar.

#### Crear y gestionar el archivo de definición de tareas

1. Para contenedores de Linux, descarga [datadog-agent-ecs.json][20].
    - Si utilizas Amazon Linux 1 (AL1, antes AMI de Amazon Linux), utiliza [datadog-agent-ecs1.json][21].
    - Si utilizas Windows, utiliza [datadog-agent-ecs-win.json][22]

   <div class="alert alert-info">
   These files provide minimal configuration for core infrastructure monitoring. For more sample task definition files with various features enabled, see the <a href="#set-up-additional-agent-features">Set up additional Agent features</a> section on this page.
   </div>
2. Editar el archivo de definición de la tarea base
    - Establece la variable de entorno `DD_API_KEY` sustituyendo `<YOUR_DATADOG_API_KEY>` por la [clave de API de Datadog][14] de tu cuenta. Alternativamente, también puedes [suministrar el ARN de un secreto almacenado en AWS Secrets Manager][16].
    - Establece la variable de entorno `DD_SITE` en tu [sitio de Datadog][13]. Tu sitio es: {{< region-param key="dd_site" code="true" >}}

      <div class="alert alert-info">
      If <code>DD_SITE</code> is not set, it defaults to the <code>US1</code> site, <code>datadoghq.com</code>.
      </div>
    - Opcionalmente, añade una variable de entorno `DD_TAGS` para especificar cualquier etiqueta (tag) adicional.

3. (Opcional) Para desplegar en un [clúster Anywhere de ECS][15], añade la siguiente línea a la definición de tu tarea de ECS:
    ```json
    "requiresCompatibilities": ["EXTERNAL"]
    ```

4. (Opcional) Para añadir un check de estado del Agent, añade la siguiente línea a la definición de tu tarea de ECS:
    ```json
    "healthCheck": {
      "retries": 3,
      "command": ["CMD-SHELL","agent health"],
      "timeout": 5,
      "interval": 30,
      "startPeriod": 15
    }
    ```


#### Registrar la definición de la tarea

{{< tabs >}}
{{% tab "AWS CLI" %}}
Una vez creado el archivo de definición de tareas, ejecuta el siguiente comando para registrar el archivo en AWS.

```bash
aws ecs register-task-definition --cli-input-json file://<path to datadog-agent-ecs.json>
```
{{% /tab %}}
{{% tab "Interfaz de usuario web" %}}
Una vez que tengas tu archivo de definición de tareas, utiliza la consola de AWS para registrar el archivo.
1. Inicia sesión en tu consola de AWS y ve a la sección Elastic Container Service.
2. Selecciona *Task Definitions** (Definiciones de tarea) en el panel de navegación. En el menú **Create new task definition** (Crear nueva definición de tarea), selecciona **Create new task definition with JSON** (Crear nueva definición de tarea con JSON).
3. En el cuadro del editor JSON, pega el contenido de tu archivo de definición de tareas.
4. Selecciona **Create** (Crear).

{{% /tab %}}
{{< /tabs >}}


### Ejecutar el Agent como sevicio daemon

Para tener un contenedor de Datadog Agent ejecutándose en cada instancia de EC2, ejecuta la definición de tarea del Datadog Agent como [servicio daemon][10].

#### Programar un servicio daemon en AWS utilizando la tarea de ECS de Datadog

1. Inicia sesión en la consola de AWS y navega hasta la sección de ECS. En la página **Clusters** (Clústeres), elige el clúster en el que ejecutas el Agent.
2. En la pestaña **Services** (Servicios) del clúster, selecciona **Create** (Crear).
3. En **Deployment configuration** (Configuración de despliegue), para **Service type** (Tipo de servicio), selecciona **Daemon**.
3. No es necesario configurar el balanceo de carga o el escalado automático.
4. Haz clic en **Next Step** (Paso siguiente) y, a continuación, en **Create Service** (Crear servicio).

### Configurar funciones adicionales del Agent 

Los archivos de definición de tareas proporcionados en la sección anterior son mínimos. Estos archivos despliegan un contenedor del Agent con una configuración base para recopilar las métricas centrales sobre los contenedores en tu clúster de ECS. El Agent también puede ejecutar integraciones del Agent [según las etiquetas de Docker][12] descubiertas en tus contenedores.

Para funciones adicionales:

#### APM
Consulta la [documentación de configuración de APM][6] y el ejemplo [datadog-agent-ecs-apm.json][23].

#### Gestión de Logs
Consulta la [documentación de la recopilación de log][7] y el ejemplo [datadog-agent-ecs-logs.json][24]

#### DogStatsD

Si estás utilizando [DogStatsD][8], edita tu definición del contenedor de Datadog Agent para añadir la asignación de puerto de host para 8125/udp y establecer la variable de entorno `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` en `true`..:

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

Esta configuración permite enrutar el tráfico de DogStatsD desde los contenedores de la aplicación, a través del host y los puertos de host, hasta el contenedor de Datadog Agent. Sin embargo, el contenedor de aplicación debe utilizar la dirección IP privada del host para este tráfico. Pueded habilitar esto configurando la variable de entorno `DD_AGENT_HOST` a la dirección IP privada de la instancia de EC2, que puedes recuperar desde Instance Metadata Service (IMDS). Alternativamente, puedes establecer esto en el código durante la inicialización. La implementación para DogStatsD es la misma que para APM. Consulta [Configurar el endpoint del Trace Agent][17] para ejemplos de configuración del endpoint del Agent.

Asegúrate de que la configuración de grupo de seguridad de tus instancias EC2 no exponga públicamente los puertos para APM y DogStatsD.

#### Recopilación de procesos

Para recopilar la información de Live Process de todos tus contenedores y enviarla a Datadog, actualiza tu definición de tarea con la variable de entorno `DD_PROCESS_AGENT_ENABLED`:

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

#### Monitorización de redes en la nube

<div class="alert alert-danger">
Esta función solo está disponible para Linux.
</div>

Consulta el archivo de ejemplo [datadog-agent-sysprobe-ecs.json][25].

Si utilizas Amazon Linux 1 (AL1, antes AMI de Amazon Linux), consulta [datadog-agent-sysprobe-ecs1.json][26].

Si ya dispones de una definición de tarea, actualiza tu archivo para incluir la siguiente configuración:

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
#### Ruta de red

<div class="alert alert-info">Network Path para Datadog Cloud Network Monitoring tiene una disponibilidad limitada. Ponte en contacto con tu representante de Datadog para registrarte.</div>

1. Para habilitar la [ruta de red][31] en tus clústeres de ECS, habilita el módulo `system-probe` traceroute añadiendo la siguiente variable de entorno en tu archivo `datadog-agent-sysprobe-ecs.json`:

   ```json
      "environment": [
        (...)
        {
          "name": "DD_TRACEROUTE_ENABLED",
          "value": "true"
        }
      ],
   ```

2. Para monitorizar rutas individuales, sigue las instrucciones aquí para [configurar características adicionales del Agent](#set-up-additional-agent-features):

   Estos archivos despliegan un contenedor del Agent con una configuración base para recopilar métricas clave sobre los contenedores en tu clúster de ECS. El Agent también puede ejecutar integraciones del Agent según las etiquetas (labels) de Docker detectadas en tus contenedores.

3. Para monitorizar las rutas de tráfico de red y permitir que el Agent detecte automáticamente y monitorice rutas de red según el tráfico de red real, sin necesidad de especificar los endpoints manualmente, añade las siguientes variables adicionales de entorno a tu `datadog-agent-sysprobe-ecs.json`:

   ```json
      "environment": [
        (...)
        {
          "name": "DD_NETWORK_PATH_CONNECTIONS_MONITORING_ENABLED",
          "value": "true"
        }
      ],
   ```

4. Opcionalmente, para configurar el número de trabajadores (por defecto es 4) ajusta la siguiente variable de entorno en tu archivo `datadog-agent-sysprobe-ecs.json`:

   ```json
      "environment": [
        (...)
        {
          "name": "DD_NETWORK_PATH_COLLECTOR_WORKERS",
          "value": "10"
        }
      ],
   ```
## Modo AWSVPC

A partir de la versión 6.10 del Agent, el modo `awsvpc` es compatible para contenedores aplicativos, siempre y cuando los grupos de seguridad estén configurados para permitir que el grupo de seguridad de la instancia de host llegue los contenedores aplicativos en los puertos correspondientes.

Puedes ejecutar el Agent en modo `awsvpc`, pero Datadog no lo recomienda porque puede ser difícil recuperar la IP ENI para llegar al Agent para obtener las métricas de DogStatsD y trazas de APM. En su lugar, ejecuta el Agent en modo puente con una asignación de puertos para permitir una recuperación más fácil de la [IP de host a través del servidor de metadatos][6].

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][11].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[4]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/create-ec2-cluster-console-v2.html
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
[27]: #create-an-ecs-task-definition
[28]: #run-the-agent-as-a-daemon-service
[29]: #set-up-additional-agent-features
[30]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html
[31]: /es/network_monitoring/network_path
[32]: https://app.datadoghq.com/fleet/install-agent/latest?platform=ecs
[33]:https://app.datadoghq.com/fleet/install-agent/latest?platform=ecs