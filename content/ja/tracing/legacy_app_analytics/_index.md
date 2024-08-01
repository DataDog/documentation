---
aliases:
- /ja/tracing/visualization/search/
- /ja/tracing/trace_search_and_analytics/
- /ja/tracing/advanced_usage/
title: App Analytics
---

<div class="alert alert-danger">
このページは、レガシー版 App Analytics に関するコンフィギュレーション情報を伴う非推奨機能について説明します。トラブルシューティングまたは古い設定の修正に利用可能です。トレース全体を完全に制御するには、<a href="/tracing/trace_pipeline">取り込みコントロールおよび保持フィルター</a>を使用してください。
</div>

##  新しいコンフィギュレーションオプションへの移行

[取り込みコントロールページ][1]へ移動し、レガシー版コンフィギュレーションを使用しているサービスを確認します。`Legacy Setup` のステータスでフラグが立てられています。

新しいコンフィギュレーションオプションへ移行するには、`Legacy Setup` のフラグ付きのサービスから、すべてのレガシー版 App Analytics [コンフィギュレーションオプション](#app-analytics-setup)を削除します。次に、Datadog Agent およびトレーシングライブラリの[サンプリングメカニズム][2]を実装してトレースを送信します。

## App Analytics のセットアップ

App Analytics の構成オプションは、トレーシングライブラリと Datadog Agent に配置されています。ライブラリでは、サービスからの分析スパンは、[自動](#automatic-configuration)または[手動](#custom-instrumentation)のいずれかで生成されます。

### トレーシングライブラリで

#### 自動コンフィギュレーション

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php,cpp,nginx" >}}
{{< programming-lang lang="java" >}}

App Analytics は、Java トレースクライアントのバージョン 0.25.0 以降で使用できます。トレースクライアントでコンフィギュレーションパラメーターを 1 つ設定することで、すべての **web サーバー**インテグレーションに対してグローバルに有効にすることができます。

* システムプロパティ: `-Ddd.trace.analytics.enabled=true`
* <mrk mid="40" mtype="seg"/><mrk mid="41" mtype="seg"/>

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

App Analytics は、Python トレースクライアントのバージョン 0.19.0 以降で使用できます。トレースクライアントでコンフィギュレーションパラメーターを 1 つ設定することで、すべての **web** インテグレーションに対して App Analytics をグローバルに有効にできます。

* トレーサー構成: `ddtrace.config.analytics_enabled = True`
* <mrk mid="40" mtype="seg"/><mrk mid="41" mtype="seg"/>

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

App Analyticsは、Ruby トレースクライアントのバージョン 0.19.0 以降で使用できます。グローバルフラグを使用することで、すべての **web** インテグレーションに対して有効にできます。

これを行うには、環境で `DD_TRACE_ANALYTICS_ENABLED=true` を設定するか、次のように構成します。

```ruby
Datadog.configure { |c| c.tracing.analytics.enabled = true }
```

* `true` は、すべての Web フレームワークで分析を有効にします。
* `false` または `nil` は、明示的に有効にされているインテグレーションを除いて分析を無効にします。(デフォルト)

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

App Analyticsは、Go トレースクライアントのバージョン 1.11.0 以降で使用できます。以下を使用することで、すべての **web** インテグレーションにグローバルに有効化できます:

* [`WithAnalytics`][1] トレーサー開始オプション。例:

  ```go
  tracer.Start(tracer.WithAnalytics(true))
  ```

* バージョン 1.26.0 以降は、環境変数 `DD_TRACE_ANALYTICS_ENABLED=true` を使用

[1]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#WithAnalytics
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

App Analytics は、Node.js トレースクライアントのバージョン 0.10.0 以降で使用できます。トレースクライアントでコンフィギュレーションパラメーターを 1 つ設定することで、すべての web インテグレーションに対してグローバルに有効できます。

```javascript
tracer.init({
  analytics: true
})
```

次のコンフィギュレーションパラメーターを使用することもできます。

* <mrk mid="40" mtype="seg"/><mrk mid="41" mtype="seg"/>

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

App Analytics は、.NET トレースクライアントのバージョン 1.1.0 以降で使用できます。トレースクライアントでコンフィギュレーションパラメーターを 1 つ設定することで、すべての **web** インテグレーションに対してグローバルに有効にできます。

* 環境変数または AppSetting: `DD_TRACE_ANALYTICS_ENABLED=true`

これは、コードでも設定できます。

```csharp
Tracer.Instance.Settings.AnalyticsEnabled = true;
```

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

App Analytics は、PHP トレースクライアントのバージョン 0.17.0 以降で使用できます。トレースクライアントでコンフィギュレーションパラメーターを 1 つ設定することで、すべての **web** インテグレーションに対してグローバルに有効にできます。

* <mrk mid="40" mtype="seg"/><mrk mid="41" mtype="seg"/>

{{< /programming-lang >}}
{{< programming-lang lang="cpp" >}}

App Analytics は、C++ トレースクライアントのバージョン 1.0.0 以降で使用できます。環境変数 `DD_TRACE_ANALYTICS_ENABLED` を `true` に設定することで、すべてのサービスエントリスパンに対してグローバルに有効にすることができます。**注**: この設定は、コードで直接設定することもできます。

```csharp
datadog::opentracing::TracerOptions tracer_options;
  tracer_options.agent_host = "dd-agent";
  tracer_options.service = "<サービス名>";
  tracer_options.analytics_rate = 1.0;
  auto tracer = datadog::opentracing::makeTracer(tracer_options);
```

{{< /programming-lang >}}
{{< programming-lang lang="nginx" >}}

Nginx で App Analytics を有効にするには

1. 環境変数 `DD_TRACE_ANALYTICS_ENABLED` を `true` に設定します。

2. `nginx.conf` ファイルの先頭に `env DD_TRACE_ANALYTICS_ENABLED;` を追加します。

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

#### その他のサービスの構成 (オプション)

##### インテグレーションごとの構成

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php" >}}
{{< programming-lang lang="java" >}}

グローバルに設定するほか、次の設定を使用して個々のインテグレーションに対して App Analytics を有効または無効にすることも可能です。

* システムプロパティ: `-Ddd.<integration>.analytics.enabled=true`
* 環境変数: `DD_<INTEGRATION>_ANALYTICS_ENABLED=true`

カスタムサービスを送信するインテグレーションに対し、グローバルコンフィギュレーションに加えて上記を使用します。例えば、カスタムサービスとして送信される JMS スパンの場合、次のように設定して App Analytics ですべての JMS トレースを有効にします。

* システムプロパティ: `-Ddd.jms.analytics.enabled=true`
* 環境変数: `DD_JMS_ANALYTICS_ENABLED=true`

インテグレーション名は、[インテグレーションテーブル][1]にあります。

[1]: /ja/tracing/compatibility_requirements/java/#compatibility
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

グローバルに設定するほか、次の設定を使用して個々のインテグレーションに対して App Analytics を有効または無効にすることも可能です。

* トレーサー構成: `ddtrace.config.<INTEGRATION>.analytics_enabled = True`
* 環境変数: `DD_<INTEGRATION>_ANALYTICS_ENABLED=true`

カスタムサービスを送信するインテグレーションに対し、グローバルコンフィギュレーションに加えて上記を使用します。例えば、カスタムサービスとして送信される Boto スパンの場合、次のように設定して App Analytics ですべての Boto トレースを有効にします。

* トレーサー構成: `ddtrace.config.boto.analytics_enabled = True`
* 環境変数: `DD_BOTO_ANALYTICS_ENABLED=true`

**注**: インテグレーションによっては、そのインテグレーション固有のトレーサーが実装されているため非標準の方法で設定する必要があります。詳細については、[App Analytics][1] のライブラリドキュメントを参照してください。

[1]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#trace_search_analytics
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

特定のインテグレーションに対して App Analytics を有効にすることできます。

それには、環境で `DD_<INTEGRATION>_ANALYTICS_ENABLED=true` を設定するか、以下の構成を使用します。

```ruby
Datadog.configure { |c| c.tracing.instrument :integration, analytics_enabled: true }
```

`integration` は、インテグレーションの名前です。オプションについては、[インテグレーションのリスト][1]を参照してください。

* `true` は、グローバル設定に関係なく、このインテグレーションで分析を有効にします。
* `false` は、グローバル設定に関係なく、このインテグレーションで分析を無効にします。
* `nil` は、グローバルな分析設定を優先させます。

[1]: /ja/tracing/setup/ruby/#library-compatibility
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

グローバル設定に加えて、各インテグレーションで App Analytics を個別に有効または無効にできます。たとえば、標準ライブラリの `net/http` パッケージを構成する場合は、以下のようにします。

<mrk mid="87" mtype="seg">```go
package main

import (
    httptrace &quot;gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http&quot;
    &quot;gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer&quot;
)

func main() {
    tracer.Start()
    defer tracer.Stop()

    mux := httptrace.NewServeMux(httptrace.WithAnalytics(true))
    // ...</mrk>
<mrk mid="88" mtype="seg">}
```</mrk>

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

グローバル設定に加えて、個別のインテグレーションで App Analytics を有効または無効にできます。

たとえば、`express` で App Analytics を有効にするには、以下のようにします。

```js
tracer.use('express', {
  analytics: true
})
```

インテグレーション名は、[インテグレーションテーブル][1]にあります。

[1]: /ja/tracing/setup/nodejs/#integrations
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

グローバル設定に加えて、個別のインテグレーションで App Analytics を有効または無効にできます。

* 環境変数または AppSetting: `DD_<INTEGRATION>_ANALYTICS_ENABLED=true`

コードの場合は次のようになります。

```csharp
Tracer.Instance.Settings.Integrations["<INTEGRATION>"].AnalyticsEnabled = true;
```

たとえば、ASP.NET MVC で App Analytics を有効にするには、以下のようにします。

* 環境変数または AppSetting: `DD_ASPNETMVC_ANALYTICS_ENABLED=true`

コードの場合は次のようになります。

```csharp
Tracer.Instance.Settings.Integrations["AspNetMvc"].AnalyticsEnabled = true;
```

インテグレーション名は、[インテグレーションテーブル][1]にあります。**注:** Linux では、環境変数の名前は大文字と小文字が区別されます。

[1]: /ja/tracing/setup/dotnet/#integrations
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

グローバルに設定するほか、次の設定を使用して個々のインテグレーションに対して App Analytics を有効または無効にすることも可能です。

* 環境変数: `DD_<INTEGRATION>_ANALYTICS_ENABLED=true`

カスタムサービスを送信するインテグレーションに対し、グローバルコンフィギュレーションに加えて上記を使用します。例えば、カスタムサービスとして送信される Symfony スパンの場合、次のように設定して App Analytics ですべての Symfony トレースを有効にします。

* 環境変数: `DD_SYMFONY_ANALYTICS_ENABLED=true`

インテグレーション名は、[インテグレーションテーブル][1]にあります。

[1]: /ja/tracing/setup/php/#integration-names
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

#### データベースサービス

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php" >}}
{{< programming-lang lang="java" >}}


デフォルトでは、App Analytics はデータベーストレースをキャプチャしないため、各インテグレーションに対して手動で収集を有効にする必要があります。例:

* システムプロパティ: `-Ddd.jdbc.analytics.enabled=true`
* 環境変数: `DD_JDBC_ANALYTICS_ENABLED=true`

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

デフォルトでは、App Analytics はデータベーストレースをキャプチャしないため、各インテグレーションに対して手動で収集を有効にする必要があります。例:

* トレーサーコンフィギュレーション: `ddtrace.config.psycopg.analytics_enabled = True`
* 環境変数: `DD_PSYCOPG_ANALYTICS_ENABLED=true`

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

デフォルトでは、App Analytics はデータベーストレースをキャプチャしないため、各インテグレーションに対して手動で収集を有効にする必要があります。例:

```ruby
Datadog.configure { |c| c.tracing.instrument :mongo, analytics_enabled: true }
```

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

デフォルトでは、データベーストレースは App Analytics によりキャプチャされません。各インテグレーションに対し手動で収集を有効にする必要があります。例:

```go
// Analytics が有効になっているデータベースドライバーを登録します。sqltrace.Register("mysql", &mysql.MySQLDriver{}, sqltrace.WithAnalytics(true))
```

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

デフォルトでは、App Analytics はデータベーストレースをキャプチャしないため、各インテグレーションに対して手動で収集を有効にする必要があります。例:

```javascript
tracer.use('mysql', {
  analytics: true
})
```

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

デフォルトでは、App Analytics はデータベーストレースをキャプチャしないため、各インテグレーションに対して手動で収集を有効にする必要があります。例えば、ADO.NET に対して App Analytics を有効にするには以下のようにします。

* 環境変数または AppSetting: `DD_AdoNet_ANALYTICS_ENABLED=true`

コードの場合は次のようになります。

```csharp
Tracer.Instance.Settings.Integrations["AdoNet"].AnalyticsEnabled = true;
```

インテグレーション名は、[インテグレーションテーブル][1]にあります。**注:** Linux では、環境変数の名前は大文字と小文字が区別されます。

[1]: /ja/tracing/setup/dotnet/#integrations
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

デフォルトでは、App Analytics はデータベーストレースをキャプチャしません。次の設定を使用して、個々のインテグレーションに対し App Analytics を有効または無効にすることができます。

* 環境変数: `DD_<INTEGRATION>_ANALYTICS_ENABLED=true`

カスタムサービスを送信するインテグレーションに対し、グローバルコンフィギュレーションに加えて上記を使用します。`mysqli` の場合、次のようになります。

* 環境変数: `DD_MYSQLI_ANALYTICS_ENABLED=true`

インテグレーション名は、[インテグレーションテーブル][1]にあります。

[1]: /ja/tracing/setup/php/#integrations
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

##### カスタムインスツルメンテーション

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php,cpp" >}}
{{< programming-lang lang="java" >}}

カスタムインスツルメンテーションを使用するアプリケーションは、スパンで `ANALYTICS_SAMPLE_RATE` タグを設定することで App Analytics を有効にできます。

```java
import datadog.trace.api.DDTags;
import datadog.trace.api.Trace;
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

class MyClass {
  @Trace
  void myMethod() {
    final Span span = GlobalTracer.get().activeSpan();
    // @Trace アノテーションにより送信されるスパン。
    if (span != null) {
      span.setTag(DDTags.SERVICE, "<SERVICE_NAME>");
      span.setTag(DDTags.ANALYTICS_SAMPLE_RATE, 1.0);
    }
  }
}
```
**注:** [dd.trace.methods][1] または [trace annotations][2] スパン向けの App analytics は、`-Ddd.trace-annotation.analytics.enabled=true` の設定により有効化することができます。


[1]: https://docs.datadoghq.com/ja/tracing/custom_instrumentation/java/#dd-trace-methods
[2]: https://docs.datadoghq.com/ja/tracing/custom_instrumentation/java/#trace-annotations
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

カスタムインスツルメンテーションを使用するアプリケーションは、スパンで `ddtrace.constants.ANALYTICS_SAMPLE_RATE_KEY` タグを設定することで App Analytics を有効にできます。

```python
from ddtrace import tracer
from ddtrace.constants import ANALYTICS_SAMPLE_RATE_KEY

@tracer.wrap()
def my_method():
    span = tracer.current_span()
    span.set_tag(ANALYTICS_SAMPLE_RATE_KEY, True)
```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

カスタムインスツルメンテーションを使用するアプリケーションは、スパンで `Analytics::TAG_ENABLED` タグを設定することで App Analytics を有効にできます。

```ruby
Datadog::Tracing.trace('my.task') do |span|
  # 分析サンプリングレートを 1.0 に設定します
  span.set_tag(Datadog::Tracing::Metadata::Ext::Analytics::TAG_ENABLED, true)
end
```

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

カスタムインスツルメンテーションの場合、以下に示すように、スパンで App Analytics を有効にするための特別なタグが追加されています。

```go
span.SetTag(ext.AnalyticsEvent, true)
```

これにより、スパンが App Analytics イベントとしてマークされます。

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

カスタムインスツルメンテーションを使用するアプリケーションは、スパンで `ANALYTICS` タグを設定することで App Analytics を有効にできます。

```javascript
const { ANALYTICS } = require('dd-trace/ext/tags')

span.setTag(ANALYTICS, true)
```

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

カスタムインスツルメンテーションを使用するアプリケーションは、スパンで `Tags.Analytics` タグを設定することで App Analytics を有効にできます。

```csharp
using Datadog.Trace;

using(var scope = Tracer.Instance.StartActive("web.request"))
{
    // このスパンで Analytics を有効にします
    scope.span.SetTag(Tags.Analytics, "true");
}

```

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

カスタムインスツルメンテーションを使用するアプリケーションは、スパンで `ANALYTICS_KEY` タグを設定することで App Analytics を有効にできます。

```php
<?php
  // ... App Analytics を有効にする既存のスパン
  $span->setTag(Tag::ANALYTICS_KEY, true);
?>
```

{{< /programming-lang >}}
{{< programming-lang lang="cpp" >}}

カスタムインスツルメンテーションを使用するアプリケーションは、スパンで `analytics_event` タグを設定することで App Analytics を有効にできます。

```cpp
...
#include <datadog/tags.h>
...
auto tracer = ...
auto span = tracer->StartSpan("operation_name");
// true のブール値はスパンに対して App Analytics を有効にします
//（サンプルレートは 1.0）。
span->SetTag(datadog::tags::analytics_event, true);
// 0.0～1.0 のダブル値は App Analytics を有効にし、
//サンプルレートを指定された値に設定します。
span->SetTag(datadog::tags::analytics_event, 0.5);
```

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Datadog Agent で

<div class="alert alert-danger">
このセクションでは、レガシー App Analytics に関連する構成情報とともに、非推奨の機能について説明します。
</div>

サービスごとに解析するスパンの割合を構成するには、`datadog.yaml` ファイルに以下のように設定します。
```
apm_config:
  analyzed_rate_by_service:
    service_A: 1
    service_B: 0.2
    service_C: 0.05
```

サービスおよび操作名ごとに解析するスパンの割合を構成するには、`datadog.yaml` ファイルに以下のように設定します。

```
apm_config:
  analyzed_spans:
    service_A|operation_name_X: 1
    service_A|operation_name_Y: 0.25
    service_B|operation_name_Z: 0.01
```

## トラブルシューティング: 1 秒あたりの最大イベント制限

Agent ログに以下のエラーメッセージが表示される場合、アプリケーションは、デフォルトで APM で許可されている毎秒 200 件を超えるトレースイベントを発行しています。

```
Max events per second reached (current=300.00/s, max=200.00/s). Some events are now being dropped (sample rate=0.54). Consider adjusting event sampling rates.

```

Agent の APM レート制限を増やすには、Agent のコンフィギュレーションファイル (`apm_config:` セクションの下) 内で `max_events_per_second` 属性を構成します。コンテナ化されたデプロイメント (Docker、Kubernetes など) の場合は、`DD_APM_MAX_EPS` 環境変数を使用します。

**注**: APM レート制限を増やすと、App Analytics のコストが増加する可能性があります。


[1]: /ja/tracing/trace_pipeline/ingestion_controls/
[2]: /ja/tracing/trace_pipeline/ingestion_mechanisms/