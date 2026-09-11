---
aliases:
- /ja/serverless/gcp
- /ja/serverless/google_cloud
- /ja/serverless/google
further_reading:
- link: /integrations/google-cloud-run/
  tag: ドキュメント
  text: Google Cloud Run インテグレーション
- link: /serverless/guide/disable_serverless
  tag: ドキュメント
  text: Serverless Monitoring を無効にする
- link: /opentelemetry/setup/otlp_ingest/serverless/?tab=gcp#cloud-run-and-cloud-run-functions
  tag: ドキュメント
  text: OTLP を使用して Cloud Run のトレースを Datadog に送信する
- link: https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/
  tag: ブログ
  text: Cloud Run サービスからトレース、ログ、カスタムメトリクスを収集する
title: Google Cloud Run
---
Google Cloud Run は、ステートレスコンテナとサーバーレス関数を実行できるフルマネージド型のコンピューティングプラットフォームです。自動スケーリング、組み込みの負荷分散、使用した分だけ支払う (従量制の) 課金体系を備えています。

Datadog は、[Google Cloud インテグレーション][1]を通じて Cloud Run の監視とログ収集を提供します。

Datadog では、Serverless Agent を使用して Cloud Run アプリケーションのインスツルメンテーションを行い、トレース、拡張メトリクス、カスタムメトリクス、および直接のログ収集を有効にするソリューションも提供しています。[拡張メトリクス][2]は、`gcp.run.container.enhanced.*` および `gcp.run.job.enhanced.*` の名前空間で区別されます。

インスツルメンテーションについては、以下のワークロードを選択して手順を確認してください。

## ワークロードの選択 {#choose-your-workload}

{{< card-grid card_width="350px" >}}
  {{< image-card href="/serverless/google_cloud_run/containers" title="Containers" >}}
  {{< image-card href="/serverless/google_cloud_run/jobs" title="ジョブ" subtitle="(プレビュー)" >}}
  {{< image-card href="/serverless/google_cloud_run/functions" title="Functions" >}}
  {{< image-card href="/serverless/google_cloud_run/functions_1st_gen" title="Functions" subtitle="(第 1 世代)" >}}
{{< /card-grid >}}

## 関連資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]:/ja/integrations/google_cloud_platform/
[2]:/ja/integrations/google-cloud-run/#metrics