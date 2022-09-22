---
app_id: harbor
app_uuid: a4aae6fb-1865-42d0-be03-78e98b7e4b22
assets:
  dashboards:
    Harbor Overview: assets/dashboards/overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: harbor.projects.count
      metadata_path: metadata.csv
      prefix: harbor.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Harbor
  logs:
    source: harbor
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- コンテナ
- ログの収集
- オートディスカバリー
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/harbor/README.md
display_on_public_website: true
draft: false
git_integration_title: harbor
integration_id: harbor
integration_title: Harbor
integration_version: 2.1.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: harbor
oauth: {}
public_title: Harbor
short_description: Harbor コンテナレジストリの健全性を監視
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Containers
  - Category::Log Collection
  - Category::Autodiscovery
  configuration: README.md#Setup
  description: Harbor コンテナレジストリの健全性を監視
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Harbor
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

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][2]を参照してください。

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