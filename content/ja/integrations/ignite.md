---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Ignite Overview: assets/dashboards/ignite_overview.json
  logs:
    source: ignite
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

#### ホスト

1. ignite のパフォーマンスデータを収集するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `ignite.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル ignite.d/conf.yaml][4] を参照してください。

   このチェックでは、インスタンスあたりのメトリクス数が 350 に制限されています。返されたメトリクスの数は、情報ページに表示されます。
   以下で説明する構成を編集することで、関心があるメトリクスを指定できます。
    収集するメトリクスをカスタマイズする方法については、[JMX チェックのドキュメント][5]で詳細な手順を参照してください。
    制限以上のメトリクスを監視する必要がある場合は、[Datadog のサポートチーム][6]までお問い合わせください。

2. [Agent を再起動します][7]。

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

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル ignite.d/conf.yaml][4] を参照してください。

3. [Agent を再起動します][7]。

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][8]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

Datadog-Ignite インテグレーションを使用してメトリクスを収集するには、[JMX を使用したオートディスカバリー][9]ガイドを参照してください。

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。これを有効にするには、[Docker log collection][10] を参照してください。

| パラメーター      | 値                                                                                                                                                             |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "ignite", "service": "<サービス名>", "log_processing_rules":{"type":"multi_line","name":"new_log_start_with_date", "pattern":"\d{4}\-\d{2}\-\d{2}"}}` |


### 検証

[Agent の `status` サブコマンドを実行][11]し、Checks セクションで `ignite` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "ignite" >}}


### サービスのチェック

**ignite.can_connect**:<br>
Agent が監視対象の Ignite インスタンスに接続できず、メトリクスを収集できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

### イベント

Ignite インテグレーションには、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。


[1]: https://ignite.apache.org/
[2]: https://docs.datadoghq.com/ja/agent/
[3]: https://apacheignite.readme.io/docs/logging#section-log4j
[4]: https://github.com/DataDog/integrations-core/blob/master/ignite/datadog_checks/ignite/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/integrations/java/
[6]: https://docs.datadoghq.com/ja/help/
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations/
[9]: https://docs.datadoghq.com/ja/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[10]: https://docs.datadoghq.com/ja/agent/docker/log/
[11]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/DataDog/integrations-core/blob/master/ignite/metadata.csv