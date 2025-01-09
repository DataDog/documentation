---
aliases:
- /es/real_user_monitoring/guide/getting-started-rum-deployment-tracking/
description: Aprender a configurar RUM para capturar nuevas versiones, realizar un
  seguimiento de tus despliegues y analizar el rendimiento en Datadog
further_reading:
- link: /real_user_monitoring/explorer
  tag: Documentación
  text: Visualización de tus datos RUM en el Explorador RUM
- link: /tracing/version_tracking
  tag: Documentación
  text: Uso de etiquetas (tags) de versión en APM de Datadog para monitorizar despliegues
- link: https://www.datadoghq.com/blog/datadog-rum-deployment-tracking
  tag: Blog
  text: Solucionar problemas de despliegues de frontend fallidos con el Seguimiento
    de despliegues en RUM
title: Empezando con el Seguimiento de despliegues en RUM
---


## Información general
A medida que los equipos iteran y despliegan código rápidamente, puede ser difícil encontrar el cambio exacto que causó un pico de errores o tiempos de carga de página más lentos. El Seguimiento de despliegues en RUM te permite identificar cuándo un despliegue o versión reciente está causando problemas de rendimiento en tu aplicación y te ayuda a identificar el origen del problema.

## Configuración
Puedes utilizar la etiqueta `version` para monitorizar despliegues y comportamientos de servicios para apoyar tu estrategia de despliegue de software. Para empezar con el seguimiento de despliegues en RUM debes añadir versiones de RUM a tu aplicación.

### Navegador RUM
{{< tabs >}}
{{% tab "npm" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

// Initialize Datadog Browser SDK
datadogRum.init({
  ...
  version: '1.0.0',
  ...
});
```

{{% /tab %}}
{{% tab "CDN asíncrono" %}}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      ...
      version: '1.0.0',
      ...
    })
})
```

{{% /tab %}}
{{% tab "CDN síncrono" %}}

```javascript
window.DD_RUM &&
    window.DD_RUM.init({
      ...
      version: '1.0.0',
      ...
    })
```
{{% /tab %}}
{{< /tabs >}}

### RUM móvil

#### RUM Android

La etiqueta de versión se captura automáticamente del manifiesto de la aplicación.

#### RUM iOS

La etiqueta de versión se captura automáticamente de `info.plist` de la aplicación.

## Análisis del rendimiento de tu despliegue en RUM

{{< tabs >}}
{{% tab "Navegador RUM" %}}

### Uso de etiquetas de versión en la página de información general de la aplicación

Una aplicación configurada con etiquetas de versión tiene una sección **Seguimiento de despliegues** en la página de información general de la aplicación. La sección **Seguimiento de despliegues** muestra todas las versiones de la aplicación y los servicios que estuvieron activas durante el intervalo de tiempo seleccionado.

Esto te permite restaurar a las versiones candidatas, en cuanto detectas un problema, para evitar experiencias negativas de los usuarios. Estos gráficos predefinidos se agregan a todas las versiones, lo que facilita la identificación de problemas en la aplicación antes de que se conviertan en problemas graves.

Podrás ver:
- Tiempo de carga P75 por versión
- Total de sesiones de usuario por versión
- Porcentaje de errores por versión

En la tabla que figura a continuación de estos widgets, podrás ver:
- Los nombres de las versiones desplegadas para la aplicación y sus servicios a lo largo del marco temporal.
- Número de sesiones de usuario para esa versión
- Promedio de errores por vista
- Tiempo de carga P75
- P75 para Core Web Vitals

Estos widgets se pueden exportar a dashboards y monitores.

{{< img src="real_user_monitoring/guide/setup-rum-deployment-tracking/browser-rum-app-overview-deployment-tracking.png" alt="Seguimiento de despliegues del navegador en la información general de la aplicación RUM" style="width:100%;">}}


### Comparación de despliegues

Haz clic en cualquier fila de versiones de la tabla **Lista de Versiones*** para abrir una página de comparación de versiones, que te permitirá comparar dos versiones del mismo servicio. Por defecto, la versión seleccionada se compara con todas las versiones anteriores. Puedes cambiar la selección para comparar dos versiones cualesquiera en los últimos 30 días.

De forma similar a los gráficos de la página **Información general de la aplicación**, los gráficos **Sesiones de usuario**, **Core Web Vitals** y **Errores** muestran una descripción general del lanzamiento de un despliegue o picos en las tasas de error. En esta página, los gráficos resaltan las versiones seleccionadas para su comparación y muestran todas las demás versiones en gris para ofrecer un contexto adicional.

A medida que monitorizas tu versión, esto te ayuda a comparar el rendimiento de los despliegues de código con el código existente para verificar que el nuevo código funciona correctamente y que no han aparecido nuevos errores entre una versión y otra.

{{< img src="real_user_monitoring/guide/setup-rum-deployment-tracking/browser-deployment-tracking-comparison.png" alt="Comparación del seguimiento de despliegues del navegador" style="width:75%;">}}

La pestaña **Problemas** enumera las diferencias en los errores detectados para cada una de las dos versiones, destacando:
- Recuento de errores por versión
- % de vistas con errores por versión
- Problemas de seguimiento de errores

{{< img src="real_user_monitoring/guide/setup-rum-deployment-tracking/browser-deployment-tracking-comparison-error.png" alt="Errores de comparación del seguimiento de despliegues en el navegador" style="width:75%;">}}

### Explorar los powerpacks de seguimiento de despliegues en RUM
Puedes añadir el seguimiento del despliegue de tus servicios RUM a dashboards utilizando el menú de powerpacks en un dashboard y buscando el powerpack "Seguimiento de la versión de despliegue". A continuación, puedes iterar y añadir cualquier otro widget a tus dashboards para ayudar a tus equipos a lanzar nuevas características de forma segura.

{{< img src="real_user_monitoring/guide/setup-rum-deployment-tracking/browser-deployment-tracking-powerpack.png" alt="Powerpack de seguimiento de despliegues en el navegador" style="width:75%;">}}

{{% /tab %}}
{{% tab "RUM móvil" %}}

### Uso de etiquetas de versión en la página de información general de la aplicación

Una aplicación configurada con etiquetas de versión tiene una sección **Seguimiento de despliegues** en la página de información general de la aplicación. La sección **Seguimiento de despliegues** muestra todas las versiones de la aplicación y los servicios que estuvieron activas durante el intervalo de tiempo seleccionado.

Esto te permite restaurar a las versiones candidatas, en cuanto detectas un problema, para evitar experiencias negativas de los usuarios. Estos gráficos predefinidos se agregan a todas las versiones, lo que facilita la identificación de problemas en la aplicación antes de que se conviertan en problemas graves.

Podrás ver:
- Tiempo medio de inicio de la aplicación por versión
- Total de sesiones de usuario por versión
- Porcentaje de errores por versión

En la tabla que figura a continuación de estos widgets, podrás ver:
- Los nombres de las versiones desplegadas para la aplicación y sus servicios a lo largo del marco temporal.
- Número de lanzamientos de aplicaciones para esa versión
- Tasa de error
- Tasa de fallos
- Hora de inicio de la aplicación P90

Estos widgets se pueden exportar a dashboards y monitores.

{{< img src="real_user_monitoring/guide/setup-rum-deployment-tracking/mobile-rum-app-overview-deployment-tracking.png" alt="Seguimiento móvil de despliegues en la información general de la aplicación RUM" style="width:100%;">}}

### Comparación de despliegues

Haz clic en cualquier fila de versiones de la tabla **Lista de Versiones*** para abrir una página de comparación de versiones, que te permitirá comparar dos versiones del mismo servicio. Por defecto, la versión seleccionada se compara con todas las versiones anteriores. Puedes cambiar la selección para comparar dos versiones cualesquiera en los últimos 30 días.

De forma similar a los gráficos de la página **Información general de la aplicación**, los gráficos **Sesiones de usuario**, **Core Web Vitals** y **Errores** muestran una descripción general del lanzamiento de un despliegue o picos en las tasas de error. En esta página, los gráficos resaltan las versiones seleccionadas para su comparación y muestran todas las demás versiones en gris para ofrecer un contexto adicional.

A medida que monitorizas tu versión, esto te ayuda a comparar el rendimiento de los despliegues de código con el código existente para verificar que el nuevo código funciona correctamente y que no han aparecido nuevos errores entre una versión y otra.

{{< img src="real_user_monitoring/guide/setup-rum-deployment-tracking/mobile-deployment-tracking-comparison.png" alt="Comparación del seguimiento móvil de despliegues" style="width:75%;">}}

La pestaña **Problemas** enumera las diferencias en los errores detectados para cada una de las dos versiones, destacando:
- Recuento de errores por versión
- % de vistas con errores por versión
- Problemas de seguimiento de errores

{{< img src="real_user_monitoring/guide/setup-rum-deployment-tracking/mobile-deployment-tracking-comparison-error.png" alt="Errores de comparación del seguimiento móvil de despliegues" style="width:75%;">}}

### Explorar los powerpacks de seguimiento de despliegues en RUM
Puedes añadir el seguimiento del despliegue de tus servicios RUM a dashboards utilizando el menú de powerpacks en un dashboard y buscando el powerpack "Seguimiento de la versión de despliegue". A continuación, puedes iterar y añadir cualquier otro widget a tus dashboards para ayudar a tus equipos a lanzar nuevas características de forma segura.

{{< img src="real_user_monitoring/guide/setup-rum-deployment-tracking/mobile-deployment-tracking-powerpack.png" alt="Powerpack de seguimiento de despliegues en el navegador" style="width:75%;">}}


{{% /tab %}}
{{< /tabs >}}

## Referencias adicionales
{{< partial name="whats-next/whats-next.html" >}}