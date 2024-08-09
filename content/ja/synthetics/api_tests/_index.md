---
aliases:
- /ja/synthetics/uptime_check
- /ja/synthetics/api_test
description: パブリックサービスと内部サービスのリクエストをシミュレートする
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: ブログ
  text: Datadog Synthetic モニタリングの紹介
- link: https://www.datadoghq.com/blog/monitor-apis-with-datadog
  tag: ブログ
  text: Datadog SSL、TLS、Multistep API テストを使用してワークフローを監視する
- link: https://learn.datadoghq.com/courses/intro-to-synthetic-tests
  tag: ラーニングセンター
  text: Synthetic テストの紹介
- link: /getting_started/synthetics/api_test
  tag: Documentation
  text: API テストの概要
- link: /synthetics/private_locations
  tag: ドキュメント
  text: 内部エンドポイントで API テストを実行する
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
  tag: Terraform
  text: Terraform による Synthetic API テストの作成と管理
title: API テスト
---

## 概要

API テストにより、最も重要なサービスを **能動的に監視** し、いつでもどこからでも利用可能にできます。

以下のサブタイプで、システムの異なるネットワークレイヤーでリクエストを起動します。

{{< partial name="synthetics/network-layers.html" >}}

サービスが応答遅延を起こしたり、予期しない方法 (予期しない応答本文、間違った A レコードなど) で応答を開始した場合、テストは[チームに警告する][1]、[CI パイプラインをブロックする][2]、[障害のあるデプロイをロールバックする][2]ことができます。

API テストは、Datadog [管理ロケーション][3]または[プライベートロケーション][4]から実行してシステムの**外部および内部をカバー**します。

**注:** API テストは、サービスに対して実行される単一のリクエストです。API レベルまたは認証を必要とするエンドポイントで高度なビジネストランザクションを監視する場合は、[Multistep API テスト][5]を使用してリクエストをチェーンします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/api_tests/http_tests?tab=requestoptions#notify-your-team
[2]: /ja/continuous_testing/cicd_integrations
[3]: /ja/synthetics/api_tests/http_tests/#select-locations
[4]: /ja/synthetics/private_locations
[5]: /ja/synthetics/multistep/