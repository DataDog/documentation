---
app_id: システム
app_uuid: a675760c-00f7-4bf3-bd0e-c7edfb0e7e82
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: network.tcp.can_connect
      metadata_path: metadata.csv
      prefix: network.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: TCP
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- network
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/tcp_check/README.md
display_on_public_website: true
draft: false
git_integration_title: tcp_check
integration_id: システム
integration_title: TCP チェック
integration_version: 4.8.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: tcp_check
public_title: TCP チェック
short_description: リモートホストへの TCP 接続を監視
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
  description: リモートホストへの TCP 接続を監視
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: TCP チェック
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![ネットワークのグラフ][1]

## 概要

任意のホストおよびポートの TCP 接続と応答時間を監視します。

## セットアップ

### インストール

TCP チェックは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

多くのメトリクスチェックは、監視するサービスと同じホストで実行するのが最適です。しかし、このチェックの場合は、リモート接続をテストするために、監視する TCP サービスを実行していないホストから実行することをお勧めします。

### 構成

{{< tabs >}}
{{% tab "ホスト" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには

[Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `tcp_check.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル tcp_check.d/conf.yaml][2] を参照してください。

```yaml
init_config:

instances:
  - name: SSH check
    host: jumphost.example.com # または IPv4/IPv6 アドレス
    port: 22
    collect_response_time: true # network.tcp.response_time を収集します。デフォルトは false です。
```

構成オプション

- `name` (必須) - サービスの名前。これは、タグ `instance:<name>` で指定します。**注**: すべてのスペースまたはダッシュはアンダースコアに変換されます。
- `host` (必須) - チェックするホスト。これは、タグ `url:<host>:<port>` で指定します。
- `port` (必須) - チェックするポート。これは、タグ `url:<host>:<port>` で指定します。
- `timeout` (オプション) - チェックのタイムアウト。デフォルトは 10 秒です。
- `collect_response_time` (オプション) - デフォルトは false で、この場合、応答時間メトリクスは収集されません。これを true に設定した場合は、メトリクス `network.tcp.response_time` が返されます。
- `tags` (オプション) - メトリクスに割り当てるタグ。

[Agent を再起動][3]すると、Datadog への TCP サービスチェックと応答時間の送信が開始されます。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/tcp_check/datadog_checks/tcp_check/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                                                         |
| -------------------- | ----------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `tcp_check`                                                                   |
| `<INIT_CONFIG>`      | 空白または `{}`                                                                 |
| `<INSTANCE_CONFIG>`  | `{"name": "<TCP_CHECK_INSTANCE_NAME>", "host":"%%host%%", "port":"%%port%%"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の `status` サブコマンドを実行][3]し、Checks セクションで `tcp_check` を探します。

## データ収集

### メトリクス
{{< get-metrics-from-git "tcp_check" >}}


### イベント

TCP チェックには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "tcp_check" >}}


**注:** このサービスチェックにアラートを設定するには、[ネットワークモニター][4]を作成します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/tcp_check/images/netgraphs.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/monitors/monitor_types/network/?tab=checkalert
[5]: https://docs.datadoghq.com/ja/help/