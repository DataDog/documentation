---
aliases:
- /ja/app_builder/variables
- /ja/service_management/app_builder/variables
description: アプリ内のロジックをカプセル化し、ステート変数を使用してアプリのさまざまなコンポーネント間でデータを保存および操作します。
disable_toc: false
further_reading:
- link: /actions/app_builder/build/
  tag: ドキュメント
  text: アプリの構築
- link: /actions/app_builder/expressions/
  tag: ドキュメント
  text: JavaScript 式
title: ステート変数
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App Builder は、Datadog Government サイト US1-FED でプレビュー版として提供されています。
</div>
{{< /site-region >}}

アプリ内のロジックをカプセル化したい場合は、ステート変数を使用できます。

## ステート変数を作成する {#create-a-state-variable}

Bits AI を使用してステート変数を追加するには、以下の手順を実行します。
   1. {{< ui >}}Build with AI{{< /ui >}}アイコン (**<i class="icon-bits-ai"></i>**) をクリックします。
   1. 変数のカスタムプロンプトを入力するか、プロンプト `How can you help me with variables?` を試します。

ステート変数を手動で追加するには、以下の手順を実行します。

1. アプリで{{< ui >}}Data{{< /ui >}} ({{< ui >}}{&nbsp;}{{< /ui >}}) アイコンをクリックして、Data タブを開きます。
1. プラス ({{< ui >}}\+{{< /ui >}}) をクリックし、{{< ui >}}Variable{{< /ui >}} を選択します。
1. 必要に応じて、変数名をクリックして名前を変更します。
1. ステート変数の初期値を定義します。

## アプリ例 {#example-app}

{{< img src="actions/app_builder/state-variables-example-app.mp4" alt="ボタンをクリックすると、コールアウトの値が緑色の Pass と赤色の Fail の間で切り替わります" video="true" width="360px">}}

ボタンを使用してコールアウト値コンポーネントのスタイルと値を変更するアプリを作成するには、以下の手順に従います。

### 変数を作成する {#create-the-variables}

1. アプリで{{< ui >}}Data{{< /ui >}} ({{< ui >}}{&nbsp;}{{< /ui >}}) アイコンをクリックして、Data タブを開きます。
1. プラス ({{< ui >}}\+{{< /ui >}}) をクリックし、{{< ui >}}Variable{{< /ui >}} を選択します。
1. 変数名を `callout_value` にし、その {{< ui >}}Initial Value{{< /ui >}} を `Pass` に設定します。
1. プラス ({{< ui >}}\+{{< /ui >}}) をクリックして、別の変数を作成します。
1. この変数名を `callout_color` にし、その {{< ui >}}Initial Value{{< /ui >}} を `green` に設定します。

### コンポーネントを作成する {#create-the-components}

1. コールアウト値コンポーネントをアプリに追加します。次の値を指定します。
    * {{< ui >}}Value{{< /ui >}}: `${callout_value.value}`
    * {{< ui >}}Style{{< /ui >}}: `${callout_color.value}`
1. ボタンコンポーネントをアプリに追加し、そのラベルを `Change status` に設定します。
1. {{< ui >}}Events{{< /ui >}} で、イベントを追加します。次の値を指定します。
    * {{< ui >}}Event{{< /ui >}}: `click`
    * {{< ui >}}Reaction{{< /ui >}}: `custom`
    * {{< ui >}}Callback{{< /ui >}}:
        ```
        ${ () => {
            if(callout_color.value !== "green"){
                callout_color.setValue("green")
                callout_value.setValue("Pass")
            } else {
            callout_color.setValue("red")
            callout_value.setValue("Fail")
            }
        } }
        ```
1. {{< ui >}}Preview{{< /ui >}} をクリックして、アプリをプレビューします。<br>
    アプリ内の {{< ui >}}Change status{{< /ui >}} ボタンをクリックすると、コールアウトの値の要素の色とテキストが緑色の Pass と赤色の Fail の間で交互に切り替わります。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>ご質問やフィードバックがある場合は、[Datadog Community Slack][1] の **#app-builder** チャンネルにご参加ください。

[1]: https://chat.datadoghq.com/