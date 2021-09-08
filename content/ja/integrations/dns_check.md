---
aliases:
  - /ja/integrations/dnscheck
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - network
  - web
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-core/blob/master/dns_check/README.md
display_name: DNS
draft: false
git_integration_title: dns_check
guid: 31e4c84c-fc4b-4cd4-97ed-0331bf4e2023
integration_id: dns
integration_title: DNS Check
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: dns.
metric_to_check: dns.response_time
name: dns_check
public_title: Datadog-DNS Check インテグレーション
short_description: DNS レコードの解決可能性とルックアップ時間を監視。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

選択したネームサーバーを使用した DNS レコードの解決可能性とルックアップ時間を監視します。

## セットアップ

### インストール

DNS チェックは [Datadog Agent][1] パッケージに含まれているため、DNS サーバーを調査するサーバーに追加でインストールする必要はありません。

メトリクス指向チェックの多くは監視対象サービスと同じホストで実行することが最適ですが、このステータス指向チェックは、監視対象の DNS サービスを実行していないホストから実行することが望ましい場合があります。

### コンフィギュレーション

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

## 収集データ

### メトリクス
{{< get-metrics-from-git "dns_check" >}}


### イベント

DNS チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "dns_check" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/dns_check/datadog_checks/dns_check/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/dns_check/metadata.csv
[7]: https://github.com/DataDog/integrations-core/blob/master/dns_check/assets/service_checks.json
[8]: https://docs.datadoghq.com/ja/help/