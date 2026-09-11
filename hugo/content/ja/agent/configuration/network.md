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
  tag: ドキュメント
  text: Datadog サイトについて学ぶ
- link: /logs/
  tag: ドキュメント
  text: ログを収集する
- link: /infrastructure/process
  tag: ドキュメント
  text: プロセスを収集する
- link: tracing
  tag: ドキュメント
  text: トレースを収集する
title: ネットワークトラフィック
---
## 概要 {#overview}

<div class="alert alert-danger">
トラフィックは常に Agent から Datadog に対して開始されます。Datadog から Agent へのセッションが開始されることはありません。
</div>

Agent のトラフィックはすべて SSL 経由で送信されます。送信先は Datadog のサービスとサイトにより異なります。使用している [Datadog サイト][11]の送信先を確認するには、右側の [{{< ui >}}DATADOG SITE{{< /ui >}}](Datadog サイト) セレクターをクリックしてください。

## インストール {#installation}

Agent のインストールを許可するために、以下のドメインをインクルージョンリストに追加してください。

- `install.datadoghq.com`
- `yum.datadoghq.com`
- `keys.datadoghq.com`
- `apt.datadoghq.com`
- `windows-agent.datadoghq.com`

## 送信先 {#destinations}
<div class="alert alert-warning">
バージョン 7.67.0 以降、Agent は Datadog サイトを完全修飾ドメイン名に変換し (ドメインの末尾にドットを追加することによって)、DNS クエリの数を減らすようにしています。
たとえば、APM ペイロードの送信先は <code>trace.agent.datadoghq.com.</code>です。<br>
この動作は、バージョン 7.72.0 以降で無効にすることができます。そのためには、構成の中で <code>convert_dd_site_fqdn.enabled</code> を <code>false</code> に設定するか、または環境変数 <code>DD_CONVERT_DD_SITE_FQDN_ENABLED=false</code>で設定します。
</div>

[APM][1]
: `trace.agent.`{{< region-param key="dd_site" code="true" >}}<br>
`instrumentation-telemetry-intake.`{{< region-param key="dd_site" code="true" >}}

[LLM 可観測性][23]
: `llmobs-intake.`{{< region-param key="dd_site" code="true" >}}

[Container Images][13]
: `contimage-intake.`{{< region-param key="dd_site" code="true" >}}

[ライブコンテナ][3]、[Live Processes][4]、[Cloud Network Monitoring][24]、[Universal Service Monitoring][25]
: `process.`{{< region-param key="dd_site" code="true" >}}

[Network Device Monitoring][10]
: `ndm-intake.`{{< region-param key="dd_site" code="true" >}}<br>
`snmp-traps-intake.`{{< region-param key="dd_site" code="true" >}}<br>
`ndmflow-intake.`{{< region-param key="dd_site" code="true" >}}

[Network Path][14]
: `netpath-intake.`{{< region-param key="dd_site" code="true" >}}<br>
Agent v7.75 以降では、Network Path が HTTPS 経由で外部サービスに接続して、ソースホストの公開 IP を解決します。これはオプションであり、この処理なしでも Network Path は機能します。ただし、ご使用のネットワークでアウトバウンドトラフィックが制限されていて、ソースの公開 IP を解決する必要がある場合は、次のものを許可リストに追加してください: `icanhazip.com`、`ipinfo.io`、`checkip.amazonaws.com`、`api.ipify.org`、`whatismyip.akamai.com`。詳細については、[Network Path のセットアップ][33]を参照してください。

[Orchestrator][5]
: `orchestrator.`{{< region-param key="dd_site" code="true" >}}<br>
`contlcycle-intake.`{{< region-param key="dd_site" code="true" >}}

[プロファイリング][7]
: `intake.profile.`{{< region-param key="dd_site" code="true" >}}

[RUM (Real User Monitoring)][6]
: {{< region-param key="browser_sdk_endpoint_domain" code="true" >}}

[Cloud Security Vulnerabilities][29]
: `sbom-intake.`{{< region-param key="dd_site" code="true" >}}

[Synthetic Monitoring プライベートロケーション][8]
: Synthetics Worker v1.5.0 以降:`intake.synthetics.`{{< region-param key="dd_site" code="true" >}} が、設定する必要がある唯一のエンドポイントです。<br>
v0.1.6 より後の Synthetics Worker の API テスト結果: `intake.synthetics.`{{< region-param key="dd_site" code="true" >}}<br>
v0.2.0 より後の Synthetics Worker のブラウザテスト結果: `intake-v2.synthetics.`{{< region-param key="dd_site" code="true" >}}<br>
v0.1.5 より前の Synthetics Worker の API テスト結果: `api.`{{< region-param key="dd_site" code="true" >}}

{{% site-region region="us,eu,us3,us5,ap1,ap2,uk1" %}}

[Remote Configuration][101]
: `config.`{{< region-param key="dd_site" code="true" >}}

[Database Monitoring][102]
: `dbm-metrics-intake.`{{< region-param key="dd_site" code="true" >}}<br>
`dbquery-intake.`{{< region-param key="dd_site" code="true" >}}

[End User Device Monitoring][103]
: `softinv-intake.`{{< region-param key="dd_site" code="true" >}}<br>
`eudm-intake.`{{< region-param key="dd_site" code="true" >}}

[101]: /ja/remote_configuration
[102]: /ja/database_monitoring/
[103]: /ja/infrastructure/end_user_device_monitoring/

{{% /site-region %}}

{{% logs-tcp-disclaimer %}}

[ログ][30]、[HIPAA ログ][31]
: (非推奨) TCP:{{< region-param key=tcp_endpoint code="true" >}}<br>
HTTP:{{< region-param key=agent_http_endpoint code="true" >}}<br>
その他: 「[ログエンドポイント][32]」を参照してください。

[HIPAA ログレガシー][31] (非推奨、TCP はサポートされていません)
: {{< region-param key=hipaa_logs_legacy code="true" >}}

[メトリクス][26]、[サービスチェック][27]、[イベント][28]、およびその他の Agent メタデータ
: `<VERSION>-app.agent.`{{< region-param key="dd_site" code="true" >}}<br>
たとえば、Agent v7.31.0 は `7-31-0-app.agent.` に報告します{{< region-param key="dd_site" code="true" >}}。`*.agent.` を{{< region-param key="dd_site" code="true" >}} ファイアウォールのインクルージョンリストに追加する必要があります。<br>
v6.1.0 以降、Agent は Datadog の API にもクエリを送信し、重要度の低い機能 (構成された API キーの有効性の表示など) を提供します: <br>
Agent v7.18.0 または 6.18.0 以降: `api.`{{< region-param key="dd_site" code="true" >}}<br>
Agent v7.18.0 または 6.18.0 より前: `app.`{{< region-param key="dd_site" code="true" >}}

[Agent フレア][12]
: `<VERSION>-flare.agent.`{{< region-param key="dd_site" code="true" >}}<br>
たとえば、Agent v7.31.0 は `7-31-0-flare.agent.` にフレアデータを送信します{{< region-param key="dd_site" code="true" >}}。`*.agent.` を{{< region-param key="dd_site" code="true" >}} ファイアウォールのインクルージョンリストに追加する必要があります。<br>

### 静的 IP アドレス {#static-ip-addresses}

これらのドメインはすべて **CNAME** レコードであり、一連の静的 IP アドレスを指しています。これらのアドレスは `https://ip-ranges.`{{< region-param key="dd_site" code="true" >}}で確認できます。

この情報は、以下のスキーマに従って JSON として構造化されます。

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

各セクションには専用のエンドポイントがあります。たとえば、次のようなものです。

- `https://ip-ranges.{{< region-param key="dd_site" >}}/logs.json` (TCP 経由でログデータを受信するために使用される IP 用)。
- `https://ip-ranges.{{< region-param key="dd_site" >}}/apm.json` (APM データを受信するために使用される IP 用)。

### インクルージョン {#inclusion}

すべての `ip-ranges` をインクルージョンリストに追加してください。特定の時点でアクティブなのは一部のみですが、定期的なネットワーク操作や保守により、セット全体の中では時間の経過とともにアクティブなアドレスが変化します。

## ポートを開く {#open-ports}

<div class="alert alert-danger">
すべてのアウトバウンドトラフィックは、TCP または UDP を介して SSL 経由で送信されます。
<br><br>
ファイアウォールルールや同様のネットワーク制限を使用して、ご使用のアプリケーションや信頼できるネットワークソースのみが Agent にアクセスできるようにしてください。信頼できないソースにアクセスを与えると、悪意のあるアクターが侵害行為を行えるようになるおそれがあります。このような行為には、Datadog アカウントへのトレースとメトリクスの書き込み、構成やサービスに関する情報の取得などがありますが、これらに制限されません。
</div>

**Agent** のすべての機能を利用するには、以下のポートを開いてください。

#### アウトバウンド {#outbound}

{{% site-region region="us,eu" %}}

| 製品/機能                                                                                                                                                    | ポート                                           | プロトコル         | 説明                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Agent<br>APM<br>Containers<br>Live Processes<br>メトリクス<br>Cloud Network Monitoring<br>Universal Service Monitoring                                                      | 443                                            | TCP              | ほとんどの Agent データはポート 443 を使用します。                                                                                                                                                              |
| [カスタム Agent オートスケーリング][22]| 8443| TCP|                                                                                                                                                                                             |
| ログ収集                                                                                                                                                           | {{< region-param key=web_integrations_port >}} | (非推奨) TCP | TCP 経由のロギング。<br>**注**: TCP ログ収集は**サポートされていません**。Datadog は、TCP の使用に関して**配信や信頼性を保証していません**。そのため、ログデータが予告なく失われる可能性があります。取り込みの信頼性を確保するためには、代わりに HTTP インテークエンドポイント、公式の Datadog Agent、またはフォワーダーインテグレーションを使用してください。その他の接続タイプについては、「[ログエンドポイント][21]」を参照してください。|
| NTP                                                                                                                                                                      | 123                                            | UDP              | NTP (Network Time Protocol)。[デフォルトの NTP ターゲット][20]を参照してください。<br>NTP のトラブルシューティングの詳細については、「[NTP に関する問題][19]」を参照してください。                                                               |
| 接続テスト                                                                                                                                                        | 8042                                           | TCP              | リモート構成の接続テスト。<br>**注**: これはプロトコル開発用の顧客データが含まれないテレメトリエンドポイントであり、[リモート構成][101]が有効な場合にのみ使用されます。

[19]: /ja/agent/faq/network-time-protocol-ntp-offset-issues/
[20]: /ja/integrations/ntp/#overview
[21]: /ja/logs/log_collection/#logging-endpoints
[22]: /ja/containers/guide/cluster_agent_autoscaling_metrics

{{% /site-region %}}

{{% site-region region="us3,us5,gov,gov2,ap1,ap2,uk1" %}}

| 製品/機能                                                                                               | ポート | プロトコル | 説明                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------- | ---- | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Agent<br>APM<br>Containers<br>Live Processes<br>メトリクス<br>Cloud Network Monitoring<br>Universal Service Monitoring | 443  | TCP      | ほとんどの Agent データはポート 443 を使用します。                                                                                               |
| NTP                                                                                                                 | 123  | UDP      | NTP (Network Time Protocol)。[デフォルトの NTP ターゲット][20]を参照してください。<br>NTP のトラブルシューティングの詳細については、「[NTP に関する問題][19]」を参照してください。|

[19]: /ja/agent/faq/network-time-protocol-ntp-offset-issues/
[20]: /ja/integrations/ntp/#overview

{{% /site-region %}}

#### インバウンド {#inbound}

ホスト内でのローカル通信のみを行う Agent サービスで使用されます。

| 製品/機能        | ポート | プロトコル | 説明                                                                                                                    |
| ---------------------------- | ---- | -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| [Agent ブラウザ GUI][16]      | 5002 | TCP      |                                                                                                                                |
| APM レシーバー                 | 8126 | TCP      | トレーシングとプロファイラーを含みます。                                                                                            |
| [DogStatsD][18]              | 8125 | UDP      | DogStatsD 用のポート (`dogstatsd_non_local_traffic` が true に設定されている場合を除く)。このポートは IPv4 ローカルホストで利用可能です: `127.0.0.1`。|
| go_expvar サーバー (APM)       | 5012 | TCP      | 詳細については、[go_expvar インテグレーションのドキュメント][15]を参照してください。                                                       |
| go_expvar インテグレーションサーバー | 5000 | TCP      | 詳細については、[go_expvar インテグレーションのドキュメント][15]を参照してください。                                                       |
| IPC API                      | 5001 | TCP      | IPC (プロセス間通信) に使用されるポート。                                                                              |
| Process Agent のデバッグ          | 6062 | TCP      | Process Agent のデバッグエンドポイント。                                                                                        |
| Process Agent ランタイム        | 6162 | TCP      | Process Agent のランタイム構成の設定。                                                                         |

## ポートの構成 {#configure-ports}

既存のサービスがネットワーク上ですでにデフォルトポートを使用しているために、受信ポートを変更する必要がある場合は、`datadog.yaml` 構成ファイルを編集します。ほとんどのポートは、このファイルの **Advanced Configuration** セクションで確認できます。

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

APM レシーバーのポートは `datadog.yaml` 構成ファイルの **Trace Collection Configuration** セクションで、DogStatsD ポートは **DogStatsD Configuration** セクションで確認できます。

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

<div class="alert alert-danger">ここで DogStatsD ポートまたは APM レシーバーポートの値を変更した場合は、対応するポートの Datadog SDK の構成も変更する必要があります。ポートの構成の詳細については、<a href="/tracing/trace_collection/library_config/">お使いの言語のライブラリ構成ドキュメント</a>を参照してください。</div>

## プロキシの使用 {#using-proxies}

プロキシの設定に関する詳細な構成ガイドは、「[Agent プロキシの構成][9]」を参照してください。

## データバッファリング {#data-buffering}

ネットワークが利用できなくなると、Agent はメトリクスをメモリに保存します。
メトリクスを保存するための最大メモリ使用量は、`forwarder_retry_queue_payloads_max_size` 構成の設定によって定義されます。この制限に達すると、メトリクスは破棄されます。

Agent v7.27.0 以降では、メモリ制限に達した場合、ディスクにメトリクスを保存します。この機能を有効にするには、`forwarder_storage_max_size_in_bytes` に、Agent がディスクにメトリクスを保存するために使用できる最大ストレージ容量 (バイト数) を示す正の値を設定してください。

メトリクスは、`forwarder_storage_path` の設定で定義されるフォルダーに保存されます。デフォルトは、Unix システムでは `/opt/datadog-agent/run/transactions_to_retry`、Windows では `C:\ProgramData\Datadog\run\transactions_to_retry` です。

ストレージ容量が不足することがないように、Agent は使用されている総ストレージ容量が 80 パーセント未満の場合にのみメトリクスをディスクに保存します。この制限は `forwarder_storage_max_disk_ratio` の設定によって定義されます。

## Datadog Operator のインストール {#installing-the-datadog-operator}

接続が制限されている Kubernetes 環境に Datadog Operator をインストールする場合は、ご使用のレジストリに基づいて TCP ポート 443 の下記のエンドポイントを許可リストに追加する必要があります。

- `registry.datadoghq.com` (Datadog コンテナレジストリ)
  - `us-docker.pkg.dev/datadog-prod/public-images` (`registry.datadoghq.com` からのリダイレクトを受け取る場合があります)
- `gcr.io/datadoghq` (GCR 米国)
- `eu.gcr.io/datadoghq` (GCR ヨーロッパ)
- `asia.gcr.io/datadoghq` (GCR アジア)
- `datadoghq.azurecr.io` (Azure)
- `public.ecr.aws/datadog` (AWS)
- `docker.io/datadog` (DockerHub)


## 参考資料 {#further-reading}

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
[14]: /ja/network_monitoring/network_path/
[15]: /ja/integrations/go_expvar/
[16]: /ja/agent/basic_agent_usage/#gui
[17]: /ja/tracing/
[18]: /ja/extend/dogstatsd/
[19]: /ja/agent/faq/network-time-protocol-ntp-offset-issues/
[20]: /ja/integrations/ntp/#overview
[21]: /ja/logs/log_collection/#logging-endpoints
[22]: /ja/containers/guide/cluster_agent_autoscaling_metrics
[23]: /ja/llm_observability/
[24]: /ja/network_monitoring/cloud_network_monitoring/
[25]: /ja/universal_service_monitoring/
[26]: /ja/metrics/
[27]: /ja/extend/service_checks/
[28]: /ja/events/
[29]: /ja/security/cloud_security_management/vulnerabilities/
[30]: /ja/logs/
[31]: /ja/data_security/logs/#hipaa-enabled-customers
[32]: /ja/logs/log_collection/#logging-endpoints
[33]: /ja/network_monitoring/network_path/setup/#source-public-ip-resolution