---
aliases:
- /ja/network_monitoring/devices/netflow/
further_reading:
- link: /network_monitoring/devices/profiles
  tag: ドキュメント
  text: ネットワークデバイスモニタリングのプロファイルの使用
- link: https://www.datadoghq.com/blog/monitor-netflow-with-datadog/
  tag: ブログ
  text: Datadog で NetFlow トラフィックデータを監視する
- link: https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/
  tag: ブログ
  text: SNMP トラップによるネットワークパフォーマンスの問題の監視と診断
title: NetFlow Monitoring
---
## 概要 {#overview}

Network Device Monitoring の NetFlow ビューは、フローデータをエクスポートするデバイス (ルーター、ファイアウォール、スイッチなど) から収集されたネットワークトラフィックフローの可視化を提供します。トラフィック量を分析し、主要なトーカーを特定し、データがネットワーク内をどのように移動するかを理解できます。

NetFlow ビューには、デバイスとインターフェイスごとに集計されたトラフィックメトリクスが表示されます。これを使用して、どのデバイスまたはインターフェイスが最も帯域幅を消費しているか、最も多くのパケットを生成しているか、トラフィックスパイクに寄与しているかを特定できます。

{{< img src="network_device_monitoring/netflow/netflow.png" alt="トラフィック量、デバイスの健全性、フローなどの折りたたみ可能な凡例が表示された NetFlow Monitoring ページ。" style="width:100%;" >}}

## サイドナビゲーション {#side-navigation}

追加の NetFlow ビューを確認するには、左側のナビゲーションを使用します。

- **Traffic Volume**: デバイスとインターフェイスごとの全体的なフローのメトリクス。
- **Device Health**: 監視対象デバイスのステータスと利用状況。
- **Flows**: 個々のフローの詳細なレコード。
- **Conversations**: 集計された送信元と宛先のペア。
- **Autonomous Systems**: 自律システム番号 (ASN) でグループ化されたフローデータ。
- **Geo IP**: 地理的起源/宛先でグループ化されたフローデータ。
- **Source Ports / Destination Ports / Protocols / Flags**: パケットメタデータ別のトラフィックの内訳。

## インストール {#installation}

ネットワークデバイスモニタリングで NetFlow Monitoring を使用するには、[Agent][1] のバージョン 7.45 以降を使用していることを確認してください。

**注:** NetFlow データの送信には、[ネットワークデバイスモニタリングからのメトリクス収集][2]の構成は必須ではありませんが、この追加データを使用してデバイス名、モデル、ベンダー、インバウンド/アウトバウンドインターフェイス名などの情報でフローレコードをリッチ化できるため、強く推奨されています。

## 構成 {#configuration}

NetFlow、jFlow、sFlow、または IPFIX トラフィックを Agent NetFlow サーバーに送信するようにデバイスを構成するには、Datadog Agent がインストールされている IP アドレスに、具体的には `flow_type` と `port` を指定してトラフィックを送信するようにデバイスを構成する必要があります。

1. Agent コンフィギュレーションファイル [`datadog.yaml`][3] を編集して NetFlow を有効にします。

```yaml
network_devices:
  netflow:
    enabled: true
    listeners:
      - flow_type: netflow9   # choices: netflow5, netflow9, ipfix, sflow5
        port: 2055            # devices need to be configured to the same port number
      - flow_type: netflow5
        port: 2056
      - flow_type: ipfix
        port: 4739
      - flow_type: sflow5
        port: 6343
    ## Set to true to enable reverse DNS enrichment of private source and destination IP addresses in NetFlow records
    reverse_dns_enrichment_enabled: false
```

2. 変更内容を保存したら、[Agent を再起動][4]します。

   **注**: [ファイアウォールルール][9]で、構成したポートの受信 UDP トラフィックが許可されていることを確認してください。

## 集計 {#aggregation}

Datadog Agent は、NetFlow から受信したデータを自動的に集約し、送信されるレコードの数を抑えながら、情報の大部分を維持します。デフォルトでは、`source`、`destination address`、`port`、`protocol` など同じ識別子を持つフローの記録が 5 分ごとに集約されます。また、Datadog Agent は短期間しか使用されないポート (エフェメラルポート) を検出して除去することが可能です。その結果、 `port:*` と表示されるフローが確認されることがあります。

## リッチ化 {#enrichment}

NetFlow データは Datadog のバックエンドにより処理され、デバイスおよびインターフェイスから利用できるメタデータでリッチ化されます。リッチ化は、NetFlow エクスポーターの IP とインターフェイスインデックスに基づいて行われます。再利用されたプライベート IP が競合する可能性に対し、曖昧性を解消するため、Agent コンフィギュレーションファイルごとに異なる `namespace` を構成することができます (`network_devices.namespace` の設定を使用します)。

NetFlow エクスポーターの IP がデバイスの IP の 1 つではあるが、SNMP インテグレーションで構成されたものではない場合、Datadog はエクスポーターの IP が属するデバイスの特定を試み、一意で一致する場合に限り、その情報で NetFlow データをリッチ化します。

### クラウドプロバイダーの IP アドレスの拡張 {#cloud-provider-ip-enrichment}

Datadog は、IPv4 アドレスに対してパブリッククラウドプロバイダーのサービスとリージョンの情報を付加し、特定のサービスやリージョンからのフローレコードをフィルタリングできるようにします。

{{< img src="network_device_monitoring/netflow/netflow_cloud_provider_enrichment_2.png" alt="クラウドプロバイダー名、リージョン、およびサービスが表示された NetFlow フィルターメニュー" width="100%" >}}

### ポートの拡張 {#port-enrichment}

Datadog は、NetFlow のポートに対して IANA (Internet Assigned Numbers Authority) のデータを使用してよく知られたポートマッピング (例: 5432 の Postgres や 443 の HTTPS) を解決します。

### カスタムポートの拡張 {#custom-port-enrichment}

また、特定のポートで実行されているカスタムサービスがある場合など、ポートやプロトコルを特定のアプリケーションにマッピングする独自のカスタム拡張を追加することも可能です。これにより、ネットワークエンジニアやそのチームが、人間が読みやすい名前で NetFlow データを解釈し、クエリを実行しやすくなります。

NetFlow の **Configuration** タブで **+ Add Enrichment** をクリックし、カスタム拡張を含む CSV ファイルをアップロードします。

{{< img src="network_device_monitoring/netflow/new_enrichment_2.png" alt="NetFlow 構成タブの新しいエンリッチメントマッピングモーダル" width="100%" >}}

### カスタム IP の拡張 {#custom-ip-enrichment}

IP と CIDR をカスタムタグにマッピングするために、独自のカスタムエンリッチメントを追加することもできます (たとえば、特定の IP アドレスで実行されているサービスを分類するため)。これにより、ネットワークエンジニアやそのチームが、人間が読みやすい名前で NetFlow データを解釈し、クエリを実行しやすくなります。

[**Enrichment** 設定ページ][10] で、**+ Add Enrichment** をクリックしてマッピングを手動で追加するか、CSV ファイルをアップロードしてマッピングを一括追加します。

### リバース DNS プライベート IP の拡張 {#reverse-dns-private-ip-enrichment}

リバース DNS プライベート IP の拡張を有効にして、送信元または宛先 IPアドレスに関連付けられたホスト名の DNS ルックアップを実行します。有効にすると、Agent はプライベートアドレス範囲内の送信元および宛先 IP に対してリバース DNS ルックアップを実施し、対応するホスト名で NetFlow レコードを拡張します。

[デフォルト][7]では、`datadog.yaml` ファイルにおいて、リバース DNS IP の拡張は無効になっています。有効にするには、このページの[構成](#configuration)セクションを参照してください。

リバース DNS IP の拡張に関連するフローを見つけるには、**+ Filter** メニューで **DNS** を検索してください。

{{< img src="network_device_monitoring/netflow/dns_ip_enrichmen_2.png" alt="フィルターメニューが拡張され、リバース DNS の宛先と送信元のファセットが表示されます。" width="100%" >}}

**注**: リバース DNS エントリはキャッシュされ、DNS クエリを最小限に抑えて DNS サーバーへの負荷を軽減するためのレート制限の対象となります。デフォルトのキャッシングやレート制限の変更など、他の構成オプションについては、[完全なコンフィギュレーションファイル][8]を参照してください。

## IP の詳細 {#ip-details}

**Conversations** ビューで、宛先 IP のパブリック IP アドレスを確認できます。IP にカーソルを合わせると、IP に関する豊富なメタデータと、接続をさらに詳しく調べるための **View Related Network Connections** リンクが表示されます。

{{< img src="network_device_monitoring/netflow/NetFlow_IP_pill.png" alt="IP アドレスにカーソルを合わせると、IP の詳細と関連するネットワーク接続が表示されます。" width="100%" >}}

## フローダイアグラム {#flow-diagram}

**Flows** メニューをクリックし、リストのフローにカーソルを合わせると、関連ネットワーク接続の送信元 IP、入力インターフェイス名、デバイス名、および宛先 IP に関する追加情報を表示できます。

{{< img src="network_device_monitoring/netflow/flows.png" alt="NetFlow を送信するデバイスから集計されたフローにカーソルを合わせると、関連するネットワーク接続情報にアクセスできます。" width="100%" >}}

## NetFlow モニター {#netflow-monitor}

任意のビューから **Create Monitor** アイコンをクリックして、[NetFlow モニター][6]を作成します。モニターを作成する際は、デバイスの観点から送信元 IP または宛先 IP に関して下記のフィールドを考慮する必要があります。これらのフィールドは、ネットワークトラフィックのパターンを理解し、パフォーマンスとセキュリティを最適化するのに役立ちます。

{{< img src="network_device_monitoring/netflow/create_monitor.png" alt="Create Monitor リンクが強調表示された NetFlow Monitoring の Flows ビュー。" width="100%" >}}

### インターフェイス情報 {#interface-information}

次のフィールドは、入力インターフェイスと出力インターフェイスに関する詳細を表します。

| フィールド名 | フィールドの説明 |
|---|---|
| Egress Interface Alias | 出力インターフェイスのエイリアス。|
| Egress Interface Index | 出力インターフェイスのインデックス。|
| Egress Interface Name | 出力インターフェイスの名前。|
| Ingress Interface Alias | 入力インターフェイスのエイリアス。|
| Ingress Interface Index | 入力インターフェイスのインデックス。|
| Ingress Interface Name | 入力インターフェイスの名前。|

### デバイス情報 {#device-information}

次のフィールドは、NetFlow レコードを生成するデバイスに関する詳細を表します。

| フィールド名 | フィールドの説明 |
|---|---|
| Device IP | 拡張のために NDM 内のデバイスにマッピングされる IP アドレス。|
| Exporter IP | NetFlow パケットの送信元の IP アドレス。|
| Device Model | デバイスのモデル。|
| Device Name | デバイスの名前。|
| Device Namespace | デバイスのネームスペース。|
| Device Vendor | デバイスのベンダー。|

### フローの詳細 {#flow-details}

次のフィールドは、ネットワークフローの特性を表します。

| フィールド名 | フィールドの説明 |
|---|---|
| Direction | フローがインバウンドかアウトバウンドかを示します。|
| Start Time | 送信元 IP と宛先 IP 間で最初に送信されたネットワークパケットのタイムスタンプ。|
| End Time | 送信元 IP と宛先 IP 間で最後に送信されたネットワークパケットのタイムスタンプ。|
| Ether Type | Ethernet フレームのカプセル化の種類 (IPv4 または IPv6)。|
| Flow Type | NetFlow データのフォーマットの種類 (IPFIX、sFlow5、NetFlow5、NetFlow9、または不明)。|
| IP Protocol | 通信に使用されるプロトコル (例: ICMP、TCP、UDP など)。|
| Next Hop IP | ネットワークパス上の次のホップの IP アドレス。|
| TCP Flag | フローの期間中に観測されたすべての TCP フラグの合計。|
| Bytes | 転送されたバイト数の総計。|
| Packets | 転送されたパケット数の総計。|

フィールドに加え、すぐに使えるファセットを活用して、NetFlow の宛先および送信元 IP アドレスに基づくトラフィックパターンの分析を始めることができます。

### NetFlow 宛先 IP ファセット {#netflow-destination-ip-facets}

| ファセット名 | ファセットの説明 |
|---|---|
| Destination AS Domain | 宛先 IP が属する自律システム (AS) に関連付けられたドメイン。|
| Destination AS Name | 宛先 IP が属する自律システム (AS) の名称。|
| Destination AS Number | 宛先 IP が属する自律システム (AS) に割り当てられた番号。|
| Destination AS Route | 宛先 IP が属する自律システム (AS) に関連するルート情報。|
| Destination AS Type | 宛先 IP が属する自律システム (AS) の種類 (トランジット、カスタマー、ピアなど)。|
| Destination Application Name | 宛先 IP に関連するアプリケーションの名称。|
| Destination City Name | 宛先 IP に関連する都市の名称。|
| Destination Cloud Provider Name | 宛先 IP に関連するクラウドプロバイダーの名称。|
| Destination Cloud Provider Region | 宛先 IP に関連するクラウドプロバイダーの地域。|
| Destination Cloud Provider Service | 宛先 IP に関連するクラウドプロバイダーが提供するサービス。|
| Destination Continent Code | 宛先 IP に関連する大陸のコード。|
| Destination Continent Name | 宛先 IP に関連する大陸の名称。|
| Destination Country ISO Code | 宛先 IP に関連する国を表す ISO コード。|
| Destination Country Name | 宛先 IP に関連する国の名称。|
| Destination IP | 宛先 IP アドレス。|
| Destination Latitude | 宛先 IP に関連する緯度座標。|
| Destination Longitude | 宛先 IP に関連する経度座標。|
| Destination MAC | 宛先 IP に関連するメディアアクセス制御 (MAC) アドレス。|
| Destination Mask | 宛先 IP に関連するサブネットマスク。|
| Destination Port | 宛先ポート番号。|
| Destination Reverse DNS Hostname | 宛先 IP に関連する DNS ホスト名。|
| Destination Subdivision ISO Code | 宛先 IP に関連する行政区画 (州や県など) を表す ISO コード。|
| Destination Subdivision Name | 宛先 IP に関連する行政区画 (州や県など) の名称。|
| Destination Timezone | 宛先 IP に関連するタイムゾーン。|

### NetFlow 送信元 IP ファセット {#netflow-source-ip-facets}

| ファセット名 | ファセットの説明 |
|---|---|
| Source AS Domain | 送信元 IP が属する自律システム (AS) に関連付けられたドメイン。|
| Source AS Name | 送信元 IP が属する自律システム (AS) の名称。|
| Source AS Number | 送信元 IP が属する自律システム (AS) に割り当てられた番号。|
| Source AS Route | 送信元 IP が属する自律システム (AS) に関連するルート情報。|
| Source AS Type | 送信元 IP が属する自律システム (AS) の種類 (トランジット、カスタマー、ピアなど)。|
| Source Application Name | 送信元 IP に関連するアプリケーションの名称。|
| Source City Name | 送信元 IP に関連する都市の名称。|
| Source Cloud Provider Name | 送信元 IP に関連するクラウドプロバイダーの名称。|
| Source Cloud Provider Region | 送信元 IP に関連するクラウドプロバイダーの地域。|
| Source Cloud Provider Service | 送信元 IP に関連するクラウドプロバイダーが提供するサービス。|
| Source Continent Code | 送信元 IP に関連する大陸のコード。|
| Source Continent Name | 送信元 IP に関連する大陸の名称。|
| Source Country ISO Code | 送信元 IP に関連する国を表す ISO コード。|
| Source Country Name | 送信元 IP に関連する国の名称。|
| Source IP | 送信元 IP アドレス。|
| Source Latitude | 送信元 IP に関連する緯度座標。|
| Source Longitude | 送信元 IP に関連する経度座標。|
| Source MAC | 送信元 IP に関連するメディアアクセス制御 (MAC) アドレス。|
| Source Mask | 送信元 IP に関連するサブネットマスク。|
| Source Port | 送信元ポート番号。|
| Source Reverse DNS Hostname | 送信元 IP に関連する DNS ホスト名。|
| Source Subdivision ISO Code | 送信元 IP に関連する行政区画 (州や県など) を表す ISO コード。|
| Source Subdivision Name | 送信元 IP に関連する行政区画 (州や県など) の名称。|
| Source Timezone | 送信元 IP に関連するタイムゾーン。|

## 会話の結合 {#conversation-stitching}

デフォルトでは、NetFlow は 2 つのエンドポイント間のトラフィックの各方向について、単方向フローを別々に記録します (A → B と B → A)。会話の結合は、これらを 1 つの双方向レコードにまとめ、2 つのエンドポイント間で交換されるトラフィックの全体像を提供します (A ↔ B)。

会話の結合を使用すると、次のことができます。

- 2 つのエンドポイント間で交換される全トラフィックを別々の方向のフローではなく 1 つの会話として表示する
- 実際の発信者と対応者を特定し、送信元と宛先のウィジェットが正確な役割を反映するようにする
- サーバーが上位の送信元として誤って表示されるノイズを除去する

結合された (双方向) ビューと結合されていない (単方向) ビューを切り替えるには、エンドポイントベースの任意の NetFlow ビューに移動し、日時選択ツールの下にある **Bidirectional** トグルを使用します。

{{< img src="network_device_monitoring/netflow/conversation_stitching.png" alt="NetFlow ビューにおける会話の結合のトグル" width="100%" >}}

## サンプリングレート {#sampling-rate}

NetFlow のサンプリングレートは、デフォルトでバイトおよびパケットの計算に考慮されます。表示されるバイトおよびパケットの値は、サンプリングレートが適用された計算結果です。
さらに、ダッシュボードやノートブックで **Bytes (Adjusted) (@adjusted_bytes)** および **Packets (Adjusted) (@adjusted_packets)** をクエリして、これらのデータを可視化することができます。

デバイスから送信された生のバイト/パケット (サンプル) を可視化するには、ダッシュボードやノートブックで **Bytes (Sampled) (@bytes)** および **Packets (Sampled) (@packets)** をクエリします。

## 保持 {#retention}

NetFlow データはデフォルトで 30 日間保持され、15 日、30 日、60 日、90 日の保持オプションも提供されています。

<div class="alert alert-warning">NetFlowデータをさらに長期間保持したい場合は、アカウント担当者にお問い合わせください。</div>

## フラッシュ間隔あたりのフロー量を制限する {#limit-flow-volume-per-flush-interval}

NetFlow の量と関連コストを制御するには、Agent を構成してフラッシュ間隔ごとに提出されるフローレコードの数を制限します。フラッシュ間隔は、フローが Datadog に転送される前に集約される期間です。

この制限が有効な場合、そのフラッシュ間隔において、Agent は**バイト数が上位のフロー**のみを構成された最大数まで保持し、少量のフローはドロップします。

### 構成 {#configuration-1}

**注**: Agent のバージョン `7.75.1` 以降が必要です。

`datadog.yaml` で次のように構成します。

```yaml
network_devices:
  netflow:
    enabled: true
    aggregator_max_flows_per_flush_interval: 10000
```

この構成では、Agent はフラッシュ間隔 (デフォルトは 5 分) ごとに最大 10,000 件の NetFlow レコードを送信します。Agent は量が多いフローを優先し、残りはドロップします。

### 1 日の量の推定 {#estimating-daily-volume}

1 日のおおよその最大フロー数は次のように求めることができます。

`max_flows_per_flush_interval * (minutes_per_day / flush_interval_minutes)`

たとえば、フラッシュごとのフロー数が `10,000` でフラッシュ間隔が 5 分の場合、次のようになります。

`10,000 * (1440 / 5) = 2,880,000 flows/day`

### 想定される動作 {#expected-behavior}

- **上位のトーカーが優先:** 大量のトラフィック (帯域幅の消費やノイズの多いリンクなど) に特化したワークフローに最適です。
- **少量のフローの可視性が低下:** トラフィックの少ない送信元/宛先ペアは、上限に達した場合に表示されないことがあります。
- **Agent ごとの動作:** 制限は各 Agent に独立して適用されます。複数の Agent で同じ会話のトラフィックを確認する場合、削除前にグローバルに集約されることはありません。

### 削除の監視 {#monitoring-truncation}

フロー制限が有効な場合、Agent は、保持されるデータの量とドロップされるデータの量を把握するために使用できるメトリクスを出力します。

- `ndm.flow_truncation.flows_total`
- `ndm.flow_truncation.flows_kept`
- `ndm.flow_truncation.flows_dropped`
- `ndm.flow_truncation.keep_ratio`
- `ndm.flow_truncation.threshold_value`
- `ndm.flow_truncation.runtime_ms`

これらのメトリクスを使用して、選択した上限を検証し、削除が頻繁に発生している状況を検出できます (上限やフラッシュ間隔の調整が必要であることを示す場合があります)。

## トラブルシューティング {#troubleshooting}

### NetFlow パケットのドロップ {#netflow-packet-drops}
NetFlow パケットのドロップは、1 秒あたりの NetFlow パケット数が非常に多い場合 (通常は 50,000 以上) に発生します。次の手順により、NetFlow パケットのドロップを特定し、緩和することができます。

#### パケットのドロップの特定 {#identifying-packet-drops}

`netstat -s` コマンドを使用して、ドロップされた UDP パケットがあるかどうかを確認します。

```bash
    netstat -s
  ```

#### Mitigation steps
1. Increase the Number of NetFlow Listeners

  Increase the number of NetFlow listeners by using a configuration similar to the following:
  Datadog recommends setting the number of workers to match the number of CPU cores in your system:

```yaml
      netflow:
        enabled: true
        listeners:
          - flow_type: netflow9
            port: 2055
            workers: 4 # 4 CPUs
```

2. UDP キューの長さを増やす (Linux のみ)

  システムの UDP キューの長さを調整することで、NetFlow パケットの大量処理に対応できるようにします。次のコマンドを実行して、UDP 受信バッファのサイズを 25MB に増やします。

```bash
    sudo sysctl -w net.core.rmem_max=26214400
    sudo sysctl -w net.core.rmem_default=26214400
```

3. 構成の永続化 (Linux のみ)

  これらの変更を永続化するには、次の行を `/etc/sysctl.conf` ファイルに追加します。

```bash
    net.core.rmem_max=26214400
    net.core.rmem_default=26214400
```

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /ja/network_monitoring/devices/snmp_metrics/
[3]: /ja/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[4]: /ja/agent/configuration/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[5]: https://app.datadoghq.com/devices/netflow
[6]: /ja/monitors/types/netflow/
[7]: https://github.com/DataDog/datadog-agent/blob/f6ae461a7d22aaf398de5a94d9330694d69560d6/pkg/config/config_template.yaml#L4201
[8]: https://github.com/DataDog/datadog-agent/blob/f6ae461a7d22aaf398de5a94d9330694d69560d6/pkg/config/config_template.yaml#L4203-L4275
[9]: /ja/network_monitoring/devices/troubleshooting#traps-or-flows-not-being-received-at-all
[10]: https://app.datadoghq.com/devices/settings/enrichment/ip