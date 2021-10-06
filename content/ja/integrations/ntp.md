---
assets:
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
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
draft: false
git_integration_title: ntp
guid: 9d105f8c-7fd3-48d7-a5d1-1cc386ec0367
integration_id: ntp
integration_title: NTP
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: ntp.
metric_to_check: ntp.offset
name: ntp
public_title: Datadog-NTP インテグレーション
short_description: 選択した NTP サーバーとの同期からホストが外れた場合にアラートを取得。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Network Time Protocol (NTP) インテグレーションはデフォルトで有効になっており、NTP サーバーとの時間オフセットを 15 分ごとに報告します。ローカル Agent の時間が Datadog サービスや監視対象の他のホストと 15 秒以上ずれていると、以下の問題が発生する可能性があります。

- 不正なアラートのトリガー
- メトリクスの遅延
- メトリクスのグラフの途切れ

デフォルトでは、エージェントが実行されているクラウドプロバイダーがチェックにより検出され、可能な場合はそのクラウドプロバイダーのプライベート NTP サーバーが使用されます。クラウドプロバイダーが検出されない場合は、エージェントで以下の NTP サーバーをデフォルトとします。

- `0.datadog.pool.ntp.org`
- `1.datadog.pool.ntp.org`
- `2.datadog.pool.ntp.org`
- `3.datadog.pool.ntp.org`

## セットアップ

### インストール

NTP チェックは [Datadog Agent][1] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

Agent はデフォルトで  NTP チェックを有効にしますが、チェックを自分で構成する場合は、[Agent のコンフィギュレーションディレクトリ][2]のルートにある `conf.d/` フォルダーで `ntp.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル ntp.d/conf.yaml][3] を参照してください。

**注**: Datadog-NTP チェックのコンフィギュレーションファイルを編集する場合は、 [Agent を再起動][4]してコンフィギュレーションの変更を有効にします。

### 検証

[Agent の `status` サブコマンドを実行][5]し、Checks セクションで `ntp` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "ntp" >}}


### イベント

NTP チェックには、イベントは含まれません。

### サービスのチェック

**ntp.in_sync**:<br>
NTP オフセットが `ntp.yaml` で指定されているしきい値より大きい場合は、`CRITICAL` を返します。それ以外の場合は `OK` を返します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/ntp.d/conf.yaml.default
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/ntp/metadata.csv
[7]: https://docs.datadoghq.com/ja/help/