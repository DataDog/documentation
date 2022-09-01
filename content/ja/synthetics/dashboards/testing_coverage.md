---
description: すぐに使える Synthetics アプリケーションテストカバレッジダッシュボードについてご紹介します。
further_reading:
- link: /synthetics/browser_tests
  tag: ドキュメント
  text: Synthetic ブラウザテストについて
- link: /real_user_monitoring/
  tag: ドキュメント
  text: RUM とセッションリプレイについて
kind: documentation
title: アプリケーションテストカバレッジダッシュボード
---

## 概要

[アプリケーションテストカバレッジダッシュボード][1]は、[RUM][2] から収集したデータと Synthetic [ブラウザテスト][3]の結果を使用して、アプリケーションのテストカバレッジ全体に関する洞察を提供するものです。

このダッシュボードを使用すると、以下のトピックに関する情報を使用して、より完全で正確なテストスイートを構築することができます。

- アクセス数の多い Web ページのリスト
- テストされた RUM アクションの割合
- テストした回数と総アクション数
- アクションをカバーするブラウザテストの数
- リアルユーザーとのインタラクション数

以下が示されます。

- **Percentage of tested actions**: アプリケーションの全体的なテストカバレッジをスキャンします。
- **Untested actions**: 実際のユーザーインタラクションの数とブラウザテストでカバーされたアクションの数で、最も人気のある未テストのユーザーアクションを探ります。

{{< img src="synthetics/dashboards/testing_coverage.png" alt="すぐに使える Synthetics テストカバレッジダッシュボード" style="width:100%" >}}

{{< img src="synthetics/dashboards/testing_coverage_actions_tests.png" alt="未テストの RUM アクションと、Synthetics テストカバレッジダッシュボードの RUM アクションセクションをカバーするトップ Synthetic ブラウザテスト" style="width:100%" >}}

表示されるデータの詳細については、[Synthetic モニタリングメトリクス][4]を参照してください。

## ブラウザテストの管理

テストカバレッジを向上させ、ブラウザテストをよりよく管理するために、このダッシュボードは次の質問に答えるのに役立ちます。

- アプリケーションでは何のアクションがテストされていないのか？
- ユーザーから最も支持されているビューは何か？
- ブラウザテストが必要なアクションは？
- ユーザーのアクションをカバーしているブラウザテストの割合は？

既存のブラウザテストにアプリケーションの最も人気のあるセクションを追加するか、ブラウザテストを作成することで、アプリケーションの主要なユーザージャーニーがコード変更によって悪影響を受けたときにアラートを受け取ります。[CI/CD パイプラインで直接][5]テストを実行し、コードを本番にリリースする前にリグレッションが発生しないことを確認することができます。

トップビューまたは未テストアクションのブラウザテストを追加するには、**Top Views** のテスト済みアクションの割合が低いビューまたは **Untested Actions** のアクションをクリックして、ドロップダウン メニューから **Create a Synthetics browser test** を選択します。**View RUM events** をクリックすると、特定のビュー名を持つアクションの自動検索クエリで [RUM エクスプローラー][6]にナビゲートされます。

**Top Views** の表には、ユーザーが最も多く閲覧している Web ページが、実際のユーザーインタラクション数、ブラウザテストでのアクションの割合とともに掲載されます。

## カスタムアクションを探る

[テンプレート変数][7]を使ってデータ型をカスタマイズし、[カスタムアクション][8]でクエリしたデータをフィルターにかけます。

Datadog では、カスタムアクションの利用を推奨しています。デフォルトでは、カスタムアクションは一意で、生成されたアクションと比較して、より正確なカバレッジ結果を提供します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/30697/synthetics---browser-test-performance
[2]: /ja/real_user_monitoring/browser/data_collected/
[3]: /ja/synthetics/browser_tests/
[4]: /ja/synthetics/metrics/
[5]: /ja/synthetics/cicd_integrations/
[6]: /ja/real_user_monitoring/explorer
[7]: /ja/dashboards/template_variables/
[8]: /ja/real_user_monitoring/guide/send-rum-custom-actions/