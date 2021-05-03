---
title: ブラウザテストでのポップアップの処理
kind: ガイド
further_reading:
  - link: 'https://www.datadoghq.com/blog/browser-tests/'
    tag: ブログ
    text: Datadog ブラウザテストによるユーザーエクスペリエンスの監視
  - link: synthetics/browser_tests
    tag: Documentation
    text: ブラウザテストの設定
---
## JavaScript と基本認証モーダル

Synthetic ブラウザテストは自動的に [JavaScript モーダル][1]を処理します。 
 - `alert` モーダルは閉じています。
 - `prompt` と `confirm` モーダルは `Lorem Ipsum` で回答されます。
基本認証ポップアップの場合、ブラウザテストコンフィギュレーションの[**高度なオプション > HTTP 認証**][2]で関連する資格情報を指定します。

{{< img src="synthetics/guide/popup/http_auth_option.png" alt="基本認証ポップアップ">}}

## アプリケーションポップアップ

### 固定ポップアップ

ユーザージャーニーの特定の時点でポップアップが表示された場合、閉じるためのステップを記録し、[対応するオプション][3]を使いそのステップを失敗させることができます。それにより、テストはポップアップが表示された際の対応を学ぶことができます。ポップアップが表示されない場合、ステップは失敗しますが、テスト全体が失敗に終わることはありません。

{{< img src="synthetics/guide/popup/allow_fail_option.png" alt="ステップの失敗を許可しポップアップを処理する" width="90%">}}

### ポップアップの移動

セッション中にポップアップが表示される時間を予測できない場合は、ブラウザテストの実行中にポップアップが表示されないようにするルールを作成してもらえないか、ポップアップを出すサードパーティーに確認してください。たとえばテストの[専用 **高度なオプション**][2]の下に挿入できるクッキーなどがあるかもしれません。

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