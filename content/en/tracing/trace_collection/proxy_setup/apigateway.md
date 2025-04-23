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
  text: "Amazon EKS on AWS Farate"

---

{{< callout url="#" btn_hidden="true" header="Tracing for Amazon API Gateway is in Preview" >}}
This feature is in Preview.
{{< /callout >}}

Datadog APM supports tracing for API Gateway when API Gateway proxies requests to applications running in Fargate or EC2.

### Prerequisites
- Amazon API Gateway is configured on your environment. Datadog recommends testing on a development environment before releasing to production.
- The API Gateway is using the [REST API][5] (V1) option. The [HTTP API][6] (V2) is not supported.
- Your underlying application is running a [supported web framework](#supported-versions-and-web-frameworks).

#### Supported versions and web frameworks

| Runtime | Datadog Tracer | Tracer version | Frameworks |
| ------- | -------------- | ---------------| ---------- |
| Node.js | `dd-trace-js` | v[4.50.0][1]+ or v[5.26.0][2]+ | express, fastify, hapi, koa, microgateway-core, next, paperplane, restify, router, apollo |
| Go | `dd-trace-go` | v[1.72.1][3]+ | chi, httptreemux, echo, go-restful, fiber, gin, gorilla mux, httprouter, fasthttp, goji |
| Python | `dd-trace-py` | v[3.1.0][4]+ | aiohttp, asgi, bottle, cherrypy, django, djangorestframework, falcon, fastapi, flask, molten, pyramid, sanic, starlette, tornado, wsgi |

## Setup

To see inferred spans for Amazon API Gateway, complete the following steps:

1. Ensure you are using a [supported version](#supported-versions-and-web-frameworks) of the Datadog tracer.

2. Where your application container is deployed, set the environment variable:
   ```
   DD_TRACE_INFERRED_PROXY_SERVICES_ENABLED=true
   ```

3. Add headers and related mappings to Amazon API Gateway.
   API Gateway must pass the following headers in the request for the tracer to create the inferred span:
   | header | value |
   | ------ | ----- |
   | `x-dd-proxy` | `'aws-apigateway'` |
   | `x-dd-proxy-request-time-ms` | `context.requestTimeEpoch` |
   | `x-dd-proxy-domain-name` | `context.domainName` |
   | `x-dd-proxy-httpmethod` | `context.httpMethod` |
   | `x-dd-proxy-path` | `context.path` |
   | `x-dd-proxy-stage` | `context.stage` |

   To pass in these headers, you can use the AWS CDK or AWS Console.

   {{< tabs >}}
   {{% tab "AWS CDK" %}}
   
   To deploy API Gateway with the AWS CDK, add the headers under `requestParameters` and use `$context` variables:

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

   3. Under **Edit integration request**, scroll down to **URL request headers parameters**. Click **Add request header parameter**.

{{< img src="tracing/trace_collection/apigateway/console_headers.png" alt="Your HTTP headers for your API in API Gateway, after you have added all six header parameters." style="width:100%;" >}}

   {{% /tab %}}
   {{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-js/releases/tag/v5.26.0
[2]: https://github.com/DataDog/dd-trace-js/releases/tag/v4.50.0
[3]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.72.1
[4]: https://github.com/DataDog/dd-trace-py/releases/tag/v3.1.0
[5]: https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-rest-api.html
[6]: https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api.html