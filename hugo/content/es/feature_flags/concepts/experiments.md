---
description: Aprenda cómo las reglas de segmentación de un Feature Flag aleatorizan
  un Datadog Experiment y registran las exposiciones para su análisis.
further_reading:
- link: /experiments/
  tag: Documentación
  text: Obtenga información sobre Datadog Experiments
- link: /experiments/plan_and_launch_experiments
  tag: Documentación
  text: Planifique y lance Datadog Experiments
- link: /experiments/concepts/subject_types
  tag: Documentación
  text: Tipos de sujetos en Datadog Experiments
- link: /feature_flags/concepts/targeting_rules
  tag: Documentación
  text: Reglas de segmentación y filtros de Feature Flags
- link: /feature_flags/concepts/evaluation_context
  tag: Documentación
  text: Contexto de evaluación de Feature Flags
title: Feature Flags y experimentos
---
## Descripción general {#overview}

[Datadog Feature Flags][1] es la forma predeterminada de aleatorizar un [Datadog Experiment][1]. Cuando vincula un Feature Flag a un Datadog Experiment, Datadog agrega una regla de segmentación de Datadog Experiment al Feature Flag. Las evaluaciones de esa regla asignan sujetos a una variante y registran un evento de exposición que Datadog utiliza para analizar el Datadog Experiment.

## Vincular un Feature Flag a un Datadog Experiment {#link-a-flag-to-an-experiment}

Vincule un Feature Flag a un Datadog Experiment desde cualquiera de los lados del flujo de trabajo:

- Desde [{{< ui >}}Product Analytics > Experiments{{< /ui >}}][1], cree un Datadog Experiment y [agregue un Feature Flag existente][2] al mismo.
- Desde la página de detalles de un Feature Flag, haga clic en {{< ui >}}Create New Experiment{{< /ui >}} en la sección {{< ui >}}Targeting Rules & Rollouts{{< /ui >}} para crear un Datadog Experiment precargado con ese Feature Flag.

## Reglas de segmentación de Datadog Experiment {#experiment-targeting-rules}

Una regla de segmentación de Datadog Experiment funciona como cualquier otra [regla de segmentación][3]: puede incluir un filtro y utiliza la misma [aleatorización determinista][4] para asignar sujetos a una variante. La aleatorización se basa en el `targetingKey` en su [contexto de evaluación][5], por lo que el mismo sujeto recibe de manera consistente la misma variante durante la duración del Datadog Experiment.

Si varios Datadog Experiments comparten el mismo Feature Flag, Datadog evalúa sus reglas de segmentación en orden, de arriba hacia abajo. Reordene las reglas antes de lanzar un Datadog Experiment para controlar cuál tiene prioridad para un sujeto determinado.

## Exposiciones {#exposures}

Cada vez que el SDK evalúa la regla de segmentación de Datadog Experiment de un Feature Flag para un sujeto, Datadog registra un _evento de exposición_: el sujeto, la variante entregada y una marca de tiempo. Datadog une las exposiciones a los eventos de métricas para calcular el incremento entre variantes. Esos eventos de métricas pueden provenir de Product Analytics, Real User Monitoring o de su almacén de datos.

Datadog une las exposiciones y las métricas mediante el identificador del sujeto. El `targetingKey` que su SDK establece en el [contexto de evaluación][5] debe coincidir con el [atributo de tipo de sujeto][6] configurado para el Datadog Experiment, como `@usr.id`, o Datadog no podrá asociar los eventos de métricas con la exposición correcta.

## Traiga su propia aleatorización {#bring-your-own-randomization}

Si aleatoriza a los sujetos con un sistema distinto a Datadog Feature Flags, esta integración de flag-to-experiment no se aplica. Datadog aún puede analizar el Datadog Experiment: defina un [modelo SQL de exposición][7] que lea los registros de exposición de su almacén de datos en su lugar.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/experiments/
[2]: /es/experiments/plan_and_launch_experiments/#add-a-feature-flag
[3]: /es/feature_flags/concepts/targeting_rules/
[4]: /es/feature_flags/concepts/traffic_splitting/
[5]: /es/feature_flags/concepts/evaluation_context/
[6]: /es/experiments/concepts/subject_types/
[7]: /es/experiments/concepts/exposure_sql/