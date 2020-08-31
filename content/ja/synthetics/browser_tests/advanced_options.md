---
title: ブラウザテストステップの高度なオプション
kind: ドキュメント
description: ブラウザテストステップに高度なオプションを構成する
further_reading:
  - link: /synthetics/browser_tests/actions/
    tag: ドキュメント
    text: ブラウザテストステップについて
---
## ユーザー指定のロケーター

デフォルトでは、[ブラウザテスト][1]には Datadog のロケーターシステムが使用されます。テストを自己管理できるのはこのロケーターシステムだけです。したがって、カスタムロケーターは特別な理由がある場合にのみ使用することをお勧めします。

カスタムロケーターを作成するには、ページ上にある任意の要素に対し、テストしたいステップ（**クリックする**、**マウスをかざす**、**アサートする**など）をレコーダー内で実行することで、実行すべきステップの種類を指定します。

カスタムロケーターを指定するには:

* 記録するか、手動で[ステップ][2]を追加します。
* 記録されたステップをクリックし、**Advanced options** をクリックします。
* HTML 要素を、X-path あるいは CSS クラス / ID（例: `div`、`h1`、`.hero-body`）を使用して選択することができます。
* 要素を定義した後、**Test** をクリックすると、記録中の要素が右の画面でハイライト表示されます。

{{< img src="synthetics/browser_tests/advanced_options/css.gif" alt="要素のハイライト表示">}}

デフォルトで、**If user specified locator fails, fail test** のチェックボックスはオンになっています。つまり、定義したロケーターが失敗した場合、テストは失敗と見なされます。

通常のアルゴリズムでブラウザテストを行う場合は、**If user specified locator fails, fail test** チェックボックスをオフにしてください。

{{< img src="synthetics/browser_tests/advanced_options/fail_test.png" alt="テスト失敗時のオプション" style="width:70%">}}

## タイムアウト

ブラウザテストが要素を特定できない場合、デフォルトでステップを 60 秒間再試行します。

このタイムアウト時間は、最長 300 秒まで増やしたり減らしたりできます。ターゲットの要素を特定できるまで待機する時間を変更するには、この秒数を指定してください。

{{< img src="synthetics/browser_tests/advanced_options/time_before_fail.png" alt="エラーまでの時間" style="width:50%">}}

## オプションステップ

たとえばポップアップイベントなどで、いくつかのステップをオプションで追加することが必要になるかもしれません。その場合は、**Allow this step to fail** を選択してください。ステップが失敗したまま、タイムアウトオプションに指定した時間（デフォルトでは 60 秒）を経過した場合に、テストが次のステップへと移動して実行されます。

{{< img src="synthetics/browser_tests/advanced_options/timeout.png" alt="タイムアウト" style="width:25%">}}

## サブテスト

[Subtests][3] の高度なオプションで、サブテストを実行する場所を指定することもできます。

* **Main（デフォルト）**: サブテストはメインのタブで、他のステップに続いて実行されます。
* **New**: サブテストは新しいタブで実行され、終了時にタブが閉じます。つまり、他のテストではそのタブを使用できません。
* **Specific tab**: タブテストは番号の付いたタブで実行されます。そのため、他のテストでもそのタブを使用できます。

{{< img src="synthetics/browser_tests/advanced_options/subtest.png" alt="サブテスト" style="width:60%">}}

Main を選んだ場合、サブテストはメインのテストに続いて、先行するステップと同じ URL で実行されます。New あるいは Specific Tab を選んだ場合、サブテストの開始 URL でテストが実行されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/browser_tests/
[2]: /ja/synthetics/browser_tests/actions/
[3]: /ja/synthetics/browser_tests/actions/#subtests