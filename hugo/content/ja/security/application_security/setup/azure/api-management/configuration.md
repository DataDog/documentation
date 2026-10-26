---
description: Azure CLI、Bicep、または Docker を使用して App and API Protection コールアウトサービスをデプロイし、その環境変数を構成します。
further_reading:
- link: /security/application_security/setup/azure/api-management
  tag: ドキュメント
  text: Azure API Management 向けの App and API Protection の有効化
- link: /security/application_security/setup/azure/api-management/policies
  tag: ドキュメント
  text: App and API Protection 向けの Azure API Management ポリシー
- link: https://github.com/DataDog/dd-trace-go/tree/main/contrib/azure/apim-callout
  tag: ソースコード
  text: App and API Protection Azure API Management コールアウトのソース
- link: /security/application_security/troubleshooting
  tag: ドキュメント
  text: App and API Protection のトラブルシューティング
title: Azure API Management コールアウトの構成
---
{{< callout url="#" btn_hidden="true" header="Azure API Management 向けの App and API Protection はプレビュー版です" >}}
Azure API Management 向けの App and API Protection のプレビューを試すには、以下のセットアップ手順を使用してください。
{{< /callout >}}

このページでは、ワンクリックテンプレートを使用せずに、Azure API Management (APIM) 用の App and API Protection コールアウトサービスをデプロイおよび構成する方法について説明します。まだインテグレーションをデプロイしていない場合は、[Azure API Management 向けの App and API Protection の有効化][1]から始めてください。

コールアウトサービスはコンテナイメージ `ghcr.io/datadog/dd-trace-go/apim-callout:latest` として提供されます。これは 2 つのポートでリッスンします。

- `8080` は、すべてのリクエストおよびレスポンスフェーズを処理するコールアウトエンドポイント `POST /` を提供します。
- `8081`は、ヘルスエンドポイント `GET /` を提供します。

##  デプロイオプション {#deployment-options}

{{< tabs >}}
{{% tab "Azure CLI" %}}

`deploy/azure/deploy.sh` スクリプトは `az deployment group create` をラップします。

まず、Azure CLI がインストールされ認証されていること、Bicep が利用可能であること、リソースグループが存在すること、および APIM のティアが Consumption ではないことを確認します。次に `az deployment group what-if` を実行し、変更を適用する前にプレビューできるようにします。

```shell
DD_API_KEY=<your-datadog-api-key> \
  ./deploy/azure/deploy.sh \
  --resource-group <rg-name> \
  --apim-name <apim-service-name>
```

成功すると、スクリプトはコールアウト URL、Container Apps ホスト名、Datadog Agent IP アドレス、およびポリシーがデプロイされたかどうかを出力します。

この例では `--deploy-policy` と `--no-deploy-policy` の両方を省略しているため、スクリプトが自動的に選択します。ターゲットスコープの既存のポリシーを読み取った後、次の処理を実行します。

- スコープにポリシーがない場合、またはデフォルトのスケルトンのみが存在する場合にポリシーをデプロイします。
- Datadog コールアウトがすでに配置されている場合、またはカスタムポリシーコンテンツが見つかった場合にデプロイをスキップします。

これは `deployPolicy` がデフォルトで `false` になる Bicep モジュールとは異なります。したがって、上記のコマンドにより APIM ポリシーが書き込まれる可能性があります。ポリシーが書き込まれないことを保証するには、`--no-deploy-policy` を渡します。

使用可能なフラグ:

| フラグ                            | 説明                                                     |
|---------------------------------|-----------------------------------------------------------------|
| `--resource-group`、`-g`        | デプロイのリソースグループ。                                         |
| `--apim-name`                   | 保護する APIM インスタンスの名前。                          |
| `--apim-resource-group`         | APIM インスタンスを含むリソースグループ (デプロイのリソースグループと異なる場合)。そのリソースグループ内にリソースを作成する権限も必要です。デプロイによって、マネージド ID、ロールの割り当て、およびデプロイスクリプトがそこに作成されます。|
| `--api-ids`                     | ポリシーを特定の API ID に制限します。                       |
| `--deploy-policy`               | Datadog ポリシーをインジェクトします。                                     |
| `--no-deploy-policy`            | ポリシーのインジェクションをスキップします。                                         |
| `--what-if`                     | デプロイを適用せずにプレビューします。                    |
| `--name-prefix`                 | 作成されるリソース名のプレフィックス。                             |
| `--container-image`             | コールアウトコンテナイメージを上書きします。                          |
| `--dd-site`                     | Datadog サイト。                                                  |
| `--log-analytics-workspace-id`  | ログ用の既存の Log Analytics ワークスペースの ID。                     |
| `--vnet-address-prefix`         | 作成される仮想ネットワークのアドレス空間。サブネットプレフィックスは固定されているため、この値にはそれらを含める必要があります。[アドレス範囲](#address-ranges)を参照してください。|
| `--existing-vnet-id`            | 使用する既存の仮想ネットワークの ID。必要なサブネットとその前提条件については、[既存の仮想ネットワークの使用](#using-an-existing-virtual-network)を参照してください。|
| `--existing-aca-subnet-id`      | コールアウトサービス用の既存のサブネットの ID。`--existing-vnet-id` と共に必須です。|
| `--existing-aci-subnet-id`      | Datadog Agent 用の既存のサブネットの ID。`--existing-vnet-id` と共に必須です。|
| `--enable-https`                | コールアウトエンドポイントを HTTPS 経由で提供します。                         |
| `--no-locks`                    | リソースロックをスキップします。                                           |
| `--min-replicas`                | コールアウトレプリカの最小数。                                      |
| `--max-replicas`                | コールアウトレプリカの最大数。                                      |
| `--concurrent-requests`         | スケールアウト前のレプリカあたりの同時リクエスト数。            |

スクリプトは環境から `DD_API_KEY` および `DD_SITE` を読み取ります。

{{% /tab %}}

{{% tab "Bicep モジュール" %}}

独自のインフラストラクチャー・アズ・コードから Bicep モジュールを直接参照します。

```bicep
module apimCallout 'path/to/contrib/azure/apim-callout/deploy/azure/main.bicep' = {
  name: 'dd-apim-callout'
  params: {
    datadogApiKey: keyVault.getSecret('dd-api-key')
    apimServiceName: 'my-apim'
    logAnalyticsWorkspaceId: logAnalytics.id
    // every other parameter has a default
  }
}
```

`datadogApiKey` および `apimServiceName` は必須です。残りのパラメーターはオプションです: `apimResourceGroup`、`targetApiIds`、`logAnalyticsWorkspaceId`、`namePrefix`、`location`、`datadogSite`、`deployPolicy`、`enableHttps`、`containerImage`、`vnetAddressPrefix`、`existingVnetId`、`existingAcaSubnetId`、`existingAciSubnetId`、`enableLocks`、`minReplicas`、`maxReplicas`、`concurrentRequestsThreshold`、および `customTags`。

`existingVnetId` を設定すると、`existingAcaSubnetId` および `existingAciSubnetId` が必須となり、それらのサブネットに前提条件が追加されます。`vnetAddressPrefix` を設定してもサブネットは移動しません。両方については、[ネットワーキング](#networking) を参照してください。

デフォルト:

| パラメーター                     | デフォルト                                           |
|-------------------------------|---------------------------------------------------|
| `namePrefix`                  | `dd-apim`                                         |
| `datadogSite`                 | `datadoghq.com`                                   |
| `deployPolicy`                | `false`                                           |
| `enableHttps`                 | `false`                                           |
| `containerImage`              | `ghcr.io/datadog/dd-trace-go/apim-callout:latest` |
| `vnetAddressPrefix`           | `10.0.0.0/16`                                     |
| `minReplicas` / `maxReplicas` | `1` / `10`                                        |
| `concurrentRequestsThreshold` | `20`                                              |
| `targetApiIds`                | 空。すべての API に適用されます                  |

指定可能な `datadogSite` の値は、`datadoghq.com`、`us3.datadoghq.com`、`us5.datadoghq.com`、`datadoghq.eu`、`ap1.datadoghq.com`、`ap2.datadoghq.com`、および `ddog-gov.com` です。ご利用のサイトは {{< region-param key="dd_site" code="true" >}}です。

{{% /tab %}}

{{% tab "Docker" %}}

ローカルでのテストや Azure 以外でのホスティングを行う場合は、イメージを直接実行します。

```shell
docker run -d \
  -p 8080:8080 \
  -p 8081:8081 \
  -e DD_AGENT_HOST=datadog-agent \
  ghcr.io/datadog/dd-trace-go/apim-callout:latest
```

サービスが実行されていることを確認します。

```shell
curl -s http://localhost:8081/
# {"status":"ok","library":{"language":"golang","version":"2.x.x"}}
```

このようにホストされたコンテナであっても、APIM ゲートウェイからのネットワーク到達性と、トレースおよびセキュリティイベントを受信するための Datadog Agent が必要です。

{{% /tab %}}
{{< /tabs >}}

## ネットワーキング {#networking}

### アドレス範囲 {#address-ranges}

`vnetAddressPrefix` と `--vnet-address-prefix` は仮想ネットワークのアドレス空間を設定しますが、その内部のサブネットプレフィックスは固定されています。

| サブネット             | プレフィックス         |
|--------------------|----------------|
| コールアウトサービス    | `10.0.1.0/27`  |
| Datadog Agent      | `10.0.2.0/24`  |
| APIM               | `10.0.3.0/27`  |

デプロイはアドレス空間からサブネットを導出しないため、設定する値にはこれら 3 つのプレフィックスが含まれている必要があります。デフォルトの `10.0.0.0/16` は含まれています。`10.1.0.0/16` のような値を指定するとサブネットが仮想ネットワークの外側になり、デプロイは失敗します。

コールアウトサービスを別のアドレス範囲に配置するには、代わりに `existingVnetId` を使用して独自のネットワークを指定してください。

### 既存の仮想ネットワークの使用 {#using-an-existing-virtual-network}

`existingVnetId` を設定すると、デプロイは仮想ネットワーク、サブネット、ネットワークセキュリティグループ、および NAT ゲートウェイをスキップします。代わりにそれらを指定するため、`existingAcaSubnetId` と `existingAciSubnetId` が必須となり、各サブネットはデプロイが本来設定する要件を満たしている必要があります。

-  コールアウトサブネットには `Microsoft.App/environments` 委任と、Container Apps 環境のための十分なアドレスが必要です。
-  Agent サブネットには `Microsoft.ContainerInstance/containerGroups` 委任と、Agent が Datadog に到達できるようにするためのアウトバウンド接続が必要です。
-  コールアウトサービスはポート `8126` で Agent に到達できる必要があります。

このモードではデプロイによって APIM サブネットが作成されないため、APIM インスタンスはすでに同じ仮想ネットワークにインテグレーションされている必要があります。そうでない場合、APIM 構成ステップが失敗するか、APIM がコールアウトサービスを解決できなくなる可能性があります。

## 構成 {#configuration}

コールアウトサービスは起動時に Datadog Web Application Firewall (WAF) 自体を有効にするため、`DD_APPSEC_ENABLED` を設定する必要はありません。

このサービスは以下の設定をサポートしています。

| 環境変数               | デフォルト値 | 説明                                                                                                                         |
|------------------------------------|---------------|-------------------------------------------------------------------------------------------------------------------------------------|
| `DD_APIM_CALLOUT_HOST`             | `0.0.0.0`     |  コールアウトサービスがリッスンするアドレス。                                                                                           |
| `DD_APIM_CALLOUT_PORT`             | `8080`        |  コールアウトエンドポイントのポート (`POST /`)。                                                                                          |
| `DD_APIM_CALLOUT_HEALTHCHECK_PORT` | `8081`        |  ヘルスエンドポイントのポート (`GET /`)。                                                                                            |
| `DD_APPSEC_BODY_PARSING_SIZE_LIMIT`| `10485760`    |  分析されるボディの最大バイト数 (10 MB)。`0` に設定するとボディの分析がスキップされ、交換が 2 回の呼び出しに削減されます。 |
| `DD_APIM_CALLOUT_REQUEST_TIMEOUT`  | `30s`         |  リクエストごとにキャッシュされた状態の生存期間 (TTL)。孤立した状態はこの期間後に解放されます。                                          |
| `DD_APIM_CALLOUT_TLS`              | `false`       |  HTTP の代わりに HTTPS を使用して提供します。                                                                                                       |
| `DD_APIM_CALLOUT_TLS_CERT_FILE`    | (空)       | TLS 証明書へのパス。TLS が有効な場合に必須です。                                                                         |
| `DD_APIM_CALLOUT_TLS_KEY_FILE`     | (空)       | TLS 秘密鍵へのパス。TLS が有効な場合に必須です。                                                                         |

## 自動デフォルト {#automatic-defaults}

以下の変数が設定されていない場合、サービスは起動時にそれらを割り当てます。

| 環境変数          | 値     | 説明                                                    |
|-------------------------------|-----------|----------------------------------------------------------------|
| `DD_APM_TRACING_ENABLED`      | `false`   | コールアウトサービス自体の APM トレースを送信するかどうか。               |
| `DD_APPSEC_WAF_TIMEOUT`       | `10ms`    | リクエストごとの WAF 評価予算。                            |
| `DD_TRACE_PROPAGATION_STYLE`  | `datadog` | リクエストに挿入されるトレースコンテキストヘッダーの形式。   |

単一の WAF 評価が予算を超えた場合、リクエストは遅延されるのではなく許可されます。

## Datadog Agent コネクション {#datadog-agent-connection}

コールアウトサービスは Datadog に直接データを送信しません。トレースとセキュリティイベントを Datadog Agent に送信し、Agent がそれを Datadog に転送します。コールアウトサービスと Agent は別々のコンテナで実行され、それぞれ独自の環境変数を持っています。

**コールアウトコンテナ**上:

| 環境変数 | デフォルト値 | 説明                           |
|----------------------|---------------|---------------------------------------|
| `DD_AGENT_HOST`      | `localhost`   | Datadog Agent のホスト名または IP。|

**Datadog Agent コンテナ**上:

| 環境変数      | デフォルト値   | 説明                                                                                       |
|---------------------------|-----------------|---------------------------------------------------------------------------------------------------|
| `DD_API_KEY`              | (必須)      | Datadog API キー。                                                                            |
| `DD_SITE`                 | `datadoghq.com` | Datadog サイト。                                                                               |
| `DD_APM_ENABLED`          | `false`         | `true` に設定します。そうしないと、Agent はトレースを受け付けません。                                       |
| `DD_APM_NON_LOCAL_TRAFFIC`| `false`         | `true` に設定します。コールアウトサービスは別のコンテナで実行されるため、そのトラフィックは Agent に対してローカルではありません。|
| `DD_APM_RECEIVER_PORT`    | `8126`          | Agent がトレースを受け入れるポート。コールアウトサービスはそれに到達できる必要があります。                          |

コールアウトサービスは独自のコンテナで実行されるため、`DD_APM_ENABLED` と `DD_APM_NON_LOCAL_TRAFFIC` の両方が必要です。これらがないと、Agent はこのインテグレーションによって生成されるスパンとセキュリティイベントを破棄します。ワンクリックデプロイでは、これらすべてが Agent コンテナに自動的に設定されます。

`DD_API_KEY`をコールアウトコンテナに設定しないでください。ワンクリックデプロイでは、`DD_AGENT_HOST` がコールアウトコンテナに設定され、`datadogApiKey` と `datadogSite` が Agent コンテナの `DD_API_KEY` と `DD_SITE` にマッピングされます。

ご利用のサイトは {{< region-param key="dd_site" code="true" >}}です。

## コールアウトエンドポイントの暗号化 {#encrypting-the-callout-endpoint}

コールアウトエンドポイントを HTTPS 経由で提供するには、`DD_APIM_CALLOUT_TLS` を `true` に設定し、`DD_APIM_CALLOUT_TLS_CERT_FILE` と `DD_APIM_CALLOUT_TLS_KEY_FILE` の両方を指定してください。TLS が有効で、どちらかのファイルが欠落している場合、サービスは起動しません。受け入れ可能な最小 TLS バージョンは 1.2 です。

TLS が有効な場合、APIM ポリシーは `https://` 経由でサービスを呼び出す必要があります。

## 健全性チェック {#health-check}

ポート `8081` の健全性エンドポイントを確認します。

```shell
curl -s http://localhost:8081/
# {"status":"ok","library":{"language":"golang","version":"2.x.x"}}
```

`200` レスポンスはサービスが実行中であることを示しますが、WAF の状態を示すものではありません。セキュリティデータが到着していることを確認するには、[Azure API Management 向けの App and API Protection の有効化][1]で説明されている Datadog UI チェックを使用してください。

## サイジングとパフォーマンス{#sizing-and-performance}

0.5 vCPU、1 GiB の Azure Container Apps デプロイでは、request-headers フェーズと response-headers フェーズはそれぞれ約 2.4 ms かかります。コールアウトサービスとバックエンドの両方を含む完全な APIM パイプラインは、約 9.7 ms かかります。

ボディフェーズは、ボディ検査が有効になっており、前のフェーズでボディが要求された場合にのみ実行されます。ゲートウェイはコールアウトサービスへのコネクションプールを維持しており、これにより本番環境でのレイテンシーを削減できます。

ネットワークのラウンドトリップ時間を最小限に抑えるには、コールアウトサービスを APIM インスタンスと同じ Azure リージョンにデプロイし、APIM を API コンシューマーの近くに配置してください。デフォルトでは、サービスは 1 から 10 個のレプリカにスケーリングし、レプリカあたり 20 件の同時リクエストでスケールアウトします。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/application_security/setup/azure/api-management