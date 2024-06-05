---
aliases:
- /es/graphing/widgets/service_summary/
description: Muestra los gráficos de un servicio elegido en un widget de dashboard.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentación
  text: Creación de dashboards con JSON
- link: /tracing/services/service_page/
  tag: Documentación
  text: Más información sobre la Página de servicios de APM
kind: documentación
title: Widget de resumen de servicio
widget_type: trace_service
---

Un servicio es un conjunto de procesos que hacen el mismo trabajo, por ejemplo, un marco web o una base de datos. Datadog proporciona gráficos listos para usar para mostrar información del servicio, como se ve en la Página de servicios. Utiliza el widget de resumen de servicio para mostrar los gráficos de un [servicio][1] elegido en tu dashboard.

{{< img src="dashboards/widgets/service_summary/service_summary.png" alt="Resumen de servicio" >}}

## Configuración

### Configuración

1. Selecciona un [entorno][2] y un [servicio][1].
2. Selecciona un tamaño de widget.
3. Selecciona la información que deseas visualizar:
    * Resultados
    * Errores
    * Latencia
    * Desconexión
    * Distribución
    * Recurso (**Nota**: Debes seleccionar el tamaño grande de widget para ver esta opción).
4. Elige tu preferencia de visualización al seleccionar el número de columnas en las que se mostrarán los gráficos.
5. Introduce un título para tu gráfico.

## API

Este widget puede utilizarse con la **[API de dashboards][3]**. Consulta la siguiente tabla para la [definición del esquema de widget JSON][4]:

{{< dashboards-widgets-api >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/services/service_page/
[2]: /es/tracing/send_traces/
[3]: /es/api/latest/dashboards/
[4]: /es/dashboards/graphing_json/widget_json/