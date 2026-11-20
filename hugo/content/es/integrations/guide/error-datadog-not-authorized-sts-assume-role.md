---
aliases:
- /es/integrations/faq/error-datadog-not-authorized-sts-assume-role
further_reading:
- link: /integrations/amazon_web_services/#installation
  tag: Documentación
  text: Instalación de AWS Datadog
title: 'Error: Datadog no está autorizado a realizar sts:AssumeRole'
---

Este error suele indicar un problema con la política de confianza asociada al rol de integración de Datadog. La mayoría de las veces, este problema está causado por el [proceso de delegación de rol][1].

Comprueba los siguientes puntos para la cuenta de AWS mencionada en el error:

{{< site-region region="us,us3,us5,eu,gov" >}}
1. Si has creado un rol de IAM, asegúrate de que estás utilizando el nombre de rol de IAM correcto en la página de la [integración de Datadog AWS][2]. Los espacios o caracteres adicionales en AWS o Datadog hacen que falle la delegación del rol. Si desplegaste el rol con CloudFormation, el nombre de rol de IAM predeterminado se establece como [DatadogIntegrationRole][3].

2. En la página del rol de integración de Datadog en AWS, bajo la pestaña **Trust relationships** (Relaciones de confianza), asegúrate de que **Principal** está configurado como se indica a continuación:

{{< code-block lang="json" filename="" disable_copy="true" collapsible="false" >}}

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::464622532012:root"
            },
            "Action": "sts:AssumeRole",
            "Condition": {
                "StringEquals": {
                    "sts:ExternalId": "<YOUR_AWS_EXTERNAL_ID>"
                }
            }
        }
    ]
}

{{< /code-block >}}

[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://github.com/DataDog/cloudformation-template/blob/master/aws/datadog_integration_role.yaml
{{< /site-region >}}
{{< site-region region="ap1" >}}
1. Si has creado un rol de IAM, asegúrate de que estás utilizando el nombre de rol de IAM correcto en la página de la [integración de Datadog AWS][2]. Los espacios o caracteres adicionales en AWS o Datadog hacen que falle la delegación del rol. Si desplegaste el rol con CloudFormation, el nombre de rol de IAM predeterminado se establece como [DatadogIntegrationRole][3].

2. En la página del rol de integración de Datadog en AWS, bajo la pestaña **Trust relationships** (Relaciones de confianza), asegúrate de que **Principal** está configurado como se indica a continuación:

{{< code-block lang="json" filename="" disable_copy="true" collapsible="false" >}}

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::417141415827:root"
            },
            "Action": "sts:AssumeRole",
            "Condition": {
                "StringEquals": {
                    "sts:ExternalId": "<YOUR_AWS_EXTERNAL_ID>"
                }
            }
        }
    ]
}

{{< /code-block >}}

[2]: https://ap1.datadoghq.com/integrations/amazon-web-services
[3]: https://github.com/DataDog/cloudformation-template/blob/master/aws/datadog_integration_role.yaml
{{< /site-region >}}

3. El ID externo de AWS de la página de roles debe coincidir con el valor del ID externo de AWS de la pestaña **Account Details** (Detalles de la cuenta) en la página [integración de AWS][2]. Actualiza el rol de IAM en AWS con el valor del ID externo de AWS de la página de la integración en Datadog, o genera un nuevo ID externo de AWS en Datadog y haz clic en **Save** (Guardar):
  {{< img src="integrations/guide/aws_error_sts_assume_role/new-aws-external-id.png" alt="Página de integración de Datadog AWS con los campos Nombre de rol de AWS e ID externo de AWS y el botón Generar nuevo ID" >}}

4. Si has generado un nuevo ID externo de AWS, añádelo a tu política de confianza de AWS:
  {{< img src="integrations/guide/aws_error_sts_assume_role/aws-trust-policy-document.png" alt="Documento de política de confianza de AWS con el parámetro sts:ExternalId resaltado" >}}

**Nota**: El error **puede** persistir en la interfaz de usuario durante unas horas mientras se propagan los cambios.

Si ves el error STS AssumeRole limitado a una o unas pocas regiones:
```
Datadog is not authorized to perform action sts:AssumeRole Account affected:<account_id> Regions affected: us-east-1, eu-west-1
```
El origen del problema podría ser las [Políticas de control de servicios de AWS][4].
```
Service control policies (SCPs) are a type of organization policy that you can use to manage permissions in your organization. SCPs offer central control over the maximum available permissions for all accounts in your organization. SCPs help you to ensure your accounts stay within your organization's access control guidelines.
```

Para eliminar el error de la página de la integración, puedes excluir regiones en tu integración de AWS en la pestaña **General**, o utilizar la API [Actualizar una integración de AWS][5].

¿Todavía necesitas ayuda? Ponte en contacto con el [soporte de Datadog][6].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/amazon_web_services/?tab=roledelegation#setup
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html
[5]: https://docs.datadoghq.com/es/api/latest/aws-integration/#update-an-aws-integration
[6]: /es/help/