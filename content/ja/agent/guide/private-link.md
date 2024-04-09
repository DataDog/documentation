---
kind: ガイド
title: AWS PrivateLink を介して Datadog に接続する
---

{{% site-region region="us3,us5,eu,gov,ap1" %}}
<div class="alert alert-warning">Datadog PrivateLink は、選択された Datadog サイトをサポートしていません。</div>
{{< /site-region >}}

{{% site-region region="us" %}}
このガイドでは Datadog で [AWS PrivateLink][1] を構成および使用する方法についてご説明します。

## 概要

まずはローカルの Datadog Agent がデータを送信可能な VPC の内部エンドポイントを構成します。その後、VPC エンドポイントを Datadog の VPC 内にあるエンドポイントと紐付けます。

{{< img src="agent/guide/private_link/vpc_diagram_schema.png" alt="VPC ダイアグラムスキーマ" >}}

## セットアップ

Datadog は、**us-east-1** で AWS PrivateLink のエンドポイントを公開します。

ただし、他のリージョンから `us-east-1` にある Datadog の PrivateLink サービスにトラフィックをルーティングするには、リージョン間の [Amazon VPC peering][2] を使用します。リージョン間 VPC ピアリングは、異なる AWS リージョンにまたがる VPC 間の接続を確立することができます。これにより、異なるリージョンの VPC リソース同士がプライベート IP アドレスで通信できるようになります。詳しくは、[Amazon VPC ピアリング][2]をご参照ください。

{{< tabs >}}
{{% tab "us-east-1" %}}

1. AWS Console をリージョン **us-east-1** に接続し、VPC エンドポイントを作成します。

   {{< img src="agent/guide/private_link/create_vpc_endpoint.png" alt="VPC エンドポイントを作成" style="width:60%;" >}}

2. **Find service by name** を選択します。
3. _Service Name_ テキストボックスに、AWS PrivateLink を構築したいサービスの名前を入力します。

    {{< img src="agent/guide/private_link/vpc_service_name.png" alt="VPC サービス名" style="width:70%;" >}}

| Datadog                   | PrivateLink サービス名                                  | プライベート DNS 名                                   |
|---------------------------| --------------------------------------------------------- | -------------------------------------------------- |
| ログ (Agent の HTTP 取り込み)  | `com.amazonaws.vpce.us-east-1.vpce-svc-025a56b9187ac1f63` | `agent-http-intake.logs.datadoghq.com`            |
| ログ (ユーザーの HTTP 取り込み)   | `com.amazonaws.vpce.us-east-1.vpce-svc-0e36256cb6172439d` | `http-intake.logs.datadoghq.com`                  |
| API                       | `com.amazonaws.vpce.us-east-1.vpce-svc-064ea718f8d0ead77` | `api.datadoghq.com`                               |
| メトリクス                   | `com.amazonaws.vpce.us-east-1.vpce-svc-09a8006e245d1e7b8` | `metrics.agent.datadoghq.com`                     |
| コンテナ                | `com.amazonaws.vpce.us-east-1.vpce-svc-0ad5fb9e71f85fe99` | `orchestrator.datadoghq.com`                      |
| プロセス                   | `com.amazonaws.vpce.us-east-1.vpce-svc-0ed1f789ac6b0bde1` | `process.datadoghq.com`                           |
| Profiling                 | `com.amazonaws.vpce.us-east-1.vpce-svc-022ae36a7b2472029` | `intake.profile.datadoghq.com`                    |
| トレース                    | `com.amazonaws.vpce.us-east-1.vpce-svc-0355bb1880dfa09c2` | `trace.agent.datadoghq.com`                       |

4. **Verify** をクリックします。_Service name found_ と表示されない場合は、[Datadog サポート][1]にお問い合わせください。
5. Datadog の VPC サービスエンドポイントと紐付ける VPC およびサブネットを選択します。
6. **Enable DNS name** に、_Enable for this endpoint_ がチェックされていることを確認します。

   {{< img src="agent/guide/private_link/enabled_dns_private.png" alt="プライベート DNS を有効化" style="width:80%;" >}}

7. 任意のセキュリティグループを選択し、この VPC エンドポイントにトラフィックを送信できる送信元の範囲を指定します。

    **注**: **セキュリティグループは、TCP ポート `443` のインバウンドトラフィックを許可する必要があります**。

8. 画面下部の **Create endpoint** をクリックします。作成が完了すると以下が表示されます。

   {{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="VPC エンドポイントの作成完了" style="width:60%;" >}}

9. VPC エンドポイントの ID をクリックしてステータスを確認します。
10. ステータスが _Pending_ から _Available_ に変わるまでお待ちください。約 10 分要する場合があります。_Available_ と表示されれば、AWS PrivateLink を利用することができます。

    {{< img src="agent/guide/private_link/vpc_status.png" alt="VPC のステータス" style="width:60%;" >}}

11. ログデータを収集する場合は、Agent が HTTPS 経由でログを送信するように構成されていることを確認してください。データがまだない場合は、[Agent `datadog.yaml` コンフィギュレーションファイル][2]に以下を追加します。

    ```yaml
    logs_config:
        use_http: true
    ```

    コンテナ Agent をお使いの場合は、代わりに環境変数を設定してください。

    ```
    DD_LOGS_CONFIG_USE_HTTP=true
    ```

    この構成は、AWS PrivateLink と Datadog Agent で Datadog にログを送信する際に必要で、Lambda Extension では必要ありません。詳しくは、[Agent のログ収集][3]をご参照ください。

12. Lambda 拡張機能で、環境変数 `DD_API_KEY_SECRET_ARN` で指定した ARN を使って AWS Secrets Manager から Datadog API キーを読み込む場合、[Secrets Manager 用の VPC エンドポイントを作成][4]する必要があります。

13. [Agent を再起動][5]し、AWS PrivateLink 経由で Datadog にデータを送信します。



[1]: /ja/help/
[2]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
[3]: /ja/agent/logs/?tab=tailexistingfiles#send-logs-over-https
[4]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/vpc-endpoint-overview.html
[5]: /ja/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}

{{% tab "VPC ピアリング" %}}

### Amazon VPC ピアリング

1. AWS Console をリージョン **us-east-1** に接続し、VPC エンドポイントを作成します。

{{< img src="agent/guide/private_link/create_vpc_endpoint.png" alt="VPC エンドポイントを作成" style="width:80%;" >}}

2. **Find service by name** を選択します。
3. _Service Name_ テキストボックスに、AWS PrivateLink を構築したいサービスの名前を入力します。

 {{< img src="agent/guide/private_link/vpc_service_name.png" alt="VPC サービス名" style="width:90%;" >}}

| Datadog                   | PrivateLink サービス名                                  |
|---------------------------| --------------------------------------------------------- |
| メトリクス                   | `com.amazonaws.vpce.us-east-1.vpce-svc-09a8006e245d1e7b8` |
| ログ (Agent の HTTP 取り込み)  | `com.amazonaws.vpce.us-east-1.vpce-svc-025a56b9187ac1f63` |
| ログ (ユーザーの HTTP 取り込み)   | `com.amazonaws.vpce.us-east-1.vpce-svc-0e36256cb6172439d` |
| API                       | `com.amazonaws.vpce.us-east-1.vpce-svc-064ea718f8d0ead77` |
| プロセス                   | `com.amazonaws.vpce.us-east-1.vpce-svc-0ed1f789ac6b0bde1` |
| Profiling                 | `com.amazonaws.vpce.us-east-1.vpce-svc-022ae36a7b2472029` |
| トレース                    | `com.amazonaws.vpce.us-east-1.vpce-svc-0355bb1880dfa09c2` |
| コンテナ                | `com.amazonaws.vpce.us-east-1.vpce-svc-0ad5fb9e71f85fe99` |

4. **Verify** をクリックします。_Service name found_ と表示されない場合は、[Datadog サポート][1]にお問い合わせください。

5. 次に、Datadog VPC サービスエンドポイントでピアリングする VPC とサブネットを選択します。VPC ピアリングでは DNS を手動で構成する必要があるため、**Enable DNS name** は選択しないでください。

6. 任意のセキュリティグループを選択し、この VPC エンドポイントにトラフィックを送信できる送信元の範囲を指定します。

    **注**: **セキュリティグループは、TCP ポート `443` のインバウンドトラフィックを許可する必要があります**。

7. 画面下部の **Create endpoint** をクリックします。作成が完了すると以下が表示されます。

{{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="VPC エンドポイントの作成完了" style="width:80%;" >}}

8. VPC エンドポイントの ID をクリックしてステータスを確認します。
9. ステータスが _Pending_ から _Available_ に変わるまでお待ちください。約 10 分要する場合があります。
10. エンドポイントが作成されたら、VPC ピアリングを使って、別のリージョンでも PrivateLink エンドポイントを利用して PrivateLink 経由で Datadog にテレメトリーを送信できるようにします。詳しくは、AWS の [VPC ピアリング接続での作業][2]ページをご覧ください。

{{< img src="agent/guide/private_link/vpc_status.png" alt="VPC のステータス" style="width:80%;" >}}

### Amazon Route53

1. AWS PrivateLink のエンドポイントを作成した各サービスに対して、[Route53 プライベートホストゾーン][3]を作成します。プライベートホストゾーンを`us-east-1` の VPC にアタッチします。

{{< img src="agent/guide/private_link/create-a-route53-private-hosted-zone.png" alt="Route53 のプライベートホストゾーンを作成する" style="width:80%;" >}}

以下のリストを使用して、サービスおよび DNS 名を Datadog の各部にマッピングします。

  | Datadog                   | PrivateLink サービス名                                  | プライベート DNS 名                                   |
  |---------------------------| --------------------------------------------------------- | -------------------------------------------------- |
  | メトリクス                   | `com.amazonaws.vpce.us-east-1.vpce-svc-09a8006e245d1e7b8` | `metrics.agent.datadoghq.com`                     |
  | ログ (Agent の HTTP 取り込み)  | `com.amazonaws.vpce.us-east-1.vpce-svc-025a56b9187ac1f63` | `agent-http-intake.logs.datadoghq.com`            |
  | ログ (ユーザーの HTTP 取り込み)   | `com.amazonaws.vpce.us-east-1.vpce-svc-0e36256cb6172439d` | `http-intake.logs.datadoghq.com`                  |
  | API                       | `com.amazonaws.vpce.us-east-1.vpce-svc-064ea718f8d0ead77` | `api.datadoghq.com`                               |
  | プロセス                   | `com.amazonaws.vpce.us-east-1.vpce-svc-0ed1f789ac6b0bde1` | `process.datadoghq.com`                           |
  | Profiling                 | `com.amazonaws.vpce.us-east-1.vpce-svc-022ae36a7b2472029` | `intake.profile.datadoghq.com`                    |
  | トレース                    | `com.amazonaws.vpce.us-east-1.vpce-svc-0355bb1880dfa09c2` | `trace.agent.datadoghq.com`                       |
  | コンテナ                | `com.amazonaws.vpce.us-east-1.vpce-svc-0ad5fb9e71f85fe99` | `orchestrator.datadoghq.com`                      |

また、AWS API の `DescribeVpcEndpointServices` を問い合わせるか、CLI コマンド `aws ec2 describe-vpc-endpoint-services --service-names <service-name>` を使用してもこの情報を見つけることができます。

例えば、Datadog のメトリクスエンドポイントの場合:

  ```bash
  aws ec2 describe-vpc-endpoint-services --service-names com.amazonaws.vpce.us-east-1.vpce-svc-09a8006e245d1e7b8 | jq '.ServiceDetails[0].PrivateDnsName'
  ```

これは、Agent トラフィックの発信元となる VPC と関連付けるために必要な、プライベートホストゾーン名である `metrics.agent.datadoghq.com` を返します。このレコードを上書きすると、メトリクスに関連するインテークホスト名がすべて取得されます。

2. それぞれの新しい Route53 プライベートホストゾーン内に、同じ名前で A レコードを作成します。**Alias** オプションをトグルし、**Route traffic to** で、**Alias to VPC endpoint**、**us-east-1** を選び、DNS 名と関連付けられた VPC エンドポイントの DNS 名を入力します。

   **注**:
      - DNS 名を取得するには、[エンドポイントサービスのプライベート DNS 名構成ドキュメントを表示する][4]を参照してください。
      - Agent はバージョン付きのエンドポイント (例: `<version>-app.agent.datadoghq.com`) にテレメトリーを送信します。エンドポイントでは CNAME エイリアスを通じた名前解決が行われ、`metrics.agent.datadoghq.com` にルーティングされます。したがって、 `metrics.agent.datadoghq.com` のプライベートホストゾーンのセットアップのみが必要となります。

{{< img src="agent/guide/private_link/create-an-a-record.png" alt="A レコードの作成" style="width:90%;" >}}

3. Datadog PrivateLink のエンドポイントを含む `us-east-1` の VPC と、Datadog Agent を実行する地域の VPC の間で、VPC ピアリングとルーティングを構成します。

4. VPC が異なる AWS アカウントにある場合、続行する前に Datadog Agent を含む VPC が Route53 プライベートホストゾーンとの関連付けを許可されている必要があります。Datadog Agent が実行する VPC のリージョンと VPC ID を使用して、各 Route53 プライベートホストゾーンに対して [VPC 関連付け承認][5]を作成します。このオプションは、AWS Console では利用できません。AWS CLI、SDK、または API を使用して構成する必要があります。

5. Route53 のホストゾーンを編集して、non-us-east-1 の VPC を追加します。

{{< img src="agent/guide/private_link/edit-route53-hosted-zone.png" alt="Route53 のプライベートホストゾーンを編集する" style="width:80%;" >}}

6. プライベートホストゾーン (PHZ) が接続されている VPC では、特定の設定、特に `enableDnsHostnames` と `enableDnsSupport` をオンにする必要があります。[プライベートホストゾーンを使用する際の注意点][6]を参照してください。

7. [Agent を再起動][7]し、AWS PrivateLink 経由で Datadog にデータを送信します。

#### DNS の解決と接続のトラブルシューティング

DNS 名は、`us-east-1` の VPC の CIDR ブロックに含まれる IP アドレスに解決し、`port 443` への接続に成功するはずです。

{{< img src="agent/guide/private_link/successful-setup.png" alt="443 番ポートへの接続に成功" style="width:80%;" >}}

DNS がパブリック IP アドレスに解決している場合、Route53 ゾーンが代替地域の VPC に関連付けされて**いない**か、A レコードが存在しないことが原因です。

DNS は正しく解決しているのに、`port 443` への接続に失敗する場合、VPC のピアリングまたはルーティングが誤って構成されているか、ポート 443 が `us-east-1` の VPC の CIDR ブロックへのアウトバウンドを許可されていない可能性があります。

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
[7]: /ja/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[8]: /ja/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[9]: https://docs.datadoghq.com/ja/agent/logs/?tab=tailexistingfiles#send-logs-over-https
[10]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/vpc-endpoint-overview.html
{{% /tab %}}
{{< /tabs >}}


## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Agent でログ収集を有効にする][3]
- [AWS サービスからログを収集する][4]

{{< /site-region >}}
[1]: https://aws.amazon.com/privatelink/
[2]: https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html
[3]: /ja/agent/logs
[4]: /ja/integrations/amazon_web_services/#log-collection