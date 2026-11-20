---
aliases:
- /es/integrations/faq/aws-batch-ecs-fargate
- /es/agent/guide/aws-batch-ecs-fargate-datadog-agent
description: Implemente el Datadog Agent junto con los trabajos de AWS Batch que se
  ejecutan en ECS Fargate para una supervisión integral
further_reading:
- link: integrations/ecs_fargate/?tab=webui#aws-batch-on-ecs-fargate
  tag: Documentación
  text: Amazon ECS en AWS Fargate con AWS Batch
- link: https://www.datadoghq.com/architecture/using-datadog-with-ecs-fargate/
  tag: Centro de arquitectura
  text: Uso de Datadog con ECS Fargate
title: AWS Batch con ECS Fargate y el Datadog Agent
---
Puede ejecutar el Datadog Agent junto con sus contenedores de trabajo de AWS Batch agregando el contenedor a su definición de trabajo.

## Requisitos previos {#prerequisites}

* Entorno de cómputo de AWS Batch
* Cola de trabajos de AWS Batch asociada con un entorno de cómputo

## Cree la definición de trabajo {#create-the-job-definition}

{{< tabs >}}
{{% tab "AWS Web UI" %}}

1. Inicie sesión en su [AWS Web Console][1] y navegue a la sección de AWS Batch.
2. Haga clic en {{< ui >}}Job Definitions{{< /ui >}} en el menú de la izquierda, luego haga clic en el botón {{< ui >}}Create{{< /ui >}} o elija una definición de trabajo de AWS Batch existente.
3. Para nuevas definiciones de trabajo:
    1. Seleccione {{< ui >}}Fargate{{< /ui >}} como el tipo de orquestación.
    2. Desmarque la opción {{< ui >}}Use legacy containerProperties structure{{< /ui >}}. 
    3. Ingrese un {{< ui >}}Job Definition Name{{< /ui >}}, como `my-app-and-datadog`.
    4. Seleccione un rol de IAM de ejecución. Consulte los requisitos de permisos en la sección [Create or Modify your IAM Policy](#create-or-modify-your-iam-policy) a continuación.
    5. Habilite {{< ui >}}Assign public IP{{< /ui >}} para permitir el acceso a la red de salida, luego haga clic en el botón {{< ui >}}Next{{< /ui >}}.
    6. Configure el contenedor del Datadog Agent.
        1. Para {{< ui >}}Container name{{< /ui >}} ingrese `datadog-agent`.
        2. Para {{< ui >}}Image{{< /ui >}} ingrese `public.ecr.aws/datadog/agent:latest`.
        3. Configure los requisitos de recursos de {{< ui >}}CPU{{< /ui >}} y {{< ui >}}Memory{{< /ui >}} según sus necesidades.
        4. Para {{< ui >}}Env Variables{{< /ui >}}, agregue el {{< ui >}}Key{{< /ui >}} `DD_API_KEY` e ingrese su [Datadog API Key][2] como el valor.
        5. Agregue otra variable de entorno usando el {{< ui >}}Key{{< /ui >}} `ECS_FARGATE` y el valor `true`. Haga clic en {{< ui >}}Add{{< /ui >}} para agregar el contenedor.
        6. Agregue otra variable de entorno usando el {{< ui >}}Key{{< /ui >}} `DD_SITE` y el valor {{< region-param key="dd_site" code="true" >}}. Esto tiene como valor predeterminado `datadoghq.com` si no lo configura.
    7. Agregue sus otros contenedores de aplicación a la definición del trabajo.
    8. AWS Batch admite [Fluent Bit y Firelens][3]. Para habilitar la recolección de registros para sus contenedores de aplicación con Datadog:
       1. Cree un contenedor de enrutador de registro separado en la definición del trabajo.
       2. Configure la imagen `amazon/aws-for-fluent-bit:stable"` para el contenedor.
       3. En la sección Firelens Configuration:
          - Configure el {{< ui >}}Type{{< /ui >}} para que sea `fluentbit`.
          - Configure el {{< ui >}}Options{{< /ui >}} para incluir `enable-ecs-log-metadata` establecido en `true` para el {{< ui >}}Name{{< /ui >}} y {{< ui >}}Value{{< /ui >}} respectivamente
       4. Para sus contenedores de aplicación, en la sección Log Configuration:
          - Configure el {{< ui >}}Log Driver{{< /ui >}} a `awsfirelens`
          - Configure el {{< ui >}}Options{{< /ui >}} para incluir los siguientes {{< ui >}}Name{{< /ui >}} y {{< ui >}}Value{{< /ui >}} similares al Paso 2 de la [sección ECS Fargate Fluent Bit y Firelens][4]
    10. Haga clic en {{< ui >}}Create job definition{{< /ui >}} para crear la definición del trabajo.

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://aws.amazon.com/about-aws/whats-new/2025/04/aws-batch-amazon-elastic-container-service-exec-firelens-log-router/
[4]: https://docs.datadoghq.com/es/integrations/ecs_fargate/?tab=webui#fluent-bit-and-firelens

{{% /tab %}}
{{% tab "AWS CLI" %}}

1. Descargue [datadog-agent-aws-batch-ecs-fargate.json][1]. 

   **Nota**: Si está utilizando Internet Explorer, es posible que esto se descargue como un archivo gzip, el cual contiene el archivo JSON mencionado a continuación.
2. Actualice el JSON con un `JOB_DEFINITION_NAME`, su [clave de API][2] y el `DD_SITE` apropiado ({{< region-param key="dd_site" code="true" >}}).

   **Nota**: La variable de entorno `ECS_FARGATE` ya está establecida en `"true"`.
3. Agregue sus otros contenedores de aplicación a la definición de trabajo.
4. AWS Batch admite [Fluent Bit y Firelens][3]. Para habilitar la recolección de registros para sus contenedores de aplicación con Datadog:
   - En el archivo JSON, agregue un contenedor `log_router` adicional con lo siguiente en la sección `containers`:
     ```json
      {
          "name": "log_router",
          "image": "amazon/aws-for-fluent-bit:stable",
          "essential": true,
          "firelensConfiguration": {
              "type": "fluentbit",
              "options": {
                  "enable-ecs-log-metadata": "true"
              }
          },
          "resourceRequirements": [
              {
                  "value": "0.25",
                  "type": "VCPU"
              },
              {
                  "value": "512",
                  "type": "MEMORY"
              }
          ]
      }
     ```
   - En sus contenedores de aplicación, agregue las opciones de `logConfiguration` relevantes similares al Paso 2 de la [sección de ECS Fargate Fluent Bit y Firelens][4]
5. Ejecute el siguiente comando para registrar la definición de trabajo:

   ```bash
   aws batch register-job-definition --cli-input-json file://<PATH_TO_FILE>/datadog-agent-aws-batch-ecs-fargate.json
   ```

[1]: https://docs.datadoghq.com/es/resources/json/datadog-agent-aws-batch-ecs-fargate.json
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://aws.amazon.com/about-aws/whats-new/2025/04/aws-batch-amazon-elastic-container-service-exec-firelens-log-router/
[4]: https://docs.datadoghq.com/es/integrations/ecs_fargate/?tab=webui#fluent-bit-and-firelens
{{% /tab %}}
{{< /tabs >}}

## Envíe el trabajo de AWS Batch {#submit-the-aws-batch-job}

{{< tabs >}}
{{% tab "AWS Web UI" %}}

1. Inicie sesión en su [AWS Web Console][1] y navegue a la sección de AWS Batch. Si es necesario, cree un [entorno de cómputo][2] y/o una [cola de trabajos][3] asociada con un entorno de cómputo.
2. En la pestaña {{< ui >}}Jobs{{< /ui >}}, haga clic en el botón {{< ui >}}Submit new job{{< /ui >}}.
3. Ingrese un {{< ui >}}Job name{{< /ui >}}.
4. Para {{< ui >}}Job Definition{{< /ui >}}, seleccione el trabajo creado en los pasos anteriores.
5. Elija la cola de trabajos en la que desea ejecutar el Datadog Agent.
6. {{< ui >}}Container overrides{{< /ui >}} son opcionales según su preferencia.
7. Haga clic en el botón {{< ui >}}Next{{< /ui >}}, luego haga clic en el botón {{< ui >}}Create job{{< /ui >}}.

[1]: https://aws.amazon.com/console
[2]: https://docs.aws.amazon.com/batch/latest/userguide/create-compute-environment.html
[3]: https://docs.aws.amazon.com/batch/latest/userguide/create-job-queue-fargate.html

{{% /tab %}}
{{% tab "AWS CLI" %}}

1. Ejecute el siguiente comando para enviar un trabajo para su definición de trabajo:

```bash
aws batch submit-job --job-name <JOB_NAME> \
--job-queue <JOB_QUEUE_NAME> \
--job-definition <JOB_DEFINITION_NAME>:1
```

{{% /tab %}}
{{< /tabs >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}