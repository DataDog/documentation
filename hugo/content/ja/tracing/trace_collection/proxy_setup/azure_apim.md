---
code_lang: azure_apim
code_lang_weight: 70
further_reading:
- link: /integrations/guide/azure-integrations/
  tag: ドキュメント
  text: Azure インテグレーション
- link: /tracing/guide/ignoring_apm_resources/
  tag: ドキュメント
  text: APM で不要なリソースを無視する
- link: /tracing/trace_collection/trace_context_propagation/
  tag: ドキュメント
  text: トレースコンテキスト伝搬
- link: https://www.datadoghq.com/blog/trace-azure-managed-services-dotnet/
  tag: ブログ
  text: Datadog を使用して .NET アプリケーションで Azure マネージドサービスをトレースする
title: Azure API Management のインスツルメンテーション
type: multi-code-lang
---
Datadog APM は、Azure API Management を経由してバックエンドサービスに送信されるリクエストに対して **推論スパン**を作成できます。これらのスパンにより、エンドツーエンドのトレース、サービスマップ、および API Management ゲートウェイに基づいたサンプリングが可能になります。

Azure API Management の推論スパンは、**.NET**、**JavaScript** (Node.js)、**Python**、および **Java** でのみサポートされています。その他のランタイム (Go や PHP など) は、他のゲートウェイの推論スパンをサポートしている場合でも、Azure API Management の推論スパンを出力しません。

## 前提条件 {#prerequisites}

- `DD_TRACE_INFERRED_PROXY_SERVICES_ENABLED=true` はアプリケーション設定で設定されます。
- バックエンドで、以下の表に記載されている**サポートされているランタイム**、**トレーサーの最小バージョン**、および **Web フレームワーク**を使用していること。

### サポートされているランタイムと Web フレームワーク {#supported-runtimes-and-web-frameworks}

| ランタイム | Datadog Tracer | 最小トレーサーバージョン | フレームワーク |
| ------- | -------------- | ---------------------- | ---------- |
| Node.js | `dd-trace-js` | v5.87.0+ | express、fastify、hapi、koa、microgateway-core、next、paperplane、restify、router、apollo |
| Python | `dd-trace-py` | v4.6.0+ | aiohttp、asgi、bottle、cherrypy、django、djangorestframework、falcon、fastapi、flask、molten、pyramid、sanic、starlette、tornado、wsgi |
| .NET | `dd-trace-dotnet` | v3.39.0+ | ASP.NET、ASP.NET Core |
| Java | `dd-trace-java` | v1.64.0 | Servlet、Spring Web MVC、Spring WebFlux、Netty、Jetty、Tomcat、Undertow、Vert.x Web、Akka HTTP、Play、Ratpack、Grizzly, Liberty、Restlet、Synapse、Spray、Apache CXF、Axway API Gateway、Azure Functions |

## セットアップ {#setup}

推論スパンを作成するには、Azure API Management が以下のヘッダーをバックエンドサービスに渡す必要があります。

| ヘッダー | 値 |
| ------ | ----- |
| `x-dd-proxy` | `azure-apim` |
| `x-dd-proxy-request-time-ms` | Unix ミリ秒単位のリクエストタイムスタンプ |
| `x-dd-proxy-httpmethod` | HTTP メソッド (例: `context.Operation.Method` から) |
| `x-dd-proxy-path` | URL テンプレート (例: `context.Operation.UrlTemplate` から) |
| `x-dd-proxy-region` | デプロイリージョン (例: `context.Deployment.Region` から)|
| `x-dd-proxy-domain-name` | ホスト (例: `context.Request.OriginalUrl.Host`から)|

### インバウンドポリシー{#inbound-policy}

Azure API Management で API の{{< ui >}}inbound{{< /ui >}} セクションに以下のポリシーを追加して、バックエンドへのリクエストにこれらのヘッダーが設定されるようにします。

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

このポリシーは、Azure ポータルの [{{< ui >}}API Management{{< /ui >}}] > [API] > [{{< ui >}}Design{{< /ui >}}] → [{{< ui >}}Inbound processing{{< /ui >}}] → [{{< ui >}}Code view{{< /ui >}}] ([Azure API Management ポリシーの設定または編集][4]を参照)、Azure API Management REST API、または API 定義内のポリシーを使用して、API レベルで追加できます。

## サンプリングルールの更新{#update-sampling-rules}

Azure API Management トレースを使用する場合でも、ヘッドベースのサンプリングが適用されます。推論スパンが新しいトレースのルートになるため、ルールを更新して、サービスの値が Datadog に表示される API Management サービス名と一致するようにします。

たとえば、元のサンプリングルールが以下の場合:

{{< code-block lang="shell" >}}
DD_TRACE_SAMPLING_RULES='[{"service":"my-backend","sample_rate":0.5}]'
{{< /code-block >}}

ルールを更新して、`service` の値が Datadog に表示される API Management API 名と一致するようにするか、`service` キーを削除してルールをすべてのルートスパンに適用します。

{{< code-block lang="shell" >}}
DD_TRACE_SAMPLING_RULES='[{"service":"my-azure-apim-api","sample_rate":0.5}]'
{{< /code-block >}}

または、すべてのルートスパンに適用します。

{{< code-block lang="shell" >}}
DD_TRACE_SAMPLING_RULES='[{"sample_rate":0.5}]'
{{< /code-block >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[4]: https://learn.microsoft.com/en-us/azure/api-management/set-edit-policies