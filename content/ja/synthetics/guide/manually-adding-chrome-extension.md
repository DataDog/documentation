---
title: ブラウザテスト Chrome 拡張機能を内部アプリケーションストアに手動で追加する
kind: ガイド
further_reading:
  - link: https://www.datadoghq.com/blog/browser-tests/
    tag: ブログ
    text: Datadog ブラウザテストによるユーザーエクスペリエンスの監視
  - link: synthetics/browser_tests
    tag: Documentation
    text: ブラウザテストの設定
---
セキュリティ上の理由で Chrome ウェブストアから直接アプリケーションをダウンロードできない場合でも、Datadog のスマート拡張機能検出システム (拡張機能バージョン 3.1.6 以降で利用可能) を利用して、Synthetic ブラウザテストを記録できます。

1. [Datadog テストレコーダー拡張機能][1] CRX ファイルをダウンロードします。
2. この CRX ファイルを内部アプリケーションストアにアップロードし、再パッケージ化します。新しい拡張機能のアイコンが Chrome ブラウザの、他の Chrome 拡張機能の横に表示されます。
  {{< img src="synthetics/guide/manually_adding_chrome_extension/icon.png" alt="ブラウザに表示されるアイコン">}}
3. [ブラウザテスト][2]の作成を開始します: [テストコンフィギュレーションを定義][3] (テスト名、タグ、場所、頻度など) し、`Save Details & Record Test` をクリックします。レコーダーページが表示されます。[Datadog テストレコーダー拡張機能][1]をダウンロードして記録を開始するように求めるメッセージが表示されます。
4. ブラウザの右上隅に表示されたアイコンをクリックします。[Datadog テストレコーダー拡張機能][1]は、内部アプリケーションストアにアップロードされた拡張機能を自動的に検出し、[ブラウザテストのステップの記録を開始][4]できるようになります。
  {{< img src="synthetics/guide/manually_adding_chrome_extension/record_test.png" alt="ブラウザテストを記録する">}}

**注:** Datadog がテストレコーダー拡張機能の更新をリリースするときに、内部拡張機能を手動で更新します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa?hl=en
[2]: /ja/synthetics/browser_tests
[3]: /ja/synthetics/browser_tests/#configuration
[4]: /ja/synthetics/browser_tests/#record-test