---
further_reading:
- link: /network_monitoring/devices/
  tag: ドキュメント
  text: Network Device Monitoring
- link: /network_monitoring/devices/topology
  tag: ドキュメント
  text: デバイスマップ
- link: /network_monitoring/devices/config_management
  tag: ドキュメント
  text: 構成管理
title: サマリーページ
---
{{< callout url="https://www.datadoghq.com/product-preview/network-device-summary-page/" header="プレビューに参加しましょう。">}}
NDM サマリーページはプレビュー版です。
{{< /callout >}}

## 概要 {#overview}

Network Device Monitoring (NDM) の**サマリーページ**では、ネットワークエンジニアにデバイスとインターフェイスのヘルス、アクティブな問題、および最近の構成変更を 1 つの画面で確認できます。ネットワークの状態を評価し、問題を調査するための出発点として使用できます。

**注**: サマリーページを使用するには、[Network Device Monitoring][1] が構成され、少なくとも 1 つの SNMP 監視対象デバイスからメトリクスを収集している必要があります。セットアップ手順については、[セットアップ][2]を参照してください。

{{< img src="network_device_monitoring/summary/summary_page.png" alt="ネットワークヘルス、インターフェイスおよびデバイスのヘルス、トラフィック、最近の変更が表示された NDM サマリーページ。" style="width:100%;" >}}

## サマリーページの使用 {#using-the-summary-page}

サマリーページは、ネットワークの状態とアクティビティの異なる側面を確認できる複数のセクションで構成されています。これらのセクションのうち 3 つ (**ネットワークヘルス**、**インターフェイスヘルス**、**デバイスヘルス**) では、追跡対象の状態を要約するヘルスステータスも表示されます。

| 状態 | 意味 |
|-------|---------|
| Good (良好) | すべてのサンプリングされたメトリクスが正常なしきい値内にあります。|
| Degraded (低下) | 一部のメトリクスが警告しきい値を超えています。|
| Poor (不良) | 複数のデバイスまたはインターフェイスでクリティカルなしきい値を超えています。|
| Unknown (不明) | ヘルスを評価するための十分なデータがありません。|

ビューをカスタマイズするには、フィルターバーを使用して、デバイスタグ (例: `device_namespace`、`device_vendor`、`device_type`、または `geolocation`) でページのスコープを指定します。デフォルトの時間範囲は {{< ui >}}Past 2 Hours{{< /ui >}} です。

### ネットワークヘルス {#network-health}

[{{< ui >}}Network health{{< /ui >}}] (ネットワークヘルス) セクションは、ネットワーク全体の状態を要約します。

{{< img src="network_device_monitoring/summary/network_health.png" alt="左側に Bits AIのサマリー、右側にヘルスコード化されたノードを含むトポロジ―ビューが表示されている、ネットワークヘルスセクション。" style="width:100%;" >}}

Bits AI のサマリーは、ネットワークの現在の状態を説明します。影響を受けるデバイス、インターフェイス、および観察された動作に関連する可能性のある最近の構成変更を強調表示します。[{{< ui >}}Chat with Bits Assistant{{< /ui >}}] (Bits Assistant とチャット) をクリックすると、フォローアップの質問をすることができます。

[Datadog MCP Server][12] の `search_ndm_devices`、`get_ndm_device`、および `search_ndm_interfaces` ツールを使用して、Claude Code や Cursor などの AI エージェントから、デバイスおよびインターフェイスのデータをクエリすることもできます。

サマリーの下にあるステータスパネルには、ステータス別に分類されたデバイスの総数、アクティブなモニターアラートと警告の数、およびアクティブな問題の数が表示されます。[{{< ui >}}View Health{{< /ui >}}] (ヘルスの表示) をクリックすると、[[Device Health][5]] (デバイスヘルス) ビューが開きます。

### インターフェイスヘルス{#interface-health}

[{{< ui >}}Interface health{{< /ui >}}] (インターフェイスヘルス) セクションでは、正常なしきい値の範囲外で動作している上位のインターフェイスがランク付けされます。ページには各インターフェイスについて、エラー率、破棄率、および構成されたインターフェイス速度に対する受信帯域幅と送信帯域幅の使用率がパーセンテージで表示されます。

{{< img src="network_device_monitoring/summary/interface-performance.png" alt="Bits AIのサマリー、エラー、破棄、帯域幅の列がある上位インターフェイスのテーブル、および帯域幅使用率、エラー、破棄の集計ヘルスカードが表示されたインターフェイスヘルスセクション。" style="width:100%;" >}}

Bits AI のサマリーでは、同じサイト内で複数のインターフェイスが飽和している、または構成変更後にエラーが急増しているなど、影響を受けているインターフェイス全体のパターンが強調表示されます。

リストの下にある 3 つのカード ([{{< ui >}}Bandwidth utilization{{< /ui >}}][6] (帯域幅使用率)、[{{< ui >}}Errors{{< /ui >}}][7] (エラー)、[{{< ui >}}Discards{{< /ui >}}][8] (破棄)) は、デバイス全体のヘルスの集計情報を示します。カードをクリックすると、影響を受けているインターフェイスの全リストが表示され、平均値、最小値、最大値を確認できます。[Errors] および [Discards] の詳細ビューには、AI 支援による調査のための [{{< ui >}}Ask Bits{{< /ui >}}] (Bits に尋ねる) ボタンもあります。

{{< img src="network_device_monitoring/summary/errors-detail.png" alt="受信と送信のエラー率チャート、Bits AIのサマリー、およびエラー率とパケット数を示すインターフェイスのテーブルが表示された [Errors] の詳細ビュー。" style="width:100%;" >}}

インターフェイスをクリックするとデバイスサイドパネルが開き、インターフェイスのステータス、メトリクス、構成、最近のイベントなどの詳細が表示されます。サイドパネルの右上隅にある [{{< ui >}}Open Device Page{{< /ui >}}] (デバイスページを開く) をクリックしてデバイスページを開くと、デバイスをより詳細に調査できます。

{{< img src="network_device_monitoring/summary/interface-side-panel.png" alt="インターフェイスタブが開かれているデバイスサイドパネル。インターフェイスのステータス、帯域幅、モニターデータが表示されています。" style="width:100%;" >}}

**インターフェイスヘルスのしきい値**

次のしきい値によって、インターフェイスのヘルス状態が決まります。

| シグナル | 警告 | クリティカル |
|--------|------|----------|
| Bandwidth In/Out (受信/送信帯域幅) | 80% | 90% |
| Errors In/Out (受信/送信エラー) | 0.10% | 5% |
| Discards In/Out (受信/送信破棄) | 0.10% | 5% |

### デバイスヘルス {#device-health}

[{{< ui >}}Device health{{< /ui >}}] (デバイスヘルス) セクションでは、健全なしきい値の範囲外で動作している上位のデバイスがランク付けされます。ページには各デバイスについて、CPU、メモリ、ファンのヘルスに加え、選択した時間範囲内に記録された構成の変更が表示されます。デフォルトでは、デバイスは [{{< ui >}}CPU{{< /ui >}}] で並べ替えられます。メモリ負荷がかかっているデバイスを表示するには、[{{< ui >}}Memory{{< /ui >}}] (メモリ) で並べ替えます。

{{< img src="network_device_monitoring/summary/device-perf.png" alt="Bits AI のサマリー、CPU およびメモリ列がある上位デバイスのテーブル、および下部に集計された健全性カードが表示されているデバイスヘルスセクション。" style="width:100%;" >}}

Bits AI のサマリーは、デバイスの現在のヘルス状態を説明し、その原因となった可能性のある最近の変更や異常を指摘します。

リストの下にある 2 つのカード ([{{< ui >}}CPU{{< /ui >}}][9] および [{{< ui >}}Memory{{< /ui >}}][10]) は、ヘルスの集計情報を示します。カードをクリックすると、影響を受けるデバイスの全リストが表示され、最小値、最大値、および過去 24 時間の傾向データを確認できます。

デバイスをクリックするとデバイスサイドパネルが開き、デバイスのステータス、メトリクス、構成、最近のイベントなどの詳細が表示されます。サイドパネルの右上隅にある [{{< ui >}}Open Device Page{{< /ui >}}] (デバイスページを開く) をクリックすると、デバイスをより詳細に調査できます。

{{< img src="network_device_monitoring/summary/device-side-panel.png" alt="デバイスサイドパネルが [Device Summary] (デバイスの概要) タブで開き、トリガーされたモニター、デバイスタグ、インターフェイスのステータスが表示されます。" style="width:100%;" >}}

**デバイスヘルスのしきい値**

次のしきい値によって、デバイスのヘルス状態が決まります。

| シグナル | 警告 | クリティカル |
|--------|------|----------|
| CPU | 80% | 90% |
| Memory | 85% | 95% |

### トラフィック{#traffic}

[{{< ui >}}Traffic{{< /ui >}}] (トラフィック) セクションでは、[NetFlow][3] データを使用して、現在のフィルターと時間範囲で絞り込んだ送信元と宛先間のトラフィック量をサンキーダイアグラムで可視化します。[{{< ui >}}View NetFlow{{< /ui >}}] (NetFlow を表示) をクリックすると、フローデータを詳細に調査できます。

{{< img src="network_device_monitoring/summary/traffic-panel.png" alt="通信量の多い上位 25 件のフローを示すサンキーダイアグラムが表示されているトラフィックセクション。送信元 IP、インターフェイス名、デバイス名、宛先 IP が表示されます。" style="width:100%;" >}}

### 変更{#changes}

[{{< ui >}}Changes{{< /ui >}}] (変更) セクションには、[構成管理][4]による最近のネットワークデバイス構成の変更が一覧表示されます。各項目には、影響を受けたデバイス、変更内容の概要、およびタイムスタンプが表示されます。

{{< img src="network_device_monitoring/summary/changes-panel.png" alt="デバイスごとの最近の構成変更がそれぞれの概要とタイムスタンプとともに一覧表示されている、変更セクション。" style="width:100%;" >}}

[[{{< ui >}}View all changes{{< /ui >}}][11]] (すべての変更を表示) をクリックすると、詳細な変更ビューが開きます。フィルターと時間範囲は、2 つのビューの間で共有されます。いずれかの行をクリックすると、変更に関する詳細を示しデバイスサイドパネルが開きます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/network_monitoring/devices/
[2]: /ja/network_monitoring/devices/setup
[3]: /ja/network_monitoring/netflow/
[4]: /ja/network_monitoring/devices/config_management
[5]: /ja/network_monitoring/devices/device_health
[6]: https://app.datadoghq.com/devices/summary/interface-bandwidth
[7]: https://app.datadoghq.com/devices/summary/interface-errors
[8]: https://app.datadoghq.com/devices/summary/interface-discards
[9]: https://app.datadoghq.com/devices/summary/device-cpu
[10]: https://app.datadoghq.com/devices/summary/device-memory
[11]: https://app.datadoghq.com/devices/summary/changes
[12]: /ja/mcp_server/tools/#networks