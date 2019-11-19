---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - network
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/ntp/README.md'
display_name: NTP
git_integration_title: ntp
guid: 9d105f8c-7fd3-48d7-a5d1-1cc386ec0367
integration_id: ntp
integration_title: NTP
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: ntp.
metric_to_check: ntp.offset
name: ntp
public_title: Datadog-NTP インテグレーション
short_description: ホストが選択されている NTP サーバーとの同期から外れたときにアラートを取得 server.
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Network Time Protocol (NTP) インテグレーションはデフォルトで有効になっており、NTP サーバーとの時間オフセットを 15 分ごとに報告します。ローカル Agent の時間が Datadog サービスや監視対象の他のホストと 15 秒以上ずれていると、以下の問題が発生する可能性があります。

* 不正なアラートのトリガー
* メトリクスの遅延
* メトリクスのグラフの途切れ

デフォルトで利用される NTP サーバー

* `0.datadog.pool.ntp.org`
* `1.datadog.pool.ntp.org`
* `2.datadog.pool.ntp.org`
* `3.datadog.pool.ntp.org`

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][8]のガイドを参照してこの手順を行ってください。

### インストール

NTP チェックは [Datadog Agent][1] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィグレーション

Agent はデフォルトで NTP チェックを有効にしますが、チェックを自分で構成する場合は、[Agent の構成ディレクトリ][2]のルートにある `conf.d/` フォルダーの `ntp.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル ntp.d/conf.yaml][3] を参照してください。

```
init_config:

instances:
  - offset_threshold: 60 # ntp.in_sync サービスチェックが CRITICAL になったときのローカルの時刻と NTP サーバーとの時間のずれ (秒単位)。デフォルトは 60
#   host: pool.ntp.org # 選択した NTP サーバーの使用を設定します
#   port: 1234         # ホストと共に設定します
#   version: 3         # 特定の NTP バージョンの使用を設定します
#   timeout: 5         # NTP サーバーからの応答を待機する秒数。デフォルトは 1
#   use_local_defined_servers: false # ローカルホストで定義されている NTP サーバーを使用します。デフォルトは false
```

構成オプション

* `host` (オプション) - 代替 NTP サーバーのホスト名 (例: `pool.ntp.org`)
* `port` (オプション) - 使用するポート
* `version` (オプション) - NTP のバージョン
* `timeout` (オプション) - 応答タイムアウト
* `use_local_defined_servers` (オプション) - ローカルホストで定義されている NTP サーバーを使用する場合は、true。Unix システムでは、/etc/ntp.conf と etc/xntp.conf で定義されているサーバーが使用されます。Windows システムでは、レジストリキー HKLM\SYSTEM\CurrentControlSet\Services\W32Time\Parameters\NtpServer で定義されているサーバーが使用されます。**注意**: このオプションを有効にした場合、システムのターゲット NTP サーバーの時刻がずれていると、NTP チェックは問題を検出できません。

[Agent を再起動][4]すると、構成の変更が有効になります。

### 検証

[Agent の `status` サブコマンドを実行][5]し、Checks セクションで `ntp` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "ntp" >}}


### イベント
NTP チェックには、イベントは含まれません。

### サービスのチェック

`ntp.in_sync`:

NTP オフセットが `ntp.yaml` で指定されているしきい値より大きい場合は、CRITICAL を返します。それ以外の場合は、OK を返します。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][7]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[3]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/ntp.d/conf.yaml.default
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/ntp/metadata.csv
[7]: https://docs.datadoghq.com/ja/help
[8]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations


{{< get-dependencies >}}