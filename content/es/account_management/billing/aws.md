---
aliases:
- /es/integrations/faq/i-can-t-filter-out-my-elb-instances-will-i-be-charged-for-them/
title: Facturación de la integración de AWS
---

## Información general

Datadog factura los hosts de AWS que ejecutan el Datadog Agent y todas las instancias de EC2 seleccionadas por la integración de AWS de Datadog. **No se te factura dos veces** si ejecutas el Agent en una instancia de EC2 seleccionada por la integración de AWS.

**IMPORTANTE**: Datadog utiliza metadatos de instancia de EC2 para garantizar que no se te facture dos veces por los hosts que ejecutan el agente y que son rastreados por la integración de AWS. Si tus instancias de EC2 están configuradas para requerir el uso de [Instance Metadata Service versión 2 (IMDSv2)][1], entonces debes establecer el parámetro `ec2_prefer_imdsv2` en `true` en tu [configuración del Agent][2] para evitar la facturación doble.

Cuando configuras los cuadros de integración de Fargate y Lambda, y cualquier métrica personalizada, esto repercute en tu factura de Datadog.

Otros recursos de AWS, como ELB, RDS y DynamoDB, no forman parte de la facturación mensual de infraestructura y no se aplican exclusiones de configuración.

## Exclusión de recursos de AWS

Puedes limitar las métricas de AWS recopiladas para algunos servicios a recursos específicos. En la [página de integración de AWS de Datadog][3], selecciona la cuenta de AWS y haz clic en la pestaña **Metric Collection** (Recopilación de métricas). En **Limit Metric Collection to Specific Resources** (Limitar la recopilación de métricas para recursos específicos), puedes limitar las métricas para una o más de las métricas personalizadas de EC2, Lambda, ELB, Application ELB, Network ELB, RDS, SQS, Step Functions y CloudWatch.
Asegúrate de que las etiquetas agregadas a esta sección estén asignadas a los recursos correspondientes en AWS.

**Nota**: si utilizas la notación de exclusión (`!`), asegúrate de que el recurso carezca de la etiqueta especificada.

{{< img src="account_management/billing/aws-resource-exclusion.png" alt="La pestaña de recopilación de métricas de una cuenta de AWS dentro de la página de integración de AWS de Datadog que muestra la opción de limitar la recopilación de métricas a recursos específicos con un menú desplegable para seleccionar el servicio de AWS y un campo para añadir etiquetas en formato clave:valor" >}}

También puedes limitar las métricas de AWS utilizando la [API][4].

**Nota**: Datadog solo puede facturar EC2 (hosts), Lambda (funciones activas), CloudWatch Custom Metrics (métricas personalizadas) y [contenedores][9]. Las métricas integradas para los demás servicios que puedes filtrar no generan cargos en Datadog.

### EC2

Los parámetros de exclusión de recursos de métricas EC2 se aplican tanto a las instancias de EC2 como a cualquier volumen EBS adjunto. Al añadir límites a cuentas de AWS existentes en la página de integración, las instancias previamente descubiertas podrían permanecer en la [lista de infraestructuras][5] durante un máximo de dos horas. Durante el periodo de transición, las instancias de EC2 muestran un estado `???`. Esto no cuenta para tu facturación.

Los hosts con un Agent en ejecución aún se muestran y se incluyen en la facturación. Usa la opción de límite para restringir la recopilación de métricas `aws.ec2.*` de AWS y restringir los hosts de instancias de EC2 de los recursos de AWS.

#### Ejemplos

El siguiente filtro excluye todas las instancias de EC2 que contienen la etiqueta `datadog:no`:

```
!datadog:no
```

El siguiente filtro _solo_ recopila métricas de instancias de EC2 que contienen las etiquetas `datadog:monitored`, `env:production` **o** `instance-type`, con un valor de `c1.*`, **pero no** una etiqueta `region:us-east-1`:

```
datadog:monitored,env:production,instance-type:c1.*,!region:us-east-1
```
**Nota**: En Datadog, las mayúsculas se cambian por minúsculas y los espacios se sustituyen por guiones bajos. Por ejemplo, para recopilar métricas de instancias de EC2 con la etiqueta `Team:Frontend App` en Datadog, la etiqueta aplicada debe ser `team:frontend_app`.

### CloudWatch Metric Streams con Amazon Data Firehose

Opcionalmente, puedes [enviar métricas de CloudWatch a Datadog utilizando CloudWatch Metric Streams y Amazon Data Firehose][8], en lugar de utilizar el método de sondeo de API predeterminado. Si tu organización utiliza el método CloudWatch Metric Streams con Kinesis, no se aplican las reglas de exclusión de recursos de AWS definidas en la página de integración de AWS de Datadog. Debes gestionar todas las reglas para incluir y excluir espacios de nombres de métricas o nombres específicos de métricas en la configuración de CloudWatch Metric Streams para cada una de tus cuentas de AWS en la consola de AWS.

## Comprobar si un host es monitorizado por el Agent o por AWS

En la lista de hosts de infraestructura:

- **Monitorizado por la integración AWS**

  Si un host solo muestra el logotipo de AWS o si tus métricas se limitan al espacio de nombres `aws.*`, esto indica que el host está siendo monitorizado exclusivamente por la integración AWS.

  {{< img src="account_management/billing/infra-aws.png" alt="Lista de hosts de infraestructura que muestra varios hosts solo con el logotipo de AWS, lo que indica una monitorización realizada por la integración AWS." >}}

- **Monitorizado por el Datadog Agent**

  Si un host muestra el logotipo del Datadog Agent pero no el logotipo de AWS, o si sus métricas se recopilan del Datadog Agent (como `datadog.*`, `system.*`, etc.), esto indica que el host está siendo monitorizado por el Datadog Agent.

  {{< img src="account_management/billing/infra-agent.png" alt="Lista de hosts de infraestructura que muestra un host con el logotipo del Datadog Agent, pero no con el logotipo de AWS, lo que indica una monitorización realizada por el Datadog Agent." >}}

## Solucionar problemas

Si tienes preguntas técnicas, contacta con el [soporte de Datadog][6].

Si tienes preguntas sobre la facturación, ponte en contacto con tu [asesor de clientes][7].

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html
[2]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: /es/api/latest/aws-integration/#set-an-aws-tag-filter
[5]: /es/infrastructure/
[6]: /es/help/
[7]: mailto:success@datadoghq.com
[8]: /es/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/?tab=cloudformation#streaming-vs-polling
[9]: /es/account_management/billing/containers/