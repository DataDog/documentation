---
description: Azure Private Link を構成して、公衆インターネットを使用せずにテレメトリを Datadog に安全に送信します。これには、エンドポイントのセットアップと
  DNS 構成が含まれます。
title: Azure Private Link を介して Datadog に接続する
---
[Azure Private Link][1] では、公衆インターネットを使用せずにテレメトリを Datadog に送信することができます。

Datadog は、データインテークサービスの一部を [Azure Private Link サービス][2]として公開しています。

Azure Private Link を構成して、各 Datadog インテークサービスにプライベート IP アドレスを公開できます。この IP アドレスは、トラフィックを Datadog バックエンドにルーティングします。次に、Azure [Private DNS Zone][3] を構成して、使用する各エンドポイントに対応する製品の DNS 名をオーバーライドできます。

## セットアップ {#setup}

### エンドポイントを接続{#connect-an-endpoint}

1. Azure ポータルで、{{< ui >}}Private Link{{< /ui >}} に移動します。
2. 左側のナビゲーションメニューで、{{< ui >}}Private endpoints{{< /ui >}} を選択します。
3. {{< ui >}}Create{{< /ui >}} を選択します。
4. {{< ui >}}Create a private endpoint{{< /ui >}} > {{< ui >}}Basics{{< /ui >}} ページで、以下を構成します。
   - {{< ui >}}Project details{{< /ui >}} で、本番リソースが Private Link にアクセスする際に使用する {{< ui >}}Subscription{{< /ui >}} と {{< ui >}}Resource group{{< /ui >}} を選択します。
   - {{< ui >}}Instance details{{< /ui >}} で、{{< ui >}}Name{{< /ui >}} (例: `datadog-api-private-link`) を入力し、{{< ui >}}Region{{< /ui >}} を選択します。

   {{< ui >}}Next: Resource{{< /ui >}} を選択して続行します。
5. {{< ui >}}Create a private endpoint{{< /ui >}} > {{< ui >}}Resource{{< /ui >}} ページで、以下を構成します。
   - {{< ui >}}Connection method{{< /ui >}} で {{< ui >}}Connect to an Azure resource by resource ID or alias{{< /ui >}} を選択します。
   - {{< ui >}}Resource ID or alias{{< /ui >}} に、使用する Datadog インテークサービスに対応する Private Link サービス名を入力します。このサービス名は、[公開サービスのテーブル](#published-services)で確認できます。
   - オプションとして、{{< ui >}}Request message{{< /ui >}} に (Datadog アカウントに関連付けられた) メールアドレスを入力できます。これは、Datadog がリクエストを識別し、必要に応じて連絡を取るために役立ちます。

   {{< ui >}}Next: Virtual Network{{< /ui >}} を選択して続行します。
6. {{< ui >}}Create a private endpoint{{< /ui >}} > {{< ui >}}Virtual Network{{< /ui >}} ページで、以下を構成します。
   - {{< ui >}}Networking{{< /ui >}} で、エンドポイントを配置する {{< ui >}}Virtual network{{< /ui >}} と {{< ui >}}Subnet{{< /ui >}} を選択します。通常、これはプライベート エンドポイントにアクセスする必要があるコンピューティング リソースと同じネットワーク内に配置されます。
   - {{< ui >}}Private DNS integration{{< /ui >}} で、{{< ui >}}No{{< /ui >}} を選択します。

   {{< ui >}}Next: Tags{{< /ui >}} を選択して続行します。
7. {{< ui >}}Create a private endpoint{{< /ui >}} > {{< ui >}}Tags{{< /ui >}} ページで、必要に応じてタグを設定できます。{{< ui >}}Next{{< /ui >}} を選択します。
8. {{< ui >}}Review + create{{< /ui >}} ページで、構成設定を確認します。次に、{{< ui >}}Create{{< /ui >}} を選択します。
9. プライベート エンドポイントが作成されたら、リストから見つけます。このエンドポイントの {{< ui >}}Private IP{{< /ui >}} をメモします。これは次のセクションで使用します。[Connection Status] フィールドが [Pending] になっているはずです。
10. 次に、Datadog の承認が必要です。承認は手動で行います。Datadog サポートに連絡し、プライベート リンク エンドポイントの承認を依頼してください。その際、エンドポイント名を含めてください。
11. Datadog サポートがエンドポイントの作成を確認したら、完全に機能していることを確認します。Azure ポータルで、{{< ui >}}Home{{< /ui >}} > {{< ui >}}Private Endpoints{{< /ui >}} に移動します。エンドポイント名をクリックし、[Connection Status] が {{< ui >}}Approved{{< /ui >}} になっていることを確認します。
12. {{< ui >}}Monitoring{{< /ui >}} > {{< ui >}}Metrics{{< /ui >}} に移動します。`Bytes In` メトリクスと `Bytes Out` メトリクスがゼロ以外であることを確認します。これらのメトリクスは、Datadog Azure インテグレーションによって `azure.network_privateendpoints.pe_bytes_[in/out]` としてもキャプチャされるはずです。

### Private DNS ゾーンを作成{#create-a-private-dns-zone}
1. Azure ポータルで、{{< ui >}}Private DNS zones{{< /ui >}} に移動します。
2. {{< ui >}}Create{{< /ui >}} を選択します。
3. {{< ui >}}Create Private DNS zone{{< /ui >}} > {{< ui >}}Basics{{< /ui >}} ページで、以下を構成します。
   - {{< ui >}}Project details{{< /ui >}} で、本番環境のリソースがプライベート エンドポイントにアクセスするために必要な {{< ui >}}Subscription{{< /ui >}} と {{< ui >}}Resource group{{< /ui >}} を選択します。
   - {{< ui >}}Instance details{{< /ui >}} の {{< ui >}}Name{{< /ui >}} に、使用する Datadog インテーク サービスに対応する _プライベート DNS 名_ を入力します。このサービス名は、[公開サービスのテーブル](#published-services)で確認できます。

   {{< ui >}}Review create{{< /ui >}} を選択します。
4. 構成設定を確認します。次に、{{< ui >}}Create{{< /ui >}} を選択します。
5. Private DNS ゾーンが作成されたら、リストから選択します。
6. 開いたパネルで、{{< ui >}}\+ Record set{{< /ui >}} を選択します。
7. {{< ui >}}Add record set{{< /ui >}} パネルで、以下を構成します。
   - {{< ui >}}Name{{< /ui >}} に `@` と入力します。
   - {{< ui >}}Type{{< /ui >}} で {{< ui >}}A - Address record{{< /ui >}} を選択します。
   - {{< ui >}}IP address{{< /ui >}} には、前のセクションの最後で控えた IP アドレスを入力します。

   {{< ui >}}OK{{< /ui >}} を選択して完了します。
### メトリクスとトレースに必要な追加手順 {#additional-required-steps-for-metrics-and-traces}
2 つの Datadog Intake Service は、`agent.` ドメインの{{< region-param key="dd_site" code="true" >}} サブドメインです。このため、Private DNS ゾーンは他のインテークとは少し異なります。

`agent.` 用の Private DNS ゾーンを、{{< region-param key="dd_site" code="true" >}}上記のセクションで概説されているとおりに作成します。次に、以下の 3 つのレコードを追加します。

| DNS 名 | リソースレコードタイプ | IPv4 アドレス |
| -------- |----------------------| ------------ |
| `(apex)` | A                    | メトリクスエンドポイントの IP アドレス |
| `*`      | A                    | メトリクスエンドポイントの IP アドレス |
| `trace`  | A                    | トレースエンドポイントの IP アドレス |

**注**: このゾーンには、メトリクスエンドポイントの IP アドレスを指すワイルドカード (`*`) レコードが必要です。これは、Datadog Agent が (`<version>-app.agent.`{{< region-param key="dd_site" code="true" >}}) という形式のバージョン付きエンドポイントを使用してテレメトリを送信するためです)。


## 公開サービス {#published-services}

| Datadog インテークサービス | Private Link サービス名 | Private DNS 名 |
| --- | --- | --- |
| ログ (Agent) | `logs-pl-1.9941bd04-f840-4e6d-9449-368592d2f7da.westus2.azure.privatelinkservice` | `agent-http-intake.logs.us3.datadoghq.com` |
| ログ (Datadog Exporter を使用した OTel Collector) | `logs-pl-1.9941bd04-f840-4e6d-9449-368592d2f7da.westus2.azure.privatelinkservice` | `http-intake.logs.us3.datadoghq.com` |
| ログ (ユーザー HTTP Intake) | `logs-pl-1.9941bd04-f840-4e6d-9449-368592d2f7da.westus2.azure.privatelinkservice` | `http-intake.logs.us3.datadoghq.com` |
| API | `api-pl-1.0962d6fc-b0c4-40f5-9f38-4e9b59ea1ba5.westus2.azure.privatelinkservice` | `api.us3.datadoghq.com` |
| メトリクス | `metrics-agent-pl-1.77764c37-633a-4c24-ac9b-0069ce5cd344.westus2.azure.privatelinkservice` | `agent.us3.datadoghq.com` |
| Containers  | `orchestrator-pl-1.8ca24d19-b403-4c46-8400-14fde6b50565.westus2.azure.privatelinkservice` | `orchestrator.us3.datadoghq.com` |
| プロセス | `process-pl-1.972de3e9-3b00-4215-8200-e1bfed7f05bd.westus2.azure.privatelinkservice` | `process.us3.datadoghq.com` |
| Profiling | `profile-pl-1.3302682b-5bc9-4c76-a80a-0f2659e1ffe7.westus2.azure.privatelinkservice` | `intake.profile.us3.datadoghq.com` |
| トレース | `trace-edge-pl-1.d668729c-d53a-419c-b208-9d09a21b0d54.westus2.azure.privatelinkservice` | `agent.us3.datadoghq.com` |
| Remote Configuration | `fleet-pl-1.37765ebe-d056-432f-8d43-fa91393eaa07.westus2.azure.privatelinkservice` | `config.us3.datadoghq.com` |
| Database Monitoring | `dbm-metrics-pl-1.e391d059-0e8f-4bd3-9f21-708e97a708a9.westus2.azure.privatelinkservice` | `dbm-metrics-intake.us3.datadoghq.com` |

[1]: https://azure.microsoft.com/en-us/products/private-link
[2]: https://learn.microsoft.com/en-us/azure/private-link/private-link-service-overview
[3]: https://learn.microsoft.com/en-us/azure/dns/private-dns-privatednszone