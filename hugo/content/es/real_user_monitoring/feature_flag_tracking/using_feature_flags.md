---
aliases:
- /es/real_user_monitoring/guide/getting-started-feature-flags/
- /es/real_user_monitoring/guide/setup-feature-flag-data-collection/
beta: true
description: Ve y comprende el estado y el uso de tu indicador de características.
disable_toc: false
further_reading:
- link: /real_user_monitoring/guide/setup-feature-flag-data-collection/
  tag: Documentación
  text: Configurar la recopilación de datos de indicadores de características
- link: /real_user_monitoring/explorer/
  tag: Documentación
  text: Más información sobre el Explorador RUM
- link: https://www.datadoghq.com/blog/feature-flag-tracking/
  tag: Blog
  text: Para garantizar la seguridad de la versión con el seguimiento de los indicadores
    de características en Datadog RUM
title: Uso de los indicadores de características
---

Una vez que hayas configurado tu recopilación de datos de indicadores de características, ve a la pestaña [**Feature Flags**][1] (Indicadores de características) en RUM.

Desde esta vista, puedes investigar cualquier duda que tengas sobre el estado y el uso de tu indicador de características.
- Monitoriza el número de usuarios que experimentan cada variante y ve estadísticas resumidas de tu indicador de características.
- Comprueba el [estado](#feature-flag-status) de tu indicador de características para ver si hay alguno que se puede eliminar para limpiar el código.
- Ve en qué páginas se están evaluando tus indicadores de características.

Los indicadores de características aparecen en el contexto de los eventos donde se evalúan, lo que significa que deberían aparecer en las vistas en las que se ejecuta la lógica del código del indicador de características.

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-list-2.png" alt="Ver una lista de tus indicadores de características para investigar cualquier duda que tengas sobre el estado y el uso de tu indicador de características" style="width:90%;" >}}

## Buscar y filtrar
Busca y filtra tus indicadores de características escribiendo en la barra de búsqued utilizar la búsqueda por faceta para reducir, ampliar o cambiar tu enfoque en los subconjuntos de indicadores de características que te interesen.

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-list-search-filter.png" alt="Barra de búsqueda y filtrado de listas de indicadores de características" style="width:90%;" >}}

## Estado del indicador de características
Hay tres posibles estados de los indicadores de características:

Activo
: el indicador de características ha evaluado diferentes variantes durante las últimas 2 semanas.

Inactivo
: durante las últimas 2 semanas, sólo ha habido evaluaciones de indicadores de características para tu variante de control.

Al 100%
: durante las últimas 2 semanas, sólo ha habido evaluaciones del indicador de características para una de tus variantes de _no control_.


## Análisis de tus indicadores de características
Para obtener más información sobre el estado y el rendimiento de tu indicador de características, puedes hacer clic en el indicador en la lista para acceder a un dashboard de análisis de indicadores de características exclusivo. El dashboard de análisis de indicadores de características proporciona información general del rendimiento de tu indicador de características, mostrando información sobre sesiones de usuario, cambios en tus Core Web Vitals y tasas de error. 

Estos gráficos predefinidos se agregan a todas las variantes del indicador, lo que facilita la detección de problemas en las versiones de las funciones, antes de que se conviertan en problemas graves. El dashboard ofrece una forma sencilla de monitorizar tus lanzamientos de versiones y te permite dar marcha atrás rápidamente si detectas un problema, a fin de evitar experiencias negativas para los usuarios.

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-details-page.mp4" alt="Página de información del indicador de características - Información general para usuarios" video=true width=90% >}}

- La pestaña **Users** (Usuarios) proporciona algunas estadísticas resumidas muy claras de tu indicador de características y te permite analizar en mayor medida a los usuarios que ven cada una de tus variantes del indicador de características utilizando cualquier atributo. Si quieres saber qué experimentó un usuario que utilizó una determinada variante frente a otra, puedes ver una [Session Replay][2] para cada caso.

- La pestaña **Issues** (Problemas) te ofrece una vista de los errores que se producen en tu aplicación en las sesiones de usuario que tienen tu indicador de características. Comprueba si se ha producido algún problema detectado por [Error Tracking][6] para una variante específica de tu indicador de características, que pueda estar relacionado con tus cambios.

- La pestaña **Rendimiento** te permite entender si una de tus variantes del indicador de características ha causado un rendimiento pobre. Puedes ver tus Core Web Vitals y el tiempo de carga de cada variante para determinar si una de tus variantes puede estar causando un impacto negativo en el rendimiento de tu aplicación.

## Crear vistas personalizadas a partir de datos de indicadores de características utilizando el Explorador RUM
Busca en todos los datos recopilados por RUM en el [RUM Explorer][4] para detectar tendencias en los indicadores de características, analizar patrones con mayor contexto o exportarlos a [dashboards][5] y [monitores][6]. 

Puedes buscar tus Sesiones, Vistas o Errores en el Explorador RUM con el atributo `@feature_flags.{flag_name}` para delimitar y centrarte en eventos donde los usuarios han mostrado una experiencia de usuario específica.

Puedes comparar métricas importantes para ti y tus equipos agrupando tus consultas por `@feature_flags.{flag_name}`. Por ejemplo, si quiere entender cómo tu nuevo flujo (flow) de pago está afectando a la tasa de conversión desde la página de página hasta que los usuarios realizan una compra, puedes añadir un "Agrupar por" en el gráfico de tasa de conversión.

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-rum-explorer.png" alt="Barra de búsqueda y filtrado de listas de indicadores de características" style="width:90%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/feature-flags
[2]: /es/real_user_monitoring/session_replay/browser/
[3]: /es/real_user_monitoring/error_tracking/explorer/#explore-your-issues
[4]: https://app.datadoghq.com/rum/explorer
[5]: /es/dashboards/
[6]: /es/monitors/#create-monitors