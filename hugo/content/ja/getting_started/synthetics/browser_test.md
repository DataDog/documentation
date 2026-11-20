---
description: Datadog ブラウザテストを作成して、デバイスやブラウザ上でユーザージャーニーを監視します。テストシナリオの記録、アラートの設定、ビジネストランザクションの検証を行います。
further_reading:
- link: https://learn.datadoghq.com/courses/getting-started-with-synthetic-browser-testing
  tag: ラーニングセンター
  text: Synthetic ブラウザテストの概要
- link: /synthetics/browser_tests
  tag: ドキュメント
  text: ブラウザテストの詳細
- link: /getting_started/synthetics/private_location
  tag: ドキュメント
  text: プライベートロケーションの詳細
- link: /continuous_testing/cicd_integrations
  tag: ドキュメント
  text: CI/CD パイプラインから Synthetic テストをトリガーする方法
- link: /synthetics/identify_synthetics_bots
  tag: ドキュメント
  text: API テスト用の Synthetic ボットを特定する方法
- link: /synthetics/guide/synthetic-test-monitors
  tag: ドキュメント
  text: Synthetic テストモニターについて
- link: /synthetics/guide/export-tests-to-terraform
  tag: ガイド
  text: Synthetic テストを Terraform にエクスポートする
title: ブラウザテストの概要
---
## 概要 {#overview}

[ブラウザテスト][1]は、Datadog が Web アプリケーション上で実行するシナリオです。定期的なインターバルを設定して、複数の場所、デバイス、ブラウザからテストを実行したり、CI/CD パイプラインから実行したりすることができます。これらのテストは、ユーザーがアプリケーション上で**主要なビジネストランザクション**を実行できること、および最近のコード変更によってマイナスの影響を受けていないことを検証します。

## ブラウザテストを作成する {#create-a-browser-test}

以下の例は、カートにアイテムを追加してから正常にチェックアウトするまでのユーザージャーニーをマッピングするブラウザテストの作成を示しています。

### テストの詳細を構成する {#configure-your-test-details}

1. Datadog サイトで、左側のメニューにある {{< ui >}}Digital Experience{{< /ui >}} にカーソルを合わせ、[{{< ui >}}Tests{{< /ui >}}][2] ({{< ui >}}Synthetic Monitoring & Testing{{< /ui >}} の下) を選択します。
2. 右上隅から、{{< ui >}}New Test{{< /ui >}} > [{{< ui >}}Browser Test{{< /ui >}}][3] をクリックします。

次のいずれかの方法でテストを作成します。

- **テンプレートからテストを作成する**:

    1. 事前設定済みテンプレートのいずれかにカーソルを合わせて、{{< ui >}}View Template{{< /ui >}} をクリックします。すると、テストの詳細、アラートの条件、ステップ、オプションの変数など、あらかじめ設定された構成情報が表示されるサイドパネルが開きます。
    2. {{< ui >}}\+ Create Test{{< /ui >}} をクリックして構成ページを開きます。このページで、あらかじめ設定された構成オプションを確認および編集できます。表示されるフィールドは、テストを一から作成する際に利用可能なフィールドと同じです。
    3. 右上にある {{< ui >}}Save & Quit{{< /ui >}} をクリックして、ブラウザテストを送信します。<br /><br>

       {{< img src="/synthetics/browser_tests/synthetics_templates_browser.mp4" alt="テンプレートを使った Synthetics ブラウザテストのランディングページの動画" video="true" >}}

- **テストを一から作成する**:

    1. {{< ui >}}\+{{< /ui >}} テンプレートをクリックして、新しいブラウザテストを一から開始します。
    1. 監視する Web サイトの URL を追加します。何から始めればよいかわからない場合は、テスト用の e コマース Web アプリケーションである `https://www.shopist.io` を使用できます。
    2. {{< ui >}}Advanced Options{{< /ui >}} を選択して、カスタムリクエストオプション、証明書、認証情報などを設定します。
    3. テストに名前を付け、`env:prod` や `app:shopist` などのタグを設定します。タグを使用すると、テストスイートを整理し、ホームページで興味のあるテストをすばやく見つけることができます。
    4. テストするブラウザとデバイスを選択します。
    5. {{< ui >}}Save & Edit Recording{{< /ui >}} をクリックして、ブラウザテストを送信します。

### ロケーションを選択する {#select-locations}

テストを実行する {{< ui >}}Managed Locations{{< /ui >}} または {{< ui >}}Private Locations{{< /ui >}} を 1 つ以上選択します。

管理ロケーションでは、公開されている Web サイトとエンドポイントをテストできます。内部アプリケーションをテストしたり、個別の地理的領域でユーザーの行動をシミュレートしたりするには、代わりに[プライベートロケーション][4]を使用します。

Shopist アプリケーションは `https://www.shopist.io/` で公開されているため、テストを実行する任意の管理ロケーションを選択できます。

### テストの頻度を指定する {#specify-test-frequency}

テストを実行する頻度を選択します。デフォルトの頻度である 1 時間のままにしておくことができます。

スケジュールに従って Synthetic テストを実行できるだけでなく、手動で実行したり、[CI/CD パイプライン][5]から直接トリガーしたりすることもできます。

### アラート条件を定義する {#define-alert-conditions}

アラート条件を定義して、散発的なネットワークブリップなどのテストがトリガーされないようにすることができます。これにより、アプリケーションに実際の問題が発生した場合にのみアラートが送信されます。

ロケーションが失敗したと見なされるまでに、連続して何回失敗する必要があるかを指定できます。

```text
Retry test 2 times after 300 ms in case of failure
```

また、アプリケーションが一定時間ダウンし、かつ特定の数のロケーションでテストが失敗した場合にのみ通知をトリガーするようにテストを構成することもできます。以下の例では、2 つの異なるロケーションでテストが 3 分間失敗した場合に通知を送信するようにアラートルールが設定されています。

```text
An alert is triggered if your test fails for 3 minutes from any 2 of 13 locations
```

### テストモニターを構成する {#configure-the-test-monitor}

このセクションを使用して、通知と一緒に送信する**メッセージ**を作成します。通知には、カスタムメッセージと失敗したロケーションに関する詳細が含まれます。自動入力済みのモニターメッセージがメッセージ本文に含まれています。

{{< img src="/synthetics/browser_tests/browser_tests_pre-filled.png" alt="自動入力済みのモニターメッセージが強調表示されている Synthetic Monitoring のモニターセクション" style="width:100%;" >}}

たとえば、次のモニターメッセージは、ステップを反復処理し、ブラウザテスト用の変数を抽出するモニターを作成します。

   ```text
   {{!成功したすべてのステップで抽出された変数を一覧表示 }}
   # 抽出された変数
   {{#each synthetics.attributes.result.steps}}
   {{#if extractedValue}}
   * **名前**: `{{extractedValue.name}}`
   **値:** {{#if extractedValue.secure}}*難読化 (値は非表示)*{{else}}`{{{extractedValue.value}}}`{{/if}}
   {{/if}}
   {{/each}}
   ```

When you're ready to save your test configuration and monitor, click {{< ui >}}Save & Edit Recording{{< /ui >}}.

For more information, see [Using Synthetic Test Monitors][8].

## Create recording 

Once your test configuration is saved, Datadog prompts you to download and install the [Datadog test recorder][9] Chrome extension. (This Chrome extension can also be installed on a Microsoft Edge browser)

Once you have installed the extension, click {{< ui >}}Start Recording{{< /ui >}} to begin recording your test steps.

Navigate through the page in the iframe located on the right of the recorder page. When you select a div, image, or any area of the page, Datadog records and creates the associated step in the browser test. 

To end recording your test steps, click {{< ui >}}Stop Recording{{< /ui >}}.

The example below demonstrates how to map a user journey from adding an item to a cart to successfully checking out in `https://www.shopist.io`:

1. Navigate to one of the furniture sections on the example website such as {{< ui >}}Chairs{{< /ui >}} and select {{< ui >}}Add to cart{{< /ui >}}.
2. Click on {{< ui >}}Cart{{< /ui >}} and {{< ui >}}Checkout{{< /ui >}}.
3. Under {{< ui >}}Add New{{< /ui >}}, select {{< ui >}}Assertion{{< /ui >}} and click {{< ui >}}"Test that some text is present on the active page"{{< /ui >}}.
4. To confirm that the words "Thank you!" appear after checking out, enter `Thank you!` in the {{< ui >}}Value{{< /ui >}} field. 
5. Press {{< ui >}}Save & Quit{{< /ui >}}.

It is important to finish your browser test with an {{< ui >}}Assertion{{< /ui >}} to ensure your application resulted in the expected state after the defined user journey.

{{< img src="getting_started/synthetics/record-test.mp4" alt="テストステップを記録する" video="true" >}}

サンプルウェブサイトは定期的にエラーをスローし、意図的に失敗を引き起こします。{{< ui >}}Configure the monitor for this test{{< /ui >}} フィールドにメールアドレスを含めると、テストの失敗して回復したときにメール通知が届きます。

## テスト結果を確認する {#look-at-test-results}

{{< ui >}}Browser Test{{< /ui >}} 詳細ページには、テストコンフィギュレーションの概要、グローバルおよびロケーションごとのアップタイム、対話までの時間とテスト実行時間に関するグラフ、成功したテスト結果と失敗したテスト結果のサンプル、すべてのテスト結果のリストが表示されます。テストの長さによっては、最初のテスト結果が表示されるまで数分待つ必要がある場合があります。

[失敗したテスト][10]のトラブルシューティングを行うには、**アクティビティ**タブまたは**テスト実行**タブで失敗を確認します。タイムラインからアラートを選択すると、失敗したステップとエラーメッセージを説明する**発生した事象**の概要が表示されます。**次のステップ** パネルから、Bits Investigation を使用した調査、復旧の確認、スケジューリングの一時停止、インシデントの宣言を行うことができます。また、潜在的な [{{< ui >}}Errors & Warnings{{< /ui >}}][11]、[{{< ui >}}Resources{{< /ui >}}][12]、および [{{< ui >}}Core Web Vitals{{< /ui >}}][13] を確認して問題を診断することもできます。

{{< img src="synthetics/browser_tests/synthetics_bits_investigation.png" alt="アラートタイムライン、失敗の概要、次のステップパネルとともにアクティビティタブが表示されたブラウザテスト詳細ページ" style="width:100%;">}}

Datadog の [APM と Synthetic Monitoring のインテグレーション][14]を使用して、{{< ui >}}Traces{{< /ui >}} タブからのテスト実行によってバックエンドから生成されたトレースを表示します。

### Bits Investigation を起動する {#launch-a-bits-investigation}

Synthetic ブラウザテストの失敗の根本原因を特定するには、[Bits Investigation][15] を開始します。Bits Investigation は、テスト結果、トレース、ログ、およびメトリクスを分析して根本原因を明らかにし、その失敗がリグレッションによるものか、設定ミスによるものかをフラグ付けします。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/synthetics/browser_tests/
[2]: https://app.datadoghq.com/synthetics/tests
[3]: https://app.datadoghq.com/synthetics/browser/create
[4]: /ja/getting_started/synthetics/private_location
[5]: /ja/continuous_testing/cicd_integrations
[6]: /ja/integrations/#cat-notification
[7]: https://app.datadoghq.com/account/settings
[8]: /ja/monitors/types/synthetic_monitoring/
[9]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[10]: /ja/synthetics/browser_tests/test_results#test-failure
[11]: /ja/synthetics/browser_tests/test_results#errors
[12]: /ja/synthetics/browser_tests/test_results#resources
[13]: /ja/synthetics/browser_tests/test_results#test-performance
[14]: /ja/synthetics/apm/
[15]: /ja/bits_ai/bits_investigation/investigate_issues/#from-the-synthetic-test-details-page