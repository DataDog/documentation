---
aliases:
- /es/serverless/gcp
- /es/serverless/google_cloud
- /es/serverless/google
further_reading:
- link: /integrations/google-cloud-run/
  tag: Documentación
  text: Integración con Google Cloud Run
- link: /serverless/guide/disable_serverless
  tag: Documentación
  text: Deshabilitar Serverless Monitoring
- link: /opentelemetry/setup/otlp_ingest/serverless/?tab=gcp#cloud-run-and-cloud-run-functions
  tag: Documentación
  text: Enviar trazas de Cloud Run a Datadog con OTLP
- link: https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/
  tag: Blog
  text: Recopile trazas, registros y métricas personalizadas de los servicios de Cloud
    Run
title: Google Cloud Run
---
Google Cloud Run es una plataforma de cómputo totalmente administrada que le permite ejecutar Containers sin estado y funciones sin servidor con escalado automático, balanceo de carga integrado y facturación de pago por uso.

Datadog proporciona seguimiento y recopilación de registros para Cloud Run a través de la [integración de Google Cloud][1].

Datadog también ofrece una solución para instrumentar sus aplicaciones de Cloud Run con un Serverless Agent para habilitar el rastreo, métricas mejoradas, métricas personalizadas y la recopilación directa de registros. Las [métricas mejoradas][2] se distinguen con los espacios de nombres `gcp.run.container.enhanced.*` y `gcp.run.job.enhanced.*`.

Para la instrumentación, seleccione su carga de trabajo a continuación para obtener instrucciones.

## Elija su carga de trabajo {#choose-your-workload}

{{< card-grid card_width="350px" >}}
  {{< image-card href="/serverless/google_cloud_run/containers" title="Containers" >}}
  {{< image-card href="/serverless/google_cloud_run/jobs" title="Trabajos" subtitle="(Vista previa)" >}}
  {{< image-card href="/serverless/google_cloud_run/functions" title="Funciones" >}}
  {{< image-card href="/serverless/google_cloud_run/functions_1st_gen" title="Funciones" subtitle="(1.ª generación)" >}}
{{< /card-grid >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]:/es/integrations/google_cloud_platform/
[2]:/es/integrations/google-cloud-run/#metrics