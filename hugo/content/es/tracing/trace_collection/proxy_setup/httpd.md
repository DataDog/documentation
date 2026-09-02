---
aliases:
- /es/tracing/proxies
- /es/tracing/proxies/httpd
- /es/tracing/setup_overview/httpd/
- /es/tracing/setup_overview/proxy_setup/
code_lang: httpd
code_lang_weight: 10
further_reading:
- link: https://github.com/DataDog/httpd-datadog
  tag: Código fuente
  text: Módulo de Datadog para el servidor HTTP Apache
title: Instrumentación del servidor HTTP de Apache
type: lenguaje de código múltiple
---

Datadog proporciona un [módulo][1] HTTPd para mejorar las capacidades del [servidor HTTP Apache][2] y del [servidor HTTP IHS][3] en el rastreo APM.

## Compatibilidad

Dado que el servidor HTTP IHS es esencialmente una envoltura del servidor HTTP de Apache, el módulo también puede utilizarse con IHS sin ninguna modificación.

## Instalación

<div class="alert alert-danger">
  <strong>Nota</strong>: Solo el servidor HTTP de Apache 2.4.x para la arquitectura x86_64 es compatible.
</div>

El módulo se proporciona como una biblioteca compartida para la carga dinámica mediante HTTPd. Cada plataforma y arquitectura
compatible tiene su propio artefacto alojado en el [repositorio httpd de Datadog][1].

Para instalar el módulo:

1. Ejecuta el siguiente script para descargar la última versión del módulo:

   ```bash
   cd /tmp && \
       # Get latest release info using curl and basic text processing
       RELEASE_DATA=$(curl -s https://api.github.com/repos/DataDog/httpd-datadog/releases/latest) && \

       # Extract download URL for the zip file using grep and sed
       DOWNLOAD_URL=$(echo "$RELEASE_DATA" | grep '"browser_download_url".*mod_datadog_artifact.zip' | sed 's/.*"browser_download_url": *"\([^"]*\)".*/\1/') && \

       # Download and install
       curl -Lf -o mod_datadog_artifact.zip "$DOWNLOAD_URL" && \
       unzip -j mod_datadog_artifact.zip -d /usr/lib/apache2/modules/ && \
       rm mod_datadog_artifact.zip
   ```

   Este script descarga el archivo zip del artefacto de la última versión, extrae la biblioteca compartida `mod_datadog.so` directamente al directorio de módulos de Apache y limpia los archivos temporales.

1. Si has utilizado un método de instalación diferente o necesitas colocar el archivo manualmente, asegúrate de que el archivo `mod_datadog.so` se encuentra en el directorio en el que HTTPd busca los módulos, normalmente `/usr/local/apache2/modules` o `/usr/lib/apache2/modules/`.

1. Carga el módulo añadiendo la siguiente línea en el archivo de configuración:

   ```nginx
   LoadModule datadog_module modules/mod_datadog.so
   ```

1. Para habilitar el módulo, asegúrate de reiniciar o recargar HTTPd.

## Configuración

Por defecto, todas las solicitudes se rastrean y se envían al Datadog Agent.

Para cambiar el comportamiento predeterminado del módulo, utiliza las directivas `Datadog*` descritas en la [documentación de la API][3] del módulo de Datadog.

Por ejemplo, la siguiente configuración define el nombre del servicio en `my-service` y la frecuencia de muestreo en 10%:

```nginx
LoadModule datadog_module modules/mod_datadog.so

DatadogServiceName my-app
DatadogSamplingRate 0.1
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/httpd-datadog
[2]: https://httpd.apache.org/
[3]: https://github.com/DataDog/httpd-datadog/blob/main/doc/configuration.md