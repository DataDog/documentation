---
code_lang: aws-fargate
code_lang_weight: 60
further_reading:
- link: /security/application_security/how-it-works/
  tag: Documentación
  text: Cómo funciona App and API Protection
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Reglas de protección de aplicaciones y API listas para usar
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solución de problemas de protección de aplicaciones y API
title: Configure App and API Protection para PHP en AWS Fargate
type: multi-code-lang
---
{{% app_and_api_protection_php_overview %}}

## Requisitos previos {#prerequisites}

- Entorno de AWS Fargate
- Aplicación PHP contenedorizada con Docker
- AWS CLI configurada con los permisos adecuados
- Su clave de API de Datadog
- Datadog PHP SDK (consulte los [requisitos de versión][1])

## 1. Instale el Datadog Agent {#1-installing-the-datadog-agent}

Instale el Datadog Agent en su definición de tarea de Fargate:

```json
{
  "containerDefinitions": [
    {
      "name": "datadog-agent",
      "image": "public.ecr.aws/datadog/agent:latest",
      "environment": [
        {
          "name": "DD_API_KEY",
          "value": "<YOUR_API_KEY>"
        },
        {
          "name": "DD_APM_ENABLED",
          "value": "true"
        },
        {
          "name": "DD_APM_NON_LOCAL_TRAFFIC",
          "value": "true"
        },
        {
          "name": "DD_SITE",
          "value": "{{< region-param key=\"dd_site\" >}}"
        }
      ]
    }
  ]
}
```

## 2. Habilite la supervisión de App and API Protection {#2-enabling-app-and-api-protection-monitoring}

{{% app_and_api_protection_php_navigation_menu %}}
{{% appsec-remote-config-activation %}}

### Habilite manualmente la supervisión de App and API Protection {#manually-enabling-app-and-api-protection-monitoring}

Asegúrese de que su Dockerfile incluya la biblioteca de PHP de Datadog:

Agregue lo siguiente a su Dockerfile:

```dockerfile
# Install dd-trace-php
RUN curl -LO https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php
RUN php datadog-setup.php --php-bin=all
# Enable appsec
ENV DD_APPSEC_ENABLED=true
# Configure your service
ENV DD_SERVICE=<YOUR_SERVICE_NAME>
ENV DD_ENV=<YOUR_ENVIRONMENT>
```

{{% collapse-content title="APM Tracing habilitado" level="h4" %}}

Actualice su definición de tarea para incluir el contenedor de la aplicación PHP con la configuración de App and API Protection:

```json
{
  "containerDefinitions": [
    {
      "name": "your-php-app",
      "image": "your-php-app-image",
      "environment": [
        {
          "name": "DD_APPSEC_ENABLED",
          "value": "true"
        },
        {
          "name": "DD_SERVICE",
          "value": "<YOUR_SERVICE_NAME>"
        },
        {
          "name": "DD_ENV",
          "value": "<YOUR_ENVIRONMENT>"
        },
        {
          "name": "DD_SITE",
          "value": "{{< region-param key=\"dd_site\" >}}"
        }
      ]
    }
  ]
}
```

{{% /collapse-content %}}

{{% collapse-content title="APM Tracing deshabilitado" level="h4" %}}
Para deshabilitar APM Tracing mientras mantiene habilitada App and API Protection, debe establecer la variable de APM Tracing en false.

Actualice su definición de tarea para incluir el contenedor de la aplicación PHP con la configuración de App and API Protection:

```json
{
  "containerDefinitions": [
    {
      "name": "your-php-app",
      "image": "your-php-app-image",
      "environment": [
        {
          "name": "DD_APPSEC_ENABLED",
          "value": "true"
        },
        {
          "name": "DD_APM_TRACING_ENABLED",
          "value": "false"
        },
        {
          "name": "DD_SERVICE",
          "value": "<YOUR_SERVICE_NAME>"
        },
        {
          "name": "DD_ENV",
          "value": "<YOUR_ENVIRONMENT>"
        },
        {
          "name": "DD_SITE",
          "value": "{{< region-param key=\"dd_site\" >}}"
        }
      ]
    }
  ]
}
```

{{% /collapse-content %}}

## 3. Ejecute su aplicación {#3-running-your-application}

Implemente su tarea de Fargate con la configuración actualizada:

```bash
aws ecs register-task-definition --cli-input-json file://task-definition.json
aws ecs run-task --cluster your-cluster --task-definition your-task-definition
```

{{% aap/aap_and_api_protection_verify_setup %}}

## Solución de problemas {#troubleshooting}

Si encuentra problemas al configurar App and API Protection para su aplicación PHP, consulte la [guía de solución de problemas de App and API Protection para PHP][2].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/setup/compatibility/php
[2]: /es/security/application_security/setup/php/troubleshooting