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
Real User Monitoring (RUM) SDK は、ユーザージャーニー中に実行されるユーザーのインタラクションを検出します。この機能を有効にするには、`trackInteractions` [初期化パラメーター][1]を `true` に設定します。

**注**: 初期化パラメーター `trackInteractions` は、アプリケーション内のユーザークリックの収集を有効にします。ページに含まれている**機密データと非公開データ**は、やり取りされた要素を特定するために含まれる場合があります。

インタラクションが検出されると、すべての新しい RUM イベントは、完了したと見なされるまで、進行中のアクションにアタッチされます。アクションは、その親ビュー属性 (ブラウザ情報、ジオロケーションデータ、[グローバルコンテキスト][2]など) からも恩恵を受けます。

## アクションタイミングメトリクス

すべての RUM イベントタイプのデフォルト属性に関する詳細は、[収集されるデータ][3]をご覧ください。サンプリングまたはグローバルコンテキストの構成に関する情報は、[高度なコンフィギュレーション][4]をご覧ください。

| メトリクス    | タイプ   | 説明              |
|--------------|--------|--------------------------|
| `action.loading_time` | 数値（ns） | アクションのロード時間。  |
| `action.long_task.count`        | 数値      | このアクションについて収集されたすべてのロングタスクの数。 |
| `action.resource.count`         | 数値      | このアクションについて収集されたすべてのリソースの数。 |
| `action.error.count`      | 数値      | このアクションについて収集されたすべてのエラーの数。|

### アクションのロード時間の計算方法

インタラクションが検出されると、RUM SDK はネットワークリクエストと DOM ミューテーションを監視します。100 ミリ秒を超えてページにアクティビティがない場合、インタラクションは完了したと見なされます (アクティビティは、進行中のネットワークリクエストまたは DOM ミューテーションとして定義)。

## アクションの属性

| 属性    | タイプ   | 説明              |
|--------------|--------|--------------------------|
| `action.id` | 文字列 | ユーザーアクションの UUID。 |
| `action.type` | 文字列 | ユーザーアクションのタイプ。カスタムユーザーアクションの場合、`custom` に設定されます。 |
| `action.target.name` | 文字列 | ユーザーが操作したエレメント。自動収集されたアクションのみ対象。 |
| `action.name` | 文字列 | 作成されたユーザーフレンドリーな名称 (`Click on #checkout` など)。カスタムユーザーアクションの場合は、API コールで提供されたアクション名。 |

## クリックアクションの名前を宣言

RUM ライブラリは、さまざまな戦略を使用してクリックアクションに名前を付けます。
さらにコントロールする必要がある場合は、アクションの命名に使用されるクリック可能な
要素 (またはその親のいずれか) に `data-dd-action-name` 属性を定義します。次に例を示します。

```html
<a class="btn btn-default" href="#" role="button" data-dd-action-name="Login button">Try it out!</a>

<div class="alert alert-danger" role="alert" data-dd-action-name="Dismiss alert">
  <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
  <span class="sr-only">Error:</span>
  Enter a valid email address
</div>
```
## カスタムユーザーアクション

カスタムユーザーアクションは、`addAction` API を使用して手動で宣言および送信されるユーザーアクションです。カスタムタイミングや顧客のカート情報など、ユーザージャーニー中に発生するイベントに関連する情報を送信できます。

RUM を初期化したら、`addAction(name: string, context: Context)` API コールを使用してアプリケーションページの特定のインタラクションを監視したり、カスタムタイミングを測定したりする場合のユーザーアクションを生成します。以下の例では、RUM SDK がカート内のアイテム数、中身、カート全体の総額を収集します。

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


[1]: /ja/real_user_monitoring/browser/?tab=us#initialization-parameters
[2]: /ja/real_user_monitoring/browser/advanced_configuration/?tab=npm#add-global-context
[3]: /ja/real_user_monitoring/browser/data_collected/#default-attributes
[4]: /ja/real_user_monitoring/browser/advanced_configuration/