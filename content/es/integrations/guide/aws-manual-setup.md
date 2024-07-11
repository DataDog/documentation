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
  text: Enviar logs de servicios de AWS con el destino Datadog Kinesis Firehose
- link: https://docs.datadoghq.com/integrations/guide/aws-integration-troubleshooting/
  tag: Guía
  text: Solucionar problemas de integración con AWS
- link: https://docs.datadoghq.com/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/
  tag: Guía
  text: Flujos de métricas de AWS CloudWatch con Kinesis Data Firehose
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

## Configuración

### Generar un ID externo

1. En la [página de configuración de la integración de AWS][1], haz clic en **Add AWS Account** (Añadir cuenta de AWS) y a continuación selecciona **Manually** (Manualmente).
2. Selecciona `Role Delegation` para el tipo de acceso y copia el `AWS External ID`. Para más información sobre el ID externo, consulta el [Manual del usuario de IAM][2].
  **Nota:** El ID externo permanece disponible y no se regenera durante 48 horas, a menos que algún usuario lo cambie explícitamente o se añada otra cuenta de AWS a Datadog durante ese periodo. Puedes volver a la página **Add New AWS Account** (Añadir nueva cuenta de AWS) en ese plazo para acabar de añadir una cuenta sin que cambie el ID externo.

### Política de IAM en AWS para Datadog
Crea una política de IAM para el rol de Datadog en tu cuenta de AWS con los [permisos necesarios](#aws-integration-iam-policy) para aprovechar todas las integraciones con AWS que ofrece Datadog. A medida que se añaden otros componentes a una integración, estos permisos pueden cambiar.

3. Crear una nueva política en la [consola IAM][3] de AWS.
4. Selecciona la pestaña **JSON**. Pega las [políticas de permisos](#aws-integration-iam-policy) en el campo de texto.
5. Haz clic en**Next: Tags** (Siguiente: etiquetas) y **Next: Review** (Siguiente: revisión).
6. Asígnale a la política el nombre `DatadogIntegrationPolicy` u otro de tu elección, y añade una descripción adecuada.
7. Haz clic en **Create policy** (Crear política).

### Rol de IAM en AWS para Datadog
Crea un rol de IAM para que Datadog utilice los permisos definidos en la política de IAM.

8. Crea un nuevo rol en la [consola IAM][4] de AWS.
9. Selecciona **AWS account** (Cuenta de AWS) para el tipo de entidad de confianza y, después, selecciona **Another AWS account** (Otra cuenta de AWS).
{{< site-region region="us,us3,us5,eu" >}}
10. Introduce `464622532012` como el `Account ID`. Este es el ID de la cuenta de Datadog y concede a Datadog acceso a tus datos de AWS.
{{< /site-region >}}
{{< site-region region="ap1" >}}
10. Introduce `417141415827` como el `Account ID`. Este es el  ID de la cuenta de Datadog y concede a Datadog acceso a tus datos de AWS.
{{< /site-region >}}
11. Selecciona **Require external ID** (Requerir ID externo) e introduce el ID externo copiado en la sección [Generate an external ID](#generate-an-external-id) (Generar un ID externo).
Asegúrate de dejar `Require MFA` deshabilitado. Para obtener más detalles, consulta la documentación de AWS [Cómo utilizar un ID externo al conceder a un tercero acceso a tus recursos de AWS][2].
12. Haz clic en **Next** (Siguiente).
13. Si ya has creado la política, búscala en esta página y selecciónala. De lo contrario, haz clic en **Create Policy** (Crear política). Se abrirá en una ventana nueva y podrás seguir las instrucciones de la sección anterior.
14. También puedes asociar la <a href="https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/SecurityAudit" target="_blank">AWS SecurityAudit Policy</a> al rol para usar [Cloud Security Posture Management][5] (CSPM) de Datadog.
15. Haz clic en **Siguiente**.
16. Dale al rol un nombre (por ejemplo `DatadogIntegrationRole`) y una descripción adecuada.
17. Haz clic en **Create rol** (Crear rol).

### Completar la configuración en Datadog

18. Regresa a la página de configuración de la integración de AWS para añadir manualmente una cuenta en Datadog que tuvieras abierta en otra pestaña. Haz clic en la casilla de verificación para confirmar que el rol IAM de Datadog se haya añadido a la cuenta de AWS.
19. Introduce el ID de la cuenta **sin guiones**; por ejemplo: `123456789012`. Tu ID de cuenta se encuentra en el ARN del rol creado para Datadog.
20. Introduce el nombre del rol creado en la sección anterior y haz clic en **Save** (Guardar).
  **Nota:** El nombre del rol que indiques en el cuadro de integración distingue las mayúsculas y debe coincidir exactamente con el nombre del rol en AWS.
21. Si se produce el error [Datadog no tiene autorización para realizar sts:AssumeRole][6], sigue los pasos recomendados para solucionar problemas en la interfaz de usuario o consulta la [guía de solución de problemas][6].
22. Espera hasta 10 minutos para que los datos comiencen a recopilarse y, a continuación, consulta el <a href="https://app.datadoghq.com/screen/integration/7/aws-overview" target="_blank">dashboard de resumen de AWS</a>predeterminado para ver las métricas enviadas por tus servicios e infraestructura de AWS. 


[1]: https://app.datadoghq.com/integrations/amazon-web-services
[2]: http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html
[3]: https://console.aws.amazon.com/iam/home#/policies
[4]: https://console.aws.amazon.com/iam/home#/roles
[5]: /es/security/cspm
[6]: /es/integrations/guide/error-datadog-not-authorized-sts-assume-role/
{{% /tab %}}
{{% tab "Claves de acceso (solo GovCloud o China)" %}}

## Configuración

### AWS

1. En tu consola de AWS crea un usuario de IAM para que lo utilice la integración de Datadog con los [permisos necesarios](#aws-integration-iam-policy).
2. Genera una clave de acceso y una clave secreta para el usuario IAM de integración de Datadog.

### Datadog

3. En el [cuadro de integración de AWS][1], haz clic en **Add AWS Account** (Añadir cuenta de AWS) y, a continuación, selecciona **Manually** (Manualmente).
4. Selecciona la pestaña **Claves de acceso (solo GovCloud o China)**.
5. Introduce tu `Account ID`, `AWS Access Key` y `AWS Secret Key`. Solo se aceptan claves de acceso y secretos para GovCloud y China.
6. Haz clic en **Save** (Guardar).
7. Espera hasta 10 minutos para que los datos comiencen a recopilarse y, a continuación, consulta el <a href="https://app.datadoghq.com/screen/integration/7/aws-overview" target="_blank">dashboard de resumen de AWS</a> para ver las métricas enviadas por tus servicios e infraestructura de AWS .

[1]: https://app.datadoghq.com/integrations/amazon-web-services
{{% /tab %}}
{{< /tabs >}}

{{% aws-permissions %}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/amazon_web_services/