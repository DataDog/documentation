---
aliases:
- /ja/network_monitoring/devices/network_topology_map
further_reading:
- link: https://www.datadoghq.com/blog/visualize-network-device-topology/
  tag: ブログ
  text: デバイストポロジーマップでオンプレミスネットワークの関係を可視化する
- link: /network_monitoring/devices/data
  tag: ドキュメント
  text: ネットワークデバイスモニタリングで収集されるデータ
- link: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  tag: ブログ
  text: Datadog での SNMP モニタリング
title: デバイストポロジーマップ
---

## 概要

[ネットワークデバイストポロジーマップ][2]は、ネットワークの物理的な接続の概要を提供することで、デバイスの問題をより簡単に特定し、その上流および下流への影響を理解するのに役立ちます。

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_search_3.mp4" alt="ネットワークデバイストポロジーマップで、検索バーに vendor:cisco を追加し、その後 Filter nodes ボックスで nyc でフィルタリングします。ノードを選択して Inspect オプションを選択し、接続されているノードを表示します。接続されたノードの 1 つを選択し、再度 Inspect オプションを選択して、追加の接続ノードを表示します。" video="true" >}}

## セットアップ

Datadog Agent のバージョン 7.52 以降は、自動的にトポロジーデータを収集します。追加のインストールは不要です。

### 前提条件

1. デバイスが LLDP (Link Layer Discovery Protocol) および/または CDP (Cisco Discovery Protocol) を SNMP で有効にしていること。接続されたデバイスで同じプロトコルを使用して、お互いを検出できるようにします。LLDP は一般的に推奨されるオプションです。
2. Datadog Agent のバージョン 7.52 以降がインストールされていること。

## ナビゲーションオプション

ネットワークデバイストポロジーマップでは、以下のナビゲーションオプションが利用できます。

### ビュー

1. **View By** でタグを使用して、デバイスの表示方法を選択します。

{{< img src="/network_device_monitoring/network_topology_map/device-topology-grouped.png" alt="ナビゲーションオプションで、View by devices と tags が選択され、location での表示がハイライトされている" style="width:80%;" >}}

### 色

2. **Color By** では、ネットワークデバイストポロジーマップ上のノードを以下に基づいて色分けできます。

- **Device State**: SNMP の到達可能性に基づいてノードを表示します。
- **Ping State**: ノードを [Ping のステータス][6]に基づいて表示します。

{{< img src="/network_device_monitoring/network_topology_map/device-topology-overview-intro.png" alt="ナビゲーションオプションで、Color By が選択され、Device State での表示がハイライトされている" style="width:80%;" >}}

以下は各色の状態のノードの定義です。
<div style="width:80%; margin: 0 auto;">

   | 色    | 説明               |
   |----------|---------------------------|
   | 緑   | デバイスは到達可能です。      |
   | 赤   | デバイスに問題があります (例: SNMP で到達不能)。  |
   | Gray    | デバイスは NDM で監視されていますが、データが受信されていません。例えば、Ping が構成されておらず、ネットワークデバイストポロジーマップで **Ping State** による色分け (`color by`) を選択した場合、デバイスは灰色で表示されます。 |
   | 色なし | NDM で直接監視されていないが、NDM が監視している接続されたデバイスから LLDP/CDP を通じて検出可能なシャドウデバイスです。これらのデバイスをネットワークデバイストポロジーマップに表示したい場合は、[Hide _N_ Unmonitored Devices](#filter-devices) をオン/オフできます。         |

   </div>

### デバイスのフィルタリング

3. **Filter Devices** では、ネットワークデバイストポロジーマップに表示されるデバイスをさらに詳細に制御できます。

{{< img src="/network_device_monitoring/network_topology_map/device_topology_filter_devices_hide.png" alt="ナビゲーションオプションで、フィルターオプションが選択され、Hide Unmonitored Devices がトグルされている" style="width:80%;" >}}

**注:** **Filter Devices** の設定は、ネットワークデバイストポロジーマップに表示されるデバイスに、すべてのクエリに対して影響を与えます。例えば、検索バーでデバイスの属性をフィルタリングする場合などです。

**Hide _N_ Unmonitored Devices** - デフォルトでオフ。
: これをオンにすると、ネットワークデバイスモニタリングで直接監視されていないが、LLDP/CDP で発見され、隣接する監視対象デバイスからマップに表示されるデバイスが非表示になります。

**Hide _N_ Unconnected Devices** - デフォルトでオフ。
: これをオンにすると、リンク接続のないデバイスが非表示になります。デバイスが未接続である理由には、不適切な構成や、デバイスが [LLDP/CDP](troubleshooting) をサポートしていないことなどがあります。

### アイコンの凡例

SNMP デバイスは、それぞれのデバイスノードで、その[デバイスプロファイル][4]で定義されたデバイスタイプに基づいて代表的なアイコンにマッチングされます。

<table>
  <colgroup>
    <col style="width:20%">
    <col style="width:20%">
  </colgroup>
  <tr>
    <th>アイコン</th>
    <th>説明</th>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/access-point.png" alt="アクセスポイントのアイコン" style="width:10%; border:none;" popup="false">}}</td>
    <td>アクセスポイント</td>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/firewall.png" alt="ファイアウォールのアイコン" style="width:10%; border:none;" popup="false">}}</td>
    <td>ファイアウォール</td>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/router.png" alt="ルーターのアイコン" style="width:10%; border:none;" popup="false">}}</td>
    <td>ルーター</td>
  </tr>
  <tr>
   <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/server.png" alt="サーバーのアイコン" style="width:10%; border:none;" popup="false">}}</td>
    <td>サーバー</td>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/switch.png" alt="スイッチのアイコン" style="width:10%; border:none;" popup="false">}}</td>
    <td>スイッチ</td>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/device.png" alt="デバイスのアイコン" style="width:10%; border:none;" popup="false">}}</td>
    <td>デバイス</td>
  </tr>
</table>


## デバイスの調査

ネットワークの物理的な接続の概要を提供するだけでなく、個々のデバイスを調査して、その接続、フロー、および全体的なステータスを理解することができます。デバイスにカーソルを合わせると、全体的なステータスとキーメトリクスが表示されます。また、デバイスをクリックすると、以下のオプションが表示されます。

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_device_inspect_view_3.png" alt="ネットワークデバイストポロジーマップでデバイスが選択され、デバイスの情報と Inspect、View device details、View flow details のオプションが表示されている" style="width:80%;" >}}

### 検査

**Inspect** を選択すると、デバイスのインターフェイス接続が表示されます。さらに調査するために、接続されたインターフェイスのいずれかをクリックできます。
このビューでは、実際に他のデバイスに接続されている物理インターフェイスのみが表示されます。つまり、ネットワークデバイスのインターフェイスの総セットのサブセットを表示します。

{{< img src="/network_device_monitoring/network_topology_map/ndm_topology_interface_updated.png" alt="個々のデバイスの Inspect ビューで、デバイスのインターフェイス接続が表示されている" style="width:80%;" >}}

### デバイスの詳細を表示

**View device details** を選択すると、デバイスの IP アドレスやタグ、スループット、CPU、メモリに関連するデータなどの情報が表示されます。

{{< img src="/network_device_monitoring/network_topology_map/network_topology_device_details_2.png" alt="個々のデバイスの View device details タブが表示されている" style="width:80%;" >}}

このビューから、**Connected Interfaces** タブでデバイスの接続されたインターフェイスを表示することもできます。

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_devices_interface_2.png" alt="個々のデバイスの View device details タブで Interfaces タブが選択されている" style="width:80%;" >}}

### フローの詳細を表示

**View flow details** を選択すると、デバイスの `@device.ip` でフィルターされた NetFlow タブが開き、デバイスのソース、宛先、ボリュームの詳細が表示されます。詳細については、[NetFlow Monitoring][1] ページを参照してください。

## トラブルシューティング

ネットワークデバイストポロジーマップの使用中に問題が発生した場合、以下のトラブルシューティングガイドラインを使用してください。さらに支援が必要な場合は、[Datadog サポート][5]にお問い合わせください。

### トポロジーデータが不足しているメッセージボックス

{{< img src="/network_device_monitoring/network_topology_map/missing_topology_map.png" alt="レンダリングされたマップにリンクがない場合に表示されるトポロジーデータが不足しているメッセージ" style="width:80%;" >}}

これは、レンダリングされたマップにリンクがない場合に表示されるメッセージです。

**注:** "Hide _N_ Unconnected Devices" トグルがデフォルトで有効になっているため、このメッセージは空のマップとともに表示されます。

### 空のマップメッセージ

{{< img src="/network_device_monitoring/network_topology_map/no_devices_found.png" alt="NDM が構成されていないか、フィルタリングのために表示されるデバイスがない場合に表示されるメッセージ" style="width:80%;" >}}

デバイスがないのは、NDM が構成されていないためです。

### 接続が見つからない/表示する接続されたデバイスがない

{{< img src="/network_device_monitoring/network_topology_map/no_connections_found.png" alt="NDM が構成されていないか、フィルタリングのために表示されるデバイスがない場合に表示されるメッセージ" style="width:80%;" >}}

- "Hide _N_ Unconnected Devices" トグルをオフにして、孤立したデバイスを表示します。
- 情報の階層を持つマップビューを理解するために、分類タグを使用します。

### 空のマップ/監視対象のデバイスがない

- "Hide _N_ Unconnected Devices" トグルがオフであることを確認してください。

### デバイス/接続が欠落している

ネットワークデバイストポロジーマップのデータは、SNMP で収集された LLDP (Link Layer Discovery Protocol) および CDP (Cisco Discovery Protocol) の情報に基づいています。マップにデバイスや接続が欠落している場合、以下を確認してください。

- Datadog Agent のバージョン 7.52 以降がインストールされている。
- デバイスが LLDP および/または CDP を SNMP で有効にしている。

以下のコマンドでデバイスが LLDP および CDP データを公開していることを確認します。

LLDP データの場合:

```yaml
sudo -u dd-agent datadog-agent snmp walk <DEVICE_IP> 1.0.8802
```
CDP データの場合:
```yaml:
sudo -u dd-agent datadog-agent snmp walk <DEVICE_IP> 1.3.6.1.4.1.9.9.23
```

### 接続またはリンクが欠落している

デバイスが LLDP または CDP でトポロジーデータを公開しているが、いくつかの接続が欠落している場合、"Hide _N_ Unmonitored Devices" トグルがオフになっていることを確認してください。
タグを使用してマップ上のノードをフィルタリングしている場合、"Show one hop away on filter" トグルがオンになっていることを確認して、接続されたノードを表示します。

### マップに未監視のデバイスが表示される

ネットワークデバイストポロジーマップは、LLDP または CDP で発見されたすべてのデバイスを表示します。これらは、まだ SNMP で監視されていない新しいデバイスや、同等の監視対象デバイスに[解決](device-resolution)されていない既存のデバイスである可能性があります。
これらのノードを非表示にするには、"Hide _N_ Unmonitored Devices" トグルを使用します。

### マップ上にデバイスが重複している

ネットワークデバイストポロジーマップは、LLDP および/または CDP で発見されたすべてのデバイスを表示します。場合によっては、これらのデバイスは既に SNMP で監視されていますが、同等の監視対象デバイスに[解決](device-resolution)できないことがあります。この場合、デバイスは 2 回表示されます。監視対象デバイスを表すノードと、LLDP/CDP で発見されたデバイスを表すノードです。
未監視のノードを非表示にするには、"Hide _N_ Unmonitored Devices" トグルを使用します。

### マップ上の枠なしまたは黒いノード

ネットワークデバイストポロジーマップ上の枠なしまたは黒いノードは、LLDP または CDP で発見されたが NDM での監視が構成されていないデバイス、または同等の[監視対象デバイス](device-resolution)に解決できない、LLDP または CDP で発見されたデバイスを表すことがあります。

## デバイスの解決

ネットワークデバイストポロジーマップは、NDM で監視されているデバイスとその物理的な接続の概要を提供します。トポロジーリンクデータは、SNMP で収集された LLDP (Link Layer Discovery Protocol) または CDP (Cisco Discovery Protocol) の情報に基づいています。
LLDP または CDP で発見された接続は、既に SNMP で監視されているデバイスに対応する場合があります。デバイスの解決は、発見されたデバイスを監視対象デバイスにマッチングすることです。

### デバイスの解決の失敗

デバイスの解決は、デバイスが NDM で監視されていない場合、または LLDP または CDP のデータが発見されたデバイスを監視対象デバイスにマッチングするのに不十分な場合に失敗することがあります。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/network_monitoring/netflow/
[2]: https://app.datadoghq.com/devices?viewTab=topology
[3]: /ja/network_monitoring/devices/snmp_metrics/?tab=snmpv2#autodiscovery
[4]: /ja/network_monitoring/devices/profiles/
[5]: /ja/help
[6]: /ja/network_monitoring/devices/snmp_metrics/?tab=snmpv2#ping