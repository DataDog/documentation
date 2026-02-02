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
title: Configuración de App and API Protection para Python en AWS Fargate
type: multi-code-lang
---

{{% app_and_api_protection_python_overview %}}

## Requisitos previos

- Entorno de AWS Fargate
- Aplicación Python en contenedores con Docker
- AWS CLI configurado con los permisos adecuados
- Tu clave de API Datadog 
- Biblioteca de rastreo Python de Datadog (consulta [requisitos de la versión][1])

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

{{% app_and_api_protection_python_navigation_menu %}}

{{% appsec-remote-config-activation %}}

### Activación manual de la monitorización de App and API Protection
Instala la biblioteca de rastreo Python de Datadog en tu entorno de aplicación:

```dockerfile
RUN pip install ddtrace
```

Configura y ejecuta tu servicio con Datadog:

{{% collapse-content title="APM Tracing Enabled" level="h4" %}}

Actualiza la definición de la tarea para incluir el agent de Python y la configuración de App and API Protection:

```json
{
  "containerDefinitions": [
    {
      "name": "your-python-app",
      "image": "your-python-app-image",
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
      ],
      "command": [
        "ddtrace-run",
        "python",
        "app.py"
      ]
    }
  ]
}
```

{{% /collapse-content %}}

{{% collapse-content title="Rastreo de APM desactivado" level="h4" %}}
Para deshabilitar el rastreo de APM mientras se mantiene habilitada App and API Protection, debes establecer la variable de rastreo de APM en false (falso).

Actualiza la definición de la tarea para incluir el agent de Python y la configuración de App and API Protection con el rastreo de APM desactivado:

```json
{
  "containerDefinitions": [
    {
      "name": "your-python-app",
      "image": "your-python-app-image",
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
      ],
      "command": [
        "ddtrace-run",
        "python",
        "app.py"
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

{{% app_and_api_protection_verify_setup %}}

## Solucionar problemas

Si tienes problemas al configurar App and API Protection para tu aplicación Python, consulta la [Guía de solución de problemas de App and API Protection en Python][2].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/setup/python/compatibility
[2]: /es/security/application_security/setup/python/troubleshooting