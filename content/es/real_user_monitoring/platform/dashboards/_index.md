---
aliases:
- /es/real_user_monitoring/dashboards
description: Utiliza dashboards RUM para obtener más información sobre los datos y
  el rendimiento de tu aplicación.
further_reading:
- link: /real_user_monitoring/explorer
  tag: Documentación
  text: Información sobre el navegador RUM
title: Dashboards RUM
---

## Información general

Cuando se crea una aplicación RUM, Datadog [recopila datos][1] y genera dashboards sobre el rendimiento, los errores, los recursos y las sesiones de usuario de la aplicación. 

{{< img src="real_user_monitoring/dashboards/rum-dashboards-performance-summary.png" alt="Página de Información general de la aplicación RUM" style="width:90%;" >}}

Accede a tus dashboards RUM filtrando por `RUM` en la consulta de búsqueda de la [**lista de dashboards**][2] o en las páginas de resumen de tu aplicación (**Experiencia digital > Resumen de rendimiento** y **Experiencia digital > Análisis de productos > Resumen del análisis**).

{{< img src="real_user_monitoring/dashboards/available-rum-dashboards.png" alt="Out-of-the-box Dashboards de RUM predefinidos" style="width:90%;" >}}

{{< whatsnext desc="Puedes explorar los siguientes dashboards RUM predefinidos:" >}}
  {{< nextlink href="/real_user_monitoring/platform/dashboards/performance" >}}<u>Informaciones generales de rendimiento</u>: Observa una vista global del rendimiento del sitio web/de la aplicación y de los datos demográficos. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/platform/dashboards/testing_and_deployment" >}}<u>Test y despliegue</u>: Evalúa la cobertura de tu aplicación de tests del navegador e identifica elementos populares en tu aplicación para realizar su seguimiento utilizando datos de RUM y Synthetics. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/platform/dashboards/usage" >}}<u>Uso</u>: Analiza datos de sesiones de usuario y de uso de tus aplicaciones RUM, incluidas las señales de frustración. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/platform/dashboards/errors" >}}<u>Errores</u>: Observa los errores que aparecen en las consolas de usuarios por navegador y tipo de dispositivo. {{< /nextlink >}}
{{< /whatsnext >}}

## Interacción con dashboards RUM

Puedes clonar [dashboards][3] y personalizarlos para explorar los datos de tu aplicación en el [Explorador RUM][4].

### Variables de plantilla

Los dashboards RUM generados contienen automáticamente un conjunto de variables de plantilla predeterminadas. Utiliza los desplegables de variables de plantilla para seleccionar valores y delimitar tu búsqueda. Para obtener más información, consulte la documentación de [Variables de plantilla][5].

### Visualizar eventos RUM

Para explorar eventos individualmente, haz clic en un gráfico y en **Visualizar eventos RUM**. Esto te redirige al Explorador RUM con filtros de búsqueda preseleccionados.

{{< img src="real_user_monitoring/dashboards/rum-view-events-2.mp4" alt="Ver eventos de RUM" video=true style="width:80%;" >}}

### Personalización de los dashboards

Para clonar tus dashboards RUM, haz clic en el icono **Parámetros** y selecciona **Clonar dashboard**. Para añadir más widgets, powerpacks o aplicaciones, desplázate hasta abajo y haz clic en el icono **+**. 

También puedes modificar las variables de plantilla y crear una [vista guardada][6].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/data_collected/
[2]: https://app.datadoghq.com/dashboard/lists
[3]: /es/dashboards/
[4]: /es/real_user_monitoring/explorer/
[5]: /es/dashboards/template_variables
[6]: /es/real_user_monitoring/explorer/saved_views/