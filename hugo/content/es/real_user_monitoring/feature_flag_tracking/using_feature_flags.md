---
beta: true
description: Visualice y comprenda el estado y el uso de su feature flag.
disable_toc: false
further_reading:
- link: /real_user_monitoring/feature_flag_tracking/setup/
  tag: Documentación
  text: Configure la recopilación de datos de Feature Flag.
- link: /real_user_monitoring/explorer/
  tag: Documentación
  text: Obtenga información sobre el Explorador de RUM
- link: https://www.datadoghq.com/blog/feature-flag-tracking/
  tag: Blog
  text: Garantice la seguridad de las versiones con Feature Flag Tracking en Datadog
    RUM
title: Uso de Feature Flag Tracking
---
Una vez que haya configurado la recopilación de datos de su feature flag, navegue a la pestaña [{{< ui >}}Feature Flag Tracking{{< /ui >}}][1] dentro de RUM.

Desde esta visualización, puede investigar cualquier duda que tenga sobre el estado y el uso de su feature flag.
- Haga un seguimiento de la cantidad de usuarios que experimentan cada variante y vea estadísticas resumidas de su feature flag.
- Verifique el [estado](#feature-flag-status) de su feature flag para ver si hay alguna que pueda eliminarse para la limpieza del código.
- Visualice contra qué páginas se están evaluando sus feature flags.

Las feature flags aparecen en el contexto de los eventos donde se evalúan, lo que significa que deberían aparecer en las visualizaciones en las que se ejecuta la lógica del código de la feature flag.

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-list-2.png" alt="Visualice una lista de sus feature flags para investigar cualquier duda que tenga sobre el estado y el uso de su feature flag." style="width:90%;" >}}

## Buscar y filtrar {#search-and-filter}
Busque y filtre sus feature flags escribiendo en la barra de búsqueda. También puede usar la búsqueda facetada para limitar, ampliar o cambiar su enfoque en subconjuntos de feature flags que le interesen.

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-list-search-filter.png" alt="Barra de búsqueda y filtrado de la lista de Feature Flag" style="width:90%;" >}}

## Estado de feature flag {#feature-flag-status}
Existen tres estados posibles de feature flag:

Activo
: La feature flag ha evaluado diferentes variantes durante las últimas 2 semanas.

Inactivo
: Durante las últimas 2 semanas, solo ha habido evaluaciones de feature flag para su variante de control.

Al 100%
: Durante las últimas 2 semanas, solo ha habido evaluaciones de feature flag para una de sus variantes _no control_.


## Analice sus feature flags {#analyze-your-feature-flags}
Para obtener más detalles sobre el estado y el rendimiento de su feature flag, puede hacer clic en el flag en la lista para navegar a un panel de análisis de Feature Flag dedicado. El panel de análisis de Feature Flag proporciona una descripción general del rendimiento de su feature flag, mostrando información sobre las sesiones de usuario, cambios en sus Core Web Vitals y tasas de error. 

Estos gráficos listos para usar se agregan a través de sus variantes de feature flag, lo que facilita la detección de problemas en sus lanzamientos de funciones antes de que se conviertan en problemas graves. Este panel proporciona una manera fácil de hacer un seguimiento de sus lanzamientos de funciones y le permite revertir rápidamente tan pronto como detecte un problema para evitar experiencias negativas de usuario. 

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-details-page.mp4" alt="Página de detalles de Feature Flag - Descripción general de usuarios" video=true width=90% >}}

- La pestaña {{< ui >}}Users{{< /ui >}} proporciona algunas estadísticas de resumen de alto nivel de su Feature Flag y le permite analizar más a fondo a los usuarios que visualizan cada una de sus variantes de Feature Flag por cualquier atributo. Si desea comprender cómo se ve para alguien que experimentó una determinada variante frente a otra, puede ver una [Session Replay][2] para cada caso.

- La pestaña {{< ui >}}Issues{{< /ui >}} le ofrece una visualización de los errores que están ocurriendo en su aplicación para las sesiones de usuario que tienen su Feature Flag. Verifique si algún problema detectado por [Error Tracking][3] ocurrió para una variante específica de su Feature Flag y podría estar relacionado con sus cambios.

- La pestaña {{< ui >}}Performance{{< /ui >}} le permite comprender si una de sus variantes de Feature Flag ha causado un bajo rendimiento. Puede visualizar sus Core Web Vitals y el tiempo de carga para cada variante para determinar si una de sus variantes podría estar causando un impacto negativo en el rendimiento de su aplicación.

## Cree visualizaciones personalizadas a partir de los datos de Feature Flag usando el RUM Explorer {#build-custom-views-from-feature-flag-data-using-the-rum-explorer}
Busque en todos los datos recopilados por RUM en el [RUM Explorer][4] para identificar tendencias en los Feature Flag, analizar patrones con mayor contexto o exportarlos a [paneles][5] y [monitores][6]. 

Puede buscar sus Sesiones, Visualizaciones o Errores en el RUM Explorer, con el atributo `@feature_flags.{flag_name}` para limitar el contexto y centrarse en los eventos donde a los usuarios se les mostró una experiencia de usuario específica.

Puede comparar métricas importantes para usted y sus equipos agrupando su consulta por `@feature_flags.{flag_name}`. Por ejemplo, si desea comprender cómo su nuevo flujo de pago está afectando la tasa de conversión desde la página de pago a los usuarios que realizan una compra, puede agregar un "Agrupar por" en el gráfico de tasa de conversión.

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-rum-explorer.png" alt="Barra de búsqueda y filtrado de la lista de Feature Flag" style="width:90%;" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/feature-flags
[2]: /es/session_replay/
[3]: /es/real_user_monitoring/error_tracking/explorer/#explore-your-issues
[4]: https://app.datadoghq.com/rum/explorer
[5]: /es/dashboards/
[6]: /es/monitors/#create-monitors