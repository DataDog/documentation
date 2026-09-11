---
code_lang: aws-fargate
code_lang_weight: 60
further_reading:
- link: /security/application_security/how-it-works/
  tag: Documentación
  text: Cómo funciona App and API Protection
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Reglas de protección de aplicaciones y API predefinidas
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solucionar problemas con la protección de aplicaciones y API
title: Configura App and API Protection para Node.js en AWS Fargate
type: multi-code-lang
---

{{% aap/aap_and_api_protection_nodejs_overview %}}

## Requisitos previos

- Entorno de AWS Fargate
- Aplicación de Node.js en contenedores con Docker
- AWS CLI configurado con los permisos adecuados
- Tu clave de API Datadog 
- Biblioteca de rastreo Node.js de Datadog (consulta [requisitos de la versión][1])

## 1. Instalación del Datadog Agent

Instala el Datadog Agent en la definición de tu tarea de Fargate:

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

## 2. Activación de la monitorización de App and API Protection

{{% aap/aap_and_api_protection_nodejs_navigation_menu %}}

{{% aap/aap_and_api_protection_nodejs_remote_config_activation %}}

### Activación manual de la monitorización de App and API Protection

Asegúrate de que tu archivo Docker incluye la biblioteca Node.js de Datadog:

```dockerfile
FROM node:18-alpine

# Install the Datadog Node.js library
RUN npm install dd-trace

# Copy your application files
COPY package*.json ./
COPY . .
RUN npm install

# Start the application with the Datadog tracer
CMD ["node", "--require", "dd-trace/init", "app.js"]
```

{{% collapse-content title="Rastreo de APM activado" level="h4" %}}

Actualiza la definición de la tarea para incluir el contenedor de aplicaciones de Node.js con la configuración de App y API Protection:

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

{{% collapse-content title="Rastreo de APM desactivado" level="h4" %}}
Para deshabilitar el rastreo de APM mientras se mantiene habilitada App and API Protection, debes establecer la variable de rastreo de APM en false (falso).

Actualiza la definición de la tarea para incluir el contenedor de aplicaciones de Node.js con la configuración de App y API Protection:

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

## 3. Ejecuta tu aplicación

Despliega tu tarea de Fargate con la configuración actualizada:

```bash
aws ecs register-task-definition --cli-input-json file://task-definition.json
aws ecs run-task --cluster your-cluster --task-definition your-task-definition
```

{{% aap/aap_and_api_protection_verify_setup %}}

## Solucionar problemas

Si tienes problemas al configurar App and API Protection para tu aplicación Node.js, consulta la [Guía de solución de problemas de App and API Protection en Node.js][2].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/setup/nodejs/compatibility
[2]: /es/security/application_security/setup/nodejs/troubleshooting