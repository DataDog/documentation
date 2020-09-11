---
title: サーバーレスインテグレーション
kind: ドキュメント
---
以下の Lambda 関数インテグレーションは、サーバーレスアプリケーションを監視するためのさらなる機能を提供します。

## AWS Step Functions

[AWS Step Functions インテグレーション][1]を有効にすると、特定の関数が属するステートマシンを識別する Lambda メトリクスの追加タグを自動的に取得できます。これらのタグを使用して、[サーバーレスビュー][2]で Step Functions ごとの Lambda メトリクスとログの集計ビューを取得します。

1. [AWS Step Functions インテグレーション][1]をインストールします。
2. Lambda メトリクスにタグを追加するために、次のアクセス許可を [Datadog IAM ポリシー][3]に追加します。

    | AWS アクセス許可     | 説明                                  |
    | ------------------ | -------------------------------------------- |
    | `states:ListStateMachines`     | 有効な Step Functions を一覧表示します。   |
    | `states:DescribeStateMachine` | Step Function メタデータやタグを取得します。  |

## Amazon EFS for Lambda

[Amazon EFS for Lambda][4]を有効にすると、特定の関数が属する EFS を識別する Lambda メトリクスの追加タグを自動的に取得できます。これらのタグを使用して、[サーバーレスビュー][6]で EFS ごとの Lambda メトリクスとログの集計ビューを取得します。

1. [Amazon EFS インテグレーション][5]をインストールします。
2. Lambda から EFS のメトリクスを収集するために、次のアクセス許可を [Datadog IAM ポリシー][3]に追加します。

    | AWS アクセス許可     | 説明                                  |
    | ------------------ | -------------------------------------------- |
    | `elasticfilesystem:DescribeAccessPoints`     | Lambda 関数に接続された有効な EFS を一覧表示します。 |

3. 完了したら、[サーバレスビュー][2]に移動し、Lambda 関数で新しい `filesystemid` タグを使用します。

{{< img src="integrations/amazon_lambda/efs_for_lambda.gif" alt="Amazon EFS for Lambda" >}}

## Lambda@Edge

`at_edge`、`edge_master_name`、`edge_master_arn` タグを使用し、エッジロケーションで実行中の Lambda 関数のメトリクスとロゴの集計ビューを取得します。


[1]: /ja/integrations/amazon_step_functions/
[2]: https://app.datadoghq.com/functions
[3]: /ja/integrations/amazon_web_services/#installation
[4]: /ja/integrations/amazon_efs/#amazon-efs-for-lambda
[5]: /ja/integrations/amazon_efs/