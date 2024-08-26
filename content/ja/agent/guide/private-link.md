---
further_reading:
- link: /agent/logs
  tag: ドキュメント
  text: Agent によるログ収集を有効にする
- link: /integrations/amazon_web_services/#log-collection
  tag: ドキュメント
  text: AWS サービスからログを収集する
title: AWS PrivateLink を介して Datadog に接続する
---

{{% site-region region="us3,us5,eu,gov" %}}
<div class="alert alert-warning">Datadog PrivateLink は、選択した Datadog サイトをサポートしていません。</div>
{{% /site-region %}}

{{% site-region region="us,ap1" %}}

このガイドでは、Datadog で使用するための [AWS PrivateLink][1] の構成方法を説明します。

## 概要

全体的なプロセスは、ローカルの Datadog Agent がデータを送信できる VPC に内部エンドポイントを構成することで成り立ちます。その後、VPC エンドポイントは、Datadog の VPC 内のエンドポイントにピアリングされます。

{{< img src="agent/guide/private_link/vpc_diagram_schema.png" alt="VPC ダイアグラムスキーマ" >}}

## 設定

Datadog は、**{{< region-param key="aws_region" >}}** の AWS PrivateLink エンドポイントを公開しています。

ただし、他のリージョンから {{< region-param key="aws_region" code="true" >}} の Datadog の PrivateLink オファリングにトラフィックをルーティングするには、リージョン間の [Amazon VPC ピアリング][2]を使用します。リージョン間 VPC ピアリングは、異なる AWS リージョンをまたがる VPC 間の接続を確立することを可能にします。これにより、異なるリージョンの VPC リソース同士がプライベート IP アドレスを使用して通信できるようになります。詳細は [Amazon VPC ピアリング][2]をご参照ください。

{{< tabs >}}
{{% tab "同じリージョンからの接続" %}}

1. AWS Console をリージョン **{{< region-param key="aws_region" >}}** に接続し、VPC エンドポイントを作成します。

   {{< img src="agent/guide/private_link/create_vpc_endpoint.png" alt="VPC エンドポイントの作成" style="width:60%;" >}}

2. **Find service by name** を選択します。
3. AWS PrivateLink を構築したいサービスに応じて、_Service Name_ テキストボックスに入力します。

    {{< img src="agent/guide/private_link/vpc_service_name.png" alt="VPC サービス名" style="width:70%;" >}}

| Datadog | PrivateLink サービス名 | プライベート DNS 名 |
|---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| ログ (Agent HTTP インテーク)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}} | {{< region-param key="agent_http_endpoint" code="true">}} |
| ログ (ユーザー HTTP インテーク)   | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}} | {{< region-param key="http_endpoint" code="true">}} |
| API                       | {{< region-param key="aws_private_link_api_service_name" code="true" >}} | <code>api.{{< region-param key="dd_site" >}}</code>                    |
| メトリクス                   | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}} | <code>metrics.agent.{{< region-param key="dd_site" >}}</code>          |
| コンテナ                | {{< region-param key="aws_private_link_containers_service_name" code="true" >}} | <code>orchestrator.{{< region-param key="dd_site" >}}</code>           |
| プロセス                   | {{< region-param key="aws_private_link_process_service_name" code="true" >}} | <code>process.{{< region-param key="dd_site" >}}</code>                |
| プロファイリング                 | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}} | <code>intake.profile.{{< region-param key="dd_site" >}}</code>         |
| トレース                    | {{< region-param key="aws_private_link_traces_service_name" code="true" >}} | <code>trace.agent.{{< region-param key="dd_site" >}}</code> |
| データベースモニタリング | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}} | <code>dbm-metrics-intake.{{< region-param key="dd_site" >}}</code> |
| リモート構成 | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}} | <code>config.{{< region-param key="dd_site" >}}</code> |

4. **Verify** をクリックします。_Service name found_ と表示されない場合は、[Datadog サポート][1]までお問い合わせください。
5. Datadog VPC サービスエンドポイントとピアリングされるべき VPC とサブネットを選択します。
6. *Enable DNS name** の _Enable for this endpoint_ がチェックされていることを確認します。

   {{< img src="agent/guide/private_link/enabled_dns_private.png" alt="Enable DNS private" style="width:80%;" >}}

7. この VPC エンドポイントへのトラフィックを送信できるものを制御するために、自由にセキュリティグループを選択します。

    **注**: **セキュリティグループは TCP ポート `443` 上のインバウンドトラフィックを受け入れなければなりません**。

8. 画面下部の **Create endpoint** をクリックします。成功すると以下のように表示されます。

   {{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="VPC エンドポイントが作成されました" style="width:60%;" >}}

9. ステータスを確認するには、VPC エンドポイント ID をクリックします。
10. ステータスが _Pending_ から _Available_ に変わるのを待ちます。これには最大 10 分かかります。_Available_ が表示されたら、AWS PrivateLink を利用できます。

    {{< img src="agent/guide/private_link/vpc_status.png" alt="VPC ステータス" style="width:60%;" >}}

11. ログデータを収集している場合、Agent が HTTPS 経由でログを送信するように構成されていることを確認してください。データがまだ存在しない場合は、[Agent `datadog.yaml` コンフィギュレーションファイル][2]に以下を追加します。

    ```yaml
    logs_config:
        use_http: true
    ```

    Container Agent を使用している場合は、代わりに以下の環境変数を設定します。

    ```
    DD_LOGS_CONFIG_USE_HTTP=true
    ```

    この構成は、AWS PrivateLink と Datadog Agent でログを Datadog に送信する場合に必要で、Lambda 拡張機能では不要です。詳細は [Agent ログ収集][3]を参照してください。

12. 環境変数 `DD_API_KEY_SECRET_ARN` で指定した ARN を使用して AWS Secrets Manager から Datadog API Key をロードする Lambda 拡張機能の場合、[Secrets Manager 用の VPC エンドポイントを作成する][4]必要があります。

13. [Agent を再起動][5]し、AWS PrivateLink 経由で Datadog にデータを送信します。



[1]: /ja/help/
[2]: /ja/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[3]: /ja/agent/logs/?tab=tailexistingfiles#send-logs-over-https
[4]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/vpc-endpoint-overview.html
[5]: /ja/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}

{{% tab "VPC ピアリングを使用した他のリージョンからの接続" %}}

### Amazon VPC ピアリング

1. AWS Console をリージョン **{{< region-param key="aws_region" >}}** に接続し、VPC エンドポイントを作成します。

{{< img src="agent/guide/private_link/create_vpc_endpoint.png" alt="VPC エンドポイントの作成" style="width:80%;" >}}

2. **Find service by name** を選択します。
3. AWS PrivateLink を構築したいサービスに応じて _Service Name_ テキストボックスに入力します。

{{< img src="agent/guide/private_link/vpc_service_name.png" alt="VPC サービス名" style="width:90%;" >}}

| Datadog                   | PrivateLink サービス名 |
|---------------------------|----------------------------------------------------------------------------------------|
| ログ (Agent HTTP インテーク)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}} |
| ログ (ユーザー HTTP インテーク) | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}} |
| API | {{< region-param key="aws_private_link_api_service_name" code="true" >}} |
| メトリクス | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}} |
| コンテナ | {{< region-param key="aws_private_link_containers_service_name" code="true" >}} |
| プロセス | {{< region-param key="aws_private_link_process_service_name" code="true" >}} |
| プロファイリング | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}} |
| トレース | {{< region-param key="aws_private_link_traces_service_name" code="true" >}} |
| データベースモニタリング | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}} |
| リモート構成 | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}} |

4. **Verify** をクリックします。_Service name found_ と表示されない場合は、[Datadog サポート][1]までお問い合わせください。

5. 次に、Datadog VPC サービスエンドポイントでピアリングされるべき VPC とサブネットを選択します。VPC ピアリングでは DNS を手動で構成する必要があるため、**Enable DNS name** は選択しないでください。

6. この VPC エンドポイントへトラフィックを送信できるものを制御するために、自由にセキュリティグループを選択します。

    **注**: **セキュリティグループは TCP ポート `443` 上のインバウンドトラフィックを受け入れなければなりません**。

7. 画面下部の **Create endpoint** をクリックします。成功すると以下のように表示されます。

{{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="VPC エンドポイントが作成されました" style="width:80%;" >}}

8. ステータスを確認するには、VPC エンドポイント ID をクリックします。
9. ステータスが _Pending_ から _Available_ に変わるのを待ちます。最大 10 分かかります。
10. エンドポイントの作成後、VPC ピアリングを使用して PrivateLink エンドポイントを別のリージョンで利用できるようにし、PrivateLink 経由で Datadog にテレメトリーを送信します。詳細については、AWS の [VPC ピアリング接続の使用][2]ページをお読みください。

{{< img src="agent/guide/private_link/vpc_status.png" alt="VPC ステータス" style="width:80%;" >}}

### Amazon Route53

1. AWS PrivateLink エンドポイントを作成したサービスごとに、[Route53 プライベートホストゾーン][3]を作成します。プライベートホストゾーンを {{< region-param key="aws_region" code="true" >}} の VPC にアタッチします。

{{< img src="agent/guide/private_link/create-a-route53-private-hosted-zone.png" alt="Route53 プライベートホストゾーンの作成" style="width:80%;" >}}

以下のリストを使用して、サービス名と DNS 名を Datadog のさまざまな部分にマッピングします。

  | Datadog                   | PrivateLink サービス名 | プライベート DNS 名 |
|---------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------|
  | ログ (Agent HTTP インテーク)  | {{< region-param key="aws_private_link_logs_agent_service_name" code="true" >}} | <code>agent-http-intake.logs.{{< region-param key="dd_site" >}}</code> |
| ログ (ユーザー HTTP インテーク) | {{< region-param key="aws_private_link_logs_user_service_name" code="true" >}} | <code>http-intake.logs.{{< region-param key="dd_site" >}}</code> |
| API | {{< region-param key="aws_private_link_api_service_name" code="true" >}} | <code>api.{{< region-param key="dd_site" >}}</code> |
| メトリクス | {{< region-param key="aws_private_link_metrics_service_name" code="true" >}} | <code>metrics.agent.{{< region-param key="dd_site" >}}</code> |
| コンテナ | {{< region-param key="aws_private_link_containers_service_name" code="true" >}} | <code>orchestrator.{{< region-param key="dd_site" >}}</code> |
| プロセス | {{< region-param key="aws_private_link_process_service_name" code="true" >}} | <code>process.{{< region-param key="dd_site" >}}</code> |
| プロファイリング | {{< region-param key="aws_private_link_profiling_service_name" code="true" >}} | <code>intake.profile.{{< region-param key="dd_site" >}}</code> |
| トレース | {{< region-param key="aws_private_link_traces_service_name" code="true" >}} | <code>trace.agent.{{< region-param key="dd_site" >}}</code> |
| データベースモニタリング | {{< region-param key="aws_private_link_dbm_service_name" code="true" >}} | <code>dbm-metrics-intake.{{< region-param key="dd_site" >}}</code> |
| リモート構成 | {{< region-param key="aws_private_link_remote_config_service_name" code="true" >}} | <code>config.{{< region-param key="dd_site" >}}</code> |

  この情報は、AWS API の `DescribeVpcEndpointServices` に問い合わせるか、以下のコマンドを使用しても見つけることができます。

  ```bash
  aws ec2 describe-vpc-endpoint-services --service-names <service-name>`
  ```

  例えば、{{< region-param key="aws_region" code="true" >}} の Datadog メトリクスエンドポイントの場合

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