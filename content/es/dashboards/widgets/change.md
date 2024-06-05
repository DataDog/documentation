---
aliases:
- /es/graphing/widgets/change/
description: Grafica el cambio de un valor a lo largo de un período de tiempo elegido.
further_reading:
- link: /monitors/types/metric/?tab=change
  tag: Documentación
  text: Configurar la detección de alertas de cambio en los monitores
- link: /dashboards/graphing_json/
  tag: Documentación
  text: Creación de dashboards con JSON
- link: /dashboards/graphing_json/widget_json/
  tag: Documentación
  text: Esquema JSON del widget
- link: /dashboards/graphing_json/request_json/
  tag: Documentación
  text: Solicitar un esquema JSON
kind: documentación
title: Widget de cambio
widget_type: cambio
---

La gráfica de cambio muestra el cambio en un métrica durante un período de tiempo. Compara el cambio de valor absoluto o relativo (%) entre el momento actual y N minutos antes con un umbral determinado. Los puntos de datos comparados no son puntos individuales, sino que se calculan mediante los parámetros de la sección de definición de la métrica. Para obtener más información, consulta la documentación de [Monitor de métricas][6] y la [guía de Monitores de alertas de cambio][7].

{{< img src="/dashboards/widgets/change/change_widget.png" alt="Ejemplo de un widget de cambio para la métrica jvm.heap_memory" style="width:100%;" >}}

## Ajuste

### Configuración

1. Elige una métrica para graficar.
2. Elige una función de agregación.
3. Opcional: elige un contexto específico para tu widget.
4. Desglosa tu agregación mediante una clave de etiqueta como `host` o `service`.
5. Elige un valor para el período de «Comparar con»:
    * una hora antes
    * un día antes
    * una semana antes
    * un mes antes
6. Elige entre un cambio `relative` o `absolute`.
7. Selecciona el campo por el que se ordenan las métricas:
    * `change`
    * `name`
    * `present value`
    * `past value`
8. Elige un orden `ascending` o `descending`.
9. Elige si quieres mostrar el valor actual en la gráfica.

### Opciones

#### Enlaces contextuales

Los [enlaces contextuales][1] se encuentran habilitados de manera predeterminada y se pueden activar o desactivar. Los enlaces contextuales enlazan los widgets del dashboard con otras páginas (en Datadog, o de terceros).

## API

Este widget se puede utilizar con la **[API de dashboards][2]**. Consulta la siguiente tabla para obtener la [definición del esquema JSON del widget][3]:

{{< dashboards-widgets-api >}}

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dashboards/guide/context-links/
[2]: /es/api/latest/dashboards/
[3]: /es/dashboards/graphing_json/widget_json/
[6]: /es/monitors/types/metric/?tab=change
[7]: /es/monitors/guide/change-alert/