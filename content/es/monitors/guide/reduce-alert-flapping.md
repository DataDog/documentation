---
aliases:
- /es/monitors/faq/how-do-i-reduce-alert-flapping-noise
further_reading:
- link: /monitors/downtimes/
  tag: Documentación
  text: Programar un tiempo de inactividad para silenciar un monitor
kind: Guía
title: Reducir el flapping de alertas
---

Un problema frecuente o tema sensible podría ser la fatiga de las alertas o cuando las alertas presentan "flapping" (pasan rápidamente del estado "ok" al de "alerta").

En Datadog hay funciones que a menudo proporcionan alertas menos ruidosas y más significativas.

* Reevaluar el valor del umbral de alerta
    * La forma más sencilla de reducir el flapping cuando la alerta <-> ok o los cambios de estado son frecuentes podría ser aumentando/disminuyendo la condición del umbral.
* Uso del umbral `min` 
    * Esto activa la alerta sólo cuando todos los puntos de datos de la métrica en el periodo de tiempo infringen el umbral.

* Reformula la consulta utilizando funciones: tasas, promedios móviles o diferenciales temporales.
    * Esto significa que puedes comparar la diferencia entre los valores del flujo de la métrica y los valores de la semana anterior, y establecer condiciones de alerta basadas en la diferencia.
    * Un diferencial temporal permite combinar funciones y también puede ofrecer una visión histórica. Por ejemplo:
 `abs(system.cpu.system{*} - week_before(system.cpu.system{*}))`
    * Si tu métrica experimenta picos con frecuencia y estos no son intrínsecamente indicativos de problemas, aplicarle un índice o un promedio te permitirá establecer un umbral más significativo.

* Considerar los estados de otros monitores que utilizan alertas compuestas
    * Las alertas compuestas, que son la incorporación más reciente a las capacidades de alerta de Datadog, te permitirán combinar dos o más alertas creadas previamente.
    Por ejemplo: si el uso de CPU es alto Y el uso de disco es alto en un host, se aactiva la alerta.

* Uso de algunos módulos de análisis integrados con anomalías o outliers
    * La [detección de anomalías][2] utiliza un cierto análisis de temporalidad para emitir una alerta cuando un flujo (stream) de datos se comporta de forma históricamente incoherente.
    * La [detección de outliers][3] utiliza otros flujos de datos del mismo contexto para emitir una alerta cuando un flujo se comporta de manera diferente en comparación con sus pares.
    * Ambas opciones también pueden utilizarse junto con las alertas compuestas.

Si el problema es el enrutamiento de alertas, de seguro te interesarán las [variables de plantilla][4] y la separación de los estados de **adveretencia** o **alerta** con [variables condicionales][5].

{{< partial name="whats-next/whats-next.html" >}}

[2]: /es/monitors/types/anomaly/
[3]: /es/monitors/types/outlier/
[4]: /es/monitors/notify/variables/?tab=is_alert#template-variables
[5]: /es/monitors/notify/variables/?tab=is_alert#conditional-variables