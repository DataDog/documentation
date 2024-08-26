---
description: Descubre cómo utilizar las métricas Sintético generales en los monitores.
further_reading:
- link: /monitors/types/metric/
  tag: Documentación
  text: Más información sobre los monitores de métricas
- link: /monitors/manage/
  tag: Documentación
  text: Descubre cómo gestionar monitores
- link: /synthetics/metrics/
  tag: Documentación
  text: Información sobre las métricas de monitorización de Sintético
title: Utilizar métricas de uso estimado
---

## Información general

Puedes utilizar [métricas][1] generadas a partir de tus tests Synthetic para crear [monitores de métricas][2] además del [monitor Synthetic que se crea con tu test][3].

{{< img src="synthetics/guide/using-synthetic-metrics/metric-monitor.png" alt="Ejemplo de un monitor de métricas que alerta cuando fallan demasiados tests en CI" style="width:95%;" >}}

Con los monitores de métricas, puedes conseguir lo siguiente:

- Monitorizar el tiempo total de respuesta
- Definir el contexto en tiempos HTTP específicos como DNS, la resolución DNS, y la conexión TCP
- Acceder a las etiquetas (tags) añadidas a las métricas procedentes de los tests Synthetic

Esta guía muestra cómo configurar un monitor de métricas utilizando una métrica general, como `synthetics.test_runs`.

## Crear un monitor de métricas


{{< img src="synthetics/guide/using-synthetic-metrics/metric-monitor-setup.png" alt="Ejemplo de un monitor de métricas que alerta cuando fallan demasiados tests en CI" style="width:95%;" >}}

1. Para crear un monitor de métricas, dirígete a [Monitors > New Monitor][4] (Monitores > Nuevo monitor) y haz clic en **Metric** (Métricas).

2. Selecciona un método de detección para personalizar las condiciones de las alertas de tu monitor. En el siguiente ejemplo, se puede crear un monitor de métricas con una alerta de umbral.

   Alerta de umbral
   : Se activa una alerta cuando una métrica supera un umbral.

   Alerta de cambio
   : Se activa una alerta cuando el delta entre valores es superior al umbral.

   Detección de anomalías
   : Se activa una alerta cada vez que una métrica se desvía de un patrón esperado.

   Alerta de outliers
   : Se activa una alerta cuando un miembro de un grupo se comporta de forma diferente a sus compañeros.

   Alerta de predicción
   : Se activa una alerta cada vez que se prevé que una métrica superará un umbral en el futuro.

3. En la sección **Define the metric** (Definir la métrica), introduce una métrica de monitorización Synthetic como `synthetics.test_runs`, en la que puedes filtrar por estado, códigos de respuesta y comportamiento de reintento.

4. Define las condiciones de alerta y añade un mensaje de notificación.

5. Define los permisos de edición y haz clic en **Create** (Crear).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/metrics/
[2]: /es/monitors/types/metric/
[3]: /es/synthetics/guide/synthetic-test-monitors/
[4]: https://app.datadoghq.com/monitors/create/metric