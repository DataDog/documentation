---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - caching
  - log collection
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/squid/README.md'
display_name: Squid
git_integration_title: Squid
guid: e7d4b233-b32a-46f9-8cb2-c582ee8fd251
integration_id: Squid
integration_title: Squid
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: squid.
metric_to_check: squid.cachemgr.cpu_time
name: Squid
public_title: Datadog-Squid インテグレーション
short_description: Datadog を使用した Squid キャッシュサーバーのメトリクスの追跡
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは、Datadog Agent を通してキャッシュマネージャーから取得された [Squid][9] メトリクスを監視します。

## セットアップ
### インストール

Agent の Squid チェックは [Datadog Agent][2] パッケージに含まれています。Squid サーバーに追加でインストールする必要はありません。

### コンフィグレーション
#### ホスト

ホストで実行されている Agent 用にこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#containerized)セクションを参照してください。

##### メトリクスの収集

1. [Agent の構成ディレクトリ][3]のルートにある `conf.d/` フォルダーの `squid.d/conf.yaml` を編集します。使用可能なすべての構成オプションの詳細については、[サンプル squid.d/conf.yaml][4] を参照してください。

2. [Agent を再起動します][5]。

##### ログの収集

**Agent 6 .0 以上で使用可能**

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
    logs_enabled: true
    ```

2. この構成ブロックを `squid.d/conf.yaml` に追加します。 

    ```yaml
    logs:
          - type: file
            path: /var/log/squid/cache.log
            service: "<SERVICE-NAME>"
            source: squid
          - type: file
            path: /var/log/squid/access.log
            service: "<SERVICE-NAME>"
            source: squid
      ```

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。

3. [Agent を再起動します][5]。

#### コンテナ化
コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                                                  |
|----------------------|------------------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `squid`                                                                |
| `<INIT_CONFIG>`      | 空欄あるいは`{}`                                                          |
| `<INSTANCE_CONFIG>`  | `{"name": "<SQUID_INSTANCE_NAME>", "host": "%%host%%", "port":"3128"}` |

##### ログの収集

**Agent 6.5 以上で使用可能**

Datadog Agent で、ログの収集はデフォルトで無効になっています。これを有効にするには、[Docker log collection][10] を参照してください。

| パラメーター      | 値                                               |
|----------------|-----------------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "squid", "service": "<YOUR_APP_NAME>"}` |

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `squid` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "squid" >}}


### イベント

Squid チェックには、イベントは含まれません。

### サービスのチェック

**squid.can_connect**:<br>
Agent が Squid に接続してメトリクスを収集できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。


[1]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/squid/datadog_checks/squid/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/squid/metadata.csv
[8]: https://docs.datadoghq.com/ja/help
[9]: http://www.squid-cache.org/
[10]: https://docs.datadoghq.com/ja/agent/docker/log/?tab=containerinstallation#setup


{{< get-dependencies >}}