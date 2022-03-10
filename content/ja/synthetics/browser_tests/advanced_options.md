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

デフォルトでは、ブラウザテストには [Datadog のロケーターシステム][1]が使用されます。テストを自己管理できるのは、Datadog ロケーターシステムだけであるため、特別な理由がある場合にのみカスタムセレクターを使用することをおすすめします。

カスタムロケーターを作成するには、ページ上にある任意の要素に対し、テストしたいステップ（**クリックする**、**マウスをかざす**、**アサートする**など）をレコーダー内で実行することで、実行すべきステップの種類を指定します。

カスタムロケーターを指定するには:

* 記録するか、手動で[ステップ][2]を追加します。
* 記録されたステップをクリックし、**Advanced options** をクリックします。
* HTML 要素を、X-path あるいは CSS クラス / ID（例: `div`、`h1`、`.hero-body`）を使用して選択することができます。
* 要素を定義した後、**Test** をクリックすると、記録中の要素が右の画面でハイライト表示されます。

{{< img src="synthetics/browser_tests/advanced_options/css.mp4" alt="テストハイライト要素" video=true >}}

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

## スクリーンショットのキャプチャを防ぐ

テストの実行時に手順のスクリーンショットがキャプチャされないようにできます。テスト結果に機密データを含めたくない場合に有用です。障害発生時のトラブルシューティングに影響を及ぼす可能性があるため、慎重に使用してください。セキュリティに関する詳細は、[こちら][3]でご確認ください。

{{< img src="synthetics/browser_tests/advanced_options/screenshot_capture_option.png" alt="スクリーンショットのキャプチャオプション" style="width:50%">}}

**注:** この機能は、ブラウザテストのコンフィギュレーションの[高度なオプション][4]として、グローバルテストレベルでも利用可能です。

## サブテスト

[サブテスト][5]の高度なオプションで、サブテストを実行する場所を指定することもできます。

* **Main（デフォルト）**: サブテストはメインのウィンドウで、他のステップに続いて実行されます。
* **New**: サブテストは新しいウィンドウで実行され、終了時にタブが閉じます。つまり、他のテストではそのウィンドウを使用できません。
* **Specific window**: サブテストは番号の付いたウィンドウで実行されます。そのため、他のテストでもそのウィンドウを使用できます。

{{< img src="synthetics/browser_tests/advanced_options/subtest.png" alt="サブテスト" style="width:60%">}}

サブテストをメインウィンドウで開くと、サブテストはメインのテストに続いて、先行するステップと同じ URL で実行されます。新しいウィンドウまたは特定のウィンドウで開くと、テストはサブテストの開始 URL で実行されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/guide/browser-test-self-maintenance
[2]: /ja/synthetics/browser_tests/actions/
[3]: /ja/security/synthetics/
[4]: /ja/synthetics/browser_tests/?tab=privacy#test-configuration
[5]: /ja/synthetics/browser_tests/actions/#subtests