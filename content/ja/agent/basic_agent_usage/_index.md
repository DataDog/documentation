---
aliases:
- /ja/guides/basic_agent_usage/
- /ja/agent/faq/where-is-the-configuration-file-for-the-agent/
- /ja/agent/faq/log-location
further_reading:
- link: /agent/faq/how-datadog-agent-determines-the-hostname/
  tag: よくあるご質問
  text: Datadog が Agent ホスト名を決定する方法
- link: /agent/configuration/agent-commands/
  tag: よくあるご質問
  text: すべての Agent コマンド
- link: /agent/configuration/agent-configuration-files/
  tag: よくあるご質問
  text: すべての Agent 構成ファイルの場所
- link: https://www.datadoghq.com/blog/engineering/performance-improvements-in-the-datadog-agent-metrics-pipeline/
  tag: ブログ
  text: Datadog Agent メトリクスパイプラインのパフォーマンス向上
title: Basic Agent Usage
---

{{< partial name="platforms/platforms.html" links="platforms" >}}

## Managing the Agent

You can manage your Agent installation using the Datadog Agent Manager GUI or from the command line.

### Datadog Agent Manager GUI

<div class="alert alert-info">The Agent GUI is not supported on 32-bit Windows platforms.</div>

Use the Datadog Agent Manager GUI to:
- View the status information for your Agent
- View all running checks
- View the Agent log
- Edit the Agent configuration file (`datadog.yaml`)
- Add or edit Agent checks
- Send flares

The Datadog Agent Manager GUI is enabled by default on Windows and macOS, and runs on port `5052`. Use the `datadog-agent launch-gui` command to open the GUI in your default web browser.

You can change the GUI's default port in your `datadog.yaml` configuration file. To disable the GUI, set the port's value to `-1`. On Linux, the GUI is disabled by default.

GUI requirements:
- Cookies must be enabled in your browser. The GUI generates and saves a token in your browser, which is used for authenticating all communications with the GUI server.
- GUI を起動するには、必要なアクセス許可を持っている必要があります。`datadog.yaml` を開くことができる場合は、GUI を使用できます。
- For security reasons, the GUI can **only** be accessed from the local network interface (`localhost`/`127.0.0.1`), therefore you must be on the host where the Agent is running. You can't run the Agent on a VM or a container and access it from the host machine.

### Command-line interface

From Agent 6 and later, the Agent command-line interface is based on subcommands. For a full list of Agent subcommands, see [Agent Commands][2].

## Datadog Agent の次のステップ

### Agent の更新

To manually update the Datadog Agent core between two minor versions on a given host, run the [corresponding installation command for your platform][7].

**Note**: If you want to manually update one specific Agent integration, see the [Integration Management guide][8].

### 構成ファイル

[Agent コンフィギュレーションファイルに関するドキュメント][9]を参照してください。

### Datadog サイト

[Agent のメインコンフィギュレーションファイル][10]、`datadog.yaml` を編集して、`site` パラメーターを設定します (デフォルトは `datadoghq.com`)。

```yaml
site: {{< region-param key="dd_site" >}}
```

**注**: `site` パラメーターの詳細については、[Datadog サイトの概要ドキュメント][11]を参照してください。

### ログの場所

[Agent ログファイルに関するドキュメント][12]を参照してください。

## Agent のオーバーヘッド

An example of the Datadog Agent resource consumption is below. Tests were made on an Amazon EC2 machine `c5.xlarge` instance (4 VCPU/ 8GB RAM) and comparable performance was seen for ARM64-based instances with similar resourcing. The vanilla `datadog-agent` was running with a process check to monitor the Agent itself. Enabling more integrations may increase Agent resource consumption.
Enabling JMX Checks forces the Agent to use more memory depending on the number of beans exposed by the monitored JVMs. Enabling the trace and process Agents increases the resource consumption as well.

* Agent テストのバージョン: 7.34.0
* CPU: 平均で CPU の約 0.08 % を使用
* メモリ: 約 130 MB の RAM を使用 (RSS メモリ)
* ネットワーク帯域幅: 約 140 B/秒 ▼ | 800 B/秒 ▲
* ディスク:
  * Linux: ディストリビューションによって 830 MB ～ 880 MB
  * Windows: 870 MB

**ログ収集**:

以下は、[HTTP フォワーダー][6]が有効になっている状態で*毎秒 110KB のログが記録される*ファイルから得た結果です。これは、使用可能な圧縮レベルに応じてリソース使用量がどのように増加するかを示しています。

{{< tabs >}}
{{% tab "HTTP compression level 6" %}}

* Agent テストのバージョン: 6.15.0
* CPU: 平均で CPU の約 1.5% を使用
* メモリ: 約 95 MB の RAM 使用。
* ネットワーク帯域幅: 約 14KB/秒 ▲

{{% /tab %}}
{{% tab "HTTP compression level 1" %}}

* Agent テストのバージョン: 6.15.0
* CPU: 平均で CPU の約 1% を使用
* メモリ: 約 95 MB の RAM 使用。
* ネットワーク帯域幅: 約 20KB/秒 ▲

{{% /tab %}}
{{% tab "HTTP Uncompressed" %}}

* Agent テストのバージョン: 6.15.0
* CPU: 平均で CPU の約 0.7 % を使用
* メモリ: 約 90 MB の RAM を使用 (RSS メモリ)
* ネットワーク帯域幅: 約 200KB/秒 ▲

{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

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