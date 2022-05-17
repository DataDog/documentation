---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- web
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/lighthouse/README.md
display_name: Lighthouse
draft: false
git_integration_title: lighthouse
guid: 4e66e6d6-bcb0-4250-b950-95ef11176494
integration_id: lighthouse
integration_title: Lighthouse
integration_version: 2.1.0
is_public: true
kind: インテグレーション
maintainer: mustin.eric@gmail.com
manifest_version: 1.0.0
metric_prefix: lighthouse.
metric_to_check: lighthouse.performance
name: lighthouse
public_title: Datadog-Lighthouse インテグレーション
short_description: Google Lighthouse 監査統計
support: contrib
supported_os:
- linux
---



## 概要

[Google Chrome Lighthouse][1] からリアルタイムにメトリクスを取得して、

- Lighthouse 統計を視覚化および監視できます。
- Web サイトのアクセシビリティ、ベストプラクティス、パフォーマンス、PWA、および SEO 監査スコアを追跡および監査できます。

## セットアップ

Lighthouse チェックは [Datadog Agent][2] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インストール

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い Lighthouse チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][3]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-lighthouse==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][4]と同様にインテグレーションを構成します。

### コンフィギュレーション

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

## 収集データ

### メトリクス
{{< get-metrics-from-git "lighthouse" >}}


### イベント

Lighthouse インテグレーションには、イベントは含まれません。

### サービスのチェック

Lighthouse インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][14]までお問合せください。

[1]: https://developers.google.com/web/tools/lighthouse
[2]: https://app.datadoghq.com/account/settings#agent
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