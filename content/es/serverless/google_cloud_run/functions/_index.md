---
further_reading:
- link: https://cloud.google.com/blog/products/serverless/google-cloud-functions-is-now-cloud-run-functions
  tag: Blog
  text: 'Las funciones de Cloud ahora son funciones de Cloud Run: programación impulsada
    por eventos en una plataforma sin servidor unificada'
- link: /mcp_server/tools/#serverless_onboarding
  tag: Documentación
  text: 'Servidor MCP de Datadog: serverless_onboarding tool'
title: Instrumentación de funciones de Cloud Run
type: multi-code-lang
---
<div class="alert alert-info">
<strong>¿Buscando funciones de Cloud Run de 1ra generación?</strong> Si está utilizando funciones de Cloud Run (1ra generación), anteriormente conocidas como Cloud Functions (1ra generación), consulte <a href="/serverless/google_cloud_run/functions_1st_gen">Instrumentación de funciones de Cloud Run de 1ra generación</a>.
</div>

## Utilice el servidor MCP de Datadog {#use-the-datadog-mcp-server}

Utilice el [servidor MCP de Datadog][2] para configurar el seguimiento de sus contenedores de Cloud Run con asistencia de IA. Después de conectarse, pruebe con un prompt como:

```shell
Help me monitor my GCP Cloud Run functions with Datadog using Terraform.
```

## Instrumentación manual {#manual-instrumentation}

Primero, configure la [integración de Datadog-Google Cloud Platform][1] para recopilar métricas y registros de los servicios de Google Cloud. Recuerde agregar el `cloud asset viewer` rol a su cuenta de servicio y habilitar la API de Inventario de Activos de Cloud en Google Cloud.

Luego, seleccione su entorno de ejecución a continuación para obtener instrucciones sobre cómo instrumentar su aplicación:

{{% container-languages path="google_cloud_run/functions" functions="true" %}}



## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/google-cloud-platform/
[2]: /es/agentic_onboarding/setup