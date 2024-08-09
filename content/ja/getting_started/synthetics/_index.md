---
algolia:
  tags:
  - 外形監視
further_reading:
- link: https://learn.datadoghq.com/courses/intro-to-synthetic-tests
  tag: ラーニングセンター
  text: Synthetic テストの紹介
- link: /synthetics/api_tests
  tag: ドキュメント
  text: API テストについて
- link: /synthetics/multistep
  tag: ドキュメント
  text: マルチステップ API テストの詳細
- link: /synthetics/browser_tests
  tag: ドキュメント
  text: ブラウザテストについて
- link: /synthetics/private_locations
  tag: Documentation
  text: プライベートロケーションの詳細
- link: /continuous_testing/cicd_integrations
  tag: ドキュメント
  text: CI パイプラインでの Synthetic テスト実行について学ぶ
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: Synthetic テストの能力を高めるためのインタラクティブなセッションに参加できます
title: Synthetic モニタリングの概要
---

## 概要

Synthetic テストでは、**世界中からのシミュレートされたリクエストとアクション**を使用して、システムとアプリケーションがどのように実行されているかを観察できます。Datadog は、バックエンドからフロントエンドまで、さまざまなネットワークレベル (`HTTP`、`SSL`、`DNS`、`WebSocket`、`TCP`、`UDP`、`ICMP`、`gRPC`) で、制御された安定した方法で Web ページと API のパフォーマンスを追跡します。障害のある動作 (リグレッション、機能の破損、応答時間の長さ、予期しないステータスコードなど) を警告します。

{{< img src="getting_started/synthetics/synthetic-monitoring-overview.png" alt="Synthetic モニタリングテスト" style="width:100%;" >}}

## Synthetic テストタイプ

Datadog は、**API テスト**、*Multistep API テスト**、*ブラウザテスト**を提供しています。

内部向けアプリケーションを監視するために、管理ロケーションまたはプライベートロケーションからテストを実行します。Synthetic テストは、手動、スケジュール、または CI/CD パイプラインから直接トリガーすることができます。

## 前提条件

[Datadog アカウント][1]をまだ作成していない場合は作成します。

## 初めてテストを構成する場合

Datadog を使用して最初の Synthetic テストを設定するには、次のオプションから選択します。

- [API テストを作成][2]して、API エンドポイントのアップタイムの監視を開始します。
- [マルチステップ API テストを作成][3]して、複数の HTTP リクエストをリンクし、API レベルで主要なワークフローの監視を開始します。
- [ブラウザテストを作成][4]して、アプリケーションで重要なビジネストランザクションのテストを開始します。
- [プライベートロケーションを作成][5]して、すべての Synthetic テストタイプを使用して内部アプリケーションを監視し始めます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/
[2]: /ja/getting_started/synthetics/api_test/
[3]: /ja/getting_started/synthetics/api_test/#create-a-multistep-api-test
[4]: /ja/getting_started/synthetics/browser_test/
[5]: /ja/getting_started/synthetics/private_location/