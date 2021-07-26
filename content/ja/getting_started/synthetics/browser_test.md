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
  - link: '/synthetics/browser_tests/#subtests'
    tag: ドキュメント
    text: ブラウザサブセットを作成
  - link: /synthetics/settings/
    tag: Documentation
    text: 高度な Synthetic モニタリング設定を構成する
---
## ブラウザテストを作成

[ブラウザテスト][1]は、Datadog が Web アプリケーション上で実行するシナリオです。世界中の複数の場所からさまざまなデバイスを使用して実行され、テスト間隔は自由に設定できます。これらのテストは、**アプリケーションが稼働してリクエストに応答していること**、主要な事業取引が想定通りに実行されていることを確認します。

ここでは、ユーザーが商品をカートに追加して会計するまでの行程をマップするように、ブラウザテストを構成しています。実行された各テストは **Test Result** として Datadog に記録されます。

{{< img src="getting_started/synthetics/browser-test.png" alt="ブラウザテスト"  style="width:90%;" >}}

## テストの設定

1. Datadog アプリケーションで、左側のメニューにある **[UX Monitoring][2]** にカーソルを合わせ、**Synthetic Test** を選択します。
2. 右上の **New Test** ボタンをクリックします。
3. **Browser Test**を選択します。
4. ブラウザテストの構成を定義します。

    - **Starting URL**: 監視したいウェブサイトの URL を追加します。どこから始めるか分からない場合は、テスト用の Web アプリケーションとして `https://www.shopist.io/` を使用することができます。
    - **Name**: テストの名称です。
    - **Tags**: テストで `env:prod` や `app:shopist` のようなタグを設定できます。タグは整理をしたり、興味のあるテストをホームページで見つける場合などに役立ちます。
    - **Browsers & Devices**: テストするデバイスと場所を選択します。この例では、**Chrome** および **Large Laptops** でのみテストが実行されます。
    - **Locations**: **Managed Locations** のうち、テストを実行する 場所をひとつ選択します。この例では **Americas and Europe** のみでテストが実行されます。
    - **Specify a test frequency**: テストを実行したい頻度を選択します。
    - **Alert Conditions**: アラート条件で、テストが通知アラートを送信する状況を設定します。

        - 特定の場所で起こる可能性のあるネットワーク障害に関するアラートを避けるには、テストを次のように構成します。

        ```text
        An alert is triggered if your test fails for 0 minutes from any 3 of 13 locations
        ```

        - テストランが2度失敗して初めてテストの失敗と見なされるよう、失敗と見なされるまでに再実行する回数を指定します。

        ```text
        Retry 1 time before location is marked as failed
        ```

         **注**: デフォルトでは、失敗したテストを再試行するまでに 300ms の待機時間があります。この時間は、[API][3] を使用して構成することができます。

    - **Notify**: アラートメッセージを作成し、アラートがトリガーされる際に通知されるメールアドレスを指定します。Datadog からアラートメールを受け取るために追加の設定をする必要はありません。また、Slack、PagerDuty、Webhook などの[インテグレーション][4]を使用して通知を受信することもできます。
    - **Save & Edit Recording** をクリックします。

{{< img src="getting_started/synthetics/configured-browser-test.gif" alt="ブラウザテストを構成"  style="width:90%;">}}

## テスト手順を記録

テスト構成を保存すると、[Datadog test recorder][5] 拡張機能をダウンロードするように促されます。ブラウザテストを記録できるのは **[Google Chrome][6]** だけです。拡張機能をダウンロードしてインストールします。

この拡張機能をインストールしたら、**Start Recording** ボタンをクリックしてテスト手順を記録し始めます。記録オプションの右側にある iframe でページを操作します。div、画像、またはページの任意の場所を選択すると、手順は記録されブラウザテスト内で手順を作成するのに使用されます。手順の詳細は、[ブラウザテストの手順に関するドキュメント][7]を参照してください。

たとえば、ユーザーが商品をカートに追加して会計するまでの行程をマップするテスト手順を記録するには、

1. 家具のセクションに移動し、たとえば、**Chairs** そして **Add to cart** と進みます。
2. **Cart** そして **Checkout** をクリックします。
3. **Assertion** “Test text is present on the active page” を手動で追加し、“Thank you” の文字がページに表示されるようにします。

   **注**: ブラウザテストの最終手順は **assertion** でなければなりません。これにより、テストが意図されたページで終了し、想定された要素が検出されたことを確認できます。

4. テストを保存します。

{{< img src="getting_started/synthetics/record-test.gif" alt="テスト手順を記録"  style="width:90%;">}}

**注**: この例で使用されるウェブサイトは、定期的にエラーをスローし意図的に失敗が起きるようになっています。メッセージボックスにメールアドレスを設定している場合、テストで失敗が起きた際に通知メールを受け取ることとなります。

## テスト結果

ブラウザテストの詳細ページには、対象のテストのコンフィギュレーション、テストのアップタイム、応答時間と最初のページ操作からの応答時間を示す履歴グラフ、成功・失敗した場合のサンプル結果、選択したタイムフレームに対応するテスト結果の一覧が表示されます。個々のテスト結果には、各ステップのスクリーンショット、主要な Web バイタル、潜在的なエラー、リソース、およびトレースが含まれます。

テストがいくつかのテスト結果を生成するまで待つか、`Run test now` を押してより迅速にトリガーします。次に、**Test Results** またはメールボックスで失敗したテスト結果を探します。スクリーンショットを確認して失敗した箇所を把握し、トラブルシューティングを始めます。失敗したステップの前に発生したステップには不具合の根本原因が含まれることが多いため、直前のステップのスクリーンショットを必ず確認するようにしてください。

**Errors & Warnings** タブでは、Javascript やネットワークエラーが一覧表示されます。**Resources** タブでは、このステータスをもたらすリソースが表示されます。**Traces** タブではリクエスト全体が数秒でマッピングされます。このテストは、サーバータイムアウトのため失敗に終わりました。リソース、`https://api.shopist.io/checkout.json` はステータスと、問題の対象となるソースが会計にリンクされたコントローラであることを投稿します。これで問題の原因を見つけたことになります。

{{< img src="getting_started/synthetics/browser-test-failure.png" alt="ブラウザテストの失敗"  style="width:100%;">}}

**Traces** タブには、Datadog の [Synthetic モニタリングとの APM インテグレーション][8]でアクセスできます。構成が完了すると、失敗したテストランから生成されたトレースを見ることで、テストランが失敗した問題の根本原因を探ることができます。ブラウザテストの結果を APM とリンクさせるには、APM インテグレーションのヘッダーを追加する URL をホワイトリスト化します。ワイルドカードには `*` を使用します（例: `https://*.datadoghq.com/*`）。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/browser_tests/
[2]: https://app.datadoghq.com/synthetics/list
[3]: /ja/api/v1/synthetics/#create-or-clone-a-test
[4]: /ja/integrations/
[5]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[6]: https://www.google.com/chrome/
[7]: /ja/synthetics/browser_tests/#actions
[8]: /ja/synthetics/apm/