---
algolia:
  tags:
  - synthetics
aliases:
- /ja/integrations/synthetics/
cascade:
  algolia:
    rank: 70
description: 自動テストを使用して、システムとアプリケーションの最も重要な部分が世界各地で正常に稼働していることを確認します。
further_reading:
- link: /synthetics/guide/
  tag: よくあるご質問
  text: Synthetics モニタリングガイド
- link: https://learn.datadoghq.com/courses/getting-started-with-synthetic-browser-testing
  tag: ラーニングセンター
  text: 'Datadog ラーニングセンター: Synthetic ブラウザテストを始める'
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: Synthetic テスト能力を高めるためのインタラクティブなセッションに参加できます
- link: https://www.datadoghq.com/blog/http-security-headers-synthetic-tests/
  tag: 英語ブログ
  text: 合成テストを使用してHTTPヘッダーを保護する方法
- link: https://www.datadoghq.com/blog/synthetic-monitoring-updates/
  tag: 英語ブログ
  text: Datadog Synthetic Monitoringを使用して、ユーザー体験に関する重要な洞察をより早く得る
- link: https://www.datadoghq.com/blog/smoke-testing-synthetic-monitoring/
  tag: 英語ブログ
  text: Synthetic Monitoringを使用して効率的なUXスモークテストを作成する方法
- link: https://www.datadoghq.com/blog/slo-synthetic-monitoring/
  tag: 英語ブログ
  text: Datadog Synthetic Monitoringを使用してSLOの精度とパフォーマンスを向上させる
- link: https://www.datadoghq.com/blog/mobile-apps-synthetic-tests/
  tag: 英語ブログ
  text: モバイルアプリのために信頼性が高く正確な合成テストを構築する方法
- link: https://www.datadoghq.com/blog/ambassador-browser-tests/
  tag: 英語ブログ
  text: クライアントのブラウザテストをDatadogでスケールさせる手助けをした方法
- link: https://www.datadoghq.com/blog/datadog-terraform-synthetic-testing/
  tag: 英語ブログ
  text: Datadog Synthetic MonitoringとTerraformを使用して合成テストインフラを自動化する
- link: https://www.datadoghq.com/blog/simplifying-troubleshooting-with-synthetic-monitoring
  tag: 英語ブログ
  text: Datadog Synthetic Monitoringを使用してユーザージャーニー全体のトラブルシューティングを簡素化する
- link: https://www.datadoghq.com/blog/rum-product-analytics-bridging-teams
  tag: 英語ブログ
  text: パフォーマンスから影響へ：共有コンテキストを通じてフロントエンドチームをつなぐ
- link: https://app.datadoghq.com/release-notes?category=Synthetic%20Monitoring
  tag: リリースノート
  text: 最新のDatadog Synthetic Monitoringのリリースをチェックしてください！（アプリログインが必要です）
title: Synthetic テストとモニター
---
{{< learning-center-callout header="エンゲージメントウェビナーセッションに参加する" hide_image="true" btn_title="サインアップ" btn_url="https://www.datadoghq.com/technical-enablement/session/synthetics/">}}
  Foundation Enablementセッションを探索し、登録してください。Datadog Synthetic Monitoringが、コードなしでAPI、ブラウザ、モバイルテストを作成し、ユーザーフローやアプリケーション、主要エンドポイント、ネットワーク層へのリクエストを自動的にシミュレートするプロアクティブな監視ソリューションであることを学びましょう。
{{< /learning-center-callout >}}

合成テストを使用すると、**世界中からのシミュレートされたリクエストとアクション**を使用して、システムやアプリケーションのパフォーマンスを観察できます。Datadogは、バックエンドからフロントエンドまで、さまざまなネットワークレベル（`HTTP`、`SSL`、`DNS`、`WebSocket`、`TCP`、`UDP`、`ICMP`、および`gRPC`）で、制御された安定した方法でウェブページやAPIのパフォーマンスを追跡し、回帰、機能の破損、高い応答時間、予期しないステータスコードなどの異常な動作について警告します。

キーエンドポイントとユーザージャーニーで **SLO を計算**することで、アプリケーションのパフォーマンス目標を達成しやすくなり、最終的に一貫したカスタマーエクスペリエンスを提供することができます。

Synthetic テストは、[Datadog アプリケーション][1]、[API][2]、[Terraform][3] で作成することが可能です。

##API テストとマルチステップ API テストのセットアップ

API テストを使用すると、[シングル][4]または[チェーン][5]リクエストを起動して、さまざまなネットワークレベル ([HTTP テスト][6]、[SSL テスト][7]、[DNS テスト][8]、[WebSocket テスト][9]、[TCP テスト][10]、[UDP テスト][11]、[ICMP テスト][12]、[gRPC テスト][13]) で主要システムの検証を実行できます。

{{< img src="synthetics/api_test.png" alt="API テスト" style="width:100%;">}}

ブラウザテストを記録する

[Synthetic ブラウザテスト][14]を使用して、世界中の Web ページを顧客がどのように体験しているかをエンドツーエンドで監視します。

{{< img src="synthetics/browser_test.mp4" alt="ブラウザテスト" video=true style="width:100%;">}}

モバイルアプリケーションテストを記録する

[Synthetic モバイルアプリケーションテスト][21]を使用して、顧客が異なるデバイスタイプから iOS と Android アプリケーションをエンドツーエンドでどのように体験するかを監視します。

{{< img src="synthetics/mobile_app_tests.png" alt="合成モバイルテストの録画ワークフローの例" style="width:100%;">}}

## ネットワークパステストを作成する {#create-network-path-tests}

管理された場所から[合成ネットワークパステスト][25]を作成し、TCP、UDP、ICMPチェックを実行し、グローバルエンドポイント間のパケットルートを可視化します。

{{< img src="synthetics/network_tests/syn_network_path.png" alt="合成TCPネットワークテストの例" style="width:100%;">}}
テストスイート

[Synthetic Test Suites][26]を使用して、ユーザーの旅、環境、場所、サービス、またはチームによってグループ化された論理的なコレクションに複数のテストを整理し、管理とトラブルシューティングを効率化します。

{{< img src="synthetics/test_suites/test_suite_summary.png" alt="Synthetic Monitoring Test Suiteの概要ページ" style="width:100%;">}}

プライベートロケーションを起動する

[Synthetic プライベートロケーション][15]を使用すれば、内部 API と Web サイトを監視したり、ビジネスにミッションクリティカルな領域にカスタムロケーションを作成したりすることができます。

{{< img src="synthetics/private_locations.png" alt="プライベートロケーション" style="width:100%;">}}

データとトレースを接続する

[Synthetics テストと APM トレース間のインテグレーション][16]を利用すれば、フロントエンド、ネットワーク、バックエンドリクエスト全体の障害の根本的な原因を見つけることができます。

{{< img src="synthetics/synthetics_traces.mp4" alt="合成監視" video=true style="width:100%;">}}

すぐに使えるダッシュボードにアクセスする

API テスト、マルチステップ API テスト、ブラウザテスト、プライベートロケーションのパフォーマンス情報や、Datadog のイベントを[すぐに使える Synthetic ダッシュボード][17]で分析します。

{{< img src="synthetics/dashboards/test_dashboard.png" alt="Synthetic Monitoring & Continuous Testingの概要ダッシュボード" style="width:100%;">}}

Synthetic Monitoring & Testing Results Explorer を使用する

Synthetic テストの実行や、CI/CD パイプラインで実行されているテストのバッチに対して、[検索クエリおよび視覚化][20]を作成します。

{{< img src="continuous_testing/explorer_ci_batches_1.png" alt="continuous_testing_explorer" style="width:100%;">}}

テストカバレッジの追跡

[アプリケーションの最も重要なワークフローを確実にテストする][22]ことで、テストスイートを最適化します。

{{< img src="synthetics/test_coverage/test_coverage.png" alt="continuous_testing_explorer" style="width:100%;">}}

## Synthetic Monitoring通知 {#synthetic-monitoring-notifications}

Syntheticモニターを使用して、Synthetic Monitoringテストが失敗したときに通知を送信するように強化します。次の機能が利用できます：

事前入力されたモニターメッセージ
: 事前入力されたモニターメッセージは、Syntheticテストアラートのための構造化された出発点を提供します。各メッセージには、標準化されたタイトル、要約、およびテストメタデータを含むフッターが含まれており、一目でアラートを理解しやすくなっています。

テンプレート変数
: テンプレート変数を使用すると、モニター通知にテスト固有のデータを動的に挿入できます。これらの変数は`synthetics.attributes`オブジェクトから取得されます。

高度な使用方法
: 高度な使用法には、より深いテストインサイトを引き出す技術や、ハンドルバーのテンプレートを使用して複雑なメッセージを構造化する方法が含まれます。

条件付きアラート
: 条件付きアラートを使用すると、特定のテスト結果や失敗条件に基づいてモニター通知の内容を変更できます。

詳しくは、[Synthetic Monitoring通知][24]をご覧ください。

##バージョン履歴

[Version History in Synthetic Monitoring][23]を使用して、テストの以前のバージョンを実行したり、テストを保存された任意のバージョンに復元したり、バージョンを複製して新しいSynthetic Monitoringテストを作成します。

##準備はいいですか？{#ready-to-start}

[Getting Started with Synthetic Monitoring][18]を参照して、最初のSyntheticテストを作成し、Webアプリケーションを監視する手順を確認してください。次に、[Getting Started with Private Locations][19]を参照して、プライベートロケーションを作成し、そのプライベートロケーションでSyntheticテストを実行する手順を確認してください。

##参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/synthetics/create#
[2]: /ja/api/latest/synthetics/#create-an-api-test
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
[4]: /ja/synthetics/api_tests/
[5]: /ja/synthetics/multistep
[6]: /ja/synthetics/api_tests/http_tests
[7]: /ja/synthetics/api_tests/ssl_tests
[8]: /ja/synthetics/api_tests/dns_tests
[9]: /ja/synthetics/api_tests/websocket_tests
[10]: /ja/synthetics/api_tests/tcp_tests
[11]: /ja/synthetics/api_tests/udp_tests
[12]: /ja/synthetics/api_tests/icmp_tests
[13]: /ja/synthetics/api_tests/grpc_tests
[14]: /ja/synthetics/browser_tests
[15]: /ja/synthetics/private_locations
[16]: /ja/synthetics/apm/
[17]: /ja/synthetics/dashboards/
[18]: /ja/getting_started/synthetics
[19]: /ja/getting_started/synthetics/private_location
[20]: /ja/continuous_testing/explorer/
[21]: /ja/mobile_testing
[22]: /ja/synthetics/test_coverage
[23]: /ja/synthetics/guide/version_history/
[24]: /ja/synthetics/notifications/
[25]: /ja/synthetics/network_path_tests/
[26]: /ja/synthetics/test_suites/