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

{{< site-region region="us" >}}

- すべてのトラフィックは SSL で送信されます。
- 送信先は以下のとおりです。

  - [APM][1] データ: `trace.agent.datadoghq.com`
  - [ライブコンテナ][2]データ: `process.datadoghq.com`
  - TCP のトラフィックの場合、[ログ][3] データは `agent-intake.logs.datadoghq.com` 
  - その他の Agent データ:
      - **Agents < 5.2.0**: `app.datadoghq.com`
      - **Agents >= 5.2.0** `<VERSION>-app.agent.datadoghq.com`

        これは、脆弱性 (POODLE) の問題に対応して決定されました。Agent v5.2.0 以降、エンドポイントの先頭にはバージョンが付き、Agent の各バージョンは、 _フォワーダー_ のバージョンに基づいて異なるエンドポイントを呼び出します。たとえば、Agent v5.2.0 は `5-2-0-app.agent.datadoghq.com` を呼び出します。したがって、ファイアウォールで `*.agent.datadoghq.com` をホワイトリストに登録する必要があります。

v6.1.0 以降、Agent は Datadog の API にもクエリを実行、重要ではない機能（たとえば、構成された API キーの有効性の表示など）を提供します。

- **Agent >= 7.18.0/6.18.0** `api.datadoghq.com`
- **Agent < 7.18.0/6.18.0** `app.datadoghq.com`

これらのドメインは、一連の静的 IP アドレスを指す **CNAME** レコードです。このアドレスは、次の場所から取得できます。

- **[https://ip-ranges.datadoghq.com][4]** (Datadog US リージョンの場合)。

[1]: /ja/tracing/
[2]: /ja/infrastructure/livecontainers/
[3]: /ja/logs/
[4]: https://ip-ranges.datadoghq.com
{{< /site-region >}}
{{< site-region region="eu" >}}

- すべてのトラフィックは SSL で送信されます。
- 送信先は以下のとおりです。

  - [APM][1] データ: `trace.agent.datadoghq.eu`
  - [ライブコンテナ][2]データ: `process.datadoghq.eu`
  - TCP のトラフィックの場合、[ログ][3]データは `agent-intake.logs.datadoghq.eu`
  - その他の Agent データ:
      - **Agents < 5.2.0** `app.datadoghq.eu`
      - **Agents >= 5.2.0** `<バージョン>-app.agent.datadoghq.eu`

        これは、脆弱性 (POODLE) の問題に対応して決定されました。Agent v5.2.0 以降、エンドポイントの先頭にはバージョンが付き、Agent の各バージョンは、 _フォワーダー_ のバージョンに基づいて異なるエンドポイントを呼び出します。たとえば、Agent v5.2.0 は `5-2-0-app.agent.datadoghq.com` を呼び出します。したがって、ファイアウォールで `*.agent.datadoghq.eu` をホワイトリストに登録する必要があります。

v6.1.0 以降、Agent は Datadog の API にもクエリを実行、重要ではない機能（たとえば、構成された API キーの有効性の表示など）を提供します。

- **Agent >= 7.18.0/6.18.0** `api.datadoghq.eu`
- **Agent < 7.18.0/6.18.0** `app.datadoghq.eu`

これらのドメインは、一連の静的 IP アドレスを指す **CNAME** レコードです。このアドレスは、次の場所から取得できます。

- **[https://ip-ranges.datadoghq.eu][4]** (Datadog EU リージョンの場合)。

[1]: /ja/tracing/
[2]: /ja/infrastructure/livecontainers/
[3]: /ja/logs/
[4]: https://ip-ranges.datadoghq.eu
{{< /site-region >}}

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
    "synthetics": {...},                 // <-- Agent のトラフィックでは不使用 (Synthetic テストのためのボットの Datadog ソース IP)
    "webhooks": {...}                   // <-- Agent のトラフィックでは不使用 (webhook を送信する Datadog のソース IP)
}
```

{{< site-region region="us" >}}

各セクションには専用のエンドポイントがあります。例:

- [https://ip-ranges.datadoghq.com/logs.json][1]: Datadog US リージョンのログデータの受信に TCP を通じて使用される IP
- [https://ip-ranges.datadoghq.com/apm.json][2]: Datadog US リージョンの APM データの受信に使用される IP

[1]: https://ip-ranges.datadoghq.com/logs.json
[2]: https://ip-ranges.datadoghq.com/apm.json

{{< /site-region >}}
{{< site-region region="eu" >}}

各セクションには専用のエンドポイントがあります。例:

- [https://ip-ranges.datadoghq.eu/logs.json][1]: Datadog EU リージョンのログデータの受信に TCP を通じて使用される IP
- [https://ip-ranges.datadoghq.eu/apm.json][2]: Datadog EU リージョンの APM データの受信に使用される IP

[1]: https://ip-ranges.datadoghq.eu/logs.json
[2]: https://ip-ranges.datadoghq.eu/apm.json

{{< /site-region >}}

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

プロキシの設定に関する詳細なコンフィギュレーションガイドについては、[Agent プロキシコンフィギュレーション][1]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/proxy/