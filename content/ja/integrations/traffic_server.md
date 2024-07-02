---
"app_id": "traffic-server"
"app_uuid": "aaf78f60-10de-453c-b2d8-dc44818720c9"
"assets":
  "dashboards":
    "Traffic Server - Overview": assets/dashboards/overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": traffic_server.node.restarts.proxy.restart_count
      "metadata_path": metadata.csv
      "prefix": traffic_server.
    "process_signatures":
    - traffic_cop
    - traffic_manager
    - traffic_server
    - trafficserver start
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10259"
    "source_type_name": Traffic Server
  "monitors":
    "[Traffic Server] 4xx Errors higher than usual": assets/monitors/4xx.json
    "[Traffic Server] 5xx Errors higher than usual": assets/monitors/5xx.json
  "saved_views":
    "traffic_server_error_logs": assets/saved_views/traffic_server_error_logs.json
    "traffic_server_overview": assets/saved_views/traffic_server_overview.json
    "traffic_server_patterns": assets/saved_views/traffic_server_error_patterns.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- caching
- log collection
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/traffic_server/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "traffic_server"
"integration_id": "traffic-server"
"integration_title": "Traffic Server"
"integration_version": "2.2.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "traffic_server"
"public_title": "Traffic Server"
"short_description": "Monitor connection, cache, and DNS metrics"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Caching"
  - "Category::Log Collection"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Monitor connection, cache, and DNS metrics
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Traffic Server
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、Datadog Agent を通じて [Traffic Server][1] を監視します。

Datadog-Apache Traffic Server インテグレーションを有効にすると、以下のことができます。

- Web サイトやアプリケーションなどのオンラインリソースの可用性とパフォーマンスを確保する。
- Web サイトやアプリケーションへのアクセス数、ボリューム、変化などのメトリクスを追跡する。
- リクエストの平均応答時間およびサイズを決定する。
- システムログ、エラーログを監視する。


## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Traffic Server チェックは [Datadog Agent][3] パッケージに含まれています。

Traffic Server で監視を有効にするには、Traffic Server で [Stats Over HTTP プラグイン][4]を有効にし、`plugin.config` ファイルに次の行を追加して Traffic Server をリロードしてください。

```
stats_over_http.so
```

### 構成

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


### ログ収集

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

### サービスチェック
{{< get-service-checks-from-git "traffic_server" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。


[1]: https://trafficserver.apache.org/
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.trafficserver.apache.org/en/latest/admin-guide/monitoring/statistics/accessing.en.html#stats-over-http
[5]: https://github.com/DataDog/integrations-core/blob/master/traffic_server/datadog_checks/traffic_server/data/conf.yaml.example
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/traffic_server/metadata.csv
[9]: https://docs.trafficserver.apache.org/en/9.1.x/admin-guide/logging/understanding.en.html
[10]: https://docs.datadoghq.com/logs/processing/#integration-pipelines
[11]: https://github.com/DataDog/integrations-core/blob/master/traffic_server/assets/service_checks.json
[12]: https://docs.datadoghq.com/help/

