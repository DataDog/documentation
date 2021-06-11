---
aliases:
  - /ja/guides/network_checks
  - /ja/integrations/tcpcheck
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
  - 'https://github.com/DataDog/integrations-core/blob/master/tcp_check/README.md'
display_name: TCP
draft: false
git_integration_title: tcp_check
guid: c514029e-0ed8-4c9f-abe5-2fd4096726ba
integration_id: system
integration_title: TCP チェック
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: network.
metric_to_check: network.tcp.can_connect
name: tcp_check
public_title: Datadog-TCP チェックインテグレーション
short_description: リモートホストへの TCP 接続を監視
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
![ネットワークのグラフ][1]

## 概要

任意のホストおよびポートの TCP 接続と応答時間を監視します。

## セットアップ

### インストール

TCP チェックは [Datadog Agent][2] パッケージに含まれているため、TCP ポートを調査するホストに追加で何かをインストールする必要はありません。メトリクス指向チェックの多くは監視対象サービスと同じホストで実行することが最適な実行方法ですが、リモート接続をテストする場合などに、監視対象の TCP サービスを実行していないホストからこのチェックを実行する方が望ましい場合があります。

### コンフィギュレーション

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

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

- `name` (必須) - サービスの名前。これは、タグ `instance:<name>` で指定します。注: このタグでは、すべてのスペースおよびダッシュがアンダースコアに変換されます。
- `host` (必須) - チェックするホスト。これは、タグ `url:<host>:<port>` で指定します。
- `port` (必須) - チェックするポート。これは、タグ `url:<host>:<port>` で指定します。
- `timeout` (オプション) - チェックのタイムアウト。デフォルトは 10 秒です。
- `collect_response_time` (オプション) - デフォルトは false。このオプションを true に設定しなかった場合、応答時間メトリクスは収集されません。これを true に設定した場合は、メトリクス `network.tcp.response_time` が返されます。
- `tags` (オプション) - メトリクスに割り当てるタグ。

[Agent を再起動][3]すると、Datadog への TCP サービスチェックと応答時間の送信が開始されます。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/tcp_check/datadog_checks/tcp_check/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                                                         |
| -------------------- | ----------------------------------------------------------------------------- |
| `<インテグレーション名>` | `tcp_check`                                                                   |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                                                 |
| `<インスタンスコンフィギュレーション>`  | `{"name": "<TCP_CHECK_INSTANCE_NAME>", "host":"%%host%%", "port":"%%port%%"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の `status` サブコマンドを実行][3]し、Checks セクションで `tcp_check` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "tcp_check" >}}


### イベント

TCP チェックには、イベントは含まれません。

### サービスのチェック

**`tcp.can_connect`**:

設定した`ホスト`および`ポート`に Agent が接続できない場合は、DOWN を返します。それ以外の場合は、UP を返します。

Datadog でこのサービスチェックのアラート条件を作成するには、[Create Monitor][4] ページで **Integration** ではなく **Network** をクリックしてください。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/tcp_check/images/netgraphs.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://app.datadoghq.com/monitors#/create
[5]: https://docs.datadoghq.com/ja/help/
