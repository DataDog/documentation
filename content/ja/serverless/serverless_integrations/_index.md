---
title: サーバーレスインテグレーション
kind: ドキュメント
further_reading:
  - link: /serverless/serverless_integrations/plugin/
    tag: Datadog サーバーレスプラグイン
    text: Documentation
  - link: /serverless/serverless_integrations/macro/
    tag: Documentation
    text: Datadog のサーバーレスマクロ
  - link: /serverless/serverless_integrations/cli/
    tag: Documentation
    text: Datadog サーバーレス CLI
---
## Datadog サーバーレスプラグイン

Datadog サーバーレスフレームワークプラグインは、Datadog Lambda ライブラリを Python および Node.js サーバーレスアプリケーションに自動的にインストールし、Lambda 関数から拡張 Lambda メトリクス、カスタムメトリクス、トレース、およびログを収集できるようにします。詳しくは、[プラグインページ][1]をご覧ください。

## Datadog のサーバーレスマクロ

AWS CloudFormation の Datadog Serverless マクロは、Datadog Lambda ライブラリを AWS CloudFormation、SAM または CDK を使用してデプロイされた Python および Node.js サーバーレスアプリケーションに自動的にインストールし、Lambda 関数から拡張 Lambda メトリクス、カスタムメトリクス、トレース、およびログを収集できるようにします。詳しくは、[マクロページ][2]をご覧ください。

## Datadog サーバーレス CLI

Datadog サーバーレス CLI を使用すると、コマンドラインまたは CI/CD パイプラインからサーバーレスアプリケーションのインスツルメンテーションをセットアップできます。CLI は、Datadog Lambda ライブラリを Python および Node.js サーバーレスアプリケーションに自動的にインストールし、Lambda 関数から拡張 Lambda メトリクス、カスタムメトリクス、トレース、およびログを収集できるようにします。詳しくは、[CLI ページ][3]をご覧ください。

## AWS Step Functions

[AWS Step Functions インテグレーション][4]を有効にすると、特定の関数が属するステートマシンを識別する Lambda メトリクスの追加タグを自動的に取得できます。これらのタグを使用して、[サーバーレスビュー][5]で Step Functions ごとの Lambda メトリクスとログの集計ビューを取得します。

1. [AWS Step Functions インテグレーション][4]をインストールします。
2. Lambda メトリクスにタグを追加するために、次のアクセス許可を [Datadog IAM ポリシー][6]に追加します。

    | AWS アクセス許可     | 説明                                  |
    | ------------------ | -------------------------------------------- |
    | `states:ListStateMachines`     | 有効な Step Functions を一覧表示します。   |
    | `states:DescribeStateMachine` | Step Function メタデータやタグを取得します。  |
3. AWS Step Functions の[分散型トレーシングとロギング][4]を構成します。
4. 完了したら、[Serverless Homepage][2] に移動し、Lambda 関数を `statemachinename`、`statemachinearn` または `stepname` でフィルタリングします。

{{< img src="serverless/step-function-trace.jpeg" alt="AWS Step Function Tracing" >}}

## Amazon EFS for Lambda

[Amazon EFS for Lambda][7]を有効にすると、特定の関数が属する EFS を識別する Lambda メトリクスの追加タグを自動的に取得できます。これらのタグを使用して、[サーバーレスビュー][1]で EFS ごとの Lambda メトリクスとログの集計ビューを取得します。

1. [Amazon EFS インテグレーション][8]をインストールします。
2. Lambda から EFS のメトリクスを収集するために、次のアクセス許可を [Datadog IAM ポリシー][6]に追加します。

    | AWS アクセス許可     | 説明                                  |
    | ------------------ | -------------------------------------------- |
    | `elasticfilesystem:DescribeAccessPoints`     | Lambda 関数に接続された有効な EFS を一覧表示します。 |

3. 完了したら、[サーバレスビュー][5]に移動し、Lambda 関数で新しい `filesystemid` タグを使用します。

{{< img src="integrations/amazon_lambda/efs_for_lambda.gif" alt="Amazon EFS for Lambda" >}}

## Lambda@Edge

`at_edge`、`edge_master_name`、`edge_master_arn` タグを使用し、エッジロケーションで実行中の Lambda 関数のメトリクスとロゴの集計ビューを取得します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/serverless/serverless_integrations/plugin/
[2]: /ja/serverless/serverless_integrations/macro/
[3]: /ja/serverless/serverless_integrations/cli/
[4]: /ja/integrations/amazon_step_functions/
[5]: https://app.datadoghq.com/functions
[6]: /ja/integrations/amazon_web_services/#installation
[7]: /ja/integrations/amazon_efs/#amazon-efs-for-lambda
[8]: /ja/integrations/amazon_efs/