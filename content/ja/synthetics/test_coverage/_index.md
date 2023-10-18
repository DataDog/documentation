---
aliases:
- /ja/synthetics/dashboards/testing_coverage
description: ブラウザテストのアプリケーションカバレッジを評価し、アプリケーション内の人気のある要素を RUM と Synthetic のデータを使用して追跡する要素として特定します。
further_reading:
- link: https://www.datadoghq.com/blog/test-coverage-monitoring-datadog/
  tag: GitHub
  text: Datadog RUM と Synthetic モニタリングでテストカバレッジを追跡する
- link: /synthetics/browser_tests
  tag: ドキュメント
  text: Synthetic ブラウザテストについて
- link: /real_user_monitoring/browser/tracking_user_actions
  tag: ドキュメント
  text: RUM アクションについて
- link: /real_user_monitoring/session_replay
  tag: ドキュメント
  text: セッションリプレイについて
kind: documentation
title: テストカバレッジ
---

## 概要

[**Test Coverage** ページ][1]では、[RUM アプリケーション][9]の全体的なテストカバレッジについて、アクションにつながる洞察を提供します。これは、[Browser RUM SDK から収集したデータ][2]と [Synthetic ブラウザテストからの結果][3]を使用しています。

{{< img src="synthetics/test_coverage/test_coverage.png" alt="Overview セクション、Unttested Actions セクション、Tested Actions セクションを持つ Test Coverage ページ" style="width:100%" >}}

Test Coverage ページでは、以下の情報が表示されます。

- アクセス数の多い Web ページ
- テストされた RUM アクションの割合
- テストした回数と総アクション数
- アクションをカバーするブラウザテストの数
- リアルユーザーとのインタラクション数

## アプリケーションやビューのテストカバレッジを調査する

テストされていないアクションを特定し、Test Coverage ページで実際のユーザーインタラクションにリンクすることで、より包括的で正確なテストスイートを構築します。

アプリケーションやビューの中で、ブラウザテストを作成すべき箇所を特定します。

1. **Application** ドロップダウンメニューから RUM アプリケーションを選択するか、**View Name** ドロップダウンメニューからビューを選択します。
2. [カスタムアクション][4]は、ユニークで、生成されたアクションと比較してより正確なカバレッジ結果を提供するものです。生成されたアクションをテストカバレッジ分析に含める場合は、**All Actions** を選択します。
3. 以下のセクションで提示される情報を検証することで、テストカバレッジのギャップを特定します。

   **Test Coverage Overview** 
   : ユーザーセッション数、ブラウザテスト数、テスト中のアクションの割合、実際のユーザーインタラクション数で重み付けされたテスト中のアクションの割合、およびトップビューのリストが表示されます。

   **Untested Actions**
   : テストされていないユーザーアクションの数、収集された全アクションの数、および実際のユーザーが最も交流するがテストされていないトップアクションのリストが表示されます。

   **Tested Actions**
   : ユーザーアクションを対象としたブラウザテスト数、実ユーザーインタラクション数、実ユーザーが最も多くインタラクションし、テストされているトップアクションのリストが表示されます。

[Test Coverage ページ][1]には、アプリケーションで拡張的に使用されているアクションが入力され、あまり使用されていないアクションは非表示になります。表示されるデータの詳細については、[Synthetic モニタリングメトリクス][5]を参照してください。

## リプレイの表示とテストの追加

[Test Coverage ページ][1]の情報を使って、以下の質問に答えます。

- アプリケーションでは何のアクションがテストされていないのか？
- ユーザーから最も支持されているビューは何か？
- ブラウザテストが必要なアクションは？
- ユーザーのアクションをカバーしているブラウザテストの割合は？

### セッションリプレイの表示

**Untested Actions** テーブルのアクションの横にある **Play** アイコンをクリックすると、[セッションリプレイ][8]で[実際のユーザー操作の記録][7]を検証することができます。

### アクションの検証

アクションをクリックすると、選択したアクションを含むテスト、ビュー、セッション、およびこれらのテスト、ビュー、セッションのサブセットの数にアクセスできます。

{{< img src="synthetics/test_coverage/tested_action.png" alt="関連する Synthetic テスト、RUM ビュー、セッションリプレイを表示するタブを備えたアクションサイドパネル" style="width:100%" >}}

アプリケーションの最も人気のあるセクションを新規または既存のブラウザテストに追加し、アプリケーションの主要なユーザージャーニーがコード変更によって悪影響を受けたときにアラートを出すことができます。

テストを作成するには、[Test Coverage ページ][1]の右上にある **+ New Test** をクリックします。[CI/CD パイプラインで直接][6]テストを実行し、コードを実運用にリリースする前に回帰が発生しないことを確認することができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/test-coverage
[2]: /ja/real_user_monitoring/browser/data_collected/
[3]: /ja/synthetics/browser_tests/
[4]: /ja/real_user_monitoring/guide/send-rum-custom-actions/
[5]: /ja/synthetics/metrics/
[6]: /ja/continuous_testing/
[7]: /ja/real_user_monitoring/session_replay/
[8]: https://app.datadoghq.com/rum/explorer/
[9]: https://app.datadoghq.com/rum/list