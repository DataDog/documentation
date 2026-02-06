---
algolia:
  rank: 70
  tags:
  - flaky test
  - flaky tests
  - test regression
  - test regressions
  - test service
  - test services
aliases:
- /ja/tests/search/
description: リポジトリ内のテスト パフォーマンスを可視化し、状況を把握できます。
further_reading:
- link: /continuous_integration/explorer
  tag: ドキュメント
  text: テスト実行の検索とフィルタリング
- link: /continuous_integration/guides/flaky_test_management
  tag: ドキュメント
  text: 不安定なテストの管理方法を確認する
title: リポジトリ
---

## 概要

[Repositories ページ][1] を使用すると、リポジトリ内のテスト傾向を把握したり、個々のコミットを調査して問題をデバッグしたりできます。

## テスト パフォーマンスと傾向

[Repositories ビュー][1] では、各リポジトリのデフォルト ブランチに対するヘルス メトリクスが集計表示されます。このビューは、組織内のリポジトリ全体にわたるテスト パフォーマンスと傾向を俯瞰するのに役立ちます。

Repositories ページでできること:
- 各リポジトリに存在する不安定なテストの総数を確認する。
- テストの信頼性が時間の経過とともに高まっているか、それとも低下しているかを追跡する。
- 各リポジトリの最新コミットにおけるテスト ステータスを確認する。
- 各リポジトリに関連付けられている {{< tooltip glossary="test service" >}} の数を確認する。

<!-- vale Datadog.pronouns = NO -->

自分がコミットしたリポジトリだけに絞り込むには、**My Repositories** を切り替え、GitHub アカウントに関連付けられているメール アドレスを入力します。複数のメール アドレスを入力できます。後からアドレスを変更する場合は、**Edit Authors** をクリックします。

<!-- vale Datadog.pronouns = YES -->

### リポジトリを調査する

リポジトリを選択すると、そのテスト パフォーマンスをより細かい粒度で確認できます。**Branch**、**Test Service**、**Env** のドロップダウンを使用して、目的のデータに絞り込んでください。ワイルドカード (**\***) フィルターを選ぶと、そのカテゴリ全体を集計したビューになります。

特定リポジトリのページでは、次の項目にアクセスできます:
- **Latest Commit**: 最新コミットのテスト ステータスとパフォーマンス。
- **Commits**: 最近のコミットと、それぞれのテスト統計の一覧。
- **Test Services**: リポジトリに追加したテスト サービスの概要。
- **Flaky Tests**: リポジトリ内の [不安定なテスト][2] に関するインサイト。
- **Test Regressions**: {{< tooltip glossary="test regression" >}} に関するインサイト。
- **Test Performance**: テストが時間の経過とともに高速化したか、または低速化したかを確認する。
- **Common Error Types**: リポジトリでよく発生するエラー種別を確認する。
- **All Test Runs**: リポジトリ内のすべてのテスト実行を探索する。

### リポジトリ設定

[Test Optimization settings][3] ページでは、各リポジトリで有効になっている機能と、適用したオーバーライドの概要を確認できます。リポジトリを選択し、次の機能を設定してください:
- **[GitHub Comments][4]**: プル リクエスト内にテスト結果のサマリーを直接表示します。
- **[Auto Test Retries][5]**: 失敗したテストを再試行し、不安定なテストによってビルドが失敗するのを防ぎます。
- **[Early Flake Detection][6]**: 開発サイクルの早い段階で不安定なテストを特定します。
- **[Test Impact Analysis][7]**: 変更対象コードに基づいて、該当コミットに関連するテストのみを自動で選択して実行します。

#### テスト サービスのオーバーライド

固有の設定が必要なテスト サービスがある場合、デフォルトのリポジトリ設定をオーバーライドできます。

オーバーライドを作成する手順:
1. [Test Optimization settings][3] ページで、テスト サービスを持つリポジトリを選択します。
1. **Edit Custom Settings** をクリックします。
1. オーバーライドを適用したいテスト サービスを選択し、展開して利用可能な設定を表示します。
1. 目的の設定を切り替えます。

各リポジトリで有効になっているオーバーライド数は、[settings][3] ページから確認できます。

## コミットのデバッグ

[Branches ビュー][9] を使用して、個々のコミットによって持ち込まれた問題を調査し、デバッグします。

**Branches** ビューのテーブルには、各ブランチの最新更新が表示されます。ブランチごとに、次の情報が含まれます:
- 関連するリポジトリ、ブランチ、テスト サービス、環境
- failed / new flaky / skipped / passed の各テスト数のカウンター
- リグレッション数のカウンター
- テスト実行の総時間
- ブランチが最後に更新された日時

<!-- vale Datadog.pronouns = NO -->

自分がコミットしたブランチだけに絞り込むには、**My Branches** を切り替え、GitHub アカウントに関連付けられているメール アドレスを入力します。複数のメール アドレスを入力できます。後からアドレスを変更する場合は、**Edit Authors** をクリックします。

<!-- vale Datadog.pronouns = YES -->

### デバッグ

コミットをデバッグするには、ブランチを選択して **Commit Overview** ページを開きます。コミット概要には、そのコミットが導入されたプル リクエスト、変更されたファイル、テスト ステータス、テスト パフォーマンスなどの詳細が一覧表示されます。

このページから、次の項目にもアクセスできます:
- **Failed Tests**: 失敗したテストの一覧。テストを選択すると、詳細とトレースを確認できます。
- **[New Flaky Tests][7]**: コミットで新たに発生した不安定なテストの一覧。
- **Test Regressions**: コミットによって導入された {{< tooltip glossary="test regression" >}} に関するインサイト。
- **Test Performance**: コミットがテスト パフォーマンスに与える影響を確認します。
- **Related Pipeline Executions**: 当該コミットの CI パイプライン実行を確認します。
- **All Test Runs**: 当該コミットのすべてのテスト実行を探索します。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/test-repositories
[2]: https://app.datadoghq.com/ci/test-repositories?view=repositories
[3]: /ja/tests/flaky_test_management
[4]: https://app.datadoghq.com/ci/settings/test-optimization
[5]: /ja/tests/developer_workflows/#test-summaries-in-github-pull-requests
[6]: /ja/tests/flaky_test_management/auto_test_retries/
[7]: /ja/tests/flaky_test_management/early_flake_detection/
[8]: /ja/tests/test_impact_analysis/
[9]: https://app.datadoghq.com/ci/test-repositories?view=branches