---
title: Instrumenting Amazon API Gateway
code_lang: apigateway
type: multi-code-lang
code_lang_weight: 60
further_reading:
- link: "/tracing/guide/tutorial-enable-go-aws-ecs-fargate/"
  tag: "Documentation"
  text: "Tutorial - Enabling Tracing for a Go Application on Amazon ECS with Fargate"
- link: "/integrations/ecs_fargate/"
  tag: "Documentation"
  text: "Amazon ECS on AWS Fargate"
- link: "/integrations/eks_fargate"
  tag: "Documentation"
  text: "Amazon EKS on AWS Fargate"

---

{{< callout url="#" btn_hidden="true" header="Tracing for Amazon API Gateway is in Preview" >}}
This feature is in Preview.
{{< /callout >}}


Datadog APM can create **synthetic root spans** for requests that pass through Amazon API Gateway to container- or EC2-hosted services. The spans power end-to-end traces, service maps, and sampling based on the gateway itself.

<div class="alert alert-danger">If your API Gateway integrates with AWS Lambda, do <b>not</b> follow the instructions on this page. <a href="https://docs.datadoghq.com/serverless/aws_lambda/installation/">Datadog Lambda layers</a> already emit inferred API Gateway spans; adding the proxy headers described here can create duplicate or conflicting traces.</div>


### Prerequisites

- Amazon API Gateway is deployed as a [REST API][5] (V1) or [HTTP API][6] (V2).
  
  **Note**: If using HTTP API (V2), `context.requestTimeEpoch` provides second-level granularity, unlike v1 (REST APIs) which provides millisecond precision. This means span duration is approximate. 

- `DD_TRACE_INFERRED_PROXY_SERVICES_ENABLED` is set in the application container:
  {{< code-block lang="shell" >}}
  export DD_TRACE_INFERRED_PROXY_SERVICES_ENABLED=true
  {{< /code-block >}}
  
  Or enable it through the Datadog ECS Fargate CDK construct:
  {{< code-block lang="typescript" >}}
  new DatadogECSFargate(this, 'Datadog', {
    apm: { isEnabled: true, traceInferredProxyServices: true },
  });
  {{< /code-block >}}

- Your underlying application is running a [supported web framework](#supported-versions-and-web-frameworks).
- Your application tracer meets the [minimum version](#supported-versions-and-web-frameworks).

#### Supported versions and web frameworks

| Runtime | Datadog Tracer | Tracer version | Frameworks |
| ------- | -------------- | ---------------| ---------- |
| Node.js | `dd-trace-js` | v[4.50.0][2]+ or v[5.26.0][1]+ | express, fastify, hapi, koa, microgateway-core, next, paperplane, restify, router, apollo |
| Go | `dd-trace-go` | v[1.72.1][3]+ | chi, httptreemux, echo, go-restful, fiber, gin, gorilla mux, httprouter, fasthttp, goji |
| Python | `dd-trace-py` | v[3.1.0][4]+ | aiohttp, asgi, bottle, cherrypy, django, djangorestframework, falcon, fastapi, flask, molten, pyramid, sanic, starlette, tornado, wsgi |

## Setup

API Gateway must pass the following headers in the request for the tracer to create the inferred span:
| header | value |
| ------ | ----- |
| `x-dd-proxy` | `'aws-apigateway'` |
| `x-dd-proxy-request-time-ms` | `context.requestTimeEpoch` |
| `x-dd-proxy-domain-name` | `context.domainName` |
| `x-dd-proxy-httpmethod` | `context.httpMethod` |
| `x-dd-proxy-path` | `context.path` |
| `x-dd-proxy-stage` | `context.stage` |

To pass the headers, complete the following steps for your API type:

### REST API (V1)

To pass in the required headers, you can use the AWS CDK or AWS Console.

{{< tabs >}}
{{% tab "AWS CDK" %}}

Add the headers under `requestParameters` and use `$context` variables:

```
const resource = api.root.addResource('myresource');
 resource.addMethod('ANY', new apigateway.Integration({
   # other configurations
   options: {
     # other options
     requestParameters: {
       "integration.request.header.x-dd-proxy": "'aws-apigateway'",
       "integration.request.header.x-dd-proxy-request-time-ms": "context.requestTimeEpoch",
       "integration.request.header.x-dd-proxy-domain-name": "context.domainName",
       "integration.request.header.x-dd-proxy-httpmethod": "context.httpMethod",
       "integration.request.header.x-dd-proxy-path": "context.path",
       "integration.request.header.x-dd-proxy-stage": "context.stage",
     }
   }
 })
 # other settings here
 });
```
{{% /tab %}}

{{% tab "AWS Console" %}}

1. In the AWS Management Console, navigate to API Gateway and go to your API's **Resources** page. 

2. Go to **Integration request** and click **Edit**.

3. Under **Edit integration request**, go to **URL request headers parameters**. Click **Add request header parameter**.

{{< img src="tracing/trace_collection/apigateway/console_headers.png" alt="Your HTTP headers for your API in API Gateway, after you have added all six header parameters." style="width:100%;" >}}

{{% /tab %}}
{{< /tabs >}}

### HTTP API (V2)

Attach the parameter mapping that injects the headers.

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

## Update sampling rules

Head-based sampling still applies when using API Gateway tracing. Because the synthetic span becomes the new trace root, update your rules so the service value matches the API Gateway service name shown in Datadog.

For example, if the original sampling rule is:

{{< code-block lang="shell" >}}
# before: sampled upstream service
DD_TRACE_SAMPLING_RULES='[{"service":"pythonapp","sample_rate":0.5}]'
{{< /code-block >}}

Update the rule in one of the following ways:
1. Change the `service` value to match your API Gateway's name as it appears in Datadog:

   {{< code-block lang="shell" >}}
   # option 1: sample the gateway root span
   DD_TRACE_SAMPLING_RULES='[{"service":"my-api-gateway","sample_rate":0.5}]'
   {{< /code-block >}}

1. Remove the `service` key to apply the rule to all root spans:
   {{< code-block lang="shell" >}}
   # option 2: apply to all roots
   DD_TRACE_SAMPLING_RULES='[{"sample_rate":0.5}]'
   {{< /code-block >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-js/releases/tag/v5.26.0
[2]: https://github.com/DataDog/dd-trace-js/releases/tag/v4.50.0
[3]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.72.1
[4]: https://github.com/DataDog/dd-trace-py/releases/tag/v3.1.0
[5]: https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-rest-api.html
[6]: https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api.html
[7]: /serverless/aws_lambda/installation/