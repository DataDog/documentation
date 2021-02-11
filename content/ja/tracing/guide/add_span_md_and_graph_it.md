---
title: スパンタグを追加し、アプリケーションのパフォーマンスを分類する
kind: ガイド
further_reading:
  - link: /tracing/guide/alert_anomalies_p99_database/
    tag: 3 分
    text: データベースサービスの異常な p99 レイテンシーに関するアラート
  - link: /tracing/guide/week_over_week_p50_comparison/
    tag: 2 分
    text: サービスのレイテンシーを前週と比較する
  - link: /tracing/guide/apm_dashboard/
    tag: 4 分
    text: ダッシュボードを作成して、APM メトリクスを追跡、関連付ける
  - link: /tracing/guide/slowest_request_daily/
    tag: 3 分
    text: ウェブサービスの最も遅いエンドポイントで最も遅いトレースをデバッグする
  - link: /tracing/guide/
    tag: ''
    text: すべてのガイド
---
_所要時間 7 分_

{{< img src="tracing/guide/add_span_md_and_graph_it/span_md_6.mp4" alt="分析ビュー" video="true"  style="width:90%;">}}

Datadog APM を使用すると、[トレース][1]をカスタマイズして、継続的に観察する必要がある追加情報を含めることができます。特定の企業カスタマーのスループットにおけるスパイクや、最も高いレイテンシーの影響を受けているユーザーの確認、または最も多くエラーを生成している共有データベースの特定などが可能になります。

上記の例では、カスタマー ID をトレースに追加し、パフォーマンスが最も遅いカスタマーを特定しています。トレースのカスタマイズは、APM を Datadog の他の機能とシームレスに統合するタグをベースに使用して、[スパン][2]に追加されたメタデータの `key:value` ペアの形式で記述します。

## カスタムスパンタグでコードをインスツルメントする

1) **例に従いコードをインスツルメントします**。

使用しているプログラミング言語によって、[タグ][3]を設定してスパンに追加する方法が異なります。

**注**: 作業中のサービスと[リソース名][4]をメモしておくと、後で便利です。上記の例では、サービスは Ruby サーバーの `web-store`、リソース (エンドポイント) は `ShoppingCartController#checkout` です。

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php" >}}
{{< programming-lang lang="java" >}}

Datadog の UI では、タグを使用してスパンレベルのメタデータを設定します。グローバルトレーサーからアクティブスパンを取得して `setTag` メソッドでタグを設定することで、自動インスツルメンテーションにカスタムタグを設定できます。

```java
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

@WebServlet
class ShoppingCartServlet extends AbstractHttpServlet {
  @Override
  void doGet(HttpServletRequest req, HttpServletResponse resp) {
    // アクティブスパンを取得
    final Span span = GlobalTracer.get().activeSpan();
    if (span != null) {
      // customer_id -> 254889
      span.setTag("customer.id", customer_id);
    }

    // [...]
  }
}
```

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Datadog の UI は、タグを使用してスパンレベルのメタデータを設定します。グローバルトレーサーからアクティブスパンを取得して `set_tag` メソッドでタグを設定することで、自動インスツルメンテーションにカスタムタグを設定できます。

```python
from ddtrace import tracer

@app.route('/shopping_cart/<int:customer_id>')
@login_required
def shopping_cart(customer_id):
    # アクティブスパンを取得
    current_span = tracer.current_span()
    if current_span:
        # customer_id -> 254889
        current_span.set_tag('customer.id', customer_id)

    # [...]
```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Datadog の UI は、タグを使用してスパンレベルのメタデータを設定します。グローバルトレーサーからアクティブスパンを取得して `set_tag` メソッドでタグを設定することで、自動インスツルメンテーションにカスタムタグを設定できます。

```ruby
require 'ddtrace'

# get '/shopping_cart/:customer_id', to: 'shopping_cart#index'
class ShoppingCartController < ApplicationController
  # GET /shopping_cart
  def index
    # アクティブスパンを取得
    current_span = Datadog.tracer.active_span
    # customer_id -> 254889
    current_span.set_tag('customer.id', params.permit([:customer_id])) unless current_span.nil?

    # [...]
  end

  # POST /shopping_cart
  def create
    # [...]
  end
end
```

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Datadog の UI は、タグを使用してスパンレベルのメタデータを設定します。グローバルトレーサーからアクティブスパンを取得して `SetTag` メソッドでタグを設定することで、自動インスツルメンテーションにカスタムタグを設定できます。

```go
package main

import (
    muxtrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    // Go Context からアクティブスパンを取得
    if span, ok := tracer.SpanFromContext(r.Context()); ok {
      // customer_id -> 254889
      span.SetTag("customer.id", vars["customerID"])
    }

    // [...]
}

func main() {
    tracer.Start(tracer.WithServiceName("web-store"))
    defer tracer.Stop()
    // 自動インスツルメンテーションを使用
    mux := muxtrace.NewRouter()
    mux.HandleFunc("/shopping_cart/{customerID}", handler)
    http.ListenAndServe(":8080", mux)
}
```

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}


Datadog の UI では、タグを使用してスパンレベルのメタデータを設定します。グローバルトレーサーからアクティブスパンを取得して `setTag` メソッドでタグを設定することで、自動インスツルメンテーションにカスタムタグを設定できます。

```javascript
app.get('/shopping_cart/:customer_id', (req, res) => {
  // アクティブスパンを取得
  const span = tracer.scope().active()
  if (span !== null) {
    // customer_id -> 254889
    span.setTag('customer.id', req.params.customer_id)
  }

  // [...]
})
```

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}


`Span.SetTag()` を呼び出すことで、`Datadog.Trace.Span` オブジェクトにタグを直接追加します。下記に例を示します。

```csharp
public class ShoppingCartController : Controller
{
    private IShoppingCartRepository _shoppingCartRepository;

    [HttpGet]
    public IActionResult Index(int customerId)
    {
        // グローバルトレーサーからアクティブスパンを取得 (null を返す)
        var scope = Tracer.Instance.ActiveScope;

        if (scope != null)
        {
            // タグをスパンに追加して Datadog ウェブ UI で使用
            scope.Span.SetTag("customer.id", customerId.ToString());
        }

        var cart = _shoppingCartRepository.Get(customerId);

        return View(cart);
    }
}
```

**注**: アクティブスパンがない場合、`Datadog.Trace.Tracer.Instance.ActiveScope` は `null` を返します。

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

Datadog の UI では、タグを使用してスパンレベルのメタデータを設定します。グローバルトレーサーからアクティブスパンを取得して `setTag` メソッドでタグを設定することで、自動インスツルメンテーションにカスタムタグを設定できます。

```php
<?php
  namespace App\Http\Controllers;

  use DDTrace\GlobalTracer;

  class ShoppingCartController extends Controller
  {
      public shoppingCartAction (Request $request) {
          // 現在のアクティブスパンを取得
          $span = GlobalTracer::get()->getActiveSpan();
          if (null !== $span) {
              // customer_id -> 254889
              $span->setTag('customer_id', $request->get('customer_id'));
          }

          // [...]
      }
  }
?>
```

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

<div class="alert alert-info">更新したコードをデプロイしてから新しいタグが Datadog の UI に表示されるまで、数分かかることがあります。</div>

## Datadog UI を活用してカスタムスパンタグを検索する

2) **サービスページに移動**し、タグを追加した[サービス][5]をクリックします。[リソース][4]表でタグが追加されたところまで**スクロールダウンし、特定のリソースをクリック**します。**トレース表までスクロールダウンします**。

{{< img src="tracing/guide/add_span_md_and_graph_it/span_md_3.png" alt="リソースページ"  style="width:90%;">}}

トレース表には、現在のスコープ (サービス、リソース、時間枠) における全トレースのレイテンシー分布と、各トレースへのリンクが表示されます。期間やエラーコードで表を並べ替えて問題のあるオペレーションや最適化の機会を特定できます。

3) **トレースの 1 つをクリックします。**

{{< img src="tracing/guide/add_span_md_and_graph_it/span_md_4.png" alt="フレームグラフ"  style="width:90%;">}}

このビューでは、一番上に**フレームグラフ**、その下に付加情報のウィンドウが表示されます。Datadog のフレームグラフから、リクエストに影響を与える各論理ユニット (スパン) の期間と状態が一目でわかります。フレームグラフは完全にインタラクティブで、ドラッグしてパンしたり、スクロールして拡大縮小したりできます。スパンをクリックすると、ビューの下部にそのスパンの詳細情報が表示されます。

ビューの下部にはトレースや選択したスパンの付加情報が表示されます。デフォルトタグや手作業で追加したタグのすべてをここで確認できます。さらに、ビューを切り替えて関連するホストとログの情報を表示することもできます。

<div class="alert alert-info">このビューでログを有効化するためには、ログの収集を有効にした後、<a href="https://docs.datadoghq.com/tracing/connect_logs_and_traces/" target=_blank>ログとトレースを紐付ける</a>必要があります。</div>

## カスタムスパンタグを Analytics で活用する

4) **[トレース検索ページ][6]**に移動します。

トレース検索ページでは、関心のある特定の[トレース][1]とインデックス化スパンを特定できます。ここでは、時間によってデフォルトタグ (`Env`、`Service`、`Resource` など、[さまざまなタグ][7]) にフィルターをかけることができます。

5) **新しいタグが設定されたトレースを探す**。トレースを探すには、左側のファセット検索を使用して本ガイドの始めで設定したリソース名を見つけ、そのうちの 1 行をクリックします。

6) **トレースに追加した新しいタグを探します**。見つけたらその新しいタグをクリックし、**Create facet** for `@[your facet name]` をクリックします (この例では customer_id)。

{{< img src="tracing/guide/add_span_md_and_graph_it/span_md_5.png" alt="ファセットメニューの作成"  style="width:90%;">}}

次に、ファセットの表示名とファセット検索での分類場所を決定します。

{{< img src="tracing/guide/add_span_md_and_graph_it/span_md_8.png" alt="ファセットモデルの作成"  style="width:60%;">}}

これで、作成したファセットがファセット検索に表示されるようになります。`Search facets` ボックスを使用すると、ファセットを素早く見つけられます。

6) **[Analytics][8] ページに移動します**。

Analytics は、クエリを作成し無限濃度でトレースの調査を実施できる視覚的ツールです。ファセットを使用して、クエリにフィルターとスコープを設定します。詳細については、[トレース検索と Analytics の概要][9]をご確認ください。

7) サービスファセット一覧で作業中の**サービスを選択**し、ファセットのステータスで **Error を選択**したら、group by フィールドで **`customer_id`** (またはスパンに追加した他のタグ) を選択します。

{{< img src="tracing/guide/add_span_md_and_graph_it/span_md_6.mp4" alt="スパン md 6"  video="true" style="width:90%;">}}

8) クエリから **Error を削除**し、**measure を `count *` から `Duration` に**、**グラフタイプを `Top List` に変更**します。

これで、平均リクエストが最も遅いカスタマーが表示されます。**注**: カスタマーのパフォーマンスが今後一定の閾値を越えないようにする場合は、[このクエリをモニターにエクスポート][10]するか、この視覚的情報をダッシュボードに保存して長期的に監視します。

{{< img src="tracing/guide/add_span_md_and_graph_it/span_md_7.mp4" alt="スパン md 7" video="true"  style="width:90%;">}}

最後に、表示された情報をクリックして `View traces` を選択することで、クエリに関連するすべてのトレースを確認できます。

{{< img src="tracing/guide/add_span_md_and_graph_it/span_md_9.mp4" alt="スパン md 9" video="true"  style="width:90%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/visualization/#trace
[2]: /ja/tracing/visualization/#spans
[3]: /ja/tracing/visualization/#span-tags
[4]: /ja/tracing/visualization/#resources
[5]: /ja/tracing/visualization/#services
[6]: https://app.datadoghq.com/apm/search
[7]: /ja/tracing/trace_search_and_analytics/#live-search-for-15-minutes
[8]: https://app.datadoghq.com/apm/analytics
[9]: /ja/tracing/trace_search_and_analytics/query_syntax/
[10]: /ja/tracing/guide/alert_anomalies_p99_database/