---
algolia:
  tags:
  - ネットワークトラフィック
  - 送信先
  - ポート
  - データバッファリング
  - 静的 IP アドレス
aliases:
- /ja/account_management/faq/what-are-the-required-ip-s-and-ports-i-need-open-to-connect-to-the-datadog-service
- /ja/account_management/faq/can-i-whitelist-the-ip-addresses-for-data-coming-from-datadog-via-webhook-and-integrations
- /ja/agent/network
- /ja/agent/faq/network
- /ja/agent/guide/network
further_reading:
- link: /getting_started/site
  tag: ドキュメント
  text: Datadog サイトについて
- link: /logs/
  tag: ドキュメント
  text: ログの収集
- link: /infrastructure/process
  tag: ドキュメント
  text: プロセスの収集
- link: tracing
  tag: ドキュメント
  text: トレースの収集
title: ネットワークトラフィック
---

## 概要

<div class="alert alert-warning">
トラフィックは、常に Agent から Datadog の方向に開始されます。Datadog から Agent の方向にセッションが開始されることはありません。
</div>

すべての Agent トラフィックは SSL で送信されます。送信先は、Datadogのサービスとサイトに依存します。[Datadog サイト][11]に応じた送信先を確認するには、右側の `DATADOG SITE` セレクタをクリックします。

## 送信先

[APM][1]
: `trace.agent.`{{< region-param key="dd_site" code="true" >}}<br>
`instrumentation-telemetry-intake.`{{< region-param key="dd_site" code="true" >}}

[コンテナイメージ][13]
: `contimage-intake.`{{< region-param key="dd_site" code="true" >}}

[ライブコンテナ][3] & [ライブプロセス][4]
: `process.`{{< region-param key="dd_site" code="true" >}}

[ネットワークデバイスモニタリング][10]
: `ndm-intake.`{{< region-param key="dd_site" code="true" >}}<br>
`snmp-traps-intake.`{{< region-param key="dd_site" code="true" >}}<br>
`ndmflow-intake.`{{< region-param key="dd_site" code="true" >}}

[オーケストレーター][5]
: `orchestrator.`{{< region-param key="dd_site" code="true" >}}<br>
`contlcycle-intake.`{{< region-param key="dd_site" code="true" >}}

[プロファイリング][7]
: `intake.profile.`{{< region-param key="dd_site" code="true" >}}

[Real User Monitoring (RUM)][6]
: {{< region-param key="browser_sdk_endpoint_domain" code="true" >}}

[Synthetic モニタリングプライベートロケーション][8]
: Synthetics Worker v1.5.0 以降: `intake.synthetics.`{{< region-param key="dd_site" code="true" >}} は構成が必要な唯一のエンドポイントです。<br>
Synthetics Worker > v0.1.6 の API テスト結果: `intake.synthetics.`{{< region-param key="dd_site" code="true" >}}<br>
Synthetics Worker > v0.2.0 のブラウザテスト結果: `intake-v2.synthetics.`{{< region-param key="dd_site" code="true" >}}<br>
Synthetics Worker < v0.1.5 の API テスト結果: `api.`{{< region-param key="dd_site" code="true" >}}

{{% site-region region="us,eu,us3,us5,ap1" %}}

[Remote Configuration][101]
: `config.`{{< region-param key="dd_site" code="true" >}}

[Database Monitoring][102]
: `dbm-metrics-intake.`{{< region-param key="dd_site" code="true" >}}<br>
`dbquery-intake.`{{< region-param key="dd_site" code="true" >}}

[101]: /ja/agent/remote_config
[102]: /ja/database_monitoring/

{{% /site-region %}}

{{% site-region region="us" %}}
[Logs][200] & [HIPAA ログ][201]
: TCP: `agent-intake.logs.datadoghq.com`<br>
HTTP: `agent-http-intake.logs.datadoghq.com`<br>
その他: [ログのエンドポイント][203]を参照してください

[HIPAA ログレガシー][201]
: `tcp-encrypted-intake.logs.datadoghq.com`<br>
`lambda-tcp-encrypted-intake.logs.datadoghq.com`<br>
`gcp-encrypted-intake.logs.datadoghq.com`<br>
`http-encrypted-intake.logs.datadoghq.com`

[200]: /ja/logs/
[201]: /ja/data_security/logs/#hipaa-enabled-customers
[203]: /ja/logs/log_collection/#logging-endpoints
{{% /site-region %}}

{{% site-region region="eu" %}}
[Logs][200] & [HIPAA ログ][201]
: TCP: `agent-intake.logs.datadoghq.eu`<br>
HTTP: `agent-http-intake.logs.datadoghq.eu`<br>
その他: [ログのエンドポイント][202]を参照してください

[HIPAA ログレガシー][201]
: `tcp-encrypted-intake.logs.datadoghq.eu`<br>
`lambda-tcp-encrypted-intake.logs.datadoghq.eu`<br>
`gcp-encrypted-intake.logs.datadoghq.eu`<br>
`http-encrypted-intake.logs.datadoghq.eu`

[200]: /ja/logs/
[201]: /ja/data_security/logs/#hipaa-enabled-customers
[202]: /ja/logs/log_collection/#logging-endpoints
{{% /site-region %}}

{{% site-region region="us3" %}}
[Logs][200] & [HIPAA ログ][201]
: HTTP: `agent-http-intake.logs.us3.datadoghq.com`<br>
その他: [ログのエンドポイント][202]を参照してください

[HIPAA ログレガシー][201]
: `lambda-tcp-encrypted-intake.logs.us3.datadoghq.com`<br>
`gcp-encrypted-intake.logs.us3.datadoghq.com`<br>
`http-encrypted-intake.logs.us3.datadoghq.com`

[200]: /ja/logs/
[201]: /ja/data_security/logs/#hipaa-enabled-customers
[202]: /ja/logs/log_collection/#logging-endpoints
{{% /site-region %}}

{{% site-region region="us5" %}}
[Logs][200] & [HIPAA ログ][201]
: HTTP: `agent-http-intake.logs.us5.datadoghq.com`<br>
その他: [ログのエンドポイント][202]を参照してください

[HIPAA ログレガシー][201]
: `lambda-tcp-encrypted-intake.logs.us5.datadoghq.com`<br>
`gcp-encrypted-intake.logs.us5.datadoghq.com`<br>
`http-encrypted-intake.logs.us5.datadoghq.com`

[200]: /ja/logs/
[201]: /ja/data_security/logs/#hipaa-enabled-customers
[202]: /ja/logs/log_collection/#logging-endpoints
{{% /site-region %}}

{{% site-region region="ap1" %}}
[Logs][200] & [HIPAA ログ][201]
: HTTP: `agent-http-intake.logs.ap1.datadoghq.com`<br>
その他: [ログのエンドポイント][202]を参照してください

[200]: /ja/logs/
[201]: /ja/data_security/logs/#hipaa-enabled-customers
[202]: /ja/logs/log_collection/#logging-endpoints
{{% /site-region %}}

{{% site-region region="gov" %}}
[Logs][200] & [HIPAA ログ][201]
: HTTP: `agent-http-intake.logs.ddog-gov.com`<br>
その他: [ログのエンドポイント][202]を参照してください

[HIPAA ログレガシー][201]
: `lambda-tcp-encrypted-intake.logs.ddog-gov.com`<br>
`gcp-encrypted-intake.logs.ddog-gov.com`<br>
`http-encrypted-intake.logs.ddog-gov.com`

[200]: /ja/logs/
[201]: /ja/data_security/logs/#hipaa-enabled-customers
[202]: /ja/logs/log_collection/#logging-endpoints
{{% /site-region %}}

その他すべての Agent データ
: `<VERSION>-app.agent.`{{< region-param key="dd_site" code="true" >}}<br>
例えば、Agent の v7.31.0 は `7-31-0-app.agent.`{{< region-param key="dd_site" code="true" >}} にレポートします。ファイアウォールの包含リストに `*.agent.`{{< region-param key="dd_site" code="true" >}} を追加する必要があります。<br>
v6.1.0 以降、Agent は重要ではない機能 (たとえば、構成された API キーの有効性の表示など) を提供するために、Datadog の API にクエリを実行します:<br>
Agent v7.18.0 または 6.18.0 以降: `api.`{{< region-param key="dd_site" code="true" >}}<br>
Agent < v7.18.0 または 6.18.0: `app.`{{< region-param key="dd_site" code="true" >}}

[Agent フレア][12]
: `<VERSION>-flare.agent.`{{< region-param key="dd_site" code="true" >}}<br>
例えば、Agent v7.31.0 は、`7-31-0-flare.agent.`{{< region-param key="dd_site" code="true" >}} にフレアデータを送信します。ファイアウォールの包含リストに `*.agent.`{{< region-param key="dd_site" code="true" >}} を追加する必要があります。<br>

### 静的 IP アドレス

これらのドメインは、すべて一連の静的 IP アドレスを指す **CNAME** レコードです。このアドレスは、`https://ip-ranges.`{{< region-param key="dd_site" code="true" >}} から取得できます。

この情報は、次のスキーマに従って JSON として構造化されます。

{{< code-block lang="text" disable_copy="true" >}}
{
    "version": 1,                          // <-- この情報が変更されるたびにインクリメント
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
    "api": {...},                          // <-- Agent が重要でない機能 (API からの情報のクエリ) に使用する IP
    "apm": {...},                          // <-- Agent が Datadog に APM データを送信するために使用する IP
    "logs": {...},                         // <-- Agent が Datadog にログを送信するために使用する IP
    "process": {...},                      // <-- Agent が Datadog にプロセスデータを送信するために使用する IP
    "orchestrator": {...},                 // <-- Agent が Datadog にコンテナデータを送信するために使用する IP
    "remote-configuration": {...},         // <-- Agent が動的構成を取得するために使用する IP
    "synthetics": {...},                   // <-- Synthetic ワーカーが使用するソース IP (Agent は使用しない)
    "synthetics-private-locations": {...}, // <-- Synthetics プライベートロケーションのワーカーが Datadog にデータを送信するために使用する IP (Agent は使用しない)
    "webhooks": {...}                      // <-- Datadog が HTTP 経由でサードパーティのインフラストラクチャーに接続するために使用するソース IP (Agent は使用しない)
}
{{< /code-block >}}

各セクションには専用のエンドポイントがあります。例:

- TCP 経由でログデータを受信するために使用される IP の場合は `https://ip-ranges.{{< region-param key="dd_site" >}}/logs.json`。
- APM データの受信に使用される IP の場合は `https://ip-ranges.{{< region-param key="dd_site" >}}/apm.json`。

### 包含

これらの `ip-ranges` のすべてを包含リストに登録する必要があります。特定の時点では一部だけがアクティブですが、定期的なネットワーク操作や保守のために、セット全体の中で経時変化があります。

## ポートを開く

<div class="alert alert-warning">
すべてのアウトバウンドトラフィックは、TCP または UDP を介して SSL で送信されます。
<br><br>
ファイアウォールルールまたは同様のネットワーク制限を使用して、Agent がお客様のアプリケーションまたは信頼できるネットワークソースからのみアクセス可能であることを確認してください。信頼できないアクセスにより、悪意のある行為者は Datadog アカウントにトレースやメトリクスを書き込んだり、構成やサービスに関する情報を取得したりすることを含むがこれに限定されない、いくつかの侵入的なアクションを実行できるようになります。
</div>

**Agent** のすべての機能を利用するには、以下のポートを開きます。
{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

#### アウトバウンド

{{% site-region region="us" %}}

443/tcp
: 大半の Agent データ (メトリクス、APM、ライブプロセス、コンテナなど) 用のポート。

123/udp
: NTP 用のポート (詳細は、[NTP の重要性に関するドキュメント][1]を参照してください)。<br>
[デフォルトの NTP ターゲット][2]を参照してください。

8443/tcp
: [Custom Agent Autoscaling][5] のポート。

10516/tcp
:TCP 経由のログ収集用ポート。<br>
その他の接続タイプについては[ログのエンドポイント][3]を参照してください。

10255/tcp
: [Kubernetes HTTP Kubelet][4] 用のポート。

10250/tcp
: [Kubernetes HTTPS Kubelet][4] 用のポート。

[1]: /ja/agent/faq/network-time-protocol-ntp-offset-issues/
[2]: /ja/integrations/ntp/#overview
[3]: /ja/logs/log_collection/#logging-endpoints
[4]: /ja/agent/basic_agent_usage/kubernetes/
[5]: /ja/containers/guide/cluster_agent_autoscaling_metrics

{{% /site-region %}}

{{% site-region region="eu" %}}

443/tcp
: 大半の Agent データ (メトリクス、APM、ライブプロセス、コンテナなど) 用のポート。

123/udp
: NTP 用のポート (詳細は、[NTP の重要性に関するドキュメント][1]を参照してください)。<br>
[デフォルトの NTP ターゲット][2]を参照してください。

443/tcp
:TCP 経由のログ収集用ポート。<br>
その他の接続タイプについては[ログのエンドポイント][3]を参照してください。

10255/tcp
: [Kubernetes HTTP Kubelet][4] 用のポート。

10250/tcp
: [Kubernetes HTTPS Kubelet][4] 用のポート。

[1]: /ja/agent/faq/network-time-protocol-ntp-offset-issues/
[2]: /ja/integrations/ntp/#overview
[3]: /ja/logs/log_collection/#logging-endpoints
[4]: /ja/agent/basic_agent_usage/kubernetes/

{{% /site-region %}}

{{% site-region region="us3,us5,gov,ap1" %}}

443/tcp
: 大半の Agent データ (メトリクス、APM、ライブプロセス、コンテナなど) 用のポート。

123/udp
: NTP 用のポート (詳細は、[NTP の重要性に関するドキュメント][1]を参照してください)。<br>
[デフォルトの NTP ターゲット][2]を参照してください。

10255/tcp
: [Kubernetes HTTP Kubelet][4] 用のポート。

10250/tcp
: [Kubernetes HTTPS Kubelet][4] 用のポート。

[1]: /ja/agent/faq/network-time-protocol-ntp-offset-issues/
[2]: /ja/integrations/ntp/#overview
[3]: /ja/logs/log_collection/#logging-endpoints
[4]: /ja/agent/basic_agent_usage/kubernetes/

{{% /site-region %}}

#### インバウンド

Agent のサービスがホスト内のローカルで相互通信する場合にのみ使用されます。

5000/tcp
: [go_expvar server][1] 用のポート。

5001/tcp
: IPC API がリスニングするポート。

5002/tcp
: [Agent ブラウザ GUI][2] 用のポート。

5012/tcp
: APM [go_expvar server][1] 用のポート。

6062/tcp
: Process Agent のデバッグエンドポイント用のポート。

6162/tcp
: Process Agent のランタイム設定を構成するためのポート。

8125/udp
: DogStatsD 用のポート。ただし、`dogstatsd_non_local_traffic` が true に設定されていない場合。このポートは、次のローカルホストで利用できます: `127.0.0.1`、`::1`、`fe80::1`。

8126/tcp
: [APM レシーバー][3]用のポート

[1]: /ja/integrations/go_expvar/
[2]: /ja/agent/basic_agent_usage/#gui
[3]: /ja/tracing/
{{% /tab %}}
{{% tab "Agent v5 & v4" %}}

#### アウトバウンド

443/tcp
: 大半の Agent データ (メトリクス、APM、ライブプロセス、コンテナなど) 用のポート。

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
: [APM レシーバー][3]用のポート。

17123/tcp
: Agent Forwarder。Agent と Datadog の間でネットワークスプリットが発生した場合にトラフィックのバッファリングに使用されます。

17124/tcp
: オプションの graphite アダプター。

[1]: /ja/agent/faq/network-time-protocol-ntp-offset-issues/
[2]: /ja/integrations/ntp/#overview
[3]: /ja/tracing/
{{% /tab %}}
{{< /tabs >}}

## ポートの構成

デフォルトのポートがネットワーク上の既存のサービスによって既に使用されているため、インバウンドポートを変更する必要がある場合、`datadog.yaml` コンフィギュレーションファイルを編集してください。このファイルの **Advanced Configuration** セクションに、ほとんどのポートが記載されています。

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

<div class="alert alert-warning">ここで DogStatsD ポートや APM レシーバーポートの値を変更した場合、対応するポートの APM トレーシングライブラリの構成も変更する必要があります。ポートの構成に関する情報は<a href="/tracing/trace_collection/library_config/">お使いの言語のライブラリ構成のドキュメント</a>をご覧ください。</div>

## プロキシの使用

プロキシの設定に関する詳細な構成ガイドについては、[Agent プロキシ構成][9]を参照してください。

## データバッファリング

ネットワークが使用不可状態になった場合、Agent はメモリにメトリクスを保存します。
メトリクスを保存できる最大メモリ使用量は、構成設定の `forwarder_retry_queue_payloads_max_size` で定義します。この制限値に達すると、メトリクスが削除されます。

Agent の v7.27.0 以降では、メモリ制限に達した場合にディスクにメトリクスを保存することができます。`forwarder_storage_max_size_in_bytes` にストレージスペースの最大量 (バイト) を表す正の値を設定してこの機能を有効化します。Agent はこの値を使用してディスクにメトリクスを保存します。

メトリクスは `forwarder_storage_path` 設定で定義されたフォルダーに格納されます。デフォルトでは Unix システムの場合 `/opt/datadog-agent/run/transactions_to_retry`、Windows の場合 `C:\ProgramData\Datadog\run\transactions_to_retry` に保存されます。

ストレージスペースの不足を避けるために、ストレージスペースの使用量合計が 80 パーセント未満の場合のみ、Agent はメトリクスをディスクに保存します。この制限は `forwarder_storage_max_disk_ratio` 設定で定義されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/
[2]: /ja/database_monitoring/
[3]: /ja/infrastructure/livecontainers/
[4]: /ja/infrastructure/process/
[5]: /ja/infrastructure/containers/#kubernetes-orchestrator-explorer
[6]: /ja/real_user_monitoring/
[7]: /ja/profiler/
[8]: /ja/synthetics/private_locations
[9]: /ja/agent/configuration/proxy/
[10]: /ja/network_monitoring/devices
[11]: /ja/getting_started/site/
[12]: /ja/agent/troubleshooting/send_a_flare
[13]: /ja/infrastructure/containers/container_images