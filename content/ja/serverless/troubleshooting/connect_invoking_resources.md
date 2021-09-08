---
title: Lambda 関数を呼び出すリソースのより深い可視化
kind: documentation
---
{{< img src="serverless/serverless-view.png" alt="サーバーレスビュー" >}}

デフォルトで、サーバーレスビューではサービス別にサーバーレスリソースがグループ化され、アプリケーションの各部のパフォーマンスを簡単に視覚化できます。各サービスに属する関数と、それを呼び出すリソース (Amazon API Gateway、SNS、SQS、DynamoDB、S3、EventBridge、Kinesis) を確認できます。

デフォルトのサービス別の他、AWS CloudFormation スタック名、および構成した別のタグ (チーム、プロジェクト、環境など) でリソースをグループ化することも可能です。

## セットアップ

Lambda 関数を初めてインスツルメントする場合は、[サーバーレスインストール手順][1]に従います。

以下のすべてに当てはまる場合、マネージドリソースは自動的に AWS Lambda 関数に接続されます。
- 関数が Node.js または Python Lambda ランタイムで記述されている。
- [APM と Datadog の X-Ray インテグレーション][2]が関数に構成されていて、[構成済みの Datadog Lambda Library が AWS X-Ray セグメントを強化][3]している、**または** [APM と Datadog のトレーシングライブラリ][2] (`dd-trace`) が関数に構成されている。
- 関数を呼び出すマネージドリソースが、以下のいずれかである: API Gateway、SQS、SNS、EventBridge、Kinesis、DynamoDB、S3
- 関数が Datadog Lambda Library の最近のバージョン (Node の場合 `v3.46.0` 以降、Python の場合は `v28` 以降) でインスツルメントされている。

[1]: /ja/serverless/installation
[2]: /ja/serverless/distributed_tracing#choose-your-tracing-library
[3]: /ja/integrations/amazon_xray/#enriching-xray-segments-with-datadog-libraries