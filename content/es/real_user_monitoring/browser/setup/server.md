---
beta: true
code_lang: servidor
code_lang_weight: 2
further_reading:
- link: /real_user_monitoring/explorer/
  tag: Documentación
  text: Más información sobre el Explorador RUM
- link: /logs/log_collection/javascript/
  tag: Documentación
  text: Información sobre el SDK del navegador para logs de Datadog
title: Instrumentación automática de la monitorización de navegadores (del lado del
  servidor)
type: lenguaje de código múltiple
---

<div class="alert alert-info">Para probar la vista previa de la inyección automática de SDK RUM, sigue las instrucciones de configuración que aparecen a continuación.</div>

## Información general

La instrumentación automática RUM Datadog (del lado del servidor) te permite optar por Real User Monitoring (RUM) automáticamente instrumentando aplicaciones web servidas a través de un servidor web o proxy.

La instrumentación automática RUM funciona inyectando un scriptlet JavaScript del SDK RUM en las respuestas HTML que se sirven a través de un servidor web o proxy.

Una vez instrumentadas tus aplicaciones, puedes configurar tu aplicación RUM en Datadog.

## Limitaciones

La funcionalidad disponible tiene las siguientes limitaciones importantes:

- Si se aplica un proxy para el tráfico comprimido, el método de instrumentación automática no puede inyectar el scriptlet JS en el tráfico HTML.
- Este método de instrumentación no admite ninguna [configuración de RUM avanzada][3]. Sin embargo, se admiten `allowedTracingUrls` y `excludedActivityUrls`.
- Si el servidor web actúa como proxy y el servidor ascendente tiene activado el cifrado de extremo a extremo (como TLS) o la compresión de contenidos (como gzip, zstd o Brotli), es posible que el módulo no inyecte el SDK del navegador RUM. Asegúrate de lo siguiente para que la instrumentación tenga éxito:
  - La compresión de contenidos está desactivada en el servidor ascendente.
  - El servidor web está configurado para originar TLS.
- La configuración para la instrumentación automática (sólo Windows IIS) sólo está disponible por cada sitio Windows IIS.

## Requisitos previos

El método de instalación automática requiere que tengas instalado el [Datadog Agent][2].

## Configurar tu aplicación RUM

<div class="alert alert-warning">Para solicitar asistencia con un servidor web que no figura en esta lista, <a href="https://www.datadoghq.com/private-beta/rum-sdk-auto-injection/">rellena este formulario.</a></div>

{{< tabs >}}
{{% tab "NGINX" %}}

El método de instrumentación automática aprovecha la [capacidad de los módulos dinámicos NGINX][1] para implementar un filtro de cuerpo de respuesta. El filtro inyecta el SDK del navegador RUM en el cuerpo de la respuesta para las respuestas
identificadas como HTML. Para un control más granular de la gestión de los archivos de configuración o los permisos, también puedes instalar NGINX manualmente.

[1]: https://docs.nginx.com/nginx/admin-guide/dynamic-modules/dynamic-modules/


{{% collapse-content title="Instalación automática (recomendado)" level="h5" %}}

Para instrumentar automáticamente tu aplicación RUM:

1. En Datadog, ve a [**Digital Experience > Add an Application Page** (Experiencia digital > Añadir una página de aplicación)][1] y selecciona el tipo de aplicación JavaScript (JS).
2. Selecciona **Instrumentación automática** y **NGINX**.
3. Configura las frecuencias de muestreo de tu sesión y de Session Replay. Consulta la [guía para la configuración del muestreo][2].
4. Copia y ejecuta el comando de instalación para cargar el módulo NGINX Datadog con el inyector de SDK RUM en NGINX.
5. Una vez que el instalador haya instalado correctamente el inyector de SDK, reinicia NGINX para comenzar a recopilar sesiones RUM.
6. (Opcional) Para comprobar que el módulo está inyectando correctamente el SDK del navegador RUM en páginas HTML, consulta los logs de error de NGINX para ver si hay mensajes importantes. El módulo registra pasos importantes durante el proceso de inyección. Asegúrate de que NGINX está configurado con al menos el nivel de log `INFO` con lo siguiente:

   ```javascript
   error_log <file> info;
   ```

[1]: https://app.datadoghq.com/rum/list
[2]: /es/real_user_monitoring/guide/sampling-browser-plans/

{{% /collapse-content %}}

{{% collapse-content title="Configuración manual" level="h5" %}}

### Descarga el archivo `.tgz` correspondiente

1. Utiliza el archivo `.tgz` correspondiente a tu versión de NGINX. Puedes encontrar todos los archivos `.tgz` relevantes presentados por versión de NGINX en [Referencia](#reference).
2. Extrae el tarball para extraer el archivo `ngx_http_datadog_module.so`. Desplázalo hacia una localización a la que NGINX tenga acceso (citada como `<RUM_MODULE_PATH>` en los pasos siguientes).

### Actualizar la configuración de NGINX
1. El archivo `nginx.conf` se encuentra normalmente en el directorio de configuración de NGINX. Añade la siguiente línea para cargar el módulo:

   ```javascript
   load_module <RUM_MODULE_PATH>;
   ```

2. A continuación, en la sección **http/server/location**, añade lo siguiente:

   ```javascript
   # APM Tracing is enabled by default. The following line disables APM Tracing.
   datadog_disable;
   datadog_rum on;
   datadog_rum_config "v5" {
     "applicationId" "<DATADOG_APPLICATION_ID>";
     "clientToken" "<DATADOG_CLIENT_TOKEN>";
     "site" "<DATADOG_SITE>";
     "service" "my-web-application";
     "env" "production";
     "version" "1.0.0";
     "sessionSampleRate" "100";
     "sessionReplaySampleRate" "100";
     "trackResources" "true";
     "trackLongTasks" "true";
     "trackUserInteractions" "true";
   }
   ```

### Reiniciar el servidor

1. Reinicia el servidor NGINX para comenzar a recopilar datos de tu aplicación RUM Datadog. Por defecto, el SDK RUM se inyecta en todos los documentos HTML. Es posible que necesites borrar la memoria caché de tu navegador.
2. (Opcional) Para comprobar que el módulo está inyectando correctamente el SDK del navegador RUM en páginas HTML, consulta los logs de error de NGINX para ver si hay mensajes importantes. El módulo registra pasos importantes durante el proceso de inyección. Asegúrate de que NGINX está configurado con al menos el nivel de log `INFO` con lo siguiente:

   ```javascript
   error_log <file> info;
   ```

{{% /collapse-content %}}

{{% /tab %}}
{{% tab "Servidor HTTP Apache" %}}

El método de instrumentación automática aprovecha la [capacidad de los módulos httpd Apache][1] para implementar un filtro de cuerpo de respuesta. El filtro inyecta el SDK del navegador RUM en el cuerpo de la respuesta para las respuestas
identificadas como HTML. Para un control más granular de la gestión de los archivos de configuración o los permisos, también puedes instalar NGINX manualmente.

[1]: https://httpd.apache.org/modules/


{{% collapse-content title="Instalación automática (recomendado)" level="h5" %}}

Para instrumentar automáticamente tu aplicación RUM:

1. En Datadog, ve a [**Digital Experience > Add an Application Page** (Experiencia digital > Añadir una página de aplicación)][1] y selecciona el tipo de aplicación JavaScript (JS).
2. Selecciona **Instrumentación automática** y **httpd**.
3. Configura las frecuencias de muestreo de tu sesión y de Session Replay. Consulta la [guía para la configuración del muestreo][2].
4. Copia y ejecuta el comando de instalación para cargar el módulo httpd Datadog con el inyector de SDK RUM en httpd.
5. Una vez que el instalador haya instalado correctamente el inyector de SDK, reinicia httpd para comenzar a recopilar sesiones RUM.
6. (Opcional) Para comprobar que el módulo está inyectando correctamente el SDK del navegador RUM en páginas HTML, consulta los logs de error de httpd para ver si hay mensajes importantes. El módulo registra pasos importantes durante el proceso de inyección. Asegúrate de que el servidor HTTP APache está configurado con al menos el nivel de log `info` con lo siguiente:

[1]: https://app.datadoghq.com/rum/list
[2]: /es/real_user_monitoring/guide/sampling-browser-plans/

{{% /collapse-content %}}

{{% collapse-content title="Configuración manual" level="h5" %}}

### Descargar el archivo del módulo

1. Descarga el [módulo comprimido][1].
2. Extrae el zip para obtener el archivo `mod_datadog.so`. Desplázalo hacia una localización a la que tenga acceso el servidor HTTP Apache (citada como `<RUM_MODULE_PATH>` en los pasos siguientes).

[1]: https://rum-auto-instrumentation.s3.amazonaws.com/httpd/latest/mod_datadog-amd64.zip

### Actualizar la configuración del servidor HTTP Apache
1. Busca el archivo de configuración. Puedes utilizar `apachectl -V` para encontrar la ruta de configuración por defecto. Añade la siguiente línea para cargar el módulo:

   ```javascript
   LoadModule datadog_module <RUM_MODULE_PATH>
   ```

2. En la sección **raíz o localización** correspondiente, añade lo siguiente:

   ```javascript
   # APM Tracing is enabled by default. The following line disables APM Tracing
   DatadogTracing Off
   DatadogRum On
   <DatadogRumSettings>
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

{{% /collapse-content %}}

{{% /tab %}}
{{% tab "Windows IIS" %}}

La instrumentación automática aprovecha un módulo de Windows que inyecta el SDK RUM en el cuerpo de la respuesta para las respuestas servidas por la instancia IIS.

1. En Datadog, ve a [**Digital Experience > Add an Application Page** (Experiencia digital > Añadir una página de aplicación)][1] y selecciona el tipo de aplicación JavaScript (JS).
2. Selecciona **Instrumentación automática** y **Windows IIS**.
3. Configura el módulo IIS utilizando el instalador GUI o la línea de comandos como se describe a continuación:

[1]: https://app.datadoghq.com/rum/list/create/

{{% collapse-content title="Uso del instalador GUI (recomendado)" level="h5" %}}

1. Descarga el instalador RUM Datadog.
2. Sigue el instalador como administrador abriendo el archivo `.msi`.
3. Sigue las instrucciones y acepta el acuerdo de licencia.
4. Configura las frecuencias de muestreo de tu sesión y de Session Replay. Consulta la [guía para la configuración del muestreo][1].
5. Copia y ejecuta el comando de configuración mostrado para cada sitio IIS en el que quieres inyectar RUM.

[1]: /es/real_user_monitoring/guide/best-practices-for-rum-sampling/

{{% /collapse-content %}}

{{% collapse-content title="Uso de la línea de comandos" level="h5" %}}

1. Ejecuta la línea de comandos Powershell como administrador.
2. Configura las frecuencias de muestreo de tu sesión y de Session Replay. Consulta la [guía para la configuración del muestreo][1].
3. Copia y ejecuta el comando de configuración mostrado para cada sitio IIS en el que quieres inyectar RUM.

[1]: /es/real_user_monitoring/guide/best-practices-for-rum-sampling/

{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

## Actualización de la aplicación RUM

Puedes ajustar las frecuencias de muestreo de tu sesión y de Session Replay desde la página Gestión de aplicaciones.

{{< tabs >}}
{{% tab "NGINX" %}}

Para actualizar tu solicitud RUM:

1. Ve a tu aplicación RUM desde la lista de [Gestión de aplicaciones][1].
2. En la página Instrumentar tu aplicación, ajusta el control deslizante o introduce un porcentaje específico en el cuadro de entrada para el muestreo de sesiones o de Session Replay.
3. Copia y pega el fragmento de configuración en tu archivo `NGINX.conf`.

[1]: https://app.datadoghq.com/rum/list

{{% /tab %}}

{{% tab "Apache HTTP Server" (Servidor HTTP Apache) %}}

Para actualizar tu solicitud RUM:

1. Ve a tu aplicación RUM desde la lista de [Gestión de aplicaciones][1].
2. En la página Instrumentar tu aplicación, ajusta el control deslizante o introduce un porcentaje específico en el cuadro de entrada para el muestreo de sesiones o de Session Replay.
3. Copia y pega el fragmento de configuración en tu archivo `/opt/datadog-httpd/datadog.conf`.

[1]: https://app.datadoghq.com/rum/list

{{% /tab %}}

{{% tab "Windows IIS" %}}

Para actualizar tu solicitud RUM:

1. Ve a tu aplicación RUM desde la lista de [Gestión de aplicaciones][1].
2. En la página Instrumentar tu aplicación, ajusta el control deslizante o introduce un porcentaje específico en el cuadro de entrada para el muestreo de sesiones o de Session Replay.
3. Copia y sustituye el código en el archivo de configuración de RUM Datadog para el sitio IIS que hayas instrumentado.

[1]: https://app.datadoghq.com/rum/list

{{% /tab %}}
{{< /tabs >}}

## Solucionar problemas

### NGINX deja de responder

Dado que el módulo se encuentra en versión de vista previa, es posible que NGINX deje de servir solicitudes, especialmente después de la instalación. Si experimentas este problema, ponte en contacto con el [servicio de asistencia de Datadog][4] con la siguiente información, para ayudar con la investigación y resolución del problema:

- Tu archivo de configuración de NGINX
- Cualquier log de error relevante

### No se inyecta RUM

Si observas que RUM no se inyecta en las páginas HTML, considera las siguientes causas posibles:

- **No coincide el tipo de contenido**: RUM sólo se inyecta en páginas HTML. Si la cabecera `Content-Type` no indica correctamente `text/html`, se omite la inyección.
- **Servidor de flujo ascendente con cifrado de extremo a extremo o compresión de contenidos**: Consulta [Limitaciones][41].

## Referencia

### Módulos NGINX

| Versión de NGINX | amd64 | arm 64 |
|---------------|-------|--------|
| 1.22.0 | [ngx_http_datadog-amd64-1.22.0][5] | [ngx_http_datadog-arm64-1.22.0][6] |
| 1.22.1 | [ngx_http_datadog-amd64-1.22.1][7] | [ngx_http_datadog-arm64-1.22.1][8] |
| 1.23.0 | [ngx_http_datadog-amd64-1.23.0][9] | [ngx_http_datadog-arm64-1.23.0][10] |
| 1.23.1 | [ngx_http_datadog-amd64-1.23.1][11] | [ngx_http_datadog-arm64-1.23.1][12] |
| 1.23.2 | [ngx_http_datadog-amd64-1.23.2][13] | [ngx_http_datadog-arm64-1.23.2][14] |
| 1.23.3 | [ngx_http_datadog-amd64-1.23.3][15] | [ngx_http_datadog-arm64-1.23.3][16] |
| 1.23.4 | [ngx_http_datadog-amd64-1.23.4][17] | [ngx_http_datadog-arm64-1.23.4][18] |
| 1.24.0 | [ngx_http_datadog-amd64-1.24.0][19] | [ngx_http_datadog-arm64-1.24.0][20] |
| 1.25.0 | [ngx_http_datadog-amd64-1.25.0][21] | [ngx_http_datadog-arm64-1.25.0][22] |
| 1.25.1 | [ngx_http_datadog-amd64-1.25.1][23] | [ngx_http_datadog-arm64-1.25.1][24] |
| 1.25.2 | [ngx_http_datadog-amd64-1.25.2][25] | [ngx_http_datadog-arm64-1.25.2][26] |
| 1.25.3 | [ngx_http_datadog-amd64-1.25.3][27] | [ngx_http_datadog-arm64-1.25.3][28] |
| 1.25.4 | [ngx_http_datadog-amd64-1.25.4][29] | [ngx_http_datadog-arm64-1.25.4][30] |
| 1.25.5 | [ngx_http_datadog-amd64-1.25.5][31] | [ngx_http_datadog-arm64-1.25.5][32] |
| 1.26.0 | [ngx_http_datadog-amd64-1.26.0][33] | [ngx_http_datadog-arm64-1.26.0][34] |
| 1.26.1 | [ngx_http_datadog-amd64-1.26.1][35] | [ngx_http_datadog-arm64-1.26.1][36] |
| 1.26.2 | [ngx_http_datadog-amd64-1.26.2][37] | [ngx_http_datadog-arm64-1.26.2][38] |
| 1.27.0 | [ngx_http_datadog-amd64-1.27.0][39] | [ngx_http_datadog-arm64-1.27.0][40] |

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/browser/setup/
[2]: /es/agent/
[3]: /es/real_user_monitoring/browser/advanced_configuration/
[4]: /es/help
[5]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.22.0.so.tgz
[6]:https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.22.0.so.tgz
[7]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.22.1.so.tgz
[8]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.22.1.so.tgz
[9]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.23.0.so.tgz
[10]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.23.0.so.tgz
[11]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.23.1.so.tgz
[12]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.23.1.so.tgz
[13]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.23.2.so.tgz
[14]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.23.2.so.tgz
[15]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.23.3.so.tgz
[16]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.23.3.so.tgz
[17]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.23.4.so.tgz
[18]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.23.4.so.tgz
[19]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.24.0.so.tgz
[20]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.24.0.so.tgz
[21]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.25.0.so.tgz
[22]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.25.0.so.tgz
[23]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.25.1.so.tgz
[24]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.25.1.so.tgz
[25]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.25.2.so.tgz
[26]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.25.2.so.tgz
[27]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.25.3.so.tgz
[28]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.25.3.so.tgz
[29]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.25.4.so.tgz
[30]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.25.4.so.tgz
[31]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.25.5.so.tgz
[32]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.25.5.so.tgz
[33]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.26.0.so.tgz
[34]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.26.0.so.tgz
[35]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.26.1.so.tgz
[36]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.26.1.so.tgz
[37]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.26.2.so.tgz
[38]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.26.2.so.tgz
[39]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.27.0.so.tgz
[40]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.27.0.so.tgz
[41]: /es/real_user_monitoring/browser/setup/server/#limitations