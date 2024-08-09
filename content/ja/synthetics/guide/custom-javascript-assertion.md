---
description: Synthetic ブラウザテストでカスタム JavaScript アサーションを使用する方法について説明します。
further_reading:
- link: /synthetics/browser_tests/actions/
  tag: ドキュメント
  text: ブラウザテストステップについて
- link: /synthetics/browser_tests/advanced_options/
  tag: ドキュメント
  text: テストステップの高度なオプションを構成する方法を学ぶ
- link: /synthetics/guide/popup/#moving-popups
  tag: ドキュメント
  text: 不明な時間にトリガーされるポップアップの処理方法について
title: ブラウザテストでカスタム JavaScript アサーションを使用する
---

## 概要

このガイドでは、[ブラウザテスト][1]でカスタム JavaScript を使用してユーザーインターフェイス (UI) をテストする方法について説明します。JavaScript のアサーションは、同期と非同期のコードをサポートします。

カスタム JavaScript を使用してアサーションを作成するには

1. **Assertion** をクリックし、**Test your UI with custom JavaScript** を選択します。
2. アサーションの本文を記述します。
3. オプションで、UI でターゲットとなる要素を選択します。
4. **Apply** をクリックします。

アサーションについては、[ブラウザテストステップ][2]を参照してください。

## ある要素がページ上に存在しないことをアサートする

特定の ID を持つ要素がページ上に*ない*ことを確認するには、`return !document.getElementById("<ELEMENT_ID>");` を使用します。

ページ上に要素が*ない*ことを確認し、コンソールエラーで要素の数を返すには、本文のアサーションに以下を追加します。

{{< code-block lang="javascript" >}}
var element = document.querySelectorAll("<SELECTORS>");
if ( element.length > 0 ){
    console.error(element.length+"  "+"elements exist");
} 
return element.length === 0;
{{< /code-block >}}

ブラウザテストの結果には、`console.error` のログが含まれます。

{{< img src="synthetics/guide/custom-javascript-assertion/step_results.png" alt="テストステップのサイドパネルの Errors & Warnings タブにコンソールのエラーログが表示される" style="width:80%;" >}}

## ラジオボタンがチェックされたことをアサートする

ラジオボタンがチェックされていることを確認するには、本文アサーションで `return document.querySelector("<SELECTORS>").checked = true;` を使用します。

## 指定されたローカルストレージの値を設定する

指定したローカルストレージの値を設定するには、本文アサーションに以下を追加します。

{{< code-block lang="javascript" >}}
localStorage.setItem(keyName, keyValue);
return true
{{< /code-block >}}

例えば、1970 年 1 月 1 日 00 時 00 分 00 秒 (UTC) から経過したミリ秒数を "mytime" に設定するには

{{< code-block lang="javascript" >}}
localStorage.setItem("mytime", Date.now());
return true
{{< /code-block >}}

## レンダリングされた PDF に含まれるテキストに対するアサート

外部ライブラリを使って、レンダリングされた PDF の内容をテストすることができます。

外部ライブラリを読み込むには、本文アサーションで promise を使用します。

{{< code-block lang="javascript" filename="Custom JavaScript" collapsible="true" >}}
const script = document.createElement('script');
script.type = 'text/javascript';
//外部ライブラリの読み込み
script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.min.js";
const promise = new Promise((r) => script.onload = r)
document.head.appendChild(script)

await promise

var loadingTask = pdfjsLib.getDocument("<PDF_URL>");
return await loadingTask.promise.then(function(pdf) {
    return pdf.getPage(1).then(function(page) {
        return page.getTextContent().then(function(content) {
            return content.items[0].str.includes("<CONTENT_STRING>")
        })
    })
});
{{< /code-block >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/browser_tests/
[2]: /ja/synthetics/browser_tests/actions/?tab=testanelementontheactivepage#assertion