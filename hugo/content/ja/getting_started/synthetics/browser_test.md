---
further_reading:
- link: https://learn.datadoghq.com/courses/intro-to-synthetic-tests
  tag: ラーニングセンター
  text: Synthetic テストの紹介
- link: /synthetics/browser_tests
  tag: ドキュメント
  text: ブラウザテストについて
- link: /getting_started/synthetics/private_location
  tag: ドキュメント
  text: プライベートロケーションの詳細
- link: /continuous_testing/cicd_integrations
  tag: ドキュメント
  text: CI/CD パイプラインから Synthetic テストをトリガーする方法を学ぶ
- link: /synthetics/identify_synthetics_bots
  tag: ドキュメント
  text: API テスト用の Synthetic ボットを特定する方法を学ぶ
- link: /synthetics/guide/synthetic-test-monitors
  tag: Documentation
  text: Synthetic テストモニターについて
title: ブラウザテストの概要
---

## 概要

[ブラウザテスト][1]は、Datadog が Web アプリケーションで実行するシナリオです。定期的な間隔を構成して、複数の場所、デバイス、およびブラウザからテストを実行したり、CI/CD パイプラインからテストを実行したりできます。これらのテストは、ユーザーがアプリケーションで**主要なビジネストランザクション**を実行できること、およびユーザーが最近のコード変更によって悪影響を受けていないことを確認します。

## ブラウザテストを作成

以下の例は、カートにアイテムを追加してから正常にチェックアウトするまでのユーザーのジャーニーをマップするブラウザテストの作成を示しています。

### テストの詳細を構成する

1. Datadog サイトで、左側のメニューから **Digital Experience** にカーソルを合わせ、**[Tests][2]** (**Synthetic Monitoring & Testing** の下) を選択します。
2. 右上隅にある **New Test** > **[Browser Test][3]** をクリックします。

You may create a test using one of the following options:

- **Create a test from a template**:

    1. Hover over one of the pre-populated templates and click **View Template**. This opens a side panel displaying pre-populated configuration information, including: Test Details, Alert Conditions, Steps, and optionally Variables.
    2. **+Create Test** をクリックして構成ページを開き、あらかじめ設定された構成オプションを確認および編集します。ここで提示されるフィールドは、テストを一から作成する場合と同じです。
    3. Click **Save & Quit** in the upper right hand corner to submit your Browser Test.<br /><br>

       {{< img src="/synthetics/browser_tests/synthetics_templates_browser.mp4" alt="Video of Synthetics Browser Test landing page with templates" video="true" >}}

- **Build a test from scratch**:

    1. Click the **+** template to start a new Browser Test from scratch.
    1. 監視する Web サイトの URL を追加します。追加する URL がない場合は、テスト用の e コマース Web アプリケーションである `https://www.shopist.io` を使用してください。
    2. **Advanced Options** を選択して、カスタムリクエストオプション、証明書、認証情報などを設定します。
    3. テストに名前を付け、`env:prod` や `app:shopist` などのタグを設定します。タグを使用すると、テストスイートを整理し、ホームページで興味のあるテストをすばやく見つけることができます。
    4. テストするブラウザとデバイスを選択します。
    5. Click **Save & Edit Recording** to submit your Browser Test.

### ロケーションを選択する

テストを実行する 1 つ以上の **Managed Locations** または **Private Locations** を選択します。

管理ロケーションでは、公開されている Web サイトとエンドポイントをテストすることができます。内部アプリケーションをテストしたり、個別の地理的領域でユーザーの行動をシミュレートしたりするには、代わりに[プライベートロケーション][4]を使用します。

Shopist アプリケーションは `https://www.shopist.io/` で公開されているため、テストを実行する管理ロケーションを選択できます。

### テストの頻度を指定する

テストを実行する頻度を選択します。デフォルトの頻度である 1 時間のままでも構いません。

スケジュールに従って Synthetic テストを実行することに加えて、[CI/CD パイプライン][5]から手動または直接トリガーすることができます。

### アラート条件を定義する

アラート条件を定義して、散発的なネットワークブリップなどのテストがトリガーされないようにすることができます。これにより、アプリケーションに実際の問題が発生した場合にのみアラートが送信されます。

ロケーションが失敗したと見なす前に発生する必要がある連続した失敗の数を指定できます。

```text
Retry test 2 times after 300 ms in case of failure
```

アプリケーションが特定の時間とロケーションの数だけダウンしたときにのみ通知をトリガーするようにテストを構成することもできます。次の例では、2 つの異なるロケーションでテストが 3 分間失敗した場合に、アラートルールが通知を送信するように設定されています。

```text
An alert is triggered if your test fails for 3 minutes from any 2 of 13 locations
```

### テストモニターを構成する

アラートメッセージを設計し、テストでアラートを送信するメールアドレスを追加します。

{{< img src="getting_started/synthetics/configured-browser-test.mp4" alt="ブラウザテストのコンフィギュレーション例" video="true" >}}

Slack、PagerDuty、Microsoft Teams、Webhook などの[通知インテグレーション][6]を使用することもできます。これらの通知ツールへの Synthetic アラートをトリガーするには、最初に対応する[インテグレーション][7]を設定する必要があります。

テストの構成とモニターを保存する準備ができたら、**Save & Edit Recording** をクリックします。

詳しくは、[Synthetic テストモニターの使用][8]をご覧ください。

## 記録を作成する

テスト構成を保存すると、Datadog から [Datadog テストレコーダー][9] Chrome 拡張機能をダウンロードしてインストールするように求められます。(この Chrome 拡張機能は Microsoft Edge ブラウザにもインストールできます)

拡張機能をインストールしたら、**Start Recording** をクリックしてテストステップの記録を開始します。

レコーダーページの右側にある iframe のページを操作します。div、画像、またはページの任意の領域を選択すると、Datadog はブラウザテストで関連するステップを記録および作成します。

テストステップの記録を終了するには、**Stop Recording** をクリックします。

以下の例は、カートに商品を追加してから `https://www.shopist.io` で正常にチェックアウトするまでのユーザージャーニーをマッピングする方法を示しています。

1. サンプル Web サイトの **Chairs** などの家具セクションの 1 つに移動し、**Add to cart** を選択します。
2. **Cart** そして **Checkout** をクリックします。
3. **Add New** で **Assertion** を選択し、**"Test that some text is present on the active page"** (アクティブなページにテキストが存在することをテストする) をクリックします。
4. チェックアウト後に "Thank you!" という言葉が表示されることを確認するには、**Value** フィールドに `Thank you!` と入力します。
5. **Save & Quit** を押します。

定義されたユーザージャーニーの後にアプリケーションが期待される状態になることを確認するために、**アサーション**でブラウザテストを終了することが重要です。

{{< img src="getting_started/synthetics/record-test.mp4" alt="テストステップを記録する" video="true" >}}

サンプル Web サイトは定期的にエラーを発生させ、意図的に失敗します。**Configure the monitor for this test** フィールドにメールアドレスを入力すると、テストが失敗したときや回復したときにメール通知が届きます。

## テスト結果を確認する

**Browser Test** の詳細ページには、テストコンフィギュレーションの概要、グローバルおよびロケーションごとのアップタイム、対話までの時間とテスト期間に関するグラフ、成功したテスト結果と失敗したテスト結果のサンプル、すべてのテスト結果のリストが表示されます。テストの長さによっては、最初のテスト結果が表示されるまで数分待つ必要がある場合があります。

[失敗したテスト][10]のトラブルシューティングを行うには、失敗したテスト結果を選択し、失敗したステップに至るまでのスクリーンショットを確認します。潜在的な**[エラーと警告][11]**、**[リソース][12]**、および**[コア Web バイタル][13]**を確認して、問題を診断することもできます。

以下の例では、サーバーのタイムアウトの結果としてテストが失敗しました。

{{< img src="getting_started/synthetics/browser-test-failure.mp4" alt="ブラウザテストの失敗" video="true" >}}

Datadog の [APM と Synthetic Monitoring のインテグレーション][14]を使用して、**Traces** タブからのテスト実行によってバックエンドから生成されたトレースを表示します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/synthetics/browser_tests/
[2]: https://app.datadoghq.com/synthetics/tests
[3]: https://app.datadoghq.com/synthetics/browser/create
[4]: /ja/getting_started/synthetics/private_location
[5]: /ja/continuous_testing/cicd_integrations
[6]: /ja/integrations/#cat-notification
[7]: https://app.datadoghq.com/account/settings
[8]: /ja/synthetics/guide/synthetic-test-monitors
[9]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[10]: /ja/synthetics/browser_tests/test_results#test-failure
[11]: /ja/synthetics/browser_tests/test_results#errors
[12]: /ja/synthetics/browser_tests/test_results#resources
[13]: /ja/synthetics/browser_tests/test_results#page-performance
[14]: /ja/synthetics/apm/