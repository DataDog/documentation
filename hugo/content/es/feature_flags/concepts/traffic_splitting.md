---
description: Aprenda cómo los Feature Flags de Datadog utilizan la aleatorización
  determinista para despliegues basados en porcentajes.
further_reading:
- link: /feature_flags/concepts/targeting_rules
  tag: Documentación
  text: Reglas y filtros de segmentación
- link: /feature_flags/concepts/evaluation_context
  tag: Documentación
  text: Contexto de evaluación
title: División de tráfico y aleatorización
---
## Descripción general {#overview}

Cuando define una regla de segmentación, puede servir una variante a un porcentaje de sujetos que coincidan con su filtro de segmentación. Datadog utiliza **aleatorización determinista** basada en el `targetingKey` en su [contexto de evaluación][1] para que el mismo sujeto reciba constantemente la misma variante para un flag determinado.

## Despliegues porcentuales{#percentage-rollouts}

En la sección **Reglas de segmentación y despliegues**, establezca el porcentaje de la audiencia que debe recibir cada variante. Para una regla de segmentación de **variante única**, asigne la exposición de tráfico deseada a una variante. Por ejemplo, despliegue la variante **Envío gratis** de su banner promocional al 50% de los sujetos que coincidan con su filtro:

{{< img src="feature_flags/concepts/single-variant-traffic-exposure-2.png" alt="Regla de segmentación con un despliegue de porcentaje de variante única." style="width:75%;" >}}

Para un despliegue **multivariante**, asigne porcentajes entre múltiples variantes en la misma regla de segmentación seleccionando **Serve > Split Traffic** al editar o crear su regla de segmentación. El SDK distribuye a los sujetos coincidentes entre esas variantes de acuerdo con los porcentajes que usted configure.

{{< img src="feature_flags/concepts/multi-variant-traffic-split-2.png" alt="Regla de segmentación con porcentajes divididos entre múltiples variantes." style="width:75%;" >}}

## Cómo evalúa el SDK los despliegues porcentuales {#how-the-sdk-evaluates-percentage-rollouts}

Cuando el SDK evalúa una regla de segmentación con un despliegue porcentual, primero verifica si el contexto de evaluación coincide con el filtro de la regla. Si coincide, el SDK utiliza la clave del flag y el `targetingKey` del contexto de evaluación para asignar al sujeto a un bucket de despliegue. Ese bucket determina si el sujeto recibe una variante de la regla actual o pasa a la siguiente regla.

La aleatorización es **determinista**: un sujeto con el mismo `targetingKey` siempre termina en el mismo bucket para un flag determinado, por lo que recibe la misma variante en evaluaciones repetidas. Si aumenta un porcentaje de despliegue más tarde (por ejemplo, del 30% al 50%), los sujetos que ya están en el bucket de tratamiento permanecen allí.

Para reglas multivariantes, el SDK aplica la misma lógica de asignación de buckets para distribuir a los sujetos entre las variantes de acuerdo con los porcentajes definidos en la regla.

Consulte [contexto de evaluación][1] para saber cómo configurar el `targetingKey` en su SDK.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/feature_flags/concepts/evaluation_context/