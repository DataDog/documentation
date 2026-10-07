---
description: Conoce cómo un reintento de test de Synthetic afecta al estado del monitor
  asociado.
further_reading:
- link: /synthetics/guide/synthetic-test-monitors/
  tag: Documentación
  text: Más información sobre los monitores de tests de Synthetic
- link: /continuous_testing/explorer/search_runs/
  tag: Documentación
  text: Más información sobre las ejecuciones de tests de Synthetic
title: Comprender cómo los reintentos de tests de Synthetic determinan el estado del
  monitor
---

## Información general

Para reducir la fatiga de alertas, los tests de Synthetic pueden reintentarse cuando falla la ejecución de un test. Si has configurado un test para que se reintente en caso de fallo, se trata de un _reintento rápido_.

Con un reintento rápido, Datadog ejecuta un test de Synthetic varias veces antes de pasar el monitor del test a una alerta y enviar una notificación. Para obtener más información sobre los monitores asociados a los tests de Synthetic, consulta [Usar monitores de tests de Synthetic][3].

{{< img src="synthetics/guide/synthetics_test_retries/fast_retries.png" alt="Ejecuciones de tests fallidas con reintentos rápidos" style="width:100%;">}}


## Evaluaciones de grupo

Mientras que los resultados de los reintentos rápidos se utilizan en la evaluación del grupo local, en la evaluación del grupo total solo se tiene en cuenta el último reintento. La ejecución original y todos los reintentos intermedios se descartan de la evaluación.

Evaluación del grupo local
: Evaluación del estado de la localización.

Evaluación del grupo total
: Evaluación del estado del test.

Una ejecución que sigue fallando después de haber alcanzado el número máximo de reintentos se considera definitiva, y este resultado final se tiene en cuenta en la evaluación del grupo total. 

## Reintentos que se solapan con otras ejecuciones de tests

En este ejemplo, un test de Synthetic está programado para ejecutarse cada tres minutos, y tiene un reintento configurado con un máximo de dos veces y un retraso de dos minutos.

La evaluación solo tiene en cuenta el último reintento para la evaluación del grupo total.

Cuando fallan todos los reintentos:

{{< img src="synthetics/guide/synthetics_test_retries/diagram_1.png" alt="Una ejecución de test que se reintentó dos veces y falló en todos los reintentos, evaluada como un grupo local y como un grupo total" style="width:100%;">}}

O cuando un reintento tiene éxito:

{{< img src="synthetics/guide/synthetics_test_retries/diagram_2.png" alt="Un test que se reintentó dos veces y tuvo éxito en el tercer intento, evaluado como un grupo local y como un grupo total" style="width:100%;">}}

**Nota:** Dependiendo de lo que establezcas para los parámetros `minFailureDuration` y `minLocationsFailed`, puedes ver un comportamiento diferente.

## Marcas de tiempo

El sistema rellena la marca de tiempo de un resultado final con la hora a la que se reintentó el test, no con la hora a la que se programó originalmente. Los resultados se consideran con la marca de tiempo en que se inició el test. Debido al tiempo de ejecución del test, puede haber un pequeño retraso antes de que los resultados estén disponibles para la evaluación.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/continuous_testing/explorer/search_runs/
[2]: https://app.datadoghq.com/synthetics/explorer
[3]: /es/synthetics/guide/synthetic-test-monitors/