---
aliases:
- /ja/tracing/faq/resource-trace-doesn-t-show-up-under-correct-service/
further_reading:
- link: /tracing/trace_collection/
  tag: Documentation
  text: Learn how to setup APM tracing with your application
- link: /tracing/service_catalog/
  tag: Documentation
  text: Discover and catalog the services reporting to Datadog
- link: /tracing/services/service_page/
  tag: Documentation
  text: Learn more about services in Datadog
- link: /tracing/services/resource_page/
  tag: Documentation
  text: Dive into your resource performance and traces
- link: /tracing/trace_explorer/trace_view/
  tag: Documentation
  text: Understand how to read a Datadog Trace
title: Primary Operations in Services
---

## APM サービス

APM services calculate trace metrics for errors, throughput, and latency. These are calculated based on resources that match a single span name, deemed the primary operation. These service metrics are used throughout the product, both as the default Service Page, in the Service Catalog, and the Service Map.

**注**: トレースメトリクスは、`trace.*` [ネームスペース][1]に基づき照会できます。

## プライマリオペレーション
### 定義

サービスのプライマリオペレーション名により、サービスが UI でどのように表示されるかが決まります。Datadog のバックエンドは、リクエストスループットに基づいて、サービスのエントリーポイントとみなされるオペレーション名を自動的に選択します。

たとえば、`web-store` サービスは、リソースとしてインスツルメントされた複数のエンドポイントを持つことができます。これらのリソースでは、サービスのエントリーポイントが一致しているため、同じプライマリオペレーションを共有できます。例を挙げると、リソース `/user/home` と `/user/new` は共に、同じプライマリオペレーション `web.request` を持ちます。他の言語では、サービスのプライマリオペレーションは以下のような形式をとります。

| サービスの種類           | プライマリオペレーション                                 |
|------------------------|---------------------------------------------------|
| web                    | `servlet.request`、`flask.request`、`web.request` |
| db                     | `postgres.query`、`db.query`                      |
| カスタムインスツルメンテーション | `trace.annotation`、`method.call`                 |

### 構成

1  つのサービスに複数のプライマリオペレーションが定義されている場合は、最も高いリクエストスループットによってオペレーションが自動的に選択され、サービスのエントリーポイントとなります。管理者ユーザーはこれを手動で設定できます。

1. [APM 設定ページ][2]に移動します。
2. **Primary Operation Name** タブを選択します。
3. 手動設定を行うサービスの編集アイコンをクリックします。
4. **Set Manually** タブをクリックします。
5. サービスのエントリーポイントとして設定するオペレーションを選択します。
6. **Save** をクリックします。

{{< img src="tracing/guide/primary_operation/configuring-primary-option.png" alt="APM の保存" >}}

## 追加スパン名の統計を表示する

すべてのトレースがインスツルメンテーション以外でも Datadog に正しく送信されているか確認するには、追加スパン名によりリソースを表示できます。追加スパン名はセカンダリオペレーションとしてドロップダウンメニューで表示されます。ただし、追加スパン名はサービスレベルの統計の計算には使用されません。

{{< img src="tracing/guide/primary_operation/dropdown.mp4" alt="APM の保存" video=true >}}

## 手動インスツルメンテーション

カスタムスパンを作成する際は、リソースが確実に同じプライマリオペレーション (例: `web.request`) で分類されるよう、スパン名を静的に設定します。スパン名が動的に設定されている場合は、リソースとして設定します (たとえば `/user/profile`)。

詳細は、プログラミング言語の[カスタムインスツルメンテーション][3]をご参照ください。

## OpenTracing

Datadog を使用している場合、OpenTracing オペレーション名はリソース、OpenTracing "component" タグは Datadog のスパン名となります。たとえば、リソースが "/user/profile"、スパン名が "http.request" のスパンを OpenTracing 用語で定義するには、次のようになります。

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php,cpp" >}}
{{< programming-lang lang="java" >}}



```java
Span span = tracer.buildSpan("http.request").start();

try (Scope scope = tracer.activateSpan(span)) {
    span.setTag("service.name", "service_name");
    span.setTag("resource.name", "/user/profile");
    // トレースされるコード
} finally {
    span.finish();
}

```

詳細は、[Java および OpenTracing のセットアップ][1]をご参照ください。


[1]: /ja/tracing/trace_collection/opentracing/java/#opentracing
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

```python
from ddtrace.opentracer.tags import Tags
import opentracing
span = opentracing.tracer.start_span('http.request')
span.set_tag(Tags.RESOURCE_NAME, '/user/profile')
span.set_tag(Tags.SPAN_TYPE, 'web')

# ...
span.finish()

```

詳細は、[Python および OpenTracing のセットアップ][1]をご参照ください。


[1]: /ja/tracing/trace_collection/opentracing/python/#opentracing
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}


```ruby
OpenTracing.start_active_span('http.request') do |scope|
  scope.span.datadog_span.resource = '/user/profile'
  # トレースされるコード
end
```
詳細は、[Ruby および OpenTracing のセットアップ][1]をご参照ください。


[1]: /ja/tracing/trace_collection/opentracing/ruby/#opentracing
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}


```go
opentracing.StartSpan("http.request", opentracer.ResourceName("/user/profile"))
```

詳細は、[Go および OpenTracing のセットアップ][1]をご参照ください。


[1]: /ja/tracing/trace_collection/opentracing/go/#opentracing
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}


```javascript
const span = tracer.startSpan('http.request');
span.setTag('resource.name',  '/user/profile')
span.setTag('span.type', 'web')
// トレースされるコード
span.finish();
```

詳細は、[Node.js および OpenTracing のセットアップ][1]をご参照ください。


[1]: /ja/tracing/trace_collection/opentracing/nodejs/#opentracing
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}


```csharp
using OpenTracing;
using OpenTracing.Util;

using (var scope = GlobalTracer.Instance.BuildSpan("http.request").StartActive(finishSpanOnDispose: true))
{
    scope.Span.SetTag("resource.name", "/user/profile");
    // トレースされるコード
}

```

詳細は、[.NET および OpenTracing のセットアップ][1]をご参照ください。


[1]: /ja/tracing/trace_collection/opentracing/dotnet/#opentracing
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}


```php
// Composer のオートローダーのインポート後、index.php の初めに一度。
// OpenTracing 1.0-beta6 以下の場合
$otTracer = new \DDTrace\OpenTracer\Tracer(\DDTrace\GlobalTracer::get());
// OpenTracing >= 1.0 以降の場合
$otTracer = new \DDTrace\OpenTracer1\Tracer(\DDTrace\GlobalTracer::get());
// グローバルのトレーサーラッパーを登録
 \OpenTracing\GlobalTracer::set($otTracer);

// アプリケーションコードの任意の場所
$otTracer = \OpenTracing\GlobalTracer::get();
$scope = $otTracer->startActiveSpan('http.request');
$span = $scope->getSpan();
$span->setTag('service.name', 'service_name');
$span->setTag('resource.name', '/user/profile');
$span->setTag('span.type', 'web');
// ...OpenTracing を予期されるとおりに使用
$scope->close();
```

詳細は、[PHP および OpenTracing のセットアップ][1]をご参照ください。


[1]: /ja/tracing/trace_collection/opentracing/php/#opentracing
{{< /programming-lang >}}
{{< programming-lang lang="cpp" >}}


```cpp
// 現在のリクエストにルートスパンを作成。
auto root_span = tracer->StartSpan("web.request");
// ルートスパンにリソース名を設定。
root_span->SetTag(datadog::tags::resource_name, "/user/profile");
```

詳細は、[C++ および カスタムインスツルメンテーションのセットアップ][1]をご参照ください。


[1]: /ja/tracing/trace_collection/custom_instrumentation/cpp/#manually-instrument-a-method
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/tracing/metrics/metrics_namespace/
[2]: https://app.datadoghq.com/apm/settings
[3]: /ja/tracing/trace_collection/custom_instrumentation/