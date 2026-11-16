---
description: Aprenda cómo funcionan los filtros de retención en RUM without Limits.
further_reading:
- link: /real_user_monitoring/guide/retention_filter_best_practices/
  tag: Guía
  text: Prácticas recomendadas para filtros de retención
- link: /real_user_monitoring/rum_without_limits/
  tag: Documentación
  text: RUM without Limits
- link: /real_user_monitoring/rum_without_limits/metrics
  tag: Documentación
  text: Analice el rendimiento con métricas
- link: /real_user_monitoring/rum_without_limits/retention_quotas
  tag: Documentación
  text: Controle los costos con cuotas de retención
- link: https://www.datadoghq.com/blog/rum-apm-retention-filters
  tag: Blog
  text: Unifique y correlacione datos de frontend y backend con filtros de retención
- link: https://learn.datadoghq.com/courses/rum-retention-filters
  tag: Centro de aprendizaje
  text: 'Laboratorio interactivo: Filtros de retención de RUM'
title: Retenga datos con filtros de retención
---
{{< learning-center-callout header="Pruebe los filtros de retención de RUM en el Centro de aprendizaje" btn_title="Inscríbase ahora" btn_url="https://learn.datadoghq.com/courses/rum-retention-filters" hide_image="false" >}}
  Aprenda a utilizar los filtros de retención de RUM para controlar qué datos de sesión se almacenan y optimizar su presupuesto de observabilidad.
{{< /learning-center-callout >}}

## Descripción general {#overview}

Los filtros de retención son un conjunto de consultas, similares a las utilizadas en el Explorador de sesiones de RUM, que se ejecutan contra los eventos de RUM (sesiones, visualizaciones, acciones, recursos, etcétera) a medida que se ingieren. Estos filtros determinan si una sesión se almacena durante el período de retención estándar de 30 días de RUM o si se descarta.

La **tasa de retención** especifica el porcentaje de sesiones coincidentes que desea retener, lo que permite un mayor control de costos. Aunque los filtros se comparan con eventos individuales, todos los eventos de la sesión subyacente se conservan cuando se toma una decisión de muestreo, lo que garantiza una visibilidad integral de las sesiones de usuario.

Su configuración se compone de tres tipos de filtros: [filtros de retención permanente](#permanent-retention-filters), [filtros de exclusión](#exclusion-filters) y [filtros de retención personalizados](#custom-retention-filters). Consulte [Tipos de filtros](#types-of-filters) para conocer la ruta que sigue un evento a través de ellos.

## Cómo funciona {#how-it-works}

Una sesión se almacena tan pronto como un filtro de retención coincide con uno de sus eventos constitutivos según la consulta predefinida, y la incluye mediante muestreo según la tasa de retención configurada.

{{< img src="real_user_monitoring/rum_without_limits/rum-without-limits-how-retention-filters-work-2.png" alt="Diagrama que muestra el flujo lógico de los filtros de retención y cómo afectan la cantidad de sesiones retenidas finalmente." style="width:80%" >}}

El flujo lógico de los filtros de retención es el siguiente:

- Cada evento se evalúa con sus filtros en secuencia.
- Cuando un evento coincide con un filtro, la tasa de retención decide la retención de toda la sesión. De cualquier manera, el evento no se evalúa con los siguientes filtros, por lo que el **orden de los filtros de retención es importante**.
- Después de que se retiene una sesión, esta está disponible en el Explorador de sesiones y otras páginas de RUM, y sus eventos posteriores se conservan automáticamente en lugar de pasar por los filtros.

**Notas**:

- Si un evento no coincide con ningún filtro, o si coincide con un filtro pero la tasa de retención no lo incluye, los eventos posteriores de la misma sesión se siguen evaluando, por lo que la sesión puede retenerse eventualmente.
- Tenga cuidado con los filtros en atributos que se actualizan con el tiempo. Un filtro en sesiones con menos de dos errores coincide con casi todo, porque los conteos de errores comienzan en cero y se actualizan en tiempo real. Utilice condiciones de "mayor o igual que" (≥), como `@session.error.count >= 2`, o espere a que el objeto esté completo añadiendo `@session.is_active: false` o `@view.is_active: false`.
- Los eventos no necesariamente se evalúan en el orden en que ocurrieron: el evento `B` puede evaluarse antes que el evento `A`. Todos los eventos se evalúan, finalmente, con la lista de filtros de retención para evitar brechas.

## Tipos de filtros {#types-of-filters}

{{< img src="real_user_monitoring/rum_without_limits/retention-filters-types.png" alt="Los tres grupos de filtros en la página de Filtros de retención: Filtros permanentes, Filtros de exclusión y Filtros de retención personalizados." style="width:100%" >}}

Cada evento de RUM sigue el mismo camino a través de su configuración:

1. El evento se evalúa con los **filtros de retención permanente**. Estos están predefinidos y no se pueden editar. Si el evento coincide con uno, su sesión se retiene.
1. El evento se evalúa con los **filtros de exclusión**. Si el evento coincide con uno, no se evalúa más.
1. Si el evento no coincide con ningún filtro de exclusión, se evalúa frente a sus **filtros de retención personalizados**, en orden. Si el evento coincide con uno y la tasa de retención lo incluye, su sesión se retiene.

Los tres tipos difieren en lo que hace una coincidencia:

| Tipo de filtro                | Cuando un evento coincide                                                |
| -------------------------- | -------------------------------------------------------------------- |
| Filtro de retención permanente | La sesión se retiene.                                              |
| Filtro de exclusión           | El evento omite la evaluación frente a los filtros de retención personalizados.      |
| Filtro de retención personalizado    | La sesión se retiene, de acuerdo con la tasa de retención configurada.  |

## Filtros de retención permanentes {#permanent-retention-filters}

Los filtros de retención permanentes son filtros de retención predefinidos que no se pueden modificar, deshabilitar ni eliminar. Están ubicados en la parte superior de su lista de filtros de retención.

{{< img src="real_user_monitoring/rum_without_limits/permanent-retention-filters.png" alt="El grupo Filtros permanentes se expandió, mostrando los filtros Muestreo plano RUM-APM, Sesiones sintéticas y Sesiones con reproducciones forzadas." style="width:100%" >}}

Existen tres filtros de retención permanentes:

- {{< ui >}}RUM-APM Flat Sampling{{< /ui >}}: Conserva el 1% de las sesiones con trazas distribuidas ingeridas (y indexa sus trazas en APM). Estas sesiones (y sus trazas) **no están sujetas a la facturación de RUM (ni a la facturación de APM)**.
- {{< ui >}}Synthetics Sessions{{< /ui >}}: Conserva todas las sesiones generadas por [Synthetic Monitoring][1]. Estas sesiones se facturan bajo Synthetic Monitoring y **no están sujetas a la facturación de RUM**.
- {{< ui >}}Sessions with forced replays{{< /ui >}}: Conserva todas las sesiones para las cuales se forzó la recopilación de una reproducción mediante el mecanismo de [recopilación forzada][2].

<div class="alert alert-info">El filtro de retención permanente de muestreo fijo de RUM-APM solo se aplica con los siguientes SDKs: <br> - Browser 6.5.0+ <br> - Android 3.0.0+ <br> - iOS 3.3.0+ <br> - React Native 3.0.0+ <br> - Flutter 3.0.0+ <br></div>

## Filtros de exclusión {#exclusion-filters}

{{< img src="real_user_monitoring/rum_without_limits/exclusion-filters-excluded-errors.png" alt="El grupo Filtros de exclusión se expandió, mostrando el filtro predefinido Errores excluidos de Error Tracking y dos filtros de exclusión personalizados con sus tipos de evento y consultas." style="width:100%" >}}

Los filtros de exclusión hacen que los eventos seleccionados omitan la evaluación frente a los filtros de retención personalizados. Se aplican después de los filtros de retención permanentes.

Úselos cuando los mismos eventos sean irrelevantes para todos sus filtros de retención personalizados, por ejemplo, tráfico de bots autodeclarado, una versión de aplicación retirada o un error ruidoso conocido.

<div class="alert alert-warning">Los filtros de exclusión se aplican al <strong>evento</strong>, no a la sesión. Excluir un evento no descarta su sesión: si otro evento de la misma sesión coincide con un filtro de retención personalizado, toda la sesión se retiene, incluido el evento excluido.</div>

Un filtro de exclusión se compone de un tipo de evento y una consulta, al igual que los filtros de retención, con dos diferencias:

- Un filtro de exclusión puede dirigirse a **Todos los eventos** en lugar de a un solo tipo de evento, lo que le permite excluir según atributos o etiquetas compartidos por cada evento, como `@device.type` o `@geo.country`.
- Un filtro de exclusión no tiene tasa de retención. Coincide con un evento o no, por lo que el **orden de los filtros de exclusión no importa**.

### Reutilización de exclusiones de Error Tracking {#reusing-error-tracking-exclusions}

Un filtro de exclusión predefinido en la parte superior de la lista apunta a los errores que usted [excluyó en Error Tracking][10], para que no tenga que mantener las mismas exclusiones en dos lugares.

Puede habilitar o deshabilitar este filtro, pero no puede editarlo ni eliminarlo.

## Filtros de retención personalizados {#custom-retention-filters}

{{< img src="real_user_monitoring/rum_without_limits/custom-retention-filters.png" alt="El grupo de Filtros de retención personalizados se expandió, mostrando dos filtros ordenados con sus tipos de evento, tasas de retención y recuentos de sesiones retenidas." style="width:100%" >}}

Los filtros de retención personalizados son los filtros que usted crea y controla. Cada uno empareja un tipo de evento con una consulta y una tasa de retención, y cada uno puede conservar sesiones.

### Exclusión de eventos con una consulta de filtro {#excluding-events-with-a-filter-query}

Los filtros de retención personalizados especifican qué sesiones conservar, en lugar de cuáles excluir. No puede establecer un porcentaje de retención al 0% (el mínimo es 0.1%). Además, establecer porcentajes de retención bajos no es una estrategia de exclusión eficaz porque las sesiones aún pueden ser retenidas por otros filtros en su configuración.

Para evitar que un solo filtro coincida con un subconjunto de eventos, agregue exclusiones **dentro de la consulta de ese filtro**. Por ejemplo:

- Agregar `-version:(1* OR 2*)` a un filtro de retención ayuda a garantizar que ese filtro nunca conserve eventos de las versiones 1 y 2 anteriores de su aplicación.
- Agregar `-@device.type:Bot` a un filtro de retención excluye a los rastreadores de motores de búsqueda y otros bots autodeclarados de ese filtro.
- Agregar `-@geo.country:"South Korea"` a un filtro de retención excluye las sesiones de Corea del Sur de ese filtro.

Las exclusiones dentro de la consulta solo se aplican al filtro que las contiene. Debido a que cualquier otro filtro aún puede conservar la misma sesión, excluir eventos en toda su configuración de esta manera significa repetir la exclusión en **cada** filtro, y repetirla nuevamente cada vez que agrega un filtro.

Para excluir eventos en todos sus filtros de retención personalizados a la vez, utilice [filtros de exclusión](#exclusion-filters) en su lugar.

**Nota**: Los eventos que coinciden con un filtro de exclusión nunca llegan a sus filtros de retención personalizados y, por lo tanto, nunca activan la retención de su sesión.

## Configuración {#setup}

Para configurar sus filtros, haga clic en {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Retention Filters{{< /ui >}} en la esquina superior derecha de cualquier página de RUM para obtener acceso directo.

También puede:

1. Navegue a [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Manage Applications{{< /ui >}}][3].
1. Cree una aplicación de RUM o haga clic en una aplicación existente.
1. En Product Settings, vaya a la página {{< ui >}}Retention Filters{{< /ui >}}.

### Creación de un filtro {#creating-a-filter}

Para crear un filtro de retención o un filtro de exclusión:

1. En la sección del tipo de filtro que desea crear, haga clic en el botón {{< ui >}}\+ Add Filter{{< /ui >}}.
1. Asigne al filtro un nombre descriptivo.
1. Seleccione un tipo de evento en el menú desplegable e ingrese una consulta. Cualquier consulta que pueda escribirse en el [RUM Explorer][4] funciona. Los filtros de exclusión también pueden dirigirse a {{< ui >}}All events{{< /ui >}}.
1. Para un filtro de retención personalizado, opcionalmente establezca una tasa de retención para las sesiones que coincidan con la consulta. Puede hacer clic en {{< ui >}}Generate Estimate{{< /ui >}} para obtener ayuda al establecer esta tasa. Los filtros de exclusión no tienen tasa de retención.

Se añade un nuevo filtro de retención personalizado al final de la lista de filtros de retención personalizados. Datadog tarda unos segundos en propagar un nuevo filtro y comenzar a aplicarlo.

La creación de un filtro requiere los mismos permisos para ambos tipos de filtros.

### Modificación de filtros {#modifying-filters}

{{< img src="real_user_monitoring/rum_without_limits/modifying-filters.png" alt="Pase el cursor sobre un filtro de retención para modificarlo." style="width:100%" >}}

#### Edite un filtro {#edit-a-filter}

Para modificar un filtro existente:

1. Pase el cursor sobre el filtro y haga clic en el icono {{< ui >}}Edit{{< /ui >}}.
1. Haga clic en {{< ui >}}Save Changes{{< /ui >}}.

#### Duplique un filtro {#duplicate-a-filter}

Para duplicar un filtro:

1. Pase el cursor sobre el filtro y haga clic en el icono {{< ui >}}Duplicate{{< /ui >}}.
1. Realice las modificaciones que desee en el filtro y, a continuación, haga clic en {{< ui >}}Save Changes{{< /ui >}}.

#### Elimine un filtro {#delete-a-filter}

Para eliminar un filtro:

1. Pase el cursor sobre el filtro y haga clic en el icono {{< ui >}}Delete{{< /ui >}}.
1. Haga clic en {{< ui >}}Confirm{{< /ui >}}.

#### Deshabilite un filtro {#disable-a-filter}

Los filtros deshabilitados ignoran los eventos. Un filtro de retención personalizado deshabilitado no toma ninguna decisión de muestreo, y un filtro de exclusión deshabilitado no excluye ningún evento.

Use el interruptor a la derecha del filtro para deshabilitarlo o habilitarlo.

#### Reordene los filtros {#reorder-filters}

Arrastre y suelte los filtros para reordenarlos a su nueva posición.

El reordenamiento solo se aplica a los filtros de retención personalizados, ya que el orden de los filtros de exclusión no importa.

### Limitar la retención con cuotas {#capping-retention-with-quotas}

Para limitar el número total de sesiones retenidas por día en sus filtros de retención, consulte [Retention Quotas][9].

## Cómo funcionan los filtros de retención con las reproducciones {#how-retention-filters-work-with-replays}

Puede administrar el muestreo de sesiones con reproducciones utilizando filtros de retención. Siempre que se factura una sesión con reproducciones, tanto los eventos de la sesión como la grabación de video se conservan y se facturan. Esto significa que si recopila el 100% de las sesiones y el 100% de las reproducciones de los SDKs, siempre que un filtro de retención conserve una sesión, Datadog conserva y cobra tanto la sesión como la reproducción.

**Nota**: Aunque los SDK móviles de Datadog también proporcionan [APIs to conditionally start and stop the recording][2] (en lugar de depender de una tasa de muestreo fija), solo las reproducciones que son grabadas de forma forzada por el SDK de Browser se conservan de forma predeterminada.

## Filtros de retención de producto cruzado {#cross-product-retention-filters}

Los filtros de retención de producto cruzado le permiten optimizar la correlación entre diferentes productos para retener telemetría más rica. Al configurar un filtro de retención de RUM, puede habilitar un filtro de retención de producto cruzado para trazas de APM.

{{< img src="real_user_monitoring/rum_without_limits/cross-product-retention-filters-overview.png" alt="Filtros de retención de RUM con filtros de retención de producto cruzado habilitados para trazas de APM." style="width:100%" >}}

El {{< ui >}}APM traces filter{{< /ui >}} indexa las trazas de APM para el porcentaje especificado de sesiones retenidas por el filtro de retención de RUM principal que tienen trazas disponibles.

**Nota**: La disponibilidad de las trazas de APM depende de su **configuración del SDK de muestreo de trazas** (aprenda cómo <a href="/real_user_monitoring/correlate_with_other_telemetry/apm?tab=browserrum">Correlacionar RUM con trazas de APM</a>)

  <div class="alert alert-info">El filtro de trazas de APM solo es compatible con las siguientes versiones de los SDK: <br> - Browser 6.5.0+ <br> - Android 3.0.0+ <br> - iOS 3.3.0+ <br> - React Native 3.0.0+ <br> - Flutter 3.0.0+ <br></div>

<div class="alert alert-danger">Configurar filtros de retención de producto cruzado puede aumentar los volúmenes indexados de APM.</div>

Para **encontrar sesiones con trazas de APM indexadas** en el RUM Explorer, consulte `@session.has_indexed_apm_traces:true`.

### Ejemplo {#example}

Considere una configuración en la que establece un filtro de retención de RUM único configurado de la siguiente manera:

{{< img src="real_user_monitoring/rum_without_limits/cross-product-retention-filters-apm-only.png" alt="Un filtro de retención de RUM que apunta a errores con una retención del 60%, con un filtro de producto cruzado establecido al 25% para trazas de APM." style="width:60%" >}}

Si ha configurado el SDK para muestrear el 40% de las trazas, el resultado es el siguiente:

- El 40% de las sesiones de RUM ingeridas tienen sus trazas ingeridas en APM.
- Se retiene el 60% de las sesiones de RUM ingeridas con al menos un error.
- 25% x 40% = 10% de estas sesiones retenidas tienen sus trazas de APM indexadas.

### Filtros de retención de producto cruzado en filtros permanentes {#cross-product-retention-filters-on-permanent-filters}

Los filtros de retención de producto cruzado también están disponibles en los <a href="/real_user_monitoring/rum_without_limits/retention_filters/#permanent-retention-filters">Permanent Retention Filters</a>. El filtro de trazas de APM **solo se puede editar en Synthetic Monitoring Sessions y en Sessions con filtros de reproducciones forzadas**.

<div class="alert alert-danger">Las trazas de APM indexadas a través de un filtro de retención de producto cruzado en los filtros de retención permanente de Synthetic Monitoring o de Forced Replay están sujetas a la facturación de APM.</div>

## Mejores prácticas {#best-practices}

Consulte [Mejores prácticas de filtros de retención][5].

## API {#api}

Los filtros y los filtros de retención de producto cruzado se pueden administrar a través de [APIs][6] o de los [Terraform modules][7] dedicados de Datadog.

## Próximos pasos {#next-steps}

Analice el rendimiento con [métricas][8].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/
[2]: /es/session_replay/setup_and_configuration/?platform=browser&tab=npm#start-or-stop-the-recording-manually
[3]: https://app.datadoghq.com/rum/list
[4]: /es/real_user_monitoring/explorer/
[5]: /es/real_user_monitoring/guide/retention_filter_best_practices
[6]: /es/api/latest/rum-retention-filters/
[7]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/data-sources/rum_retention_filters
[8]: /es/real_user_monitoring/rum_without_limits/metrics
[9]: /es/real_user_monitoring/rum_without_limits/retention_quotas
[10]: /es/error_tracking/issue_states/#excluding-an-issue