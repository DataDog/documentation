---
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
is_beta: true
title: NetFlow Monitoring
---

## 概要

Datadog で NetFlow Monitoring を使用すると、NetFlow 対応デバイスからのフローレコードを視覚化して監視することができます。

{{< img src="network_device_monitoring/netflow/home.png" alt="NetFlow Monitoring ページには、上位送信元、宛先、プロトコル、送信元ポート、宛先ポート、デバイス傾向のタブが表示されています。" style="width:100%;" >}}

## インストール

ネットワークデバイスモニタリングで NetFlow Monitoring を使用するには、[Agent][1] のバージョン 7.45 以降を使用していることを確認してください。

**注:** NetFlow データの送信には、[ネットワークデバイスモニタリングからのメトリクス収集][2]の構成は必須ではありませんが、この追加データを使用してデバイス名、モデル、ベンダー、インバウンド/アウトバウンドインターフェイス名などの情報でフローレコードをリッチ化できるため、強く推奨されています。

## 構成

NetFlow、jFlow、sFlow、または IPFIX トラフィックを Agent NetFlow サーバーに送信するようにデバイスを構成するには、Datadog Agent がインストールされている IP アドレスに、具体的には `flow_type` と `port` を指定してトラフィックを送信するようにデバイスを構成する必要があります。

NetFlow を有効にするために、Agent コンフィグレーションファイル [`datadog.yaml`][3] を編集します。

```yaml
network_devices:
  netflow:
    enabled: true
    listeners:
      - flow_type: netflow9   # 選択肢: netflow5、netflow9、ipfix、sflow5
        port: 2055            # デバイスを同じポート番号に構成する必要があります
      - flow_type: netflow5
        port: 2056
      - flow_type: ipfix
        port: 4739
      - flow_type: sflow5
        port: 6343
```

変更内容を保存したら、[Agent を再起動][4]します。

## 集計

Datadog Agent は、NetFlow から受信したデータを自動的に集約し、送信されるレコードの数を抑えながら、情報の大部分を維持します。デフォルトでは、`source`、`destination address`、`port`、`protocol` など同じ識別子を持つフローの記録が 5 分ごとに集約されます。また、Datadog Agent は短期間しか使用されないポート (エフェメラルポート) を検出して除去することが可能です。その結果、`port:*` と表示されるフローが確認されることがあります。

## リッチ化

NetFlow データは Datadog のバックエンドにより処理され、デバイスおよびインターフェイスから利用できるメタデータでリッチ化されます。リッチ化は、NetFlow エクスポーターの IP とインターフェイスインデックスに基づいて行われます。再利用されたプライベート IP が競合する可能性に対し、曖昧性を解消するため、Agent コンフィギュレーションファイルごとに異なる `namespace` を構成することができます (`network_devices.namespace` の設定を使用します)。

NetFlow エクスポーターの IP がデバイスの IP の 1 つではあるが、SNMP インテグレーションで構成されたものではない場合、Datadog はエクスポーターの IP が属するデバイスの特定を試み、一意で一致する場合に限り、その情報で NetFlow データをリッチ化します。

### クラウドプロバイダーの IP アドレスの拡張

Datadog は、IPv4 アドレスに対してパブリッククラウドプロバイダーのサービスとリージョンの情報を付加し、特定のサービスやリージョンからのフローレコードをフィルタリングできるようにします。

{{< img src="network_device_monitoring/netflow/netflow_cloud_provider_ip_enrichment.png" alt="クラウドプロバイダー名、地域、サービスで拡張された NetFlow IP" width="80%" >}}

### ポートの拡張

Datadog は、NetFlow のポートに対して IANA (Internet Assigned Numbers Authority) のデータを使用してよく知られたポートマッピング (例：5432 の Postgres や 443 の HTTPS) を解決します。これは、NetFlow でソースや宛先のアプリケーション名を検索する際に確認できます。

{{< img src="network_device_monitoring/netflow/netflow_iana_port_mappings.png" alt="@destination.application_name でフィルタリングされた NetFlow ページで、HTTPS などのポート名を表示しています。" width="80%" >}}

#### カスタムポートの拡張

また、特定のポートで実行されているカスタムサービスがある場合など、ポートやプロトコルを特定のアプリケーションにマッピングする独自のカスタム拡張を追加することも可能です。これにより、ネットワークエンジニアやそのチームが、人間が読みやすい名前で NetFlow データを解釈し、クエリを実行しやすくなります。

NetFlow の **Configuration** タブで **Add Enrichment** をクリックし、カスタム拡張を含む CSV ファイルをアップロードします。

{{< img src="network_device_monitoring/netflow/new_enrichment.png" alt="NetFlow 構成タブの New Enrichment Mapping モーダル" width="80%" >}}

## 視覚化

NetFlow モニタリングによって収集されたデータは、[**NetFlow** ページ][5]からアクセスできます。リスト内のフローにカーソルを合わせると、ホスト、ポッド、コンテナに関する追加情報が表示され、関連するネットワーク接続にアクセスできます。

{{< img src="network_device_monitoring/netflow/information.png" alt="NetFlow を送信するデバイスから集計されたフローにカーソルを合わせると、関連するネットワーク接続情報にアクセスできます。" width="100%" >}}

[NetFlow モニター][6]を作成する際は、デバイスの観点から送信元 IP または宛先 IP に関して以下のフィールドを考慮する必要があります。これらのフィールドは、ネットワークトラフィックのパターンを理解し、パフォーマンスとセキュリティの最適化に役立ちます。

### インターフェイス情報

以下のフィールドは、入力インターフェイスと出力インターフェイスに関する詳細を表します。

| フィールド名 | フィールドの説明 |
|---|---|
| Egress Interface Alias | 出力インターフェイスのエイリアス。 |
| Egress Interface Index | 出力インターフェイスのインデックス。 |
| Egress Interface Name | 出力インターフェイスの名前。 |
| Ingress Interface Alias | 入力インターフェイスのエイリアス。 |
| Ingress Interface Index | 入力インターフェイスのインデックス。 |
| Ingress Interface Name | 入力インターフェイスの名前。 |

### デバイス情報

以下のフィールドは、NetFlow レコードを生成するデバイスに関する詳細を表します。

| フィールド名 | フィールドの説明 |
|---|---|
| Device IP | 拡張のために NDM 内のデバイスにマッピングされる IP アドレス。 |
| Exporter IP | NetFlow パケットの送信元の IP アドレス。 |
| Device Model | デバイスのモデル。 |
| Device Name | デバイスの名前。 |
| Device Namespace | デバイスのネームスペース。 |
| Device Vendor | デバイスのベンダー。 |

### フローの詳細

以下のフィールドは、ネットワークフローの特性を表します。

| フィールド名 | フィールドの説明 |
|---|---|
| 方向 | フローがインバウンドかアウトバウンドかを示します。 |
| Start Time | 送信元 IP と宛先 IP 間で最初に送信されたネットワークパケットのタイムスタンプ。 |
| End Time | 送信元 IP と宛先 IP 間で最後に送信されたネットワークパケットのタイムスタンプ。 |
| Ether Type | Ethernet フレームのカプセル化の種類 (IPv4 または IPv6)。 |
| Flow Type | NetFlow データのフォーマットの種類 (IPFIX、sFlow5、NetFlow5、NetFlow9、または不明) 。 |
| IP Protocol | 通信に使用されるプロトコル (例: ICMP、TCP、UDP など)。 |
| Next Hop IP | ネットワークパス上の次のホップの IP アドレス。 |
| TCP Flag | フローの期間中に観測されたすべての TCP フラグの合計。 |
| Bytes | 転送されたバイト数の総計。 |
| Packets | 転送されたパケット数の総計。 |

フィールドに加え、すぐに使えるファセットを活用して、NetFlow の宛先および送信元 IP アドレスに基づくトラフィックパターンの分析を始めることができます。

### NetFlow 宛先 IP ファセット

| Facet Name | ファセットの説明 |
|---|---|
| Destination AS Domain | 宛先 IP が属する自律システム (AS) に関連付けられたドメイン。 |
| Destination AS Name | 宛先 IP が属する自律システム (AS) の名称。 |
| Destination AS Number | 宛先 IP が属する自律システム (AS) に割り当てられた番号。 |
| Destination AS Route | 宛先 IP が属する自律システム (AS) に関連するルート情報。 |
| Destination AS Type | 宛先 IP が属する自律システム (AS) の種類 (トランジット、カスタマー、ピアなど) 。 |
| Destination Application Name | 宛先 IP に関連するアプリケーションの名称。 |
| Destination City Name | 宛先 IP に関連する都市の名称。 |
| Destination Cloud Provider Name | 宛先 IP に関連するクラウドプロバイダーの名称。 |
| Destination Cloud Provider Region | 宛先 IP に関連するクラウドプロバイダーの地域。 |
| Destination Cloud Provider Service | 宛先 IP に関連するクラウドプロバイダーが提供するサービス。 |
| Destination Continent Code | 宛先 IP に関連する大陸のコード。 |
| Destination Continent Name | 宛先 IP に関連する大陸の名称。 |
| Destination Country ISO Code | 宛先 IP に関連する国を表す ISO コード。 |
| Destination Country Name | 宛先 IP に関連する国の名称。 |
| Destination IP | 宛先 IP アドレス。 |
| Destination Latitude | 宛先 IP に関連する緯度座標。 |
| Destination Longitude | 宛先 IP に関連する経度座標。 |
| Destination MAC | 宛先 IP に関連するメディアアクセス制御 (MAC) アドレス。 |
| Destination Mask | 宛先 IP に関連するサブネットマスク。 |
| Destination Port | 宛先ポート番号。 |
| Destination Subdivision ISO Code | 宛先 IP に関連する行政区画 (州や県など) を表す ISO コード。 |
| Destination Subdivision Name | 宛先 IP に関連する行政区画 (州や県など) の名称。 |
| Destination Timezone | 宛先 IP に関連するタイムゾーン。 |

### NetFlow 送信元 IP ファセット

| Facet Name | ファセットの説明 |
|---|---|
| Source AS Domain | 送信元 IP が属する自律システム (AS) に関連付けられたドメイン。 |
| Source AS Name | 送信元 IP が属する自律システム (AS) の名称。 |
| Source AS Number | 送信元 IP が属する自律システム (AS) に割り当てられた番号。 |
| Source AS Route | 送信元 IP が属する自律システム (AS) に関連するルート情報。 |
| Source AS Type | 送信元 IP が属する自律システム (AS) の種類 (トランジット、カスタマー、ピアなど) 。 |
| Source Application Name | 送信元 IP に関連するアプリケーションの名称。 |
| Source City Name | 送信元 IP に関連する都市の名称。 |
| Source Cloud Provider Name | 送信元 IP に関連するクラウドプロバイダーの名称。 |
| Source Cloud Provider Region | 送信元 IP に関連するクラウドプロバイダーの地域。 |
| Source Cloud Provider Service | 送信元 IP に関連するクラウドプロバイダーが提供するサービス。 |
| Source Continent Code | 送信元 IP に関連する大陸のコード。 |
| Source Continent Name | 送信元 IP に関連する大陸の名称。 |
| Source Country ISO Code | 送信元 IP に関連する国を表す ISO コード。 |
| Source Country Name | 送信元 IP に関連する国の名称。 |
| Source IP | 送信元 IP アドレス。 |
| Source Latitude | 送信元 IP に関連する緯度座標。 |
| Source Longitude | 送信元 IP に関連する経度座標。 |
| Source MAC | 送信元 IP に関連するメディアアクセス制御 (MAC) アドレス。 |
| Source Mask | 送信元 IP に関連するサブネットマスク。 |
| Source Port | 送信元ポート番号。 |
| Source Subdivision ISO Code | 送信元 IP に関連する行政区画 (州や県など) を表す ISO コード。 |
| Source Subdivision Name | 送信元 IP に関連する行政区画 (州や県など) の名称。 |
| Source Timezone | 送信元 IP に関連するタイムゾーン。 |

これらのキーフィールドを監視し、NetFlow イベントを分析するためのファセットを使用することで、組織は自社のネットワークインフラストラクチャーの可視化を強化し、パフォーマンスを最適化し、セキュリティ態勢を向上させることができます。

{{< img src="monitors/monitor_types/netflow/monitor.png" alt="NetFlow データを使用してダッシュボードを作成する" width="100%" >}}

このデータはダッシュボードやノートブックでも利用可能で、他のデータソースとの正確なクエリや相関分析を行うことができます。NetFlow データを使用してダッシュボードを作成する際には、**Graph your data** (データをグラフ化) セクションでソースとして **NetFlow** を選択します。

{{< img src="network_device_monitoring/netflow/dashboard.png" alt="NetFlow データを使用してダッシュボードを作成する" width="100%" >}}

## サンプリングレート

NetFlow のサンプリングレートは、デフォルトでバイトおよびパケットの計算に考慮されます。表示されるバイトおよびパケットの値は、サンプリングレートが適用された計算結果です。さらに、ダッシュボードやノートブックで **Bytes (Adjusted) (@adjusted_bytes)** および **Packets (Adjusted) (@adjusted_packets)** をクエリして、これらのデータを可視化することができます。

デバイスから送信された生のバイト/パケット (サンプル) を可視化するには、ダッシュボードやノートブックで **Bytes (Sampled) (@bytes)** および **Packets (Sampled) (@packets)** をクエリします。

## 保持

NetFlow データはデフォルトで 30 日間保持され、15 日、30 日、60 日、90 日の保持オプションも提供されています。

<div class="alert alert-warning">NetFlow データをさらに長期間保持したい場合は、アカウント担当者にお問い合わせください。</div>

## トラブルシューティング

### NetFlow パケットのドロップ
NetFlow パケットのドロップは、1 秒あたりの NetFlow パケット数が非常に多い場合 (通常は 50,000 以上) に発生します。以下の手順により、NetFlow パケットのドロップを特定し、緩和することができます。

#### パケットのドロップの特定

`netstat -s` コマンドを使用して、ドロップされた UDP パケットがあるかどうかを確認します。

```bash
    netstat -s
  ```

#### 緩和手順
1. NetFlow リスナーの数を増やす

  以下のような構成を使用して、NetFlow リスナーの数を増やします。
  Datadog は、ワーカーの数をシステム内の CPU コアの数に合わせることを推奨しています。

```yaml
      netflow:
        enabled: true
        listeners:
          - flow_type: netflow9
            port: 2055
            workers: 4 # 4 個の CPU
```

2. UDP キューの長さを増やす (Linux のみ)

  システムの UDP キューの長さを調整することで、NetFlow パケットの大量処理に対応できるようにします。以下のコマンドを実行して、UDP 受信バッファのサイズを 25MB に増やします。

```bash
    sudo sysctl -w net.core.rmem_max=26214400
    sudo sysctl -w net.core.rmem_default=26214400
```

3. 構成の永続化 (Linux のみ)

  これらの変更を恒久化するには、次の行を `/etc/sysctl.conf` ファイルに追加します。

```bash
    net.core.rmem_max=26214400
    net.core.rmem_default=26214400
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /ja/network_monitoring/devices/snmp_metrics/
[3]: /ja/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[4]: /ja/agent/configuration/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[5]: https://app.datadoghq.com/devices/netflow
[6]: /ja/monitors/types/netflow/