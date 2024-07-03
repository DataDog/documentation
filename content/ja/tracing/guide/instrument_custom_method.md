---
further_reading:
- link: /tracing/guide/alert_anomalies_p99_database/
  tag: 3 mins
  text: Alert on anomalous p99 latency of a database service
- link: /tracing/guide/week_over_week_p50_comparison/
  tag: 2 mins
  text: Compare a service's latency to the previous week
- link: /tracing/guide/slowest_request_daily/
  tag: 3 mins
  text: Debug the slowest trace on the slowest endpoint of a web service
- link: /tracing/guide/
  tag: ''
  text: All guides
title: Instrument a custom method to get deep visibility into your business logic
---

_8 分で読了_

{{< img src="tracing/guide/custom_span/custom_span_1_cropped.png" alt="分析ビュー" style="width:90%;">}}

<div class="alert alert-warning"><strong>Note</strong>: This page describes using OpenTracing to custom instrument applications. OpenTracing is deprecated. The concepts presented here still apply, but follow the <a href="/tracing/trace_collection/otel_instrumentation/">Custom Instrumentation with OpenTelemetry</a> instructions and examples for your language instead. </div>

ビジネスロジックを詳細に可視化するために、Datadog APM では、ニーズと実装に基づいてトレースを構成するスパンをカスタマイズできます。これにより、コードベース内のあらゆるメソッド、さらにはメソッド内の特定のコンポーネントをトレースすることができます。これを使用すれば、アプリケーションの重要な領域を最適な粒度で最適化、監視できます。

Datadog は、ウェブサービス、データベース、キャッシュなど、すぐに使用できる多くのフレームワークをインスツルメントするため、独自のビジネスロジックをインスツルメントして、求められる正確な可視性を獲得できます。メソッドのスパンを作成することにより、APM フレームグラフとモニターを使用してタイミングを最適化し、エラーを追跡できます。

## コードのインスツルメンテーション

**例に従いコードをインスツルメントします**。

以下の例では、`BackupLedger.write` メソッド全体をトレースして、実行時間とステータスを測定します。`BackupLedger.write` は、トランザクション台帳の現在の状態をメモリに保存してから、支払いデータベースを呼び出して新しい顧客請求を送信するアクションです。これは、支払いサービスの `charge` エンドポイントがヒットしたときに発生します。

{{< img src="tracing/guide/custom_span/custom_span_2_cropped.png" alt="分析ビュー" style="width:90%;">}}

`http.request POST /charge/` スパンは、直接の子スパンがないと多くの時間がかかります。これは、このリクエストがその動作に対するより優れた情報を得るために、さらなるインスツルメンテーションを必要とする手がかりです。使用しているプログラミング言語に応じて、関数を異なる方法で装飾する必要があります。
{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php" >}}
{{< programming-lang lang="java" >}}

Java の場合、Datadog APM により、メソッドデコレータを使用するか、特定のコードブロックをインスツルメントすることにより、コードをインスツルメントしてカスタムスパンを生成できます。

**デコレータを使用してメソッドをインスツルメントする**

この例では、`BackupLedger.write` メソッドにスパンを追加し、トランザクション台帳に新しい行を追加します。投稿されたすべてのトランザクションを単一のユニットとして追跡するために、1 つのスパンが追加されます。

```java
import datadog.trace.api.Trace

public class BackupLedger {

  // @Trace アノテーションを使用してカスタムメソッドをトレースします
  @Trace
  public void write(List<Transaction> transactions) {
    for (Transaction transaction : transactions) {
      ledger.put(transaction.getId(), transaction);
    }

    // [...]
  }
}
```

**特定のコードブロックをインスツルメントする**

この例では、上記で作成した `BackupLedger.write` スパンに子スパンを追加します。このメソッドは、台帳内のすべてのトランザクションの子スパンと、特定のトランザクション ID を持つ[カスタムタグ][1]を追加します。

```java
import datadog.trace.api.Trace;
import io.opentracing.Scope;
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

public class BackupLedger {

  // `@Trace` アノテーションを使用してカスタムメソッドをトレースします
  @Trace
  public void write(List<Transaction> transactions) {
    for (Transaction transaction : transactions) {
      // `GlobalTracer` を使用してインラインコードのブロックをトレースします
      Tracer tracer = GlobalTracer.get();
     // 注: 以下の try with resource ブロックのスコープは、
     // コードブロックの最後で自動的に閉じられます。
     // resource 文で try を使用しない場合は、scope.close() 
     // を呼び出す必要があります。
      try (Scope scope = tracer.buildSpan("BackupLedger.persist").startActive(true)) {
        // スパンにカスタムメタデータを追加します
        scope.span().setTag("transaction.id", transaction.getId());
        ledger.put(transaction.getId(), transaction);
      }
    }

    // [...]
  }
}
```

[1]: /ja/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Python の場合、Datadog APM により、メソッドデコレータを使用するか、特定のコードブロックをインスツルメントすることにより、コードをインスツルメントしてカスタムスパンを生成できます。

**デコレータを使用してメソッドをインスツルメントする**

この例では、`BackupLedger.write` メソッドにスパンを追加し、トランザクション台帳に新しい行を追加します。投稿されたすべてのトランザクションを単一のユニットとして追跡するために、1 つのスパンが追加されます。

```python
from ddtrace import tracer

class BackupLedger:

    # `tracer.wrap` デコレータを使用してカスタムメソッドをトレースします
    @tracer.wrap()
    def write(self, transactions):
        for transaction in transactions:
            self.ledger[transaction.id] = transaction

        # [...]
```

**特定のコードブロックをインスツルメントする**

この例では、上記で作成した `BackupLedger.write` スパンに子スパンを追加します。このメソッドは、台帳内のすべてのトランザクションの子スパンと、特定のトランザクション ID を持つ[カスタムタグ][1]を追加します。

```python
from ddtrace import tracer

class BackupLedger:

    # `tracer.wrap` デコレータを使用してカスタムメソッドをトレースします
    @tracer.wrap()
    def write(self, transactions):
        for transaction in transactions:
            # `tracer.trace` コンテキストマネージャーを使用してインラインコードのブロックをトレースします
            with tracer.trace('BackupLedger.persist') as span:
                # "persist_transaction" スパンにカスタムメタデータを追加します
                span.set_tag('transaction.id', transaction.id)
                self.ledger[transaction.id] = transaction

        # [...]
```

[1]: /ja/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

  Ruby の場合、Datadog APM により、特定のコードブロックをインスツルメントすることにより、コードをインスツルメントしてカスタムスパンを生成できます。

この例では、`BackupLedger.write` メソッドの呼び出し用に新しいスパンを作成し、特定のトランザクション ID を持つ[カスタムタグ][1]で台帳に投稿されたすべてのトランザクションに子スパンを作成します。

```ruby
require 'ddtrace'

class BackupLedger

  def write(transactions)
    # グローバルな `Datadog::Tracing.trace` を使用してインラインコードのブロックをトレースします
    Datadog::Tracing.trace('BackupLedger.write') do |method_span|
      transactions.each do |transaction|
        Datadog::Tracing.trace('BackupLedger.persist') do |span|
          # "persist_transaction" スパンにカスタムメタデータを追加します
          span.set_tag('transaction.id', transaction.id)
          ledger[transaction.id] = transaction
        end
      end
    end

    # [...]
  end
end
```

[1]: /ja/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

  Go の場合、Datadog APM により、特定のコードブロックをインスツルメントすることにより、コードをインスツルメントしてカスタムスパンを生成できます。

この例では、台帳に投稿されたすべてのトランザクションに対して新しいスパンを作成し、特定のトランザクション ID を持つ[カスタムタグ][1]をスパンに追加します。

```go
package ledger

import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

// [...]

func (bl *BackupLedger) write(ctx context.Context, transactions []*Transaction) (err error) {
  // `write` 関数をトレースし、存在する場合はエラーをキャプチャします
  span, ctx := tracer.StartSpanFromContext(ctx, "BackupLedger.write")
  defer func() {
    span.Finish(tracer.WithError(err))
  }()

  for _, t := range transactions {
    if err := bl.persistTransaction(ctx, t); err != nil {
      return err
    }
  }
  return nil
}

// persistTransaction は、トレースしたい内部関数です。 
// 以前と同じアプローチを使用できます。
// これは、渡した `ctx` に親/子関係を作成するための、すぐに使用できるスパン参照が含まれるためです。
func (bl *BackupLedger) persistTransaction(ctx context.Context, transaction *Transaction) error {
  id := transaction.ID
  span, _ := tracer.StartSpanFromContext(ctx, "BackupLedger.persist", tracer.Tag("transaction_id", id))
  defer span.Finish()

  if t, ok := bl.transactions[id]; ok {
    return errors.New("duplicate entry")
  }
  bl.transactions[id] = transaction
  return nil
}
```

[1]: /ja/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

  Node.js の場合、Datadog APM により、特定のコードブロックをインスツルメントすることにより、コードをインスツルメントしてカスタムスパンを生成できます。

この例では、`BackupLedger.write` メソッドの呼び出し用に新しいスパンを作成し、特定のトランザクション ID を持つ[カスタムタグ][1]で台帳に投稿されたすべてのトランザクションに子スパンを作成します。

```javascript
const tracer = require('dd-trace')

function write (transactions) {
  // `tracer.trace` コンテキストマネージャーを使用してインラインコードのブロックをトレースします
  tracer.trace('BackupLedger.write', () => {
    for (const transaction of transactions) {
     tracer.trace('BackupLedger.persist' , (span) => {
      // "persist_transaction" スパンにカスタムメタデータを追加します
       span.setTag('transaction.id', transaction.id)
       this.ledger[transaction.id] = transaction
      })
    }
  })

  // [...]
}
```

[1]: /ja/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

  .NET の場合、Datadog APM により、特定のコードブロックをインスツルメントすることにより、コードをインスツルメントしてカスタムスパンを生成できます。

この例では、台帳に投稿されたすべてのトランザクションに対して新しいスパンを作成し、特定のトランザクション ID を持つ[カスタムタグ][1]をスパンに追加します。

```csharp
using Datadog.Trace;

public void Write(List<Transaction> transactions)
{
    //グローバルトレーサーを使用してインラインコードのブロックをトレースします
    using (var scope = Tracer.Instance.StartActive("BackupLedger.write"))
    {
        foreach (var transaction in transactions)
        {
            using (var scope = Tracer.Instance.StartActive("BackupLedger.persist"))
            {
                // スパンにカスタムメタデータを追加します
                scope.Span.SetTag("transaction.id", transaction.Id);
                this.ledger[transaction.Id] = transaction;
            }
        }
    }

    // [...]
}
```

[1]: /ja/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

PHP の場合、Datadog APM により、メソッドラッパーを使用するか、特定のコードブロックをインスツルメントすることにより、コードをインスツルメントしてカスタムスパンを生成できます。

**ラッパーを使用してメソッドをインスツルメントする**

この例では、`BackupLedger.write` メソッドにスパンを追加し、トランザクション台帳に新しい行を追加します。`DDTrace\trace_method()` 関数を使用して、投稿されたすべてのトランザクションを単一のユニットとして追跡するために、1 つのスパンが追加されます。

```php
<?php
  class BackupLedger {

    public function write(array $transactions) {
      foreach ($transactions as $transaction) {
        $this->transactions[$transaction->getId()] = $transaction;
      }

      # [...]
    }
  }

  // ddtrace v0.47.0 以前の場合、\dd_trace_method() を使用
  \DDTrace\trace_method('BackupLedger', 'write', function (\DDTrace\SpanData $span) {
    // SpanData::$name のデフォルトは、設定されていない場合 'ClassName.methodName' (v0.47.0 以降)
    $span->name = 'BackupLedger.write';
    // SpanData::$resource のデフォルトは、設定されていない場合 SpanData::$name if not set (v0.47.0 以降)
    $span->resource = 'BackupLedger.write';
    $span->service = 'php';
  });
?>
```

**特定のコードブロックをインスツルメントする**

この例では、上記で作成した `BackupLedger.write` スパンに子スパンを追加します。このメソッドは、台帳内のすべてのトランザクションの子スパンと、特定のトランザクション ID を持つ[カスタムタグ][1]を追加します。

```php
<?php
  class BackupLedger {

    public function write(array $transactions) {
      foreach ($transactions as $transaction) {
        // グローバルトレーサーを使用してインラインコードのブロックをトレース
        $span = \DDTrace\start_span();
        $span->name = 'BackupLedger.persist';

        // スパンにカスタムメタデータを追加
        $span->meta['transaction.id'] = $transaction->getId();
        $this->transactions[$transaction->getId()] = $transaction;

        // スパンを閉じる
        \DDTrace\close_span();
      }

      # [...]
    }
  }

  // ddtrace v0.47.0 未満の場合、\dd_trace_method() を使用
  \DDTrace\trace_method('BackupLedger', 'write', function (\DDTrace\SpanData $span) {
    // SpanData::$name のデフォルトは、設定されていない場合 'ClassName.methodName' (v0.47.0 以降)
    $span->name = 'BackupLedger.write';
    // SpanData::$resource のデフォルトは、設定されていない場合 SpanData::$name (v0.47.0 以降)
    $span->resource = 'BackupLedger.write';
    $span->service = 'php';
  });
?>
```

[1]: /ja/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## Datadog UI を活用して新しいカスタムスパンを表示する

ビジネスロジックをインスツルメントしたら、Datadog APM UI で結果を確認します。

1. **[サービスカタログ][1]**に移動し、カスタムスパンを追加したサービスをクリックして、そのサービスページを開きます。サービスページで、追加した**特定のリソース**をクリックし、時間フィルターを `The past 15 minutes` に変更し、スパンサマリーテーブルまでスクロールダウンします。

    {{< img src="tracing/guide/custom_span/custom_span_3.png" alt="スパンサマリーテーブル" style="width:90%;">}}

スパンサマリーテーブルでは、トレースを構成するスパンに関する集約情報を確認できます。ここで、異常な回数繰り返されるスパンを特定して、ループやデータベースアクセスの非効率性を見つけることができます（[`n+1` 問題][2]など）。

2. **トレースの一覧画面**までスクロールダウンし、トレースのいずれかをクリックします。

    {{< img src="tracing/guide/custom_span/custom_span_4_cropped.png" alt="分析ビュー" style="width:90%;">}}

これで、カスタムスパンがコードベースに正常に追加され、フレームグラフと [App Analytics][3] で利用できるようになりました。これは、Datadog のツールを最大限に活用するための最初のステップです。次に[カスタムタグをスパンに追加][4]すれば、さらに強力にすることができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: https://bojanv91.github.io/posts/2018/06/select-n-1-problem
[3]: https://app.datadoghq.com/apm/traces?viz=timeseries
[4]: /ja/tracing/trace_collection/custom_instrumentation/otel_instrumentation/