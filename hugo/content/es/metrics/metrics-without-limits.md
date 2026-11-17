---
algolia:
  tags:
  - metrics without limits
aliases:
- /es/metrics/faq/metrics-without-limits/
- /es/metrics/guide/metrics-without-limits-getting-started/
- /es/metrics/faq/why-is-my-save-button-disabled/
description: Desacople la ingesta y la indexación de Custom Metrics para controlar
  los volúmenes y los costos seleccionando qué etiquetas permanecen consultables.
further_reading:
- link: https://www.datadoghq.com/blog/metrics-without-limits
  tag: Blog
  text: Controle dinámicamente el volumen de sus Custom Metrics con Metrics without
    Limits™
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: Únase a una sesión interactiva para desbloquear todo el potencial de las métricas
title: Metrics without Limits™
---
## Descripción general {#overview}

Metrics without Limits™ le brinda flexibilidad y control sobre los volúmenes de sus Custom Metrics al desacoplar la ingesta y la indexación de Custom Metrics. Usted solo paga por las etiquetas de Custom Metrics que son valiosas para su organización.

Metrics without Limits™ le permite configurar etiquetas en todos los tipos de métricas dentro de la aplicación seleccionando una lista de etiquetas permitidas para que permanezcan consultables en todo Datadog; esto descarta automáticamente las etiquetas no esenciales adjuntas a métricas de nivel de aplicación o de negocio (por ejemplo, `host`). Alternativamente, puede configurar una lista de etiquetas bloqueadas dentro de la aplicación para descartar y excluir etiquetas; esto retiene automáticamente las etiquetas esenciales restantes que brindan valor comercial a sus equipos. Estas funcionalidades de configuración se encuentran en la página [Metrics Summary][1].

Esta página identifica los componentes clave de Metrics without Limits™ que pueden ayudarle a gestionar los volúmenes de sus métricas personalizadas dentro de su presupuesto de observabilidad.

### Configuración de etiquetas para una sola métrica {#configuration-of-tags-for-a-single-metric}

#### Lista de etiquetas permitidas {#allowlist-of-tags}

1. Haga clic en cualquier nombre de métrica para abrir su panel lateral de detalles. 
2. Haga clic en {{< ui >}}Manage Tags{{< /ui >}}, luego en {{< ui >}}Include tags{{< /ui >}} para configurar las etiquetas que desea que permanezcan consultables en Dashboards, notebooks, monitores y otros productos de Datadog.
3. Defina su lista de etiquetas permitidas. 
De forma predeterminada, el modal de configuración de etiquetas se completa previamente con una lista de etiquetas permitidas recomendada por Datadog que se han consultado activamente en Dashboards, notebooks, monitores o a través de la API en los últimos 30 días. Las etiquetas recomendadas se distinguen con un icono de gráfico de líneas. 
   a. Además, incluya las etiquetas que se utilizan en los activos (Dashboards, monitores, notebooks y SLO). Estas etiquetas se utilizan en los activos pero no se consultan activamente y están marcadas con un icono de objetivo. Agregar estas etiquetas garantiza que no pierda visibilidad sobre sus activos críticos. 
4. Revise el *Estimated New Volume* de Custom Metrics indexadas que resulta de esta posible configuración de etiquetas.
5. Haga clic en {{< ui >}}Save{{< /ui >}}.

{{< img src="metrics/mwl_example_include_tags-compressed_03182025.mp4" alt="Configuración de etiquetas con lista de etiquetas permitidas" video=true style="width:100%" >}}

{{< img src="metrics/tags_used_assets.png" alt="Mostrar a los clientes que pueden agregar etiquetas utilizadas en activos en su configuración de MWL" style="width:100%" >}}

Puede [crear][2], [editar][3], [eliminar][4] y [estimar el impacto][5] de su configuración de etiquetas a través de las API de métricas.

#### Lista de bloqueo de etiquetas {#blocklist-of-tags}

1. Haga clic en cualquier nombre de métrica para abrir su panel lateral de detalles.
2. Haga clic en {{< ui >}}Manage Tags{{< /ui >}}, luego en {{< ui >}}Exclude Tags{{< /ui >}}. 
3. Defina su lista de bloqueo de etiquetas. Las etiquetas definidas en la lista de bloqueo **no** se pueden consultar en Dashboards y monitores. Las etiquetas que se han consultado activamente en Dashboards, notebooks, monitores y a través de la API en los últimos 30 días se distinguen con un ícono de gráfico de líneas.
4. Revise el *Estimated New Volume* de Custom Metrics indexadas que resulta de esta posible configuración de etiquetas.
5. Haga clic en {{< ui >}}Save{{< /ui >}}.

{{< img src="metrics/mwl-example-tag-exclusion-compressed_04032025.mp4" alt="Configuración de etiquetas con exclusión de etiquetas" video=true style="width:100%" >}}

Establezca el parámetro `exclude_tags_mode: true` en la API de métricas para [crear][2] y [editar][3] una lista de bloqueo de etiquetas.

**Nota:** Para que las etiquetas se puedan administrar en una métrica, la métrica debe tener un tipo declarado. Esto generalmente se hace cuando se envía una métrica, pero también se puede hacer manualmente usando el botón {{< ui >}}Edit{{< /ui >}} para una métrica en Metrics Summary.

#### Utilice la API {#use-the-api}

Puede [crear][2], [editar][3], [eliminar][4] y [estimar el impacto][5] de su configuración de etiquetas a través de las API de métricas.

### Configure varias métricas a la vez {#configure-multiple-metrics-at-a-time}

Para configurar etiquetas en muchas métricas a la vez, utilice [Tag Indexing Rules][16]. Una regla de etiquetas aplica una lista de permitidos o una lista de bloqueo de etiquetas a cada métrica que coincida con un nombre o prefijo de métrica, incluidas las métricas enviadas después de crear la regla.

## Facturación de Metrics without Limits™ {#metrics-without-limits-billing}

Configurar sus etiquetas le brinda control sobre qué Custom Metrics se pueden consultar, lo que en última instancia reduce su recuento facturable de Custom Metrics. Metrics without Limits™ desacopla los costos de ingesta de los costos de indexación. Puede seguir enviando a Datadog todos sus datos (todo se ingiere) y puede especificar una lista de etiquetas permitidas que desea que sigan siendo consultables en la plataforma Datadog. Si el volumen de datos que Datadog ingiere para sus métricas configuradas difiere del volumen menor restante que usted indexa, puede ver dos volúmenes distintos en su página de Usage, así como en la página de Metrics Summary. 

- {{< ui >}}Ingested Custom Metrics{{< /ui >}}: El volumen original de Custom Metrics basado en todas las etiquetas ingeridas.
- {{< ui >}}Indexed Custom Metrics{{< /ui >}}: El volumen de Custom Metrics que permanece consultable en la plataforma Datadog (basado en cualquier configuración de Metrics without Limits™).

**Nota: Bajo los precios por cardinalidad, solo las métricas configuradas contribuyen a su volumen de Custom Metrics ingeridas.** Si una métrica no está configurada con Metrics without Limits™, solo se le cobrará por su volumen de Custom Metrics indexadas.

Más información sobre [Facturación de Custom Metrics][8].

### Con precios por nombre de métrica {#under-metric-name-pricing}

Si su organización utiliza [precios por nombre de métrica][15] en lugar de precios por cardinalidad, la relación entre ingesta e indexación funciona de manera diferente:

| Aspecto                                       | Precios por cardinalidad                                              | Precios por nombre de métrica                                                                  |
|----------------------------------------------|------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| Métricas que contribuyen al volumen ingerido   | Solo las métricas configuradas con Metrics without Limits™             | Todas las métricas (cada punto de datos enviado)                                              |
| Multiplicador de métricas de distribución               | El comportamiento depende de la configuración de Metrics without Limits™        | Se aplica tanto a lo ingerido como a lo indexado independientemente de la configuración                     |

Para obtener todos los detalles sobre el modelo, consulte [Precios por nombre de métrica para Custom Metrics][15].

## Primeros pasos con Metrics without Limits™ {#getting-started-with-metrics-without-limits}

1. Configure sus 20 métricas principales en la página [Plan & Usage][9] desde la página Metrics Summary o mediante la [API][2].
   Para configurar etiquetas en muchas métricas a la vez, cree una [Tag Indexing Rule][16] con alcance a un prefijo de nombre de métrica.

**Nota:** Si utiliza la [API de creación de configuración de etiquetas][2], utilice primero la [API del estimador de cardinalidad de configuración de etiquetas][5] para validar el impacto potencial de sus configuraciones de etiquetas antes de crearlas. Si la interfaz de usuario o la API del estimador devuelve un número de métricas indexadas mayor que el de métricas ingeridas, no guarde su configuración de etiquetas.

2. Configure sus métricas no consultadas con configuraciones de etiquetas vacías.

   A medida que sus equipos continúen limpiando las métricas ruidosas que nunca se consultan en la plataforma de Datadog, puede minimizar instantáneamente los costos de estas métricas no consultadas configurándolas con una lista vacía de etiquetas permitidas. 

3. Revise su uso y facturación. Después de configurar sus métricas, el impacto de sus cambios se puede validar de tres maneras: 

   - Antes de guardar su configuración, el estimador de cardinalidad de configuración de etiquetas devuelve el número resultante estimado de Custom Metrics indexadas, que debería ser menor que sus volúmenes de Custom Metrics ingeridas.
   - Después de guardar su configuración, el panel lateral de detalles de Metrics Summary debería mostrar que el volumen de Custom Metrics indexadas es menor que el volumen de Custom Metrics ingeridas.
   - 24 horas después de haber guardado su configuración, también puede ver el impacto en la tabla {{< ui >}}Top Custom Metrics{{< /ui >}} de su página Plan & Usage. Debería haber una reducción en el volumen de Custom Metrics entre la pestaña {{< ui >}}Month-to-Date{{< /ui >}} y la pestaña {{< ui >}}Most Recent Day{{< /ui >}} de esta tabla.

## Mejores prácticas {#best-practices}

- Puede configurar alertas para su métrica de [uso estimado de Custom Metrics][10] en tiempo real a fin de correlacionar los picos de Custom Metrics con las configuraciones.

- [Control de acceso basado en roles][11] para Metrics without Limits™ también está disponible para controlar qué usuarios tienen permisos para usar esta función que tiene implicaciones de facturación.

- Los eventos de auditoría le permiten hacer un seguimiento de las configuraciones de etiquetas y las agregaciones de percentiles que se hayan realizado y que puedan correlacionarse con picos de Custom Metrics. Busque "tags:audit" y "queryable tag configuration" o "percentile aggregations" en su [Events Stream][12].

\*Metrics without Limits es una marca comercial de Datadog, Inc.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/summary
[2]: /es/api/latest/metrics/#create-a-tag-configuration
[3]: /es/api/latest/metrics/#update-a-tag-configuration
[4]: /es/api/latest/metrics/#delete-a-tag-configuration
[5]: /es/api/latest/metrics/#tag-configuration-cardinality-estimator
[6]: /es/metrics/#time-and-space-aggregation
[8]: /es/account_management/billing/custom_metrics/
[9]: https://app.datadoghq.com/billing/usage
[10]: /es/account_management/billing/usage_metrics/
[11]: /es/account_management/rbac/permissions/?tab=ui#metrics
[12]: https://app.datadoghq.com/event/stream
[15]: /es/account_management/billing/metric_name_pricing/
[16]: /es/metrics/guide/tag-indexing-rules/