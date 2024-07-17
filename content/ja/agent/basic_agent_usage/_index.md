---
aliases:
- /ja/guides/basic_agent_usage/
- /ja/agent/faq/where-is-the-configuration-file-for-the-agent/
- /ja/agent/faq/log-location
further_reading:
- link: /agent/faq/how-datadog-agent-determines-the-hostname/
  tag: FAQ
  text: How does Datadog determine the Agent hostname?
- link: /agent/configuration/agent-commands/
  tag: FAQ
  text: List of all Agent commands
- link: /agent/configuration/agent-configuration-files/
  tag: FAQ
  text: Location of all Agent configuration files
- link: https://www.datadoghq.com/blog/engineering/performance-improvements-in-the-datadog-agent-metrics-pipeline/
  tag: Blog
  text: Performance Improvements in the Datadog Agent Metrics Pipeline
title: 基本的な Agent の利用方法
---

{{< partial name="platforms/platforms.html" links="platforms" >}}

## Agent の管理

Datadog Agent Manager GUI またはコマンドラインを使用して、Agent のインストールを管理できます。

### Datadog Agent Manager GUI

<div class="alert alert-info">Agent GUI は 32 ビット Windows プラットフォームではサポートされていません。</div>

Datadog Agent Manager GUI を使用して、次のことを行います。
- Agent のステータス情報を表示する
- すべての実行中のチェックを表示する
- Agent ログを表示する
- Agent コンフィギュレーションファイル (`datadog.yaml`) を編集する
- Agent チェックの追加と編集
- フレアの送信

Datadog Agent Manager GUI は Windows と macOS でデフォルトで有効になっており、ポート `5052` で実行します。デフォルトの Web ブラウザで GUI を開くには、`datadog-agent launch-gui` コマンドを使用します。

GUI のデフォルトポートは `datadog.yaml` コンフィギュレーションファイルで変更できます。GUI を無効にするには、ポートの値を `-1` に設定します。Linux では、GUI はデフォルトで無効になっています。

GUI の要件:
- cookie をブラウザで有効にする必要があります。GUI は、GUI サーバーとのすべての通信を認証するために使用されるトークンを生成し、ブラウザに保存します。
- To start the GUI, the user must have the required permissions. If you are able to open `datadog.yaml`, you are able to use the GUI.
- セキュリティ上の理由から、GUI はローカルネットワークインターフェイス (`localhost`/`127.0.0.1`) から**のみ**アクセスできます。そのため、Agent が実行しているホストにいる必要があります。Agent を VM やコンテナーで実行してホストマシンからアクセスすることはできません。

### コマンドラインインターフェイス

Agent 6 以降、Agent のコマンドラインインターフェイスはサブコマンドに基づいています。Agent サブコマンドの完全なリストについては、[Agent コマンド][2]を参照してください。

## Getting further with the Datadog Agent

### Update the Agent

特定のホスト上で実行されている Datadog Agent のコアを手動でマイナーバージョンにアップデートするには、[プラットフォームの対応するインストールコマンド][7]を実行します。

**注**: 特定の Agent インテグレーションを手動でアップデートするには、[インテグレーション管理ガイド][8]を参照してください。

### Configuration files

See the [Agent configuration files documentation][9].

### Datadog site

Edit the [Agent's main configuration file][10], `datadog.yaml`, to set the `site` parameter (defaults to `datadoghq.com`).

```yaml
site: {{< region-param key="dd_site" >}}
```

**Note**: See the [Getting Started with Datadog Sites documentation][11] for further details on the `site` parameter.

### Log location

See the [Agent log files documentation][12].

## Agent overhead

以下は、Datadog Agent リソース消費の例です。テストは、Amazon EC2 マシンの `c5.xlarge` インスタンス (4 VCPU/ 8 GB RAM) で行われ、同様のリソースを持つ ARM64 ベースのインスタンスで同等のパフォーマンスが見られました。Agent 自体を監視するために、vanilla `datadog-agent` がプロセスチェックとともに実行されました。さらにインテグレーションを有効にすると、Agent リソースの消費が増えます。
JMX チェックを有効にすると、監視対象の JVM によって公開される Bean の数に応じて、Agent が使用するメモリの量が増えます。トレースとプロセスを有効にしても、Agents のリソース消費が増えます。

* Agent Test version: 7.34.0
* CPU: ~ 0.08% of the CPU used on average
* Memory: ~ 130MB of RAM used (RSS memory)
* Network bandwidth: ~ 140 B/s ▼ | 800 B/s ▲
* Disk:
  * Linux 830MB to 880MB depending on the distribution
  * Windows: 870MB

**Log Collection**:

The results below are obtained from a collection of *110KB of logs per seconds* from a file with the [HTTP forwarder][6] enabled. It shows the evolution of resource usage for the different compression levels available.

{{< tabs >}}
{{% tab "HTTP compression level 6" %}}

* Agent Test version: 6.15.0
* CPU: ~ 1.5% of the CPU used on average
* Memory: ~ 95MB of RAM used.
* Network bandwidth: ~ 14 KB/s ▲

{{% /tab %}}
{{% tab "HTTP compression level 1" %}}

* Agent Test version: 6.15.0
* CPU: ~ 1% of the CPU used on average
* Memory: ~ 95MB of RAM used.
* Network bandwidth: ~ 20 KB/s ▲

{{% /tab %}}
{{% tab "HTTP Uncompressed" %}}

* Agent Test version: 6.15.0
* CPU: ~ 0.7% of the CPU used on average
* Memory: ~ 90MB of RAM used (RSS memory)
* Network bandwidth: ~ 200 KB/s ▲

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/troubleshooting/send_a_flare/
[2]: /ja/agent/configuration/agent-commands/
[6]: /ja/agent/logs/log_transport/?tab=https#enforce-a-specific-transport
[7]: https://app.datadoghq.com/account/settings/agent/latest
[8]: /ja/agent/guide/integration-management/
[9]: /ja/agent/configuration/agent-configuration-files/
[10]: /ja/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[11]: /ja/getting_started/site/
[12]: /ja/agent/configuration/agent-log-files/