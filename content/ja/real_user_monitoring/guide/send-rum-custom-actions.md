---
title: RUM カスタムアクションの送信
kind: ガイド
further_reading:
  - link: /real_user_monitoring/explorer
    tag: Documentation
    text: RUM データを Explorer で確認
aliases:
  - /ja/real_user_monitoring/guide/send-custom-user-actions/
---
## 概要

Real User Monitoring は、Webアプリケーションで[アクションを自動的に収集します][1]。また、フォームの入力やビジネストランザクションなど、追加のイベントやタイミングを収集することもできます。カスタム RUM アクションを使用して、関連するすべてのコンテキストをアタッチして、興味深いイベントを監視します。このガイド全体の例として、e コマース Web サイトからユーザーのチェックアウト情報を収集します。

## 1. コードのインスツルメンテーション
新しい RUM アクションを作成するには、`addAction` API を使用します。アクションに名前を付けてから、JavaScript オブジェクトの形式でコンテキスト属性をアタッチします。次の例では、ユーザーがチェックアウトボタンをクリックしたときに、ユーザーカートの詳細を含む「チェックアウト」アクションが作成されます。

```javascript
function onCheckoutButtonClick(cart) {
    DD_RUM.addAction('checkout', {
        'value': cart.value, // 例: 42.12
        'items': cart.items, // 例: ['tomato', 'strawberries']
    })
}
```

[Global Context API][2] で提供される追加の属性とともに、すべての RUM コンテキスト (現在のページビュー情報、geoIP データ、ブラウザ情報など) が自動的にアタッチされます。

## 2. 新しい属性にファセットとメジャーを作成
カスタムアクションを作成するコードをデプロイすると、[RUM Explorer][3] の **Actions** タブにアクションが表示されるようになります。

新しいカスタムアクションを簡単に絞り込むには、次のように `Action Target Name` 属性を使用します: `@action.target.name:<ACTION_NAME>`。この例では、次のフィルターを使用します: `@action.target.name:checkout`

アクションをクリックすると、すべてのメタデータがサイドパネルで利用可能になります。アクション属性は、Custom Attributes セクションにあります。次のステップは、これらの属性をクリックしてファセットまたはメジャーを作成することです。たとえば、カートアイテムのファセットとカート値のメジャーを作成します。

{{< img src="real_user_monitoring/guide/send-custom-user-actions/facet-from-user-action.gif" alt="カスタム RUM アクションのファセットを作成する" style="width:100%;">}}

**注**: 一意性のある値 (ID など) にはファセットを、質量的な値 (タイミングやレイテンシーなど) にはメジャーを使用します。

## 3. 属性を Explorer、ダッシュボード、モニターで使用
ファセットとメジャーを作成したら、RUM のクエリでアクション属性を使用できます。つまり、[RUM Explorer/Analytics][3] でダッシュボードウィジェット、モニター、高度なクエリを構築できます。

下記のスクリーンショットは、前日のカートの国別平均値を示した例です。右上のドロップダウンメニューを使用して、このクエリをダッシュボードウィジェットまたはモニターとしてエクスポートできます。

{{< img src="real_user_monitoring/guide/send-custom-user-actions/custom-action-analytics.png" alt="Analytics で RUM アクションを使用する" style="width:100%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/browser/data_collected/?tab=useraction#automatic-collection-of-actions
[2]: /ja/real_user_monitoring/browser/advanced_configuration/#replace-global-context
[3]: /ja/real_user_monitoring/explorer