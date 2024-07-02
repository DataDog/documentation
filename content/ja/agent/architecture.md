---
title: Agent Architecture
disable_toc: false
further_reading:
- link: /agent/supported_platforms/
  tag: Documentation
  text: Supported Platforms
- link: /agent/configuration/
  tag: Documentation
  text: Agent Configuration
---

## Agent アーキテクチャ

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

Agent 6 and 7 are composed of a main process responsible for collecting infrastructure metrics and logs, and receiving [DogStatsD metrics][1]. The main components to this process are:

* The Collector, which runs checks and collects metrics.
* The Forwarder, which sends payloads to Datadog.

`datadog.yaml` 構成ファイルで有効にすると、次の 2 つのオプションのプロセスが Agent によって生成されます。

* The APM Agent is a process that collects [traces][2]. It is enabled by default.
* The Process Agent is a process that collects live process information. By default, the Process Agent only collects available containers, otherwise it is disabled.

Windows では、サービスは次のように一覧表示されます。

| サービス               | 説明           |
|-----------------------|-----------------------|
| DatadogAgent          | Datadog Agent         |
| datadog-trace-agent   | Datadog Trace Agent   |
| datadog-process-agent | Datadog Process Agent |

By default the Agent binds three [ports][3] on Linux and four ports on Windows and macOS:

| ポート | 説明                                                                                 |
|------|---------------------------------------------------------------------------------------------|
| 5000 | Agent に関するランタイムメトリクスを公開します。                                                    |
| 5001 | Agent の CLI と GUI で使用され、コマンドを送信して実行中の Agent から情報を取得します。 |
| 5002 | Serves the GUI server on Windows and macOS.                                                   |
| 8125 | DogStatsD サーバーで使用され、外部メトリクスを受信します。                                  |

ポートの構成については、[ネットワークトラフィック][4]を参照してください。

### コレクター

The collector gathers all standard metrics every 15 seconds. Agent 6 embeds a Python 2.7 interpreter to run integrations and [custom checks][5].

### Forwarder

The Agent forwarder sends metrics over HTTPS to Datadog. Buffering prevents network splits from affecting metrics reporting. Metrics are buffered in memory until a limit in size or number of outstanding send requests is reached. Afterward, the oldest metrics are discarded to keep the forwarder's memory footprint manageable. Logs are sent to Datadog over an SSL-encrypted TCP connection.

### DogStatsD

In Agent 6, DogStatsD is a Golang implementation of [Etsy's StatsD][6] metric aggregation daemon. DogStatsD receives and rolls up arbitrary metrics over UDP or a UNIX socket, allowing custom code to be instrumented without adding latency. Learn more about [DogStatsD][7].

[1]: /metrics/custom_metrics/dogstatsd_metrics_submission/#metrics
[2]: /tracing/guide/terminology/
[3]: /agent/configuration/network/#open-ports
[4]: /agent/configuration/network#configure-ports
[5]: /developers/custom_checks/write_agent_check/
[6]: https://github.com/etsy/statsd
[7]: /metrics/custom_metrics/dogstatsd_metrics_submission/
{{% /tab %}}
{{% tab "Agent v5" %}}

{{< img src="agent/agent5architecture.jpg" alt="Agent v5 アーキテクチャ" >}}

Agent 5 is composed of four major components, each written in Python and running as a separate process:

* **コレクター** (`agent.py`): コレクターは、現在のマシンで構成されている[インテグレーション][1]のチェックを実行し、メモリや CPU などのシステムメトリクスをキャプチャします。
* **DogStatsD** (`dogstatsd.py`): アプリケーションから[カスタムメトリクス][2]を送信できる StatsD 互換可能バックエンドサーバーです。
* **Forwarder** (`ddagent.py`): The forwarder retrieves data from both DogStatsD and the collector, queues it for submission, and then sends it to Datadog.
* **SupervisorD**: The collector, DogStatsD server, and forwarder are all controlled by a single supervisor process. The supervisor is kept separate to limit the overhead of each application if you aren't running all parts. However, it is generally recommended to run all parts.

**注**: Windows の場合、4 つの Agent プロセスはいずれも `ddagent.exe` インスタンスとして、`DevOps' best friend` という説明とともに表示されます。

### 監督、特権、ネットワークポート

A SupervisorD primary process runs as the `dd-agent` user, and all forked subprocesses run as the same user. This also applies to any system call (`iostat`/`netstat`) initiated by the Datadog Agent. The Agent configuration resides at `/etc/dd-agent/datadog.conf` and `/etc/dd-agent/conf.d`. All configuration must be readable by `dd-agent`. The recommended permissions are `0600`, since configuration files contain your API key and other credentials needed to access metrics.

操作のために次の[ポート][3]が開かれています。

| ポート      | 説明                         |
|-----------|-------------------------------------|
| tcp/17123 | フォワーダーの通常操作 |
| tcp/17124 | graphite サポート用のフォワーダー  |
| udp/8125  | DogStatsD                           |

All listening processes are bound by default to `127.0.0.1` and/or `::1` on Agent versions 3.4.1 or later. In earlier versions, they were bound to `0.0.0.0` (all interfaces). For information on running the Agent through a proxy, see [Agent proxy configuration][4]. For information on IP ranges to allow, see [Network Traffic][5].

ファイルディスクリプタを開く数は 1024 までにすることをお勧めします。この値は、コマンド `ulimit -a` で確認できます。Shell Fork Bomb Protection など、ハードウェアの制限でこの推奨値を下回る場合、たとえば `supervisord.conf` に次の内容を追加することが一解決方法として考えられます。

```conf
[supervisord]
minfds = 100 # ハードウェア制限
```

[1]: /integrations/
[2]: /metrics/custom_metrics/
[3]: /agent/configuration/network/?tab=agentv5v4#open-ports
[4]: /agent/configuration/proxy/?tab=agentv5
[5]: /agent/faq/network/
{{% /tab %}}
{{< /tabs >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}