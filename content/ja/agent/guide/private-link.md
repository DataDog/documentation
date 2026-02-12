---
further_reading:
- link: https://www.datadoghq.com/architecture/using-cross-region-aws-privatelink-to-send-telemetry-to-datadog/
  tag: アーキテクチャセンター
  text: クロスリージョン AWS PrivateLink を使用して Datadog にテレメトリを送信する
- link: /agent/logs
  tag: ドキュメント
  text: Agent によるログ収集を有効にする
- link: /integrations/amazon_web_services/#log-collection
  tag: ドキュメント
  text: AWS サービスからログを収集する
- link: https://www.datadoghq.com/architecture/connect-to-datadog-over-aws-privatelink/
  tag: アーキテクチャセンター
  text: AWS PrivateLink を介して Datadog に接続する
- link: https://www.datadoghq.com/architecture/connect-to-datadog-over-aws-privatelink-using-aws-transit-gateway/
  tag: アーキテクチャセンター
  text: AWS Transit Gateway を使用して AWS PrivateLink 経由で Datadog に接続する
- link: https://www.datadoghq.com/architecture/connect-to-datadog-over-aws-privatelink-using-aws-vpc-peering/
  tag: アーキテクチャセンター
  text: AWS VPC ピアリングを使用して AWS PrivateLink 経由で Datadog に接続する
title: AWS PrivateLink を介して Datadog に接続する
---

{{% site-region region="us3,us5,eu,gov" %}}
<div class="alert alert-danger">選択された Datadog サイトでは Datadog PrivateLink はサポートされていません。</div>
{{% /site-region %}}

{{% site-region region="us,ap1" %}}

## 概要

このガイドでは、[AWS PrivateLink][11] を Datadog で使用するための設定手順について説明します。大まかな流れとしては、VPC 内にローカルの Datadog Agent がデータを送信できる内部エンドポイントを設定し、その VPC エンドポイントを Datadog 側の VPC 内にあるエンドポイントとピアリングすることで構成します。

{{< img src="agent/guide/private_link/vpc_diagram_schema.png" alt="VPC の概要図" >}}

Datadog は **{{< region-param key="aws_region" >}}** に AWS PrivateLink エンドポイントを公開しています。
- 同一リージョン内で Datadog へのトラフィックをルーティングする必要がある場合は、[同一リージョンからの接続](#connect-from-the-same-region)の手順に従ってエンドポイントをセットアップしてください。
- 他のリージョンから {{< region-param key="aws_region" >}} 内の Datadog の PrivateLink を利用するには、Datadog では[クロスリージョン PrivateLink エンドポイント](?tab=crossregionprivatelinkendpoints#connect-from-other-regions)を推奨しています。[Cross-region PrivateLink][11] を使用すると、異なる AWS リージョン間でもプライベート IP アドレスを使って VPC リソース同士を通信させることができます。あるいは、[VPC Peering](?tab=vpcpeering#connect-from-other-regions) を使用することも可能です。

## 同一リージョンからの接続

1. 使用するリージョンに AWS Management Console を接続します。
1. VPC ダッシュボードの **PrivateLink and Lattice** から **Endpoints** を選択します。
1. **Create Endpoint** をクリックします:
   {{< img src="agent/guide/private-link-vpc.png" alt="VPC ダッシュボードの Endpoints ページ" style="width:90%;" >}}
1. **Find service by name** を選択します。
1. AWS PrivateLink を確立したいサービスに応じて、Service Name テキストボックスに以下の値を入力します: 

    {{< img src="agent/guide/private_link/vpc_service_name.png" alt="VPC サービス名" style="width:70%;" >}}

| Datadog | PrivateLink サービス名 | プライベート DNS 名 |
|---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| ログ (Agent HTTP インテーク) | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}} | {{< region-param key="agent_http_endpoint" code="true">}} |
| ログ (ユーザー HTTP インテーク) | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}} | {{< region-param key="http_endpoint" code="true">}} |
| API | {{< region-param key="aws_private_link_api_service_name" code="true" >}} | <code>api.{{< region-param key="dd_site" >}}</code> |
| メトリクス | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}} | <code>metrics.agent.{{< region-param key="dd_site" >}}</code> |
| コンテナ | {{< region-param key="aws_private_link_containers_service_name" code="true" >}} | <code>orchestrator.{{< region-param key="dd_site" >}}</code> |
| プロセス | {{< region-param key="aws_private_link_process_service_name" code="true" >}} | <code>process.{{< region-param key="dd_site" >}}</code> |
| プロファイリング | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}} | <code>intake.profile.{{< region-param key="dd_site" >}}</code> |
| トレース | {{< region-param key="aws_private_link_traces_service_name" code="true" >}} | <code>trace.agent.{{< region-param key="dd_site" >}}</code> |
| Database Monitoring | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}} | <code>dbm-metrics-intake.{{< region-param key="dd_site" >}}</code> |
| Remote Configuration | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}} | <code>config.{{< region-param key="dd_site" >}}</code> |

4. **Verify** をクリックします。Service name found が表示されない場合は、[Datadog サポート][14]にお問い合わせください。
5. Datadog VPC のサービスエンドポイントとピアリングしたい VPC とサブネットを選択します。
6. **Enable DNS name** の項目で、Enable for this endpoint にチェックが入っていることを確認してください: 

   {{< img src="agent/guide/private_link/enabled_dns_private.png" alt="DNS のプライベート有効化" style="width:80%;" >}}

7. 任意のセキュリティグループを選択して、どのトラフィックがこの VPC エンドポイントに送信できるかを制御します。

    **注**: **セキュリティグループでは TCP の `443` 番ポートへのインバウンドトラフィックを許可する必要があります**。

8. 画面下部の **Create endpoint** をクリックします。成功すると次のように表示されます:

   {{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="VPC エンドポイントの作成完了" style="width:60%;" >}}

9. VPC エンドポイント ID をクリックし、そのステータスを確認します。
10. ステータスが Pending から Available に変わるまで待ちます。最大 10 分ほどかかる場合があります。Available と表示されたら、AWS PrivateLink を使用できます。

    {{< img src="agent/guide/private_link/vpc_status.png" alt="VPC ステータス" style="width:60%;" >}}

11. Datadog Agent のバージョンが v6.19 または v7.19 より古い場合、ログデータを収集するには Agent が HTTPS 経由でログを送信するように設定してください。設定ファイル [`datadog.yaml`][15] に以下の内容がない場合は追記します:

    ```yaml
    logs_config:
        force_use_http: true
    ```

    コンテナ Agent を使用している場合は、代わりに次の環境変数を設定します:

    ```
    DD_LOGS_CONFIG_FORCE_USE_HTTP=true
    ```

    これは、AWS PrivateLink と Datadog Agent を使用してログを Datadog に送信する場合に必要な設定であり、Lambda Extension には必要ありません。詳細については、[Agent によるログ収集][16] を参照してください。

12. Lambda Extension が `DD_API_KEY_SECRET_ARN` 環境変数で指定された ARN を使用して AWS Secrets Manager から Datadog API Key を読み込む場合は、[Secrets Manager 用の VPC エンドポイント][17] を作成する必要があります。

13. [Agent を再起動][13] して、AWS PrivateLink 経由で Datadog にデータを送信します。

## 他のリージョンからの接続

{{< tabs >}}
{{% tab "Cross-region PrivateLink endpoints" %}}
1. 使用するリージョンに AWS Management Console を接続します。
1. VPC ダッシュボードの **PrivateLink and Lattice** から Endpoints を選択します。
1. **Create Endpoint** をクリックします:
   {{< img src="agent/guide/private-link-vpc.png" alt="VPC ダッシュボードの Endpoints ページ" style="width:90%;" >}}
1. VPC インターフェイスエンドポイントの設定を行います
   1. 任意で **Name tag** を入力します。
   1. **Type** で **PrivateLink Ready partner services** を選択します。
1. クロスリージョン対応のインターフェイスエンドポイントを検出し、設定します:
   1. **Service name** に以下の[表](#privatelink-service-names)にある有効な PrivateLink サービス名を入力します。
   1. **Service region** で **Enable Cross Region endpoint** にチェックを入れ、**{{< region-param key="aws_private_link_cross_region" >}}** を選択します。
   1. **Verify service** をクリックし、Service name verified の通知が表示されるまで待ちます。
      **注:** 上記の手順を完了してもサービスを検証できない場合は、[Datadog サポート][1]にお問い合わせください。
1. **Network Settings** で、VPC インターフェイスエンドポイントをデプロイする VPC を選択します。
1. **Enable DNS name** が有効になっていることを確認します。
1. **Subnets** で、VPC インターフェイスエンドポイントを配置する 1 つ以上のサブネットを選択します。
1. **Security Groups** で、この VPC エンドポイントにトラフィックを送信できるかどうかを制御するセキュリティグループを選択します。

   **注**: セキュリティグループでは TCP の 443 番ポートへのインバウンドトラフィックを許可する必要があります。
1. 任意で **Name tag** を設定し、**Create endpoint** をクリックします。
1. ステータスが **Pending** から **Available** に変わるまで数分かかる場合があります。最大 10 分ほどかかる場合があります。想定より長引く場合は [Datadog サポート][1]にお問い合わせください。

エンドポイントのステータスが **Available** に更新されたら、クロスリージョンの AWS PrivateLink エンドポイントを使用して Datadog にテレメトリを送信できます。

## PrivateLink サービス名

  | Datadog | PrivateLink サービス名 | プライベート DNS 名 |
  |---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
  | ログ (Agent HTTP インテーク) | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}} | <code>agent-http-intake.logs.{{< region-param key="dd_site" >}}</code> |
  | ログ (ユーザー HTTP インテーク) | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}} | <code>http-intake.logs.{{< region-param key="dd_site" >}}</code> |
  | API | {{< region-param key="aws_private_link_api_service_name" code="true" >}} | <code>api.{{< region-param key="dd_site" >}}</code> |
  | メトリクス | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}} | <code>metrics.agent.{{< region-param key="dd_site" >}}</code> |
  | コンテナ | {{< region-param key="aws_private_link_containers_service_name" code="true" >}} | <code>orchestrator.{{< region-param key="dd_site" >}}</code> |
  | プロセス | {{< region-param key="aws_private_link_process_service_name" code="true" >}} | <code>process.{{< region-param key="dd_site" >}}</code> |
  | プロファイリング | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}} | <code>intake.profile.{{< region-param key="dd_site" >}}</code> |
  | トレース | {{< region-param key="aws_private_link_traces_service_name" code="true" >}} | <code>trace.agent.{{< region-param key="dd_site" >}}</code> |
  | Database Monitoring | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}} | <code>dbm-metrics-intake.{{< region-param key="dd_site" >}}</code> |
  | Remote Configuration | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}} | <code>config.{{< region-param key="dd_site" >}}</code> |

[1]: /ja/help/
{{% /tab %}}

{{% tab "VPC Peering" %}}
1. AWS コンソールを **{{< region-param key="aws_region" >}}** に接続し、VPC エンドポイントを作成します。

{{< img src="agent/guide/private_link/create_vpc_endpoint.png" alt="VPC エンドポイントの作成" style="width:80%;" >}}

2. **Find service by name** を選択します。
3. 接続したいサービスに応じて、Service Name テキストボックスに次の値を入力します:

{{< img src="agent/guide/private_link/vpc_service_name.png" alt="VPC サービス名" style="width:90%;" >}}

| Datadog | PrivateLink サービス名 |
|---------------------------|----------------------------------------------------------------------------------------|
| ログ (Agent HTTP インテーク) | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}} |
| ログ (ユーザー HTTP インテーク) | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}} |
| API | {{< region-param key="aws_private_link_api_service_name" code="true" >}} |
| メトリクス | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}} |
| コンテナ | {{< region-param key="aws_private_link_containers_service_name" code="true" >}} |
| プロセス | {{< region-param key="aws_private_link_process_service_name" code="true" >}} |
| プロファイリング | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}} |
| トレース | {{< region-param key="aws_private_link_traces_service_name" code="true" >}} |
| Database Monitoring | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}} |
| Remote Configuration | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}} |

4. **Verify** をクリックします。Service name found が表示されない場合は、[Datadog サポート][1]にお問い合わせください。

5. 次に、Datadog VPC サービスエンドポイントとピアリングする VPC とサブネットを選択します。VPC Peering では DNS を手動で設定する必要があるため、**Enable DNS name** は選択しないでください。

6. 任意のセキュリティグループを選択して、どのトラフィックがこの VPC エンドポイントに送信されるかを制御します。

    **注**: **セキュリティグループでは TCP の `443` 番ポートへのインバウンドトラフィックを許可する必要があります**。

7. 画面下部の **Create endpoint** をクリックします。成功すると次のように表示されます:

{{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="VPC エンドポイントの作成完了" style="width:80%;" >}}

8. VPC エンドポイント ID をクリックし、そのステータスを確認します。
9. ステータスが Pending から Available に変わるまで待ちます。最大 10 分ほどかかる場合があります。
10. エンドポイントを作成した後は、VPC Peering を使用して別のリージョンでもこの PrivateLink エンドポイントを利用できるようにし、PrivateLink 経由で Datadog にテレメトリを送信します。詳細は AWS ドキュメントの [Work With VPC Peering connections][2] を参照してください。

{{< img src="agent/guide/private_link/vpc_status.png" alt="VPC ステータス" style="width:80%;" >}}

### Amazon Route53

1. 使用するサービスごとに[Route53 プライベートホストゾーン][3]を作成し、プライベートホストゾーンを {{< region-param key="aws_region" code="true" >}} 内の VPC にアタッチします。

{{< img src="agent/guide/private_link/create-a-route53-private-hosted-zone.png" alt="Route53 プライベートホストゾーンの作成" style="width:80%;" >}}

以下の一覧を参考に、サービスと DNS 名をマッピングします:

  | Datadog | PrivateLink サービス名 | プライベート DNS 名 |
  |---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
  | ログ (Agent HTTP インテーク) | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}} | <code>agent-http-intake.logs.{{< region-param key="dd_site" >}}</code> |
  | ログ (ユーザー HTTP インテーク) | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}} | <code>http-intake.logs.{{< region-param key="dd_site" >}}</code> |
  | API | {{< region-param key="aws_private_link_api_service_name" code="true" >}} | <code>api.{{< region-param key="dd_site" >}}</code> |
  | メトリクス | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}} | <code>metrics.agent.{{< region-param key="dd_site" >}}</code> |
  | コンテナ | {{< region-param key="aws_private_link_containers_service_name" code="true" >}} | <code>orchestrator.{{< region-param key="dd_site" >}}</code> |
  | プロセス | {{< region-param key="aws_private_link_process_service_name" code="true" >}} | <code>process.{{< region-param key="dd_site" >}}</code> |
  | プロファイリング | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}} | <code>intake.profile.{{< region-param key="dd_site" >}}</code> |
  | トレース | {{< region-param key="aws_private_link_traces_service_name" code="true" >}} | <code>trace.agent.{{< region-param key="dd_site" >}}</code> |
  | Database Monitoring | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}} | <code>dbm-metrics-intake.{{< region-param key="dd_site" >}}</code> |
  | Remote Configuration | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}} | <code>config.{{< region-param key="dd_site" >}}</code> |

  この情報は AWS API の `DescribeVpcEndpointServices` を呼び出すか、下記のようにコマンドを実行することでも確認可能です:

  ```bash
  aws ec2 describe-vpc-endpoint-services --service-names <service-name>`
  ```

  例として、{{< region-param key="aws_region" code="true" >}} 用の Datadog メトリクスエンドポイントを取得する場合:

<div class="site-region-container">
  <div class="highlight">
    <pre tabindex="0" class="chroma"><code class="language-bash" data-lang="bash"><span class="line">aws ec2 describe-vpc-endpoint-services --service-names {{< region-param key="aws_private_link_metrics_service_name" >}} | jq '.ServiceDetails[0].PrivateDnsName'</span></code></pre>
  </div>
</div>

これは、Agent トラフィックの発信元となる VPC と関連付けるために必要な、プライベートホストゾーン名である <code>metrics.agent.{{< region-param key="dd_site" >}}</code> を返します。このレコードを上書きすると、メトリクスに関連するインテークホスト名がすべて取得されます。

2. それぞれの新しい Route53 プライベートホストゾーン内に、同じ名前で A レコードを作成します。**Alias** オプションをトグルし、**Route traffic to** で、**Alias to VPC endpoint**、**{{< region-param key="aws_region" >}}** を選び、DNS 名と関連付けられた VPC エンドポイントの DNS 名を入力します。

   **注**:
      - DNS 名を取得するには、[エンドポイントサービスのプライベート DNS 名構成ドキュメントを表示する][4]を参照してください。
      - Agent は、バージョン管理されたエンドポイントにテレメトリーを送信します。例えば、<code>[version]-app.agent.{{< region-param key="dd_site" >}}</code> は、CNAME エイリアスを介して <code>metrics.agent.{{< region-param key="dd_site" >}}</code> に解決されます。したがって、必要なのは <code>metrics.agent.{{< region-param key="dd_site" >}}</code> 用のプライベートホストゾーンを設定することだけです。

{{< img src="agent/guide/private_link/create-an-a-record.png" alt="A レコードの作成" style="width:90%;" >}}

3. Datadog PrivateLink のエンドポイントを含む {{< region-param key="aws_region" code="true" >}} の VPC と、Datadog Agent を実行するリージョンの VPC の間で、VPC ピアリングとルーティングを構成します。

4. VPC が異なる AWS アカウントにある場合、続行する前に Datadog Agent を含む VPC が Route53 プライベートホストゾーンとの関連付けを許可されている必要があります。Datadog Agent が実行する VPC のリージョンと VPC ID を使用して、各 Route53 プライベートホストゾーンに対して [VPC 関連付け承認][5]を作成します。このオプションは、AWS Console では利用できません。AWS CLI、SDK、または API を使用して構成する必要があります。

5. Route53 ホストゾーンを編集して、他のリージョンの VPC を追加します。

{{< img src="agent/guide/private_link/edit-route53-hosted-zone.png" alt="Route53 のプライベートホストゾーンを編集する" style="width:80%;" >}}

6. プライベートホストゾーン (PHZ) が接続されている VPC では、特定の設定、特に `enableDnsHostnames` と `enableDnsSupport` をオンにする必要があります。[プライベートホストゾーンを使用する際の注意点][6]を参照してください。

7. [Agent を再起動][7]し、AWS PrivateLink 経由で Datadog にデータを送信します。

#### DNS の解決と接続のトラブルシューティング

DNS 名は、{{< region-param key="aws_region" code="true" >}} の VPC の CIDR ブロックに含まれる IP アドレスに解決され、`port 443` への接続に成功するはずです。

{{< img src="agent/guide/private_link/successful-setup.png" alt="443 番ポートへの接続に成功" style="width:80%;" >}}

DNS がパブリック IP アドレスに解決している場合、Route53 ゾーンが代替地域の VPC に関連付けされて**いない**か、A レコードが存在しないことが原因です。

DNS は正しく解決しているのに、`port 443` への接続に失敗する場合、VPC のピアリングまたはルーティングが誤って構成されているか、ポート 443 が {{< region-param key="aws_region" code="true" >}} の VPC の CIDR ブロックへのアウトバウンドを許可されていない可能性があります。

プライベートホストゾーン (PHZ) が接続されている VPC は、いくつかの設定をオンにする必要があります。具体的には、PHZ が関連付けられている VPC で、`enableDnsHostnames` と `enableDnsSupport` がオンになっている必要があります。[Amazon VPC 設定][6]を参照してください。

### Datadog Agent

1. ログデータを収集する場合は、Agent が HTTPS 経由でログを送信するように構成されていることを確認してください。データがまだない場合は、[Agent `datadog.yaml` コンフィギュレーションファイル][8]に以下を追加します。

    ```yaml
    logs_config:
        force_use_http: true
    ```

   コンテナ Agent をお使いの場合は、代わりに環境変数を設定してください。

    ```
    DD_LOGS_CONFIG_FORCE_USE_HTTP=true
    ```

   この構成は、AWS PrivateLink と Datadog Agent で Datadog にログを送信する際に必要で、Lambda Extension では必要ありません。詳しくは、[Agent のログ収集][9]をご参照ください。

2. Lambda 拡張機能で、環境変数 `DD_API_KEY_SECRET_ARN` で指定した ARN を使って AWS Secrets Manager から Datadog API キーを読み込む場合、[Secrets Manager 用の VPC エンドポイントを作成][10]する必要があります。

3. [Agent を再起動します][7]。


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

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}