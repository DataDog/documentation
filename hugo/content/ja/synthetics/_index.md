---
algolia:
  tags:
  - synthetics
aliases:
- /ja/integrations/synthetics/
cascade:
  algolia:
    rank: 70
description: 自動テストを使用して、システムやアプリケーションの最も重要な部分が世界中のさまざまな場所から稼働していることを確認します。
further_reading:
- link: /synthetics/guide/
  tag: ドキュメント
  text: Synthetic Monitoring ガイド
- link: https://learn.datadoghq.com/courses/getting-started-with-synthetic-browser-testing
  tag: Learning Center
  text: 'Datadog Learning Center: Synthetic Browser Testing の開始方法'
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: インタラクティブなセッションに参加して、Synthetic Testing の機能を強化します。
- link: https://www.datadoghq.com/blog/network-test-protocols/
  tag: ブログ
  text: Datadog で TCP、UDP、ICMP を使用してネットワークパスをテストする
- link: https://www.datadoghq.com/blog/http-security-headers-synthetic-tests/
  tag: ブログ
  text: Synthetic テストで HTTP ヘッダーを保護する方法
- link: https://www.datadoghq.com/blog/synthetic-monitoring-updates/
  tag: ブログ
  text: Datadog Synthetic Monitoring を使用して、ユーザーエクスペリエンスに関する重要な洞察をより迅速に得ることができます。
- link: https://www.datadoghq.com/blog/smoke-testing-synthetic-monitoring/
  tag: ブログ
  text: Synthetic Monitoring を使用して効率的な UX スモークテストを作成する方法
- link: https://www.datadoghq.com/blog/slo-synthetic-monitoring/
  tag: ブログ
  text: Datadog Synthetic Monitoring で SLO の精度とパフォーマンスを向上させる
- link: https://www.datadoghq.com/blog/mobile-apps-synthetic-tests/
  tag: ブログ
  text: モバイルアプリ向けに信頼性が高く正確な Synthetic テストを構築する方法
- link: https://www.datadoghq.com/blog/ambassador-browser-tests/
  tag: ブログ
  text: Datadog を使用してクライアントのブラウザテストを拡張する手助けをした方法
- link: https://www.datadoghq.com/blog/datadog-terraform-synthetic-testing/
  tag: ブログ
  text: Datadog Synthetic Monitoring と Terraform を使用して、Synthetic テストのインフラストラクチャーを自動化する
- link: https://www.datadoghq.com/blog/simplifying-troubleshooting-with-synthetic-monitoring
  tag: ブログ
  text: Datadog Synthetic Monitoring によるユーザー体験全体を通じたトラブルシューティングの簡素化
- link: https://www.datadoghq.com/blog/rum-product-analytics-bridging-teams
  tag: ブログ
  text: 'パフォーマンスから影響まで: 共有コンテキストを通じてフロントエンドチームをつなぐ'
- link: https://app.datadoghq.com/release-notes?category=Synthetic%20Monitoring
  tag: リリースノート
  text: Datadog Synthetic Monitoring の最新リリースをチェックしてください(アプリへのログインが必要です)
title: Synthetic Testing と Synthetic Monitoring
---
{{< learning-center-callout header="イネーブルメントウェビナーセッションに参加する" hide_image="true" btn_title="サインアップ" btn_url="https://www.datadoghq.com/technical-enablement/session/synthetics/">}}
  Foundation Enablement セッションを検索して登録します。Datadog Synthetic Monitoring が、コード不要の API、ブラウザ、モバイルテストを作成し、アプリケーション、主要エンドポイント、ネットワークレイヤーへのユーザーフローやリクエストを自動的にシミュレートできるプロアクティブな監視ソリューションである仕組みを学びます。
{{< /learning-center-callout >}}

Synthetic テストを使用すると、**世界中からのシミュレートされたリクエストとアクション**を使用して、システムとアプリケーションのパフォーマンスを監視できます。Datadog は、Web ページと API のパフォーマンスをバックエンドからフロントエンドまで、またさまざまなネットワークレベル (`HTTP`、`SSL`、`DNS`、`WebSocket`、`TCP`、`UDP`、`ICMP`、および `gRPC`) で制御された安定した方法で追跡し、リグレッション、機能の破損、高い応答時間、予期しないステータスコードなどの障害動作についてアラートを送信します。

**主要なエンドポイントとユーザージャーニーで SLO を計算する**ことで、アプリケーションのパフォーマンス目標を維持し、最終的に一貫した顧客体験を提供することが容易になります。

Datadog の [アプリケーション][1]、[API][2]、または [Terraform][3] を使用して、Synthetic テストを作成できます。

## API テストおよびマルチステップ API テストを設定する{#set-up-api-tests-and-multistep-api-tests}

API テストでは、[単一][4]または[チェーン][5]のリクエストを開始して、さまざまなネットワークレベルで主要システムの検証を実行できます: [HTTP テスト][6]、[SSL テスト][7]、[DNS テスト][8]、[WebSocket テスト][9]、[TCP テスト][10]、[UDP テスト][11]、[ICMP テスト][12]、および [gRPC テスト][13]。

{{< img src="synthetics/api_tests/api_test_shopist.png" alt="グローバルアップタイム、アラートタイムライン、最新のテスト実行リストを表示する Activity タブを示す HTTP API テスト詳細ページ" style="width:100%;">}}

## ブラウザテストを記録する{#record-browser-tests}

[Synthetic ブラウザテスト][14]を使用して、世界中の顧客が Web ページをどのように体験しているかを監視します。

{{< img src="synthetics/browser_test.mp4" alt="ブラウザテスト" video=true style="width:100%;">}}

## モバイルアプリケーションテストを記録する{#record-mobile-application-tests}

[Synthetic モバイルアプリケーションテスト][21]を使用して、さまざまなデバイスタイプから顧客が iOS および Android アプリケーションをどのように体験しているかをエンドツーエンドで監視します。

{{< img src="synthetics/mobile_app_tests.png" alt="Synthetic モバイルテストの記録ワークフローの例" style="width:100%;">}}

## ネットワークパステストを作成する{#create-network-path-tests}

[Synthetic ネットワークパステスト][25]を作成し、管理されたロケーションから TCP、UDP、ICMP についてチェックすることで、グローバルなエンドポイント間のパケットルートを可視化します。

{{< img src="synthetics/network_tests/syn_network_path.png" alt="Synthetic TCP ネットワークテストの例" style="width:100%;">}}
## テストスイート {#test-suites}

[Synthetic テストスイート][26]を使用して、複数のテストをユーザージャーニー、環境、ロケーション、サービス、チームごとに論理的なコレクションにまとめ、管理とトラブルシューティングを効率化します。

{{< img src="synthetics/test_suites/test_suite_summary.png" alt="Synthetic Monitoring テストスイートのサマリーページ" style="width:100%;">}}

## Bits Testing と Goal-Based Testing を探索する{#explore-bits-testing-and-goal-based-testing}

[Bits Testing][27]を使用してアプリケーションを探索し、重要なユーザージャーニーをマッピングして、それらをカバーする Synthetic テストを生成します。これには、非決定論的なエージェント型テストを使用してユーザーが目標に到達できることを検証する[Goal-Based テスト][28]が含まれます。

{{< img src="synthetics/bits_testing/bits_testing_landing.png" alt="希望するテストカバレッジを記述するためのプロンプトが表示された Bits Testing のランディングページ" style="width:100%;">}}

## プライベートロケーションを起動する {#launch-private-locations}

[Synthetic プライベートロケーション][15]を使用して、内部 API や Web サイトを監視したり、ビジネスにとってミッションクリティカルな領域にカスタムロケーションを作成したりします。

{{< img src="synthetics/private_locations.png" alt="プライベートロケーション" style="width:100%;">}}

## データとトレースを接続する {#connect-data-and-traces}

[Synthetic テストと APM トレースの統合][16]を使用して、フロントエンド、ネットワーク、バックエンドのリクエスト全体にわたる障害の根本原因を特定します。

{{< img src="synthetics/apm/synthetics_apm_new.mp4" alt="サイドパネルの Trace タブが開かれた失敗した API テスト。テスト実行によって生成された APM トレースが、サービス全体にわたる色分けされたスパンで表示されています。" video=true style="width:100%;">}}

## すぐに使えるダッシュボードにアクセスする {#access-out-of-the-box-dashboards}

[すぐに使える Synthetic ダッシュボード][17]を使用して、API テスト、マルチステップ API テスト、ブラウザテスト、プライベートロケーションに関するパフォーマンス情報や、Datadog イベントを分析します。

{{< img src="synthetics/dashboards/test_dashboard.png" alt="Synthetic Monitoring & Continuous Testing サマリーダッシュボード" style="width:100%;">}}

## Synthetic Monitoring & Testing Results Explorer を使用する {#use-the-synthetic-monitoring-testing-results-explorer}

Synthetic テストの実行や、CI/CD パイプラインで実行されるテストバッチの[検索クエリと可視化][20]を作成します。

{{< img src="continuous_testing/explorer_ci_batches_1.png" alt="Continuous Testing Explorer" style="width:100%;">}}

## テストカバレッジを追跡する {#track-testing-coverage}

[アプリケーションの最も重要なワークフローがテストされていることを確認][22]することで、テストスイートを最適化します。

{{< img src="synthetics/test_coverage/test_coverage.png" alt="Continuous Testing Explorer" style="width:100%;">}}

## Synthetic Monitoring 通知 {#synthetic-monitoring-notifications}

Synthetic Monitoring テストが失敗したときに通知を送信するために、Synthetic モニターを使用して強化します。以下の機能が利用可能です。

事前入力されたモニターメッセージ
: 事前入力されたモニターメッセージは、Synthetic テストアラートの構造化された開始点を提供します。各メッセージには、標準化されたタイトル、概要、およびテストメタデータを含むフッターがあり、アラートを一目で把握しやすくなっています。

テンプレート変数
: テンプレート変数を使用すると、テスト固有のデータをモニター通知に動的に挿入できます。これらの変数は `synthetics.attributes` オブジェクトから取得されます。

高度な使用方法
: 高度な使用方法には、Handlebars テンプレートを使用して、より詳細なテストインサイトを表示したり、複雑なメッセージを構成したりする手法が含まれます。

条件付きアラート
: 条件付きアラートを使用すると、特定のテスト結果や失敗条件に基づいて、モニター通知の内容を変更できます。

詳細については、[Synthetic Monitoring の通知][24]を参照してください。

## バージョン履歴 {#version-history}

[Synthetic Monitoring のバージョン履歴][23]を使用して、テストの以前のバージョンを実行したり、保存された任意のバージョンにテストを復元したり、バージョンを複製して新しい Synthetic テストを作成したりできます。

## 準備はよろしいですか{#ready-to-start}

最初の Synthetic テストの作成方法や Web アプリケーションの監視方法については、[Synthetic Monitoring の概要][18]を参照してください。次に、[プライベートロケーションの概要][19]を参照して、プライベートロケーションの作成方法およびプライベートロケーションを使用した Synthetic テストの実行方法を確認してください。

## 参考資料 {#further-reading}

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
[27]: /ja/synthetics/bits_testing/
[28]: /ja/synthetics/goal_based_testing/