---
aliases:
- /ja/real_user_monitoring/dashboards/testing_coverage
- /ja/real_user_monitoring/platform/dashboards/testing_coverage
description: Learn about the out-of-the-box RUM testing and deployment dashboards.
further_reading:
- link: /real_user_monitoring/
  tag: Documentation
  text: Learn about RUM & Session Replay
- link: /synthetics/browser_tests
  tag: Documentation
  text: Learn about Synthetic browser tests
- link: https://www.datadoghq.com/blog/test-coverage-monitoring-datadog/
  tag: Blog
  text: Track your test coverage with RUM and Synthetic Monitoring
title: Testing and Deployment Dashboards
---

## テストカバレッジ


[Synthetics & RUM アプリケーションテストカバレッジダッシュボード][1]は、[RUM][2] から収集したデータと Synthetic [ブラウザテスト][3]の結果を使用して、アプリケーションのテストカバレッジ全体に関する洞察を提供するものです。

このダッシュボードは、以下の質問に答えるために使用することができます。

- アプリケーションでは何がテストされ、何がテストされていないのか？
- 継続的に監視するアプリケーションの最も人気のあるセクションをどのように特定するのか？
- ブラウザのテストカバレッジを追加するために、アプリケーションで最も人気のあるユーザーアクションを見つけるにはどうすればよいか？

以下が示されます。

- **Percentage of tested actions**: アプリケーションの全体的なテストカバレッジをスキャンします。
- **Untested actions**: 実際のユーザーインタラクションの数とブラウザテストでカバーされたアクションの数で、最も人気のある未テストのユーザーアクションを探ります。

{{< img src="synthetics/dashboards/testing_coverage-2.png" alt="すぐに使える Synthetics テストカバレッジダッシュボード" style="width:100%" >}}

{{< img src="synthetics/dashboards/testing_coverage_actions_tests-1.png" alt="未テストの RUM アクションと、Synthetics テストカバレッジダッシュボードの RUM アクションセクションをカバーするトップ Synthetic ブラウザテスト" style="width:100%" >}}

表示されるデータの詳細については、[RUM ブラウザデータ収集][2]を参照してください。

## Web デプロイ追跡

RUM Web アプリデプロイ追跡ダッシュボードを使用すると、最近のデプロイがアプリケーション内でパフォーマンスの問題や新たなエラーを引き起こしている場合に、それを特定することができます。この機能を使用するには、必ず[アプリケーションに RUM バージョンを追加][4]してください。このダッシュボードでは、以下が表示されます。

- **Core web vitals**:
  すべてのビューで、3 つのブラウザパフォーマンスメトリクス (Largest Contentful Paint、First Input Delay、Cumulative Layout Shift) がハイライトされます。Load Time などの他のパフォーマンスメトリクスも利用可能です。
- **Errors**: 
  エラーの数、エラーのあるビューの割合、進行中の問題を確認することができます。
- **Browser performance metrics**:
  異なるサービスやバージョン間で、ロード時間、セッション、エラーなどのパフォーマンスメトリクスを比較できます。

{{< img src="real_user_monitoring/dashboards/dashboard-deployment-web.png" alt="すぐに使える Web デプロイダッシュボード" style="width:100%" >}}

## モバイルデプロイ追跡

RUM モバイルアプリデプロイ追跡ダッシュボードは、最近のデプロイやリリースがモバイルアプリケーション内でパフォーマンスの問題や新しいエラーを引き起こしている場合に特定するのに役立ちます。バージョンを直接比較する必要がある場合は、RUM サマリーページのデプロイ追跡セクションを使用してください。

デプロイ追跡を利用するには、**Datadog SDK** を初期化する際に、必ずアプリのバージョンを指定してください。

このダッシュボードでは、以下が表示されます。

- **Crashes**: 
  バージョンごとのクラッシュカウント、バージョンごとのクラッシュレートを確認し、現在進行中のクラッシュを探索します。
- **Errors**:
  バージョンごとのエラーカウント、バージョンごとのエラーレートを確認し、現在進行中のエラーを探索します。
- **Mobile vitals by version**:
  すべてのバージョンで、4 つのモバイルパフォーマンスメトリクス (レンダリングの遅延、フレームのフリーズ、アプリケーションの起動時間、メモリ使用量) がハイライトされます。

{{< img src="real_user_monitoring/dashboards/dashboard-deployment-mobile.png" alt="すぐに使えるモバイルデプロイダッシュボード" style="width:100%" >}}

表示されるデータの詳細については、各プラットフォームのドキュメントをご覧ください: [iOS RUM][5]、[Android RUM][6]、[React Native RUM][7]、[Flutter RUM][8]

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/30697/synthetics---browser-test-performance
[2]: /ja/real_user_monitoring/browser/data_collected/
[3]: /ja/synthetics/browser_tests/
[4]: /ja/real_user_monitoring/browser/setup/#initialization-parameters
[5]: /ja/real_user_monitoring/ios/data_collected/
[6]: /ja/real_user_monitoring/android/data_collected/
[7]: /ja/real_user_monitoring/reactnative/data_collected/
[8]: /ja/real_user_monitoring/mobile_and_tv_monitoring/data_collected/flutter