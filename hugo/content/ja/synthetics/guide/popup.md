---
further_reading:
- link: https://www.datadoghq.com/blog/browser-tests/
  tag: ブログ
  text: Datadog Browser Tests によるユーザーエクスペリエンスのモニタリング
- link: synthetics/browser_tests
  tag: ドキュメント
  text: Synthetic ブラウザテストについて学ぶ
title: ブラウザテストでポップアップを処理する
---
## 概要 {#overview}

このガイドでは、Synthetic [ブラウザテスト][5] において、モーダルやアプリケーションウィンドウなどのポップアップを管理する方法を説明します。

## モーダル {#modals}

### JavaScript {#javascript}

Synthetic ブラウザテストは、[JavaScript モーダル][1] を自動的に処理します。

 OK の場合、- `alert` モーダルは、直ちに閉じられます。
 - `prompt` モーダルには、Google Chrome または Microsoft Edge でのテスト時に `Lorem Ipsum` が入力されます。
 - `confirm` 確認を求めるモーダルは、承諾されます。

### 基本認証 {#basic-authentication}

基本認証のポップアップでは、ブラウザテストの設定にある [{{< ui >}}Advanced Options{{< /ui >}}][2] で、対応する認証情報を指定してください。

{{< img src="synthetics/guide/popup/http_authentication.png" alt="基本認証ポップアップ" style="width:90%" >}}

## アプリケーションのポップアップ {#application-pop-ups}

### アンカー付きポップアップ {#anchored-pop-ups}

ジャーニーの特定のポイントでポップアップが表示される場合は、それを閉じるステップを記録してください。ステップの詳細オプションで、[{{< ui >}}If this step fails, continue to next step{{< /ui >}}] を選択してください。次に、[{{< ui >}}If this step fails, mark test as failed{{< /ui >}}] (デフォルトで選択されています) のチェックを外してください。ポップアップが表示されない場合、そのステップは失敗しますが、テスト全体は失敗しません。詳細については、[オプションのステップ][3] セクションを参照してください。

{{< img src="synthetics/browser_tests/advanced_options/optional_step_2.png" alt="[continue to next step] が選択され、[mark test as failed] のチェックが外れているステップの詳細オプション。" style="width:60%" >}}

### 表示タイミングが変動するポップアップ {#moving-pop-ups}

セッション内でこれらのポップアップが表示されるタイミングが予測できない場合は、ポップアップを提供しているサードパーティに問い合わせて、ブラウザテストの実行中にポップアップが表示されないようにするルールを作成できるかどうかを確認してください。たとえば、テストの [{{< ui >}}Advanced Options{{< /ui >}} セクション][2] に入力できる Cookie を提供してもらうことができます。

あるいは、以下のいずれかの方法でポップアップを確実に閉じ、テストがジャーニーを継続できるようにしてください。
  * ブラウザテストの冒頭に [JavaScript アサーション][4] を作成し、定期的にポップアップを閉じるようにしてください。

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

  * ポップアップを閉じるステップを記録し、他のブラウザテストの各ステップの間に追加してください。各ステップで、[{{< ui >}}If this step fails, continue to next step{{< /ui >}}] を選択してください。次に、[{{< ui >}}If this step fails, mark test as failed{{< /ui >}}] (デフォルトで選択されています) のチェックを外してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://javascript.info/alert-prompt-confirm
[2]: /ja/synthetics/browser_tests/#test-configuration
[3]: /ja/synthetics/browser_tests/advanced_options/#optional-step
[4]: /ja/synthetics/browser_tests/test_steps#test-your-ui-with-custom-javascript
[5]: /ja/synthetics/browser_tests