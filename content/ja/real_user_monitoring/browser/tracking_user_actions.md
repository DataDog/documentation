---
title: ユーザーアクションの追跡
kind: documentation
further_reading:
  - link: /real_user_monitoring/guide/send-rum-custom-actions/
    tag: ガイド
    text: RUM カスタムアクションをコードから送信
  - link: 'https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/'
    tag: ブログ
    text: リアルユーザーモニタリング
  - link: /real_user_monitoring/explorer/
    tag: Documentation
    text: Datadog でビューを検索する
  - link: /real_user_monitoring/explorer/analytics/
    tag: Documentation
    text: イベントに関する分析論を組み立てる
  - link: /real_user_monitoring/dashboards/
    tag: Documentation
    text: RUM ダッシュボード
---
Real User Monitoring (RUM) Browser SDK は、ユーザージャーニー中に実行されるユーザーアクションを自動的に検出します。

ユーザーアクションを自動収集することで、アプリケーション内のすべてのクリックに手動でインスツルメントしなくても、ユーザー行動のインサイトを得ることが可能になるため、以下の目的を達成できます。
* キーとなるインタラクションの実行（「カートへ追加」ボタンのクリックなど）を把握
* 機能の適応を数値化
* 特定のブラウザエラーにつながるステップを認識

[独自のカスタムアクションを送信](#custom-actions)し、ユーザーアクションの収集を拡張できます。

**注**: 初期化パラメーター `trackInteractions` は、アプリケーション内のユーザークリックの収集を有効にします。ページに含まれている**機密データと非公開データ**は、やり取りされた要素を特定するために含まれる場合があります。Datadog へ送信される情報を制御するには、[アクション名を手動で設定](#declaring-a-name-for-click-actions)するか、[Browser SDK のグローバルスクラビングルールをインスツルメント][1]します。

## どのようなインタラクションが追跡されますか？

Browser SDK は自動的にクリックを追跡します。以下の **すべて** の条件が満たされると、クリックアクションが作成されます。
* クリックが処理された 100ms 以内にアクティビティを検出（アクティビティはネットワークリクエストまたは DOM ミューテーションの開始時として定義）。
* クリックによって新規ページの読み込みは開始しない。この場合、Browser SDK で新規 RUM ビューイベントが生成されます。
* アクションに名前を計算することが可能です（[アクションの命名に関する詳細をご参照ください](#declaring-a-name-for-click-actions)）。

## アクションタイミングメトリクス

すべての RUM イベントタイプのデフォルト属性に関する詳細は、[収集されるデータ][3]をご覧ください。サンプリングまたはグローバルコンテキストの構成に関する情報は、[高度なコンフィギュレーション][4]をご覧ください。

| メトリクス    | タイプ   | 説明              |
|--------------|--------|--------------------------|
| `action.loading_time` | 数値（ns） | アクションのロード時間。  |
| `action.long_task.count`        | 数値      | このアクションについて収集されたすべてのロングタスクの数。 |
| `action.resource.count`         | 数値      | このアクションについて収集されたすべてのリソースの数。 |
| `action.error.count`      | 数値      | このアクションについて収集されたすべてのエラーの数。|

### アクションのロード時間の計算方法

インタラクションが検出されると、RUM SDK によりネットワークリクエストと DOM ミューテーションが監視されます。ページで 100ms 以上アクティビティがないと、アクションが完了したとみなされます（アクティビティは進行中のネットワークリクエストまたは DOM ミューテーションとして定義）。

## アクションの属性

| 属性    | タイプ   | 説明              |
|--------------|--------|--------------------------|
| `action.id` | 文字列 | ユーザーアクションの UUID。 |
| `action.type` | 文字列 | ユーザーアクションのタイプ。カスタムユーザーアクションの場合、`custom` に設定されます。 |
| `action.target.name` | 文字列 | ユーザーが操作したエレメント。自動収集されたアクションのみ対象。 |
| `action.name` | 文字列 | 作成されたユーザーフレンドリーな名称 (`Click on #checkout` など)。カスタムユーザーアクションの場合は、API コールで提供されたアクション名。 |

## クリックアクションの名前を宣言

RUM ライブラリは、クリックアクションの命名にさまざまなストラテジーを使用します。制御を強化するには、アクションの命名に使用されるクリック可能な要素（またはその親）に `data-dd-action-name` 属性を定義します。

```html
<a class="btn btn-default" href="#" role="button" data-dd-action-name="Login button">Try it out!</a>

<div class="alert alert-danger" role="alert" data-dd-action-name="Dismiss alert">
  <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
  <span class="sr-only">Error:</span>
  Enter a valid email address
</div>
```
## カスタムアクション

カスタムアクションは、`addAction` API を使用して手動で宣言および送信されるユーザーアクションです。ユーザージャー中に発生するイベントに関連する情報の送信に使用されます。以下の例では、訪問者がチェックアウトボタンをクリックしたすると、RUM SDK がユーザーのカートデータを収集します。ここでは、カート内のアイテム数、アイテムリスト、カート内のアイテム総額が収集されます。

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.addAction('<NAME>', '<JSON_OBJECT>');

// コード例
datadogRum.addAction('checkout', {
    cart: {
        amount: 42,
        currency: '$',
        nb_items: 2,
        items: ['socks', 't-shirt'],
    },
});
```

{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
DD_RUM.onReady(function() {
    DD_RUM.addAction('<NAME>', '<JSON_OBJECT>');
})

// コード例
DD_RUM.onReady(function() {
    DD_RUM.addAction('checkout', {
        cart: {
            amount: 42,
            currency: '$',
            nb_items: 2,
            items: ['socks', 't-shirt'],
        },
    });
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_RUM && DD_RUM.addAction('<NAME>', '<JSON_OBJECT>');

// コード例
window.DD_RUM &&
    DD_RUM.addAction('checkout', {
        cart: {
            amount: 42,
            currency: '$',
            nb_items: 2,
            items: ['socks', 't-shirt'],
        },
    });
```

{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/real_user_monitoring/browser/advanced_configuration/?tab=npm#scrub-sensitive-data-from-your-rum-data
[3]: /ja/real_user_monitoring/browser/data_collected/#default-attributes
[4]: /ja/real_user_monitoring/browser/advanced_configuration/