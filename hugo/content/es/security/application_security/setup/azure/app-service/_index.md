---
aliases:
- /es/security/application_security/getting_started/serverless
- /es/security/application_security/enabling/serverless
further_reading:
- link: /security/application_security/how-it-works/
  tag: Documentación
  text: Cómo funciona App and API Protection
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Reglas de protección de aplicaciones y API predefinidas
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solución de problemas de protección de aplicaciones y API
- link: /security/application_security/threats/
  tag: Documentación
  text: App and API Protection
- link: https://www.datadoghq.com/blog/datadog-security-google-cloud/
  tag: Blog
  text: Datadog Security amplía las funciones de cumplimiento de normativas y protección
    frente a amenazas para Google Cloud
title: Activación de AAP para Azure App Services
---

## Compatibilidad

Sólo son compatibles las *aplicaciones web*. Las funciones Azure no son compatibles.

**Nota**: La protección frente a amenazas no es compatible a través de la configuración remota. Utiliza los [flujos][5] para bloquear direcciones IP en tu [WAF][6].

|Tipo       | Sistema operativo                     | Threat Detection |
|-----------|------------------|------------------|
| Java        | Windows, Linux   | {{< X >}}          |
| .NET      | Windows, Linux     | {{< X >}}        |
| Node        | Linux                  | {{< X >}}        |
| Python    | Linux                | {{< X >}}        |
| Ruby        | Linux                  | {{< X >}}        |
| PHP         | Linux                  |                        |

## Configuración
### Configuración de los parámetros de la aplicación
Para activar AAP en tu aplicación, comienza añadiendo los siguientes pares clave-valor en **Configuración de la aplicación** en tus parámetros de configuración de Azure.

{{< img src="serverless/azure_app_service/application-settings.jpg" alt="Configuración de Azure App Service: parámetros de la aplicación, en la sección de configuración de parámetros de la interfaz de usuario de Azure. Se muestran tres parámetros: DD_API_KEY, DD_SERVICE y DD_START_APP" style="width:80%;" >}}

- `DD_API_KEY` es tu clave de API de Datadog.
- `DD_CUSTOM_METRICS_ENABLED` (opcional) habilita las [métricas personalizadas](#custom-metrics).
- `DD_SITE` es el [parámetro][2] del sitio Datadog. Tu sitio es {{< region-param key="dd_site" code="true" >}}. Por defecto, este valor es `datadoghq.com`.
- `DD_SERVICE` es el nombre del servicio utilizado para este programa. Por defecto, es el valor del campo de nombre en `package.json`.
- `DD_START_APP` es el comando utilizado para iniciar tu aplicación. Por ejemplo, `node ./bin/www` (no es necesario para las aplicaciones que se ejecutan en Tomcat).
- `DD_APPSEC_ENABLED` debe ser 1 para activar la protección de aplicaciones y API.

### Identificación del comando de inicio

Las aplicaciones Linux y Azure App Service creadas utilizando la opción de despliegue de código en tiempos de ejecución incorporados dependen de un comando de inicio que varía según el lenguaje. Los valores predeterminados se describen en [la documentación de Azure][7]. A continuación se incluyen algunos ejemplos.

Configura estos valores en la variable de entorno `DD_START_APP`. Los siguientes ejemplos corresponden a una aplicación denominada `datadog-demo`, cuando corresponda.

| Tiempo de ejecución   | `DD_START_APP` Valor de ejemplo                                                               | Descripción                                                                                                                                                                                                                        |
|-----------|--------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Node.js   | `node ./bin/www`                                                                           | Ejecuta el [archivo de configuración de Node PM2][12] o tu archivo de script.                                                                                                                                                                   |
| .NET Core | `dotnet datadog-demo.dll`                                                                  | Ejecuta un archivo `.dll` que utiliza por defecto el nombre de tu aplicación web. <br /><br /> **Nota**: El nombre del archivo `.dll` en el comando debe coincidir con el nombre de tu archivo `.dll`. En algunos casos es posible que no coincida con tu aplicación web.         |
| PHP       | `cp /home/site/wwwroot/default /etc/nginx/sites-available/default && service nginx reload` | Copia el script en la localización correcta e inicia la aplicación.                                                                                                                                                                           |
| Python    | `gunicorn --bind=0.0.0.0 --timeout 600 quickstartproject.wsgi`                             | [Script de inicio][13] personalizado. Este ejemplo muestra un comando Gunicorn para iniciar una aplicación Django.                                                                                                                                      |
| Java      | `java -jar /home/site/wwwroot/datadog-demo.jar`                                            | Comando para iniciar tu aplicación. No es necesario para las aplicaciones que se ejecutan en Tomcat.                                                                                                                                                                                                  |

[7]: https://learn.microsoft.com/en-us/troubleshoot/azure/app-service/faqs-app-service-linux#what-are-the-expected-values-for-the-startup-file-section-when-i-configure-the-runtime-stack-
[12]: https://learn.microsoft.com/en-us/azure/app-service/configure-language-nodejs?pivots=platform-linux#configure-nodejs-server
[13]: https://learn.microsoft.com/en-us/azure/app-service/configure-language-php?pivots=platform-linux#customize-start-up


**Nota**: La aplicación se reinicia cuando se guardan los nuevos parámetros.

### Configuración de parámetros generales

{{< tabs >}}
{{% tab "Node, .NET, PHP, Python" %}}
Ve a **Parámetros generales** y añade lo siguiente al campo **Comando de inicio**:

```
curl -s https://raw.githubusercontent.com/DataDog/datadog-aas-linux/v1.14.0/datadog_wrapper | bash
```

{{< img src="serverless/azure_app_service/startup-command-1.jpeg" alt="Configuración de Azure App Service: parámetros de stack tecnológico, en la sección de configuración de parámetros de la interfaz de usuario de Azure. Debajo de los campos de versión mayor y menor del stack tecnológico se encuentra el 'Comando de inicio' rellenado por el comando curl anterior." style="width:100%;" >}}
{{% /tab %}}
{{% tab "Java" %}}
Descarga el archivo [`datadog_wrapper`][8] de las versiones y cárgalo en tu aplicación con el comando CLI de Azure:

```
  az webapp deploy --resource-group <group-name> --name <app-name> --src-path <path-to-datadog-wrapper> --type=startup
```

[8]: https://github.com/DataDog/datadog-aas-linux/releases
{{% /tab %}}
{{< /tabs >}}


## Test de detección de amenazas

Para ver en acción la detección de amenazas a la protección de aplicaciones and API, envía patrones de ataque conocidos a tu aplicación. Por ejemplo, envía una solicitud con el encabezado de agente de usuario configurado en `dd-test-scanner-log` para activar un intento de [ataque de escáner de seguridad][5]:
   ```sh
   curl -A 'dd-test-scanner-log' https://your-function-url/existing-route
   ```
Unos minutos después de habilitar tu aplicación y ponerla en ejecución, **la información sobre las amenazas** aparece en el [Explorador de señales de aplicaciones][3]**.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services?query=type%3Afunction%20&env=prod&groupBy=&hostGroup=%2A&lens=Security&sort=-attackExposure&view=list
[2]: /es/serverless/distributed_tracing/
[3]: https://app.datadoghq.com/security/appsec
[4]: /es/security/application_security/serverless/compatibility
[5]: /es/security/default_rules/security-scan-detected/
[6]: /es/serverless/libraries_integrations/plugin/
[apm-lambda-tracing-setup]: https://docs.datadoghq.com/serverless/aws_lambda/distributed_tracing/