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
## 概要 {#overview}

<div class="alert alert-danger">
トラフィックは常に Agent から Datadog に対して開始されます。Datadog から Agent への逆方向でセッションが開始されることはありません。
</div>

すべての Agent トラフィックは SSL 経由で送信されます。宛先は Datadog のサービスおよびサイトによって異なります。[Datadog サイト][11]に基づいた宛先を確認するには、右側の `DATADOG SITE` セレクターをクリックしてください。

##インストール {#installation}

Agent のインストールを許可するには、下記のドメインを許可リストに追加してください。

- `install.datadoghq.com`
- `yum.datadoghq.com`
- `keys.datadoghq.com`
- `apt.datadoghq.com`
- `windows-agent.datadoghq.com`

## 宛先 {#destinations}
<div class="alert alert-warning">
バージョン 7.67.0 以降、Agent は DNS クエリの数を減らすために、Datadog サイトを完全修飾ドメイン名に変換します (ドメインの末尾にドットを追加します)。
たとえば、APM ペイロードを <code>trace.agent.datadoghq.com.</code> に送信します。<br>
この動作は、バージョン 7.72.0 以降で、設定の <code>convert_dd_site_fqdn.enabled</code> を <code>false</code> に設定するか、環境変数 <code>DD_CONVERT_DD_SITE_FQDN_ENABLED=false</code> を使用することで無効にできます。
</div>

[APM][1]
: `trace.agent.`{{< region-param key="dd_site" code="true" >}}<br>
`instrumentation-telemetry-intake.`{{< region-param key="dd_site" code="true" >}}

[LLM 可観測性][23]
: `llmobs-intake.`{{< region-param key="dd_site" code="true" >}}

[コンテナイメージ][13]
: `contimage-intake.`{{< region-param key="dd_site" code="true" >}}

[ライブコンテナ][3]、[ライブプロセス][4]、[Cloud Network Monitoring][24]、[Universal Service Monitoring][25]
: `process.`{{< region-param key="dd_site" code="true" >}}

[Network Device Monitoring][10]
: `ndm-intake.`{{< region-param key="dd_site" code="true" >}}<br>
`snmp-traps-intake.`{{< region-param key="dd_site" code="true" >}}<br>
`ndmflow-intake.`{{< region-param key="dd_site" code="true" >}}

[ネットワークパス][14]
: `netpath-intake.`{{< region-param key="dd_site" code="true" >}}

[オーケストレーター][5]
: `orchestrator.`{{< region-param key="dd_site" code="true" >}}<br>
`contlcycle-intake.`{{< region-param key="dd_site" code="true" >}}

[プロファイリング][7]
: `intake.profile.`{{< region-param key="dd_site" code="true" >}}

[リアルユーザーモニタリング (RUM)][6]
:{{< region-param key="browser_sdk_endpoint_domain" code="true" >}}

[クラウドセキュリティの脆弱性][29]
: `sbom-intake.`{{< region-param key="dd_site" code="true" >}}

[Synthetic Monitoring プライベートロケーション][8]
: Synthetics Worker v1.5.0 以降: `intake.synthetics.`{{< region-param key="dd_site" code="true" >}} が、設定が必要な唯一のエンドポイントです。<br>
Synthetics Worker v0.1.6 より後の API テスト結果: `intake.synthetics.`{{< region-param key="dd_site" code="true" >}}<br>
Synthetics Worker v0.2.0 より後のブラウザテスト結果: `intake-v2.synthetics.`{{< region-param key="dd_site" code="true" >}}<br>
Synthetics Worker v0.1.5 より前の API テスト結果: `api.`{{< region-param key="dd_site" code="true" >}}

{{% site-region region="us,eu,us3,us5,ap1,ap2" %}}

[Remote Configuration][101]
: `config.`{{< region-param key="dd_site" code="true" >}}

[Database Monitoring][102]
: `dbm-metrics-intake.`{{< region-param key="dd_site" code="true" >}}<br>
`dbquery-intake.`{{< region-param key="dd_site" code="true" >}}

[101]: /ja/remote_configuration
[102]: /ja/database_monitoring/

{{% /site-region %}}

{{% logs-tcp-disclaimer %}}

[ログ][30] および [HIPAA ログ][31]
: (非推奨) TCP:{{< region-param key=tcp_endpoint code="true" >}}<br>
HTTP:{{< region-param key=agent_http_endpoint code="true" >}}<br>
その他: [ログエンドポイント][32]を参照してください

[HIPAA ログレガシー][31] (非推奨、TCP はサポートされていません)
:{{< region-param key=hipaa_logs_legacy code="true" >}}

[メトリクス][26]、[サービスチェック][27]、[イベント][28]、およびその他の Agent メタデータ
: `<VERSION>-app.agent.`{{< region-param key="dd_site" code="true" >}}<br>
たとえば、Agent v7.31.0 は `7-31-0-app.agent.` に報告します{{< region-param key="dd_site" code="true" >}}。`*.agent.` を{{< region-param key="dd_site" code="true" >}} ファイアウォールの許可リストに追加する必要があります。<br>
v6.1.0 以降、Agent は重要度の低い機能 (設定された API キーの有効性の表示など) を提供するために Datadog の API にもクエリを送信します。<br>
Agent v7.18.0 または 6.18.0 以降: `api.`{{< region-param key="dd_site" code="true" >}}<br>
Agent v7.18.0 または 6.18.0 未満: `app.`{{< region-param key="dd_site" code="true" >}}

[Agent フレア][12]
: `<VERSION>-flare.agent.`{{< region-param key="dd_site" code="true" >}}<br>
たとえば、Agent v7.31.0 は `7-31-0-flare.agent.` にフレアデータを送信します{{< region-param key="dd_site" code="true" >}}。`*.agent.` を{{< region-param key="dd_site" code="true" >}} ファイアウォールの許可リストに追加する必要があります。<br>

###静的 IP アドレス {#static-ip-addresses}

これらのドメインはすべて、一連の静的 IP アドレスを指す **CNAME** レコードです。これらのアドレスは `https://ip-ranges.` で確認できます{{< region-param key="dd_site" code="true" >}}。

情報は、次のスキーマに従った JSON として構造化されています。

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

- `https://ip-ranges.{{< region-param key="dd_site" >}}/logs.json` (TCP 経由でログデータを受信するために使用される IP の場合)。
-`https://ip-ranges.{{< region-param key="dd_site" >}}/apm.json` (APM データを受信するために使用される IP の場合)。

###許可リストへの追加 {#inclusion}

すべての `ip-ranges` を許可リストに追加してください。特定の時点でアクティブなのは一部のみですが、定期的なネットワークの運用やメンテナンスにより、セット全体の中で時間の経過と共に変化が生じます。

##ポートの開放 {#open-ports}

<div class="alert alert-danger">
すべてのアウトバウンドトラフィックは、TCP または UDP を介して SSL で送信されます。
<br><br>
ファイアウォールルールや同様のネットワーク制限を使用して、アプリケーションまたは信頼できるネットワークソースのみが Agent にアクセスできるようにしてください。信頼できないアクセスを許可すると、悪意のあるアクターによって、Datadog アカウントへのトレースやメトリクスの書き込み、設定やサービスに関する情報の取得など、さまざまな侵害行為が行われる可能性があります。
</div>

すべての **Agent** 機能を利用するには、下記のポートを開放してください。

#### アウトバウンド {#outbound}

{{% site-region region="us,eu" %}}

| 製品/機能                                                                                                                                                    | ポート                                           | プロトコル         | 説明                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Agent<br>APM<br>Containers<br>Live Processes<br>Metrics<br>Cloud Network Monitoring<br>Universal Service Monitoring                                                      | 443                                            | TCP              | ほとんどの Agent データはポート 443 を使用します。                                                                                                                                                              |
| [カスタム Agent オートスケーリング][22]                                                                                                                                           | 8443                                           | TCP              |                                                                                                                                                                                             |
| ログ収集                                                                                                                                                           |{{< region-param key=web_integrations_port >}} | (非推奨) TCP | TCP 経由のロギング。<br>**注**: TCP ログ収集は**サポートされていません**。TCP を使用する場合、Datadog は**配信や信頼性を保証しません**。ログデータは予告なく失われる可能性があります。信頼性の高い取り込みのためには、代わりに HTTP インテークエンドポイント、公式の Datadog Agent、またはフォワーダーインテグレーションを使用してください。その他の接続タイプについては、[ログエンドポイント][21]を参照してください。|
| NTP                                                                                                                                                                      | 123                                            | UDP              | Network Time Protocol (NTP)。[デフォルト NTP ターゲット][20] を参照してください。<br>NTP のトラブルシューティングについては、[NTP の問題][19] を参照してください。                                                               |

[19]: /ja/agent/faq/network-time-protocol-ntp-offset-issues/
[20]: /ja/integrations/ntp/#overview
[21]: /ja/logs/log_collection/#logging-endpoints
[22]: /ja/containers/guide/cluster_agent_autoscaling_metrics

{{% /site-region %}}

{{% site-region region="us3,us5,gov,ap1,ap2" %}}

| 製品/機能                                                                                               | ポート | プロトコル | 説明                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------- | ---- | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Agent<br>APM<br>Containers<br>Live Processes<br>Metrics<br>Cloud Network Monitoring<br>Universal Service Monitoring | 443  | TCP      | ほとんどの Agent データはポート 443 を使用します。                                                                                               |
| NTP                                                                                                                 | 123  | UDP      | Network Time Protocol (NTP)。[デフォルト NTP ターゲット][20] を参照してください。<br>NTP のトラブルシューティングについては、[NTP の問題][19] を参照してください。|

[19]: /ja/agent/faq/network-time-protocol-ntp-offset-issues/
[20]: /ja/integrations/ntp/#overview

{{% /site-region %}}

#### インバウンド {#inbound}

ホスト内でのみローカルに相互通信する Agent サービスに使用されます。

|製品/機能        | ポート | プロトコル | 説明                                                                                                                    |
| ---------------------------- | ---- | -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| [Agent ブラウザ GUI][16]      | 5002 | TCP      |                                                                                                                                |
| APM レシーバー                 | 8126 | TCP      | トレースとプロファイラーが含まれます。                                                                                            |
| [DogStatsD][18]              | 8125 | UDP      | `dogstatsd_non_local_traffic` が true に設定されていない場合の DogStatsD 用ポート。このポートは IPv4 localhost (`127.0.0.1`) で利用可能です。|
| go_expvar サーバー (APM)       | 5012 | TCP      | 詳細については、[go_expar インテグレーションのドキュメント][15]を参照してください。                                                       |
| go_expvar インテグレーションサーバー | 5000 | TCP      | 詳細については、[go_expar インテグレーションのドキュメント][15]を参照してください。                                                       |
| IPC API                      | 5001 | TCP      | プロセス間通信 (IPC) に使用されるポート。                                                                              |
| Process Agent デバッグ          | 6062 | TCP      | Process Agent 用のデバッグエンドポイント。                                                                                        |
| Process Agent ランタイム        | 6162 | TCP      | Process Agent の実行時構成設定。                                                                         |

## ポートの設定 {#configure-ports}

デフォルトのポートがネットワーク上の既存のサービスによって既に使用されているためにインバウンドポートを変更する必要がある場合は、`datadog.yaml` 設定ファイルを編集します。ほとんどのポートは、ファイルの **Advanced Configuration** セクションにあります。

{{< code-block lang="yaml" filename="datadog.yaml" disable_copy="true" collapsible="true" >}}
## @param expvar_port - integer - optional - default: 5000 HEADANCHOR:param-expvar-port-integer-optional-default-5000:ENDANCHOR
## @env DD_EXPVAR_PORT - integer - optional - default: 5000 HEADANCHOR:env-dd-expvar-port-integer-optional-default-5000:ENDANCHOR
## The port for the go_expvar server. HEADANCHOR:the-port-for-the-go-expvar-server:ENDANCHOR
#
# expvar_port: 5000 HEADANCHOR:expvar-port-5000:ENDANCHOR

## @param cmd_port - integer - optional - default: 5001 HEADANCHOR:param-cmd-port-integer-optional-default-5001:ENDANCHOR
## @env DD_CMD_PORT - integer - optional - default: 5001 HEADANCHOR:env-dd-cmd-port-integer-optional-default-5001:ENDANCHOR
## The port on which the IPC api listens. HEADANCHOR:the-port-on-which-the-ipc-api-listens:ENDANCHOR
#
# cmd_port: 5001 HEADANCHOR:cmd-port-5001:ENDANCHOR

## @param GUI_port - integer - optional HEADANCHOR:param-gui-port-integer-optional:ENDANCHOR
## @env DD_GUI_PORT - integer - optional HEADANCHOR:env-dd-gui-port-integer-optional:ENDANCHOR
## The port for the browser GUI to be served. HEADANCHOR:the-port-for-the-browser-gui-to-be-served:ENDANCHOR
## Setting 'GUI_port: -1' turns off the GUI completely HEADANCHOR:setting-gui-port-1-turns-off-the-gui-completely:ENDANCHOR
## Default is: HEADANCHOR:default-is:ENDANCHOR
##  * Windows & macOS : `5002` HEADANCHOR:windows-macos-5002:ENDANCHOR
##  * Linux: `-1` HEADANCHOR:linux-1:ENDANCHOR
##
#
# GUI_port: <GUI_PORT> HEADANCHOR:gui-port:ENDANCHOR

{{< /code-block >}}

APM レシーバーと DogStatsD のポートは、それぞれ `datadog.yaml` 設定ファイルの **Trace Collection Configuration** セクションと **DogStatsD Configuration** セクションにあります。

{{< code-block lang="yaml" filename="datadog.yaml" disable_copy="true" collapsible="true" >}}
## @param dogstatsd_port - integer - optional - default: 8125 HEADANCHOR:param-dogstatsd-port-integer-optional-default-8125:ENDANCHOR
## @env DD_DOGSTATSD_PORT - integer - optional - default: 8125 HEADANCHOR:env-dd-dogstatsd-port-integer-optional-default-8125:ENDANCHOR
## Override the Agent DogStatsD port. HEADANCHOR:override-the-agent-dogstatsd-port:ENDANCHOR
## Note: Make sure your client is sending to the same UDP port. HEADANCHOR:note-make-sure-your-client-is-sending-to-the-same-udp-port:ENDANCHOR
#
# dogstatsd_port: 8125 HEADANCHOR:dogstatsd-port-8125:ENDANCHOR

[...]

## @param receiver_port - integer - optional - default: 8126 HEADANCHOR:param-receiver-port-integer-optional-default-8126:ENDANCHOR
## @env DD_APM_RECEIVER_PORT - integer - optional - default: 8126 HEADANCHOR:env-dd-apm-receiver-port-integer-optional-default-8126:ENDANCHOR
## The port that the trace receiver should listen on. HEADANCHOR:the-port-that-the-trace-receiver-should-listen-on:ENDANCHOR
## Set to 0 to disable the HTTP receiver. HEADANCHOR:set-to-0-to-disable-the-http-receiver:ENDANCHOR
#
# receiver_port: 8126 HEADANCHOR:receiver-port-8126:ENDANCHOR
{{< /code-block >}}

<div class="alert alert-danger">ここで DogStatsD ポートまたは APM レシーバーポートの値を変更する場合は、対応するポートの APM トレースライブラリ設定も変更する必要があります。ポートの設定に関する詳細は、<a href="/tracing/trace_collection/library_config/">各言語のライブラリ構成ドキュメント</a>を参照してください。</div>

## プロキシの使用 {#using-proxies}

プロキシ設定の詳細な設定ガイドについては、[Agent プロキシ設定][9]を参照してください。

##データバッファリング {#data-buffering}

ネットワークが利用できなくなった場合、Agent はメトリクスをメモリに保存します。
メトリクスの保存に使用する最大メモリ使用量は、`forwarder_retry_queue_payloads_max_size` 構成設定で定義されます。この制限に達すると、メトリクスは破棄されます。

Agent v7.27.0 以降では、メモリ制限に達するとメトリクスをディスクに保存します。この機能を有効にするには、`forwarder_storage_max_size_in_bytes` に、Agent がメトリクスをディスクに保存するために使用できる最大ストレージ容量をバイト単位の正の値で設定します。

メトリクスは `forwarder_storage_path` 設定で定義されたフォルダーに保存されます。これはデフォルトで、Unix システムでは `/opt/datadog-agent/run/transactions_to_retry`、Windows では `C:\ProgramData\Datadog\run\transactions_to_retry` です。

ストレージ容量の不足を避けるため、Agent は総ストレージ使用率が 80% 未満の場合にのみメトリクスをディスクに保存します。この制限は `forwarder_storage_max_disk_ratio` 設定で定義されます。

##Datadog Operator のインストール {#installing-the-datadog-operator}

接続が制限されている Kubernetes 環境に Datadog Operator をインストールする場合は、レジストリに基づいて、TCP ポート 443 に対して次のエンドポイントを許可リストに登録する必要があります。

- `registry.datadoghq.com` (Datadog Container Registry)
  - `us-docker.pkg.dev/datadog-prod/public-images` (`registry.datadoghq.com` からリダイレクトされる場合があります)
- `gcr.io/datadoghq` (GCR 米国)
- `eu.gcr.io/datadoghq` (GCR 欧州)
- `asia.gcr.io/datadoghq` (GCR アジア)
- `datadoghq.azurecr.io` (Azure)
- `public.ecr.aws/datadog` (AWS)
- `docker.io/datadog` (DockerHub)


## その他の参考資料 {#further-reading}

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