---
description: Detecta problemas de rendimiento en tu aplicación que afectan a los usuarios
  finales con el análisis de impactos de Watchdog.
further_reading:
- link: https://www.datadoghq.com/blog/watchdog-impact-analysis/
  tag: Blog
  text: Entender el alcance del impacto en el usuario con el análisis de impactos
    de Watchdog
- link: real_user_monitoring/explorer/watchdog_insights/
  tag: Documentación
  text: Obtener información sobre Watchdog Insights para RUM
- link: real_user_monitoring/connect_rum_and_traces/
  tag: Documentación
  text: Conectar RUM y las trazas
kind: documentación
title: Análisis de impactos de Watchdog
---

## Información general

Cada vez que Watchdog encuentra una anomalía de APM, analiza simultáneamente diversas métricas de latencia y error que se envían desde los SDK de RUM, para evaluar si la anomalía está afectando negativamente a páginas web o móviles que tus usuarios visitan.

Si Watchdog determina que la experiencia del usuario final se ve afectada, muestra un resumen de los impactos en una alerta APM de Watchdog, que incluye lo siguiente:

- Una lista de vistas de RUM afectadas
- El número estimado de usuarios afectados
- Un enlace a la lista de usuarios afectados, para que puedas comunicarte con ellos, si es necesario.

{{< img src="watchdog/watchdog_impact_analysis.mp4" alt="Un usuario mueve el cursor sobre las secciones de usuarios y vistas para mostrar más información sobre los usuarios afectados y la cantidad de vistas afectadas" video=true >}}

Esta función aparece activada automáticamente para todos los usuarios de APM y RUM. Cada vez que hay alertas APM de Watchdog asociadas a impactos para el usuario final, los **usuarios** afectados y las **rutas de vista** se muestran en la sección **Impacts** (Impactos) de tus alertas de Watchdog. Haz clic en **users** (usuarios) para ver la información de contacto de los usuarios afectados, si necesitas comunicarte con ellos. Haz clic en **view paths** (rutas de vista) para acceder a las vistas de RUM afectadas, para obtener información adicional.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}