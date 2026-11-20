---
aliases:
- /ja/infrastructure/serverless/azure_app_services/
- /ja/serverless/azure_app_services/
- /ja/serverless/azure
further_reading:
- link: /integrations/azure_app_services/
  tag: ドキュメント
  text: Azure App Service
- link: /integrations/azure_app_service_environment/
  tag: ドキュメント
  text: Azure App Service Environment
- link: /serverless/guide/disable_serverless
  tag: ドキュメント
  text: Serverless Monitoring を無効にする
- link: /opentelemetry/setup/otlp_ingest/serverless/?tab=azure#web-apps-app-service
  tag: ドキュメント
  text: OTLP を使用して Azure App Service のトレースを Datadog に送信する
- link: https://www.datadoghq.com/blog/azure-app-service-extension/
  tag: ブログ
  text: Azure App Service 用 Datadog 拡張機能で .NET Web アプリを監視する
- link: https://www.datadoghq.com/blog/deploy-dotnet-core-azure-app-service/
  tag: ブログ
  text: ASP.NET Core アプリケーションを Azure App Service にデプロイする
- link: https://www.datadoghq.com/pricing/?product=serverless-monitoring&tab=azure-app-service#products
  tag: 料金
  text: Azure App Service APM Pricing
title: Azure App Service の Serverless Monitoring
---
## 概要{#overview}

[Azure App Service][1] は、Web アプリケーション、REST API、モバイルバックエンドをホストするプラットフォームです。Datadog Serverless Monitoring は、Azure App Service アプリケーションのメトリクス、ログ、およびトレースを提供します。

{{< img src="serverless/azure_app_service/azure_app_service_top_2.png" alt="Datadog UI、Azure App Service が選択された Serverless Monitoring ページ。" style="width:100%;" >}}

Datadog で、[{{< ui >}}Serverless{{< /ui >}} > {{< ui >}}Azure{{< /ui >}}][4] ページを使用して、すべての Azure リソースのトラブルシューティングを行います。

### Azure メトリクスとログ{#azure-metrics-and-logs}

[Azure 統合][2] をインストールして、Azure App Service の[拡充されたメトリクス][3]とリソースメタデータを取得します。

[Azure ログ転送][6]を設定して、Azure App Service のリソースログとアプリケーションログを自動的に収集し、Datadog に送信します。

### APM とカスタムメトリクス{#apm-and-custom-metrics}

APM およびカスタムメトリクスを使用して、Azure App Service ワークロードを監視するには、これらのワークロードに対してインスツルメンテーションを適用します。

| OS      | ランタイム   | ドキュメント               |
|---------|-----------|-----------------------------|
| Linux   | Java、Node.js、.NET、PHP、Python| [Linux - コードインスツルメンテーション][7]|
| Linux   | コンテナ | [Linux - コンテナインスツルメンテーション][8]|
| Windows | Java、Node.js、.NET| [Windows - コードインスツルメンテーション][9]

機能:
- 自動インスツルメンテーションを使用した完全分散型 APM トレーシング
- 関連する Azure App Service メトリクスとメタデータを表示するカスタマイズされた APM サービスおよびトレースビュー
- スパンをカスタマイズするための手動 APM インスツルメンテーション
アプリケーションログへの - `Trace_ID` インジェクション
- [DogStatsD][10] を使用したカスタムメトリクス

## 関連資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/en-us/azure/app-service/overview
[2]: /ja/integrations/azure/
[3]: /ja/integrations/azure_app_services/#metrics
[4]: https://app.datadoghq.com/serverless/azure/app-service-plan
[5]: /ja/integrations/azure/#setup
[6]: /ja/logs/guide/azure-automated-log-forwarding/
[7]: /ja/serverless/azure_app_service/linux_code
[8]: /ja/serverless/azure_app_service/linux_container
[9]: /ja/serverless/azure_app_service/windows_code
[10]: /ja/extend/dogstatsd/