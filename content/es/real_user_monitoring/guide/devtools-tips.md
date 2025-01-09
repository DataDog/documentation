---
further_reading:
- link: /real_user_monitoring/browser
  tag: Documentación
  text: Monitorización del Navegador RUM
- link: /logs/log_collection/javascript
  tag: Documentación
  text: Recopilación de logs del navegador
title: Consejos para utilizar herramientas de desarrollo del navegador
---

## Informaciones generales

Esta guía proporciona algunos consejos para el uso de herramientas de desarrollo (DevTools) del navegador, incluidas en los navegadores modernos para depurar aplicaciones instrumentadas con un SDK del navegador Datadog.

## Asegúrate de que el archivo y los números de línea coinciden en la consola de DevTools

El SDK del navegador instrumenta las funciones de la consola (`console.error`, pero también `.log`, `.info` y `.warn`) para recopilar datos sobre el comportamiento de la aplicación.
Esto puede provocar que la consola de DevTools muestre el número de línea y el archivo incorrectos, como se muestra a continuación:
{{< img src="real_user_monitoring/guide/devtools-tips/issue_console.png" alt="Consola de DevTools que muestra un problema de archivo y número de línea incorrectos en una sentencia console.error.">}}

En la imagen anterior, la función `console.error` está instrumentada. Observa que en lugar de mostrar el archivo real y el número de línea en que se ha llamado a esta sentencia, `VM505:1`, la consola muestra `datadog-rum.js:1`.

### Añadir scripts a la lista de ignorados de tu navegador para mostrar el archivo y el número de línea correctos

La mayoría de los navegadores permiten a los desarrolladores seleccionar scripts y añadirlos a una lista de ignorados. Para mostrar el archivo y el número de línea correctos, puedes añadir los siguientes scripts a la lista de ignorados de tu navegador: `datadog-rum*.js` y `datadog-logs*.js`.

A continuación se muestra un ejemplo de dónde encontrar esta función en Google Chrome.
{{< img src="real_user_monitoring/guide/devtools-tips/script_ignore_list.png" alt="Cómo añadir un script a la lista de ignorados en Google Chrome.">}}

En la pestaña de la consola, expande el resultado de la sentencia de la consola. Haz clic con el botón derecho en cada script que quieras ignorar y selecciona la opción **Añadir script a la lista de ignorados**.
**Nota**: La lista de ignorados se puede gestionar en **Herramientas de desarrollo > Configuración > Lista de ignorados**

Este método funciona bien cuando se utilizan los [métodos de instalación CDN (sínc/asínc)][3]. Si utilizas el método del paquete NPM, asegúrate de que tienes `sourcemaps` habilitado. De lo contrario, el código del SDK puede estar empaquetado con el código de tu aplicación, lo que impide que DevTools ignore el SDK.

En el panel de red, puedes ver otra de las ventajas de utilizar la lista de ignorados:
{{< img src="real_user_monitoring/guide/devtools-tips/network_initiator.png" alt="El iniciador de red se muestra correctamente después de añadir scripts a la lista de ignorados.">}}

En lugar de mostrar el SDK del navegador como iniciador de la solicitud, se muestran el archivo y el número de línea correctos para la aplicación.

## Eliminación del ruido en la pestaña de red

Los SDK del navegador envían varias solicitudes de red para registrar el comportamiento de una aplicación. Esto puede generar un número significativo de líneas en la pestaña de red, lo que dificulta la identificación de las solicitudes iniciadas por tu aplicación. La mayoría de los navegadores permiten filtrar las solicitudes procedentes de los SDK del navegador.

A continuación se muestra un ejemplo de esta función en Google Chrome:
{{< img src="real_user_monitoring/guide/devtools-tips/network_ignore_intake.png" alt="Panel de red filtrando solicitudes de los SDK del navegador.">}}

En la pestaña de red, añade un filtro con el formato `-url:ingesta-datadoghq.com` (actualiza el patrón para que coincida con la url de [admisión de tu centro de datos][1] o con la de tu [proxy][2]).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/site
[2]: /es/real_user_monitoring/guide/proxy-rum-data
[3]: /es/real_user_monitoring/browser/setup/#choose-the-right-installation-method