---
further_reading:
- link: https://www.datadoghq.com/blog/browser-tests/
  tag: ブログ
  text: Datadog ブラウザテストによるユーザーエクスペリエンスの監視
- link: /synthetics/browser_tests
  tag: Documentation
  text: ブラウザテストを作成する
title: ブラウザテストのための Chrome 拡張機能を手動で追加する
---

## 概要

セキュリティ上の理由で Chrome Web Store から直接アプリケーションをダウンロードできない場合は、Datadog Synthetics Chrome Extension v3.1.6+ で利用できる Datadog の拡張機能検出システムを活用して、Synthetic ブラウザテストを記録してください。

1. Datadog テストレコーダー拡張機能の[最新の CRX ファイル][1]をダウンロードします。
2. この CRX ファイルを内部のアプリケーションストアにアップロードし、拡張機能を再パッケージ化します。Chrome ブラウザの拡張機能の横に、新しい拡張機能のアイコンが表示されます。

   {{< img src="synthetics/guide/manually_adding_chrome_extension/icon.png" alt="ブラウザに表示されるアイコン" style="width:100%;" >}}

3. [テストの構成を定義][3] (テスト名、タグ、場所、頻度など) し、**Save Details &amp; Record Test** をクリックして、[ブラウザ テスト][2]を作成します。記録を開始するには、まず、[Datadog テストレコーダー拡張機能][4]をダウンロードします。
4. ブラウザの右上にあるレコーダー拡張機能のアイコンをクリックします。Datadog テストレコーダー拡張機能は、内部のアプリケーションストアにアップロードされた拡張機能を自動的に検出します。
5. [ブラウザテストの手順の記録][5]を開始し、終了したら **Save Recording** をクリックします。

   {{< img src="synthetics/guide/manually_adding_chrome_extension/record_test.png" alt="ブラウザテストを記録する" style="width:100%;" >}}

**注:** Datadog は、テストレコーダー拡張機能のアップデートを [Chrome Web Store][4] で公開しています。ブラウザテストを記録するために、内部の拡張機能を手動で更新することができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/synthetics-browser-extension
[2]: https://app.datadoghq.com/synthetics/browser/create
[3]: /ja/synthetics/browser_tests/#test-configuration
[4]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa?hl=en
[5]: /ja/synthetics/browser_tests/#record-your-steps