---
aliases:
- /ja/network_monitoring/devices/network_topology_map
- /ja/network_monitoring/devices/device_topology_map
code_lang: topology
code_lang_weight: 0
further_reading:
- link: https://www.datadoghq.com/blog/visualize-network-device-topology/
  tag: Blog
  text: デバイストポロジーマップを使用してオンプレミスネットワーク全体の関係を可視化する
- link: /network_monitoring/devices/data
  tag: Documentation
  text: Network Device Monitoring で収集されるデータ
- link: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  tag: Blog
  text: Datadog による SNMP のモニタリング
title: デバイストポロジーマップ
type: multi-code-lang
---
## 概要 {#overview}

[ネットワークデバイストポロジーマップ][2]は [Cloudcraft][7] 図を使用して、ネットワークの物理接続をインタラクティブに可視化します。このマップは、デバイス、そのインターフェイス、およびそれらの間の関係を自動的に検出して表示します。この可視化により、ネットワークデバイスの問題の特定、アップストリームおよびダウンストリームへの影響の把握、接続の問題のトラブルシューティング、インフラストラクチャーを流れるトラフィックに対する知見の把握が可能になります。

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_new_4.mp4" alt="ユーザーがチーム、サービス、ベンダーのタグをネットワークデバイストポロジーマップに追加し、デバイスを選択して NDM デバイスビューを開きます。" video="true" >}}

## セットアップ {#setup}

Datadog Agent バージョン 7.52 以降では、トポロジ―データが自動的に収集されます。追加のインストールは不要です。

###前提条件 {#prerequisites}

1. デバイスで SNMP を使用した LLDP (Link Layer Discovery Protocol) または CDP (Cisco Discovery Protocol) あるいはその両方が有効になっていること。接続されたデバイスが相互に検出できるように、同じプロトコルを使用してください。通常は、より一般的なオプションである LLDP が推奨されます。
2.Datadog Agent バージョン 7.52 以降がインストールされていること。

##ナビゲーションオプション {#navigation-options}

ネットワークトポロジ―マップでは、次のナビゲーションオプションを使用できます。

### Group by {#group-by}

[Group by] (グループ化) で、`location` や `vendor` などの**タグ**を使用して、デバイスの可視化方法を選択します。

{{< img src="/network_device_monitoring/network_topology_map/device-topology-group_by_2.png" alt="場所とベンダーのタグを表示している [Group by] コントロール。" style="width:90%;" >}}

### デバイスのフィルタリング {#filter-devices}

[**+ Filter**] (+ フィルター) ドロップダウンを選択して、デバイストポロジーマップに表示するデバイスを絞り込みます。

{{< img src="/network_device_monitoring/network_topology_map/device_topology_filter_3.png" alt="フィルタードロップダウンが開いた状態のデバイストポロジーマップ。" style="width:90%;" >}}

**注:** [**Filter Devices**] (デバイスのフィルタリング) 設定によって、検索バーのデバイスファセットでフィルタリングする場合も含め、すべてのクエリでデバイストポロジーマップに表示されるデバイスが決定されます。

###リソース {#resources}

[**Resource**] (リソース) ドロップダウンを使用して、ファイアウォール、アクセスポイント、ルーターなどの特定のデバイスタイプで図をフィルタリングします。

{{< img src="/network_device_monitoring/network_topology_map/resources_dropdown.png" alt="[Resource] ドロップダウンが開き、[Unmonitored Device] のチェックが外れている状態のデバイストポロジーマップ。" style="width:30%;" >}}

デフォルトでは [**Unmonitored Device**] (モニター対象外デバイス) オプションのチェックは外れており、Network Device Monitoring で直接モニタリングされていないものの、隣接するモニタリング対象デバイスから LLDP/CDP を通じて検出されたデバイスは非表示になります。図にこれらのモニター対象外デバイスを表示するには、このオプションにチェックを入れます。

##デバイスの調査 {#investigating-devices}

デバイストポロジーマップでは、ネットワークの物理接続の概要を表示するだけでなく、個々のデバイスを調査して、その接続、フロー、および全体的なステータスを把握できます。デバイスにカーソルを合わせると、ステータスと主要メトリクスが表示されます。デバイスをクリックすると NDM デバイスビューが開き、IP アドレス、タグ、スループット、CPU、メモリなどの詳細が表示されます。

デバイスの調査中に、デバイスビューの右上にある [**Open Device Page**] (デバイスページを開く) ドロップダウンをクリックすると、[NetFlow Monitoring][1] やその他の関連ページに移動してさらに詳しく調査できます。

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_device_inspect_view_7.png" alt="デバイスが選択され、NDM デバイスビューに情報が表示されている状態のネットワークデバイストポロジーマップ。" style="width:100%;" >}}

### 依存関係 {#dependencies}

NDM デバイスビューの [**Dependencies**] (依存関係) セクションには、物理的に接続されたデバイスと VPN トンネルの数が一目でわかるように表示され、隣接するデバイスの視覚的なグラフも表示されます。

{{< img src="/network_device_monitoring/network_topology_map/topology_dependencies.png" alt="接続されたデバイスのグラフを含む [Dependencies] セクションを表示している NDM デバイスビュー。" style="width:100%;" >}}

[**View dependencies**] (依存関係を表示) をクリックして、完全なデバイスページを開きます。[**Dependencies**] タブで、[**Physical**] (物理) または [**VPN**] フィルターを使用して、物理接続と VPN トンネルを切り替えます (VPN の依存関係には [VPN モニタリング][12] の設定が必要です)。物理ビューには、トポロジ―グラフと共に、接続されたデバイスのステータス、デバイス名、IP アドレス、モニター、ローカルインターフェイス、リモートインターフェイスを示すテーブルが表示されます。

{{< img src="/network_device_monitoring/network_topology_map/ndm_summary_dependencies.png" alt="[Physical] フィルターが選択され、トポロジ―グラフと、ステータス、IP アドレス、インターフェイスの詳細を含む接続デバイスのテーブルが表示されている NDM デバイスページの [Dependencies] タブ。" style="width:100%;" >}}

### メトリクス {#metrics}

NDM デバイスビューの [**Metrics**] (メトリクス) タブをクリックすると、CPU 使用率、メモリ使用率、スループットなどのデバイスの主要メトリクスが表示されます。サマリー統計が上部に表示され、各メトリクスが時系列グラフとして表示されます。[**View all metrics**] (すべてのメトリクスを表示) をクリックすると、収集されたメトリクスの完全なリストが表示されます。

{{< img src="/network_device_monitoring/network_topology_map/metrics_3.png" alt="[Metrics] タブが開き、CPU、メモリ、スループットのグラフが表示されている NDM デバイスビュー。" style="width:100%;" >}}

### トラフィック {#traffic}

[**Traffic**] (トラフィック) タブをクリックすると、デバイスの合計、インバウンド、アウトバウンドのスループットが表示されます。トラフィックグラフには時系列のアクティビティが表示され、[**Top Conversations**] (上位の会話) テーブルには、ビットレート、パケットレート、合計バイト数と共に、ソースから宛先へのボリュームの特に大きいフローがリストされます。[**View traffic**] (トラフィックを表示) をクリックして、デバイスサマリーページや [NetFlow Monitoring][1] でさらに詳しく調査します。

{{< img src="/network_device_monitoring/network_topology_map/traffic_2.png" alt="[Traffic] タブが開き、スループット統計、トラフィックグラフ、[Top Conversations] テーブルが表示されている NDM デバイスビュー。" style="width:100%;" >}}

### イベント {#events}

[**Events**] (イベント) タブをクリックすると、Syslog メッセージと SNMP トラップが 1 つの統合ビューに表示されます。フィルターを使用して、イベントタイプ別に結果を絞り込みます。イベントボリュームのスパイクが視覚的に強調表示されるため、エラーの特定と調査に役立ちます。

{{< img src="/network_device_monitoring/network_topology_map/events.png" alt="[Events] タブが開き、Syslog メッセージと SNMP トラップが表示されている NDM デバイスビュー。" style="width:100%;" >}}

### フロー詳細の表示 {#view-flow-details}

デバイスのトラフィックのソース、宛先、およびボリュームを確認するには、[**Open Device Page**] ドロップダウンをクリックし、[**NetFlow Monitoring**] を選択します。データはデバイスの `@device.ip` によって自動的にフィルタリングされます。詳細については、[NetFlow Monitoring][1] を参照してください。

{{< img src="/network_device_monitoring/network_topology_map/netflow_tab_4.png" alt="[Open Device Page] ドロップダウンに [NetFlow Monitoring] オプションが表示されている NDM デバイスビュー。" style="width:100%;" >}}

### デバイス設定 {#device-settings}

NDM デバイスビューで **Device Settings** (デバイス設定) アイコンをクリックすると、Device Settings パネルが開きます。[**Information**] (情報) タブには、全般的な詳細 (名前、名前空間、説明)、ネットワークの詳細 (IP アドレス、サブネット、および地理的位置)、およびハードウェアの詳細 (モデル、ベンダー、OS、バージョン) が表示されます。[**Tags**] (タグ) タブでは、デバイスに関連付けられたタグの表示と管理ができます。

{{< img src="/network_device_monitoring/network_topology_map/device_settings.png" alt="NDM デバイスの [Device Settings] パネル。全般、ネットワーク、およびハードウェアの詳細が表示された [Information] タブを示しています。" style="width:90%;" >}}

### リンクの詳細 {#link-details}

デバイス間のリンクをクリックすると、トラフィック量、帯域幅の利用状況、エラー、破棄などの接続の詳細を確認できます。また、[デバイス概要][10]または [NetFlow Monitoring][11] でデータを表示するオプションも用意されています。

{{< img src="/network_device_monitoring/network_topology_map/link_details.mp4" alt="ユーザーがデバイス間のリンクをクリックし、追加のリンク詳細が表示される。" video="true" >}}

### アイコンの凡例 {#icon-legend}

SNMP デバイスは、[デバイスプロファイル][4]で定義されている各デバイスノードのデバイスタイプに基づいて、代表的なアイコンにマッチングされます。

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

## トラブルシューティング {#troubleshooting}

ネットワークトポロジ―マップの使用中に問題が発生した場合は、次のトラブルシューティングガイドラインを参照してください。さらにサポートが必要な場合は、[Datadog サポート][5]にお問い合わせください。

###空のマップメッセージ {#empty-map-message}

{{< img src="/network_device_monitoring/network_topology_map/no_devices_found.png" alt="NDM が構成されていないか、フィルタリングが原因でデバイスが見つからない場合に表示されるメッセージ。" style="width:80%;" >}}

NDM が構成されていないため、デバイスがありません。

###接続が見つからない/表示する接続済みデバイスがない {#no-connections-found-no-connected-devices-to-show}

{{< img src="/network_device_monitoring/network_topology_map/no_connections_found.png" alt="NDM が構成されていないか、フィルタリングが原因でデバイスが見つからない場合に表示されるメッセージ。" style="width:80%;" >}}

- モニター対象外のデバイスを表示するには、**Unmonitored Device** (モニター対象外デバイス) の選択をオンにします。
-分類タグを使用を使用すると、情報階層を含むマップビューを理解しやすくなります。

###デバイス/接続の欠落 {#missing-devicesconnections}

デバイストポロジーマップのデータは、SNMP で収集された LLDP (Link Layer Discovery Protocol) および CDP (Cisco Discovery Protocol) の情報に基づいています。マップにデバイスや接続が不足している場合は、次のものを確認してください。

- Datadog Agent バージョン 7.52 以降がインストールされていること。
-デバイスで SNMP を使用した LLDP または CDP が有効になっていること。

デバイスが LLDP および CDP データを公開していることを、次のコマンドで確認します。

LLDP データの場合:

```yaml
sudo -u dd-agent datadog-agent snmp walk <DEVICE_IP> 1.0.8802
```
CDP データの場合
```yaml:
sudo -u dd-agent datadog-agent snmp walk <DEVICE_IP> 1.3.6.1.4.1.9.9.23
```

### 接続またはリンクの欠落 {#missing-connections-or-links}

デバイスが LLDP または CDP でトポロジーデータを公開しているにもかかわらず、一部の接続が欠落している場合は、[**Unmonitored Device**] の選択がオフになっていることを確認してください。

###マップに表示されるモニター対象外デバイス {#unmonitored-devices-showing-on-map}

デバイストポロジーマップには、LLDP または CDP で検出されたすべてのデバイスが表示されます。これらは、SNMP でまだモニタリングされていない新しいデバイス、または同等のモニタリング対象デバイスに[解決](#device-resolution)されなかった既存のデバイスである可能性があります。
[**Unmonitored Device**] の選択を使用して、これらのノードを非表示にすることができます。

###マップ上でデバイスが重複している {#device-duplicated-on-map}

デバイストポロジーマップには、LLDP または CDP で検出されたすべてのデバイスが表示されます。場合によっては、これらのデバイスはすでに SNMP でモニタリングされていますが、同等のモニタリング対象デバイスに[解決](#device-resolution)できないことがあります。この場合、デバイスは 2 回表示されます。1 つはモニタリング対象デバイスを表すノード、もう 1 つは LLDP/CDP で検出されたデバイスを表すノードです。
[**Unmonitored Device**] の選択を使用して、モニター対象外のノードを非表示にします。

###マップ上の枠線なしまたは黒色のノード {#borderless-or-black-nodes-on-the-map}

デバイストポロジーマップ上の枠線なしまたは黒色のノードは、LLDP または CDP で検出されたが NDM でモニタリング対象として構成されていないデバイス、あるいは LLDP または CDP で検出されたが同等の [モニタリング対象デバイス](#device-resolution) に解決できないデバイスを表している可能性があります。

##デバイスの解決 {#device-resolution}

デバイストポロジーマップは、NDM でモニタリングされているデバイスとその物理的な接続の概要を提供します。トポロジーリンクのデータは、SNMP で収集された LLDP (Link Layer Discovery Protocol) または CDP (Cisco Discovery Protocol) の情報に基づいています。
LLDP または CDP で検出された接続は、すでに SNMP でモニタリングされているデバイスに対応している場合があります。デバイス解決とは、検出されたデバイスをモニタリング対象のデバイスと一致させることです。

###デバイス解決の失敗 {#device-resolution-failures}

デバイスが NDM でモニタリングされていない場合、または LLDP や CDP のデータが不足していて検出されたデバイスをモニタリング対象のデバイスと一致させられない場合、デバイス解決に失敗することがあります。

##次のステップ {#next-steps}

NDM は、インフラストラクチャーをモニタリングするための複数の視覚化ツールを提供しています。

- **[デバイスジオマップ][9]**: デバイスの地理的分布を場所ごとに表示し、地域の問題やカバレッジのギャップを特定します。
- **[デバイス概要][10]**: 個々のデバイスの詳細なメトリクスとパフォーマンスデータにアクセスします。
- **[NetFlow Monitoring][1]**: ネットワーク全体のトラフィックフローと帯域幅の利用状況を分析します。

##その他の参考資料 {#further-reading}

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
[12]: /ja/network_monitoring/devices/vpn_monitoring/