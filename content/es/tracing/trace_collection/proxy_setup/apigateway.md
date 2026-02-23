---
code_lang: apigateway
code_lang_weight: 60
further_reading:
- link: /tracing/guide/tutorial-enable-go-aws-ecs-fargate/
  tag: Documentación
  text: 'Tutorial: Activación del rastreo para una aplicación Go en Amazon ECS con
    Fargate'
- link: /integrations/ecs_fargate/
  tag: Documentación
  text: Amazon ECS en AWS Fargate
- link: /integrations/eks_fargate
  tag: Documentación
  text: Amazon EKS en AWS Fargate
title: Instrumentación de Amazon API Gateway
type: lenguaje de código múltiple
---

{{< callout url="#" btn_hidden="true" header="El rastreo para Amazon API Gateway está en vista previa" >}}
Esta función está en vista previa.
{{< /callout >}}


Datadog APM puede crear **tramos inferidos** para las solicitudes que pasan por Amazon API Gateway a servicios alojados en contenedores o EC2. Los tramos potencian las trazas (traces) de extremo a extremo, los mapas de servicios y el muestreo basado en la propia puerta de enlace.

<div class="alert alert-warning">Si tu API Gateway se integra con AWS Lambda, <b>no</b> sigas las instrucciones de esta página. Las <a href="https://docs.datadoghq.com/serverless/aws_lambda/installation/">capas Datadog Lambda</a> ya emiten tramos (spans) inferidos de API Gateway. Al añadir las cabeceras de proxy descritas aquí se pueden crear trazas duplicadas o conflictivas.</div>


### Requisitos previos

- Amazon API Gateway se despliega como una [API REST][5] (v1) o una [API HTTP][6] (v2).

  **Nota**: Si se utiliza la API HTTP (v2), `context.requestTimeEpoch` proporciona una especificidad de segundo nivel, a diferencia de las API REST (v1) que proporcionan una precisión de milisegundos. Esto significa que la duración del tramo es aproximada. 

- `DD_TRACE_INFERRED_PROXY_SERVICES_ENABLED` está configurado en el contenedor de la aplicación:
  {{< code-block lang="shell" >}}
  export DD_TRACE_INFERRED_PROXY_SERVICES_ENABLED=true
  {{< /code-block >}}

  Alternativamente, puedes habilitarlo a través del constructo CDK de ECS Fargate en Datadog:
  {{< code-block lang="typescript" >}}
  new DatadogECSFargate(this, 'Datadog', {
    apm: { isEnabled: true, traceInferredProxyServices: true },
  });
  {{< /code-block >}}

  O puedes habilitarlo a través del módulo Terraform de ECS Fargate en Datadog:
  {{< code-block lang="typescript" >}}
  module "ecs_fargate_task" { 
    dd_apm = {
      enabled = true,
      trace_inferred_proxy_services = true
    }
  }
  {{< /code-block >}}

- Tu aplicación subyacente está ejecutando un [marco web compatible](#supported-versions-and-web-frameworks).
- Tu rastreador de aplicaciones cumple la [versión mínima](#supported-versions-and-web-frameworks).

#### Versiones y marcos web compatibles

| Tiempo de ejecución | Rastreador Datadog | Versión del rastreador | Frameworks |
| ------- | -------------- | ---------------| ---------- |
| Node.js | `dd-trace-js` | v[4.50.0][2] o posterior o v[5.26.0][1] o posterior | express, fastify, hapi, koa, microgateway-core, next, paperplane, restify, router, apollo |
| Go | `dd-trace-go` | v[1.72.1][3] o posterior | chi, httptreemux, echo, go-restful, fiber, gin, gorilla mux, httprouter, fasthttp, goji |
| Python | `dd-trace-py` | v[3.1.0][4] o posterior | aiohttp, asgi, bottle, cherrypy, django, djangorestframework, falcon, fastapi, flask, molten, pyramid, sanic, starlette, tornado, wsgi |
| PHP | `dd-trace-php` | v[1.8.0][7] o posterior | CakePHP, CodeIgniter, Drupal, FuelPHP, Laminas, Laravel, Lumen, Magento, Neos Flow, Phalcon, Roadrunner, Slim, Symfony, WordPress, Zend Framework |
| .NET | `dd-trace-dotnet` | v[3.15.0][8] o posterior | ASP.NET, ASP.NET Core |
| Java | `dd-trace-java` | v[1.56.0][9] o posterior | akka-http, axway-api, azure-functions, finatra, grizzly, jetty, liberty, micronaut, netty, pekko-http, play, ratpack, restlet, servlet, spring-web, spray, synapse, tomcat, undertow, vertx |

## Instalación

{{< tabs >}}
{{% tab "API REST (v1)" %}}

Para crear tramos inferidos, API Gateway debe pasar las siguientes cabeceras a tus servicios backend:
| Cabecera | Valor |
| ------ | ----- |
| `x-dd-proxy` | `'aws-apigateway'` <br><br> **Nota**: Deben incluirse comillas simples. |
| `x-dd-proxy-request-time-ms` | `context.requestTimeEpoch` |
| `x-dd-proxy-domain-name` | `context.domainName` |
| `x-dd-proxy-httpmethod` | `context.httpMethod` |
| `x-dd-proxy-path` | `context.path` |
| `x-dd-proxy-stage` | `context.stage` |

Para introducir las cabeceras necesarias, puedes utilizar el CDK AWS o la consola AWS:

{{% collapse-content title="CDK AWS" level="h4" expanded=false id="id-for-anchoring" %}}

Añade las cabeceras en `requestParameters` y utiliza las variables `$context`:

```
import { DatadogAPIGatewayRequestParameters } from "datadog-cdk-constructs-v2";

// Datadog integration definition
const ddIntegration = new apigateway.Integration({
  type: apigateway.IntegrationType.HTTP_PROXY,
  integrationHttpMethod: "ANY",
  options: {
    connectionType: apigateway.ConnectionType.INTERNET,
    requestParameters: DatadogAPIGatewayRequestParameters,
  },
  uri: `http://${loadBalancer.loadBalancerDnsName}`,
});

const api = new apigateway.RestApi(this, "MyApi", {
  restApiName: "my-api-gateway",
  deployOptions: { stageName: "prod" },
  defaultIntegration: ddIntegration, // Datadog instrumentation applied here
});
```

{{% /collapse-content %}}


{{% collapse-content title="Consola AWS" level="h4" expanded=false id="id-for-anchoring" %}}


1. En la consola de AWS Management, ve a API Gateway y luego a la página **Recursos** de tu API.

2. Ve a **Integration request** (Solicitud de integración) y haz clic en **Editar** (Edit).

3. En **Edit integration request** (Editar solicitud de integración), ve a **URL request headers parameters** (Parámetros de cabecera de solicitud URL). Haz clic en **Add request header parameter** (Añadir parámetro de cabecera de solicitud).

{{< img src="tracing/trace_collection/apigateway/console_headers.png" alt="Tus cabeceras HTTP de tu API en API Gateway luego de añadir los seis parámetros de cabecera." style="width:100%;" >}}


{{% /collapse-content %}}

{{% /tab %}}

{{% tab "API HTTP (v2)" %}}

Para crear tramos inferidos, API Gateway debe pasar las siguientes cabeceras a tus servicios backend:

| Cabecera | Valor |
| ------ | ----- |
| `x-dd-proxy` | `aws-apigateway` |
| `x-dd-proxy-request-time-ms` | `${context.requestTimeEpoch}000` |
| `x-dd-proxy-domain-name` | `$context.domainName` |
| `x-dd-proxy-httpmethod` | `$context.httpMethod` |
| `x-dd-proxy-path` | `$context.path` |
| `x-dd-proxy-stage` | `$context.stage` |

**Nota**: `context.requestTimeEpoch` devuelve una marca de tiempo en segundos en las API v2. Datadog espera milisegundos, por lo que debes multiplicar por 1000 añadiendo `000`.

Adjunta la asignación de parámetros que inyecta las cabeceras:

{{< code-block lang="typescript" >}}
   import { DatadogAPIGatewayV2ParameterMapping }
     from 'datadog-cdk-constructs-v2';

   const ddIntegration = new apigatewayv2_integrations.HttpUrlIntegration(
     'HttpUrlIntegration',
     'https://example.com',
     { parameterMapping: DatadogAPIGatewayV2ParameterMapping },
   );

   new apigatewayv2.HttpApi(this, 'HttpApi', {
     apiName: 'my-http-api',
     routes: [{
       path: '/{proxy+}',
       methods: [apigatewayv2.HttpMethod.ANY],
       integration: ddIntegration,
     }],
   });
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}


## Actualizar las normas de muestreo

El muestreo basado en cabeceras se sigue aplicando cuando se utiliza el rastreo de API Gateway. Debido a que el tramo inferido se convierte en la raíz de la nueva traza, actualiza tus reglas para que el valor de servicio coincida con el nombre de servicio de API Gateway que se muestra en Datadog.

Por ejemplo, si la regla de muestreo original es:

{{< code-block lang="shell" >}}
# antes: servicio ascendente muestreado
DD_TRACE_SAMPLING_RULES='[{"service":"pythonapp","sample_rate":0.5}]'
{{< /code-block >}}

Actualiza la regla de una de las siguientes maneras:
1. Cambia el valor de `service` para que coincida con el nombre de tu API Gateway, tal y como aparece en Datadog:

   {{< code-block lang="shell" >}}
   # opción 1: muestrear el tramo raíz de la puerta de enlace
   DD_TRACE_SAMPLING_RULES='[{"service":"my-api-gateway","sample_rate":0.5}]'
   {{< /code-block >}}

1. Elimina la clave `service` para aplicar la regla a todos los tramos raíz:
   {{< code-block lang="shell" >}}
   # opción 2: aplicar a todas las raíces
   DD_TRACE_SAMPLING_RULES='[{"sample_rate":0.5}]'
   {{< /code-block >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-js/releases/tag/v5.26.0
[2]: https://github.com/DataDog/dd-trace-js/releases/tag/v4.50.0
[3]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.72.1
[4]: https://github.com/DataDog/dd-trace-py/releases/tag/v3.1.0
[5]: https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-rest-api.html
[6]: https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api.html
[7]: https://github.com/DataDog/dd-trace-php/releases/tag/1.8.0
[8]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v3.15.0
[9]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.56.0