---
further_reading:
- link: https://www.datadoghq.com/blog/browser-tests/
  tag: ブログ
  text: Datadog ブラウザテストによるユーザーエクスペリエンスの監視
- link: synthetics/browser_tests
  tag: Documentation
  text: Synthetic ブラウザテストについて
title: ブラウザテストでのポップアップの処理
---
## 概要

Synthetic の[ブラウザテスト][5]で、モーダルやアプリケーションウィンドウなどのポップアップを管理する方法について説明します。

## モーダル

### JavaScript

Synthetic ブラウザテストは自動的に [JavaScript モーダル][1]を処理します。 

 - `alert` モーダルは OK の場合は即座に却下されます。
 - Google Chrome または Microsoft Edge のテストでは、`prompt` モーダルが `Lorem Ipsum` で埋められます。
 - 確認を求める `confirm` モーダルは受け付けられます。

### 基本認証

基本認証ポップアップの場合、ブラウザテスト構成の [**Advanced Options**][2] で関連する資格情報を指定します。

{{< img src="synthetics/guide/popup/http_authentication.png" alt="基本認証ポップアップ" style="width:90%" >}}

## アプリケーションポップアップ

### 固定ポップアップ

ユーザージャーニーの特定の時点でポップアップが表示された場合、閉じるためのステップを記録し、[対応するオプション][3]を使いそのステップを失敗させることができます。それにより、テストはポップアップが表示された際の対応を学ぶことができます。ポップアップが表示されない場合、ステップは失敗しますが、テスト全体が失敗に終わることはありません。

{{< img src="synthetics/guide/popup/allow_fail_option.png" alt="ポップアップを処理するためにステップの失敗を許可する" style="width:60%" >}}

### ポップアップの移動

セッション中にポップアップが表示される時間を予測できない場合は、ブラウザテストの実行中にポップアップが表示されないようにするルールを作成してもらえないか、ポップアップを出すサードパーティーに確認してください。例えば、テストの [**Advanced Options** セクション][2]に挿入できるクッキーなどがあるかもしれません。

または、次のいずれかの方法でポップアップが閉じたままテストが続行できるようにします。
  * ブラウザテストの開始時に [JavaScript アサーション][4]を作成し、ポップアップを定期的に閉じるようにします。

    ```javascript
    if (document.querySelector("<ELEMENT>")) {
      return true;
    } else {
      return new Promise((resolve, reject) => {
        const isPopupDisplayed = () => {
          if (document.querySelector("<ELEMENT>")) {
            clearInterval(popup);
            resolve(true);
          }
        };
        let popup = setInterval(isPopupDisplayed, 500);
      });
    }
    ```

  * ポップアップを閉じるためのステップを記録し、他のブラウザテストのステップの間に追加し、それぞれに対し[**このステップの失敗を許可** オプション][3]を選択します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://javascript.info/alert-prompt-confirm
[2]: /ja/synthetics/browser_tests/#test-configuration
[3]: /ja/synthetics/browser_tests/advanced_options/#optional-step
[4]: /ja/synthetics/browser_tests/actions#test-your-ui-with-custom-javascript
[5]: /ja/synthetics/browser_tests