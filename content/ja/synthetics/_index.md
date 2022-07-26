---
aliases:
- /ja/integrations/synthetics/
description: 自動テストを使用して、システムとアプリケーションの最も重要な部分が世界各地で正常に稼働していることを確認します。
disable_sidebar: true
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Synthetic%20Monitoring
  tag: リリースノート
  text: Datadog Synthetic Monitoring の最新リリースをチェック！ (アプリログインが必要です)
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: ブログ
  text: Datadog Synthetic モニタリングの紹介
- link: https://www.datadoghq.com/blog/monitor-cdn-performance-with-synthetic-testing/
  tag: ブログ
  text: Synthetic テスト内の CDN パフォーマンスの監視
- link: https://learn.datadoghq.com/course/view.php?id=39
  tag: ラーニングセンター
  text: Synthetic テストの紹介
- link: /synthetics/guide/
  tag: ドキュメント
  text: Synthetic モニタリングガイド
kind: documentation
title: Synthetic の監視
---

{{< vimeo 447241955 >}}

<br/>

Synthetic テストでは、**世界中からのシミュレートされたリクエストとアクション**を使用して、システムとアプリケーションがどのように実行されているかを観察できます。Datadog は、バックエンドからフロントエンドまで、さまざまなネットワークレベル (`HTTP`、`SSL`、`DNS`、`WebSocket`、`TCP`、`UDP`、`ICMP`、`gRPC`) で、制御された安定した方法で Web ページと API のパフォーマンスを追跡します。障害のある動作 (リグレッション、機能の破損、応答時間の長さ、予期しないステータスコードなど) を警告します。

**本番環境と CI 環境でのエンドツーエンドテスト**を使用すると、開発チームは、欠陥のあるコードが本番環境に到達しないことをプロアクティブに確認できます。主要なエンドポイントとユーザージャーニーで **SLO を計算**することで、アプリケーションのパフォーマンス目標を維持しやすくなり、最終的には一貫したカスタマーエクスペリエンスを提供できます。

Synthetic テストは、[Datadog アプリケーション][1]、[API][2]、[Terraform][3] で作成することが可能です。

## API テストとマルチステップ API テストのセットアップ

API テストを使用すると、[シングル][4]または[チェーン][5]リクエストを起動して、さまざまなネットワークレベル ([HTTP テスト][6]、[SSL テスト][7]、[DNS テスト][8]、[WebSocket テスト][9]、[TCP テスト][10]、[UDP テスト][11]、[ICMP テスト][12]、[gRPC ヘルスチェックテスト][13]) で主要システムの検証を実行できます。

{{< img src="synthetics/api_test.png" alt="API テスト" style="width:100%;">}}

## ブラウザテストを記録する

[Synthetic ブラウザテスト][14]を使用して、エンドツーエンドのテストで世界中の Web ページを顧客がどのように体験しているかを監視します。

{{< img src="synthetics/browser_test.mp4" alt="ブラウザテスト" video=true style="width:100%;">}}

## プライベートロケーションを起動する

[Synthetic プライベートロケーション][15]を使用すれば、内部 API と Web サイトを監視したり、ビジネスにミッションクリティカルな領域にカスタムロケーションを作成したりすることができます。

{{< img src="synthetics/private_locations.png" alt="プライベートロケーション" style="width:100%;">}}

## インテグレーションとデプロイプロセスでテストを実行する

Synthetics テストを[カナリアデプロイ][16]として活用するか、[CI パイプライン][16]内で直接実行すれば、欠陥のあるコードが顧客の体験に影響を与えることを恐れずに出荷を開始できます。

{{< img src="synthetics/ci.png" alt="CI テスト" style="width:100%;">}}

## データとトレースを接続する

[Synthetics テストと APM トレース間のインテグレーション][17]を利用すれば、フロントエンド、ネットワーク、バックエンドリクエスト全体の障害の根本的な原因を見つけることができます。

{{< img src="synthetics/synthetics_traces.mp4" alt="Synthetic モニタリング" video=true style="width:100%;">}}

## すぐに使えるダッシュボードにアクセスする

API テスト、マルチステップ API テスト、ブラウザテスト、プライベートロケーションのパフォーマンス情報や、Datadog のイベントを[すぐに使える Synthetic ダッシュボード][18]で分析します。

{{< img src="synthetics/test_summary_dashboard.png" alt="テストサマリーダッシュボード" style="width:100%;">}}

## 準備はいいですか？

最初の Synthetic テストを作成して Web アプリケーションを監視する手順については、[Synthetic モニタリングの概要][19]を参照してください。次に、[プライベートロケーションの概要][20]を参照して、プライベートロケーションを作成し、プライベートロケーションで Synthetic テストを実行する手順を確認してください。

## その他の参考資料

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
[16]: /ja/synthetics/cicd_testing
[17]: /ja/synthetics/apm/
[18]: /ja/synthetics/dashboards/
[19]: /ja/getting_started/synthetics
[20]: /ja/getting_started/synthetics/private_location