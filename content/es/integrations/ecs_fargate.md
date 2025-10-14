---
app_id: aws-fargate
app_uuid: 4c298061-c7d2-4ce6-ab3e-5378039de65a
assets:
  dashboards:
    Amazon Fargate: assets/dashboards/amazon_fargate_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ecs.fargate.cpu.user
      metadata_path: metadata.csv
      prefix: ecs.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10033
    source_type_name: Amazon Fargate
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- cloud
- containers
- network
- orchestration
- provisioning
- tracing
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ecs_fargate/README.md
display_on_public_website: true
draft: false
git_integration_title: ecs_fargate
integration_id: aws-fargate
integration_title: Amazon ECS en AWS Fargate
integration_version: 6.1.0
is_public: true
manifest_version: 2.0.0
name: ecs_fargate
public_title: Amazon ECS en AWS Fargate
short_description: Realiza un seguimiento de las métricas para contenedores que se
  ejecutan con ECS Fargate
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Nube
  - Category::Contenedores
  - Category::Red
  - Category::Orquestación
  - Category::Suministración
  - Category::Rastreo
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integración
  configuration: README.md#Setup
  description: Realiza un seguimiento de las métricas para contenedores que se ejecutan
    con ECS Fargate
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-aws-fargate
  - resource_type: documentación
    url: https://docs.datadoghq.com/integrations/faq/integration-setup-ecs-fargate
  - resource_type: blog
    url: https://www.datadoghq.com/blog/collect-fargate-logs-with-firelens/
  - resource_type: blog
    url: https://www.datadoghq.com/blog/aws-fargate-metrics/
  - resource_type: blog
    url: https://www.datadoghq.com/blog/tools-for-collecting-aws-fargate-metrics/
  - resource_type: blog
    url: https://www.datadoghq.com/blog/aws-fargate-monitoring-with-datadog/
  support: README.md#Support
  title: Amazon ECS en AWS Fargate
---

<!--  FUENTE https://github.com/DataDog/integrations-core -->


## Información general

<div class="alert alert-danger"> En esta página se describe la integración de ECS Fargate. Para ECS Fargate, consulta la documentación sobre la <a href="http://docs.datadoghq.com/integrations/eks_fargate">integración de EKS Fargate</a> de Datadog.
</div>

Obtén métricas de todos tus contenedores que se ejecutan en ECS Fargate:

- Métricas de límite y uso de CPU/memoria
- Monitoriza tus aplicaciones que se ejecutan en Fargate con las métricas personalizadas o integraciones de Datadog.

El Datadog Agent recupera métricas para los contenedores de la definición de tarea con el endpoint de metadatos de la tarea de ECS. Según la [Documentación de ECS][1] sobre ese endpoint:

- Este endpoint devuelve estadísticas de Docker en formato JSON para todos los contenedores asociados con la tarea. Para obtener más información sobre cada una de las estadísticas devueltas, consulta [ContainerStats][2] en la documentación de la API de Docker.

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
2. **Crear o modificar la política de IAM**
3. **Ejecutar la tarea como un servicio de réplica**

#### Crear una tarea de ECS Fargate

La unidad de trabajo principal en Fargate es la tarea, que se configura en la definición de tarea. Una definición de tarea es comparable a un pod en Kubernetes. Una definición de tarea debe contener uno o más contenedores. Para ejecutar el Datadog Agent, crea tu definición de tarea a fin de ejecutar los contenedores de tu aplicación, así como el contenedor del Datadog Agent.

Las siguientes instrucciones te muestran cómo configurar la tarea mediante la [consola web de Amazon ][3], [herramientas de la AWS CLI][4] o [AWS CloudFormation][5].

{{< tabs >}}
{{% tab "IU web" %}}
##### Definición de tarea de la IU web


{{< site-region region="us,us3,us5,eu,ap1,gov" >}}

1. Inicia sesión en tu [consola web de AWS][4] y dirígete a la sección de ECS.
2. Haz clic en **Task Definitions** (Definiciones de tareas) en el menú de la izquierda, luego haz clic en el botón **Create new Task Definition** (Crear definición de tarea nueva) o elige una definición de tarea de Fargate existente.
3. Para definiciones de tareas nuevas:
    1. Selecciona **Fargate** como tipo de inicio y, a continuación, haz clic en el botón **Next step** (Siguiente paso).
    2. Ingresa un **Task Definition Name** (Nombre de definición de tarea), como `my-app-and-datadog`.
    3. Selecciona un rol de IAM para la ejecución de tareas. A continuación, consulta los requisitos de permisos en la sección [Crear o modificar la política de IAM](#create-or-modify-your-iam-policy).
    4. Elige **Task memory** (Memoria de tarea) y **Task CPU** (CPU de tarea) en función de tus necesidades.
4. Haz clic en el botón **Add container** (Añadir contenedor) para comenzar a añadir el contenedor del Datadog Agent.
    1. Para **Nombre de contenedor** introduce `datadog-agent`.
    2. Para **Imagen** introduce `public.ecr.aws/datadog/agent:latest`.
    3. En **Env Variables** (Variables de entorno), añade la **Key** (Clave) `DD_API_KEY` e ingresa tu [clave de API de Datadog][41] como valor.
    4. Añade otra variable de entorno utilizando la **Clave** `ECS_FARGATE` y el valor `true`. Haz clic en **Add** (Añadir) para añadir el contenedor.
    5. Añade otra variable entorno utilizando la **Clave** `DD_SITE` y el valor {{< region-param key="dd_site" code="true" >}}. El valor predeterminado es `datadoghq.com` si no se define.
    6. (Solo Windows) Selecciona `C:\` como directorio de trabajo.
5. Añade otros contenedores de aplicaciones a la definición de tarea. A fin de obtener detalles sobre cómo recopilar métricas de integración, consulta la [Configuración de la integración para ECS Fargate][12].
6. Haz clic en **Create** (Crear) para crear la definición de tarea.

[4]: https://aws.amazon.com/console
[12]: http://docs.datadoghq.com/integrations/faq/integration-setup-ecs-fargate
[41]: https://app.datadoghq.com/organization-settings/api-keys

{{< /site-region >}}


{{% /tab %}}

{{% tab "AWS CLI" %}}
##### Definición de tarea de la AWS CLI

1. Descarga [datadog-agent-ecs-fargate.json][1]. **Nota**: Si usas Internet Explorer, es posible que se descargue como un archivo gzip, que contiene el archivo JSON que se menciona a continuación.

{{< site-region region="us,us3,us5,eu,ap1,gov" >}}
2. Actualiza el JSON con un `TASK_NAME`, tu [clave de API de Datadog][41] y el `DD_SITE` ({{< region-param key="dd_site" code="true" >}}) adecuado. **Nota**: La variable de entorno `ECS_FARGATE` ya se encuentra establecida en `"true"`.

[41]: https://app.datadoghq.com/organization-settings/api-keys
{{< /site-region >}}

3. Añade otros contenedores de aplicaciones a la definición de tarea. A fin de obtener detalles sobre cómo recopilar métricas de integración, consulta la [Configuración de la integración para ECS Fargate][2].
4. De manera opcional, añade un check de estado del Agent.

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
5. Ejecuta el siguiente comando para registrar la definición de tarea de ECS:

```bash
aws ecs register-task-definition --cli-input-json file://<PATH_TO_FILE>/datadog-agent-ecs-fargate.json
```

[1]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs-fargate.json
[2]: http://docs.datadoghq.com/integrations/faq/integration-setup-ecs-fargate
{{% /tab %}}

{{% tab "CloudFormation" %}}
##### Definición de tarea de AWS CloudFormation

Puedes usar la plantilla de [AWS CloudFormation][1] para configurar tus contenedores de Fargate. Usa el recurso `AWS::ECS::TaskDefinition` en tu plantilla de CloudFormation a fin de configurar la tarea de Amazon ECS y especifica `FARGATE` como el tipo de inicio requerido para esa tarea.


{{< site-region region="us,us3,us5,eu,ap1,gov" >}}
A continuación, actualiza esta plantilla de CloudFormation con tu [clave de API de Datadog][41]. Además, incluye la variable de entorno `DD_SITE` ({{< region-param key="dd_site" code="true" >}}) adecuada si es necesario, ya que su valor predeterminado es `datadoghq.com` si no lo estableces.

[41]: https://app.datadoghq.com/organization-settings/api-keys
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

Para obtener más información sobre las plantillas de CloudFormation y su sintaxis, consulta la [Documentación de la definición de tarea de AWS CloudFormation][2].

[1]: https://aws.amazon.com/cloudformation/
[2]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecs-taskdefinition.html
{{% /tab %}}

{{% tab "CDK" %}}
##### Definición de tarea de Datadog CDK

Puedes utilizar los [constructos Datadog CDK][1] para configurar tu definición de tarea de ECS Fargate. Utiliza el constructo `DatadogECSFargate` para instrumentar tus contenedores para las características de Datadog deseadas. Esta opción es compatible con TypeScript, JavaScript, Python y Go.


{{< site-region region="us,us3,us5,eu,ap1,gov" >}}
Actualiza la siguiente definición de constructo con tu [clave de API Datadog][41]. Además, incluye la propiedad `DD_SITE` ({{< region-param key="dd_site" code="true" >}}) adecuada, si es necesario, ya que el valor predeterminado será `datadoghq.com` si no la defines.

[41]: https://app.datadoghq.com/organization-settings/api-keys
{{< /site-region >}}


```typescript
const ecsDatadog = new DatadogECSFargate({
  apiKey: <DATADOG_API_KEY>
  site: <DATADOG_SITE>
});
```

A continuación, define tu tarea utilizando [`FargateTaskDefinitionProps`][2].

```typescript
const fargateTaskDefinition = ecsDatadog.fargateTaskDefinition(
  this,
  <TASK_ID>,
  <FARGATE_TASK_DEFINITION_PROPS>
);
```

Por último, incluye tus otros contenedores de aplicaciones añadiendo tu [`ContainerDefinitionOptions`][3].

```typescript
fargateTaskDefinition.addContainer(<CONTAINER_ID>, <CONTAINER_DEFINITION_OPTIONS>);
```

Para obtener más información sobre la instrumentación del constructo `DatadogECSFargate` y su sintaxis, consulta la [documentación de CDK de Datadog ECS Fargate][4].

[1]: https://github.com/datadog/datadog-cdk-constructs/
[2]: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ecs.FargateTaskDefinitionProps.html
[3]: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ecs.ContainerDefinitionOptions.html
[4]: https://github.com/DataDog/datadog-cdk-constructs/blob/main/src/ecs/fargate/README.md
{{% /tab %}}

{{% tab "Terraform" %}}
##### Definición de tarea de Datadog Terraform

Puedes utilizar el [módulo Terraform Datadog ECS Fargate][1] para configurar tus contenedores para Datadog. Este módulo Terraform envuelve el recurso [`aws_ecs_task_definition`][2] e instrumenta automáticamente tu definición de tarea para Datadog. Introduce tus argumentos de entrada en el módulo Terraform Datadog ECS Fargate de forma similar a como lo haces en `aws_ecs_task_definition`. Asegúrate de incluir tus tareas `family` y `container_definitions`.


{{< site-region region="us,us3,us5,eu,ap1,gov" >}}
A continuación, actualiza este módulo Terraform con tu [clave de API Datadog][41]. Además, incluye la variable de entorno `DD_SITE` ({{< region-param key="dd_site" code="true" >}}) adecuada, si es necesario, ya que el valor predeterminado será `datadoghq.com` si no la defines.

[41]: https://app.datadoghq.com/organization-settings/api-keys
{{< /site-region >}}


```hcl
module "ecs_fargate_task" {
  source  = "https://registry.terraform.io/modules/DataDog/ecs-datadog/aws/latest"
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

Para obtener  más información sobre el módulo Terraform, consulta la [documentación de Terraform Datadog ECS Fargate][3].

[1]: https://registry.terraform.io/modules/DataDog/ecs-datadog/aws/latest
[2]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ecs_task_definition
[3]: https://registry.terraform.io/modules/DataDog/ecs-datadog/aws/latest/submodules/ecs_fargate
{{% /tab %}}

{{< /tabs >}}


#### Ejecutar la tarea como un servicio de réplica

La única opción en ECS Fargate es ejecutar la tarea como un [servicio de réplica][6]. El Datadog Agent se ejecuta en la misma definición de tarea que tu aplicación y los contenedores de integración.

{{< tabs >}}
{{% tab "IU web" %}}

##### Servicio de réplica de la IU web

1. Inicia sesión en tu [consola web de AWS][1] y dirígete a la sección de ECS. Si es necesario, crea un clúster con la plantilla de clúster **Networking only** (Solo redes).
2. Elige el clúster para ejecutar el Datadog Agent.
3. En la pestaña **Services** (Servicios), haz clic en el botón **Create** (Crear).
4. En **Launch type** (Tipo de inicio), elige **FARGATE**.
5. En **Task Definition** (Definición de tarea), selecciona la tarea que se creó en los pasos anteriores.
6. Ingresa un **Service name** (Nombre de servicio).
7. En **Number of tasks** (Número de tareas) ingresa `1` y, a continuación, haz clic en el botón **Next step** (Siguiente paso).
8. Selecciona la **Cluster VPC** (VPC del clúster), **Subnets** (Subredes), and **Security Groups** (Grupos de seguridad).
9. El **Load balancing** (Equilibrio de carga) y **Service discovery** (Descubrimiento de servicios) son opcionales en función de tus preferencias.
10. Haz clic en el botón **Next step** (Siguiente paso).
11. El **Auto Scaling** (Escalado automático) es opcional en función de tus preferencias.
12. Haz clic en el botón **Next step** (Siguiente paso) y, a continuación, en el botón **Create service** (Crear servicio).

[1]: https://aws.amazon.com/console
{{% /tab %}}

{{% tab "AWS CLI" %}}
##### Servicio de réplica de la AWS CLI

Ejecuta los siguientes comandos con las [herramientas de la AWS CLI][1].

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

[1]: https://aws.amazon.com/cli
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

Para obtener más información sobre las plantillas de CloudFormation y su sintaxis, consulta la [Documentación del servicio de AWS CloudFormation ECS][1].

[1]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecs-service.html
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

Para obtener más información sobre el constructo del servicio CDK ECS y su sintaxis, consulta la [documentación del servicio AWS CDK ECS][1].

[1]: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ecs.FargateService.html
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

Para obtener más información sobre el módulo de servicio Terraform ECS y su sintaxis, consulta la [documentación del servicio AWS Terraform ECS][1].

[1]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ecs_service
{{% /tab %}}

{{< /tabs >}}

Para proporcionar tu clave de API de Datadog como un secreto, consulta [Uso de secretos](#using-secrets).

#### Instalación para AWS Batch

Para monitorizar tus trabajos de AWS Batch con Datadog, consulta [AWS Batch con ECS Fargate y el Datadog Agent][7]

#### Crear o modificar la política de IAM

Añade los siguientes permisos a tu [política de IAM de Datadog][8] para recopilar métricas de ECS Fargate. Para obtener más información, consulta las [políticas de ECS][9] en el sitio web de AWS.

| Permiso de AWS                   | Descripción                                                       |
| -------------------------------- | ----------------------------------------------------------------- |
| `ecs:ListClusters`               | Enumera los clústeres disponibles.                                          |
| `ecs:ListContainerInstances`     | Enumera las instancias de un clúster.                                      |
| `ecs:DescribeContainerInstances` | Describe instancias para añadir métricas sobre recursos y tareas en ejecución. |

#### Uso de los secretos
Como alternativa a completar la variable de entorno `DD_API_KEY` con tu clave de API en texto sin formato, puedes hacer referencia al [ARN de un secreto de texto sin formato almacenado en AWS Secrets Manager][10]. Coloca la variable de entorno `DD_API_KEY` en la sección `containerDefinitions.secrets` del archivo de definición de tarea o trabajo. Asegúrate de que el rol de ejecución de tarea o trabajo tenga el permiso necesario para obtener secretos de AWS Secrets Manager.

### Recopilación de métricas

Una vez que el Datadog Agent se configure como se describe anteriormente, el [check ecs_fargate][11] recopila métricas con Autodiscovery habilitado. Añade etiquetas (labels) de Docker a tus demás contenedores en la misma tarea para recopilar métricas adicionales.

Si bien la integración funciona en Linux y Windows, algunas métricas dependen del sistema operativo. Todas las métricas expuestas cuando se ejecuta en Windows también se exponen en Linux, pero hay algunas métricas que solo se encuentran disponibles en Linux. Consulta [Datos recopilados](#data-collected) para ver la lista de métricas que proporciona esta integración. En la lista también se especifica qué métricas solo son para Linux.

A fin de obtener detalles sobre la recopilación de métricas de integración, consulta la [Configuración de la integración para ECS Fargate][12].

#### DogStatsD

Las métricas se recopilan con [DogStatsD][13] a través del puerto UDP 8125.

#### Otras variables de entorno

Para conocer las variables de entorno disponibles con el contenedor del Docker Agent, consulta la página [Docker Agent][14]. **Nota**: Algunas variables no se encuentran disponibles para Fargate.


| Variable de entorno               | Descripción                                    |
|------------------------------------|------------------------------------------------|
| `DD_TAGS`                          | Añade etiquetas (tags). Por ejemplo: `key1:value1 key2:value2`. |
| `DD_DOCKER_LABELS_AS_TAGS`         | Extrae etiquetas (labels) de contenedores de Docker                |
| `DD_CHECKS_TAG_CARDINALITY`        | Añadir etiquetas (tags) a las métricas de checks                      |
| `DD_DOGSTATSD_TAG_CARDINALITY`     | Añadir etiquetas (tags) a las métricas personalizadas                     |

Para el etiquetado global, se recomienda usar `DD_DOCKER_LABELS_AS_TAGS`. Con este método, el Agent obtiene las etiquetas (tags) de las etiquetas (labels) de tu contenedor. Para ello, debes añadir las etiquetas (labels) adecuadas a tus demás contenedores. Las etiquetas (labels) se pueden añadir directamente en la [definición de tarea][15].

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

**Nota**: No debes usar `DD_HOSTNAME`, ya que no existe el concepto de host para el usuario en Fargate. El uso de esta etiqueta (tag) puede hacer que tus tareas aparezcan como hosts de APM en la lista de infraestructura, lo que podría afectar tu facturación. En su lugar, tradicionalmente se usa `DD_TAGS` para asignar etiquetas (tags) de host. A partir de la versión 6.13.0 del Datadog Agent, también puedes usar la variable de entorno `DD_TAGS` para establecer etiquetas (tags) globales en tus métricas de integración.

### Métricas basadas en rastreadores

Además de las métricas que recopila el Datadog Agent, Datadog tiene una integración de ECS basada en CloudWatch. Esta integración recopila las [métricas de CloudWatch de Amazon ECS][16].

Como se indica allí, las tareas de Fargate también informan métricas de esta manera:

> Las métricas disponibles dependerán del tipo de inicio de las tareas y los servicios en tus clústeres o trabajos por lotes. Si usas el tipo de inicio de Fargate para tus servicios, se proporcionarán métricas de uso de CPU y memoria a fin de ayudar en la monitorización de tus servicios.

Debido a que este método no usa el Datadog Agent, debes configurar la integración de AWS al marcar **ECS** en el cuadro de integración. Luego, Datadog extrae estas métricas de CloudWatch (con el espacio de nombres `aws.ecs.*` en Datadog) en tu nombre. Consulta la sección [Datos recopilados][17] de la documentación.

Si estas son las únicas métricas que necesitas, puedes confiar en esta integración para la recopilación mediante métricas de CloudWatch. **Nota**: Los datos de CloudWatch son menos detallados (entre 1 y 5 minutos, en función del tipo de monitorización que hayas habilitado) y se demoran en enviarse a Datadog. Esto se debe a que la recopilación de datos de CloudWatch debe cumplir con los límites de la API de AWS, en lugar de enviarlos a Datadog con el Agent.

El rastreador de CloudWatch predeterminado de Datadog sondea las métricas una vez cada 10 minutos. Si necesitas un cronograma de rastreo más rápido, ponte en contacto con el [servicio de asistencia de Datadog][18] para consultar la disponibilidad. **Nota**: Hay aumentos de costes involucrados en el lado de AWS, ya que CloudWatch factura las llamadas a la API.

### Recopilación de logs

Puedes monitorizar los logs de Fargate mediante:
- La integración de AWS FireLens basada en el complemento de salida Fluent Bit de Datadog para enviar logs directamente a Datadog
- El uso del controlador de logs `awslogs` para almacenar los logs en un grupo de logs de CloudWatch y luego una función de Lambda a fin de enrutar los logs a Datadog

Datadog recomienda usar AWS FireLens porque puedes configurar Fluent Bit directamente en tus tareas de Fargate.

**Nota**: La recopilación de logs con Fluent Bit y FireLens no es compatible con AWS Batch en ECS Fargate.

#### Fluent Bit y FireLens

Configura la integración de AWS FireLens basada en el complemento de salida Fluent Bit de Datadog para conectar los datos de logs monitorizados de FireLens a los logs de Datadog. Puedes encontrar una [definición de tarea de muestra completa para esta configuración aquí][19].

1. Añade el contenedor de enrutador de logs de FireLens y Fluent Bit en tu tarea de Fargate existente. Para obtener más información sobre cómo habilitar FireLens, consulta la [Documentación de AWS Firelens][20] dedicada. Para obtener más información sobre las definiciones de contenedor de Fargate, consulta la [Documentación de AWS sobre definiciones de contenedor][21]. AWS recomienda que uses [la imagen regional de Docker][22]. A continuación, se incluye un fragmento de ejemplo de una definición de tarea donde se ha configurado la imagen de Fluent Bit:

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

    Si tus contenedores publican logs JSON serializados a través de stdout, debes usar esta [configuración adicional de FireLens][23] para analizarlos correctamente en Datadog:

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

    Esto convierte el JSON serializado del campo `log:` en campos de nivel superior. Consulta el ejemplo de AWS en [Parseo de logs de stdout de contenedor que son JSON serializados][23] para obtener más detalles.

2. Luego, en la misma tarea de Fargate, define una configuración de log para los contenedores deseados a los que se enviarán logs. Esta configuración de log debe tener AWS FireLens como controlador de logs y contar con datos que se envíen a Fluent Bit. A continuación, se incluye un fragmento de ejemplo de una definición de tarea en la que FireLens es el controlador de logs y envía datos a Fluent Bit:


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
**Nota**: Establece tu `apikey` así como el `Host` en relación con tu respectivo sitio `http-intake.logs.`{{< region-param key="dd_site" code="true" >}}. La lista completa de parámetros disponibles se describe en la [Documentación sobre Fluent Bit de Datadog][24].

[24]: https://docs.datadoghq.com/es/integrations/fluentbit/#configuration-parameters
{{< /site-region >}}


  Se pueden ajustar el `dd_service`, `dd_source` y `dd_tags` en función de las etiquetas (tags) deseadas.

3. Cada vez que se ejecuta una tarea de Fargate, Fluent Bit envía los logs de contenedores a Datadog con información sobre todos los contenedores gestionados por las tareas de Fargate. Puedes ver los logs sin procesar en la [página del Log Explorer][24], [crear monitores][25] para los logs y usar la [vista de Live Container][26].

{{< tabs >}}
{{% tab "IU web" %}}
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

Para usar la plantilla de [AWS CloudFormation][1], usa el recurso `AWS::ECS::TaskDefinition` y establece la opción `Datadog` a fin de configurar la gestión de logs.

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


Para obtener más información sobre las plantillas de CloudFormation y su sintaxis, consulta la [Documentación de AWS CloudFormation][2].

[1]: https://aws.amazon.com/cloudformation/
[2]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecs-taskdefinition.html
{{% /tab %}}

{{% tab "CDK" %}}
##### Constructo del CDK Datadog ECS Fargate

Para habilitar la generación de logs a través del constructo del [CDK Datadog ECS Fargate][1], configura la propiedad `logCollection` como se ve a continuación:

```typescript
const ecsDatadog = new DatadogECSFargate({
  apiKey: <DATADOG_API_KEY>,
  site: <DATADOG_SITE>,
  logCollection: {
    isEnabled: true,
  }
});
```

[1]: https://github.com/DataDog/datadog-cdk-constructs/blob/main/src/ecs/fargate/README.md
{{% /tab %}}

{{% tab "Terraform" %}}
##### Módulo de Terraform Datadog ECS Fargate

Para habilitar la generación de logs a través del módulo de [Terraform Datadog ECS Fargate][1], configura el argumento de entrada `dd_log_collection` como se ve a continuación:

```hcl
module "ecs_fargate_task" {
  source  = "https://registry.terraform.io/modules/DataDog/ecs-datadog/aws/latest"
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

[1]: https://registry.terraform.io/modules/DataDog/ecs-datadog/aws/latest
{{% /tab %}}

{{< /tabs >}}

**Nota**: Usa un [secreto TaskDefinition][27] para evitar exponer la `apikey` en texto sin formato.

#### Controlador de logs de AWS

Monitoriza los logs de Fargate mediante el controlador de logs `awslogs` y una función de Lambda para enrutar los logs a Datadog.

1. Define el controlador de logs como `awslogs` en el contenedor de la aplicación en la tarea o el trabajo del que quieras recopilar logs. [Consulta la guía para desarrolladores de AWS Fargate][28] a fin de obtener instrucciones.

2. Esto configura las tareas o trabajos de Fargate para enviar información de logs a Amazon CloudWatch Logs. A continuación, se muestra un fragmento de una definición de tarea o trabajo donde se ha configurado el controlador de logs awslogs:

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

    Para obtener más información sobre cómo usar el controlador de logs `awslogs` en las definiciones de tareas o trabajo a fin de enviar logs de contenedores a CloudWatch Logs, consulta [Uso del controlador de logs awslogs][29]. Este controlador recopila los logs que genera el contenedor y los envía directamente a CloudWatch Logs.

3. Por último, usa la [función de Lambda del Datadog Forwarder de logs][30] para recopilar logs de CloudWatch y enviarlos a Datadog.

### Recopilación de trazas


{{< site-region region="us,us3,us5,eu,ap1,gov" >}}
1. Sigue las [instrucciones anteriores](#installation) para añadir el contenedor del Datadog Agent a tu definición de trabajo o tarea con la variable de entorno adicional `DD_APM_ENABLED` establecida en `true`. Establece la variable `DD_SITE` en {{< region-param key="dd_site" code="true" >}}. El valor predeterminado es `datadoghq.com` si no lo estableces.
{{< /site-region >}}


2. Instrumenta la aplicación en función de tu configuración:

   **Nota**: Con las aplicaciones de APM y Fargate, **no** establezcas `DD_AGENT_HOST`; el valor predeterminado `localhost` funciona.

   | Lenguaje                           |
   |------------------------------------|
   | [Java][31] |
   | [Python][32] |
   | [Ruby][33] |
   | [Go][34] |
   | [Node.js][35] |
   | [PHP][36] |
   | [C++][37] |
   | [.NET Core][38] |
   | [.NET Framework][39] |

   Consulta información más general sobre el [Envío de trazas a Datadog][40].

3. Asegúrate de que tu aplicación se ejecute en la misma definición de trabajo o tarea que el contenedor del Datadog Agent.

### Recopilación de procesos

<div class="alert alert-danger">Puedes ver tus procesos de ECS Fargate en Datadog. Para ver su relación con los contenedores de ECS Fargate, utiliza la versión del Datadog Agent 7.50.0 o una posterior.</div>

Puedes monitorizar los procesos en ECS Fargate en Datadog mediante la [página de Live Processes][41]. Para habilitar la recopilación de procesos, añade el [parámetro `PidMode`] [42] en la definición de tarea y establécelo en `task` de la siguiente manera:

```text
"pidMode": "task"
```
Para filtrar procesos por ECS, usa la faceta de contenedores de `AWS Fargate` o ingresa `fargate:ecs` en la consulta de búsqueda de la página de Live Processes.

## Etiquetas (tags) predefinidas

El Agent puede detectar de manera automática y adjuntar etiquetas (tags) a todos los datos emitidos por la tarea completa o un contenedor individual en esta tarea o trabajo. La lista de etiquetas (tags) adjuntadas de manera automática depende de la [configuración de cardinalidad][43] del Agent.

**Nota**: Configura las etiquetas (tags) `env` y `service` en tu definición de tarea para obtener todas las ventajas del etiquetado unificado de servicios de Datadog. Para obtener instrucciones, consulte la [sección de configuración completa][44] de la documentación del etiquetado unificado de servicios.

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
{{< get-metrics-from-git "ecs_fargate" >}}


### Eventos

El check de ECS Fargate no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "ecs_fargate" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][18].

## Referencias adicionales

- Publicación del blog: [Monitorizar aplicaciones AWS Fargate con Datadog][45]
- FAQ: [Configuración de la integración de ECS Fargate][12]
- Publicación del blog: [Monitorizar tus logs de contenedor Fargate con FireLens y Datadog][46]
- Publicación del blog: [Métricas clave para monitorizar AWS Fargate][47]
- Publicación del blog: [Recopilar métricas y logs de las cargas de trabajo de AWS Fargate][48]
- Publicación del blog: [Monitorizar AWS Fargate con Datadog][49]
- Publicación del blog: [Despliegues de AWS Fargate con la tecnología de Graviton2][50]
- Publicación del blog: [Monitorizar aplicaciones Windows contenedorizadas en AWS Fargate][51]
- Publicación del blog: [Monitorizar procesos que se ejecutan en AWS Fargate con Datadog][52]
- Publicación del blog: [Monitorizar lotes de AWS en Fargate con Datadog][53]
- Documentación: [Rastrear puertas de enlace de API cuando se utilizan proxies en solicitudes a ECS Fargate][54]


[1]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-metadata-endpoint.html
[2]: https://docs.docker.com/engine/api/v1.30/#operation/ContainerStats
[3]: https://aws.amazon.com/console
[4]: https://aws.amazon.com/cli
[5]: https://aws.amazon.com/cloudformation/
[6]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html#service_scheduler_replica
[7]: https://docs.datadoghq.com/es/containers/guide/aws-batch-ecs-fargate
[8]: https://docs.datadoghq.com/es/integrations/amazon_web_services/#installation
[9]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_ecs.html
[10]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data-tutorial.html
[11]: https://github.com/DataDog/integrations-core/blob/master/ecs_fargate/datadog_checks/ecs_fargate/data/conf.yaml.example
[12]: http://docs.datadoghq.com/integrations/faq/integration-setup-ecs-fargate
[13]: https://docs.datadoghq.com/es/developers/dogstatsd/
[14]: https://docs.datadoghq.com/es/agent/docker/#environment-variables
[15]: https://docs.aws.amazon.com/AmazonECS/latest/userguide/task_definition_parameters.html#container_definition_labels
[16]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cloudwatch-metrics.html
[17]: https://docs.datadoghq.com/es/integrations/amazon_ecs/#data-collected
[18]: https://docs.datadoghq.com/es/help/
[19]: https://github.com/aws-samples/amazon-ecs-firelens-examples/tree/mainline/examples/fluent-bit/datadog
[20]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_firelens.html
[21]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#container_definitions
[22]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_firelens.html#firelens-using-fluentbit
[23]: https://github.com/aws-samples/amazon-ecs-firelens-examples/tree/master/examples/fluent-bit/parse-json
[24]: https://app.datadoghq.com/logs
[25]: https://docs.datadoghq.com/es/monitors/monitor_types/
[26]: https://docs.datadoghq.com/es/infrastructure/livecontainers/?tab=linuxwindows
[27]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ecs-taskdefinition-secret.html
[28]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html
[29]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_awslogs.html
[30]: https://docs.datadoghq.com/es/logs/guide/forwarder/
[31]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/java?tab=containers#automatic-instrumentation
[32]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/python?tab=containers#instrument-your-application
[33]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/ruby#instrument-your-application
[34]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/go/?tab=containers#activate-go-integrations-to-create-spans
[35]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/nodejs?tab=containers#instrument-your-application
[36]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/php?tab=containers#automatic-instrumentation
[37]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/cpp?tab=containers#instrument-your-application
[38]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/dotnet-core?tab=containers#custom-instrumentation
[39]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/dotnet-framework?tab=containers#custom-instrumentation
[40]: https://docs.datadoghq.com/es/tracing/setup/
[41]: https://app.datadoghq.com/process
[42]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#other_task_definition_params
[43]: https://docs.datadoghq.com/es/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#environment-variables
[44]: https://docs.datadoghq.com/es/getting_started/tagging/unified_service_tagging/?tab=ecs#full-configuration
[45]: https://www.datadoghq.com/blog/monitor-aws-fargate
[46]: https://www.datadoghq.com/blog/collect-fargate-logs-with-firelens/
[47]: https://www.datadoghq.com/blog/aws-fargate-metrics/
[48]: https://www.datadoghq.com/blog/tools-for-collecting-aws-fargate-metrics/
[49]: https://www.datadoghq.com/blog/aws-fargate-monitoring-with-datadog/
[50]: https://www.datadoghq.com/blog/aws-fargate-on-graviton2-monitoring/
[51]: https://www.datadoghq.com/blog/aws-fargate-windows-containers-support/
[52]: https://www.datadoghq.com/blog/monitor-fargate-processes/
[53]: https://www.datadoghq.com/blog/monitor-aws-batch-on-fargate/
[54]: https://docs.datadoghq.com/es/tracing/trace_collection/proxy_setup/apigateway