---
title: API テスト
kind: documentation
description: パブリックサービスと内部サービスのリクエストをシミュレートする
aliases:
  - /ja/synthetics/uptime_check
  - /ja/synthetics/api_test
further_reading:
  - link: 'https://www.datadoghq.com/blog/introducing-synthetic-monitoring/'
    tag: ブログ
    text: Datadog Synthetic モニタリングの紹介
  - link: /getting_started/synthetics/api_test
    tag: Documentation
    text: API テストの概要
  - link: /synthetics/api_tests/http_tests
    tag: Documentation
    text: 初めての HTTP テストを作成する
  - link: /synthetics/api_tests/ssl_tests
    tag: Documentation
    text: 初めての SSL テストを作成する
  - link: /synthetics/api_tests/tcp_tests
    tag: Documentation
    text: 初めての TCP テストを作成する
  - link: /synthetics/api_tests/dns_tests
    tag: Documentation
    text: 初めての DNS テストを作成する
  - link: /synthetics/private_locations
    tag: Documentation
    text: 内部エンドポイントで API テストを実行する
  - link: 'https://www.datadoghq.com/blog/monitor-apis-with-datadog'
    tag: ブログ
    text: Datadog SSL、TLS、Multistep API テストを使用してワークフローを監視する
---
## 概要

API テストは、いつでもどこからでも**最も重要なサービスが利用可能であることをプロアクティブに監視**するのに役立ちます。API テストには、システムの**さまざまなネットワークレイヤー**でリクエストを起動できる 4 つの異なるフレーバーがあります。

- [`HTTP` テスト][1]
- [`SSL` テスト][2]
- [`TCP` テスト][3]
- [`DNS` テスト][4]

{{< img src="synthetics/api_tests/api_tests.mp4" alt="API テストのサブタイプ" video="true"  width="100%" >}}

サービスが応答遅延を起こしたり、予期しない方法 (たとえば、予期しない応答本文、間違った A レコードなど) で応答を開始した場合、テストは[**チームに警告する**][5]、[**CI パイプラインをブロックする**][6]、または[**障害のあるデプロイをロールバックする**][6]ことができます。

API テストは、Datadog [管理ロケーション][7]および[プライベートロケーション][8]から実行できるため、外部と内部の両方で**システムを完全にカバー**できます。

**注**: API テストは、サービスに対して実行される単一のリクエストです。API レベルまたは認証を必要とするエンドポイントで高度なビジネストランザクションを監視する場合は、[Multistep API テスト][9]を使用してリクエストをチェーンすることもできます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/api_tests/http_tests
[2]: /ja/synthetics/api_tests/ssl_tests
[3]: /ja/synthetics/api_tests/tcp_tests
[4]: /ja/synthetics/api_tests/dns_tests
[5]: /ja/synthetics/api_tests/http_tests?tab=requestoptions#notify-your-team
[6]: /ja/synthetics/ci
[7]: /ja/api/v1/synthetics/#get-all-locations-public-and-private
[8]: /ja/synthetics/private_locations
[9]: /ja/synthetics/multistep/