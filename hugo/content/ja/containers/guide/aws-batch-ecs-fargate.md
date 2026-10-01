---
aliases:
- /ja/integrations/faq/aws-batch-ecs-fargate
- /ja/agent/guide/aws-batch-ecs-fargate-datadog-agent
description: ECS Fargate で実行される AWS Batch ジョブと並行して Datadog Agent をデプロイし、包括的なモニタリングを実現します
further_reading:
- link: integrations/ecs_fargate/?tab=webui#aws-batch-on-ecs-fargate
  tag: ドキュメント
  text: AWS Fargate 上の Amazon ECS と AWS Batch
- link: https://www.datadoghq.com/architecture/using-datadog-with-ecs-fargate/
  tag: Architecture Center
  text: ECS Fargate での Datadog の使用
title: ECS Fargate を使用した AWS Batch と Datadog Agent
---
ジョブ定義にコンテナを追加することで、AWS Batch ジョブコンテナと並行して Datadog Agent を実行することができます。

## 前提条件{#prerequisites}

* AWS Batch コンピューティング環境
* AWS コンピューティング環境と関連付けられた AWS Batch ジョブキュー

## ジョブ定義を作成する{#create-the-job-definition}

{{< tabs >}}
{{% tab "AWS Web UI" %}}

1. [AWS Web コンソール][1]にログインし、AWS Batch のセクションに移動します。
2. 左メニューの [{{< ui >}}Job Definitions{{< /ui >}}] をクリックし、{{< ui >}}Create{{< /ui >}} ボタンをクリックするか、既存の AWS Batch ジョブ定義を選択します。
3. 新しいジョブ定義の場合:
    1. オーケストレーションタイプとして [{{< ui >}}Fargate{{< /ui >}}] を選択します。
    2. [{{< ui >}}Use legacy containerProperties structure{{< /ui >}}] オプションの選択を解除します。
    3. [{{< ui >}}Job Definition Name{{< /ui >}}] を入力します (例: `my-app-and-datadog`)。
    4. 実行 IAM ロールを選択します。権限の要件については、後述の「[IAM ポリシーを作成または変更する](#create-or-modify-your-iam-policy)」セクションを参照してください。
    5. アウトバウンドネットワークアクセスを許可するために [{{< ui >}}Assign public IP{{< /ui >}}] を有効にし、{{< ui >}}Next{{< /ui >}} ボタンをクリックします。
    6. Datadog Agent コンテナを設定します。
        1. [{{< ui >}}Container name{{< /ui >}}] に `datadog-agent` と入力します。
        2. [{{< ui >}}Image{{< /ui >}}] に `public.ecr.aws/datadog/agent:latest` と入力します。
        3. 必要性に応じて、{{< ui >}}CPU{{< /ui >}} と {{< ui >}}Memory{{< /ui >}} のリソース要件を設定します。
        4. [{{< ui >}}Env Variables{{< /ui >}}] で、{{< ui >}}Key{{< /ui >}} `DD_API_KEY` を追加し、値として [Datadog API キー][2]を入力します。
        5. {{< ui >}}Key{{< /ui >}} `ECS_FARGATE` と値 `true` を使用して、別の環境変数を追加します。[{{< ui >}}Add{{< /ui >}}] をクリックして、コンテナを追加します。
        6. {{< ui >}}Key{{< /ui >}} `DD_SITE` と値 {{< region-param key="dd_site" code="true" >}}を使用して、別の環境変数を追加します。設定しない場合、これはデフォルトで `datadoghq.com` になります。
    7. ジョブ定義に他のアプリケーションコンテナを追加します。
    8. AWS Batch は [Fluent Bit および Firelens][3] をサポートしています。Datadog でアプリケーションコンテナのログ収集を有効にするには、以下を行います。
       1. ジョブ定義内に、ログルーター用のコンテナを別途作成します。
       2. そのコンテナのイメージに `amazon/aws-for-fluent-bit:stable"` を設定します。
       3. Firelens 構成セクションで、以下のように設定します。
          - [{{< ui >}}Type{{< /ui >}}] を `fluentbit` に設定します。
          - [{{< ui >}}Options{{< /ui >}}] に、[{{< ui >}}Name{{< /ui >}}] と [{{< ui >}}Value{{< /ui >}}] を含め、`enable-ecs-log-metadata` と `true` をそれぞれに設定します。
       4. アプリケーションコンテナのログ構成セクションで、以下のように設定します。
          - [{{< ui >}}Log Driver{{< /ui >}}] を `awsfirelens` に設定します。
          - [ECS Fargate Fluent Bit および Firelens セクション][4]のステップ 2 と同様に、{{< ui >}}Options{{< /ui >}} を設定し、以下の {{< ui >}}Name{{< /ui >}} と {{< ui >}}Value{{< /ui >}} を含めます。
    10. [{{< ui >}}Create job definition{{< /ui >}}] をクリックして、ジョブ定義を作成します。

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://aws.amazon.com/about-aws/whats-new/2025/04/aws-batch-amazon-elastic-container-service-exec-firelens-log-router/
[4]: https://docs.datadoghq.com/ja/integrations/ecs_fargate/?tab=webui#fluent-bit-and-firelens

{{% /tab %}}
{{% tab "AWS CLI" %}}

1. [datadog-agent-aws-batch-ecs-fargate.json][1] をダウンロードします。

   **注**: Internet Explorer を使用している場合、ファイルが gzip 形式でダウンロードされることがありますが、その中に以下の JSON ファイルが含まれています。
2. `JOB_DEFINITION_NAME`、[Datadog API キー][2]、および適切な `DD_SITE` ({{< region-param key="dd_site" code="true" >}}) を指定して JSON を更新します。

   **注**: 環境変数 `ECS_FARGATE` は既に `"true"` に設定されています。
3. ジョブ定義に他のアプリケーションコンテナを追加します。
4. AWS Batch は [Fluent Bit および Firelens][3] をサポートしています。Datadog でアプリケーションコンテナのログ収集を有効にするには、以下を行います。
   - JSON ファイルの `containers` セクションに、`log_router` コンテナを次のように追加します。
     ```json
      {
          "name": "log_router",
          "image": "amazon/aws-for-fluent-bit:stable",
          "essential": true,
          "firelensConfiguration": {
              "type": "fluentbit",
              "options": {
                  "enable-ecs-log-metadata": "true"
              }
          },
          "resourceRequirements": [
              {
                  "value": "0.25",
                  "type": "VCPU"
              },
              {
                  "value": "512",
                  "type": "MEMORY"
              }
          ]
      }
     ```
   - アプリケーションコンテナに、[ECS Fargate Fluent Bit および Firelens セクション][4]のステップ 2 と同様に、適切な `logConfiguration` オプションを追加します。
5. 次のコマンドを実行してジョブ定義を登録します。

   ```bash
   aws batch register-job-definition --cli-input-json file://<PATH_TO_FILE>/datadog-agent-aws-batch-ecs-fargate.json
   ```

[1]: https://docs.datadoghq.com/ja/resources/json/datadog-agent-aws-batch-ecs-fargate.json
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://aws.amazon.com/about-aws/whats-new/2025/04/aws-batch-amazon-elastic-container-service-exec-firelens-log-router/
[4]: https://docs.datadoghq.com/ja/integrations/ecs_fargate/?tab=webui#fluent-bit-and-firelens
{{% /tab %}}
{{< /tabs >}}

## AWS Batch ジョブを送信する{#submit-the-aws-batch-job}

{{< tabs >}}
{{% tab "AWS Web UI" %}}

1. [AWS Web コンソール][1]にログインし、AWS Batch のセクションに移動します。必要に応じて、[コンピューティング環境][2]および/またはコンピューティング環境に関連付けられた[ジョブキュー][3]を作成します。
2. [{{< ui >}}Jobs{{< /ui >}}] タブで、{{< ui >}}Submit new job{{< /ui >}} ボタンをクリックします。
3. [{{< ui >}}Job name{{< /ui >}}] を入力します。
4. [{{< ui >}}Job Definition{{< /ui >}}] には、前のステップで作成したジョブ定義を選択します。
5. Datadog Agent を実行するジョブキューを選択します。
6. {{< ui >}}Container overrides{{< /ui >}}は、必要に応じて設定します。
7. {{< ui >}}Next{{< /ui >}} ボタンをクリックし、{{< ui >}}Create job{{< /ui >}} ボタンをクリックします。

[1]: https://aws.amazon.com/console
[2]: https://docs.aws.amazon.com/batch/latest/userguide/create-compute-environment.html
[3]: https://docs.aws.amazon.com/batch/latest/userguide/create-job-queue-fargate.html

{{% /tab %}}
{{% tab "AWS CLI" %}}

1. ジョブ定義のジョブを送信するには、次のコマンドを実行します。

```bash
aws batch submit-job --job-name <JOB_NAME> \
--job-queue <JOB_QUEUE_NAME> \
--job-definition <JOB_DEFINITION_NAME>:1
```

{{% /tab %}}
{{< /tabs >}}

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}