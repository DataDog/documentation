---
aliases:
- /ja/integrations/awsxray/
categories:
- AWS
- クラウド
- トレーシング
dependencies: []
description: AWS サービス間で交わされるリクエストをトレース
doc_link: https://docs.datadoghq.com/integrations/amazon_xray/
draft: false
git_integration_title: amazon_xray
has_logo: true
integration_id: ''
integration_title: AWS X-Ray
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_xray
public_title: Datadog-AWS X-Ray インテグレーション
short_description: AWS サービス間で交わされるリクエストをトレース
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< site-region region="gov" >}}
<div class="alert alert-warning">Datadog AWS Lambda X-Ray インテグレーションは、商用 AWS アカウントでのみサポートされます。商用 Lambda アカウントがない場合、Datadog AWS Lambda X-Ray インテグレーションは Datadog for Government サイトではサポートされません。</div>

{{< /site-region >}}
## 概要

AWS X-Ray を使用すると、開発者は AWS 製品を使用して構築された分散アプリケーションをトレースできます。このインテグレーションは、[サーバーレス][1]関数詳細ページで Lambda 関数のトレースを提供します。詳細については、[サーバーレス監視][2]を参照してください。

## 計画と使用

### インフラストラクチャーリスト

最初に、[AWS インテグレーションを有効化][3]し、以下のアクセス許可が Datadog インテグレーションロールのポリシードキュメントに含まれていることを確認します。

```text
xray:BatchGetTraces,
xray:GetTraceSummaries
```

`GetTraceSummaries` アクセス許可は、最新のトレースのリストを取得するために使用されます。`BatchGetTraces` は、実際にトレース全体を返します。

次に、Datadog 内で [X-Ray インテグレーションを有効にします][4]。

[カスタマーマスターキー (CMK)][5] を使用してトレースを暗号化している場合は、X-Ray に使用される CMK がリソースとなっているポリシーに `kms:Decrypt` メソッドを追加してください。

**注:** AWS X-Ray インテグレーションを有効にすると、請求に影響する可能性のある Indexed Spans の量が増加します。

### 関数の AWS X-Ray を有効化する

1. AWS の指示に従い、[Lambda 関数][6]と [API Gateway][7] で X-Ray トレースを有効にしてください。
2. AWS X-Ray とのインテグレーションを最大限に活用するために、Lambda 関数に [X-Ray SDK をインストール][8]します。

### Datadog による X-Ray トレースのリッチ化

Datadog は、Datadog APM クライアントが生成したスパンやメタデータで X-Ray トレースをリッチ化し、同じ Lambda 呼び出しに対して 1 つの Datadog トレースに[マージ][9]することが可能です。

1. Lambda 関数に[Datadog サーバーレスモニタリングをインストール][10]します。
2. Lambda 関数で環境変数 `DD_MERGE_XRAY_TRACES` を `true` に設定します。

## リアルユーザーモニタリング

AWS X-Ray インテグレーションは、AWS からトレースデータを取得しますが、メトリクスやログは収集しません。

[1]: http://app.datadoghq.com/functions
[2]: https://docs.datadoghq.com/ja/serverless/
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[4]: https://app.datadoghq.com/integrations/amazon-xray
[5]: https://docs.aws.amazon.com/whitepapers/latest/kms-best-practices/customer-master-keys.html
[6]: https://docs.aws.amazon.com/lambda/latest/dg/services-xray.html
[7]: https://docs.aws.amazon.com/xray/latest/devguide/xray-services-apigateway.html
[8]: https://docs.aws.amazon.com/xray/latest/devguide/xray-instrumenting-your-app.html#xray-instrumenting-xray-sdk
[9]: https://docs.datadoghq.com/ja/serverless/distributed_tracing/serverless_trace_merging
[10]: https://docs.datadoghq.com/ja/serverless/installation