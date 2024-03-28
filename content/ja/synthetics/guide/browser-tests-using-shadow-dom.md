---
further_reading:
- link: /synthetics/browser_tests
  tag: ドキュメント
  text: ブラウザテストの詳細
kind: ガイド
title: Shadow DOM を使用したアプリケーションのテスト実行
---

## 概要

Shadow Document Object Model (DOM) API は、カプセル化された DOM ツリーを HTML 要素にアタッチすることを可能にする Web コンポーネントです。[Shadow DOM][1] は自己完結しており、メインドキュメントの DOM から分離されたままです。

Shadow DOM は、以下のような用途に使用することができます。

- サードパーティライブラリからのフォームとコンポーネント
- 埋め込みコンテンツ (動画や画像など)
- チャットポップアップインテグレーション

<div class="alert alert-info">
<a href="https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa">Datadog ブラウザテストレコーダー拡張機能</a>が、<a href="https://docs.datadoghq.com/synthetics/guide/browser-test-self-maintenance">テスト実行時に要素をターゲットするために必要なロケータの完全なセット</a>をキャプチャできないため、テスト実行時にこのステップが失敗します。
</div>

[カプセル化モード][2]とステップの目的に応じて、ブラウザテストアクションを利用して、Shadow DOM 内にレンダリングされた要素と対話し、検証するテストを構成します。このガイドでは、これらのアクションとアサーションタイプについて説明します。

## オープンモード

{{< img src="synthetics/guide/browser-tests-using-shadow-dom/open-shadow-dom.png" alt="Open Shadow DOM" style="width:50%;" >}}

`open` モードでは、通常のアサーションは使用できません。JavaScript のアサーションを使用して、`Element.shadowRoot` プロパティを使用して Shadow DOM にレンダリングされた要素と対話し、検証することができます。

### テキストの存在をアサートする

{{< img src="synthetics/guide/browser-tests-using-shadow-dom/validate-text-in-shadow-dom.png" alt="Shadow DOM でレンダリングされたテキストの検証" style="width:90%;" >}}

"TODO" というテキストがページ上に表示されていることを確認するには、メインドキュメントの `<body>` 要素から直接 `innerHTML` プロパティをクエリします。

```HTML
return document.querySelector("body").innerHTML.includes("TODO")
```

### レンダリングされたテキストの検証

Shadow DOM でレンダリングされた要素内にテキストがレンダリングされていることを検証するには、`shadowRoot` プロパティを使用して、それぞれの要素および `innerHTML` または `textContent` プロパティにアクセスします。

例えば、次のコードは `<h3>` HTML タグに表示されたテキスト “TODO" を検証します。

```
// Shadow DOM がアタッチされている要素を探します:
let element = document.querySelector("body > editable-list")

// shadowRoot プロパティを使用して、Shadow DOM 内の <h3> 要素を特定します:
let shadowDomElement = element.shadowRoot.querySelector("div > h3")

// Shadow DOM 要素の textContent をチェックします:
return shadowDomElement.textContent.includes("TODO")
```

### 入力フィールドにテキストを入力する

テキスト入力フィールドがメインドキュメントの DOM ツリーにレンダリングされると、Datadog ブラウザテストレコーダーは自動的に入力された値を記録し、[Type Text][3] テストステップを作成します。

Shadow DOMでレンダリングされた入力フィールドを扱う場合、レコーダーが要素への参照点の完全なセットをキャプチャできないことがあり、テスト実行でステップが失敗することがあります。Shadow DOM で表示されるテキスト入力フィールドにテキストを入力するための回避策として、それぞれの `<input>` 要素を探し、 `value` フィールドを設定する JavaScript のアサーションを追加してください。

{{< img src="synthetics/guide/browser-tests-using-shadow-dom/validate-text-type.png" alt="Shadow DOM でレンダリングされた入力テキストの検証" style="width:90%;" >}}

たとえば、次のコードでは、入力フィールドに「Item added with JS assertion」というテキストが追加されます。

```js
// Shadow DOM がアタッチされている要素を探します:
let element = document.querySelector("body > editable-list")

// shadowRoot プロパティを使用して、Shadow DOM 内の <input> 要素を特定します:
let shadowDomInput = element.shadowRoot.querySelector("input")

// <input> 要素に value プロパティを設定します:
shadowDomInput.value = "Item added with JS assertion"

return true
```

### 要素をクリックする

Shadow DOM でレンダリングされた要素に対してクリックを発生させるには、それぞれの要素を見つけて `.click()` を実行します。

{{< img src="synthetics/guide/browser-tests-using-shadow-dom/validate-trigger-click.png" alt="Shadow DOM でレンダリングされた要素に対するトリガークリックの検証" style="width:90%;" >}}

例えば、以下のコードスニペットでは、button 要素のクリックをトリガーしています。

```
// Shadow DOM がアタッチされている要素を探します:
let element = document.querySelector("body > editable-list")

// shadowRoot プロパティを使用して、Shadow DOM 内の <button> 要素を特定します:
let shadowDomButton = element.shadowRoot.querySelector("button.editable-list-add-item")

// ボタンのクリックをトリガーします:
shadowDomButton.click()

return true
```

## クローズドモード

{{< img src="synthetics/guide/browser-tests-using-shadow-dom/closed-shadow-dom.png" alt="Closed Shadow DOM" style="width:30%;" >}}

`closed` モードでは、通常のアサーションは使用できません。さらに、shadow DOM でレンダリングされた要素には JavaScript でアクセスできないので、ブラウザテストで JavaScript のアサーションを使用することはできません。

`Press Key` アクションを使用すると、適切なオプションを選択することができます。例えば、ナビゲーションメニューからオプションを選択して別のページに移動する場合、メニューが Shadow DOM でレンダリングされていれば、`tab` キーでそれぞれのオプションに移動し、`enter` キーをクリックしてオプションを選択します。

{{< img src="synthetics/guide/browser-tests-using-shadow-dom/using-tab-keys-for-shadow-dom.mp4" alt="ブラウザテストで Shadow DOM を回避するためにタブキーを使用する" video=true >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developers.google.com/web/fundamentals/web-components/shadowdom
[2]: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM#basic_usage
[3]: https://docs.datadoghq.com/ja/synthetics/browser_tests/actions#type-text