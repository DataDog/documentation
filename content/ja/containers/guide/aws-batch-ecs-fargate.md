---
aliases:
- /ja/integrations/faq/aws-batch-ecs-fargate
- /ja/agent/guide/aws-batch-ecs-fargate-datadog-agent
further_reading:
- link: integrations/ecs_fargate/?tab=webui#aws-batch-on-ecs-fargate
  tag: ドキュメント
  text: AWS Fargate 上の Amazon ECS と AWS Batch
title: ECS Fargate を使用した AWS Batch と Datadog Agent
---

ジョブ定義にコンテナを追加することで、AWS Batch ジョブコンテナと並行して Datadog Agent を実行することができます。

## 前提条件

* AWS Batch コンピューティング環境
* AWS コンピューティング環境と関連付けられた AWS Batch ジョブキュー

## ジョブ定義の作成

{{< tabs >}}
{{% tab "AWS Web UI" %}}

1. [AWS Web Console][1] にログインし、AWS Batch セクションに移動します。
2. 左メニューの **Job Definitions** をクリックし、**Create** ボタンをクリックするか、既存の AWS Batch ジョブ定義を選択します。
3. 新しいジョブ定義の場合
    1. オーケストレーションのタイプとして **Fargate** を選択します。
    2. **Use legacy containerProperties structure** オプションの選択を解除します。 
    3. **Job Definition Name** にジョブ定義名を入力します (`my-app-and-datadog` など)。
    4. 実行 IAM ロールを選択します。下の [IAM ポリシーの作成と修正](#create-or-modify-your-iam-policy)セクションで、権限の要件を確認します。
    5. **Assign public IP** を有効にして、アウトバウンドのネットワークアクセスを許可し、**Next** ボタンをクリックします。
    6. Datadog Agent コンテナを構成します。
        1. **Container name** に `datadog-agent` と入力します。
        2. **Image** に `public.ecr.aws/datadog/agent:latest` と入力します。
        3. 必要性に応じて、**CPU** と**メモリ**のリソース要件を構成します。
        4. **Env Variables** には、**Key** `DD_API_KEY` を追加し、値として [Datadog API キー][2]を入力します。
        5. **キー** `ECS_FARGATE` と値 `true` を使用して、もう 1 つ環境変数を追加します。**Add** をクリックしてコンテナを追加します。
        6. **Key** `DD_SITE` と値 {{< region-param key="dd_site" code="true" >}} を使用して、別の環境変数を追加します。設定しない場合、これはデフォルトで `datadoghq.com` になります。
    7. ジョブ定義に他のアプリケーションコンテナを追加します。
    8. **Create job definition** をクリックして、ジョブ定義を作成します。

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/organization-settings/api-keys

{{% /tab %}}
{{% tab "AWS CLI" %}}

1. [datadog-agent-aws-batch-ecs-fargate.json][1] をダウンロードします。 

   **注**: Internet Explorer をお使いの場合は、以下に記載の JSON ファイルを含む gzip ファイルとしてダウンロードされる場合があります。
2. `JOB_DEFINITION_NAME`、[Datadog API キー][41]、適切な `DD_SITE` ({{< region-param key="dd_site" code="true" >}}) で JSON を更新します。

   **注**: 環境変数 `ECS_FARGATE` はすでに `"true"` に設定されています。
3. ジョブ定義に他のアプリケーションコンテナを追加します。
4. 次のコマンドを実行してジョブ定義を登録します。

   ```bash
   aws batch register-job-definition --cli-input-json file://<PATH_TO_FILE>/datadog-agent-aws-batch-ecs-fargate.json
   ```

[1]: https://docs.datadoghq.com/resources/json/datadog-agent-aws-batch-ecs-fargate.json
{{% /tab %}}
{{< /tabs >}}

## AWS Batch ジョブの送信

{{< tabs >}}
{{% tab "AWS Web UI" %}}

1. [AWS Web Console][1] にログインし、 AWS Batch セクションに移動します。必要であれば、[コンピューティング環境][2]や、コンピューティング環境に関連付けられた[ジョブキュー][3]を作成します。
2. **Jobs** タブで、**Submit new job** ボタンをクリックします。
3. **Job name** に入力します。
4. **Job Definition** で、前のステップで作成したジョブ定義を選択します。 
5. Datadog Agent を実行するジョブキューを選択します。
6. **Container overrides** は、オプションで設定します。
7. **Next** ボタンをクリックし、**Create job** ボタンをクリックします。

[1]: https://aws.amazon.com/console
[2]: https://docs.aws.amazon.com/batch/latest/userguide/create-compute-environment.html
[3]: https://docs.aws.amazon.com/batch/latest/userguide/create-job-queue-fargate.html

{{% /tab %}}
{{% tab "AWS CLI" %}}

1. 次のコマンドを実行してジョブ定義のジョブを送信します。

```bash
aws batch submit-job --job-name <JOB_NAME> \
--job-queue <JOB_QUEUE_NAME> \
--job-definition <JOB_DEFINITION_NAME>:1
```

{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}