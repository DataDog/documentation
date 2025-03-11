---
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
title: Seguimiento de indicadores de características
---

## Información general

Los datos de los indicadores de características te ofrecen una mayor visibilidad de tu experiencia de usuario y de la monitorización del rendimiento, ya que te permiten determinar a qué usuarios se les está mostrando una función específica y si algún cambio que introduces repercute en tu experiencia de usuario o afecta negativamente al rendimiento.

Si enriqueces tus datos RUM con datos de indicadores de características, podrás: 
- Tener la seguridad de que tu función se iniciará con éxito sin causar de forma involuntaria un error o una regresión del rendimiento
- Correlacionar las versiones de las funciones con el rendimiento, identificar los problemas con versiones específicas y solucionar los problemas con mayor rapidez
- Optimizar la recopilación y el análisis de los datos y centrarte en la resolución de los problemas

## Configurar la recopilación de datos de indicadores de características

Para ver las instrucciones detalladas de configuración, consulta nuestra guía para [empezar a recopilar datos de indicadores de características][1].

El seguimiento de indicadores de características está disponible en el SDK del Navegador RUM. Para empezar, configura la [monitorización del Navegador RUM][2]. Necesitas la versión del SDK RUM del navegador 4.25.0 o posterior.

Puedes empezar a recopilar datos de indicadores de características para [soluciones personalizadas de gestión de indicadores de características][3] o utilizar uno de nuestros socios de integración. 

Admitimos integraciones con:

{{< partial name="rum/rum-feature-flag-tracking.html" >}}

</br>

Los indicadores de características aparecerán en el contexto de eventos donde se evalúen, lo que significa que deberían aparecer en las vistas en las que se ejecute la lógica del código de los indicadores de características.

## Visualizar tus indicadores de características

Una vez que hayas configurado tu recopilación de datos de indicadores de características, ve a la pestaña [**Indicadores de características**][4] en RUM.

Desde esta vista, puedes investigar cualquier duda que tengas sobre el estado y el uso de tu indicador de características.
- Monitorizar el número de usuarios que experimentan cada variante y ver estadísticas resumidas de tu indicador de características
- Comprobar el estado de tu indicador de características para ver si hay alguno que pueda eliminarse para limpiar el código
- Ver en qué páginas se evalúan tus indicadores de características

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-list-2.png" alt="Ver una lista de tus indicadores de características para investigar cualquier duda que tengas sobre el estado y el uso de tu indicador de características" style="width:90%;" >}}


### Buscar y filtrar
Busca y filtra tus indicadores de características escribiendo en la barra de búsqued utilizar la búsqueda por faceta para reducir, ampliar o cambiar tu enfoque en los subconjuntos de indicadores de características que te interesen.

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-list-search-filter.png" alt="Barra de búsqueda y filtrado de listas de indicadores de características" style="width:90%;" >}}

### Estado del indicador de función
Hay tres posibles estados de los indicadores de función:
- **Activo**: El indicador de función ha evaluado diferentes variantes durante las últimas 2 semanas
- **Inactivo**: Durante las últimas 2 semanas, sólo ha habido evaluaciones del indicador de función para tu variante de control
- **Al 100%**: Durante las últimas 2 semanas, sólo ha habido evaluaciones de indicadores de función para una de tus variantes no de control.

## Análisis de tus indicadores de función
Para obtener más información sobre el estado y el rendimiento de tu indicador de funciones, puedes hacer clic en el indicador en la lista para acceder a un dashboard de análisis de indicadores de funciones exclusivo. El dashboard de análisis de indicadores de funciones proporciona información general del rendimiento de tu indicador de funciones, mostrando información sobre sesiones de usuario, cambios en tus Core Web Vitals y tasas de error. 

Estos gráficos predefinidos se agregan a todas las variantes del indicador, lo que facilita la detección de problemas en las versiones de las funciones, antes de que se conviertan en problemas graves. El dashboard ofrece una forma sencilla de monitorizar tus lanzamientos de versiones y te permite dar marcha atrás rápidamente si detectas un problema, a fin de evitar experiencias negativas para los usuarios.

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-details-page.mp4" alt="Página de información del indicador de funciones - Información general para usuarios" video=true width=90% >}}


La pestaña **Usuarios** proporciona algunas estadísticas resumidas de alto nivel de tu indicador de función y te permite analizar en mayor medida a los usuarios que ven cada una de tus variantes de indicadores de funciones utilizando cualquier atributo. Si quieres saber que experimentó un usuario que utilizó una determinada variante frente a otra, puedes ver una [Repetición de sesión][5] para cada caso.

La pestaña **Problemas** te ofrece una vista de los errores que se están produciendo en tu aplicación en las sesiones de usuario que tienen tu indicador de función. Comprueba si se ha producido algún problema detectado por el [Seguimiento de errores][6] para una variante específica de tu indicador de función, que pueda estar relacionado con tus cambios.

La pestaña **Rendimiento** te permite entender si una de tus variantes de indicador de función ha causado un rendimiento pobre. Puedes ver tus Core Web Vitals y el tiempo de carga de cada variante para determinar si una de tus variantes puede estar causando un impacto negativo en el rendimiento de tu aplicación.

### Crear vistas personalizadas a partir de datos de indicadores de funciones utilizando el Explorador RUM
Busca en todos los datos recopilados por RUM en el [Explorador RUM][7] para ver tendencias en los indicadores de funciones, analizar patrones con mayor contexto o exportarlos a [dashboards][8] y [monitores][9]. 

Puedes buscar tus Sesiones, Vistas o Errores en el Explorador RUM con el atributo `@feature_flags.{flag_name}` para delimitar y centrarte en eventos donde los usuarios han mostrado una experiencia de usuario específica.

Puedes comparar métricas importantes para ti y tus equipos agrupando tus consultas por `@feature_flags.{flag_name}`. Por ejemplo, si quiere entender cómo tu nuevo flujo (flow) de pago está afectando a la tasa de conversión desde la página de página hasta que los usuarios realizan una compra, puedes añadir un "Agrupar por" en el gráfico de tasa de conversión.

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-rum-explorer.png" alt="Barra de búsqueda y filtrado de listas de indicador de función" style="width:90%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/guide/setup-feature-flag-data-collection/
[2]: /es/real_user_monitoring/browser#setup
[3]: /es/real_user_monitoring/guide/setup-feature-flag-data-collection/?tab=npm#custom-feature-flag-management
[4]: https://app.datadoghq.com/rum/feature-flags
[5]: /es/real_user_monitoring/session_replay/browser/
[6]: /es/real_user_monitoring/error_tracking/explorer/#explore-your-issues
[7]: https://app.datadoghq.com/rum/explorer
[8]: /es/dashboards/
[9]: /es/monitors/#create-monitors