---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Ignite Overview: assets/dashboards/ignite_overview.json
  logs:
    source: ignite
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - キャッシュ
  - data store
  - ログの収集
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/ignite/README.md'
display_name: Ignite
draft: false
git_integration_title: ignite
guid: fd5a21d5-ddfe-4d04-855f-28492b4d270e
integration_id: ignite
integration_title: ignite
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: ignite.
metric_to_check: ignite.received_messages
name: ignite
public_title: Datadog-ignite インテグレーション
short_description: Ignite サーバーからメトリクスを収集します。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは [Ignite][1] を監視します。

## セットアップ

### インストール

Ignite チェックは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

#### Ignite のセットアップ

JMX メトリクスエクスポーターはデフォルトで有効になっていますが、ネットワークセキュリティに応じて、公開ポートを選択するか、認証を有効にする必要がある場合があります。公式の Docker イメージはデフォルトで `49112` を使用します。

ロギングについては、[log4j][3] を有効にして、完全な日付のログ形式を利用することを強くお勧めします。

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

1. ignite のパフォーマンスデータを収集するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `ignite.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル ignite.d/conf.yaml][1] を参照してください。

   このチェックでは、インスタンスあたりのメトリクス数が 350 に制限されています。返されたメトリクスの数は、情報ページに表示されます。
   以下で説明する構成を編集することで、関心があるメトリクスを指定できます。
   収集するメトリクスをカスタマイズする方法については、[JMX チェックのドキュメント][2]で詳細な手順を参照してください。
    制限以上のメトリクスを監視する必要がある場合は、[Datadog のサポートチーム][3]までお問い合わせください。

2. [Agent を再起動します][4]。

##### ログの収集

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

3. [Agent を再起動します][4]。

[1]: https://github.com/DataDog/integrations-core/blob/master/ignite/datadog_checks/ignite/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ja/integrations/java/
[3]: https://docs.datadoghq.com/ja/help/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

Datadog-Ignite インテグレーションを使用してメトリクスを収集するには、[JMX を使用したオートディスカバリー][2]ガイドを参照してください。

##### ログの収集

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

## 収集データ

### メトリクス
{{< get-metrics-from-git "ignite" >}}


### イベント

Ignite インテグレーションには、イベントは含まれません。

### サービスのチェック

このインテグレーションによって提供されるサービスチェックのリストについては、[service_checks.json][5] を参照してください。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。



[1]: https://ignite.apache.org/
[2]: https://docs.datadoghq.com/ja/agent/
[3]: https://apacheignite.readme.io/docs/logging#section-log4j
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[5]: https://github.com/DataDog/integrations-core/blob/master/ignite/assets/service_checks.json
[6]: https://github.com/DataDog/integrations-core/blob/master/ignite/datadog_checks/ignite/data/conf.yaml.example