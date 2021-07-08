---
title: AWS PrivateLink を介して Datadog に接続する
kind: ガイド
further_reading:
  - link: agent/logs
    tag: ドキュメント
    text: Agent によるログ収集を有効にします。
  - link: '/integrations/amazon_web_services/#set-up-the-datadog-lambda-function'
    tag: ドキュメント
    text: AWS サービスからログを収集する
---
<div class="alert alert-info">
Datadog は <b>us-east-1</b>で AWS PrivateLink エンドポイントを公開しています。
</div>

{{< site-region region="gov" >}}
<div class="alert alert-warning">Datadog PrivateLink は、政府関係のサイトに対する Datadog の使用をサポートしていません。</div>
{{< /site-region >}}

このガイドでは Datadog で [AWS PrivateLink][1] を構成および使用する方法についてご説明します。

## 概要

まずはローカルの Datadog Agent がデータを送信可能な VPC の内部エンドポイントを構成します。その後、VPC エンドポイントを Datadog の VPC 内にあるエンドポイントと紐付けます。

{{< img src="agent/guide/private_link/vpc_diagram_schema.png" alt="VPC ダイアグラムスキーマ" >}}

## VPC エンドポイントを作成する

1. AWS コンソールを開き、新しい VPC エンドポイントを作成します。
   {{< img src="agent/guide/private_link/create_vpc_endpoint.png" alt="VPC エンドポイントを作成" style="width:60%;" >}}
2. **Find service by name** を選択します。
3. _Service Name_ テキストボックスに、AWS PrivateLink を構築したいサービスの名前を入力します。

    {{< img src="agent/guide/private_link/vpc_service_name.png" alt="VPC サービス名" style="width:70%;" >}}
    {{< tabs >}}

{{% tab "メトリクス" %}}

| Datadog メトリクスのサービス名                                |
| ---------------------------------------------------------- |
| `com.amazonaws.vpce.us-east-1.vpce-svc-0d560852f6f1e27ac`  |

{{% /tab %}}
{{% tab "Logs" %}}

| Forwarder | Datadog ログのサービス名 |
| --------- | ------------------------- |
| Datadog Agent | `com.amazonaws.vpce.us-east-1.vpce-svc-025a56b9187ac1f63` |
| Lambda またはカスタムフォワーダー | `com.amazonaws.vpce.us-east-1.vpce-svc-06394d10ccaf6fb97` |

{{% /tab %}}
{{% tab "API" %}}

| Datadog API のサービス名                                  |
| --------------------------------------------------------- |
| `com.amazonaws.vpce.us-east-1.vpce-svc-064ea718f8d0ead77` |

{{% /tab %}}
{{% tab "Processes" %}}

| Datadog プロセスモニタリングサービス名                   |
| --------------------------------------------------------- |
| `com.amazonaws.vpce.us-east-1.vpce-svc-0ed1f789ac6b0bde1` |

{{% /tab %}}
{{% tab "Traces" %}}

| Datadog トレースサービス名                                |
| --------------------------------------------------------- |
| `com.amazonaws.vpce.us-east-1.vpce-svc-0355bb1880dfa09c2` |

{{% /tab %}}
{{% tab "Kubernetes リソース" %}}

| Datadog Kubernetes Explorer サービス名                  |
| --------------------------------------------------------- |
| `com.amazonaws.vpce.us-east-1.vpce-svc-0ad5fb9e71f85fe99` |

{{% /tab %}}
{{< /tabs >}}

4. _verify_ ボタンをクリックします。_Service name found_ と表示されない場合は、[Datadog のサポートチーム][2]にお問い合わせください。
5. Datadog の VPC サービスエンドポイントと紐付ける VPC およびサブネットを選択します。
6. **Enable DNS name** (_Enable for this endpoint_) にチェックが入っていることを確認してください。
   {{< img src="agent/guide/private_link/enabled_dns_private.png" alt="プライベート DNS を有効化" style="width:60%;" >}}
7. 任意のセキュリティグループを選択し、この VPC エンドポイントにトラフィックを送信できる送信元の範囲を指定します。

    **注**: **VPC エンドポイントを介して Datadog にログ転送を行う場合は、セキュリティグループがポート `443` のインバウンドおよびアウトバンドトラフィックを許容している必要があります**。

8. 画面下部の **Create endpoint** をクリックします。作成が完了すると以下のようなメッセージが表示されます。
   {{< img src="agent/guide/private_link/vpc_endpoint_created.png" alt="VPC エンドポイントの作成完了" style="width:60%;" >}}
9. VPC エンドポイントの ID をクリックしてステータスを確認します。
10. ステータスが _Pending_ から _Available_ に変わるまでお待ちください。約 10 分要する場合があります。
    {{< img src="agent/guide/private_link/vpc_status.png" alt="VPC のステータス" style="width:60%;" >}}

    _Available_ が表示されると、AWS PrivateLink を使用することができます。
11. ログデータを収集する場合は、Agent が HTTPS 経由でログを送信するように構成されていることを確認してください。まだない場合は、[Agent `datadog.yaml` コンフィギュレーションファイル][3]に以下を追加します。

    ```yaml
    logs_config:
        use_http: true
    ```

    コンテナ Agent をお使いの場合は、代わりに環境変数を設定してください。

    ```
    DD_LOGS_CONFIG_USE_HTTP=true
    ```

    このコンフィギュレーションは AWS PrivateLink 経由で Datadog にログを送信する場合に必要です。　詳細は [Agent のログ収集ドキュメント][4]を参照してください。
12. [Agent を再起動][5]し、AWS PrivateLink 経由で Datadog にデータを送信します。

## 高度な使用方法

### リージョン間ピアリング

他のリージョンから `us-east-1` にある Datadog の PrivateLink オファリングにトラフィックをルーティングするには、リージョン間 [Amazon VPC ピアリング][6]を使用します。

リージョン間 VPC ピアリングを使用すると、異なる AWS リージョン間で VPC 間の接続を確立できます。これにより、異なるリージョンの VPC リソースがプライベート IP アドレスを使用して互いに通信できるようになります。

詳細については、[Amazon VPC ピアリングのドキュメント][6]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/privatelink/
[2]: /ja/help/
[3]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
[4]: /ja/agent/logs/?tab=tailexistingfiles#send-logs-over-https
[5]: /ja/agent/guide/agent-commands/#restart-the-agent
[6]: https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html