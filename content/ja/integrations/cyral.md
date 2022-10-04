---
app_id: cyral
app_uuid: da6e2ea6-1611-4d37-9cc6-efce73bc4f31
assets:
  dashboards:
    Cyral Overview: assets/dashboards/cyral_overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cyral.analysis_time
      metadata_path: metadata.csv
      prefix: cyral.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Cyral
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 不明
  sales_email: product@cyral.com
  support_email: product@cyral.com
categories:
- モニタリング
- security
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/cyral/README.md
display_on_public_website: true
draft: false
git_integration_title: cyral
integration_id: cyral
integration_title: Cyral
integration_version: 0.0.1
is_public: true
kind: integration
manifest_version: 2.0.0
name: cyral
oauth: {}
public_title: Cyral
short_description: Cyral インスタンスモニタリング MySQL からランタイムメトリクスを収集。
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Category::Monitoring
  - Category::Security
  configuration: README.md#Setup
  description: Cyral インスタンスモニタリング MySQL からランタイムメトリクスを収集。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Cyral
---



## 概要

このチェックは、Datadog Agent を通じて [Cyral][1] MySQL サイドカーを監視します。

## セットアップ

Cyral チェックは [Datadog Agent][2] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インストール

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い Cyral チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][3]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-cyral==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][4]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. cyral のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `cyral.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル cyral.d/conf.yaml][5] を参照してください。

    ```yaml
    init_config:

    instances:
     # url of the metrics endpoint of prometheus
     - prometheus_url: http://localhost:9018/metrics
    ```

2. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `cyral` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "cyral" >}}


### サービスのチェック

Cyral には、サービスのチェック機能は含まれません。

### イベント

Cyral には、イベントは含まれません。

## トラブルシューティング

### Agent が接続できない

```text
    cyral
    -------
      - instance #0 [ERROR]: "('Connection aborted.', error(111, 'Connection refused'))"
      - Collected 0 metrics, 0 events & 0 service check
```

`cyral.yaml` 内の `url` が正しいかどうかを確認してください。

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

[1]: https://cyral.com/
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/cyral/datadog_checks/cyral/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/cyral/metadata.csv
[9]: https://docs.datadoghq.com/ja/help/