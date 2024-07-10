---
algolia:
  tags:
  - ユーザーアクション
further_reading:
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: ブログ
  text: Datadog リアルユーザーモニタリングのご紹介
- link: /real_user_monitoring/explorer/
  tag: ドキュメント
  text: Datadog でビューを検索する
- link: /real_user_monitoring/explorer/visualize/
  tag: Documentation
  text: イベントへの視覚化の適用
- link: /real_user_monitoring/platform/dashboards/
  tag: Documentation
  text: RUM ダッシュボードについて
title: ユーザーアクションの追跡
---

## 概要

ブラウザモニタリングは、ユーザージャーニーで実行されるユーザーインタラクションを自動的に検出し、アプリケーション内のクリックをいちいち手動でインスツルメンテーションしなくても、ユーザーの行動に関するインサイトを提供します。

以下の目的を達成できます。

* キーとなるインタラクションの実行（**カートへ追加**ボタンのクリックなど）を把握
* 機能の適応を数値化
* 特定のブラウザエラーにつながるステップを認識

## 収集する情報の管理

初期化パラメーター `trackUserInteractions` は、アプリケーション内のユーザークリックの収集を有効にします。つまり、ページに含まれている機密データと非公開データは、ユーザーによってやり取りされた要素を特定するために含まれる場合があります。

Datadog に送信する情報を制御するには、[アクション名を手動で設定する](#declare-a-name-for-click-actions)か、[Datadog Browser SDK for RUM でグローバルスクラビングルールを実装する][1]必要があります。

## ユーザーインタラクションの追跡

RUM ブラウザ SDK は自動的にクリックを追跡します。**以下のすべて**の条件が満たされると、クリックアクションが作成されます。

* クリックに続くアクティビティが検出されます。詳しくは[ページアクティビティの計算方法][2]をご覧ください。
* クリックによって新規ページの読み込みは開始しない。この場合、Datadog ブラウザ SDK で別の RUM ビューイベントが生成されます。
* アクションの名前を計算することができます。詳しくは、[クリックアクションの名前を宣言する](#declare-a-name-for-click-actions)を参照してください。

## アクションタイミングメトリクス

すべての RUM イベントタイプのデフォルト属性については、[RUM ブラウザのデータ収集][3]を参照してください。

| メトリクス    | タイプ   | 説明              |
|--------------|--------|--------------------------|
| `action.loading_time` | 数値（ns） | アクションのロード時間。  |
| `action.long_task.count`        | 数値      | このアクションについて収集されたすべてのロングタスクの数。 |
| `action.resource.count`         | 数値      | このアクションについて収集されたすべてのリソースの数。 |
| `action.error.count`      | 数値      | このアクションについて収集されたすべてのエラーの数。|

Datadog Browser SDK for RUM は、クリックごとにページのアクティビティを監視することで、アクションのロード時間を計算します。ページにアクティビティがなくなると、アクションは完了したとみなされます。詳細については、[ページアクティビティの計算方法][2]を参照してください。

サンプリングまたはグローバルコンテキストに対する構成の詳細については、[RUM データおよびコンテキストの変更][1]を参照してください。

## アクションの属性

| 属性    | タイプ   | 説明              |
|--------------|--------|--------------------------|
| `action.id` | 文字列 | ユーザーアクションの UUID。 |
| `action.type` | 文字列 | ユーザーアクションのタイプ。カスタムユーザーアクションの場合、`custom` に設定されます。 |
| `action.target.name` | 文字列 | ユーザーが操作したエレメント。自動収集されたアクションのみ対象。 |
| `action.name` | 文字列 | 作成されたユーザーフレンドリーな名称 (`Click on #checkout` など)。カスタムユーザーアクションの場合は、API コールで提供されたアクション名。 |

## クリックアクションの名前を宣言する

Datadog Browser SDK for RUM は、クリックアクションの命名にさまざまなストラテジーを使用します。制御を強化するには、アクションの命名に使用されるクリック可能な要素（またはその親）に `data-dd-action-name` 属性を定義します。

例:

```html
<a class="btn btn-default" href="#" role="button" data-dd-action-name="Login button">Try it out!</a>

<div class="alert alert-danger" role="alert" data-dd-action-name="Dismiss alert">
    <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
    <span class="visually-hidden">Error:</span>
    Enter a valid email address
</div>
```

[バージョン 2.16.0][4] 以降、`actionNameAttribute` 初期化パラメーターを使用して、アクションに名前を付けるために使用されるカスタム属性を指定できます。

例:

```html
<script>
  window.DD_RUM.init({
    ...
    trackUserInteractions: true,
    actionNameAttribute: 'data-custom-name',
  ...
  })
</script>

<a class="btn btn-default" href="#" role="button" data-custom-name="Login button">Try it out!</a>
```

両方の属性が要素に存在する場合、`data-dd-action-name` が優先されます。

## カスタムアクションの送信

ユーザーインタラクションのコレクションを拡張するには、`addAction` API を使用してカスタムアクションを送信します。これらのカスタムアクションは、ユーザージャーニー中に発生したイベントに関連する情報を送信します。

詳しくは、[カスタムアクションの送信][5]をご覧ください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/browser/advanced_configuration/
[2]: /ja/real_user_monitoring/browser/monitoring_page_performance/#how-page-activity-is-calculated
[3]: /ja/real_user_monitoring/browser/data_collected/#default-attributes
[4]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v2160
[5]: /ja/real_user_monitoring/guide/send-rum-custom-actions