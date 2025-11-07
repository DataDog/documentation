---
description: Pasos para configurar manualmente la integración de AWS con Datadog
further_reading:
- link: https://docs.datadoghq.com/integrations/amazon_web_services/
  tag: Documentación
  text: Integración con AWS
- link: https://docs.datadoghq.com/serverless/libraries_integrations/forwarder/
  tag: Documentación
  text: Función Lambda del Datadog Forwarder
- link: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/
  tag: Guía
  text: Enviar logs de servicios de AWS con el destino de Datadog Amazon Data Firehose
- link: https://docs.datadoghq.com/integrations/guide/aws-integration-troubleshooting/
  tag: Guía
  text: Solucionar problemas de integración con AWS
- link: https://docs.datadoghq.com/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/
  tag: Guía
  text: AWS CloudWatch Metric Streams con Amazon Data Firehose
- link: https://www.datadoghq.com/blog/aws-monitoring/
  tag: Blog
  text: Métricas clave para la monitorización de AWS
- link: https://www.datadoghq.com/blog/monitoring-ec2-instances-with-datadog/
  tag: Blog
  text: Cómo monitorizar instancias EC2 con Datadog
- link: https://www.datadoghq.com/blog/monitoring-aws-lambda-with-datadog/
  tag: Blog
  text: Monitorización de AWS Lambda con Datadog
- link: https://www.datadoghq.com/blog/cloud-security-posture-management/
  tag: Blog
  text: Presentación de Cloud Security Posture Management de Datadog
- link: https://www.datadoghq.com/blog/datadog-workload-security/
  tag: Blog
  text: Protege tu infraestructura en tiempo real con Datadog Cloud Workload Security
- link: https://www.datadoghq.com/blog/announcing-cloud-siem/
  tag: Blog
  text: Presentación de Datadog Security Monitoring
- link: https://www.datadoghq.com/blog/tagging-best-practices/#aws
  tag: Blog
  text: Prácticas recomendadas para el etiquetado de tu infraestructura y aplicaciones
title: Guía de configuración manual de AWS
---

## Información general

Utiliza esta guía para configurar manualmente la  [integración con AWS][1] de Datadog.

{{< tabs >}}
{{% tab "Delegación de rol" %}}

Para configurar manualmente la integración de AWS, crea una política y un rol de IAM en tu cuenta de AWS y configura el rol con un ID externo de AWS generado en tu cuenta de Datadog. Esto permite que la cuenta de AWS de Datadog consulte las API de AWS en tu nombre y extraiga datos en tu cuenta de Datadog. Las siguientes secciones detallan los pasos para crear cada uno de estos componentes y luego completar la configuración en tu cuenta de Datadog.

{{< site-region region="gov" >}}
<div class="alert alert-danger">
  <em>La configuración de archivos de logs de S3 mediante la Delegación de roles tiene una disponibilidad limitada. Ponte en contacto con el <a href="https://docs.datadoghq.com/help/">servicio de asistencia de Datadog</a> para solicitar esta función en tu cuenta Datadog for Government</em>.
</div>
{{< /site-region >}}

## Configuración

### Generar un ID externo

1. En la [página de configuración de la integración AWS)][1], haz clic en **Add AWS Account(s)** (Añadir cuenta(s) de AWS) y, a continuación, selecciona **Manualmente**.
2. Elige la partición de AWS a la que está delimitada tu cuenta de AWS. La partición puede ser `aws` para regiones comerciales, `aws-cn` para China* o `aws-us-gov` para GovCloud. Para obtener más información, consulta [Particiones][2] en la documentación de AWS.
{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
3. Selecciona `Role Delegation` para el tipo de acceso. La delegación de roles sólo es compatible con cuentas AWS delimitadas a regiones comerciales de AWS.
{{< /site-region >}}
{{< site-region region="gov" >}}
3. Selecciona `Role Delegation` para el tipo de acceso. La delegación de roles sólo es compatible con cuentas de AWS delimitadas a las regiones comerciales de AWS o AWS GovCloud.
{{< /site-region >}}
4. Copia el `AWS External ID` Para obtener más información sobre el ID externo, consulta la [guía del usuario de IAM][3].
  **Nota**: El ID externo permanece disponible y no se regenera durante 48 horas, a menos que un usuario lo cambie explícitamente o que se añada otra cuenta de AWS a Datadog durante este periodo. Puedes volver a la página **Añadir cuenta(s) de AWS** dentro de ese periodo de tiempo sin que cambie el ID externo.

### Crear un rol IAM para la integración Datadog 

Datadog asume este rol para recopilar datos en tu nombre.

1. Ve a la [consola de IAM][4] de AWS y haz clic en `Create role` (Crear rol).
2. Selecciona **Cuenta de AWS** para el tipo de entidad de confianza, y **Otra cuenta de AWS**.
{{< site-region region="us,us3,us5,eu" >}}
3. Introduce `464622532012` como `Account ID`. Este es el ID de la cuenta de Datadog y concede a Datadog acceso a tus datos de AWS.
{{< /site-region >}}
{{< site-region region="ap1" >}}
3. Introduce `417141415827` como `Account ID`. Este es el ID de la cuenta de Datadog y concede a Datadog acceso a tus datos de AWS.
{{< /site-region >}}
{{< site-region region="ap2" >}}
3. Introduce `412381753143` como `Account ID`. Este es el ID de la cuenta de Datadog y concede a Datadog acceso a tus datos de AWS.
{{< /site-region >}}
{{< site-region region="gov" >}}
3. Si la cuenta de AWS que quieres integrar es una cuenta GovCloud, introduce `065115117704` como `Account ID`. De lo contrario, introduce `392588925713`. Este es el ID de la cuenta de Datadog y concede a Datadog acceso a tus datos de AWS.
{{< /site-region >}}
**Nota**: Asegúrate de que el selector de **SITIO DATADOG** de la derecha de esta página de documentación está configurado en tu sitio Datadog, antes de copiar el ID de cuenta anterior.

4. Selecciona **Solicitar ID externo** e introduce el ID externo copiado en la sección anterior.
Deja `Require MFA` desactivado. Para obtener más detalles, consulta la página [Acceder a cuentas de AWS que son propiedad de terceros][3] en la documentación de AWS.
5. Haz clic en **Next** (Siguiente).
6. Para habilitar la [recopilación de recursos][5], adjunta la <a href="https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/SecurityAudit" target="_blank">política AWS SecurityAudit</a> al rol.
7. Haz clic en **Next** (Siguiente).
8. Asigna un nombre al rol, por ejemplo `DatadogIntegrationRole`. Opcionalmente, proporciona una descripción y añade etiquetas (tags) al rol.
9. Haz clic en **Create Role** (Crear rol).

### Crear una política IAM en línea para el rol de la integración Datadog 

Esta política define los permisos necesarios para que el rol de la integración Datadog recopile datos de cada integración AWS ofrecida por Datadog. Estos permisos pueden cambiar a medida que se añaden nuevos servicios AWS a esta integración.

1. Selecciona el rol de la integración Datadog en la [página de roles IAM)][4].
2. Haz clic en **Add permissions** (Añadir permisos) y selecciona **Crear política en línea**.
3. Selecciona la pestaña **JSON**.
4. Pega la [política de permisos](#aws-integration-iam-policy) en el cuadro de texto.<br>
  **Nota**: Opcionalmente, puedes añadir elementos de [condición][6] a la política IAM. Por ejemplo, las condiciones se pueden utilizar para [restringir la monitorización a determinadas regiones][7].
5. Haz clic en **Next** (Siguiente).
6. Asigna a la política un nombre como `DatadogIntegrationPolicy`.
7. Haz clic en **Create policy** (Crear política).

### Finalizar la configuración en Datadog

1. Vuelve a la sección de configuración manual de la [página de configuración de la integración AWS][1]. 
2. Haz clic en la casilla de verificación `I confirm that the Datadog IAM Role has been added to the AWS Account`.
3. En la sección **ID de cuenta**, introduce tu ID de cuenta **sin guiones**; por ejemplo, `123456789012`. Puedes encontrar el ID de cuenta en el ARN del rol de la integración Datadog, que sigue el formato `arn:aws:iam::<ACCOUNT_ID>:role/<ROLE_NAME>`.
4. En la sección **Nombre del rol AWS**, introduce el nombre del rol de la integración Datadog creado anteriormente.
  **Nota**: El nombre del rol distingue entre mayúsculas y minúsculas, y debe coincidir exactamente con el nombre del rol en AWS.
5. Haz clic en **Save** (Guardar).
6. Espera hasta 10 minutos para que se empiecen a recopilar datos y, a continuación, consulta el <a href="https://app.datadoghq.com/screen/integration/7/aws-overview" target="_blank">dashboard de información general de AWS</a> para ver las métricas enviadas por tus servicios y tu infraestructura AWS.

<div class="alert alert-danger">Si se produce un error <code>Datadog no tiene autorización para llevar a cabo sts:AssumeRole</code>. Sigue los pasos de resolución de problemas recomendados en la interfaz de usuario o lee la <a href="https://docs.datadoghq.com/integrations/guide/error-datadog-not-authorized-sts-assume-role/" target="_blank">guía de resolución de problemas</a>.</div>

*\* Cualquier uso de los servicios Datadog en China continental (o relacionados con entornos de esta localización) está sujeto a la cláusula de exención de responsabilidad, publicada en la sección [Localizaciones con restricciones de servicio][8] de nuestro sitio web.*

[1]: https://app.datadoghq.com/integrations/amazon-web-services
[2]: https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/partitions.html
[3]: http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html
[4]: https://console.aws.amazon.com/iam/home#/roles
[5]: /es/integrations/amazon_web_services/#resource-collection
[6]: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_condition.html
[7]: https://aws.amazon.com/blogs/security/easier-way-to-control-access-to-aws-regions-using-iam-policies/
[8]: https://www.datadoghq.com/legal/restricted-service-locations/
{{% /tab %}}
{{% tab "Access keys" %}}

## Configuración

### AWS

1. En tu consola de AWS crea un usuario de IAM para que lo utilice la integración de Datadog con los [permisos necesarios](#aws-integration-iam-policy).
2. Genera una clave de acceso y una clave secreta para el usuario de IAM en la integración de Datadog.

### Datadog

3. En el [cuadro de integración de AWS][1], haz clic en **Add AWS Account** (Añadir cuenta de AWS) y, a continuación, selecciona **Manually** (Manualmente).
4. Selecciona la pestaña **Claves de acceso**.
5. Elige la partición en AWS a la que se delimita tu cuenta AWS. La partición puede ser `aws` para regiones comerciales, `aws-cn` para China* o `aws-us-gov` para GovCloud. Consulta [Particiones][9] en la documentación de AWS para obtener más información.
5. Haz clic en la casilla de verificación **I confirm that the IAM User for the Datadog Integration has been added to the AWS Account** (Confirmo que el usuario de IAM para la integración de Datadog se ha añadido a la cuenta de AWS).
6. Introduce tu `Account ID`, `AWS Access Key` y `AWS Secret Key`.
7. Haz clic en **Save** (Guardar).
8. Espera hasta 10 minutos para que los datos comiencen a recopilarse y, a continuación, consulta el <a href="https://app.datadoghq.com/screen/integration/7/aws-overview" target="_blank">dashboard de resumen de AWS</a> para ver las métricas enviadas por tus servicios e infraestructura de AWS .

*\* Cualquier uso de los servicios Datadog en China continental (o relacionados con entornos de esta localización) está sujeto a la cláusula de exención de responsabilidad, publicada en la sección [Localizaciones con restricciones de servicio][2] de nuestro sitio web.*

[1]: https://app.datadoghq.com/integrations/amazon-web-services
[2]: https://www.datadoghq.com/legal/restricted-service-locations/
{{% /tab %}}
{{< /tabs >}}

{{% aws-permissions %}}

{{% aws-resource-collection %}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/amazon_web_services/