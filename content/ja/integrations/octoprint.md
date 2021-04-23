---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    OctoPrint Overview: assets/dashboards/octoprint_overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - orchestration
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/octoprint/README.md'
display_name: OctoPrint
draft: false
git_integration_title: octoprint
guid: 77844a89-7202-4f8b-a0fb-642904eb9513
integration_id: octoprint
integration_title: Datadog OctoPrint
is_public: true
kind: integration
maintainer: gwaldo@gmail.com
manifest_version: 1.0.0
metric_prefix: octoprint.
metric_to_check: octoprint.printer_state
name: octoprint
public_title: Datadog OctoPrint インテグレーション
short_description: 3D プリンターを管理する Web インターフェイス、OctoPrint を監視
support: contrib
supported_os:
  - linux
---
## 概要

このチェックは、Datadog Agent を通じて [OctoPrint][1] を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

OctoPrint チェックをホストにインストールするには


1. マシンに[開発ツールキット][3]をインストールします。

2. `ddev release build octoprint` を実行してパッケージをビルドします。

3. [Datadog Agent をダウンロードします][4]。

4. ビルドの成果物を Agent をインストール済みのホストにアップロードし、以下を実行します。
 `datadog-agent integration install -w
 path/to/octoprint/dist/datadog_octoprint*.whl`.

### コンフィギュレーション

1. OctoPrint パフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `octoprint.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル octoprint.d/conf.yaml][5]を参照してください。

2. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `octoprint` を探します。

### ログ

デフォルトでは、このインテグレーションは、Raspberry Pi から OctoPrint  を実行するように予め構成された [OctoPi][8] イメージを使うことを想定しています。

デフォルトでで収集するログ（およびデフォルトの場所）は、次のとおりです。

- OctoPrint アプリログ: `/home/pi/.octoprint/logs`
- OctoPrint Webcam ログ: `/var/log/webcamd.log`
- HA プロキシログ: `/var/log/haproxy.log`

これらの一部またはすべてを変更したり削除したりするには、インテグレーションの `conf.yaml` ファイルを変更します。

#### ログの処理

OctoPrint は独自のログ形式（オブジェクト形式ではない）を使用するため、ログを活用するにはパース規則を使用してログ処理パイプラインを作成する必要があります。たとえば、

1. メインパイプライン: "OctoPrint"
    1. サブパイプライン 1: "OctoPrint 印刷ジョブ"
        1. Grok パーサー規則:
            - `OctoPrint_Print_Job %{date("yyyy-MM-dd HH:mm:ss,SSS"):date}\s+-\s+%{notSpace:source}\s+-\s+%{word:level}\s+-\s+Print\s+job\s+%{notSpace:job_status}\s+-\s+%{data::keyvalue(":"," ,")}`
    1. サブパイプライン 2: "一般的な OctoPrint ログ"
        1. Grok パーサー規則:
            - `General_OctoPrint_Log %{date("yyyy-MM-dd HH:mm:ss,SSS"):date}\s+-\s+%{notSpace:source}\s+-\s+%{word:level}\s+-\s+%{data:message}`

詳細については、[Datadog ログ処理ドキュメント][9]を参照してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "octoprint" >}}


### サービスのチェック

OctoPrint には、サービスチェックは含まれません。

### イベント

OctoPrint には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

[1]: https://octoprint.org/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/ja/developers/integrations/new_check_howto/#developer-toolkit
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://github.com/DataDog/integrations-extras/blob/master/octoprint/datadog_checks/octoprint/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://octoprint.org/download/
[9]: https://docs.datadoghq.com/ja/logs/processing/
[10]: https://github.com/DataDog/integrations-extras/blob/master/octoprint/metadata.csv
[11]: https://docs.datadoghq.com/ja/help/