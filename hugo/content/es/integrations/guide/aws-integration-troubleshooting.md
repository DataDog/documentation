---
description: Pasos para solucionar problemas de Datadog AWS Integration
further_reading:
- link: https://docs.datadoghq.com/integrations/amazon_web_services/
  tag: Integración
  text: Integración de AWS
title: Solución de problemas de AWS Integration
---
## Descripción general {#overview}

Utilice esta guía para solucionar problemas relacionados con [AWS Integration][1] de Datadog.

## Errores de permisos de IAM {#iam-permission-errors}

<div class="alert alert-info">
Los cambios de IAM pueden tardar varios minutos en propagarse a través de AWS. Después de modificar los roles, las políticas o las relaciones de confianza de IAM, espere al menos cinco minutos antes de volver a validar la integración. La interfaz de usuario de Datadog puede seguir mostrando errores de permisos obsoletos hasta unas horas después de que los cambios se propaguen.
</div>

### Datadog no tiene autorización para realizar sts:AssumeRole {#datadog-is-not-authorized-to-perform-stsassumerole}

El error de permisos `sts:Assumerole` indica un problema con la política de confianza asociada con el `DatadogAWSIntegrationRole`. Consulte la documentación [Error: Datadog is not authorized to perform sts:AssumeRole][2] sobre cómo resolver este problema.

**Nota**: Este error puede persistir en la interfaz de usuario de Datadog durante unas horas mientras los cambios se propagan.

### Resolve All AWS Permissions Issues {#resolve-all-aws-permissions-issues}

El botón **Resolve All AWS Permissions Issues** de la página AWS Integration le permite usar una pila QuickStart de CloudFormation para actualizar el rol de IAM de su integración de Datadog y resolver los problemas de permisos faltantes. 
En **Issues**, haga clic en **Resolve All AWS Permissions Issues**. Esto inicia una pila de CloudFormation que llama al [punto de conexión][13] de la API pública de Datadog y obtiene los permisos de IAM más recientes necesarios para la integración, crea nuevas políticas de IAM que contienen esos permisos y los adjunta al rol de integración. También adjunta la política administrada de AWS `SecurityAudit` si no está presente.

Las políticas creadas se nombran con un prefijo `datadog-aws-integration-iam-permissions-`, seguido de un hash único para evitar colisiones con cualquier política existente que haya configurado. Puede ver la plantilla de CloudFormation en el [repositorio cloudformation-template][14] público de Datadog.

<div class="alert alert-danger">
Al hacer clic en <strong>Resolve All AWS Permissions Issues</strong>:<br>
  - No soluciona los problemas de autenticación del rol (cuando el nombre del rol, el ID externo o la configuración de la política de confianza impiden que Datadog se autentique en su cuenta de AWS)<br>
  - No soluciona los casos en los que se aplica una Service Control Policy (SCP) que deniega explícitamente los permisos requeridos<br>
  - No afecta a ninguna política que usted adjunte al rol de IAM de integración de Datadog<br>
  - Si se hace clic varias veces, cualquier política anterior creada con ese prefijo se elimina antes de que se creen nuevas políticas
</div>

## Discrepancias de datos {#data-discrepancies}

### Discrepancia entre sus datos en CloudWatch y Datadog {#discrepancy-between-your-data-in-cloudwatch-and-datadog}

Las secciones a continuación describen tres distinciones importantes que debe tener en cuenta, así como los pasos para [conciliar la discrepancia](#reconcile-the-discrepancy).

#### 1. Desglose temporal {#1-time-aggregation}

Datadog muestra datos sin procesar de AWS en valores por segundo, independientemente del marco de tiempo seleccionado en AWS. Es por esto que el valor de Datadog podría parecer más bajo. Consulte [desglose temporal][20] en la documentación de métricas para obtener más información.

#### 2. Desglose espacial {#2-space-aggregation}

Los agregadores de espacio `min`, `max` y `avg` tienen un significado diferente entre AWS y Datadog. En AWS, la latencia promedio, la latencia mínima y la latencia máxima son tres métricas distintas que AWS recopila. Cuando Datadog sondea métricas de AWS CloudWatch, la latencia promedio se recibe como una única serie temporal por Elastic Load Balancer (ELB).

Dentro de Datadog, cuando selecciona `min`, `max` o `avg`, usted controla cómo se combinan varias series temporales. Por ejemplo, solicitar `system.cpu.idle` sin ningún filtro devuelve una serie para cada servidor que informa esa métrica, y esas series deben combinarse para ser graficadas. Si en su lugar solicita `system.cpu.idle` desde un solo servidor, no es necesaria ninguna agregación y cambiar entre promedio y máximo produce el mismo resultado.

Consulte [desglose espacial][21] en la documentación de métricas para obtener más información.

#### 3. Métricas por dimensión {#3-per-dimension-metrics}

Algunas métricas de AWS CloudWatch se emiten una vez por combinación de dimensiones, lo que puede producir valores que parecen inflados cuando se agregan en Datadog. Por ejemplo, la métrica `aws.elb.healthy_host_count` de Classic ELB se reporta por separado para cada zona de disponibilidad. Cuando el balanceo de carga entre zonas está habilitado, sumar esta métrica en todas las zonas de disponibilidad produce un total que es mayor que el número real de servidores en buen estado. Consulte [Recuento incorrecto de aws.elb.healthy_host_count](#wrong-count-of-awselbhealthy_host_count) para obtener más detalles.

Para evitar una agregación inflada, utilice las variantes de métricas `_deduped` cuando estén disponibles o restrinja el contexto de su consulta a un valor de dimensión específico, como una sola zona de disponibilidad. Consulte la [página de integración de ELB][27] para obtener una lista completa de los tipos de balanceadores de carga que admiten variantes de `_deduped`.

#### Concilie la discrepancia {#reconcile-the-discrepancy}

1. Vaya a **CloudWatch** y, a continuación, a **All metrics**.
2. Busque y grafique la métrica. 
3. Seleccione la pestaña **Source** para mostrar la consulta completa de la métrica.

{{< img src="integrations/guide/aws_integration_troubleshooting/cloudwatch-metric-explorer.png" alt="La página All metrics de CloudWatch muestra una consulta de métrica en la pestaña Source, con el cursor sobre un punto del gráfico para mostrar el valor de la métrica y la marca de tiempo" responsive="true" style="width:90%;" >}}

4. Confirme que la consulta de CloudWatch y la de Datadog tengan el mismo contexto:
   - Las [Dimensions][17] utilizadas en la consulta de métricas de CloudWatch deben coincidir con las etiquetas utilizadas en la consulta de métricas de Datadog
   - Datadog consulta métricas con una granularidad de un minuto, por lo que el **Period** de la consulta de métricas de CloudWatch también debe configurarse con una precisión de un minuto
   - Región
   - Espacio de nombres y nombre de la métrica
5. Pase el cursor sobre un punto de datos en el gráfico para mostrar la marca de tiempo y el valor.
6. Encuentre el mismo punto en el tiempo en el gráfico de Datadog y compare los valores. Si los valores son iguales, la discrepancia original se debió a diferencias en el desglose temporal o el desglose espacial entre los dos gráficos.

## Métricas {#metrics}

### Métricas retrasadas {#metrics-delayed}

Al utilizar la integración de AWS, Datadog obtiene sus métricas a través de la API de CloudWatch. Es posible que observe un retraso en las métricas de AWS debido a algunas limitaciones que existen en su API.

La API de CloudWatch solo ofrece un rastreo métrica por métrica para obtener datos. Las API de CloudWatch tienen un límite de frecuencia que varía según la combinación de credenciales de autenticación, región y servicio. AWS pone las métricas a disposición según el nivel de la cuenta. Por ejemplo, si paga por "métricas detalladas" dentro de AWS, estas estarán disponibles con mayor frecuencia. Este nivel de servicio para métricas detalladas también se aplica a la granularidad, con algunas métricas disponibles por minuto y otras cada cinco minutos.

Instale el Datadog Agent en el servidor para evitar retrasos en las métricas. Consulte la [documentación del Datadog Agent][3] para comenzar. Datadog tiene la capacidad de priorizar ciertas métricas dentro de una cuenta para obtenerlas más rápido, dependiendo de las circunstancias. Comuníquese con el [soporte de Datadog][4] para obtener información adicional.

### Retrasos esperados de las métricas {#expected-metric-delays}

El retraso entre el momento en que se genera una métrica en AWS y el momento en que aparece en Datadog depende del método de recopilación:

| Método de recopilación | Retraso típico | Notas |
|---|---|---|
| Sondeo de API (predeterminado) | Aproximadamente 10 minutos | Los límites de tasa de la API de CloudWatch y el tamaño de la cuenta pueden aumentar el retraso. |
| [CloudWatch Metric Streams][23] | De 2 a 3 minutos | Requiere una configuración independiente con Amazon Data Firehose. |
| [Datadog Agent][3] | Tiempo real | Recopila métricas directamente a nivel de servidor, sin CloudWatch. |

Además de los retrasos del método de recopilación, algunos servicios de AWS introducen su propia latencia en el lado de CloudWatch:

Las métricas de - **S3 Storage Lens** se publican diariamente, no de forma continua.
Las - **métricas de facturación de AWS** tienen un retraso de varias horas y se actualizan con poca frecuencia.
- **Detailed monitoring** para EC2 proporciona métricas de un minuto (en lugar de la granularidad predeterminada de cinco minutos), pero requiere habilitarlo para cada instancia en AWS.

**Nota**: Datadog no rellena los datos históricos de métricas. Consulte [Qué esperar después de la configuración][25] para obtener más detalles.

### Métricas faltantes {#missing-metrics}

Si no ve las métricas de AWS esperadas en Datadog, siga la siguiente lista de verificación:

1. **Verifique los permisos de IAM.** Confirme que la `DatadogAWSIntegrationRole` incluya los permisos necesarios para el servicio de AWS. Algunos servicios requieren permisos específicos del servicio más allá de la política de integración principal. Consulte las [páginas de integración de AWS][15] individuales para conocer los requisitos de permisos específicos del servicio.
2. **Verifique que la región de AWS esté habilitada.** En la [página de integración de AWS][16], confirme que la región donde están desplegados sus recursos esté seleccionada en la pestaña **General**. Las métricas solo se recopilan de las regiones habilitadas.
3. **Verifique que el servicio esté emitiendo métricas a CloudWatch.** Abra la consola de CloudWatch en AWS y confirme que existan las métricas esperadas. La API de CloudWatch solo devuelve métricas con puntos de datos, por lo que si un recurso está inactivo o no tiene componentes adjuntos (por ejemplo, un ELB sin instancias adjuntas), es posible que CloudWatch no informe métricas para él.
4. **Compruebe si el servicio requiere habilitación adicional.** Algunos servicios de AWS no emiten métricas a CloudWatch por defecto y requieren una configuración adicional en la consola de AWS. Consulte [¿Qué servicios de AWS requieren configuración adicional más allá de la integración principal?][26] para obtener una lista completa.
5. **Espere a que transcurra el intervalo de sondeo.** Espere al menos un ciclo de recopilación antes de investigar más a fondo. Consulte [Retrasos esperados en las métricas](#expected-metric-delays) para conocer los tiempos según el método de recopilación.
6. **Verifique las Service Control Policies (SCP).** Si su cuenta es parte de una organización de AWS, las SCP aplicadas a nivel de organización o de unidad organizativa (OU) pueden anular los permisos de IAM y bloquear las llamadas a la API. Verifique que ninguna SCP deniegue los permisos necesarios.
7. **Verifique los límites de permisos.** Un [límite de permisos][30] establece los permisos máximos que puede tener un rol. Si el límite no incluye una acción requerida por la integración de Datadog, AWS devuelve `AccessDenied` para esa acción, incluso cuando la política de rol de integración parece concederla. En la consola de IAM de AWS, abra el rol de integración y revise la pestaña **Permissions boundary** para comprobar si tiene asociado un límite de permisos.

### Recuento incorrecto de aws.elb.healthy_host_count {#wrong-count-of-awselbhealthy-host-count}

Cuando la opción de balanceo de carga entre zonas está habilitada en un ELB, todas las instancias conectadas a este ELB se consideran parte de todas las zonas de disponibilidad (por parte de CloudWatch). Por ejemplo, si tiene dos instancias en `1a` y tres instancias en `1b`, la métrica muestra cinco instancias por zona de disponibilidad.
Como esto puede ser poco intuitivo, las métricas **aws.elb.healthy_host_count_deduped** y **aws.elb.un_healthy_host_count_deduped** muestran el recuento de instancias saludables y no saludables por zona de disponibilidad, independientemente de si esta opción de balanceo de carga entre zonas está habilitada o no.

## Regiones {#regions}

### Comportamiento de la región {#region-behavior}

Datadog recopila métricas solo de las regiones de AWS que seleccione en la [página de integración de AWS][16]. Si no ve datos de un servicio específico, confirme que la región donde se implementó ese recurso esté habilitada.

#### Consideraciones {#considerations}

- **Servicios globales**: Algunos servicios de AWS (como IAM, CloudFront y Route 53) son globales y no están vinculados a una región específica. Las métricas de estos servicios suelen aparecer en `us-east-1` independientemente de la configuración de la región en Datadog.
- **Servicios regionales**: La mayoría de los servicios de AWS son regionales. Datadog solo recopila métricas de las regiones habilitadas explícitamente en el mosaico de integración.
- **Regiones de activación opcional**: Las regiones de activación opcional de AWS (como `af-south-1`, `ap-east-1` y `me-south-1`) deben habilitarse tanto en la [configuración de su cuenta de AWS][22] como en el mosaico de integración de Datadog. Si la región no está habilitada en AWS, Datadog no puede recopilar datos de ella.
- **Nuevas regiones**: Las regiones de AWS lanzadas recientemente se rastrean, pero es posible que no aparezcan de inmediato en la interfaz de usuario de Datadog ni en el proveedor de Terraform. Consulte la [página de integración de AWS][16] para obtener la lista más reciente de regiones compatibles.

## Interfaz de usuario de Datadog {#datadog-ui}

### Servidores duplicados al instalar el Agent {#duplicated-hosts-when-installing-the-agent}

Al instalar el Agent en un servidor de AWS, es posible que vea servidores duplicados en la página Infrastructure de Datadog durante unas horas si configuró manualmente el nombre del servidor en la configuración del Agent. Los servidores duplicados desaparecen unas horas después y esto no afecta su facturación.

## Datadog Agent {#datadog-agent}

### Metadatos de EC2 con IMDS v2 {#ec2-metadata-with-imds-v2}

En entornos en contenedores, el problema podría ser que haya restringido el punto de conexión de metadatos de EC2 mediante la asignación de roles/credenciales de IAM a los pods que se ejecutan en el clúster de Kubernetes. `Kube2IAM` y `kiam` son herramientas comunes utilizadas para hacer esto. Para resolver esto, actualice su configuración de `Kube2IAM` o `kiam` para permitir el acceso a este punto de conexión.

IMDSv2, en su configuración predeterminada, rechaza las conexiones con un número de saltos de IP mayor a uno, es decir, conexiones que han pasado a través de una puerta de enlace IP. Esto puede causar problemas cuando el Agent se ejecuta en un contenedor con una red distinta a la del servidor, ya que el entorno de ejecución reenvía el tráfico del contenedor a través de una puerta de enlace IP virtual. Esto es común en implementaciones de ECS. Las siguientes opciones pueden solucionar este problema:

 * [Aumente el número máximo de saltos a al menos `2`][8]. Hacerlo puede tener implicaciones para la seguridad de los datos almacenados en el IMDS, ya que permite que otros contenedores además del Agent accedan también a estos datos.
 * Utilice el nombre de servidor detectado por cloud-init [configurando `providers.eks.ec2.useHostnameFromFile` como true][9].
 * Ejecute el Agent en el espacio de nombres UTS del servidor, [configurando `agents.useHostNetwork` como true][10].

### Nombre de servidor de EC2 con IMDS {#ec2-hostname-with-imds}

#### Versiones del Agent anteriores a 7.64.0 {#agent-versions-before-7640}

En algunas situaciones, la configuración de [IMDSv2][5] de EC2 puede hacer que sea imposible para el Agent acceder a los metadatos necesarios. Esto puede hacer que el Agent recurra al proveedor de nombres de servidor `os` en lugar de `aws`, como se observa en la salida de `agent status`.

La API de AWS admite la desactivación de IMDSv1, que el Agent utiliza de forma predeterminada. Si este es el caso, pero IMDSv2 está habilitado y accesible, configure el parámetro `ec2_prefer_imdsv2` como `true` (el valor predeterminado es `false`) en su [configuración del Agent][6]. Consulte la documentación de [Transición al uso de Instance Metadata Service Version 2][7] para obtener más detalles.

Actualizar a Datadog Agent 7.64.0+ debería resolver estos problemas, ya que las versiones más recientes del Agent utilizan IMDSv2 de forma predeterminada.

#### Versión del Agent 7.64.0 y posteriores {#agent-version-7640-and-after}

A partir de la v7.64.0, Datadog Agent utiliza IMDSv2 de forma predeterminada y recurre a IMDSv1 en caso de error. Para revertir al comportamiento anterior, configure `ec2_imdsv2_transition_payload_enabled` como `false` en la configuración de su servidor.
Consulte la documentación de [Transición al uso de Instance Metadata Service Version 2][7] para obtener más detalles.

## Etiquetas {#tags}

### Retrasos en la recopilación y propagación de etiquetas {#tag-collection-and-propagation-delays}

Las etiquetas de AWS se recopilan como parte del ciclo de rastreo de la integración. Tenga en cuenta que la propagación de etiquetas puede tardar entre 15 minutos y varias horas después de aplicar etiquetas en AWS, según el servicio de AWS y el volumen de recursos de su cuenta.

Si agregó o cambió etiquetas recientemente en AWS y no las ve reflejadas en Datadog:
1. Espere al menos un ciclo de rastreo completo (aproximadamente 10 minutos para el sondeo de la API).
2. Verifique que el `DatadogAWSIntegrationRole` tenga los permisos necesarios relacionados con las etiquetas (por ejemplo, `tag:GetResources`).
3. Confirme que el tipo de recurso admite la recopilación de etiquetas. Datadog recopila etiquetas a través de la [AWS Resource Groups Tagging API][28]. Consulte los [tipos de recursos admitidos][29] en la documentación de AWS para verificar que su tipo de recurso sea compatible.

### Los servidores aún tienen etiquetas de AWS después de eliminar la integración de Amazon EC2 {#hosts-still-have-aws-tags-after-removing-the-amazon-ec2-integration}

Puede utilizar la integración de AWS para recopilar datos de CloudWatch, o instalar un Datadog Agent directamente en cada instancia EC2 para obtener datos y etiquetas. Si ha optado por utilizar ambos métodos para recopilar datos, el backend de Datadog combina los datos de la integración y del Datadog Agent en un único objeto de servidor.

Si eliminó la integración de AWS, pero continúa ejecutando un Datadog Agent en sus instancias EC2, los servidores de su cuenta de Datadog siguen teniendo asociadas las antiguas etiquetas de servidor recopiladas de AWS. Este es el comportamiento esperado y no indica que la integración de AWS o la integración de Amazon EC2 sigan habilitadas.

Puede verificar que la integración esté habilitada comprobando "Apps Running" (aplicaciones en ejecución) para ese servidor en la lista de infraestructura o consultando Metrics Catalog y creando un notebook limitado a ese servidor.

De forma predeterminada, las etiquetas a nivel de servidor permanecen asociadas permanentemente a los servidores de AWS. Si desea eliminar permanentemente las etiquetas de servidor de AWS de un servidor, puede hacerlo mediante los siguientes métodos:
   - Utilice el [punto de conexión de la API para eliminar etiquetas de servidor][11] para eliminar todas las etiquetas asignadas por el usuario a un solo servidor
   - Utilice la [herramienta remove_lingering_aws_host_tags.py][12] para eliminar todas las etiquetas asignadas por el usuario de una lista de servidores o de todos los servidores

[1]: /es/integrations/amazon_web_services/
[2]: /es/integrations/guide/error-datadog-not-authorized-sts-assume-role/#pagetitle
[3]: /es/agent/
[4]: /es/help/
[5]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html
[6]: /es/agent/configuration/agent-configuration-files/
[7]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html#instance-metadata-transition-to-version-2
[8]: https://docs.aws.amazon.com/cli/latest/reference/ec2/modify-instance-metadata-options.html
[9]: https://github.com/DataDog/helm-charts/blob/58bf52e4e342c79dbec95659458f7de8c5de7e6c/charts/datadog/values.yaml#L1683-L1688
[10]: https://github.com/DataDog/helm-charts/blob/58bf52e4e342c79dbec95659458f7de8c5de7e6c/charts/datadog/values.yaml#L930-L937
[11]: /es/api/latest/tags/#remove-host-tags
[12]: https://github.com/DataDog/Miscellany/blob/master/remove_lingering_aws_host_tags.py
[13]: https://api.datadoghq.com/api/v2/integration/aws/iam_permissions
[14]: https://github.com/DataDog/cloudformation-template/tree/master/aws_attach_integration_permissions
[15]: /es/integrations/#cat-aws
[16]: https://app.datadoghq.com/integrations/amazon-web-services
[17]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Dimension
[18]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Monitoring.OS.Enabling.html
[19]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html#turning_on_billing_metrics
[20]: /es/metrics/#time-aggregation
[21]: /es/metrics/#space-aggregation
[22]: https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-regions.html
[23]: /es/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/
[24]: /es/integrations/guide/monitor-your-aws-billing-details/
[25]: /es/getting_started/integrations/aws/#what-to-expect-after-setup
[26]: /es/integrations/guide/aws-integration-and-cloudwatch-faq/#which-aws-services-require-additional-setup-beyond-the-core-integration
[27]: /es/integrations/amazon_elb/
[28]: https://docs.aws.amazon.com/resourcegroupstagging/latest/APIReference/overview.html
[29]: https://docs.aws.amazon.com/resourcegroupstagging/latest/APIReference/supported-services.html
[30]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html