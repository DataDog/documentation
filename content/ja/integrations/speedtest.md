---
app_id: speedtest
app_uuid: 550862f8-f1d1-4924-b802-185b865e09a4
assets:
  dashboards:
    Speedtest: assets/dashboards/speedtest.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: speedtest.download.bandwidth
      metadata_path: metadata.csv
      prefix: speedtest.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10119
    source_type_name: speedtest
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: コミュニティ
  sales_email: cody.lee@datadoghq.com
  support_email: cody.lee@datadoghq.com
categories:
- developer tools
- ネットワーク
- テスト
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/speedtest/README.md
display_on_public_website: true
draft: false
git_integration_title: speedtest
integration_id: speedtest
integration_title: speedtest
integration_version: 1.0.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: speedtest
public_title: speedtest
short_description: speedtest-cli を使用して Speedtest の結果を実行します
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Developer Tools
  - Category::Network
  - Category::Testing
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: speedtest-cli を使用して Speedtest の結果を実行します
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: speedtest
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

このチェックは、Datadog Agent を通じて [Speedtest][1] を監視します。

## 計画と使用

Speedtest チェックは [Datadog Agent][2] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インフラストラクチャーリスト

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い Speedtest チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][3]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-speedtest==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][4]と同様にインテグレーションを構成します。

**注**: すべてのホストについて、[Speedtest CLI][1] をインストールし、使用前に Datadog Agent ユーザー (例: `sudo -u dd-agent speedtest`) として契約に同意する必要があります。

### ブラウザトラブルシューティング

1. Speedtest のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `speedtest.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[speedtest.d/conf.yaml のサンプル][5]を参照してください。

2. [Agent を再起動します][6]。

### 検証

[Agent の statusサブコマンド][7]を実行し、Checks セクションで `speedtest` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "speedtest" >}}


### ヘルプ

Speedtest チェックには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "speedtest" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。


[1]: https://www.speedtest.net/apps/cli
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/speedtest/datadog_checks/speedtest/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/speedtest/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/speedtest/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/