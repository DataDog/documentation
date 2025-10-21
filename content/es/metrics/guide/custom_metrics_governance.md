---
further_reading:
- link: /metrics/custom_metrics/
  tag: Documentación
  text: Más información sobre las métricas personalizadas
- link: /account_management/billing/custom_metrics/?tab=countrate
  tag: Documentación
  text: Facturación de métricas personalizadas
- link: /metrics/metrics-without-limits/
  tag: Documentación
  text: Metrics without LimitsTM
- link: /metrics/volume/
  tag: Documentación
  text: Gestión del volumen de métricas
title: Prácticas recomendadas para la gobernanza de métricas personalizadas
---

## Información general

Las aplicaciones basadas en la nube pueden generar grandes cantidades de datos y grandes costes de observabilidad, lo que obliga a las organizaciones a reducir esta partida presupuestaria. Para reducir los costes de observabilidad, muchos equipos recurren a recopilar menos métricas; sin embargo, para los equipos centralizados de SRE y observabilidad, una gobernanza eficaz de métricas personalizadas debería aumentar la eficiencia de la monitorización en lugar de recortar la visibilidad por completo.

Esta guía proporciona las mejores prácticas para gestionar sus métricas personalizadas volúmenes a través de los tres componentes clave de una gobernanza eficaz de métricas: **Visibilidad y atribución**, **Gobierno accionable métricas personalizadas Accionable**, y **Monitorización y Prevención**. Aprenda a utilizar las herramientas disponibles en Datadog para mantener una observabilidad rentable de estos componentes clave:
- [Encontrar y comprender tu uso y costes de métricas](#visibility-and-attribution)
- [Identificar tus principales generadores de costes](#account-level-visibility)
- [Atribuir tus principales generadores de costes a los equipos o servicios responsables de ellos](#team-level-visibility-and-attribution)
- [Reducir los costes de las métricas menos valiosas y no utilizadas](#value-based-metrics-governance)
- [Monitorizar y controlar el uso antes de incurrir en excesos de facturación](#monitoring-and-prevention)


## Requisitos previos

<div class="alert alert-danger">Algunas funciones del producto requieren acceso de administrador.</div>

{{< whatsnext desc="Esta guía asume que comprendes los siguientes conceptos de las métricas personalizadas:" >}}
    {{< nextlink href="/metrics/custom_metrics/" >}}qué se considera una métrica personalizada{{< /nextlink >}}
    {{< nextlink href="/account_management/billing/custom_metrics/?tab=countrate" >}}Cómo se facturan las métricas personalizadas{{< /nextlink >}}
{{< /whatsnext >}}


## Visibilidad y atribución

El primer paso para gestionar los volúmenes y costes de tus métricas personalizadas es comprender cuáles son los factores clave de los costes de métrica y atribuirlos a sus respectivos propietarios. 

Consulta los pasos de esta sección para revisar el uso mensual de métrica de toda tu cuenta y ver un desglose del uso de tu cuenta por equipo o seleccionando una clave de etiqueta.

### Visibilidad a nivel de cuenta

<div class="alert alert-danger">Debes tener el <a href="https://docs.datadoghq.com/account_management/rbac/?tab=datadogapplication">rol de administrador de Datadog</a> para acceder a la página Plan y uso.</div>

El [Plan y uso][1] te proporciona un resumen predefinido (OOTB) del uso mensual facturable de las métricas personalizadas de tu cuenta con información detallada sobre tus costes, tasa de consumo y nombres de métrica personalizada principal.

   1. En la página [Plan y uso][2], desplázate hasta la sección *Usage Summary* (Resumen de uso).
   1. Haz clic en la pestaña **Custom Metrics** (Métricas personalizadas) para ver el uso facturable de las métricas personalizadas de tu organización, las tendencias de uso y los nombres de métrica personalizada principal.
   1. Desplázate hacia abajo hasta *Top Custom Metrics for \<MONTH YEAR\>* (Métricas personalizadas principales para \<MONTH YEAR\>) para ver los nombres de métrica principal con su porcentaje de contribución a tus costes de métricas personalizadas.

Saber qué métricas son las que más contribuyen al uso y los costes mensuales de tu cuenta es el punto de partida recomendado para utilizar [Metrics without LimitsTM][4]. Con este conocimiento, puedes encontrar el origen de estos envíos de métricas, ya sea por equipos, servicio, organización u otro atributo de etiqueta.
Además, revisa la información de [Atribución de uso][3] para obtener un desglose total del uso facturable de tu cuenta por claves de etiqueta. A partir de aquí, puedes identificar tus mayores generadores de costes por etiquetas, como equipo, servicio o aplicación. 

**Nota**: La atribución de uso es una función avanzada incluida en el plan Enterprise. Para el resto de planes, ponte en contacto con tu representante de cuenta o con el asesor de clientes para solicitar esta función.

#### métrica-nivel de visibilidad

{{< callout url="https://forms.gle/H3dG9tTdR6bqzHAX9" >}}
métricas personalizadas etiquetas (tags) Cardinality Explorer está en vista previa. Utilice este formulario para solicitar acceso hoy mismo.
{{< /callout >}} 

{{< img src="métricas/tagsexplorer.png" alt="métricas personalizadas etiquetas (tags) Cardinality Explorer for a spiking métrica name" style="width:80%;">}}

Una vez que haya identificado qué nombres de métrica están incrementando el consumo mensual y los costes de su cuenta, puede navegar hasta el panel lateral de detalles de métrica para ver el métricas personalizadas etiquetas (tags) Cardinality Explorer. Esto le muestra qué claves de etiquetar están haciendo que la cardinalidad de un métrica'particular se dispare. Cualquier clave etiquetar spammy o sin límites con grandes incrementos en el número de valores únicos etiquetar son la causa probable. Exclúyalas con métricas without LimitsTM para conseguir un ahorro de costes inmediato.

### Visibilidad y atribución a nivel de equipo

La visibilidad a nivel de equipo permite a los administradores de cuentas responsabilizar a los equipos. Y lo que es más importante, ofrece a los equipos la oportunidad de comprender y reducir su impacto en el volumen de métrica.

Los equipos pueden tener un conocimiento limitado de los costes de métrica y etiquetas que envían. Esto hace que los equipos estén menos motivados para controlar su uso o incluso limitar su crecimiento. Es crucial que todos tengan visibilidad de su uso y se sientan capacitados para asumir la responsabilidad de gestionar esos volúmenes y los costes asociados.

#### Encontrar el origen de tus métricas personalizadas más grandes
<div class="alert alert-danger">Debes tener el <a href="https://docs.datadoghq.com/account_management/rbac/?tab=datadogapplication">rol de administrador de Datadog</a> para acceder a la página Plan y uso.</div>

{{< img src="metrics/guide/custom_metrics_governance/team_attribution_plan_usage_table.png" alt="Navega a Resumen de métricas desde la página Plan y uso y por la tabla Métricas personalizadas principales" style="width:90%;" >}}

Para identificar qué equipo o servicio es responsable de tus nombres de métrica personalizadas principales:

1. En la página [Plan y uso][2], desplázate hasta la sección *Usage Summary* (Resumen de uso).
1. Haz clic en la pestaña **Custom Metrics** (Métricas personalizadas) para ver el uso facturable, las tendencias de uso y los nombres de métricas personalizada principales de tu organización.
1. Debajo de la tabla para *Top métricas personalizadas para <MONTH YEAR>*, haga clic en el icono para **Ver en métricas Resumen** para la parte superior métrica personalizada. Esto te lleva a la página *métricas Resumen* con el panel lateral de detalles métrica abierto. 
1. En el panel lateral, desplázate hasta la sección *Tags* (Etiquetas) para ver las etiquetas asociadas, como equipos y servicio.

#### Ver las métricas personalizadas de tu equipo

Todos los equipos deberían tener visibilidad de qué métricas están provocando picos de facturación en tiempo real y sentirse seguros de que sus esfuerzos de optimización de costes no afectan a la visibilidad de otro equipo.

Para ver todos los nombres de métrica enviados por tu equipo, ve a la página [Resumen de métricas][6], escribe el par clave-valor de etiqueta (por ejemplo, `team:dev` o `service:demo`) en el campo **Filter by Tag Value** (Filtrar por valor de etiqueta).

#### Identificar cualquier métrica del equipo que tenga el mayor impacto en tu factura

Todos los usuarios de tu organización pueden ver en tiempo real el uso estimado de métricas personalizadas en la página [Gestión del volumen de métricas][7]. La información inteligente de Datadog ayuda a identificar en qué métricas debes centrar tus esfuerzos de optimización de costes. Utiliza la Gestión de volumen de métricas con Metrics without LimitsTM, para controlar tu uso de métricas personalizadas indexadas y reducir costes sin sacrificar la precisión.

Con la Gestión de volumen de métricas, puedes identificar las métricas más grandes de tu organización, así como los nombres de métrica con picos de volumen (probables culpables de cualquier exceso inesperado).

{{< img src="métricas/guide/custom_metrics_governance/volume_management_page_2025-01-27.png" alt="métricas Volume Management page" style="width:90%;" >}}

Para más información, consulta la documentación de [Gestión del volumen de métricas][8].

## Gobernanza de métricas basadas en valores

Una gobernanza eficaz de métricas personalizadas debería aumentar la eficiencia de la monitorización. Una vez que comprendas cuál es tu uso y atribuyas el uso a su origen, toma medidas para reducir tus métricas. 

En esta sección, conocerá las medidas que puede tomar para maximizar el ROI y el valor que obtiene de su gasto en observabilidad sin sacrificar la visibilidad en la que confía activamente su equipo.

### Metrics without LimitsTM

[Metrics without LimitsTM][4] de Datadog es una función de gestión de costes pionera en el sector que desvincula la ingesta de la indexación. No todas tus métricas son igual de valiosas en cada momento y, con Metrics without LimitsTM, sólo pagas por las métricas valiosas.

Reduce tus volúmenes de métricas personalizadas indexados en cualquier nombre de métrica estableciendo una configuración de etiqueta que te gustaría preservar para la consulta. Reduce tu coste y preserva la precisión matemática de tus métricas configuradas (todo dentro de la plataforma sin cambios a nivel de código).

{{< img src="metrics/volume/reduce_metric_vol_cost_tags.png" alt="Ejemplo de uso de la Gestión del volumen de métricas y Metrics without LimitsTM para reducir el volumen al limitar la lista de permitidos mediante la configuración de etiquetas" style="width:80%;" >}}

Con Metrics without LimitsTM, Datadog proporciona automáticamente lo siguiente:
- Configuraciones actualizadas de etiquetas recomendadas (basadas en nuestros conocimientos sobre consultas inteligentes) para ayudar a maximizar el ROI y el valor que obtienes de tu gasto en observabilidad.
- Información de consulta inteligente que calcula y analiza continuamente todas las interacciones de los usuarios (tanto dentro de la aplicación como a través de la API) en cualquier consulta enviada a  para que sus configuraciones de   sean siempre relevantes. métricas enviadas a Datadog para que las configuraciones de recomendado etiquetar sean siempre relevantes.
- Posibilidad de deshacer los cambios en cualquier momento para obtener una visibilidad completa de todos los datos enviados originalmente.

Como parte de las prácticas recomendadas de gobernanza de métricas de Datadog, empieza por utilizar Metrics without Limits en tus [Métricas personalizadas principales](#identify-metrics-that-have-the-biggest-impact-on-monthly-bill).

Para más detalles, consulta la documentación de [Metrics without LimitsTM][4].

### Evitar configuraciones involuntarias que reduzcan la observabilidad con RBAC

Metrics without LimitsTM permite a los usuarios reducir costes en métricas indexando menos datos. Si se utiliza de forma incorrecta, la configuración podría provocar picos de uso no intencionados o la pérdida de visibilidad de etiquetas que ya no se indexan. Para evitar cambios inesperados, utiliza [permisos RBAC][9]. Puedes editar un rol de usuario existente para incluir el permiso `metrics_tags_write`, o crear un rol personalizado. Esto proporciona a tu organización un mejor control sobre qué miembros pueden afectar a la [cardinalidad][10] de las métricas y quién puede cambiar las configuraciones de etiqueta de Metrics without LimitsTM.

Datadog proporciona un [registro de auditoría][11] de todas las configuraciones de Metrics without LimitsTM (detallando la configuración y el usuario que realizó la configuración) para que puedas atribuir cualquier pico o caída en el uso de tus métricas personalizadas. Para ver tus eventos de registro de auditoría, introduce la siguiente consulta en el [Events Explorer][12]:
```
tags:audit "Queryable tag configuration" 
```

{{< img src="/metrics/guide/custom_metrics_governance/metrics_rbac_audit_trail_query.png" alt="Event Explorer con la consulta de seguimiento de auditoría de métricas" style="width:90%;" >}}

### Reducir los costes de las métricas no consultadas

Para asegurarse de que no está eliminando una visibilidad valiosa a la vez que reduce costes, debe diferenciar entre las consultas activas métricas en los que confía su equipo de los métricas que no se consultan en ninguna parte de la plataforma Datadog ni a través de la API. Datadog La información de consulta inteligente de métrica calcula y analiza continuamente todas las interacciones de los usuarios (en Datadog o a través de la API) en cualquier para ayuda identificar los datos menos valiosos y no utilizados. métricas.

Identifique toda la lista de su organización de no consultados métricas en los últimos 30, 60 ó 90 días: 
1. En la [métricas Página de resumen][6], busque la faceta **Actividad de la consulta** en el lado izquierdo. Seleccione el periodo de tiempo que le interese (30, 60 o 90 días).
2. Busca la faceta **Configuration** (Configuración) en el lado izquierdo y selecciona **All Tags** (Todas las etiquetas). La combinación de estas dos facetas te proporciona una lista de métricas personalizadas no consultadas que aún no se han configurado y de las que puedes obtener un ahorro inmediato.
3. Revisa la tabla resultante de nombres de métricas. ¿Existen patrones o se envían desde un servicio específico? Busca etiquetas asociadas a estas métricas no consultadas.
4. (Opcional) Para exportar esta lista, haz clic en **Export as CSV** (Exportar como CSV) encima de la tabla de métrica.

   Después de identificar las métricas que tus desarrolladores no necesitan, puedes reducir de forma segura los volúmenes de métricas personalizadas y reducir los costes de estas métricas no utilizadas con Metrics without LimitsTM.

{{< img src="métricas/guide/custom_metrics_governance/manage_tags_fm_metrics_summary_2025-01-27.png" alt="The Configurar métricas drop menu with the Manage etiquetas (tags) selection highlighted" style="width:90%;" >}}

5. En la parte superior de la [métricas Página de resumen][6], haga clic en el **Configurar métricas** menú desplegable.
6. Selecciona **Manage tags** (Gestionar etiquetas) para abrir el [modal de configuración de Etiqueta de Metrics without LimitsTM][13] para configurar múltiples métricas en bloque.
7. Especifica el prefijo de espacio de nombres de las métricas que deseas configurar.
8. Selecciona **Include tags...** (Incluir etiquetas) y deja vacía la lista de etiquetas permitidas.

Según la información sobre consultas inteligentes de Datadog en miles de clientes de métricas personalizadas, hemos comprobado que el uso de **Metrics without LimitsTM** en métricas no consultadas puede reducir el uso medio de las métricas personalizadas del cliente en hasta un 70 %**.

### Comprender la utilidad relativa de tus métricas

Aunque no se haya consultado una métrica en los últimos 30 días, es posible que tus equipos sigan sacando provecho de ella para la gestión de incidencias y la corrección de interrupciones. Por el contrario, tus equipos podrían estar infrautilizando las métricas existentes y consultadas activamente. Por tanto, comprender la utilidad relativa de tus métricas es el siguiente paso recomendado en tu flujo de trabajo de gobernanza.

Metrics without LimitsTM de Datadog es un conjunto de funciones que también te proporcionan información OOTB para evaluar el valor de tus métricas consultadas activamente con [Activos relacionados con métricas][15]. Un activo relacionado con métricas hace referencia a cualquier activo de Datadog, como dashboard, notebook, monitor o SLO que consulte una métrica en concreto. Utiliza la popularidad y cantidad de activos relacionados para evaluar la utilidad de la métrica dentro de tu organización, lo que te permitirá tomar decisiones basadas en datos. Comprende mejor cómo tu equipo puede utilizar las métricas existentes para obtener más valor de tu gasto en observabilidad.

{{< img src="métricas/related_assets_2025-01-27.png" alt="métrica detail side panel showing the Related Assets section. The example métrica is applied to three dashboards" style="width:100%;" >}}

Para ver los activos relacionados de métricas:
1. Haz clic en el nombre de métrica para abrir tu panel lateral de detalles.
1. Desplázate hasta la sección del panel lateral titulada **Related Assets** (Activos relacionados).
1. Haga clic en el botón desplegable para ver el tipo de activo relacionado que le interesa (dashboards, monitores, notebooks, SLOs). Puede utilizar la barra Buscar para validar activos específicos.


## Monitorización y prevención
En esta sección, aprenderás cómo: 
- Alertar de excesos y picos repentinos en el uso general de las métricas personalizadas de tu cuenta
- Predecir el crecimiento futuro de métricas y alertar sobre cualquier desviación global inesperada
- Alerta cuando la cardinalidad de un determinado métrica supera un umbral definido por el usuario o presenta picos anómalos.
Una vez que conozcas el uso de métricas de tu cuenta y los equipos responsables de esos costes, crea monitores para que te avise cuando el uso de tus métricas personalizadas supere un determinado umbral. Recibe alertas cuando se produzcan picos en el uso de métricas personalizadas, de modo que puedas evitar picos involuntarios en la facturación.

Datadog ofrece métricas OOTB que miden [el uso estimado de métricas personalizadas][15]. Puedes utilizar estas métricas en tus visualizaciones de dashboard y alertas de monitor. 

| Tipo de uso                    | Métrica                                   | Descripción |
|-------------------------------|------------------------------------------| ----------- |
| Métricas personalizadas indexadas        | `datadog.estimated_usage.metrics.custom`, `datadog.estimated_usage.metrics.custom.by_metric`, `datadog.estimated_usage.metrics.custom.by_tag` | Métricas personalizadas indexadas únicas vistas en la última hora. |
| Métricas personalizadas ingeridas       | `datadog.estimated_usage.metrics.custom.ingested`, `datadog.estimated_usage.metrics.custom.ingested.by_metric`, `datadog.estimated_usage.metrics.custom.ingested.by_tag` | Métricas personalizadas únicas incorporadas vistas en la última hora. |

### Monitorizar picos en el uso de métricas personalizadas para evitar excesos de consumo

{{< img src="metrics/guide/custom_metrics_governance/estimated_usage_metric_monitor.png" alt="Ejemplo de configuración del monitor de métricas con la métrica de uso estimado y un umbral de 700,000" style="width:80%;" >}}

También puedes ver un desglose de tu uso estimado en tiempo real de métricas personalizadas por nombre de métrica, ya sea con el widget de series temporales de dashboard, o un monitor de métricas. Utiliza la métrica `datadog.estimated_usage.metrics.custom.by_metric` para crear un monitor de modo que siempre puedas tener una visibilidad actualizada de cado uno de los volúmenes de tus nombres de métrica.

### Casos de uso de monitorización adicional
Después de recibir una alerta, utiliza la página de gestión de volumen de métricas para inspeccionar cualquier pico en las claves de etiqueta de métricas y utiliza Metrics without LimitsTM para eliminar inmediatamente cualquier clave de etiqueta anómala que esté provocando picos en la métrica. De este modo, podrás resolver inmediatamente cualquier pico no intencionado de facturación. 
{{< whatsnext desc="Casos de uso adicional para crear monitores para las métricas de uso estimadas:" >}}
    {{< nextlink href="/monitors/types/change-alert/" >}}Alertas cuando el volumen cambia pasado un cierto porcentaje.{{< /nextlink >}}
    {{< nextlink href="/monitors/types/anomaly/" >}}Alerta sobre cambios anómalos en el uso.{{< /nextlink >}}
    {{< nextlink href="/monitors/types/forecasts/" >}}Predicción de crecimiento de métricas futuras y alerta sobre cualquier desviación general inesperada.{{< /nextlink >}}

{{< /whatsnext >}}

## Resumen de prácticas recomendadas

1. Comienza por identificar los nombres más importantes de métrica (tu tabla de métricas personalizadas principales o la página de volumen de métricas) y utiliza Metrics without LimitsTM para optimizar estas métricas principales al volumen más rentable.
1. Utiliza la página de gestión de volúmenes de métricas para atribuir los picos de uso de métricas personalizadas existentes a los nombres de métricas principales que los causan.
1. Para ahorrar costes de forma inmediata, identifica tus métricas personalizadas y utiliza Metrics without LimitsTM para configurar estas métricas con configuraciones de etiqueta vacía.
1. Controla monitores para el uso de tus métricas personalizadas mediante cualquiera de tus métricas de uso personalizas estimadas y OOTB de Datadog.

## Referencias adicionales

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
[14]: https://docs.datadoghq.com/es/metrics/metrics-without-limits/#configuration-of-tags
[15]: /es/metrics/summary/#metrics-related-assets