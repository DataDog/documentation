---
title: Live Search
kind: ドキュメント
aliases:
  - /ja/tracing/livetail
description: すべてのトレーススパンをリアルタイムに表示します。
further_reading:
  - link: /tracing/setup/
    tag: Documentation
    text: アプリケーションで APM トレースをセットアップする方法
  - link: /tracing/visualization/services_list/
    tag: Documentation
    text: Datadog に報告するサービスの一覧
  - link: /tracing/visualization/service/
    tag: Documentation
    text: Datadog のサービスについて
  - link: /tracing/visualization/resource/
    tag: Documentation
    text: リソースのパフォーマンスとトレースの詳細
  - link: /tracing/visualization/trace/
    tag: Documentation
    text: Datadog トレースの読み方を理解する
  - link: /tracing/app_analytics/analytics/
    tag: Documentation
    text: 無制限のカーディナリティでの APM データの分析
---
{{< img src="tracing/live_search/livesearchmain.gif" alt="Live Search" >}}

## 概要

APM の [Live Search][1] を使用すると、過去 15 分間に収集されたスパンを任意のタグで即時に検索できます。スパンは、Datadog Agent から送信された時点で、Datadog がインデックス化する前に表示されます。Datadog によって取り込まれたすべてのスパンはサンプリングなしで表示されます（Tracing without Limits\*）。APM の Live Search では以下のことができます。

- 検索クエリを記述し、任意のスパンの任意のタグでトレースのストリームを絞り込みます。たとえば、すべてのタグの `version_id` でフィルタリングすることで、新しいデプロイがスムーズに行われたかを監視します。
- トレーススパンが取り込まれる度に 100% 表示されます。たとえば、子スパンに関連付けられた特定の `org_id` または `customer_id` に関連して発生するシステム中断に関する情報をリアルタイムに確認できます。収集されたスパンには 15 分間サンプリングが行われないことに注意してください。
- 検索クエリはリアルタイムでオートコンプリートします。たとえば、プロセスが正常に開始されたかをチェックするため子スパンタグの `process_id` を入力すると、ID を自動補完します。
- RED のキーメトリクス（秒ごとのリクエスト、エラー、レイテンシ）をライブの時系列可視化機能で確認します。たとえば、子リソースの持続時間でフィルタリングし、エンドポイントでの負荷テストやパフォーマンスへの影響を監視します。
- トレースパネルビューから、直接スパンやタグに対する検索クエリをワンクリックで実行できます。
- スパンタグから列を追加、削除、並び替えてビューをカスタマイズできます。

## Live Search モード
{{< img src="tracing/live_search/livesearch_mode.gif" alt="Live Search モード" >}}

`Live Search` モードはトレースページのデフォルトのエクスペリエンスです。または、タイムラインセレクターで `LIVE` オプションを選択し、`HISTORICAL` モードから過去15分間の Live Search モードに切り替えることができます。1 秒間に受け取ったスパンの数とサンプリングレートがトレーステーブルの上部に表示されます。1 秒間に数千のスパンのストリームを受け取るような場合は、人間の目では確認できないため、スループットが高いスパンストリームは確認しやすいようにサンプリングされますが、検索は可能です。Live Search クエリバーのフィルター機能を使用して、スパンストリームを絞り込んだり、画面右上の **Pause/Play** ボタンを使用して、ストリームを一時停止または再開したりできます。

**注**: スパンを選択すると、ストリームが一時停止し、そのスパンの詳細がトレース側のパネルに表示されます。

## トレースストリームと検索クエリの絞り込み
{{< img src="tracing/live_search/toplevespan.gif" alt="Live Search クエリ" >}}

検索バーに有効なクエリを入力すると、**すべてのスパン**にわたり検索条件に一致するトレースが表示されます。Live Search ビューの検索構文は他のトレースビューのものと同じですが、クエリはインデックス化されたトレースだけでなく、任意のスパンとタグで収集されたすべてのトレースと照合されます。

**注**: トレーステーブル上部のチェックボックスをオンにすることで、`top-level spans of the service` のみの選択ができます。この機能を高トラフィックのアプリケーションで使用して、表示されるスパンの数を減らし、サービスのエントリーポイントスパンのみを表示することができます。このボックスを選択しても、表示されるスパンを視覚的にフィルタリングするだけです。

ファセットとして定義されていない属性でも絞り込むことができます。たとえば、`customer.id` 属性で絞り込むには、以下の 2 つの方法があります。

- トレースパネルで属性をクリックし、検索クエリ `@customer.id:584959` に追加します。
{{< img src="tracing/live_search/livesearch_query2.png" alt="Live Search フィルター" >}}

- 検索クエリバー、`@customer.id:584959` に "customer.id" と入力して、すべてのスパンを `customer.id` 属性で絞り込みます。
{{< img src="tracing/live_search/livesearch_query1.png" alt="Live Search フィルター" >}}

## Live Analytics

{{< alert >}}
これらの機能は現在非公開ベータ版です。<a href="https://forms.gle/1FParyX49eNFPDsg9">フォームに記入</a>して、ベータ版への追加をリクエストしてください。
{{< /alert >}}

Live Analytics を使用すると、過去 15 分間に取り込まれたトレースの 100% で分析を実行できます。任意のスパンで任意のタグを検索します。さらに Datadog には、Datadog に送信されるトレースの数を制御する手段と、最も重要なトレースを保持するためのタグベースの保持フィルターも用意されています。

{{< img src="tracing/live_search/LiveAnalytics.gif" alt="Live Analytics" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/traces