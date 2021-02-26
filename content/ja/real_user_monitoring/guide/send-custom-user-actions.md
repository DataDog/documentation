---
title: RUM カスタムユーザーアクションの送信
kind: ガイド
further_reading:
  - link: /real_user_monitoring/explorer
    tag: Documentation
    text: RUM データを Explorer で確認
---
## 概要

Datadog の RUM では、カスタムユーザーアクション機能で興味深いイベントやタイミングのデータを収集できます。このガイドでは、例として e コマースのウェブサイトからユーザーのチェックアウト情報を収集します。

## 1. コードのインスツルメンテーション
`addAction` API を使用すると、属性をいくつでも JavaScript オブジェクトの形式でアタッチできます。この例では、ユーザーがチェックアウトボタンをクリックした時、カードに関する情報が送信されます。

```
function onCheckoutButtonClick(cart) {
    DD_RUM.addAction('checkout', {
        'amount': cart.amount, // e.g. 42.12
        'items': cart.items, // e.g. ['tomato', 'strawberries']
    })
}
```

RUM コンテキスト全体が、[グローバルコンテキスト API][1] にアタッチされたその他のデータとともに、自動的にアタッチされます (現在のページビュー情報、geoIP データ、ブラウザ情報など)。

## 2. 新しい属性にファセットとメジャーを作成
カスタムユーザーアクションを送信するコードをデプロイすると、RUM Explorer の **User Actions** タブに表示されるようになります。

ユーザーアクションを簡単に絞り込むには、`Event Name` フィルターを次のように使用します: `@evt.name:<USER_ACTION_NAME>`. この例では、`@evt.name:checkout` のフィルターを使用しています。

ユーザーアクションをクリックすると、属性のリストが表示されます。先ほど送信した属性をクリックし、ファセットまたはメジャーを作成します。たとえば、カート内のアイテムにファセットを、総額にメジャーを作成します。

{{< img src="real_user_monitoring/guide/send-custom-user-actions/facet-from-user-action.gif" alt="最多ログ記録サービスステータスを特定" style="width:100%;">}}

**注**: 一意性のある値 (ID など) にはファセットを、質量的な値 (タイミングやレイテンシーなど) にはメジャーを使用します。

## 3. 属性を Explorer、ダッシュボード、モニターで使用
ファセットとメジャーを作成したら、RUM のクエリで使用できます。つまり、[RUM Explorer/Analytics][2] でダッシュボードウィジェット、モニター、高度なクエリを構築できます。

下記のスクリーンショットは、前日のカートの国別総額を示した例です。右上のドロップダウンメニューを使用して、このウィジェットをダッシュボードまたはモニターにエクスポートできます。

{{< img src="real_user_monitoring/guide/send-custom-user-actions/analytics-to-dashboard.png" alt="最多ログ記録サービスステータスを特定" style="width:100%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/browser/advanced_configuration/#replace-global-context
[2]: /ja/real_user_monitoring/explorer
