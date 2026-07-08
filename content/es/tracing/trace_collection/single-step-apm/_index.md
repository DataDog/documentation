---
aliases:
- /es/tracing/trace_collection/admission_controller/
- /es/tracing/trace_collection/library_injection_local/
- /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/
further_reading:
- link: /tracing/metrics/runtime_metrics/
  tag: Documentación
  text: Habilitar métricas en tiempo de ejecución
- link: /tracing/guide/injectors
  tag: Documentación
  text: Comprendiendo el comportamiento del inyector con la instrumentación de un
    solo paso
- link: /tracing/trace_collection/automatic_instrumentation/single-step-apm/troubleshooting/
  tag: Documentación
  text: Solucionando problemas de APM de un solo paso
- link: https://learn.datadoghq.com/courses/troubleshooting-apm-instrumentation-on-a-host
  tag: Centro de aprendizaje
  text: Solucionando problemas de la instrumentación de APM en un servidor
- link: /tracing/guide/local_sdk_injection
  tag: Documentación
  text: Instrumenta tus aplicaciones utilizando inyección de SDK local
- link: https://www.datadoghq.com/blog/datadog-csi-driver/
  tag: Blog
  text: Lleva la observabilidad de alto rendimiento a entornos de Kubernetes seguros
    con el controlador CSI de Datadog
- link: https://www.datadoghq.com/blog/rum-apm-single-step
  tag: Blog
  text: Habilite la visibilidad de extremo a extremo en sus aplicaciones Java con
    un solo comando
title: Instrumentación de APM de un solo paso
---
## Descripción general {#overview}

La instrumentación de un solo paso (SSI) instala automáticamente los SDK de Datadog sin requerir configuración adicional, reduciendo el tiempo de incorporación de días a minutos.

Para aprender más sobre cómo funciona, consulte la [guía del inyector para la instrumentación de un solo paso][8].

## Requisitos previos {#prerequisites}

1. Elimine cualquier código de instrumentación personalizado de su aplicación y reiníciela. SSI se desactiva automáticamente si se detecta instrumentación personalizada.
1. Confirme la compatibilidad del entorno revisando la [guía de compatibilidad de SSI][18] para lenguajes, sistemas operativos y arquitecturas soportadas.

## Instrumente SDKs en sus aplicaciones {#instrument-sdks-across-applications}

Cuando [instale o actualice el Agente de Datadog][1] con **instrumentación de APM** habilitada, el Agente instrumenta sus aplicaciones cargando el SDK de Datadog en procesos soportados. Esto permite el seguimiento distribuido al capturar y enviar datos de traza desde sus servicios sin requerir cambios en el código.

Después de la instrumentación, puede opcionalmente:
- [Configure Etiquetas de Servicio Unificadas (UST)][14]
- Habilite productos y características adicionales dependientes del SDK, como Continuous Profiler o Application Security Monitoring

Haga clic en uno de los siguientes mosaicos para aprender cómo configurar SSI para su tipo de implementación:

{{< card-grid card_width="170px" image_width="200" >}}
  {{< image-card href="linux/" src="integrations_logos/linux.png" alt="linux" >}}
  {{< image-card href="docker/" src="integrations_logos/docker.png" alt="docker" >}}
  {{< image-card href="kubernetes/" src="integrations_logos/kubernetes.png" alt="kubernetes" >}}
  {{< image-card href="windows/" src="integrations_logos/windows.png" alt="windows" >}}
{{< /card-grid >}}

<br>

## Solución de problemas {#troubleshooting}

Si encuentra problemas al habilitar APM con SSI, consulte la [guía de solución de problemas de SSI][15].

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /es/tracing/metrics/runtime_metrics/
[3]: /es/internal_developer_portal/catalog/
[4]: /es/tracing/glossary/#instrumentation
[5]: /es/containers/cluster_agent/admission_controller/
[6]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility
[7]: /es/tracing/trace_collection/custom_instrumentation/
[8]: /es/tracing/guide/injectors
[9]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/kubernetes/?tab=installingwithdatadogoperator#configure-instrumentation-for-namespaces-and-pods
[10]: /es/tracing/trace_collection/library_config/
[11]: /es/tracing/metrics/runtime_metrics/
[12]: /es/internal_developer_portal/catalog/
[13]: /es/tracing/glossary/#instrumentation
[14]: /es/getting_started/tagging/unified_service_tagging
[15]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/troubleshooting
[16]: /es/tracing/trace_collection/custom_instrumentation/
[17]: /es/tracing/trace_collection/library_config/application_monitoring_yaml/
[18]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/