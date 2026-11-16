---
aliases:
- /es/tracing/trace_collection/admission_controller/
- /es/tracing/trace_collection/library_injection_local/
- /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/
further_reading:
- link: /tracing/metrics/runtime_metrics/
  tag: Documentación
  text: Habilitar métricas de tiempo de ejecución
- link: /tracing/guide/injectors
  tag: Documentación
  text: Comprender el comportamiento del inyector con la instrumentación de un solo
    paso
- link: /tracing/trace_collection/automatic_instrumentation/single-step-apm/troubleshooting/
  tag: Documentación
  text: Solución de problemas de APM de un solo paso
- link: /tracing/guide/local_sdk_injection
  tag: Documentación
  text: Instrumente sus aplicaciones mediante la inyección de SDK local
- link: https://learn.datadoghq.com/courses/troubleshooting-apm-instrumentation-on-a-host
  tag: Centro de aprendizaje
  text: Solución de problemas de instrumentación de APM en un servidor
- link: https://www.datadoghq.com/blog/datadog-csi-driver/
  tag: Blog
  text: Lleve la observabilidad de alto rendimiento a entornos seguros de Kubernetes
    con el controlador CSI de Datadog
- link: https://www.datadoghq.com/blog/rum-apm-single-step
  tag: Blog
  text: Habilite la visibilidad de extremo a extremo en sus aplicaciones Java con
    un solo comando
- link: https://www.datadoghq.com/blog/single-step-instrumentation-rules/
  tag: Blog
  text: Administre el rastreo de servicios entre servidores con reglas de instrumentación
    de un solo paso
- link: https://www.datadoghq.com/blog/choosing-apm-instrumentation/
  tag: Blog
  text: 'De cero a trazas: elegir el método de instrumentación de APM adecuado para
    su stack'
title: Instrumentación de APM de un solo paso
---
## Descripción general {#overview}

La instrumentación de un solo paso (SSI) instala automáticamente los SDK de Datadog sin necesidad de configuración adicional, lo que reduce el tiempo de incorporación de días a minutos.

Para obtener más información sobre cómo funciona, consulte la [guía del inyector para la instrumentación de un solo paso][8].

{{< skill-callout
    title="Configurar APM con un Agent"
    text="Install the `dd-apm` skill in your AI coding agent for guided APM setup."
    action_name="copy_dd_apm_skill_install_cmd" >}}
npx skills add https://github.com/datadog-labs/agent-skills --skill dd-apm --full-depth -y
{{< /skill-callout >}}

## Requisitos previos {#prerequisites}

1. Elimine cualquier código de instrumentación personalizado de su aplicación y reiníciela. SSI se deshabilita automáticamente si se detecta instrumentación personalizada.
1. Confirme la compatibilidad del entorno revisando la [guía de compatibilidad de SSI][18] para conocer los lenguajes, sistemas operativos y arquitecturas compatibles.

## Instrumentar SDKs en aplicaciones {#instrument-sdks-across-applications}

Cuando [instala o actualiza el Datadog Agent][1] con {{< ui >}}APM Instrumentation{{< /ui >}} habilitado, el Agent instrumenta sus aplicaciones cargando el Datadog SDK en los procesos compatibles. Esto permite el rastreo distribuido al capturar y enviar datos de traza desde sus servicios sin requerir cambios en el código.

Después de la instrumentación, puede opcionalmente:
- [configurar etiquetas de servicio unificado (UST, por sus siglas en inglés)][14]
- habilite productos y funciones adicionales que dependen del SDK, como Continuous Profiler o Application Security Monitoring

Haga clic en uno de los siguientes mosaicos para aprender cómo configurar SSI para su tipo de implementación:

{{< card-grid card_width="170px" image_width="200" >}}
  {{< image-card href="linux/" src="integrations_logos/linux.png" alt="Linux" >}}
  {{< image-card href="docker/" src="integrations_logos/docker.png" alt="Docker" >}}
  {{< image-card href="kubernetes/" src="integrations_logos/kubernetes.png" alt="Kubernetes" >}}
  {{< image-card href="windows/" src="integrations_logos/windows.png" alt="Windows" >}}
{{< /card-grid >}}

## Solución de problemas {#troubleshooting}

Si encuentra problemas al habilitar APM con SSI, consulte la [guía de solución de problemas de SSI][15].

## Lecturas adicionales {#further-reading}

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