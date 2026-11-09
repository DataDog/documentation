---
aliases:
- /ja/journey_monitoring/map/suggested_journeys/
description: フロントエンドアプリケーションでのユーザーアクティビティに基づく提案からジャーニーを作成します。
further_reading:
- link: /journey_monitoring/
  tag: ドキュメント
  text: Journey Monitoring について
- link: /journey_monitoring/map/
  tag: ドキュメント
  text: マップについて
- link: /journey_monitoring/configuring_journeys/
  tag: ドキュメント
  text: ジャーニーを構成する
title: 推奨ジャーニー
---
## 概要{#overview}

毎週水曜日の午前 0 時 (UTC) に、Datadog はフロントエンドアプリケーションからの過去 30 日間の[ページビューとクリック][3]を分析します。Datadog はこのアクティビティに基づいて、以下の情報を含む推奨ジャーニーを生成します。

- ジャーニー名
- ジャーニーの説明
- 開始イベント
- 終了イベント

[マップ][1]または[カタログ][2]から推奨ジャーニーを選択して、[ジャーニー作成ページ][4]を開きます。Datadog により、名前、説明、開始イベント、終了イベントが自動的に入力されます。ジャーニーを作成する前に、これらのフィールドを確認してください。

推奨ジャーニーにカーソルを合わせて、承認または破棄を行います。破棄するには、X アイコンをクリックします。破棄された推奨ジャーニーが再び表示されることはありません。

<div class="alert alert-warning"><p>組織が適用された AI エクスペリエンスをオプトアウトしている場合、推奨ジャーニーは表示されません。</p></div>

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/journey_monitoring/map/
[2]: /ja/journey_monitoring/overview/#journey-catalog
[3]: /ja/product_analytics/data_collected/
[4]: /ja/journey_monitoring/configuring_journeys/#choose-a-creation-method