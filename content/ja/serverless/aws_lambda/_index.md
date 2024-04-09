---
further_reading:
- link: /serverless/configuration/
  tag: ドキュメント
  text: サーバーレスモニタリングの構成
- link: /integrations/amazon_lambda/
  tag: ドキュメント
  text: AWS Lambda インテグレーション
- link: https://www.datadoghq.com/blog/monitoring-lambda-containers/
  tag: ブログ
  text: コンテナイメージを使用してデプロイされた AWS Lambda 関数を監視する
- link: https://www.datadoghq.com/blog/manage-serverless-logs-datadog/
  tag: ブログ
  text: サーバーレスログを収集、管理するためのベストプラクティス
- link: https://www.datadoghq.com/blog/aws-serverless-application-design/
  tag: ブログ
  text: 実稼働準備が整った AWS サーバーレスアプリケーションの設計
- link: https://www.datadoghq.com/blog/well-architected-serverless-applications-best-practices/
  tag: ブログ
  text: AWS の Well-Architected フレームワークに従うサーバーレスアプリケーション構築のためのベストプラクティス
- link: https://www.datadoghq.com/blog/aws-lambda-functions-ephemeral-storage-monitoring/
  tag: ブログ
  text: AWS Lambda 関数のエフェメラルストレージ使用量を監視。
- link: https://www.datadoghq.com/blog/serverless-cold-start-traces/
  tag: ブログ
  text: コールドスタートトレーシングでサーバーレス関数のパフォーマンスを把握する
kind: documentation
title: AWS Lambda のためのサーバーレスモニタリング
---

Datadog の AWS Lambda のためのサーバーレスモニタリングは、Lambda 関数を可視化します。

まずは、[インストール手順][1]に従って、サーバーレスアプリケーションからメトリクス、トレース、ログを収集します。

## 仕組み

{{< img src="serverless/serverless_custom_metrics.png" alt="AWS Lambda からの拡張メトリクスの収集" >}}

Datadog のサーバーレスモニタリングは、Datadog Lambda 拡張機能とともにランタイム固有の Datadog Lambda ライブラリを活用し、Lambda 関数からテレメトリーを送信します。

Datadog Lambda 拡張機能は、Datadog Lambda ライブラリからのトレース、拡張メトリクス、カスタムメトリクスに加え、CloudWatch を通じてログを収集します。

## 使用

以下のページでは、AWS Lambda のためのサーバーレスモニタリングのインストール方法と構成方法について、完全な可視化を実現するためのメトリクス、トレース、およびログの使用方法を含めて説明します。

{{< whatsnext desc=" ">}}
    {{< nextlink href="/serverless/installation" >}}<u>インストール</u>: AWS Lambda のためのサーバーレスモニタリングをインストールします。{{< /nextlink >}}
    {{< nextlink href="/serverless/enhanced_lambda_metrics" >}}<u>Lambda メトリクス</u>: 拡張メトリクスの詳細とカスタムメトリクスの送信方法を説明します。{{< /nextlink >}}
    {{< nextlink href="/serverless/distributed_tracing" >}}<u>分散型トレーシング</u>: APM と分散型トレーシングを使用して、アプリケーションのパフォーマンスに関する豊富な情報を入手できます。{{< /nextlink >}}
    {{< nextlink href="/serverless/aws_lambda/logs" >}}
    <u>ログ収集</u>: ログの収集、ログのフィルタリング方法、ログとトレースの関連付け方法を説明します。{{< /nextlink >}}
{{< /whatsnext >}}

### サーバーレスビューでサーバーレススタック全体を監視

サーバーレスビューを使用すると、AWS リソースからの高レベルメトリクスを Lambda 関数と関連付けられるため、問題をすばやく発見し調査を開始することができます。

デフォルトで、サーバーレスビューではサービス別にサーバーレスリソースがグループ化され、アプリケーションの各部のパフォーマンスを視覚化できます。各サービスに属する関数と、それを呼び出すリソース (Amazon API Gateway、SNS、SQS、DynamoDB、S3、EventBridge、Kinesis) を確認できます。

{{< img src="serverless/serverless-view-hero.jpeg" alt="Datadog サーバーレスモニタリング" style="width:100%;" >}}

### 呼び出しペイロードを監視することで、AWS Lambda 関数の障害を迅速に解決する

Datadog で自動的に関数リクエストが収集されてすべての関数呼び出しに応答し、問題のトラブルシューティングに役立つ重要な情報が提供されます。たとえば、ある Lambda 関数に障害が発生しているという通知を受けた場合、関連するリクエストのペイロードを分析し、不足しているパラメーター、リソースアドレスの入力間違い、または障害の背後にある構成ミスなどをチェックすることができます。

失敗したリクエストの構成ミスを特定することで、開発環境で問題を容易に再生し、バグ修正を確認するためのテストを実行できます。

{{< img src="serverless/lambda_payload_hero.jpeg" alt="Datadog サーバーレスモニタリング" style="width:100%;" >}}

### Lambda 関数環境全体で問題をアラートするリアルタイムメトリクス

Datadog の高度な Lambda メトリクスは、Datadog で `aws.lambda.enhanced` のプレフィックスで表示され、秒単位の粒度で、ほぼリアルタイムで利用できます。高度な Lambda メトリクスは、すべての Lambda 関数におけるコールドスタート、推定 AWS コスト、タイムアウト、メモリ不足エラー、そしてメモリ使用量に関するアラートや SLO に使用できます。これにより、サーバーレス環境で発生するパフォーマンスの問題を確認し、直ちにトラブルシューティングすることが可能になります。

{{< img src="serverless/serverless_enhanced_metrics.jpeg" alt="Datadog サーバーレスモニタリング" style="width:100%;" >}}

### デプロイメント追跡でサーバーレスコンフィギュレーションの変更を監視

サーバーレスコード、コンフィギュレーション、そしてデプロイメントの変更をメトリクス、トレース、そして関数からのログと容易に関連付け、リアルタイムのインサイトによりこのような変更がアプリケーションの正常性やパフォーマンスに与える影響を確認できます。

{{< img src="serverless/serverless_deployment_tracking.jpeg" alt="Datadog サーバーレスモニタリング" style="width:100%;" >}}

## その他の機能

{{< whatsnext desc=" ">}}
    {{< nextlink href="/serverless/aws_lambda/profiling" >}}<u>Continuous Profiler</u>: Datadog の Continuous Profiler を有効にすると、ボトルネックの原因となっている Lambda 関数のコードの行を正確に発見できます。{{< /nextlink >}}
    {{< nextlink href="/serverless/aws_lambda/securing_functions" >}}<u>セキュリティ機能</u>: Application Security Management (ASM) を使用して、関数に対する脅威を管理します。{{< /nextlink >}}
    {{< nextlink href="/serverless/deployment_tracking" >}}<u>デプロイ追跡</u>: デプロイを追跡して、コードの新バージョンや構成の変更がいつ劣化を引き起こしているかを確認します。{{< /nextlink >}}
{{< /whatsnext >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/serverless/installation