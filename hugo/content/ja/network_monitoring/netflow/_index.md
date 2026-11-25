---
aliases:
- /ja/network_monitoring/devices/netflow/
further_reading:
- link: https://www.datadoghq.com/architecture/hybrid-cloud-network-observability/
  tag: アーキテクチャセンター
  text: ハイブリッドマルチクラウドネットワークオブザーバビリティのリファレンスアーキテクチャ
- link: /network_monitoring/devices/profiles
  tag: ドキュメント
  text: Network Device Monitoring でのプロファイルの使用
- link: /network_monitoring/network_path/setup/#dynamic-tests-for-netflow-experimental
  tag: ドキュメント
  text: NetFlow の動的テストを設定する
- link: https://www.datadoghq.com/blog/monitor-netflow-with-datadog/
  tag: ブログ
  text: Datadog で NetFlow トラフィックデータを監視する
- link: https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/
  tag: ブログ
  text: SNMP トラップによるネットワークパフォーマンスの問題の監視と診断
- link: https://www.datadoghq.com/blog/understanding-netflow-duplication/
  tag: ブログ
  text: 'NetFlow の重複について: 発生理由と重複排除の方法'
title: NetFlow Monitoring
---
## 概要 {#overview}

Network Device Monitoring の NetFlow ビューは、フローデータをエクスポートするデバイス (ルーター、ファイアウォール、スイッチなど) から収集されたネットワークトラフィックフローの可視化を提供します。トラフィック量を分析し、主要なトーカーを特定し、データがネットワーク内をどのように移動するかを理解できます。

NetFlow ビューには、デバイスとインターフェイスごとに集計されたトラフィックメトリクスが表示されます。これを使用して、どのデバイスまたはインターフェイスが最も帯域幅を消費しているか、最も多くのパケットを生成しているか、トラフィックスパイクに寄与しているかを特定できます。

{{< img src="network_device_monitoring/netflow/netflow.png" alt="トラフィック量、デバイスの健全性、フローなどの折りたたみ可能な凡例が表示された NetFlow Monitoring ページ。" style="width:100%;" >}}

## サイドナビゲーション {#side-navigation}

追加の NetFlow ビューを確認するには、左側のナビゲーションを使用します。

- {{< ui >}}Traffic Volume{{< /ui >}}: デバイスとインターフェイスごとの全体的なフローのメトリクス。
- {{< ui >}}Device Health{{< /ui >}}: 監視対象デバイスのステータスと利用状況。
- {{< ui >}}Flows{{< /ui >}}: 個々のフローの詳細なレコード。
- {{< ui >}}Conversations{{< /ui >}}: 集計された送信元と宛先のペア。
- {{< ui >}}Autonomous Systems{{< /ui >}}: 自律システム番号 (ASN) でグループ化されたフローデータ。
- {{< ui >}}Geo IP{{< /ui >}}: 地理的起源/宛先でグループ化されたフローデータ。
- {{< ui >}}Source Ports / Destination Ports / Protocols / Flags{{< /ui >}}: パケットメタデータによるトラフィックの内訳。

## インストール{#installation}

Network Device Monitoring で NetFlow Monitoring を使用するには、[Agent][1] のバージョン 7.45 以降を使用していることを確認してください。

**注:** NetFlow データの送信には、[ネットワークデバイスモニタリングからのメトリクス収集][2] の構成は必須ではありませんが、この追加データを使用してデバイス名、モデル、ベンダー、インバウンド/アウトバウンドインターフェイス名などの情報でフローレコードをリッチ化できるため、強く推奨されています。

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

   **注**: [ファイアウォールルール][9] で、構成したポートの受信 UDP トラフィックが許可されていることを確認してください。

## 集計 {#aggregation}

Datadog Agent は、NetFlow から受信したデータを自動的に集約し、送信されるレコードの数を抑えながら、情報の大部分を維持します。デフォルトでは、`source`、`destination address`、`port`、`protocol` など同じ識別子を持つフローの記録が 5 分ごとに集約されます。また、Datadog Agent は短期間しか使用されないポート (エフェメラルポート) を検出して削除することが可能です。その結果、`port:*` と表示されるフローが確認されることがあります。

## リッチ化 {#enrichment}

NetFlow データは Datadog のバックエンドにより処理され、デバイスおよびインターフェイスから利用できるメタデータでリッチ化されます。リッチ化は、NetFlow エクスポーターの IP とインターフェイスインデックスに基づいて行われます。再利用されたプライベート IP が競合する可能性に対し、曖昧性を解消するため、Agent コンフィギュレーションファイルごとに異なる `namespace` を構成することができます (`network_devices.namespace` の設定を使用します)。

NetFlow エクスポーターの IP がデバイスの IP ではあるが、SNMP インテグレーションで構成された IP ではない場合、Datadog はエクスポーターの IP が属するデバイスの特定を試み、一意で一致する場合に限り、その情報で NetFlow データをリッチ化します。

### IP エンリッチメント {#ip-enrichment}

Datadog では、以下の種類の IP エンリッチメントに対応しています。

#### カスタム IP エンリッチメント {#custom-ip-enrichment}

IP と CIDR をカスタムタグにマッピングするために、カスタムエンリッチメントを追加できます (たとえば、特定の IP アドレスで実行されているサービスを分類するため)。カスタム IP エンリッチメントを追加すると、ネットワークエンジニアやそのチームが、人間にとってわかりやすい名前を使用して NetFlow データを解釈し、クエリを実行できるようになります。

[[{{< ui >}}Network Devices{{< /ui >}}] (ネットワークデバイス) > [{{< ui >}}Settings{{< /ui >}}] (設定) > [{{< ui >}}NetFlow{{< /ui >}}] > [{{< ui >}}IP Enrichment{{< /ui >}}] (IP エンリッチメント)][10] に移動し、[{{< ui >}}\+ Add Enrichment{{< /ui >}}] (+ エンリッチメントを追加) をクリックして、マッピングの CSV ファイルをアップロードします。

手動で単一のマッピングを追加するには、[{{< ui >}}\+ Add Enrichment{{< /ui >}}] の横にある下矢印をクリックし、[{{< ui >}}Single Entry{{< /ui >}}] (単一のエントリ) を選択します。

IP アドレスの受信フローまたは送信フローのアプリケーション名を設定するには、マッピングに `application_name` タグを追加します (例: `application_name:client_device`)。カスタム IP マッピングは、他のすべてのアプリケーション名のソースよりも優先されます。完全な順序については、「[アプリケーション名の割り当て](#application-name-assignment)」セクションを参照してください。

#### リバース DNS プライベート IP エンリッチメント {#reverse-dns-private-ip-enrichment}

リバース DNS プライベート IP エンリッチメントを使用すると、NetFlow レコードにホスト名が追加されます。これを有効にすると、Agent はプライベートアドレス範囲内の送信元および宛先 IP アドレスに対してリバース DNS ルックアップを実行し、対応するホスト名をフローレコードに追加します。

リバース DNS エンリッチメントは、デフォルトでは無効になっています。有効にするには、[`datadog.yaml`][3] ファイルで `network_devices.netflow` の下に `reverse_dns_enrichment_enabled: true` を設定し、[Agent を再起動][4]します。完全な構成例については、「[構成](#configuration)」セクションを参照してください。

ホスト名でフローをフィルタリングするには:

1. [NetFlow ページ][5]に移動します。
2. [{{< ui >}}\+ Filter{{< /ui >}}] (フィルター) をクリックします。
3. [{{< ui >}}Source Reverse DNS Hostname{{< /ui >}}] (送信元リバース DNS ホスト名) または [{{< ui >}}Destination Reverse DNS Hostname{{< /ui >}}] (宛先リバース DNS ホスト名) を選択します。

{{< img src="network_device_monitoring/netflow/dns_ip_enrichmen_2.png" alt="フィルターメニューが拡張され、リバース DNS の宛先と送信元のファセットが表示されます。" width="100%" >}}

**注**: リバース DNS エントリはキャッシュされ、DNS クエリを最小限に抑えて DNS サーバーへの負荷を軽減するためのレート制限の対象となります。デフォルトのキャッシングやレート制限の変更など、他の構成オプションについては、[Agent コンフィギュレーションファイルの例][7] の `reverse_dns_enrichment` セクションを参照してください。

#### クラウドプロバイダーの IP エンリッチメント {#cloud-provider-ip-enrichment}

Datadog は、IPv4 アドレスに対してパブリッククラウドプロバイダーのサービスとリージョンの情報を付加し、特定のサービスやリージョンからのフローレコードをフィルタリングできるようにします。

{{< img src="network_device_monitoring/netflow/netflow_cloud_provider_enrichment_2.png" alt="クラウドプロバイダー名、リージョン、およびサービスが表示された NetFlow フィルターメニュー" width="100%" >}}

### ポートエンリッチメント {#port-enrichment}

Datadog では、以下の種類のポートエンリッチメントに対応しています。

#### デフォルトのポートエンリッチメント {#default-port-enrichment}

Datadog は、NetFlow のポートを IANA (Internet Assigned Numbers Authority) のデータで拡充し、よく知られたポートマッピング (例: 5432 の Postgres や 443 の HTTPS) を解決します。

#### カスタムポートエンリッチメント {#custom-port-enrichment}

カスタムエンリッチメントを追加して、ポートとプロトコルを特定のアプリケーションにマッピングできます (たとえば、カスタムサービスが特定のポートで実行されている場合)。カスタムポートエンリッチメントを追加すると、ネットワークエンジニアやそのチームが、人間にとってわかりやすい名前を使用して NetFlow データを解釈し、クエリを実行できるようになります。

[[{{< ui >}}Network Devices{{< /ui >}}] > [{{< ui >}}Settings{{< /ui >}}] > [{{< ui >}}NetFlow{{< /ui >}}] > [{{< ui >}}Port Enrichment{{< /ui >}}] (ポートエンリッチメント)][13] に移動し、[{{< ui >}}\+ Add Enrichment{{< /ui >}}] (エンリッチメントを追加) をクリックして、カスタムエンリッチメントを含む CSV ファイルをアップロードします。

### ディープパケットインスペクション {#deep-packet-inspection}

**注**: ディープパケットインスペクションには、Agent バージョン 7.86.0 以降が必要です。

DPI (ディープパケットインスペクション) を使用すると、Datadog がポート番号からアプリケーションを推測するのではなく、ネットワークデバイスがトラフィックを検査して各フローのアプリケーションを識別するようになります。Datadog はパケットのペイロードは検査しません。Agent は、NetFlow v9 または IPFIX レコードから、デバイスが (Cisco NBAR2 または Palo Alto Networks の App-ID を使用して) 分類したアプリケーションを読み取ります。

DPI を使用する場合、IP アドレスやポートをアプリケーションに手動でマッピングする必要はありません。DPI を使用するには、Datadog Agent とネットワークデバイスの両方を構成します。

#### Agent を構成する {#configure-the-agent}

[`datadog.yaml`][3] ファイルで、DPI 対応デバイスからフローを受信する各リスナーで `enable_dpi: true` を設定します。DPI は `netflow9` および `ipfix` リスナーでのみサポートされています。DPI は `netflow5` および `sflow5` リスナーではサポートされていません。

```yaml
network_devices:
  netflow:
    enabled: true
    listeners:
      - flow_type: netflow9
        port: 2055
        enable_dpi: true
      - flow_type: ipfix
        port: 4739
        enable_dpi: true
```

変更内容を保存したら、[Agent を再起動][4]します。

#### Cisco NBAR2 を構成する {#configure-cisco-nbar2}

NetFlow v9 および IPFIX では、Cisco Next Generation Network-Based Application Recognition (NBAR2) がサポートされています。Cisco デバイスから NBAR2 アプリケーションデータをエクスポートするには:

1. 分類する各インターフェイスで NBAR2 プロトコル検出を有効にします。

   ```text
   configure terminal
   interface <INTERFACE>
    ip nbar protocol-discovery
   exit
   ```

2. フローレコードに `match application name` フィールドを追加します。デバイスにより、各フローとともにアプリケーション ID がエクスポートされます。

   ```text
   configure terminal
   flow record <RECORD_NAME>
    match application name
   exit
   ```

3. フローエクスポーターにアプリケーションテーブルオプションを追加します。デバイスは、各アプリケーション ID をアプリケーション名および説明にマッピングするテーブルを定期的に送信します。

   ```text
   configure terminal
   flow exporter <EXPORTER_NAME>
    option application-table timeout 60
   exit
   ```

   タイムアウト値は秒単位です。

4. (オプション) フローにアプリケーションの詳細を追加するには、フローエクスポーターにアプリケーション属性オプションを追加します。

   ```text
   configure terminal
   flow exporter <EXPORTER_NAME>
    option application-attributes
   exit
   ```

   Datadog が、アプリケーションのカテゴリ、サブカテゴリ、グループ、トラフィッククラス、ビジネス上の関連性、アプリケーションセット、アプリケーションファミリー、およびそのアプリケーションが P2P、トンネリング、暗号化を使用するかどうかの情報によってフローを拡充します。

**注**:

- アプリケーション ID は、デバイスの NBAR プロトコルパックおよびエンジンバージョンによって決まるため、エクスポーターごとにそれぞれ異なります。Agent は、エクスポーターごとに個別のアプリケーションテーブルを保持します。
- Agent は、各アプリケーションテーブルのエントリを、エクスポーターが最後に送信してから 1 時間保持します。エクスポーターからのすべてのフローでアプリケーション名を保持するには、`option application-table` タイムアウトを 3600 秒未満に設定します。

#### Palo Alto Networks の App-ID を構成する {#configure-palo-alto-networks-app-id}

NetFlow v9 では、Palo Alto Networks の App-ID がサポートされています。Palo Alto Networks ファイアウォールは各フローレコードでアプリケーション名を送信するため、アプリケーションテーブルは不要です。

App-ID データをエクスポートするには、ファイアウォールの NetFlow サーバープロファイルで [{{< ui >}}PAN-OS Field Types{{< /ui >}}] (PAN-OS フィールドタイプ) を有効にします。詳細については、Palo Alto Networks の [NetFlow の監視に関するドキュメント][12]を参照してください。

### アプリケーション名の割り当て {#application-name-assignment}

Datadog は、フローの各エンドポイント (送信元と宛先、またはイニシエーターとレスポンダー) にアプリケーション名を割り当てます。各アプリケーション名は、このリスト内で最初に一致するソースから取得されます。

1. [カスタム IP エンリッチメント](#custom-ip-enrichment)のマッピング
2. [カスタムポートエンリッチメント](#custom-port-enrichment)のマッピング
3. [DPI (ディープパケットインスペクション)](#deep-packet-inspection) (レスポンダーの場合のみ、つまりコネクションを受信するエンドポイント。通常はサーバー)
4. [リバース DNS](#reverse-dns-private-ip-enrichment) のホスト名
5. GeoIP AS (自律システム) ドメイン
6. [デフォルトポートのエンリッチメント](#default-port-enrichment) (IANA ポートマッピング)
7. `unknown`。他に一致するソースがない場合

DPI はレスポンダーにのみ適用されます。イニシエーターに対しては、Datadog は次に一致するソースを使用します。イニシエーターとレスポンダーの詳細については、「[会話の結合](#conversation-stitching)」セクションを参照してください。

Datadog は、フロー全体に 1 つの `application_name` を割り当てる場合にも、この同じ順序を使用します。Datadog は各ステップで、イニシエーターより前にレスポンダーを確認します。

## IP の詳細 {#ip-details}

**Conversations** ビューで、宛先 IP のパブリック IP アドレスを確認できます。IP にカーソルを合わせると、IP に関する豊富なメタデータと、接続をさらに詳しく調べるための [{{< ui >}}View Related Network Connections{{< /ui >}}] (関連するネットワーク接続を表示) リンクが表示されます。

{{< img src="network_device_monitoring/netflow/NetFlow_IP_pill.png" alt="IP アドレスにカーソルを合わせると、IP の詳細と関連するネットワーク接続が表示されます。" width="100%" >}}

## アプリケーション {#applications}

[NetFlow ページ][5]の [{{< ui >}}Applications{{< /ui >}}] (アプリケーション) セクションには、ネットワーク上でのトラフィック生成量が最も多いアプリケーションが表示されます。これを使用して、帯域幅の使用量を増加させているアプリケーションや、パフォーマンスの問題や輻輳を引き起こしているアプリケーションを特定します。

{{< img src="network_device_monitoring/netflow/netflow_top_applications.png" alt="NetFlow ページの [Applications] セクション。上位アプリケーションの円グラフと、ビットレート、パケットレート、合計バイト数が示されているアプリケーションのテーブルが表示されています。" width="100%" >}}

NetFlow データをアプリケーションでフィルタリングするには、[{{< ui >}}Bidirectional{{< /ui >}}] (双方向) ビューで [{{< ui >}}Initiator Application{{< /ui >}}] (イニシエーターアプリケーション) および [{{< ui >}}Responder Application{{< /ui >}}] (レスポンダーアプリケーション) フィルターを使用するか、[{{< ui >}}Unidirectional{{< /ui >}}] (単方向) ビューで [{{< ui >}}Source Application{{< /ui >}}] (送信元アプリケーション) および [{{< ui >}}Destination Application{{< /ui >}}] (宛先アプリケーション) フィルターを使用します。

単一デバイスを通過するトラフィックの上位アプリケーションを確認するには、デバイスのページを開き、[{{< ui >}}Traffic{{< /ui >}}] (トラフィック) タブを選択します。

Datadog は複数のエンリッチメントソースからアプリケーション名を割り当て、アプリケーション名でフローをグループ化して、[{{< ui >}}Applications{{< /ui >}}] セクションを作成します。ソースのリストと Datadog によるソースの確認順序については、「[アプリケーション名の割り当て](#application-name-assignment)」セクションを参照してください。

`unknown` とラベル付けされたフローの数を減らすには、サポートされている Cisco および Palo Alto Networks デバイスで[ディープパケットインスペクション](#deep-packet-inspection)を設定するか、[カスタム IP](#custom-ip-enrichment) および[カスタムポート](#custom-port-enrichment)エンリッチメントを追加します。

## フローダイアグラム {#flow-diagram}

[{{< ui >}}Flows{{< /ui >}}] (フロー) メニューをクリックし、リストのフローにカーソルを合わせて NetFlow Monitoring のフローを視覚化することで、関連ネットワーク接続の送信元 IP、入力インターフェイス名、デバイス名、および宛先 IP に関する追加情報を表示できます。

{{< img src="network_device_monitoring/netflow/flows.png" alt="NetFlow を送信するデバイスから集計されたフローにカーソルを合わせると、関連するネットワーク接続情報にアクセスできます。" width="100%" >}}

## NetFlow の Network Path {#network-path-for-netflow}

NetFlow の動的テストでは、NetFlow トラフィックを収集する Agent から NetFlow レコードで観測された宛先 IP への Network Path のテストを自動的に実行できます。NetFlow の動的テストを使用して、NetFlow の宛先にホップごとのルートとレイテンシーのコンテキストを追加します。

NetFlow の動的テストは試験機能であり、Agent `v7.81+` が必要です。NetFlow の動的テストを設定するには、[Network Path の設定][11]を参照してください。

## NetFlow モニター {#netflow-monitor}

任意のビューから [{{< ui >}}Create Monitor{{< /ui >}}] (モニターを作成) アイコンをクリックして、[NetFlow モニター][6]を作成します。モニターを作成する際は、デバイスの観点から送信元 IP または宛先 IP に関して下記のフィールドを考慮する必要があります。これらのフィールドは、ネットワークトラフィックのパターンを理解し、パフォーマンスとセキュリティを最適化する上で役立ちます。

{{< img src="network_device_monitoring/netflow/create_monitor.png" alt="[Create Monitor] リンクが強調表示された NetFlow Monitoring の [Flows] ビュー。" width="100%" >}}

### インターフェイス情報 {#interface-information}

次のフィールドは、入力インターフェイスと出力インターフェイスに関する詳細を表します。

| フィールド名 | フィールドの説明 |
|---|---|
| Egress Interface Alias (出力インターフェイスエイリアス) | 出力インターフェイスのエイリアス。|
| Egress Interface Index (出力インターフェイスインデックス) | 出力インターフェイスのインデックス。|
| Egress Interface Name (出力インターフェイス名) | 出力インターフェイスの名前。|
| Ingress Interface Alias | 入力インターフェイスのエイリアス。|
| Ingress Interface Index (入力インターフェイスインデックス) | 入力インターフェイスのインデックス。|
| Ingress Interface Name (入力インターフェイス名) | 入力インターフェイスの名前。|

### デバイス情報 {#device-information}

次のフィールドは、NetFlow レコードを生成するデバイスに関する詳細を表します。

| フィールド名 | フィールドの説明 |
|---|---|
| Device IP (デバイス IP) | 拡張のために NDM 内のデバイスにマッピングされる IP アドレス。|
| Exporter IP (エクスポーター IP) | NetFlow パケットの送信元の IP アドレス。|
| Device Model (デバイスモデル) | デバイスのモデル。|
| Device Name (デバイス名) | デバイスの名前。|
| Device Namespace (デバイスネームスペース) | デバイスのネームスペース。|
| Device Vendor (デバイスベンダー) | デバイスのベンダー。|

### フローの詳細 {#flow-details}

次のフィールドは、ネットワークフローの特性を表します。

| フィールド名 | フィールドの説明 |
|---|---|
| Direction (方向) | フローがインバウンドかアウトバウンドかを示します。|
| Start Time (開始時間) | 送信元 IP と宛先 IP 間で最初に送信されたネットワークパケットのタイムスタンプ。|
| End Time (終了時間) | 送信元 IP と宛先 IP 間で最後に送信されたネットワークパケットのタイムスタンプ。|
| Ether Type (イーサタイプ) | Ethernet フレームのカプセル化の種類 (IPv4 または IPv6)。|
| Flow Type (フロータイプ) | NetFlow データのフォーマットの種類 (IPFIX、sFlow5、NetFlow5、NetFlow9、または不明)。|
| IP Protocol (IP プロトコル) | 通信に使用されるプロトコル (例: ICMP、TCP、UDP など)。|
| Next Hop IP (ネクストホップ IP) | ネットワークパス上の次のホップの IP アドレス。|
| TCP Flag (TCP フラグ) | フローの期間中に観測されたすべての TCP フラグの合計。|
| Bytes (バイト数) | 転送されたバイト数の総計。|
| Packets (パケット数) | 転送されたパケット数の総計。|

フィールドに加え、すぐに使えるファセットを活用して、NetFlow の宛先および送信元 IP アドレスに基づくトラフィックパターンの分析を始めることができます。

### NetFlow 宛先 IP ファセット {#netflow-destination-ip-facets}

| ファセット名 | ファセットの説明 |
|---|---|
| Destination AS Domain (宛先 AS ドメイン) | 宛先 IP が属する自律システム (AS) に関連付けられたドメイン。|
| Destination AS Name (宛先 AS 名) | 宛先 IP が属する自律システム (AS) の名称。|
| Destination AS Number (宛先 AS 番号) | 宛先 IP が属する自律システム (AS) に割り当てられた番号。|
| Destination AS Route (宛先 AS ルート) | 宛先 IP が属する自律システム (AS) に関連するルート情報。|
| Destination AS Type (宛先 AS の種類) | 宛先 IP が属する自律システム (AS) の種類 (トランジット、カスタマー、ピアなど)。|
| Destination Application Name (宛先アプリケーション名) | 宛先 IP に関連するアプリケーションの名称。|
| Destination City Name (宛先都市名) | 宛先 IP に関連する都市の名称。|
| Destination Cloud Provider Name (宛先クラウドプロバイダー名) | 宛先 IP に関連するクラウドプロバイダーの名称。|
| Destination Cloud Provider Region (宛先クラウドプロバイダー地域) | 宛先 IP に関連するクラウドプロバイダーの地域。|
| Destination Cloud Provider Service (宛先クラウドプロバイダーサービス) | 宛先 IP に関連するクラウドプロバイダーが提供するサービス。|
| Destination Continent Code (宛先大陸コード) | 宛先 IP に関連する大陸のコード。|
| Destination Continent Name (宛先大陸名) | 宛先 IP に関連する大陸の名称。|
| Destination Country ISO Code (宛先国 ISO コード) | 宛先 IP に関連する国を表す ISO コード。|
| Destination Country Name (宛先国名) | 宛先 IP に関連する国の名称。|
| Destination IP (宛先 IP) | 宛先 IP アドレス。|
| Destination Latitude (宛先緯度) | 宛先 IP に関連する緯度座標。|
| Destination Longitude (宛先経度) | 宛先 IP に関連する経度座標。|
| Destination MAC (宛先 MAC) | 宛先 IP に関連する MAC (Media Access Control) アドレス。|
| Destination Mask (宛先マスク) | 宛先 IP に関連するサブネットマスク。|
| Destination Port (宛先ポート) | 宛先ポート番号。|
| Destination Reverse DNS Hostname (宛先リバース DNS ホスト名) | 宛先 IP に関連する DNS ホスト名。|
| Destination Subdivision ISO Code (宛先行政区画 ISO コード) | 宛先 IP に関連する行政区画 (州や県など) を表す ISO コード。|
| Destination Subdivision Name (宛先行政区画名) | 宛先 IP に関連する行政区画 (州や県など) の名称。|
| Destination Timezone (宛先タイムゾーン) | 宛先 IP に関連するタイムゾーン。|

### NetFlow 送信元 IP ファセット {#netflow-source-ip-facets}

| ファセット名 | ファセットの説明 |
|---|---|
| Source AS Domain (送信元 AS ドメイン) | 送信元 IP が属する自律システム (AS) に関連付けられたドメイン。|
| Source AS Name (送信元 AS 名) | 送信元 IP が属する自律システム (AS) の名称。|
| Source AS Number (送信元 AS 番号) | 送信元 IP が属する自律システム (AS) に割り当てられた番号。|
| Source AS Route (送信元 AS ルート) | 送信元 IP が属する自律システム (AS) に関連するルート情報。|
| Source AS Type (送信元 AS タイプ) | 送信元 IP が属する自律システム (AS) の種類 (トランジット、カスタマー、ピアなど)。|
| Source Application Name (送信元アプリケーション名) | 送信元 IP に関連するアプリケーションの名称。|
| Source City Name (送信元都市名) | 送信元 IP に関連する都市の名称。|
| Source Cloud Provider Name (送信元クラウドプロバイダー名) | 送信元 IP に関連するクラウドプロバイダーの名称。|
| Source Cloud Provider Region (送信元クラウドプロバイダー地域) | 送信元 IP に関連するクラウドプロバイダーの地域。|
| Source Cloud Provider Service (送信元クラウドプロバイダーサービス) | 送信元 IP に関連するクラウドプロバイダーが提供するサービス。|
| Source Continent Code (送信元大陸コード) | 送信元 IP に関連する大陸のコード。|
| Source Continent Name (送信元大陸名) | 送信元 IP に関連する大陸の名称。|
| Source Country ISO Code (送信元国 ISO コード) | 送信元 IP に関連する国を表す ISO コード。|
| Source Country Name (送信元国名) | 送信元 IP に関連する国の名称。|
| Source IP (送信元 IP) | 送信元 IP アドレス。|
| Source Latitude (送信元緯度) | 送信元 IP に関連する緯度座標。|
| Source Longitude (送信元経度) | 送信元 IP に関連する経度座標。|
| Source MAC (送信元 MAC) | 送信元 IP に関連する MAC (Media Access Control) アドレス。|
| Source Mask (送信元マスク) | 送信元 IP に関連するサブネットマスク。|
| Source Port (送信元ポート) | 送信元ポート番号。|
| Source Reverse DNS Hostname (送信元リバース DNS ホスト名) | 送信元 IP に関連する DNS ホスト名。|
| Source Subdivision ISO Code (送信元行政区画 ISO コード) | 送信元 IP に関連する行政区画 (州や県など) を表す ISO コード。|
| Source Subdivision Name (送信元行政区画名) | 送信元 IP に関連する行政区画 (州や県など) の名称。|
| Source Timezone (送信元タイムゾーン) | 送信元 IP に関連するタイムゾーン。|

## 会話の結合 {#conversation-stitching}

デフォルトでは、NetFlow は 2 つのエンドポイント間のトラフィックの各方向について、単方向フローを別々に記録します (A → B と B → A)。会話の結合は、これらを 1 つの双方向レコードにまとめ、2 つのエンドポイント間で交換されるトラフィックの全体像を提供します (A ↔ B)。

会話の結合を使用すると、次のことができます。

- 2 つのエンドポイント間で交換される全トラフィックを別々の方向のフローではなく 1 つの会話として表示する
- 実際の発信者と対応者を特定し、送信元と宛先のウィジェットが正確な役割を反映するようにする
- サーバーが上位の送信元として誤って表示されるノイズを削除する

結合された (双方向) ビューと結合されていない (単方向) ビューを切り替えるには、エンドポイントベースの任意の NetFlow ビューに移動し、日時選択ツールの下にある [{{< ui >}}Bidirectional{{< /ui >}}] トグルを使用します。

{{< img src="network_device_monitoring/netflow/conversation_stitching.png" alt="NetFlow ビューにおける会話の結合のトグル" width="100%" >}}

## サンプリングレート {#sampling-rate}

NetFlow のサンプリングレートは、デフォルトでバイトおよびパケットの計算に考慮されます。表示されるバイトおよびパケットの値は、サンプリングレートが適用された計算結果です。
さらに、ダッシュボードやノートブックで **Bytes (Adjusted) (@adjusted_bytes)** および **Packets (Adjusted) (@adjusted_packets)** をクエリして、これらのデータを可視化することができます。

デバイスから送信された生のバイト/パケット (サンプル) を可視化するには、ダッシュボードやノートブックで **Bytes (Sampled) (@bytes)** および **Packets (Sampled) (@packets)** をクエリします。

## 保持 {#retention}

NetFlow データはデフォルトで 30 日間保持され、15 日、30 日、60 日、90 日の保持オプションも提供されています。

<div class="alert alert-warning">NetFlow データをさらに長期間保持したい場合は、アカウント担当者にお問い合わせください。</div>

## フラッシュ間隔あたりのフロー量を制限する {#limit-flow-volume-per-flush-interval}

NetFlow の量と関連コストを制御するには、Agent を構成してフラッシュ間隔ごとに提出されるフローレコードの数を制限します。フラッシュ間隔は、フローが Datadog に転送される前に集約される期間です。

この制限が有効な場合、そのフラッシュ間隔において、Agent は**バイト数が上位のフロー**のみを構成された最大数まで保持し、少量のフローはドロップします。

### 構成{#configuration-1}

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

## トラブルシューティング{#troubleshooting}

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
[7]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_linux.yaml.example
[9]: /ja/network_monitoring/devices/troubleshooting#traps-or-flows-not-being-received-at-all
[10]: https://app.datadoghq.com/devices/settings/enrichment/ip
[11]: /ja/network_monitoring/network_path/setup/#dynamic-tests-for-netflow-experimental
[12]: https://docs.paloaltonetworks.com/ngfw/administration/monitoring/netflow-monitoring/netflow-templates
[13]: https://app.datadoghq.com/devices/settings/enrichment/port