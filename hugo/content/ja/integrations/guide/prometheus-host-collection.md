---
further_reading:
- link: logs/log_collection
  tag: ドキュメント
  text: ログの収集
- link: /infrastructure/process
  tag: ドキュメント
  text: プロセスの収集
- link: tracing
  tag: ドキュメント
  text: トレースの収集
- link: extend/prometheus
  tag: ドキュメント
  text: 独自のカスタム Prometheus チェックを作成する
title: ホストからの Prometheus および OpenMetrics メトリクスの収集
---
Datadog Agent と [Datadog-OpenMetrics][1] または [Datadog-Prometheus][2] インテグレーションを使用して、ホスト上で実行されているアプリケーションから公開済みの Prometheus および OpenMetrics メトリクスを収集します。

## 概要 {#overview}

バージョン 6.5.0 以降、Agent には、Prometheus エンドポイントをスクレイピングできる [OpenMetrics][3] と [Prometheus][4] チェックが含まれています。Datadog では、OpenMetrics チェックの方が効率的であり、Prometheus テキスト形式を完全にサポートしているため、その使用を推奨します。カスタムチェックの記述を含む `OpenMetricsCheck` インターフェイスの高度な使用方法については、[開発ツール][5] のセクションを参照してください。Prometheus チェックを使用するのは、メトリクスエンドポイントでテキスト形式がサポートされていない場合だけにしてください。

このページでは、これらのチェックの基本的な使い方を説明し、Prometheus で公開されているすべてのメトリクスを Datadog に取り込めるようにします。

## セットアップ {#setup}

### インストール {#installation}

[該当するオペレーティングシステム用の Datadog Agent をインストール][6]します。OpenMetrics および Prometheus チェックは [Datadog Agent][7] パッケージに含まれています。コンテナまたはホストに追加でインストールする必要はありません。

### 構成 {#configuration}

公開済みのメトリクスを収集するには、以下の手順を実行します。

1. [Agent の構成ディレクトリ][8]のルートにある `conf.d/` フォルダー内の `openmetrics.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションについては、[サンプルの openmetrics.d/conf.yaml][9] を参照してください。インテグレーションを有効にするために必要な最小限の設定は次のとおりです。

    ```yaml
    init_config:

    instances:
        - openmetrics_endpoint: 'localhost:<PORT>/<ENDPOINT>'
          namespace: '<NAMESPACE>'
          metrics:
              - '<METRIC_TO_FETCH>': '<DATADOG_METRIC_NAME>'
    ```

     With the following configuration placeholder values:

    | Placeholder             | Description                                                                                                                                                                                                            |
    | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `<PORT>`                | Port to connect to in order to access the Prometheus endpoint.                                                                                                                                                         |
    | `<ENDPOINT>`            | URL for the metrics served by the container, in Prometheus format.                                                                                                                                                     |
    | `<NAMESPACE>`           | Set namespace to be prefixed to every metric when viewed in Datadog.                                                                                                                                                   |
    | `<METRIC_TO_FETCH>`     | Prometheus metrics key to be fetched from the Prometheus endpoint.                                                                                                                                                     |
    | `<DATADOG_METRIC_NAME>` | Optional parameter which, if set, transforms the `<METRIC_TO_FETCH>` metric key to `<DATADOG_METRIC_NAME>` in Datadog. <br>If you choose not to use this option, pass a list of strings rather than `key:value` pairs. |

2. [Agent を再起動][10]して、メトリクスの収集を開始します。

### 使用可能なパラメーター {#parameters-available}

`instances` に使用できるパラメーターの全リストを以下に示します。

| 名前                                    | タイプ                                    | 必須 | デフォルト値 | 説明                                                                                                                                                                                                                                                          |
| --------------------------------------- | --------------------------------------- | --------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `openmetrics_endpoint`                        | 文字列                                  | 必須  | なし          | OpenMetrics 形式でメトリクスを公開する URL。                                                                          |
| `namespace`                             | 文字列                                  | 必須  | なし          | すべてのメトリクスネームスペースの前に追加されるネームスペース。メトリクスは `namespace.metric_name` の形式で収集されます。                                                                                                                                         |
| `metrics`                               | 文字列のリストまたは `key:value` の要素 | 必須  | なし          | Prometheus エンドポイントから取得するメトリクスの `<METRIC_TO_FETCH>: <NEW_METRIC_NAME>` ペアのリスト。<br>`<NEW_METRIC_NAME>` はオプションです。設定されている場合、Datadog 内の名前を変換します。このリストには、少なくとも 1 つのメトリクスを含める必要があります。                           |
| `raw_metric_prefix`             | 文字列                                  | 任意  | なし          | 公開済みメトリクス名にプレフィックスがある場合、そのプレフィックスを削除します。                                                                                                                |
| `health_service_check`                  | ブール値                                 | 任意  | true          | Prometheus エンドポイントの健全性をレポートするサービスチェックを送信します。チェック名は `<NAMESPACE>.prometheus.health` です。                                                                                                                                        |
| `label_to_hostname`                     | 文字列                                  | 任意  | なし          | 1 つのラベルの値でホスト名を上書きします。                                                                                                                                                                                                                  |
| `label_joins`                           | オブジェクト                                  | 任意  | なし          | ラベル結合を使用すると、メトリクスを対象にして 1:1 のマッピングでそのラベルを取得できます。                                                                                                                                                                              |
| `labels_mapper`                         | key:value 要素のリスト               | 任意  | なし          | ラベルマッパーを使用すると、一部のラベル名を変更できます。形式: `<LABEL_TO_RENAME>: <NEW_LABEL_NAME>`。                                                                                                                                                                   |
| `type_overrides`                        | key:value 要素のリスト               | 任意  | なし          | タイプを上書きすると、Prometheus ペイロード内のタイプを上書きしたり、タイプのないメトリクスにタイプを指定したりできます (デフォルトでは無視されます)。<br>サポートされている `<METRIC_TYPE>` は、`gauge`、`monotonic_count`、`histogram`、および `summary` です。                                            |
| `tags`                                  | key:value 要素のリスト               | 任意  | なし          | このインテグレーションによって出力されるすべてのメトリクス、イベント、サービスチェックに付与するタグのリスト。<br>[タグ付けの詳細][5]。                                                                                                                                    |
| `send_distribution_buckets`             | ブール値                                 | 任意  | false         | `send_distribution_buckets` を `true` に設定して、OpenMetrics ヒストグラムを送信して [Distribution メトリクス][15]に変換します。<br>`collect_histogram_buckets` は `true` (デフォルト値) に設定する必要があります。<br>**注**: OpenMetrics v2 の場合は、代わりに `collect_counters_with_distributions` を使用してください。                                                                             |
| `send_distribution_counts_as_monotonic` | ブール値                                 | 任意  | false         | `send_distribution_counts_as_monotonic` を `true` に設定して、OpenMetrics ヒストグラム/サマリーカウントを単調増加カウントとして送信します。                                                                                                                                             |
| `collect_histogram_buckets`               | ブール値                                 | 任意  | true          | `collect_histogram_buckets` を `true` に設定して、ヒストグラムバケットを送信します。                                                                                                                                                                                              |
| `send_monotonic_counter`                | ブール値                                 | 任意  | true          | カウントを単調増加カウントとして送信する方法については、[GitHub の関連問題][9]を参照してください。                                                                                                                                                                                            |
| `exclude_labels`                        | 文字列のリスト                          | 任意  | なし          | 除外するラベルのリスト。                                                                                                                                                                                                                                      |
| `ssl_cert`                              | 文字列                                  | 任意  | なし          | Prometheus エンドポイントが保護されている場合の設定は次のとおりです。<br>証明書へのパスのみを指定する場合は秘密鍵を別途指定してください。または、証明書と秘密鍵の両方を含むファイルへのパスを指定できます。|
| `ssl_private_key`                       | 文字列                                  | 任意  | なし          | 証明書に秘密鍵が含まれていない場合に必要です。<br>**警告**: ローカル証明書の秘密鍵は暗号化されていない必要があります。                                                                                                                         |
| `ssl_ca_cert`                           | 文字列                                  | 任意  | なし          | カスタム証明書の生成に使用する信頼された CA へのパス。                                                                                                                                                                                                 |
| `timeout`                               | 整数                                 | 任意  | 10            | Prometheus/OpenMetrics クエリのタイムアウトを秒単位で設定します。                                                                                                                                                                                                      |
| `max_returned_metrics`                  | 整数                                 | 任意  | 2000          | チェックはデフォルトで 2000 メトリクスに制限されます。必要に応じて、この制限を引き上げてください。                                                                                                                                                                                  |
| `bearer_token_auth`                     | ブール値                                 | 任意  | false         | `bearer_token_auth` を `true` に設定して、bearer トークン認証ヘッダーを追加します。**注**: `bearer_token_path` が設定されていない場合は、デフォルトのパスとして `/var/run/secrets/kubernetes.io/serviceaccount/token` が使用されます。                                                      |
| `bearer_token_path`                     | 文字列                                  | 任意  | なし          | Kubernetes サービスアカウントの bearer トークンファイルへのパス (ファイルが存在し、正しくマウントされていることを確認してください)。**注**: `bearer_token_auth` を `true` に設定して、認証用の HTTP ヘッダーにトークンを追加できるようにします。                                         |
| `collect_counters_with_distributions`   | ブール値                                 | 任意  | false         | ヒストグラムのバケットを Datadog ディストリビューションメトリクスとして送信する際に、`.sum` および `.count` で終わる観測カウンターメトリクスも収集するかどうか。これにより、`histogram_buckets_as_distributions` オプションが暗黙的に有効になります。|

**注**: `send_distribution_buckets` と `send_distribution_counts_as_monotonic` 以外のすべてのパラメーターは、OpenMetrics チェックと Prometheus チェックの両方でサポートされています。

## はじめに {#getting-started}

### シンプルなメトリクスの収集 {#simple-metric-collection}

Prometheus によって公開されたメトリクスの収集を開始するには、以下の手順に従ってください。

1. [Prometheus の概要][11]のドキュメントに従って、自身を監視する Prometheus をローカルで起動します。

2. [利用しているプラットフォーム用の Datadog Agent をインストール][6]します。

3. [Agent の構成ディレクトリ][8]のルートにある `conf.d/` フォルダー内の `openmetrics.d/conf.yaml` ファイルを以下の内容で編集します。

    ```yaml
    init_config:

    instances:
        - openmetrics_endpoint: http://localhost:9090/metrics
          namespace: 'documentation_example'
          metrics:
              - promhttp_metric_handler_requests_total: prometheus.handler.requests.total
    ```

4. [Agent を再起動][12]します。

5. [メトリクスカタログページ][13]に移動して、収集されたメトリクスを確認します。`prometheus_target_interval_length_seconds*`

    {{< img src="integrations/guide/prometheus_host/prometheus_collected_metric_host.png" alt="収集された Prometheus メトリクス">}}

## カスタムインテグレーションを公式インテグレーションに{#from-custom-to-official-integration}

デフォルトでは、Prometheus の汎用チェックで取得されたすべてのメトリクスは、カスタムメトリクスとみなされます。市販のソフトウェアを監視していて、公式の統合に値すると考える場合は、遠慮なく[投稿でお知らせ][5]ください。

公式の統合には、それぞれ専用のディレクトリがあります。汎用チェックには、デフォルト構成およびメトリクスメタデータをハードコーディングするためのデフォルトインスタンスメカニズムがあります。たとえば、[kube-proxy][14] の統合を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/openmetrics/
[2]: /ja/integrations/prometheus/
[3]: https://github.com/DataDog/integrations-core/tree/master/openmetrics
[4]: https://github.com/DataDog/integrations-core/tree/master/prometheus
[5]: /ja/extend/custom_checks/prometheus/
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: /ja/getting_started/tagging/
[8]: /ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[9]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[10]: /ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: https://prometheus.io/docs/prometheus/latest/getting_started/
[12]: /ja/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[13]: https://app.datadoghq.com/metric/catalog
[14]: https://github.com/DataDog/integrations-core/tree/master/kube_proxy
[15]: /ja/metrics/distributions/