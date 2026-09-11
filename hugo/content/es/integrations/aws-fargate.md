---
aliases:
- /es/integrations/ecs_fargate
app_id: aws-fargate
categories:
- aws
- nube
- rastreo
- red
- orquestación
- aprovisionamiento
- rastreo
custom_kind: integración
description: Seguimiento de las métricas de contenedores que se ejecutan con ECS Fargate
further_reading:
- link: https://www.datadoghq.com/blog/monitor-aws-fargate
  tag: blog
  text: Monitoriza las aplicaciones de ECS en AWS Fargate con Datadog
- link: https://docs.datadoghq.com/integrations/faq/integration-setup-ecs-fargate
  tag: documentación
  text: Configuración de la integración de ECS y Fargate
- link: https://www.datadoghq.com/blog/collect-fargate-logs-with-firelens/
  tag: blog
  text: Monitorización de tus logs de contenedores Fargate con FireLens y Datadog
- link: https://www.datadoghq.com/blog/aws-fargate-metrics/
  tag: blog
  text: Métricas clave para la monitorización de AWS Fargate
- link: https://www.datadoghq.com/blog/tools-for-collecting-aws-fargate-metrics/
  tag: blog
  text: Recopilación de métricas y logs de cargas de trabajo de AWS Fargate
- link: https://www.datadoghq.com/blog/aws-fargate-monitoring-with-datadog/
  tag: blog
  text: Monitorización de AWS Fargate con Datadog
integration_version: 7.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Amazon ECS en AWS Fargate
---
## Información general

<div class="alert alert-warning"> En esta página se describe la integración de ECS Fargate. Para ECS Fargate, consulta la documentación sobre la <a href="http://docs.datadoghq.com/integrations/eks_fargate">integración de EKS Fargate</a> de Datadog.
</div>

Obtén métricas de todos tus contenedores que se ejecutan en ECS Fargate:

- Métricas de límite y uso de CPU/memoria
- Monitoriza tus aplicaciones que se ejecutan en Fargate con las métricas personalizadas o integraciones de Datadog.

El Datadog Agent recupera métricas de contenedores de la definición de tarea con el endpoint de metadatos de tareas ECS. De acuerdo con la [documentación de ECS](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-metadata-endpoint.html) sobre ese endpoint:

- Este endpoint devuelve JSON de estadísticas Docker de contenedores asociados a la tarea. Para obtener más información sobre cada una de las estadísticas devueltas, consulta [Estadísticas de contenedores](https://docs.docker.com/engine/api/v1.30/#operation/ContainerStats) en la documentación de la API Docker.

El endpoint de metadatos de la tarea solo se encuentra disponible desde la propia definición de tarea, por lo que se debe ejecutar el Datadog Agent como un contenedor adicional dentro de cada definición de tarea que se vaya a monitorizar.

La única configuración necesaria para habilitar esta recopilación de métricas es establecer una variable de entorno `ECS_FARGATE` en `"true"` en la definición de tarea.

## Configuración

Los siguientes pasos cubren la configuración del Datadog Container Agent dentro de Amazon ECS Fargate. **Nota: Se necesita la versión 6.1.1 o posterior del Datadog Agent para aprovechar al máximo la integración de Fargate.

Las tareas que no tienen el Datadog Agent aún informan métricas con Cloudwatch, sin embargo, se necesita el Agent para Autodiscovery, las métricas detalladas de los contenedores, el rastreo y más. Asimismo, las métricas de Cloudwatch son menos detalladas y tienen más latencia en los informes que las métricas que se envían directamente a través del Datadog Agent.

### Instalación

<div class="alert alert-info">También puedes monitorizar trabajos de AWS Batch en ECS Fargate. Consulta la <a href="#installation-for-aws-batch">Instalación de AWS Batch</a>.
</div>

Para monitorizar las tareas de ECS Fargate con Datadog, ejecuta el Agent como un contenedor en la **misma definición de tarea** que el contenedor de tu aplicación. Para recopilar métricas con Datadog, cada definición de tarea debe incluir un contenedor del Datadog Agent además de los contenedores de la aplicación. Sigue estos pasos de configuración:

1. **Crear una tarea de ECS Fargate**
1. **Crear o modificar la política de IAM**
1. **Ejecutar la tarea como un servicio de réplica**

#### Crear una tarea de ECS Fargate

La unidad de trabajo principal en Fargate es la tarea, que se configura en la definición de tarea. Una definición de tarea es comparable a un pod en Kubernetes. Una definición de tarea debe contener uno o más contenedores. Para ejecutar el Datadog Agent, crea tu definición de tarea a fin de ejecutar los contenedores de tu aplicación, así como el contenedor del Datadog Agent.

Las siguientes instrucciones muestran cómo configurar la tarea utilizando la [consola de Amazon Web](https://aws.amazon.com/console), [herramientas de la AWS CLI](https://aws.amazon.com/cli) o [AWS CloudFormation](https://aws.amazon.com/cloudformation/).

{{< tabs >}}

{{% tab "Interfaz de usuario web" %}}

##### Definición de tarea de la IU web

{{< site-region region="us,us3,us5,eu,ap1,gov" >}}

1. Inicia sesión en tu [consola de AWS Web](https://aws.amazon.com/console) y ve a la sección ECS.
1. Haz clic en **Task Definitions** (Definiciones de tareas) en el menú de la izquierda, luego haz clic en el botón **Create new Task Definition** (Crear definición de tarea nueva) o elige una definición de tarea de Fargate existente.
1. Para definiciones de tareas nuevas:
   1. Selecciona **Fargate** como tipo de inicio y, a continuación, haz clic en el botón **Next step** (Siguiente paso).
   1. Ingresa un **Task Definition Name** (Nombre de definición de tarea), como `my-app-and-datadog`.
   1. Selecciona un rol de IAM para la ejecución de tareas. A continuación, consulta los requisitos de permisos en la sección [Crear o modificar la política de IAM](#create-or-modify-your-iam-policy).
   1. Elige **Task memory** (Memoria de tarea) y **Task CPU** (CPU de tarea) en función de tus necesidades.
1. Haz clic en el botón **Add container** (Añadir contenedor) para comenzar a añadir el contenedor del Datadog Agent.
   1. Para **Nombre de contenedor** introduce `datadog-agent`.
   1. Para **Imagen** introduce `public.ecr.aws/datadog/agent:latest`.
   1. En **Env Variables** (Variables de entorno), añade la **clave** `DD_API_KEY` e introduce tu [clave de API Datadog](https://app.datadoghq.com/organization-settings/api-keys) como valor.
   1. Añade otra variable de entorno utilizando la **Clave** `ECS_FARGATE` y el valor `true`. Haz clic en **Add** (Añadir) para añadir el contenedor.
   1. Añade otra variable entorno utilizando la **Clave** `DD_SITE` y el valor {{< region-param key="dd_site" code="true" >}}. El valor predeterminado es `datadoghq.com` si no se define.
   1. (Solo Windows) Selecciona `C:\` como directorio de trabajo.
1. Añade tus otros contenedores de aplicaciones a la definición de tarea. Para obtener más información sobre la recopilación de métricas de integraciones, consulta [Configuración de una integración para ECS Fargate](http://docs.datadoghq.com/integrations/faq/integration-setup-ecs-fargate).
1. Haz clic en **Create** (Crear) para crear la definición de tarea.

{{< /site-region >}}

{{% /tab %}}

{{% tab "AWS CLI" %}}

##### Definición de tarea de la AWS CLI

1. Descarga [datadog-agent-ecs-fargate.json](https://docs.datadoghq.com/resources/json/datadog-agent-ecs-fargate.json). **Nota**: Si utilizas Internet Explorer, es posible que se descargue como un archivo gzip, que contiene el archivo JSON mencionado a continuación.

{{< site-region region="us,us3,us5,eu,ap1,gov" >}}
2\. Actualiza tu archivo JSON con un `TASK_NAME`, tu [clave de API Datadog](https://app.datadoghq.com/organization-settings/api-keys) y el `DD_SITE` ({{< region-param key="dd_site" code="true" >}}) correspondiente. **Nota**: La variable de entorno `ECS_FARGATE` ya está configurada como `"true"`.

{{< /site-region >}}

3. Añade tus otros contenedores de aplicaciones a la definición de tarea. Para obtener más información sobre la recopilación de métricas de integraciones, consulta [Configuración de una integración para ECS Fargate](http://docs.datadoghq.com/integrations/faq/integration-setup-ecs-fargate).

1. De manera opcional, añade un check de estado del Agent.

   Añade lo siguiente a tu definición de tarea de ECS para crear un check de estado del Agent:

   ```json
   "healthCheck": {
     "retries": 3,
     "command": ["CMD-SHELL","agent health"],
     "timeout": 5,
     "interval": 30,
     "startPeriod": 15
   }
   ```

1. Ejecuta el siguiente comando para registrar la definición de tarea de ECS:

```bash
aws ecs register-task-definition --cli-input-json file://<PATH_TO_FILE>/datadog-agent-ecs-fargate.json
```

{{% /tab %}}

{{% tab "CloudFormation" %}}

##### Definición de tarea de AWS CloudFormation

Puedes utilizar la plantilla DE [AWS CloudFormation](https://aws.amazon.com/cloudformation/) para configurar tus contenedores de Fargate. Utiliza el recurso `AWS::ECS::TaskDefinition` en tu plantilla de CloudFormation para configurar la tarea de Amazon ECS y especifica `FARGATE` como el tipo de inicio necesario para esa tarea.

{{< site-region region="us,us3,us5,eu,ap1,gov" >}}
Actualiza la plantilla de CloudFormation a continuación con tu [clave de API Datadog](https://app.datadoghq.com/organization-settings/api-keys). Además, incluye la variable de entorno `DD_SITE` ({{< region-param key="dd_site" code="true" >}}) correspondiente, si es necesario, ya que si no la configuras por defecto queda `datadoghq.com`.

{{< /site-region >}}

```yaml
Resources:
  ECSTaskDefinition:
    Type: 'AWS::ECS::TaskDefinition'
    Properties:
      NetworkMode: awsvpc
      RequiresCompatibilities:
        - FARGATE
      Cpu: 256
      Memory: 512
      ContainerDefinitions:
        - Name: datadog-agent
          Image: 'public.ecr.aws/datadog/agent:latest'
          Environment:
            - Name: DD_API_KEY
              Value: <DATADOG_API_KEY>
            - Name: ECS_FARGATE
              Value: true
```

Por último, incluye otros contenedores de aplicaciones dentro de `ContainerDefinitions` y despliégalos a través de CloudFormation.

Para obtener más información sobre las plantillas y la sintaxis de CloudFormation, consulta la [documentación sobre la definición de tareas de AWS CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecs-taskdefinition.html).

{{% /tab %}}

{{% tab "CDK" %}}

##### Definición de tarea de Datadog CDK

Puedes utilizar [constructos de Datadog CDK](https://github.com/datadog/datadog-cdk-constructs/) para configurar tu definición de tarea de ECS Fargate. Utiliza el constructo `DatadogECSFargate` para instrumentar tus contenedores para las funciones Datadog deseadas. Esto es compatible con TypeScript, JavaScript, Python y Go.

{{< site-region region="us,us3,us5,eu,ap1,gov" >}}
Actualiza la definición del constructo a continuación con tu [clave de API Datadog](https://app.datadoghq.com/organization-settings/api-keys). Además, incluye la propiedad `DD_SITE` ({{< region-param key="dd_site" code="true" >}}) correspondiente, si es necesario, ya que si no la configuras queda `datadoghq.com` por defecto.

{{< /site-region >}}

```typescript
const ecsDatadog = new DatadogECSFargate({
  apiKey: <DATADOG_API_KEY>
  site: <DATADOG_SITE>
});
```

A continuación, define tu tarea con [`FargateTaskDefinitionProps`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ecs.FargateTaskDefinitionProps.html).

```typescript
const fargateTaskDefinition = ecsDatadog.fargateTaskDefinition(
  this,
  <TASK_ID>,
  <FARGATE_TASK_DEFINITION_PROPS>
);
```

Por último, incluye tus otros contenedores de aplicaciones añadiendo tus [`ContainerDefinitionOptions`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ecs.ContainerDefinitionOptions.html).

```typescript
fargateTaskDefinition.addContainer(<CONTAINER_ID>, <CONTAINER_DEFINITION_OPTIONS>);
```

Para obtener más información sobre la instrumentación y la sintaxis del constructo `DatadogECSFargate`, consulta la [documentación sobre el CDK de ECS Fargate en Datadog](https://github.com/DataDog/datadog-cdk-constructs/blob/main/src/ecs/fargate/README.md).

{{% /tab %}}

{{% tab "Terraform" %}}

##### Definición de tarea de Datadog Terraform

Puedes utilizar el [módulo Terraform de ECS Fargate en Datadog](https://registry.terraform.io/modules/DataDog/ecs-datadog/aws/latest) para configurar tus contenedores para Datadog. Este módulo Terraform envuelve el recurso [`aws_ecs_task_definition`](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ecs_task_definition) e instrumenta automáticamente tu definición de tarea para Datadog. Introduce tus argumentos de entrada en el módulo Terraform de ECS Fargate en Datadog, de forma similar a como lo harías en la `aws_ecs_task_definition`. Asegúrate de incluir tus tareas `family` y `container_definitions`.

{{< site-region region="us,us3,us5,eu,ap1,gov" >}}
Actualiza el módulo Terraform a continuación con tu [clave de API Datadog](https://app.datadoghq.com/organization-settings/api-keys). Además, incluye la variable de entorno `DD_SITE` ({{< region-param key="dd_site" code="true" >}}) correspondiente, si es necesario, ya que si no la configuras queda `datadoghq.com` por defecto.

{{< /site-region >}}

```hcl
module "ecs_fargate_task" {
  source  = "DataDog/ecs-datadog/aws//modules/ecs_fargate"
  version = "1.0.0"

  # Configure Datadog
  dd_api_key = <DATADOG_API_KEY>
  dd_site    = <DATADOG_SITE>
  dd_dogstatsd = {
    enabled = true,
  }
  dd_apm = {
    enabled = true,
  }

  # Configure Task Definition
  family                   = <TASK_FAMILY>
  container_definitions    = <CONTAINER_DEFINITIONS>
  cpu                      = 256
  memory                   = 512
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
}
```

Por último, incluye otros contenedores de aplicaciones dentro de `ContainerDefinitions` y despliégalos a través de Terraform.

Para obtener más información sobre el módulo Terraform, consulta la [documentación sobre Terraform ECS Fargate en Datadog](https://registry.terraform.io/modules/DataDog/ecs-datadog/aws/latest/submodules/ecs_fargate).

{{% /tab %}}

{{< /tabs >}}

#### Ejecutar la tarea como un servicio de réplica

La única opción en ECS Fargate es ejecutar la tarea como un [servicio de réplica](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html#service_scheduler_replica). El Datadog Agent se ejecuta en la misma definición de tarea que tus contenedores de aplicaciones e integraciones.

{{< tabs >}}

{{% tab "Interfaz de usuario web" %}}

##### Servicio de réplica de la IU web

1. Inicia sesión en tu [consola de AWS Web](https://aws.amazon.com/console) y ve a la sección ECS. Si es necesario, crea un clúster con la plantilla de clúster **Networking only** (Solo redes).
1. Elige el clúster para ejecutar el Datadog Agent.
1. En la pestaña **Services** (Servicios), haz clic en el botón **Create** (Crear).
1. En **Launch type** (Tipo de inicio), elige **FARGATE**.
1. En **Task Definition** (Definición de tarea), selecciona la tarea que se creó en los pasos anteriores.
1. Ingresa un **Service name** (Nombre de servicio).
1. En **Number of tasks** (Número de tareas) ingresa `1` y, a continuación, haz clic en el botón **Next step** (Siguiente paso).
1. Selecciona la **Cluster VPC** (VPC del clúster), **Subnets** (Subredes), and **Security Groups** (Grupos de seguridad).
1. El **Load balancing** (Equilibrio de carga) y **Service discovery** (Descubrimiento de servicios) son opcionales en función de tus preferencias.
1. Haz clic en el botón **Next step** (Siguiente paso).
1. El **Auto Scaling** (Escalado automático) es opcional en función de tus preferencias.
1. Haz clic en el botón **Next step** (Siguiente paso) y, a continuación, en el botón **Create service** (Crear servicio).

{{% /tab %}}

{{% tab "AWS CLI" %}}

##### Servicio de réplica de la AWS CLI

Ejecuta los siguientes comandos con las [herramientas de la AWS CLI](https://aws.amazon.com/cli).

**Nota**: Se requiere la versión 1.1.0, o una posterior, de Fargate, por lo que el siguiente comando especifica la versión de la plataforma.

Si es necesario, crea un clúster:

```bash
aws ecs create-cluster --cluster-name "<CLUSTER_NAME>"
```

Ejecuta la tarea como un servicio para tu clúster:

```bash
aws ecs run-task --cluster <CLUSTER_NAME> \
--network-configuration "awsvpcConfiguration={subnets=["<PRIVATE_SUBNET>"],securityGroups=["<SECURITY_GROUP>"]}" \
--task-definition arn:aws:ecs:us-east-1:<AWS_ACCOUNT_NUMBER>:task-definition/<TASK_NAME>:1 \
--region <AWS_REGION> --launch-type FARGATE --platform-version 1.4.0
```

{{% /tab %}}

{{% tab "CloudFormation" %}}

##### Servicio de réplica de AWS CloudFormation

En la plantilla de CloudFormation, puedes hacer referencia al recurso `ECSTaskDefinition` que se creó en el ejemplo anterior en el recurso `AWS::ECS::Service` que se está creando. Después de esto, especifica tu `Cluster`, `DesiredCount` y cualquier otro parámetro necesario para la aplicación en tu servicio de réplica.

```yaml
Resources:
  ECSTaskDefinition:
    #(...)
  ECSService:
    Type: 'AWS::ECS::Service'
    Properties:
      Cluster: <CLUSTER_NAME>
      TaskDefinition:
        Ref: "ECSTaskDefinition"
      DesiredCount: 1
      #(...)
```

Para obtener más información sobre las plantillas y la sintaxis de CloudFormation, consulta la [documentación sobre el servicio ECS de AWS CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecs-service.html).

{{% /tab %}}

{{% tab "CDK" %}}

##### Servicio de réplica AWS CDK

En el código del CDK puedes hacer referencia al recurso `fargateTaskDefinition` creado en el ejemplo anterior en el recurso `FargateService` que se está creando. Después de esto, especifica tu `Cluster`, `DesiredCount`, y cualquier otro parámetro necesario para tu aplicación en tu servicio de réplica.

```typescript
const service = new ecs.FargateService(this, <SERVICE_ID>, {
  <CLUSTER>,
  fargateTaskDefinition,
  desiredCount: 1
});
```

Para obtener más información sobre el constructo y la sintaxis del servicio CDK ECS, consulta la [documentación de AWS sobre el servicio CDK ECS](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ecs.FargateService.html).

{{% /tab %}}

{{% tab "Terraform" %}}

##### Servicio de réplica de AWS Terraform

En el código de Terraform puedes hacer referencia al recurso `aws_ecs_task_definition` creado en el ejemplo anterior dentro del recurso `aws_ecs_service` que se está creando. A continuación, especifica tu `Cluster`, `DesiredCount`, y cualquier otro parámetro necesario para tu aplicación en tu servicio de réplica.

```hcl
resource "aws_ecs_service" <SERVICE_ID> {
  name            = <SERVICE_NAME>
  cluster         = <CLUSTER_ID>
  task_definition = module.ecs_fargate_task.arn
  desired_count   = 1
}
```

Para obtener más información sobre el módulo del servicio Terraform ECS y su sintaxis, consulta la [documentación de AWS sobre el servicio Terraform ECS](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ecs_service).

{{% /tab %}}

{{< /tabs >}}

Para proporcionar tu clave de API de Datadog como un secreto, consulta [Uso de secretos](#using-secrets).

#### Instalación para AWS Batch

Para monitorizar tus trabajos de AWS Batch con Datadog, consulta [AWS Batch con ECS Fargate y el Datadog Agent](https://docs.datadoghq.com/containers/guide/aws-batch-ecs-fargate).

#### Crear o modificar la política de IAM

Añade los siguientes permisos obligatorios a tu [política IAM de Datadog](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) para poder recopilar métricas de ECS Fargate. Para obtener más información, consulta las [políticas de EC2](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_ecs.html) en el sitio web de AWS.

| Permiso de AWS                   | Descripción                                                       |
| -------------------------------- | ----------------------------------------------------------------- |
| `ecs:ListClusters`               | Enumera los clústeres disponibles.                                          |
| `ecs:ListContainerInstances`     | Enumera las instancias de un clúster.                                      |
| `ecs:DescribeContainerInstances` | Describe instancias para añadir métricas sobre recursos y tareas en ejecución. |

#### Uso de los secretos

En lugar de rellenar la variable de entorno `DD_API_KEY` con tu clave de API en texto plano, puedes hacer referencia al [ARN de un secreto en texto plano almacenado en AWS Secrets Manager](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data-tutorial.html). Coloca la variable de entorno `DD_API_KEY` en la sección `containerDefinitions.secrets` del archivo de definición de la tarea o trabajo. Asegúrate de que el rol de ejecución de la tarea/trabajo tiene el permiso necesario para recuperar secretos de AWS Secrets Manager.

### Recopilación de métricas

Después de configurar el Datadog Agent como se ha descrito anteriormente, [ecs_fargate check](https://github.com/DataDog/integrations-core/blob/master/ecs_fargate/datadog_checks/ecs_fargate/data/conf.yaml.example) recopila métricas con la detección automática activada. Añade etiquetas (labels) Docker a tus otros contenedores en la misma tarea para recopilar métricas adicionales.

Si bien la integración funciona en Linux y Windows, algunas métricas dependen del sistema operativo. Todas las métricas expuestas cuando se ejecuta en Windows también se exponen en Linux, pero hay algunas métricas que solo se encuentran disponibles en Linux. Consulta [Datos recopilados](#data-collected) para ver la lista de métricas que proporciona esta integración. En la lista también se especifica qué métricas solo son para Linux.

Para obtener más información sobre la recopilación de métricas de integraciones, consulta [Configuración de una integración para ECS Fargate](http://docs.datadoghq.com/integrations/faq/integration-setup-ecs-fargate).

#### DogStatsD

Las métricas se recopilan con [DogStatsD](https://docs.datadoghq.com/developers/dogstatsd/) a través del puerto UDP 8125.

#### Otras variables de entorno

Para conocer las variables de entorno disponibles con el contenedor del Docker Agent, consulta la página [Docker Agent](https://docs.datadoghq.com/agent/docker/#environment-variables). **Nota**: Algunas variables no se encuentran disponibles para Fargate.

| Variable de entorno               | Descripción                                    |
|------------------------------------|------------------------------------------------|
| `DD_TAGS`                          | Añade etiquetas (tags). Por ejemplo: `key1:value1 key2:value2`. |
| `DD_DOCKER_LABELS_AS_TAGS`         | Extrae etiquetas (labels) de contenedores de Docker                |
| `DD_CHECKS_TAG_CARDINALITY`        | Añadir etiquetas (tags) a las métricas de checks                      |
| `DD_DOGSTATSD_TAG_CARDINALITY`     | Añadir etiquetas (tags) a las métricas personalizadas                     |

Para el etiquetado global, se recomienda utilizar `DD_DOCKER_LABELS_AS_TAGS`. Con este método, el Agent extrae etiquetas (tags) a partir de las etiquetas (labels) de tu contenedor. Esto requiere que añadas las etiquetas (labels) apropiadas a tus otros contenedores. Las etiquetas (labels) pueden añadirse directamente en la [definición de tarea](https://docs.aws.amazon.com/AmazonECS/latest/userguide/task_definition_parameters.html#container_definition_labels).

Formato para el contenedor del Agent:

```json
{
  "name": "DD_DOCKER_LABELS_AS_TAGS",
  "value": "{\"<LABEL_NAME_TO_COLLECT>\":\"<TAG_KEY_FOR_DATADOG>\"}"
}
```

Ejemplo para el contenedor del Agent:

```json
{
  "name": "DD_DOCKER_LABELS_AS_TAGS",
  "value": "{\"com.docker.compose.service\":\"service_name\"}"
}
```

Ejemplo de CloudFormation (YAML):

```yaml
      ContainerDefinitions:
        - #(...)
          Environment:
            - Name: DD_DOCKER_LABELS_AS_TAGS
              Value: "{\"com.docker.compose.service\":\"service_name\"}"
```

**Nota**: No debes usar `DD_HOSTNAME`, ya que no existe el concepto de host para el usuario en Fargate. El uso de esta etiqueta (tag) puede hacer que tus tareas aparezcan como hosts de APM en la lista de infraestructura, lo que podría afectar tu facturación. En su lugar, tradicionalmente se usa `DD_TAGS` para asignar etiquetas de host. A partir de la versión 6.13.0 del Datadog Agent, también puedes usar la variable de entorno `DD_TAGS` para establecer etiquetas globales en tus métricas de integración.

### Métricas basadas en rastreadores

Además de las métricas recopiladas por el Datadog Agent, Datadog tiene una integración ECS basada en CloudWatch. Esta integración recopila las [métricas de Amazon ECS CloudWatch ](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cloudwatch-metrics.html).

Como se indica allí, las tareas de Fargate también informan métricas de esta manera:

> Las métricas disponibles dependerán del tipo de inicio de las tareas y los servicios en tus clústeres o trabajos por lotes. Si usas el tipo de inicio de Fargate para tus servicios, se proporcionarán métricas de uso de CPU y memoria a fin de ayudar en la monitorización de tus servicios.

Debido a que este método no utiliza el Datadog Agent, debes configurar la integración AWS marcando **ECS** en el cuadro de la integración. Luego, Datadog extrae estas métricas de CloudWatch (con el espacio de nombres `aws.ecs.*` en Datadog) en tu nombre. Consulta la sección [Datos recopilados](https://docs.datadoghq.com/integrations/amazon_ecs/#data-collected) de la documentación.

Si estas son las únicas métricas que necesitas, puedes confiar en esta integración para la recopilación mediante métricas de CloudWatch. **Nota**: Los datos de CloudWatch son menos detallados (entre 1 y 5 minutos, en función del tipo de monitorización que hayas habilitado) y se demoran en enviarse a Datadog. Esto se debe a que la recopilación de datos de CloudWatch debe cumplir con los límites de la API de AWS, en lugar de enviarlos a Datadog con el Agent.

El rastreador CloudWatch por defecto de Datadog sondea las métricas una vez cada 10 minutos. Si necesitas un cronograma de rastreo más rápido, ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/) para ver la disponibilidad. **Nota**: Hay aumentos de costes del lado de AWS, ya que CloudWatch factura las llamadas a la API.

### Recopilación de logs

Puedes monitorizar los logs de Fargate mediante:

- La integración de AWS FireLens basada en el complemento de salida Fluent Bit de Datadog para enviar logs directamente a Datadog
- El uso del controlador de logs `awslogs` para almacenar los logs en un grupo de logs de CloudWatch y luego una función de Lambda a fin de enrutar los logs a Datadog

Datadog recomienda utilizar AWS FireLens por las siguientes razones:

- Puedes configurar Fluent Bit directamente en tus tareas de Fargate.
- El complemento de salida Fluent Bit de Datadog proporciona un etiquetado adicional de los logs. El [ECS Explorer](https://docs.datadoghq.com/infrastructure/containers/amazon_elastic_container_explorer) utiliza las etiquetas (tags) para correlacionar logs con recursos ECS.

**Nota**: La recopilación de logs con Fluent Bit y FireLens no es compatible con AWS Batch en ECS Fargate.

#### Fluent Bit y FireLens

Configura la integración de AWS FireLens basada en el complemento de salida Fluent Bit de Datadog para conectar tus datos de logs monitorizados por FireLens log a Datadog Logs. Puedes encontrar un [ejemplo de definición de tarea para esta configuración aquí](https://github.com/aws-samples/amazon-ecs-firelens-examples/tree/mainline/examples/fluent-bit/datadog).

1. Añade el contenedor del enrutador de logs Fluent Bit FireLens en tu tarea de Fargate existente. Para obtener más información sobre cómo activar FireLens, consulta los [documentos específicos de AWS Firelens](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_firelens.html). Para obtener más información sobre definiciones de contenedores de Fargate, consulta los [documentos de AWS sobre definiciones de contenedores](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#container_definitions). AWS recomienda utilizar la [imagen regional de Docker](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_firelens.html#firelens-using-fluentbit). A continuación se muestra un fragmento de ejemplo de una definición de tarea en la que se configura la imagen de Fluent Bit:

   ```json
   {
     "essential": true,
     "image": "amazon/aws-for-fluent-bit:stable",
     "name": "log_router",
     "firelensConfiguration": {
       "type": "fluentbit",
       "options": { "enable-ecs-log-metadata": "true" }
     }
   }
   ```

   Si tus contenedores publican logs JSON serializados a través de stdout, debes utilizar esta [configuración adicional de FireLens](https://github.com/aws-samples/amazon-ecs-firelens-examples/tree/master/examples/fluent-bit/parse-json) para analizarlos correctamente en Datadog:

   ```json
   {
     "essential": true,
     "image": "amazon/aws-for-fluent-bit:stable",
     "name": "log_router",
     "firelensConfiguration": {
       "type": "fluentbit",
       "options": {
         "enable-ecs-log-metadata": "true",
         "config-file-type": "file",
         "config-file-value": "/fluent-bit/configs/parse-json.conf"
       }
     }
   }
   ```

   Esto convierte el JSON serializado del campo `log:` en campos de nivel superior. Consulta el ejemplo de AWS [Análisis de logs stdout de contenedor que son JSON serializados](https://github.com/aws-samples/amazon-ecs-firelens-examples/tree/master/examples/fluent-bit/parse-json) para obtener más información.

1. Luego, en la misma tarea de Fargate, define una configuración de log para los contenedores deseados a los que se enviarán logs. Esta configuración de log debe tener AWS FireLens como controlador de logs y contar con datos que se envíen a Fluent Bit. A continuación, se incluye un fragmento de ejemplo de una definición de tarea en la que FireLens es el controlador de logs y envía datos a Fluent Bit:

{{< site-region region="us" >}}

```json
{
  "logConfiguration": {
    "logDriver": "awsfirelens",
    "options": {
      "Name": "datadog",
      "apikey": "<DATADOG_API_KEY>",
      "Host": "http-intake.logs.datadoghq.com",
      "dd_service": "firelens-test",
      "dd_source": "redis",
      "dd_message_key": "log",
      "dd_tags": "project:fluentbit",
      "TLS": "on",
      "provider": "ecs"
    }
  }
}
```

{{< /site-region >}}

{{< site-region region="us3" >}}

```json
{
  "logConfiguration": {
    "logDriver": "awsfirelens",
    "options": {
      "Name": "datadog",
      "apikey": "<DATADOG_API_KEY>",
      "Host": "http-intake.logs.us3.datadoghq.com",
      "dd_service": "firelens-test",
      "dd_source": "redis",
      "dd_message_key": "log",
      "dd_tags": "project:fluentbit",
      "TLS": "on",
      "provider": "ecs"
    }
  }
}
```

{{< /site-region >}}

{{< site-region region="us5" >}}

```json
{
  "logConfiguration": {
    "logDriver": "awsfirelens",
    "options": {
      "Name": "datadog",
      "apikey": "<DATADOG_API_KEY>",
      "Host": "http-intake.logs.us5.datadoghq.com",
      "dd_service": "firelens-test",
      "dd_source": "redis",
      "dd_message_key": "log",
      "dd_tags": "project:fluentbit",
      "TLS": "on",
      "provider": "ecs"
    }
  }
}
```

{{< /site-region >}}

{{< site-region region="eu" >}}

```json
{
  "logConfiguration": {
    "logDriver": "awsfirelens",
    "options": {
      "Name": "datadog",
      "apikey": "<DATADOG_API_KEY>",
      "Host": "http-intake.logs.datadoghq.eu",
      "dd_service": "firelens-test",
      "dd_source": "redis",
      "dd_message_key": "log",
      "dd_tags": "project:fluentbit",
      "TLS": "on",
      "provider": "ecs"
    }
  }
}
```

{{< /site-region >}}

{{< site-region region="ap1" >}}

```json
{
  "logConfiguration": {
    "logDriver": "awsfirelens",
    "options": {
      "Name": "datadog",
      "apikey": "<DATADOG_API_KEY>",
      "Host": "http-intake.logs.ap1.datadoghq.com",
      "dd_service": "firelens-test",
      "dd_source": "redis",
      "dd_message_key": "log",
      "dd_tags": "project:fluentbit",
      "TLS": "on",
      "provider": "ecs"
    }
  }
}
```

{{< /site-region >}}

{{< site-region region="gov" >}}

```json
{
  "logConfiguration": {
    "logDriver": "awsfirelens",
    "options": {
      "Name": "datadog",
      "apikey": "<DATADOG_API_KEY>",
      "Host": "http-intake.logs.ddog-gov.datadoghq.com",
      "dd_service": "firelens-test",
      "dd_source": "redis",
      "dd_message_key": "log",
      "dd_tags": "project:fluentbit",
      "TLS": "on",
      "provider": "ecs"
    }
  }
}
```

{{< /site-region >}}

{{% collapse-content title="Ejemplo de uso de secretOptions para evitar exponer la clave de API en texto sin formato" level="h4" %}}

{{< site-region region="us" >}}

```json
{
  "logConfiguration": {
    "logDriver": "awsfirelens",
    "options": {
      "Name": "datadog",
      "Host": "http-intake.logs.datadoghq.com",
      "dd_service": "firelens-test",
      "dd_source": "redis",
      "dd_message_key": "log",
      "dd_tags": "project:fluentbit",
      "TLS": "on",
      "provider": "ecs"
    },
    "secretOptions": [
    {
      "name": "apikey",
      "valueFrom": "<API_SECRET_ARN>"
    }
  ]
 }
}
```

{{< /site-region >}}

{{< site-region region="us3" >}}

```json
{
  "logConfiguration": {
    "logDriver": "awsfirelens",
    "options": {
      "Name": "datadog",
      "Host": "http-intake.logs.us3.datadoghq.com",
      "dd_service": "firelens-test",
      "dd_source": "redis",
      "dd_message_key": "log",
      "dd_tags": "project:fluentbit",
      "TLS": "on",
      "provider": "ecs"
    },
    "secretOptions": [
    {
      "name": "apikey",
      "valueFrom": "<API_SECRET_ARN>"
    }
  ]
  }
}
```

{{< /site-region >}}

{{< site-region region="us5" >}}

```json
{
  "logConfiguration": {
    "logDriver": "awsfirelens",
    "options": {
      "Name": "datadog",
      "Host": "http-intake.logs.us5.datadoghq.com",
      "dd_service": "firelens-test",
      "dd_source": "redis",
      "dd_message_key": "log",
      "dd_tags": "project:fluentbit",
      "TLS": "on",
      "provider": "ecs"
    },
    "secretOptions": [
    {
      "name": "apikey",
      "valueFrom": "<API_SECRET_ARN>"
    }
  ]
  }
}
```

{{< /site-region >}}

{{< site-region region="eu" >}}

```json
{
  "logConfiguration": {
    "logDriver": "awsfirelens",
    "options": {
      "Name": "datadog",
      "Host": "http-intake.logs.datadoghq.eu",
      "dd_service": "firelens-test",
      "dd_source": "redis",
      "dd_message_key": "log",
      "dd_tags": "project:fluentbit",
      "TLS": "on",
      "provider": "ecs"
    },
    "secretOptions": [
    {
      "name": "apikey",
      "valueFrom": "<API_SECRET_ARN>"
    }
  ]
  }
}
```

{{< /site-region >}}

{{< site-region region="ap1" >}}

```json
{
  "logConfiguration": {
    "logDriver": "awsfirelens",
    "options": {
      "Name": "datadog",
      "Host": "http-intake.logs.ap1.datadoghq.com",
      "dd_service": "firelens-test",
      "dd_source": "redis",
      "dd_message_key": "log",
      "dd_tags": "project:fluentbit",
      "TLS": "on",
      "provider": "ecs"
    },
    "secretOptions": [
    {
      "name": "apikey",
      "valueFrom": "<API_SECRET_ARN>"
    }
  ]
  }
}
```

{{< /site-region >}}

{{< site-region region="gov" >}}

```json
{
  "logConfiguration": {
    "logDriver": "awsfirelens",
    "options": {
      "Name": "datadog",
      "Host": "http-intake.logs.ddog-gov.datadoghq.com",
      "dd_service": "firelens-test",
      "dd_source": "redis",
      "dd_message_key": "log",
      "dd_tags": "project:fluentbit",
      "TLS": "on",
      "provider": "ecs"
    },
    "secretOptions": [
    {
      "name": "apikey",
      "valueFrom": "<API_SECRET_ARN>"
    }
  ]
  }
}
```

{{< /site-region >}}

Para proporcionar tu clave de API de Datadog como un secreto, consulta [Uso de secretos](#using-secrets).

{{% /collapse-content %}}

{{< site-region region="us,us3,us5,eu,ap1,gov" >}}
**Nota**: Define tu `apikey` así como el `Host` relativo a tu sitio respectivo `http-intake.logs.`{{< region-param key="dd_site" code="true" >}}. La lista completa de parámetros disponibles se describe en la [documentación de Datadog Fluent Bit](https://docs.datadoghq.com/integrations/fluentbit/#configuration-parameters).

{{< /site-region >}}

Los campos `dd_service`, `dd_source` y `dd_tags` pueden ajustarse para las etiquetas (tags) deseadas.

3. Cada vez que se ejecuta una tarea de Fargate, Fluent Bit envía los logs de contenedores a Datadog con información sobre todos los contenedores gestionados por las tareas de Fargate. Puedes ver los logs sin procesar en la [página del Log Explorer](https://app.datadoghq.com/logs), [crear monitores](https://docs.datadoghq.com/monitors/monitor_types/) para logs y utilizar la [vista de Live Container](https://docs.datadoghq.com/infrastructure/livecontainers/?tab=linuxwindows).

{{< tabs >}}

{{% tab "Interfaz de usuario web" %}}

##### IU web

Para añadir el contenedor de Fluent Bit a tu definición de tarea existente, marca la casilla de verificación **Enable FireLens integration** (Habilitar integración de FireLens) en **Log router integration** (Integración de enrutador de logs) a fin de crear el contenedor `log_router` de manera automática. Esto extrae la imagen regional; sin embargo, recomendamos usar la etiqueta (tag) de imagen `stable` en lugar de `latest`. Una vez que hagas clic en **Apply** (Aplicar), se creará el contenedor base. Para personalizar aún más la `firelensConfiguration`, haz clic en el botón **Configure via JSON** (Configurar mediante JSON) en la parte inferior a fin de editarlo de forma manual.

Una vez que esto se haya añadido, edita el contenedor de la aplicación en tu definición de tarea desde donde quieres enviar logs y cambia el **Log driver** (Controlador de logs) a `awsfirelens` al completar las **Log options** (Opciones de log) con las claves que se muestran en el ejemplo anterior.

{{% /tab %}}

{{% tab "AWS CLI" %}}

##### AWS CLI

Edita el archivo de la definición de tarea JSON existente a fin de incluir el contenedor `log_router` y la `logConfiguration` actualizada para el contenedor de tu aplicación, como se describe en la sección anterior. Una vez hecho esto, crea una revisión nueva de la definición de tarea con el siguiente comando:

```bash
aws ecs register-task-definition --cli-input-json file://<PATH_TO_FILE>/datadog-agent-ecs-fargate.json
```

{{% /tab %}}

{{% tab "CloudFormation" %}}

##### AWS CloudFormation

Para utilizar plantillas de [AWS CloudFormation](https://aws.amazon.com/cloudformation/), utiliza el recurso `AWS::ECS::TaskDefinition` y define la opción `Datadog` para configurar la gestión de logs.

Por ejemplo, para configurar Fluent Bit con el fin de enviar logs a Datadog:

{{< site-region region="us" >}}

```yaml
Resources:
  ECSTaskDefinition:
    Type: 'AWS::ECS::TaskDefinition'
    Properties:
      NetworkMode: awsvpc
      RequiresCompatibilities:
          - FARGATE
      Cpu: 256
      Memory: 1GB
      ContainerDefinitions:
        - Name: tomcat-test
          Image: 'tomcat:jdk8-adoptopenjdk-openj9'
          LogConfiguration:
            LogDriver: awsfirelens
            Options:
              Name: datadog
              apikey: <DATADOG_API_KEY>
              Host: http-intake.logs.datadoghq.com
              dd_service: test-service
              dd_source: test-source
              TLS: 'on'
              provider: ecs
          MemoryReservation: 500
        - Name: log_router
          Image: 'amazon/aws-for-fluent-bit:stable'
          Essential: true
          FirelensConfiguration:
            Type: fluentbit
            Options:
              enable-ecs-log-metadata: true
          MemoryReservation: 50
```

{{< /site-region >}}

{{< site-region region="us3" >}}

```yaml
Resources:
  ECSTaskDefinition:
    Type: 'AWS::ECS::TaskDefinition'
    Properties:
      NetworkMode: awsvpc
      RequiresCompatibilities:
          - FARGATE
      Cpu: 256
      Memory: 1GB
      ContainerDefinitions:
        - Name: tomcat-test
          Image: 'tomcat:jdk8-adoptopenjdk-openj9'
          LogConfiguration:
            LogDriver: awsfirelens
            Options:
              Name: datadog
              apikey: <DATADOG_API_KEY>
              Host: http-intake.logs.us3.datadoghq.com
              dd_service: test-service
              dd_source: test-source
              TLS: 'on'
              provider: ecs
          MemoryReservation: 500
        - Name: log_router
          Image: 'amazon/aws-for-fluent-bit:stable'
          Essential: true
          FirelensConfiguration:
            Type: fluentbit
            Options:
              enable-ecs-log-metadata: true
          MemoryReservation: 50
```

{{< /site-region >}}

{{< site-region region="us5" >}}

```yaml
Resources:
  ECSTaskDefinition:
    Type: 'AWS::ECS::TaskDefinition'
    Properties:
      NetworkMode: awsvpc
      RequiresCompatibilities:
          - FARGATE
      Cpu: 256
      Memory: 1GB
      ContainerDefinitions:
        - Name: tomcat-test
          Image: 'tomcat:jdk8-adoptopenjdk-openj9'
          LogConfiguration:
            LogDriver: awsfirelens
            Options:
              Name: datadog
              apikey: <DATADOG_API_KEY>
              Host: http-intake.logs.us5.datadoghq.com
              dd_service: test-service
              dd_source: test-source
              TLS: 'on'
              provider: ecs
          MemoryReservation: 500
        - Name: log_router
          Image: 'amazon/aws-for-fluent-bit:stable'
          Essential: true
          FirelensConfiguration:
            Type: fluentbit
            Options:
              enable-ecs-log-metadata: true
          MemoryReservation: 50
```

{{< /site-region >}}

{{< site-region region="eu" >}}

```yaml
Resources:
  ECSTaskDefinition:
    Type: 'AWS::ECS::TaskDefinition'
    Properties:
      NetworkMode: awsvpc
      RequiresCompatibilities:
          - FARGATE
      Cpu: 256
      Memory: 1GB
      ContainerDefinitions:
        - Name: tomcat-test
          Image: 'tomcat:jdk8-adoptopenjdk-openj9'
          LogConfiguration:
            LogDriver: awsfirelens
            Options:
              Name: datadog
              apikey: <DATADOG_API_KEY>
              Host: http-intake.logs.datadoghq.eu
              dd_service: test-service
              dd_source: test-source
              TLS: 'on'
              provider: ecs
          MemoryReservation: 500
        - Name: log_router
          Image: 'amazon/aws-for-fluent-bit:stable'
          Essential: true
          FirelensConfiguration:
            Type: fluentbit
            Options:
              enable-ecs-log-metadata: true
          MemoryReservation: 50
```

{{< /site-region >}}

{{< site-region region="gov" >}}

```yaml
Resources:
  ECSTaskDefinition:
    Type: 'AWS::ECS::TaskDefinition'
    Properties:
      NetworkMode: awsvpc
      RequiresCompatibilities:
          - FARGATE
      Cpu: 256
      Memory: 1GB
      ContainerDefinitions:
        - Name: tomcat-test
          Image: 'tomcat:jdk8-adoptopenjdk-openj9'
          LogConfiguration:
            LogDriver: awsfirelens
            Options:
              Name: datadog
              apikey: <DATADOG_API_KEY>
              Host: http-intake.logs.ddog-gov.datadoghq.com
              dd_service: test-service
              dd_source: test-source
              TLS: 'on'
              provider: ecs
          MemoryReservation: 500
        - Name: log_router
          Image: 'amazon/aws-for-fluent-bit:stable'
          Essential: true
          FirelensConfiguration:
            Type: fluentbit
            Options:
              enable-ecs-log-metadata: true
          MemoryReservation: 50
```

{{< /site-region >}}

Para obtener más información sobre las plantillas y la sintaxis de CloudFormation, consulta la [documentación de AWS CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecs-taskdefinition.html).

{{% /tab %}}

{{% tab "CDK" %}}

##### Constructo del CDK Datadog ECS Fargate

Para habilitar la generación de logs a través del constructo del [CDK Datadog ECS Fargate](https://github.com/DataDog/datadog-cdk-constructs/blob/main/src/ecs/fargate/README.md), configura la propiedad `logCollection` como se ve a continuación:

```typescript
const ecsDatadog = new DatadogECSFargate({
  apiKey: <DATADOG_API_KEY>,
  site: <DATADOG_SITE>,
  logCollection: {
    isEnabled: true,
  }
});
```

{{% /tab %}}

{{% tab "Terraform" %}}

##### Módulo de Terraform Datadog ECS Fargate

Para habilitar la generación de logs a través del módulo de [Terraform Datadog ECS Fargate](https://registry.terraform.io/modules/DataDog/ecs-datadog/aws/latest), configura el argumento de entrada `dd_log_collection` como se ve a continuación:

```hcl
module "ecs_fargate_task" {
  source  = "DataDog/ecs-datadog/aws//modules/ecs_fargate"
  version = "1.0.0"

  # Configure Datadog
  dd_api_key = <DATADOG_API_KEY>
  dd_site    = <DATADOG_SITE>
  dd_log_collection = {
    enabled = true,
  }

  # Configure Task Definition
  family                   = <TASK_FAMILY>
  container_definitions    = <CONTAINER_DEFINITIONS>
  cpu                      = 256
  memory                   = 512
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
}
```

{{% /tab %}}

{{< /tabs >}}

**Nota**: Utiliza un [secreto de TaskDefinition](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ecs-taskdefinition-secret.html) para evitar exponer la `apikey` en texto plano.

#### Controlador de logs de AWS

Monitoriza los logs de Fargate mediante el controlador de logs `awslogs` y una función de Lambda para enrutar los logs a Datadog.

1. Define el controlador de logs como `awslogs` en el contenedor de la aplicación en la tarea o el trabajo del que quieras recopilar logs. [Consulta la guía para desarrolladores de AWS Fargate](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html) para obtener instrucciones.

1. Esto configura las tareas o trabajos de Fargate para enviar información de logs a Amazon CloudWatch Logs. A continuación, se muestra un fragmento de una definición de tarea o trabajo donde se ha configurado el controlador de logs awslogs:

   ```json
   {
     "logConfiguration": {
       "logDriver": "awslogs",
       "options": {
         "awslogs-group": "/ecs/fargate-task|job-definition",
         "awslogs-region": "us-east-1",
         "awslogs-stream-prefix": "ecs"
       }
     }
   }
   ```

   Para obtener más información sobre cómo utilizarar el controlador de logs `awslogs` en las definiciones de tareas o trabajos para enviar logs de contenedor a CloudWatch Logs, consulta [Uso del controlador de logs awslogs](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_awslogs.html). Este controlador recopila los logs que genera el contenedor y los envía directamente a CloudWatch Logs.

1. Por último, utiliza la [función Lambda del Log Forwarder de Datadog](https://docs.datadoghq.com/logs/guide/forwarder/) para recopilar logs de CloudWatch y enviarlos a Datadog.

### Recopilación de trazas

{{< site-region region="us,us3,us5,eu,ap1,gov" >}}

1. Sigue las [instrucciones anteriores](#installation) para añadir el contenedor del Datadog Agent a tu definición de trabajo o tarea con la variable de entorno adicional `DD_APM_ENABLED` establecida en `true`. Establece la variable `DD_SITE` en {{< region-param key="dd_site" code="true" >}}. El valor predeterminado es `datadoghq.com` si no lo estableces.
   {{< /site-region >}}

1. Instrumenta la aplicación en función de tu configuración:

   **Nota**: Con las aplicaciones de APM y Fargate, **no** establezcas `DD_AGENT_HOST`; el valor predeterminado `localhost` funciona.

   | Lenguaje                           |
   |------------------------------------|
   | [Java](https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/java?tab=containers#automatic-instrumentation) |
   | [Python](https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/python?tab=containers#instrument-your-application) |
   | [Ruby](https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/ruby#instrument-your-application) |
   | [Go](https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/go/?tab=containers#activate-go-integrations-to-create-spans) |
   | [Node.js](https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/nodejs?tab=containers#instrument-your-application) |
   | [PHP](https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/php?tab=containers#automatic-instrumentation) |
   | [C++](https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/cpp?tab=containers#instrument-your-application) |
   | [.NET Core](https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/dotnet-core?tab=containers#custom-instrumentation) |
   | [.NET Framework](https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/dotnet-framework?tab=containers#custom-instrumentation) |

   Consulte más información general sobre [Envío de trazas (traces) a Datadog](https://docs.datadoghq.com/tracing/setup/).

1. Asegúrate de que tu aplicación se ejecute en la misma definición de trabajo o tarea que el contenedor del Datadog Agent.

### Recopilación de procesos

<div class="alert alert-warning">Puedes ver tus procesos de ECS Fargate en Datadog. Para ver su relación con los contenedores de ECS Fargate, utiliza la versión del Datadog Agent 7.50.0 o una posterior.</div>

Puedes monitorizar los procesos en ECS Fargate en Datadog mediante la [página de Live Processes](https://app.datadoghq.com/process). Para habilitar la recopilación de procesos, añade el [parámetro `PidMode`](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#other_task_definition_params) en la definición de tarea y defínelo como `task` de la siguiente manera:

```text
"pidMode": "task"
```

Para filtrar procesos por ECS, usa la faceta de contenedores de `AWS Fargate` o ingresa `fargate:ecs` en la consulta de búsqueda de la página de Live Processes.

## Etiquetas (tags) predefinidas

El Agent puede detectar de manera automática y adjuntar etiquetas (tags) a todos los datos emitidos por la tarea completa o un contenedor individual de esta tarea o trabajo. La lista de etiquetas adjuntadas de manera automática depende de la [configuración de cardinalidad](https://docs.datadoghq.com/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#environment-variables) del Agent.

**Nota**: Configura las etiquetas (tags) `env` y `service` en tu definición de tarea para obtener todas las ventajas del etiquetado unificado de servicios de Datadog. Para obtener instrucciones, consulta la [sección de configuración completa](https://docs.datadoghq.com/getting_started/tagging/unified_service_tagging/?tab=ecs#full-configuration) de la documentación del etiquetado unificado de servicios.

| Etiqueta (tag)                           | Cardinalidad  | Fuente               |
|-------------------------------|--------------|----------------------|
| `container_name`              | Alto         | API de ECS              |
| `container_id`                | Alto         | API de ECS              |
| `docker_image`                | Bajo          | API de ECS              |
| `image_name`                  | Bajo          | API de ECS              |
| `short_image`                 | Bajo          | API de ECS              |
| `image_tag`                   | Bajo          | API de ECS              |
| `ecs_cluster_name`            | Bajo          | API de ECS              |
| `ecs_container_name`          | Bajo          | API de ECS              |
| `task_arn`                    | Orquestador | API de ECS              |
| `task_family`                 | Bajo          | API de ECS              |
| `task_name`                   | Bajo          | API de ECS              |
| `task_version`                | Bajo          | API de ECS              |
| `availability-zone`           | Bajo          | API de ECS              |
| `region`                      | Bajo          | API de ECS              |

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **ecs.fargate.cpu.limit** <br>(gauge) | Límite blando (CPU Shares) en unidades de CPU.|
| **ecs.fargate.cpu.percent** <br>(gauge) | Porcentaje de CPU utilizado por contenedor (Linux solamente).<br>_Se muestra como porcentaje_ |
| **ecs.fargate.cpu.system** <br>(gauge) | Tiempo de CPU del sistema.<br>_Se muestra como nanocore_ |
| **ecs.fargate.cpu.task.limit** <br>(gauge) | Límite de CPU de la tarea (compartido por todos los contenedores).<br>_Se muestra como nanocore_ |
| **ecs.fargate.cpu.usage** <br>(gauge) | Uso total de la CPU.<br>_Se muestra como nanocore_ |
| **ecs.fargate.cpu.user** <br>(gauge) | Tiempo de CPU del usuario.<br>_Se muestra como nanocore_ |
| **ecs.fargate.ephemeral_storage.reserved** <br>(gauge) | Almacenamiento efímero reservado de esta tarea. (Se requiere Fargate 1.4.0 o posterior).<br>_Se muestra como mebibytes_ |
| **ecs.fargate.ephemeral_storage.utilized** <br>(gauge) | Uso actual de almacenamiento efímero de esta tarea. (Se requiere Fargate 1.4.0 o posterior).<br>_Se muestra como mebibytes_ |
| **ecs.fargate.io.bytes.read** <br>(gauge) | Número de bytes leídos en el disco.<br>_Se muestra como bytes_ |
| **ecs.fargate.io.bytes.write** <br>(gauge) | Número de bytes escritos en el disco.<br>_Se muestra como bytes_ |
| **ecs.fargate.io.ops.read** <br>(gauge) | Número de operaciones de lectura en el disco.|
| **ecs.fargate.io.ops.write** <br>(gauge) | Número de operaciones de escritura en el disco.|
| **ecs.fargate.mem.active_anon** <br>(gauge) | Número de bytes de memoria caché anónima y de intercambio en la lista LRU activa (Linux solamente).<br>_Se muestra como bytes_ |
| **ecs.fargate.mem.active_file** <br>(gauge) | Número de bytes de memoria respaldada por archivos en la lista LRU activa (Linux solamente).<br>_Se muestra como bytes_ |
| **ecs.fargate.mem.cache** <br>(gauge) | Número de bytes de memoria caché de página (Linux solamente).<br>_Se muestra como bytes_ |
| **ecs.fargate.mem.hierarchical_memory_limit** <br>(gauge) | Número de bytes de memoria límite con respecto a la jerarquía bajo la que se encuentra el cgrupo de memoria (Linux solamente).<br>_Se muestra como bytes_ |
| **ecs.fargate.mem.hierarchical_memsw_limit** <br>(gauge) | Número de bytes de memoria+límite de intercambio con respecto a la jerarquía bajo la que se encuentra el cgroup de memoria (Linux solamente).<br>_Se muestra como bytes_ |
| **ecs.fargate.mem.inactive_file** <br>(gauge) | Número de bytes de memoria respaldada por archivos en la lista LRU inactiva (Linux solamente).<br>_Se muestra como bytes_ |
| **ecs.fargate.mem.limit** <br>(gauge) | Número de bytes de memoria límite (Linux solamente).<br>_Se muestra como bytes_ |
| **ecs.fargate.mem.mapped_file** <br>(gauge) | Número de bytes de archivo asignado (incluye tmpfs/shmem) (Linux solamente).<br>_Se muestra como bytes_ |
| **ecs.fargate.mem.max_usage** <br>(gauge) | Muestra el uso máximo de memoria registrado.<br>_Se muestra como bytes_ |
| **ecs.fargate.mem.pgfault** <br>(gauge) | Número de fallos de página por segundo (Linux solamente).|
| **ecs.fargate.mem.pgmajfault** <br>(gauge) | Número de fallos significativos de página por segundo (Linux solamente).|
| **ecs.fargate.mem.pgpgin** <br>(gauge) | Número de eventos de carga al cgroup de memoria. El evento de carga ocurre cada vez que una página se contabiliza como página anónima asignada (RSS) o página de caché al cgroup (Linux solamente).|
| **ecs.fargate.mem.pgpgout** <br>(gauge) | Número de eventos de descarga del cgroup de memoria. El evento de descarga ocurre cada vez que una página se desconecta del cgroup (Linux solamente).|
| **ecs.fargate.mem.rss** <br>(gauge) | Número de bytes de memoria caché anónima y de intercambio (incluye hugepages transparentes) (Linux solamente).<br>_Se muestra como bytes_ |
| **ecs.fargate.mem.task.limit** <br>(gauge) | Límite de memoria de la tarea (compartida por todos los contenedores).<br>_Se muestra como bytes_ |
| **ecs.fargate.mem.usage** <br>(gauge) | Número de bytes de memoria utilizados.<br>_Se muestra como bytes_ |
| **ecs.fargate.net.bytes_rcvd** <br>(gauge) | Número de bytes recibidos (requiere Fargate 1.4.0 o posterior).<br>_Se muestra como bytes_ |
| **ecs.fargate.net.bytes_sent** <br>(gauge) | Número de bytes enviados (requiere Fargate 1.4.0 o posterior).<br>_Se muestra como bytes_ |
| **ecs.fargate.net.packet.in_dropped** <br>(gauge) | Número de paquetes entrantes perdidos (requiere Fargate 1.4.0 o posterior).<br>_Se muestra como paquete_ |
| **ecs.fargate.net.packet.out_dropped** <br>(gauge) | Número de paquetes salientes perdidos (requiere Fargate 1.4.0 o posterior).<br>_Se muestra como paquete_ |
| **ecs.fargate.net.rcvd_errors** <br>(gauge) | Número de errores recibidos (requiere Fargate 1.4.0 o posterior).<br>_Se muestra como error_ |
| **ecs.fargate.net.sent_errors** <br>(gauge) | Número de errores enviados (requiere Fargate 1.4.0 o posterior).<br>_Se muestra como error_ |

### Eventos

El check de ECS Fargate no incluye eventos.

### Checks de servicio

**fargate_check**

Devuelve `CRITICAL` si el Agent no puede conectarse a Fargate, en caso contrario devuelve `OK`.

_Estados: ok, crítico_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

- Entrada en el blog: [Monitorización de aplicaciones AWS Fargate con Datadog](https://www.datadoghq.com/blog/monitor-aws-fargate)
- FAQ: [Configuración de integraciones para ECS Fargate](http://docs.datadoghq.com/integrations/faq/integration-setup-ecs-fargate)
- Entrada en el blog: [Monitorización de tus logs de contenedor Fargate con FireLens y Datadog](https://www.datadoghq.com/blog/collect-fargate-logs-with-firelens/)
- Entrada en el blog: [Métricas claves para la monitorización de AWS Fargate](https://www.datadoghq.com/blog/aws-fargate-metrics/)
- Entrada en el blog: [Recopilación de métricas y logs de las cargas de trabajo de AWS Fargate](https://www.datadoghq.com/blog/tools-for-collecting-aws-fargate-metrics/)
- Entrada en el blog: [Monitorización de AWS Fargate con Datadog](https://www.datadoghq.com/blog/aws-fargate-monitoring-with-datadog/)
- Entrada en el blog: [Despliegues de AWS Fargate con tecnología Graviton2](https://www.datadoghq.com/blog/aws-fargate-on-graviton2-monitoring/)
- Entrada en el blog: [Monitorización de AWS Fargate para aplicaciones en contenedores en Windows](https://www.datadoghq.com/blog/aws-fargate-windows-containers-support/)
- Entrada en el blog: [Monitorización de procesos que se ejecutan en AWS Fargate con Datadog](https://www.datadoghq.com/blog/monitor-fargate-processes/)
- Entrada en el blog: [Monitorización de AWS Batch en Fargate con Datadog](https://www.datadoghq.com/blog/monitor-aws-batch-on-fargate/)
- Documentación: [Rastreo de API Gateway al enviar solicitudes proxy a ECS Fargate](https://docs.datadoghq.com/tracing/trace_collection/proxy_setup/apigateway)