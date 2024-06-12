---
app_id: ignite
app_uuid: 0e1f1ef2-ea62-4ae4-a99f-8c40171b729c
assets:
  dashboards:
    Ignite Overview: assets/dashboards/ignite_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ignite.received_messages
      metadata_path: metadata.csv
      prefix: ignite.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10100
    source_type_name: Ignite
  logs:
    source: ignite
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- キャッシュ
- data stores
- ログの収集
- ネットワーク
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ignite/README.md
display_on_public_website: true
draft: false
git_integration_title: ignite
integration_id: ignite
integration_title: ignite
integration_version: 2.4.0
is_public: true
manifest_version: 2.0.0
name: ignite
public_title: ignite
short_description: Ignite サーバーからメトリクスを収集します。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::Data Stores
  - Category::Log Collection
  - Category::Network
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Ignite サーバーからメトリクスを収集します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: ignite
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは [Ignite][1] を監視します。

## 計画と使用

### インフラストラクチャーリスト

Ignite チェックは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### ブラウザトラブルシューティング

#### Ignite のセットアップ

JMX メトリクスエクスポーターはデフォルトで有効になっていますが、ネットワークセキュリティに応じて、公開ポートを選択するか、認証を有効にする必要がある場合があります。公式の Docker イメージはデフォルトで `49112` を使用します。

ロギングについては、[log4j][3] を有効にして、完全な日付のログ形式を利用することを強くお勧めします。

{{< tabs >}}
{{% tab "ホスト" %}}

#### メトリクスベース SLO

ホストで実行中の Agent に対してこのチェックを構成するには

1. ignite のパフォーマンスデータを収集するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `ignite.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル ignite.d/conf.yaml][1] を参照してください。

   このチェックでは、インスタンスあたりのメトリクス数が 350 に制限されています。返されたメトリクスの数は、[ステータスページ][2]に表示されます。
   以下で説明する構成を編集することで、関心があるメトリクスを指定できます。
   収集するメトリクスをカスタマイズする方法については、[JMX チェックのドキュメント][3]で詳細を確認してください。
   制限以上のメトリクスを監視する必要がある場合は、[Datadog のサポートチーム][4]までお問い合わせください。

2. [Agent を再起動します][5]。

##### 収集データ

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` でこれを有効にする必要があります。

   ```yaml
   logs_enabled: true
   ```

2. Ignite のログの収集を開始するには、次のコンフィギュレーションブロックを `ignite.d/conf.yaml` ファイルに追加します。

   ```yaml
     logs:
       - type: file
         path: <IGNITE_HOME>/work/log/ignite-*.log
         source: ignite
         service: '<SERVICE_NAME>'
         log_processing_rules:
           - type: multi_line
             name: new_log_start_with_date
             pattern: \[\d{4}\-\d{2}\-\d{2}
   ```

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル ignite.d/conf.yaml][1] を参照してください。

3. [Agent を再起動します][5]。

[1]: https://github.com/DataDog/integrations-core/blob/master/ignite/datadog_checks/ignite/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/ja/integrations/java/
[4]: https://docs.datadoghq.com/ja/help/
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

Datadog-Ignite インテグレーションを使用してメトリクスを収集するには、[JMX を使用したオートディスカバリー][2]ガイドを参照してください。

##### 収集データ

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Docker ログ収集][3]を参照してください。

| パラメーター      | 値                                                                                                                                                             |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "ignite", "service": "<サービス名>", "log_processing_rules":{"type":"multi_line","name":"new_log_start_with_date", "pattern":"\d{4}\-\d{2}\-\d{2}"}}` |

[1]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations/
[2]: https://docs.datadoghq.com/ja/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[3]: https://docs.datadoghq.com/ja/agent/docker/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の `status` サブコマンドを実行][4]し、Checks セクションで `ignite` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "ignite" >}}


### ヘルプ

Ignite インテグレーションには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "ignite" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。



[1]: https://ignite.apache.org/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://apacheignite.readme.io/docs/logging#section-log4j
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[5]: https://github.com/DataDog/integrations-core/blob/master/ignite/datadog_checks/ignite/data/conf.yaml.example