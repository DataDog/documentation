---
app_id: dns
app_uuid: a21dc4ff-8b3f-427e-a5cc-17790a36b147
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: dns.response_time
      metadata_path: metadata.csv
      prefix: dns.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: DNS
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- network
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/dns_check/README.md
display_on_public_website: true
draft: false
git_integration_title: dns_check
integration_id: dns
integration_title: DNS Check
integration_version: 3.3.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: dns_check
public_title: DNS Check
short_description: DNS レコードの解決可能性とルックアップ時間を監視。
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
  configuration: README.md#Setup
  description: DNS レコードの解決可能性とルックアップ時間を監視。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: DNS Check
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

選択したネームサーバーを使用した DNS レコードの解決可能性とルックアップ時間を監視します。

## セットアップ

### インストール

DNS チェックは [Datadog Agent][1] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

メトリクス指向チェックの多くは監視対象サービスと同じホストで実行することが最適ですが、このステータス指向チェックは、監視対象の DNS サービスを実行していないホストから実行することが望ましい場合があります。

### 構成

1. DNS データの収集を開始するには、[Agent のコンフィギュレーションディレクトリ][2]のルートにある `conf.d/` フォルダーの `dns_check.d/conf.yaml` ファイルを編集します。
   使用可能なすべてのコンフィギュレーションオプションについては、[サンプル dns_check.d/conf.yaml][3] を参照してください。

   ```yaml
   init_config:

   instances:
     ## @param name - string - required
     ## Name of your DNS check instance.
     ## To create multiple DNS checks, create multiple instances with unique names.
     #
     - name: '<INSTANCE_NAME>'

       ## @param hostname - string - required
       ## Hostname to resolve.
       #
       hostname: '<HOSTNAME>'
   ```

    `nameserver` オプションを省略すると、チェックはローカルネットワーク設定で構成されているネームサーバーを使用します。

2. [Agent を再起動][4]すると、Datadog に対して DNS サービスチェックおよび応答時間の送信が開始されます。

### 検証

[Agent の `status` サブコマンドを実行][5]し、Checks セクションで `dns_check` を検索します。

## データ収集

### メトリクス
{{< get-metrics-from-git "dns_check" >}}


### イベント

DNS チェックには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "dns_check" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/dns_check/datadog_checks/dns_check/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/dns_check/metadata.csv
[7]: https://github.com/DataDog/integrations-core/blob/master/dns_check/assets/service_checks.json
[8]: https://docs.datadoghq.com/ja/help/