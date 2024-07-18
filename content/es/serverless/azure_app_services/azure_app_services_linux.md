---
further_reading:
- link: https://www.datadoghq.com/blog/monitor-azure-app-service-linux/
  tag: Blog
  text: Monitoriza las aplicaciones web de Linux en Azure App Service con Datadog
kind: documentación
title: 'Azure App Service: código de Linux'
---
## Información general

Este método de instrumentación ofrece las siguientes capacidades de monitorización adicionales para las cargas de trabajo de Azure App Service en Linux:

- Rastreo totalmente distribuido de APM mediante la instrumentación automática.
- Vistas personalizadas de servicios y trazas (traces) de APM que incluyen las métricas y los metadatos pertinentes de Azure App Service.
- Compatibilidad con la instrumentación manual de APM para personalizar tramos (spans).
- Inyección del `Trace_ID` en los logs de aplicación.
- Compatibilidad con el envío de métricas personalizadas mediante [DogStatsD][1].

Esta solución utiliza el parámetro del comando de inicio y los parámetros de aplicación de Azure App Service de Linux para instrumentar la aplicación y gestionar la configuración. Se admiten Java, Node, .NET, PHP y Python.

### Configuración
#### Configurar los parámetros de la aplicación
Para instrumentar tu aplicación, comienza por añadir los siguientes pares de clave-valor en los **Application Settings** (Parámetros de la aplicación) de tu configuración de Azure.

{{< img src="serverless/azure_app_service/application-settings.jpg" alt="Configuración de Azure App Service: los Parámetros de la aplicación, en la sección Configuración de la interfaz de usuario de Azure. Se enumeran tres parámetros: DD_API_KEY, DD_SERVICE y DD_START_APP." style="width:80%;" >}}

- `DD_API_KEY` es tu clave de la API de Datadog.
- `DD_CUSTOM_METRICS_ENABLED` (opcional) habilita las [métricas personalizadas](#custom-metrics).
- `DD_SITE` es el [parámetro][2] del sitio de Datadog. Tu sitio es {{< region-param key="dd_site" code="true" >}}. Por defecto, este valor es `datadoghq.com`.
- `DD_SERVICE` es el nombre del servicio utilizado para este programa. Por defecto, es el valor del campo de nombre en `package.json`.
- `DD_START_APP` es el comando utilizado para iniciar la aplicación. Por ejemplo, `node ./bin/www` (no es necesario para aplicaciones que se ejecutan en Tomcat).
- `DD_PROFILING_ENABLED` (opcional) habilita el [Continuous Profiler][15], específico para .NET.

### Identificación del comando de inicio

Las aplicaciones web de Azure App Service de Linux creadas mediante la opción de despliegue de código en tiempos de ejecución integrados dependen de un comando de inicio que varía según el lenguaje. Los valores predeterminados se describen en la [documentación de Azure][7]. A continuación se incluyen algunos ejemplos.

Configura estos valores en la variable de entorno `DD_START_APP`. Los siguientes ejemplos corresponden a una aplicación llamada `datadog-demo`.

| Tiempo de ejecución   | Valor de ejemplo de `DD_START_APP`                                                               | Descripción                                                                                                                                                                                                                        |
|-----------|--------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Node.js   | `node ./bin/www`                                                                           | Ejecuta el [archivo de configuración PM2 de Node][12] o tu archivo de script.                                                                                                                                                                   |
| .NET Core | `dotnet datadog-demo.dll`                                                                  | Ejecuta un archivo `.dll` que utiliza por defecto el nombre de tu aplicación web. <br /><br /> **Nota**: El nombre del archivo `.dll` del comando debe coincidir con el nombre de tu archivo `.dll`. En algunos casos, es posible que no coincida con tu aplicación web.         |
| PHP       | `cp /home/site/wwwroot/default /etc/nginx/sites-available/default && service nginx reload` | Copia el script en la localización correcta e inicia la aplicación.                                                                                                                                                                           |
| Python    | `gunicorn --bind=0.0.0.0 --timeout 600 quickstartproject.wsgi`                             | Personaliza el [script de inicio][13]. En este ejemplo, se muestra un comando Gunicorn para iniciar una aplicación de Django.                                                                                                                                      |
| Java      | `java -jar /home/site/wwwroot/datadog-demo.jar`                                            | El comando para iniciar tu aplicación. Esto no es necesario para las aplicaciones que se ejecutan en Tomcat.                                                                                                                                                                                                  |

[7]: https://learn.microsoft.com/en-us/troubleshoot/azure/app-service/faqs-app-service-linux#what-are-the-expected-values-for-the-startup-file-section-when-i-configure-the-runtime-stack-
[12]: https://learn.microsoft.com/en-us/azure/app-service/configure-language-nodejs?pivots=platform-linux#configure-nodejs-server
[13]: https://learn.microsoft.com/en-us/azure/app-service/configure-language-php?pivots=platform-linux#customize-start-up
[15]: /es/profiler/enabling/dotnet/?tab=azureappservice


**Nota**: La aplicación se reinicia cuando se guardan los parámetros nuevos.

#### Configurar los parámetros generales

{{< tabs >}}
{{% tab "Node, .NET, PHP, Python" %}}
Ve a **General settings** (Configuración general) y añade lo siguiente al campo **Startup Command** (Comando de inicio):

```
curl -s https://raw.githubusercontent.com/DataDog/datadog-aas-linux/v1.10.6/datadog_wrapper | bash
```

{{< img src="serverless/azure_app_service/startup-command-1.jpeg" alt="Configuración de Azure App Service: los parámetros de Stack, en la sección Configuración de la interfaz de usuario de Azure. Debajo de los campos del stack, la versión principal y la versión secundaria está el campo 'Comando de inicio' que se rellena con el comando curl de arriba." style="width:100%;" >}}
{{% /tab %}}
{{% tab "Java" %}}
Descarga el archivo [`datadog_wrapper`][8] de las versiones y cárgalo en tu aplicación con el comando de la Azure CLI:

```
  az webapp deploy --resource-group <group-name> --name <app-name> --src-path <path-to-datadog-wrapper> --type=startup
```

[8]: https://github.com/DataDog/datadog-aas-linux/releases
{{% /tab %}}
{{< /tabs >}}

### Visualización de trazas

Cuando se guardan parámetros de aplicación nuevos, Azure reinicia la aplicación. Sin embargo, si se añade y guarda un comando de inicio, puede ser necesario reiniciar.

Después de reiniciar la aplicación, puedes ver las trazas si buscas el nombe del servicio (`DD_SERVICE`) en la [Página de servicios de APM][4] de Datadog.

### Métricas personalizadas

Para habilitar las métricas personalizadas para tu aplicación con DogStatsD, añade `DD_CUSTOM_METRICS_ENABLED` y defínelo como `true` en "Application Settings" (Parámetros de la aplicación).

Para configurar tu aplicación para enviar métricas, sigue los pasos relacionados con tu tiempo de ejecución.

- [Java][9]
- [Node][5]
- [.NET][6]
- [PHP][10]
- [Python][11]

## Despliegue

{{% aas-workflow-linux %}}

## Solucionar problemas

Si no recibes datos de trazas o métricas personalizadas como esperabas, habilita **App Service logs** (Logs de App Service) para recibir logs de depuración.

{{< img src="serverless/azure_app_service/app-service-logs.png" alt="Configuración de Azure App Service: los logs de App Service, en la sección 'Monitoring' (Monitorización) de 'Settings' (Configuración) en la interfaz de usuario de Azure. La opción 'Application logging' (Generación de registros de aplicación) está establecida como 'File System' (Sistema de archivos)." style="width:100%;" >}}

Comparte el contenido del **Log stream** (Flujo de logs) con el [servicio de asistencia de Datadog][14].
## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/developers/dogstatsd
[2]: /es/getting_started/site/#access-the-datadog-site
[3]: https://www.datadoghq.com/blog/azure-app-service-datadog-serverless-view/
[4]: /es/tracing/services/service_page/
[5]: https://github.com/brightcove/hot-shots
[6]: /es/developers/dogstatsd/?tab=hostagent&code-lang=dotnet#code
[9]: https://docs.datadoghq.com/es/developers/dogstatsd/?tab=hostagent&code-lang=java
[10]: https://docs.datadoghq.com/es/developers/dogstatsd/?tab=hostagent&code-lang=php
[11]: https://docs.datadoghq.com/es/developers/dogstatsd/?tab=hostagent&code-lang=python
[14]: /es/help