---
aliases:
- /es/serverless/gcp
- /es/serverless/google_cloud
further_reading:
- link: /integrations/google-cloud-run/
  tag: Documentación
  text: Integración Google Cloud Run
- link: /serverless/guide/disable_serverless
  tag: Documentación
  text: Desactivar Serverless Monitoring
- link: https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/
  tag: Blog
  text: Recopilar trazas, logs y métricas personalizadas de servicios de Cloud Run
title: Google Cloud Run
---

Google Cloud Run es una plataforma informática totalmente gestionada que te permite ejecutar contenedores sin estado y funciones sin servidor con escalado automático, balanceo de carga integrado y facturación de pago por uso.

Datadog ofrece la monitorización y la recopilación de logs de Cloud Run a través de la [integración Google Cloud][1].

Para la instrumentación, selecciona tu carga de trabajo a continuación para obtener instrucciones.

## Elegir tu carga de trabajo

{{< card-grid card_width="350px" >}}
  {{< image-card href="/serverless/google_cloud_run/containers" title="Containers" >}}
  {{< image-card href="/serverless/google_cloud_run/jobs" title="Jobs" subtitle="(Preview)" >}}
  {{< image-card href="/serverless/google_cloud_run/functions" title="Functions" >}}
  {{< image-card href="/serverless/google_cloud_run/functions_1st_gen" title="Functions" subtitle="(1st generation)" >}}
{{< /card-grid >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]:/es/integrations/google_cloud_platform/