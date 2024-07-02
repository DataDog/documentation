---
title: Connect to Datadog over Azure Private Link
---

{{% site-region region="us,us5,eu,gov,ap1" %}}
<div class="alert alert-warning">この機能は、選択した Datadog サイトではサポートされていません。</div>
{{% /site-region %}}

{{% site-region region="us3" %}}
[Azure Private Link][1] では、公衆インターネットを使用せずにテレメトリーを Datadog に送信することができます。

Datadog は、データインテークサービスの一部を [Azure Private Link サービス][2]として公開しています。

Azure Private Link を構成して、Datadog インテーク サービスごとにプライベート IP アドレスを公開することができます。この IP アドレスは、Datadog バックエンドにトラフィックをルーティングします。次に、Azure [Private DNS Zone][3] を構成して、消費される各エンドポイントの製品に対応する DNS 名をオーバーライドできます。

## セットアップ

### エンドポイントを接続する

1. Azure ポータルで、**Private Link** に移動します。
2. 左のナビゲーションメニューで、**Private endpoints** を選択します。
3. **Create** を選択します。
4. **Create a private endpoint** > **Basics** ページで、以下を構成します。
   - **Project details** で、本番用リソースが Private Link にアクセスする **Subscription** および **Resource group** を選択します。
   - **Instance details** で、**Name** (例えば `datadog-api-private-link`) を入力し、**Region** を選択します。

   **Next: Resource** を選択して続行します。
5. **Create a private endpoint** > **Resource** ページで、以下を構成します。
   - **Connection method** には、**Connect to an Azure resource by resource ID or alias** を選択します。
   - **Resource ID or alias** には、使用する Datadog インテークサービスに対応する Private Link サービス名を入力します。このサービス名は、[公開サービスの表](#published-services)で確認できます。
   - オプションとして、**Request message** には、メールアドレス (Datadog アカウントに関連付けられたもの) を入力することができます。これは、Datadog がリクエストを識別し、必要に応じてあなたに連絡するのに役立ちます。

   **Next: Virtual Network** を選択して続行します。
6. **Create a private endpoint** > **Virtual Network** ページで、以下を構成します。
   - **Networking** で、エンドポイントが存在する **Virtual network** と **Subnet** を選択します。通常、これはプライベートエンドポイントにアクセスする必要があるコンピュートリソースと同じネットワークに配置されます。
   - **Private DNS integration** で、**No** を選択します。

   **Next: Tags** を選択して続行します。
7. **Create a private endpoint** > **Tags** ページでは、オプションでタグを設定できます。**Next** を選択します。
8. **Review + create** ページで、構成設定を確認します。次に、**Create** を選択します。
9. 作成したプライベートエンドポイントをリストで見つけます。次のセクションで使用するので、このエンドポイントの **Private IP** を控えておいてください。

### Private DNS ゾーンを作成する
1. Azure ポータルで、**Private DNS zones** に移動します。
2. **Create** を選択します。
3. **Create Private DNS zone** > **Basics** ページで、以下を構成します。
   - **Project details** で、本番用リソースがプライベートエンドポイントにアクセスする **Subscription** および **Resource group** を選択します。
   - **Instance details** の **Name** には、使用する Datadog インテークサービスに対応する_プライベート DNS 名_を入力します。このサービス名は、[公開サービスの表](#published-services)で確認できます。

   **Review create** を選択します。
4. 構成設定を確認します。次に、**Create** を選択します。
5. 作成したプライベート DNS ゾーンをリストから選択します。
6. 開いたパネルで、**+ Record set** を選択します。
7. **Add record set** パネルで、以下を構成します。
   - **Name** には `*` を入力します。
   - **Type** には **A - Address record** を選択します。
   - **IP address** には、前のセクションの最後で控えた IP アドレスを入力します。

   **OK** を選択して終了します。

## 公開サービス

| Datadog インテークサービス | Private Link サービス名 | プライベート DNS 名 |
| --- | --- | --- |
| ログ (Agent) | `logs-pl-1.9941bd04-f840-4e6d-9449-368592d2f7da.westus2.azure.privatelinkservice` | `agent-http-intake.logs.us3.datadoghq.com` |
| ログ (ユーザーの HTTP 取り込み) | `logs-pl-1.9941bd04-f840-4e6d-9449-368592d2f7da.westus2.azure.privatelinkservice` | `http-intake.logs.us3.datadoghq.com` |
| API | `api-pl-1.0962d6fc-b0c4-40f5-9f38-4e9b59ea1ba5.westus2.azure.privatelinkservice` | `api.us3.datadoghq.com` |
| メトリクス | `metrics-agent-pl-1.77764c37-633a-4c24-ac9b-0069ce5cd344.westus2.azure.privatelinkservice` | `metrics.agent.us3.datadoghq.com` |
| コンテナ  | `orchestrator-pl-1.8ca24d19-b403-4c46-8400-14fde6b50565.westus2.azure.privatelinkservice` | `orchestrator.us3.datadoghq.com` |
| プロセス | `process-pl-1.972de3e9-3b00-4215-8200-e1bfed7f05bd.westus2.azure.privatelinkservice` | `process.us3.datadoghq.com` |
| プロファイリング | `profile-pl-1.3302682b-5bc9-4c76-a80a-0f2659e1ffe7.westus2.azure.privatelinkservice` | `intake.profile.us3.datadoghq.com` |
| トレース | `trace-edge-pl-1.d668729c-d53a-419c-b208-9d09a21b0d54.westus2.azure.privatelinkservice` | `trace.agent.us3.datadoghq.com` |
| リモート構成 | `fleet-pl-1.37765ebe-d056-432f-8d43-fa91393eaa07.westus2.azure.privatelinkservice` | `config.us3.datadoghq.com` |
| Database Monitoring | `dbm-metrics-pl-1.e391d059-0e8f-4bd3-9f21-708e97a708a9.westus2.azure.privatelinkservice` | `dbm-metrics-intake.us3.datadoghq.com` |

[1]: https://azure.microsoft.com/en-us/products/private-link
[2]: https://learn.microsoft.com/en-us/azure/private-link/private-link-service-overview
[3]: https://learn.microsoft.com/en-us/azure/dns/private-dns-privatednszone
{{% /site-region %}}