---
aliases:
- /es/real_user_monitoring/dashboards
description: Utilice los dashboards de RUM preconfigurados para obtener más información
  sobre los datos y el rendimiento de su aplicación.
further_reading:
- link: /real_user_monitoring/explorer
  tag: Documentación
  text: Obtenga información sobre el Explorador de RUM
title: Dashboards de RUM
---
## Descripción general {#overview}

Cuando crea una aplicación RUM, Datadog [recopila datos][1] y genera dashboards sobre el rendimiento, los errores, los recursos y las sesiones de usuario de su aplicación. 

{{< img src="real_user_monitoring/dashboards/rum-dashboards-performance-summary.png" alt="Página de descripción general de la aplicación RUM" style="width:90%;" >}}

Acceda a sus dashboards de RUM filtrando por `RUM` en la consulta de búsqueda de [{{< ui >}}Dashboard List{{< /ui >}}][2] o desde las páginas de resumen de su aplicación ({{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Performance Summary{{< /ui >}} y {{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Product Analytics{{< /ui >}} > {{< ui >}}Analytics Summary{{< /ui >}}).

{{< img src="real_user_monitoring/dashboards/available-rum-dashboards.png" alt="Dashboards de RUM preconfigurados" style="width:90%;" >}}

{{< whatsnext desc="Puede explorar los siguientes dashboards de RUM preconfigurados:" >}}
  {{< nextlink href="/real_user_monitoring/platform/dashboards/performance" >}}<u>Descripciones generales de rendimiento</u>: Vea una vista global del rendimiento y la demografía de su sitio web/aplicación. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/platform/dashboards/testing_and_deployment" >}}<u>Pruebas y despliegue</u>: Evalúe la cobertura de la aplicación de sus pruebas de navegador e identifique elementos populares en su aplicación para realizar un seguimiento mediante datos de RUM y Synthetics. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/platform/dashboards/usage" >}}<u>Uso</u>: Analice los datos de uso y de sesiones de usuario de sus aplicaciones RUM, incluidas las señales de frustración. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/platform/dashboards/errors" >}}<u>Errores</u>: Observe los errores que aparecen en las consolas de usuario por navegador y tipo de dispositivo. {{< /nextlink >}}
{{< /whatsnext >}}

## Interactúe con los dashboards de RUM {#interact-with-rum-dashboards}

Puede clonar [dashboards][3] y personalizarlos para explorar los datos de su aplicación en el [Explorador de RUM][4].

### Variables de plantilla {#template-variables}

Los dashboards de RUM generados contienen automáticamente un conjunto de variables de plantilla predeterminadas. Utilice los menús desplegables de variables de plantilla para seleccionar valores y restringir su búsqueda. Para obtener más información, consulte la documentación de [Variables de plantilla][5].

### Visualizar eventos de RUM {#view-rum-events}

Para explorar eventos individuales, haga clic en un gráfico y haga clic en {{< ui >}}View RUM events{{< /ui >}}. Esto lo redirige al Explorador de RUM con filtros de búsqueda preseleccionados.

{{< img src="real_user_monitoring/dashboards/rum-view-events-2.mp4" alt="Visualizar eventos de RUM" video=true style="width:80%;" >}}

### Personalice dashboards {#customize-dashboards}

Para clonar sus dashboards de RUM, haga clic en el icono {{< ui >}}Settings{{< /ui >}} y seleccione {{< ui >}}Clone dashboard{{< /ui >}}. Para agregar más widgets, powerpacks o apps, desplácese hasta la parte inferior y haga clic en el icono {{< ui >}}\+{{< /ui >}}. 

También puede modificar las variables de plantilla y crear una [vista guardada][6].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/data_collected/
[2]: https://app.datadoghq.com/dashboard/lists
[3]: /es/dashboards/
[4]: /es/real_user_monitoring/explorer/
[5]: /es/dashboards/template_variables
[6]: /es/real_user_monitoring/explorer/saved_views/