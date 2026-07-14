---
code_lang: aws-fargate
code_lang_weight: 60
further_reading:
- link: /security/application_security/how-it-works/
  tag: Documentación
  text: Cómo funciona App and API Protection
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Reglas predeterminadas de App and API Protection
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solucionar problemas de App and API Protection
title: Configurar App and API Protection para Java en AWS Fargate
type: multi-code-lang
---

{{% app_and_api_protection_java_overview %}}

## Requisitos previos

- Entorno de AWS Fargate
- Aplicación Java en contenedores con Docker
- AWS CLI configurado con los permisos adecuados
- Tu clave de API Datadog 
- Biblioteca de rastreo Java de Datadog (consulta [requisitos de la versión][1])

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

{{% app_and_api_protection_navigation_menu %}}

{{% appsec-remote-config-activation %}}

### Activación manual de la monitorización de App and API Protection
Descarga la última versión de la biblioteca Java de Datadog:

```dockerfile
ADD 'https://dtdg.co/latest-java-tracer' /dd-java-agent.jar
```

{{% collapse-content title="Rastreo de APM activado" level="h4" %}}
{{< tabs >}}
{{% tab "Using system properties" %}}

Actualiza la definición de la tarea para incluir el agent Java y la configuración de App and API Protection:

```json
{
  "containerDefinitions": [
    {
      "name": "your-java-app",
      "image": "your-java-app-image",
      "command": [
        "java",
        "-javaagent:/dd-java-agent.jar",
        "-Ddd.appsec.enabled=true",
        "-Ddd.service=<MY_SERVICE>",
        "-Ddd.env=<MY_ENV>",
        "-jar",
        "/app.jar"
      ]
    }
  ]
}
```

{{% /tab %}}
{{% tab "Using environment variables" %}}

Actualiza la definición de la tarea para incluir el agent Java y la configuración de App and API Protection:

```json
{
  "containerDefinitions": [
    {
      "name": "your-java-app",
      "image": "your-java-app-image",
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
        "java",
        "-javaagent:/dd-java-agent.jar",
        "-jar",
        "/app.jar"
      ]
    }
  ]
}
```

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Rastreo de APM desactivado" level="h4" %}}
Para desactivar el rastreo de APM mientras se mantiene activada App and API Protection, debes establecer la variable de rastreo de APM en false (falso).
{{< tabs >}}
{{% tab "Using system properties" %}}

Actualiza la definición de la tarea para incluir el agent Java y la configuración de App and API Protection con el rastreo de APM desactivado:

```json
{
  "containerDefinitions": [
    {
      "name": "your-java-app",
      "image": "your-java-app-image",
      "command": [
        "java",
        "-javaagent:/dd-java-agent.jar",
        "-Ddd.appsec.enabled=true",
        "-Ddd.apm.tracing.enabled=false",
        "-Ddd.service=<MY_SERVICE>",
        "-Ddd.env=<MY_ENV>",
        "-jar",
        "/app.jar"
      ]
    }
  ]
}
```

{{% /tab %}}
{{% tab "Using environment variables" %}}

Actualiza la definición de la tarea para incluir el agent Java y la configuración de App and API Protection con el rastreo de APM desactivado:

```json
{
  "containerDefinitions": [
    {
      "name": "your-java-app",
      "image": "your-java-app-image",
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
        "java",
        "-javaagent:/dd-java-agent.jar",
        "-jar",
        "/app.jar"
      ]
    }
  ]
}
```

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

## 3. Ejecuta tu aplicación

Despliega tu tarea de Fargate con la configuración actualizada:

```bash
aws ecs register-task-definition --cli-input-json file://task-definition.json
aws ecs run-task --cluster your-cluster --task-definition your-task-definition
```

{{% app_and_api_protection_verify_setup %}}

## Solucionar problemas

Si tienes problemas al configurar App and API Protection para tu aplicación Java, consulta la [Guía de solución de problemas de App and API Protection en Java][2].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/setup/java/compatibility
[2]: /es/security/application_security/setup/java/troubleshooting