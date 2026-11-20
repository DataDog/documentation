---
aliases:
- /ja/synthetics/guide/browser-tests-switch-tabs/
- /ja/synthetics/guide/browser-test-self-maintenance/
description: ブラウザテストステップの詳細オプションを設定する
further_reading:
- link: https://www.datadoghq.com/blog/browser-tests/
  tag: ブログ
  text: Synthetic ブラウザテストによるユーザーエクスペリエンスモニタリング
- link: /synthetics/browser_tests/test_steps/
  tag: ドキュメント
  text: ブラウザテストステップの詳細について
title: ブラウザテストステップの詳細オプション
---
## 概要 {#overview}

このページでは、Synthetic Monitoring ブラウザテストの詳細オプションについて説明します。

## 要素の位置を特定 {#locate-an-element}

### Datadog アルゴリズム {#datadog-algorithm}

フロントエンドチームが変更を実装すると、テストが時折失敗し、実際のアプリケーションの問題ではなくテスト内の識別子が原因でアラートを送信することがあります。そのため、テストの不安定さはエンドツーエンドテストにおける課題となっています。

不安定なテストを防ぐために、Datadog ではロケーターのセットを活用したアルゴリズムを使って、ブラウザテストで要素をターゲットにしています。UI の小さな変更によって要素が変更される場合があります (例: 別の場所に移動する)。ブラウザテストは、変更の影響を受けなかった参照ポイントに基づいて、自動的に要素の位置を再特定します。

テストが正常に実行されると、ブラウザテストは機能しなくなったロケーターを更新された値で再計算（または「自己修復」）し、軽微な UI の変更でテストが壊れないようにして、アプリケーションの UI に自動的に適応させます。

ブラウザテストが予期しない変更を検証しないようにするには、テスト作成時に [アサーション][5] を使用してください。アサーションを使用すると、テストステップのジャーニーに関連する期待される動作と期待されない動作を定義できます。

### ユーザー指定のロケーター {#user-specified-locator}

デフォルトでは、ブラウザテストは Datadog ロケーターシステムを使用します。テストが操作対象の特定の要素（チェックアウトボタンなど）を検索する際、特定の XPath や特定の CSS セレクターを持つ要素を探すのではなく、複数の異なる参照ポイント（XPath、テキスト、クラス、近くの要素など）を使用して要素の位置を特定します。

これらの参照ポイントはロケーターのセットとなり、それぞれが要素を一意に定義します。Datadog ロケーターシステムによりテストが自己メンテナンス可能になるため、カスタムセレクターはエッジケースでのみ使用してください。

カスタムセレクターは、ページ上の任意の要素に対して、レコーダーで対象のステップ（**click**、**hover**、**assert**など）を実行することで作成されます。これにより、実行する必要があるステップの種類が指定されます。

特定の識別子を使用するには（例：要素の内容に関係なく、ドロップダウンメニュー内の `nth` 要素をクリックする場合）：

1. ステップを記録するか、[ステップ][1] を手動で記録に追加します。
2. 記録されたステップをクリックし、{{< ui >}}Advanced options{{< /ui >}} をクリックします。
3. HTML要素に対して、{{< ui >}}User Specified Locator{{< /ui >}} の下にXPath 1.0セレクターまたはCSSクラス/IDを入力します（例：`div`、`h1`、または`.hero-body`）。
4. オプションとして、handlebars（`{{`）構文を使用して動的コンテンツを挿入します。変数があらかじめ登録されたドロップダウンリストが表示されます：

{{< img src="synthetics/browser_tests/advanced_options/advanced_user_locator_2.png" alt="変数を含むhandlebars構文を強調表示するユーザー指定ロケーターフィールド" style="width:70%">}}

5. 要素を定義したら、{{< ui >}}Highlight{{< /ui >}} をクリックして、右側の記録内でその要素をハイライトします。

デフォルトでは、{{< ui >}}If user specified locator fails, fail test{{< /ui >}} チェックボックスが選択されています。これは、定義したロケーターで要素を特定できない場合、テストが失敗とみなされることを意味します。

{{< img src="synthetics/browser_tests/advanced_options/css_2.mp4" alt="ハイライトされた要素をテスト" video=true >}}

{{< ui >}}If user specified locator fails, fail test{{< /ui >}} ボックスのチェックを外すことで、通常のブラウザテストアルゴリズムにフォールバックするように設定できます。

{{< img src="synthetics/browser_tests/advanced_options/fail_test.png" alt="テスト失敗オプション" style="width:70%">}}


## タイムアウト {#timeout}

ブラウザテストで要素が見つからない場合、そのステップを60秒間再試行します。

テストで対象の要素を見つけるまでの待機時間を短くしたり、最大300秒まで長くしたりすることができます。

{{< img src="synthetics/browser_tests/advanced_options/time_before_fail.png" alt="失敗までの時間" style="width:50%">}}

## オプションのステップ {#optional-step}

ポップアップを閉じるステップなど、ステップをオプションにするには、{{< ui >}}If this step fails, continue to next step{{< /ui >}} を選択します。ステップがタイムアウト（デフォルトでは60秒）後に失敗した場合、テストは次のステップを実行します。

このオプションでは {{< ui >}}If this step fails, mark test as failed{{< /ui >}} も表示されますが、これはデフォルトで選択されています。これが選択されている場合、残りのステップが実行された後もテストは失敗します。オプションのステップが失敗したときにテストを合格のままにするには、このオプションの選択を解除します。

{{< img src="synthetics/browser_tests/advanced_options/optional_step_2.png" alt="「次のステップに進む」が選択され、「テストを失敗としてマークする」がオフになっているステップの詳細オプション。" style="width:50%">}}

## 成功時に終了{#exit-on-success}

ステップが正常に完了した後にテストを終了するように、このオプションを設定します。これにより、不要なステップの実行を防ぎ、テストが失敗としてマークされるのを回避できます。

{{< img src="synthetics/browser_tests/advanced_options/exit_on_success_browser.png" alt="成功時に終了" style="width:50%">}}

## このステップを常に実行{#always-run-this-step}

前のステップが失敗した場合でもこのステップを実行するように、このオプションを設定します。これは、後続のステップを進めたい場合のクリーンアップタスクに役立ちます。

{{< img src="synthetics/browser_tests/advanced_options/always_run_step.png" alt="前のステップが失敗した場合でもステップを常に実行する" style="width:50%">}}


## スクリーンショットのキャプチャを防止{#prevent-screenshot-capture}

テスト実行時にステップのスクリーンショットがキャプチャされないようにすることができます。これは、機密データがテスト結果に含まれないようにするのに役立ちます。失敗時のトラブルシューティングが困難になる可能性があるため、注意して使用してください。詳しくは、[Synthetic Monitoring Data Security][2] をご覧ください。

{{< img src="synthetics/browser_tests/advanced_options/screenshot_capture_option.png" alt="スクリーンショットキャプチャオプション" style="width:50%">}}

**注:** この機能は、ブラウザテスト設定の [詳細オプション][3] としてグローバルテストレベルでも利用できます。

## サブテスト {#subtests}

[サブテスト][4] の詳細オプションでは、サブテストの実行場所を選択し、サブテストが失敗した場合のブラウザテストの動作を設定できます。

{{< img src="synthetics/browser_tests/advanced_options/subtest_advanced_2.png" alt="ブラウザテストにおけるサブテストの詳細オプション" style="width:60%">}}

### サブテストウィンドウを設定 {#set-the-subtest-window}

* {{< ui >}}Main (default){{< /ui >}}: サブテストはメインウィンドウで、他のステップと順番に実行されます。
* {{< ui >}}New{{< /ui >}}: サブテストは新しいウィンドウで実行され、サブテストの終了時に閉じられます。これは、ウィンドウを再利用できないことを意味します。
* {{< ui >}}Specific window{{< /ui >}}: サブテストは番号付きウィンドウで実行され、他のサブテストによって再利用できます。

サブテストをメインウィンドウで開くということは、前のステップのURLを使用するため、サブテストがメインテストの続きになることを意味します。サブテストを新しいウィンドウ、または特定のウィンドウで開くということは、テストがサブテストの開始URLから実行されることを意味します。

### 失敗時の動作を設定 {#set-failure-behavior}

サブテストが失敗しても親テストを継続させるには、{{< ui >}}If this step fails, continue to next step{{< /ui >}}を選択してください。{{< ui >}}If this step fails, mark test as failed{{< /ui >}}はデフォルトで選択されています。これが選択されている場合、親テストは残りのステップを実行した後に失敗となります。サブテストが失敗しても親テストを成功のままにするには、このオプションの選択を解除してください。

### 成功時の動作を設定 {#set-success-behavior}

ブラウザテストを直ちに停止し、合格としてマークするには、{{< ui >}}If this step succeeds, stop this test and mark it as passed{{< /ui >}}をクリックしてください。

### 実行時の動作を設定 {#set-execution-behavior}

ブラウザテストの前のステップが失敗した場合でもこのステップを確実に実行するには、{{< ui >}}Always run this step{{< /ui >}}をクリックしてください。

### サブテスト内の変数を上書き {#override-variables-in-subtests}

ブラウザテストのサブテストで変数値を上書きするには、サブテストで変数を指定し、親テストで同じ変数名を使用してください。そうすることで、ブラウザテストがサブテストの値を上書きします。

詳細については、「[ブラウザテストのステップ][4]」を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/browser_tests/test_steps/
[2]: /ja/data_security/synthetics/
[3]: /ja/synthetics/browser_tests/?tab=privacy#test-configuration
[4]: /ja/synthetics/browser_tests/test_steps/#subtests
[5]: /ja/synthetics/browser_tests/test_steps/#assertion