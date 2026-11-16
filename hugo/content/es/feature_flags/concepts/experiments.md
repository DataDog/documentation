---
description: Aprenda cómo las reglas de segmentación de un feature flag aleatorizan
  un Datadog Experiment y registran exposiciones para su análisis.
further_reading:
- link: /experiments/
  tag: Documentación
  text: Obtenga más información sobre Datadog Experiments
- link: /experiments/plan_and_launch_experiments
  tag: Documentación
  text: Planifique y lance experimentos
- link: /experiments/concepts/subject_types
  tag: Documentación
  text: Tipos de sujetos en experimentos
- link: /feature_flags/concepts/targeting_rules
  tag: Documentación
  text: Reglas y filtros de segmentación de Feature Flags
- link: /feature_flags/concepts/evaluation_context
  tag: Documentación
  text: Contexto de evaluación de Feature Flags
title: Feature Flags y experimentos
---
## Descripción general {#overview}

Datadog Feature Flags es la forma predeterminada de aleatorizar un [Datadog Experiment][1]. Cuando vincula un flag a un experimento, Datadog agrega una regla de segmentación de experimentos al flag. Las evaluaciones de esa regla asignan sujetos a una variante y registran un evento de exposición que Datadog utiliza para analizar el experimento.

## Vincular un flag a un experimento {#link-a-flag-to-an-experiment}

Vincule un flag a un experimento desde cualquiera de los lados del flujo de trabajo:

- Desde [{{< ui >}}Product Analytics > Experiments{{< /ui >}}][1], cree un experimento y [agregue un Feature Flag existente][2] a él.
- Desde la página de detalles de un flag, haga clic en {{< ui >}}Create New Experiment{{< /ui >}} en la sección {{< ui >}}Targeting Rules & Rollouts{{< /ui >}} para crear un experimento precargado con ese flag.

## Reglas de segmentación de experimentos {#experiment-targeting-rules}

Una regla de segmentación de experimentos funciona como cualquier otra [regla de segmentación][3]: puede incluir un filtro y utiliza la misma [aleatorización determinista][4] para asignar sujetos a una variante. La aleatorización se basa en el `targetingKey` en su [contexto de evaluación][5], por lo que el mismo sujeto siempre recibe la misma variante durante todo el experimento.

Si varios experimentos comparten el mismo flag, Datadog evalúa sus reglas de segmentación en orden, de arriba a abajo. Reordene las reglas antes de lanzar un experimento para controlar cuál tiene prioridad para un sujeto determinado.

## Exposiciones {#exposures}

Cada vez que el SDK evalúa la regla de segmentación de experimentos de un flag para un sujeto, Datadog registra una _exposición_: el sujeto, la variante servida y una marca de tiempo. Datadog combina las exposiciones con eventos de métricas para calcular el incremento entre variantes. Esos eventos de métricas pueden provenir de Product Analytics, Real User Monitoring o de su almacén de datos.

Datadog une las exposiciones y las métricas mediante un identificador de sujeto. El `targetingKey` que su SDK establece en el [contexto de evaluación][5] debe coincidir con el [atributo de tipo de sujeto][6] configurado para el experimento, como `@usr.id`, o Datadog no podrá asociar los eventos de métricas con la exposición correcta.

## Preferencias del sujeto {#subject-preferences}

La exclusión voluntaria de Experimentation puede excluir a un sujeto de las asignaciones de experimentos de inmediato o según el momento en que se active la asignación. La exclusión voluntaria de la evaluación de flags es independiente y no impide la asignación de experimentos. Consulte [Flag Evaluation and Experimentation Opt-Out][8].

## Use su propio sistema de aleatorización {#bring-your-own-randomization}

Si aleatoriza a los sujetos con un sistema distinto de Datadog Feature Flags, esta integración de flags con experimentos no se aplica. Datadog aún puede analizar el experimento: en su lugar, defina un [Exposure SQL Model][7] que lea los registros de exposición de su almacén de datos.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/experiments/
[2]: /es/experiments/plan_and_launch_experiments/#add-a-feature-flag
[3]: /es/feature_flags/concepts/targeting_rules/
[4]: /es/feature_flags/concepts/traffic_splitting/
[5]: /es/feature_flags/concepts/evaluation_context/
[6]: /es/experiments/concepts/subject_types/
[7]: /es/experiments/concepts/exposure_sql/
[8]: /es/feature_flags/concepts/opt_out/