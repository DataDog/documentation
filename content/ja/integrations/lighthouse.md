---
app_id: lighthouse
app_uuid: e61bdb03-995f-4f46-8b14-afd59e35453b
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: lighthouse.performance
      metadata_path: metadata.csv
      prefix: lighthouse.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10199
    source_type_name: Lighthouse
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: コミュニティ
  sales_email: mustin.eric@gmail.com
  support_email: mustin.eric@gmail.com
categories:
- developer tools
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/lighthouse/README.md
display_on_public_website: true
draft: false
git_integration_title: lighthouse
integration_id: lighthouse
integration_title: Lighthouse
integration_version: 2.2.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: lighthouse
public_title: Lighthouse
short_description: Google Lighthouse 監査統計
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Developer Tools
  - Supported OS::Linux
  configuration: README.md#Setup
  description: Google Lighthouse 監査統計
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Lighthouse
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[Google Chrome Lighthouse][1] からリアルタイムにメトリクスを取得して、

- Lighthouse 統計を視覚化および監視できます。
- Web サイトのアクセシビリティ、ベストプラクティス、パフォーマンス、PWA、および SEO 監査スコアを追跡および監査できます。

## 計画と使用

Lighthouse チェックは [Datadog Agent][2] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インフラストラクチャーリスト

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い Lighthouse チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][3]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-lighthouse==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][4]と同様にインテグレーションを構成します。

### ブラウザトラブルシューティング

1. Lighthouse の[メトリクス](#metrics)の収集を開始するには、[Agent のコンフィギュレーションディレクトリ][5]のルートにある `conf.d/` フォルダーの `lighthouse.d/conf.yaml` ファイルを編集します。
   使用可能なすべてのコンフィギュレーションオプションについては、[lighthouse.d/conf.yaml のサンプル][6]を参照してください。

2. [Agent を再起動します][7]。

### 要件

1. Node.js LTS (8.9 以降)。
   - Node.js と npm がインストールされているかどうかを確認します。

   ```shell
   node -v
   npm -v
   ```

   - インストールされていない場合は、[Node.js と npm をインストールします][8]。

2. [Lighthouse][9]:
   - インストールされているかどうかを確認します。

   ```shell
   # example
   root@hostname:~# npm list -g --depth=0 | grep 'lighthouse'
   |_ lighthouse@5.6.0
   ```

   - インストールされていない (上記のコマンドからの出力なし) 場合はインストールします。
   ```shell
   npm install -g lighthouse
   ```


3. Google Chrome/Chromium または Puppeteer。

   - [Chromium][10]
      + Debian/Ubuntu

      ```shell
      sudo apt-get update
      sudo apt-get install -y chromium-browser
      ```

      + RHEL/CentOS

      ```shell
      sudo yum install -y epel-release
      sudo yum install -y chromium
      ```

      **注**: このインテグレーションでは、Chrome/Chromium がヘッドレスモードで実行されます。Chrome/Chromium では、ヘッドレスモードが適切に機能するために、RHEL/CentOS でカーネル 4.4 以降が必要になる場合があります。

   - [Puppeteer][11]
      + インストールされているかどうかを確認します。

      ```shell
      # example
      root@hostname:~# npm list -g --depth=0 | grep 'puppeteer'
      |_ puppeteer@1.12.2
      ```

      + インストールされていない (上記のコマンドからの出力なし) 場合はインストールします。

      ```shell
      npm install -g puppeteer --unsafe-perm=true
      ```

4. `dd-agent` ユーザーが lighthouse cli を実行できるかどうかを確認します。

   ```shell
   sudo -u dd-agent lighthouse <WEB_URL> --output json --quiet --chrome-flags='--headless'
   ```

### 検証

[Agent の status サブコマンドを実行][12]し、Checks セクションで `lighthouse` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "lighthouse" >}}


### ヘルプ

Lighthouse インテグレーションには、イベントは含まれません。

### ヘルプ

Lighthouse インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][14]までお問合せください。

[1]: https://developers.google.com/web/tools/lighthouse
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/lighthouse/datadog_checks/lighthouse/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://nodejs.org/en/download
[9]: https://github.com/GoogleChrome/lighthouse
[10]: https://www.chromium.org/
[11]: https://github.com/GoogleChrome/puppeteer
[12]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[13]: https://github.com/DataDog/integrations-extras/blob/master/lighthouse/datadog_checks/lighthouse/metadata.csv
[14]: https://docs.datadoghq.com/ja/help/