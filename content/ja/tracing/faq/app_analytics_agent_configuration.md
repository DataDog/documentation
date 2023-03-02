---
aliases:
- /ja/tracing/trace_search_and_analytics/agent_trace_search/
- /ja/tracing/app_analytics/agent_trace_search/
- /ja/tracing/guide/app_analytics_agent_configuration/
kind: ドキュメント
title: Agent を介した App Analytics の構成
---

<div class="alert alert-danger">
このページは、レガシー版 App Analytics に関するコンフィギュレーション情報を伴う非推奨機能について説明します。トラブルシューティングまたは古い設定の修正に利用可能です。トレース全体を完全に制御するには、<a href="/tracing/trace_ingestion">取り込みコントロール</a>および<a href="/tracing/trace_retention">保持フィルター</a>を使用してください。
<br>
新機能を使用するには、<a href="/tracing/trace_pipeline">トレースの取り込みと保持</a>に移行してください。
</div>

[App Analytics][1] を使うと、`customer_id`、`error_type`、`app_name` などのユーザー定義タグで APM データを絞り込み、リクエストのトラブルシューティングやフィルタリングを行うことができます。次の方法で有効にできます。

* [自動][2]または[手動][3]のいずれかで、サービスから関連する分析を出力するように APM トレーサーを構成します。
* サービスから関連する分析を出力するように Datadog Agent を構成します（以下の手順）。

**注**: Agent で App Analytics を有効にするには、[サービス][1]が既に Datadog に流れている必要があります。

1. [サービスのセットアップ][4]が完了したら、[App Analytics ドキュメントページ][5]に移動して、トレース検索で使用可能な[サービス][6]と[リソース][7]名のリストを見つけます。
3. [Indexed Span][8] を抽出する `environment` と `services` を選択します。
2. 以下の情報を使用して、Datadog Agent の構成を（Agent のバージョンに基づいて）更新します。

{{< tabs >}}
{{% tab "Agent 6.3.0+" %}}
`datadog.yaml` で、`apm_config` の下に `analyzed_spans` を追加します。例:

```yaml
apm_config:
  analyzed_spans:
    <サービス名_1>|<操作名_1>: 1
    <サービス名_2>|<操作名_2>: 1
```

{{% /tab %}}
{{% tab "Agent 5.25.0+" %}}
`datadog.conf` で、`[trace.analyzed_spans]` を追加します。例:

```text
[trace.analyzed_spans]
<サービス名_1>|<操作名_1>: 1
<サービス名_2>|<操作名_2>: 1
```

{{% /tab %}}
{{% tab "Docker" %}}
（バージョン 12.6.5250 以上と互換性がある）Agent コンテナ環境に `DD_APM_ANALYZED_SPANS` を追加します。形式は、スペースを含まないカンマ区切りの正規表現である必要があります。例:

```text
DD_APM_ANALYZED_SPANS="<サービス名_1>|<操作名_1>=1,<サービス名_2>|<操作名_2>=1"
```

```text
`my-express-app|express.request=1,my-dotnet-app|aspnet_core_mvc.request=1`
```

{{% /tab %}}
{{< /tabs >}}

Datadog では、自動的にインスツルメントされたすべてのサービスに `<操作名>` があり、トレースされるリクエストのタイプを設定するために使用されます。たとえば、Python Flask アプリケーションをトレースしている場合、操作名として `flask.request` がある場合があります。Express を使用する Node アプリケーションでは、`express.request` に操作名を尋ねさせることになります。

構成の `<サービス名>` と `<操作名>` の両方を、トレース検索に追加する[トレース][9]のサービス名と操作名に置き換えます。

たとえば、`python-api` という名前の Python サービスがあり、Flask（操作名 `flask.request`）を実行している場合、`<サービス名>` は `python-api`、`<操作名>` は `flask.request` になります。

[1]: https://app.datadoghq.com/apm/services
[2]: /ja/tracing/app_analytics/#automatic-configuration
[3]: /ja/tracing/app_analytics/#custom-instrumentation
[4]: /ja/tracing/send_traces/
[5]: https://app.datadoghq.com/apm/settings
[6]: /ja/tracing/glossary/#services
[7]: /ja/tracing/glossary/#resources
[8]: /ja/tracing/app_analytics/search/#analysed-span
[9]: /ja/tracing/glossary/#trace
