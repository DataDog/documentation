---
further_reading:
- link: /serverless/configuration/
  tag: ドキュメント
  text: サーバーレスモニタリングの構成
- link: /integrations/amazon_lambda/
  tag: ドキュメント
  text: AWS Lambda インテグレーション
title: AWS Step Functions のサーバーレスモニタリングのインストール
---

### 要件
* Step Function の実行時間は、フルトレースで 15 分未満でなければなりません。
* リンクされた Lambda トレースは、Node.js (レイヤー v94+) と Python (レイヤー v75+) のランタイムでサポートされています。

### セットアップ

{{< tabs >}}
{{% tab "Serverless Framework" %}}

[Serverless Framework][4] を使用してサーバーレスアプリケーションをデプロイする開発者には、Datadog Serverless Framework Plugin を使用します。

1. まだインストールしていない場合は、[Datadog Serverless Framework Plugin][1] v5.40.0+ をインストールします。

    ```shell
    serverless plugin install --name serverless-plugin-datadog
    ```

2. AWS から Datadog にログを転送する Lambda 関数の [Datadog Lambda Forwarder][2] をデプロイし、v3.74.0+ を使用していることを確認してください。[Forwarder を更新][5]する必要があるかもしれません。

   Forwarder の ARN をメモしてください。

3. 以下を `serverless.yml` に追加します。

    ```yaml
    custom:
      datadog:
        site: <DATADOG_SITE>
        apiKeySecretArn: <DATADOG_API_KEY_SECRET_ARN>
        forwarderArn: <FORWARDER_ARN>
        enableStepFunctionsTracing: true
    ```
    - `<DATADOG_SITE>` を {{< region-param key="dd_site" code="true" >}} に置き換えます。(右側で正しい SITE が選択されていることを確認してください)。
    - `<DATADOG_API_KEY_SECRET_ARN>` を、[Datadog API キー][3]が安全に保存されている AWS シークレットの ARN に置き換えます。キーはプレーンテキスト文字列として保存する必要があります (JSON blob ではありません)。また、`secretsmanager:GetSecretValue`権限が必要です。迅速なテストのために、代わりに `apiKey` を使用して、Datadog API キーをプレーンテキストで設定することができます。
    - `<FORWARDER_ARN>` は、前述のように Datadog Lambda Forwarder の ARN に置き換えます。

    その他の設定については、[Datadog Serverless Framework Plugin - 構成パラメーター][7]を参照してください。

4. Node.js と Python のランタイムでは、`serverless.yaml` ファイルで `mergeStepFunctionAndLambdaTraces:true` を設定します。これにより、Step Function のトレースと Lambda のトレースがリンクされます。Lambda 関数をインスツルメンテーションしてトレースを送信していない場合は、[お好みのランタイム用の Lambda レイヤーを追加する手順に従ってください][8]。

[1]: https://docs.datadoghq.com/ja/serverless/libraries_integrations/plugin/
[2]: /ja/logs/guide/forwarder/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://www.serverless.com/
[5]: /ja/logs/guide/forwarder/?tab=cloudformation#upgrade-to-a-new-version
[6]: logs/guide/forwarder/?tab=cloudformation#installation
[7]: serverless/libraries_integrations/plugin/#configuration-parameters
[8]: /ja/serverless/installation/#installation-instructions
{{% /tab %}}
{{% tab "Datadog CLI" %}}
1. まだインストールしていない場合は、[Datadog CLI][1] v2.18.0+ をインストールします。

   ```shell
   npm install -g @datadog/datadog-ci
   ```
2. AWS から Datadog にログを転送する Lambda 関数の [Datadog Lambda Forwarder][2] をデプロイし、v3.74.0+ を使用していることを確認してください。[Forwarder を更新][3]する必要があるかもしれません。

   Forwarder の ARN をメモしてください。
3. Step Function をインスツルメンテーションします。

   ```shell
   datadog-ci stepfunctions instrument --step-function <STEP_FUNCTION_ARN> --forwarder <FORWARDER_ARN>
   ```
   - `<STEP_FUNCTION_ARN>` を Step Function の ARN に置き換えます。
   - `<FORWARDER_ARN>` は、前述のように Datadog Lambda Forwarder の ARN に置き換えます。

   `datadog-ci stepfunctions` コマンドの詳細については、[Datadog CLI ドキュメント][5]を参照してください。

4. Node.js と Python のランタイムでは、datadog-ci コマンドにフラグ `--merge-step-function-and-lambda-traces` を追加します。これにより、Step Function のトレースと Lambda のトレースがリンクされます。まだ Lambda 関数をインスツルメンテーションしてトレースを送信していない場合は、[お好みのランタイム用の Lambda レイヤーを追加する手順に従ってください][6]。

[1]: /ja/serverless/libraries_integrations/cli/
[2]: /ja/logs/guide/forwarder/
[3]: /ja/logs/guide/forwarder/?tab=cloudformation#upgrade-to-a-new-version
[4]: logs/guide/forwarder/?tab=cloudformation#installation
[5]: https://github.com/DataDog/datadog-ci/blob/master/src/commands/stepfunctions/README.md
[6]: /ja/serverless/installation/#installation-instructions
{{% /tab %}}
{{% tab "Custom" %}}

1. Step Function のすべてのログを有効にします。AWS コンソールで、ステートマシンを開きます。*Edit* をクリックし、Logging セクションを見つけます。そこで、*Log level* を `ALL` に設定し、*Include execution data* チェックボックスを有効にします。
   {{< img src="serverless/step_functions/aws_log.png" alt="AWS の UI、ログセクション、ログレベルが ALL に設定されています。" style="width:100%;" >}}

2. AWS から Datadog にログを転送する Lambda 関数の [Datadog Lambda Forwarder][1] をデプロイし、v3.74.0+ を使用していることを確認してください。[Forwarder を更新][2]する必要があるかもしれません。

   Forwarder の ARN をメモしてください。

3. CloudWatch のログを Datadog Lambda Forwarder にサブスクライブします。これには 2 つのオプションがあります。
   - **Datadog-AWS インテグレーション** (推奨)
     1. [Datadog-AWS インテグレーション][4]が設定されていることを確認します。
     2. Datadog で [AWS インテグレーションタイル][5]を開き、* Configuration* タブを表示します。
     3. 左側で、Step Function が実行されている AWS アカウントを選択します。*Log Collection* タブを開きます。
     4. *Log Autosubscription* セクションの *Autosubscribe Forwarder Lambda Functions* に、前述のように Datadog Lambda Forwarder の ARN を入力します。*Add* をクリックします。
     5. *Step Functions CloudWatch Logs* をトグルします。変更が有効になるまで 15 分かかります。

     **注**: Log Autosubscription では、Lambda Forwarder と Step Function が同じリージョンにある必要があります。

   - **手動**
     1. ロググループ名のプレフィックスが `/aws/vendedlogs/states` であることを確認してください。
     2. AWS コンソールを開き、Datadog Lambda Forwarder に移動します。*Function overview* セクションで、*Add trigger* をクリックします。
     3. *Add trigger* で、*Trigger configuration* セクションで、*Select a source* ドロップダウンを使用して、`CloudWatch Logs` を選択します。
     4. *Log group* で、ステートマシンのロググループを選択します。例: `/aws/vendedlogs/states/my-state-machine`
     5. フィルター名を入力します。"empty filter" という名前を選択し、*Filter pattern* ボックスを空白のままにすることもできます。

<div class="alert alert-warning">Serverless Framework や datadog-ci などの異なるインスツルメンテーション方法を使用している場合、自動サブスクリプションを有効にするとログが重複して作成される可能性があります。この動作を避けるために、1 つの構成方法を選択してください。</a></div>


4. `DD_TRACE_ENABLED` タグを追加して、Step Function のトレースを有効にします。値を `true` に設定します。
5. タグを設定します。AWS コンソールを開き、Step Function のステートマシンに移動します。*Tags* セクションを開き、`env:<ENV_NAME>` タグと `service:<SERVICE_NAME>` タグを追加します。`env` タグは Datadog でトレースを見るために必要で、デフォルトは `dev` です。`service` タグのデフォルトはステートマシンの名前です。
6. Node.js と Python のランタイムでは、Step Function のトレースを Lambda のトレースにリンクすることができます。Lambda Task で `Parameters` キーを以下のように設定します。

   ```json
   "Parameters": {
     "Payload.$": "States.JsonMerge($$, $, false)",
     ...
   }
   ```

   `JsonMerge` [組み込み関数][6]は [Step 関数コンテキストオブジェクト][7] (`$$`) と元の Lambda の入力ペイロード (`$`) をマージします。元のペイロードのフィールドは、キーが同じ場合、Step Functions コンテキストオブジェクトを上書きします。

**例**:

{{< highlight json "hl_lines=4-7" >}}
"Lambda Read From DynamoDB": {
      "Type": "Task",
      "Resource": "arn:aws:states:::lambda:invoke",
      "Parameters": {
        "Payload.$": "States.JsonMerge($$, $, false)",
        "FunctionName": "${lambdaArn}"
      },
      "End": true
    }
{{< /highlight >}}

また、ペイロードにビジネスロジックが定義されている場合は、以下のようにすることもできます。

{{< highlight json "hl_lines=8-10" >}}
"Lambda Read From DynamoDB": {
      "Type": "Task",
      "Resource": "arn:aws:states:::lambda:invoke",
      "Parameters": {
        "Payload": {
          ...
          "Execution.$": "$$.Execution",
          "State.$": "$$.State",
          "StateMachine.$": "$$.StateMachine"
        },
        "FunctionName": "${lambdaArn}"
      },
      "End": true
    }
{{< /highlight >}}

Lambda 関数をインスツルメンテーションしてトレースを送信していない場合は、[お好みのランタイム用の Lambda レイヤーを追加する手順に従ってください][3]。

[1]: /ja/logs/guide/forwarder/
[2]: /ja/logs/guide/forwarder/?tab=cloudformation#upgrade-to-a-new-version
[3]: /ja/logs/guide/forwarder/?tab=cloudformation#installation
[4]: /ja/getting_started/integrations/aws/
[5]: https://app.datadoghq.com/integrations/aws
[6]: https://docs.aws.amazon.com/step-functions/latest/dg/amazon-states-language-intrinsic-functions.html#asl-intrsc-func-json-manipulate
[7]: https://docs.aws.amazon.com/step-functions/latest/dg/input-output-contextobject.html
{{% /tab %}}
{{< /tabs >}}



## Step Function のメトリクス、ログ、トレースを Datadog で確認する

ステートマシンを起動したら、Datadog の [**Serverless app**][2] にアクセスします。`service:<YOUR_STATE_MACHINE_NAME>` を検索すると、そのステートマシンに関連するメトリクス、ログ、トレースが表示されます。ステートマシンの `service` タグをカスタム値に設定した場合は、`service:<CUSTOM_VALUE>` で検索します。

{{< img src="serverless/step_functions/overview1.png" alt="AWS Step Functions のサイドパネルビュー。" style="width:100%;" >}}

トレースが表示されない場合は、[トラブルシューティング][5]を参照してください。

[2]: https://app.datadoghq.com/functions?search=&cloud=aws&entity_view=step_functions
[3]: /ja/serverless/installation/#installation-instructions
[5]: /ja/serverless/step_functions/troubleshooting