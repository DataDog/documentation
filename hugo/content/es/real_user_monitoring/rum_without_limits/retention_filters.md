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

## Cómo funciona {#how-it-works}

Una sesión se almacena tan pronto como un filtro de retención coincide con uno de sus eventos constitutivos según la consulta predefinida, y la incluye mediante muestreo según la tasa de retención configurada.

{{< img src="real_user_monitoring/rum_without_limits/rum-without-limits-how-retention-filters-work-2.png" alt="Diagrama que muestra el flujo lógico de los filtros de retención y cómo afectan la cantidad de sesiones retenidas finalmente." style="width:80%" >}}

El flujo lógico de los filtros de retención es el siguiente:

- Todos los eventos RUM se evalúan frente a cada filtro en secuencia, comenzando con el primero recibido.
- Cuando un evento `A` coincide con un filtro, se toma una decisión basada en la tasa de retención para incluir toda la sesión mediante muestreo o esperar a que se evalúen eventos futuros. En ambos casos, el evento `A` no se evalúa más frente a los filtros de retención posteriores. Es por esto que el **orden de los filtros de retención importa**.
- Las sesiones retenidas se guardan y son accesibles en el Explorador de sesiones y otras páginas de RUM. Los nuevos eventos provenientes de esta sesión no pasan por la lista de filtros de retención, sino que se conservan automáticamente para garantizar una visibilidad completa.

**Notas**:

- Si un evento no coincide con ningún filtro, o si coincide con un filtro pero se decide no retener la sesión según la tasa de retención configurada, los eventos futuros de la misma sesión seguirán siendo evaluados. Como resultado, la sesión podría ser retenida eventualmente.
- Tenga cuidado al definir filtros de retención en atributos de evento que se actualizan con el tiempo. Por ejemplo, un filtro que retenga sesiones con menos de dos errores podría retener sesiones por error, ya que los conteos de errores se actualizan en tiempo real y todas las sesiones comienzan en cero. Utilice condiciones de "mayor o igual que" (≥) para los campos que se actualizan, como `@session.error.count >= 2`, o asegúrese de que los objetos Session y visualización que son mutables estén completos antes de evaluarlos frente a los filtros de retención, añadiendo `@session.is_active: false` o `@view.is_active: false`.
- Nuestros SDKs agrupan y comprimen los eventos antes de enviarlos a Datadog, y las cargas fallidas regresan al final de la cola en el dispositivo. Por lo tanto, podría suceder que el evento `B` se evalúe antes que el evento `A`, pero todos los eventos finalmente se evalúan frente a la lista de filtros de retención para evitar brechas.

## Cómo funcionan los filtros de retención con las reproducciones {#how-retention-filters-work-with-replays}

Puede administrar el muestreo de sesiones con reproducciones utilizando filtros de retención. Siempre que se factura una sesión con reproducciones, tanto los eventos de la sesión como la grabación de video se conservan y se facturan. Esto significa que si recopila el 100% de las sesiones y el 100% de las reproducciones de los SDKs, siempre que un filtro de retención conserve una sesión, Datadog conserva y cobra tanto la sesión como la reproducción.

**Nota**: Aunque los SDK móviles de Datadog también proporcionan API para iniciar y detener la grabación de forma condicional (en lugar de depender de una tasa de muestreo fija), solo las reproducciones que son grabadas de forma forzada por el SDK de Browser se conservan de forma predeterminada.

## Filtros de retención permanentes {#permanent-retention-filters}

Los filtros de retención permanentes son filtros de retención predefinidos que no se pueden modificar, deshabilitar ni eliminar. Están ubicados en la parte superior de su lista de filtros de retención.

{{< img src="real_user_monitoring/rum_without_limits/permanent-retention-filters.png" alt="Los tres filtros de retención permanentes que se muestran en la parte superior de la lista de filtros de retención." style="width:100%" >}}

Existen tres filtros de retención permanentes:

- {{< ui >}}RUM-APM Flat Sampling{{< /ui >}}: Conserva el 1% de las sesiones con trazas distribuidas ingeridas (y indexa sus trazas en APM). Estas sesiones (y sus trazas) **no están sujetas a la facturación de RUM (ni a la facturación de APM)**.
- {{< ui >}}Synthetics Sessions{{< /ui >}}: Conserva todas las sesiones generadas por [Synthetic Monitoring][1]. Estas sesiones se facturan bajo Synthetic Monitoring y **no están sujetas a la facturación de RUM**.
- {{< ui >}}Sessions with forced replays{{< /ui >}}: Conserva todas las sesiones para las cuales se forzó la recopilación de una reproducción mediante el mecanismo de [recopilación forzada][2].

<div class="alert alert-info">El filtro de retención permanente de muestreo fijo de RUM-APM solo se aplica con los siguientes SDKs: <br> - Browser 6.5.0+ <br> - Android 3.0.0+ <br> - iOS 3.3.0+ <br> - React Native 3.0.0+ <br> - Flutter 3.0.0+ <br></div>

## Creación de un filtro de retención {#creating-a-retention-filter}

Para crear un filtro de retención:

1. Navegue a [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Manage Applications{{< /ui >}}][3].
1. Cree una aplicación de RUM o haga clic en una aplicación existente.
1. En Product Settings, vaya a la página {{< ui >}}Retention Filters{{< /ui >}}.
1. Haga clic en el botón {{< ui >}}+ Add Retention Filter{{< /ui >}}.
1. Asigne un nombre descriptivo al filtro de retención.
1. Seleccione un tipo de evento en el menú desplegable e ingrese una consulta. Cualquier consulta que pueda escribirse en el [RUM Explorer][4] funciona con los filtros de retención.
1. Opcionalmente, establezca una tasa de retención para las sesiones que coincidan con la consulta de retención. Puede hacer clic en {{< ui >}}Generate Estimate{{< /ui >}} para obtener ayuda al establecer esta tasa.

El nuevo filtro se agrega al final de la lista de filtros de retención. Datadog tarda unos segundos en propagar un nuevo filtro y comenzar a tomar decisiones de muestreo.

## Modificación de filtros {#modifying-filters}

{{< img src="real_user_monitoring/rum_without_limits/modifying-filters.png" alt="Pase el cursor sobre un filtro de retención para modificarlo." style="width:100%" >}}

### Edite un filtro {#edit-a-filter}

Para modificar un filtro existente:

1. Pase el cursor sobre el filtro y haga clic en el icono {{< ui >}}Edit{{< /ui >}}.
1. Haga clic en {{< ui >}}Save Changes{{< /ui >}}.

### Duplique un filtro {#duplicate-a-filter}

Para duplicar un filtro:

1. Pase el cursor sobre el filtro y haga clic en el icono {{< ui >}}Duplicate{{< /ui >}}.
1. Realice las modificaciones que desee en el filtro y, a continuación, haga clic en {{< ui >}}Save Changes{{< /ui >}}.

### Elimine un filtro {#delete-a-filter}

Para eliminar un filtro de retención:

1. Pase el cursor sobre el filtro y haga clic en el icono {{< ui >}}Delete{{< /ui >}}.
1. Haga clic en {{< ui >}}Confirm{{< /ui >}}.

### Deshabilite un filtro {#disable-a-filter}

Los filtros deshabilitados simplemente ignoran los eventos y no toman ninguna decisión de muestreo. Los eventos que fluyen en la lista omitirán los filtros deshabilitados.

Use el interruptor a la derecha del filtro para deshabilitarlo o habilitarlo.

### Reordene los filtros {#reorder-filters}

Arrastre y suelte los filtros para reordenarlos a su nueva posición.

## Exclusión de sesiones mediante filtros de retención {#excluding-sessions-using-retention-filters}

RUM without Limits utiliza filtros de retención para especificar qué sesiones conservar, en lugar de cuáles excluir. No puede establecer un porcentaje de retención al 0% (el valor predeterminado es 1%). Además, establecer porcentajes de retención bajos no es una estrategia de exclusión eficaz porque las sesiones aún pueden ser retenidas por otros filtros en su configuración.

Para asegurarse de que las sesiones de un entorno, versión de aplicación, tipo de dispositivo u otros criterios en particular no se retengan, agregue explícitamente exclusiones **dentro de la consulta de TODOS SUS FILTROS**. Por ejemplo:

- Agregar `-version:(1* OR 2*)` a todos los filtros de retención garantiza que nunca conserve eventos de las versiones 1 y 2 anteriores de su aplicación.
- Agregar `-@device.type:Bot` a todos los filtros de retención excluye a los rastreadores de motores de búsqueda y otros bots autodeclarados.
- Agregar `-@geo.country:"South Korea"` a todos los filtros de retención excluye todas las sesiones de Corea del Sur.

Por ejemplo, para excluir sesiones de Corea del Sur mientras conserva todas las demás sesiones, cree un filtro con la consulta `-@geo.country:"South Korea"` y establezca la tasa de retención al 100%.

**Nota**: No hay forma de evitar que se retenga un evento específico. Puede usar consultas negativas (por ejemplo, agregar `-@error.message:"Script error."` a un filtro de retención dirigido a errores de RUM) para minimizar el volumen de eventos no deseados, pero otros filtros de retención aún pueden tomar una decisión de retención positiva sobre una sesión que contiene el evento que intentó filtrar.

## Limitar la retención con cuotas {#capping-retention-with-quotas}

Para limitar el número total de sesiones retenidas por día en sus filtros de retención, consulte [Controlar costos con cuotas de retención][9].

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

<div class="alert alert-info">Los filtros de retención de producto cruzado solo se aplican a las sesiones retenidas por el filtro de retención de RUM correspondiente. Esto significa que el orden de los filtros es importante tanto para la retención de RUM como para los filtros de producto cruzado.<br><br>

Para obtener más información, consulte <a href="/real_user_monitoring/rum_without_limits/retention_filters/#how-it-works">Cómo funciona</a>.</div>

### Filtros de retención de producto cruzado en filtros permanentes {#cross-product-retention-filters-on-permanent-filters}

Los filtros de retención de producto cruzado también están disponibles en los <a href="/real_user_monitoring/rum_without_limits/retention_filters/#permanent-retention-filters">Permanent Retention Filters</a>. El filtro de trazas de APM **solo se puede editar en Synthetic Monitoring Sessions y en Sessions with forced replays filters**.

<div class="alert alert-danger">Las trazas de APM indexadas a través de un filtro de retención de producto cruzado en los Permanent Retention Filters de Synthetic Monitoring o de Forced Replay están sujetas a la facturación de APM.</div>

## Mejores prácticas {#best-practices}

Consulte [Mejores prácticas de filtros de retención][5].

## API {#api}

Los filtros de retención y los filtros de retención de producto cruzado se pueden administrar a través de [APIs][6] o de los [módulos de Terraform][7] dedicados de Datadog.

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