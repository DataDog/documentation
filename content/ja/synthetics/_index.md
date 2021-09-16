---
title: Synthetic の監視
kind: documentation
description: 自動テストを使用して、システムとアプリケーションの最も重要な部分が世界各地で正常に稼働していることを確認します。
disable_sidebar: true
aliases:
  - /ja/integrations/synthetics/
further_reading:
  - link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
    tag: ブログ
    text: Datadog Synthetic モニタリングの紹介
  - link: https://learn.datadoghq.com/course/view.php?id=39
    tag: ラーニングセンター
    text: Synthetic テストの紹介
  - link: /synthetics/guide/
    tag: Documentation
    text: Synthetic モニタリングガイド
---
{{< vimeo 447241955 >}}

<br/>

Synthetic テストでは、**世界中からのシミュレートされたリクエストとアクション**を使用して、システムとアプリケーションがどのように実行されているかを観察できます。Datadog は、バックエンドからフロントエンドまで、さまざまなネットワークレベル (`HTTP`、`TCP`、`SSL`、`DNS`、`ICMP`) で、制御された安定した方法で Web ページと API のパフォーマンスを追跡します。障害のある動作 (リグレッション、機能の破損、応答時間の長さ、予期しないステータスコードなど) が発生した場合に警告します。

**本番環境と CI 環境でのエンドツーエンドテスト**を使用すると、開発チームは、欠陥のあるコードが本番環境に到達しないことをプロアクティブに確認できます。主要なエンドポイントとユーザージャーニーで **SLO を計算**することで、アプリケーションのパフォーマンス目標を維持しやすくなり、最終的には一貫したカスタマーエクスペリエンスを提供できます。

## API テストとマルチステップ API テストのセットアップ

API テストを使用すると、[シングル][1]または[チェーン][2]リクエストを起動して、さまざまなネットワークレベル ([HTTP テスト][3]、[SSL テスト][4]、[TCP テスト][5]、[DNS テスト][6]、[ICMP テスト][7]) で主要システムの検証を実行できます。

{{< img src="synthetics/api_test.png" alt="API テスト"  style="width:100%;">}}

## ブラウザテストを記録する

[Synthetic ブラウザテスト][8]を使用して、エンドツーエンドのテストで世界中の Web ページを顧客がどのように体験しているかを監視します。

{{< img src="synthetics/browser_test.gif" alt="ブラウザテスト"  style="width:100%;">}}

## プライベートロケーションを起動する

[Synthetic プライベートロケーション][9]を使用すれば、内部 API と Web サイトを監視したり、ビジネスにミッションクリティカルな領域にカスタムロケーションを作成したりすることができます。

{{< img src="synthetics/private_locations.png" alt="プライベートロケーション"  style="width:100%;">}}

## インテグレーションとデプロイプロセスでテストを実行する

Synthetics テストを[カナリア][10]として活用するか、[CI パイプライン][10]内で直接実行すれば、欠陥のあるコードが顧客の体験に影響を与えることを恐れずに出荷を開始できます。

 {{< img src="synthetics/ci.png" alt="CI テスト"  style="width:100%;">}}

## データとトレースを接続する

[Synthetics テストと APM トレース間のすぐに使えるインテグレーション][11]を利用すれば、フロントエンド、ネットワーク、バックエンドリクエスト全体の障害の根本的な原因を見つけることができます。

{{< img src="synthetics/synthetics_traces.gif" alt="Synthetic モニタリング" style="width:100%;">}}

## 準備はいいですか？

最初の Synthetic テストを作成して Web アプリケーションを監視する手順については、[Synthetic モニタリングの概要][12]を参照してください。次に、[プライベートロケーションの概要][13]を参照して、プライベートロケーションを作成し、プライベートロケーションで Synthetic テストを実行する手順を確認してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/api_tests/
[2]: /ja/synthetics/multistep
[3]: /ja/synthetics/api_tests/http_tests
[4]: /ja/synthetics/api_tests/tcp_tests
[5]: /ja/synthetics/api_tests/ssl_tests
[6]: /ja/synthetics/api_tests/dns_tests
[7]: /ja/synthetics/api_tests/icmp_tests
[8]: /ja/synthetics/browser_tests
[9]: /ja/synthetics/private_locations
[10]: /ja/synthetics/ci/
[11]: /ja/synthetics/apm/
[12]: /ja/getting_started/synthetics
[13]: /ja/getting_started/synthetics/private_location