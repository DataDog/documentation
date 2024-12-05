---
further_reading:
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
<div class="alert alert-warning">Datadog PrivateLink は選択された Datadog サイトをサポートしていません。</div>
{{% /site-region %}}

{{% site-region region="us,ap1" %}}

このガイドでは、Datadog で [AWS PrivateLink][1] を使用するための構成方法について説明します。

## 概要

全体のプロセスは、ローカルの Datadog Agent がデータを送信できるように、VPC 内に内部エンドポイントを構成することから成ります。その後、あなたの VPC エンドポイントは Datadog の VPC 内のエンドポイントとピアリングされます。

{{< img src="agent/guide/private_link/vpc_diagram_schema.png" alt="VPC ダイアグラムのスキーマ" >}}

## セットアップ

Datadog は **{{< region-param key="aws_region" >}}** に AWS PrivateLink エンドポイントを公開しています。

しかし、他のリージョンから {{< region-param key="aws_region" code="true" >}} の Datadog の PrivateLink サービスにトラフィックをルーティングするには、リージョン間の [Amazon VPC ピアリング][2]を使用します。リージョン間 VPC ピアリングを使用すると、異なる AWS リージョン間で VPC の接続を確立できます。これにより、異なるリージョンの VPC リソースがプライベート IP アドレスを使用して相互に通信できます。詳細については、[Amazon VPC ピアリング][2]を参照してください。

{{< tabs >}}
{{% tab "同じリージョンから接続" %}}

1. AWS コンソールをリージョン **{{< region-param key="aws_region" >}}** に接続し、VPC エンドポイントを作成します。

{{< img src="agent/guide/private_link/create_vpc_endpoint.png" alt="VPC エンドポイントの作成" style="width:60%;" >}}

2. **Find service by name** を選択します。
3. AWS PrivateLink を確立したいサービスに応じて、_Service Name_ テキストボックスに入力します。

{{< img src="agent/guide/private_link/vpc_service_name.png" alt="VPC サービス名" style="width:70%;" >}}

| Datadog | PrivateLink サービス名 | プライベート DNS 名 |
|---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| ログ (Agent HTTP インテーク) | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}} | {{< region-param key="agent_http_endpoint" code="true">}} |
| ログ (User HTTP インテーク) | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}} | {{< region-param key="http_endpoint" code="true">}} |
| API | {{< region-param key="aws_private_link_api_service_name" code="true" >}} | <code>api.{{< region-param key="dd_site" >}}</code> |
| メトリクス | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}} | <code>metrics.agent.{{< region-param key="dd_site" >}}</code> |
| コンテナ | {{< region-param key="aws_private_link_containers_service_name" code="true" >}} | <code>orchestrator.{{< region-param key="dd_site" >}}</code> |
| プロセス | {{< region-param key="aws_private_link_process_service_name" code="true" >}} | <code>process.{{< region-param key="dd_site" >}}</code> |
| プロファイリング | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}} | <code>intake.profile.{{< region-param key="dd_site" >}}</code> |
| トレース | {{< region-param key="aws_private_link_traces_service_name" code="true" >}} | <code>trace.agent.{{< region-param key="dd_site" >}}</code> |
| Database Monitoring | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}} | <code>dbm-metrics-intake.{{< region-param key="dd_site" >}}</code> |
| Remote Configuration | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}} | <code>config.{{< region-param key="dd_site" >}}</code> |

4. **Verify** をクリックします。これで _Service name found_ が表示されない場合は、[Datadog サポート][1]に連絡してください。
5. Datadog VPC サービスエンドポイントとピアリングする VPC とサブネットを選択します。
6. **Enable DNS name** の項目で、_Enable for this endpoint_ がチェックされていることを確認します。

{{< img src="agent/guide/private_link/enabled_dns_private.png" alt="DNS プライベートの有効化" style="width:80%;" >}}

7. お好みのセキュリティグループを選択して、この VPC エンドポイントにトラフィックを送信できるものを制御します。

**注**: **セキュリティグループは TCP ポート `443` のインバウンドトラフィックを許可する必要があります。**

8. 画面の下部にある **Create endpoint** をクリックします。成功すると、以下が表示されます。

{{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="VPC エンドポイントが作成されました" style="width:60%;" >}}

9. VPC エンドポイント ID をクリックして、そのステータスを確認します。
10. ステータスが _Pending_ から _Available_ に変わるのを待ちます。これには最大 10 分かかることがあります。_Available_ と表示されたら、AWS PrivateLink を使用できます。

{{< img src="agent/guide/private_link/vpc_status.png" alt="VPC ステータス" style="width:60%;" >}}

11. v6.19 または v7.19 より古いバージョンの Datadog Agent を実行している場合、ログデータを収集するために、Agent が HTTPS 経由でログを送信するように構成されていることを確認してください。データがまだない場合は、[Agent の `datadog.yaml` コンフィギュレーションファイル][2]に以下を追加します。

```yaml
logs_config:
force_use_http: true
```

コンテナ Agent を使用している場合は、代わりに以下の環境変数を設定します。

```
DD_LOGS_CONFIG_FORCE_USE_HTTP=true
```

この構成は、AWS PrivateLink と Datadog Agent を使用してログを Datadog に送信する場合に必要であり、Lambda Extension には必要ありません。詳細については、[Agent のログ収集][3]を参照してください。

12. Lambda Extension が環境変数 `DD_API_KEY_SECRET_ARN` で指定された ARN を使用して AWS Secrets Manager から Datadog API キーをロードする場合、[Secrets Manager の VPC エンドポイントを作成][4]する必要があります。

13. [Agent を再起動][5]して、AWS PrivateLink 経由で Datadog にデータを送信します。



[1]: /ja/help/
[2]: /ja/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[3]: /ja/agent/logs/?tab=tailexistingfiles#send-logs-over-https
[4]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/vpc-endpoint-overview.html
[5]: /ja/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}

{{% tab "Connect from another region using VPC Peering" %}}

### Amazon VPC ピアリング

1. AWS コンソールをリージョン **{{< region-param key="aws_region" >}}** に接続し、VPC エンドポイントを作成します。

{{< img src="agent/guide/private_link/create_vpc_endpoint.png" alt="VPC エンドポイントの作成" style="width:80%;" >}}

2. **Find service by name** を選択します。
3. AWS PrivateLink を確立したいサービスに応じて、_Service Name_ テキストボックスに入力します。

{{< img src="agent/guide/private_link/vpc_service_name.png" alt="VPC サービス名" style="width:90%;" >}}

| Datadog | PrivateLink サービス名

|
|---------------------------|----------------------------------------------------------------------------------------|
| ログ (Agent HTTP インテーク) | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}} |
| ログ (User HTTP インテーク) | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}} |
| API | {{< region-param key="aws_private_link_api_service_name" code="true" >}} |
| メトリクス | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}} |
| コンテナ | {{< region-param key="aws_private_link_containers_service_name" code="true" >}} |
| プロセス | {{< region-param key="aws_private_link_process_service_name" code="true" >}} |
| プロファイリング | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}} |
| トレース | {{< region-param key="aws_private_link_traces_service_name" code="true" >}} |
| Database Monitoring | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}} |
| Remote Configuration | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}} |

4. **Verify** をクリックします。これで _Service name found_ が表示されない場合は、[Datadog サポート][1]に連絡してください。

5. 次に、Datadog VPC サービスエンドポイントとピアリングする VPC とサブネットを選択します。**Enable DNS name** は選択しないでください。VPC ピアリングでは DNS を手動で構成する必要があります。

6. お好みのセキュリティグループを選択して、この VPC エンドポイントにトラフィックを送信できるものを制御します。

**注**: **セキュリティグループは TCP ポート `443` のインバウンドトラフィックを許可する必要があります。**

7. 画面の下部にある **Create endpoint** をクリックします。成功すると、以下が表示されます。

{{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="VPC エンドポイントが作成されました" style="width:80%;" >}}

8. VPC エンドポイント ID をクリックして、そのステータスを確認します。
9. ステータスが _Pending_ から _Available_ に変わるのを待ちます。これには最大 10 分かかることがあります。
10. エンドポイントを作成した後、VPC ピアリングを使用して、PrivateLink エンドポイントを別のリージョンで利用できるようにし、PrivateLink 経由で Datadog にテレメトリーを送信します。詳細は、AWS の [VPC ピアリング接続の操作][2]ページを参照してください。

{{< img src="agent/guide/private_link/vpc_status.png" alt="VPC ステータス" style="width:80%;" >}}

### Amazon Route53

1. AWS PrivateLink エンドポイントを作成した各サービスに対して、[Route53 プライベートホストゾーン][3]を作成します。プライベートホストゾーンを {{< region-param key="aws_region" code="true" >}} の VPC に適用します。

{{< img src="agent/guide/private_link/create-a-route53-private-hosted-zone.png" alt="Route53 プライベートホストゾーンの作成" style="width:80%;" >}}

以下のリストを使用して、Datadog の異なる部分にサービスと DNS 名をマッピングします。

| Datadog | PrivateLink サービス名 | プライベート DNS 名 |
|---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| ログ (Agent HTTP インテーク) | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}} | <code>agent-http-intake.logs.{{< region-param key="dd_site" >}}</code> |
| ログ (User HTTP インテーク) | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}} | <code>http-intake.logs.{{< region-param key="dd_site" >}}</code> |
| API | {{< region-param key="aws_private_link_api_service_name" code="true" >}} | <code>api.{{< region-param key="dd_site" >}}</code> |
| メトリクス | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}} | <code>metrics.agent.{{< region-param key="dd_site" >}}</code> |
| コンテナ | {{< region-param key="aws_private_link_containers_service_name" code="true" >}} | <code>orchestrator.{{< region-param key="dd_site" >}}</code> |
| プロセス | {{< region-param key="aws_private_link_process_service_name" code="true" >}} | <code>process.{{< region-param key="dd_site" >}}</code> |
| プロファイリング | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}} | <code>intake.profile.{{< region-param key="dd_site" >}}</code> |
| トレース | {{< region-param key="aws_private_link_traces_service_name" code="true" >}} | <code>trace.agent.{{< region-param key="dd_site" >}}</code> |
| Database Monitoring | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}} | <code>dbm-metrics-intake.{{< region-param key="dd_site" >}}</code> |
| Remote Configuration | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}} | <code>config.{{< region-param key="dd_site" >}}</code> |

また、AWS API の `DescribeVpcEndpointServices` を照会するか、以下のコマンドを使用して、この情報を見つけることができます。

```bash
aws ec2 describe-vpc-endpoint-services --service-names <service-name>`
```

例えば、{{< region-param key="aws_region" code="true" >}} の Datadog メトリクスエンドポイントの場合:

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
[8]: /ja/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[9]: https://docs.datadoghq.com/ja/agent/logs/?tab=tailexistingfiles#send-logs-over-https
[10]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/vpc-endpoint-overview.html
{{% /tab %}}
{{< /tabs >}}


[1]: https://aws.amazon.com/privatelink/
[2]: https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html
{{% /site-region %}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}