---
aliases:
- /ja/network_monitoring/devices/network_topology_map
- /ja/network_monitoring/devices/device_topology_map
code_lang: topology
code_lang_weight: 0
further_reading:
- link: https://www.datadoghq.com/blog/visualize-network-device-topology/
  tag: ブログ
  text: デバイストポロジーマップでオンプレミスネットワーク全体の関係を可視化する
- link: /network_monitoring/devices/data
  tag: ドキュメント
  text: Network Device Monitoring で収集されるデータ
- link: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  tag: ブログ
  text: Datadog での SNMP モニタリング
title: デバイストポロジーマップ
type: multi-code-lang
---
## 概要 {#overview}

[ネットワークデバイストポロジーマップ][2]は、[Cloudcraft][7] の図を使用して、ネットワークの物理的接続のインタラクティブな視覚表現を表示します。このマップは、デバイス、そのインターフェース、およびデバイス間の関係を自動的に発見し、表示します。この可視化により、ネットワークデバイスの問題を特定し、上流および下流の影響を理解し、接続の問題をトラブルシューティングし、インフラストラクチャー内のトラフィックフローについての洞察を得ることができます。

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_new_4.mp4" alt="ユーザーはネットワークデバイストポロジーマップに、チーム、サービス、およびベンダータグを追加し、それからデバイスを選択して NDM デバイスビューを開きます。" video="true" >}}

## セットアップ {#setup}

Datadog Agent バージョン 7.52 以降は、トポロジーデータを自動的に収集します。追加のインストールは必要ありません。

### 前提条件 {#prerequisites}

1. デバイスの SNMP で LLDP (Link Layer Discovery Protocol) および/または CDP (Cisco Discovery Protocol) が有効になっている。接続されたデバイスで同じプロトコルを使用して、お互いを発見できるようにします。より一般的なオプションである LLDP が通常は好まれます。
2. Datadog Agent バージョン 7.52 以降がインストールされていること。

## ナビゲーションオプション {#navigation-options}

ネットワークデバイストポロジーマップでは、下記のナビゲーションオプションが利用できます。

### グループ化 {#group-by}

{{< ui >}}Group By{{< /ui >}} の下で、`location` や `vendor` などのタグを使用して、デバイスの可視化方法を選択します。

{{< img src="/network_device_monitoring/network_topology_map/device-topology-group_by_2.png" alt="場所とベンダーのタグを表示するグループ化基準コントロール。" style="width:90%;" >}}

### デバイスのフィルタリング {#filter-devices}

[{{< ui >}}\+ Filter{{< /ui >}}] ドロップダウンを選択して、デバイストポロジーマップに表示されるデバイスを絞り込みます。

{{< img src="/network_device_monitoring/network_topology_map/device_topology_filter_3.png" alt="フィルタードロップダウンが開いているデバイストポロジーマップ。" style="width:90%;" >}}

**注:** {{< ui >}}Filter Devices{{< /ui >}} 設定は、検索バーでデバイスファセットによってフィルタリングするクエリを含むすべてのクエリにおいて、デバイストポロジーマップに表示されるデバイスを決定します。

### リソース {#resources}

{{< ui >}}Resource{{< /ui >}} ドロップダウンを使用して、ファイアウォール、アクセスポイント、ルーターなどの特定のデバイスタイプで図をフィルタリングします。

{{< img src="/network_device_monitoring/network_topology_map/resources_dropdown.png" alt="リソースドロップダウンが開いていて、モニターされていないデバイスのチェックが外れているデバイストポロジーマップ。" style="width:30%;" >}}

デフォルトでは、{{< ui >}}Unmonitored Device{{< /ui >}} オプションはチェックが外れています。つまり、Network Device Monitoring によって直接モニターされていないものの、隣接するモニター対象デバイスから LLDP/CDP を通じて発見されたデバイスは非表示になります。このオプションにチェックを入れると、これらのモニターされていないデバイスが図に表示されます。

## デバイスの調査 {#investigating-devices}

デバイストポロジーマップでは、ネットワークの物理的接続の概要を示すだけでなく、個々のデバイスを調査して、その接続、フロー、および全体的な状態を理解することができます。デバイスにカーソルを合わせると、その状態と主要なメトリクスが表示され、デバイスをクリックすると、IPアドレス、タグ、スループット、CPU、メモリなどの詳細を含む NDM デバイスビューが開きます。

デバイスを調査している間、デバイスビューの右上にある {{< ui >}}Open Device Page{{< /ui >}} ドロップダウンをクリックすると、[NetFlow Monitoring][1] やその他の関連ページに移動し、より詳細な調査ができます。

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_device_inspect_view_7.png" alt="デバイスが選択されたネットワークデバイストポロジーマップで、NDM デバイスビューに情報が表示されている。" style="width:100%;" >}}

### 依存関係 {#dependencies}

NDM デバイスビューの {{< ui >}}Dependencies{{< /ui >}} セクションでは、物理的に接続されたネットワークデバイス、エンドポイント、VPN トンネルの数を一目で確認でき、隣接デバイスの視覚的なグラフも表示されます。

{{< img src="/network_device_monitoring/network_topology_map/topology_dependencies_2.png" alt="接続されたデバイスのグラフを表示している依存関係セクションの NDM デバイスビュー。" style="width:100%;" >}}

{{< ui >}}View dependencies{{< /ui >}} をクリックして、デバイスの全ページを開きます。{{< ui >}}Dependencies{{< /ui >}} タブで、{{< ui >}}VPN tunnels{{< /ui >}}、{{< ui >}}Network devices{{< /ui >}}、または {{< ui >}}Endpoints{{< /ui >}} オプションを選択して、依存関係ビューを切り替えます。

<div class="alert alert-info">
VPN 依存関係には、<a href="/network_monitoring/devices/vpn_monitoring/">VPN Monitoring</a> が構成されている必要があります。エンドポイントの依存関係には、<a href="/infrastructure/end_user_device_monitoring/">End User Device Monitoring (EUDM)</a> が構成されている必要があります。
</div>

#### VPN トンネル {#vpn-tunnels}

{{< ui >}}VPN tunnels{{< /ui >}} ビューには、トポロジーグラフと、ピア IP、プロトコル、インターフェース、および宛先サブネットを示す接続された VPN のテーブルが表示されます。

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_VPN_tunnels.png" alt="VPN トンネルタブが選択された NDM デバイスページの [Dependencies] タブ。トポロジーグラフと、接続された VPN のテーブルが表示されています。" style="width:100%;" >}}

#### ネットワークデバイス {#network-devices}

{{< ui >}}Network devices{{< /ui >}} ビューには、トポロジーグラフと、デバイスの状態、デバイス名、IP アドレス、モニター、ローカルインターフェース、およびリモートインターフェースを示す接続されたデバイスのテーブルが表示されます。

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_network_devices.png" alt="ネットワークデバイスタブが選択された NDM デバイスページの [Dependencies] タブ。ステータスごとに色分けされた 11 台の接続済みデバイスを示すトポロジーグラフと、接続済みデバイスの詳細が記載されたテーブルが表示されています。" style="width:100%;" >}}

#### エンドポイント {#endpoints}

{{< ui >}}Endpoints{{< /ui >}} ビューには、トポロジーグラフと、接続されたエンドユーザーデバイスおよびそのステータスを示すテーブルが表示されます。グラフでエンドポイントを選択すると、詳細を表示したり、[EUDM][12] でアクセスしたりできます。

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_endpoints.png" alt="エンドポイントタブが選択された NDM デバイスページの [Dependencies] タブ。トポロジーグラフには 5 台の接続済みエンドユーザーデバイスが表示され、そのうち 1 台の詳細ビューが開いています。また、接続済みデバイスの詳細が記載されたテーブルも表示されています。" style="width:100%;" >}}

### メトリクス {#metrics}

NDM デバイスビューの {{< ui >}}Metrics{{< /ui >}} タブをクリックして、CPU 使用率、メモリ使用率、スループットなど、デバイスの主要なメトリクスを確認できます。サマリー統計は上部に表示され、各メトリクスは経時的な変化を表すグラフとして示されます。{{< ui >}}View all metrics{{< /ui >}} をクリックして、収集されたメトリクスの全一覧を確認します。

{{< img src="/network_device_monitoring/network_topology_map/metrics_3.png" alt="メトリクスタブが開いているNDMデバイスビューで、CPU、メモリ、スループットのグラフが表示されている。" style="width:100%;" >}}

### トラフィック{#traffic}

{{< ui >}}Traffic{{< /ui >}} タブをクリックして、デバイスの合計、受信、および送信スループットを表示します。トラフィックグラフには時間の経過に伴うアクティビティが表示され、{{< ui >}}Top Conversations{{< /ui >}} テーブルには、ビットレート、パケットレート、合計バイト数とともに、通信量の多い送信元から宛先へのフローが一覧表示されます。{{< ui >}}View traffic{{< /ui >}} をクリックして、デバイスのサマリーページおよび [NetFlow Monitoring][1] でさらに調査します。

{{< img src="/network_device_monitoring/network_topology_map/traffic_2.png" alt="トラフィックタブが開いている NDM デバイスビューで、スループット統計、トラフィックグラフ、およびトップ会話テーブルが表示されています。" style="width:100%;" >}}

### イベント {#events}

{{< ui >}}Events{{< /ui >}} タブをクリックして、Syslog メッセージと SNMP トラップを 1 つの統合されたビューで表示します。フィルターを使用して、イベントタイプで結果を絞り込みます。イベントボリュームの急増は視覚的に強調表示され、エラーの特定と調査を助けます。

{{< img src="/network_device_monitoring/network_topology_map/events.png" alt="イベントタブが開いている NDM デバイスビューで、Syslog メッセージと SNMP トラップが表示されています。" style="width:100%;" >}}

### フローの詳細を表示する {#view-flow-details}

デバイスのトラフィックソース、宛先、およびボリュームを調査するには、{{< ui >}}Open Device Page{{< /ui >}} ドロップダウンをクリックして {{< ui >}}NetFlow Monitoring{{< /ui >}} を選択します。データは自動的にデバイスの `@device.ip` でフィルタリングされます。詳細については、[NetFlow Monitoring][1] を参照してください。

{{< img src="/network_device_monitoring/network_topology_map/netflow_tab_4.png" alt="NetFlow Monitoring オプションを表示しているデバイスページを開くドロップダウンがある NDM デバイスビュー。" style="width:100%;" >}}

### デバイス設定 {#device-settings}

NDM デバイスビューで {{< ui >}}Device Settings{{< /ui >}} アイコンをクリックして、デバイス設定パネルを開きます。{{< ui >}}Information{{< /ui >}} タブには、一般的な詳細 (名前、名前空間、説明)、ネットワークの詳細 (IP アドレス、サブネット、地理的位置)、およびハードウェアの詳細 (モデル、ベンダー、OS、バージョン) が表示されます。{{< ui >}}Tags{{< /ui >}} タブでは、デバイスに関連付けられたタグを表示して管理できます。

{{< img src="/network_device_monitoring/network_topology_map/device_settings.png" alt="NDM デバイスのデバイス設定パネルで、一般、ネットワーク、ハードウェアの詳細を表示する情報タブを示しています。" style="width:90%;" >}}

### リンクの詳細 {#link-details}

デバイス間のリンクをクリックして、トラフィック量、帯域幅の利用状況、エラー、廃棄などの接続の詳細情報を調べます。[デバイス概要][10]または [NetFlow Monitoring][11] でデータを表示するオプションがあります。

{{< img src="/network_device_monitoring/network_topology_map/link_details.mp4" alt="デバイス間のリンクをクリックしてリンクの追加情報を表示しているユーザー。" video="true" >}}

### アイコンの凡例 {#icon-legend}

SNMP デバイスは、[デバイスプロファイル][4]の定義に従って、各デバイスノードのデバイスタイプに基づいて代表的なアイコンにマッチングされます。

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
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/access-point.png" alt="アクセスポイントアイコン" style="width:10%; border:none;" popup="false">}}</td>
    <td>アクセスポイント</td>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/firewall.png" alt="ファイアウォールアイコン" style="width:10%; border:none;" popup="false">}}</td>
    <td>ファイアウォール</td>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/router.png" alt="ルーターアイコン" style="width:10%; border:none;" popup="false">}}</td>
    <td>ルーター</td>
  </tr>
  <tr>
   <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/server.png" alt="サーバーアイコン" style="width:10%; border:none;" popup="false">}}</td>
    <td>サーバー</td>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/switch.png" alt="スイッチアイコン" style="width:10%; border:none;" popup="false">}}</td>
    <td>スイッチ</td>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/device.png" alt="デバイスアイコン" style="width:10%; border:none;" popup="false">}}</td>
    <td>デバイス</td>
  </tr>
</table>

## トラブルシューティング {#troubleshooting}

ネットワークトポロジーマップの使用中に問題が発生した場合は、下記のトラブルシューティングガイドラインを使用してください。さらにサポートが必要な場合は、[Datadog サポート][5]にお問い合わせください。

### 空のマップメッセージ {#empty-map-message}

{{< img src="/network_device_monitoring/network_topology_map/no_devices_found.png" alt="NDM が構成されていないかフィルタリングのためにデバイスが見つからないときに表示されるメッセージです。" style="width:80%;" >}}

デバイスがないのは、NDM が構成されていないためです。

### 接続が見つからない / 表示する接続されたデバイスがない {#no-connections-found-no-connected-devices-to-show}

{{< img src="/network_device_monitoring/network_topology_map/no_connections_found.png" alt="NDM が構成されていないかフィルタリングのためにデバイスが見つからないときに表示されるメッセージです。" style="width:80%;" >}}

- モニター対象外のデバイスを表示するには、{{< ui >}}Unmonitored Device{{< /ui >}} の選択をオンにします。
-  タグを使用して、情報の階層構造を理解し、マップ表示をよりわかりやすくします。

### 不足しているデバイス/接続 {#missing-devicesconnections}

デバイストポロジーマップのデータは、SNMP で収集された LLDP (Link Layer Discovery Protocol) および CDP (Cisco Discovery Protocol) 情報に基づいています。マップにデバイスや接続が欠落している場合は、下記を確認してください。

- Datadog Agent バージョン 7.52 以降がインストールされていること。
- デバイスの SNMP で LLDP および/または CDP が有効であること。

下記のコマンドでデバイスが LLDP および CDP データを公開していることを確認します。

LLDP データの場合:

```yaml
sudo -u dd-agent datadog-agent snmp walk <DEVICE_IP> 1.0.8802
```
CDP データの場合:
```yaml:
sudo -u dd-agent datadog-agent snmp walk <DEVICE_IP> 1.3.6.1.4.1.9.9.23
```

### 欠落している接続またはリンク {#missing-connections-or-links}

デバイスが LLDP または CDP でトポロジーデータを公開しているものの、一部の接続が欠落している場合は、{{< ui >}}Unmonitored Device{{< /ui >}} の選択がオフになっていることを確認してください。

### マップに表示されるモニター対象外デバイス {#unmonitored-devices-showing-on-map}

デバイストポロジーマップには、LLDP または CDP で発見されたすべてのデバイスが表示されます。これらは、SNMP でまだモニターされていない新しいデバイス、または相当するモニター対象デバイスに [解決](#device-resolution) されていない既存のデバイスです。
{{< ui >}}Unmonitored Device{{< /ui >}} の選択を使用して、これらのノードを非表示にできます。

### マップ上で重複しているデバイス {#device-duplicated-on-map}

デバイストポロジーマップは、LLDP および/または CDP で発見されたすべてのデバイスを表示します。場合によっては、これらのデバイスはすでに SNMP でモニターされているものの、相当するモニター対象デバイスに [解決](#device-resolution) できないことがあります。この場合、そのデバイスは 2 回表示されます。1 つノードはモニター対象デバイスを表し、もう 1 つのノードは LLDP/CDP で発見されたデバイスを表します。
{{< ui >}}Unmonitored Device{{< /ui >}} の選択を使用して、モニター対象外のノードを非表示にします。

### マップ上の枠なしまたは黒いノード {#borderless-or-black-nodes-on-the-map}

デバイストポロジーマップ上の枠なしまたは黒いノードは、NDM でモニターするように構成されていない LLDP または CDP で発見されたデバイス、または同等の[モニター対象デバイス](#device-resolution)に解決できない LLDP または CDP で発見されたデバイスを表すことがあります。

## デバイスの解決 {#device-resolution}

デバイストポロジーマップは、NDM でモニターされているデバイスとその物理的接続の概要を示します。トポロジーリンクのデータは、SNMP で収集された LLDP (Link Layer Discovery Protocol) および CDP (Cisco Discovery Protocol) 情報に基づいています。
LLDP または CDP で発見された接続は、すでに SNMP でモニターされているデバイスに相当することがあります。デバイスの解決は、発見されたデバイスをモニター対象デバイスに一致させることです。

### デバイスの解決の失敗 {#device-resolution-failures}

デバイスが NDM でモニターされていない場合、または発見されたデバイスをモニター対象デバイスにマッチングするのに LLDP または CDP のデータが不十分である場合、デバイスの解決が失敗することがあります。

## 次のステップ {#next-steps}

NDM は、インフラストラクチャーをモニターするための複数の視覚化ツールを提供します。

- **[デバイスジオマップ][9]**: デバイスの地理的な分布を表示し、地域の問題やカバレッジのギャップを特定します。
- **[デバイス概要][10]**: 個々のデバイスの詳細なメトリクスとパフォーマンスデータにアクセスします。
- **[NetFlow Monitoring][1]**: ネットワーク全体のトラフィックフローと帯域幅の利用状況を分析します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/network_monitoring/netflow/
[2]: https://app.datadoghq.com/devices/maps/topology 
[3]: /ja/network_monitoring/devices/snmp_metrics/?tab=snmpv2#autodiscovery
[4]: /ja/network_monitoring/devices/profiles/
[5]: /ja/help
[6]: /ja/network_monitoring/devices/snmp_metrics/?tab=snmpv2#ping
[7]: /ja/datadog_cloudcraft/
[8]: /ja/network_monitoring/devices/topology
[9]: /ja/network_monitoring/devices/geomap
[10]: https://app.datadoghq.com/devices
[11]: https://app.datadoghq.com/devices/netflow
[12]: /ja/infrastructure/end_user_device_monitoring/