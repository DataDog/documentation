---
algolia:
  tags:
  - network traffic
  - destinations
  - ports
  - data buffering
  - static IP addresses
aliases:
- /ja/account_management/faq/what-are-the-required-ip-s-and-ports-i-need-open-to-connect-to-the-datadog-service
- /ja/account_management/faq/can-i-whitelist-the-ip-addresses-for-data-coming-from-datadog-via-webhook-and-integrations
- /ja/agent/network
- /ja/agent/faq/network
- /ja/agent/guide/network
further_reading:
- link: /getting_started/site
  tag: Documentation
  text: Datadog サイトについて
- link: /logs/
  tag: Documentation
  text: ログの収集
- link: /infrastructure/process
  tag: Documentation
  text: プロセスの収集
- link: tracing
  tag: Documentation
  text: トレースの収集
title: ネットワークトラフィック
---
## 概要

<div class="alert alert-danger">
トラフィックは常に Agent から Datadog に対して開始されます。Datadog から Agent に対してセッションが開始されることはありません。
</div>

すべての Agent トラフィックは SSL で送信されます。送信先は Datadog サービスとサイトにより異なります。使用している [Datadog サイト][11]の送信先を確認するには、右側の `DATADOG SITE` セレクタをクリックしてください。

## インストール

Agent のインストールを許可するために、下記のドメインを含めるリストに追加してください。

 `install.datadoghq.com`
 `yum.datadoghq.com`
 `keys.datadoghq.com`
 `apt.datadoghq.com`
 `windowsagent.datadoghq.com`

## 送信先
<div class="alert alert-warning">
バージョン 7.67.0 以降、Agent は Datadog サイトを完全修飾ドメイン名に変換し (ドメインの末尾にドットを追加することによって)、DNS クエリの数を減らすようにしています。
たとえば、APM ペイロードを <code>trace.agent.datadoghq.com.</code> に送信します。<br>
バージョン 7.72.0 以降でこの動作を婿にするには、構成で <code>convert_dd_site_fqdn.enabled</code> を <code>false</code> に設定します。または環境変数 <code>DD_CONVERT_DD_SITE_FQDN_ENABLED=false</code> を使用しても可能です。
</div>

[APM][1]
: `trace.agent.`{{< region-param key="dd_site" code="true" >}}<br>
`instrumentationtelemetryintake.`{{< region-param key="dd_site" code="true" >}}

[LLM 可観測性][23]
: `llmobsintake.`{{< region-param key="dd_site" code="true" >}}

[コンテナイメージ][13]
: `contimageintake.`{{< region-param key="dd_site" code="true" >}}

[ライブコンテナ][3]、[ライブプロセス][4]、[Cloud Network Monitoring][24]、[Universal Service Monitoring][25]
: `process.`{{< region-param key="dd_site" code="true" >}}

[Network Device Monitoring][10]
: `ndmintake.`{{< region-param key="dd_site" code="true" >}}<br>
`snmptrapsintake.`{{< region-param key="dd_site" code="true" >}}<br>
`ndmflowintake.`{{< region-param key="dd_site" code="true" >}}

[Network Path][14]
: `netpathintake.`{{< region-param key="dd_site" code="true" >}}

[Orchestrator][5]
: `orchestrator.`{{< region-param key="dd_site" code="true" >}}<br>
`contlcycleintake.`{{< region-param key="dd_site" code="true" >}}

[プロファイリング][7]
: `intake.profile.`{{< region-param key="dd_site" code="true" >}}

[Real User Monitoring (RUM)][6]
:{{< region-param key="browser_sdk_endpoint_domain" code="true" >}}

[Cloud Security の脆弱性][29]
: `sbomintake.`{{< region-param key="dd_site" code="true" >}}

[Synthetic Monitoring プライベートロケーション][8]
: Synthetics Worker v1.5.0 以降: `intake.synthetics.`{{< region-param key="dd_site" code="true" >}} は、設定する必要がある唯一のエンドポイントです。<br>
Synthetics Worker > v0.1.6 の API テスト結果: `intake.synthetics.`{{< region-param key="dd_site" code="true" >}}<br>
Synthetics Worker > v0.2.0 のブラウザテスト結果: `intakev2.synthetics.`{{< region-param key="dd_site" code="true" >}}<br>
Synthetics Worker &lt; v0.1.5 の API テスト結果: `api.`{{< region-param key="dd_site" code="true" >}}

{{% site-region region="us,eu,us3,us5,ap1,ap2" %}}

[Remote Configuration][101]
: `config.`{{< region-param key="dd_site" code="true" >}}

[Database Monitoring][102]
: `dbmmetricsintake.`{{< region-param key="dd_site" code="true" >}}<br>
`dbqueryintake.`{{< region-param key="dd_site" code="true" >}}

[101]: /ja/remote_configuration
[102]: /ja/database_monitoring/

{{% /site-region %}}

{{% logs-tcp-disclaimer %}}

[ログ][30] &amp; [HIPAA ログ][31]
: (非推奨) TCP:{{< region-param key=tcp_endpoint code="true" >}}<br>
HTTP:{{< region-param key=agent_http_endpoint code="true" >}}<br>
その他: [ログエンドポイント][32] を参照してください。

[HIPAA ログレガシー][31] (非推奨、TCP はサポートされていません)
:{{< region-param key=hipaa_logs_legacy code="true" >}}

[メトリクス][26]、[サービスチェック][27]、[イベント][28]、およびその他の Agent メタデータ
: `<VERSION>app.agent.`{{< region-param key="dd_site" code="true" >}}<br>
たとえば、Agent v7.31.0 は `7310app.agent.` に報告します。{{< region-param key="dd_site" code="true" >}}. `*.agent.` をファイアウォールのインクルージョンリストに追加する必要があります。{{< region-param key="dd_site" code="true" >}} <br>
v6.1.0 以降、Agent は Datadog の API にもクエリを実行し、重要ではない機能 (例: 構成された API キーの有効性の表示) を提供します。<br>
Agent v7.18.0 または 6.18.0 以降: `api.`{{< region-param key="dd_site" code="true" >}}<br>
Agent &lt; v7.18.0 または 6.18.0: `app.`{{< region-param key="dd_site" code="true" >}}

[Agent フレア][12]
: `<VERSION>flare.agent.`{{< region-param key="dd_site" code="true" >}}<br>
たとえば、Agent v7.31.0 は `7310flare.agent.` にフレアデータを送信します。{{< region-param key="dd_site" code="true" >}}. `*.agent.` をファイアウォールのインクルージョンリストに追加する必要があります。{{< region-param key="dd_site" code="true" >}} <br>

### 静的 IP アドレス

これらのドメインはすべて、**CNAME** レコードであり、一連の静的 IP アドレスを指しています。これらのアドレスは `https://ipranges.` で見つけることができます{{< region-param key="dd_site" code="true" >}}。

この情報は、次のスキーマに従って JSON として構造化されます。

{{< code-block lang="text" disable_copy="true" >}}
{
    "version": 1,                          // <-- incremented every time this information is changed
    "modified": "YYYY-MM-DD-HH-MM-SS",     // <-- timestamp of the last modification
    "agents": {                            // <-- the IPs used by the Agent to submit metrics to Datadog
        "prefixes_ipv4": [                 // <-- list of IPv4 CIDR blocks
            "a.b.c.d/x",
            ...
        ],
        "prefixes_ipv6": [                 // <-- list of IPv6 CIDR blocks
            ...
        ]
    },
    "api": {...},                          // <-- the IPs used by the Agent for non-critical functionality (querying information from API)
    "apm": {...},                          // <-- the IPs used by the Agent to submit APM data to Datadog
    "logs": {...},                         // <-- the IPs used by the Agent to submit logs to Datadog
    "process": {...},                      // <-- the IPs used by the Agent to submit process data to Datadog
    "orchestrator": {...},                 // <-- the IPs used by the Agent to submit container data to Datadog
    "remote-configuration": {...},         // <-- the IPs used by the Agent to retrieve its dynamic configuration
    "synthetics": {...},                   // <-- the source IPs used by Synthetic workers (not used by the Agent)
    "synthetics-private-locations": {...}, // <-- the IPs used by Synthetics Private Locations workers to submit data to Datadog (not used by the Agent)
    "webhooks": {...}                      // <-- the source IPs used by Datadog to connect to 3rd party infrastructure over HTTP (not used by the Agent)
}
{{< /code-block >}}

各セクションには専用のエンドポイントがあります。例:

 `https://ipranges.{{< region-param key="dd_site" >}}/logs.json` は、TCP 経由でログデータを受信するために使用される IP のためのものです。
`https://ipranges.{{< region-param key="dd_site" >}}/apm.json` は、APM データを受信するために使用される IP のためのものです。

### インクルージョン

すべての `ipranges` をインクルージョンリストに追加してください。特定の時点ではサブセットだけがアクティブですが、定期的なネットワーク操作や保守のために、セット全体の中では時間が経つとバリエーションがでてきます。

## オープンポート

<div class="alert alert-danger">
すべてのアウトバウンドトラフィックは、TCP または UDP を介して SSL 経由で送信されます。
<br><br>
ファイアウォールルールや同様のネットワーク制限を使用して、Agent があなたのアプリケーションや信頼できるネットワークソースからのみアクセスできることを確認してください。信頼できないアクセスは、悪意のある行為者が侵入的な行動を行うことを許してしまう可能性があります。これには、あなたの Datadog アカウントにトレースやメトリクスを書き込むことや、あなたの構成やサービスに関する情報を取得することが含まれますが、これに限定されません。
</div>

**Agent** のすべての機能を利用するには、下記のポートを開いてください。

#### アウトバウンド

{{% site-region region="us,eu" %}}

| 製品/機能                                                                                                                                                    | ポート                                           | プロトコル         | 説明                                                                                                                                                                                 |
|  |  |  |  |
| Agent<br>APM<br>Containers<br>Live Processes<br>Metrics<br>Cloud Network Monitoring<br>Universal Service Monitoring                                                      | 443                                            | TCP              | ほとんどの Agent データはポート 443 を使用します。                                                                                                                                                              |
| [カスタム Agent オートスケーリング][22]                                                                                                                                           | 8443                                           | TCP              |                                                                                                                                                                                             |
| ログ収集                                                                                                                                                           |{{< region-param key=web_integrations_port >}} | (非推奨) TCP | TCP 経由のログ記録。<br>**注**: TCP ログ収集は**サポートされていません**。Datadog は、TCP の使用で**配信や信頼性を保証していません**。ログデータは予告なく失われる可能性があります。信頼性のある取り込みにするために、HTTP インテークエンドポイント、公式の Datadog Agent、または代わりにフォワーダーインテグレーションを使用してください。他の接続タイプについては、[ログエンドポイント][21]を参照してください。|
| NTP                                                                                                                                                                      | 123                                            | UDP              | Network Time Protocol (NTP).[デフォルトの NTP ターゲット][20]を参照してください。<br>NTP のトラブルシューティングに関する情報は、[NTP の問題][19]を参照してください。                                                               |

[19]: /ja/agent/faq/networktimeprotocolntpoffsetissues/
[20]: /ja/integrations/ntp/#overview
[21]: /ja/logs/log_collection/#loggingendpoints
[22]: /ja/containers/guide/cluster_agent_autoscaling_metrics

{{% /site-region %}}

{{% site-region region="us3,us5,gov,ap1,ap2" %}}

| 製品/機能                                                                                               | ポート | プロトコル | 説明                                                                                                                  |
|  |  |  |  |
| Agent<br>APM<br>Containers<br>Live Processes<br>Metrics<br>Cloud Network Monitoring<br>Universal Service Monitoring | 443  | TCP      | ほとんどの Agent データはポート 443 を使用します。                                                                                               |
| NTP                                                                                                                 | 123  | UDP      | Network Time Protocol (NTP)。[デフォルトの NTP ターゲット][20]を参照してください。<br>NTP のトラブルシューティングに関する情報は、[NTP の問題][19]を参照してください。|

[19]: /ja/agent/faq/networktimeprotocolntpoffsetissues/
[20]: /ja/integrations/ntp/#overview

{{% /site-region %}}

#### インバウンド

Agent のサービスがホスト内のローカルで相互に通信する場合にのみ使用されます。

| 製品/機能        | ポート | プロトコル | 説明                                                                                                                    |
|  |  |  |  |
| [Agent ブラウザGUI][16]      | 5002 | TCP      |                                                                                                                                |
| APM レシーバー                 | 8126 | TCP      | トレーシングとプロファイラーを含みます。                                                                                            |
| [DogStatsD][18]              | 8125 | UDP      | DogStatsD 用のポート、ただし `dogstatsd_non_local_traffic` が true に設定されている場合は除く。このポートは IPv4 ローカルホストで利用可能です: `127.0.0.1`。|
| go_expvar サーバー (APM)       | 5012 | TCP      | 詳細については、[go_expar インテグレーションのドキュメント][15]を参照してください。                                                       |
| go_expvar インテグレーションサーバー | 5000 | TCP      | 詳細については、[go_expar インテグレーションのドキュメント][15]を参照してください。                                                       |
| IPC API                      | 5001 | TCP      | プロセス間通信 (IPC) に使用されるポート。                                                                              |
| Process Agent のデバッグ          | 6062 | TCP      | Process Agent のデバッグエンドポイント。                                                                                        |
| Process Agent ランタイム        | 6162 | TCP      | Process Agent のランタイム構成。                                                                         |

## ポートの構成

既存のサービスがネットワーク上でデフォルトポートを使用しているために、受信ポートを変更する必要がある場合は、`datadog.yaml` 構成ファイルを編集します。ほとんどのポートは、このファイルの **Advanced Configuration** セクションにあります:

{{< code-block lang="yaml" filename="datadog.yaml" disable_copy="true" collapsible="true" >}}
## @param expvar_port - integer - optional - default: 5000
## @env DD_EXPVAR_PORT - integer - optional - default: 5000
## The port for the go_expvar server.
#
# expvar_port: 5000

## @param cmd_port - integer - optional - default: 5001
## @env DD_CMD_PORT - integer - optional - default: 5001
## The port on which the IPC api listens.
#
# cmd_port: 5001

## @param GUI_port - integer - optional
## @env DD_GUI_PORT - integer - optional
## The port for the browser GUI to be served.
## Setting 'GUI_port: -1' turns off the GUI completely
## Default is:
##  * Windows & macOS : `5002`
##  * Linux: `-1`
##
#
# GUI_port: <GUI_PORT>

{{< /code-block >}}

APM レシーバーと DogStatsD のポートは、`datadog.yaml` 構成ファイルの、それぞれ **Trace Collection Configuration** セクションと **DogStatsD Configuration** セクションにあります。

{{< code-block lang="yaml" filename="datadog.yaml" disable_copy="true" collapsible="true" >}}
## @param dogstatsd_port - integer - optional - default: 8125
## @env DD_DOGSTATSD_PORT - integer - optional - default: 8125
## Override the Agent DogStatsD port.
## Note: Make sure your client is sending to the same UDP port.
#
# dogstatsd_port: 8125

[...]

## @param receiver_port - integer - optional - default: 8126
## @env DD_APM_RECEIVER_PORT - integer - optional - default: 8126
## The port that the trace receiver should listen on.
## Set to 0 to disable the HTTP receiver.
#
# receiver_port: 8126
{{< /code-block >}}

<div class="alert alert-danger">ここで DogStatsD ポートまたは APM レシーバーポートの値を変更した場合は、対応するポートの APM トレースライブラリ構成も変更する必要があります。ポートの構成に関する情報は、<a href="/tracing/trace_collection/library_config/">お使いの言語のライブラリ構成ドキュメント</a>を参照してください。</div>

## プロキシの使用

プロキシの設定に関する詳細な構成ガイドについては、[Agent プロキシ構成][9]を参照してください。

## データバッファリング

ネットワークが利用できなくなると、Agent はメトリクスをメモリに保存します。
メトリクスを保存するための最大メモリ使用量は、`forwarder_retry_queue_payloads_max_size` 構成の設定によって定義されます。この制限に達すると、メトリクスは破棄されます。

Agent の v7.27.0 以降では、メモリ制限に達した場合にディスクにメトリクスを保存します。この機能を有効にするには、`forwarder_storage_max_size_in_bytes` に、Agent がディスクにメトリクスを保存するために使用できる最大ストレージスペース (バイト単位) を示す正の値を設定してください。

メトリクスは、`forwarder_storage_path` 設定で定義されたフォルダーに保存されます。デフォルトでは、Unix システムでは `/opt/datadog-agent/run/transactions_to_retry`、Windows では `C:\ProgramData\Datadog\run\transactions_to_retry` になっています。

ストレージスペースが不足しないように、Agent は使用されている総ストレージスペースが 80 パーセント未満の場合にのみメトリクスをディスクに保存します。この制限は `forwarder_storage_max_disk_ratio` 設定によって定義されます。

## Datadog Operator のインストール

限られた接続性を持つ Kubernetes 環境に Datadog Operator をインストールする場合は、レジストリに基づいて TCP ポート 443 の下記のエンドポイントを許可リストに追加する必要があります:

 `registry.datadoghq.com` (Datadog コンテナレジストリ)
   `usdocker.pkg.dev/datadogprod/publicimages` (`registry.datadoghq.com` からリダイレクトを受け取る可能性があります)
 `gcr.io/datadoghq` (GCR US)
 `eu.gcr.io/datadoghq` (GCR ヨーロッパ)
 `asia.gcr.io/datadoghq` (GCR アジア)
 `datadoghq.azurecr.io` (Azure)
 `public.ecr.aws/datadog` (AWS)
 `docker.io/datadog` (DockerHub)


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/
[2]: /ja/database_monitoring/
[3]: /ja/infrastructure/livecontainers/
[4]: /ja/infrastructure/process/
[5]: /ja/infrastructure/containers/#kubernetesorchestratorexplorer
[6]: /ja/real_user_monitoring/
[7]: /ja/profiler/
[8]: /ja/synthetics/private_locations
[9]: /ja/agent/configuration/proxy/
[10]: /ja/network_monitoring/devices
[11]: /ja/getting_started/site/
[12]: /ja/agent/troubleshooting/send_a_flare
[13]: /ja/infrastructure/containers/container_images
[14]: /ja/network_monitoring/network_path/
[15]: /ja/integrations/go_expvar/
[16]: /ja/agent/basic_agent_usage/#gui
[17]: /ja/tracing/
[18]: /ja/extend/dogstatsd/
[19]: /ja/agent/faq/networktimeprotocolntpoffsetissues/
[20]: /ja/integrations/ntp/#overview
[21]: /ja/logs/log_collection/#loggingendpoints
[22]: /ja/containers/guide/cluster_agent_autoscaling_metrics
[23]: /ja/llm_observability/
[24]: /ja/network_monitoring/cloud_network_monitoring/
[25]: /ja/universal_service_monitoring/
[26]: /ja/metrics/
[27]: /ja/extend/service_checks/
[28]: /ja/events/
[29]: /ja/security/cloud_security_management/vulnerabilities/
[30]: /ja/logs/
[31]: /ja/data_security/logs/#hipaaenabledcustomers
[32]: /ja/logs/log_collection/#loggingendpoints