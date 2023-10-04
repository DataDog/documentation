---
aliases:
- /ja/tracing/visualization/services_list/
further_reading:
- link: /tracing/trace_collection/
  tag: ドキュメント
  text: アプリケーションで APM トレースをセットアップする方法
- link: /tracing/services/service_page/
  tag: ドキュメント
  text: Datadog のサービスについて
- link: /tracing/services/resource_page/
  tag: ドキュメント
  text: リソースのパフォーマンスとトレースの詳細
- link: /tracing/trace_explorer/trace_view/
  tag: ドキュメント
  text: Datadog トレースの読み方を理解する
kind: documentation
title: サービス一覧画面
---

{{< img src="tracing/visualization/services_page_2.png" alt="サービスページ" >}}

<div class="alert alert-warning">サービスリストは非推奨となり、Datadog から削除されます。代わりに<a href="https://app.datadoghq.com/services">サービスカタログ</a>を使用してください。詳しくは<a href="/tracing/service_catalog/">サービスカタログのドキュメント</a>をご覧ください。</div>

## 概要 

[アプリケーションをインスツルメント][1]すると、レポーと作成[サービス][2]が [APM サービスページ][3]に表示されます。このサービス一覧画面では、インフラストラクチャーのレポート作成を行うすべての[サービス][4]の概要を確認することができます。
個々のサービスを選択すると、詳細なパフォーマンスインサイトが表示されます。[詳しくは、サービスのドキュメントを参照してください][4]。

## サービスリストのフィルタリング

次を使用して、サービスリストをフィルタリングします。

* [環境][5]
* [プライマリタグ][6]
* [ファセット](#facets)
* [サービスタイプ](#services-types)
* クエリ（基本的なテキストフィルタリング）


{{< img src="tracing/visualization/services_filtering_2.mp4" alt="サービスのフィルタリング" video="true" width="100%" >}}

### ファセット

サービス一覧の左側にあるファセットを使用して、サービス一覧のフィルタリングと検索を行うことができます。ファセットとは、Datadog が自動的にサービスに付けるタグのことです。ファセットによるフィルタリングと検索は、最も関連性の高いサービスを表示するために、ビューを絞り込むのに役立ちます。

ファセットのタイプ:

* [**サービスタイプ**](#services-types)
* **Last deploy**: サービスに対する最後のデプロイメントの時刻
* **Watchdog**: サービスに [Watchdog インサイト][7]があるかどうか
* **Monitor status**: モニターの現在のアクティブステータス
* **Infra type**: インフラストラクチャーのタイプ

### サービスタイプ

アプリケーションによって監視されるすべてのサービスは、タイプに関連付けられています。Datadog は、[スパン][8]に付けられた `span.type` 属性に基づいて、このタイプを自動的に決定します。このタイプは、Datadog Agent が統合しているアプリケーションやフレームワークの名前を指定します。

たとえば、Flask の公式インテグレーションを使用している場合は、`Type` が "Web" にセットされ、カスタムアプリケーションを監視している場合は、`Type` が "Custom" にセットされます。

サービスのタイプは次のいずれかに設定されます。

*  Cache
*  カスタム
*  DB
*  サーバーレス関数
*  Web

いくつかのインテグレーションは、タイプのエイリアスになります。例えば、Postgres、MySQL、Cassandraは "DB" というタイプに対応します。Redis と Memcache のインテグレーションは、"Cache" というタイプにマッピングされます。

## サービスの色の変更

[トレースを可視化][9]するために、サービスの色が使用されます。サービスの色を選んで変更することができます。

{{< img src="tracing/visualization/service_color.png" alt="サービスの色" style="width:30%;">}}

## 列の選択

歯車メニューをクリックすると、サービス一覧に表示する内容を選択できます。

* **Last Deploy**: サービスに対する最後のデプロイメントの時刻
* **Requests**: トレースされたリクエストの合計量（1 秒あたり）
* **Avg/p75/p90/p95/p99/Max Latency**: トレースされたリクエストの平均/p75/p90/p95/p99/最大レイテンシー
* **Error Rate**: トレースされたリクエストのうち、エラーで終了した量（1 秒あたり）
* **Apdex**: サービスの Apdex スコア。[Apdex の詳細][10]。
* **Monitor status**: サービスにアタッチされた[モニターのステータス][11]

{{< img src="tracing/visualization/services_columns_2.png" alt="サービス列" style="width:40%;">}}

## データ保持
**サービスリスト**と**サービスページ**のサービスとリソースの統計、およびスパンのサマリーは、最大で 30 日間保持されます。APM トレースメトリクスをカスタムクエリするには、メトリクスエクスプローラーを使用してください。[APM のデータ保持の詳細はこちら][12]。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/send_traces/
[2]: /ja/tracing/glossary/#services
[3]: https://app.datadoghq.com/apm/services
[4]: /ja/tracing/services/service_page/
[5]: /ja/tracing/guide/setting_primary_tags_to_scope/#environment
[6]: /ja/tracing/guide/setting_primary_tags_to_scope/
[7]: /ja/watchdog/
[8]: /ja/tracing/trace_explorer/trace_view/#spans
[9]: /ja/tracing/trace_explorer/trace_view/
[10]: /ja/tracing/faq/how-to-configure-an-apdex-for-your-traces-with-datadog-apm/
[11]: /ja/tracing/services/service_page/#service-monitor
[12]: https://docs.datadoghq.com/ja/developers/guide/data-collection-resolution-retention/