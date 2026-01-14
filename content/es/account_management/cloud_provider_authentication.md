---
algolia:
  tags:
  - autenticación en la nube
  - autenticación en aws
  - proveedor de terraform
aliases:
- /es/account_management/cloud_authentication/
description: Autentica el proveedor de Terraform de Datadog con credenciales en la
  nube en lugar de claves estáticas de la API con la autenticación y la asignación
  de identidades de STS de AWS.
further_reading:
- link: /getting_started/integrations/terraform/
  tag: Documentación
  text: Gestión de Datadog con Terraform
- link: /account_management/api-app-keys/
  tag: Documentación
  text: Claves de aplicaciones y API
- link: /integrations/amazon_web_services/
  tag: Documentación
  text: Integración con AWS
title: Autenticación basada en la nube
---

{{< callout url="https://www.datadoghq.com/product-preview/cloud-provider-based-authentication/" btn_hidden="false" header="Join the Preview!" >}}
La autenticación basada en la nube está en la vista previa. Rellena el formulario para solicitar acceso.
{{< /callout >}}

## Información general

La autenticación basada en la nube te permite autenticar al proveedor de Terraform de Datadog con credenciales de la nube en lugar de claves estáticas de API y de aplicación.

Durante el periodo de vista previa, AWS es el único proveedor de la nube compatible.

## Cómo funciona: proceso de autenticación de AWS

El proceso de autenticación utiliza el [Servicio de token de seguridad (STS) de AWS][1] para verificar tu identidad:

1. **Generación de la prueba:** El proveedor de Terraform de Datadog crea una solicitud firmada de STS de AWS `GetCallerIdentity` con tus credenciales actuales de AWS 
2. **Validación de la prueba:** Datadog valida la prueba llamando al STS de AWS, que devuelve tu ARN de AWS, ID de usuario e ID de cuenta.
3. **Asignación de identidad:** Tu identidad de AWS se asigna a una cuenta de servicio de Datadog o a una cuenta de usuario en función de la configuración de tu organización.
4. **Problema con el token:** Si la validación tiene éxito, Datadog emite un token JWT temporal para el acceso a la API.
5. **Autenticación de la API:** El token se utiliza para las siguientes llamadas a la API de Datadog 


<div class="alert alert-info">Si es posible, asigna los ARN a una cuenta de servicio de Datadog en lugar de a una cuenta de usuario. El uso de una cuenta de servicio evita asociar el proceso de autenticación a una persona concreta.</div>

## Configurar la autenticación basada en la nube para AWS

**Requisitos**:
- Proveedor de Terraform de Datadog versión 3.70 o posterior.
- Has configurado la [integración de Datadog y AWS ][4] y añadido tu cuenta de AWS. Consulta los [documentos de integración de AWS][3].
- Los permisos `cloud_auth_config_read` y `cloud_auth_config_write`. Estos permisos están disponibles solo después de que estés incorporado en la vista previa.

La configuración de la autenticación basada en proveedores en la nube para AWS consta de dos partes: 
1. [Configuración de la asignación de identidad de AWS en Datadog](#configure-aws-identity-mapping-in-datadog)
2. [Actualización de la configuración del proveedor de Terraform](#update-your-terraform-provider-configuration)

### Configuración de la asignación de identidad de AWS en Datadog

<div class="alert alert-info">Para que la asignación de identidad funcione, tu cuenta de AWS <strong>debe estar integrada</strong> con Datadog a través de la <a href="https://app.datadoghq.com/integrations/amazon-web-services">integración de Datadog y AWS</a>. Si una cuenta de AWS no está integrada, el flujo de la autenticación no puede verificar al autor de la llamada y la asignación falla.</div>

En primer lugar, asigna tus identidades (ARN) de AWS a cuentas de servicio o cuentas de usuario de Datadog. Durante la vista previa, debes realizar la asignación mediante la API de Datadog.

Si necesitas crear roles de IAM en AWS, consulta la [Documentación de creación de roles IAM de AWS][5].

#### Asigna un ARN de AWS a una cuenta de usuario de Datadog 
Para `account_identifier`, utiliza el correo electrónico que aparece en el perfil de Datadog del usuario.

**Ejemplo**: Una llamada a la API que asigna un ARN de AWS a una cuenta de usuario de Datadog, `john.doe@myorg.com`.

```bash
# Example: map an AWS ARN to a Datadog User
curl -X POST "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/persona_mapping" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d '{
  "data": {
    "type": "aws_cloud_auth_config",
    "attributes": {
      "account_identifier": "john.doe@myorg.com",
      "arn_pattern": "arn:aws:sts::123456789012:assumed-role/terraform-runner"
    }
  }
}'
```

#### Asigna un ARN de AWS a una cuenta de servicio de Datadog 
Para `account_identifier`, puedes utilizar cualquiera de las siguientes:
- El **UUID** de la cuenta de servicio: Ve a **Organization settings > Service accounts** (Parámetros de la organización > Cuentas de servicio), haz clic en la cuenta de servicio que desees asignar y copia el `service_account_id` de la URL. Por ejemplo, si la URL termina en `/organization-settings/service-accounts?service_account_id=3fa85f64-5717-4562-b3fc-2c963f66afa6`, utiliza `3fa85f64-5717-4562-b3fc-2c963f66afa6`.
- La **dirección de correo electrónico** de la cuenta de servicio: Utiliza la dirección de correo electrónico que aparece en los datos de la cuenta de servicio.

**Ejemplo**: Una llamada a la API que asigna un ARN de AWS a una cuenta de servicio de Datadog con el UUID, `3fa85f64-5717-4562-b3fc-2c963f66afa6`.

```bash
# Example: map an AWS ARN to a Datadog Service Account using UUID
curl -X POST "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/persona_mapping" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d '{
  "data": {
    "type": "aws_cloud_auth_config",
    "attributes": {
      "account_identifier": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "arn_pattern": "arn:aws:sts::123456789012:assumed-role/terraform-runner"
    }
  }
}'
```

**Ejemplo**: Una llamada a la API que asigna un ARN de AWS a una cuenta de servicio de Datadog con la dirección de correo electrónico, `terraform-service-account@myorg.com`.

```bash
# Example: map an AWS ARN to a Datadog Service Account using email
curl -X POST "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/persona_mapping" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d '{
  "data": {
    "type": "aws_cloud_auth_config",
    "attributes": {
      "account_identifier": "terraform-service-account@myorg.com",
      "arn_pattern": "arn:aws:sts::123456789012:assumed-role/terraform-runner"
    }
  }
}'
```

#### Uso de comodines en patrones de ARN

Los patrones de ARN admiten la coincidencia de comodines para manejar partes dinámicas o variables de los ARN de recursos. Esto resulta útil cuando se trabaja con roles asumidos que incluyen identificadores de sesión u otros componentes variables.

**Reglas de comodines**:
- Los comodines (`*`) solo se permiten en la última parte del ARN del recurso
- Debes especificar un recurso concreto antes del comodín
- Los comodines no pueden colocarse en medio del ARN

**Ejemplo**: Coincidir con cualquier sesión asumiendo el `DatadogTerraformerRole`:

```bash
curl -X POST "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/persona_mapping" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d '{
  "data": {
    "type": "aws_cloud_auth_config",
    "attributes": {
      "account_identifier": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "arn_pattern": "arn:aws:sts::123456789012:assumed-role/DatadogTerraformerRole/*"
    }
  }
}'
```

Este patrón coincide con ARN de roles asumidos reales como:
- `arn:aws:sts::123456789012:assumed-role/DatadogTerraformerRole/run-abcdefghijk`
- `arn:aws:sts::123456789012:assumed-role/DatadogTerraformerRole/session-xyz789`

<div class="alert alert-info">La coincidencia de comodines es especialmente útil para los pipelines de Continuous Integration Continuous Delivery en los que las sesiones de roles tienen identificadores generados dinámicamente.</div>

#### Lista de asignaciones existentes

```bash
curl -X GET "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/persona_mapping" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```

### Actualizar la configuración de tu proveedor de Terraform

Una vez configurada la asignación de identidades, actualiza la configuración del proveedor de Terraform de Datadog para utilizar la autenticación del proveedor de la nube:

#### Eliminar la configuración existente

```hcl
# Old configuration
provider "datadog" {
  api_key = var.datadog_api_key
  app_key = var.datadog_app_key
}
```

#### Añadir la nueva configuración de autenticación en la nube

Para obtener tu `org_uuid`, llama a este endpoint o haz clic en el enlace (requiere una sesión activa en la organización de destino): [{{< region-param key=dd_api >}}/api/v2/current_user][2]

```hcl
# New configuration using AWS authentication
provider "datadog" {
  org_uuid             = var.datadog_org_uuid
  cloud_provider_type  = "aws"
}
```

#### Opcional - Especifica explícitamente las credenciales de AWS 
Como alternativa al uso de variables de entorno o archivos de credenciales de AWS, puedes especificar las credenciales de AWS directamente en tu configuración de Terraform:

```hcl
provider "datadog" {
  org_uuid              = var.datadog_org_uuid
  cloud_provider_type   = "aws"
  aws_access_key_id     = var.aws_access_key_id
  aws_secret_access_key = var.aws_secret_access_key
  aws_session_token     = var.aws_session_token  # If using temporary credentials
}
```

El proveedor de Terraform utiliza automáticamente tus credenciales configuradas de AWS para la autenticación en Datadog.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/STS/latest/APIReference/welcome.html
[2]: https://app.datadoghq.com/api/v2/current_user
[3]: /es/integrations/amazon-web-services/
[4]: https://app.datadoghq.com/integrations/amazon-web-services
[5]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create.html