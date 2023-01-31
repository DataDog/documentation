---
title: RUM ユーザーアクション
kind: documentation
further_reading:
  - link: 'https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/'
    tag: ブログ
    text: リアルユーザーモニタリング
  - link: /real_user_monitoring/guide/send-custom-user-actions/
    tag: ドキュメント
    text: カスタムユーザーアクションの使用方法を学ぶ
  - link: /real_user_monitoring/explorer/
    tag: ドキュメント
    text: Datadog でビューを検索する
  - link: /logs/processing/attributes_naming_convention/
    tag: ドキュメント
    text: Datadog標準属性
---
## ユーザーアクションの自動収集
Real User Monitoring (RUM) SDK は、ユーザージャーニー中に実行されるユーザーアクションを自動的に検出します。この機能を有効にするには、`trackInteractions` [初期化パラメーター][1]を `true` に設定します。

**注**: `trackInteractions` [初期化パラメーター][1]は、アプリケーション内のユーザークリックの自動収集を有効にします。ページに含まれている**機密データと非公開データ**は、やり取りされた要素を特定するために含まれる場合があります。

インタラクションが検出されると、すべての新しい RUM イベントは、完了したと見なされるまで、進行中のユーザーアクションにアタッチされます。ユーザーアクションは、その親ビュー属性 (ブラウザ情報、ジオロケーションデータ、[グローバルコンテキスト][2]など) からも恩恵を受けます。

### ユーザーアクション期間はどのように計算されますか？
インタラクションが検出されると、RUM SDK は DOM ミューテーションのネットワークリクエストを監視します。100 ミリ秒を超えてページにアクティビティがない場合、インタラクションは完了したと見なされます (アクティビティは、進行中のネットワークリクエストとして定義されているか、DOM ミューテーションが現在発生しています)。

## カスタムユーザーアクション
カスタムユーザーアクションは、[`addAction` API][3] を介して手動で宣言および送信されるユーザーアクションです。カスタムタイミングや顧客のカート情報など、ユーザージャーニー中に発生するイベントに関連する情報を送信するのに役立ちます。

## 収集されるメジャー

| 属性    | タイプ   | 説明              |
|--------------|--------|--------------------------|
| `duration` | 数値（ns） | ユーザーアクションの長さ。[ユーザーアクションのドキュメント][4]で計算方法を確認してください。 |
| `user_action.measures.long_task_count`        | 数値      | このユーザーアクションについて収集されたすべてのロングタスクの数。 |
| `user_action.measures.resource_count`         | 数値      | このユーザーアクションについて収集されたすべてのリソースの数。 |
| `user_action.measures.error_count`      | 数値      | このユーザーアクションについて収集されたすべてのエラーの数。|

## 収集されるファセット

| 属性    | タイプ   | 説明              |
|--------------|--------|--------------------------|
| `user_action.id` | 文字列 | ユーザーアクションの UUID ([カスタムユーザーアクション][5]には設定されません)。 |
| `user_action.type` | 文字列 | ユーザーアクションのタイプ。[カスタムユーザーアクション][5]の場合、`custom` に設定されます。 |
| `event.name` | 文字列 | ユーザーアクションの名前。自動的に収集されたユーザーアクションの場合、ユーザーが操作した要素。 |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/installation/?tab=us#initialization-parameters
[2]: /ja/real_user_monitoring/installation/advanced_configuration/?tab=npm#add-global-context
[3]: /ja/real_user_monitoring/installation/advanced_configuration/?tab=npm#custom-user-actions
[4]: /ja/real_user_monitoring/data_collected/user_action#how-is-the-user-action-duration-calculated
[5]: /ja/real_user_monitoring/data_collected/user_action#custom-user-actions
