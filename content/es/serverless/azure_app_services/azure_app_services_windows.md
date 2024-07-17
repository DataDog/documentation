---
aliases:
- /es/infrastructure/serverless/azure_app_services/
further_reading:
- link: /integrations/azure_app_services/
  tag: Documentación
  text: Azure App Service
- link: /integrations/azure_app_service_environment/
  tag: Documentación
  text: Entorno de Azure App Service
- link: https://www.datadoghq.com/blog/azure-app-service-extension/
  tag: Blog
  text: Monitorizar las aplicaciones web de .NET con la extensión de Datadog para
    Azure App Service
- link: https://www.datadoghq.com/pricing/?product=apm--continuous-profiler#apm--continuous-profiler-what-is-considered-as-a-host-for-azure-app-services
  tag: Precios
  text: Precios de APM para Azure App Service
- link: https://www.datadoghq.com/blog/deploy-dotnet-core-azure-app-service/
  tag: Blog
  text: Desplegar las aplicaciones de ASP.NET Core en Azure App Service
kind: documentación
title: 'Azure App Service: código de Windows'
---

## Información general

La extensión de Datadog para Azure App Service ofrece capacidades de monitorización adicionales.

- Rastreo totalmente distribuido de APM mediante la instrumentación automática.
- Vistas personalizadas de servicios y trazas (traces) de APM que incluyen las métricas y los metadatos pertinentes de Azure App Service.
- Compatibilidad con la instrumentación manual de APM para personalizar tramos (spans).
- Inyección del `Trace_ID` en los logs de aplicación.
- Compatibilidad con el envío de métricas personalizadas mediante [DogStatsD][1].

## Configuración

{{< tabs >}}
{{% tab ".NET" %}}

### Requisitos

1. Si todavía no lo hiciste, configura primero la [integración de Microsoft Azure][1].

2. La extensión admite los siguientes tipos de recursos:
    - Aplicaciones web de Azure App Service
    - Aplicaciones de funciones alojadas en los planes Basic, Standard y Premium.

    <div class="alert alert-warning">Las aplicaciones de funciones en planes de consumo no son compatibles. ¿Te interesa la compatibilidad con otros tipos de recursos o tiempos de ejecución de App Service? <a href="https://forms.gle/n4nQcxEyLqDBMCDA7">Regístrate</a> para recibir una notificación cuando haya una versión beta disponible.</div>

3. La extensión de Datadog APM para .NET admite los siguientes tiempos de ejecución de .NET tanto en arquitecturas x64 como x86 cuando se ejecuta en el sistema operativo Windows (AAS todavía no admite extensiones en Linux). Para obtener más detalles sobre la instrumentación automática de bibliotecas, consulta la [documentación del rastreador][2].

    - .NET Framework 4.6.1 y versiones posteriores
    - .NET Core 2.1
    - .NET Core 2.2 (el soporte de Microsoft finalizó el 23-12-2019)
    - .NET Core 3.0 (el soporte de Microsoft finalizó el 03-03-2020)
    - .NET Core 3.1
    - .NET 5
    - .NET 6
    - .NET 7
    - .NET 8

4. Datadog recomienda actualizar de forma periódica a la última versión de la extensión para garantizar un rendimiento, estabilidad y disponibilidad óptimos de las funciones. Ten en cuenta que tanto la instalación inicial como las actualizaciones posteriores requieren que tu aplicación web esté completamente detenida para que la instalación o actualización se ejecute correctamente.

**Nota**: La instrumentación automática de Datadog se basa en la API de .NET CLR Profiling. Esta API solo permite un suscriptor (por ejemplo, el rastreador de .NET de Datadog con el generador de perfiles habilitado). Para garantizar la máxima visibilidad, ejecuta solo una solución de APM dentro del entorno de tu aplicación.

A partir de la versión 2.3.0, la extensión de .NET ya no se basa en el control de versiones semántico. La extensión utiliza el siguiente esquema: `x.y.zAA`, donde `x.y.z` es la versión del rastreador de .Net y `AA` está dedicada únicamente a la extensión. NuGet recorta cualquier cero a la izquierda en `zAA` para que la versión se convierta en `x.y.A`.

Por ejemplo:

- La extensión `2.3.0` utiliza la versión `2.3.0` del rastreador.
- La extensión `2.3.1` utiliza la versión `2.3.0` del rastreador.
- La extensión `2.3.2` utiliza la versión `2.3.0` del rastreador.
- La extensión `2.3.100` utiliza la versión `2.3.1` del rastreador.
- La extensión `2.3.101` utiliza la versión `2.3.1` del rastreador.
- La extensión `2.3.200` utiliza la versión `2.3.2` del rastreador.

### Instalación

1. Configura la [integración de Azure][1] para monitorear tu aplicación web o función. Puedes comprobar que está configurada correctamente si ves la métrica `azure.app_services.count` o `azure.functions.count` correspondiente en Datadog. **Nota**: Este paso es fundamental para la correlación de métricas y trazas y las vistas funcionales del panel de trazas, y mejora la experiencia general de uso de Datadog con Azure App Service.

2. Abre [Azure Portal][3] y navega hasta el dashboard de la aplicación de Azure que quieres instrumentar con Datadog.

**Nota**: Los clientes que utilicen la integración nativa de Azure pueden usar el recurso de Datadog en Azure para añadir la extensión a sus aplicaciones de .NET. Para obtener las instrucciones, consulta la [sección sobre la extensión de App Service][12] de la [guía de Azure Portal][13] de Datadog.

3. Ve a la pestaña "Application settings" (Parámetros de la aplicación) de la página "Configuration" (Configuración).
    {{< img src="infrastructure/serverless/azure_app_services/config.png" alt="página de configuración" >}}
4. Añade tu clave de la API de Datadog como un parámetro de la aplicación llamado `DD_API_KEY` y un valor para la [clave de la API de Datadog][4].
    {{< img src="infrastructure/serverless/azure_app_services/api_key.png" alt="página de la clave de la api" >}}
5. Configura los parámetros opcionales de la aplicación:
    - Define `DD_SITE` como {{< region-param key="dd_site" code="true" >}} (por defecto, es `datadoghq.com`).
    - Configura `DD_ENV` para agrupar tus trazas y estadísticas personalizadas.
    - Configura `DD_SERVICE` para especificar el nombre de un servicio (por defecto, es el nombre de tu aplicación).
    - Configura `DD_LOGS_INJECTION:true` para la correlación con los logs de aplicación de tu aplicación.
    - Configura `DD_PROFILING_ENABLED:true` para habilitar .NET [Continuous Profiler][5].
    - Configura `DD_APPSEC_ENABLED:true` para habilitar [Application Security][15].
    - Consulta la lista completa de [variables de configuración opcionales][6].
6. Haz clic en **Save** (Guardar) (se reiniciará la aplicación).
7. <div class="alert alert-warning">[OBLIGATORIO] Haz clic en <u>Stop</u> (Detener) para detener la aplicación.</div>
8. Ve a la página de extensiones de Azure y selecciona la extensión de Datadog APM.
    {{< img src="infrastructure/serverless/azure_app_services/choose_extension.png" alt="Extensión de Datadog" >}}
9. Acepta los términos legales, haz clic en **OK** (Aceptar) y espera a que se complete la instalación. **Nota**: La aplicación debe estar detenida para que este paso se complete correctamente.
10. Para iniciar la aplicación principal, haz clic en **Start** (Iniciar):
    {{< img src="infrastructure/serverless/azure_app_services/start.png" alt="Iniciar" >}}

### Generación de logs de aplicaciones

Puedes enviar logs desde tu aplicación en Azure App Service a Datadog de una de las siguientes maneras:
1. [Generación de logs sin agente con la instrumentación automática][7]
2. [Generación de logs sin agente con el colector de Serilog][8]

Ambos métodos permiten la inyección del ID de rastreo, lo que hace posible conectar logs y trazas en Datadog. Para habilitar la inyección del ID de rastreo con la extensión, añade el parámetro de la aplicación `DD_LOGS_INJECTION:true`.

**Nota**: Dado que esto ocurre dentro de tu aplicación, los logs de la plataforma de Azure que envíes con los parámetros de diagnóstico no incluirán el ID de rastreo.

### Métricas personalizadas con DogStatsD

La extensión de Azure App Service incluye una instancia de [DogStatsD][9] (el servicio de agregación de métricas de Datadog). Esto te permite enviar métricas personalizadas, checks de servicios y eventos directamente a Datadog desde las aplicaciones web y funciones de Azure con la extensión.

Escribir métricas personalizadas y checks en Azure App Service es similar al proceso para hacerlo con una aplicación en un host que ejecuta el Datadog Agent. Para enviar métricas personalizadas a Datadog desde Azure App Service mediante la extensión, haz lo siguiente:

1. Añade el [paquete NuGet de DogStatsD][10] a tu proyecto de Visual Studio.
2. Inicializa DogStatsD y escribe métricas personalizadas en tu aplicación.
3. Despliega tu código en Azure App Service.
4. Si todavía no lo hiciste, instala la extensión de App Service de Datadog.

**Nota**: A diferencia del [proceso de configuración estándar de DogStatsD][11], no es necesario establecer puertos o un nombre de servidor al inicializar la configuración de DogStatsD. Existen variables de entorno en Azure App Service que determinan cómo se envían las métricas (esto requiere la versión 6.0.0 o versiones superiores del cliente de DogStatsD).

Para enviar métricas, usa este código:

```csharp
// Configura tu cliente de DogStatsD y añade cualquier etiqueta (tag)
if (!DogStatsd.Configure(new StatsdConfig() { ConstantTags = new[] { "app:sample.mvc.aspnetcore" } }))
{
    // `Configure` devuelve false si las variables de entorno obligatorias no están presentes.
    // Estas variables de entorno están presentes en Azure App Service, pero
    // debes configurarlas para poder testear tus métricas personalizadas: DD_API_KEY:{api_key}, DD_AGENT_HOST:localhost
    // Ignora o genera un log del error según corresponda
    Console.WriteLine("Cannot initialize DogstatsD.");
}

// Envía una métrica
DogStatsd.Increment("sample.startup");
```

**Nota**: Para enviar solo métricas personalizadas (con el rastreo deshabilitado), define las siguientes variables en la configuración de tu aplicación:
  - Define `DD_TRACE_ENABLED` como `false`.
  - Define `DD_AAS_ENABLE_CUSTOM_METRICS` como `true`.
Obtén más información sobre las [métricas personalizadas][12].


[1]: /es/integrations/azure
[2]: /es/tracing/setup/dotnet/
[3]: https://portal.azure.com/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: /es/profiler/enabling/dotnet/?tab=azureappservice
[6]: /es/tracing/trace_collection/library_config/dotnet-framework/#additional-optional-configuration
[7]: /es/logs/log_collection/csharp/#agentless-logging-with-apm
[8]: /es/logs/log_collection/csharp/#agentless-logging-with-serilog-sink
[9]: /es/developers/dogstatsd
[10]: https://www.nuget.org/packages/DogStatsD-CSharp-Client
[11]: /es/developers/dogstatsd/?tab=net#code
[12]: /es/metrics/
[13]: /es/integrations/guide/azure-portal/#app-service-extension
[14]: /es/integrations/guide/azure-portal/
[15]: /es/security/application_security/enabling/serverless/?tab=serverlessframework#azure-app-service
{{% /tab %}}
{{% tab "Java" %}}
### Requisitos

1. Si todavía no lo hiciste, configura primero la [integración de Microsoft Azure][1].

2. La extensión es compatible con las aplicaciones web de Azure App Service. Las aplicaciones de funciones no son compatibles.
    <div class="alert alert-warning">Support for Java Web Apps is in beta for extension v2.4+. There are no billing implications for tracing Java Web Apps during this period.<br/><br/>
    Interested in support for other App Service resource types or runtimes? <a href="https://forms.gle/n4nQcxEyLqDBMCDA7">Sign up</a> to be notified when a beta becomes available.</div>

3. La extensión de Datadog APM para Java admite todos los tiempos de ejecución Java en el sistema operativo Windows. Azure App Service no admite extensiones en Linux. Para obtener más información sobre la instrumentación automática de bibliotecas, consulta la [documentación del rastreador][2].

4. Datadog recomienda actualizar de forma periódica a la última versión de la extensión para garantizar un rendimiento, estabilidad y disponibilidad óptimos de las funciones. Ten en cuenta que tanto la instalación inicial como las actualizaciones posteriores requieren que tu aplicación web esté completamente detenida para que la instalación o actualización se ejecute correctamente.

### Instalación

1. Configura la [integración de Azure][1] para monitorear tu aplicación web o función. Puedes comprobar que está configurada correctamente si ves la métrica `azure.app_service.count` o `azure.functions.count` correspondiente en Datadog. **Nota**: Este paso es fundamental para la correlación de métricas y trazas y las vistas funcionales del panel de trazas, y evita las experiencias de usuario defectuosas en el sitio de Datadog.

2. Abre [Azure Portal][3] y navega hasta el dashboard de la aplicación web de Azure que quieres instrumentar con Datadog.

3. Ve a la pestaña "Application settings" (Parámetros de la aplicación) de la página "Configuration" (Configuración).
    {{< img src="infrastructure/serverless/azure_app_services/config.png" alt="página de configuración" >}}
4. Añade tu clave de la API de Datadog como un parámetro de la aplicación llamado `DD_API_KEY` y un valor para la [clave de la API de Datadog][4].
    {{< img src="infrastructure/serverless/azure_app_services/api_key.png" alt="página de la clave de la api" >}}
5. Configura los parámetros opcionales de la aplicación:
    - Define `DD_SITE` como {{< region-param key="dd_site" code="true" >}} (por defecto, es `datadoghq.com`).
    - Configura `DD_ENV` para agrupar tus trazas y estadísticas personalizadas.
    - Configura `DD_SERVICE` para especificar el nombre de un servicio (por defecto, es el nombre de tu aplicación web).
    - Consulta la lista completa de [variables de configuración opcionales][5].
6. Haz clic en **Save** (Guardar) (se reiniciará la aplicación).
7. <div class="alert alert-warning">[OBLIGATORIO] Haz clic en <u>Stop</u> (Detener) para detener la aplicación.</div>
8. Ve a la página de extensiones de Azure y selecciona la extensión de Datadog APM.
9. Acepta los términos legales, haz clic en **OK** (Aceptar) y espera a que se complete la instalación. **Nota**: La aplicación web debe estar detenida para que este paso se complete correctamente.
10. Para iniciar la aplicación principal, haz clic en **Start** (Iniciar):
    {{< img src="infrastructure/serverless/azure_app_services/start.png" alt="Iniciar" >}}

### Generación de logs de aplicaciones desde las aplicaciones web de Azure

El envío de logs desde una aplicación en Azure App Service a Datadog requiere la transmisión de logs a Datadog directamente desde la aplicación. El envío de logs con este método permite la inyección del ID de rastreo, lo que hace posible conectar logs y trazas en Datadog.

**Nota**: La inyección del ID de rastreo ocurre dentro de tu aplicación. Azure genera los logs de los recursos de Azure en el plano de gestión y, por lo tanto, no incluyen el ID de rastreo.

Consulta las instrucciones de [Generación de logs sin agente con Java][6] para configurar la generación de logs de aplicaciones para Java en Azure App Service.

### Métricas personalizadas con DogStatsD

La extensión de Azure App Service incluye una instancia de [DogStatsD][7] (el servicio de agregación de métricas de Datadog). Esto te permite enviar métricas personalizadas, checks de servicios y eventos directamente a Datadog desde las aplicaciones web de Azure con la extensión.

Escribir métricas personalizadas y checks en este entorno es similar al proceso para hacerlo con una aplicación en un host estándar que ejecuta el Datadog Agent. Para enviar métricas personalizadas a Datadog desde Azure App Service mediante la extensión, haz lo siguiente:

1. Añade el [cliente de DogStatsD][8] a tu proyecto.
2. Inicializa DogStatsD y escribe métricas personalizadas en tu aplicación.
3. Despliega tu código en una aplicación web de Azure compatible.
4. Si todavía no lo hiciste, instala la extensión de App Service de Datadog.

**Nota**: A diferencia del [proceso de configuración estándar de DogStatsD][9], no es necesario establecer puertos o un nombre de servidor al inicializar la configuración de DogStatsD. Existen variables de entorno en Azure App Service que determinan cómo se envían las métricas (esto requiere la versión 6.0.0 o versiones superiores del cliente de DogStatsD).

Para enviar métricas, usa este código:

```java
// Configura tu cliente de DogStatsD y añade cualquier etiqueta
StatsDClient client = new NonBlockingStatsDClientBuilder()
                            .constantTags("app:sample.service")
                            .build();
// Envía una métrica
client.Increment("sample.startup");
```

Obtén más información sobre las [métricas personalizadas][10].

[1]: /es/integrations/azure
[2]: /es/tracing/setup/java/
[3]: https://portal.azure.com/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: /es/tracing/trace_collection/library_config/dotnet-framework/#additional-optional-configuration
[6]: /es/logs/log_collection/java/?tab=log4j#agentless-logging
[7]: /es/developers/dogstatsd
[8]: https://search.maven.org/artifact/com.datadoghq/java-dogstatsd-client
[9]: /es/developers/dogstatsd/?tab=java#code
[10]: /es/metrics/
{{% /tab %}}
{{% tab "Node.js" %}}
### Requisitos

Si todavía no lo hiciste, configura primero la [integración Datadog-Azure][1].

La extensión de Azure App Service para Node.js de Datadog es compatible con las aplicaciones web de Azure App Service. Las aplicaciones de funciones no son compatibles.

### Instalación

1. Configura la [integración Datadog-Azure][1] para monitorizar tu aplicación web de Azure. Para verificarla, comprueba que tu aplicación web se cuente en la métrica `azure.app_service.count` en Datadog. 

2. Abre [Azure Portal][3] y navega hasta el dashboard de la aplicación web de Azure que quieres instrumentar con Datadog.

3. En la página **Configuration** (Configuración), ve a la pestaña **Application settings** (Parámetros de la aplicación). Selecciona **+ New application setting** (+ Nuevo parámetro de la aplicación).

4. Añade tu [clave de la API de Datadog][4] como valor de un parámetro de la aplicación con el nombre `DD_API_KEY`.
   {{< img src="infrastructure/serverless/azure_app_services/api_key.png" alt="página de la clave de la api" >}}

   Opcionalmente, puedes configurar otras variables de entorno como parámetros de la aplicación. Entre estas variables se incluyen las siguientes:
   - `DD_SITE`: {{< region-param key="dd_site" code="true" >}} (por defecto, `datadoghq.com`)
   - `DD_ENV`: el nombre de tu entorno
   - `DD_SERVICE`: el nombre de tu servicio (por defecto, es el nombre de tu aplicación web)
   - `DD_RUNTIME_METRICS_ENABLED`: `true` para habilitar las métricas del tiempo de ejecución
   - `DD_APPSEC_ENABLED`: `true` para habilitar [Application Security Management][11]

   Consulta la lista completa de [parámetros de configuración opcionales][5].
6. Selecciona **Save** (Guardar). Esto reiniciará la aplicación.
7. Haz clic en **Stop** (Detener) para detener la aplicación.

   <div class="alert alert-info">Para evitar la caída del sistema, utiliza <a href="https://learn.microsoft.com/en-us/azure/app-service/deploy-best-practices#use-deployment-slots">slots de despliegue</a>. Puedes crear un flujo de trabajo que utilice la <a href="https://github.com/marketplace/actions/azure-cli-action">Acción de GitHub para la Azure CLI</a>. Consulta el <a href="/resources/yaml/serverless/aas-workflow-windows.yaml">flujo de trabajo de GitHub</a> de ejemplo.</div>
8. En la página **Extensions** (Extensiones), selecciona la extensión **Nodo Datadog APM**.
9. Acepta los términos legales, selecciona **OK** (Aceptar) y espera a que se complete la instalación.
10. Haz clic en **Start** (Iniciar) para iniciar la aplicación.
    {{< img src="infrastructure/serverless/azure_app_services/start.png" alt="Iniciar" >}}

### Generación de logs de aplicaciones desde las aplicaciones web de Azure

El envío de logs desde una aplicación en Azure App Service a Datadog requiere la transmisión de logs a Datadog directamente desde la aplicación. El envío de logs con este método permite la inyección del ID de rastreo, lo que hace posible conectar logs y trazas en Datadog.

Para configurar la generación de logs de aplicaciones para Node.js en Azure App Service, consulta [Generación de logs sin agente con Node.js][6].

<div class="alert alert-info">Los logs de los recursos de Azure no incluyen el ID de rastreo. <br/><br/>La inyección del ID de rastreo ocurre dentro de tu aplicación. Azure genera los logs de los recursos de Azure en el plano de gestión y, por lo tanto, no incluyen el ID de rastreo.</div>

### Métricas personalizadas con DogStatsD

La extensión de Azure App Service para Node.js de Datadog incluye una instancia de [DogStatsD][7], el servicio de agregación de métricas de Datadog. Esto te permite enviar métricas personalizadas, checks de servicios y eventos directamente a Datadog desde las aplicaciones web de Azure.

Escribir métricas personalizadas y checks en este entorno es similar al proceso para hacerlo con una aplicación en un host estándar que ejecuta el Datadog Agent. Para enviar métricas personalizadas a Datadog desde Azure App Service mediante la extensión, haz lo siguiente:

1. [Inicializa DogStatsD y escribe métricas personalizadas][12] en tu aplicación.
1. Despliega tu código en una aplicación web de Azure compatible.
1. Si todavía no lo hiciste, instala la extensión de Azure App Service para Node.js de Datadog.

<div class="alert alert-info">No es necesario instalar un cliente de DogStatsD para Node.js, ya que se incluye en el rastreador de Node.js (<code>dd-trace</code>) empaquetado en la extensión de Azure App Service.</div>

Para enviar métricas, usa este código:

```javascript
const tracer = require('dd-trace');
tracer.init();

tracer.dogstatsd.increment('example_metric.increment', 1, { environment: 'dev' });
tracer.dogstatsd.decrement('example_metric.decrement', 1, { environment: 'dev' });
```

<div class="alert alert-info">El rastreador de Node.js de Datadog, <code>dd-trace</code>, está empaquetado en la extensión de Azure App Service. Se añade automáticamente a <code>NODE_PATH</code>.<br/><br/> <strong>No es necesario añadir</strong> <code>dd-trace</code> <strong>como dependencia en</strong> <code>package.json</code>. Añadir <code>dd-trace</code> de forma explícita como dependencia puede anular la versión que proporciona la extensión. Para el testeo local, consulta las <a href="https://github.com/DataDog/datadog-aas-extension/releases">notas de la versión</a> para encontrar la versión del rastreador de Node.js acorde a tu versión de la extensión de Azure App Service.</div>

Obtén más información sobre las [métricas personalizadas][10].

[1]: /es/integrations/azure
[2]: /es/tracing/setup/java/
[3]: https://portal.azure.com/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: /es/tracing/trace_collection/library_config/nodejs/#configuration-settings
[6]: /es/logs/log_collection/nodejs/?tab=winston30#agentless-logging
[7]: /es/developers/dogstatsd
[8]: https://github.com/brightcove/hot-shots
[9]: /es/developers/dogstatsd/?tab=java#code
[10]: /es/metrics/
[11]: /es/security/application_security/enabling/nodejs/
[12]: /es/developers/dogstatsd/
{{% /tab %}}
{{< /tabs >}}

## Gestión mediante programación

{{< tabs >}}
{{% tab ".NET" %}}

Datadog proporciona scripts para actualizar o instalar la extensión de Azure App Service mediante Powershell. La gestión de extensiones mediante scripts te permite [actualizar extensiones de forma masiva por grupo de recursos](#powershell-resource-group) y [designar la instalación de versiones específicas de la extensión del sitio](#powershell-specific-version). También puedes utilizar scripts para añadir la extensión mediante programación en los pipelines de CI/CD, así como buscar y actualizar extensiones que ya estén instaladas.

### Requisitos previos

- La [Azure CLI][1] o [Azure Cloud Shell][2].
- Las [credenciales de contexto de usuario][3]. Si todavía no tienes estas credenciales, ve a [Azure Portal][4] y accede a tu aplicación web o de funciones. Luego, navega hasta **Deployment** (Despliegue) > **Deployment Center** (Centro de despliegue) para crear o recuperar tus credenciales de contexto de usuario.

### Instalación de la extensión por primera vez {#powershell-first-time}



El script de instalación añade la última versión de la extensión a una aplicación web o de funciones de Azure. Esto ocurre por aplicación, en lugar de en el nivel de grupo de recursos.

1. Abre la Azure CLI o Azure Cloud Shell.
2. Descarga el script de instalación con el siguiente comando:

    ```
    Invoke-WebRequest -Uri "https://raw.githubusercontent.com/DataDog/datadog-aas-extension/master/management-scripts/extension/install-latest-extension.ps1" -OutFile "install-latest-extension.ps1"
    ```

3. Ejecuta el siguiente comando e introduce los argumentos obligatorios y opcionales según sea necesario.

    ```
    .\install-latest-extension.ps1 -Username <USERNAME> -Password <PASSWORD> -SubscriptionId <SUBSCRIPTION_ID> -ResourceGroup <RESOURCE_GROUP_NAME> -SiteName <SITE_NAME> -DDApiKey <DATADOG_API_KEY> -DDSite <DATADOG_SITE> -DDEnv <DATADOG_ENV> -DDService <DATADOG_SERVICE> -DDVersion <DATADOG_VERSION>
    ```

**Nota**: Los siguientes argumentos son obligatorios para el comando anterior:

- `<USERNAME>`: el nombre de usuario de tu contexto de usuario de Azure.
- `<PASSWORD>`: la contraseña del contexto de usuario de Azure.
- `<SUBSCRIPTION_ID>`: tu [ID de suscripción][5] de Azure.
- `<RESOURCE_GROUP_NAME>`: el nombre de tu grupo de recursos de Azure.
- `<SITE_NAME>`: el nombre de tu aplicación.
- `<DATADOG_API_KEY>`: tu [clave de la API de Datadog][6].

Además, define `DATADOG_SITE` como tu [sitio de Datadog][7]. Por defecto, `DATADOG_SITE` es `datadoghq.com`. Tu sitio es: {{< region-param key="dd_site" code="true" >}}.




### Actualización de la extensión para un grupo de recursos {#powershell-resource-group}


El script de actualización se aplica a todo un grupo de recursos. Este script actualiza cada aplicación web o de funciones que tenga la extensión instalada. Las aplicaciones de App Service que no tengan instalada la extensión de Datadog no se verán afectadas.

1. Abre la Azure CLI o Azure Cloud Shell.
2. Descarga el script de actualización con el siguiente comando:

    ```
    $baseUri="https://raw.githubusercontent.com/DataDog/datadog-aas-extension/master/management-scripts/extension"; Invoke-WebRequest -Uri "$baseUri/update-all-site-extensions.ps1" -OutFile "update-all-site-extensions.ps1"; Invoke-WebRequest -Uri "$baseUri/install-latest-extension.ps1" -OutFile "install-latest-extension.ps1"
    ```

3. Ejecuta el siguiente comando. Todos los argumentos son obligatorios.

    ```
    .\update-all-site-extensions.ps1 -SubscriptionId <SUBSCRIPTION_ID> -ResourceGroup <RESOURCE_GROUP_NAME> -Username <USERNAME> -Password <PASSWORD>
    ```



### Instalar una versión específica de la extensión {#powershell-specific-version}

La interfaz de usuario de Azure App Service no permite instalar una versión específica de una extensión, pero puedes hacerlo con el script de instalación o actualización.


#### Instalar una versión específica en un solo recurso

Para instalar una versión específica en una sola instancia, sigue las [instrucciones de instalación de la extensión por primera vez](#powershell-first-time) y añade el parámetro `-ExtensionVersion` al comando de instalación.

```
.\install-latest-extension.ps1 -Username <USERNAME> -Password <PASSWORD> -SubscriptionId <SUBSCRIPTION_ID> -ResourceGroup <RESOURCE_GROUP_NAME> -SiteName <SITE_NAME> -DDApiKey <DATADOG_API_KEY> -ExtensionVersion <EXTENSION_VERSION>
```

Reemplaza `<EXTENSION_VERSION>` por la versión de la extensión que quieres instalar. Por ejemplo, `1.4.0`.

#### Instalar una versión específica en todo un grupo de recursos

Para instalar una versión específica para un grupo de recursos, sigue las [instrucciones de actualización de la extensión para un grupo de recursos](#powershell-resource-group) y añade el parámetro `-ExtensionVersion` al comando de instalación.

```
.\update-all-site-extensions.ps1 -SubscriptionId <SUBSCRIPTION_ID> -ResourceGroup <RESOURCE_GROUP_NAME> -Username <USERNAME> -Password <PASSWORD> -ExtensionVersion <EXTENSION_VERSION>
```

Reemplaza `<EXTENSION_VERSION>` por la versión de la extensión que quieres instalar. Por ejemplo, `1.4.0`.

### Plantilla de ARM

Muchas organizaciones utilizan [plantillas de Azure Resource Management (ARM)][8] para implementar la práctica de infraestructura como código. Para integrar la extensión de App Service en estas plantillas, incorpora la [plantilla de ARM de la extensión de App Service de Datadog][9] en tus despliegues para añadir la extensión y configurarla junto con los recursos de App Service.

[1]: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli
[2]: https://docs.microsoft.com/en-us/azure/cloud-shell/overview
[3]: https://docs.microsoft.com/en-us/azure/app-service/deploy-configure-credentials
[4]: https://portal.azure.com/
[5]: https://docs.microsoft.com/en-us/azure/media-services/latest/setup-azure-subscription-how-to
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: /es/getting_started/site/
[8]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/overview
[9]: https://github.com/DataDog/datadog-aas-extension/tree/master/ARM
[10]: https://learn.microsoft.com/en-us/azure/templates/microsoft.datadog/monitors?pivots=deployment-language-arm-template
{{% /tab %}}
{{% tab "Java" %}}

<div class="alert alert-warning">La compatibilidad con las aplicaciones web de Java está en fase beta para la versión de la extensión 2.4 y versiones posteriores. La gestión mediante programación no está disponible para las aplicaciones web de Java.<br/><br/>
    ¿Te interesa la compatibilidad con otros tipos de recursos o tiempos de ejecución de App Service? <a href="https://forms.gle/n4nQcxEyLqDBMCDA7">Regístrate</a> para recibir una notificación cuando haya una versión beta disponible.</div>

{{% /tab %}}
{{< /tabs >}}

## Despliegue

{{% aas-workflow-windows %}}

## Solución de problemas

### Si se identifica que tus aplicaciones están mal configuradas en la vista Serverless o te faltan métricas correspondientes a tus trazas

Es probable que no tengas configurada la integración de Azure para monitorizar tu aplicación. Una configuración adecuada mejora tu capacidad para correlacionar métricas, trazas y logs en la plataforma de Datadog. Sin la integración de Azure configurada, pierdes contexto crítico para tus trazas. Para solucionar esto, haz lo siguiente:

1. Ve al cuadro de la integración de Azure.

2. Asegúrate de haber instalado la [integración de Azure][2] para la suscripción de Azure en la que se ejecuta tu aplicación.

3. Asegúrate de que las reglas de filtrado del plan de App Service que hayas aplicado incluyan el plan de App Service en el que se ejecuta la aplicación. Si no se incluye un plan de App Service, tampoco se incluirán las aplicaciones y funciones alojadas en él. Las etiquetas de la propia aplicación no se utilizan para el filtrado por parte de Datadog.


### Si las trazas de APM no aparecen en Datadog

1. Comprueba que has configurado correctamente `DD_SITE` y `DD_API_KEY`.

2. Detén tu aplicación por completo y vuelve a inciarla.

3. Si el problema no se resuelve, prueba con desinstalar la extensión y volver a instalarla (esto también garantiza que se ejecute la última versión).

**Nota**: Para agilizar la proceso de investigación de errores de la aplicación con el equipo de asistencia, configura `DD_TRACE_DEBUG:true` y añade el contenido del directorio de logs de Datadog (`%AzureAppServiceHomeDirectory%\LogFiles\datadog`) a tu correo electrónico.

¿Necesitas más ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

### Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/developers/dogstatsd
[2]: /es/integrations/azure
[3]: /es/help