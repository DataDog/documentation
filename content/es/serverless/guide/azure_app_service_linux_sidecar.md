---
further_reading:
- link: /integrations/azure_app_services/
  tag: Documentación
  text: Azure App Service
- link: /integrations/azure_app_service_environment/
  tag: Documentación
  text: Entorno de Azure App Service
title: 'Instrumentar Azure App Service: contenedores de Linux con patrón Sidecar'
---

<div class="alert alert-info">Para instrumentar tus contenedores de Azure App Service con serverless-init<code>, consulta <a href="/serverless/azure_app_services/azure_app_services_container">Instrumentar Azure App Service: contenedor de Linux con serverless-init</a>.</div>

## Información general

Este método instrumentación utiliza el [patrón Sidecar][1] de Azure para monitorizar cargas de trabajo de Linux Azure App Service en contenedores.

### Requisitos previos

- Tu aplicación de Azure App Service está en contenedores
- Estás utilizando un lenguaje de programación [compatible con una biblioteca de rastreo de Datadog][2]
- Dispone de una [clave de API de Datadog][3]

## Instrumentar tu aplicación

1. [Integra el rastreador de Datadog][11] en tu aplicación en contenedores
1. [Crea tu aplicación web de Linux][12]
1. [Añade variables de entorno de Datadog][13] como configuración de la aplicación
1. [Añade el sidecar de Datadog][14]

### Integra el rastreador de Datadog

1. Añade las siguientes líneas al archivo de Docker de tu aplicación principal:

   {{< programming-lang-wrapper langs="dotnet" >}}
{{< programming-lang lang="dotnet" >}}

```dockerfile
RUN mkdir -p /datadog/tracer
RUN mkdir -p /home/LogFiles/dotnet

ADD https://github.com/DataDog/dd-trace-dotnet/releases/download/v2.51.0/datadog-dotnet-apm-2.49.0.tar.gz /datadog/tracer
RUN cd /datadog/tracer && tar -zxf datadog-dotnet-apm-2.49.0.tar.gz
```
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

   Esto instala y configura el rastreador de Datadog dentro de tu contenedor de aplicación.

2. Crea la imagen y envíala a tu registro preferido de contenedor.

#### Archivo de Docker de ejemplo completo

{{< programming-lang-wrapper langs="dotnet" >}}
{{< programming-lang lang="dotnet" >}}
```dockerfile
# Etapa 1: crear la aplicación
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copia el archivo de proyecto y restaura las dependencias
COPY *.csproj ./
RUN dotnet restore

# Copia el código fuente restante
COPY . .

# Crea la aplicación
RUN dotnet publish -c Release -o out

# Etapa 2: crear una imagen de tiempo de ejecución
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copia la salida de compilación desde la Etapa 1
COPY --from=build /app/out ./

# Específico de Datadog
RUN mkdir -p /datadog/tracer
RUN mkdir -p /home/LogFiles/dotnet

ADD https://github.com/DataDog/dd-trace-dotnet/releases/download/v2.49.0/datadog-dotnet-apm-2.49.0.tar.gz /datadog/tracer
RUN cd /datadog/tracer && tar -zxf datadog-dotnet-apm-2.49.0.tar.gz

# Establece el punto de entrada de la aplicación
ENTRYPOINT ["dotnet", "<your dotnet app>.dll"]
```
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Crear tu Linux Web App

1. En el Portal de Azure, ve a **App Services** (Servicios de aplicación) y selecciona **Create** (Crear).
1. En la pestaña **Basics** (Datos básicos), introduce los datos necesarios.
   - Para **Publish** (Publicar), selecciona **Container** (Contenedor).
   - En **Operating System** (Sistema operativo), selecciona **Linux**.
   A continuación, selecciona **Next: Container >** (Siguiente: Contenedor).
1. En la pestaña **Container** (Contenedor), introduce los datos necesarios.
   - En **Sidecar support** (Compatibilidad de sidecar), selecciona **Enabled** (Activado).
   - En **Image Source** (Fuente de imagen), selecciona el registro que desees.
   - Especifica el **Registro**, **Imagen**, **Etiqueta** y **Puerto** para tu imagen de contenedor.
1. Selecciona **Review + create** (Revisar + crear) y, a continuación, **Create** (Crear).

### Añadir variables de entorno de Datadog

1. En el portal de Azure, selecciona tu aplicación. 

2. En el menú de la izquierda, selecciona **Configuration** > **Application settings** (Configuración > Configuración de la aplicación). 

3. Añade las siguientes variables de entorno como configuración de la aplicación.

   `DD_API_KEY` (**Obligatorio**)
   : tu [clave de API de Datadog][3]. <br/>
   Como alternativa, puedes obtener tu clave de API (y otra información confidencial) de Azure Key Vault. Consulta [Uso de referencias de Key Vault como configuración de aplicaciones en Azure App Service][4].

   `DD_SITE` 
   : {{< region-param key="dd_site" code="true" >}} <br/>
   Corresponde a tu [sitio de Datadog][5]. Por defecto `datadoghq.com`.

   `DD_SERVICE` 
   : proporciona un nombre de servicio para que aparezca en tu [Catálogo de servicios][6] de Datadog. Consulta [Etiquetado de servicios unificado][7]. 

   `DD_ENV` 
   : un nombre para tu entorno, como `staging` o `prod`. Consulta [etiquetado de servicios unificado][7].

   `DD_SERVERLESS_LOG_PATH` 
   : `/home/Logfile/*.log` <br/>
   Corresponde a la ruta donde escribes tus logs de aplicación. Si has cambiado esta localización, especifica tu localización personalizada en esta configuración.

   `DD_DOTNET_TRACER_HOME` (**Obligatorio**)
   : `/datadog/tracer`

   `DD_TRACE_LOG_DIRECTORY` (**Obligatorio**)
   : `/home/Logfiles/dotnet`

   `CORECLR_ENABLE_PROFILING` (**Obligatorio**)
   : `1`

   `CORECLR_PROFILER` (**Obligatorio**)
   : `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}`

   `CORECLR_PROFILER_PATH` (**Obligatorio**)
   : `/datadog/tracer/Datadog.Trace.ClrProfiler.Native.so`


### Añadir el sidecar de Datadog

1. En el portal de Azure, selecciona tu aplicación. 
1. En el menú de la izquierda, selecciona **Deployment Center** (Centro de despliegue).
1. Selecciona **Add** (Añadir). En **Add container** (Añadir contenedor), facilita los siguientes datos:
   - **Nombre**: `datadog`
   - **Fuente de la imagen**: `Docker Hub` u otro registro
   - **Tipo de imagen**: Pública
   - **URL del servidor de registro**: `sitecontainerssampleacr.azurecr.io`
   - **Imagen y etiqueta**: `datadog-dotnet:2.0`
   - **Puerto**: `8126`
1. Selecciona **Aplicar** (Solicitar).

## Siguientes pasos

Cuando termines de instrumentar tu aplicación, ve a la página [Serverless > Azure][8] en Datadog para ver tus datos de observabilidad. Tus logs de aplicación están disponibles en [Log Explorer][9] y tus trazas (traces) están disponibles en [Trace Explorer][10].

[1]: https://azure.github.io/AppService/2024/04/04/Public-Preview-Sidecars-Webjobs.html
[2]: /es/tracing/trace_collection/library_config
[3]: /es/account_management/api-app-keys/
[4]: https://learn.microsoft.com/en-us/azure/app-service/app-service-key-vault-references
[5]: /es/getting_started/site/
[6]: https://app.datadoghq.com/services
[7]: /es/getting_started/tagging/unified_service_tagging/
[8]: https://app.datadoghq.com/functions?cloud=azure
[9]: https://app.datadoghq.com/logs
[10]: https://app.datadoghq.com/apm/traces
[11]: #integrate-the-datadog-tracer
[12]: #create-your-linux-web-app
[13]: #add-datadog-environment-variables
[14]: #add-the-datadog-sidecar