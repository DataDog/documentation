---
aliases:
- /ja/synthetics/dashboards/testing_coverage
- /ja/synthetics/test_coverage
description: ブラウザアクションのテストスイートのカバレッジを評価します。
further_reading:
- link: https://www.datadoghq.com/blog/test-coverage-monitoring-datadog/
  tag: ブログ
  text: Datadog RUM と Synthetic モニタリングでテストカバレッジを追跡する
- link: /synthetics/browser_tests
  tag: ドキュメント
  text: Synthetic ブラウザテストについて
- link: /real_user_monitoring/application_monitoring/browser/tracking_user_actions
  tag: ドキュメント
  text: RUM アクションについて
- link: /real_user_monitoring/session_replay
  tag: ドキュメント
  text: セッションリプレイについて
title: テストカバレッジ
---
## 概要 {#overview}

[{{< ui >}}Test Coverage{{< /ui >}} ページ][1]で、RUM ブラウザアクションの Synthetic テストカバレッジを調査します。このページは {{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Synthetic Monitoring & Testing{{< /ui >}} から確認できます。

[{{< ui >}}Test Coverage{{< /ui >}} ページ][1]は、[RUM アプリケーション][2]の全体的なテストカバレッジに関する実用的なインサイトを提供します。[Browser RUM SDK から収集されたデータ][3]と [Synthetic ブラウザテストの結果][4]を使用します。

{{< img src="synthetics/test_coverage/browser_actions.png" alt="概要セクション、テストされていないアクションセクション、テスト済みアクションセクションを備えたテストカバレッジページ" style="width:100%" >}}

Test Coverage ページでは、以下の情報が表示されます。

- アクセス数の多い Web ページ
- テストされた [RUM アクション][5]の割合
- テスト済みアクションの数と全アクション数
- アクションをカバーするブラウザテストの数
- 実際のユーザーのインタラクション数 

## アプリケーションまたはビューのテストカバレッジを調査してください {#investigate-test-coverage-for-an-application-or-view}

テストされていないアクションを特定し、Test Coverage ページで実際のユーザーインタラクションにリンクすることで、より包括的で正確なテストスイートを構築します。

アプリケーションやビューの中で、ブラウザテストを作成すべき箇所を特定します。

1. ドロップダウンメニューから RUM アプリケーションを選択するか、{{< ui >}}Application{{< /ui >}} ドロップダウンメニューから {{< ui >}}View Name{{< /ui >}} ビューを選択してください。
2. {{< ui >}}Custom{{< /ui >}} をクリックして、[カスタムアクション][5]のデータをフィルタリングしてください。これらは一意であり、生成されたアクションと比較してより正確なカバレッジ結果を提供します。テストカバレッジ分析に生成されたアクションを含める場合は、{{< ui >}}All Actions{{< /ui >}} を選択してください。
3. 以下のセクションで提示される情報を検証し、テストカバレッジのギャップを特定してください。

   {{< ui >}}Test Coverage Overview{{< /ui >}}
   : ユーザーセッション数、ブラウザテスト数、テスト中のアクションの割合、実際のユーザーインタラクション数で重み付けされたテスト中のアクションの割合、およびトップビューのリストが表示されます。

   {{< ui >}}Untested Actions{{< /ui >}}
   : テストされていないユーザーアクションの数、収集された全アクションの数、および実際のユーザーが最も多く操作しているトップアクション__を一覧表示します。

   {{< ui >}}Tested Actions{{< /ui >}}
   : ユーザーアクションを対象としたブラウザテストの数、実際のユーザーインタラクションの数、および実際のユーザーが最も多く操作しているトップアクション（_ テストされている _）を一覧表示します。

[Test Coverage ページ][1]には、広く使用されているアクションが表示され、アプリケーションであまり使用されていないアクションは非表示になります。表示されるデータの詳細については、[Synthetic Monitoring メトリクス][6]を参照してください。

## リプレイの表示とテストの追加 {#view-replays-and-add-tests}

[Test Coverage ページ][1]の情報を使って、以下の質問に答えます。

- アプリケーションでテストされていないアクションは何ですか？
- ユーザーに最も人気のあるビューは何ですか？
- より多くのブラウザテストが必要なアクションは何ですか？
- ユーザーアクションをカバーしているブラウザテストの割合は何ですか？

### セッションリプレイの表示 {#view-session-replays}

{{< ui >}}Play{{< /ui >}} アイコンを {{< ui >}}Untested Actions{{< /ui >}} テーブルのアクションの横でクリックして、[Session Replay][8]で[実際のユーザー操作の記録][7]を検証してください。

### アクションの検証 {#examine-actions}

アクションをクリックすると、選択したアクションを含むテスト、ビュー、セッション、およびこれらのテスト、ビュー、セッションのサブセットの数にアクセスできます。

{{< img src="synthetics/test_coverage/tested_action.png" alt="関連する Synthetic テスト、RUM ビュー、および Session Replay を表示するタブを備えたアクションサイドパネル" style="width:100%" >}}

アプリケーションの最も人気のあるセクションを新規または既存のブラウザテストに追加し、アプリケーションの主要なユーザージャーニーがコード変更によって悪影響を受けたときにアラートを出すことができます。

 テストを作成するには、[テストカバレッジページ][1]の右上にある {{< ui >}}+ New Test{{< /ui >}} をクリックしてください。[CI/CDパイプラインで直接][9]テストを実行することで、本番環境にコードをリリースする前にリグレッションが発生しないようにすることができます。 

[1]: https://app.datadoghq.com/synthetics/test-coverage/browser
[2]: /ja/synthetics/guide/explore-rum-through-synthetics/
[3]: /ja/real_user_monitoring/application_monitoring/browser/data_collected/
[4]: /ja/synthetics/browser_tests/
[5]: /ja/real_user_monitoring/guide/send-rum-custom-actions/
[6]: /ja/synthetics/metrics/
[7]: /ja/session_replay/
[8]: https://app.datadoghq.com/rum/explorer/
[9]: /ja/continuous_testing/

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/test-coverage/browser