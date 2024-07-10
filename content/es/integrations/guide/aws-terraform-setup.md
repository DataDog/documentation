---
aliases:
- /es/integrations/faq/aws-integration-with-terraform/
disable_toc: true
further_reading:
- link: https://www.datadoghq.com/blog/managing-datadog-with-terraform/
  tag: Blog
  text: Gestión de Datadog con Terraform
title: La integración de AWS con Terraform
---

Mediante el uso de [Terraform][1], puedes crear el rol IAM de Datadog, el documento de política y la integración Datadog-AWS con un único comando `terraform apply`.


1. Configura el proveedor de Terraform en Datadog][2] para interactuar con la API de Datadog a través de una configuración de Terraform.

{{< site-region region="us,us3,us5,eu" >}}

2. Configura tu archivo de ajustes de Terraform utilizando el siguiente ejemplo como plantilla base. Asegúrate de actualizar los siguientes parámetros antes de aplicar los cambios:
   * `AWS_PERMISSIONS_LIST`: Políticas de IAM que necesitan las integraciones Datadog con AWS. La lista actual está disponible en la documentación [Integración de Datadog con AWS][1].
   * `AWS_ACCOUNT_ID`:  El ID de tu cuenta de AWS.

   Consulta el [registro de Terraform][2] para obtener más ejemplos de uso y la lista completa de parámetros opcionales, así como recursos adicionales de Datadog.

   ```hcl
   data "aws_iam_policy_document" "datadog_aws_integration_assume_role" {
      statement {
      actions = ["sts:AssumeRole"]

      principals {
         type = "AWS"
         identifiers = ["arn:aws:iam::464622532012:root"]
      }
      condition {
         test = "StringEquals"
         variable = "sts:ExternalId"

         values = [
            "${datadog_integration_aws.sandbox.external_id}"
         ]
      }
      }
   }

   data "aws_iam_policy_document" "datadog_aws_integration" {
      statement {
      actions = [<AWS_PERMISSIONS_LIST>]

      resources = ["*"]
      }
   }

   resource "aws_iam_policy" "datadog_aws_integration" {
      name = "DatadogAWSIntegrationPolicy"
      policy = "${data.aws_iam_policy_document.datadog_aws_integration.json}"
   }

   resource "aws_iam_role" "datadog_aws_integration" {
      name = "DatadogAWSIntegrationRole"
      description = "Role for Datadog AWS Integration"
      assume_role_policy = "${data.aws_iam_policy_document.datadog_aws_integration_assume_role.json}"
   }

   resource "aws_iam_role_policy_attachment" "datadog_aws_integration" {
      role = "${aws_iam_role.datadog_aws_integration.name}"
      policy_arn = "${aws_iam_policy.datadog_aws_integration.arn}"
   }

   resource "datadog_integration_aws" "sandbox" {
      account_id  = "<AWS_ACCOUNT_ID>"
      role_name   = "DatadogAWSIntegrationRole"
   }
   ```

   [1]: /integrations/amazon_web_services/?tab=manual#aws-iam-permissions
   [2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws
{{< /site-region >}}

{{< site-region region="ap1" >}}

2. Configura tu archivo de configuración de Terraform utilizando el siguiente ejemplo como plantilla base. Asegúrate de actualizar los siguientes parámetros antes de aplicar los cambios:
   * `AWS_PERMISSIONS_LIST`: Políticas de IAM que necesitan las integraciones de AWS con Datadog. La lista actual está disponible en la documentación [Integración de AWS con Datadog][1].
   * `AWS_ACCOUNT_ID`:  Tu ID de cuenta AWS.

   Consulta el [registro de Terraform][2] para obtener más ejemplos de uso y la lista completa de parámetros opcionales, así como recursos adicionales de Datadog.

   ```hcl
   data "aws_iam_policy_document" "datadog_aws_integration_assume_role" {
      statement {
      actions = ["sts:AssumeRole"]

      principals {
         type = "AWS"
         identifiers = ["arn:aws:iam::417141415827:root"]
      }
      condition {
         test = "StringEquals"
         variable = "sts:ExternalId"

         values = [
            "${datadog_integration_aws.sandbox.external_id}"
         ]
      }
      }
   }

   data "aws_iam_policy_document" "datadog_aws_integration" {
      statement {
      actions = [<AWS_PERMISSIONS_LIST>]

      resources = ["*"]
      }
   }

   resource "aws_iam_policy" "datadog_aws_integration" {
      name = "DatadogAWSIntegrationPolicy"
      policy = "${data.aws_iam_policy_document.datadog_aws_integration.json}"
   }

   resource "aws_iam_role" "datadog_aws_integration" {
      name = "DatadogAWSIntegrationRole"
      description = "Role for Datadog AWS Integration"
      assume_role_policy = "${data.aws_iam_policy_document.datadog_aws_integration_assume_role.json}"
   }

   resource "aws_iam_role_policy_attachment" "datadog_aws_integration" {
      role = "${aws_iam_role.datadog_aws_integration.name}"
      policy_arn = "${aws_iam_policy.datadog_aws_integration.arn}"
   }

   resource "datadog_integration_aws" "sandbox" {
      account_id  = "<AWS_ACCOUNT_ID>"
      role_name   = "DatadogAWSIntegrationRole"
   }
   ```

[1]: /es/integrations/amazon_web_services/?tab=manual#aws-iam-permissions
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws
{{< /site-region >}}

{{< site-region region="gov" >}}

2. Si estás usando claves de acceso para instalar la integración de AWS con Datadog, asegúrate de haber creado un usuario de IAM con los [permisos necesarios][1] y la clave de acceso, tal y como se describe en la [guía de configuración manual de AWS][3]. Añade tu ID de clave de acceso y la clave de acceso secreta a los marcadores del siguiente ejemplo. Para obtener información sobre el uso de Terraform para configurar el usuario de AWS y la clave de acceso asociada, consulta los recursos [Proveedor de AWS][2] en el registro de Terraform.

   ```
   resource "datadog_integration_aws" "sandbox" {
      access_key_id = "<ACCESS_KEY_ID>"
      secret_access_key = "<SECRET_ACCESS_KEY>"
   }
   ```

[1]: /es/integrations/guide/aws-manual-setup/?tab=accesskeysgovcloudorchinaonly#aws-integration-iam-policy
[2]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs
[3]: /es/integrations/guide/aws-manual-setup/?tab=accesskeysgovcloudorchinaonly#aws
{{< /site-region>}}

3. Ejecuta `terraform apply`. Espera hasta 10 minutos para que los datos comiencen a recopilarse y, a continuación, consulta el [dashboard de información general de AWS][5] para ver las métricas enviadas por tus servicios e infraestructura de AWS. 

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.terraform.io
[2]: https://docs.datadoghq.com/es/integrations/terraform/#overview
[5]: https://app.datadoghq.com/screen/integration/7/aws-overview