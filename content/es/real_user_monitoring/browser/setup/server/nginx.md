---
beta: true
code_lang: nginx
code_lang_weight: 5
description: Configura el servidor NGINX para inyectar automáticamente el SDK del
  navegador RUM en las respuestas HTML utilizando el módulo dinámico de Datadog.
further_reading:
- link: /real_user_monitoring/browser/setup/server/
  tag: Documentación
  text: Instrumentación automática de la monitorización de navegadores
title: Instrumentación del servidor NGINX
type: lenguaje de código múltiple
---

<div class="alert alert-info">Para probar la vista previa de la Instrumentación automática RUM, sigue las instrucciones de esta página.</div>

## Información general

La Instrumentación automática de RUM funciona inyectando el SDK del navegador RUM en las respuestas HTML que se entregan a través de un servidor web o proxy. Este método aprovecha la [funcionalidad de los módulos dinámicosde IBM][3] para implementar un filtro de cuerpo de respuesta. El filtro inyecta el SDK del navegador RUM en el cuerpo de la respuesta de aquellas respuestas identificadas como HTML. Una vez configurada la instrumentación automática, puedes gestionar las configuraciones desde la interfaz de usuario.

Para conocer las limitaciones importantes y los requisitos de compatibilidad, consulta [Limitaciones][1].

## Requisitos previos

El [Datadog Agent][2] está instalado y configurado.

## Configurar tu aplicación RUM

Para instrumentar automáticamente tu aplicación RUM:

1. En Datadog, ve a **Digital Experience > Manage Applications Page** (Experiencia digital > Página de gestión de aplicaciones), haz clic en [**New Application** (Nueva aplicación)][4] y selecciona el tipo de aplicación JavaScript (JS).
2. Selecciona **Instrumentación automática** y **NGINX**.
3. Configura los parámetros de tu aplicación. Consulta el [ejemplo de guía de configuración][5].
4. Copia y ejecuta el comando de instalación para cargar el módulo NGINX Datadog con el inyector de SDK RUM en NGINX.
5. Una vez que el instalador haya instalado correctamente el inyector de SDK, reinicia NGINX para comenzar a recopilar sesiones RUM.
6. (Opcional) Para comprobar que el módulo está inyectando correctamente el SDK del navegador RUM en páginas HTML, consulta los [logs de error de NGINX][43] para ver si hay mensajes importantes. El módulo registra pasos importantes durante el proceso de inyección. Asegúrate de que NGINX está configurado con al menos el nivel de log `INFO` con lo siguiente:

   ```javascript
   error_log <file> info;
   ```

También puedes instalar y configurar [manualmente](#alternative-installation-method) el módulo.

## Actualización de la aplicación RUM

Puedes ajustar las frecuencias de muestreo de tus sesiones y de Session Replay desde la página Gestión de aplicaciones.

Para actualizar tu solicitud RUM:

1. Ve a tu aplicación RUM desde la lista de [Gestión de aplicaciones][4].
2. En la página de **Configuración del SDK**, ajusta el control deslizante o introduce un porcentaje específico en el campo de entrada de Session Sampling o Session Replay Sampling.
3. Copia y pega el fragmento de configuración en tu archivo `nginx.conf`.

## Solucionar problemas

### NGINX deja de responder

Dado que el módulo se encuentra en vista previa, es posible que NGINX deje de entregar solicitudes, especialmente después de la instalación. Si experimentas este problema, ponte en contacto con el [servicio de asistencia de Datadog][6] con la siguiente información, para ayudarnos a investigar y solucionar el problema:

- Tu archivo de configuración de NGINX
- Cualquier log de error relevante

### No se inyecta RUM

Si observas que RUM no se inyecta en las páginas HTML, considera las siguientes causas posibles:

- **No coincide el tipo de contenido**: RUM sólo se inyecta en páginas HTML. Si la cabecera `Content-Type` no indica correctamente `text/html`, se omite la inyección.

### Limitaciones

Consulta otras [limitaciones][1].

## Desinstalar

Para eliminar manualmente RUM de tu servidor web instrumentado automáticamente:

1. Busca el archivo de configuración NGINX ejecutando `nginx -T`. Por ejemplo: `/etc/nginx/nginx.conf`.
2. Al principio del archivo, elimina la línea: `load_module /opt/datadog-nginx/ngx_http_datadog_module.so;`.
3. En el archivo, elimina todas las secciones `datadog_*` existentes dentro de la directiva `http`. Las secciones tienen un aspecto similar al siguiente, dependiendo de la configuración de su sistema:

   ```
   datadog_agent_url http://datadog-agent:8126;
   datadog_tracing off;
   datadog_rum on;
   datadog_rum_config {
     # ... specific RUM configuration
   }
   ```

4. Elimina el directorio `/opt/datadog-nginx/` y todo su contenido.
5. Reinicia o recarga tu servidor web NGINX.

## Método de instalación alternativo

Si necesitas un control más preciso de más parámetros que los que proporciona la instrumentación automática, puedes cargar manualmente el módulo en tu servidor web, en lugar de ejecutar el script de instalación.

Para instrumentar manualmente tu aplicación RUM:

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

## Referencia

### Módulos NGINX

| Versión de NGINX | amd64 | arm 64 |
|---------------|-------|--------|
| 1.24.0 | [ngx_http_datadog-amd64-1.24.0][7] | [ngx_http_datadog-arm64-1.24.0][8] |
| 1.25.0 | [ngx_http_datadog-amd64-1.25.0][9] | [ngx_http_datadog-arm64-1.25.0][10] |
| 1.25.1 | [ngx_http_datadog-amd64-1.25.1][11] | [ngx_http_datadog-arm64-1.25.1][12] |
| 1.25.2 | [ngx_http_datadog-amd64-1.25.2][13] | [ngx_http_datadog-arm64-1.25.2][14] |
| 1.25.3 | [ngx_http_datadog-amd64-1.25.3][15] | [ngx_http_datadog-arm64-1.25.3][16] |
| 1.25.4 | [ngx_http_datadog-amd64-1.25.4][17] | [ngx_http_datadog-arm64-1.25.4][18] |
| 1.25.5 | [ngx_http_datadog-amd64-1.25.5][19] | [ngx_http_datadog-arm64-1.25.5][20] |
| 1.26.0 | [ngx_http_datadog-amd64-1.26.0][21] | [ngx_http_datadog-arm64-1.26.0][22] |
| 1.26.1 | [ngx_http_datadog-amd64-1.26.1][23] | [ngx_http_datadog-arm64-1.26.1][24] |
| 1.26.2 | [ngx_http_datadog-amd64-1.26.2][25] | [ngx_http_datadog-arm64-1.26.2][26] |
| 1.26.3 | [ngx_http_datadog-amd64-1.26.3][27] | [ngx_http_datadog-arm64-1.26.3][28] |
| 1.27.0 | [ngx_http_datadog-amd64-1.27.0][29] | [ngx_http_datadog-arm64-1.27.0][30] |
| 1.27.1 | [ngx_http_datadog-amd64-1.27.1][31] | [ngx_http_datadog-arm64-1.27.1][32] |
| 1.27.2 | [ngx_http_datadog-amd64-1.27.2][33] | [ngx_http_datadog-arm64-1.27.2][34] |
| 1.27.3 | [ngx_http_datadog-amd64-1.27.3][35] | [ngx_http_datadog-arm64-1.27.3][36] |
| 1.27.4 | [ngx_http_datadog-amd64-1.27.4][37] | [ngx_http_datadog-arm64-1.27.4][38] |
| 1.27.5 | [ngx_http_datadog-amd64-1.27.5][39] | [ngx_http_datadog-arm64-1.27.5][40] |
| 1.28.0 | [ngx_http_datadog-amd64-1.28.0][41] | [ngx_http_datadog-arm64-1.28.0][42] |

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/browser/setup/server/#limitations
[2]: /es/agent/
[3]: https://docs.nginx.com/nginx/admin-guide/dynamic-modules/dynamic-modules/
[4]: https://app.datadoghq.com/rum/list
[5]: /es/real_user_monitoring/guide/sampling-browser-plans/
[6]: /es/help
[7]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.24.0.so.tgz
[8]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.24.0.so.tgz
[9]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.25.0.so.tgz
[10]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.25.0.so.tgz
[11]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.25.1.so.tgz
[12]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.25.1.so.tgz
[13]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.25.2.so.tgz
[14]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.25.2.so.tgz
[15]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.25.3.so.tgz
[16]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.25.3.so.tgz
[17]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.25.4.so.tgz
[18]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.25.4.so.tgz
[19]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.25.5.so.tgz
[20]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.25.5.so.tgz
[21]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.26.0.so.tgz
[22]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.26.0.so.tgz
[23]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.26.1.so.tgz
[24]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.26.1.so.tgz
[25]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.26.2.so.tgz
[26]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.26.2.so.tgz
[27]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.26.3.so.tgz
[28]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.26.3.so.tgz
[29]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.27.0.so.tgz
[30]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.27.0.so.tgz
[31]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.27.1.so.tgz
[32]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.27.1.so.tgz
[33]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.27.2.so.tgz
[34]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.27.2.so.tgz
[35]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.27.3.so.tgz
[36]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.27.3.so.tgz
[37]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.27.4.so.tgz
[38]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.27.4.so.tgz
[39]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.27.5.so.tgz
[40]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.27.5.so.tgz
[41]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.28.0.so.tgz
[42]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.28.0.so.tgz
[43]: https://nginx.org/en/docs/ngx_core_module.html#error_log