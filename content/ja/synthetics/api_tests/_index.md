---
title: API テスト
kind: documentation
description: パブリックサービスと内部サービスのリクエストをシミュレートする
aliases:
  - /ja/synthetics/uptime_check
  - /ja/synthetics/api_test
further_reading:
  - link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
    tag: ブログ
    text: Datadog Synthetic モニタリングの紹介
  - link: https://learn.datadoghq.com/course/view.php?id=39
    tag: ラーニングセンター
    text: Synthetic テストの紹介
  - link: /getting_started/synthetics/api_test
    tag: Documentation
    text: API テストの概要
  - link: /synthetics/private_locations
    tag: Documentation
    text: 内部エンドポイントで API テストを実行する
  - link: https://www.datadoghq.com/blog/monitor-apis-with-datadog
    tag: ブログ
    text: Datadog SSL、TLS、Multistep API テストを使用してワークフローを監視する
---
## 概要

API テストにより、最も重要なサービスを **能動的に監視** し、いつでもどこからでも利用可能にできます。

以下のサブタイプで、システムの異なるネットワークレイヤーでリクエストを起動します。

{{< partial name="synthetics/network-layers.html" >}}

サービスが応答遅延を起こしたり、予期しない方法 (予期しない応答本文、間違った A レコードなど) で応答を開始した場合、テストは[チームに警告する][1]、[CI パイプラインをブロックする][2]、[障害のあるデプロイをロールバックする][2]ことができます。

API テストは、Datadog [管理ロケーション][3]または[プライベートロケーション][4]から実行してシステムの**外部および内部をカバー**します。

**注**: API テストは、サービスに対して実行される単一のリクエストです。API レベルまたは認証を必要とするエンドポイントで高度なビジネストランザクションを監視する場合は、[Multistep API テスト][5]を使用してリクエストをチェーンします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/api_tests/http_tests?tab=requestoptions#notify-your-team
[2]: /ja/synthetics/ci
[3]: /ja/api/v1/synthetics/#get-all-locations-public-and-private
[4]: /ja/synthetics/private_locations
[5]: /ja/synthetics/multistep/