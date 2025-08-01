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
    * Si aún no lo ha hecho, configure `api_url` con la URL de la API de su sitio Datadog.
    * **Nota**: El recurso `datadog_integration_aws_account` sustituyó al recurso `datadog_integration_aws` en la versión `3.50.0` del proveedor de Datadog Terraform. Para actualizar desde el recurso `datadog_integration_aws`, consulta [Actualización desde recursos de datadog_integration_aws][3].

{{< site-region region="us,us3,us5,eu" >}}
2. Configura tu archivo de ajustes de Terraform utilizando el siguiente ejemplo como plantilla base. Asegúrate de actualizar los siguientes parámetros antes de aplicar los cambios:
   * `AWS_PERMISSIONS_LIST`: Políticas de IAM que necesitan las integraciones Datadog con AWS. La lista actual está disponible en la documentación [Integración de Datadog con AWS][1].
   * `AWS_ACCOUNT_ID`:  El ID de tu cuenta de AWS.

Consulta el [registro de Terraform][2] para obtener más ejemplos de uso y la lista completa de parámetros opcionales, así como recursos adicionales de Datadog.

```hcl
data "aws_iam_policy_document" "datadog_aws_integration_assume_role" {
  declaración {
    acciones = ["sts:AssumeRole"]
    directores {
      tipo = "AWS"
      identificadores = ["arn:aws:iam::464622532012:root"]
    }
    condición {
      test     = "StringEquals"
      variable = "sts:ExternalId"
      valores = [
        "${datadog_integration_aws_account.datadog_integration.auth_config.aws_auth_config_role.external_id}"
      ]
    }
  }
}

data "aws_iam_policy_document" "datadog_aws_integration" {
  declaración {
    acciones = [<AWS_PERMISSIONS_LIST>]
    resources = ["*"]
  }
}

recurso "aws_iam_policy" "datadog_aws_integration" {
  name = "DatadogAWS IntegrationPolicy"
  policy = data.aws_iam_policy_document.datadog_aws_integration.json
}
resource "aws_iam_role" "datadog_aws_integration" {
  name = "DatadogIntegrationRole"
  description = "Rol para Datadog AWS Integración"
  assume_role_policy = data.aws_iam_policy_document.datadog_aws_integration_assume_role.json
}
resource "aws_iam_role_policy_attachment" "datadog_aws_integration" {
  rol = aws_iam_role.datadog_aws_integration.name
  policy_arn = aws_iam_policy.datadog_aws_integration.arn
}
resource "aws_iam_role_policy_attachment" "datadog_aws_integration_security_audit" {
  rol = aws_iam_role.datadog_aws_integration.name
  policy_arn = "arn:aws:iam::aws:policy/SecurityAudit"
}

resource "datadog_integration_aws_account" "datadog_integration" {
  account_tags = []
  aws_account_id = "<ACCOUNT_ID>"
  aws_partition = "aws"
  aws_regions {
    include_all = true
  }
  auth_config {
    aws_auth_config_role {
      role_name = "DatadogIntegrationRole"
    }
  }
    resources_config {
    cloud_security_posture_management_collection = false
    extended_collection = true
  }
  traces_config {
    xray_services {
    }
  }
    logs_config {
    lambda_forwarder {
    }
  }
  metrics_config {
    namespace_filters {
    }
  }
}
```

<div class="alert alert-info"></a><strong>Nota</strong>: Por defecto, la configuración anterior no incluye Cloud Security. Para habilitar Cloud Security, en <code>resources_config</code>, establezca <code>cloud_security_posture_management_collection = true</code>.</div>

[1]: /es/integrations/amazon_web_services/?tab=manual#aws-iam-permissions
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws_account
{{< /site-region >}}

{{< site-region region="ap1" >}}
2. Configura tu archivo de ajustes de Terraform utilizando el siguiente ejemplo como plantilla base. Asegúrate de actualizar los siguientes parámetros antes de aplicar los cambios:
   * `AWS_PERMISSIONS_LIST`: Políticas de IAM que necesitan las integraciones Datadog con AWS. La lista actual está disponible en la documentación [Integración de Datadog con AWS][1].
   * `AWS_ACCOUNT_ID`:  El ID de tu cuenta de AWS.

Consulta el [registro de Terraform][2] para obtener más ejemplos de uso y la lista completa de parámetros opcionales, así como recursos adicionales de Datadog.

```hcl
data "aws_iam_policy_document" "datadog_aws_integration_assume_role" {
  declaración {
    acciones = ["sts:AssumeRole"]
    directores {
      tipo = "AWS"
      identificadores = ["arn:aws:iam::417141415827:root"]
    }
    condición {
      test     = "StringEquals"
      variable = "sts:ExternalId"
      valores = [
        "${datadog_integration_aws_account.datadog_integration.auth_config.aws_auth_config_role.external_id}"
      ]
    }
  }
}

data "aws_iam_policy_document" "datadog_aws_integration" {
  declaración {
    acciones = [<AWS_PERMISSIONS_LIST>]
    resources = ["*"]
  }
}

recurso "aws_iam_policy" "datadog_aws_integration" {
  name = "DatadogAWS IntegrationPolicy"
  policy = data.aws_iam_policy_document.datadog_aws_integration.json
}
resource "aws_iam_role" "datadog_aws_integration" {
  name = "DatadogIntegrationRole"
  description = "Rol para Datadog AWS Integración"
  assume_role_policy = data.aws_iam_policy_document.datadog_aws_integration_assume_role.json
}
resource "aws_iam_role_policy_attachment" "datadog_aws_integration" {
  rol = aws_iam_role.datadog_aws_integration.name
  policy_arn = aws_iam_policy.datadog_aws_integration.arn
}
resource "aws_iam_role_policy_attachment" "datadog_aws_integration_security_audit" {
  rol = aws_iam_role.datadog_aws_integration.name
  policy_arn = "arn:aws:iam::aws:policy/SecurityAudit"
}

resource "datadog_integration_aws_account" "datadog_integration" {
  account_tags = []
  aws_account_id = "<ACCOUNT_ID>"
  aws_partition = "aws"
  aws_regions {
    include_all = true
  }
  auth_config {
    aws_auth_config_role {
      role_name = "DatadogIntegrationRole"
    }
  }
    resources_config {
    cloud_security_posture_management_collection = false
    extended_collection = true
  }
  traces_config {
    xray_services {
    }
  }
    logs_config {
    lambda_forwarder {
    }
  }
  metrics_config {
    namespace_filters {
    }
  }
}
```

<div class="alert alert-info"></a><strong>Nota</strong>: Por defecto, la configuración anterior no incluye Cloud Security. Para habilitar Cloud Security, en <code>resources_config</code>, establezca <code>cloud_security_posture_management_collection = true</code>.</div>

[1]: /es/integrations/amazon_web_services/?tab=manual#aws-iam-permissions
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws
{{< /site-region >}}

{{< site-region region="ap2" >}}
2. Configura tu archivo de ajustes de Terraform utilizando el siguiente ejemplo como plantilla base. Asegúrate de actualizar los siguientes parámetros antes de aplicar los cambios:
   * `AWS_PERMISSIONS_LIST`: Políticas de IAM que necesitan las integraciones Datadog con AWS. La lista actual está disponible en la documentación [Integración de Datadog con AWS][1].
   * `AWS_ACCOUNT_ID`:  El ID de tu cuenta de AWS.

Consulta el [registro de Terraform][2] para obtener más ejemplos de uso y la lista completa de parámetros opcionales, así como recursos adicionales de Datadog.

```hcl
data "aws_iam_policy_document" "datadog_aws_integration_assume_role" {
  declaración {
    acciones = ["sts:AssumeRole"]
    directores {
      tipo = "AWS"
      identificadores = ["arn:aws:iam::412381753143:root"]
    }
    condición {
      test     = "StringEquals"
      variable = "sts:ExternalId"
      valores = [
        "${datadog_integration_aws_account.datadog_integration.auth_config.aws_auth_config_role.external_id}"
      ]
    }
  }
}

data "aws_iam_policy_document" "datadog_aws_integration" {
  declaración {
    acciones = [<AWS_PERMISSIONS_LIST>]
    resources = ["*"]
  }
}

recurso "aws_iam_policy" "datadog_aws_integration" {
  name = "DatadogAWS IntegrationPolicy"
  policy = data.aws_iam_policy_document.datadog_aws_integration.json
}
resource "aws_iam_role" "datadog_aws_integration" {
  name = "DatadogIntegrationRole"
  description = "Rol para Datadog AWS Integración"
  assume_role_policy = data.aws_iam_policy_document.datadog_aws_integration_assume_role.json
}
resource "aws_iam_role_policy_attachment" "datadog_aws_integration" {
  rol = aws_iam_role.datadog_aws_integration.name
  policy_arn = aws_iam_policy.datadog_aws_integration.arn
}
resource "aws_iam_role_policy_attachment" "datadog_aws_integration_security_audit" {
  rol = aws_iam_role.datadog_aws_integration.name
  policy_arn = "arn:aws:iam::aws:policy/SecurityAudit"
}

resource "datadog_integration_aws_account" "datadog_integration" {
  account_tags = []
  aws_account_id = "<ACCOUNT_ID>"
  aws_partition = "aws"
  aws_regions {
    include_all = true
  }
  auth_config {
    aws_auth_config_role {
      role_name = "DatadogIntegrationRole"
    }
  }
    resources_config {
    cloud_security_posture_management_collection = false
    extended_collection = true
  }
  traces_config {
    xray_services {
    }
  }
    logs_config {
    lambda_forwarder {
    }
  }
  metrics_config {
    namespace_filters {
    }
  }
}
```

<div class="alert alert-info"></a><strong>Nota</strong>: Por defecto, la configuración anterior no incluye Cloud Security. Para habilitar Cloud Security, en <code>resources_config</code>, establezca <code>cloud_security_posture_management_collection = true</code>.</div>

[1]: /es/integrations/amazon_web_services/?tab=manual#aws-iam-permissions
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws
{{< /site-region >}}

{{< site-region region="gov" >}}
2. Configura tu archivo de ajustes de Terraform utilizando el siguiente ejemplo como plantilla base. Asegúrate de actualizar los siguientes parámetros antes de aplicar los cambios:
   * `AWS_PERMISSIONS_LIST`: Políticas de IAM que necesitan las integraciones Datadog con AWS. La lista actual está disponible en la documentación [Integración de Datadog con AWS][1].
   * `AWS_ACCOUNT_ID`:  El ID de tu cuenta de AWS.

Consulta el [registro de Terraform][2] para obtener más ejemplos de uso y la lista completa de parámetros opcionales, así como recursos adicionales de Datadog.

```hcl
data "aws_iam_policy_document" "datadog_aws_integration_assume_role" {
  declaración {
    acciones = ["sts:AssumeRole"]
    directores {
      tipo = "AWS"
      identificadores = ["arn:aws:iam::065115117704:root"]
    }
    condición {
      test     = "StringEquals"
      variable = "sts:ExternalId"
      valores = [
        "${datadog_integration_aws_account.datadog_integration.auth_config.aws_auth_config_role.external_id}"
      ]
    }
  }
}

data "aws_iam_policy_document" "datadog_aws_integration" {
  declaración {
    acciones = [<AWS_PERMISSIONS_LIST>]
    resources = ["*"]
  }
}

recurso "aws_iam_policy" "datadog_aws_integration" {
  name = "DatadogAWS IntegrationPolicy"
  policy = data.aws_iam_policy_document.datadog_aws_integration.json
}
resource "aws_iam_role" "datadog_aws_integration" {
  name = "DatadogIntegrationRole"
  description = "Rol para Datadog AWS Integración"
  assume_role_policy = data.aws_iam_policy_document.datadog_aws_integration_assume_role.json
}
resource "aws_iam_role_policy_attachment" "datadog_aws_integration" {
  rol = aws_iam_role.datadog_aws_integration.name
  policy_arn = aws_iam_policy.datadog_aws_integration.arn
}
resource "aws_iam_role_policy_attachment" "datadog_aws_integration_security_audit" {
  rol = aws_iam_role.datadog_aws_integration.name
  policy_arn = "arn:aws:iam::aws:policy/SecurityAudit"
}

resource "datadog_integration_aws_account" "datadog_integration" {
  account_tags = []
  aws_account_id = "<ACCOUNT_ID>"
  aws_partition = "aws"
  aws_regions {
    include_all = true
  }
  auth_config {
    aws_auth_config_role {
      role_name = "DatadogIntegrationRole"
    }
  }
    resources_config {
    cloud_security_posture_management_collection = false
    extended_collection = true
  }
  traces_config {
    xray_services {
    }
  }
    logs_config {
    lambda_forwarder {
    }
  }
  metrics_config {
    namespace_filters {
    }
  }
}
```

<div class="alert alert-info"></a><strong>Nota</strong>: Por defecto, la configuración anterior no incluye Cloud Security. Para habilitar Cloud Security, en <code>resources_config</code>, establezca <code>cloud_security_posture_management_collection = true</code>.</div>

[1]: /es/integrations/amazon_web_services/?tab=manual#aws-iam-permissions
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws
{{< /site-region >}}

3. Ejecuta `terraform apply`. Espera hasta 10 minutos para que los datos comiencen a recopilarse y, a continuación, consulta el [dashboard de información general de AWS][4] para ver métricas enviadas por tus servicios e infraestructura de AWS.

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.terraform.io
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws_account#upgrading-from-datadog_integration_aws-resources
[4]: https://app.datadoghq.com/screen/integration/7/aws-overview