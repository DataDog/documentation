---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Harbor Overview: assets/dashboards/overview.json
  logs:
    source: harbor
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - コンテナ
  - ログの収集
  - オートディスカバリー
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-core/blob/master/harbor/README.md
display_name: Harbor
draft: false
git_integration_title: harbor
guid: 8fcaa5d7-a121-45ea-bde2-f12d55bc6286
integration_id: harbor
integration_title: Harbor
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: harbor.
metric_to_check: harbor.projects.count
name: harbor
public_title: Datadog-Harbor インテグレーション
short_description: Harbor コンテナレジストリの健全性を監視
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは、Datadog Agent を通じて [Harbor][1] を監視します。

## セットアップ

### インストール

Harbor チェックは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

##### メトリクスの収集

1. Harbor のパフォーマンスデータを収集するには、[Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `harbor.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル harbor.d/conf.yaml][2] を参照してください。

    **注**: コンフィギュレーションではいずれのタイプのユーザーも指定できますが、ディスクメトリクスを取得するには、管理者アクセス許可を持つアカウントが必要です。メトリクス `harbor.projects.count` には、指定したユーザーがアクセスできるプロジェクトの数だけが反映されます。

2. [Agent を再起動します][3]。

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` でこれを有効にする必要があります。

   ```yaml
   logs_enabled: true
   ```

2. Harbor のログの収集を開始するには、次の構成ブロックを `harbor.d/conf.yaml` ファイルに追加します。

   ```yaml
     logs:
       - type: file
         path: /var/log/harbor/*.log
         source: harbor
         service: '<SERVICE_NAME>'
   ```

3. [Agent を再起動します][3]。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/
[2]: https://github.com/DataDog/integrations-core/blob/master/harbor/datadog_checks/harbor/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------- |
| `<インテグレーション名>` | `harbor`                                                                              |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                                                         |
| `<インスタンスコンフィギュレーション>`  | `{"url": "https://%%host%%", "username": "<ユーザー_ID>", "password": "<ユーザーパスワード>"}` |

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集のドキュメント][2]を参照してください。

| パラメーター      | 値                                               |
| -------------- | --------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "harbor", "service": "<サービス名>"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][3]し、Checks セクションで `harbor` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "harbor" >}}


### イベント

Harbor インテグレーションには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "harbor" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。



[1]: https://goharbor.io
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/help/