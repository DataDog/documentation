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
| `com.amazonaws.vpce.us-east-1.vpce-svc-056576c12b36056ca`  |

{{% /tab %}}
{{% tab "Logs" %}}

| Forwarder | Datadog ログのサービス名 |
| --------- | ------------------------- |
| Datadog Agent | `com.amazonaws.vpce.us-east-1.vpce-svc-0a2aef8496ee043bf` |
| Lambda またはカスタムフォワーダー | `com.amazonaws.vpce.us-east-1.vpce-svc-06394d10ccaf6fb97` |

{{% /tab %}}
{{% tab "API" %}}

| Datadog API のサービス名                                  |
| --------------------------------------------------------- |
| `com.amazonaws.vpce.us-east-1.vpce-svc-02a4a57bc703929a0` |

{{% /tab %}}
{{% tab "Processes" %}}

| Datadog プロセスモニタリングサービス名                   |
| --------------------------------------------------------- |
| `com.amazonaws.vpce.us-east-1.vpce-svc-05316fe237f6d8ddd` |

{{% /tab %}}
{{% tab "Traces" %}}

| Datadog トレースサービス名                                |
| --------------------------------------------------------- |
| `com.amazonaws.vpce.us-east-1.vpce-svc-07672d13af0033c24` |

{{% /tab %}}
{{% tab "Kubernetes リソース" %}}

| Datadog Kubernetes Explorer サービス名                  |
| --------------------------------------------------------- |
| `com.amazonaws.vpce.us-east-1.vpce-svc-0b03d6756bf6c2ec3` |

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

_Available_ と表示されると、AWS PrivateLink の使用を開始できます。次に Datadog Agent、Lambda Forwarder、また Datadog へのデータ受け渡しを行うその他のクライアントに応じた新しいターゲットエンドポイントでAgent のコンフィギュレーションを更新します。

## クライアントのコンフィギュレーション

以下のタブで、新しい VPC エンドポイントを使ってメトリクスとログを Datadog に送信する方法、また Datadog の API で必要となる新しいホスト URL についての詳細をご確認いただけます。

{{< tabs >}}
{{% tab "Metrics" %}}

_Agent 6.0 以上で使用可能_

この新しい VPC エンドポイントを使ってメトリクスを Datadog に転送するには、`pvtlink.agent.datadoghq.com` を新しいメトリクスの宛先として構成を行います。

1. [Agent の `datadog.yaml` コンフィギュレーションファイル][1]で `dd_url` パラメーターを更新します。

    ```yaml
    dd_url: https://pvtlink.agent.datadoghq.com
    ```

2. [Agent を再起動][2]し、AWS PrivateLink 経由で Datadog にメトリクスを送信します。

**注**: コンテナ Agent をお使いの場合は、代わりに環境変数: `DD_DD_URL="https://pvtlink.agent.datadoghq.com"` を設定してください。Cluster Agent で Kubernetes 環境の監視を行っている場合は、この環境変数を Cluster Agent と Node Agent の_両方_で構成します。


[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /ja/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Logs" %}}

_Agent 6.14 以上で使用可能_

この新しい VPC エンドポイントを使ってログを Datadog に転送するには、`pvtlink.logs.datadoghq.com` を新しいログの宛先として構成を行います。

**Datadog Agent を使用する場合**:

1. [Agent の `datadog.yaml` コンフィギュレーションファイル][1]に以下を追加します。

    ```yaml
    logs_config:
        use_http: true
        logs_dd_url: pvtlink.logs.datadoghq.com:443
    ```

    - `use_http` 変数を使用すると、Datadog Agent で HTTPS を介してログを送信することができます。このコンフィギュレーションは AWS PrivateLink 経由で Datadog にログを送信する場合に必要です。　詳細は [Agent のログ収集ドキュメント][2]を参照してください。
    - `logs_dd_url` 変数は VPC エンドポイントにログを送るために使用されます。

2. [Agent を再起動][3]し、AWS PrivateLink 経由で Datadog にログを送信します。

**注**: コンテナ Agent をお使いの場合は、代わりに環境変数を設定してください。

- `DD_LOGS_CONFIG_USE_HTTP=true`
- `DD_LOGS_CONFIG_LOGS_DD_URL="pvtlink.logs.datadoghq.com:443"`

**Lambda またはカスタムフォワーダーの使用**:

[Datadog Lambda 関数][4] の環境変数に `DD_URL: api-pvtlink.logs.datadoghq.com` を追加し、AWS のサービスログを Datadog に転送する際にプライベートリンクが使えるようにします。

デフォルトで、Forwarder の API キーは Secrets Manager に保存されます。Secrets Manager のエンドポイントを VPC に追加する必要があります。手順に従い、[AWS サービスを VPC に追加][5]してください。

CloudFormation テンプレートで Forwarder をインストールする際は、'DdUsePrivateLink' を有効にして 1 つ以上のサブネット ID とセキュリティグループを設定してください。

[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /ja/agent/logs/?tab=tailexistingfiles#send-logs-over-https
[3]: /ja/agent/guide/agent-commands/#restart-the-agent
[4]: /ja/integrations/amazon_web_services/#set-up-the-datadog-lambda-function
[5]: https://docs.aws.amazon.com/vpc/latest/userguide/vpce-interface.html#create-interface-endpoint
{{% /tab %}}
{{% tab "API" %}}

Datadog API にデータを送信する、またはこの新しいエンドポイントを経由してデータを使用する場合は、API コールのホスト署名を `api.datadoghq.com/api/` から `pvtlink.api.datadoghq.com/api/` に置き換えます。

{{% /tab %}}
{{% tab "Processes" %}}

この新しい VPC エンドポイントを使ってプロセスメトリクスを Datadog に転送するには、`pvtlink.process.datadoghq.com` を新しいプロセスデータの宛先として構成を行います。

1. [Agent の `datadog.yaml` コンフィギュレーションファイル][1]の `process_config:` セクションで `process_dd_url` を更新します。

    ```yaml
    process_dd_url: https://pvtlink.process.datadoghq.com
    ```

2. [Agent を再起動][2]し、AWS PrivateLink 経由で Datadog にプロセスメトリクスを送信します。

**注**: コンテナ Agent をお使いの場合は、代わりに環境変数: `DD_PROCESS_AGENT_URL="https://pvtlink.process.datadoghq.com"` を設定してください。Cluster Agent で Kubernetes 環境の監視を行っている場合は、この環境変数を Cluster Agent と Node Agent の_両方_で構成します。


[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /ja/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Traces" %}}

この新しい VPC エンドポイントを使ってメトリクスを Datadog に転送するには、`trace-pvtlink.agent.datadoghq.com` を新しいメトリクスの宛先として構成を行います。

1. [Agent の `datadog.yaml` コンフィギュレーションファイル][1]の `apm_config` セクションで `apm_dd_url` を更新します。

    ```yaml
    apm_dd_url: https://trace-pvtlink.agent.datadoghq.com
    ```

2. [Agent を再起動][2]し、AWS PrivateLink 経由で Datadog にトレースを送信します。

**注**: コンテナ Agent をお使いの場合は、代わりに環境変数: `DD_APM_DD_URL="https://trace-pvtlink.agent.datadoghq.com"` を設定してください。Cluster Agent で Kubernetes 環境の監視を行っている場合は、この環境変数を Cluster Agent と Node Agent の_両方_で構成します。


[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /ja/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Kubernetes リソース" %}}

新しい VPC エンドポイントを使用して Kubernetes のリソースを Datadog に転送するには、新しいオーケストレータのデータ宛先として `orchestrator-pvtlink.datadoghq.com` を構成します。

1. [Agent の `datadog.yaml` コンフィギュレーションファイル][1]で `dd_url` パラメーターを更新します。

    ```yaml
    dd_url: orchestrator-pvtlink.datadoghq.com
    ```

   コンテナ Agent の場合は、代わりに以下の環境変数を設定します。

   ```
   DD_ORCHESTRATOR_EXPLORER_ORCHESTRATOR_DD_URL="orchestrator-pvtlink.datadoghq.com"
   ```

   プロセス Agent にも同様にこの設定を行います。Kubernetes 環境の監視にクラスター Agent を使用している場合は、この環境変数をクラスター Agent および ノード Agent に構成します。

2. [Agent を再起動][2]して、AWS PrivateLink 経由で Kubernetes リソースを Datadog に送信します。


[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /ja/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{< /tabs >}}

## 高度な使用方法

### リージョン間ピアリング

他のリージョンから `us-east-1` にある Datadog の PrivateLink オファリングにトラフィックをルーティングするには、リージョン間 [Amazon VPC ピアリング][3]を使用します。

リージョン間 VPC ピアリングを使用すると、異なる AWS リージョン間で VPC 間の接続を確立できます。これにより、異なるリージョンの VPC リソースがプライベート IP アドレスを使用して互いに通信できるようになります。

詳細については、[Amazon VPC ピアリングのドキュメント][3]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/privatelink/
[2]: /ja/help/
[3]: https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html