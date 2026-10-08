---
aliases:
- /ja/observability_pipelines/destinations/splunk_hec/
code_lang: logs
description: Observability Pipelines で Splunk HEC 送信先を設定する方法を説明します。
disable_toc: false
title: Splunk HTTP Event Collector (HEC) Destination
type: multi-code-lang
weight: 1
---
## 概要{#overview}

Observability Pipelines の Splunk HTTP Event Collector (HEC) Destination を使用して、ログを Splunk HEC に送信します。

**注**: Observability Pipelines は、gzip (レベル 6) アルゴリズムを使用してログを圧縮します。

## セットアップ {#setup}

<div class="alert alert-danger">シークレット管理の場合: Splunk HEC トークンとエンドポイントの識別子のみを入力してください。実際の値は<b>入力しない</b>でください。</div>

[パイプラインをセットアップ][5]する際に、Splunk HEC 送信先を構成します。パイプラインのセットアップは、[UI][1] で、[API][6] を使用して、または [Terraform][7] を使用して行えます。このセクションの手順は UI で構成されます。

パイプライン UI で Splunk HEC 送信先を選択した後:

1. [{{< ui >}}Token strategy{{< /ui >}}] ドロップダウンメニューの場合:
	- [Splunk HEC ソース][8]を使用しており、ソースで {{< ui >}}From Source{{< /ui >}} を有効にしている場合にのみ {{< ui >}}Store HEC token{{< /ui >}} を選択してください。そうでない場合、エラーが発生し、Worker のインストールに進むことができません。このオプションは、Observability Pipelines が受信したトークンを Splunk HEC 送信先に転送します。
	- デフォルトの {{< ui >}}Custom{{< /ui >}} トークン戦略を使用する場合は、トークンの識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
1. エンドポイント URL の識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
1. ドロップダウンメニューで {{< ui >}}Encoding{{< /ui >}} を選択します ({{< ui >}}JSON{{< /ui >}} または {{< ui >}}Raw{{< /ui >}})。
	- {{< ui >}}JSON{{< /ui >}} を選択した場合、必要に応じて [{{< ui >}}Add Field{{< /ui >}}] をクリックして、[インデックス付きフィールド][4] として抽出するフィールドを指定します。Splunk HTTP Event Collector は、ログを取り込む際に指定されたフィールドをインデックス化します。
	- **注**: {{< ui >}}Raw{{< /ui >}} [エンドポイントターゲット](#endpoint-target)は [{{< ui >}}Index Fields{{< /ui >}}] をサポートしていません。

{{% observability_pipelines/secrets_env_var_note %}}

### オプション設定 {#optional-settings}

#### Splunk インデックス{#splunk-index}

データを格納したい Splunk インデックスの名前を入力してください。このインデックスは、使用している HEC で許可されている必要があります。ログの特定のフィールドに基づいて異なるインデックスにログを振り分ける場合は、[テンプレート構文][3]を参照してください。

#### エンドポイントターゲット{#endpoint-target}

[{{< ui >}}Endpoint Target{{< /ui >}}] ドロップダウンメニューで、イベントの送信先となる Splunk HEC エンドポイントを選択します。
- {{< ui >}}Event{{< /ui >}} (デフォルト): Splunk の `/event` HEC エンドポイントにイベントを送信します。このエンドポイントは、自動抽出されたタイムスタンプとインデックス付きフィールドをサポートしています。
- {{< ui >}}Raw{{< /ui >}}: Splunk の`/raw` HEC エンドポイントにイベントを送信します。

#### タイムスタンプの自動抽出{#auto-extract-timestamp}

タイムスタンプを自動抽出するかどうかを選択します。`true` に設定すると、Splunk は `yyyy-mm-dd hh:mm:ss` の予期される形式でメッセージからタイムスタンプを抽出します。

**注**: {{< ui >}}Raw{{< /ui >}} [エンドポイントターゲット](#endpoint-target)は [{{< ui >}}Auto-extract timestamp{{< /ui >}}] をサポートしていません。

#### ソースタイプのオーバーライド{#sourcetype-override}

`sourcetype` を設定して、Splunk のデフォルト値 (HEC データの場合は `httpevent`) を上書きします。ログの特定のフィールドに基づいて異なるソースタイプにログを振り分ける場合は、[テンプレート構文][3]を参照してください。

#### バッファリング {#buffering}

{{% observability_pipelines/destination_buffer %}}

## シークレットのデフォルト{#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

{{% observability_pipelines/splunk_hec_secrets %}}

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/splunk_hec %}}

{{% /tab %}}
{{< /tabs >}}

## トラブルシューティング {#troubleshooting}

### 401 Unauthorized エラー {#401-unauthorized-errors}

{{% observability_pipelines/splunk_hec_unauthorized_error %}}

## 健全性メトリクス {#health-metrics}

すべての送信先から送信される[コンポーネントメトリクス][9]および[送信先バッファメトリクス][10]については、[Pipelines 使用状況メトリクス][11]のドキュメントを参照してください。

### Splunk HEC メトリクス{#splunk-hec-metrics}

- `component_id` タグを使用して、個々のコンポーネントでフィルタリングまたはグループ化します。
- Splunk HEC メトリクスでは `component_type` タグは `splunk_hec_logs` です。

`pipelines.splunk_pending_acks`
: **説明**: 応答を待機している未処理の Splunk HEC インデクサー確認応答の数。
: **メトリクスタイプ**: ゲージ

## 送信先の仕組み{#how-the-destination-works}

### イベントのバッチ処理{#event-batching}

イベントのバッチは、次のパラメーターのいずれかが満たされたときにフラッシュされます。詳細については、[送信先のイベントのバッチ処理][2] を参照してください。

| 最大イベント数 | 最大サイズ (MB) | タイムアウト (秒)   |
|----------------|-------------------|---------------------|
| なし           | 1                 | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ja/observability_pipelines/destinations/#event-batching
[3]: /ja/observability_pipelines/destinations/#template-syntax
[4]: https://help.splunk.com/en/splunk-enterprise/get-started/get-data-in/9.0/get-data-with-http-event-collector/automate-indexed-field-extractions-with-http-event-collector
[5]: /ja/observability_pipelines/configuration/set_up_pipelines/
[6]: /ja/api/latest/observability-pipelines/
[7]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[8]: /ja/observability_pipelines/sources/splunk_hec/
[9]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[10]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[11]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/