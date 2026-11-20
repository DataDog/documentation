---
code_lang: azure_apim
code_lang_weight: 70
further_reading:
- link: /integrations/guide/azure-integrations/
  tag: 문서
  text: Azure 통합
- link: /tracing/guide/ignoring_apm_resources/
  tag: 문서
  text: APM에서 원치 않는 리소스 무시
- link: /tracing/trace_collection/trace_context_propagation/
  tag: 문서
  text: 트레이스 컨텍스트 전파
- link: https://www.datadoghq.com/blog/trace-azure-managed-services-dotnet/
  tag: 블로그
  text: Datadog을 사용하여 .NET 애플리케이션에서 Azure 관리형 서비스 추적하기
title: Azure API Management 계측
type: multi-code-lang
---
Datadog APM은 Azure API Management를 통과하여 백엔드 서비스로 전달되는 요청에 대해 **추론된 스팬**을 생성할 수 있습니다. 이 스팬을 통해 API Management 게이트웨이를 기반으로 엔드투엔드 트레이스, 서비스 맵 및 샘플링이 가능합니다.

Azure API Management에 대한 추론된 스팬은 **.NET**, **JavaScript**(Node.js), **Python** 및 **Java**에서만 지원됩니다. 다른 런타임(예: Go 또는 PHP)은 다른 게이트웨이에 대한 추론된 스팬을 지원하더라도 Azure API Management 추론 스팬은 내보내지 않습니다.

## 전제 조건 {#prerequisites}

- `DD_TRACE_INFERRED_PROXY_SERVICES_ENABLED=true`는 애플리케이션 설정에 설정되어 있습니다.
- 백엔드에서는 아래 표의 **지원되는 런타임**, **최소 트레이서 버전**, **웹 프레임워크**를 사용해야 합니다.

### 지원되는 런타임 및 웹 프레임워크 {#supported-runtimes-and-web-frameworks}

| 런타임 | Datadog 트레이서 | 최소 트레이서 버전 | 프레임워크 |
| ------- | -------------- | ---------------------- | ---------- |
| Node.js | `dd-trace-js` | v5.87.0+ | express, fastify, hapi, koa, microgateway-core, next, paperplane, restify, router, apollo |
| Python | `dd-trace-py` | v4.6.0+ | aiohttp, asgi, bottle, cherrypy, django, djangorestframework, falcon, fastapi, flask, molten, pyramid, sanic, starlette, tornado, wsgi |
| .NET | `dd-trace-dotnet` | v3.39.0+ | ASP.NET, ASP.NET Core |
| Java | `dd-trace-java` | v1.64.0 | Servlet, Spring Web MVC, Spring WebFlux, Netty, Jetty, Tomcat, Undertow, Vert.x Web, Akka HTTP, Play, Ratpack, Grizzly, Liberty, Restlet, Synapse, Spray, Apache CXF, Axway API Gateway, Azure Functions |

## 설정 {#setup}

추론된 스팬을 생성하려면 Azure API Management가 다음 헤더를 백엔드 서비스로 전달해야 합니다.

| 헤더 | 값 |
| ------ | ----- |
| `x-dd-proxy` | `azure-apim` |
| `x-dd-proxy-request-time-ms` | Unix 밀리초 단위의 요청 타임스탬프 |
| `x-dd-proxy-httpmethod` | HTTP 메서드(예: `context.Operation.Method`에서) |
| `x-dd-proxy-path` | URL 템플릿(예: `context.Operation.UrlTemplate`에서) |
| `x-dd-proxy-region` | 배포 리전(예: `context.Deployment.Region`에서) |
| `x-dd-proxy-domain-name` | 요청 호스트(예: `context.Request.OriginalUrl.Host`에서) |

### 인바운드 정책 {#inbound-policy}

Azure API Management의 API {{< ui >}}inbound{{< /ui >}} 섹션에 다음 정책을 추가하여 백엔드에 대한 요청에 이러한 헤더가 설정되도록 합니다.

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

이 정책은 Azure 포털의 {{< ui >}}API Management{{< /ui >}} > API > {{< ui >}}Design{{< /ui >}} → {{< ui >}}Inbound processing{{< /ui >}} → {{< ui >}}Code view{{< /ui >}}에서 API 수준으로 추가하거나([Azure API Management 정책 설정 또는 편집][4] 참조) Azure API Management REST API 또는 API 정의의 정책을 사용하여 추가할 수 있습니다.

## 샘플링 규칙 업데이트 {#update-sampling-rules}

Azure API Management 추적을 사용할 때도 헤드 기반 샘플링이 계속 적용됩니다. 추론된 스팬이 새로운 트레이스 루트가 되므로 서비스 값이 Datadog에 표시된 API Management 서비스 이름과 일치하도록 규칙을 업데이트하세요.

예를 들어, 원래 샘플링 규칙이 다음과 같은 경우:

{{< code-block lang="shell" >}}
DD_TRACE_SAMPLING_RULES='[{"service":"my-backend","sample_rate":0.5}]'
{{< /code-block >}}

`service` 값이 Datadog에 표시되는 API Management API 이름과 일치하도록 규칙을 업데이트하거나 `service` 키를 제거하여 모든 루트 스팬에 규칙을 적용합니다.

{{< code-block lang="shell" >}}
DD_TRACE_SAMPLING_RULES='[{"service":"my-azure-apim-api","sample_rate":0.5}]'
{{< /code-block >}}

또는 모든 루트 스팬에 적용합니다.

{{< code-block lang="shell" >}}
DD_TRACE_SAMPLING_RULES='[{"sample_rate":0.5}]'
{{< /code-block >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[4]: https://learn.microsoft.com/en-us/azure/api-management/set-edit-policies