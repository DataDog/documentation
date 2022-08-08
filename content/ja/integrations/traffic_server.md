---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Traffic Server - Overview: assets/dashboards/overview.json
  logs:
    source: traffic_server
  metrics_metadata: metadata.csv
  monitors:
    '[Traffic Server] 4xx Errors higher than usual': assets/monitors/4xx.json
    '[Traffic Server] 5xx Errors higher than usual': assets/monitors/5xx.json
  saved_views:
    traffic_server_error_logs: assets/saved_views/traffic_server_error_logs.json
    traffic_server_overview: assets/saved_views/traffic_server_overview.json
    traffic_server_patterns: assets/saved_views/traffic_server_error_patterns.json
  service_checks: assets/service_checks.json
categories:
- web
- キャッシュ
- ログの収集
creates_events: false
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/traffic_server/README.md
display_name: Traffic Server
draft: false
git_integration_title: traffic_server
guid: c3fa3678-1166-4973-b340-b9120561e67b
integration_id: traffic-server
integration_title: Traffic Server
integration_version: 1.0.2
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: traffic_server.
metric_to_check: traffic_server.node.restarts.proxy.restart_count
name: traffic_server
process_signatures:
- traffic_cop
- traffic_manager
- traffic_server
- trafficserver start
public_title: Traffic Server
short_description: 接続、キャッシュ、DNS のメトリクスの監視
support: コア
supported_os:
- linux
- mac_os
- windows
---



## 概要

このチェックは、Datadog Agent を通じて [Traffic Server][1] を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Traffic Server チェックは [Datadog Agent][3] パッケージに含まれています。

Traffic Server で監視を有効にするには、Traffic Server で [Stats Over HTTP プラグイン][4]を有効にし、`plugin.config` ファイルに次の行を追加して Traffic Server をリロードしてください。

```
stats_over_http.so
```

### コンフィギュレーション

1. Traffic Server のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `traffic_server.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル sample traffic_server.d/conf.yaml][5] を参照してください。

**注**: デフォルトの[コンフィギュレーションファイル][5]を使用する場合、デフォルトではすべてのメトリクスが収集されるわけではありません。

利用可能なすべてのメトリクスを収集するために `metric_patterns` オプションをコメントアウトするか、別のサブセットのメトリクスを収集するために編集してください。

```
    ## @param metric_patterns - mapping - optional
    ## 包含または除外するメトリクスのマッピングで、各エントリーは正規表現です。
    ##
    ## `exclude` で定義されたメトリクスは、オーバーラップした場合に優先されます。
    ## このオプションをコメントアウトすると、利用可能なすべてのメトリクスを収集することができます。
    #
    metric_patterns:
      include:
         - <METRIC_1>
         - <METRIC_2>
```

2. [Agent を再起動します][6]。

### 検証

[Agent の `status` サブコマンドを実行][7]し、Checks セクションで `traffic_server` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "traffic_server" >}}


### ログの収集

_Agent バージョン 6.0 以降で利用可能_

1. Traffic Server のログは高度に[カスタマイズ可能][9]ですが、Datadog のインテグレーションパイプラインは、デフォルトの変換パターンをサポートしています。異なるフォーマットがある場合は、[インテグレーションパイプライン][10]を複製して編集してください。

2. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

3. `traffic_server.d/conf.yaml` ファイルのコメントを解除して、ログコンフィギュレーションブロックを編集します。環境に基づいて、`path` パラメーターと `service` パラメーターの値を変更してください。使用可能なすべてのコンフィギュレーションオプションの詳細については、[traffic_server.d/conf.yaml のサンプル][5]を参照してください。

   ```yaml
   logs:
      - type: file
        path: /opt/trafficserver/var/log/trafficserver/traffic.out
        source: traffic_server
      - type: file
        path: /opt/trafficserver/var/log/trafficserver/diags.log
        source: traffic_server
      - type: file
        path: /opt/trafficserver/var/log/trafficserver/error.log
        source: traffic_server
   ```

### イベント

Traffic Server インテグレーションには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "traffic_server" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。


[1]: https://trafficserver.apache.org/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.trafficserver.apache.org/en/latest/admin-guide/monitoring/statistics/accessing.en.html#stats-over-http
[5]: https://github.com/DataDog/integrations-core/blob/master/traffic_server/datadog_checks/traffic_server/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/traffic_server/metadata.csv
[9]: https://docs.trafficserver.apache.org/en/9.1.x/admin-guide/logging/understanding.en.html
[10]: https://docs.datadoghq.com/ja/logs/processing/#integration-pipelines
[11]: https://github.com/DataDog/integrations-core/blob/master/traffic_server/assets/service_checks.json
[12]: https://docs.datadoghq.com/ja/help/