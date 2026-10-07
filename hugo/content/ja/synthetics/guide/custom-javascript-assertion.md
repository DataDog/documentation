---
description: Synthetic ブラウザテストでカスタム JavaScript アサーションを使用する方法について説明します。
further_reading:
- link: /synthetics/browser_tests/test_steps/
  tag: ドキュメント
  text: ブラウザテストステップについて
- link: /synthetics/browser_tests/advanced_options/
  tag: ドキュメント
  text: テストステップの高度なオプションを構成する方法を学ぶ
- link: /synthetics/guide/popup/#moving-popups
  tag: ドキュメント
  text: 不明な時間にトリガーされるポップアップの処理方法について学ぶ
- link: https://www.datadoghq.com/blog/ambassador-browser-tests/
  tag: ブログ
  text: Datadog を使用してクライアントのブラウザテストをスケールさせる手助けをした方法
title: ブラウザテストでカスタム JavaScript アサーションを使用する
---
## 概要 {#overview}

このガイドでは、[ブラウザテスト][1]でカスタム JavaScript を使用してユーザーインターフェース (UI) をテストする方法について説明します。JavaScript アサーションは、同期コードと非同期コードの両方をサポートしています。

カスタム JavaScript を使用してアサーションを作成するには、以下の手順を実行します。

1. {{< ui >}}Assertion{{< /ui >}} をクリックし、{{< ui >}}Test custom JavaScript assertion{{< /ui >}} を選択します。
2. アサーションの本文を記述します。
3. オプションで、UI でターゲットとなる要素を選択します。
4. {{< ui >}}Apply{{< /ui >}} をクリックします。

アサーションについては、[ブラウザテストステップ][2]を参照してください。

## ある要素がページ上に存在しないことをアサートする {#assert-that-an-element-is-not-on-the-page}

特定の ID を持つ要素がページ上に*ない*ことを確認するには、`return !document.getElementById("<ELEMENT_ID>");` を使用します。

ページ上に要素が*ない*ことを確認し、コンソールエラーで要素の数を返すには、本文のアサーションに以下を追加します。

{{< code-block lang="javascript" >}}
var element = document.querySelectorAll("<SELECTORS>");
if ( element.length > 0 ){
    console.error(element.length+"  "+"elements exist");
} 
return element.length === 0;
{{< /code-block >}}

ブラウザテストの結果には `console.error` ログが含まれ、JavaScript 関数ごとに最大 4 つのログが許可されます。明確さと効率を向上させるために、ログをまとめることを検討してください。

{{< img src="synthetics/guide/custom-javascript-assertion/step_results.png" alt="テストステップのサイドパネルにある [Errors & Warnings] タブに表示されているコンソールエラーログ" style="width:80%;" >}}

## ラジオボタンがチェックされたことをアサートする {#assert-that-a-radio-button-is-checked}

ラジオボタンがチェックされたことを確認するには、本文アサーションで `return document.querySelector("<SELECTORS>").checked === true;` を使用します。

## 指定されたローカルストレージの値を設定する {#set-the-value-of-a-specified-local-storage-item}

指定されたローカルストレージの値を設定するには、本文アサーションに以下を追加します。

{{< code-block lang="javascript" >}}
localStorage.setItem(keyName, keyValue);
return true
{{< /code-block >}}

例えば、1970 年 1 月 1 日 00 時 00 分 00 秒 (UTC) から経過したミリ秒数を "mytime" に設定するには、以下の手順に従います。

{{< code-block lang="javascript" >}}
localStorage.setItem("mytime", Date.now());
return true
{{< /code-block >}}

特定の値を比較する必要がある場合、`localStorage` は他の JavaScript アサーションでアクセスできます。

{{< code-block lang="javascript" >}}
localStorage.getItem("mytime");
return true
{{< /code-block >}}

## レンダリングされた PDF に含まれるテキストに対してアサートする {#assert-on-text-contained-in-a-rendered-pdf}

外部ライブラリを使って、レンダリングされた PDF の内容をテストすることができます。

外部ライブラリを読み込むには、本文アサーションで promise を使用します。

{{< code-block lang="javascript" filename="Custom JavaScript" collapsible="true" >}}
const script = document.createElement('script');
script.type = 'text/javascript';
//load external library
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

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/browser_tests/
[2]: /ja/synthetics/browser_tests/test_steps/?tab=testanelementontheactivepage#assertion