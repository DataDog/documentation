---
title: Synthetic の監視
kind: documentation
description: 自動テストを使用して、システムとアプリケーションの最も重要な部分が世界各地で正常に稼働していることを確認します。
disable_sidebar: true
aliases:
  - /ja/integrations/synthetics/
further_reading:
  - link: 'https://www.datadoghq.com/blog/introducing-synthetic-monitoring/'
    tag: ブログ
    text: Datadog Synthetic モニタリングの紹介
  - link: 'https://www.datadoghq.com/blog/browser-tests/'
    tag: ブログ
    text: Datadog ブラウザテストによるユーザーエクスペリエンスの監視
  - link: 'https://www.datadoghq.com/blog/test-creation-best-practices/'
    tag: ブログ
    text: エンドツーエンドテスト作成のベストプラクティス
  - link: /synthetics/guide/
    tag: Documentation
    text: Synthetics モニタリングガイド
  - link: /synthetics/troubleshooting/
    tag: Documentation
    text: Synthetic モニタリングのトラブルシューティング
---
{{< vimeo 447241955 >}}

<br/>

Synthetics テストでは、**世界中のシミュレートされたリクエストとアクション**を使用して、システムとアプリケーションのパフォーマンスを観察できます。Datadog は、バックエンドからフロントエンドまで、およびさまざまなネットワークレベル (`HTTP`、`TCP`、`SSL`、`DNS`) で、制御された安定した方法を使って **Web ページと API のパフォーマンスを追跡**し、異常な動作 (回帰、機能障害、応答時間が長い、予期しないステータスコードなど) がある場合に警告します。**本番環境と CI 環境をエンドツーエンドでテストする**ことにより、欠陥のあるコードが本番環境に移行する恐れをなくすことができるため、開発チームのスピードが向上します。主要なエンドポイントとユーザージャーニーで **SLO を計算する**ことにより、アプリケーションのパフォーマンス目標に専念し、最終的に一貫した顧客体験を提供することが容易になります。

## はじめに
たった数分で最初の Synthetics テストを作成し、Web アプリケーションの監視を開始して、パフォーマンスを向上させることができます。

### API テストと Multistep API テストのセットアップ

API テストを使用すると、`HTTP`、`TCP`、`SSL`、`DNS` などのさまざまなネットワークレベルで[シングル][1]または[チェーン][2]リクエストを起動し、キーシステムで検証を実行できます。最初の [HTTP テスト][3]、[TCP テスト][4]、[SSL テスト][5]、[DNS テスト][6]を作成して、API とネットワークの監視を開始しましょう。

{{< img src="synthetics/api_test.png" alt="API テスト"  style="width:100%;">}}

### ブラウザテストを記録する

[Synthetic ブラウザテスト][7]を使用すれば、エンドツーエンドのテストを記録して、顧客が世界中の Web ページをどのように体験しているかを監視できます。

{{< img src="synthetics/browser_test.gif" alt="ブラウザテスト"  style="width:100%;">}}

### プライベートロケーションを起動する

[Synthetic プライベートロケーション][8]を使用すれば、内部 API と Web サイトを監視したり、ビジネスにミッションクリティカルな領域にカスタムロケーションを作成したりすることができます。

{{< img src="synthetics/private_locations.png" alt="プライベートロケーション"  style="width:100%;">}}

### インテグレーションとデプロイプロセスでテストを実行する

Synthetics テストを[カナリア][9]として活用するか、[CI パイプライン][9]内で直接実行すれば、欠陥のあるコードが顧客の体験に影響を与えることを恐れずに出荷を開始できます。

 {{< img src="synthetics/ci.png" alt="CI テスト"  style="width:100%;">}}

### Synthetic モニタリングデータとトレースを接続する

[Synthetics テストと APM トレース間のすぐに使えるインテグレーション][10]を利用すれば、フロントエンド、ネットワーク、バックエンドリクエスト全体の障害の根本的な原因を見つけることができます。

{{< img src="synthetics/synthetics_traces.gif" alt="Synthetic モニタリング" style="width:100%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/api_tests/
[2]: /ja/synthetics/multistep
[3]: /ja/getting_started/synthetics/api_test
[4]: /ja/synthetics/api_tests/?tab=tcptest
[5]: /ja/synthetics/api_tests/?tab=ssltest
[6]: /ja/synthetics/api_tests/?tab=dnstest
[7]: /ja/getting_started/synthetics/browser_test
[8]: /ja/getting_started/synthetics/private_location
[9]: /ja/synthetics/ci/
[10]: /ja/synthetics/apm/