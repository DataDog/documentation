---
title: ネットワークトラフィック
kind: ガイド
aliases:
  - /ja/account_management/faq/what-are-the-required-ip-s-and-ports-i-need-open-to-connect-to-the-datadog-service
  - /ja/account_management/faq/can-i-whitelist-the-ip-addresses-for-data-coming-from-datadog-via-webhook-and-integrations
  - /ja/agent/network
  - /ja/agent/faq/network
further_reading:
  - link: logs/
    tag: Documentation
    text: ログの収集
  - link: /infrastructure/process
    tag: Documentation
    text: プロセスの収集
  - link: tracing
    tag: Documentation
    text: トレースの収集
---
<div class="alert alert-warning">
トラフィックは、常に Agent から Datadog の方向に開始されます。Datadog から Agent の方向にセッションが開始されることはありません。
</div>

## 概要

すべての Agent トラフィックは SSL で送信されます。送信先は、Datadogのサービスとサイトに依存します。サイトに応じた送信先を確認するには、右側の `SITE` セレクタをご利用ください。

## 送信先

[APM][1]
: `trace.agent.`{{< region-param key="dd_site" code="true" >}}

[ライブコンテナ][2] & [ライブプロセス][3]
: `process.`{{< region-param key="dd_site" code="true" >}}

[ログ][4] & [HIPAA ログ][5]
: TCP: `{{< region-param key="tcp_endpoint" code="true" >}}`<br>
HTTP: `{{< region-param key="http_endpoint" code="true" >}}`<br>
その他: [ログのエンドポイント][6]を参照

[HIPAA ログ (レガシー)][5]
: `tcp-encrypted-intake.logs.`{{< region-param key="dd_site" code="true" >}}<br>
`lambda-tcp-encrypted-intake.logs.`{{< region-param key="dd_site" code="true" >}}<br>
`gcp-encrypted-intake.logs.`{{< region-param key="dd_site" code="true" >}}<br>
`http-encrypted-intake.logs.`{{< region-param key="dd_site" code="true" >}}

[オーケストレーター][7]
: `orchestrator.`{{< region-param key="dd_site" code="true" >}}

[リアルユーザーモニタリング (RUM)][8]
: `rum-http-intake.logs.`{{< region-param key="dd_site" code="true" >}}

[プロファイリング][9]
: `intake.profile.`{{< region-param key="dd_site" code="true" >}}

[Synthetics プライベートロケーション][10]
: ワーカーのバージョン 1.5.0 以上 `intake.synthetics.`{{< region-param key="dd_site" code="true" >}} は構成に使用する唯一のエンドポイントです。<br>
Worker のバージョン 0.1.6 以降の API  テスト結果 `intake.synthetics.`{{< region-param key="dd_site" code="true" >}}<br>
Worker のバージョン 0.2.0 以降のブラウザテスト結果 `intake-v2.synthetics.`{{< region-param key="dd_site" code="true" >}}<br>
Worker のバージョン 0.1.5 以降の API テスト結果 `api.`{{< region-param key="dd_site" code="true" >}}

その他すべての Agent データ
: **Agents < 5.2.0** `app.`{{< region-param key="dd_site" code="true" >}}<br>
**Agents >= 5.2.0** `<VERSION>-app.agent.`{{< region-param key="dd_site" code="true" >}}<br>
これは POODLE の問題の後に決定されたものです。バージョン管理されたエンドポイントは Agent の v5.2.0から始まり、Agent の各バージョンは _Forwarder_ のバージョンに基づいて異なるエンドポイントを呼び出します。例えば、Agent の v5.2.0 は `5-2-0-app.agent.`{{< region-param key="dd_site" code="true" >}} を呼び出します。そのため、ファイアウォールの包含リストに `*.agent.`{{< region-param key="dd_site" code="true" >}} を追加する必要があります。<br>
v6.1.0 以降、Agent は Datadog の API にもクエリを実行、重要ではない機能（たとえば、構成された API キーの有効性の表示など）を提供します:<br>
**Agent >= 7.18.0/6.18.0** `api.`{{< region-param key="dd_site" code="true" >}}<br>
**Agent < 7.18.0/6.18.0** `app.`{{< region-param key="dd_site" code="true" >}}

これらのドメインは、一連の静的 IP アドレスを指す **CNAME** レコードです。このアドレスは、`https://ip-ranges.`{{< region-param key="dd_site" code="true" >}} から取得できます。

この情報は、次のスキーマに従って JSON として構造化されます。

{{< code-block lang="text" disable_copy="true" >}}
{
    "version": 1,                       // <-- incremented every time this information is changed
    "modified": "YYYY-MM-DD-HH-MM-SS",  // <-- timestamp of the last modification
    "agents": {                         // <-- the IPs used by the Agent to submit metrics to Datadog
        "prefixes_ipv4": [              // <-- list of IPv4 CIDR blocks
            "a.b.c.d/x",
            ...
        ],
        "prefixes_ipv6": [              // <-- list of IPv6 CIDR blocks
            ...
        ]
    },
    "api": {...},                       // <-- same for non-critical Agent functionality (querying information from API)
    "apm": {...},                       // <-- same structure as "agents" but IPs used for the APM Agent data
    "logs": {...},                      // <-- same for the logs Agent data
    "process": {...},                   // <-- same for the process Agent data
    "orchestrator": {...},              // <-- same for the process Agent data
    "synthetics": {...},                // <-- not used for Agent traffic (Datadog source IPs of bots for synthetic tests)
    "webhooks": {...}                   // <-- not used for Agent traffic (Datadog source IPs delivering webhooks)
}
{{< /code-block >}}

各セクションには専用のエンドポイントがあります。例:

- TCP 経由でログデータを受信するために使用される IP の場合は `https://ip-ranges.{{< region-param key="dd_site" >}}/logs.json`。
- APM データの受信に使用される IP の場合は `https://ip-ranges.{{< region-param key="dd_site" >}}/apm.json`。

### 包含

これらの `ip-ranges` のすべてを包含リストに登録する必要があります。特定時点では一部だけがアクティブですが、定期的なネットワーク操作や保守のために、セット全体の中で経時変化があります。

## ポートのオープン

<div class="alert alert-warning">
すべての送信トラフィックは、TCP / UDP を介して SSL で送信されます。
</div>

**Agent** のすべての機能を利用するには、以下のポートを開きます。

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

#### アウトバウンド

443/tcp
: 大半の Agent データ (メトリクス、APM、ライブプロセス/コンテナなど) 用のポート

123/udp
: NTP 用のポート (詳細は、[NTP の重要性に関するドキュメント][1]を参照してください)。

{{< region-param key="tcp_endpoint_port_ssl" >}}/tcp
:TCP 経由のログ収集用ポート。<br>
その他の接続タイプについては[ログのエンドポイント][2]を参照してください。

10255/tcp
: [Kubernetes HTTP Kubelet][3] 用のポート

10250/tcp
: [Kubernetes HTTPS Kubelet][3] 用のポート

#### インバウンド

Agent のサービスがホスト内のローカルで相互通信する場合にのみ使用されます。

5000/tcp
: [go_expvar server][4] 用のポート

5001/tcp
: IPC API がリスニングするポート

5002/tcp
: [Agent ブラウザ GUI][5] 用のポート

8125/udp
: DogStatsD 用のポート。ただし、`dogstatsd_non_local_traffic` が true に設定されていない場合。このポートは、次のローカルホストで利用できます: `127.0.0.1`、`::1`、`fe80::1`。

8126/tcp
: [APM Receiver][6] 用のポート

[1]: /ja/agent/faq/network-time-protocol-ntp-offset-issues/
[2]: /ja/logs/log_collection/#datadog-logs-endpoints
[3]: /ja/agent/basic_agent_usage/kubernetes/
[4]: /ja/integrations/go_expvar/
[5]: /ja/agent/basic_agent_usage/#gui
[6]: /ja/tracing/
{{% /tab %}}
{{% tab "Agent v5 & v4" %}}

#### アウトバウンド

443/tcp
: 大半の Agent データ (メトリクス、APM、ライブプロセス/コンテナなど) 用のポート

123/udp
: NTP 用のポート (詳細は、[NTP の重要性に関するドキュメント][1]を参照してください)。

#### インバウンド

8125/udp
: DogStatsD 用のポート。ただし、`dogstatsd_non_local_traffic` が true に設定されていない場合。このポートは、次のローカルホストで利用できます: `127.0.0.1`、`::1`、`fe80::1`。

8126/tcp
: [APM Receiver][2] 用のポート

17123/tcp
: Agent Forwarder。Agent と Datadog の間でネットワークスプリットが発生した場合にトラフィックのバッファリングに使用されます

17124/tcp
: オプションの graphite アダプター

[1]: /ja/agent/faq/network-time-protocol-ntp-offset-issues/
[2]: /ja/tracing/
{{% /tab %}}
{{< /tabs >}}

## プロキシの使用

プロキシ設定についての詳細なコンフィギュレーションガイドは、[Agent プロキシのコンフィギュレーション][11]を参照してください。

## データバッファリング

ネットワークが使用不可状態になった場合、Agent はメモリにメトリクスを保存します。
メトリクスを保存できる最大メモリ使用量は、コンフィギュレーション設定の `forwarder_retry_queue_payloads_max_size` で定義します。この制限値に達すると、メトリクスが削除されます。

Agent の v7.27.0 以降では、メモリ制限に達した場合にディスクにメトリクスを保存することができます。`forwarder_storage_max_size_in_bytes` にストレージスペースの最大量 (バイト) を表す正の値を設定してこの容量を有効化します。Agent はこの値を使用してディスクにメトリクスを保存します。

メトリクスは `forwarder_storage_path` 設定で定義されたフォルダーに格納されます。デフォルトでは Unix システムの場合 `/opt/datadog-agent/run/transactions_to_retry`、Windows の場合 `C:\ProgramData\Datadog\run\transactions_to_retry` に設定されています。

ストレージスペースの不足を避けるために、ストレージスペースの使用量合計が 95 パーセントを切った場合、Agent はメトリクスをディスクのみに保存します。この制限は `forwarder_storage_max_disk_ratio` 設定で定義されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/
[2]: /ja/infrastructure/livecontainers/
[3]: /ja/infrastructure/process/
[4]: /ja/logs/
[5]: /ja/security/logs/#hipaa-enabled-customers
[6]: /ja/logs/log_collection/#datadog-logs-endpoints
[7]: /ja/infrastructure/livecontainers/#kubernetes-resources-1
[8]: /ja/real_user_monitoring/
[9]: /ja/tracing/profiler/
[10]: /ja/synthetics/private_locations
[11]: /ja/agent/proxy/