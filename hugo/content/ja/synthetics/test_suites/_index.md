---
description: Synthetic Monitoring テストを意味のあるグループに整理します。
further_reading:
- link: /synthetics/
  tag: ドキュメント
  text: Synthetic Monitoring について
- link: /monitors/types/synthetic_monitoring/
  tag: ドキュメント
  text: Synthetic テスト モニターを構成する
- link: /synthetics/troubleshooting/
  tag: ドキュメント
  text: Synthetic Monitoring トラブル シューティング
- link: https://www.datadoghq.com/blog/test-suites/
  tag: ブログ
  text: 複雑なテスト環境から整理された実用的なインサイトを得る
title: テスト スイート
---


## 概要

Synthetic Monitoring のテスト スイートは、複数のテストを 1 つのコレクションにまとめて、管理やトラブル シューティングを簡素化できます。ユーザー ジャーニー、環境、ロケーション、サービス、チーム、その他ワークフローに合うあらゆる軸でテストをグループ化できます。集計結果を表示し、失敗しているコンポーネントを特定し、関連するテスト全体でアプリケーション パフォーマンスを把握できます。すべてを 1 つのビューから行えます。

## 主な機能

- **集中可視化**: スイート内のすべてのテストとその結果を 1 か所で確認できます。
- **管理の簡素化**: 個別テストごとではなく、テスト グループを作成して実行できます。
- **保守の容易化**: アプリケーションの変更時に、更新が必要なテストを特定できます。

## テスト スイートの作成

新しいテスト スイートを作成するには:
1. Datadog で **Digital Experience** に移動します。
2. **New Test Suite** をクリックします。
3. 必要に応じて、[Synthetic Monitoring テスト][1] ページに移動し、**+ New Suite** をクリックします。

## テスト スイートの構成

1. スイート名を入力します (例: `Checkout flow` または `API health checks`)。
2. 既存の Synthetic Monitoring テストを含めるには **Add Tests** をクリックします。
   次のことができます:
   - **Search** で名前またはタグを検索。
   - **Filter** でテスト タイプを絞り込み (例: Browser、API、Private Location、Mobile)。
   - **Select** で含めるテストを 1 件以上選択。
3. 選択したら **Add Selected Tests** をクリックして確定します。
4. 各エントリ横の **Remove Test from Suite** アイコンで、必要に応じてテストを削除できます。
5. 完了したら **Save suite** をクリックします。

{{< img src="synthetics/test_suites/test_suite_creation.png" alt="Synthetic Monitoring テスト スイートの作成ページ" style="width:80%;">}}

## 表示と管理

スイートを作成すると、[Synthetic Monitoring テスト][1] ページの **Suites** タブに表示されます。または **Digital Experience > Test Suites** からテスト スイートにアクセスできます。任意のテスト スイートをクリックすると、次が表示されます:

- **サマリー**: テスト結果 (成功、失敗、スキップ)。
- **実行の詳細**: タイミング、環境、テスト タイプ。
- **フィルター**: ロケーション、期間、タグで絞り込み。
- **ドリルダウン リンク**: さらに深掘りするため、個々のテスト実行へ遷移。

スイート内でソートや検索を行い、失敗中または最近更新されたテストにフォーカスできます。**View All** オプションを使うと、含まれるすべてのテストの集約パフォーマンスを可視化できます。

**注**: テスト実行は、そのテストをスイートに追加した日以降のものだけがスイートに表示されます。以前の結果を確認するには、個別のテスト ページを参照してください。テスト名を変更しても、過去の実行は元の名前のまま表示されます。スイートに追加できるテストの最大数は 300 件です。

{{< img src="synthetics/test_suites/test_suite_summary.png" alt="Synthetic Monitoring テスト スイートのサマリー ページ" style="width:100%;">}}

## トラブル シューティング

一部のテストがスイートに表示されない場合:

- テストがアクティブで、削除されていないことを確認します。
- それらのテストを表示するための必要な権限があることを確認します。
- テスト追加時にフィルターを更新するか、検索語をクリアします。

実行結果が不完全に見える場合:

- テスト実行頻度と直近のアクティビティを確認します。
- タグやロケーションの不一致により、実行がフィルタリングされていないか確認します。
- テストとの関連付けを更新するため、テスト スイートを再保存してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/tests