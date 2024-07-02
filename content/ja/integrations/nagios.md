---
"app_id": "nagios"
"app_uuid": "7e61b923-1847-4c43-85cf-5f4c49ff4806"
"assets":
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": true
    "metrics":
      "check": "nagios.host.rta"
      "metadata_path": "metadata.csv"
      "prefix": "nagios."
    "process_signatures":
    - "nagios"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "3"
    "source_type_name": "Nagios"
  "saved_views":
    "nagios_processes": "assets/saved_views/nagios_processes.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "log collection"
- "notifications"
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/nagios/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "nagios"
"integration_id": "nagios"
"integration_title": "Nagios"
"integration_version": "1.13.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "nagios"
"public_title": "Nagios"
"short_description": "Nagios からサービスフラップやホストアラートなどを Datadog イベントストリームに送信。"
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::ログの収集"
  - "Category::Notifications"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "Nagios からサービスフラップやホストアラートなどを Datadog イベントストリームに送信。"
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Nagios"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

Nagios が監視するインフラストラクチャーから Datadog にイベントを送信してアラートを強化すると共に、Datadog が監視するインフラストラクチャーから取得されたメトリクスを Nagios のイベントと関連付けることができます。

このチェックは、Nagios サーバーのログを監視し、以下のイベントを Datadog に送信します。

- サービスフラップ
- ホストの状態変化
- パッシブサービスチェック
- ホストとサービスのダウンタイム

このチェックは、Nagios のパフォーマンスデータを Datadog にメトリクスとして送信することもできます。

## セットアップ

### インストール

Nagios チェックは [Datadog Agent][1] パッケージに含まれています。Nagios サーバーに追加でインストールする必要はありません。

### 構成

ホストで実行中の Agent でこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#コンテナ化)セクションを参照してください。

{{< tabs >}}
{{% tab "ホスト" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには

1. [Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `nagios.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル nagios.d/conf.yaml][2] を参照してください。

2. [Agent を再起動][3]すると、Datadog への Nagios イベントおよび (オプションで) パフォーマンスデータメトリクスの送信が開始されます。

**注**: Nagios チェックでは[カスタムメトリクス][4]を送信することができますが、これはお客様の[課金][5]に影響します。

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/nagios/datadog_checks/nagios/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/developers/metrics/custom_metrics/
[5]: https://docs.datadoghq.com/account_management/billing/custom_metrics/
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                        |
| -------------------- | -------------------------------------------- |
| `<INTEGRATION_NAME>` | `nagios`                                     |
| `<INIT_CONFIG>`      | 空白または `{}`                                |
| `<INSTANCE_CONFIG>`  | `{&quot;nagios_conf&quot;: &quot;/etc/nagios3/nagios.cfg&quot;}` |

**注**: コンテナ化された Agent から `/etc/nagios3/nagios.cfg` ファイルにアクセスして Datadog-Nagios インテグレーションを有効化できます。

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][2]し、Checks セクションで `nagios` を探します。

## 収集データ

### メトリクス

デフォルトの構成では、Nagios チェックはメトリクスを収集しません。ただし、`collect_host_performance_data` や `collect_service_performance_data` を `True` に設定すると、チェックは Nagios パフォーマンスデータを監視し、それをゲージメトリクスとして Datadog に送信します。

### ログ収集

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

### サービスチェック

Nagios チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

## その他の参考資料

- [Datadog を使用した Nagios アラートの把握][6]


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[3]: https://github.com/DataDog/integrations-core/blob/master/nagios/datadog_checks/nagios/data/conf.yaml.example
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/help/
[6]: https://www.datadoghq.com/blog/nagios-monitoring
