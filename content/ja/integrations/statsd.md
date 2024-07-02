---
"app_id": "statsd"
"app_uuid": "847f92f2-77e2-4429-844f-50f4d9c8097f"
"assets":
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "statsd.counters.count"
      "metadata_path": "metadata.csv"
      "prefix": "statsd."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "10086"
    "source_type_name": "StatsD"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "log collection"
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/statsd/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "statsd"
"integration_id": "statsd"
"integration_title": "StatsD"
"integration_version": "1.12.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "statsd"
"public_title": "StatsD"
"short_description": "StatsD サーバーの可用性を監視し、メトリクスカウントを追跡。"
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::ログの収集"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "StatsD サーバーの可用性を監視し、メトリクスカウントを追跡。"
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "StatsD"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、Datadog 以外の StatsD サーバーの可用性とアップタイムを監視します。また、StatsD が受け取ったメトリクス数をメトリクスタイプ別に追跡します。

このチェックは、アプリケーションメトリクスを StatsD サーバーから Datadog に**転送しません**。これは、StatsD 自体に関するメトリクスを収集します。

## セットアップ

### インストール

StatsD チェックは [Datadog Agent][1] パッケージに含まれています。StatsD を実行するサーバーに追加でインストールする必要はありません。

### 構成

{{< tabs >}}
{{% tab "ホスト" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには

1. [Agent の構成ディレクトリ][1]のルートにある `conf.d/` フォルダーの `statsd.d/conf.yaml` を編集します。使用可能なすべての構成オプションの詳細については、[サンプル statsd.d/conf.yaml][2] を参照してください。

   ```yaml
   init_config:

   instances:
     - host: localhost
       port: 8126 # or wherever your statsd listens
   ```

2. [Agent を再起動][3]すると、Datadog への StatsD メトリクスおよびサービスチェックの送信が開始されます。

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/statsd/datadog_checks/statsd/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                 |
| -------------------- | ------------------------------------- |
| `<INTEGRATION_NAME>` | `statsd`                              |
| `<INIT_CONFIG>`      | 空白または `{}`                         |
| `<INSTANCE_CONFIG>`  | `{"host": "%%host%%", "port":"8126"}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

#### ログ収集

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` でこれを有効にする必要があります。

   ```yaml
   logs_enabled: true
   ```

2. Supervisord ログの収集を開始するには、次のコンフィギュレーションブロックを `statsd.d/conf.yaml` ファイルに追加します。

   ```yaml
   logs:
     - type: file
       path: /path/to/my/directory/file.log
       source: statsd
   ```

   `path` のパラメーター値を変更し、環境に合わせて構成してください。
   使用可能なすべてのコンフィギュレーションオプションについては、[サンプル statsd.d/conf.yaml][2] を参照してください。

3. [Agent を再起動します][3]。

### 検証

[Agent の status サブコマンド][4]を実行し、Checks セクションで `statsd` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "statsd" >}}


### イベント

StatsD チェックには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "statsd" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [StatsD とは何か、そしてどのように役立つのか][6]
- [Counts Graphing による StatsD メトリクスの可視化][7]



[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://github.com/DataDog/integrations-core/blob/master/statsd/datadog_checks/statsd/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/help/
[6]: https://www.datadoghq.com/blog/statsd
[7]: https://www.datadoghq.com/blog/visualize-statsd-metrics-counts-graphing
