---
aliases:
- /ja/infrastructure/serverless/azure_app_services/
further_reading:
- link: /integrations/azure_app_services/
  tag: Documentation
  text: Azure App Service
- link: /integrations/azure_app_service_environment/
  tag: Documentation
  text: Azure App Service Environment
- link: https://www.datadoghq.com/blog/azure-app-service-extension/
  tag: ブログ
  text: Azure App Service の Datadog 拡張機能で Monitor .NET ウェブアプリを監視
- link: https://www.datadoghq.com/blog/deploy-dotnet-core-azure-app-service/
  tag: ブログ
  text: ASP.NET Core アプリケーションを Azure App Service にデプロイする
- link: https://www.datadoghq.com/pricing/?product=application-performance-monitoring#application-performance-monitoring-apm_faq-what-is-considered-as-a-host-for-azure-app-services
  tag: 料金
  text: Azure App Service APM 価格設定
title: Azure App Service のモニタリング
---

## 概要

Microsoft [Azure App Service][1] は、インフラストラクチャーを管理せずに Web アプリやモバイルバックエンド、イベント駆動型関数、RESTful API の構築とホスティングを行うことが可能な統合型のサーバーレスリソースです。あらゆる規模のワークロードのホスティングのほか、オートスケーリングと高可用性オプションにも対応しています。

Datadog では Azure App Service に属するすべてのリソースタイプのモニタリングが可能です。

- [Azure インテグレーション][3]を使用したアプリおよび関数向けの Azure Monitor [メトリクス][2]。
- [Azure App Service ビュー][4]を使用して、問題をすばやく特定し、Azure App Service リソース間の関係をマッピングし、コストとパフォーマンスに関する洞察を得ることができます。
- API を通じてカスタムメトリクスの送信を行います。
- [イベントハブ][6]から[リソースログ][5]を送信します。

Datadog は、Basic、Standard、Premium プランにおいて、以下の Azure App Service のワークロードランタイムの監視機能を追加提供します。

| OS | ランタイム |アプリタイプ|ステータス|Documentation| 
|----|---------|-----|----|--------------|
|Windows|.NET|関数アプリと Web アプリ|GA|[Windows .NET のセットアップ][7]|
|Windows|Java|関数アプリと Web アプリ|beta|[Windows Java のセットアップ][8]|
|Linux|.NET|Web アプリ|GA|[Linux .NET のセットアップ][9]|
|Linux|Node|Web アプリ|GA|[Linux Node のセットアップ][9]|
|Linux|PHP|Web アプリ|GA|[Linux PHP のセットアップ][9]|
|Linux|Java|Web アプリ|GA|[Linux Java のセットアップ][10]|
|Linux|Python|Web アプリ|GA|[Linux Python のセットアップ][9]|

機能:
- 自動インスツルメンテーションを用いた完全分散型 APM トレーシング
- カスタマイズされた APM サービスとトレースビューは、関連する Azure App Service のメトリクスとメタデータを表示します
- スパンのカスタマイズが可能な、手動 APM インスツルメンテーション
- アプリケーションログへの `Trace_ID` 挿入
- [DogStatsD][11] を使用したカスタムメトリクス

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/en-us/azure/app-service/overview
[2]: /ja/integrations/azure_app_services/#metrics
[3]: /ja/integrations/azure/
[4]: https://app.datadoghq.com/functions?search=&cloud=azure&entity_view=app_service_plan
[5]: /ja/integrations/azure/#log-collection
[6]: https://learn.microsoft.com/azure/event-hubs/
[7]: /ja/serverless/azure_app_services/azure_app_services_windows?tab=net#setup
[8]: /ja/serverless/azure_app_services/azure_app_services_windows?tab=java#setup
[9]: /ja/serverless/azure_app_services/azure_app_services_linux?tab=nodenetphppython
[10]: /ja/serverless/azure_app_services/azure_app_services_linux?tab=java
[11]: /ja/developers/dogstatsd/