---
core_product:
- log management
- apm
title: インデックス化
---
インデックス化された[ログ][1]とは、分析、アラート、トラブルシューティングのために収集、処理、保持されているログのことです。

インデックス化スパンは、Datadog に 15 日間保存された[保持フィルター][3]によってインデックス化された[スパン][2]で、スパンに含まれる[タグ][5]によって[検索スパン][4]で検索、クエリ、監視に利用できることを表します。

<div class="alert alert-info">
取り込み後に<a href="/tracing/trace_pipeline/trace_retention/">タグベースの Retention Filter</a> を作成して、サービスごとにインデックス化されたスパンの正確な数を制御および可視化することができます。
</div>

{{< img src="tracing/visualization/span_tag.png" alt="スパンタグ" style="width:80%" >}}

この例では、リクエスト (`merchant.store_name` と `merchant.tier`) がスパンにタグとして追加されています。

アプリケーションでスパンのタグ付けを始めるには、[スパンのタグを追加する][6]ガイドを参照してください。

タグがスパンに追加されたら、タグをクリックして[ファセット][7]として追加し、Analytics でタグを検索およびクエリします。これが完了すると、このタグの値はすべての新しいトレースに保存され、検索バー、ファセットパネル、トレースグラフクエリで使用できます。

{{< img src="tracing/app_analytics/search/create_facet.png" style="width:50%;" alt="ファセットの作成" style="width:50%;">}}

[1]: /ja/logs/
[2]: /ja/glossary/#span
[3]: /ja/glossary/#retention-filter
[4]: /ja/tracing/trace_explorer/search
[5]: /ja/getting_started/tagging
[6]: /ja/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[7]: /ja/glossary/#facet