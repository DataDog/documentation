---
aliases:
- /ja/serverless/serverless_integrations
further_reading:
- link: /serverless/serverless_integrations/plugin/
  tag: Datadog サーバーレスプラグイン
  text: ドキュメント
- link: /serverless/serverless_integrations/macro/
  tag: ドキュメント
  text: Datadog のサーバーレスマクロ
- link: /serverless/serverless_integrations/cli/
  tag: ドキュメント
  text: Datadog サーバーレス CLI
kind: documentation
title: サーバーレスライブラリとインテグレーション
---

{{< whatsnext desc="サーバーレスライブラリとインテグレーション:" >}}
    {{< nextlink href="/serverless/libraries_integrations/extension/" >}}Datadog Lambda 拡張機能{{< /nextlink >}}
    {{< nextlink href="/serverless/libraries_integrations/library/" >}}Datadog Lambda ライブラリ{{< /nextlink >}}
    {{< nextlink href="/serverless/libraries_integrations/plugin/" >}}Datadog Lambda プラグイン{{< /nextlink >}}
    {{< nextlink href="/serverless/libraries_integrations/macro/" >}}Datadog Lambda マクロ{{< /nextlink >}}
    {{< nextlink href="/serverless/libraries_integrations/cli/" >}}Datadog Lambda CLI{{< /nextlink >}}
    {{< nextlink href="/serverless/libraries_integrations/lambda_code_signing/" >}}Lambda コード署名{{< /nextlink >}}
{{< /whatsnext >}}

## AWS Step Functions

[AWS Step Functions インテグレーション][1]を有効にすると、特定の関数が属するステートマシンを識別する Lambda メトリクスの追加タグを自動的に取得できます。これらのタグを使用して、[サーバーレスビュー][2]で Step Functions ごとの Lambda メトリクスとログの集計ビューを取得します。

1. [AWS Step Functions インテグレーション][1]をインストールします。
2. Lambda メトリクスにタグを追加するために、次のアクセス許可を [Datadog IAM ポリシー][3]に追加します。

    | AWS アクセス許可     | 説明                                  |
    | ------------------ | -------------------------------------------- |
    | `states:ListStateMachines`     | 有効な Step Functions を一覧表示します。   |
    | `states:DescribeStateMachine` | Step Function メタデータやタグを取得します。  |
3. AWS Step Functions の[分散型トレーシングとロギング][1]を構成します。
4. 完了したら、[Serverless Homepage][4] に移動し、Lambda 関数を `statemachinename`、`statemachinearn` または `stepname` でフィルタリングします。

{{< img src="serverless/step-function-trace.jpeg" alt="AWS Step Function Tracing" >}}

## Amazon EFS for Lambda

[Amazon EFS for Lambda][5]を有効にすると、特定の関数が属する EFS を識別する Lambda メトリクスの追加タグを自動的に取得できます。これらのタグを使用して、[サーバーレスビュー][6]で EFS ごとの Lambda メトリクスとログの集計ビューを取得します。

1. [Amazon EFS インテグレーション][7]をインストールします。
2. Lambda から EFS のメトリクスを収集するために、次のアクセス許可を [Datadog IAM ポリシー][3]に追加します。

    | AWS アクセス許可     | 説明                                  |
    | ------------------ | -------------------------------------------- |
    | `elasticfilesystem:DescribeAccessPoints`     | Lambda 関数に接続された有効な EFS を一覧表示します。 |

3. 完了したら、[サーバレスビュー][2]に移動し、Lambda 関数で新しい `filesystemid` タグを使用します。

{{< img src="integrations/amazon_lambda/efs_for_lambda.mp4" alt="Amazon EFS for Lambda" video=true >}}

## Lambda@Edge

`at_edge`、`edge_master_name`、`edge_master_arn` タグを使用し、エッジロケーションで実行中の Lambda 関数のメトリクスとロゴの集計ビューを取得します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/integrations/amazon_step_functions/
[2]: https://app.datadoghq.com/functions
[3]: /ja/integrations/amazon_web_services/#installation
[4]: /ja/serverless/serverless_integrations/macro/
[5]: /ja/integrations/amazon_efs/#amazon-efs-for-lambda
[6]: /ja/serverless/serverless_integrations/plugin/
[7]: /ja/integrations/amazon_efs/