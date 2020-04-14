---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - autodiscovery
creates_events: false
ddtype: チェック
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/lighttpd/README.md'
display_name: Lighttpd
git_integration_title: lighttpd
guid: 01dcfe7a-7a56-4388-a388-799ee6daaaab
integration_id: lighttpd
integration_title: Lighttpd
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: lighttpd.
metric_to_check: lighttpd.performance.uptime
name: lighttpd
process_signatures:
  - lighttpd
public_title: Datadog-Lighttpd インテグレーション
short_description: アップタイム、処理バイト数、毎秒のリクエスト数、応答コードなどを追跡。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
![Lighttpd ダッシュボード][1]

## 概要

Agent の lighttpd チェックは、アップタイム、処理バイト数、毎秒のリクエスト数、応答コードなどを追跡します。

## セットアップ

### インストール

Lighttpd チェックは [Datadog Agent][2] パッケージに含まれています。Lighttpd サーバーに追加でインストールする必要はありません。

加えて、Lighttpd サーバーに `mod_status` をインストールします。

### コンフィギュレーション

#### ホスト

ホストで実行されている Agent 用にこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#containerized)セクションを参照してください。

1. [Agent のコンフィギュレーションディレクトリ][3]のルートにある `conf.d/` フォルダーの `lighttpd.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル lighttpd.d/conf.yaml][4] を参照してください。

   ```yaml
   init_config:

   instances:
     ## @param lighttpd_status_url - string - required
     ## Status url of your Lighttpd server.
     #
     - lighttpd_status_url: http://localhost/server-status?auto
   ```

2. [Agent を再起動します][5]。

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][6]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                                           |
| -------------------- | --------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `lighttpd`                                                      |
| `<INIT_CONFIG>`      | 空白または `{}`                                                   |
| `<INSTANCE_CONFIG>`  | `{"lighttpd_status_url": "http://%%host%%/server-status?auto"}` |

### 検証

[Agent の `status` サブコマンドを実行][7]し、Checks セクションで `lighttpd` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "lighttpd" >}}


### イベント

Lighttpd チェックには、イベントは含まれません。

### サービスのチェック

`- lighttpd.can_connect`:

Agent が lighttpd に接続してメトリクスを収集できない場合は、CRITICAL を返します。それ以外の場合は、OK を返します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問合せください。

## その他の参考資料

Lighttpd Web サーバーのメトリクスを監視する方法 (または理由) について理解するには、Datadog の[一連のブログ記事][10]を参照してください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/lighttpd/images/lighttpddashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/lighttpd/datadog_checks/lighttpd/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/lighttpd/metadata.csv
[9]: https://docs.datadoghq.com/ja/help
[10]: https://www.datadoghq.com/blog/monitor-lighttpd-web-server-metrics