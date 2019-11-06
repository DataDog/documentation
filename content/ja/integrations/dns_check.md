---
aliases:
  - /ja/integrations/dnscheck
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - network
  - web
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/dns_check/README.md'
display_name: DNS
git_integration_title: dns_check
guid: 31e4c84c-fc4b-4cd4-97ed-0331bf4e2023
integration_id: dns
integration_title: DNS チェック
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: dns.
metric_to_check: dns.response_time
name: dns_check
public_title: Datadog-DNS チェックインテグレーション
short_description: DNS レコードの解決可能性とルックアップ時間を監視します。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

選択したネームサーバーを使用した DNS レコードの解決可能性とルックアップ時間を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照してこの手順を行ってください。

### インストール

DNS チェックは [Datadog Agent][2] パッケージに含まれているため、DNS サーバーを調査するサーバーに追加で何かをインストールする必要はありません。

メトリクス指向チェックの多くは監視対象サービスと同じホストで実行することが最適ですが、このステータス指向チェックは、監視対象の DNS サービスを実行していないホストから実行することが望ましい場合があります。

### コンフィグレーション

1. DNS データの収集を開始するには、[Agent の構成ディレクトリ][3]のルートにある `conf.d/` フォルダーの `dns_check.d/conf.yaml` ファイルを編集します。
    使用可能なすべての構成オプションの詳細については、[サンプル dns_check.d/conf.yaml][4] を参照してください。

    ```yaml
      init_config:

      instances:
        - name: Example (com)
          # nameserver: 8.8.8.8   # The nameserver to query, this must be an IP address
          hostname: example.com # the record to fetch
          # record_type: AAAA   # default is A
        - name: Example (org)
          hostname: example.org
    ```

    `nameserver` オプションを省略すると、チェックはローカルネットワーク設定で構成されているネームサーバーを使用します。

2. [Agent を再起動][5]すると、Datadog に対して DNS サービスチェックおよび応答時間の送信が開始されます。

### 検証

[Agent の `status` サブコマンドを実行][6]し、Checks セクションで `dns_check` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "dns_check" >}}


### イベント
DNS チェックには、イベントは含まれません。

### サービスのチェック
この Agent チェックは、収集するすべてのサービスチェックに次のタグを付けます。

  * `nameserver:<nameserver_in_yaml>`
  * `resolved_hostname:<hostname_in_yaml>`

`dns.can_resolve`:

Agent がリクエストの解決に失敗した場合は、CRITICAL を返します。それ以外の場合は UP を返します。

`hostname` および `record_type` でタグ付けされます。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/dns_check/datadog_checks/dns_check/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/dns_check/metadata.csv
[8]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}