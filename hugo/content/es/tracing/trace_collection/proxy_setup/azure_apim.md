---
code_lang: azure_apim
code_lang_weight: 70
further_reading:
- link: /integrations/guide/azure-integrations/
  tag: Documentación
  text: Integraciones de Azure
- link: /tracing/guide/ignoring_apm_resources/
  tag: Documentación
  text: Ignorar recursos no deseados en APM
- link: /tracing/trace_collection/trace_context_propagation/
  tag: Documentación
  text: Propagación del contexto de trazas
- link: https://www.datadoghq.com/blog/trace-azure-managed-services-dotnet/
  tag: Blog
  text: Rastrear servicios gestionados por Azure en aplicaciones .NET con Datadog
title: Instrumentación de Azure API Management
type: multi-code-lang
---
Datadog APM puede crear **tramos inferidos** para las solicitudes que pasan a través de Azure API Management hacia sus servicios de backend. Los tramos permiten trazas de extremo a extremo, mapas de servicios y muestreo basado en la puerta de enlace de API Management.

Los tramos inferidos para Azure API Management son compatibles solo para **.NET**, **JavaScript** (Node.js), **Python** y **Java**. Otros runtimes (por ejemplo, Go o PHP) no emiten tramos inferidos de Azure API Management, incluso si admiten tramos inferidos para otras puertas de enlace.

## Requisitos previos {#prerequisites}

- `DD_TRACE_INFERRED_PROXY_SERVICES_ENABLED=true` está configurado en la configuración de su aplicación.
- Su backend utiliza un **runtime compatible**, **versión mínima del trazador** y **framework web** de la tabla siguiente.

### Runtimes y frameworks web compatibles {#supported-runtimes-and-web-frameworks}

| Runtime | Datadog Tracer | Versión mínima del trazador | Frameworks |
| ------- | -------------- | ---------------------- | ---------- |
| Node.js | `dd-trace-js` | v5.87.0+ | express, fastify, hapi, koa, microgateway-core, next, paperplane, restify, router, apollo |
| Python | `dd-trace-py` | v4.6.0+ | aiohttp, asgi, bottle, cherrypy, django, djangorestframework, falcon, fastapi, flask, molten, pyramid, sanic, starlette, tornado, wsgi |
| .NET | `dd-trace-dotnet` | v3.39.0+ | ASP.NET, ASP.NET Core |
| Java | `dd-trace-java` | v1.64.0 | Servlet, Spring Web MVC, Spring WebFlux, Netty, Jetty, Tomcat, Undertow, Vert.x Web, Akka HTTP, Play, Ratpack, Grizzly, Liberty, Restlet, Synapse, Spray, Apache CXF, Axway API Gateway, Azure Functions |

## Configuración {#setup}

Para crear tramos inferidos, Azure API Management debe pasar los siguientes encabezados a sus servicios de backend:

| Encabezado | Valor |
| ------ | ----- |
| `x-dd-proxy` | `azure-apim` |
| `x-dd-proxy-request-time-ms` | Marca de tiempo de la solicitud en milisegundos de Unix |
| `x-dd-proxy-httpmethod` | Método HTTP (por ejemplo, de `context.Operation.Method`) |
| `x-dd-proxy-path` | Plantilla de URL (por ejemplo, de `context.Operation.UrlTemplate`) |
| `x-dd-proxy-region` | Región de implementación (por ejemplo, de `context.Deployment.Region`) |
| `x-dd-proxy-domain-name` | Servidor de solicitud (por ejemplo, de `context.Request.OriginalUrl.Host`) |

### Directiva de entrada {#inbound-policy}

Agregue la siguiente directiva a la sección {{< ui >}}inbound{{< /ui >}} de su API en Azure API Management para que estos encabezados se establezcan en las solicitudes a su backend:

```xml
<set-header name="x-dd-proxy" exists-action="override">
    <value>azure-apim</value>
</set-header>
<set-header name="x-dd-proxy-request-time-ms" exists-action="override">
    <value>@(new DateTimeOffset(context.Timestamp).ToUnixTimeMilliseconds().ToString())</value>
</set-header>
<set-header name="x-dd-proxy-httpmethod" exists-action="override">
    <value>@(context.Operation.Method)</value>
</set-header>
<set-header name="x-dd-proxy-path" exists-action="override">
    <value>@(context.Operation.UrlTemplate)</value>
</set-header>
<set-header name="x-dd-proxy-region" exists-action="override">
    <value>@(context.Deployment.Region)</value>
</set-header>
<set-header name="x-dd-proxy-domain-name" exists-action="override">
    <value>@(context.Request.OriginalUrl.Host)</value>
</set-header>
```

Puede agregar esta directiva a nivel de API en el portal de Azure en {{< ui >}}API Management{{< /ui >}} > su API > {{< ui >}}Design{{< /ui >}} → {{< ui >}}Inbound processing{{< /ui >}} → {{< ui >}}Code view{{< /ui >}} (consulte [Establecer o editar directivas de Azure API Management][4]), mediante la API REST de Azure API Management o directivas en su definición de API.

## Actualizar reglas de muestreo{#update-sampling-rules}

El muestreo basado en encabezados sigue aplicándose al usar el seguimiento de Azure API Management. Debido a que el tramo inferido se convierte en la nueva raíz de la traza, actualice sus reglas para que el valor del servicio coincida con el nombre del servicio de API Management que se muestra en Datadog.

Por ejemplo, si la regla de muestreo original es:

{{< code-block lang="shell" >}}
DD_TRACE_SAMPLING_RULES='[{"service":"my-backend","sample_rate":0.5}]'
{{< /code-block >}}

Actualice la regla para que el valor `service` coincida con el nombre de su API de API Management tal como aparece en Datadog, o elimine la clave `service` para aplicar la regla a todos los tramos raíz:

{{< code-block lang="shell" >}}
DD_TRACE_SAMPLING_RULES='[{"service":"my-azure-apim-api","sample_rate":0.5}]'
{{< /code-block >}}

O aplique a todos los tramos raíz:

{{< code-block lang="shell" >}}
DD_TRACE_SAMPLING_RULES='[{"sample_rate":0.5}]'
{{< /code-block >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[4]: https://learn.microsoft.com/en-us/azure/api-management/set-edit-policies