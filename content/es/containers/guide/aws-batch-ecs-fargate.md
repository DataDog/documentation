---
aliases:
- /es/integrations/faq/aws-batch-ecs-fargate
- /es/agent/guide/aws-batch-ecs-fargate-datadog-agent
description: Implementa el Datadog Agent junto con trabajos de AWS Batch que se ejecutan
  en ECS Fargate para una monitorización exhaustiva.
further_reading:
- link: integrations/ecs_fargate/?tab=webui#aws-batch-on-ecs-fargate
  tag: Documentación
  text: Amazon ECS en AWS Fargate con AWS Batch
title: AWS Batch con ECS Fargate y el Datadog Agent
---

Puedes ejecutar el Datadog Agent junto con tus contenedores de trabajos AWS Batch añadiendo el contenedor a tu definición de trabajo.

## Requisitos previos

* Entorno de cálculo AWS Batch
* Cola de trabajos AWS Batch asociada a un entorno de cálculo

## Crear la definición de trabajo

{{< tabs >}}
{{% tab "Interfaz de usuario web AWS" %}}

1. Inicia sesión en tu [consola web AWS][1] y ve a la sección AWS Batch.
2. Haz clic en **Job Definitions** (Definiciones de trabajos) en el menú de la izquierda y, a continuación, haz clic en el botón **Create** (Crear) o selecciona una definición de trabajo de AWS Batch existente.
3. Para nuevas definiciones de trabajo:
    1. Selecciona **Fargate** como tipo de orquestación.
    2. Desmarca la opción **Utilizar la estructura legacy containerProperties**. 
    3. Introduce un **Nombre de definición de trabajo**, como `my-app-and-datadog`.
    4. Selecciona un rol IAM de ejecución. Consulta los requisitos de permisos en la sección [Crear o modificar tu política IAM](#create-or-modify-your-iam-policy) a continuación.
    5. Activa **Asignar IP pública** para permitir el acceso de red saliente y, a continuación, haz clic en el botón **Next** (Siguiente).
    6. Configura el contenedor del Datadog Agent.
        1. Para **Nombre de contenedor** introduce `datadog-agent`.
        2. Para **Imagen** introduce `public.ecr.aws/datadog/agent:latest`.
        3. Configura requisitos de recursos de **CPU** y **Memoria** en función de tus necesidades.
        4. Para **Variables de entorno**, añade la **Clave** `DD_API_KEY` e introduce tu [clave de API Datadog][2] como valor.
        5. Añade otra variable de entorno utilizando la **Clave** `ECS_FARGATE` y el valor `true`. Haz clic en **Add** (Añadir) para añadir el contenedor.
        6. Añade otra variable entorno utilizando la **Clave** `DD_SITE` y el valor {{< region-param key="dd_site" code="true" >}}. El valor predeterminado es `datadoghq.com` si no se define.
    7. Añade tus otros contenedores de aplicaciones a la definición de trabajo.
    8. AWS Batch es compatible con [Fluent Bit y Firelens][3]. Para habilitar la recopilación de logs para tus contenedores de aplicaciones con Datadog:
       1. Crea un contenedor de enrutador de logs independiente en la definición del trabajo.
       2. Configura la imagen `amazon/aws-for-fluent-bit:stable"` para el contenedor.
       3. En la sección de configuración de Firelens:
          - Configura el **Type** (Tipo) para que sea `fluentbit`.
          - Configura las **Options** (Opciones) para incluir `enable-ecs-log-metadata` en `true` para el **Name** (Nombre) y el **Value** (Valor) respectivamente.
       4. Para los contenedores de tu aplicación, en la sección Configuración de log:
          - Configura el **Log Driver** (Controlador de logs) para `awsfirelens`
          - Configura las **Options** (Opciones) para incluir los siguientes **Name** (Nombre) y **Value** (Valor) similares al Paso 2 de la sección [ECS Fargate Fluent Bit y Firelens][4]
    10. Haz clic en **Create job definition** (Crear definición de trabajo) para crear la definición de trabajo.

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://aws.amazon.com/about-aws/whats-new/2025/04/aws-batch-amazon-elastic-container-service-exec-firelens-log-router/
[4]: https://docs.datadoghq.com/es/integrations/ecs_fargate/?tab=webui#fluent-bit-and-firelens

{{% /tab %}}
{{% tab "CLI AWS" %}}

1. Descarga [datadog-agent-aws-batch-ecs-fargate.json][1].

   **Nota**: Si utilizas Internet Explorer, es posible que se descargue como un archivo gzip, que contiene el archivo JSON mencionado a continuación.
2. Actualiza el JSON con un `JOB_DEFINITION_NAME`, tu [clave de API de Datadog][2], y el `DD_SITE` apropiado ({{< region-param key="dd_site" code="true" >}}).

   **Nota**: La variable de entorno `ECS_FARGATE` ya está configurada como `"true"`.
3. Añade tus otros contenedores de aplicaciones a la definición de trabajo.
4. AWS Batch es compatible con [Fluent Bit y Firelens][3]. Para habilitar la recopilación de logs para tus contenedores de aplicaciones con Datadog:
   - En el archivo JSON, añade un contenedor `log_router` adicional con lo siguiente en la sección `containers`:
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
   - En tus contenedores de aplicación, añade las opciones `logConfiguration` pertinentes similares al Paso 2 de la [sección ECS Fargate Fluent Bit y Firelens][4].
5. Ejecute el siguiente comando para registrar la definición de trabajo:

   ```bash
   aws batch register-job-definition --cli-input-json file://<PATH_TO_FILE>/datadog-agent-aws-batch-ecs-fargate.json
   ```

[1]: https://docs.datadoghq.com/resources/json/datadog-agent-aws-batch-ecs-fargate.json
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://aws.amazon.com/about-aws/whats-new/2025/04/aws-batch-amazon-elastic-container-service-exec-firelens-log-router/
[4]: https://docs.datadoghq.com/es/integrations/ecs_fargate/?tab=webui#fluent-bit-and-firelens
{{% /tab %}}
{{< /tabs >}}

## Enviar el trabajo AWS Batch

{{< tabs >}}
{{% tab "Interfaz de usuario web AWS" %}}

1. Inicia sesión en tu [consola web AWS][1] y ve a la sección AWS Batch. Si es necesario, crea un [entorno de cálculo][2] o una [cola de trabajos][3] asociada a un entorno de cálculo.
2. En la pestaña **Trabajos**, haz clic en el botón **Submit new job** (Enviar nuevo trabajo).
3. Introduce un **Nombre de trabajo**.
4. En **Definición de trabajo**, selecciona el trabajo creado en los pasos anteriores.
5. Elige la cola de trabajos en la que se ejecutará el Datadog Agent.
6. Las **sustituciones de contenedores** son opcionales en función de tus preferencias.
7. Haz clic en el botón **Next** (Siguiente) y, a continuación, en el botón **Create job** (Crear trabajo).

[1]: https://aws.amazon.com/console
[2]: https://docs.aws.amazon.com/batch/latest/userguide/create-compute-environment.html
[3]: https://docs.aws.amazon.com/batch/latest/userguide/create-job-queue-fargate.html

{{% /tab %}}
{{% tab "CLI AWS" %}}

1. Ejecuta el siguiente comando para enviar un trabajo para tu definición de trabajo:

```bash
aws batch submit-job --job-name <JOB_NAME> \
--job-queue <JOB_QUEUE_NAME> \
--job-definition <JOB_DEFINITION_NAME>:1
```

{{% /tab %}}
{{< /tabs >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}