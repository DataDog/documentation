---
title: App Analytics
kind: documentation
aliases:
  - /ja/tracing/visualization/search/
  - /ja/tracing/trace_search_and_analytics/
  - /ja/tracing/advanced_usage/
---
{{< wistia vrmqr812sz >}}
</br>
[App Analytics][1] (旧 Trace Search & Analytics) を使うと、`customer_id`、`error_type`、`app_name` などのユーザー定義タグで Indexed span を絞り込み、リクエストのトラブルシューティングやフィルタリングを行うことができます。次の方法で有効にできます。

* サービスから関連する分析を出力するように APM トレーサーを構成します。これは[自動](#自動コンフィギュレーション)または[手動](#カスタムインスツルメンテーション)で設定できます。次に、[Datadog 内で App Analytics を有効にして][1]、これらの分析の転送を開始します。

**注**: App Analytics を使用するには、Agent v6.7 以上を使用してください。

## 自動コンフィギュレーション

{{< tabs >}}
{{% tab "Java" %}}

App Analytics は、Java トレースクライアントのバージョン 0.25.0 以降で使用できます。トレースクライアントでコンフィギュレーションパラメーターを 1 つ設定することで、すべての **web サーバー**インテグレーションに対してグローバルに有効にすることができます。

* システムプロパティ: `-Ddd.trace.analytics.enabled=true`
* <mrk mid="40" mtype="seg"/><mrk mid="41" mtype="seg"/>

{{% /tab %}}
{{% tab "Python" %}}

App Analytics は、Python トレースクライアントのバージョン 0.19.0 以降で使用できます。トレースクライアントでコンフィギュレーションパラメーターを 1 つ設定することで、すべての **web** インテグレーションに対して App Analytics をグローバルに有効にできます。

* トレーサー構成: `ddtrace.config.analytics_enabled = True`
* <mrk mid="40" mtype="seg"/><mrk mid="41" mtype="seg"/>

{{% /tab %}}
{{% tab "Ruby" %}}

App Analyticsは、Ruby トレースクライアントのバージョン 0.19.0 以降で使用できます。グローバルフラグを使用することで、すべての **web** インテグレーションに対して有効にできます。

これを行うには、環境で `DD_TRACE_ANALYTICS_ENABLED=true` を設定するか、次のように構成します。

```ruby
Datadog.configure { |c| c.analytics_enabled = true }
```

* `true` は、すべての Web フレームワークで分析を有効にします。
* `false` または `nil` は、明示的に有効にされているインテグレーションを除いて分析を無効にします。(デフォルト)

{{% /tab %}}
{{% tab "Go" %}}

App Analyticsは、Go トレースクライアントのバージョン 1.11.0 以降で使用できます。以下を使用することで、すべての **web** インテグレーションにグローバルに有効化できます:

* [`WithAnalytics`][1] トレーサー開始オプション。例:

  ```go
  tracer.Start(tracer.WithAnalytics(true))
  ```

* バージョン 1.26.0 以降は、環境変数 `DD_TRACE_ANALYTICS_ENABLED=true` を使用

[1]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#WithAnalytics
{{% /tab %}}
{{% tab "Node.js" %}}

App Analytics は、Node.js トレースクライアントのバージョン 0.10.0 以降で使用できます。トレースクライアントでコンフィギュレーションパラメーターを 1 つ設定することで、すべての web インテグレーションに対してグローバルに有効できます。

```javascript
tracer.init({
  analytics: true
})
```

次のコンフィギュレーションパラメーターを使用することもできます。

* <mrk mid="40" mtype="seg"/><mrk mid="41" mtype="seg"/>

{{% /tab %}}
{{% tab ".NET" %}}

App Analytics は、.NET トレースクライアントのバージョン 1.1.0 以降で使用できます。トレースクライアントでコンフィギュレーションパラメーターを 1 つ設定することで、すべての **web** インテグレーションに対してグローバルに有効にできます。

* 環境変数または AppSetting: `DD_TRACE_ANALYTICS_ENABLED=true`

これは、コードでも設定できます。

```csharp
Tracer.Instance.Settings.AnalyticsEnabled = true;
```

{{% /tab %}}
{{% tab "PHP" %}}

App Analytics は、PHP トレースクライアントのバージョン 0.17.0 以降で使用できます。トレースクライアントでコンフィギュレーションパラメーターを 1 つ設定することで、すべての **web** インテグレーションに対してグローバルに有効にできます。

* <mrk mid="40" mtype="seg"/><mrk mid="41" mtype="seg"/>

{{% /tab %}}
{{% tab "C++" %}}

App Analytics は、C++ トレースクライアントのバージョン 1.0.0 以降で使用できます。環境変数 `DD_TRACE_ANALYTICS_ENABLED` を `true` に設定することで、すべてのトップレベルスパンに対してグローバルに有効にすることができます。なお、この設定は、コードで直接設定することもできます。

```csharp
datadog::opentracing::TracerOptions tracer_options;
  tracer_options.agent_host = "dd-agent";
  tracer_options.service = "<サービス名>";
  tracer_options.analytics_rate = 1.0;
  auto tracer = datadog::opentracing::makeTracer(tracer_options);
```

{{% /tab %}}
{{% tab "Nginx" %}}

Nginx で App Analytics を有効にするには

1. 環境変数 `DD_TRACE_ANALYTICS_ENABLED` を `true` に設定します。

2. `nginx.conf` ファイルの先頭に `env DD_TRACE_ANALYTICS_ENABLED;` を追加します。

{{% /tab %}}
{{< /tabs >}}

有効にすると、App Analytics UI に結果が表示されます。[App Analytics ページ][1]にアクセスして使用を開始します。

## その他のサービスの構成 (オプション)

### インテグレーションごとの構成

{{< tabs >}}
{{% tab "Java" %}}

グローバルに設定するほか、次の設定を使用して個々のインテグレーションに対して App Analytics を有効または無効にすることも可能です。

* システムプロパティ: `-Ddd.<integration>.analytics.enabled=true`
* 環境変数: `DD_<INTEGRATION>_ANALYTICS_ENABLED=true`

カスタムサービスを送信するインテグレーションに対し、グローバルコンフィギュレーションに加えて上記を使用します。例えば、カスタムサービスとして送信される JMS スパンの場合、次のように設定して App Analytics ですべての JMS トレースを有効にします。

* システムプロパティ: `-Ddd.jms.analytics.enabled=true`
* 環境変数: `DD_JMS_ANALYTICS_ENABLED=true`

インテグレーション名は、[インテグレーションテーブル][1]にあります。

[1]: /ja/tracing/setup/java/#integrations
{{% /tab %}}
{{% tab "Python" %}}

グローバルに設定するほか、次の設定を使用して個々のインテグレーションに対して App Analytics を有効または無効にすることも可能です。

* トレーサー構成: `ddtrace.config.<INTEGRATION>.analytics_enabled = True`
* 環境変数: `DD_<INTEGRATION>_ANALYTICS_ENABLED=true`

カスタムサービスを送信するインテグレーションに対し、グローバルコンフィギュレーションに加えて上記を使用します。例えば、カスタムサービスとして送信される Boto スパンの場合、次のように設定して App Analytics ですべての Boto トレースを有効にします。

* トレーサー構成: `ddtrace.config.boto.analytics_enabled = True`
* 環境変数: `DD_BOTO_ANALYTICS_ENABLED=true`

**注**: インテグレーションによっては、そのインテグレーション固有のトレーサーが実装されているため非標準の方法で設定する必要があります。詳細については、[App Analytics][1] のライブラリドキュメントを参照してください。

[1]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#trace_search_analytics
{{% /tab %}}
{{% tab "Ruby" %}}

特定のインテグレーションに対して App Analytics を有効にすることできます。

それには、環境で `DD_<INTEGRATION>_ANALYTICS_ENABLED=true` を設定するか、以下の構成を使用します。

```ruby
Datadog.configure { |c| c.use :integration, analytics_enabled: true }
```

`integration` は、インテグレーションの名前です。オプションについては、[インテグレーションのリスト][1]を参照してください。

* `true` は、グローバル設定に関係なく、このインテグレーションで分析を有効にします。
* `false` は、グローバル設定に関係なく、このインテグレーションで分析を無効にします。
* `nil` は、グローバルな分析設定を優先させます。

[1]: /ja/tracing/setup/ruby/#library-compatibility
{{% /tab %}}
{{% tab "Go" %}}

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

{{% /tab %}}
{{% tab "Node.js" %}}

グローバル設定に加えて、個別のインテグレーションで App Analytics を有効または無効にできます。

たとえば、`express` で App Analytics を有効にするには、以下のようにします。

```js
tracer.use('express', {
  analytics: true
})
```

インテグレーション名は、[インテグレーションテーブル][1]にあります。

[1]: /ja/tracing/setup/nodejs/#integrations
{{% /tab %}}
{{% tab ".NET" %}}

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
{{% /tab %}}
{{% tab "PHP" %}}

グローバルに設定するほか、次の設定を使用して個々のインテグレーションに対して App Analytics を有効または無効にすることも可能です。

* 環境変数: `DD_<INTEGRATION>_ANALYTICS_ENABLED=true`

カスタムサービスを送信するインテグレーションに対し、グローバルコンフィギュレーションに加えて上記を使用します。例えば、カスタムサービスとして送信される Symfony スパンの場合、次のように設定して App Analytics ですべての Symfony トレースを有効にします。

* 環境変数: `DD_SYMFONY_ANALYTICS_ENABLED=true`

インテグレーション名は、[インテグレーションテーブル][1]にあります。

[1]: /ja/tracing/setup/php/#integrations
{{% /tab %}}
{{< /tabs >}}

### データベースサービス

{{< tabs >}}
{{% tab "Java" %}}

デフォルトでは、App Analytics はデータベーストレースをキャプチャしないため、各インテグレーションに対して手動で収集を有効にする必要があります。例:

* システムプロパティ: `-Ddd.jdbc.analytics.enabled=true`
* 環境変数: `DD_JDBC_ANALYTICS_ENABLED=true`

{{% /tab %}}
{{% tab "Python" %}}

デフォルトでは、App Analytics はデータベーストレースをキャプチャしないため、各インテグレーションに対して手動で収集を有効にする必要があります。例:

* トレーサー構成: `ddtrace.config.psycopg.analytics_enabled = True`
* 環境変数: `DD_PSYCOPG_ANALYTICS_ENABLED=true`

{{% /tab %}}
{{% tab "Ruby" %}}

デフォルトでは、App Analytics はデータベーストレースをキャプチャしないため、各インテグレーションに対して手動で収集を有効にする必要があります。例:

```ruby
Datadog.configure { |c| c.use :mongo, analytics_enabled: true }
```

{{% /tab %}}
{{% tab "Go" %}}

デフォルトでは、データベーストレースは App Analytics によりキャプチャされません。各インテグレーションに対し手動で収集を有効にする必要があります。例:

```go
// Analytics が有効になっているデータベースドライバーを登録します。sqltrace.Register("mysql", &mysql.MySQLDriver{}, sqltrace.WithAnalytics(true))
```

{{% /tab %}}
{{% tab "Node.js" %}}

デフォルトでは、App Analytics はデータベーストレースをキャプチャしないため、各インテグレーションに対して手動で収集を有効にする必要があります。例:

```javascript
tracer.use('mysql', {
  analytics: true
})
```

{{% /tab %}}
{{% tab ".NET" %}}

デフォルトでは、App Analytics はデータベーストレースをキャプチャしないため、各インテグレーションに対して手動で収集を有効にする必要があります。例えば、ADO.NET に対して App Analytics を有効にするには以下のようにします。

* 環境変数または AppSetting: `DD_AdoNet_ANALYTICS_ENABLED=true`

コードの場合は次のようになります。

```csharp
Tracer.Instance.Settings.Integrations["AdoNet"].AnalyticsEnabled = true;
```

インテグレーション名は、[インテグレーションテーブル][1]にあります。**注:** Linux では、環境変数の名前は大文字と小文字が区別されます。

[1]: /ja/tracing/setup/dotnet/#integrations
{{% /tab %}}
{{% tab "PHP" %}}

デフォルトでは、App Analytics はデータベーストレースをキャプチャしません。次の設定を使用して、個々のインテグレーションに対し App Analytics を有効または無効にすることができます。

* 環境変数: `DD_<INTEGRATION>_ANALYTICS_ENABLED=true`

カスタムサービスを送信するインテグレーションに対し、グローバルコンフィギュレーションに加えて上記を使用します。`mysqli` の場合、次のようになります。

* 環境変数: `DD_MYSQLI_ANALYTICS_ENABLED=true`

インテグレーション名は、[インテグレーションテーブル][1]にあります。

[1]: /ja/tracing/setup/php/#integrations
{{% /tab %}}
{{< /tabs >}}

### カスタムインスツルメンテーション

{{< tabs >}}
{{% tab "Java" %}}

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

{{% /tab %}}
{{% tab "Python" %}}

カスタムインスツルメンテーションを使用するアプリケーションは、スパンで `ddtrace.constants.ANALYTICS_SAMPLE_RATE_KEY` タグを設定することで App Analytics を有効にできます。

```python
from ddtrace import tracer
from ddtrace.constants import ANALYTICS_SAMPLE_RATE_KEY

@tracer.wrap()
def my_method():
    span = tracer.current_span()
    span.set_tag(ANALYTICS_SAMPLE_RATE_KEY, True)
```

{{% /tab %}}
{{% tab "Ruby" %}}

カスタムインスツルメンテーションを使用するアプリケーションは、スパンで `ANALYTICS_KEY` タグを設定することで App Analytics を有効にできます。

```ruby
Datadog.tracer.trace('my.task') do |span|
  #  分析サンプリングレートを 1.0 に設定します
  span.set_tag(Datadog::Ext::Analytics::TAG_ENABLED, true)
end
```

{{% /tab %}}
{{% tab "Go" %}}

カスタムインスツルメンテーションの場合、以下に示すように、スパンで App Analytics を有効にするための特別なタグが追加されています。

```go
span.SetTag(ext.AnalyticsEvent, true)
```

これにより、スパンが App Analytics イベントとしてマークされます。

{{% /tab %}}
{{% tab "Node.js" %}}

カスタムインスツルメンテーションを使用するアプリケーションは、スパンで `ANALYTICS` タグを設定することで App Analytics を有効にできます。

```javascript
const { ANALYTICS } = require('dd-trace/ext/tags')

span.setTag(ANALYTICS, true)
```

{{% /tab %}}
{{% tab ".NET" %}}

カスタムインスツルメンテーションを使用するアプリケーションは、スパンで `Tags.Analytics` タグを設定することで App Analytics を有効にできます。

```csharp
using Datadog.Trace;

using(var scope = Tracer.Instance.StartActive("web.request"))
{
    // このスパンで Analytics を有効にします
    scope.span.SetTag(Tags.Analytics, "true");
}

```

{{% /tab %}}
{{% tab "PHP" %}}

カスタムインスツルメンテーションを使用するアプリケーションは、スパンで `ANALYTICS_KEY` タグを設定することで App Analytics を有効にできます。

```php
<?php
  // ... App Analytics を有効にする既存のスパン
  $span->setTag(Tag::ANALYTICS_KEY, true);
?>
```

{{% /tab %}}
{{% tab "C++" %}}

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

{{% /tab %}}
{{< /tabs >}}

## スパンのフィルタリング

[Indexed span][2] は、メタデータを含む[サービス][4]の最上位の[スパン][3]を表します。有効にすると、デフォルトでは 100% のスループットで Indexed span が送信されます。例えば、各 `servlet.request` スパンが Indexed span を生成するため、100 件のリクエストを持つ Java サービスは `servlet.request` スパンから 100 の Indexed span を生成します。[Indexed span のフィルタリング][5]は、請求可能な Indexed span の数を減らすという利点があり、[トレース][6]のサンプリングには影響しません。サービスのフィルタリング率が 100% 未満である場合、デフォルトでは Indexed span の生成メトリクス「総エラー数」と「総リクエスト数」は推定値を表示するようスケールアップされるため、ユーザーはフィルタリングされた値を表示することができます。

フィルターレートへの変更は、サービスおよび環境別にキューに配置されるため、全体的なスパンボリュームへの影響を予測できます。変更は、確認、編集、承認または拒否することが可能です。適用された変更は、直ちに有効となり[請求書にも反映されます][7]。

{{< img src="tracing/app_analytics/analytics/apm_event_filtering.gif" alt="Indexed span のフィルタリング" >}}

[1]: https://app.datadoghq.com/apm/search/analytics
[2]: /ja/tracing/visualization/#apm-event
[3]: /ja/tracing/visualization/#spans
[4]: /ja/tracing/visualization/#services
[5]: https://app.datadoghq.com/apm/settings
[6]: /ja/tracing/visualization/#trace
[7]: /ja/account_management/billing/apm_distributed_tracing/
