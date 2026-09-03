---
description: Observability Pipelines Worker を使用して Datadog Log Management にログを送信する方法を学びます。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Datadog Logs 送信先
---
{{< product-availability >}}

## 概要 {#overview}

Observability Pipelines の Datadog Logs 送信先を使用して、Datadog Log Management にログを送信します。[AWS PrivateLink](#aws-privatelink) を使用して Observability Pipelines から Datadog にログを送信することもできます。

## セットアップ {#setup}

[パイプラインをセットアップ][4]する際に、Datadog Logs 送信先を設定します。パイプラインは、[UI][1]、[API][5]、または [Terraform][6] を使用してセットアップできます。このセクションの手順は、UI で設定します。

<div class="alert alert-info">Observability Pipelines 経由でログをルーティングする前に、 <code>datadog.pipelines:false</code> タグを使用するインデックス、パイプライン、除外フィルターを確認してください。Datadog Agent ソースからのログの場合、Datadog Logs 送信先では、 <code>source_type</code> を <code>datadog_agent</code> (ログ検索では<code>@source_type:datadog_agent</code> ) に設定します。その後、これらのログが Datadog で <code>datadog_agent</code> ログとして評価され、 <code>datadog.pipelines:false</code> タグを適用するかどうかが判断されます。ログが配信される前にこの動作を変更するには、<a href="/observability_pipelines/processors/edit_fields/">Edit Fields プロセッサ</a>または <a href="/observability_pipelines/processors/custom_processor/">Custom Processor</a> を使用して、 <code>source_type</code> 属性をログから削除します。</div>

### オプション設定 {#optional-settings}

パイプライン UI で Datadog Logs 送信先を選択した後、次のオプション設定を構成できます。

#### ログを複数の Datadog 組織にルーティングする {#route-logs-to-multiple-datadog-organizations}

ログを複数の Datadog 組織にルーティングできます。ルーティングのセットアップ後、ログのルーティング先である[コンポーネントまたは特定の組織のメトリクスを表示](#view-metrics-for-the-component-or-specific-organizations)できます。

**注**: 最大 100 個の Datadog 組織にルーティングできます。

{{< img src="observability_pipelines/destinations/multi_dd_orgs.png" alt="us1 および us3 組織が表示された Datadog Logs 送信先" style="width:45%;" >}}

{{< ui >}}Route to Multiple Organizations{{< /ui >}} をクリックして、複数の Datadog 組織へのルーティングをセットアップします。

- まだ組織を追加していない場合は、[Datadog 組織を追加する](#add-an-organization)のセクションの説明に従って組織の詳細を入力してください。
- すでに組織を追加している場合は、以下の操作が可能です。
  - テーブル内の組織をクリックして、組織を編集または削除する。
  - 検索バーを使用して、名前、フィルタークエリ、または Datadog サイトで特定の組織を検索し、組織を選択して編集または削除する。
  - [組織のメトリクスを表示](#view-metrics-for-the-component-or-specific-organizations)する。
  - {{< ui >}}Add organization{{< /ui >}} をクリックして、別の Datadog 組織にルーティングする。

**注**: 複数の Datadog 組織へのルーティングをセットアップしない場合、ログはデフォルトの Datadog 組織にルーティングされます。これは、Worker をインストールする際に API キーに紐付けられた組織です。

#### 組織を追加する{#add-an-organization}

<div class="alert alert-warning">どの組織フィルターにも一致しないログは破棄されます。<a href="#component-level-metrics">コンポーネントメトリクス</a><code>Data dropped (intentional)</code> に、フィルターに一致せずに破棄されたログの数が示されます。</div>

1. 組織の名前を入力します。
	- **注**: 名前は、実際の Datadog 組織の名前に対応している必要はありません。
1. フィルタークエリを定義します。指定したフィルタークエリに一致するログのみが組織に送信されます。フィルタークエリの記述方法の詳細については、[Observability Pipelines の検索構文][3]を参照してください。
1. Datadog 組織のサイトを選択します。
1. その Datadog 組織の API キーの識別子を入力します。
	- **注**: API キーの識別子のみを入力してください。実際の API キーは**入力しない**でください。
1. {{< ui >}}Save{{< /ui >}} をクリックします。

#### バッファリング {#buffering}

{{% observability_pipelines/destination_buffer %}}

## シークレットのデフォルト{#secret-defaults}

{{< tabs >}}
{{% tab "シークレット管理" %}}

この送信先にはシークレット識別子はありません。

{{% /tab %}}

{{% tab "環境変数" %}}

<!-- vale Datadog.words_case_sensitive = NO -->
{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog %}}
<!-- vale Datadog.words_case_sensitive = YES -->

{{% /tab %}}
{{< /tabs >}}

## コンポーネントまたは特定の組織のメトリクスを表示する {#view-metrics-for-the-component-or-specific-organizations}

メトリクスは、[コンポーネントレベル](#component-level-metrics)または[組織レベル](#organization-level-metrics)で表示できます。

### コンポーネントレベルのメトリクス {#component-level-metrics}

Datadog Logs 送信先全体のメトリクスを表示するには:

1. [Observability Pipelines][1] に移動します。
1. パイプラインを選択します。
1. {{< ui >}}Datadog Logs{{< /ui >}} 送信先の歯車アイコンをクリックし、{{< ui >}}View details{{< /ui >}} を選択します。

**注**: {{< ui >}}Data dropped (intentional){{< /ui >}} メトリクスは、組織のどのフィルターにも一致しなかったログを示します。

### 組織レベルのメトリクス{#organization-level-metrics}

特定の Datadog 組織のメトリクスを表示するには:

1. [Observability Pipelines][1] に移動します。
1. パイプラインを選択します。
1. {{< ui >}}Datadog Logs{{< /ui >}} 送信先をクリックします。組織が表示されます。
  {{< img src="observability_pipelines/destinations/multi_dd_orgs_highlighted.png" alt="us1 および us3 組織が強調表示された Datadog Logs 送信先" style="width:45%;" >}}
1. メトリクスを表示する組織をクリックします。
1. {{< ui >}}View Health Metrics{{< /ui >}} をクリックします。

または、Datadog Logs 送信先で {{< ui >}}Review Configured Organizations{{< /ui >}} をクリックします。次に、組織の {{< ui >}}Metrics{{< /ui >}} 列にあるグラフアイコンをクリックします。

## ヘルスメトリクス{#health-metrics}

すべての送信先から出力される[コンポーネントメトリクス][7]および[送信先バッファメトリクス][8]については、[Pipelines 使用状況メトリクス][9]のドキュメントを参照してください。

{{< site-region region="us,ap1,ap2,uk1" >}}

## AWS PrivateLink {#aws-privatelink}

Observability Pipelines から AWS PrivateLink を使用して Datadog にログを送信するには、[AWS PrivateLink 経由で Datadog に接続する][1]のセットアップ手順を参照してください。セットアップが必要な 2 つのエンドポイントは次のとおりです。

- ログ (ユーザー HTTP インテーク):{{< region-param key=http_endpoint_private_link code="true" >}}
- Remote Configuration:{{< region-param key=remote_config_endpoint_private_link code="true" >}}

**注**: `obpipeline-intake.datadoghq.com` エンドポイントは Live Capture に使用されるものであり、PrivateLink エンドポイントとしては利用できません。

[1]: /ja/agent/guide/private-link/?tab=crossregionprivatelinkendpoints

{{< /site-region >}}
{{< site-region region="us3" >}}

<!-- vale Datadog.headings = NO -->
## Azure Private Link {#azure-private-link}
<!-- vale Datadog.headings = YES -->

Observability Pipelines から Azure Private Link を使用して Datadog にログを送信するには、[Azure Private Link 経由で Datadog に接続する][1]のセットアップ手順を参照してください。セットアップが必要な 2 つのエンドポイントは次のとおりです。

- ログ (ユーザー HTTP インテーク): `http-intake.logs.us3.datadoghq.com`
- Remote Configuration: `config.us3.datadoghq.com`

**注**: `obpipeline-intake.datadoghq.com` エンドポイントは Live Capture に使用されるものであり、Private Link エンドポイントとしては利用できません。

[1]: /ja/agent/guide/azure-private-link/?site=us3

{{< /site-region >}}

### Datadog Logs のメトリクス {#datadog-logs-metrics}

- 個々のコンポーネントでフィルタリングまたはグループ化するには、`component_id` タグを使用します。
- `component_type` タグは、Datadog Logs 送信先メトリクスでは `datadog_logs` です。

`pipelines.datadog_logs_reserved_attribute_conflicts_total`
: **説明**: 意味のあるフィールドを Datadog の[予約済み属性][10]に再配置する際に発生した競合の数。[例](#example-of-relocating-fields-with-semantic-meaning-to-a-datadog-reserved-attribute)を参照してください。Worker バージョン 2.18 以降で利用可能です。
: **メトリクスのタイプ**: count

#### 意味のあるフィールドを Datadog の予約済み属性に再配置する例 {#example-of-relocating-fields-with-semantic-meaning-to-a-datadog-reserved-attribute}

OpenTelemetry ソースは次のイベントをデコードします。ここで、`severity_text` は予約済みの `status` 属性に意味的にマッピングされます。

```json
{
  "message": "GET /api/users returned 404",
  "severity_text": "WARN",
  "attributes": {
    "status": 404,
    "http.method": "GET"
  },
  "timestamp": "..."
}
```

その後、プロセッサでイベントがフラット化されるため、`status` と `severity_text` の両方が最上位に存在することになります。

```json
{
  "message": "GET /api/users returned 404",
  "severity_text": "WARN",
  "status": 404,
  "http.method": "GET",
  "timestamp": "..."
}
```

予約済みの `status` 属性がすでに存在するため、競合するフィールドによって上書きされないよう、送信先で名前が `_RESERVED_severity` に変更されます。

```json
{
  "message": "GET /api/users returned 404",
  "status": "WARN",
  "_RESERVED_severity": 404,
  "http.method": "GET",
  "timestamp": "..."
}
```

## 送信先の仕組み{#how-the-destination-works}

### イベントのバッチ処理{#event-batching}

イベントのバッチは、次のパラメータのいずれかが満たされたときにフラッシュされます。詳細については、[送信先のイベントのバッチ処理][2]を参照してください。

| 最大イベント数 | 最大サイズ (MB) | タイムアウト (秒)|
|----------------|-------------------|---------------------|
| 1,000          | 4.25              | 5                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ja/observability_pipelines/destinations/#event-batching
[3]: /ja/observability_pipelines/search_syntax/logs/
[4]: /ja/observability_pipelines/configuration/set_up_pipelines/
[5]: /ja/api/latest/observability-pipelines/
[6]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[7]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[8]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[9]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
[10]: /ja/logs/log_configuration/attributes_naming_convention/#reserved-attributes