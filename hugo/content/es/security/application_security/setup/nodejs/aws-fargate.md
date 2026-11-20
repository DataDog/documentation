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
title: Configure App and API Protection para Node.js en AWS Fargate
type: multi-code-lang
---
{{% aap/aap_and_api_protection_nodejs_overview %}}

## Requisitos previos {#prerequisites}

- Entorno de AWS Fargate
- Aplicación Node.js contenedorizada con Docker
- AWS CLI configurada con los permisos adecuados
- Su clave de API de Datadog
- SDK de Datadog para Node.js (consulte los [requisitos de versión][1])

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
        }
      ]
    }
  ]
}
```

## 2. Habilite la supervisión de App and API Protection {#2-enabling-app-and-api-protection-monitoring}

{{% aap/aap_and_api_protection_nodejs_navigation_menu %}}

{{% aap/aap_and_api_protection_nodejs_remote_config_activation %}}

### Habilite manualmente la supervisión de App and API Protection {#manually-enabling-app-and-api-protection-monitoring}

Asegúrese de que su Dockerfile incluya la biblioteca de Datadog para Node.js:

```dockerfile
FROM node:18-alpine

# Install the Datadog Node.js library
RUN npm install dd-trace

# Copy your application files
COPY package*.json ./
COPY . .
RUN npm install

# Start the application with the Datadog SDK
CMD ["node", "--require", "dd-trace/init", "app.js"]
```

{{% collapse-content title="APM Tracing habilitado" level="h4" %}}

Actualice su definición de tarea para incluir el contenedor de la aplicación Node.js con la configuración de App and API Protection:

```json
{
  "containerDefinitions": [
    {
      "name": "your-nodejs-app",
      "image": "your-nodejs-app-image",
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
        }
      ]
    }
  ]
}
```

{{% /collapse-content %}}

{{% collapse-content title="APM Tracing deshabilitado" level="h4" %}}
Para deshabilitar APM Tracing mientras mantiene habilitada App and API Protection, debe establecer la variable de APM Tracing en false.

Actualice su definición de tarea para incluir el contenedor de la aplicación Node.js con la configuración de App and API Protection:

```json
{
  "containerDefinitions": [
    {
      "name": "your-nodejs-app",
      "image": "your-nodejs-app-image",
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
        }
      ]
    }
  ]
}
```

{{% /collapse-content %}}

## 3. Ejecute su aplicación {#3-run-your-application}

Implemente su tarea de Fargate con la configuración actualizada:

```bash
aws ecs register-task-definition --cli-input-json file://task-definition.json
aws ecs run-task --cluster your-cluster --task-definition your-task-definition
```

{{% aap/aap_and_api_protection_verify_setup %}}

## Solución de problemas {#troubleshooting}

Si encuentra problemas al configurar App and API Protection para su aplicación Node.js, consulte la [guía de solución de problemas de App and API Protection para Node.js][2].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/setup/compatibility/nodejs
[2]: /es/security/application_security/setup/nodejs/troubleshooting