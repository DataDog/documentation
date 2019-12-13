---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/lighttpd/README.md'
display_name: Lighttpd
git_integration_title: lighttpd
guid: 01dcfe7a-7a56-4388-a388-799ee6daaaab
integration_id: lighttpd
integration_title: Lighttpd
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: lighttpd.
metric_to_check: lighttpd.performance.uptime
name: lighttpd
process_signatures:
  - lighttpd
public_title: Datadog-Lighttpd インテグレーション
short_description: アップタイム、処理バイト数、毎秒のリクエスト数、応答コードなどを追跡 and more.
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

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

lighttpd チェックは [Datadog Agent][3] パッケージに含まれています。lighttpd サーバーに追加でインストールする必要はありません。

加えて、Lighttpd サーバーに `mod_status` をインストールします。

### コンフィグレーション

1. [Agent の構成ディレクトリ][4]のルートにある `conf.d/` フォルダーの `lighttpd.d/conf.yaml` ファイルを編集します。
    使用可能なすべての構成オプションの詳細については、[サンプル lighttpd.d/conf.yaml][5] を参照してください。

    ```yaml
    init_config:

    instances:
        # Each instance needs a lighttpd_status_url. Tags are optional.
        - lighttpd_status_url: http://example.com/server-status?auto
        #   tags:
        #     - instance:foo
    ```

2. [Agent を再起動][6]すると、Datadog への lighttpd メトリクスの送信が開始されます。

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
[2]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/lighttpd/datadog_checks/lighttpd/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/lighttpd/metadata.csv
[9]: https://docs.datadoghq.com/ja/help
[10]: https://www.datadoghq.com/blog/monitor-lighttpd-web-server-metrics


{{< get-dependencies >}}