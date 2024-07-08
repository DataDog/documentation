---
further_reading:
- link: logs/log_collection
  tag: ドキュメント
  text: ログの収集
- link: /infrastructure/process
  tag: ドキュメント
  text: プロセスの収集
- link: トレーシング
  tag: ドキュメント
  text: トレースの収集
- link: developers/prometheus
  tag: ドキュメント
  text: カスタム Prometheus チェックの記述
kind: ドキュメント
title: ホストからの Prometheus および OpenMetrics メトリクスの収集
---

Datadog Agent と [Datadog-OpenMetrics][1] または [Datadog-Prometheus][2] インテグレーションを併用して、ホストで実行されているアプリケーションから、公開されている Prometheus および OpenMetrics メトリクスを収集します。

## 概要

バージョン 6.5.0 より、Agent には [OpenMetrics][3] および [Prometheus][4] チェックが用意され、Prometheus エンドポイントをスクレイピングできます。Prometheus テキスト形式を効率よくフルにサポートできるため、Datadog では OpenMetrics チェックの 使用をお勧めします。カスタムチェックの記述を含む `OpenMetricsCheck` インターフェイスの高度な使用方法については、[開発ツール][5]のセクションを参照してください。Prometheus チェックは、メトリクスのエンドポイントがテキスト形式をサポートしていない場合にのみ使用してください。

このページでは、これらのチェックの基本的な使用方法について説明します。これにより、Datadog 内のすべての Prometheus 公開メトリクスをインポートできるようになります。

## セットアップ

### インストール

[対応するオペレーティングシステムに Datadog Agent をインストールします][6]。OpenMetrics および Prometheus チェックは [Datadog Agent][7] パッケージに含まれています。コンテナまたはホストに追加でインストールする必要はありません。

### 構成

公開されたメトリクスを収集するには

1. [Agent の構成ディレクトリ][8]のルートにある `conf.d/` フォルダーの `openmetrics.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル openmetrics.d/conf.yaml][9] を参照してください。これは、インテグレーションを有効にするために必要な最低限の構成です。

    ```yaml
    init_config:

    instances:
        - openmetrics_endpoint: 'localhost:<PORT>/<ENDPOINT>'
          namespace: '<NAMESPACE>'
          metrics:
              - '<METRIC_TO_FETCH>': '<DATADOG_METRIC_NAME>'
    ```

   次の構成プレースホルダー値を使用します。

    | プレースホルダー             | 説明                                                                                                                                                                                                            |
    | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `<ポート>`                | Prometheus エンドポイントにアクセスするために接続するポート。                                                                                                                                                         |
    | `<エンドポイント>`            | コンテナによって提供されるメトリクスの URL（Prometheus 形式）。                                                                                                                                                     |
    | `<ネームスペース>`           | Datadog で表示するときに、すべてのメトリクスの前にネームスペースをプレフィックスとして設定します。                                                                                                                                                   |
    | `<フェッチするメトリクス>`     | Prometheus エンドポイントからフェッチされる Prometheus メトリクスキー。                                                                                                                                                     |
    | `<DATADOG_メトリクス名>` | オプションパラメーター。設定すると、`<フェッチするメトリクス>` メトリクスキーは Datadog の `<DATADOG_メトリクス名>` に変換されます。<br>このオプションを使用しない場合は、`key:value` ペアではなく、文字列のリストを渡します。 |

2. [Agent を再起動][10]すると、メトリクスの収集が開始されます。

### 利用可能なパラメーター

`インスタンス`で使用可能なパラメーターを以下にリストします。

| 名前                                    | タイプ                                    | 要否 | デフォルト値 | 説明                                                                                                                                                                                                                                                          |
| --------------------------------------- | --------------------------------------- | --------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `openmetrics_endpoint`                        | 文字列                                  | 必須  | なし          | OpenMetrics 形式のメトリクスを公開する URL です。                                                                           |
| `namespace`                             | 文字列                                  | 必須  | なし          | すべてのメトリクスネームスペースの前に付加されるネームスペース。メトリクスは、`namespace.metric_name` の形式で収集されます。                                                                                                                                          |
| `metrics`                               | 文字列リストまたは `key:value` 要素 | 必須  | なし          | Prometheus エンドポイントから取得されるメトリクスの `<フェッチするメトリクス>: <新しいメトリクス名>` ペアのリスト。<br> `<新しいメトリクス名>` はオプションです。設定すると、Datadog での名前が変換されます。このリストには少なくとも 1 つのメトリクスを指定する必要があります。                            |
| `raw_metric_prefix`             | 文字列                                  | オプション  | なし          | 公開されるすべてのメトリクス名から取り除かれるプレフィックスです (存在する場合)。                                                                                                                 |
| `health_service_check`                  | boolean                                 | オプション  | true          | Prometheus エンドポイントの健全性について報告するサービスチェックを送信します。チェックの名前は `<ネームスペース>.prometheus.health` です。                                                                                                                                         |
| `label_to_hostname`                     | 文字列                                  | オプション  | なし          | ホスト名を 1 つのラベルの値で上書きします。                                                                                                                                                                                                                   |
| `label_joins`                           | オブジェクト                                  | オプション  | なし          | label_joins を使用すると、メトリクスを対象として指定して、そのラベルを 1:1 マッピングを介して取得できます。                                                                                                                                                                               |
| `labels_mapper`                         | key:value 要素のリスト               | オプション  | なし          | labels_mapper を使用すると、一部のラベルの名前を変更できます。形式: `<名前を変更するラベル>: <新しいラベル名>`                                                                                                                                                                    |
| `type_overrides`                        | key:value 要素のリスト               | オプション  | なし          | type_overrides を使用すると、Prometheus ペイロードのタイプを上書きするか、またはタイプが指定されていないメトリクスにタイプを適用できます (デフォルトでは無視されます)。<br> サポートされている `<メトリクスタイプ>` は、`gauge`、`monotonic_count`、`histogram`、および `summary` です。                                             |
| `tags`                                  | key:value 要素のリスト               | オプション  | なし          | このインテグレーションによって送信されるすべてのメトリクス、イベント、およびサービスチェックにアタッチされるタグのリスト。<br> [タグ付けについての詳細][5]。                                                                                                                                     |
| `send_distribution_buckets`             | boolean                                 | オプション  | false         | `send_distribution_buckets` を `true` に設定すると、OpenMetrics ヒストグラムを送信して[ディストリビューションメトリクス][15]に変換できます。<br>`collect_histogram_buckets` は `true` に設定する必要があります (デフォルト値)。<br>**注**: OpenMetrics v2 の場合は、代わりに `collect_counters_with_distributions` を使用してください。                                                                              |
| `send_distribution_counts_as_monotonic` | boolean                                 | オプション  | false         | `send_distribution_counts_as_monotonic` を `true` に設定し、OpenMetrics のヒストグラム/サマリーカウントを単調カウントとして送信します。                                                                                                                                              |
| `collect_histogram_buckets`               | boolean                                 | オプション  | true          | `collect_histogram_buckets` を `true` に設定すると、ヒストグラムバケットを送信できます。                                                                                                                                                                                               |
| `send_monotonic_counter`                | boolean                                 | オプション  | true          | カウントを単調カウントとして送信する方法については、[GitHub の関連事項][9]を参照してください。                                                                                                                                                                                             |
| `exclude_labels`                        | 文字列のリスト                          | オプション  | なし          | 除外されるラベルのリスト。                                                                                                                                                                                                                                       |
| `ssl_cert`                              | 文字列                                  | オプション  | なし          | Prometheus エンドポイントがセキュリティ保護されている場合、構成するための設定は以下のとおりです。<br> 設定は、証明書へのパス (秘密キーを指定する必要あり)、または証明書と秘密キーの両方を含むファイルへのパスのいずれかです。 |
| `ssl_private_key`                       | 文字列                                  | オプション  | なし          | 証明書が秘密キーを含んでいない場合に必要です。<br> **警告**: ローカル証明書への秘密キーは暗号化されていないことが必要です。                                                                                                                          |
| `ssl_ca_cert`                           | 文字列                                  | オプション  | なし          | カスタム証明書を生成するために使用する、信頼されている CA へのパス。                                                                                                                                                                                                  |
| `prometheus_timeout`                    | 整数                                 | オプション  | 10            | Prometheus/OpenMetrics クエリのタイムアウトを秒単位で設定します。                                                                                                                                                                                                       |
| `max_returned_metrics`                  | 整数                                 | オプション  | 2000          | デフォルトで、メトリクスのチェックは 2000 個に制限されます。必要な場合は、この制限を引き上げてください。                                                                                                                                                                                   |
| `bearer_token_auth`                     | boolean                                 | オプション  | false         | `bearer_token_auth` を `true` に設定して、ベアラートークン認証のヘッダーに追加します。**注**: `bearer_token_path` が設定されていない場合は、`/var/run/secrets/kubernetes.io/serviceaccount/token` がデフォルトのパスとして使われます。                                                       |
| `bearer_token_path`                     | 文字列                                  | オプション  | なし          | Kubernetes サービスアカウントのベアラートークンファイルへのパス（ファイルが存在し正しくマウントされていることを確認してください）。**注**: `bearer_token_auth` を `true` に設定し、認証のために HTTP ヘッダにトークンを追加できるようにします。                                          |
| `collect_counters_with_distributions`   | boolean                                 | オプション  | false         | Datadog のディストリビューションメトリクスとしてヒストグラムバケットを送信する際に、`.sum` と `.count` で終わる観測カウンターメトリクスも収集するかどうかを指定します。これは暗黙のうちに `histogram_buckets_as_distributions` オプションを有効にしています。 |

**注**: `send_distribution_buckets` および `send_distribution_counts_as_monotonic` 以外のすべてのパラメーターは、OpenMetrics チェックと Prometheus チェックの両方でサポートされています。

## はじめに

### シンプルなメトリクスの収集

Prometheus によって公開されたメトリクスの収集を開始するには、次の手順に従います。

1. [Prometheus Getting Started][11] のドキュメントに従って、自分自身を監視する Prometheus のローカルバージョンを起動します。

2. [プラットフォームに Datadog Agent をインストールします][6]。

3. [Agent の構成ディレクトリ][8]のルートにある `conf.d/` フォルダーの `openmetrics.d/conf.yaml` ファイルを次の内容で編集します。

    ```yaml
    init_config:

    instances:
        - openmetrics_endpoint: http://localhost:9090/metrics
          namespace: 'documentation_example'
          metrics:
              - promhttp_metric_handler_requests_total: prometheus.handler.requests.total
    ```

4. [Agent を再起動します][12]。

5. [メトリクスサマリーページ][13]に移動して、収集されたメトリクスを確認します: `prometheus_target_interval_length_seconds*`

    {{< img src="integrations/guide/prometheus_host/prometheus_collected_metric_host.png" alt="収集された Prometheus メトリクス">}}

## カスタムインテグレーションを公式インテグレーションに

デフォルトでは、汎用の Prometheus チェックによって取得されるすべてのメトリクスが、カスタムメトリクスだと見なされます。既製ソフトウェアを監視されて、公式のインテグレーションにするべきだと思われた場合は、[ぜひご提供をお願いします][5]。

公式インテグレーションは、それぞれ専用のディレクトリを持ちます。汎用のチェックには、デフォルトの構成とメトリクスメタデータをハードコードするためのデフォルトのインスタンスメカニズムがあります。たとえば、[kube-proxy][14] インテグレーションを参照します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/openmetrics/
[2]: /ja/integrations/prometheus/
[3]: https://github.com/DataDog/integrations-core/tree/master/openmetrics
[4]: https://github.com/DataDog/integrations-core/tree/master/prometheus
[5]: /ja/developers/custom_checks/prometheus/
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: /ja/getting_started/tagging/
[8]: /ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[9]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[10]: /ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: https://prometheus.io/docs/prometheus/latest/getting_started/
[12]: /ja/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[13]: https://app.datadoghq.com/metric/summary
[14]: https://github.com/DataDog/integrations-core/tree/master/kube_proxy
[15]: /ja/metrics/distributions/