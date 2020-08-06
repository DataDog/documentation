---
assets:
  dashboards: {}
  logs: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - monitoring
  - notification
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/nagios/README.md'
display_name: Nagios
git_integration_title: nagios
guid: f7629918-751c-4a05-87e7-0e3de34e51e7
integration_id: nagios
integration_title: Nagios
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: nagios.
name: nagios
process_signatures:
  - nagios
public_title: Datadog-Nagios インテグレーション
short_description: Nagios からサービスフラップやホストアラートなどを Datadog イベントストリームに送信。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Nagios が監視するインフラストラクチャーから Datadog にイベントを送信してアラートを強化すると共に、Datadog が監視するインフラストラクチャーから取得されたメトリクスを Nagios のイベントと関連付けることができます。

このチェックは、Nagios サーバーのログを監視し、Datadog イベントストリームにイベントを送信します。また、サービスのフラップ、ホスト状態の変化、パッシブサービスチェック、ホストとサービスのダウンタイムなどを追跡します。このチェックは、Nagios パフォーマンスデータをメトリクスとして Datadog に送信することもできます。

## セットアップ

### インストール

Nagios チェックは [Datadog Agent][1] パッケージに含まれています。Nagios サーバーに追加でインストールする必要はありません。

### 構成

ホストで実行中の Agent でこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#コンテナ化)セクションを参照してください。

#### ホスト

1. `nagios.d/conf.yaml` ファイル ([Agent の構成ディレクトリ][2]のルートにある `conf.d/` フォルダー内) を編集します。使用可能なすべての構成オプションの詳細については、[サンプル nagios.d/conf.yaml][3] を参照してください。

2. [Agent を再起動][4]すると、Datadog への Nagios イベントおよび (オプションで) パフォーマンスデータメトリクスの送信が開始されます。

**注**: Nagios チェックでは[カスタムメトリクス][5]を送信することができますが、これはお客様の[課金][6]に影響します。

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][7]をガイドとして参照して、次のパラメーターを適用します。

| パラメーター            | 値                                        |
| -------------------- | -------------------------------------------- |
| `<インテグレーション名>` | `nagios`                                     |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                |
| `<インスタンスコンフィギュレーション>`  | `{&quot;nagios_conf&quot;: &quot;/etc/nagios3/nagios.cfg&quot;}` |

**注**: コンテナ化された Agent から `/etc/nagios3/nagios.cfg` ファイルにアクセスして Datadog-Nagios インテグレーションを有効化できます。

### 検証

[Agent の status サブコマンドを実行][8]し、Checks セクションで `nagios` を探します。

## 収集データ

### メトリクス

デフォルトの構成では、Nagios チェックはメトリクスを収集しません。ただし、`collect_host_performance_data` や `collect_service_performance_data` を `True` に設定すると、チェックは Nagios パフォーマンスデータを監視し、それをゲージメトリクスとして Datadog に送信します。

### イベント

このチェックは Nagios イベントログを監視して、次の文字列を含むログ行を検出すると、行ごとにイベントを送信します。

- SERVICE FLAPPING ALERT
- ACKNOWLEDGE_SVC_PROBLEM
- SERVICE ALERT
- HOST ALERT
- ACKNOWLEDGE_HOST_PROBLEM
- SERVICE NOTIFICATION
- HOST DOWNTIME ALERT
- PROCESS_SERVICE_CHECK_RESULT
- SERVICE DOWNTIME ALERT

### サービスのチェック

Nagios チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

## その他の参考資料

- [Datadog を使用した Nagios アラートの把握][10]

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/nagios/datadog_checks/nagios/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/developers/metrics/custom_metrics/
[6]: https://docs.datadoghq.com/ja/account_management/billing/custom_metrics/
[7]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[9]: https://docs.datadoghq.com/ja/help/
[10]: https://www.datadoghq.com/blog/nagios-monitoring