---
title: ブラウザテストの概要
kind: documentation
further_reading:
  - link: 'https://learn.datadoghq.com/course/view.php?id=39'
    tag: ラーニングセンター
    text: Synthetic テストの紹介
  - link: /synthetics/browser_tests
    tag: ドキュメント
    text: ブラウザテストについて
  - link: /getting_started/synthetics/private_location
    tag: ドキュメント
    text: プライベートロケーションの詳細
  - link: /synthetics/ci
    tag: Documentation
    text: CI/CD パイプラインから Synthetic テストをトリガーする方法を学ぶ
  - link: /synthetics/identify_synthetics_bots
    tag: ドキュメント
    text: API テスト用の Synthetic ボットを特定する方法を学ぶ
---
## ブラウザテストを作成

[ブラウザテスト][1]は、Datadog が Web アプリケーションで実行するシナリオです。定期的な間隔を構成して、複数の場所、デバイス、およびブラウザからテストを実行したり、CI/CD パイプラインからテストを実行したりできます。これらのテストは、ユーザーがアプリケーションで主要なビジネストランザクションを実行できること、およびユーザーが最新のコード変更によって悪影響を受けていないことを確認します。

以下の例は、カートにアイテムを追加してから正常にチェックアウトするまでのユーザーのジャーニーをマップするブラウザテストの作成を示しています。

{{< img src="getting_started/synthetics/browser-test.png" alt="ブラウザテスト"  style="width:100%;" >}}

### テストの詳細を構成する

1. Datadog アプリケーションで、左側のメニューにある **[UX Monitoring][2]** にカーソルを合わせ、**[Synthetic Tests][2]** を選択します。
2. 右上の **New Test** ボタンをクリックします。
3. **Browser Test**を選択します。
4. ブラウザテストを定義します。

    - 監視する Web サイトの URL を追加します。追加する URL がない場合は、テスト用の Web アプリケーションである `https://www.shopist.io` を使用してください。
    - カスタムリクエストヘッダー、認証資格情報、cookie を使用するには、**Advanced Options** を選択します。
    - テストに名前を付け、`env:prod` や `app:shopist` などのタグを設定します。タグを使用すると、テストスイートを整理し、ホームページで興味のあるテストをすばやく見つけることができます。
    - テストするブラウザとデバイスを選択します。

#### ロケーションを選択する

テストを実行する 1 つ以上の **Managed Locations** または **Private Locations** を選択します。

管理ロケーションでは、公開されているアプリケーションをテストすることができます。内部アプリケーションをテストしたり、個別の地理的領域でユーザーの行動をシミュレートしたりするには、代わりに **Private Locations** を 1 つ選択します。

プライベートロケーションの設定方法の詳細については、[プライベートロケーション入門][3]を参照してください。

#### テストの頻度を指定する

テストを実行する頻度を選択します。

スケジュールに従って Synthetic テストを実行することに加えて、CI/CD パイプラインから手動または直接トリガーすることができます。詳細については、[Synthetic CI/CD テスト][4]を参照してください。


#### アラート条件を定義する

アラート条件を定義して、散発的なネットワークブリップなどのテストがトリガーされないようにすることができます。これにより、アプリケーションに実際の問題が発生した場合にのみアラートが送信されます。

ロケーションが失敗したと見なす前に発生する必要がある連続した失敗の数を指定できます。

```text
Retry test 2 times after 300 ms in case of failure
```

アプリケーションが特定の時間とロケーションの数だけダウンしたときにのみ通知をトリガーするようにテストを構成することもできます。次の例では、2 つの異なるロケーションでテストが 3 分間失敗した場合に、アラートルールが通知を送信するように設定されています。

```text
An alert is triggered if your test fails for 3 minutes from any 2 of 13 locations
```

#### チームへの通知

**Monitor Name** フィールドにアラート名を追加し、アラートのメッセージを書き込みます。Slack、PagerDuty、Microsoft Teams、Webhook などの[インテグレーション][5]を使用して、アラートを特定のサービスやチームにルーティングできます。

アラートが解決されていない再通知するようにアラート通知を設定し、**P5 (Info)** から **P1 (Critical)** の範囲でアラートの優先度を定義できます。

{{< img src="getting_started/synthetics/configured-browser-test.mp4" alt="ブラウザテストのコンフィギュレーション例" video="true"  >}}

テストを記録する準備ができたら **Save Details & Record Test** をクリックします。

### 記録を作成する

テストコンフィギュレーションが保存されると、Datadog は Chrome 拡張機能の [Datadog テストレコーダー][6]をダウンロードしてインストールするように要求します。

拡張機能をインストールしたら、**Start Recording** をクリックしてテストステップの記録を開始します。

レコーダーページの右側にある iframe のページを操作します。div、画像、またはページの任意の領域を選択すると、Datadog はブラウザテストで関連するステップを記録および作成します。

テストステップの記録を終了するには、**Stop Recording** をクリックします。

以下の例は、カートに商品を追加してから `https://www.shopist.io` で正常にチェックアウトするまでのユーザージャーニーをマッピングする方法を示しています。

1. サンプル Web サイトの **Chairs** などの家具セクションの 1 つに移動し、**Add to cart** を選択します。
2. **Cart** そして **Checkout** をクリックします。
3. **Add New** で **Assertion** を選択し、**“Test that some text is present on the active page”** (アクティブなページにテキストが存在することをテストする) をクリックします。
4. チェックアウト後に “Thank you!” という言葉が表示されることを確認するには、**Value** フィールドに `Thank you!` と入力します。
5. **Save & Quit** を押します。

定義されたユーザージャーニーの後にアプリケーションが期待される状態になることを確認するために、**アサーション**でブラウザテストを終了することが重要です。

{{< img src="getting_started/synthetics/record-test.mp4" alt="テストステップを記録する"  video="true"  >}}

**注**: サンプル Web サイトは定期的にエラーをスローし、意図的に失敗を引き起こします。**Notify your team** フィールドにメールアドレスを含めると、テストが失敗して回復したときにメール通知が届きます。

## テスト結果

ブラウザテストの詳細ページには、テストコンフィギュレーションの概要、グローバルおよびロケーションごとのアップタイム、対話までの時間とテスト期間に関するグラフ、成功したテスト結果と失敗したテスト結果のサンプル、すべてのテスト結果のリストが表示されます。テストの長さによっては、最初のテスト結果が表示されるまで数分待つ必要がある場合があります。

[失敗したテスト][7]のトラブルシューティングを行うには、失敗したテスト結果を選択し、失敗したステップに至るまでのスクリーンショットを確認します。潜在的な**[エラーと警告][8]**、**[リソース][9]**、および**[コア Web バイタル][10]**を確認して、問題を診断することもできます。

以下の例では、サーバーのタイムアウトの結果としてテストが失敗しました。

{{< img src="getting_started/synthetics/browser-test-failure.mp4" alt="ブラウザテストの失敗"  video="true"  >}}

Datadog の [APM と Synthetic Monitoring のインテグレーション][11]を使用して、**Traces** タブからのテスト実行によってバックエンドから生成されたトレースを表示します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/synthetics/browser_tests/
[2]: https://app.datadoghq.com/synthetics/list
[3]: /ja/getting_started/synthetics/private_location
[4]: /ja/synthetics/ci
[5]: /ja/integrations/#cat-notification
[6]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[7]: /ja/synthetics/browser_tests/test_results#test-failure
[8]: /ja/synthetics/browser_tests/test_results#errors
[9]: /ja/synthetics/browser_tests/test_results#resources
[10]: /ja/synthetics/browser_tests/test_results#page-performance
[11]: /ja/synthetics/apm/