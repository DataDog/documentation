---
title: トレースのサンプリングと保存
kind: documentation
aliases:
  - /ja/tracing/faq/traces-sampling-and-storage/
  - /ja/tracing/faq/how-long-is-tracing-data-stored/
  - /ja/tracing/getting_further/trace_sampling_and_storage
further_reading:
  - link: tracing/setup/
    tag: Documentation
    text: アプリケーションで APM トレースをセットアップする方法
  - link: tracing/visualization/services_list/
    tag: Documentation
    text: Datadog に報告するサービスの一覧
  - link: tracing/visualization/service
    tag: Documentation
    text: Datadog のサービスについて
  - link: tracing/visualization/resource
    tag: Documentation
    text: リソースのパフォーマンスとトレースの詳細
  - link: tracing/visualization/trace
    tag: Documentation
    text: Datadog トレースの読み方を理解する
---
## トレースのサンプリング

トレースのサンプリングは、大容量の Web スケールで適用することができ、[トレース][1]のサンプリングの比率は以下の法則に従って Datadog に保存されます。

統計（リクエスト、エラー、レイテンシーなど）は、Agent レベルでトレースの最大容量に基づいて計算され、常に正確な数値を算出します。

### 統計 (リクエスト、エラー、レイテンシーなど)

Datadog APM はサンプリングに関わりなく、インスツルメントされているすべてのトレースから以下の集約統計データを算出します。

* 総リクエスト数および 1 秒あたりのリクエスト数
* 総エラー数および 1 秒あたりのエラー数
* レイテンシー
* サービス/タイプ別所要時間の詳細
* [Apdex スコア][2] (web サービスのみ)

{{< img src="tracing/product_specs/trace_sampling_storage/sampling_stats.png" alt="Aggregate statistics are generated on un-sampled data." responsive="true" style="width:90%;">}}

### サンプリングの目的

サンプリングの目的は、最も重要なトレースの情報を「保持」することです。

* 分散型トレース
* 低 QPS サービス
* さまざまなトレースを表示

{{< img src="tracing/product_specs/trace_sampling_storage/tracing-flow-chart.png" alt="Individual traces are sampled at the Client, Agent, and Server level." responsive="true" style="width:90%;">}}

### サンプリングの法則

トレースのライフサイクルでは、以下の順序に従いクライアント、Agent、バックエンドのレベルで決定が下されます。

1. クライアントのトレース - クライアントのトレースはコンテキストに `sampling.priority` という属性を追加し、分散型のアーキテクチャで言語に依存しないリクエストヘッダーへの伝達を1 回のトレースで実行します。`Sampling-priority` 属性は、Datadog Agent が最適な優先度をつけたり、不要なトレースを削除したりするためのヒントとなります。

    | 値          | 種類                        | アクション                                                                                                                                                                                                                         |
    |:----------------|:----------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | **MANUAL_DROP** | ユーザー入力                  | Agent がトレースを削除。                                                                                                                                                                                                   |
    | **AUTO_DROP**   | 自動サンプリング決定 | Agent がトレースを削除。                                                                                                                                                                                                |
    | **AUTO_KEEP**   | 自動サンプリング決定 | Agent がトレースを保持。                                                                                                                                                                                                     |
    | **MANUAL_KEEP** | ユーザー入力                  | Agent はトレースを保持し、バックエンドは最大容量を超過した場合のみサンプリングを適用します。[App Analytics filtering][3] を使用している場合 - `MANUAL_KEEP` とマークされたスパンは、すべて支払い請求可能なスパンです。 |

    トレースの優先度は自動的に AUTO_DROP か AUTO_KEEP に設定され、Agent は許可された以上のサンプリングを実行する必要がないようになっています。ユーザーはこの属性を[手動で調整](#手動でトレースの優先度を操作) し、特定の種類のトレースに優先度をつけたり不要なトレースを削除したりすることができます。

2. トレース Agent（ホストまたはコンテナレベル）- Agent はさまざまなクライアントトレースからトレースを受信し、2 つの規則に基づきリクエストのフィルター処理を行います。
    * さまざまなトレース（サービス、リソース、HTTP ステータスコード、エラー）でトレースが続行されること。
    * 小容量のトレース（web エンドポイント、DB クエリー）を保存すること。

    Agent は、サービス、リソース、エラーなどに基づいて報告されたすべてのトレースから `signature` を算出します。同じシグネチャを持つトレースは類似したトレースとして扱われます。例えば以下のようなシグネチャがあります。

    * `env=prod`, `my_web_service`, `is_error=true`, `resource=/login`
    * `env=staging`, `my_database_service`, `is_error=false`, `query=SELECT...`

    それぞれのシグネチャを持つトレースの比率は保持されるため、システムで実行されているすべての種類のトレースを確認することができます。この方法だと、少容量のリソースのトレースも保持されます。

    さらに、Agent はトレーシングクライアントからの優先トレースにサービスベースのレートを提供し、低 QPS サービスからのトレースを優先的に維持します。

    ユーザーは、Agent で[リソースフィルター][4]を使用しすべての不要なリソースのエンドポイントを手動で削除できます。

3. DD バックエンド/サーバー - サーバーはホストで実行されているさまざまな Agent からトレースを受信し、サンプリングを適用してすべての報告 Agent からの情報を表します。これは Agent にマークされたシグネチャに基づきトレースを保持することで実現します。

## トレースの優先度を手動で操作する

APM では、初期設定で分散型トレースが有効になっており、トレースヘッダーと複数のサービス/ホスト間のトレース情報の伝達が可能です。トレースヘッダーには優先度タグが含まれており、トレース情報伝達中にアップストリームとダウンストリームのサービスの間でトレースが完了できるようにします。このタグを上書きすると、手動でトレースの保持（重要なトランザクション処理、デバックモードなど）や削除（ヘルスチェック、静的アセットなど）ができます。

{{< tabs >}}
{{% tab "Java" %}}

手動でトレースを保持:

```java
import datadog.trace.api.DDTags;
import datadog.trace.api.interceptor.MutableSpan;
import datadog.trace.api.Trace;
import io.opentracing.util.GlobalTracer;

public class MyClass {
    @Trace
    public static void myMethod() {
        // トレース方法からアクティブなスパンを取り除く
        MutableSpan ddspan = (MutableSpan) GlobalTracer.get().activeSpan();
        // 常にトレースを保持
        ddspan.setTag(DDTags.MANUAL_KEEP, true);
        // 続いて実装方法を入力
    }
}
```
手動でトレースを削除:

```java
import datadog.trace.api.DDTags;
import datadog.trace.api.interceptor.MutableSpan;
import datadog.trace.api.Trace;
import io.opentracing.util.GlobalTracer;

public class MyClass {
    @Trace
    public static void myMethod() {
        // トレース方法からアクティブなスパンを取り除く
        MutableSpan ddspan = (MutableSpan) GlobalTracer.get().activeSpan();
        // 常にトレースを削除
        ddspan.setTag(DDTags.MANUAL_DROP, true);
        // 続けて実装方法を入力
    }
}
```


{{% /tab %}}
{{% tab "Python" %}}

手動でトレースを保持:

```python
from ddtrace import tracer
from ddtrace.constants import MANUAL_DROP_KEY, MANUAL_KEEP_KEY

@tracer.wrap()
def handler():
    span = tracer.current_span()
    // 常にトレースを保持
    span.set_tag(MANUAL_KEEP_KEY)
    // 続いて実装方法を入力
```

手動でトレースを削除:

```python
from ddtrace import tracer
from ddtrace.constants import MANUAL_DROP_KEY, MANUAL_KEEP_KEY

@tracer.wrap()
def handler():
    span = tracer.current_span()
        //常にトレースを削除
        span.set_tag(MANUAL_DROP_KEY)
        //続いて実装方法を入力
```

{{% /tab %}}
{{% tab "Ruby" %}}

手動でトレースを保持:

```ruby
Datadog.tracer.trace(name, options) do |span|

  # 常にトレースを保持
  span.set_tag(Datadog::Ext::ManualTracing::TAG_KEEP, true)
  # 続いて実装方法を入力
end
```
手動でトレースを削除:

```ruby
Datadog.tracer.trace(name, options) do |span|
  # 常にトレースを削除
  span.set_tag(Datadog::Ext::ManualTracing::TAG_DROP, true)
  # 続いて実装方法を入力
end
```
{{% /tab %}}
{{% tab "Go" %}}

手動でトレースを保持:

```Go
package main

import (
    "log"
    "net/http"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/ext"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    //  /posts URLでwebリクエストのスパンを作成
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // 常にこのトレースを保持:
    span.SetTag(ext.ManualKeep, true)
    //続いて実装方法を入力

}
```

手動でトレースを削除:

```Go
package main

import (
    "log"
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/ext"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    //  /posts URLでwebリクエストのスパンを作成
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // 常にこのトレースを削除:
    span.SetTag(ext.ManualDrop, true)
    //続いて実装方法を入力
}
```

{{% /tab %}}
{{% tab "Node.js" %}}

手動でトレースを保持:

```js
const tracer = require('dd-trace')
const tags = require('dd-trace/ext/tags')

const span = tracer.startSpan('web.request')

// 常にトレースを保持
span.setTag(tags.MANUAL_KEEP)
//続いて実装方法を入力

```
手動でトレースを削除:

```js
const tracer = require('dd-trace')
const tags = require('dd-trace/ext/tags')

const span = tracer.startSpan('web.request')

// 常にトレースを削除
span.setTag(tags.MANUAL_DROP)
//続いて実装方法を入力

```

{{% /tab %}}
{{% tab ".NET" %}}

手動でトレースを保持:

```cs
using Datadog.Trace;

using(var scope = Tracer.Instance.StartActive(operationName))
{
    var span = scope.Span;

    // 常にこのトレースを保持
    span.SetTag(Tags.ManualKeep, "true");
    //続いて実装方法を入力
}
```
手動でトレースを削除:

```cs
using Datadog.Trace;

using(var scope = Tracer.Instance.StartActive(operationName))
{
    var span = scope.Span;

    // 常にこのトレースを削除
    span.SetTag(Tags.ManualDrop, "true");
    //続いて実装方法を入力
}
```

{{% /tab %}}
{{% tab "PHP" %}}

手動でトレースを保持:

```php
<?php
  $tracer = \OpenTracing\GlobalTracer::get();
  $span = $tracer->getActiveSpan();

  if (null !== $span) {
    // 常にこのトレースを保持
    $span->setTag(\DDTrace\Tag::MANUAL_KEEP, true);
    //続いて実装方法を入力
  }
?>
```

手動でトレースを削除:

```php
<?php
  $tracer = \OpenTracing\GlobalTracer::get();
  $span = $tracer->getActiveSpan();

  if (null !== $span) {
    // 常にこのトレースを削除
    $span->setTag(\DDTrace\Tag::MANUAL_DROP, true);
    //続いて実装方法を入力
  }
?>
```

{{% /tab %}}
{{% tab "C++" %}}

手動でトレースを保持:

```cpp
...
#include <datadog/tags.h>
...

auto tracer = ...
auto span = tracer->StartSpan("operation_name");
// 常にこのトレースを保持
span->SetTag(datadog::tags::manual_keep, {});
//続いて実装方法を入力
```
手動でトレースを削除:

```cpp
...
#include <datadog/tags.h>
...

auto tracer = ...
auto another_span = tracer->StartSpan("operation_name");
// 常にこのトレースを削除

another_span->SetTag(datadog::tags::manual_drop, {});
//続いて実装方法を入力
```

{{% /tab %}}
{{< /tabs >}}

トレースの優先度設定はコンテキスト伝達の前に手動で行う必要があります。コンテキスト伝達後に行うと、システムはサービス全体のトレースを確実に保持できません。手動での優先度設定はクライアントをトレースする場所で設定され、トレースは[サンプリングの法則](#サンプリングの法則)に基づいて Agent またはサーバーの場所で削除することができます。


## トレースの保存

個々の[トレース][1] は最長 6 か月間保存されます。特定のトレースの保存期間を決定するため、Agent はトレース周期の初期段階でサンプル決定をします。Datadog のバックエンドで、サンプルリングされたトレースはタイムバケットに従い保存されます。

| 保存期間バケット       | 保存されたストリームの割合 |
|:-----------------------|:-----------------|
| 6 時間                | 100%             |
| 現在の日付（UTC 協定世界時） | 25%              |
| 6 日                 | 10%              |
| 6 か月               | 1%               |

**注** Datadog は Synthetics APM トレースを実行しません。受信されたすべてのトレースは 6 時間保存され、その後上記のトレースの割合で保存されます。

たとえば、ある日のデータは以下のように表示されます。

* **100%** of sampled traces from the last six hours
* **25%** of those from the previous hours of the current calendar day (starting at `00:00 UTC`)
* **10%** from the previous six calendar days
* **1%** of those from the previous six months (starting from the first day of the month six months ago)
* **0%** of traces older than six months

例えば `9:00am UTC Wed, 12/20` の場合、以下のように表示されます。

* **100%** of traces sampled on `Wed 12/20 03:00 - 09:00`
* **25%** of traces sampled on `Wed 12/20 00:00` - `Wed 12/20 02:59`
* **10%** of traces sampled on `Thurs 12/14 00:00` - `Tue 12/19 23:59`
* `7/1 00:00` - `12/13 23:59`にサンプリングされたトレース **1%**
* **0%** of traces before `7/1 00:00`

トレースが全ページに表示されたら、URL: `https://app.datadoghq.com/apm/trace/<TRACE_ID>` でトレース ID を使って確認できます。これは UI での表示が「期限切れ」になったあとも可能です。この動作は UI での保存期間バケットとは関連していません。

{{< img src="tracing/guide/trace_sampling_and_storage/trace_id.png" alt="トレース ID" responsive="true" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/tracing/visualization/#trace
[2]: /ja/tracing/faq/how-to-configure-an-apdex-for-your-traces-with-datadog-apm
[3]: /ja/tracing/app_analytics/#span-filtering
[4]: https://docs.datadoghq.com/ja/security/tracing/#resource-filtering