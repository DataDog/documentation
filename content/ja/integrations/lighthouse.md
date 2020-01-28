---
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - web
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/lighthouse/README.md'
display_name: Lighthouse
git_integration_title: lighthouse
guid: 4e66e6d6-bcb0-4250-b950-95ef11176494
integration_id: lighthouse
integration_title: Lighthouse
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
* Lighthouse 統計を視覚化および監視できます。
* また、Web サイトのアクセシビリティ、ベストプラクティス、パフォーマンス、PWA、および SEO 監査スコアを追跡および監査できます。

## セットアップ

Lighthouse チェックは [Datadog Agent][2] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インストール

Agent v6.8 以降を使用している場合は、以下の手順に従って、ホストに Google Chrome Lighthouse チェックをインストールしてください。[バージョン 6.8 以前の Agent][4] または [Docker Agent][5] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][3]に関する Agent のガイドを参照してください。

1. [開発ツールキット][6]をインストールします。
2. integrations-extras リポジトリを複製します。

    ```
    git clone https://github.com/DataDog/integrations-extras.git.
    ```

3. `ddev` 構成を `integrations-extras/` パスで更新します。

    ```
    ddev config set extras ./integrations-extras
    ```

4. `lighthouse` パッケージをビルドします。

    ```
    ddev -e release build lighthouse
    ```

5. [Datadog Agent をダウンロードして起動][7]します。
6. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

    ```
    datadog-agent integration install -w <PATH_OF_LIGHTHOUSE_ARTIFACT_>/<LIGHTHOUSE_ARTIFACT_NAME>.whl
    ```

7. [他のパッケージ化されたインテグレーション][8]と同様にインテグレーションを構成します。

### コンフィグレーション

1. Lighthouse の[メトリクス](#metrics)の収集を開始するには、[Agent の構成ディレクトリ][9]のルートにある `conf.d/` フォルダーの `lighthouse.d/conf.yaml` ファイルを編集します。
  使用可能なすべての構成オプションの詳細については、[サンプル lighthouse.d/conf.yaml][10] を参照してください。

2. [Agent を再起動します][11]。

### 要件

1. Lighthouse には Node 8 LTS (8.9) 以降が必要です。Node と npm がインストールされていることを確認します。

    ```
    node -v
    npm -v
    ```

    インストールされていない場合は、[Node と npm をインストールします][12]。

2. [Lighthouse をインストールします][13]。

    ```
    npm install -g lighthouse
    ```

3. Google Chrome または Puppeteer (カスタム Agent チェックが Chrome をヘッドレスモードで実行) がインストールされていることを確認します。

    ```
    # example
    vagrant@web2:~$ npm list -g --depth=0 | grep 'puppeteer'
    └── puppeteer@1.12.2
    ```

    インストールされていない場合は、Chrome または [Puppeteer][14] をインストールします。

    ```
    npm install -g puppeteer
    ```

### 検証

[Agent の status サブコマンドを実行][15]し、Checks セクションで `lighthouse` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "lighthouse" >}}


### イベント
Lighthouse インテグレーションには、イベントは含まれません。

### サービスのチェック
Lighthouse インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][17]までお問合せください。

[1]: https://developers.google.com/web/tools/lighthouse
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent
[4]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[5]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[6]: https://docs.datadoghq.com/ja/developers/integrations/new_check_howto/#developer-toolkit
[7]: https://app.datadoghq.com/account/settings#agent
[8]: https://docs.datadoghq.com/ja/getting_started/integrations
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[10]: https://github.com/DataDog/integrations-extras/blob/master/lighthouse/datadog_checks/lighthouse/data/conf.yaml.example
[11]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[12]: https://nodejs.org/en/download
[13]: https://github.com/GoogleChrome/lighthouse
[14]: https://github.com/GoogleChrome/puppeteer
[15]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[16]: https://github.com/DataDog/integrations-extras/blob/master/lighthouse/datadog_checks/lighthouse/metadata.csv
[17]: https://docs.datadoghq.com/ja/help