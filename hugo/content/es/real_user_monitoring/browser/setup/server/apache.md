---
beta: true
code_lang: apache
code_lang_weight: 3
description: Configura Apache httpd Server para inyectar automáticamente el SDK del
  navegador RUM en las respuestas HTML utilizando el módulo Datadog.
further_reading:
- link: /real_user_monitoring/browser/setup/server/
  tag: Documentación
  text: Instrumentación automática de la monitorización de navegadores
title: Instrumentación de Apache Server
type: lenguaje de código múltiple
---

<div class="alert alert-info">Para probar la vista previa de la Instrumentación automática RUM, sigue las instrucciones de esta página.</div>

## Información general

La Instrumentación automática de RUM funciona inyectando el SDK del navegador RUM en las respuestas HTML que se entregan a través de un servidor web o proxy. Este método aprovecha la [funcionalidad de los módulos httpd de Apache][3] para implementar un filtro de cuerpo de respuesta. El filtro inyecta el SDK del navegador RUM en el cuerpo de la respuesta de aquellas respuestas identificadas como HTML. Una vez configurada la instrumentación automática, puedes gestionar las configuraciones desde la interfaz de usuario.

Para conocer las limitaciones importantes y los requisitos de compatibilidad, consulta [Limitaciones][1].

## Requisitos previos

El [Datadog Agent][2] está instalado y configurado.

## Configurar tu aplicación RUM

Para instrumentar automáticamente tu aplicación RUM:

1. En Datadog, ve a **Digital Experience > Manage Applications Page** (Experiencia digital > Página de gestión de aplicaciones), haz clic en [**New Application** (Nueva aplicación)][4] y selecciona el tipo de aplicación JavaScript (JS).
2. Selecciona **Auto-Instrumentación** (Instrumentación automática) y **Apache httpd** (httpd Apache).
3. Configura los parámetros de tu aplicación. Consulta el [ejemplo de guía de configuración][5].
4. Copia y ejecuta el comando de instalación para cargar el módulo httpd Datadog con el inyector de SDK RUM en httpd.
5. Una vez que el instalador haya instalado correctamente el inyector de SDK, reinicia httpd para comenzar a recopilar sesiones RUM.
6. (Opcional) Para comprobar que el módulo está inyectando correctamente el SDK del navegador RUM en páginas HTML, consulta los logs de error de httpd para ver si hay mensajes importantes. El módulo registra pasos importantes durante el proceso de inyección. Asegúrate de que el servidor HTTP APache está configurado con al menos el nivel de log `info` con lo siguiente:

También puedes instalar y configurar [manualmente](#alternative-installation-method) el módulo.

## Actualización de la aplicación RUM

Puedes ajustar las frecuencias de muestreo de tus sesiones y de Session Replay desde la página Gestión de aplicaciones.

Para actualizar tu solicitud RUM:

1. Ve a tu aplicación RUM desde la lista de [Gestión de aplicaciones][4].
2. En la página de **Configuración del SDK**, ajusta el control deslizante o introduce un porcentaje específico en el campo de entrada de Session Sampling o Session Replay Sampling.
3. Copia y pega el fragmento de configuración en tu archivo `/opt/datadog-httpd/datadog.conf`.

## Solucionar problemas

### No se inyecta RUM

Si observas que RUM no se inyecta en las páginas HTML, considera las siguientes causas posibles:

- **No coincide el tipo de contenido**: RUM sólo se inyecta en páginas HTML. Si la cabecera `Content-Type` no indica correctamente `text/html`, se omite la inyección.

### Limitaciones

Consulta otras [limitaciones][1].

## Desinstalar

Para eliminar manualmente RUM de tu servidor web instrumentado automáticamente:

1. Busca el archivo de configuración de Apache (`httpd`) ejecutando `httpd -V`. Dependiendo de la distribución Linux utilizada, este archivo binario podría llamarse `http`, `apachectl`, `apache2` o `apache2ctl`. En los pasos siguientes se utiliza `httpd` como ejemplo. En este caso, la ubicación del archivo podría ser: `/usr/local/apache2/conf/httpd.conf`.
2. Al final del archivo de configuración httpd, elimina la línea: `Include /opt/datadog-httpd/datadog.conf`.
3. Elimina el directorio `/opt/datadog-httpd/` y todo su contenido.
4. Reinicia o recarga Apache httpd.

## Método de instalación alternativo

Si necesitas un control más preciso de más parámetros que los que proporciona la instrumentación automática, puedes cargar manualmente el módulo en tu servidor web, en lugar de ejecutar el script de instalación.

Para instrumentar manualmente tu aplicación RUM:

### Descargar el archivo del módulo

1. Descarga el [módulo comprimido][6].
2. Extrae el zip para obtener el archivo `mod_datadog.so`. Desplázalo hacia una localización a la que tenga acceso el servidor HTTP Apache (citada como `<RUM_MODULE_PATH>` en los pasos siguientes).

### Actualizar la configuración del servidor HTTP Apache

1. Busca el archivo de configuración. Puedes utilizar `apachectl -V` para encontrar la ruta de configuración por defecto. Añade la siguiente línea para cargar el módulo:

   ```javascript
   LoadModule datadog_module <RUM_MODULE_PATH>
   ```

2. En la sección **root** (raíz) o **location** (ubicación) correspondiente, añade lo siguiente:

   ```javascript
   # APM Tracing is enabled by default. The following line disables APM Tracing
   DatadogTracing Off
   DatadogRum On
   <DatadogRumSettings "v6">
       DatadogRumOption "applicationId" "<DATADOG_APPLICATION_ID>"
       DatadogRumOption "clientToken" "<DATADOG_CLIENT_TOKEN>"
       DatadogRumOption "site" "<DATADOG_SITE>"
       DatadogRumOption "service" "my-web-application"
       DatadogRumOption "env" "production"
       DatadogRumOption "version" "1.0.0"
       DatadogRumOption "sessionSampleRate" "100"
       DatadogRumOption "sessionReplaySampleRate" "100"
       DatadogRumOption "trackResources" "true"
       DatadogRumOption "trackLongTasks" "true"
       DatadogRumOption "trackUserInteractions" "true"
   </DatadogRumSettings>
   ```

### Reiniciar el servidor

1. Reinicia el servidor HTTP Apache para comenzar a recopilar datos de tu aplicación RUM Datadog. Por defecto, el SDK RUM se inyecta en todos los documentos HTML. Es posible que necesites borrar la memoria caché de tu navegador.
2. (Opcional) Para comprobar que el módulo está inyectando correctamente el SDK del navegador RUM en páginas HTML, consulta los logs de error de httpd para ver si hay mensajes importantes. El módulo registra pasos importantes durante el proceso de inyección. Asegúrate de que el servidor HTTP Apache está configurado con al menos el nivel de log `info` con lo siguiente:

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/browser/setup/server/#limitations
[2]: /es/agent/
[3]: https://httpd.apache.org/modules/
[4]: https://app.datadoghq.com/rum/list
[5]: /es/real_user_monitoring/guide/sampling-browser-plans/
[6]: https://rum-auto-instrumentation.s3.amazonaws.com/httpd/latest/mod_datadog-amd64.zip