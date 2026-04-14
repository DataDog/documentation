---
aliases:
- /es/tracing/software_catalog/scorecards
- /es/tracing/service_catalog/scorecards
- /es/service_catalog/scorecards
- /es/software_catalog/scorecards
further_reading:
- link: /tracing/software_catalog/
  tag: Documentación
  text: Catálogo de software
- link: /api/latest/service-scorecards/
  tag: Documentación
  text: API de tarjetas de puntuación
- link: https://www.datadoghq.com/blog/service-scorecards/
  tag: Blog
  text: Priorizar y promover las prácticas de observabilidad recomendadas del servicio
    con tarjetas de puntuación
- link: https://www.datadoghq.com/blog/datadog-custom-scorecards/
  tag: Blog
  text: Formalizar las prácticas recomendadas con tarjetas de puntuación personalizadas
- link: /continuous_integration/dora_metrics/
  tag: Documentación
  text: Seguimiento de las métricas DORA con Datadog
- link: https://www.datadoghq.com/blog/scorecards-dogfooding/
  tag: Blog
  text: Cómo utilizamos Scorecards para definir y comunicar las prácticas recomendadas
    a gran escala
title: Scorcards
---

{{< callout url="#" btn_hidden="true" header="false" >}}
Las tarjetas de puntuación están en vista previa.
{{< /callout >}}

{{< img src="/tracing/software_catalog/scorecard-overview.png" alt="En el dashboard de scorecards se destacan las reglas predefinidas de preparación para la producción" style="width:90%;" >}}

## Información general

Los scorecards te ayudan a monitorizar, priorizar, planificar y comunicarte eficazmente para tomar medidas informadas que mejoren el estado y el rendimiento de tu software. Cada scorecard muestra el estado de preparación para la producción, las prácticas recomendadas de observabilidad y documentación y propiedad. Todas las entidades con metadatos definidos en Software Catalog se evalúan automáticamente en función de una serie de criterios de aprobado y desaprobado.

Puedes seleccionar las reglas utilizadas para rellenar los scorecards y puedes generar informes, que se envían directamente al canal Slack de tu equipo, para informar periódicamente sobre los resultados de scorecard.

## Para empezar

{{< whatsnext desc="Set up Scorecards and explore how they can help your team:" >}}
    {{< nextlink href="/internal_developer_portal/scorecards/scorecard_configuration/" >}}Configurar Scorecards{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/scorecards/custom_rules/" >}}Crear reglas personalizadas{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/scorecards/using_scorecards/" >}}Aprende lo que puedes hacer con Scorecards{{< /nextlink >}}
{{< /whatsnext >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /es/service_management/service_level_objectives/
[3]: https://app.datadoghq.com/monitors/recommended
[4]: /es/tracing/services/deployment_tracking/
[5]: /es/tracing/other_telemetry/connect_logs_and_traces/
[6]: /es/tracing/software_catalog/
[7]: /es/getting_started/tagging/unified_service_tagging/
[8]: https://app.datadoghq.com/services/scorecard
[9]: /es/service_management/workflows/
[10]: /es/api/latest/service-scorecards/