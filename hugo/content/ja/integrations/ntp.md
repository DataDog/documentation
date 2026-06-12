---
app_id: ntp
app_uuid: 399b74d9-ece5-4517-ae16-c05cac6911b2
assets:
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: ntp.offset
      metadata_path: metadata.csv
      prefix: ntp.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: NTP
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- network
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ntp/README.md
display_on_public_website: true
draft: false
git_integration_title: ntp
integration_id: ntp
integration_title: NTP
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: ntp
public_title: NTP
short_description: 選択した NTP サーバーとの同期からホストが外れた場合にアラートを取得。
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::ネットワーク
  - Offering::Integration
  configuration: README.md#Setup
  description: 選択した NTP サーバーとの同期からホストが外れた場合にアラートを取得。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: NTP
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

Network Time Protocol (NTP) インテグレーションはデフォルトで有効になっており、NTP サーバーとの時間オフセットを 15 分ごとに報告します。ローカル Agent の時間が Datadog サービスや監視対象の他のホストと 15 秒以上ずれていると、以下の問題が発生する可能性があります。

- 不正なアラートのトリガー
- メトリクスの遅延
- メトリクスのグラフの途切れ

デフォルトでは、Agent が実行されているクラウドプロバイダーがチェックにより検出され、可能な場合はそのクラウドプロバイダーのプライベート NTP サーバーが使用されます。クラウドプロバイダーが検出されない場合は、Agent で以下の NTP サーバーをデフォルトとします。

- `0.datadog.pool.ntp.org`
- `1.datadog.pool.ntp.org`
- `2.datadog.pool.ntp.org`
- `3.datadog.pool.ntp.org`

**注:** NTP リクエストはプロキシ設定に対応していません。

## セットアップ

### インストール

NTP チェックは [Datadog Agent][1] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### 構成

{{< tabs >}}
{{% tab "ホスト" %}}

#### ホスト

Agent はデフォルトで  NTP チェックを有効にします。チェックを自分で構成する場合は、[Agent の構成ディレクトリ][1]のルートにある `conf.d/` フォルダーで `ntp.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションについては、[サンプル ntp.d/conf.yaml][2] を参照してください。

ローカルサーバーの時刻が Datadog NTP サーバーに照らし許容範囲であることを Agent が確認できるように、ポート `123` を経由する外行き UDP トラフィックは許可されなければなりません。

**注**: Datadog-NTP チェックのコンフィギュレーションファイルを編集する場合は、 [Agent を再起動][3]して構成の変更を有効にします。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/ntp.d/conf.yaml.default
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}

{{% tab "Containerized" %}}

#### コンテナ化

コンテナ化環境の場合は、以下のパラメーターを適用する手順について、[オートディスカバリーの構成][1]に関するドキュメントを参照してください。利用可能なすべての構成オプションについては、サンプル [ntp.d/conf.yaml][2] を参照してください。

##### メトリクスの収集

| パラメーター            | 値                        |
|----------------------|------------------------------|
| `<INTEGRATION_NAME>` | `["ntp"]`                    |
| `<INIT_CONFIG>`      | `[{}]`                       |
| `<INSTANCE_CONFIG>`  | `[{"host": "<NTP_SERVER>"}]` |

[1]: https://docs.datadoghq.com/ja/containers/kubernetes/integrations/?tab=annotations#configuration
[2]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/ntp.d/conf.yaml.default
{{% /tab %}}

{{< /tabs >}}

### 検証

[Agent の `status` サブコマンドを実行][2]し、Checks セクションで `ntp` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "ntp" >}}


### イベント

NTP チェックには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "ntp" >}}


## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/ja/help/