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
<mrk mid="16" mtype="seg">**トラフィックは、常に Agent から Datadog の方向に開始されます。</mrk><mrk mid="17" mtype="seg">Datadog から Agent の方向にセッションが開始されることはありません。**</mrk>

- すべてのトラフィックは SSL で送信されます。
- 送信先は以下のとおりです。

  - [APM][1] データは `trace.agent.`{{< region-param key="dd_site" code="true" >}}
  - [ライブコンテナ][2]データは `process.`{{< region-param key="dd_site" code="true" >}}
  - [ログ][3] データには、TCP トラフィックの `agent-intake.logs.`{{< region-param key="dd_site" code="true" >}} 、HTTP の `agent-http-intake.logs.`{{< region-param key="dd_site" code="true" >}} などが含まれます。詳細は、[ログエンドポイント][4]の全リストを参照してください。
  - [オーケストレーターリソース][5]データは `orchestrator.`{{< region-param key="dd_site" code="true" >}}.
  - [HIPPA ログ][6]データはすべての[ログ][3]と同じですが、以下に挙げるレガシーエンドポイントにも対応しています。
    - `tcp-encrypted-intake.logs.`{{< region-param key="dd_site" code="true" >}}
    - `lambda-tcp-encrypted-intake.logs.`{{< region-param key="dd_site" code="true" >}}
    - `gcp-encrypted-intake.logs.`{{< region-param key="dd_site" code="true" >}}
    - `http-encrypted-intake.logs.`{{< region-param key="dd_site" code="true" >}}
  - [Synthetic プライベートロケーション][7] は、バージョン 0.1.6 以降では `intake.synthetics.`{{< region-param key="dd_site" code="true" >}}、バージョン 0.2.0 以降は `intake-v2.synthetics.`{{< region-param key="dd_site" code="true" >}} となります。
  - その他の Agent データ:
      - **Agents < 5.2.0** `app.`{{< region-param key="dd_site" code="true" >}}
      - **Agents >= 5.2.0** `<VERSION>-app.agent.`{{< region-param key="dd_site" code="true" >}}

        これは、脆弱性 (POODLE) の問題に対応して決定されました。Agent v5.2.0 以降、エンドポイントの先頭にはバージョンが付き、Agent の各バージョンは、 _フォワーダー_ のバージョンに基づいて異なるエンドポイントを呼び出します。たとえば、Agent v5.2.0 は `5-2-0-app.agent.`{{< region-param key="dd_site" code="true" >}} を呼び出します。したがって、ファイアウォールで `*.agent.`{{< region-param key="dd_site" code="true" >}} をホワイトリストに登録する必要があります。

v6.1.0 以降、Agent は Datadog の API にもクエリを実行、重要ではない機能（たとえば、構成された API キーの有効性の表示など）を提供します。

- **Agent >= 7.18.0/6.18.0** `api.`{{< region-param key="dd_site" code="true" >}}
- **Agent < 7.18.0/6.18.0** `app.`{{< region-param key="dd_site" code="true" >}}

これらのドメインは、一連の静的 IP アドレスを指す **CNAME** レコードです。このアドレスは、`https://ip-ranges.`{{< region-param key="dd_site" code="true" >}} から取得できます。

この情報は、次のスキーマに従って JSON として構造化されます。

```text
{
    "version": 1,                       // <-- この情報が変更される場合に毎回インクリメント
    "modified": "YYYY-MM-DD-HH-MM-SS",  // <-- 最終更新時のタイムスタンプ
    "agents": {                         // <-- Agent から Datadog へのメトリクス送信に用いる IP
        "prefixes_ipv4": [              // <-- IPv4 CIDR ブロックのリスト
            "a.b.c.d/x",
            ...
        ],
        "prefixes_ipv6": [              // <-- IPv6 CIDR ブロックのリスト
            ...
        ]
    },
    "api": {...}, // <-- 重要でない Agent 機能と同様 (API からの情報のクエリ)
    "apm": {...},                       // <-- APM Agent データに使用される IP ("agents" と同構造)
    "logs": {...},                      // <-- Agent データのログと同様
    "process": {...},                   // <-- Agent データのプロセスと同様
     "orchestrator": {...},             // <-- Agent データのプロセスと同様
    "synthetics": {...},                 // <-- Agent のトラフィックでは不使用 (Synthetic テストのためのボットの Datadog ソース IP)
    "webhooks": {...}                   // <-- Agent のトラフィックでは不使用 (webhook を送信する Datadog のソース IP)
}
```

各セクションには専用のエンドポイントがあります。例:

- TCP 経由でログデータを受信するために使用される IP の場合は `https://ip-ranges.{{< region-param key="dd_site" >}}/logs.json`。
- APM データの受信に使用される IP の場合は `https://ip-ranges.{{< region-param key="dd_site" >}}/apm.json`。

### 注

<mrk mid="55" mtype="seg">これらの IP のすべてをホワイトリストに登録する必要があります。</mrk><mrk mid="56" mtype="seg">特定時点では一部だけがアクティブですが、定期的なネットワーク操作や保守のために、セット全体の中で経時変化があります。</mrk>

## ポートのオープン

**すべてのアウトバウンドトラフィックは、TCP/UDP と SSL を使用して送信されます。**

Agent のすべての機能を利用するには、以下のポートを開きます。

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

- **アウトバウンド**:

  - <mrk mid="62" mtype="seg">`443/tcp`: 大半の Agent データ</mrk><mrk mid="63" mtype="seg">(メトリクス、APM、ライブプロセス/コンテナなど) 用のポート</mrk>
  - <mrk mid="84" mtype="seg">`123/Udp`:</mrk> <mrk mid="85" mtype="seg">NTP。詳細は、[NTP の重要性に関するドキュメント][1]を参照してください。</mrk>
  - `10516/tcp`: Datadog US リージョンの  TCP 経由の[ログ収集][2]のポート。Datadog EU リージョンの場合は `443/tcp`。
  - `10255/tcp`: [Kubernetes http kubelet][3] 用のポート
  - `10250/tcp`: [Kubernetes https kubelet][3] 用のポート

- **インバウンド (Agent サービスがホスト内でローカルに相互通信するためにのみ使用されます)**:

  - `5000/tcp`: [go_expvar サーバー][4]用のポート
  - `5001/tcp`: IPC API がリスニングするポート
  - `5002/tcp`: [Agent ブラウザ GUI][5] を提供するためのポート
  - <mrk mid="73" mtype="seg">`8125/udp`: dogstatsd.</mrk> <mrk mid="74" mtype="seg">ただし、`dogstatsd_non_local_traffic` が true に設定されていない場合。</mrk><mrk mid="75" mtype="seg">このポートは、次のローカルホストで利用できます。</mrk>

      - `127.0.0.1`
      - `::1`
      - `fe80::1`

  - `8126/tcp`: [APM Receiver][6] 用のポート

[1]: /ja/agent/faq/network-time-protocol-ntp-offset-issues/
[2]: /ja/logs/
[3]: /ja/agent/basic_agent_usage/kubernetes/
[4]: /ja/integrations/go_expvar/
[5]: /ja/agent/basic_agent_usage/#gui
[6]: /ja/tracing/
{{% /tab %}}
{{% tab "Agent v5 & v4" %}}

- **アウトバウンド**:

  - <mrk mid="62" mtype="seg">`443/tcp`: 大半の Agent データ</mrk><mrk mid="63" mtype="seg">(メトリクス、APM、ライブプロセス/コンテナなど) 用のポート</mrk>
  - <mrk mid="84" mtype="seg">`123/Udp`:</mrk> <mrk mid="85" mtype="seg">NTP。詳細は、[NTP の重要性に関するドキュメント][1]を参照してください。</mrk>

- **インバウンド**:

  - <mrk mid="87" mtype="seg">`8125/udp`:</mrk> <mrk mid="88" mtype="seg">DogStatsd.</mrk> <mrk mid="89" mtype="seg">ただし、`non_local_traffic` が true に設定されていない場合。</mrk><mrk mid="90" mtype="seg">このポートは、次のローカルホストで利用できます。</mrk>

      - `127.0.0.1`
      - `::1`
      - `fe80::1`

  - `8126/tcp`: [APM Receiver][2] 用のポート
  - <mrk mid="95" mtype="seg">`17123/tcp`:</mrk> <mrk mid="96" mtype="seg">Agent フォワーダー。Agent と Datadog の間でネットワークスプリットが発生した場合にトラフィックのバッファリングに使用されます。</mrk>
  - `17124/tcp`: オプションの graphite アダプター

[1]: /ja/agent/faq/network-time-protocol-ntp-offset-issues/
[2]: /ja/tracing/
{{% /tab %}}
{{< /tabs >}}

## プロキシの使用

プロキシの設定に関する詳細なコンフィギュレーションガイドについては、[Agent プロキシコンフィギュレーション][8]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/
[2]: /ja/infrastructure/livecontainers/
[3]: /ja/logs/
[4]: /ja/logs/log_collection/?tab=http#datadog-logs-endpoints
[5]: /ja/infrastructure/livecontainers/#kubernetes-resources-1
[6]: /ja/security/logs/#hipaa-enabled-customers
[7]: /ja/synthetics/private_locations/#datadog-private-locations-endpoints
[8]: /ja/agent/proxy/