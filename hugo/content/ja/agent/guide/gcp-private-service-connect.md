---
further_reading:
- link: /integrations/google_cloud_platform/
  tag: ドキュメント
  text: Datadog-Google Cloud Platform インテグレーション
- link: /agent/guide/private-link
  tag: ドキュメント
  text: AWS PrivateLink を介して Datadog に接続する
title: Google Cloud Private Service Connect 経由で Datadog に接続
---

{{% site-region region="us,us3,gov,ap1" %}}
<div class="alert alert-danger">この機能は、選択した Datadog サイトではサポートされていません。</div>
{{% /site-region %}}

{{% site-region region="us5" %}}
[Google Cloud Private Service Connect][1] (PSC) では、公衆インターネットを使用せずにテレメトリーを Datadog に送信することができます。

Datadog は、Google Cloud のデータインテークサービスの一部を Private Service Connect の[_公開サービス_][2]として公開しています。詳細は[公開サービスの表](#published-services)をご覧ください。

PSC エンドポイントを構成して、Datadog インテークサービスごとにプライベート IP アドレスを公開できます。この IP アドレスは、Datadog バックエンドにトラフィックをルーティングします。次に、Google Cloud の [_Private DNS Zone_][3] を構成して、使用される各エンドポイントに対応する DNS 名をオーバーライドできます。

{{< img src="agent/guide/psc/gcp-psc-overview-1.png" alt="Google Cloud Private Service Connect スキーマ。左側の 'Customer VPC' ボックスには、PSC エンドポイントにデータを送信する Datadog Agent が含まれています。右側の 'Datadog VPC' ボックスには、Datadog サービスと通信するサービスアタッチメントが含まれています。'Customer VPC' ボックスのエンドポイントは、Google Cloud バックボーンを介して 'Datadog VPC' ボックスのサービスアタッチメントに接続します。">}}

## セットアップ

### エンドポイントを接続する

1. Google Cloud コンソールで、**Network services** > **Private Service Connect** に移動します。
2. **Endpoints** セクションに進み、**Connect endpoint** をクリックします。
   {{< img src="agent/guide/psc/connect-endpoint1.png" alt="Google Cloud コンソールの 'Connect endpoint' ページのスクリーンショット" >}}

   - **Target** では、_Published service_ を選択します。
   - **Target service** には、使用する Datadog インテークサービスに対応する_PSC ターゲット名_を入力します。PSC ターゲット名は、[公開サービスの表](#published-services)で確認できます。
   - **Endpoint name** には、このエンドポイントで使用する一意の識別子を入力します。`datadog-<SERVICE>` という形式を使えます。例えば `datadog-api` などです。
   - **Network** および **Subnetwork** では、エンドポイントを公開するネットワークとサブネットワークを選択します。
   - **IP address** のドロップダウンをクリックし、_Create IP address_ を選択して、エンドポイント専用のサブネットから内部 IP アドレスを作成します。この IP アドレスを選択します。
   - エンドポイントを `us-central1` リージョン外の仮想マシンに接続する場合は、**Enable global access** にチェックを入れます。

   **注**: Datadog は、`us-central1` リージョンから PSC プロデューサーエンドポイントを公開しており、これらのエンドポイントはグローバルアクセスをサポートしています。どのリージョンからでもサービスが接続可能ですが、転送ルールは `us-central1` リージョンで作成する必要があります。

3. **Add endpoint** をクリックし、ステータスが _Accepted_ になっていることを確認します。次のセクションで使用するため、IP アドレスをメモしておきます。
   {{< img src="agent/guide/psc/connect-endpoint-success1.png" alt="Google Cloud コンソールでエンドポイントを追加した後の成功メッセージのスクリーンショット。IP アドレスが含まれています" >}}

### DNS ゾーンを作成する
1. Google Cloud コンソールで、**Network services** > **Cloud DNS** に移動します。
2. **Create zone** をクリックします。
   {{< img src="agent/guide/psc/create-a-dns-zone1.png" alt="Google Cloud コンソールの 'Create a DNS zone' ページのスクリーンショット" >}}

   - **Zone type** では _Private_ を選択します。
   - **Zone name** には、ゾーンの識別名を入力します。
   - **DNS name** には、使用する Datadog インテークサービスに対応する_プライベート DNS 名_を入力します。DNS 名は、[公開サービスの表](#published-services)で確認できます。
3. 次に、エンドポイントの IP に向けた `A` レコードを作成します。作成したゾーンの _Zone details_ ページで、**Add record set** をクリックします。
   {{< img src="agent/guide/psc/create-record1.png" alt="Google Cloud コンソールの 'Create record set' ページのスクリーンショット" >}}

   - **DNS name** フィールドは変更せずそのままにします。
   - **Resource record type** には `A` を選択します。
   - **IPv4 Address** に、前のセクションの最後に表示された IP アドレスを入力します。

### メトリクスとトレースに必要な追加手順
Datadog インテークサービスには、(`agent.`{{< region-param key="dd_site" code="true" >}}) ドメインのサブドメインが 2 つあります。このため、プライベートホストゾーンは他のインテークとは少し異なります。

[DNS ゾーンを作成](#create-a-dns-zone-1)セクションに従い、(`agent.`{{< region-param key="dd_site" code="true" >}}) 用のプライベートゾーンを作成し、以下の 3 つのレコードを追加します。

| DNS 名 | リソースレコードタイプ | IPv4 アドレス |
| -------- |----------------------| ------------ |
| `(apex)` | A                    | メトリクスエンドポイントの IP アドレス |
| `*`      | A                    | メトリクスエンドポイントの IP アドレス |
| `trace`  | A                    | トレースエンドポイントの IP アドレス |

**注**: このゾーンでは、メトリクスエンドポイントの IP アドレスを指すワイルドカード (`*`) レコードが必要です。Datadog Agent は (`<version>-app.agent.`{{< region-param key="dd_site" code="true" >}}) の形式でバージョン付きエンドポイントを使用してテレメトリーを送信するためです。

### 検証

構成を確認するには、ローカルノードの 1 つに SSH で接続し、以下のような `dig` コマンドを実行します。

_ワイルドカードがメトリクスエンドポイントにルーティングされていることを確認します_
```shell
> dig +noall +answer 7-49-0-app.agent.us5.datadoghq.com
```

レスポンスは次のようになります。
```
7-49-0-app.agent.us5.datadoghq.com. 300 IN A        10.1.0.4
```


_トレースサブドメインがトレースエンドポイントにルーティングされていることを確認します_
```shell
> dig +noall +answer trace.agent.us5.datadoghq.com
```
レスポンスは次のようになります。
```
trace.agent.us5.datadoghq.com. 300 IN  A       10.1.0.9
```

レスポンスの IP アドレスが、PSC ターゲットに関連付けられている IP アドレスと一致していることを確認してください。

## 公開サービス
| Datadog インテークサービス | PSC ターゲット名 | プライベート DNS 名 |
| ---------------------- | --------------- | ---------------- |
| ログ (Agent)           | `projects/datadog-prod-us5/regions/us-central1/serviceAttachments/nlb-logs-agent-intake-psc` | `agent-http-intake.logs.us5.datadoghq.com` |
| ログ (ユーザーの HTTP 取り込み) | `projects/datadog-prod-us5/regions/us-central1/serviceAttachments/nlb-logs-intake-psc` | `http-intake.logs.us5.datadoghq.com` |
| API | `projects/datadog-prod-us5/regions/us-central1/serviceAttachments/nlb-api-psc` | `api.us5.datadoghq.com` |
| メトリクス | `projects/datadog-prod-us5/regions/us-central1/serviceAttachments/nlb-metrics-agent-psc` | `agent.us5.datadoghq.com` |
| コンテナ | `projects/datadog-prod-us5/regions/us-central1/serviceAttachments/nlb-orchestrator-psc` | `orchestrator.us5.datadoghq.com` |
| プロセス | `projects/datadog-prod-us5/regions/us-central1/serviceAttachments/nlb-process-psc` | `process.us5.datadoghq.com` |
| プロファイリング | `projects/datadog-prod-us5/regions/us-central1/serviceAttachments/nlb-logs-http-profile-psc` | `intake.profile.us5.datadoghq.com` |
| トレース | `projects/datadog-prod-us5/regions/us-central1/serviceAttachments/nlb-trace-edge-psc` | `agent.us5.datadoghq.com` |
| Database Monitoring | `projects/datadog-prod-us5/regions/us-central1/serviceAttachments/nlb-dbm-metrics-psc` | `dbm-metrics-intake.us5.datadoghq.com` |
| リモート構成 | `projects/datadog-prod-us5/regions/us-central1/serviceAttachments/nlb-fleet-psc` | `config.us5.datadoghq.com` |



[1]: https://cloud.google.com/vpc/docs/private-service-connect
[2]: https://cloud.google.com/vpc/docs/private-service-connect#published-services
[3]: https://cloud.google.com/dns/docs/zones/zones-overview

{{% /site-region %}}
{{% site-region region="eu" %}}
[Private Service Connect][1] (PSC) では、公衆インターネットを使用せずにテレメトリーを Datadog に送信することができます。

Google Cloud Platform における一部のデータインテークサービスを、Datadog は PSC [_公開サービス_][2]として公開しています。詳細は[公開サービスの表](#published-services)をご覧ください。

PSC エンドポイントを構成して、Datadog インテークサービスごとにプライベート IP アドレスを公開できます。この IP アドレスは、Datadog バックエンドにトラフィックをルーティングします。次に、Google Cloud の [_Private DNS Zone_][3] を構成して、使用される各エンドポイントに対応する DNS 名をオーバーライドできます。

{{< img src="agent/guide/psc/gcp-psc-overview-1.png" alt="Google Cloud Private Service Connect スキーマ。左側の 'Customer VPC' ボックスには、PSC エンドポイントにデータを送信する Datadog Agent が含まれています。右側の 'Datadog VPC' ボックスには、Datadog サービスと通信するサービスアタッチメントが含まれています。'Customer VPC' ボックスの PSC エンドポイントは、Google Cloud バックボーンを介して 'Datadog VPC' ボックスのサービスアタッチメントに接続します。">}}

## セットアップ

### エンドポイントを接続する

1. GCP コンソールで、**Network services** > **Private Service Connect** に移動します。
2. **Endpoints** セクションに進み、**Connect endpoint** をクリックします。
   {{< img src="agent/guide/psc/connect-endpoint-eu1.png" alt="Google Cloud コンソールの 'Connect endpoint' ページのスクリーンショット" >}}

   - **Target** では、_Published service_ を選択します。
   - **Target service** には、使用する Datadog インテークサービスに対応する_PSC ターゲット名_を入力します。PSC ターゲット名は、[公開サービスの表](#published-services)で確認できます。
   - **Endpoint name** には、このエンドポイントで使用する一意の識別子を入力します。`datadog-<SERVICE>` という形式を使えます。例えば `datadog-metrics` などです。
   - **Network** および **Subnetwork** では、エンドポイントを公開するネットワークとサブネットワークを選択します。
   - **IP address** のドロップダウンをクリックし、_Create IP address_ を選択して、エンドポイント専用のサブネットから内部 IP アドレスを作成します。この IP アドレスを選択します。
   - エンドポイントを `europe-west3` リージョン外の仮想マシンに接続する場合は、**Enable global access** にチェックを入れます。

   **注**: Datadog は `europe-west3` リージョンから PSC プロデューサーエンドポイントを公開しており、これらのエンドポイントはグローバルアクセスをサポートしています。どのリージョンからでもサービスが接続可能ですが、転送ルールは `europe-west3` リージョンで作成する必要があります。

3. **Add endpoint** をクリックし、ステータスが _Accepted_ になっていることを確認します。次のセクションで使用するため、IP アドレスをメモしておきます。
   {{< img src="agent/guide/psc/connect-endpoint-success-eu1.png" alt="Google Cloud コンソールでエンドポイントを追加した後の成功メッセージのスクリーンショット。IP アドレスが含まれています" >}}

### DNS ゾーンを作成する
1. Google Cloud コンソールで、**Network services** > **Cloud DNS** に移動します。
2. **Create zone** をクリックします。
   {{< img src="agent/guide/psc/create-a-dns-zone-eu1.png" alt="Google Cloud コンソールの 'Create a DNS zone' ページのスクリーンショット" >}}

   - **Zone type** では _Private_ を選択します。
   - **Zone name** には、ゾーンの識別名を入力します。
   - **DNS name** には、使用する Datadog インテークサービスに対応する_プライベート DNS 名_を入力します。DNS 名は、[公開サービスの表](#published-services)で確認できます。
3. 次に、エンドポイントの IP に向けた `A` レコードを作成します。作成したゾーンの _Zone details_ ページで、**Add record set** をクリックします。
   {{< img src="agent/guide/psc/create-record-eu1.png" alt="Google Cloud コンソールの 'Create record set' ページのスクリーンショット" >}}

   - **DNS name** フィールドは変更せずそのままにします。
   - **Resource record type** には `A` を選択します。
   - **IPv4 Address** に、前のセクションの最後に表示された IP アドレスを入力します。

### メトリクスとトレースに必要な追加手順

Datadog インテークサービスには、(`agent.`{{< region-param key="dd_site" code="true" >}}) ドメインのサブドメインが 2 つあります。このため、プライベートホストゾーンは他のインテークとは少し異なります。

[DNS ゾーンを作成](#create-a-dns-zone-1)セクションに従い、(`agent.`{{< region-param key="dd_site" code="true" >}}) 用のプライベートゾーンを作成し、以下の 3 つのレコードを追加します。

| DNS 名 | リソースレコードタイプ | IPv4 アドレス |
| -------- |----------------------| ------------ |
| `(apex)` | A                    | メトリクスエンドポイントの IP アドレス |
| `*`      | A                    | メトリクスエンドポイントの IP アドレス |
| `trace`  | A                    | トレースエンドポイントの IP アドレス |

**注**: このゾーンでは、メトリクスエンドポイントの IP アドレスを指すワイルドカード (`*`) レコードが必要です。Datadog Agent は (`<version>-app.agent.`{{< region-param key="dd_site" code="true" >}}) の形式でバージョン付きエンドポイントを使用してテレメトリーを送信するためです。

### 検証

構成を確認するには、ローカルノードの 1 つに SSH で接続し、以下のような `dig` コマンドを実行します。

_ワイルドカードがメトリクスエンドポイントにルーティングされていることを確認します_
```shell
> dig +noall +answer 7-49-0-app.agent.datadoghq.eu
```

レスポンスは次のようになります。
```
7-49-0-app.agent.datadoghq.eu. 300 IN A        10.1.0.4
```


_トレースサブドメインがトレースエンドポイントにルーティングされていることを確認します_
```shell
> dig +noall +answer trace.agent.datadoghq.eu
```
レスポンスは次のようになります。
```
trace.agent.datadoghq.eu. 300 IN  A       10.1.0.9
```

レスポンスの IP アドレスが、PSC ターゲットに関連付けられている IP アドレスと一致していることを確認してください。

## 公開サービス
| Datadog インテークサービス | PSC ターゲット名 | プライベート DNS 名 |
| ---------------------- | --------------- | ---------------- |
| ログ (Agent)           | `projects/datadog-prod/regions/europe-west3/serviceAttachments/nlb-logs-agent-intake-psc` | `agent-http-intake.logs.datadoghq.eu` |
| ログ (ユーザーの HTTP 取り込み) | `projects/datadog-prod/regions/europe-west3/serviceAttachments/nlb-logs-intake-psc` | `http-intake.logs.datadoghq.eu` |
| API | `projects/datadog-prod/regions/europe-west3/serviceAttachments/nlb-api-psc` | `api.datadoghq.eu` |
| メトリクス | `projects/datadog-prod/regions/europe-west3/serviceAttachments/nlb-metrics-agent-psc` | `agent.datadoghq.eu` |
| コンテナ | `projects/datadog-prod/regions/europe-west3/serviceAttachments/nlb-orchestrator-psc` | `orchestrator.datadoghq.eu` |
| プロセス | `projects/datadog-prod/regions/europe-west3/serviceAttachments/nlb-process-psc` | `process.datadoghq.eu` |
| プロファイリング | `projects/datadog-prod/regions/europe-west3/serviceAttachments/nlb-logs-http-profile-psc` | `intake.profile.datadoghq.eu` |
| トレース | `projects/datadog-prod/regions/europe-west3/serviceAttachments/nlb-trace-edge-psc` | `agent.datadoghq.eu` |
| Database Monitoring | `projects/datadog-prod/regions/europe-west3/serviceAttachments/nlb-dbm-metrics-psc` | `dbm-metrics-intake.datadoghq.eu` |
| リモート構成 | `projects/datadog-prod/regions/europe-west3/serviceAttachments/nlb-fleet-psc` | `config.datadoghq.eu` |



[1]: https://cloud.google.com/vpc/docs/private-service-connect
[2]: https://cloud.google.com/vpc/docs/private-service-connect#published-services
[3]: https://cloud.google.com/dns/docs/zones/zones-overview

{{% /site-region %}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}