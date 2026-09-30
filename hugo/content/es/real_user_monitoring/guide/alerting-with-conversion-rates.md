---
description: Guía para crear alertas sobre las tasas de conversión.
further_reading:
- link: /monitors/create/types/real_user_monitoring/
  tag: Documentación
  text: Más información sobre los monitores RUM
title: Alertar con tasas de conversión
---

## Información general

Las tasas de conversión son cruciales para la monitorización del éxito de un flujo de trabajo de usuario. Esta guía describe cómo generar tasas de conversión en la visualización [Embudo RUM][1] y crear alertas que te notifiquen cuando las tasas de conversión caigan por debajo de un umbral determinado.

## Crear un embudo en el RUM Explorer

En Datadog, ve a [Digital Experience > Product Analytics > Funnels][1] (Experiencia digital > Embudos).

{{< img src="real_user_monitoring/funnel_analysis/rum-funnel-creation-2.png" alt="La página de creación de embudos con las acciones clave resaltadas" style="width:100%;" >}}

En la sección **Define steps for measuring conversion** (Definir pasos para medir la conversión), crea algunos pasos a partir de tus vistas y acciones. Puedes hacer clic en los gráficos de barras para ver un panel lateral con análisis sobre las conversiones y abandonos de los usuarios. Para añadir una vista o acción posterior en el embudo, haz clic en **+** y selecciona entre los pasos siguientes frecuentes.

## Exportar el gráfico de la tasa de conversión

El embudo muestra las tasas globales de conversión y abandono, el número de sesiones convertidas o abandonadas y el porcentaje de sesiones convertidas o abandonadas.  

Haz clic en el botón **Save to Dashboard** (Guardar en dashboard) y selecciona un dashboard existente en el menú desplegable para exportar el gráfico. Opcionalmente, haz clic en **New dashboard** (Nuevo dashboard) para crear un dashboard.

## Editar la consulta sobre la tasa de conversión

En dashboard, puedes editar el widget y acceder a la consulta de la tasa de conversión en **Graph your data** (Hacer gráficos de tus datos).

{{< img src="real_user_monitoring/guide/alerting-with-conversion-rates/conversion-rate-formula.png" alt="Acceso a la consulta de la tasa de conversión en el RUM Explorer" style="width:100%;" >}}

## Actualizar el monitor RUM

En una pestaña aparte, ve a [**Monitors** > **New Monitor**][3] (Monitores > Nuevo monitor) y selecciona **Real User Monitoring**.

{{< img src="real_user_monitoring/guide/alerting-with-conversion-rates/copy-paste-query-into-rum-monitor.mp4" alt="Exportar el widget de embudo en un dashboard existente o un dashboard nuevo" video=true >}}

Copia y pega las consultas del dashboard en el editor de consultas del monitor RUM y añade una fórmula utilizando `(a / b) * 100`.

## Configuración de monitor avanzada

Con la consulta aplicada, puedes personalizar las condiciones de alerta y configurar notificaciones para asegurar que las alertas notifiquen a la persona o canal adecuados. Para obtener más información, consulta [Monitor de Real User Monitoring][4].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/funnels
[2]: https://app.datadoghq.com/rum/explorer?viz=timeseries
[3]: https://app.datadoghq.com/monitors/create/rum
[4]: /es/monitors/types/real_user_monitoring/