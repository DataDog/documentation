---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs:
    source: nagios
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - monitoring
  - notification
  - log collection
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/nagios/README.md'
display_name: Nagios
draft: false
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

### コンフィギュレーション

ホストで実行中の Agent でこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#コンテナ化)セクションを参照してください。

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

1. [Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `nagios.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル nagios.d/conf.yaml][2] を参照してください。

2. [Agent を再起動][3]すると、Datadog への Nagios イベントおよび (オプションで) パフォーマンスデータメトリクスの送信が開始されます。

**注**: Nagios チェックでは[カスタムメトリクス][4]を送信することができますが、これはお客様の[課金][5]に影響します。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/nagios/datadog_checks/nagios/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/ja/developers/metrics/custom_metrics/
[5]: https://docs.datadoghq.com/ja/account_management/billing/custom_metrics/
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                        |
| -------------------- | -------------------------------------------- |
| `<インテグレーション名>` | `nagios`                                     |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                |
| `<インスタンスコンフィギュレーション>`  | `{&quot;nagios_conf&quot;: &quot;/etc/nagios3/nagios.cfg&quot;}` |

**注**: コンテナ化された Agent から `/etc/nagios3/nagios.cfg` ファイルにアクセスして Datadog-Nagios インテグレーションを有効化できます。

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][2]し、Checks セクションで `nagios` を探します。

## 収集データ

### メトリクス

デフォルトの構成では、Nagios チェックはメトリクスを収集しません。ただし、`collect_host_performance_data` や `collect_service_performance_data` を `True` に設定すると、チェックは Nagios パフォーマンスデータを監視し、それをゲージメトリクスとして Datadog に送信します。

### ログの収集

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
    logs_enabled: true
    ```

2. Nagios のログの収集を開始するには、次の構成ブロックを `nagios.d/conf.yaml` ファイルに追加します。

    ```yaml
    logs:
      - type: file
        path: /opt/nagios/var/log/nagios.log
        source: nagios
    ```

    `path` パラメーターの値を環境に合わせて変更します。nagios コンフィギュレーションファイルの `log_file` 値を参照してください。使用可能なすべてのコンフィギュレーションオプションについては、[nagios.d/conf.yaml のサンプル][3]を参照してください。

3. [Agent を再起動します][4]。

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

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

## その他の参考資料

- [Datadog を使用した Nagios アラートの把握][6]


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://github.com/DataDog/integrations-core/blob/master/nagios/datadog_checks/nagios/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/help/
[6]: https://www.datadoghq.com/blog/nagios-monitoring