---
aliases:
- /es/integrations/faq/i-can-t-filter-out-my-elb-instances-will-i-be-charged-for-them/
title: Facturación de la integración de AWS
---

## Información general

Datadog cobra por los hosts AWS que ejecutan el Datadog Agent y por todas las instancias EC2 recogidas por la integración entre Datadog y AWS. **No se te cobrará dos veces** si estás ejecutando el Agent en una instancia EC2 recogida por la integración de AWS.

**IMPORTANTE**: Datadog utiliza metadatos de instancia EC2 para garantizar que no se te cobre dos veces por los hosts que ejecutan el Agent y que son rastreados por la integración de AWS. Si tus instancias EC2 están configuradas para requerir el uso de [Instance Metadata Service Version 2 (IMDSv2)][1], deberás definir el parámetro`ec2_prefer_imdsv2` como `true` en tu [configuración del Agent][2] para evitar la doble facturación.

Cuando configures los cuadros de integración de Fargate y de Lambda, así como cualquier métrica personalizada, repercutirá en tu factura de Datadog.

Otros recursos de AWS, como ELB, RDS y DynamoDB, no forman parte de la facturación mensual de la infraestructura. Además, no se aplican las exclusiones de configuración.

## Exclusión de recursos de AWS

Puedes limitar las métricas de AWS recopiladas a recursos específicos para algunos servicios. En la [página de integración de Datadog-AWS][3], selecciona la cuenta de AWS y haz clic en la pestaña **Metric Collection** (Recopilación de métricas). En **Limit Metric Collection to Specific Resources** (Limitar la recopilación de métricas a recursos específicos) puedes excluir las métricas para una o varias métricas personalizadas de EC2, Lambda, ELB, Application ELB, Network ELB, RDS, SQS y CloudWatch.

{{< img src="account_management/billing/aws-resource-exclusion.png" alt="La pestaña de recopilación de métricas de una cuenta AWS en la página de integración AWS de Datadog. Se muestra la opción de limitar la recopilación de métricas a recursos específicos con un menú desplegable para seleccionar el servicio de AWS y un campo para añadir etiquetas en formato key:value" >}}

También puedes limitar las métricas de AWS utilizando la [API][4]. 

**Nota**: Solo los (hosts) EC2, las (funciones activas) de Lambda y las (métricas personalizadas) de CloudWatch son facturables por Datadog. Las métricas integradas para los demás servicios que puedes filtrar no incurren en cargos de Datadog.

### EC2

Los parámetros de exclusión de recursos de métricas EC2 se aplican tanto a las instancias EC2 como a cualquier volumen EBS adjunto. Al añadir límites a cuentas de AWS existentes en la página de integración, las instancias previamente descubiertas podrían permanecer en la [lista de infraestructuras][5] durante un máximo de dos horas. Durante el periodo de transición, las instancias EC2 muestran un estado `???`. Esto no cuenta para tu facturación.

Los hosts con un Agent en ejecución siguen mostrándose y se incluyen en la facturación. Utiliza la opción de límite para restringir de AWS la recopilación de métricas `aws.ec2.*`, así como los hosts de instancia EC2 de los recursos de AWS.

#### Ejemplos

El siguiente filtro excluye todas las instancias EC2 que contienen la etiqueta (tag) `datadog:no` :

```
!datadog:no
```

El siguiente filtro sólo recopila métricas de instancias EC2 que contienen las etiquetas `datadog:monitored` **o** `env:production` **o** `instance-type` etiquetar, con un valor de `c1.*`, **y no** una etiqueta `region:us-east-1`:

```
datadog:monitored,env:production,instance-type:c1.*,!region:us-east-1
```
**Nota**: En Datadog, las mayúsculas se cambian por minúsculas y los espacios se sustituyen por guiones bajos. Por ejemplo, para recopilar métricas de instancias EC2 con la etiqueta `Team:Frontend App` en Datadog, la etiqueta aplicada debe ser `team:frontend_app`.

### CloudWatch Metric Streams con Amazon Data Firehose

Opcionalmente, puedes [enviar métricas de CloudWatch a Datadog utilizando CloudWatch Metric Streams y Amazon Data Firehose][8], en lugar de utilizar el método de sondeo de API predeterminado. Si tu organización utiliza el método CloudWatch Metric Streams con Kinesis, no se aplican las reglas de exclusión de recursos AWS definidas en la página de la integración de AWS de Datadog. Debes gestionar todas las reglas para incluir y excluir espacios de nombres de métricas o nombres específicos de métricas en los parámetros de CloudWatch Metric Streams para cada una de tus cuentas de AWS en la consola de AWS.

## Python

Si tienes preguntas técnicas, ponte en contacto con [el servicio de asistencia de Datadog][6].

Si tiene preguntas de facturación, ponte en contacto con tu [asesor de clientes][7].

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html
[2]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: /es/api/latest/aws-integration/#set-an-aws-tag-filter
[5]: /es/infrastructure/
[6]: /es/help/
[7]: mailto:success@datadoghq.com
[8]: /es/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/?tab=cloudformation#streaming-vs-polling