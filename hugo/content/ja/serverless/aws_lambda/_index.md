---
aliases:
- /ja/serverless/aws
further_reading:
- link: /serverless/configuration/
  tag: ドキュメント
  text: Serverless Monitoring を設定する
- link: /integrations/amazon_lambda/
  tag: ドキュメント
  text: AWS Lambda 統合
- link: /serverless/guide/disable_serverless
  tag: ドキュメント
  text: Serverless Monitoring を無効にする
- link: /opentelemetry/setup/otlp_ingest/serverless/?tab=aws#lambda
  tag: ドキュメント
  text: OTLP を使用して AWS Lambda トレースを Datadog に送信する
- link: https://www.datadoghq.com/blog/monitoring-lambda-containers/
  tag: ブログ
  text: コンテナイメージを使用してデプロイされた AWS Lambda 関数を監視する
- link: https://www.datadoghq.com/blog/manage-serverless-logs-datadog/
  tag: ブログ
  text: サーバーレスログの収集と管理に関するベストプラクティス
- link: https://www.datadoghq.com/blog/aws-serverless-application-design/
  tag: ブログ
  text: 本番環境に対応した AWS サーバーレスアプリケーションの設計
- link: https://www.datadoghq.com/blog/well-architected-serverless-applications-best-practices/
  tag: ブログ
  text: AWS Well-Architected Framework に準拠したサーバーレスアプリケーション構築のベストプラクティス
- link: https://www.datadoghq.com/blog/aws-lambda-functions-ephemeral-storage-monitoring/
  tag: ブログ
  text: AWS Lambda 関数のエフェメラルストレージ使用量を監視する
- link: https://www.datadoghq.com/blog/serverless-cold-start-traces/
  tag: ブログ
  text: コールドスタートトレーシングでサーバーレス関数のパフォーマンスを把握する
- link: https://www.datadoghq.com/blog/identifying-deprecated-lambda-functions/
  tag: ブログ
  text: Datadog を使用して非推奨の Lambda 関数を特定する
- link: https://www.datadoghq.com/blog/monitoring-lwa-with-datadog/
  tag: ブログ
  text: Lambda Web Adapter との統合により、Lambda でホストされた Web アプリを監視する
- link: https://www.datadoghq.com/blog/lambda-managed-instances
  tag: ブログ
  text: Datadog で AWS Lambda マネージドインスタンスを監視する
- link: https://learn.datadoghq.com/courses/visibility-aws-lambda
  tag: ラーニングセンター
  text: Datadog を使用した Serverless Monitoring 用に AWS Lambda を設定する
title: AWS Lambda 向けの Serverless Monitoring
---
AWS Lambda 向け Datadog Serverless Monitoring により、Lambda 関数の可視性が得られます。

開始するには、[インストール手順][1]に従って、サーバーレスアプリケーションからメトリクス、トレース、ログを収集してください。

## 仕組み{#how-it-works}

{{< img src="serverless/serverless_custom_metrics.png" alt="AWS Lambda からの拡張メトリクスの収集" >}}

Datadog Serverless Monitoring は、ランタイム固有の Datadog Lambda ライブラリを Datadog Lambda Extension と組み合わせて使用し、Lambda 関数からテレメトリを送信します。

Datadog Lambda Extension は、Lambda Telemetry API を使用して関数ログを収集するため、CloudWatch を必要としません。また、拡張メトリクスも生成します。さらに、これらのテレメトリシグナルを、Datadog Lambda ライブラリからの APM トレース、カスタムスパン、およびカスタムメトリクスと統合します。

## 使用方法{#usage}

以下のページでは、AWS Lambda 向け Serverless Monitoring のインストールおよび設定方法について説明しています。これには、包括的な可視性を実現するためのメトリクス、トレース、ログの活用方法も含まれます。

{{< whatsnext desc=" ">}}
    {{< nextlink href="/serverless/installation" >}}<u>インストール</u>: AWS Lambda 用 Serverless Monitoring をインストールします。{{< /nextlink >}}
    {{< nextlink href="/serverless/enhanced_lambda_metrics" >}}<u>Lambda メトリクス</u>: 拡張メトリクスの詳細や、カスタムメトリクスの送信方法について確認します。{{< /nextlink >}}
    {{< nextlink href="/serverless/distributed_tracing" >}}<u>分散トレーシング</u>: APM と分散トレーシングを活用し、アプリケーションのパフォーマンスをコンテキストを含めて詳細に把握します。{{< /nextlink >}}
    {{< nextlink href="/serverless/aws_lambda/logs" >}}
    <u>Log Collection</u>: Read more about log collection, how to filter logs, and how to connect logs and traces.{{< /nextlink >}}
{{< /whatsnext >}}

### Serverless ビューでサーバーレススタック全体を監視する{#monitor-your-entire-serverless-stack-in-the-serverless-view}

Serverless ビューでは、AWS リソースの高レベルのメトリクスと Lambda 関数のメトリクスを関連付けて表示できるため、問題を迅速に特定し、調査を開始することが可能です。

デフォルトでは、Serverless ビューはサーバーレスリソースをサービスごとにグループ化し、アプリケーションの各コンポーネントのパフォーマンスを可視化しやすくしています。各サービスについて、そのサービスに属する関数と、それらを呼び出したリソース (Amazon API Gateway、SNS、SQS、DynamoDB、S3、EventBridge、Kinesis) を確認できます。

{{< img src="serverless/serverless-view-hero.jpeg" alt="Datadog Serverless Monitoring" style="width:100%;" >}}

### AWS Lambda 関数の呼び出しペイロードを監視し、障害を迅速に解決する{#resolve-aws-lambda-function-failures-faster-by-monitoring-invocation-payloads}

Datadog は、すべての関数呼び出しの関数リクエストとレスポンスを自動的に収集し、問題のトラブルシューティングに役立つ重要な情報を提供します。たとえば、Lambda 関数で障害が発生したという通知を受けた際、関連するリクエストペイロードを分析することで、パラメーターの欠落、リソースアドレスの入力ミス、その他の設定不備といった障害の原因を特定できます。

障害の原因となったリクエストの設定不備を特定できれば、開発環境での問題の再現が容易になり、修正内容を検証するためのテストもスムーズに実施できるようになります。

{{< img src="serverless/lambda_payload_hero.jpeg" alt="Datadog Serverless Monitoring" style="width:100%;" >}}

### Lambda 関数環境全体で発生する問題をアラート通知するためのリアルタイムメトリクス{#real-time-metrics-for-alerting-on-issues-across-your-lambda-function-environment}

Datadog の拡張 Lambda メトリクス (プレフィックス `aws.lambda.enhanced`) は、秒単位の粒度で、ほぼリアルタイムで利用可能です。拡張 Lambda メトリクスを使用することで、コールドスタート、AWS 推定コスト、タイムアウト、メモリ不足エラー、メモリ使用量といった項目について、すべての Lambda 関数を対象としたアラート設定や SLO の定義が可能になります。これにより、サーバーレス環境におけるパフォーマンス上の問題を発生と同時に把握し、遅滞なくトラブルシューティングを行うことができます。

{{< img src="serverless/serverless_enhanced_metrics.jpeg" alt="Datadog Serverless Monitoring" style="width:100%;" >}}

### デプロイ追跡によりサーバーレス設定変更を監視する{#monitor-serverless-configuration-changes-with-deployment-tracking}

サーバーレスのコード、設定、デプロイの変更と、関数から得られるメトリクス、トレース、ログを容易に関連付けられます。これにより、これらの変更がアプリケーションの健全性やパフォーマンスにどのような影響を与えるかをリアルタイムで把握できます。

{{< img src="serverless/serverless_deployment_tracking.jpeg" alt="Datadog Serverless Monitoring" style="width:100%;" >}}

## その他の機能{#additional-capabilities}

{{< whatsnext desc=" ">}}
    {{< nextlink href="/serverless/aws_lambda/profiling" >}}<u>Continuous Profiler</u>: Datadog の Continuous Profiler を有効にして、Lambda 関数内でボトルネックの原因となっているコードの正確な行を特定します。{{< /nextlink >}}
    {{< nextlink href="/serverless/aws_lambda/securing_functions" >}}<u>Secure Functions</u>: App and API Protection (AAP) を使用して、関数に対する脅威を管理します。{{< /nextlink >}}
    {{< nextlink href="/serverless/deployment_tracking" >}}<u>Deployment Tracking</u>: デプロイを追跡して、新しいバージョンのコードや設定変更がいつリグレッションを引き起こしたかを把握します。{{< /nextlink >}}
{{< /whatsnext >}}

## 関連資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/serverless/installation