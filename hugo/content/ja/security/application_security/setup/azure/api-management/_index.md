---
description: App and API Protection コールアウトサービスを使用して、Azure API Management ゲートウェイに脅威の検出とブロック機能を追加します。
further_reading:
- link: /security/application_security/setup/azure/api-management/configuration
  tag: ドキュメント
  text: Azure API Management コールアウトの構成
- link: /security/application_security/setup/azure/api-management/policies
  tag: ドキュメント
  text: App and API Protection 向けの Azure API Management ポリシー
- link: https://github.com/DataDog/dd-trace-go/tree/main/contrib/azure/apim-callout
  tag: ソースコード
  text: App and API Protection Azure API Management コールアウトのソース
- link: /security/default_rules/?category=cat-application-security
  tag: ドキュメント
  text: OOTB App and API Protection ルール
- link: /security/application_security/troubleshooting
  tag: ドキュメント
  text: App and API Protection のトラブルシューティング
title: Azure API Management 向けの App and API Protection の有効化
---
{{< callout url="#" btn_hidden="true" header="Azure API Management 向けの App and API Protection はプレビュー版です" >}}
Azure API Management 向けの App and API Protection のプレビューを試すには、以下のセットアップ手順を使用してください。
{{< /callout >}}

Azure API Management (APIM) 向けの App and API Protection は、バックエンドコードを変更することなく、APIM ゲートウェイに脅威の検出とブロック機能を追加します。APIM はマネージドサービスであるため、インプロセストレーサーを実行することはできません。代わりに、Datadog はゲートウェイが APIM ポリシーから呼び出す HTTP コールアウトサービスを提供します。各リクエストに対して、サービスは Datadog Web Application Firewall (WAF) を実行し、継続またはブロックという判定を返します。

保護はゲートウェイで適用されるため、言語に関係なく、ゲートウェイの背後にあるすべての API をカバーします。これには、自身で管理していないサードパーティ製 API やレガシー API も含まれます。

## 仕組み {#how-it-works}

Azure API Management は、インバウンドおよびアウトバウンドの経路でポリシーを評価します。Datadog ポリシーは、各段階で Datadog コールアウトサービスへの [`send-request`][1] コールアウトを追加し、ポリシー変数から判定を読み取ります。

このやり取りでは、4 つの呼び出しを使用します。

1. **インバウンド、リクエストヘッダー。**サービスは、リクエスト ID、Datadog トレース伝播ヘッダー、およびボディの検査が適用される場合は受け入れるボディのバイト数を返します。
2. **インバウンド、リクエストボディ。**前のフェーズでボディが要求された場合にのみ実行されます。
3. **アウトバウンド、レスポンスヘッダー。**
4. **アウトバウンド、レスポンスボディ。**前のフェーズでボディが要求された場合にのみ実行されます。

リクエスト ID は、4 つのフェーズすべてを単一の WAF 評価コンテキストに関連付けます。インバウンドフェーズでブロックの判定が返された場合、APIM はブロックレスポンスをクライアントに返し、バックエンドを呼び出すことはありません。アウトバウンドフェーズでブロックの判定が返された場合、バックエンドはすでに実行されており、APIM はそのレスポンスをブロックレスポンスに置き換えます。判定が継続の場合、APIM は Datadog トレースコンテキストヘッダーを挿入し、通常通りリクエストを転送します。

このインテグレーションは、あらゆる段階でフェイルオープンします。各コールアウトは `ignore-error="true"` を設定するため、コールアウトサービスに到達できない場合、タイムアウトした場合、または `200` 以外で応答した場合、トラフィックは変更されずに進行します。誤構成は、トラフィックの破損ではなく、セキュリティデータの欠落として表示されます。

ポリシーの内部構造については、[App and API Protection 向け Azure API Management ポリシー][2]を参照してください。

## 前提条件{#prerequisites}

- Azure サブスクリプション。
- **Developer**、**Standard v2**、または **Premium** ティアの既存の Azure API Management インスタンス。このインテグレーションはコールアウトサービスを仮想ネットワーク内に配置し、APIM 仮想ネットワークインテグレーションを必要とするため、**Consumption** ティアはサポートされていません。
- [Datadog API キー][3]。
- ターゲットのリソースグループに ARM または Bicep テンプレートをデプロイし、APIM ポリシーを編集するための権限。
- `Microsoft.Authorization/roleAssignments/write`APIM リソース上での権限。このテンプレートは、仮想ネットワークインテグレーションを構成できるように、マネージド ID に **API Management サービス共同作成者**ロールを付与します。このロール割り当ては、`deployPolicy` が `false` の場合を含め、デプロイのたびに作成されます。
- オプション: Container Apps のログを収集するための既存の Log Analytics ワークスペース。

## コールアウトサービスのデプロイ {#deploy-the-callout-service}

**Deploy to Azure** をクリックし、Azure ポータルのフォームに入力します。

[![Deploy to Azure](https://aka.ms/deploytoazurebutton)][4]

2 つのパラメーターが必要です。

| パラメーター         | 値                                                                                                                                       |
|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| `datadogApiKey`   | Datadog API キー。Azure ポータルで **Reference a Key Vault secret** を選択すると、既存の Key Vault シークレットを使用できます。|
| `apimServiceName` | 保護する既存の APIM インスタンスの名前。                                                                                         |

テンプレートは以下のリソースをプロビジョニングします。

- APIM、コールアウトサービス、および Datadog Agent 用の個別のサブネットを持つ仮想ネットワーク。テンプレートは、ネットワークセキュリティグループとエグレス用の NAT ゲートウェイも作成します。
- KEDA HTTP オートスケーリングを備えた Azure Container Apps 上のコールアウトサービス。イングレスはポート `8080`、ヘルスプローブはポート `8081` を使用し、サービスはレプリカあたり 20 の同時リクエストで 1 から 10 のレプリカにスケーリングします。
- プライベートサブネット内の Azure Container Instances 上の Datadog Agent。コールアウトサービスは、トレースとセキュリティイベントを Agent に送信します。
- APIM が内部 Container Apps のホスト名を解決できるようにするためのプライベート DNS ゾーンと仮想ネットワークリンク。
- 既存の APIM インスタンス上の仮想ネットワークインテグレーション、およびオプションで Datadog ポリシー自体。

その他のすべてのパラメーターにはデフォルト値が設定されています。役に立つデフォルト値は以下のとおりです。

| パラメーター                     | デフォルト値                                              |
|-------------------------------|------------------------------------------------------|
| `namePrefix`                  | `dd-apim`                                            |
| `datadogSite`                 | {{< region-param key="dd_site" code="true" >}}       |
| `deployPolicy`                | `false`                                              |
| `enableHttps`                 | `false`                                              |
| `containerImage`              | `ghcr.io/datadog/dd-trace-go/apim-callout:latest`    |
| `vnetAddressPrefix`           | `10.0.0.0/16`                                        |
| `minReplicas` / `maxReplicas` | `1` / `10`                                           |
| `concurrentRequestsThreshold` | `20`                                                 |
| `targetApiIds`                | 空 (すべての API に適用されます)                     |

代わりにコマンドラインまたは独自の Infrastructure as Code からデプロイする場合は、[Azure API Management コールアウトの構成][5]を参照してください。

## Datadog ポリシーの適用 {#apply-the-datadog-policy}

コールアウトサービスはゲートウェイから送信されたトラフィックのみを検査するため、保護する API に Datadog ポリシーをアタッチします。

2 つのオプションがあります。

- `deployPolicy` を `true` に設定し、デプロイによってポリシーを注入させます。`targetApiIds` パラメーターはポリシーを受け取る API を選択するもので、デフォルトではすべての API が対象となります。
- APIM ポリシーエディターで、提供されているポリシー XML を手動で適用します。プレースホルダー URL `https://<dd-apim-callout-host>:8080` のすべての出現箇所を、ホスト名単体ではなく、デプロイの `calloutBaseUrl` 出力に置き換えてください。`enableHttps` を `true` に設定しない限り、出力は `http://<ACA-FQDN>` となり、ポートは含まれません。`https` スキームまたは `:8080` サフィックスをそのまま残すと、ポリシーがサービスを認識できず、フェイルオープンになります。

<div class="alert alert-warning">
 <code>deployPolicy</code> を <code>true</code> に設定すると、選択した各スコープのポリシーが<strong>置き換えられます</strong>。既存の内容とマージされることはないため、そのスコープに存在するルールはすべて失われます。保護対象の API にすでにポリシーコンテンツが含まれている場合は、ポリシーを手動で適用し、Datadog のインバウンドおよびアウトバウンドフラグメントを既存のセクションにマージします。
</div>

ポリシーの内容、アタッチメントスコープ、およびブロックがクライアントレスポンスになる仕組みについては、[App and API Protection 向け Azure API Management ポリシー][2]を参照してください。

## デプロイの検証 {#validate-the-deployment}

通常のリクエストを送信し、その後、攻撃をシミュレートします。

```shell
# Normal request: passes through to your backend
curl -v https://<apim-gateway-host>/<api-path>

# Simulated attack: returns 403
curl -v -A dd-test-scanner-log-block "https://<apim-gateway-host>/<api-path>"
```

Datadog で結果を確認します。

1. [{{< ui >}}Security{{< /ui >}} > {{< ui >}}App and API Protection{{< /ui >}}][6] を開き、シミュレートされた攻撃がシグナルとして表示されることを確認します。
2. [App and API Protection Service Inventory][7] を開き、`apim-callout` サービスが表示されることを確認します。そのスパンにはタグ `component:apim-callout` が付与されます。別のサービス名を使用するには、コールアウトコンテナで `DD_SERVICE` を設定してください。

コールアウトサービスは、ポート `8081` でヘルスエンドポイントも公開します。Container Apps のイングレスはポート `8080` のみを公開するため、ヘルスエンドポイントにはコンテナ内からのみアクセスできます。Azure Container Apps は、これを liveness (稼働確認) および readiness (準備完了確認) プローブに使用します。ステータスを確認するには、Azure ポータルでレプリカの健全性を確認します。

## パフォーマンス {#performance}

0.5 vCPU、1 GiB の Azure Container Apps デプロイで測定。

| フェーズ                                                          | 処理時間 |
|----------------------------------------------------------------|-----------------|
| リクエストヘッダー                                                | ~2.4 ms         |
| レスポンスヘッダー                                               | ~2.4 ms         |
| コールアウトとバックエンドの両方を含む、APIM パイプライン全体    | ~9.7 ms         |

ボディフェーズは、ボディ検査が有効になっており、かつ前のフェーズでボディが要求された場合にのみ実行されます。ネットワークのラウンドトリップ時間を最小限に抑えるため、コールアウトサービスは APIM インスタンスと同じ Azure リージョンにデプロイします。

## 互換性{#compatibility}

このインテグレーションでサポートされる機能と、それらが導入されたバージョンについては、[App and API Protection の互換性要件][8]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/en-us/azure/api-management/send-request-policy
[2]: /ja/security/application_security/setup/azure/api-management/policies
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fdd-trace-go%2Fmain%2Fcontrib%2Fazure%2Fapim-callout%2Fdeploy%2Fazure%2Fazuredeploy.json
[5]: /ja/security/application_security/setup/azure/api-management/configuration
[6]: https://app.datadoghq.com/security/appsec
[7]: https://app.datadoghq.com/security/appsec/inventory/services
[8]: /ja/security/application_security/setup/compatibility/