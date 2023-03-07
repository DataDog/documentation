---
aliases:
- /ja/account_management/faq/what-are-the-required-ip-s-and-ports-i-need-open-to-connect-to-the-datadog-service
- /ja/account_management/faq/can-i-whitelist-the-ip-addresses-for-data-coming-from-datadog-via-webhook-and-integrations
- /ja/agent/network
- /ja/agent/faq/network
further_reading:
- link: /logs/
  tag: Documentation
  text: ログの収集
- link: /infrastructure/process
  tag: Documentation
  text: プロセスの収集
- link: tracing
  tag: Documentation
  text: トレースの収集
kind: ガイド
title: ネットワークトラフィック
---

<div class="alert alert-warning">
トラフィックは、常に Agent から Datadog の方向に開始されます。Datadog から Agent の方向にセッションが開始されることはありません。
</div>

## 概要

すべての Agent トラフィックは SSL で送信されます。送信先は、Datadogのサービスとサイトに依存します。サイトに応じた送信先を確認するには、右側の `SITE` セレクタをご利用ください。

## 送信先

[APM][1]
: `trace.agent.`{{< region-param key="dd_site" code="true" >}}

[ライブコンテナ][3] & [ライブプロセス][4]
: `process.`{{< region-param key="dd_site" code="true" >}}

[ネットワークデバイスモニタリング][10]
: `ndm-intake.`{{< region-param key="dd_site" code="true" >}}<br>
`snmp-traps-intake.`{{< region-param key="dd_site" code="true" >}}<br>
`ndmflow-intake.`{{< region-param key="dd_site" code="true" >}}


[オーケストレーター][5]
: `orchestrator.`{{< region-param key="dd_site" code="true" >}}

[プロファイリング][7]
: `intake.profile.`{{< region-param key="dd_site" code="true" >}}

[リアルユーザーモニタリング (RUM)][6]
: `rum.`{{< region-param key="browser_sdk_endpoint_domain" code="true" >}}<br>
`session-replay.`{{< region-param key="browser_sdk_endpoint_domain" code="true" >}}

[Synthetics プライベートロケーション][8]
: ワーカーのバージョン 1.5.0 以上 `intake.synthetics.`{{< region-param key="dd_site" code="true" >}} は構成に使用する唯一のエンドポイントです。<br>
Worker のバージョン 0.1.6 以降の API  テスト結果 `intake.synthetics.`{{< region-param key="dd_site" code="true" >}}<br>
Worker のバージョン 0.2.0 以降のブラウザテスト結果 `intake-v2.synthetics.`{{< region-param key="dd_site" code="true" >}}<br>
Worker のバージョン 0.1.5 以降の API テスト結果 `api.`{{< region-param key="dd_site" code="true" >}}

{{< site-region region="us,eu,us3,us5" >}}
[データベースモニタリング][2]
: `dbm-metrics-intake.`{{< region-param key="dd_site" code="true" >}}<br>
`dbquery-intake.`{{< region-param key="dd_site" code="true" >}}

[2]: /ja/database_monitoring/
{{< /site-region >}}

{{< site-region region="us" >}}

[ログ][1] & [HIPAA ログ][2]
: TCP: `agent-intake.logs.datadoghq.com`<br>
HTTP: `agent-http-intake.logs.datadoghq.com`<br>
その他: [ログのエンドポイント][3]を参照してください

[HIPAA ログレガシー][2]
: `tcp-encrypted-intake.logs.datadoghq.com`<br>
`lambda-tcp-encrypted-intake.logs.datadoghq.com`<br>
`gcp-encrypted-intake.logs.datadoghq.com`<br>
`http-encrypted-intake.logs.datadoghq.com`

[1]: /ja/logs/
[2]: /ja/data_security/logs/#hipaa-enabled-customers
[3]: /ja/logs/log_collection/#logging-endpoints

{{< /site-region >}}

{{< site-region region="eu" >}}

[ログ][1] & [HIPAA ログ][2]
: TCP: `agent-intake.logs.datadoghq.eu`<br>
HTTP: `agent-http-intake.logs.datadoghq.eu`<br>
その他: [ログのエンドポイント][3]を参照してください

[HIPAA ログレガシー][2]
: `tcp-encrypted-intake.logs.datadoghq.eu`<br>
`lambda-tcp-encrypted-intake.logs.datadoghq.eu`<br>
`gcp-encrypted-intake.logs.datadoghq.eu`<br>
`http-encrypted-intake.logs.datadoghq.eu`

[1]: /ja/logs/
[2]: /ja/data_security/logs/#hipaa-enabled-customers
[3]: /ja/logs/log_collection/#logging-endpoints

{{< /site-region >}}

{{< site-region region="us3" >}}

[ログ][1] & [HIPAA ログ][2]
: HTTP: `agent-http-intake.logs.us3.datadoghq.com`<br>
その他: [ログのエンドポイント][3]を参照してください

[HIPAA ログレガシー][2]
: `lambda-tcp-encrypted-intake.logs.us3.datadoghq.com`<br>
`gcp-encrypted-intake.logs.us3.datadoghq.com`<br>
`http-encrypted-intake.logs.us3.datadoghq.com`

[1]: /ja/logs/
[2]: /ja/data_security/logs/#hipaa-enabled-customers
[3]: /ja/logs/log_collection/#logging-endpoints

{{< /site-region >}}

{{< site-region region="us5" >}}

[ログ][1] & [HIPAA ログ][2]
: HTTP: `agent-http-intake.logs.us5.datadoghq.com`<br>
その他: [ログのエンドポイント][3]を参照してください

[HIPAA ログレガシー][2]
: `lambda-tcp-encrypted-intake.logs.us5.datadoghq.com`<br>
`gcp-encrypted-intake.logs.us5.datadoghq.com`<br>
`http-encrypted-intake.logs.us5.datadoghq.com`

[1]: /ja/logs/
[2]: /ja/data_security/logs/#hipaa-enabled-customers
[3]: /ja/logs/log_collection/#logging-endpoints

{{< /site-region >}}

{{< site-region region="gov" >}}

[ログ][1] & [HIPAA ログ][2]
: HTTP: `agent-http-intake.logs.ddog-gov.com`<br>
その他: [ログのエンドポイント][3]を参照してください

[HIPAA ログレガシー][2]
: `lambda-tcp-encrypted-intake.logs.ddog-gov.com`<br>
`gcp-encrypted-intake.logs.ddog-gov.com`<br>
`http-encrypted-intake.logs.ddog-gov.com`

[1]: /ja/logs/
[2]: /ja/data_security/logs/#hipaa-enabled-customers
[3]: /ja/logs/log_collection/#logging-endpoints

{{< /site-region >}}

その他すべての Agent データ
: `<VERSION>-app.agent.`{{< region-param key="dd_site" code="true" >}}<br>
例えば、Agent の v7.31.0 は `7-31-0-app.agent.`{{< region-param key="dd_site" code="true" >}} にレポートします。そのため、ファイアウォールの包含リストに `*.agent.`{{< region-param key="dd_site" code="true" >}} を追加する必要があります。<br>
v6.1.0 以降、Agent は Datadog の API にもクエリを実行、重要ではない機能 (たとえば、構成された API キーの有効性の表示など) を提供します:<br>
**Agent >= 7.18.0/6.18.0** `api.`{{< region-param key="dd_site" code="true" >}}<br>
**Agent < 7.18.0/6.18.0** `app.`{{< region-param key="dd_site" code="true" >}}

これらのドメインは、一連の静的 IP アドレスを指す **CNAME** レコードです。このアドレスは、`https://ip-ranges.`{{< region-param key="dd_site" code="true" >}} から取得できます。

この情報は、次のスキーマに従って JSON として構造化されます。

{{< code-block lang="text" disable_copy="true" >}}
{
    "version": 1,                          // <-- この情報が変更される場合に毎回インクリメント
    "modified": "YYYY-MM-DD-HH-MM-SS",     // <-- 最終更新時のタイムスタンプ
    "agents": {                            // <-- Agent から Datadog へのメトリクス送信に用いる IP
        "prefixes_ipv4": [                 // <-- IPv4 CIDR ブロックのリスト
            "a.b.c.d/x",
            ...
        ],
        "prefixes_ipv6": [                 // <-- IPv6 CIDR ブロックのリスト
            ...
        ]
    },
    "api": {...},                          // <-- 重要でない Agent 機能と同様 (API からの情報のクエリ)
    "apm": {...},                          // <-- APM Agent データに使用される IP ("agents" と同構造)
    "logs": {...},                         // <-- Agent データのログと同様
    "process": {...},                      // <-- Agent データのプロセスと同様
    "orchestrator": {...},                 // <-- Agent データのプロセスと同様
    "synthetics": {...},                   // <-- Agent のトラフィックでは不使用 (Synthetic テストのためのボットの Datadog ソース IP)
    "synthetics-private-locations": {...}, // <-- Agent のトラフィックでは不使用 (Synthetics プライベートロケーションのための Datadog 取り込み IP)
    "webhooks": {...}                      // <-- Agent のトラフィックでは不使用 (webhook を送信する Datadog のソース IP)
}
{{< /code-block >}}

各セクションには専用のエンドポイントがあります。例:

- TCP 経由でログデータを受信するために使用される IP の場合は `https://ip-ranges.{{< region-param key="dd_site" >}}/logs.json`。
- APM データの受信に使用される IP の場合は `https://ip-ranges.{{< region-param key="dd_site" >}}/apm.json`。

### 包含

これらの `ip-ranges` のすべてを包含リストに登録する必要があります。特定時点では一部だけがアクティブですが、定期的なネットワーク操作や保守のために、セット全体の中で経時変化があります。

## ポートのオープン

<div class="alert alert-warning">
すべてのアウトバウンドトラフィックは、TCP / UDP を介して SSL で送信されます。
<br><br>
ファイアウォールルールまたは同様のネットワーク制限を使用して、Agent がお客様のアプリケーションまたは信頼できるネットワークソースからのみアクセス可能であることを確認してください。信頼できないアクセスにより、悪意のある行為者は Datadog アカウントにトレースやメトリクスを書き込んだり、構成やサービスに関する情報を取得したりすることを含むがこれに限定されない、いくつかの侵略的なアクションを実行できるようになります。
</div>

**Agent** のすべての機能を利用するには、以下のポートを開きます。
{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

#### アウトバウンド

{{< site-region region="us" >}}

443/tcp
: 大半の Agent データ (メトリクス、APM、ライブプロセス/コンテナなど) 用のポート

123/udp
: NTP 用のポート (詳細は、[NTP の重要性に関するドキュメント][1]を参照してください)。<br>
[デフォルトの NTP ターゲット][2]を参照してください。

10516/tcp
:TCP 経由のログ収集用ポート。<br>
その他の接続タイプについては[ログのエンドポイント][3]を参照してください。

10255/tcp
: [Kubernetes HTTP Kubelet][4] 用のポート

10250/tcp
: [Kubernetes HTTPS Kubelet][4] 用のポート

[1]: /ja/agent/faq/network-time-protocol-ntp-offset-issues/
[2]: /ja/integrations/ntp/#overview
[3]: /ja/logs/log_collection/#logging-endpoints
[4]: /ja/agent/basic_agent_usage/kubernetes/

{{< /site-region >}}

{{< site-region region="eu" >}}

443/tcp
: 大半の Agent データ (メトリクス、APM、ライブプロセス/コンテナなど) 用のポート

123/udp
: NTP 用のポート (詳細は、[NTP の重要性に関するドキュメント][1]を参照してください)。<br>
[デフォルトの NTP ターゲット][2]を参照してください。

443/tcp
:TCP 経由のログ収集用ポート。<br>
その他の接続タイプについては[ログのエンドポイント][3]を参照してください。

10255/tcp
: [Kubernetes HTTP Kubelet][4] 用のポート

10250/tcp
: [Kubernetes HTTPS Kubelet][4] 用のポート

[1]: /ja/agent/faq/network-time-protocol-ntp-offset-issues/
[2]: /ja/integrations/ntp/#overview
[3]: /ja/logs/log_collection/#logging-endpoints
[4]: /ja/agent/basic_agent_usage/kubernetes/

{{< /site-region >}}

{{< site-region region="us3,us5,gov" >}}

443/tcp
: 大半の Agent データ (メトリクス、APM、ライブプロセス/コンテナなど) 用のポート

123/udp
: NTP 用のポート (詳細は、[NTP の重要性に関するドキュメント][1]を参照してください)。<br>
[デフォルトの NTP ターゲット][2]を参照してください。

10255/tcp
: [Kubernetes HTTP Kubelet][4] 用のポート

10250/tcp
: [Kubernetes HTTPS Kubelet][4] 用のポート

[1]: /ja/agent/faq/network-time-protocol-ntp-offset-issues/
[2]: /ja/integrations/ntp/#overview
[3]: /ja/logs/log_collection/#logging-endpoints
[4]: /ja/agent/basic_agent_usage/kubernetes/

{{< /site-region >}}

#### インバウンド

Agent のサービスがホスト内のローカルで相互通信する場合にのみ使用されます。

5000/tcp
: [go_expvar server][1] 用のポート

5001/tcp
: IPC API がリスニングするポート

5002/tcp
: [Agent ブラウザ GUI][2] 用のポート

6062/tcp
: Process Agent のデバッグエンドポイント用のポート。

6162/tcp
: Process Agent のランタイム設定を構成するためのポート。

8125/udp
: DogStatsD 用のポート。ただし、`dogstatsd_non_local_traffic` が true に設定されていない場合。このポートは、次のローカルホストで利用できます: `127.0.0.1`、`::1`、`fe80::1`。

8126/tcp
: [APM Receiver][3] 用のポート

[1]: /ja/integrations/go_expvar/
[2]: /ja/agent/basic_agent_usage/#gui
[3]: /ja/tracing/
{{% /tab %}}
{{% tab "Agent v5 & v4" %}}

#### アウトバウンド

443/tcp
: 大半の Agent データ (メトリクス、APM、ライブプロセス/コンテナなど) 用のポート

123/udp
: NTP 用のポート (詳細は、[NTP の重要性に関するドキュメント][1]を参照してください)。<br>
[デフォルトの NTP ターゲット][2]を参照してください。

#### インバウンド

6062/tcp
: Process Agent のデバッグエンドポイント用のポート。

6162/tcp
: Process Agent のランタイム設定を構成するためのポート。

8125/udp
: DogStatsD 用のポート。ただし、`dogstatsd_non_local_traffic` が true に設定されていない場合。このポートは、次のローカルホストで利用できます: `127.0.0.1`、`::1`、`fe80::1`。

8126/tcp
: [APM Receiver][3] 用のポート

17123/tcp
: Agent Forwarder。Agent と Datadog の間でネットワークスプリットが発生した場合にトラフィックのバッファリングに使用されます

17124/tcp
: オプションの graphite アダプター

[1]: /ja/agent/faq/network-time-protocol-ntp-offset-issues/
[2]: /ja/integrations/ntp/#overview
[3]: /ja/tracing/
{{% /tab %}}
{{< /tabs >}}

## ポートの構成

デフォルトのポートがネットワーク上の既存のサービスによって既に使用されているため、インバウンドポートを変更する必要がある場合、`datadog.yaml`コンフィギュレーションファイルを編集してください。このファイルの **Advanced Configuration** セクションに、ほとんどのポートが記載されています。

{{< code-block lang="yaml" filename="datadog.yaml" disable_copy="true" collapsible="true" >}}
## @param expvar_port - 整数 - オプション - デフォルト: 5000
## @env DD_EXPVAR_PORT - 整数 - オプション - デフォルト: 5000
## go_expvar サーバーのポート。
#
# expvar_port: 5000

## @param cmd_port - 整数 - オプション - デフォルト: 5001
## @env DD_CMD_PORT - 整数 - オプション - デフォルト: 5001
## IPC api がリッスンするポート。
#
# cmd_port: 5001

## @param GUI_port - 整数 - オプション
## @env DD_GUI_PORT - 整数 - オプション
## ブラウザ GUI を提供するためのポート。
## 'GUI_port: -1' を設定すると、GUI が完全にオフになります
## デフォルト:
##  * Windows & macOS : `5002`
##  * Linux: `-1`
##
#
# GUI_port: <GUI_PORT>

{{< /code-block >}}

APM レシーバーと DogStatsD ポートは、それぞれ `datadog.yaml` コンフィギュレーションファイルの **Trace Collection Configuration** と**DogStatsD Configuration** セクションに配置されています。

{{< code-block lang="yaml" filename="datadog.yaml" disable_copy="true" collapsible="true" >}}
## @param dogstatsd_port - 整数 - オプション - デフォルト: 8125
## @env DD_DOGSTATSD_PORT - 整数 - オプション - デフォルト: 8125
## Agent DogStatsD ポートをオーバーライドします。
## 注: クライアントが同じ UDP ポートに送信していることを確認してください。
#
# dogstatsd_port: 8125

[...]

## @param receiver_port - 整数 - オプション - デフォルト: 8126
## @env DD_APM_RECEIVER_PORT - 整数 - オプション - デフォルト: 8126
## トレースレシーバーがリッスンするポート。
## 0 を設定すると、HTTP レシーバーが無効になります。
#
# receiver_port: 8126
{{< /code-block >}}

<div class="alert alert-warning">ここで DogStatsD ポートや APM レシーバーポートの値を変更した場合、対応するポートの APM トレーシングライブラリの構成も変更する必要があります。<a href="/tracing/trace_collection/library_config/">お使いの言語のライブラリ構成のドキュメント</a>にあるポートの構成に関する情報をご覧ください。</div>

## プロキシの使用

プロキシの設定に関する詳細なコンフィギュレーションガイドについては、[Agent プロキシコンフィギュレーション][9]を参照してください。

## データバッファリング

ネットワークが使用不可状態になった場合、Agent はメモリにメトリクスを保存します。
メトリクスを保存できる最大メモリ使用量は、コンフィギュレーション設定の `forwarder_retry_queue_payloads_max_size` で定義します。この制限値に達すると、メトリクスが削除されます。

Agent の v7.27.0 以降では、メモリ制限に達した場合にディスクにメトリクスを保存することができます。`forwarder_storage_max_size_in_bytes` にストレージスペースの最大量 (バイト) を表す正の値を設定してこの容量を有効化します。Agent はこの値を使用してディスクにメトリクスを保存します。

メトリクスは `forwarder_storage_path` 設定で定義されたフォルダーに格納されます。デフォルトでは Unix システムの場合 `/opt/datadog-agent/run/transactions_to_retry`、Windows の場合 `C:\ProgramData\Datadog\run\transactions_to_retry` に設定されています。

ストレージスペースの不足を避けるために、ストレージスペースの使用量合計が95パーセント未満の場合のみAgentはメトリクスをディスクに保存します。この制限は `forwarder_storage_max_disk_ratio` 設定で定義されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/
[2]: /ja/database_monitoring/
[3]: /ja/infrastructure/livecontainers/
[4]: /ja/infrastructure/process/
[5]: /ja/infrastructure/livecontainers/#kubernetes-resources-1
[6]: /ja/real_user_monitoring/
[7]: /ja/profiler/
[8]: /ja/synthetics/private_locations
[9]: /ja/agent/proxy/
[10]: /ja/network_monitoring/devices