---
description: Aplique prácticas recomendadas de visibilidad, atribución y prevención
  para gestionar los volúmenes y costos de las Custom Metrics.
further_reading:
- link: /metrics/custom_metrics/
  tag: Documentación
  text: Más información sobre Custom Metrics
- link: /account_management/billing/custom_metrics/?tab=countrate
  tag: Documentación
  text: Facturación de Custom Metrics
- link: /metrics/metrics-without-limits/
  tag: Documentación
  text: Metrics without Limits™
- link: /metrics/volume/
  tag: Documentación
  text: Gestión del volumen de métricas
- link: https://www.datadoghq.com/blog/custom-metrics-governance/
  tag: Blog
  text: Prácticas recomendadas para la gobernanza integral de Custom Metrics
- link: https://www.datadoghq.com/blog/govern-custom-metrics/
  tag: Blog
  text: Guía de un ingeniero de FinOps para la gobernanza de Custom Metrics
- link: https://learn.datadoghq.com/courses/metrics-governance
  tag: Centro de aprendizaje
  text: Gobernanza de métricas
title: Prácticas recomendadas para la gobernanza de Custom Metrics
---
## Descripción general {#overview}

Las aplicaciones basadas en la nube pueden generar cantidades masivas de datos y altos costos de observabilidad, lo que finalmente presiona a las organizaciones para reducir esta partida presupuestaria. Para reducir los costos de observabilidad, muchos equipos recurren a recopilar menos métricas; sin embargo, para los equipos centralizados de SRE y observabilidad, una gobernanza eficaz de Custom Metrics debería aumentar la eficiencia del seguimiento en lugar de eliminar la visibilidad por completo.

Esta guía proporciona prácticas recomendadas para gestionar los volúmenes de sus Custom Metrics a través de los tres componentes clave de una gobernanza de métricas eficaz: **Visibilidad y atribución**, **Gobernanza práctica de Custom Metrics** y **Seguimiento y prevención**. Aprenda a utilizar las herramientas disponibles de Datadog para mantener una observabilidad rentable para estos componentes clave:
- [Encuentre y comprenda el uso y los costos de sus métricas](#visibility-and-attribution)
- [Identifique sus principales generadores de costos](#account-level-visibility)
- [Atribuya sus principales generadores de costos a los equipos o servicios responsables de ellos](#team-level-visibility-and-attribution)
- [Reduzca los costos de las métricas menos valiosas y no utilizadas](#value-based-metrics-governance)
- [Haga un seguimiento del uso y contrólelo antes de incurrir en excedentes de facturación](#monitoring-and-prevention)

Consulte este [recorrido interactivo][17] de las herramientas de gobernanza de Custom Metrics de Datadog. 

## Requisitos previos {#prerequisites}

<div class="alert alert-danger">Algunas funciones del producto requieren acceso de administrador.</div> 

{{< whatsnext desc="Esta guía asume que usted tiene conocimientos sobre los siguientes conceptos de Custom Metrics:" >}}
    {{< nextlink href="/metrics/custom_metrics/" >}}Qué se considera una métrica personalizada{{< /nextlink >}}
    {{< nextlink href="/account_management/billing/custom_metrics/?tab=countrate" >}}Cómo se facturan las Custom Metrics{{< /nextlink >}}
{{< /whatsnext >}}


## Visibilidad y atribución {#visibility-and-attribution}

El primer paso para gestionar los volúmenes y costos de sus Custom Metrics es comprender cuáles son los principales generadores de costos de las métricas y atribuir esos generadores a sus respectivos propietarios. 

Consulte los pasos de esta sección para revisar el uso mensual total de métricas de su cuenta y ver un desglose del uso de su cuenta por equipo o por la clave de etiqueta que seleccione.

### Visibilidad a nivel de cuenta {#account-level-visibility}

<div class="alert alert-danger">Debe tener el rol <a href="https://docs.datadoghq.com/account_management/rbac/?tab=datadogapplication">Datadog Admin Role</a> para acceder a la página Plan & Usage.</div>

La página [Plan and Usage][1] le proporciona un resumen listo para usar (OOTB) del uso mensual facturable de Custom Metrics de su cuenta, con información detallada sobre sus costos, la tasa de consumo y los nombres de las principales Custom Metrics.

   1. Desde la [página Plan & Usage][2], desplácese hacia abajo hasta la sección *Usage Summary*.
   1. Haga clic en la pestaña {{< ui >}}Custom Metrics{{< /ui >}} para visualizar el uso facturable de Custom Metrics de su organización, las tendencias de uso y los nombres de las principales Custom Metrics.
   1. Desplácese hacia abajo hasta *Top Custom Metrics for \<MONTH YEAR\>*, para visualizar los nombres de las métricas principales y su porcentaje de contribución a los costos de sus Custom Metrics.

Conocer qué métricas son las que más contribuyen al uso y los costos mensuales de su cuenta es el punto de partida recomendado para usar [Metrics without Limits™][4]. Con este conocimiento, puede encontrar la fuente de estos envíos de métricas, ya sea por equipos, servicio, organización u otro atributo de etiqueta.

Además, revise la información de [Usage Attribution][3] para obtener un desglose total del uso facturable de su cuenta por claves de etiqueta. Desde aquí, puede identificar los factores que más influyen en sus costos mediante etiquetas como equipo, servicio o aplicación. 

**Nota**: Usage Attribution es una función avanzada incluida en el plan Enterprise. Para todos los demás planes, comuníquese con su representante de cuenta o con Customer Success para solicitar esta función.

#### Visibilidad a nivel de métrica {#metric-level-visibility}

{{< img src="metrics/tagsexplorer.png" alt="Custom Metrics Tags Cardinality Explorer para un nombre de métrica con picos" style="width:80%;">}}

Una vez que haya identificado qué nombres de métricas están aumentando el uso y los costos mensuales de su cuenta, puede ir al panel lateral de detalles de la métrica para visualizar Custom Metrics Tags Cardinality Explorer. Esto le muestra qué claves de etiqueta están provocando que la cardinalidad de una métrica en particular aumente. Cualquier clave de etiqueta no deseada o sin límites con grandes aumentos en la cantidad de valores de etiqueta únicos es la causa probable. Exclúyalas usando Metrics without Limits™ para lograr ahorros de costos inmediatos.

### Visibilidad y atribución a nivel de equipo {#team-level-visibility-and-attribution}

La visibilidad a nivel de equipo permite a los administradores de la cuenta exigir responsabilidad a los equipos. Más importante aún, brinda a los equipos la oportunidad de comprender y reducir su impacto en el volumen de métricas.

Es posible que los equipos individuales tengan una visibilidad limitada de los costos de las métricas y etiquetas que envían. Esto resulta en que los equipos estén menos motivados para controlar su uso o incluso limitar el crecimiento del mismo. Es crucial que todos tengan visibilidad de su uso y se sientan facultados para asumir la responsabilidad de gestionar esos volúmenes y los costos asociados.

#### Encuentre la fuente de sus Custom Metrics de mayor volumen {#find-the-source-of-your-largest-custom-metrics}
<div class="alert alert-danger">Debe tener el rol <a href="https://docs.datadoghq.com/account_management/rbac/?tab=datadogapplication">Datadog Admin Role</a> para acceder a la página Plan & Usage.</div>

{{< img src="metrics/guide/custom_metrics_governance/team_attribution_plan_usage_table.png" alt="Vaya a Metrics Summary desde la página Plan & Usage a través de la tabla Top Custom Metrics" style="width:90%;" >}}

Para identificar qué equipo o servicio es responsable de los nombres de sus principales Custom Metrics:

1. Desde la [página Plan & Usage][2], desplácese hacia abajo hasta la sección *Usage Summary*.
1. Haga clic en la pestaña {{< ui >}}Custom Metrics{{< /ui >}} para visualizar el uso facturable, las tendencias de uso y las principales Custom Metrics de su organización.
1. Debajo de la tabla *Top Custom Metrics for <MONTH YEAR>*, haga clic en el ícono {{< ui >}}See in Metrics Summary{{< /ui >}} correspondiente a la principal Custom Metrics. Esto lo lleva a la página *Metrics Summary* con el panel lateral de detalles de la métrica abierto. 
1. En el panel lateral, desplácese hacia abajo hasta la sección *Tags* para visualizar las etiquetas asociadas, como equipos y servicios.

#### Visualice las Custom Metrics de su equipo {#view-your-teams-custom-metrics}

Todos los equipos deben tener visibilidad sobre qué métricas están provocando picos en su facturación en tiempo real y sentirse seguros de que sus esfuerzos de optimización de costos no afectan la visibilidad de otro equipo.

Para ver todos los nombres de métricas que su equipo envía activamente, vaya a la [página Metrics Summary][6] y escriba el par de clave de etiqueta y valor (por ejemplo, `team:dev` o `service:demo`) en el campo {{< ui >}}Filter by Tag Value{{< /ui >}}.

#### Identifique las métricas de cualquier equipo que tengan el mayor impacto en su factura {#identify-any-teams-metrics-that-have-the-biggest-impact-on-your-bill}

Todos los usuarios de su organización pueden visualizar, de forma predeterminada y en tiempo real, el uso estimado de Custom Metrics en la [página Metrics Volume Management][7]. Las perspectivas inteligentes de Datadog ayudan a identificar en qué métricas enfocar sus esfuerzos de optimización de costos. Utilice Metrics Volume Management con Metrics without Limits™ para controlar el uso de sus Custom Metrics indexadas y reducir costos sin sacrificar la precisión.

Con Metrics Volume Management, puede identificar las métricas de mayor volumen de su organización, así como los nombres de las métricas cuyo volumen está aumentando bruscamente (posibles responsables de cualquier exceso inesperado).

{{< img src="metrics/guide/custom_metrics_governance/volume_management_page_2025-01-27.png" alt="Página Metrics Volume Management" style="width:90%;" >}}

Para obtener más información, consulte la documentación de [Metrics Volume Management][8].

## Gobernanza de métricas basada en el valor {#value-based-metrics-governance}

Una gobernanza eficaz de Custom Metrics debería aumentar la eficiencia del seguimiento. Después de comprender cuál es su uso y atribuirlo a su fuente, tome medidas para reducir sus métricas. 

En esta sección, aprenda sobre las acciones que puede tomar para maximizar el retorno de inversión y el valor que obtiene de su gasto en observabilidad sin sacrificar la visibilidad en la que su equipo confía activamente.

### Metrics without Limits™ {#metrics-without-limits}

[Metrics without Limits™][4] de Datadog es una función de gestión de costos pionera en la industria que desacopla la ingesta de métricas de la indexación. No todas sus métricas son igual de valiosas en todo momento y, con Metrics without Limits™, solo paga por las métricas valiosas. 

Reduzca el volumen de métricas personalizadas indexadas para cualquier nombre de métrica mediante una configuración de etiquetas que desee conservar para las consultas. Reduce sus costos y preserva la precisión matemática de sus métricas configuradas (todo dentro de la plataforma sin cambios a nivel de código).

{{< img src="metrics/volume/reduce_metric_vol_cost_tags_03142025.png" alt="Ejemplo de uso de Metrics Volume Management y Metrics without Limits™ para reducir el volumen mediante una configuración de etiquetas que limite la lista de etiquetas permitidas" style="width:80%;" >}}

Con Metrics without Limits™, Datadog proporciona automáticamente lo siguiente:
- Configuraciones de etiquetas recomendadas y actualizadas, basadas en las etiquetas consultadas activamente y en las utilizadas en los recursos (gracias a nuestro análisis inteligente de consultas), para ayudarle a maximizar el retorno de inversión y el valor que obtiene de su gasto en observabilidad.
- Análisis inteligente de consultas que calcula y analiza continuamente las interacciones de todos los usuarios (tanto en la aplicación como a través de la API) con cualquier métrica enviada a Datadog para que las configuraciones de etiquetas recomendadas siempre sean relevantes.
- Capacidad de revertir cambios en cualquier momento para restaurar la visibilidad de las etiquetas para los nuevos datos. La reversión no recupera retroactivamente las etiquetas excluidas anteriormente.

Como parte de las mejores prácticas de gobernanza de métricas de Datadog, comience utilizando Metrics without Limits en sus [Top Custom Metrics](#identify-metrics-that-have-the-biggest-impact-on-monthly-bill).

Para obtener más detalles, consulte la documentación de [Metrics without Limits™][4].

### Evite configuraciones accidentales que reduzcan la observabilidad con RBAC {#prevent-unintentional-configurations-that-reduce-observability-with-rbac}

Metrics without Limits™ permite a los usuarios reducir costos en métricas indexando menos datos. Cuando se usa incorrectamente, la configuración podría provocar picos involuntarios en el uso o la pérdida de visibilidad de las etiquetas que ya no están indexadas. Para evitar cambios inesperados, utilice los [permisos de RBAC][9]. Puede editar un rol de usuario existente para incluir el permiso `metrics_tags_write` o crear un rol personalizado. Esto le da a su organización un mejor control sobre qué miembros pueden afectar la [cardinalidad][10] de las métricas y quién puede cambiar las configuraciones de etiquetas de Metrics without Limits™.

Datadog proporciona un [registro de auditoría][11] de todas las configuraciones de Metrics without Limits™---detallando la configuración y el usuario que realizó la configuración---para que pueda atribuir cualquier pico o caída en el uso de sus métricas personalizadas. Para ver los eventos de su registro de auditoría, ingrese la siguiente consulta en [Events Explorer][12]:

```
tags:audit "Queryable tag configuration" 
```

{{< img src="/metrics/guide/custom_metrics_governance/metrics_rbac_audit_trail_query.png" alt="Event Explorer con la consulta de registro de auditoría de métricas" style="width:90%;" >}}

### Reduzca los costos de las métricas no consultadas y no utilizadas {#reduce-costs-from-unqueried-and-unused-metrics}

#### Métricas no consultadas {#unqueried-metrics}

Para asegurarse de no eliminar una visibilidad valiosa mientras reduce los costos, utilice la faceta {{< ui >}}Query Activity{{< /ui >}}. Esto le permite distinguir las métricas que su equipo consulta activamente y de las que depende de aquellas que no se consultan en ningún lugar de Datadog ni a través de la API. El análisis inteligente de consultas de Datadog calcula y analiza continuamente las interacciones de todos los usuarios (en Datadog o a través de la API) con cualquier métrica para ayudar a identificar las métricas no consultadas.

**Nota**: Las métricas no consultadas podrían utilizarse en consultas sobre activos (tableros, notebooks, seguimientos y SLOs). Se consideran no consultadas si el activo no se utiliza dentro del marco de tiempo determinado.

#### Métricas no utilizadas {#unused-metrics}

También puede reducir costos, sin efectos secundarios no deseados, utilizando la [faceta Related Assets][16]. Esto le permite identificar las métricas que no están siendo utilizadas por ninguno de sus activos (tableros, notebooks, seguimientos y SLOs). Esto le permite tomar decisiones informadas sobre sus configuraciones de métricas.

#### Identifique todas las métricas no consultadas y no utilizadas {#identify-all-unqueried-and-unused-metrics}

Utilice la [faceta Related Assets][16] para obtener visibilidad de las métricas que no se utilizan en Datadog, lo cual puede ayudarle a reducir costos sin romper accidentalmente ningún activo. Esta faceta le permite ver qué métricas se utilizan en sus tableros, notebooks, seguimientos y SLOs, lo que le permite tomar decisiones informadas sobre sus configuraciones de métricas.

Identifique la lista completa de métricas no consultadas y no utilizadas de su organización:

1. En la [página de Metrics Summary][6], busque la faceta {{< ui >}}Query Activity{{< /ui >}} en el lado izquierdo. Seleccione el marco de tiempo de interés (30, 60 o 90 días).
2. Busque la faceta {{< ui >}}Related Assets{{< /ui >}} en el lado izquierdo y seleccione {{< ui >}}Not used in any asset{{< /ui >}}.
3. Busque la faceta {{< ui >}}Configuration{{< /ui >}} en el lado izquierdo y seleccione {{< ui >}}All Tags{{< /ui >}}. La combinación de estas tres facetas le proporciona una lista de todas las métricas que no se consultan ni se utilizan en sus activos, y que aún no tienen una configuración de etiqueta personalizada.

4. Revise la tabla resultante de nombres de métricas. ¿Existen patrones o se envían desde un servicio específico? Encuentre las etiquetas asociadas con estas métricas no consultadas.
5. (Opcional) Para exportar esta lista, haga clic en {{< ui >}}Export as CSV{{< /ui >}} sobre la tabla de métricas.

   Después de identificar las métricas que sus desarrolladores no necesitan, puede reducir de forma segura los volúmenes de métricas personalizadas y los costos asociados de estas métricas no utilizadas con Metrics without Limits™. 

{{< img src="metrics/guide/custom_metrics_governance/manage_tags_fm_metrics_summary_2025-01-27.png" alt="El menú desplegable Configure Metrics con la selección Manage tags resaltada" style="width:90%;" >}}

6. En la parte superior de la [página de Metrics Summary][6], haga clic en el menú desplegable {{< ui >}}Configure Metrics{{< /ui >}}.
7. Seleccione {{< ui >}}Manage tags{{< /ui >}} para abrir la [ventana de configuración de etiquetas de Metrics without Limits™][13] y configurar varias métricas de forma masiva.
8. Especifique el prefijo del espacio de nombres de las métricas que desea configurar.
9. Deje {{< ui >}}Include tags{{< /ui >}} seleccionado. Esto incluye todas las etiquetas que se han consultado activamente en sus activos (tableros, notebooks, seguimientos y SLOs), en el Metrics Explorer o a través de la API.
10. Haga clic en {{< ui >}}Save{{< /ui >}}.

Basándonos en los análisis inteligentes de consultas de Datadog de miles de clientes que usan métricas personalizadas, descubrimos que usar **Metrics without Limits™ en métricas no consultadas puede reducir el uso de métricas personalizadas del cliente promedio hasta en un 70 %**.

### Comprenda la utilidad relativa de sus métricas {#understand-the-relative-utility-of-your-metrics}

Aunque una métrica no se haya consultado durante los últimos 30, 60 o 90 días, sus equipos aún podrían obtener valor de ella para la gestión de incidentes y la resolución de interrupciones. Por el contrario, sus equipos podrían estar subutilizando métricas existentes que se consultan activamente. Por lo tanto, comprender la utilidad relativa de sus métricas es el siguiente paso recomendado en su flujo de trabajo de gobernanza. 

Metrics without Limits™ de Datadog es un conjunto de funciones que también le proporciona información inmediata (OOTB) para evaluar el valor de sus métricas consultadas activamente con el panel lateral [Metrics Related Assets][15]. Un activo relacionado con métricas se refiere a cualquier activo de Datadog, como un tablero, notebook, seguimiento o SLO que consulte una métrica en particular. Use la columna {{< ui >}}Tags{{< /ui >}} para identificar qué etiquetas específicas se utilizan en los activos y asegurarse de mantener la visibilidad al optimizar con Metrics without Limits™. Utilice la popularidad y la cantidad de activos relacionados para evaluar la utilidad de las métricas dentro de su organización, lo que permite tomar decisiones basadas en datos. Obtenga una mejor comprensión de cómo su equipo puede usar las métricas existentes para obtener más valor de su inversión en observabilidad. 

{{< img src="metrics/related_assets_08_05_2025.png" alt="Panel lateral de detalles de la métrica que muestra la sección Related Assets. La métrica de ejemplo se aplica a tres tableros" style="width:100%;" >}}

Para visualizar los activos relacionados de una métrica:
1. Haga clic en el nombre de la métrica para abrir su panel lateral de detalles.
1. Desplácese hacia abajo hasta la sección del panel lateral titulada {{< ui >}}Related Assets{{< /ui >}}.
1. Haga clic en el botón desplegable para visualizar el tipo de activo relacionado que le interesa (tableros, seguimientos, notebooks, SLOs). Puede usar la barra de búsqueda para validar activos específicos.
   

## Seguimiento y prevención {#monitoring-and-prevention}
En esta sección, aprenda cómo: 
- Alertar sobre excesos y picos repentinos en el uso total de Custom Metrics de su cuenta
- Pronosticar el crecimiento futuro de las métricas y alertar sobre cualquier desviación general inesperada
- Alertar cuando la cardinalidad de una métrica en particular supere un umbral definido por el usuario o aumente de forma anómala
Una vez que comprenda el uso de métricas de su cuenta y los equipos responsables de esos costos, configure seguimientos para recibir alertas cuando el uso de sus Custom Metrics supere un determinado umbral. Reciba alertas sobre picos en el uso de Custom Metrics para que pueda evitar aumentos inesperados en la facturación.

Datadog ofrece métricas OOTB que miden el [uso estimado de Custom Metrics][15]. Puede utilizar estas métricas en las visualizaciones de sus tableros y en las alertas de seguimiento. 

| Tipo de uso                    | Métrica                                   | Descripción |
|-------------------------------|------------------------------------------| ----------- |
| Indexed Custom Metrics        | `datadog.estimated_usage.metrics.custom`, `datadog.estimated_usage.metrics.custom.by_metric`,  `datadog.estimated_usage.metrics.custom.by_tag` | Cantidad de Indexed Custom Metrics distintos registrados en la última hora. |
| Ingested Custom Metrics       | `datadog.estimated_usage.metrics.custom.ingested`, `datadog.estimated_usage.metrics.custom.ingested.by_metric`, `datadog.estimated_usage.metrics.custom.ingested.by_tag` | Cantidad de Ingested Custom Metrics distintos registrados en la última hora. |

### Hacer un seguimiento de los picos en el uso de Custom Metrics para evitar excedentes {#monitor-spikes-in-custom-metric-usage-to-prevent-overages}

{{< img src="metrics/guide/custom_metrics_governance/estimated_usage_metric_monitor.png" alt="Ejemplo de configuración de seguimiento de métricas con la métrica de uso estimado y un umbral de 700,000" style="width:80%;" >}}

También puede ver un desglose del uso estimado de sus Custom Metrics en tiempo real por nombre de métrica, ya sea con el widget de series temporales del tablero o con un seguimiento de métricas. Utilice la métrica `datadog.estimated_usage.metrics.custom.by_metric` para configurar un seguimiento y así tener siempre visibilidad actualizada del volumen de cada una de sus métricas. 

### Casos de uso adicionales de seguimiento {#additional-monitoring-use-cases}
Después de recibir una alerta, utilice la página Metrics Volume Management para inspeccionar las claves de etiqueta de cualquier métrica que presente picos y utilice Metrics without Limits™ para descartar inmediatamente cualquier clave de etiqueta anómala que esté provocando el pico en su métrica. Esto garantizará que pueda resolver inmediatamente cualquier pico de facturación involuntario. 
{{< whatsnext desc="Casos de uso adicionales para configurar seguimientos con las métricas de uso estimado:" >}}
    {{< nextlink href="/monitors/types/change-alert/" >}}Alertar cuando el volumen cambie más allá de un cierto porcentaje.{{< /nextlink >}}
    {{< nextlink href="/monitors/types/anomaly/" >}}Alertar sobre cambios anómalos en el uso.{{< /nextlink >}}
    {{< nextlink href="/monitors/types/forecasts/" >}}Pronosticar el crecimiento futuro de las métricas y alertar sobre cualquier desviación general inesperada.{{< /nextlink >}}

{{< /whatsnext >}}

## Resumen de mejores prácticas {#summary-of-best-practices}

1. Comience por identificar los nombres de las métricas con mayor volumen (en su tabla Top Custom Metrics o en la página Metrics Volume) y utilice Metrics without Limits™ para optimizar el volumen de estas métricas principales de la manera más rentable. 
2. Utilice la página Metrics Volume Management para atribuir cualquier pico existente en el uso de Custom Metrics a los nombres de las métricas con los mayores picos que lo provocan.
3. Para obtener ahorros de costos inmediatos, identifique las Custom Metrics que no se consultan y use Metrics without Limits™ para asignarles configuraciones de etiquetas vacías.
4. Configure seguimientos para el uso de sus Custom Metrics mediante cualquiera de las métricas OOTB de Datadog que estiman el uso de Custom Metrics.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/plan_and_usage/
[2]: https://app.datadoghq.com/billing/usage
[3]: /es/account_management/billing/usage_attribution/
[4]: /es/metrics/metrics-without-limits/
[5]: https://app.datadoghq.com/billing/usage-attribution?view=table
[6]: https://app.datadoghq.com/metric/summary
[7]: https://app.datadoghq.com/metric/volume
[8]: /es/metrics/volume/
[9]: https://docs.datadoghq.com/es/account_management/rbac/permissions/?tab=ui#metrics
[10]: /es/glossary/#cardinality
[11]: /es/account_management/audit_trail/
[12]: https://app.datadoghq.com/event/explorer
[13]: https://app.datadoghq.com/metric/volume?bulk_manage_tags=true&facet.query_activity=-queried&sort=volume_total
[14]: https://docs.datadoghq.com/es/metrics/metrics-without-limits/#configuration-of-tags-for-a-single-metric
[15]: /es/metrics/summary/#metrics-related-assets
[16]: /es/metrics/summary/#facet-panel
[17]: https://tour.datadoghq.com/psl/swa0y11