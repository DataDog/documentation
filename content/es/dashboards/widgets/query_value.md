---
aliases:
- /es/graphing/widgets/query_value/
description: Mostrar un valor agregado para una consulta de métrica determinada
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentación
  text: Creación de dashboards con JSON
title: Widget de valor de la consulta
widget_type: query_value
---

Los valores de consulta muestran el valor actual de una determinada consulta de métrica, APM, o log. Tienen un formato condicional (como un fondo verde/amarillo/rojo) para indicar si el valor está dentro del rango esperado. Esto puede complementarse con fondos opcionales de datos de series temporales. Los valores mostrados por un valor de consulta no requieren una medición instantánea.

El widget puede mostrar el último valor informado o un agregado calculado a partir de todos los valores de la consulta a lo largo del intervalo de tiempo. Estas visualizaciones brindan un intervalo estrecho, pero inequívoco a tu consulta de infraestructura.

{{< img src="dashboards/widgets/query_value/query_value1.png" alt="Widget de valor de consulta" style="width:80%;" >}}

## Configuración

{{< img src="dashboards/widgets/query_value/query-value-widget-setup1.png" alt="Configuración del widget de valor de consulta" style="width:80%;">}}

### Configuración

1. Elige los datos a graficar:
    * Métrica: consulta la [Documentación de consulta][1] para configurar una consulta de métrica.
    * Tramos indexados: consulta la [Documentación de búsqueda de trazas][2] para configurar una consulta de tramo (span)  indexado.
    * Eventos de log: consulta la [Documentación de búsqueda de log][3] para configurar una consulta de evento de log.
2. Reduce los valores de la consulta a un único valor, calculado como el valor `avg`, `min`, `sum`, `max`, o `last` de todos los puntos de datos en el marco temporal especificado.
3. Elige las unidades y el formato. El autoformato ajusta la escala del dashboard en función de las unidades.
4. Opcionalmente, configura un formato condicional según el valor mostrado. Consulta [Reglas de formato visual](#visual-formatting-rules) para más ejemplos.
5. Opcionalmente, superpone un fondo de series temporales:
    * De mínimo a máximo: un gráfico un gráfico de escala de mínimo a máximo.
    * Línea: un gráfico de escala para incluir el cero (0).
    * Barras: muestra mediciones discretas y periódicas.

### Opciones

#### Reglas de formato visual

<div class="alert alert-info">Las reglas de formato visual deben basarse en el valor bruto de métrica. Si la unidad base de la métrica está en nanosegundos, pero el valor de consulta tiene el formato automático en segundos, las reglas condicionales deben basarse en nanosegundos.</div>

Personaliza el fondo de tu widget de valor de consulta con reglas condicionales. Tienes la opción de añadir un color de fondo, un color de fuente o una imagen personalizada. Con imágenes personalizadas, los servidores internos deben actualizarse para admitir solicitudes de distintos orígenes que hagan referencia a imágenes internas.

{{< img src="dashboards/widgets/query_value/visual_formatting_rules_custom_img.png" alt="Reglas de formato visual del widget de valor de consulta con fondo de imagen personalizado" style="width:90%;" >}}

#### Enlaces contextuales

Los [enlaces contextuales][4] están activados por defecto y pueden activarse o desactivarse. Los enlaces contextuales sirven de puente entre widgets de dashboard con otras páginas de Datadog, o con aplicaciones de terceros.

#### Hora mundial

Elige si tu widget tiene un marco temporal personalizado o el marco temporal global del dashboard.

## Python

Este widget se puede utilizar con la **[API de dashboards][5]**. Consulta la siguiente tabla para obtener la [definición del esquema JSON del widget)][6]:

{{< dashboards-widgets-api >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dashboards/querying/#overview
[2]: /es/tracing/trace_explorer/query_syntax/#search-bar
[3]: /es/logs/search_syntax/
[4]: /es/dashboards/guide/context-links/
[5]: /es/api/latest/dashboards/
[6]: /es/dashboards/graphing_json/widget_json/