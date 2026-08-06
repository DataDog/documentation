---
description: Lleve sus trazas distribuidas de Azure Application Insights a Datadog
  APM a Datadog APM sin necesidad de volver a instrumentar su aplicación.
further_reading:
- link: /integrations/azure/
  tag: Documentación
  text: Integración con Microsoft Azure
private: true
title: Integración con Azure App Insights
---
{{< callout url="https://www.datadoghq.com/product-preview/azure-app-insights-integration/" header="Únase a la vista previa" >}}
La integración con Azure App Insights está en vista previa. Utilice este formulario para solicitar acceso.
{{< /callout >}}

## Descripción general {#overview}

Lleve sus trazas distribuidas de Azure Application Insights a Datadog APM. Datadog convierte las trazas de App Insights en tramos de APM y enriquece los tramos de los servicios compatibles con metadatos de recursos de Azure.

{{< img src="tracing/guide/serverless_enable_azure_app_insights/app-insights-azure-fn-example.png" alt="Una traza de Azure Application Insights mostrada en el Datadog APM flame graph, con metadatos de recursos de Azure visibles en el tramo seleccionado." style="width:100%;" >}}

La integración lee los registros de App Insights enviados a Datadog como registros y emite tramos de APM a partir de ellos. No se requieren cambios en el código ni en la instrumentación de su aplicación.

## Cómo funciona {#how-it-works}

Cuando Application Insights está habilitado en sus cargas de trabajo y sus registros de Azure fluyen hacia Datadog, Datadog:

1. Lee los registros de App Insights de sus registros de Azure reenviados.
2. Convierte cada operación de App Insights en un tramo de Datadog APM, preservando las relaciones padre-hijo tanto en el formato jerárquico heredado Request-Id como en W3C Trace Context.
3. Enriquece los tramos de los [servicios de Azure compatibles](#supported-azure-services) con metadatos de recursos de Azure, incluyendo el grupo de recursos, la suscripción, la región y las etiquetas de recursos.

Después de la conversión, los tramos se comportan como cualquier otro tramo de Datadog APM. Aparecen en la misma vista de cascada, admiten la búsqueda de trazas y se correlacionan con sus registros y métricas.

## Requisitos previos {#prerequisites}

Antes de que pueda usar la integración de Azure App Insights, configure lo siguiente:

1. **Habilite Azure Application Insights** en las cargas de trabajo de Azure que desea rastrear, utilizando el SDK clásico de Application Insights. Si su carga de trabajo utiliza [Azure Monitor OpenTelemetry Distro][5], consulte [OpenTelemetry en Datadog][6] en su lugar.
2. **Configure [Azure Automated Log Forwarding][2]** para reenviar los registros de Azure App Insights a Datadog. Confirme que la recopilación de métricas y recursos esté habilitada en la [integración de Microsoft Azure][1], para que los tramos puedan enriquecerse con metadatos de recursos de Azure.

{{% serverless/log_to_trace_indexing_note %}}

## Servicios de Azure compatibles {#supported-azure-services}

Datadog enriquece los tramos convertidos con metadatos de recursos de Azure para los siguientes servicios:

- Azure Functions
- Azure App Service
- Azure Storage
- Azure Cosmos DB
- Azure API Management
- Azure Cache for Redis

Las trazas de otros servicios de Azure se convierten en tramos de APM, pero sin el enriquecimiento de metadatos de recursos de Azure.

## Solicitar acceso {#request-access}

La integración con Azure App Insights está en vista previa. Para solicitar acceso, regístrese a través del [formulario de vista previa][4]. El equipo de Datadog responde en el plazo de una semana para confirmar el acceso.

## Limitaciones {#limitations}

- **Estado de vista previa** La integración se encuentra en vista previa con un grupo limitado de socios de diseño. El acceso se otorga después de registrarse a través del formulario de vista previa.
- **El enriquecimiento de metadatos de recursos es específico del servicio** Los tramos para servicios de Azure fuera de la [lista compatible](#supported-azure-services) se convierten, pero no se enriquecen con metadatos de recursos de Azure.
- **La jerarquía de trazas de formato mixto depende de los enlaces de tramo.** Algunas cargas de trabajo de Azure emiten una combinación del formato jerárquico heredado Request-Id y W3C Trace Context. Datadog conecta ambos formatos con [enlaces de tramo][3], para que pueda navegar entre trazas relacionadas.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/azure/
[2]: /es/logs/guide/azure-automated-log-forwarding/
[3]: /es/tracing/trace_collection/span_links/
[4]: https://www.datadoghq.com/product-preview/azure-app-insights-integration/
[5]: https://learn.microsoft.com/en-us/azure/azure-monitor/app/opentelemetry-enable
[6]: /es/opentelemetry/