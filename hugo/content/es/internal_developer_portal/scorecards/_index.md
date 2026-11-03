---
aliases:
- /es/tracing/software_catalog/scorecards
- /es/tracing/service_catalog/scorecards
- /es/service_catalog/scorecards
- /es/software_catalog/scorecards
cascade:
  site_support_id: idp
description: Evalúe automáticamente las entidades de su Catálogo según criterios definidos
  para medir el estado del software y promover las mejores prácticas de ingeniería
  en todos los equipos.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-forms
  tag: Blog
  text: Convierta los comentarios en acciones en toda su organización de ingeniería
    con Datadog Forms
- link: /internal_developer_portal/catalog/
  tag: Documentación
  text: Catalog
- link: /api/latest/service-scorecards/
  tag: Documentación
  text: Scorecards API
- link: https://www.datadoghq.com/blog/service-scorecards/
  tag: Blog
  text: Priorice y promueva las mejores prácticas de observabilidad de servicio con
    Scorecards
- link: https://www.datadoghq.com/blog/datadog-custom-scorecards/
  tag: Blog
  text: Formalice las mejores prácticas con Scorecards personalizados
- link: /delivery_performance/dora_metrics/
  tag: Documentación
  text: Realice un seguimiento de DORA Metrics con Datadog
- link: https://www.datadoghq.com/blog/scorecards-dogfooding/
  tag: Blog
  text: Cómo usamos Scorecards para definir y comunicar las mejores prácticas a escala
title: Scorecards
---
{{< img src="/tracing/software_catalog/scorecard-overview-updated.png" alt="Panel de Scorecards que destaca el rendimiento de las reglas" style="width:90%;" >}}

## Descripción general {#overview}

Los Scorecards ayudan a su equipo a medir y mejorar continuamente el estado y el rendimiento de su software Como ingenieros de plataforma, ustedes pueden crear Scorecards para evaluar automáticamente las entidades en su Catálogo según criterios definidos para identificar áreas que necesitan atención.

Usted tiene control total sobre cómo se definen los Scorecards. Además de los tres conjuntos de Scorecards principales que ofrece la plataforma Datadog sobre Preparación para Producción, Mejores Prácticas de Observabilidad y Documentación y Propiedad, usted puede personalizar las reglas predeterminadas o crear otras nuevas para que coincidan con las prioridades de su equipo y reflejen sus propios estándares operativos. Esta flexibilidad le permite adaptar los Scorecards a la cultura y madurez de ingeniería de su organización

Datadog evalúa los Scorecards predeterminados cada 24 horas para todas las entidades registradas en el Catálogo según un conjunto de criterios de aprobación o reprobación. Usted puede desactivar estas evaluaciones predeterminadas en cualquier momento. Usted puede configurar la entrada de datos, los criterios de evaluación y la frecuencia de evaluación para cualquier regla personalizada utilizando la [Scorecards API][1] o [Datadog Workflow Automation][2].  

Datadog puede resumir los resultados de los Scorecards en informes automatizados y entregarlos directamente a través de Slack, ayudando a su equipo a mantenerse alineado, realizar un seguimiento de las mejoras y abordar las brechas de manera eficiente

{{< callout url="https://www.datadoghq.com/product-preview/?product=internal-developer-portal-idp" header="¡Regístrese para obtener acceso anticipado a nuestras próximas funciones!" >}}
{{< /callout >}}

## Comience {#get-started}

{{< whatsnext desc="Configure los Scorecards y explore cómo pueden ayudar a su equipo:" >}}
    {{< nextlink href="/internal_developer_portal/scorecards/scorecard_configuration/" >}}Configurar Scorecards{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/scorecards/custom_rules/" >}}Crear reglas personalizadas{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/scorecards/using_scorecards/" >}}Aprenda lo que puede hacer con los Scorecards{{< /nextlink >}}
{{< /whatsnext >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/api/latest/service-scorecards/
[2]: /es/actions/workflows/