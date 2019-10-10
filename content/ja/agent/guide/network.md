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
  - link: graphing/infrastructure/process
    tag: Documentation
    text: プロセスの収集
  - link: tracing
    tag: Documentation
    text: トレースの収集
---
<mrk mid="16" mtype="seg">**トラフィックは、常に Agent から Datadog の方向に開始されます。</mrk><mrk mid="17" mtype="seg">Datadog から Agent の方向にセッションが開始されることはありません。**</mrk>

* すべてのトラフィックは SSL で送信されます。
* 送信先は以下のとおりです。
    * [APM][1] データ: `trace.agent.datadoghq.com`
    * [ライブコンテナ][2]データ: `process.datadoghq.com`
    * [ログ][3]データ: `agent-intake.logs.datadoghq.com `
    * その他の Agent データ:
        * **Agents < 5.2.0**: `app.datadoghq.com`
        *  **Agents >= 5.2.0**: `<version>-app.agent.datadoghq.com`

<mrk mid="26" mtype="seg">これは、脆弱性 (POODLE) の問題に対応して決定されました。</mrk><mrk mid="27" mtype="seg">Agent v5.2.0 以降、エンドポイントの先頭にはバージョンが付き、Agent の各バージョンは、フォワーダーのバージョンに基づいて異なるエンドポイントを呼び出します。</mrk><mrk mid="28" mtype="seg">たとえば、Agent v5.2.0 は `5-2-0-app.agent.datadoghq.com` を呼び出します。</mrk><mrk mid="29" mtype="seg">したがって、ファイアウォールで `*.agent.datadoghq.com` をホワイトリストに登録する必要があります。</mrk>

<mrk mid="30" mtype="seg">これらのドメインは、一連の静的 IP アドレスを指す **CNAME** レコードです。</mrk><mrk mid="31" mtype="seg">このアドレスは、次の場所から取得できます。</mrk>

* **[https://ip-ranges.datadoghq.com][4]**
* **[https://ip-ranges.datadoghq.eu][5]** (Datadog EU の場合)

この情報は、次のスキーマに従って JSON として構造化されます。

```
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
    "apm": {...},                       // <-- same structure as "agents" but IPs used for the APM Agent data
    "logs": {...},                      // <-- same for the logs Agent data
    "process": {...},                   // <-- same for the process Agent data
    "api": {...},                       // <-- not used for Agent traffic (submitting data via API)
    "webhooks": {...}                   // <-- not used for Agent traffic (Datadog source IPs delivering webhooks)
}
```

各セクションは、`https://ip-ranges.datadoghq.com/<section>.json` または `https://ip-ranges.datadoghq.eu/<section>.json` に専用のエンドポイントがあります。次に例を示します。

* [https://ip-ranges.datadoghq.com/logs.json][6]: ログデータの受信に使用される IP
* [https://ip-ranges.datadoghq.eu/logs.json][7]: Datadog EU のログデータの受信に使用される IP
* [https://ip-ranges.datadoghq.com/apm.json][8]: APM データの受信に使用される IP
* [https://ip-ranges.datadoghq.eu/apm.json][9]: Datadog EU の APM データの受信に使用される IP

### 注

<mrk mid="55" mtype="seg">これらの IP のすべてをホワイトリストに登録する必要があります。</mrk><mrk mid="56" mtype="seg">特定時点では一部だけがアクティブですが、定期的なネットワーク操作や保守のために、セット全体の中で経時変化があります。</mrk>

## ポートのオープン

**すべてのアウトバウンドトラフィックは、TCP/UDP と SSL を使用して送信されます。**

Agent のすべての機能を利用するには、以下のポートを開きます。

{{< tabs >}}
{{% tab "Agent v6" %}}

* **アウトバウンド**:

  * <mrk mid="62" mtype="seg">`443/tcp`: 大半の Agent データ</mrk><mrk mid="63" mtype="seg">(メトリクス、APM、ライブプロセス/コンテナなど) 用のポート</mrk>
  * <mrk mid="64" mtype="seg">`123/Udp`: </mrk> <mrk mid="65" mtype="seg">NTP。詳細は、[NTP の重要性に関するドキュメント][1]を参照してください。</mrk>
  * `10516/tcp`: [ログ収集][2]用のポート
  * `10255/tcp`: [Kubernetes http kubelet][3] 用のポート
  * `10250/tcp`: [Kubernetes https kubelet][3] 用のポート

* **インバウンド (Agent サービスがホスト内でローカルに相互通信するためにのみ使用されます)**:

  * `5000/tcp`: [go_expvar サーバー][4]用のポート
  * `5001/tcp`: IPC API がリスニングするポート
  * `5002/tcp`: [Agent ブラウザ GUI][5] を提供するためのポート
  * <mrk mid="73" mtype="seg">`8125/udp`: dogstatsd.</mrk> <mrk mid="74" mtype="seg">ただし、`dogstatsd_non_local_traffic` が true に設定されていない場合。</mrk><mrk mid="75" mtype="seg">このポートは、次のローカルホストで利用できます。</mrk>

      * `127.0.0.1`
      * `::1`
      * `fe80::1`

  * `8126/tcp`: [APM Receiver][6] 用のポート


[1]: /ja/agent/faq/network-time-protocol-ntp-offset-issues
[2]: /ja/logs
[3]: /ja/agent/basic_agent_usage/kubernetes
[4]: /ja/integrations/go_expvar
[5]: /ja/agent/basic_agent_usage/?tab=agentv6#gui
[6]: /ja/tracing
{{% /tab %}}
{{% tab "Agent v5 & v4" %}}

* **アウトバウンド**:

  * <mrk mid="82" mtype="seg">`443/tcp`: 大半の Agent データ</mrk><mrk mid="83" mtype="seg">(メトリクス、APM、ライブプロセス/コンテナなど) 用のポート</mrk>
  * <mrk mid="84" mtype="seg">`123/Udp`:</mrk> <mrk mid="85" mtype="seg">NTP。詳細は、[NTP の重要性に関するドキュメント][1]を参照してください。</mrk>

* **インバウンド**:

  * <mrk mid="87" mtype="seg">`8125/udp`:</mrk> <mrk mid="88" mtype="seg">DogStatsd.</mrk> <mrk mid="89" mtype="seg">ただし、`non_local_traffic` が true に設定されていない場合。</mrk><mrk mid="90" mtype="seg">このポートは、次のローカルホストで利用できます。</mrk>

      * `127.0.0.1`
      * `::1`
      * `fe80::1`

  * `8126/tcp`: [APM Receiver][2] 用のポート
  * <mrk mid="95" mtype="seg">`17123/tcp`:</mrk> <mrk mid="96" mtype="seg">Agent フォワーダー。Agent と Datadog の間でネットワークスプリットが発生した場合にトラフィックのバッファリングに使用されます。</mrk>
  * `17124/tcp`: オプションの graphite アダプター


[1]: /ja/agent/faq/network-time-protocol-ntp-offset-issues
[2]: /ja/tracing
{{% /tab %}}
{{< /tabs >}}


## プロキシの使用

プロキシの設定に関する詳細な構成ガイドについては、[Agent プロキシの構成][10]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing
[2]: /ja/graphing/infrastructure/livecontainers
[3]: /ja/logs
[4]: https://ip-ranges.datadoghq.com
[5]: https://ip-ranges.datadoghq.eu
[6]: https://ip-ranges.datadoghq.com/logs.json
[7]: https://ip-ranges.datadoghq.eu/logs.json
[8]: https://ip-ranges.datadoghq.com/apm.json
[9]: https://ip-ranges.datadoghq.eu/apm.json
[10]: /ja/agent/proxy
