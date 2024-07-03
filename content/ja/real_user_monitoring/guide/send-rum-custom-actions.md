---
aliases:
- /ja/real_user_monitoring/guide/send-custom-user-actions/
beta: true
description: Learn how to send custom actions to extend your collection of user interactions.
further_reading:
- link: /real_user_monitoring/explorer
  tag: Documentation
  text: Visualize your RUM data in the RUM Explorer
private: true
title: Send RUM Custom Actions
---
## 概要

リアルユーザーモニタリングは、Web アプリケーション上の[アクションを自動的に収集][1]します。フォームの記入完了やビジネストランザクションなど、追加のイベントやタイミングを収集することができます。

カスタム RUM アクションを使用すると、関連するすべてのコンテキストをアタッチして興味深いイベントを監視することができます。例えば、Datadog ブラウザ SDK は、ユーザーが e コマースサイトでチェックアウトボタンをクリックすると、ユーザーのチェックアウト情報 (カート内のアイテム数、アイテムのリスト、カートアイテムの価値など) を収集することが可能です。

## コードのインスツルメンテーション

`addAction` API を使用して RUM アクションを作成します。アクションに名前を付け、JavaScript オブジェクトの形でコンテキスト属性をアタッチします。

次の例では、ユーザーがチェックアウトボタンをクリックすると、ユーザーカートの詳細を表示する `checkout` アクションを作成します。

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

function onCheckoutButtonClick(cart) {
    datadogRum.addAction('checkout', {
        'value': cart.value, // 例: 42.12
        'items': cart.items, // 例: ['tomato', 'strawberries']
    })
}
```

{{% /tab %}}
{{% tab "CDN async" %}}

API コールを `onReady` コールバックでラップしていることを確認します。

```javascript
function onCheckoutButtonClick(cart) {
    window.DD_RUM.onReady(function() {
        window.DD_RUM.addAction('checkout', {
            'value': cart.value, // 例: 42.12
            'items': cart.items, // 例: ['tomato', 'strawberries']
        })
    })
}
```

{{% /tab %}}
{{% tab "CDN sync" %}}

API コールの前に `window.DD_RUM` をチェックすることを確認します。

```javascript
window.DD_RUM && window.DD_RUM.addAction('<NAME>', '<JSON_OBJECT>');

function onCheckoutButtonClick(cart) {
    window.DD_RUM && window.DD_RUM.addAction('checkout', {
        'value': cart.value, // 例: 42.12
        'items': cart.items, // 例: ['tomato', 'strawberries']
    })
}
```

{{% /tab %}}
{{< /tabs >}}

現在のページビュー情報、geoIP データ、ブラウザ情報などのすべての RUM コンテキストは、[Global Context API][2]で提供される追加属性とともに自動的にアタッチされます。

## 属性にファセットとメジャーを作成する

カスタムアクションを作成するコードをデプロイすると、[RUM エクスプローラー][3]の **Actions** タブに表示されます。

カスタムアクションにフィルターをかけるには、`Action Target Name` 属性を使用します: `@action.target.name:<ACTION_NAME>`

以下の例では、`@action.target.name:checkout`というフィルターを使用しています。

{{< img src="real_user_monitoring/guide/send-custom-user-actions/facet-from-user-action.mp4" alt="カスタム RUM アクションのファセットを作成する" video=true style="width:100%;">}}

アクションをクリックすると、メタデータを含むサイドパネルが表示されます。**Custom Attributes** セクションでアクション属性を見つけ、クリックすることでこれらの属性のファセットまたはメジャーを作成できます。

特徴的な値 (ID) にはファセットを、タイミングやレイテンシーなどの定量的な値にはメジャーを使用します。例えば、カートアイテム用のファセットと、カート値用のメジャーを作成します。

## RUM エクスプローラーで属性を使用する

[RUM エクスプローラー][3]でファセットやメジャーとともにアクション属性を使用して、ダッシュボードウィジェット、モニター、高度なクエリを構築できます。

次の例では、過去 2 日間の国ごとの平均カート価額が表示されます。検索クエリをダッシュボードウィジェットまたはモニターにエクスポートするには、**Export** ボタンをクリックします。

{{< img src="real_user_monitoring/guide/send-custom-user-actions/custom-action-analytics.png" alt="RUM エクスプローラーで RUM アクションを使用する" style="width:100%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/browser/data_collected/?tab=useraction#action-attributes
[2]: /ja/real_user_monitoring/browser/advanced_configuration/#replace-global-context
[3]: /ja/real_user_monitoring/explorer