---
app_id: octoprint
app_uuid: f076efc3-c1c7-4e0a-b0dc-92870d655211
assets:
  dashboards:
    OctoPrint Overview: assets/dashboards/octoprint_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: octoprint.printer_state
      metadata_path: metadata.csv
      prefix: octoprint.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10201
    source_type_name: OctoPrint
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: コミュニティ
  sales_email: gwaldo@gmail.com
  support_email: gwaldo@gmail.com
categories:
- developer tools
- ログの収集
- orchestration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/octoprint/README.md
display_on_public_website: true
draft: false
git_integration_title: octoprint
integration_id: octoprint
integration_title: Datadog OctoPrint
integration_version: 1.0.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: octoprint
public_title: Datadog OctoPrint
short_description: 3D プリンターを管理する Web インターフェイス、OctoPrint を監視
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Developer Tools
  - Category::Log Collection
  - Category::Orchestration
  - Supported OS::Linux
  configuration: README.md#Setup
  description: 3D プリンターを管理する Web インターフェイス、OctoPrint を監視
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Datadog OctoPrint
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

このチェックは、Datadog Agent を通じて [OctoPrint][1] を監視します。

## 計画と使用

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インフラストラクチャーリスト

以下を実行して OctoPrint チェックをホストにインストールするには

```shell
sudo -u dd-agent -- datadog-agent integration install datadog-octoprint==<VERSION>
```

**注**: このページの一番上に `VERSION` が記載されています。

#### ソースからインストール (オプション)

1. マシンに[開発ツールキット][3]をインストールします。

2. `ddev release build octoprint` を実行してパッケージをビルドします。

3. [Datadog Agent をダウンロードします][4]。

4. ビルドの成果物を Agent をインストール済みのホストにアップロードし、以下を実行します。
 `datadog-agent integration install -w
 path/to/octoprint/dist/datadog_octoprint*.whl`.

### ブラウザトラブルシューティング

1. OctoPrint の Web インターフェースから、Datadog で使用する API キーを作成します。作成したキーは Settings --> Application Keys に表示されます。

2. Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `octoprint.d/conf.yaml` ファイルを編集します。OctoPrint API キーを `octo_api_key` の値として貼り付けます。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル octoprint.d/conf.yaml][5]を参照してください。

3. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `octoprint` を探します。

### ワークフローの自動化

デフォルトでは、このインテグレーションは、Raspberry Pi から OctoPrint  を実行するように予め構成された [OctoPi][8] イメージを使うことを想定しています。

デフォルトでで収集するログ（およびデフォルトの場所）は、次のとおりです。

- OctoPrint アプリログ: `/home/pi/.octoprint/logs`
- OctoPrint Webcam ログ: `/var/log/webcamd.log`
- HA プロキシログ: `/var/log/haproxy.log`

これらの一部またはすべてを変更したり削除したりするには、インテグレーションの `conf.yaml` ファイルを変更します。

#### ログ処理

OctoPrint は独自のログ形式（オブジェクト形式ではない）を使用します。ログを活用するにはパース規則を使用してログ処理パイプラインを作成します。たとえば、

1. メインパイプライン: "OctoPrint"
    1. サブパイプライン 1: "OctoPrint 印刷ジョブ"
        1. Grok パーサー規則:
            - `OctoPrint_Print_Job %{date("yyyy-MM-dd HH:mm:ss,SSS"):date}\s+-\s+%{notSpace:source}\s+-\s+%{word:level}\s+-\s+Print\s+job\s+%{notSpace:job_status}\s+-\s+%{data::keyvalue(":"," ,")}`
    1. サブパイプライン 2: "一般的な OctoPrint ログ"
        1. Grok パーサー規則:
            - `General_OctoPrint_Log %{date("yyyy-MM-dd HH:mm:ss,SSS"):date}\s+-\s+%{notSpace:source}\s+-\s+%{word:level}\s+-\s+%{data:message}`

詳細については、[Datadog ログ処理ドキュメント][9]を参照してください。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "octoprint" >}}


### ヘルプ

OctoPrint には、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "octoprint" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。


[1]: https://octoprint.org/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/ja/developers/integrations/python/
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://github.com/DataDog/integrations-extras/blob/master/octoprint/datadog_checks/octoprint/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://octoprint.org/download/
[9]: https://docs.datadoghq.com/ja/logs/processing/
[10]: https://github.com/DataDog/integrations-extras/blob/master/octoprint/metadata.csv
[11]: https://github.com/DataDog/integrations-extras/blob/master/octoprint/assets/service_checks.json
[12]: https://docs.datadoghq.com/ja/help/