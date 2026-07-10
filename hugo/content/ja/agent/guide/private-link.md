---
description: AWS PrivateLink エンドポイントを構成し、クロスリージョン設定を含む内部 VPC 接続を介して Datadog にテレメトリデータを安全に送信します。
further_reading:
- link: https://www.datadoghq.com/architecture/using-cross-region-aws-privatelink-to-send-telemetry-to-datadog/
  tag: Architecture Center
  text: クロスリージョン AWS PrivateLink を使用して Datadog にテレメトリを送信する
- link: /agent/logs
  tag: ドキュメント
  text: Agent によるログ収集を有効にする
- link: /integrations/amazon_web_services/#log-collection
  tag: ドキュメント
  text: AWS サービスからログを収集する
- link: https://www.datadoghq.com/architecture/connect-to-datadog-over-aws-privatelink/
  tag: Architecture Center
  text: AWS PrivateLink を介して Datadog に接続する
- link: https://www.datadoghq.com/architecture/connect-to-datadog-over-aws-privatelink-using-aws-transit-gateway/
  tag: Architecture Center
  text: AWS Transit Gateway を使用して AWS PrivateLink 経由で Datadog に接続する
- link: https://www.datadoghq.com/architecture/connect-to-datadog-over-aws-privatelink-using-aws-vpc-peering/
  tag: Architecture Center
  text: AWS VPC ピアリングを使用して AWS PrivateLink 経由で Datadog に接続する
- link: https://www.datadoghq.com/blog/datadog-aws-cross-region-privatelink/
  tag: ブログ
  text: AWS PrivateLink を使用したクロスリージョンの Datadog 接続でコストを削減してセキュリティを強化します。
title: AWS PrivateLink を介して Datadog に接続する
---
{{% site-region region="us3,us5,eu,gov,gov2" %}}
<div class="alert alert-danger">Datadog PrivateLink は、選択された Datadog サイトをサポートしていません。</div>
{{% /site-region %}}

{{% site-region region="us,ap1,ap2" %}}

## 概要 {#overview}

このガイドでは Datadog で使用するために [AWS PrivateLink][1] の構成方法についてご説明します。まずはローカルの Datadog Agent がデータを送信可能な VPC の内部エンドポイントを構成します。その後、VPC エンドポイントを Datadog の VPC 内にあるエンドポイントと紐付けます。

{{< img src="agent/guide/private_link/vpc_diagram_schema.png" alt="VPC ダイアグラムスキーマ" >}}

Datadog は、**{{< region-param key="aws_region" >}}** で AWS PrivateLink のエンドポイントを公開します。
- 同じリージョンで Datadog トラフィックをルーティングする必要がある場合は、[同じリージョンから接続する](#connect-from-the-same-region)の手順に従ってエンドポイントを設定します。
- 他のリージョンから {{< region-param key="aws_region" >}} にある Datadog の PrivateLink サービスにトラフィックをルーティングするには、Datadog は[クロスリージョン PrivateLink エンドポイント](?tab=crossregionprivatelinkendpoints#connect-from-other-regions)を推奨します。[クロスリージョン PrivateLink][11] は、異なる AWS リージョンにまたがる VPC 間の接続を確立することができます。これにより、異なるリージョンの VPC リソース同士がプライベート IP アドレスで通信できるようになります。または、[VPC ピアリング](?tab=vpcpeering#connect-from-other-regions)を使用します。

## 同じリージョンから接続する {#connect-from-the-same-region}

1. AWS マネジメントコンソールを任意のリージョンに接続します。
1. VPC ダッシュボードの {{< ui >}}PrivateLink and Lattice{{< /ui >}} で {{< ui >}}Endpoints{{< /ui >}} を選択します。
1.  {{< ui >}}Create Endpoint{{< /ui >}} をクリックします。
   {{< img src="agent/guide/private-link-vpc.png" alt="VPC ダッシュボードのエンドポイントページ" style="width:90%;" >}}
1. {{< ui >}}Find service by name{{< /ui >}} を選択します。
1. _Service Name_ テキストボックスに、AWS PrivateLink を構築したいサービスの名前を入力します。

    {{< img src="agent/guide/private_link/vpc_service_name.png" alt="VPC サービス名" style="width:70%;" >}}

| Datadog                   | PrivateLink サービス名                                                               | プライベート DNS 名                                                       |
|---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| ログ (Agent の HTTP 取り込み) | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | {{< region-param key="agent_http_endpoint_private_link" code="true" >}} |
| ログ (ユーザーの HTTP 取り込み)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | {{< region-param key="http_endpoint_private_link" code="true" >}}       |
| API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | {{< region-param key="api_endpoint_private_link" code="true" >}}        |
| Metrics                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | {{< region-param key="metrics_endpoint_private_link" code="true" >}}    |
| Containers                | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | {{< region-param key="containers_endpoint_private_link" code="true" >}} |
| Process                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | {{< region-param key="process_endpoint_private_link" code="true" >}}    |
| Profiling                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | {{< region-param key="profiling_endpoint_private_link" code="true" >}}  |
| Traces                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | {{< region-param key="traces_endpoint_private_link" code="true" >}}     |
| Database Monitoring       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | {{< region-param key="dbm_endpoint_private_link" code="true" >}}        |
| Remote Configuration      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | {{< region-param key="remote_config_endpoint_private_link" code="true" >}}     |

4. {{< ui >}}Verify{{< /ui >}} をクリックします。_Service name found_ と表示されない場合は、[Datadog サポート][14]にお問い合わせください。
5. Datadog の VPC サービスエンドポイントと紐付ける VPC およびサブネットを選択します。
6. {{< ui >}}Enable DNS name{{< /ui >}} に、_Enable for this endpoint_ がチェックされていることを確認します。

   {{< img src="agent/guide/private_link/enabled_dns_private.png" alt="DNS プライベートを有効にする" style="width:80%;" >}}

7. 任意のセキュリティグループを選択し、この VPC エンドポイントにトラフィックを送信できる送信元の範囲を指定します。

    **注**: **セキュリティグループは、TCP ポート `443`** のインバウンドトラフィックを許可する必要があります。

8. 画面下部の {{< ui >}}Create endpoint{{< /ui >}} をクリックします。作成が完了すると以下が表示されます。

   {{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="VPC エンドポイントが作成されました" style="width:60%;" >}}

9. VPC エンドポイントの ID をクリックして、ステータスを確認します。
10. ステータスが _Pending_ から _Available_ に変わるまでお待ちください。これには約 10 分要する場合があります。_Available_ と表示されれば、AWS PrivateLink を利用することができます。

    {{< img src="agent/guide/private_link/vpc_status.png" alt="VPC ステータス" style="width:60%;" >}}

11. バージョン v6.19 または v7.19 以前の Datadog Agent を使用している場合、ログデータを収集するため、Agent が HTTPS 経由でログを送信するように構成されていることを確認してください。データがまだない場合は、[Agent `datadog.yaml` コンフィギュレーションファイル][15]に以下を追加します。

    ```yaml
    logs_config:
        force_use_http: true
    ```

    If you are using the container Agent, set the following environment variable instead:

    ```
    DD_LOGS_CONFIG_FORCE_USE_HTTP=true
    ```

    This configuration is required when sending logs to Datadog with AWS PrivateLink and the Datadog Agent, and is not required for the Lambda Extension. For more details, see [Agent log collection][16].

12. Lambda Extension で、環境変数 `DD_API_KEY_SECRET_ARN` で指定した ARN を使って AWS Secrets Manager から Datadog API キーを読み込む場合、[Secrets Manager 用の VPC エンドポイントを作成][17]する必要があります。

13. [Agent を再起動][13]し、AWS PrivateLink 経由で Datadog にデータを送信します。

## 他のリージョンから接続する {#connect-from-other-regions}

{{< tabs >}}
{{% tab "クロスリージョン PrivateLink エンドポイント" %}}
1. AWS マネジメントコンソールを任意のリージョンに接続します。
1. VPC ダッシュボードの {{< ui >}}PrivateLink and Lattice{{< /ui >}} で {{< ui >}}Endpoints{{< /ui >}} を選択します。
1.  {{< ui >}}Create Endpoint{{< /ui >}} をクリックします。
   {{< img src="agent/guide/private-link-vpc.png" alt="VPC ダッシュボードのエンドポイントページ" style="width:90%;" >}}
1. VPC インターフェイスエンドポイントの設定を構成する
   1. オプションで、{{< ui >}}Name tag{{< /ui >}} を入力します。
   1. {{< ui >}}Type{{< /ui >}} で、{{< ui >}}PrivateLink Ready partner services{{< /ui >}} を選択します。
1. クロスリージョンサポート付きのインターフェイスエンドポイントを検出し、構成します。
   1. {{< ui >}}Service name{{< /ui >}} で、以下の[テーブル](#privatelink-service-names)から有効な PrivateLink サービス名をサービス名欄に入力します。
   1. {{< ui >}}Service region{{< /ui >}} で、{{< ui >}}Enable Cross Region endpoint{{< /ui >}} をクリックし、**{{< region-param key="aws_private_link_cross_region" >}}**を選択します。
   1. {{< ui >}}Verify service{{< /ui >}} をクリックし、_サービス名が確認されました_という通知が表示されるまで待ちます。
      **注**: 上記の手順を完了した後もサービスの確認ができない場合は、[Datadog サポート][1]にお問い合わせください。
1. {{< ui >}}Network Settings{{< /ui >}}で、VPC インターフェイスエンドポイントをデプロイするための VPC を選択します。
1. {{< ui >}}Enable DNS name{{< /ui >}} のオプションがチェックされていることを確認します。
1. {{< ui >}}Subnets{{< /ui >}} で、インターフェイスエンドポイント用 VPC の 1 つ以上のサブネットを選択します。
1. {{< ui >}}Security Groups{{< /ui >}}で、VPC エンドポイントにトラフィックを送信できるセキュリティグループを選択します。

   **注**: セキュリティグループは、TCP ポート 443 のインバウンドトラフィックを許可する必要があります。
1. オプションで、{{< ui >}}Name tag{{< /ui >}} を提供し、{{< ui >}}Create endpoint{{< /ui >}} をクリックします。
1. エンドポイントステータスが {{< ui >}}Pending{{< /ui >}} から {{< ui >}}Available{{< /ui >}} に更新されるまで数分待ちます。これには約 10 分要する場合があります。予想以上に時間がかかる場合は、[Datadog サポート][1]にお問い合わせください。

エンドポイントステータスが {{< ui >}}Available{{< /ui >}} に更新された後、このエンドポイントを利用し、クロスリージョン AWS PrivateLink エンドポイントを使用して Datadog にテレメトリを送信できます。

## PrivateLink サービス名 {#privatelink-service-names}

| Datadog                   | PrivateLink サービス名                                                               | プライベート DNS 名                                                       |
|---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| ログ (Agent の HTTP 取り込み) | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | {{< region-param key="agent_http_endpoint_private_link" code="true" >}} |
| ログ (ユーザーの HTTP 取り込み)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | {{< region-param key="http_endpoint_private_link" code="true" >}}       |
| API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | {{< region-param key="api_endpoint_private_link" code="true" >}}        |
| Metrics                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | {{< region-param key="metrics_endpoint_private_link" code="true" >}}    |
| Containers                | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | {{< region-param key="containers_endpoint_private_link" code="true" >}} |
| Process                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | {{< region-param key="process_endpoint_private_link" code="true" >}}    |
| Profiling                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | {{< region-param key="profiling_endpoint_private_link" code="true" >}}  |
| Traces                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | {{< region-param key="traces_endpoint_private_link" code="true" >}}     |
| Database Monitoring       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | {{< region-param key="dbm_endpoint_private_link" code="true" >}}        |
| Remote Configuration      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | {{< region-param key="remote_config_endpoint_private_link" code="true" >}}     |

**注**: クロスリージョン PrivateLink は CloudWatch メトリクスを送信しません。詳細については、[AWS PrivateLink の CloudWatch メトリクス][2]を参照してください。

[1]: /ja/help/
[2]: https://docs.aws.amazon.com/vpc/latest/privatelink/privatelink-cloudwatch-metrics.html
{{% /tab %}}

{{% tab "VPC ピアリング" %}}
1. AWS Console をリージョン **{{< region-param key="aws_region" >}}** に接続し、VPC エンドポイントを作成します。

{{< img src="agent/guide/private_link/create_vpc_endpoint.png" alt="VPC エンドポイントを作成する" style="width:80%;" >}}

2. {{< ui >}}Find service by name{{< /ui >}} を選択します。
3. _Service Name_ テキストボックスに、AWS PrivateLink を構築したいサービスの名前を入力します。

{{< img src="agent/guide/private_link/vpc_service_name.png" alt="VPC サービス名" style="width:90%;" >}}

| Datadog                   | PrivateLink サービス名                                                               |
|---------------------------|----------------------------------------------------------------------------------------|
| ログ (Agent の HTTP 取り込み) | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        |
| ログ (ユーザーの HTTP 取り込み)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         |
| API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               |
| Metrics                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           |
| Containers                | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        |
| Process                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           |
| Profiling                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         |
| Traces                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            |
| Database Monitoring       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               |
| Remote Configuration      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     |

4. {{< ui >}}Verify{{< /ui >}} をクリックします。_Service name found_ と表示されない場合は、[Datadog サポート][14]にお問い合わせください。

5. 次に、Datadog の VPC サービスエンドポイントと紐付ける VPC およびサブネットを選択します。VPC ピアリングでは DNS を手動で構成する必要があるため、{{< ui >}}Enable DNS name{{< /ui >}} は選択しないでください。

6. 任意のセキュリティグループを選択し、この VPC エンドポイントにトラフィックを送信できる送信元の範囲を指定します。

    **注**: **セキュリティグループは、TCP ポート `443`** のインバウンドトラフィックを許可する必要があります。

7. 画面下部の {{< ui >}}Create endpoint{{< /ui >}} をクリックします。作成が完了すると以下が表示されます。

{{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="VPC エンドポイントが作成されました" style="width:80%;" >}}

8. VPC エンドポイントの ID をクリックして、ステータスを確認します。
9. ステータスが _Pending_ から _Available_ に変わるまでお待ちください。これには約 10 分要する場合があります。
10. エンドポイントが作成されたら、VPC ピアリングを使って、別のリージョンでも PrivateLink エンドポイントを利用して PrivateLink 経由で Datadog にテレメトリを送信できるようにします。詳しくは、AWS の [VPC ピアリング接続での作業][2]ページをご覧ください。

{{< img src="agent/guide/private_link/vpc_status.png" alt="VPC ステータス" style="width:80%;" >}}

### Amazon Route53 {#amazon-route53}

1. AWS PrivateLink のエンドポイントを作成した各サービスに対して、[Route53 プライベートホストゾーン][3]を作成します。プライベートホストゾーンを {{< region-param key="aws_region" code="true" >}}の VPC にアタッチします。

{{< img src="agent/guide/private_link/create-a-route53-private-hosted-zone.png" alt="Route53 プライベートホストゾーンを作成する" style="width:80%;" >}}

以下のリストを使用して、サービスおよび DNS 名を Datadog の各部にマッピングします。

  | Datadog                   | PrivateLink サービス名                                                               | プライベート DNS 名                                                       |
  |---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
  | ログ (Agent の HTTP 取り込み) | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}}        | {{< region-param key="agent_http_endpoint_private_link" code="true" >}} |
  | ログ (ユーザーの HTTP 取り込み)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}}         | {{< region-param key="http_endpoint_private_link" code="true" >}}       |
  | API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}}               | {{< region-param key="api_endpoint_private_link" code="true" >}}        |
  | Metrics                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}}           | {{< region-param key="metrics_endpoint_private_link" code="true" >}}    |
  | Containers                | {{< region-param key="aws_private_link_containers_service_name" code="true" >}}        | {{< region-param key="containers_endpoint_private_link" code="true" >}} |
  | Process                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}}           | {{< region-param key="process_endpoint_private_link" code="true" >}}    |
  | Profiling                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}}         | {{< region-param key="profiling_endpoint_private_link" code="true" >}}  |
  | Traces                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}}            | {{< region-param key="traces_endpoint_private_link" code="true" >}}     |
  | Database Monitoring       | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}}               | {{< region-param key="dbm_endpoint_private_link" code="true" >}}        |
  | Remote Configuration      | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}}     | {{< region-param key="remote_config_endpoint_private_link" code="true" >}}     |

  また、AWS API の `DescribeVpcEndpointServices` を問い合わせるか、次の CLI コマンドを使用してもこの情報を見つけることができます。

  ```bash
  aws ec2 describe-vpc-endpoint-services --service-names <service-name>`
  ```

  例えば、 {{< region-param key="aws_region" code="true" >}}の Datadog メトリクスエンドポイントの場合:

<div class="site-region-container">
  <div class="highlight">
    <pre tabindex="0" class="chroma"><code class="language-bash" data-lang="bash"><span class="line">aws ec2 describe-vpc-endpoint-services --service-names {{< region-param key="aws_private_link_metrics_service_name" >}} | jq '.ServiceDetails[0].PrivateDnsName'</span></code></pre>
  </div>
</div>

これは、Agent トラフィックの発信元となる VPC と関連付けるために必要な、プライベートホストゾーン名である <code>metrics.agent.{{< region-param key="dd_site" >}}</code>を返します。このレコードを上書きすると、メトリクスに関連するインテークホスト名がすべて取得されます。

2. それぞれの新しい Route53 プライベートホストゾーン内に、同じ名前で A レコードを作成します。{{< ui >}}Alias{{< /ui >}} オプションをトグルし、{{< ui >}}Route traffic to{{< /ui >}} で、{{< ui >}}Alias to VPC endpoint{{< /ui >}}、**{{< region-param key="aws_region" >}}**を選び、DNS 名と関連付けられた VPC エンドポイントの DNS 名を入力します。**注**:
      - DNS 名を取得するには、[エンドポイントサービスのプライベート DNS 名構成ドキュメントを表示する][4]を参照してください。
      Agent はバージョン付きのエンドポイント (例:<code>[version]-app.agent.{{< region-param key="dd_site" >}}</code> ) にテレメトリを送信します。エンドポイントでは CNAME エイリアスを通じた名前解決が行われ、 <code>metrics.agent.{{< region-param key="dd_site" >}}</code> にルーティングされます。したがって、 <code>metrics.agent.{{< region-param key="dd_site" >}}</code>のプライベートホストゾーンのセットアップのみが必要となります。

{{< img src="agent/guide/private_link/create-an-a-record.png" alt="A レコードを作成する" style="width:90%;" >}}

3. Datadog PrivateLink のエンドポイントを含む {{< region-param key="aws_region" code="true" >}} の VPC と、Datadog Agent を実行する地域の VPC の間で、VPC ピアリングとルーティングを構成します。

4. VPC が異なる AWS アカウントにある場合、続行する前に Datadog Agent を含む VPC が Route53 プライベートホストゾーンとの関連付けを許可されている必要があります。Datadog Agent が実行する VPC のリージョンと VPC ID を使用して、各 Route53 プライベートホストゾーンに対して [VPC 関連付け承認][5]を作成します。このオプションは、AWS Console では利用できません。AWS CLI、SDK、または API を使用して構成する必要があります。

5. Route53 ホストゾーンを編集して、他のリージョンの VPC を追加します。

{{< img src="agent/guide/private_link/edit-route53-hosted-zone.png" alt="Route53 プライベートホストゾーンを編集する" style="width:80%;" >}}

6. プライベートホストゾーン (PHZ) が接続されている VPC では、特定の設定、特に `enableDnsHostnames` と `enableDnsSupport` をオンにする必要があります。[プライベートホストゾーンを使用する際の注意点][6]を参照してください。

7. [Agent を再起動][7]し、AWS PrivateLink 経由で Datadog にデータを送信します。

#### DNS の解決と接続のトラブルシューティング{#troubleshooting-dns-resolution-and-connectivity}

DNS 名は、 {{< region-param key="aws_region" code="true" >}}の VPC の CIDR ブロックに含まれる IP アドレスに解決し、`port 443` への接続に成功するはずです。

{{< img src="agent/guide/private_link/successful-setup.png" alt="443 番ポートへの接続に成功" style="width:80%;" >}}

DNS がパブリック IP アドレスに解決している場合、Route53 ゾーンが代替地域の VPC に関連付けされて**いない**か、A レコードが存在しないことが原因です。

DNS は正しく解決しているのに、`port 443` への接続に失敗する場合、VPC のピアリングまたはルーティングが誤って構成されているか、ポート 443 が {{< region-param key="aws_region" code="true" >}}の VPC の CIDR ブロックへのアウトバウンドを許可されていない可能性があります。

プライベートホストゾーン (PHZ) が接続されている VPC は、いくつかの設定をオンにする必要があります。具体的には、PHZ が関連付けられている VPC で、`enableDnsHostnames` と `enableDnsSupport` がオンになっている必要があります。[Amazon VPC 設定][6]を参照してください。

### Datadog Agent {#datadog-agent}

1. ログデータを収集する場合は、Agent が HTTPS 経由でログを送信するように構成されていることを確認してください。データがまだない場合は、[Agent `datadog.yaml` コンフィギュレーションファイル][8]に以下を追加します。

    ```yaml
    logs_config:
        force_use_http: true
    ```

    If you are using the container Agent, set the following environment variable instead:

    ```
    DD_LOGS_CONFIG_FORCE_USE_HTTP=true
    ```

    This configuration is required when sending logs to Datadog with AWS PrivateLink and the Datadog Agent, and is not required for the Lambda Extension. For more details, see [Agent log collection][9].

2. Lambda Extension で、環境変数 `DD_API_KEY_SECRET_ARN` で指定した ARN を使って AWS Secrets Manager から Datadog API キーを読み込む場合、[Secrets Manager 用の VPC エンドポイントを作成][10]する必要があります。

3. [Agent を再起動][7]します。

[1]: /ja/help/
[2]: https://docs.aws.amazon.com/vpc/latest/peering/working-with-vpc-peering.html
[3]: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-private.html
[4]: https://docs.aws.amazon.com/vpc/latest/privatelink/view-vpc-endpoint-service-dns-name.html
[5]: https://docs.amazonaws.cn/en_us/Route53/latest/DeveloperGuide/hosted-zone-private-associate-vpcs-different-accounts.html
[6]: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zone-private-considerations.html#hosted-zone-private-considerations-vpc-settings
[7]: /ja/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[8]: /ja/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[9]: /ja/agent/logs/?tab=tailexistingfiles#send-logs-over-https
[10]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/vpc-endpoint-overview.html
{{% /tab %}}
{{< /tabs >}}

[11]: https://aws.amazon.com/privatelink/
[12]: https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html
[13]: /ja/agent/configuration/agent-commands/#restart-the-agent
[14]: /ja/help/
[15]: /ja/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[16]: /ja/agent/logs/?tab=tailexistingfiles#send-logs-over-https
[17]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/vpc-endpoint-overview.html

{{% /site-region %}}

## データが PrivateLink {#verify-that-data-is-being-sent-using-privatelink}を使用して送信されていることを確認する

PrivateLink を設定した後、PrivateLink を使用してデータが送信されていることを確認するため、その VPC 上のマシンで`dig` コマンドを実行します。例えば、エンドポイント `http-intake.logs.datadoghq.com` に PrivateLink を設定した場合は、このコマンドを実行します。

```
dig http-intake.logs.datadoghq.com
```

ログが PrivateLink 経由で送信されている場合、出力の `ANSWER Section` セクションには以下の例のように `http-intake.logs.datadoghq.com` が表示されます。**注**: 返される IP アドレスは[プライベート IP 空間][1]内である必要があります。

```
;; ANSWER SECTION:
http-intake.logs.datadoghq.com.	60 IN	A	172.31.57.3
http-intake.logs.datadoghq.com.	60 IN	A	172.31.3.10
http-intake.logs.datadoghq.com.	60 IN	A	172.31.20.174
http-intake.logs.datadoghq.com.	60 IN	A	172.31.34.135
```

ログが PrivateLink 経由で送信されていない場合、出力の `ANSWER SECTION` にはログが送信されているロードバランサー (`4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com`) が表示されます。

```
;; ANSWER SECTION:
http-intake.logs.datadoghq.com.	177 IN	CNAME	http-intake-l4.logs.datadoghq.com.
http-intake-l4.logs.datadoghq.com. 173 IN CNAME	l4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com.
l4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com. 42 IN A 3.233.158.48
l4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com. 42 IN A 3.233.158.49
l4-logs-http-s1-e721f9c2a0e65948.elb.us-east-1.amazonaws.com. 42 IN A 3.233.158.50
```

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://en.wikipedia.org/wiki/Private_network#Private_IPv4_addresses