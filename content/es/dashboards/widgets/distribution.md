---
aliases:
- /es/graphing/widgets/distribution/
description: Grafica una distribución de métrica agregada en una o varias etiquetas
  (tags).
further_reading:
- link: /metrics/distributions/
  tag: Documentación
  text: Distribuciones
- link: /dashboards/graphing_json/
  tag: Documentación
  text: Creación de dashboards con JSON
- link: /dashboards/graphing_json/widget_json/
  tag: Documentación
  text: Esquema JSON del widget
- link: /dashboards/graphing_json/request_json/
  tag: Documentación
  text: Solicitar un esquema JSON
- link: /dashboards/querying/
  tag: Documentación
  text: Consulta
kind: documentación
title: Widget de distribución
widget_type: distribución
---

En la visualización de la distribución se muestran datos agregados a través de una o varios etiquetas, como *hosts*. A diferencia del [mapa de calor][1], el eje x de una gráfica de distribución es la cantidad y no el tiempo.

Esta visualización solo muestra una única consulta; las consultas adicionales no se tienen en cuenta.

**Nota**: La detección de outlier no se puede realizar para esta visualización.

{{< img src="/dashboards/widgets/distribution/distribution_fullscreen.png" alt="Gráfica de distribución del promedio del montón de JVM por host">}}

## Ajuste

### Configuración

1. Elige los datos para graficar. La visualización de la distribución admite métricas, Live Processes, latencia de solicitudes de APM, eventos de log y eventos de RUM.
**Nota**: Este tipo de visualización solo es útil cuando los datos se agregan a través de claves de etiqueta, como para cada `host`.
1. Haz una selección en el control de «`avg`/`max`/`min`/`sum by`/» para ver tus datos a través de las etiquetas asociadas.
1. Personaliza tu gráfica con las opciones disponibles.

### Opciones

#### Marcadores de percentiles

Con las distribuciones de solicitudes de APM, puedes añadir marcadores de percentiles en el eje x.

{{< img src="dashboards/widgets/options/distribution_marker_controls.jpg" alt="Preferencias de control de marcadores" style="width:80%;">}}

#### Controles de los ejes X e Y

Los controles del eje se encuentran disponibles a través de la interfaz de usuario y el editor de JSON.

Te permiten:

* Recortar los ejes x e y a rangos específicos.
* Cambiar de manera automática los límites del eje x en función de un percentil o un umbral de valor absoluto. Este umbral se puede aplicar a uno o ambos extremos de la gráfica (inferior y superior) para eliminar los contenedores «outlier».
* Cambiar la escala del eje y de lineal a log.

{{< img src="dashboards/<txprotected>widgets</txprotected>/options/distribution_axis_controls.jpg" alt="Preferencias de control del eje de distribución" style="width:80%;">}}

### Pantalla completa

Además de las [opciones estándar de pantalla completa][2], puedes utilizar los controles del eje x para acercarte a un percentil específico.

## API

Este widget se puede utilizar con la **[API de dashboards][3]**. Consulta la siguiente tabla para obtener la [definición del esquema JSON del widget][4]:

{{< dashboards-widgets-api >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dashboards/widgets/heatmap/
[2]: /es/dashboards/widgets/#full-screen
[3]: /es/api/latest/dashboards/
[4]: /es/dashboards/graphing_json/widget_json/