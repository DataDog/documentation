---
aliases:
- /es/graphing/widgets/heat_map/
- /es/dashboards/widgets/heat_map/
description: Creación de un heatmap temporal sobre una métrica determinada.
further_reading:
- link: /real_user_monitoring/product_analytics/heatmaps/
  tag: Documentación
  text: Más información sobre heatmaps
- link: /dashboards/graphing_json/
  tag: Documentación
  text: Creación de dashboards con JSON
- link: https://www.datadoghq.com/blog/visualize-behavior-datadog-heatmaps/
  tag: Blog
  text: Visualiza el comportamiento de los usuarios con Datadog Heatmaps
title: Widget heatmap
widget_type: heatmap
---

{{< img src="dashboards/widgets/heatmap/heatmap.png" alt="Ejemplo de visualización de un heatmap" style="width:100%;">}}

El widget heatmap muestra métricas agregadas a través de múltiples etiquetas (tags). Utiliza widgets heatmap para visualizar histogramas de OpenTelemetry, métricas de distribución, alta resolución y visualización de datos.

## Configuración

### Configuración

Configura tu consulta métrica como de costumbre. Grafica los histogramas de OpenTelemetry utilizando el modo de histograma "contadores".

Haz una selección en el control "`prom.`/`máx.`/`mín.`/`suma por`/etc." para ver tus datos a través de las etiquetas (tags) asociadas.

### Opciones

#### Controles del eje Y

Los controles del eje Y están disponibles a través de la interfaz de usuario y el editor JSON.

Te permiten:

* Recortar el eje Y a rangos específicos.
* Cambiar automáticamente los límites del eje Y en función de un umbral de valor absoluto. Este umbral puede aplicarse a uno o ambos extremos del gráfico (inferior y superior) para eliminar la serie "outlier".
* Cambiar la escala del eje Y de lineal a log, pow, o sqrt.

Cambiar la escala del eje Y expandiendo el botón *Controles del eje Y*.

Están disponibles las siguientes opciones de configuración:

| Opción                | Obligatorio | Descripción                                                                                                                                                                                                       |
|-----------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Mín.`/`Máx.`           | No       | Especifica el valor mínimo o máximo para mostrar en el eje Y. Toma un número o `Auto` como valor por defecto.                                                                                                   |
| `Escala`               | No       | Especifica el tipo de escala. Valores posibles:<br>- *linear* (lineal): una escala lineal (por defecto)<br>- *log*: una escala logarítmica<br> - *pow*: una potencia de escala 2 (2 por defecto, modificar en JSON)<br>- *sqrt*: una escala de raíz cuadrada |
| `Siempre incluir cero` | No       | Incluir siempre cero o ajustar el eje al rango de datos. El valor predeterminado es incluir siempre cero.                                                                                                                     |

**Nota**: Debido a que la función de log matemática no acepta valores negativos, la escala de log Datadog solo funciona si los valores son del mismo signo (todo> 0 o todo < 0). En caso contrario, se devuelve un gráfico vacío.

## API

Este widget puede utilizarse con la **[Dashboards API (API de dashboards)][2]**. Ve la siguiente tabla para la [widget JSON schema definition (definición de esquema de JSON de widget)][3]:

{{< dashboards-widgets-api >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/events/explorer/#search-syntax
[2]: /es/api/latest/dashboards/
[3]: /es/dashboards/graphing_json/widget_json/