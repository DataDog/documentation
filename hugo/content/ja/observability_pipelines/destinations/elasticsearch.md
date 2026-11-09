---
description: Observability Pipelines Worker を使用して Elasticsearch にログまたはメトリクスを送信する方法について説明します。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
- icon: metrics
  name: メトリクス
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: Elasticsearch Destination
---
{{< product-availability >}}

## 概要 {#overview}

Observability Pipelines の Elasticsearch Destination を使用して、ログやメトリクスを Elasticsearch に送信します。

## セットアップ {#setup}

<div class="alert alert-danger">シークレット管理の場合: Elasticsearch エンドポイント URL の識別子、ユーザー名、パスワードのみを入力します。実際の値は<b>入力しない</b>でください。</div>

[パイプラインをセットアップ][7]する際に、Elasticsearch 送信先を構成します。パイプラインは、[UI][1]、[API][8]、または [Terraform][9] を使用してセットアップできます。このセクションの手順は UI で構成されます。

パイプライン UI で Elasticsearch 送信先を選択したら、次のようにします。

1. Elasticsearch のユーザー名とパスワードの識別子を入力してください。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
1. ElasticSearch エンドポイント URL の識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
1. (オプション) Elasticsearch のバージョンを入力します。
1. [{{< ui >}}Mode{{< /ui >}}] (モード) ドロップダウンメニューで、[{{< ui >}}Bulk{{< /ui >}}] (一括) または [{{< ui >}}Data stream{{< /ui >}}] (データストリーム) を選択します。
	- {{< ui >}}Bulk{{< /ui >}}モード
		- ElasticSearch の [Bulk API][5] を使用して、バッチ処理されたイベントを標準インデックスに直接送信します。
		- インデックスの命名やライフサイクル管理を直接制御する場合に、このモードを選択します。データは指定したインデックスに追加されます。ロールオーバー、削除、マッピングの処理はユーザーが行う必要があります。
		- [{{< ui >}}Bulk{{< /ui >}}] モードを構成するには、次のようにします。
			- (オプション) [{{< ui >}}Index{{< /ui >}}] (インデックス) フィールドに、必要に応じて Elasticsearch インデックスの名前を入力します。[テンプレート構文][3]を使用すると、ログ内の特定のフィールドに基づいて異なるインデックスに動的にデータをルーティングできます (例: `logs-{{service}}` or `metrics-{{service}}`.
	- {{< ui >}}Data streams{{< /ui >}} モード
		- Uses [Elasticsearch Data Streams][4] for data storage. Data streams automatically manage backing indexes and rollovers, making them ideal for time series log data.
		- Choose this mode when you want Elasticsearch to manage the index lifecycle for you. Data streams ensure smooth rollovers, Index Lifecycle Management (ILM) compatibility, and optimized handling of time-based data.
		- To configure {{< ui >}}Data streams{{< /ui >}} モードでは、オプションでデータストリーム名を指定したり、ルーティングと同期の設定を構成したりすることができます。
			1. In the {{< ui >}}Type{{< /ui >}} (タイプ) フィールドに、取り込むデータのカテゴリーを入力します。例: `logs` or `metrics`.
			1. In the {{< ui >}}Dataset{{< /ui >}} フィールドに、構造を記述する形式またはデータソースを指定します。例: `apache`.
			1. In the {{< ui >}}Namespace{{< /ui >}} フィールドに、データストリームを分類するためのグループを入力します。例: `production`.
			1. Enable the {{< ui >}}Auto routing{{< /ui >}} トグルを有効にすることにより、イベントの内容に基づいてイベントを自動的にデータストリームにルーティングします。
			1. Enable the {{< ui >}}Sync fields{{< /ui >}}トグルを有効にすることによって、データストリームのフィールドを、Elasticsearch インデックスマッピングと同期させます。
			- You can use [template syntax][3] for the {{< ui >}}Type{{< /ui >}}] (タイプ)、[{{< ui >}}Dataset{{< /ui >}}] (データセット)、および [{{< ui >}}Namespace{{< /ui >}}] (名前空間) フィールドのための [テンプレート構文] を使用して、ログ内またはメトリクス内の特定のフィールドに基づいてデータストリーム名を動的に作成します。
			- In the UI, there is a preview of the data stream name you configured. If the fields are left blank, the default data stream name used is `logs-generic-default` for logs and `metrics-generic-default` for metrics. With the above example inputs, the data stream name that the Worker writes to is:
				- `logs-apache-production` for logs
				- `metrics-apache-production` for metrics

{{% observability_pipelines/secrets_env_var_note %}}

#### オプション設定 {#optional-settings}

##### TLS の有効化{#enable-tls}

スイッチを切り替えて、{{< ui >}}Enable TLS{{< /ui >}} に設定します。
- シークレット管理を使用している場合: キーパスの識別子を入力します。フィールドを空白のままにした場合に使用されるデフォルトについては、[シークレットのデフォルト](#secret-defaults)を参照してください。
- TLS には、以下の証明書ファイルとキーファイルが必要です。
  - `Server Certificate Path`: DER または PEM (X.509) 形式の認証局 (CA) ルートファイルにより署名された証明書ファイルへのパス。
  - `CA Certificate Path`: DER または PEM (X.509) 形式の認証局 (CA) ルートファイルである証明書ファイルへのパス。
  - `Private Key Path`: DER または PEM (PKCS#8) 形式のサーバー証明書パスに属する `.key` 秘密鍵ファイルへのパス。
  - **注**:
    - 構成データディレクトリ `/var/lib/observability-pipelines-worker/config/` がファイルパスに自動的に追加されます。詳しくは、[高度なワーカー構成][6] を参照してください。
    - ファイルが `observability-pipelines-worker` グループおよびユーザーから読み取り可能になっていなければなりません。

##### 圧縮 {#compression}

Elasticsearch クラスターに大量のイベントを送信する場合は、圧縮を利用するとよいかもしれません。

スイッチを切り替えて {{< ui >}}Compression{{< /ui >}} を有効にします。ドロップダウンメニューで、圧縮アルゴリズム (`gzip`、`snappy`、`zlib`、`zstd`) を選択します。デフォルトでは圧縮されません。

##### バッファリング{#buffering}

{{% observability_pipelines/destination_buffer %}}

##### 高度なオプション {#advanced-options}

1. {{< ui >}}ID Key{{< /ui >}} (ID キー) フィールドに、Elasticsearch でドキュメント ID として使用するフィールドの名前を入力します。
1. {{< ui >}}Pipeline{{< /ui >}} (パイプライン) フィールドに、インデックス作成前にイベントに適用する Elasticsearch 取り込みパイプラインの名前を入力します。
1. {{< ui >}}Retry partial failures{{< /ui >}} (部分的失敗を再試行) のスイッチを有効にすると、バッチ内のイベントの一部が成功、一部が失敗という場合に、失敗した一括リクエストが再試行されます。

## シークレットのデフォルト{#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

- Elasticsearch エンドポイント URL の識別子:
	- デフォルトの識別子は `DESTINATION_ELASTICSEARCH_ENDPOINT_URL` です。
- Elasticsearch 認証ユーザー名の識別子:
	- デフォルトの識別子は `DESTINATION_ELASTICSEARCH_USERNAME` です。
- Elasticsearch 認証パスワードの識別子:
	- デフォルトの識別子は `DESTINATION_ELASTICSEARCH_PASSWORD` です。

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/elasticsearch %}}

{{% /tab %}}
{{< /tabs >}}

## 送信先の動作{#how-the-destination-works}

### イベントのバッチ処理 {#event-batching}

イベントのバッチは、次のパラメーターのいずれかが満たされたときにフラッシュされます。詳細については、[送信先のイベントのバッチ処理][2] を参照してください。

| 最大イベント数 | 最大サイズ (MB) | タイムアウト (秒)   |
|----------------|-------------------|---------------------|
| なし           | 10                | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ja/observability_pipelines/destinations/#event-batching
[3]: /ja/observability_pipelines/destinations/#template-syntax
[4]: https://www.elastic.co/docs/reference/fleet/data-streams
[5]: https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-bulk
[6]: /ja/configuration/install_the_worker/advanced_worker_configurations/
[7]: /ja/observability_pipelines/configuration/set_up_pipelines/
[8]: /ja/api/latest/observability-pipelines/
[9]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline