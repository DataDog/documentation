---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs:
    source: squid
  metrics_metadata: metadata.csv
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
  - https://github.com/DataDog/integrations-core/blob/master/squid/README.md
display_name: Squid
draft: false
git_integration_title: squid
guid: e7d4b233-b32a-46f9-8cb2-c582ee8fd251
integration_id: squid
integration_title: Squid
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: squid.
metric_to_check: squid.cachemgr.cpu_time
name: squid
public_title: Datadog-Squid インテグレーション
short_description: Datadog を使用した Squid キャッシュサーバーのメトリクスの追跡
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは、Datadog Agent を通してキャッシュマネージャーから取得された [Squid][1] メトリクスを監視します。

## セットアップ

### インストール

Agent の Squid チェックは [Datadog Agent][2] パッケージに含まれています。Squid サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

##### メトリクスの収集

1. [Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `squid.d/conf.yaml` を編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル squid.d/conf.yaml][2] を参照してください。

2. [Agent を再起動します][3]。

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. `squid.d/conf.yaml` の下部にある、コンフィギュレーションブロックのコメントを解除して編集します。

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

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成します。

3. [Agent を再起動します][3]。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/squid/datadog_checks/squid/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                                                  |
| -------------------- | ---------------------------------------------------------------------- |
| `<インテグレーション名>` | `squid`                                                                |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                                          |
| `<インスタンスコンフィギュレーション>`  | `{"name": "<SQUID_INSTANCE_NAME>", "host": "%%host%%", "port":"3128"}` |

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集のドキュメント][2]を参照してください。

| パラメーター      | 値                                               |
| -------------- | --------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "squid", "service": "<YOUR_APP_NAME>"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/?tab=containerinstallation#setup
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][3]し、Checks セクションで `squid` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "squid" >}}


### イベント

Squid チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "squid" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。



[1]: http://www.squid-cache.org/
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/help/