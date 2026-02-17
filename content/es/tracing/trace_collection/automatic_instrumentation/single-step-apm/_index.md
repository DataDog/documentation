---
aliases:
- /es/tracing/trace_collection/single-step-apm
- /es/tracing/trace_collection/admission_controller/
- /es/tracing/trace_collection/library_injection_local/
further_reading:
- link: /tracing/metrics/runtime_metrics/
  tag: Documentación
  text: Habilitar métricas de tiempo de ejecución
- link: /tracing/guide/injectors
  tag: Documentación
  text: Entender el comportamiento de los inyectores con Single Step Instrumentation
title: Single Step Instrumentation para APM
type: lenguaje de código múltiple
---
## Información general

Single Step Instrumentation instala automáticamente los SDK de Datadog sin necesidad de configuración adicional, lo que reduce el tiempo de incorporación de días a minutos.

Para saber más sobre su funcionamiento, consulta la [guía del inyector para Single Step Instrumentation][8].

## Instrumentar SDK en todas las aplicaciones

Cuando [instalas o actualizas el Datadog Agent][1] con **APM Instrumentation** habilitado, el Agent instrumenta tus aplicaciones cargando el SDK de Datadog en procesos compatibles. Esto permite el rastreo distribuido capturando y enviando datos de rastreo desde tus servicios sin necesidad de cambios en el código.

Después de la instrumentación, puedes opcionalmente:
- [Configurar etiquetas (tags) de servicio unificadas (UST)](#configure-universal-service-tags)
- [Activar productos y funciones adicionales dependientes del SDK](#enable-sdk-dependent-products-and-features), como Continuous Profiler o Application Security Monitoring

Haz clic en uno de los siguientes cuadros para ver cómo configurar SSI para tu tipo de despliegue:

{{< partial name="apm/apm-single-step.html" >}} 

<br>

<div class="alert alert-info">Para ver los requisitos de los lenguajes, sistemas operativos y arquitecturas compatibles, consulta la <a href="https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/">compatibilidad de Single Step Instrumentation.</a></div>

## Configurar etiquetas de servicio unificadas

Las etiquetas de servicio unificadas (UST) conectan trazas (traces), métricas y logs aplicando etiquetas coherentes en toda tu telemetría. Esto facilita la navegación por los datos de observabilidad.

Aprende a configurar UST para:
- [Linux][14]
- [Docker][15]
- [Windows][18]
- [Kubernetes][16]

   **Nota**: En Kubernetes, las UST deben definirse tanto en el objeto de despliegue como en la especificación de la plantilla de pod.


## Activar productos y funciones dependientes de SDK

Una vez que SSI carga el SDK de Datadog en tus aplicaciones y habilita el rastreo distribuido, puedes configurar productos adicionales que dependen del SDK. Estos incluyen funciones como Continuous Profiler, Application Security Monitoring y controles de ingesta de trazas.

Los métodos de configuración disponibles dependen de tu plataforma:

{{< tabs >}}
{{% tab "Linux" %}}

| Método de configuración | Descripción | Plataformas compatibles |
|:---|:---|:---|
| [Configurar en `application_monitoring.yaml`][17] | Activa productos en todos los servicios de un host sin modificar las líneas de comandos de la aplicación. | Linux sólo |
| [Definir variables de entorno][10] | Activa productos definiendo variables de entorno directamente en la configuración de tu aplicación. | Linux, Kubernetes, Windows, Docker |

[10]: /es/tracing/trace_collection/library_config/
[17]: /es/tracing/trace_collection/automatic_instrumentation/configure_apm_features_linux/

{{% /tab %}}

{{% tab "Docker" %}}

| Método de configuración | Descripción | Plataformas compatibles |
|:---|:---|:---|
| [Definir variables de entorno][10] | Activa productos definiendo variables de entorno directamente en la configuración de tu aplicación. | Linux, Kubernetes, Windows, Docker |

[10]: /es/tracing/trace_collection/library_config/

{{% /tab %}}

{{% tab "Kubernetes" %}}

| Método de configuración | Descripción | Plataformas compatibles |
|:---|:---|:---|
| [Configurar con orientación a las cargas de trabajo][9] | Por defecto, Single Step Instrumentation instrumenta todos los servicios en todos los espacios de nombres. Utiliza la orientación a las cargas de trabajo para limitar la instrumentación a espacios de nombres, pods y cargas de trabajo específicos, y aplica configuraciones personalizadas. | Kubernetes sólo |
| [Definir variables de entorno][10] | Activa productos definiendo variables de entorno directamente en la configuración de tu aplicación. | Linux, Kubernetes, Windows, Docker |

[9]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/kubernetes/?tab=installingwithdatadogoperator#configure-instrumentation-for-namespaces-and-pods
[10]: /es/tracing/trace_collection/library_config/

{{% /tab %}}

{{% tab "Windows" %}}

| Método de configuración | Descripción | Plataformas compatibles |
|:---|:---|:---|
| [Definir variables de entorno][10] | Activa productos definiendo variables de entorno directamente en la configuración de tu aplicación. | Linux, Kubernetes, Windows, Docker |

[10]: /es/tracing/trace_collection/library_config/

{{% /tab %}}
{{< /tabs >}}

## Solucionar problemas

Single Step Instrumentation se desactiva automáticamente cuando detecta [instrumentación personalizada][7] en tu aplicación. Si deseas utilizar SSI, tendrás que:

1. Eliminar cualquier código personalizado de instrumentación existente.
1. Reiniciar tu aplicación.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /es/tracing/metrics/runtime_metrics/
[3]: /es/tracing/software_catalog/
[4]: /es/tracing/glossary/#instrumentation
[5]: /es/containers/cluster_agent/admission_controller/
[6]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility
[7]: /es/tracing/trace_collection/custom_instrumentation/
[8]: /es/tracing/guide/injectors
[9]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/kubernetes/?tab=installingwithdatadogoperator#configure-instrumentation-for-namespaces-and-pods
[10]: /es/tracing/trace_collection/library_config/
[11]: /es/tracing/metrics/runtime_metrics/
[12]: /es/tracing/software_catalog/
[13]: /es/tracing/glossary/#instrumentation
[14]: /es/getting_started/tagging/unified_service_tagging/?tab=kubernetes#non-containerized-environment
[15]: /es/getting_started/tagging/unified_service_tagging/?tab=docker#containerized-environment
[16]: /es/getting_started/tagging/unified_service_tagging/?tab=kubernetes
[17]: /es/tracing/trace_collection/automatic_instrumentation/configure_apm_features_linux/
[18]: /es/integrations/windows_service/#tags