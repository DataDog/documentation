---
title: サービスのプライマリオペレーション
kind: ガイド
aliases:
  - /ja/tracing/faq/resource-trace-doesn-t-show-up-under-correct-service/
further_reading:
  - link: /tracing/setup/
    tag: ドキュメント
    text: アプリケーションで APM トレースをセットアップする方法
  - link: /tracing/visualization/services_list/
    tag: ドキュメント
    text: Datadog に報告するサービスの一覧
  - link: /tracing/visualization/service/
    tag: ドキュメント
    text: Datadog のサービスについて
  - link: /tracing/visualization/resource/
    tag: ドキュメント
    text: リソースのパフォーマンスとトレースの詳細
  - link: /tracing/visualization/trace/
    tag: ドキュメント
    text: Datadog トレースの読み方を理解する
---
## APM サービス

APM サービスは、エラー、スループット、レイテンシーのトレースメトリクスを計算します。メトリクスは 1 つのスパン名に一致する複数のリソースを基に計算され、プライマリオペレーションとみなされます。サービスメトリクスは、製品全体で、デフォルトのサービス詳細画面としてサービスリストとサービスマップで使用されています。

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

### コンフィギュレーション

1  つのサービスに複数のプライマリオペレーションが定義されている場合は、最も高いリクエストスループットによってオペレーションが自動的に選択され、サービスのエントリーポイントとなります。管理者ユーザーはこれを手動で設定できます。

1. [APM 設定ページ][2]に移動します。
2. **Primary Operation Name** タブを選択します。
3. 手動設定を行うサービスの編集アイコンをクリックします。
4. **Set Manually** タブをクリックします。
5. サービスのエントリーポイントとして設定するオペレーションを選択します。
6. **保存**をクリックします。

{{< img src="tracing/guide/primary_operation/configuring-primary-option.png" alt="APM の保存"  >}}

## 追加スパン名の統計を表示する

すべてのトレースがインスツルメンテーション以外でも Datadog に正しく送信されているか確認するには、追加スパン名によりリソースを表示できます。追加スパン名はセカンダリオペレーションとしてドロップダウンメニューで表示されます。ただし、追加スパン名はサービスレベルの統計の計算には使用されません。

{{< img src="tracing/guide/primary_operation/dropdown.gif" alt="APM の保存"  >}}

## 手動インスツルメンテーション

コードを手動でインスツルメントしている場合は、リソースが確実に同じプライマリオペレーション (例: `web.request`) で分類されるよう、スパン名を静的に設定します。スパン名が動的に設定されている場合は、リソースとして設定します。

Python のプライマリオペレーションの変更

```text
  @tracer.wrap('tornado.notify',
                service='tornado-notification',
                resource='MainHandler.do_something')
    @tornado.gen.coroutine
    def do_something(self):
        # 操作を実行
```

この関数はサービス名とプライマリオペレーションを、それぞれ `tornado-notification` と `tornado.notify` として明示的に設定します。

また、リソース名は `MainHandler.do_something` として手動で設定されています。

デフォルトでは、リソース名は、その関数名と Tornado 配下のクラスにより設定されます。

## OpenTracing

Datadog を使用している場合、Opentracing オペレーション名はリソース、Opentracing "component" タグは Datadog のスパン名となります。リソースが "/user/profile"、スパン名が "http.request" の スパンを Opentracing 用語で定義するには、次の Go の例を使用します。

```text
opentracing.StartSpan("http.request", opentracer.ResourceName("/user/profile"))
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/guide/metrics_namespace/
[2]: https://app.datadoghq.com/apm/settings